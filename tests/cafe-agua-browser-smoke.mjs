// Real Chromium CDP smoke for the Café del Agua newspaper and React Flow.
import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const chrome=['google-chrome','google-chrome-stable','chromium','chromium-browser'].find(bin=>spawnSync('which',[bin],{stdio:'ignore'}).status===0)
assert.ok(chrome,'Chromium not installed')
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))
const vite=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'ignore'})
const userData=mkdtempSync(join(tmpdir(),'cafe-agua-smoke-'))
const url='http://127.0.0.1:4173/Caf-filosofico-udg/#/cafe-filosofico/2026/10/19/agua'
let child,socket,serial=0
const pending=new Map()
function send(method,params={}){
  return new Promise((resolve,reject)=>{
    const id=++serial
    pending.set(id,{resolve,reject})
    socket.send(JSON.stringify({id,method,params}))
  })
}
async function evaluate(source){
  const x=await send('Runtime.evaluate',{expression:source,returnByValue:true,awaitPromise:true})
  if(x.exceptionDetails)throw Error('Browser eval: '+JSON.stringify(x.exceptionDetails))
  return x.result?.value
}
async function until(source,label){
  for(let i=0;i<100;i++){
    try{if(await evaluate(source))return}catch{ /* web page still loading */ }
    await wait(200)
  }
  throw Error('Timeout '+label)
}
async function checkViewport(w,h){
  await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:2,mobile:w<769})
  await send('Page.navigate',{url})
  await until("document.querySelectorAll('.water-edition-gallery-grid figure').length===4 && !!document.querySelector('.water-edition-atlas')",'compact page at '+w+'×'+h)
  const data=await evaluate("({inner:innerWidth,scroll:document.documentElement.scrollWidth,photos:document.querySelectorAll('.water-edition-gallery-grid figure').length,cover:!!document.querySelector('.water-edition-hero'),map:!!document.querySelector('.react-flow'),memory:!!document.querySelector('.water-memory-chapters')})")
  assert.equal(data.photos,4)
  assert.ok(data.cover && !data.map && !data.memory,'Portada compacta: no montar lectura extensa inicialmente')
  assert.ok(data.scroll <= data.inner + 3,'Horizontal overflow '+w+'x'+h+': '+JSON.stringify(data))
  console.log('OK viewport',w,h)
}
try {
  let ready=false
  for(let i=0;i<125;i++){try{if((await fetch('http://127.0.0.1:4173/Caf-filosofico-udg/')).ok){ready=true;break}}catch{} await wait(200)}
  assert.ok(ready,'Vite preview unavailable')
  child=spawn(chrome,['--headless=new','--no-sandbox','--disable-dev-shm-usage','--no-first-run','--disable-gpu','--remote-debugging-port=0','--user-data-dir='+userData,'about:blank'],{stdio:'ignore'})
  const portFile=join(userData,'DevToolsActivePort')
  for(let i=0;i<125&&!existsSync(portFile);i++)await wait(200)
  assert.ok(existsSync(portFile),'DevToolsActivePort not created')
  const port=Number(readFileSync(portFile,'utf8').split('\n')[0])
  const tabs=await (await fetch('http://127.0.0.1:'+port+'/json/list')).json()
  const target=tabs.find(t=>t.type==='page')
  assert.ok(target?.webSocketDebuggerUrl)
  socket=new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true})})
  socket.addEventListener('message',ev=>{
    const msg=JSON.parse(ev.data)
    if(msg.id&&pending.has(msg.id)){const x=pending.get(msg.id);pending.delete(msg.id);msg.error?x.reject(msg.error):x.resolve(msg.result)}
  })
  await send('Page.enable')
  await send('Runtime.enable')
  for(const [w,h] of [[390,844],[768,1024],[1024,768],[1440,900]])await checkViewport(w,h)
  // La galería y las preguntas son interactivas, sin cambiar de ruta.
  await evaluate("document.querySelector('.water-edition-question-tabs button:last-child').click()")
  await until("document.querySelector('.water-edition-question-focus blockquote')?.textContent.includes('décadas')",'question focus')
  await evaluate("document.querySelector('.water-edition-gallery-toggle').click()")
  await until("document.querySelectorAll('.water-edition-gallery-grid figure').length===8",'all eight images')
  await evaluate("document.querySelector('.water-edition-gallery-toggle').click()")
  await until("document.querySelectorAll('.water-edition-gallery-grid figure').length===4",'compact album')
  await evaluate("document.querySelector('.water-edition-archive > button').click()")
  await until("document.querySelectorAll('.water-memory-chapter').length>=10",'memory chapters')
  const closed=await evaluate("document.querySelectorAll('.water-memory-chapter[open]').length")
  assert.equal(closed,0,'Los capítulos se abren sólo cuando el lector los elige')
  await evaluate("document.querySelector('.water-memory-chapter summary').click()")
  await until("!!document.querySelector('.water-memory-chapter[open]')",'memory section open')
  await evaluate("document.querySelector('.water-edition-archive > button').click()")
  await until("!document.querySelector('.water-memory-chapter')",'close memory')
  const hash=await evaluate("location.hash")
  assert.equal(hash,'#/cafe-filosofico/2026/10/19/agua','Los controles no deben romper HashRouter')
  await evaluate("document.querySelector('.water-edition-atlas-actions button').click()")
  await until("!!document.querySelector('.agua2d-routes')",'lazy React Flow opened')
  await evaluate("document.querySelector('.agua2d-study-launcher button').click()")
  await until("!!document.querySelector('.agua2d-guide-panel')",'guide launch')
  const title=await evaluate("document.querySelector('.agua2d-guide-panel h3').textContent")
  assert.match(title,/Etapa 1 \/ 20/)
  await evaluate("document.querySelector('.agua2d-guide-controls button:nth-child(2)').click()")
  await until("document.querySelector('.agua2d-guide-panel h3')?.textContent.includes('Etapa 2 / 20')",'guide next')
  await evaluate("document.querySelector('.agua2d-routes button:nth-child(3)').click()")
  await until("document.querySelector('.agua2d-workspace-footer span')?.textContent.includes('/ 4')",'section route')
  await evaluate("document.querySelector('.agua2d-study-launcher button:last-child').click()")
  await until("!!document.querySelector('.agua2d-study-panel')",'study panel')
  await evaluate("document.querySelector('.agua2d-answers button:last-child').click()")
  await until("!!document.querySelector('.agua2d-study-feedback')",'study feedback')
  await evaluate("document.querySelector('.agua2d-command-buttons button:last-child').click()")
  await until("!!document.querySelector('.agua2d-workspace.is-fullscreen')",'fullscreen open')
  await evaluate("window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))")
  await until("!document.querySelector('.agua2d-workspace.is-fullscreen')",'fullscreen close')
  console.log('OK guide, routes, study, fullscreen')
} finally {
  socket?.close()
  child?.kill('SIGKILL')
  vite.kill('SIGKILL')
  rmSync(userData,{recursive:true,force:true})
}
