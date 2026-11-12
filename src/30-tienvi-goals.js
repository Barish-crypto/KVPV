




(() => {

  'use strict';

  const W=window,old=W.KVPV_TIENVI_GOALS;old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,reason:'waiting_tasks',tasks:[],lastError:''};

  const norm=x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();

  function classify(q){

    const n=norm(q.name);

    if(/nap|svip|vip|mua|tieu.*knb|nguyen bao/.test(n))return 'manual_paid';

    if(q.action===21&&/linh lung thap/.test(n)&&Number.isSafeInteger(q.target)&&q.target>0&&q.target<=10000)return 'tower';

    if(/phong thuy/.test(n)&&/tien phu/.test(n))return 'feng_shui';

    if(/nhiem vu/.test(n)&&/tien phu/.test(n))return 'home_tasks';

    if(/tuyet hoc|cuong hoa|da hon|linh don|luyen don/.test(n))return 'upgrade_queue';

    if(/phap bao/.test(n))return 'fabao';

    if(/than binh|linh duc|thoi trang|linh ti|thu cuoi/.test(n))return 'appearance';

    return 'unverified_requirement';

  }

  function read(){

    const rows=W._Ba?._G_n?._U_n?.ins?.tasks;if(!Array.isArray(rows))return [];

    return rows.filter(r=>Array.isArray(r)&&Number.isSafeInteger(Number(r[0]))&&Number(r[0])>0).map(r=>{

      const cfg=W._ft?._mei?.ins?.getXianweiTaskDataById?.(Number(r[0]));

      const q={id:String(r[0]),state:Number(r[1]),progress:Number(r[2])||0,name:String(cfg?.[3]||''),action:Number(cfg?.[11]?.[0]),target:Number(cfg?.[12]),source:'TIEN_VI'};

      q.executor=cfg?classify(q):'waiting_config';

      q.reason=q.state===1?'waiting_shared_reward_queue':q.state!==0?'claimed':q.executor==='tower'?'tower_goal':

        ['feng_shui','home_tasks','upgrade_queue','fabao','appearance'].includes(q.executor)?'existing_material_executor':q.executor;

      return q;

    });

  }

  function valid(){return actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;}

  function goal(){if(!S.enabled||!valid())return null;

    // Read fresh server state on every request; never cache a completed goal.

    return read().filter(q=>q.state===0&&q.executor==='tower').sort((a,b)=>a.target-b.target)[0]??null;

  }

  function sync(){try{

    if(!S.enabled)return;if(!valid()){stop();return;}

    S.tasks=read();S.reason=S.tasks.length?'tracking_native_tasks':'waiting_tasks';

    // Claim and material work retain their existing ACK/rate-limit queue.

    // This controller adds no independent reward sender or item purchase.

    W.KVPV_QUEST_GOALS?.sync?.();

  }catch(e){S.lastError=String(e);S.reason='error';}}

  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

  function start(){if(S.timer!==null)return;S.enabled=true;S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000);sync();}

  W.KVPV_TIENVI_GOALS=Object.freeze({start,stop,sync,goal,inspect:read,

    status:()=>({enabled:S.enabled,actor,reason:S.reason,tasks:S.tasks.map(q=>({...q})),lastError:S.lastError,allowKNB:false})});

  W.KVPV_QUEST_PRIORITY?.start?.();

  start();

})();

