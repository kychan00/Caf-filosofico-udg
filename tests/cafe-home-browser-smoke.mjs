// Chromium CDP smoke for the redesigned Café Filosófico home.
import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const chrome = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']
  .find(bin => spawnSync('which', [bin], { stdio: 'ignore' }).status === 0)
assert.ok(chrome, 'Chromium not installed')

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
const vite = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
  { stdio: 'ignore' },
)
const userData = mkdtempSync(join(tmpdir(), 'cafe-home-smoke-'))
const url = 'http://127.0.0.1:4173/Caf-filosofico-udg/#/cafe-filosofico'
const artifactDir = join(process.cwd(), 'artifacts', 'cafe-home')
mkdirSync(artifactDir, { recursive: true })

let child, socket, serial = 0
const pending = new Map()

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++serial
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params }))
  })
}

async function evaluate(source) {
  const result = await send('Runtime.evaluate', {
    expression: source,
    returnByValue: true,
    awaitPromise: true,
  })
  if (result.exceptionDetails) throw Error('Browser eval: ' + JSON.stringify(result.exceptionDetails))
  return result.result?.value
}

async function capture(name) {
  const shot = await send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false,
  })
  writeFileSync(join(artifactDir, name + '.png'), Buffer.from(shot.data, 'base64'))
}

async function until(source, label) {
  for (let i = 0; i < 100; i++) {
    try {
      if (await evaluate(source)) return
    } catch {
      // The route may still be loading.
    }
    await wait(200)
  }
  throw Error('Timeout ' + label)
}

try {
  let ready = false
  for (let i = 0; i < 120; i++) {
    try {
      if ((await fetch('http://127.0.0.1:4173/Caf-filosofico-udg/')).ok) {
        ready = true
        break
      }
    } catch {
      // Vite is still starting.
    }
    await wait(200)
  }
  assert.ok(ready, 'Vite preview unavailable')

  child = spawn(chrome, [
    '--headless=new',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--no-first-run',
    '--disable-gpu',
    '--remote-debugging-port=0',
    '--user-data-dir=' + userData,
    'about:blank',
  ], { stdio: 'ignore' })

  const portFile = join(userData, 'DevToolsActivePort')
  for (let i = 0; i < 120 && !existsSync(portFile); i++) await wait(200)
  assert.ok(existsSync(portFile), 'DevToolsActivePort not created')

  const port = Number(readFileSync(portFile, 'utf8').split('\n')[0])
  const tabs = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json()
  const target = tabs.find(tab => tab.type === 'page')
  assert.ok(target?.webSocketDebuggerUrl)

  socket = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) {
      const operation = pending.get(message.id)
      pending.delete(message.id)
      message.error ? operation.reject(message.error) : operation.resolve(message.result)
    }
  })

  await send('Page.enable')
  await send('Runtime.enable')

  for (const [width, height] of [[390, 844], [768, 1024], [1024, 768], [1440, 900]]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: width < 769,
    })
    await send('Page.navigate', { url })
    await until(
      "document.querySelectorAll('.cafe-event-card').length===5 && !!document.querySelector('.cafe-next-poster') && !!document.querySelector('.cafe-method-grid')",
      'home at ' + width + 'x' + height,
    )

    const data = await evaluate("({inner:innerWidth,scroll:document.documentElement.scrollWidth,cards:document.querySelectorAll('.cafe-event-card').length,stats:document.querySelectorAll('.cafe-stat-grid article').length,method:document.querySelectorAll('.cafe-method-grid article').length,resources:document.querySelectorAll('.cafe-resource-grid article').length,controls:document.querySelectorAll('.cafe-card-controls button').length,heading:document.querySelector('.cafe-hero h1')?.textContent,next:document.querySelector('.cafe-next-copy h2')?.textContent,nav:!!document.querySelector('.cafe-nav-shell'),search:!!document.querySelector('.cafe-search-trigger')})")

    assert.ok(data.scroll <= data.inner + 3, 'Horizontal overflow at ' + width + 'x' + height + ': ' + JSON.stringify(data))
    assert.equal(data.cards, 5)
    assert.equal(data.stats, 4)
    assert.equal(data.method, 4)
    assert.equal(data.resources, 3)
    assert.equal(data.controls, 2)
    assert.ok(data.heading.includes('Café') && data.heading.includes('Filosófico'))
    assert.ok(data.next.includes('Inteligencia'))
    assert.ok(data.nav && data.search)

    if (width === 390 || width === 1440) {
      await capture('hero-' + width + 'x' + height)
    }

    console.log('OK home viewport', width, height)
  }

  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  })
  await send('Page.navigate', { url })
  await until("!!document.querySelector('.cafe-menu-trigger')", 'mobile menu trigger')

  await evaluate("document.querySelector('.cafe-menu-trigger').click()")
  await until("document.querySelector('.cafe-nav-links').classList.contains('is-open')", 'mobile menu open')
  assert.equal(await evaluate("document.querySelector('.cafe-menu-trigger').getAttribute('aria-expanded')"), 'true')

  await evaluate("document.querySelector('.cafe-nav-links button:nth-child(2)').click()")
  await until("!document.querySelector('.cafe-nav-links').classList.contains('is-open')", 'mobile menu close after navigation')
  assert.equal(await evaluate("location.hash"), '#/cafe-filosofico')

  await evaluate("document.querySelector('.cafe-search-trigger').click()")
  await until("!!document.querySelector('#cafe-search')", 'search open')
  await evaluate("const input=document.querySelector('#cafe-search'); const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; setter.call(input,'agua'); input.dispatchEvent(new Event('input',{bubbles:true}))")
  await until("document.querySelectorAll('.cafe-search-results a').length===1", 'search filtering')
  const resultText = await evaluate("document.querySelector('.cafe-search-results a')?.textContent")
  assert.ok(resultText.toLowerCase().includes('agua'))

  await evaluate("window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))")
  await until("!document.querySelector('#cafe-search')", 'search close on Escape')

  await evaluate("document.querySelector('.cafe-next')?.scrollIntoView({block:'center'})")
  await until("document.querySelector('.cafe-next-poster')?.complete && document.querySelector('.cafe-next-poster')?.naturalWidth>0", 'next poster lazy load')
  await wait(250)
  await capture('next-mobile-390x844')

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await send('Page.navigate', { url })
  await until("document.querySelectorAll('.cafe-event-card').length===5", 'desktop visual review')

  for (const [selector, name] of [
    ['#cafes', 'cafes-desktop-1440x900'],
    ['#metodo', 'metodo-desktop-1440x900'],
    ['.cafe-numbers', 'numeros-desktop-1440x900'],
    ['.cafe-next', 'next-desktop-1440x900'],
    ['#archivo', 'archivo-desktop-1440x900'],
    ['#recursos', 'recursos-desktop-1440x900'],
  ]) {
    await evaluate("(()=>{const section=document.querySelector('" + selector + "'); if(section){document.documentElement.style.scrollBehavior='auto'; section.scrollIntoView({block:'start',behavior:'auto'});}})()")
    if (selector === '#cafes') {
      await until("[...document.querySelectorAll('.cafe-event-poster img')].every(img=>img.complete&&img.naturalWidth>0)", 'cafe posters visual review')
      const sticky = await evaluate("(()=>{const nav=document.querySelector('.cafe-nav-shell'); const section=document.querySelector('#cafes'); const nr=nav.getBoundingClientRect(); const sr=section.getBoundingClientRect(); return {position:getComputedStyle(nav).position,top:nr.top,height:nr.height,sectionTop:sr.top}})()")
      assert.equal(sticky.position, 'sticky', 'Global navigation must stay sticky')
      assert.ok(Math.abs(sticky.top) <= 3, 'Sticky navigation should remain at viewport top: ' + JSON.stringify(sticky))
      assert.ok(sticky.sectionTop >= sticky.height - 4, 'Anchor should remain visible below sticky navigation: ' + JSON.stringify(sticky))
      console.log('OK sticky navigation and section anchor offset')
    }
    if (selector === '#archivo') {
      await until("[...document.querySelectorAll('.cafe-evidence img')].every(img=>img.complete&&img.naturalWidth>0)", 'evidence visual review')
    }
    await wait(500)
    await capture(name)
  }

  console.log('OK home interactions, search, mobile navigation, lazy poster and visual review captures')
} finally {
  if (socket) socket.close()
  if (child && !child.killed) child.kill('SIGTERM')
  if (!vite.killed) vite.kill('SIGTERM')
  await wait(500)
  rmSync(userData, { recursive: true, force: true, maxRetries: 12, retryDelay: 250 })
}
