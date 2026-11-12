
/* Native progression for approved equipment, mount and pet categories.
 * Shared parallel dispatcher; a single module pending latch prevents duplicate sends.
 * Server level/EXP acknowledges progress; pending survives hot reload.
 * Divine Weapon, Wings, Fashion, Arm, Cloak and mount/pet feed stones are
 * excluded by policy; remaining eligible progression uses owned materials.
 * Legacy feed senders are suspended only after their pending work drains. */

(() => {

  'use strict';

  const W=window,old=W.KVPV_APPEARANCE_AUTO,carry=old?._handoff?.();
  // A previous live version can stop against a newly reset V8 registry.
  // Ignore only missing module IDs; other teardown errors still abort reload.
  const missingQueueModule=e=>/Khong tim thay module|Không tìm thấy module|module not found|module does not exist/i.test(String(e?.message??e));
  try{old?.stop?.('reload');}catch(e){if(!missingQueueModule(e))throw e;}

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

  const S={enabled:true,timer:null,pending:same?carry.pending:null,saved:same?carry.saved:null,savedPet:same?(carry.savedPet??null):null,savedMount:same?(carry.savedMount??null):null,

    requests:same?carry.requests:0,confirmed:same?carry.confirmed:0,reason:'waiting',lastError:'',registered:false,lastMountRefresh:-Infinity};

  const definitions=[

    {key:'weapon',label:'Thần Binh',level:()=>W._Ba?._M4?._HJ?.inst?.otherValue?.['Tăng cấp'],

      cfg:n=>W._ft?._r$?.ins?.getShengjiCfgByLv?.(n),rpc:()=>W._Ba?._M4?._j6t?.inst,method:'fdShbing'},

    {key:'wing',label:'Linh Dực',level:()=>W._Ba?._RJ?._DJ?.ins?.otherValue?.['Tăng cấp'],

      cfg:n=>W._ft?._PZ?.ins?.getShengjiCfgByLv?.(n),rpc:()=>W._Ba?._RJ?._R6t?.ins,method:'feedSb'},

    {key:'fashion',label:'Thời Trang',level:()=>W._Ba?._KJ?._qJ?.inst?.fashInfo?.[0],

      cfg:n=>W._ft?._Iqt?.ins?.getCfgByLevel?.(n),rpc:()=>W._Ba?._KJ?._Ejt?.inst,method:'fdFash'},

    {key:'arm',label:'Linh Tí',level:()=>W._Ba?._UJ?._XJ?.ins?.handInfo?.[0],

      cfg:n=>W._ft?._BKt?.ins?.getCfgByLevel?.(n),rpc:()=>W._Ba?._UJ?._Ujt?.ins,method:'feedHand'},

    {key:'cloak',label:'Tăng cấp Phi Phong',level:()=>W._Ba?._JJ?._QJ?.inst?.otherValue?.['Tăng cấp'],

      cfg:n=>W._ft?._o$?.ins?.getShengjiCfgByLv?.(n),rpc:()=>W._Ba?._JJ?._Oun?.inst,method:'fdShbing'},

    {key:'jewelry',label:'Tăng cấp Trang Sức',level:()=>W._Ba?.__W?._$J?.inst?.hlInfo?.[0],exp:()=>W._Ba?.__W?._$J?.inst?.hlInfo?.[1],

      cfg:n=>W._ft?._CBn?.ins?.getCfgByLevel?.(n),cost:()=>{const c=W._ft?._gY?.ins?.getCfgById?.(242001)?.[2];return c?[c[0],1,c[1]]:null;},

      rpc:()=>W._Ba?.__W?._Kon?.inst,method:'fdHl'},

    {key:'mount',label:'Bồi dưỡng Thú Cưỡi',level:()=>W._Ba?._YJ?._WJ?.ins?.feed?.[0],

      exp:()=>W._Ba?._YJ?._WJ?.ins?.feed?.[1],costIndex:2,

      cfg:n=>W._ft?.__qt?.ins?.getPetFeedCfgByLv?.(n),rpc:()=>W._Ba?._YJ?._bgt?.ins,method:'feedRide'}

  ];

  definitions.push(

    {key:'weapon_illusion',label:'Ảo Hóa Thần Binh',illusion:true,redPointKeys:[23,24,25,26,872,642,643,644,645,955],model:()=>W._Ba?._M4?._HJ?.inst,

      list:m=>m?.hhuaLst,cfg:(id,lv)=>W._ft?._r$?.ins?.getHuanhuaCfgByIdAndLev?.(id,lv),rpc:()=>W._Ba?._M4?._j6t?.inst,method:'mgcLv'},

    {key:'wing_illusion',label:'Ảo Hóa Linh Dực',illusion:true,redPointKeys:[29,30,31,32,871],model:()=>W._Ba?._RJ?._DJ?.ins,

      list:m=>m?.huanhuaLs,cfg:(id,lv)=>W._ft?._PZ?.ins?.getHuanhuaCfgByIdAndLv?.(id,lv),rpc:()=>W._Ba?._RJ?._R6t?.ins,method:'magicLev'},

    {key:'weapon_skill',label:'Kỹ năng Thần Binh',skill:true,feed:true,model:()=>W._Ba?._M4?._HJ?.inst,list:m=>m?.skillLst,rpc:()=>W._Ba?._M4?._j6t?.inst,method:'skillLv'},

    {key:'wing_skill',label:'Kỹ năng Linh Dực',skill:true,feed:true,model:()=>W._Ba?._RJ?._DJ?.ins,list:m=>m?.skillLs,rpc:()=>W._Ba?._RJ?._R6t?.ins,method:'skillLev'},

    {key:'fashion_skill',label:'Kỹ năng Thời Trang',skill:true,model:()=>W._Ba?._KJ?._qJ?.inst,list:m=>m?.fashInfo?.[1],rpc:()=>W._Ba?._KJ?._Ejt?.inst,method:'addFashSkillLvl',scalar:true},

    {key:'arm_skill',label:'Kỹ năng Linh Tí',skill:true,model:()=>W._Ba?._UJ?._XJ?.ins,list:m=>m?.handInfo?.[1],rpc:()=>W._Ba?._UJ?._Ujt?.ins,method:'addHandSkillLev',scalar:true},

    {key:'mount_skill',label:'Kỹ năng Thú Cưỡi',skill:true,model:()=>W._Ba?._YJ?._WJ?.ins,list:m=>m?.feed?.[2],rpc:()=>W._Ba?._YJ?._bgt?.ins,method:'addRideSkillLevel',mountSkill:true},

    {key:'pet_skill',label:'Kỹ năng Linh Thú',skill:true,model:()=>W._Ba?._OJ?._GJ?.inst,list:m=>m?.fdSkills,rpc:()=>W._Ba?._OJ?._VBn?.inst,method:'skillUp',mountSkill:true});

  for(const group of ['jewelry'])for(let type=0;type<4;type++){

    const cloak=group==='cloak',model=()=>cloak?W._Ba?._JJ?._QJ?.inst:W._Ba?.__W?._$J?.inst;

    definitions.push({key:group+'_soul_'+type,label:'Phụ Hồn '+(cloak?'Phi Phong':'Trang Sức')+' '+(type+1),soulType:type,requireActorLevel:true,costIndex:2,

      level:()=>{const m=model();if(cloak)return m?._kat&&typeof m.getFhunLstByType==='function'?m.getFhunLstByType(type)?.[1]??0:undefined;

        const rows=m?.hlInfo?.[8];return soulLevel(rows,type);},

      cfg:n=>cloak?W._ft?._o$?.ins?.getFuhunCfgByTypeAndLev?.(type,n):W._ft?._pLi?.ins?.getCfgByTypeAndLv?.(type,n),

      rpc:()=>cloak?W._Ba?._JJ?._Oun?.inst:W._Ba?.__W?._Kon?.inst,method:cloak?'refLv':'addHlRefine'});

  }

  definitions.push(

    {key:'cloak_skill',label:'Kỹ năng Phi Phong',skill:true,model:()=>W._Ba?._JJ?._QJ?.inst,list:m=>m?.skillLst,rpc:()=>W._Ba?._JJ?._Oun?.inst,method:'skillLv'},

    {key:'jewelry_skill',label:'Kỹ năng Trang Sức',skill:true,model:()=>W._Ba?.__W?._$J?.inst,list:m=>m?.hlInfo?.[2],rpc:()=>W._Ba?.__W?._Kon?.inst,method:'addHlSkillLv',scalar:true});

  function arrayIllusions(rows){return Array.isArray(rows)?{keys:rows.map(r=>r[0]),get:id=>rows.find(r=>Number(r?.[0])===Number(id))}:null;}

  for(const d of definitions.filter(d=>d.illusion)){

    const wing=d.key==='wing_illusion';d.ids=()=>{const c=wing?W._ft?._PZ?.ins:W._ft?._r$?.ins;return c?.getHuanhuaShowIds?.()??c?.getShowIds?.()??[];};

  }

  for(const group of ['fashion','arm','jewelry','cloak']){

    const fashion=group==='fashion',arm=group==='arm',jewelry=group==='jewelry';

    const config=()=>fashion?W._ft?._Eqt?.ins:arm?W._ft?._VKt?.ins:jewelry?W._ft?._iSn?.ins:W._ft?._o$?.ins;

    const model=()=>fashion?W._Ba?._KJ?._qJ?.inst:arm?W._Ba?._UJ?._XJ?.ins:jewelry?W._Ba?.__W?._$J?.inst:W._Ba?._JJ?._QJ?.inst;

    definitions.push({key:group+'_illusion',label:'Ảo Hóa '+({fashion:'Thời Trang',arm:'Linh Tí',jewelry:'Trang Sức',cloak:'Phi Phong'}[group]),illusion:true,redPointKeys:fashion?[145,144,146,147,873]:arm?[152,151,153,154,874]:undefined,model,

      list:m=>fashion?arrayIllusions(m?.fashInfo?.[4]):arm?arrayIllusions(m?.handInfo?.[4]):jewelry?arrayIllusions(m?.hlInfo?.[5]):m?.hhuaLst,

      ids:()=>config()?.getShowIds?.()??config()?.getHuanhuaShowIds?.()??[],

      cfg:(id,lv)=>jewelry?config()?.getCfgByIdAndLv?.(id,lv):fashion||arm?config()?.getCfgByShowIdAndLevel?.(id,lv):config()?.getHuanhuaCfgByIdAndLev?.(id,lv),

      costs:fashion?row=>{const c=model()?.getActLst?.(row);return c?[c]:[];}:null,

      rpc:()=>fashion?W._Ba?._KJ?._Ejt?.inst:arm?W._Ba?._UJ?._Ujt?.ins:jewelry?W._Ba?.__W?._Kon?.inst:W._Ba?._JJ?._Oun?.inst,

      method:fashion?'addFashMgcShow':arm?'addHandMagShow':jewelry?'addHlMgcShow':'mgcLv',scalar:fashion||arm||jewelry});

  }

  definitions.push({key:'pet',label:'Bồi dưỡng Linh Thú',level:()=>W._Ba?._OJ?._GJ?.inst?.fd?.[0],exp:()=>W._Ba?._OJ?._GJ?.inst?.fd?.[1],costIndex:2,

    cfg:n=>W._ft?._XZ?.ins?.getPetFeedCfgByLv?.(n),rpc:()=>W._Ba?._OJ?._VBn?.inst,method:'fdPet'});

  for(const pet of [false,true]){

    const prefix=pet?'pet':'mount',model=()=>pet?W._Ba?._OJ?._GJ?.inst:W._Ba?._YJ?._WJ?.ins;

    const rpc=()=>pet?W._Ba?._OJ?._VBn?.inst:W._Ba?._YJ?._bgt?.ins;

    definitions.push({key:prefix+'_rank',label:'Tiến cấp '+(pet?'Linh Thú':'Thú Cưỡi'),level:()=>model()?.rank?.[0],exp:()=>model()?.rank?.[1],costIndex:2,

      allowed:()=>pet?model()?._bolZD===false:model()?.bollZiDong===false,

      cfg:n=>(pet?W._ft?._nqt?.ins:W._ft?._lDt?.ins)?.getPetRankCfgBySt?.(n),rpc,method:pet?'rankPet':'rankRide'});

    for(let type=0;type<4;type++)definitions.push({key:prefix+'_refine_'+type,label:'Tu luyện '+(pet?'Linh Thú':'Thú Cưỡi')+' '+(type+1),soulType:type,requireActorLevel:true,costIndex:2,

      level:()=>{const rows=(pet?model()?._ref:model()?.refine)?.[0];return soulLevel(rows,type);},

      cfg:n=>(pet?W._ft?._UZ?.ins:W._ft?._vqt?.ins)?.getCfgByTypeAndLv?.(type,n),rpc,method:pet?'riseRefet':'riseRideRefine'});

    for(const formation of [false,true]){

      const cfg=()=>formation?(pet?W._ft?._FZ?.ins:W._ft?._RZ?.ins):(pet?W._ft?._GZ?.ins:W._ft?._HZ?.ins);

      definitions.push({key:prefix+(formation?'_formation':'_illusion'),label:(formation?'Pháp trận ':'Ảo Hóa ')+(pet?'Linh Thú':'Thú Cưỡi'),illusion:!formation,redPointKeys:formation?undefined:pet?[10]:[8],model,

        list:m=>formation?(pet?m?.hhuaLst:m?.huanhuaList):arrayIllusions((pet?m?.mgcShow:m?.magicShow)?.[0]),

        ids:()=>cfg()?.getShowIds?.()??cfg()?.getHuanhuaShowIds?.()??[],cfg:(id,lv)=>formation?cfg()?.getHuanhuaCfgByIdAndLev?.(id,lv):cfg()?.getCfgByIdAndLv?.(id,lv),

        rpc:()=>formation?rpc():W._Ba?._ogt?._Cqt?.inst,method:formation?(pet?'mgcLv':'magicLev'):(pet?'riseMgcShow':'riseRideMgcShow'),scalar:formation});

    }

    definitions.push({key:prefix+'_rank_skill',label:'Kỹ năng Tiến cấp '+(pet?'Linh Thú':'Thú Cưỡi'),skill:true,model,list:m=>pet?m?.upSkills:m?.rank?.[3],rpc,

      method:pet?'skillUp':'addRideSkillLevel',mountSkill:true,skillType:2});

  }

  // Automatic progression stays off unless explicitly requested. Keep only
  // Only red-dot subfeatures are eligible; all base level-up and skill modules stay off.
  const allowedRedPointKeys=new Set([]);
  const queue=W.KVPV_V8;
  for(let i=definitions.length-1;i>=0;i--){
    const key=String(definitions[i]?.key||'');
    if(!allowedRedPointKeys.has(key)){
      try{queue?.toggle?.('appearance_auto_'+key,false);}catch{}
      definitions.splice(i,1);
    }
  }
  function soulLevel(rows,type){

    return Array.isArray(rows)?rows.find(row=>row?.[0]===type)?.[1]??0:undefined;

  }

  function skillRows(d){const m=d.model(),list=d.list(m),rows=Array.isArray(list)?list:(list?.keys??[]).slice(0,100).map(id=>list.get(id));return [...(d.feed&&Array.isArray(m?.feedSkills)?m.feedSkills:[]),...rows].slice(0,100);}

  function skillLevel(d,id){const base=W._et?._KQ;return skillRows(d).find(r=>Number(r?.[0])===id||typeof base==='function'&&base(r?.[0])===base(id))?.[1];}

  function skill(d){

    for(const row of skillRows(d)){const id=Number(row?.[0]),level=Number(row?.[1]);

      if(!Number.isSafeInteger(Number(id))||Number(id)<=0||!Number.isSafeInteger(level)||level<0||Number(row?.[2])<=0||!Number.isFinite(Number(row?.[2]))||typeof d.rpc()?.[d.method]!=='function')continue;

      return {key:d.key,label:d.label,id:Number(id),level,ready:true,signature:JSON.stringify([id,level,row[2]])};

    }return {key:d.key,label:d.label,ready:false};

  }

  function illusion(d){const list=d.list(d.model()),bag=W._Ba?._Ic?._aQ?.ins;

    if(!list)return {key:d.key,label:d.label,ready:false};

    for(const raw of [...new Set([...(list.keys??[]),...(d.ids?.()??[])])].slice(0,200)){

      const id=Number(raw),entry=list.get(raw),level=entry?Number(entry[1]):0;

      // Timed forms have extra expiry fields; leave activation/renewal manual.

      if(!Number.isSafeInteger(id)||id<=0||!Number.isSafeInteger(level)||level<0||entry?.[2]||Number(entry?.[3])>0)continue;

      const row=d.cfg(id,level);if(!row||!d.cfg(id,level+1))continue;

      const costs=d.costs?d.costs(row):row[2];if(!Array.isArray(costs)||!costs.length)continue;

      const cost=costs.find(p=>Number(bag?.getItemCountById?.(p?.[0]))>0)??costs[0];

      const item=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag?.getItemCountById?.(item));

      const limit=W._et?.getSvipLimit?.(item),svip=Number(W._Ba?._ke?._Le?.instance?.curSvipLv);

      if(!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||!Number.isFinite(have)||have<need||

        !Number.isFinite(limit)||!Number.isFinite(svip)||svip<limit||typeof d.rpc()?.[d.method]!=='function')continue;

      return {key:d.key,label:d.label,id,level,item,need,have,ready:true,signature:JSON.stringify([id,level,item,need,have])};

    }return {key:d.key,label:d.label,ready:false};

  }

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  function snapshot(d){
    const redPointKeys=d.redPointKeys??(d.redPointKey===undefined?[]:[d.redPointKey]);
    if(redPointKeys.length&&!redPointKeys.some(id=>W.KVPV_RED_DOT?.isActive?.(id)===true||W._Ba?._Ic?._Xo?._Ko?.instance?.getRpKeyState?.(id)===true||W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(id)===true))return {key:d.key,label:d.label,ready:false,redPoint:false};

    if(d.skill)return skill(d);

    if(d.illusion)return illusion(d);

    const raw=d.level(),level=Number(raw),row=raw==null?null:d.cfg(level),next=raw==null?null:d.cfg(level+1);

    const cost=d.cost?d.cost():row?.[d.costIndex??1],item=Number(cost?.[0]),need=Number(cost?.[1]);

    const exp=d.exp?Number(d.exp()):null;

    const have=Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(item));

    const ready=raw!=null&&Number.isSafeInteger(level)&&level>=0&&!!row&&!!next&&

      Number.isSafeInteger(item)&&item>0&&Number.isSafeInteger(need)&&need>0&&Number.isFinite(have)&&have>=need&&

      typeof d.rpc()?.[d.method]==='function'&&(!d.allowed||d.allowed())&&(!d.requireActorLevel||(Number.isFinite(Number(row?.[3]))&&Number.isFinite(Number(W._Ba?._rJ?._O$?.ins?.level))&&Number(W._Ba._rJ._O$.ins.level)>=Number(row[3])))&&(!d.exp||Number.isFinite(exp)&&exp>=0&&Number(cost?.[2])>0);

    return {key:d.key,label:d.label,level,exp,item,need,have,ready,signature:JSON.stringify([d.key,level,exp,item,need,have])};

  }

  function observe(){if(!S.pending)return;

    const d=definitions.find(x=>x.key===S.pending.key),level=Number(d?.skill?skillLevel(d,S.pending.id):d?.illusion?d.list(d.model())?.get(S.pending.id)?.[1]:d?.level());

    const exp=d?.exp?Number(d.exp()):null;

    if(Number.isFinite(level)&&(level>S.pending.level||level===S.pending.level&&Number.isFinite(S.pending.exp)&&Number.isFinite(exp)&&exp>S.pending.exp)){S.confirmed++;S.pending=null;S.reason='server_level_increased';}

    else S.reason=Date.now()-S.pending.at>30000?'waiting_level_ack_no_retry':'waiting_level_ack';

  }

  function takeover(){

    const legacy=W.KVPV_V880,groups=legacy?.status?.(false)?.groups??[];

    if(groups.some(g=>g.pending||g.blocked)){S.reason='waiting_old_quest_executor_ack';return false;}

    const pet=W.KVPV_V875?.config;

    if(pet){if(S.savedPet===null){if(W.KVPV_PARALLEL_ACTIONS?.legacyBusy?.()===true||W.KVPV_UPGRADES?.busy?.()===true){S.reason='waiting_old_pet_feed_ack';return false;}S.savedPet={autoFeed:pet.autoFeed};}pet.autoFeed=false;}

    const mount=W.KVPV_V877?.config;

    if(mount){

      if(S.savedMount===null){

        if(W.KVPV_UPGRADES?.busy?.()===true){S.reason='waiting_shared_upgrade_queue';return false;}

        S.savedMount={autoFeed:mount.autoFeed};

      }

      mount.autoFeed=false;

    }

    const cfg=legacy?.config;

    if(cfg){if(S.saved===null)S.saved={autoWeapon:cfg.autoWeapon,autoWing:cfg.autoWing,autoArm:cfg.autoArm};

      cfg.autoWeapon=false;cfg.autoWing=false;cfg.autoArm=false;}

    return true;

  }

  function safe(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;

    const q=W.KVPV_DAILY?.quickState?.(),lease=W.KVPV?.core?.scene?.status?.();

    if(owned()&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&q?.running===true&&W.KVPV_PARALLEL_ACTIONS?.independent===true&&

      (q.step==='fighting'||W.KVPV_PARALLEL_ACTIONS.canDirectDuringPve?.(q)===true))return true;

    return owned()&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&W._Ba?._$a?.SceneUtil?.isCommonScene===true&&

      W._Ba?._$a?._yo?.ins?.isInMission!==true&&(!q?.job||['rảnh','ranh'].includes(q.job))&&!lease?.owner&&

      !W.KVPV_HITRUN1?.status?.(false)?.running&&(W.KVPV_PARALLEL_ACTIONS?.independent===true||

      !W.KVPV_BG_RESOURCES?.status?.()?.busy&&!W.KVPV_FABAO_FAST?.status?.()?.pending);

  }

  function probe(key){

    if(!S.enabled||!owned())return {ready:false};observe();

    if(S.pending||!safe()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!takeover())return {ready:false};

    const d=definitions.find(x=>x.key===key);return d?snapshot(d):{ready:false};

  }

  function run(key,before){

    const current=probe(key);if(!current.ready||current.signature!==before.signature)throw Error('Upgrade state changed');

    const d=definitions.find(x=>x.key===key),rpc=d.rpc();

    S.pending={key,id:current.id,level:current.level,exp:current.exp,at:Date.now()};S.requests++;S.reason='native_upgrade_sent';

    try{if(d.soulType!=null)rpc[d.method]([d.soulType,0]);else if(d.typeZero)rpc[d.method](0);else if(d.typeFirst)rpc[d.method](1,current.id);else if(d.mountSkill)rpc[d.method](current.id,d.skillType??1);else if(d.scalar)rpc[d.method](current.id);else if(d.illusion||d.skill)rpc[d.method]([current.id]);else rpc[d.method]();}catch(e){S.lastError=String(e);throw e;}

  }

  function tick(){try{

    if(!S.enabled)return;if(!owned()){stop();return;}

    

    const mount=W._Ba?._YJ?._bgt?.ins;

    if(!Array.isArray(W._Ba?._YJ?._WJ?.ins?.feed)&&typeof mount?.getRideInfo==='function'&&Date.now()-S.lastMountRefresh>=30000){

      S.lastMountRefresh=Date.now();mount.getRideInfo();

    }

    observe();

    if(!S.pending)takeover();

  }catch(e){S.lastError=String(e);W.KVPV_V1?.diagnostics?.record?.(e);}}

  function stop(reason='manual'){

    S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;

    // The shared V8 queue may have been replaced or partially registered
    // between builds. Missing IDs are already disabled; continue teardown.
    for(const d of definitions)try{W.KVPV_V8?.toggle?.('appearance_auto_'+d.key,false);}
      catch(e){if(!missingQueueModule(e))throw e;}

    

    if(reason!=='reload'&&!S.pending){

      if(S.saved&&W.KVPV_V880?.config)Object.assign(W.KVPV_V880.config,S.saved);

      if(S.savedMount&&W.KVPV_V877?.config)Object.assign(W.KVPV_V877.config,S.savedMount);

      if(S.savedPet&&W.KVPV_V875?.config)Object.assign(W.KVPV_V875.config,S.savedPet);

    }

  }

  function start(){

    const queue=W.KVPV_V8;if(!queue?.register||!queue?.toggle){S.reason='waiting_shared_queue';return;}

    S.enabled=true;

    for(const d of definitions){const id='appearance_auto_'+d.key,redIds=d.redPointKeys??(d.redPointKey===undefined?[]:[d.redPointKey]);

      try{queue.register({id,name:'Tự tăng cấp '+d.label,kind:'work',verified:true,enabled:true,spend:'materials',

        background:true,directDuringPve:true,redIds,hourlyLimit:60,cooldownMs:2000,

        probe:()=>W.KVPV_APPEARANCE_AUTO?._probe(d.key)??{ready:false},

        run:before=>W.KVPV_APPEARANCE_AUTO?._run(d.key,before)});

      }catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}

      queue.toggle(id,true);

    }

    S.registered=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();

  }

  W.KVPV_APPEARANCE_AUTO=Object.freeze({start,stop,sync:tick,_probe:probe,_run:run,

    status:()=>({enabled:S.enabled,actor,registered:S.registered,reason:S.reason,requests:S.requests,confirmed:S.confirmed,

      pending:S.pending?{...S.pending}:null,groups:definitions.map(snapshot),excluded:['Thần Binh','Linh Dực','Thời Trang','Linh Tí','Phi Phong','đá bồi dưỡng Thú Cưỡi','đá bồi dưỡng Linh Thú'],lastError:S.lastError,allowKNB:false}),

    _handoff:()=>({actor,pending:S.pending?{...S.pending}:null,saved:S.saved,savedMount:S.savedMount,savedPet:S.savedPet,requests:S.requests,confirmed:S.confirmed})});

  start();

})();

