/* Kiểm tra SHA256 và AST của các nguồn JavaScript đã thêm chú thích trực tiếp. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),report=JSON.parse(fs.readFileSync(path.join(__dirname,'inline-source-manifest.json'),'utf8'));
const parserModule={exports:{}};
new Function('exports','module',process.binding('natives')['internal/deps/acorn/acorn/dist/acorn'])(parserModule.exports,parserModule);
const parser=parserModule.exports;
function ast(source){
  const text=source.replace(/\/\* (?:BUILD_ID|READINESS) \*\//g,m=>'0'+' '.repeat(m.length-1));
  let tree;try{tree=parser.parse(text,{ecmaVersion:'latest',sourceType:'script',allowHashBang:true});}catch(e){tree=parser.parse(text,{ecmaVersion:'latest',sourceType:'module',allowHashBang:true});}
  return JSON.stringify(tree,(key,value)=>['start','end','loc','raw'].includes(key)?undefined:value);
}
for(const row of report.records){
  const current=fs.readFileSync(path.join(root,row.file),'utf8'),before=fs.readFileSync(path.join(report.backup,row.file),'utf8');
  if(crypto.createHash('sha256').update(current).digest('hex')!==row.after)throw Error('Nguồn đã đổi sau khi tạo chú thích: '+row.file);
  if(ast(current)!==ast(before))throw Error('Cấu trúc chương trình thay đổi: '+row.file);
}
const result={checkedAt:new Date().toISOString(),files:report.files,originalLines:report.originalLines,allHashesMatch:true,allASTsMatch:true,backup:report.backup};
fs.writeFileSync(path.join(__dirname,'verification.json'),JSON.stringify(result,null,2)+'\n');
console.log(`PASS: ${report.files} file JavaScript gốc có chú thích trực tiếp; SHA256 khớp và AST không đổi so với trước khi thêm chú thích.`);
