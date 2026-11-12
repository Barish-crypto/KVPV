






(() => {

  'use strict';

  const W=window,old=W.KVPV_CRAFT_LOW,carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,automatic:new Set(carry?.actor===actor?carry.automatic:[]),

    reason:'waiting',lastError:'',ready:[],blocked:0};

  const worker=()=>W.KVPV_BG_RESOURCES??W.KVPV?.resources;

  const valid=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  const gearTypes=new Set([5,8,10,11,12,13]);

  function scan(){

    const et=W._et??(typeof _et!=='undefined'?_et:null),c=W._ft?._Cji?.ins,b=W._Ba?._Ic?._aQ?.ins;

    const rows=W._Sa?.getCfg?.('item_compose'),out=[];S.blocked=0;

    if(!et?.getStageById||!et?.getTypeById||!c?.getCfgById||!b?.isBagInited||!Array.isArray(rows))return null;

    function lowGear(id){const tier=Number(et.getStageById(id));return gearTypes.has(Number(et.getTypeById(id)))&&Number.isSafeInteger(tier)&&tier>0&&tier<4;}

    for(const raw of rows){const id=Number(raw?.[0]);if(!Number.isSafeInteger(id)||id<=0)continue;

      const row=c.getCfgById(id);if(!Array.isArray(row)||Number(row[0])!==id||![807,808].includes(Number(row?.[3]?.[0])))continue;

      if(!lowGear(Number(row[1]))){S.blocked++;continue;}

      const source=[...(Array.isArray(row[5])?row[5]:[]),...(Array.isArray(row[6])?row[6]:[])];

      const need=new Map();let okay=source.length>0&&source.length<=8;

      for(const pair of source){const item=Number(pair?.[0]),count=Number(pair?.[1]);

        if(!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(count)||count<1||count>8||!lowGear(item)){okay=false;break;}

        need.set(item,(need.get(item)||0)+count);

      }

      if(!okay){S.blocked++;continue;}

      if([...need].some(([item,count])=>{const owned=Number(b.getItemCountById?.(item));return !Number.isFinite(owned)||owned<count;}))continue;

      out.push(id);if(out.length>=100)break;

    }

    return out;

  }

  function tick(){try{

    if(!S.enabled)return;if(W.KVPV_MATERIAL_RESERVE?.active===true){stop();S.reason='materials_reserved_for_so_tai';return;}
    if(!valid()){stop();S.reason='actor_changed';return;}

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}

    const api=worker(),state=api?.status?.(),cfg=api?.config?.gearCraft;

    if(!cfg||!Array.isArray(cfg.approvedRecipeIds)){S.reason='waiting_resource_worker';return;}

    if(state?.busy||state?.pending){S.reason='waiting_existing_request';return;}

    const ids=scan();if(ids===null){S.reason='waiting_native_config_and_bag';return;}

    const manual=cfg.approvedRecipeIds.filter(id=>!S.automatic.has(Number(id)));

    cfg.approvedRecipeIds=[...new Set([...manual,...ids])];S.automatic=new Set(ids);S.ready=ids;

    S.reason=ids.length?'low_tier_recipes_enabled':'waiting_low_tier_materials';

  }catch(e){S.lastError=String(e);S.reason='error';W.KVPV_V1?.diagnostics?.record?.(e);}}

  function stop(){S.enabled=false;

    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;

    const cfg=worker()?.config?.gearCraft;

    if(Array.isArray(cfg?.approvedRecipeIds))cfg.approvedRecipeIds=cfg.approvedRecipeIds.filter(id=>!S.automatic.has(Number(id)));

  }

  function start(){if(S.timer!==null)return;S.enabled=true;

    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000);tick();}

  W.KVPV_CRAFT_LOW=Object.freeze({start,stop,sync:tick,

    status:()=>({enabled:S.enabled,actor,reason:S.reason,maximumAutoTier:3,manualFromTier:4,

      recipes:S.ready.slice(),blockedRecipes:S.blocked,lastError:S.lastError,allowKNB:false}),

    _handoff:()=>({actor,automatic:[...S.automatic]})});

  start();

})();

