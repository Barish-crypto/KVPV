'use strict';
const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'..');
for(const file of ['src/00-far-scope.js','src/02-scene.js','src/06-range.js','src/08-range-evidence.js','src/09-modes.js','src/50-companion-combat.js']){
  let source=fs.readFileSync(path.join(root,file),'utf8');
  source=source.replaceAll("['LINH_LUNG','PHU_VAN']","['LINH_LUNG','PHU_VAN','TRU_TIEN']")
    .replaceAll("['THIEN_QUAN','LINH_LUNG','PHU_VAN']","['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN']");
  fs.writeFileSync(path.join(root,file),source);
}
const file=path.join(root,'test.cjs');let source=fs.readFileSync(file,'utf8');
if(!source.includes("'TEST_TRU_TIEN.cjs'"))source=source.split('\n').map(l=>l.startsWith('// [VI')?l:l.replace("'TEST_SCOPE.cjs',","'TEST_SCOPE.cjs','TEST_TRU_TIEN.cjs',")).join('\n');
fs.writeFileSync(file,source);
