




(() => {

  const W=window;
  function genericBoss(){return null;}

  function tower(){try{

    const entry=W._Ba?._$a?._yo?.ins,live=Number(W._C?._Mn?._Cn?.currentID);

    const current=Number.isFinite(live)&&live>0?live:Number(entry?.intoSce?.[0]);

    const model=W._Ba?._tQ?._$Y?.ins,progress=Number(model?.finishLevel);

    const run=W.KVPV_LINHLUNG922?.status?.(false);

    const floors=[run?.pendingFloor,progress+1,progress].map(Number).filter(n=>Number.isSafeInteger(n)&&n>0);

    let floor=null;

    for(const n of floors){const cfg=W._ft?._u$?.ins?.getCfgByLv?.(n);if(Number(cfg?.[0])===current){floor=n;break;}}

    const inside=floor!==null&&current>0&&(entry?.isInMission===true||W._Ba?._$a?.SceneUtil?.isCommonScene===false);

    return {inside,current,floor,highestFloor:Number.isFinite(progress)?progress:null};

  }catch(e){return {inside:false,error:String(e)};}}

  

  function rune(){try{

    const entry=W._Ba?._$a?._yo?.ins,live=Number(W._C?._Mn?._Cn?.currentID);

    const current=Number.isFinite(live)&&live>0?live:Number(entry?.intoSce?.[0]);

    const model=W._Ba?._IH?._ZY?.inst;

    const floor=Number(W.KVPV_RUNE_BOSS?.status?.().pending?.floor??model?.currLv);

    const cfg=W._ft?._wZ?.ins?.getCfgByLv?.(floor);

    

    const inside=current===2201&&Number(entry?.intoSce?.[0])===2201&&

      Number.isSafeInteger(floor)&&floor>0&&Number(cfg?.[0])===floor&&

      (entry?.isInMission===true||W._Ba?._$a?.SceneUtil?.isCommonScene===false);

    return {inside,current,floor,highestFloor:Number(model?.finishLv)};

  }catch(e){return {inside:false,error:String(e)};}}

  

  function truTien(){try{

    const entry=W._Ba?._$a?._yo?.ins,live=Number(W._C?._Mn?._Cn?.currentID),current=Number.isFinite(live)&&live>0?live:Number(entry?.intoSce?.[0]);

    const cfg=W._ft?._po?.ins?.getCfgById?.(current),type=Number(cfg?.[7]);

    const inside=current>0&&Number(entry?.intoSce?.[0])===current&&type===52&&W._Ba?._$a?.SceneUtil?.isCommonScene===false;

    return {inside,current,floor:Number(entry?.intoSce?.[3])||null,type};

  }catch(e){return {inside:false,error:String(e)};}}

  function status(){const ll=tower();

    if(ll.inside&&W.KVPV_LINHLUNG_TH?.enabled!==false)return {...ll,kind:'LINH_LUNG'};

    const rv=rune();if(rv.inside)return {...rv,kind:'PHU_VAN'};

    const tt=truTien();if(tt.inside)return {...tt,kind:'TRU_TIEN'};

    const tq=W.KVPV_TQ_SCOPE?.status?.();if(tq?.inside)return {...tq,inside:true,kind:'THIEN_QUAN'};
    return genericBoss()??{...tq,inside:false,kind:'OUTSIDE'};

  }

  function eligible(target){if(!target||target.isValid===false)return false;
    const targetType=Number(target.property?.get?.('type'));
    const scope=status();
    // Tru Tien can select a type-3 combat entity; still reject players (type 4).
    if(targetType!==1&&!(scope.inside&&scope.kind==='TRU_TIEN'&&targetType===3))return false;

    const hp=target.property?.get?.('hp');if(Array.isArray(hp)&&Number(hp[0])<=0)return false;

    const s=status();if(!s.inside)return false;
    if(s.kind==='ALL_BOSS'){const candidate=genericBoss(target);return candidate!==null&&candidate.bossId===s.bossId&&candidate.occ===s.occ;}

    

    if(['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(s.kind))return true;

    const lv=W._Ba?._Co?._Mo?.ins?.curLv,cfg=W._ft?._h$?.ins?.getCfgByLv?.(lv);

    const expected=Number(cfg&&W._ft?._h$?.ins?.occ?.(cfg,lv));

    return expected>0&&Number(target.property?.get?.('occ'))===expected;

  }

  W.KVPV_FAR_SCOPE=Object.freeze({status,tower,rune,truTien,inside:()=>status().inside,eligible,genericBoss,setAllBosses(){return status();}});

})();

