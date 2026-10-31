/* Four independent asynchronous read-only status scanners.
 * No automatic upgrades, purchases, item use, RPC or hidden UI opening. */
(() => {
 'use strict';
 const W=window,prev=W.KVPV_FOUR_SCANS;
 prev?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const keys=['luyen_khi','phap_thuat','tui','tien_phu'];
 const readers=Object.create(null),lanes=Object.fromEntries(keys.map(key=>[key,{count:0,updatedAt:0,reason:'waiting_reader',error:'',value:null,busy:false}]));
 const intervals={luyen_khi:1500,phap_thuat:1700,tui:1200,tien_phu:1900},timers=new Map();
 let enabled=true,generation=0;
 const owned=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED&&W.document?.hidden!==true;
 const safe=value=>{if(value===undefined)return null;try{return JSON.parse(JSON.stringify(value));}catch(_){return {unserializable:true};}};
 // Existing native bag model can be observed without invoking a method.
 readers.tui=()=>{const m=W._Ba?._aJ?._hJ?.ins;return m?{available:true}:null;};
 function registerReader(key,fn){if(!keys.includes(key)||typeof fn!=='function')throw Error('Unknown lane or non-function reader');readers[key]=fn;lanes[key].reason='reader_registered';return status();}
 async function scan(key){
   const lane=lanes[key];if(!enabled||lane.busy)return;
   if(!owned()){lane.reason='waiting_own_visible_actor';return;}
   const reader=readers[key];if(typeof reader!=='function'){lane.reason='waiting_verified_reader';return;}
   lane.busy=true;const token=generation;
   try{
     const data=await reader();
     if(!enabled||token!==generation)return;
     lane.value=safe(data);lane.count++;lane.updatedAt=Date.now();lane.reason=data==null?'waiting_native_model':'observed';lane.error='';
   }catch(e){if(enabled&&token===generation){lane.reason='reader_error';lane.error=String(e?.message??e);}}
   finally{lane.busy=false;}
 }
 function status(){return {enabled,actor,readOnly:true,allowKNB:false,lanes:Object.fromEntries(keys.map(k=>[k,{...lanes[k],intervalMs:intervals[k],readerReady:typeof readers[k]==='function'}]))};}
 function stop(){enabled=false;generation++;for(const [key,id] of timers){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(id);}timers.clear();}
 function start(){if(timers.size)return status();enabled=true;const set=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof set!=='function')return status();for(const key of keys){timers.set(key,set(()=>{void scan(key);},intervals[key]));void scan(key);}return status();}
 W.KVPV_FOUR_SCANS=Object.freeze({start,stop,status,scan,registerReader});
 start();
})();
