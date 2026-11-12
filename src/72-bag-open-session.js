
/* User-requested finite opening session, only actor 10158939833447 and observed stacks. */

(() => {

  'use strict';

  const W=window,actor='10158939833447';

  if(String(W._Ba?._rJ?._O$?.ins?.actorId)!==actor)return;

  const S=W.__KVPV_BAG_OPEN_SESSION_20261025??={pending:null,confirmed:0,requests:0,history:[],done:[],reason:'starting'};

  W.KVPV_BAG_OPEN_SESSION?.stop?.();

  const targets=[

    [30910001,'10139231968102',1],[30910002,'10139231968101',1],

    [30920003,'10139231968100',2],[30230002,'10139231968099',10],

    [30850010,'10139231968105',1],[30350008,'10139231968103',2],

    [30450008,'10139231968104',2],[31040002,'10139231970411',1]

  ];

  let timer=null;

  function tick(){try{

    if(S.paused){stop();return;}

    if(String(W._Ba?._rJ?._O$?.ins?.actorId)!==actor||W.__KVPV_UNIVERSAL_HALTED){stop();return;}

    const bag=W._Ba?._Ic?._aQ?.ins,rows=bag?.getItemsByBagType?.(0);

    if(bag?.isBagInited!==true||!Array.isArray(rows)){S.reason='waiting_bag';return;}

    const find=(id,uid)=>rows.find(r=>r[0]===id&&String(r[2])===uid);

    if(S.pending){

      const p=S.pending,item=find(p.id,p.uid),count=item?item[1]:0;

      if(count<p.before){S.confirmed+=p.before-count;S.history.push({...p,after:count,confirmedAt:Date.now()});S.pending=null;}

      else {

        S.reason=Date.now()-p.at>10000?'no_inventory_ack_no_retry':'waiting_inventory_ack';

        if(S.reason==='no_inventory_ack_no_retry'){S.paused=true;stop();}

        return;

      }

    }

    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){

      S.reason='waiting_idle';return;

    }

    const rpc=W._Ba?._Ic?._oJ?.instance,tool=W._Ba?._Ic?.BeiBaoTool;

    if(typeof rpc?.c2sUseBagItem!=='function'||typeof tool?.checkItemCanUseOrNotice!=='function'){S.reason='missing_native_api';return;}

    for(const [id,uid,initial] of targets){

      const key=id+'/'+uid;if(S.done.includes(key))continue;

      const item=find(id,uid);

      if(!item||item[1]<=0){S.done.push(key);continue;}

      const spent=S.history.filter(h=>h.id===id&&h.uid===uid).reduce((n,h)=>n+h.before-h.after,0);

      if(spent>=initial){S.done.push(key);continue;}

      if(tool.checkItemCanUseOrNotice(item,false)!==true){S.done.push(key);S.history.push({id,uid,before:item[1],after:item[1],skipped:'native_not_usable'});continue;}

      S.pending={id,uid,before:item[1],at:Date.now()};S.requests++;S.reason='use_requested';

      rpc.c2sUseBagItem(Number(uid),id,1);return;

    }

    S.reason='finished';stop();

  }catch(e){S.reason='error_no_retry';S.error=String(e.message);stop();}}

  function stop(){if(timer!==null){W.clearInterval(timer);timer=null;}}

  W.KVPV_BAG_OPEN_SESSION=Object.freeze({stop,status:()=>({...S,history:S.history.slice(-30)})});

  timer=W.setInterval(tick,1000);

})();

