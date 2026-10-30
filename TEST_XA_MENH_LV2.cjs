'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname,'src','32-xa-menh-lv2-cd0.js'), 'utf8');
const log = {info(){},warn(){}};

function start(initial = 30000) {
  const row = [30310002,3031,'Xá Mệnh',2,0,0,initial];
  const frame = {_ft:{_nY:{ins:{getCfgBySkillIdAndLv(id,lv){
    return id === 3031 && lv === 2 ? row : null;
  }}}}};
  const context = vm.createContext({window:frame,console:log});
  const load = () => vm.runInContext(source,context);
  load();
  return {row,frame,load};
}

const a = start();
assert.equal(a.row[6],30000,'never auto-enable');
assert.equal(a.frame.KVPV_XA_MENH_LV2.status().enabled,false);
assert.equal(a.frame.KVPV_XA_MENH_LV2.enable().enabled,true);
assert.equal(a.row[6],0);
a.load();
assert.equal(a.frame.KVPV_XA_MENH_LV2.status().enabled,true);
assert.equal(a.row[6],0);
a.frame.KVPV_XA_MENH_LV2.restore();
assert.equal(a.row[6],30000);

const b = start(25000);
assert.throws(() => b.frame.KVPV_XA_MENH_LV2.enable(), /Expected/);
assert.equal(b.row[6],25000);

const c = start();
c.frame.KVPV_XA_MENH_LV2.enable();
c.row[6]=12345;
c.frame.KVPV_XA_MENH_LV2.restore();
assert.equal(c.row[6],12345,'never overwrite third-party change');
console.log('PASS: Xá Mệnh Lv2 client-only experiment');
