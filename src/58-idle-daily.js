/* Daily scheduler is retired from the extension progression path.
 * Let the red-dot loop finish any already active job, then stop its legacy timer. */
(() => {
  'use strict';
  const W=window;
  W.KVPV_IDLE_DAILY?.stop?.();
  let timer=null,reason='red_dot_only';
  function stopWatcher(){
    if(timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(timer);
    timer=null;
  }
  function sync(){
    try{
      const daily=W.KVPV_DAILY,q=daily?.quickState?.();
      if(q&&!['rảnh','ranh'].includes(q.job)){reason='handoff_active_job';return;}
      daily?.stop?.();reason='daily_scheduler_stopped';stopWatcher();
    }catch(e){reason='shutdown_error:'+String(e?.message||e);}
  }
  W.KVPV_IDLE_DAILY=Object.freeze({sync,stop:stopWatcher,status:()=>({enabled:false,reason})});
  sync();
  if(timer===null&&reason==='handoff_active_job')timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500);
})();
