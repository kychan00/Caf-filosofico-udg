// Chromium CDP smoke for the upcoming Café Filosófico 05.
import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const chrome=['google-chrome','google-chrome-stable','chromium','chromium-browser'].find(bin=>spawnSync('which',[bin],{stdio:'ignore'}).status===0)
assert.ok(chrome,'Chromium not installed')
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))
const vite=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'ignore'})
const userData=mkdtempSync(join(tmpdir(),'cafe-redes-smoke-'))
const url='http://127.0.0.1:4173/Caf-filosofico-udg/#/cafe-filosofico/2026/11/03/redes-sociales'
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
  for(let i=0;i<95;i++){
    try{if(await evaluate(source))return}catch{/* lazy route may still load */}
    await wait(200)
  }
  throw Error('Timeout '+label)
}
try{
  let ready=false
  for(let i=0;i<110;i++){
    try{if((await fetch('http://127.0.0.1:4173/Caf-filosofico-udg/')).ok){ready=true;break}}catch{}
    await wait(200)
  }
  assert.ok(ready,'Vite preview unavailable')
  child=spawn(chrome,['--headless=new','--no-sandbox','--disable-dev-shm-usage','--no-first-run','--disable-gpu','--remote-debugging-port=0','--user-data-dir='+userData,'about:blank'],{stdio:'ignore'})
  const portFile=join(userData,'DevToolsActivePort')
  for(let i=0;i<110&&!existsSync(portFile);i++)await wait(200)
  assert.ok(existsSync(portFile),'DevToolsActivePort not created')
  const port=Number(readFileSync(portFile,'utf8').split('\n')[0])
  const tabs=await (await fetch('http://127.0.0.1:'+port+'/json/list')).json()
  socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl)
  await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true})})
  socket.addEventListener('message',ev=>{
    const msg=JSON.parse(ev.data)
    if(msg.id&&pending.has(msg.id)){
      const x=pending.get(msg.id);pending.delete(msg.id)
      msg.error?x.reject(msg.error):x.resolve(msg.result)
    }
  })
  await send('Page.enable')
  await send('Runtime.enable')
  for(const [w,h] of [[390,844],[768,1024],[1024,768],[1440,900]]){
    await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:2,mobile:w<769})
    await send('Page.navigate',{url})
    await until("document.querySelectorAll('.rs-question-card').length === 3 && !!document.querySelector('.rs-phone') && document.querySelectorAll('.rsm-chapter').length === 8",'page at '+w)
    const data=await evaluate("({inner:innerWidth,scroll:document.documentElement.scrollWidth,questions:document.querySelectorAll('.rs-question-card').length,selected:document.querySelectorAll('.rs-question-card[aria-pressed=true]').length,memory:document.querySelectorAll('.rsm-chapter').length,heading:document.querySelector('.rs-hero h1')?.textContent,footer:!!document.querySelector('.rs-footer')})")
    assert.ok(data.scroll<=data.inner+3,'Horizontal overflow at '+w+'x'+h+': '+JSON.stringify(data))
    assert.equal(data.questions,3)
    assert.equal(data.selected,1)
    assert.equal(data.memory,8)
    assert.ok(data.heading.includes('Redes')&&data.footer)
    console.log('OK redes sociales',w,h)
  }
  await evaluate("document.querySelectorAll('.rs-question-card')[1].click()")
  await until("document.querySelector('.rs-detail-main h3')?.textContent.includes('privacidad')",'question click')
  assert.equal(await evaluate("document.querySelectorAll('.rs-question-card[aria-pressed=true]').length"),1)
  await evaluate("document.querySelectorAll('.rs-map-node')[2].click()")
  await until("document.querySelector('.rs-detail-main h3')?.textContent.includes('validación')",'graph node click')
  assert.equal(await evaluate("location.hash"),'#/cafe-filosofico/2026/11/03/redes-sociales','Question controls should preserve HashRouter')
  console.log('OK single-click interaction and stable HashRouter')
}finally{
  if(socket)socket.close()
  if(child&&!child.killed)child.kill('SIGTERM')
  if(!vite.killed)vite.kill('SIGTERM')
  // Chromium may still be writing its profile when SIGTERM returns.
  await wait(500)
  rmSync(userData,{recursive:true,force:true,maxRetries:12,retryDelay:250})
}
