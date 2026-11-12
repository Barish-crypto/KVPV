
 

(() => {

 'use strict';

 const W=window,old=W.KVPV_MONSTER_PLATE,carry=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),S={enabled:true,pending:carry?.actor===actor?carry.pending:null,confirmed:carry?.actor===actor?carry.confirmed:0};

 const model=()=>W._Ba?._Lk?._yQ?.instance;

 const level=(t,p)=>{const n=model()?.getEupByPart?.(t,p)?.[7]?.[3];return Number.isSafeInteger(n)&&n>=0?n:null;};

 function plan(){

  const m=model(),cfg=W._ft?.trgStrongCfg?.ins,bag=W._Ba?._Ic?._aQ?.ins,max=Number(m?.openMaxIndex);

  if(!Number.isInteger(max)||max<0||max>4)return null;

  for(let t=1;t<=max+1;t++)for(let p=1;p<=8;p++){

   const lv=level(t,p);if(lv===null)continue;

   const row=cfg?.getCfg?.(t,p,lv),next=cfg?.getCfg?.(t,p,lv+1),cost=cfg?.items?.(row,lv);

   const id=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag?.getItemCountById?.(id));

   if(next&&Number.isSafeInteger(id)&&id>0&&Number.isSafeInteger(need)&&need>0&&have>=need&&m.partCanStrong?.(t,p)===true)

    return {t,p,lv,id,need,signature:JSON.stringify([t,p,lv,id,need,have])};

  }return null;

 }

 function probe(){

  if(S.pending){const lv=level(S.pending.t,S.pending.p);if(lv!==null&&lv>S.pending.lv){S.pending=null;S.confirmed++;}}

  if(!S.enabled||!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED||S.pending||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return {ready:false};

  const p=plan();return p?{ready:typeof W._Ba?._Lk?._Qan?.ins?.strongEquip==='function',...p}:{ready:false};

 }

 function run(before){const p=probe();if(!p.ready||p.signature!==before.signature)throw Error('Quai Ban native state changed');

  S.pending={t:p.t,p:p.p,lv:p.lv};W._Ba._Lk._Qan.ins.strongEquip(p.t,p.p);

 }

 function stop(){S.enabled=false;W.KVPV_V8?.toggle?.('monster_plate_strength',false);}

 W.KVPV_MONSTER_PLATE=Object.freeze({probe,run,stop,status:()=>({enabled:S.enabled,pending:S.pending,confirmed:S.confirmed,allowKNB:false}),_handoff:()=>({actor,...S})});

 try{W.KVPV_V8?.register?.({id:'monster_plate_strength',name:'Cường hóa Quái Bàn',kind:'work',spend:'materials',verified:true,enabled:true,background:true,directDuringPve:true,redIds:[217,218,219,220,221,228],

  probe:()=>W.KVPV_MONSTER_PLATE.probe(),run:p=>W.KVPV_MONSTER_PLATE.run(p)});}catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}

 W.KVPV_V8?.toggle?.('monster_plate_strength',true);

})();

