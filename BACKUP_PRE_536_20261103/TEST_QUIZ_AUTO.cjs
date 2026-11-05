const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source='function __KVPV_INSTALL_60_quiz_auto_js(){\n'+fs.readFileSync(__dirname+'/src/60-quiz-auto.js','utf8')+'\n}';
const wait=(ms=15)=>new Promise(r=>setTimeout(r,ms));
const rows=new Map(),meta=new Map();
function doneReq(value){const req={result:undefined,error:null};setImmediate(()=>{req.result=value;req.onsuccess?.();});return req;}
const idb={open(){const req={result:null,error:null};setImmediate(()=>{
  const db={objectStoreNames:{contains:(n)=>['answers','meta'].includes(n)},createObjectStore:()=>{},transaction(name){
    const tx={error:null,oncomplete:null,onerror:null,onabort:null,objectStore(){return {
      put(value,key){if(name==='answers')rows.set(value.questionKey,{...value});else meta.set(key,value);setImmediate(()=>tx.oncomplete?.());return doneReq(true);},
      get(key){return doneReq(meta.get(key));},
      openCursor(){const entries=[...rows.entries()];let i=0,req={result:null,error:null};
        const deliver=()=>{req.result=i<entries.length?{value:{...entries[i][1]},continue(){i++;setImmediate(deliver);}}:null;req.onsuccess?.();};
        setImmediate(deliver);return req;}
    };}};return tx;}
  };req.result=db;req.onupgradeneeded?.();req.onsuccess?.();
});return req;}};
let copy=[0,0,'',[],0];
let legacy={};for(let i=0;i<2200;i++)legacy['câu '+i]='đáp '+i;
const file={content:'',async queryPermission(){return 'granted'},async getFile(){return {size:Buffer.byteLength(this.content)}},async createWritable(opts={}){
  const ref=this;let tmp=opts.keepExistingData?ref.content:'';let cursor=0;
  return {async seek(n){cursor=n;},async write(s){const content=String(s);tmp=tmp.slice(0,cursor)+content+tmp.slice(cursor+content.length);cursor+=content.length;},async close(){ref.content=tmp;},async abort(){}};
}};
const W={__KVPV_OWN_ACTOR_ID:'123456',localStorage:{getItem(){return JSON.stringify(legacy)}},indexedDB:idb,
  _Ba:{_rJ:{_O$:{ins:{actorId:'123456',isDead:false}}},_vlt:{_llt:{ins:{getCopyInfo:()=>copy,getSyncChat:()=>false,choiceAnswer(){}}}}},
  _ft:{_po:{ins:{getCfgById(){const cfg=[];cfg[7]=69;return cfg;}}}},_C:{_Mn:{_Cn:{currentID:6901}}},
  _Sa:{svrTime:0,notify:{on(){},off(){}}},KVPV_V1:{timers:{setInterval(){return 17;},clearInterval(){}}},
  showSaveFilePicker:async()=>file,
  Blob,URL:{createObjectURL(){return 'blob:mock'},revokeObjectURL(){}},
  document:{body:{appendChild(){}},createElement(){return {style:{},click(){},remove(){}}}},setTimeout,clearTimeout};
const context=vm.createContext({window:W,console,Date,Intl,Error,Map,Set,Object,JSON,String,Number,Array,Promise});
function load(){vm.runInContext(source+';__KVPV_INSTALL_60_quiz_auto_js();',context)}
(async()=>{
 load();await wait(20);
 assert.equal(W.KVPV_QUIZ_AUTO.status().legacyUnverified>=2200,true);
 assert.equal(W.KVPV_QUIZ_AUTO.status().verifiedAnswers,0);
 for(let i=0;i<2305;i++){
   copy=[3,123,'Câu mới số '+i,['A'+i,'B'+i],i%2,`round-${i}`];W.KVPV_QUIZ_AUTO.sync();
 }
 await wait(100);
 assert.equal(W.KVPV_QUIZ_AUTO.answerCount(),2305,'should not cap at 2,000');
 assert.equal(rows.size,2305,'all 2305 should persist');
 copy=[3,123,'Câu mới số 2000',['A2000','B2000'],0,'round-same'];W.KVPV_QUIZ_AUTO.sync();
 assert.equal(W.KVPV_QUIZ_AUTO.answerCount(),2305,'duplicate should not add another');
 copy=[3,123,'Câu mới số 2000',['A2000','B2000'],1,'round-corrected'];W.KVPV_QUIZ_AUTO.sync();
 await wait(25);assert.equal(rows.get('câu mới số 2000').answer,'b2000');
 await W.KVPV_QUIZ_AUTO.connectFile();
 assert.equal(file.content.split('\n').filter(Boolean).length,2305,'snapshot should contain all');
 copy=[3,123,'Một câu nữa',['Không','Đúng'],1,'next'];W.KVPV_QUIZ_AUTO.sync();
 await wait(50);
 assert.equal(file.content.split('\n').filter(Boolean).length,2306,'live append after new answer');
 assert.equal(W.KVPV_QUIZ_AUTO.status().fileWrites,1);
 load();await wait(90);
 assert.equal(W.KVPV_QUIZ_AUTO.answerCount(),2306,'persist after module reload');
 assert.equal(W.KVPV_QUIZ_AUTO.status().fileState,'connected','file handle auto restore when granted');
 copy=[3,123,'Một câu sau reload',['A','B'],1,'r2'];W.KVPV_QUIZ_AUTO.sync();await wait(20);
 assert.equal(file.content.split('\n').filter(Boolean).length,2307,'append after reload');
 assert.equal(W.KVPV_QUIZ_AUTO.answerCount(),2307);
 console.log('PASS: >2000 answers, legacy preservation, deduplication, correction, reload, file snapshot and append');
})().catch(err=>{console.error(err);process.exitCode=1;});
