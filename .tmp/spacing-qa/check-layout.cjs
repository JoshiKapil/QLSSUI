const fs=require('fs');
(async()=>{
 const target=await (await fetch('http://127.0.0.1:9333/json/new?about:blank',{method:'PUT'})).json();
 const ws=new WebSocket(target.webSocketDebuggerUrl); await new Promise(r=>ws.addEventListener('open',r,{once:true}));let seq=0;const pending=new Map();ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}}});const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
 await call('Page.enable'); const results=[];
 for(const page of ['admin','zeiss','pm','onboarding'])for(const theme of ['heritage','classic'])for(const width of [1440,768,390]){
 await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:'file:///I:/QLSS_New_Version/.tmp/spacing-qa/'+page+'.html'});
 await new Promise(r=>setTimeout(r,150));
 const {result}=await call('Runtime.evaluate',{expression:`(async()=>{document.body.className='theme-${theme}';document.body.dataset.theme='${theme}';await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const card=document.querySelector('[data-card]'),style=getComputedStyle(card),wrapper=document.querySelector('.workspace-content'),w=wrapper&&getComputedStyle(wrapper);return {cardPaddingLeft:parseFloat(style.paddingLeft),cardPaddingRight:parseFloat(style.paddingRight),cardPaddingTop:parseFloat(style.paddingTop),gutter:w?parseFloat(w.paddingLeft):null,overflow:document.documentElement.scrollWidth>innerWidth,cardWidth:card.getBoundingClientRect().width,viewport:innerWidth};})()`,awaitPromise:true,returnByValue:true});
 const m=result.value;results.push({page,theme,width,...m});
 if((page==='admin'||page==='zeiss')&&theme==='heritage'&&(width===1440||width===390)){const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('.tmp/spacing-qa/'+page+'-'+width+'.png',Buffer.from(shot.data,'base64'));}
 }
 fs.writeFileSync('.tmp/spacing-qa/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));await call('Browser.close');
})().catch(e=>{console.error(e);process.exit(1)});
