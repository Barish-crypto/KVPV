
 

'use strict';

const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');

const {readArtifact}=require('./live/project.cjs');

const {probe}=require('./live/core.cjs');

const root=__dirname,artifact=readArtifact(root),dir=path.join(root,'android');

fs.mkdirSync(dir,{recursive:true});

const loader=fs.readFileSync(path.join(dir,'loader.js'),'utf8');

const metadata=`// ==UserScript==
// @name         KVPV FULL Android
// @namespace    kvpv.local.android
// @version      1.0.1
// @description  FULL ngoại tuyến; chỉ khởi động trong frame game Kiếm Vũ Phong Vân 1046. Build ${artifact.build}
// @match        http://*/*
// @match        https://*/*
// @run-at       document-idle
// @grant        none
// @sandbox      raw
// @updateURL    none
// ==/UserScript==
`;

const source=metadata+loader.replace('/* BUILD_ID */',JSON.stringify(artifact.build))

  .replace('/* READINESS */',probe).replace('/* FULL_BUNDLE */',artifact.full);

new vm.Script(source,{filename:'KVPV_ANDROID.user.js'});

fs.writeFileSync(path.join(dir,'KVPV_ANDROID.user.js'),source);



const data=Buffer.from(source),name=Buffer.from('KVPV_ANDROID.user.js');

const crc=require('node:zlib').crc32(data);

const local=Buffer.alloc(30);local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);

local.writeUInt32LE(crc,14);local.writeUInt32LE(data.length,18);local.writeUInt32LE(data.length,22);local.writeUInt16LE(name.length,26);

const central=Buffer.alloc(46);central.writeUInt32LE(0x02014b50);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);

central.writeUInt32LE(crc,16);central.writeUInt32LE(data.length,20);central.writeUInt32LE(data.length,24);central.writeUInt16LE(name.length,28);

const end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(1,8);end.writeUInt16LE(1,10);

end.writeUInt32LE(central.length+name.length,12);end.writeUInt32LE(local.length+name.length+data.length,16);

fs.writeFileSync(path.join(dir,'KVPV_ANDROID.zip'),Buffer.concat([local,name,data,central,name,end]));

console.log('Built Android userscript + import ZIP '+artifact.build);

