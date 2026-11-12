(() => {
'use strict';
const W=window, old=W.KVPV_QUIZ_AUTO, carry=old?._handoff?.(); old?.stop?.();
const actor=String(W.__KVPV_OWN_ACTOR_ID||''), legacyKey='kvpv.quiz.answers.v1';
const dbName='kvpv.quiz.answers.v2', dbVersion=1;
const norm=x=>String(x??'').replace(/<[^>]*>/g,' ').normalize('NFC').toLocaleLowerCase('vi').replace(/\s+/g,' ').trim();
const legacy=new Map(), verified=new Map();
try {
  const oldRows=JSON.parse(W.localStorage?.getItem(legacyKey)||'{}');
  if(oldRows&&typeof oldRows==='object'&&!Array.isArray(oldRows)){
    for(const [q,a] of Object.entries(oldRows))if(typeof a==='string'&&norm(q)&&norm(a))legacy.set(norm(q),norm(a));
  }
} catch(_) {}
// Keep previous client's answer preference, but do not mark it "server-confirmed".
for(const q of ['"Trứng muối" làm từ trứng nào?','Trứng muối làm từ trứng nào?']){
  if(!legacy.has(norm(q)))legacy.set(norm(q),norm('Trứng vịt'));
}
const same=carry?.actor===actor;
const S={enabled:true,timer:null,reason:'waiting_event',error:'',selected:same?carry.selected:null,
  answered:same?carry.answered:0,learned:same?carry.learned:0,chatRequested:same?carry.chatRequested:null,
  question:null,joinKey:same?carry.joinKey:null,ready:false,pendingWrites:0,savedWrites:0,
  fileWrites:0,fileState:'not_connected',fileError:'',panel:null,lastResult:null};
const model=()=>W._Ba?._vlt?._llt?.ins;
const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const inside=()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===69;
let idb=null, fileHandle=null, rememberedHandle=null, fileQueue=Promise.resolve(), restorePromise=Promise.resolve();
const queuedWrites=new Map();
const request=req=>new Promise((resolve,reject)=>{req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||Error('indexedDB request failed'));});
const txDone=tx=>new Promise((resolve,reject)=>{tx.oncomplete=()=>resolve();tx.onabort=()=>reject(tx.error||Error('indexedDB transaction aborted'));tx.onerror=()=>reject(tx.error||Error('indexedDB transaction failed'));});
function dbError(error){S.error='indexedDB: '+String(error?.message||error);console.warn('[KVPV QUIZ]',S.error);}
function writeRecord(row){
  if(!idb||!S.ready){queuedWrites.set(row.questionKey,row);return;}
  S.pendingWrites++;
  try {
    const tx=idb.transaction('answers','readwrite');
    const finished=txDone(tx);
    tx.objectStore('answers').put(row);
    finished.then(()=>{S.savedWrites++;},dbError).finally(()=>{S.pendingWrites--;});
  }catch(error){S.pendingWrites--;dbError(error);}
}
async function storeHandle(handle){
  if(!idb)return;
  try{const tx=idb.transaction('meta','readwrite');const done=txDone(tx);tx.objectStore('meta').put(handle,'fileHandle');await done;}
  catch(error){S.fileError='remember_file: '+String(error?.message||error);}
}
async function initialize(){
  if(!W.indexedDB){dbError('Browser does not support IndexedDB');return;}
  try {
    idb=await new Promise((resolve,reject)=>{
      const req=W.indexedDB.open(dbName,dbVersion);
      req.onupgradeneeded=()=>{
        const db=req.result;
        if(!db.objectStoreNames.contains('answers'))db.createObjectStore('answers',{keyPath:'questionKey'});
        if(!db.objectStoreNames.contains('meta'))db.createObjectStore('meta');
      };
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error||Error('open failed'));
      req.onblocked=()=>reject(Error('database upgrade blocked by another tab'));
    });
    // A cursor avoids a fixed read limit and does not require one giant getAll() result.
    await new Promise((resolve,reject)=>{
      const tx=idb.transaction('answers','readonly'),req=tx.objectStore('answers').openCursor();
      req.onsuccess=()=>{
        const cursor=req.result;if(!cursor){resolve();return;}
        const row=cursor.value;
        if(row?.serverConfirmed===true&&typeof row.questionKey==='string'&&typeof row.answer==='string'){
          const active=verified.get(row.questionKey);
          if(!active||Number(row.updatedAt)>Number(active.updatedAt))verified.set(row.questionKey,row);
        }
        cursor.continue();
      };
      req.onerror=()=>reject(req.error||Error('cursor failed'));
      tx.onabort=()=>reject(tx.error||Error('load aborted'));
    });
    S.ready=true;
    for(const row of queuedWrites.values())writeRecord(row);
    queuedWrites.clear();
    try{
      const tx=idb.transaction('meta','readonly');
      rememberedHandle=await request(tx.objectStore('meta').get('fileHandle'))||null;
      if(rememberedHandle?.queryPermission){
        const permission=await rememberedHandle.queryPermission({mode:'readwrite'});
        if(permission==='granted'){fileHandle=rememberedHandle;S.fileState='connected';}
        else S.fileState='reconnect_required';
      }
    }catch(error){S.fileError='restore_file: '+String(error?.message||error);}
  }catch(error){dbError(error);}
}
// This is an append-only JSONL file. Each entry is independently recoverable;
// no fixed question cap, and we never repeatedly rewrite the whole file.
async function appendToFile(row){
  if(!fileHandle)return;
  const handle=fileHandle;
  fileQueue=fileQueue.then(async()=>{
    if(await handle.queryPermission({mode:'readwrite'})!=='granted'){
      S.fileState='reconnect_required';fileHandle=null;return;
    }
    const file=await handle.getFile(), writable=await handle.createWritable({keepExistingData:true});
    try{await writable.seek(file.size);await writable.write(JSON.stringify(row)+'\n');await writable.close();S.fileWrites++;}
    catch(error){try{await writable.abort();}catch(_){}throw error;}
  }).catch(error=>{S.fileError='append_file: '+String(error?.message||error);S.fileState='file_write_error';console.warn('[KVPV QUIZ]',S.fileError);});
  return fileQueue;
}
async function connectFile(){
  if(!W.showSaveFilePicker&&!rememberedHandle)throw Error('Trình duyệt/game-frame không hỗ trợ chọn file tự động. Dùng exportJSON().');
  // A click on the panel is necessary for the browser's filesystem permission prompt.
  let handle=rememberedHandle;
  if(handle?.queryPermission){
    let permission=await handle.queryPermission({mode:'readwrite'});
    if(permission!=='granted'&&handle.requestPermission)permission=await handle.requestPermission({mode:'readwrite'});
    if(permission!=='granted')handle=null;
  }
  if(!handle){
    handle=await W.showSaveFilePicker({suggestedName:'KVPV_TamTienVanDao_DapAnDung.jsonl',
      types:[{description:'KVPV correct answers (JSON Lines)',accept:{'text/plain':['.jsonl','.txt']}}]});
  }
  await restorePromise;
  await fileQueue;
  const existing=await handle.getFile();
  if(existing.size===0){
    const writer=await handle.createWritable();
    try{
      for(const row of verified.values())await writer.write(JSON.stringify(row)+'\n');
      await writer.close();
    }catch(error){try{await writer.abort();}catch(_){}throw error;}
  }
  fileHandle=handle;rememberedHandle=handle;S.fileState='connected';S.fileError='';
  await storeHandle(handle);
  updatePanel();return status();
}
function serverResult(question,options,index){
  // r[0] === 3 and r[4] in {0,1} are the game's existing result-phase fields.
  // Do not learn from our own selected answer or from chat guesses.
  const questionKey=norm(question),answer=norm(options[index]);
  if(!questionKey||!answer)return;
  const previous=verified.get(questionKey),sameAnswer=previous?.answer===answer;
  if(sameAnswer)return;
  const now=Date.now(),row={questionKey,question:String(question),answer,answerText:String(options[index]),
    options:options.map(String),correctIndex:index,serverConfirmed:true,source:'server_result',
    firstSeenAt:previous?.firstSeenAt??now,updatedAt:now};
  verified.set(questionKey,row);S.learned++;
  writeRecord(row);void appendToFile(row);updatePanel();
}
function exportRows(){return [...verified.values()].map(row=>({...row}));}
function download(content,filename,type){
  const blob=new W.Blob([content],{type}),url=W.URL.createObjectURL(blob),a=W.document.createElement('a');
  a.href=url;a.download=filename;a.style.display='none';W.document.body.appendChild(a);a.click();a.remove();
  W.setTimeout(()=>W.URL.revokeObjectURL(url),15000);
  return {downloaded:filename,records:verified.size};
}
function exportJSON(){return download(JSON.stringify({schema:'kvpv.quiz.answers.v2',exportedAt:new Date().toISOString(),count:verified.size,answers:exportRows()},null,2),
  'KVPV_TamTienVanDao_DapAnDung.json','application/json;charset=utf-8');}
function exportCSV(){
  const cell=x=>'"'+String(x??'').replace(/"/g,'""')+'"';
  const rows=[['Câu hỏi','Đáp án đúng','Thời gian xác nhận','Nguồn'],...exportRows().map(r=>[r.question,r.answerText,new Date(r.updatedAt).toISOString(),r.source])];
  return download('\ufeff'+rows.map(r=>r.map(cell).join(',')).join('\r\n'),'KVPV_TamTienVanDao_DapAnDung.csv','text/csv;charset=utf-8');
}
async function importJSON(file){
  if(!file||typeof file.text!=='function')throw Error('Chọn file .json/.jsonl cần phục hồi');
  const content=await file.text();
  let source;
  if(file.name?.toLowerCase().endsWith('.jsonl'))source=content.split(/\r?\n/).filter(Boolean).map(s=>JSON.parse(s));
  else{const data=JSON.parse(content);source=Array.isArray(data)?data:data?.answers;}
  if(!Array.isArray(source))throw Error('File thiếu mảng answers');
  await restorePromise;
  let added=0,skipped=0;
  for(const row of source){
    if(row?.serverConfirmed!==true||row?.source!=='server_result'||typeof row?.question!=='string'||typeof row?.answer!=='string'){
      skipped++;continue;
    }
    const questionKey=norm(row.question),answer=norm(row.answer);
    if(!questionKey||!answer||verified.has(questionKey)){skipped++;continue;}
    const restored={...row,questionKey,answer,serverConfirmed:true,source:'server_result',updatedAt:Number(row.updatedAt)||Date.now()};
    verified.set(questionKey,restored);writeRecord(restored);void appendToFile(restored);added++;
  }
  updatePanel();return {added,skipped,total:verified.size};
}
function status(){return {enabled:S.enabled,inside:inside(),reason:S.reason,lastError:S.error,
  knownAnswers:new Set([...legacy.keys(),...verified.keys()]).size,verifiedAnswers:verified.size,
  legacyUnverified:[...legacy.keys()].filter(q=>!verified.has(q)).length,selected:S.answered,learned:S.learned,
  question:S.question,autoJoin:true,continueAfterRewardLimit:true,
  indexedDBReady:S.ready,pendingWrites:S.pendingWrites,savedWrites:S.savedWrites,
  fileState:S.fileState,fileWrites:S.fileWrites,fileError:S.fileError,
  resultEvents:typeof W._Sa?.notify?.on==='function',unknownPolicy:'wait_no_guess',
  storage:'IndexedDB on this browser profile; optional user-authorized append-only .jsonl on PC; bounded by available disk/quota, not by a hardcoded question count'};}
function updatePanel(){
  if(!S.panel)return;
  const node=S.panel.querySelector('[data-quiz-state]');
  if(node)node.textContent=`Đã xác nhận ${verified.size} câu | Bộ nhớ: ${S.ready?'OK':'chưa sẵn sàng'} | File: ${S.fileState}`;
}
function panel(){
  if(S.panel?.isConnected){updatePanel();return S.panel;}
  const doc=W.document,box=doc.createElement('div');box.id='kvpv-quiz-backup-v2';
  box.style.cssText='position:fixed;right:16px;bottom:16px;z-index:2147483646;padding:12px;max-width:330px;background:#111827;color:#f9fafb;border:1px solid #6b7280;border-radius:10px;font:13px Arial,sans-serif;box-shadow:0 6px 20px #0007';
  const heading=doc.createElement('div');heading.textContent='Tầm Tiên Vấn Đạo — Lưu đáp án đúng';heading.style.cssText='font-weight:bold;margin-bottom:7px';box.appendChild(heading);
  const stat=doc.createElement('div');stat.dataset.quizState='1';stat.style.cssText='margin-bottom:8px;line-height:1.4';box.appendChild(stat);
  function button(label,fn){const b=doc.createElement('button');b.type='button';b.textContent=label;b.style.cssText='font:12px Arial;margin:3px;padding:5px 7px;cursor:pointer;border-radius:5px;background:#e5e7eb;color:#111827;border:0';b.addEventListener('click',()=>{
    try{Promise.resolve(fn()).then(updatePanel,error=>{S.fileError=String(error?.message||error);updatePanel();console.error('[KVPV QUIZ]',error);});}
    catch(error){S.fileError=String(error?.message||error);updatePanel();console.error('[KVPV QUIZ]',error);}
  });box.appendChild(b);return b;}
  button('Kết nối file tự lưu',()=>connectFile());
  button('Xuất JSON',()=>exportJSON());
  button('Xuất CSV',()=>exportCSV());
  button('Nhập JSON',()=>{const el=doc.createElement('input');el.type='file';el.accept='.json,.jsonl';el.style.display='none';doc.body.appendChild(el);el.addEventListener('change',async()=>{try{if(el.files?.[0])console.info('[KVPV QUIZ] import',await importJSON(el.files[0]));}catch(error){S.fileError=String(error?.message||error);console.error('[KVPV QUIZ]',error);}finally{el.remove();updatePanel();}},{once:true});el.click();});
  button('Đóng',()=>{box.remove();S.panel=null;});
  doc.body.appendChild(box);S.panel=box;updatePanel();return box;
}
function autoJoin(){
  const daily=W.KVPV_DAILY,q=daily?.quickState?.();
  if(daily?.config?.enableQuizAuto===false||W.KVPV?.events?.config?.enabled===false){S.reason='auto_join_disabled';return;}
  const st=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(69);
  if(Number(st?.[2])!==2){S.reason='waiting_event_open';return;}
  const cfg=W._ft?._po?.ins?.getCfgById?.(6901),api=W._Ba?._sst?._Cht?.inst;
  if(Number(cfg?.[7])!==69||W._Ba?._$a?.SceneUtil?.isCommonScene!==true||q?.job&&!['rảnh','ranh','idle'].includes(String(q.job))){S.reason='waiting_common_idle';return;}
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||typeof api?.rqEtScene!=='function'||api.checkEnterScene?.(6901,false)!==true){S.reason='waiting_native_entry';return;}
  const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh'}).format(new Date()),joinKey=day+'/6901';
  if(S.joinKey===joinKey){S.reason='entry_requested_wait_server';return;}
  const gate=W.KVPV?.core?.scene;if(gate?.acquire&&gate.acquire('daily','quiz-auto-entry')!==true){S.reason='scene_lease_denied';return;}
  S.joinKey=joinKey;try{api.rqEtScene(6901);S.reason='entry_requested';}finally{gate?.release?.('daily');}
}
function tick(){try{
  if(!S.enabled||!own())return;
  if(!inside()){S.lastResult=null;autoJoin();return;}
  const m=model(),r=m?.getCopyInfo?.();
  if(!Array.isArray(r)||typeof r[2]!=='string'||!Array.isArray(r[3])||r[3].length!==2||!r[3].every(x=>typeof x==='string')){S.reason='waiting_question';return;}
  const q=norm(r[2]),opts=r[3].map(norm),signature=JSON.stringify([r[2],r[3],r[5]]);
  S.question={text:r[2].slice(0,500),options:r[3].map(x=>x.slice(0,300)),phase:r[0]};
  if(r[0]===3&&[0,1].includes(r[4])){
    const resultKey=JSON.stringify([signature,r[4]]);
    if(S.lastResult!==resultKey){S.lastResult=resultKey;serverResult(r[2],r[3],r[4]);}
    S.reason='learned_server_result';return;
  }
  S.lastResult=null;
  if(r[0]!==1){S.reason='waiting_answer_phase';return;}
  const time=Number(W._Sa?.svrTime);
  if(!Number.isFinite(time)||!Number.isFinite(r[1])||r[1]<=time){S.reason='expired_or_unknown_clock';return;}
  const wanted=verified.get(q)?.answer??legacy.get(q);
  const indices=opts.map((x,i)=>x===wanted?i:-1).filter(i=>i>=0);
  if(indices.length!==1){S.reason='unknown_answer_no_guess';return;}
  if(S.selected===signature){S.reason='selected_once_wait_native';return;}
  if(m.getSyncChat?.()!==false){if(S.chatRequested!==signature&&typeof W._Ba?._vlt?._hcn?.ins?.setAnswerSyncChat==='function'){S.chatRequested=signature;W._Ba._vlt._hcn.ins.setAnswerSyncChat([false]);}S.reason='waiting_chat_disabled';return;}
  if(W._Ba?._rJ?._O$?.ins?.isDead!==false||typeof m.choiceAnswer!=='function'){S.reason='waiting_native_player';return;}
  S.selected=signature;S.answered++;m.choiceAnswer(indices[0],true);S.reason='selected_native_movement';
}catch(error){S.error=String(error?.message||error);S.reason='error_no_retry';}}
function stop(){S.enabled=false;for(const id of [6513,6514])W._Sa?.notify?.off?.(id,S,onResult);
  if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;
  if(S.panel){S.panel.remove();S.panel=null;}}
function onResult(){if(!S.enabled||!own())return;try{if(model()?.getCopyInfo?.()?.[0]===3)tick();}catch(error){S.error=String(error?.message||error);}}
W.KVPV_QUIZ_AUTO=Object.freeze({sync:tick,stop,status,panel,connectFile,exportJSON,exportCSV,importJSON,
  answerCount:()=>verified.size,allAnswers:()=>exportRows(),
  _handoff:()=>({actor,joinKey:S.joinKey,selected:S.selected,answered:S.answered,learned:S.learned,chatRequested:S.chatRequested})});
for(const id of [6513,6514])W._Sa?.notify?.on?.(id,S,onResult);
S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);
restorePromise=initialize();tick();
})();
