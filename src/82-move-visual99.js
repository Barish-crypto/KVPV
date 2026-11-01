/* Movement animation visuals only. Never modify world coordinates, walk speed, RPC or cooldown. */
(()=>{'use strict';
const W=window,old=W.KVPV_MOVE_VISUAL99;old?.stop?.('reload');
const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
const S={enabled:true,timer:null,hook:null,applied:0,reason:'waiting_avatar',error:'',lastAction:null};
const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const excluded=()=>{
 const e=W.KVPV_TRANH_BA_TU_PHUONG?.status?.();
 if(e?.inside===true)return true;
 // Fail closed for uncertain event scene: do not accelerate when the event is
 // active but the map is not yet calibrated.
 if(e?.eventActive===true&&W._Ba?._$a?.SceneUtil?.isCommonScene===false&&
    (e.verifiedMap==null||Number(e.map)===Number(e.verifiedMap)))return true;
 return false;
};
function release(){const h=S.hook;if(!h)return;S.hook=null;
 try{if(h.avatar.getActionTween===h.wrapper){if(h.descriptor)Object.defineProperty(h.avatar,'getActionTween',h.descriptor);else delete h.avatar.getActionTween;}}
 catch(e){S.error=String(e?.message??e);}
}
const movement=a=>typeof a==='string'&&/^(?:run|walk|move|running|walking)(?:[_-].*)?$/i.test(a);
function tick(){
 try{
  if(!S.enabled||!owned()){release();S.reason='actor_or_disabled';return;}
  if(excluded()){release();S.reason='excluded_tranh_ba_tu_phuong';return;}
  const role=W._C?._Ba?.instance?.getRole?.(Number(actor));
  const combat=role?.getComponent?.(W._d?._Yct?._Het);
  const avatar=combat?._Qrt;
  if(!avatar||typeof avatar.getActionTween!=='function'){release();S.reason='waiting_avatar';return;}
  if(S.hook?.avatar===avatar&&avatar.getActionTween===S.hook.wrapper){S.reason='visual99_armed';return;}
  release();
  const original=avatar.getActionTween,descriptor=Object.getOwnPropertyDescriptor(avatar,'getActionTween');
  if(descriptor&&descriptor.configurable===false){S.reason='native_visual_nonconfigurable';return;}
  const wrapper=function(...args){
   if(S.enabled&&owned()&&!excluded()&&movement(args[0])){
    const speed=Number(args[2]??1);
    if(Number.isFinite(speed)&&speed>0){args[2]=Math.min(9999,speed*99);S.applied++;S.lastAction=args[0];}
   }
   return original.apply(this,args);
  };
  Object.defineProperty(avatar,'getActionTween',{configurable:true,writable:true,enumerable:descriptor?.enumerable??false,value:wrapper});
  S.hook={avatar,descriptor,wrapper};S.reason='visual99_armed';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
function stop(reason='stopped'){S.enabled=false;release();const clear=W.KVPV_V1?.timers?.clearInterval??W.clearInterval;if(S.timer!=null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
function status(){return {enabled:S.enabled,actorMatch:!!owned(),excluded:excluded(),pollMs:1,visualFactor:99,hookActive:!!S.hook,applied:S.applied,lastAction:S.lastAction,reason:S.reason,error:S.error,visualOnly:true,nativeMovementPreserved:true};}
W.KVPV_MOVE_VISUAL99=Object.freeze({tick,stop,status});
const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,1);
tick();
})();