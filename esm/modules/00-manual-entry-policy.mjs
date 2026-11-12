import {getKVPV_ENTRY_POLICY as __getKVPV0} from '../api.mjs';
export function initialize(){

/* User requested all Auto Daily and dungeon/boss automation resumed. */

window.KVPV_ENTRY_POLICY=Object.freeze({manual:false,idleDaily:false});


}
export {getKVPV_ENTRY_POLICY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_ENTRY_POLICY(){return globalThis.KVPV_ENTRY_POLICY;},
});