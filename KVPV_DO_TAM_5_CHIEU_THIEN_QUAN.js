;(() => {
  'use strict';
  window.KVPV_TQ_RANGE_START?.stop?.();
  let timer=null,waiting=true,reason='checking',last='',started=false;
  const expires=Date.now()+60000,actor=String(window.__KVPV_OWN_ACTOR_ID||'');
  function state(){
    const api=window.KVPV_TH300,scope=window.KVPV_FAR_SCOPE?.status?.(),owner=window.KVPV_HITRUN1?.status?.(false);
    const me=window._C?._Ba?.instance?.getRole?.(Number(actor)),combat=me?.getComponent?.(window._d?._Yct?._Het),hp=me?.property?.get?.('hp');
    return {build:window.KVPV_V1?.build?.id??null,actor,liveActor:String(window._Ba?._rJ?._O$?.ins?.actorId||''),hasRangeAPI:typeof api?.startTianQuanBasicRangeTest==='function',scope:scope?.kind??'UNKNOWN',
      targetEligible:window.KVPV_FAR_SCOPE?.eligible?.(combat?.target)===true,controllerRunning:api?.status?.(false)?.running===true,phase:owner?.phase??'OFF',
      hpPercent:Array.isArray(hp)&&Number(hp[1])>0?Number(hp[0])/Number(hp[1])*100:null,dailyJob:window.KVPV_DAILY?.quickState?.()?.job??null,waiting,started,reason};
  }
  function stop(){waiting=false;if(timer!==null)window.clearTimeout(timer);timer=null;}
  function tell(message,s){if(message!==last){last=message;window.console.info('[Đo tầm] '+message);window.console.table([s]);}}
  function poll(){
    try{
      const s=state();
      if(!actor||actor!==s.liveActor){reason='wrong_game_frame';stop();tell('Sai game-frame hoặc chưa nạp FULL. Chọn frame có nhân vật rồi F5 và nạp FULL mới.',state());return;}
      if(!s.hasRangeAPI){reason='full_missing_range_api';stop();tell('FULL đang chạy chưa có bộ đo mới. F5, nạp KVPV_FULL_THIEN_QUAN.js mới rồi chạy lại file đo.',state());return;}
      if(window.KVPV_TH300.rangeReport?.()?.probe?.status==='running'){reason='probe_already_running';started=true;stop();tell('Phép đo đã chạy; xem KVPV_TH300.rangeReport().',state());return;}
      if(Date.now()>=expires){reason='wait_timeout';stop();tell('Đã chờ 60 giây; chưa đủ điều kiện. Xem bảng trạng thái để biết còn thiếu gì.',state());return;}
      reason=s.scope!=='THIEN_QUAN'?'waiting_tianquan':!s.targetEligible?'waiting_stage_boss':!s.controllerRunning?'waiting_combat_controller':s.phase!=='FIGHT'?'waiting_fight_phase':!(s.hpPercent>=70)?'waiting_hp_70':'ready';
      if(reason!=='ready'){tell(reason,state());timer=window.setTimeout(poll,500);return;}
      window.KVPV_TH300.setTianQuanFiveBasics(true,10);
      window.KVPV_TH300.startTianQuanBasicRangeTest([302,280,240,200,160,120,80]);
      started=true;reason='range_probe_started';stop();tell('Đã bắt đầu đo năm chiêu tay từ xa vào gần. Có thể trúng đòn khi áp sát. Xem KVPV_TH300.rangeReport(); dừng bằng KVPV_TH300.stopTianQuanBasicRangeTest().',state());
    }catch(e){reason='start_failed: '+String(e.message||e);stop();window.console.warn('[Đo tầm]',reason);}
  }
  window.KVPV_TQ_RANGE_START=Object.freeze({status:state,stop});poll();
})();
