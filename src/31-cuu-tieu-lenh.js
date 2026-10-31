/* Cửu Tiêu Lệnh: safe native-UI task acceptance adapter.
 * Default observe-only until a verified native adapter is registered.
 * No RPC fabrication, premium purchase, or repeated unconfirmed claims. */
(() => {
 'use strict';
 const W=window, old=W.KVPV_CUU_TIEU_LENH;
 old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const S={enabled:true,timer:null,reason:'waiting_verified_native_adapter',attempts:0,lastError:'',lastKey:'',lastAt:0,adapter:null};
 const normalize=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/\s+/g,' ').trim();
 const own=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&W.__KVPV_UNIVERSAL_HALTED!==true&&W.document?.hidden!==true;
 function status(){return {enabled:S.enabled,reason:S.reason,attempts:S.attempts,lastError:S.lastError,adapterReady:!!S.adapter,lastKey:S.lastKey,allowKNB:false};}
 function registerNativeAdapter(adapter){
   // Explicitly registered, previously verified adapter. No undocumented client calls.
   if(!adapter||typeof adapter.inspect!=='function'||typeof adapter.accept!=='function')throw Error('Verified inspect and accept callbacks required');
   S.adapter=adapter;S.reason='adapter_registered';return status();
 }
 function tick(){
   if(!S.enabled||!own()){S.reason='waiting_own_visible_actor';return;}
   if(W.KVPV_EVENT_PRIORITY?.hold?.()||W.KVPV_ENTRY_POLICY?.manual===true){S.reason='yield_to_priority';return;}
   if(!S.adapter){S.reason='waiting_verified_native_adapter';return;}
   try{
     const info=S.adapter.inspect();
     if(!info||normalize(info.title)!=='cuu tieu lenh'||info.action!=='accept_quest'){
       S.reason='waiting_cuu_tieu_lenh_accept';return;
     }
     if(info.visible!==true||info.enabled!==true||info.free!==true||info.costVerified!==true||typeof info.key!=='string'||!info.key){
       S.reason='unverified_or_paid_action';return;
     }
     if(S.lastKey===info.key){S.reason='already_requested_awaiting_confirmation';return;}
     if(Date.now()-S.lastAt<1500){S.reason='request_rate_limited';return;}
     // Mark before action to prevent repeat after synchronous errors.
     S.lastKey=info.key;S.lastAt=Date.now();S.attempts++;
     S.adapter.accept(info.key);
     S.reason='accept_requested_awaiting_native_confirmation';
   }catch(e){S.lastError=String(e?.message??e);S.reason='adapter_error_no_retry';}
 }
 function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;}
 function start(){S.enabled=true;if(S.timer!==null)return status();const set=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof set==='function')S.timer=set(tick,500);return status();}
 W.KVPV_CUU_TIEU_LENH=Object.freeze({start,stop,tick,status,registerNativeAdapter});
 start();
})();
