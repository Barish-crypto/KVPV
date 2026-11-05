'use strict';
const fs=require('node:fs'),vm=require('node:vm');
const source=";(() => {\nif(!window.KVPV_MODE||!window.KVPV_TH300||String(window.__KVPV_OWN_ACTOR_ID||'')!==String(window._Ba?._rJ?._O$?.ins?.actorId||'')||!window.__KVPV_OWN_ACTOR_ID)throw Error('Chạy trong game-frame đã nạp FULL.');\nwindow.KVPV_MODE.stop('Cập nhật 5 tay + Tuyệt Học');\n"+
 ['src/00-combat-metrics.js','src/00-tq-basic-profile.js','src/08-range-evidence.js'].map(p=>fs.readFileSync(p,'utf8')).join('\n')+
 "\nwindow.KVPV_TH300.setBasicOnly(false);window.KVPV_TH300.setInterleaved(true,302);window.KVPV_TH300.setBasicHitQuota(null);window.KVPV_TH300.setTianQuanFiveBasics(true,10);window.KVPV_TH300.setTianQuanTuyetHoc(true);window.KVPV_MODE.armTianQuan();console.info('[KVPV] Thiên Quan: 5 chiêu tay xen Tuyệt Học đã hồi, wait 10ms.');\n})();\n";
new vm.Script(source);fs.writeFileSync('KVPV_TQ_5_TAY_THEM_TH_SOURCE.js',source);
