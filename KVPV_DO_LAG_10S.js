;(() => {
  'use strict';
  window.KVPV_LAG_PROBE?.stop?.();
  const clock=()=>window.performance?.now?.()??Date.now(),started=clock(),samples=[],frameGaps=[];
  let running=true,timer=null,frame=null,lastTick=started,lastFrame=null,frames=0,earlyFrames=0,lateFrames=0,longTasks=0,longTaskMs=0,observer=null;
  function raf(at){if(!running)return;const elapsed=clock()-started;frames++;if(elapsed<3000)earlyFrames++;if(elapsed>=5000)lateFrames++;if(lastFrame!==null&&frameGaps.length<2000)frameGaps.push(at-lastFrame);lastFrame=at;frame=window.requestAnimationFrame(raf);}
  const percentile=(values,p)=>{if(!values.length)return null;const sorted=values.slice().sort((a,b)=>a-b);return sorted[Math.min(sorted.length-1,Math.floor(sorted.length*p))];};
  function report(){const elapsed=clock()-started,timers=window.KVPV_V1?.timers?.status?.();return {version:1,running,elapsedMs:elapsed,build:window.KVPV_V1?.build?.id??null,
    frameCallbacks:frames,rafCallbacksPerSecond:elapsed>0?frames*1000/elapsed:null,rafFirst3Seconds:earlyFrames/Math.max(.001,Math.min(3000,elapsed)/1000),rafAfter5Seconds:elapsed>5000?lateFrames/((elapsed-5000)/1000):null,
    frameGapP95Ms:percentile(frameGaps,.95),timerLatenessP95Ms:percentile(samples.map(s=>s.lateMs),.95),longTasks,longTaskMs,
    documentHidden:window.document?.hidden??null,realFocus:window.document?.hasFocus?.()??null,focusPatch:window.KVPV_FOCUS_HOLD?.status?.()??null,
    accountPolicy:window.KVPV_ACCOUNT_POLICY?.status?.()??null,registeredTimers:timers??null,samples:samples.slice(),
    note:'rAF callbacks are browser frame scheduling, not game render FPS. Timer delay is not proof of CPU load or network lag. This observer changes no combat/focus settings.'};}
  let finished=null;
  function stop(){if(!running)return;finished=report();running=false;finished.running=false;if(timer!==null)window.clearInterval(timer);if(frame!==null)window.cancelAnimationFrame?.(frame);observer?.disconnect();window.console.info('[Đo lag] Xong. Lấy báo cáo: copy(KVPV_LAG_PROBE.export())');}
  try{if(window.PerformanceObserver?.supportedEntryTypes?.includes('longtask')){observer=new window.PerformanceObserver(list=>{for(const e of list.getEntries()){longTasks++;longTaskMs+=e.duration;}});observer.observe({entryTypes:['longtask']});}}catch(_){observer=null;}
  if(typeof window.requestAnimationFrame==='function')frame=window.requestAnimationFrame(raf);
  timer=window.setInterval(()=>{const now=clock();samples.push({elapsedMs:now-started,lateMs:Math.max(0,now-lastTick-100),hidden:window.document?.hidden??null});lastTick=now;if(now-started>=10000||samples.length>=150)stop();},100);
  window.KVPV_LAG_PROBE=Object.freeze({stop,report:()=>finished??report(),export:()=>JSON.stringify(finished??report(),null,2)});
  window.console.info('[Đo lag] Đo 10 giây; giữ game hiện trên màn hình trong lần đo đầu.');
})();
