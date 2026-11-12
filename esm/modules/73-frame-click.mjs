function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
function __captureESMMethod(receiver,key,kind){
  let owner=receiver;
  while(owner!==null&&(typeof owner==="object"||typeof owner==="function")&&!Object.prototype.hasOwnProperty.call(owner,key))owner=Object.getPrototypeOf(owner);
  if(owner===null)return undefined;
  const descriptor=Object.getOwnPropertyDescriptor(owner,key);
  return kind==="get"?descriptor.get:kind==="set"?descriptor.set:descriptor.value;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
export {__esmLocal0 as local_anonymous_1_1_0};
export {__esmLocal1 as local_stop_1};
export {__esmLocal2 as local_status_2};
export function initialize(){
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const w=window;
  w.KVPV_FRAME_CLICK?.stop?.();
  w.KVPV_FRAME_CLICK=Object.freeze({stop(){
__esmLocal1=__captureESMMethod(this,"stop","init");
},status:__captureESMFunction((__esmLocal2=(()=>({running:false,clicks:0,target:'extension_browser_input',note:'Click JavaScript đã tắt. Bật click cấp trình duyệt bằng popup extension KVPV.'}))),"status")});
})),""))();

}
export const api=Object.freeze({
});