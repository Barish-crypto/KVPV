'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const acorn=require('internal/deps/acorn/acorn/dist/acorn');
function strip(source){
 const comments=[];acorn.parse(source,{ecmaVersion:'latest',onComment:comments});let clean='',last=0;
 for(const c of comments){clean+=source.slice(last,c.start)+' '+source.slice(c.start,c.end).replace(/[^\r\n]/g,'');last=c.end;}
 clean+=source.slice(last);new vm.Script(clean);
 const tokens=s=>Array.from(acorn.tokenizer(s,{ecmaVersion:'latest'}),t=>[t.type.label,s.slice(t.start,t.end)]);
 assert.deepEqual(tokens(clean),tokens(source));return clean;
}
fs.writeFileSync('KVPV_FULL_KHONG_CHU_THICH.js',strip(fs.readFileSync('KVPV_V1_FULL.js','utf8')));
const patch="(() => {\nif(!window.KVPV_BASIC10||!window.KVPV_ROAD_CADENCE||String(window.__KVPV_OWN_ACTOR_ID)!==String(window._Ba?._rJ?._O$?.ins?.actorId))throw Error('Chạy trong đúng game-frame đã nạp FULL.');\n"+
 ['src/59-road-cadence.js','src/12-basic-outside.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n')+
 "\nwindow.KVPV_ROAD_CADENCE.setMinCastInterval(100);window.KVPV_ROAD_CADENCE.start();window.KVPV_BASIC10.sync();console.info('[KVPV] Thí Luyện: native, tối thiểu 100ms, hỗ trợ mỗi 100ms, áp sát tối đa 1 lần/giây.');\n})();\n";
fs.writeFileSync('KVPV_THI_LUYEN_ON_DINH.js',strip(patch));
console.log('Exported comment-free FULL and Road Trial patch; syntax and token equivalence verified.');
