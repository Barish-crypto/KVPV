
'use strict';

const crypto=require('node:crypto');

function packet(message){const body=Buffer.from(JSON.stringify(message),'utf8');if(body.length>1024*1024)throw Error('Native message too large');const header=Buffer.alloc(4);header.writeUInt32LE(body.length);return Buffer.concat([header,body]);}

function* payloadPackets(p){const size=128*1024,bytes=Buffer.from(p.full??p.bytes),sha256=crypto.createHash('sha256').update(bytes).digest('hex');yield {type:'begin',build:p.build,sha256,bytes:bytes.length,chunks:Math.ceil(bytes.length/size),actor:p.actor??null,modules:p.modules??[]};

 for(let i=0;i<bytes.length;i+=size)yield {type:'chunk',sha256,index:i/size,data:bytes.subarray(i,i+size).toString('base64')};yield {type:'end',sha256};}

class Parser{constructor(onMessage){this.onMessage=onMessage;this.buffer=Buffer.alloc(0);}push(chunk){this.buffer=Buffer.concat([this.buffer,chunk]);

 while(this.buffer.length>=4){const n=this.buffer.readUInt32LE();if(n>1024*1024)throw Error('Input message too large');if(this.buffer.length<n+4)return;

 const message=JSON.parse(this.buffer.subarray(4,n+4).toString('utf8'));this.buffer=this.buffer.subarray(n+4);if(!message||typeof message!=='object')throw Error('Invalid message');this.onMessage(message);}}}

module.exports={packet,payloadPackets,Parser};
