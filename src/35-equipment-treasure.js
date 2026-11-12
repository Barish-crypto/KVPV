
/* Native regular treasure categories only. Shares the type4 sender/ACK lock;
 * no duplicate RPC worker, no glory/event currency categories (9+).
 * Reward membership comes from native getItemShow pools, not guessed ID types. */

(() => {

  'use strict';

  const W=window;W.KVPV_EQUIPMENT_TREASURE?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),S={enabled:true,timer:null,lastError:''},rewardCache=new Map();

  // Native _Rti routes: type0 ->93, type1 ->115, type2 ->116, type3 ->393.

  const categories=[{type:0,panel:93,name:'Trang Bị'},{type:3,panel:393,name:'Phù Văn'},

    {type:1,panel:115,name:'Đỉnh Cao'},{type:2,panel:116,name:'Chí Tôn'}];

  const norm=x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  function classify(name){const n=norm(name);if(/phap bao/.test(n))return 4;if(/phu van/.test(n))return 3;

    if(/dinh cao/.test(n))return 1;if(/chi ton/.test(n))return 2;if(/trang bi|vu khi|non|bao tay|day chuyen|vong tay/.test(n))return 0;return null;

  }

  function task(){const r=W._Ba?._zIt?._FIt?.ins?.taskInfo;if(!Array.isArray(r))return null;

    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(r[0]);return cfg?{id:String(r[0]),state:Number(r[1]),name:String(cfg[1]||''),type:classify(cfg[1])}:null;

  }

  function objective(){const dependency=W.KVPV_REBORN_GOALS?.equipmentGoal?.();if(dependency)return {...dependency,type:classify(dependency.name)};const q=task();if(q&&[0,1,2,3].includes(q.state))return [0,1,3].includes(q.state)&&q.type!==null?q:null;

    const rows=W._Ba?._G_n?._U_n?.ins?.tasks;

    for(const r of Array.isArray(rows)?rows:[]){if(Number(r?.[1])!==0)continue;

      const cfg=W._ft?._mei?.ins?.getXianweiTaskDataById?.(Number(r[0])),type=classify(cfg?.[3]);

      if(type!==null)return {id:String(r[0]),state:0,type,name:String(cfg[3])};

    }return null;

  }

  function allowed(type){if(!S.enabled||!owned())return false;const dependency=W.KVPV_REBORN_GOALS?.equipmentGoal?.();if(dependency)return classify(dependency.name)===type;const q=task();

    if(q&&[0,1,2,3].includes(q.state))return [0,1,3].includes(q.state)&&q.type===type;

    const goal=objective();return goal?goal.type===type:!W.KVPV_QUEST_PRIORITY?.hasPriority?.();

  }

  function itemKnown(type,id){

    if(!rewardCache.has(type)){

      const rows=W._ft?._oZ?.ins?.getItemShow?.(type),ids=new Set();

      if(Array.isArray(rows))for(const r of rows){

        for(const entry of Array.isArray(r?.[3])?r[3]:[])if(Number.isSafeInteger(Number(entry?.[0])))ids.add(Number(entry[0]));

        for(const item of Array.isArray(r?.[4])?r[4]:[])if(Number.isSafeInteger(Number(item)))ids.add(Number(item));

      }if(ids.size)rewardCache.set(type,ids);

    }return rewardCache.get(type)?.has(id)===true;

  }

  function materialPlan(){

    if(!S.enabled||!owned())return null;const goal=objective();if(!goal||!categories.some(x=>x.type===goal.type))return null;

    const info=W.KVPV_FABAO_TREASURE?.inspectType?.(goal.type);if(!info||info.draw.ready||info.warehouse)return null;

    const key=info.draw.key,item=W._ft?._mY?.ins?.getItemCfgById?.(key),ways=item?.[14],dungeons=W.KVPV_DAILY_TRIAL?.status?.()?.dungeons??[];

    const sources=[];

    for(const id of Array.isArray(ways)?ways:[]){const cfg=W._ft?._Bwt?.ins?.getCfgById?.(id);if(!cfg)continue;

      const action=Number(cfg[3]?.[0]),map=Number(cfg[5]),direct=!cfg[3]?.length&&!cfg[4]?.length;

      const d=dungeons.find(d=>direct?d.id===map:d.feature===action);

      if(d?.known&&d.unlocked&&d.taskAllowed&&d.remaining>0&&Number.isSafeInteger(d.level)&&d.level>0)sources.push({id,dungeon:d.id,key});

    }

    return {goal,key,sources,reason:sources.length?'farm_verified_key_source':'missing_key_source_not_supported'};

  }

  function materialDungeon(){return materialPlan()?.sources?.[0]?.dungeon??null;}

  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}

    const api=W.KVPV_FABAO_TREASURE;if(!api?.registerType)return;

    for(const d of categories)api.registerType({...d,allowed:()=>allowed(d.type),itemKnown:id=>itemKnown(d.type,id)});

    api.sync();

  }catch(e){S.lastError=String(e);}}

  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

  W.KVPV_EQUIPMENT_TREASURE=Object.freeze({sync,stop,materialDungeon,

    status:()=>({enabled:S.enabled,actor,objective:objective(),categories:categories.map(d=>({...d,allowed:allowed(d.type),...W.KVPV_FABAO_TREASURE?.inspectType?.(d.type)})),

      materials:materialPlan(),lastError:S.lastError,allowKNB:false})});

  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000);sync();

})();

