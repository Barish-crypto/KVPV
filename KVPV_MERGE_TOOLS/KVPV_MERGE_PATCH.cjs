'use strict';
// Patch CURRENT project sources, not a stale FULL. Fails closed if anchors change.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(process.argv[2] || __dirname);
const targets = ['04-engine.js','08-range-evidence.js','76-trutien-pvp.js'];
const input = Object.fromEntries(targets.map(name => {
  const file = path.join(root,'src',name);
  if (!fs.existsSync(file)) throw new Error('Missing source: '+file);
  return [name, fs.readFileSync(file,'utf8')];
}));
let { ['04-engine.js']: engine, ['08-range-evidence.js']: range, ['76-trutien-pvp.js']: truTien } = input;
function replaceOnce(code, before, after, label){
  if (code.includes(after)) return code;
  const p=code.indexOf(before);
  if (p < 0 || code.indexOf(before,p+before.length)>=0) throw new Error('Unsafe/ambiguous patch: '+label);
  return code.slice(0,p)+after+code.slice(p+before.length);
}
// TQ visual matches legacy combo test but still protects game scene and native readiness.
range=replaceOnce(range,
 'thVisual=inTQ&&id>=1001&&id<=1008',
 'thVisual=id>=1001&&id<=1008&&inTQ','TH visual predicate');
// Legacy TH-only API must remain 1/9/30/99. Aggregate API allows 9999.
const thStart=range.indexOf('  function setTianQuanTuyetHocVisualSpeed(factor=99){');
const thEnd=range.indexOf('  function setTianQuanBasicVisualSpeed(',thStart);
if (thStart<0||thEnd<0) throw new Error('TH visual setter anchors changed');
let th=range.slice(thStart,thEnd);
if (th.includes('if(![1,9,30,99,9999].includes(factor))')) th=th.replace('if(![1,9,30,99,9999].includes(factor))','if(![1,9,30,99].includes(factor))');
if (!th.includes('if(![1,9,30,99].includes(factor))')) throw new Error('Unsupported TH setter layout');
th=th.replace("throw Error('TH visual speed must be 1, 9, 30, 99 or 9999')", "throw Error('TH visual speed must be 1, 9, 30 or 99')");
range=range.slice(0,thStart)+th+range.slice(thEnd);
const aggregateStart=range.indexOf('  function setTianQuanVisualSpeed(factor=9999){');
const aggregateEnd=range.indexOf('  function setBasicAnimationSpeed(',aggregateStart);
if (aggregateStart<0||aggregateEnd<0) throw new Error('Aggregate visual setter anchors changed');
const aggregate = `  function setTianQuanVisualSpeed(factor=9999){
    if(![1,9,30,99,9999].includes(factor))throw Error('TQ visual speed must be 1, 9, 30, 99 or 9999');
    // Keep the TH-only bounded public API intact; global x9999 is visual-only.
    if(factor===9999){
      setTianQuanBasicVisualSpeed(factor);
      CFG.tqTuyetHocVisualSpeed=9999;
    }else{
      setTianQuanTuyetHocVisualSpeed(factor);
      setTianQuanBasicVisualSpeed(factor);
    }
    return {factor,scope:'THIEN_QUAN',basic:[8001,8002,8003,8004,8005],tuyetHoc:[1001,1002,1003,1004,1005,1006,1007,1008],visualOnly:true,serverCooldownUnchanged:true};
  }
`;
range=range.slice(0,aggregateStart)+aggregate+range.slice(aggregateEnd);
// Restore exactly the original data property, but preserve any inherited/accessor descriptors.
range=replaceOnce(range,
 "if(own)Object.defineProperty(avatar,'getActionTween',own);",
 "if(own&&'value' in own&&own.writable)avatar.getActionTween=original;else if(own)Object.defineProperty(avatar,'getActionTween',own);",
 'transient animation hook restore');
// The existing priority coordinator is authoritative. Tu Vuot is purely background.
const gate=`  // Tu Vuot yields to every confirmed higher-priority activity (never counts as defeat).
  function tuVuotHigherPriority() {
    const W=window;
    const event=W.KVPV_EVENT_PRIORITY?.hold?.();
    if(event)return 'timed_event:'+String(event.key??'active');
    if(job)return 'daily_job';
    if(W.KVPV_BOSS_TEAM?.priority?.()===true)return 'boss_team';
    const owner=W.KVPV?.core?.scene?.status?.()?.owner;
    if(owner&&owner!=='stage')return 'scene_owner:'+String(owner);
    if(W.KVPV_GEAR36?.blocking?.())return 'gear_ack';
    return null;
  }
`;
if(!engine.includes('function tuVuotHigherPriority()')){
  engine=replaceOnce(engine, '  function tuVuotObserve() {',gate+'  function tuVuotObserve() {','stage gate declaration');
}
if(engine.includes('if(window.KVPV_EVENT_PRIORITY?.hold?.()) {')){
  engine=replaceOnce(engine,'if(window.KVPV_EVENT_PRIORITY?.hold?.()) {',
     "const higherPriority=tuVuotHigherPriority();\n    tuVuot.yieldReason=higherPriority||'';\n    if(higherPriority) {",'stage yield observer');
}else if(engine.includes('const higherPriority=tuVuotHigherPriority();')){
  if(!engine.includes("tuVuot.yieldReason=higherPriority||'';"))
    engine=replaceOnce(engine,'const higherPriority=tuVuotHigherPriority();',
      "const higherPriority=tuVuotHigherPriority();\n    tuVuot.yieldReason=higherPriority||'';",'stage yield status');
}else throw new Error('Tu Vuot observer gate not found');
engine=replaceOnce(engine,
 'if (window.KVPV_EVENT_PRIORITY?.hold?.()) return false; // Event schedule wins over Tu Vuot.',
 'if (tuVuotHigherPriority()) return false; // All priority activities win over Tu Vuot.',
 'Tu Vuot idle gate');
if(!engine.includes('yieldReason:')){
  engine=replaceOnce(engine, "stoppedAt:0, noticed:false", "stoppedAt:0, noticed:false,yieldReason:''", 'stage yield state');
  engine=replaceOnce(engine,'locked:tuVuot.stopped,reason:tuVuot.reason,',
     'locked:tuVuot.stopped,reason:tuVuot.reason,yieldReason:tuVuot.yieldReason,','stage yield status API');
}
// Reapply x9999 whenever the TRU TIEN module installs, also during LIVE_UPDATE.
const preset=`W[KEY]=Object.freeze({start,stop,status,tick,setFocusToSelected,setVisualSpeed});
// Visual-only preset; TQ does not alter server cooldown, hits or outgoing RPC.
try {
  W.KVPV_TH300?.setTianQuanVisualSpeed?.(9999);
  W[KEY]?.setVisualSpeed?.(9999);
} catch (e) {W.KVPV_V1?.diagnostics?.record?.(e);}
`;
truTien=replaceOnce(truTien,
 'W[KEY]=Object.freeze({start,stop,status,tick,setFocusToSelected,setVisualSpeed});',
 preset.trimEnd(),'persist visual preset on install/reload');
for(const required of ['thVisual=id>=1001&&id<=1008',
 'if(![1,9,30,99].includes(factor))','avatar.getActionTween=original',
 'CFG.tqTuyetHocVisualSpeed=9999'])if(!range.includes(required))throw Error('Missing TQ invariant: '+required);
if(!engine.includes('tuVuotHigherPriority()')||!engine.includes('yieldReason:'))throw Error('Missing stage arbitration');
if(!truTien.includes('setTianQuanVisualSpeed?.(9999)'))throw Error('Visual preset missing');
// All validation complete. Write only after checking every anchor.
for(const [name,content] of Object.entries({'04-engine.js':engine,'08-range-evidence.js':range,'76-trutien-pvp.js':truTien})){
 fs.writeFileSync(path.join(root,'src',name),content,'utf8');
}
process.stdout.write('MERGE PATCH APPLIED: stage arbitration + TH x99/9999 + transient hook restore + startup preset\n');
