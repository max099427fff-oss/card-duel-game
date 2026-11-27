const fs=require('fs');
const h=fs.readFileSync('index.html','utf8');
const m=h.match(/<script id="engine">([\s\S]*?)<\/script>/);
const src=m[1];
const f=new Function(src+';return typeof CG!=="undefined"?CG:null;');
const CG=f();
if(!CG){console.error('CG not found');process.exit(1);}
const a=CG.selfTest(300,1); console.log('selfTest',JSON.stringify(a));
const b=CG.fuzz(200,1); console.log('fuzz',JSON.stringify(b));
if(a.illegal>0||a.games!==300||b.errs>0){console.error('FAILED');process.exit(1);}
console.log('OK');
