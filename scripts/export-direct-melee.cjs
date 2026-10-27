'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let source=fs.readFileSync('KVPV_BOSS_AP_SAT_THU.js','utf8');
const gate=source.split(/\r?\n/).filter(line=>line.includes('const forecast=')||line.includes('const predicted=')||line.includes("Chưa có cửa sổ áp sát đủ tin cậy"));
assert.equal(gate.length,3);for(const line of gate)source=source.replace(line,'');
source=source.replace('endsAt=start+Math.min(1200,predicted.eta-1500)','endsAt=start+5000')
 .replace('version:2,running','version:3,running')
 .replace('maxExposureMs:1200','maxExposureMs:5000,requiresForecast:false')
 .replace('  const observer={};',"  const observer={};\n  const selector=role.getComponent?.(W._d?._Yct?._Eet);let selectorHook=null;\n  if(typeof selector?._f7t!=='function')throw Error('Chưa có bộ chọn skill native; chưa thử áp sát.');\n  const near=()=>{const a=prop(role,'position'),b=prop(target,'position');return !!a&&!!b&&[a.x,a.y,b.x,b.y].every(Number.isFinite)&&Math.hypot(a.x-b.x,a.y-b.y)<=90;};")
 .replace("      hitrun.stop('Kết thúc thử áp sát');", "      hitrun.stop('Kết thúc thử áp sát');\n      if(selectorHook&&selector._f7t===selectorHook.fn){if(selectorHook.descriptor)Object.defineProperty(selector,'_f7t',selectorHook.descriptor);else delete selector._f7t;}")
 .replace("    const descriptor=Object.getOwnPropertyDescriptor(combat,'combat'),native=combat.combat;", "    const sd=Object.getOwnPropertyDescriptor(selector,'_f7t'),sn=selector._f7t;if(sd?.configurable===false)throw Error('Không tạm giữ được chọn skill; hủy thử.');\n    const sf=function(...args){if(!near()||castRequested||fired||tookHit||pendingRestore||Date.now()>=endsAt)return -1;return sn.apply(this,args);};\n    Object.defineProperty(selector,'_f7t',{value:sf,configurable:true,writable:true});selectorHook={fn:sf,descriptor:sd};\n    const descriptor=Object.getOwnPropertyDescriptor(combat,'combat'),native=combat.combat;")
 .replace("if(castRequested||fired||tookHit||pendingRestore||Date.now()>=endsAt)return undefined;castRequested=true;return native.apply(this,args);", "if(castRequested||fired||tookHit||pendingRestore||Date.now()>=endsAt)return undefined;const a=prop(role,'position'),b=prop(target,'position');if(!a||!b||![a.x,a.y,b.x,b.y].every(Number.isFinite)||Math.hypot(a.x-b.x,a.y-b.y)>90)return undefined;castRequested=true;return native.apply(this,args);")
 .replace('Áp sát có điều kiện: tối đa một lần tung chiêu hoặc 1,2 giây rồi khôi phục đánh xa. Không áp sát khi thiếu dự báo.', 'Thử áp sát 80 đơn vị: tối đa một lần tung chiêu khi vào gần hoặc 5 giây rồi khôi phục đánh xa. Chạy trực tiếp, không yêu cầu dự báo; vẫn có thể trúng đòn Boss.');
new vm.Script(source);assert(!source.includes('predicted.eta'));assert(source.includes('Math.hypot(a.x-b.x,a.y-b.y)>90'));
fs.writeFileSync('KVPV_BOSS_AP_SAT_TRUC_TIEP.js',source);
console.log('Exported direct melee trial: no forecast prerequisite, 80-unit approach, native cast only within 90, one-call limit and 5-second timeout.');
