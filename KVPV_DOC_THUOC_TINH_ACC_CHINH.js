(() => {
  'use strict';
  const W=window,expected='10228867268946',model=W._Ba?._rJ?._O$?.ins;
  if(String(model?.actorId??'')!==expected)throw Error('Chạy trong game-frame của acc chính 10228867268946.');
  const cfg=W._ft?._zJ?.ins,format=W._ft?.AttrUtil;
  if(!cfg||typeof cfg.getCfgById!=='function')throw Error('Chưa có bảng thuộc tính native.');
  const read=fn=>{try{return fn()??null;}catch{return null;}};
  const pack=(v,d=0)=>{if(v===null||['string','boolean'].includes(typeof v))return v;if(typeof v==='number')return Number.isFinite(v)?v:null;if(d>4)return null;if(Array.isArray(v))return v.slice(0,100).map(x=>pack(x,d+1));return null;};
  const totals=read(()=>model.playerTotolAttrs);
  if(!Array.isArray(totals))throw Error('Chưa có playerTotolAttrs từ game.');
  const base=[1,2,3,4,5,6,7,8],display=[161,162,15,21,10,11,13,14,141,142,167,301,302,303,304,305,306,307,308,309,310,311,312,313,314];
  const rare=read(()=>cfg.getRareIds()),ids=[...new Set([...base,...display,...(Array.isArray(rare)?rare:[]),...totals.map(r=>r?.[0])].map(Number).filter(x=>Number.isSafeInteger(x)&&x>0))].slice(0,512);
  const attributes=ids.map(id=>{
    const c=read(()=>cfg.getCfgById(id)),r=read(()=>cfg.getRareCfgById?.(id)),value=totals.find(row=>Number(row?.[0])===id)?.[1]??0;
    return {id,name:typeof c?.[1]==='string'?c[1]:null,rawValue:pack(value),percentDisplay:!!c?.[2],displayValue:c?read(()=>c[2]?String(format.fmtFloatNum(value))+'%':String(Math.round(value))):null,description:typeof r?.[1]==='string'?r[1]:null,sourceWays:pack(r?.[2]),attributeConfig:pack(c),rareConfig:pack(r)};
  });
  const result={version:1,at:Date.now(),actor:String(model.actorId),level:read(()=>model.level),scene:String(W._C?._Mn?._Cn?.currentID??''),attributes,limits:'Snapshot of the main account client model and native attribute descriptions. No requests, timers, combat actions or attribute edits. A percentage display flag is not a server damage formula.'};
  W.KVPV_MAIN_ATTRIBUTES=Object.freeze({report:()=>JSON.parse(JSON.stringify(result)),export:()=>JSON.stringify(result,null,2)});
  console.table(attributes.filter(r=>base.includes(r.id)||display.includes(r.id)).map(({id,name,displayValue,description})=>({id,name,value:displayValue,description})));
  console.log('[KVPV main attributes]',result);
})();
