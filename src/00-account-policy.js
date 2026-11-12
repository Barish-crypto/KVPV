




(() => {

  const W=window,config={pauseWhenHidden:false,backgroundTickMs:1,unfocusedTickMs:1};

  const focused=()=>typeof W.document?.hasFocus==='function'?W.document.hasFocus():null;

  const pollingGap=()=>{
    const rustCore=W.__KVPV_RUST_CORE;
    if(typeof rustCore?.accountPollingMode!=='function')throw Error('Rust/WASM account policy unavailable');
    const focus=focused(),focusState=focus===false?0:focus===true?1:-1;
    const mode=rustCore.accountPollingMode(W.document?.hidden?1:0,focusState);
    if(mode===1)return config.backgroundTickMs;
    if(mode===2)return config.unfocusedTickMs;
    if(mode===0)return 0;
    throw Error('Rust/WASM returned an invalid account polling mode: '+mode);
  };

  W.KVPV_ACCOUNT_POLICY=Object.freeze({config,pollingGap,status(){

    const actor=String(W._Ba?._rJ?._O$?.ins?.actorId??''),owner=String(W.__KVPV_OWN_ACTOR_ID??'');

    const me=W._C?._Ba?.instance?.getRole?.(Number(actor))??W._C?._Ba?.instance?.getRole?.(actor);

    const types=W._d?._Yct,selector=me?.getComponent?.(types?._Eet);

    return {actorId:actor,ownerId:owner,actorMatches:!!actor&&actor===owner,playerLoaded:!!me,

      hidden:W.document?.hidden??null,pauseWhenHidden:config.pauseWhenHidden,backgroundTickMs:config.backgroundTickMs,

      focused:focused(),pollingGapMs:pollingGap(),

      components:{selector:!!selector,combat:!!me?.getComponent?.(types?._Het),mover:!!me?.getComponent?.(types?._zet)},

      nativeSkillIds:[...new Set([...(selector?._rtt??[]),...(selector?._wet??[])].map(row=>Number(row?.[0])).filter(Number.isSafeInteger))],

      note:'Per-frame session; no fixed main/clone identity. Background browser/game throttling is not bypassed.'};

  }});

})();

