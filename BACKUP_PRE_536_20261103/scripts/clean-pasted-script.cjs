'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const acorn=require('internal/deps/acorn/acorn/dist/acorn');
const input=process.argv[2],output=process.argv[3];if(!input||!output)throw Error('Provide input and output files.');
const source=fs.readFileSync(input,'utf8'),options={ecmaVersion:'latest'};
const before=acorn.parse(source,options),tokens=Array.from(acorn.tokenizer(source,options));
let clean='',end=0;
for(const token of tokens){
 const gap=source.slice(end,token.start);
 if(clean&&gap)clean+=/[\r\n\u2028\u2029]/.test(gap)?'\n':' ';
 clean+=source.slice(token.start,token.end);end=token.end;
}
clean+='\n';
const after=acorn.parse(clean,options);
const ast=tree=>JSON.stringify(tree,(key,value)=>key==='start'||key==='end'?undefined:value);
assert.equal(ast(after),ast(before),'Cleanup changed the parsed program');
new vm.Script(clean);
const comments=[];acorn.parse(clean,{...options,onComment:comments});assert.equal(comments.length,0);
fs.writeFileSync(output,clean);
console.log(JSON.stringify({output,beforeBytes:Buffer.byteLength(source),afterBytes:Buffer.byteLength(clean),syntax:'OK',ast:'identical',comments:0}));
