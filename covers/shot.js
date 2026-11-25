const {chromium}=require('playwright');const fs=require('fs');const S=process.argv[2];const only=process.argv.slice(3);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const [name] of JSON.parse(fs.readFileSync(S+'/covers.json'))){ if(only.length&&!only.includes(name))continue;
 await p.goto('file://'+S+'/'+name+'.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
 await p.screenshot({path:S+'/out/'+name+'-cover.png'});}
await b.close();})();
