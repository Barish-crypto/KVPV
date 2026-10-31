/* Hồ sơ chạy phó bản và boss hằng ngày. Nạp sau KVPV_V1_FULL.js. */
(() => {
 'use strict';const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED){
  // The live bridge may install while the iframe is transitioning; fail closed without a frame-wide exception.
  W.__KVPV_PB_BOSS_WAITING_ACTOR=true;
  return;
 }
 W.__KVPV_PB_BOSS_WAITING_ACTOR=false;
 if(!W.KVPV_DAILY?.config)throw Error('Thiếu bộ FULL. Dùng file KVPV_PB_BOSS_DAILY.js.');
 const previous=W.KVPV_PB_BOSS_DAILY,carry=previous?._handoff?.();
 const S={enabled:false,actor,startedAt:null,errors:[],started:[]};
 const starters=[['KVPV_DAILY','start'],['KVPV_DAILY','tuVuotStart'],['KVPV_DAILY_TRIAL','start'],['KVPV_BEAST_ISLAND','start'],['KVPV_SUMMON_BOSS','start'],['KVPV_RUNE_BOSS','start'],['KVPV_HONOR_TARGET','start']];
 const own=()=>actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
 function start(){if(!own())throw Error('Acc đã đổi: mở tab và nạp lại cho acc mới.');if(S.enabled)return status();S.errors=[];S.started=[];
  // Quyền tác vụ và pending vẫn thuộc các bộ hiện có, không reset hay phát lại RPC.
  W.KVPV_QUEST_PRIORITY?.stop?.();W.KVPV_V866?.stop?.();
  // Disconnect isolation: restore native cooldown/animation owned hooks before Daily combat.
  W.KVPV_TQ_BASIC_FORCE?.setEnabled?.(false);
  W.KVPV_TQ4100_COOLDOWN_EXPERIMENT?.setEnabled?.(false);
  // Eight Floor is an independent, schedule-gated event controller.
  // Do not stop it after src/14-eight-floor.js has auto-armed it: on FULL/hot
  // reload this PB/Boss profile runs later and previously left Eight Floor OFF.
  // The Eight Floor scheduler already yields to active Daily/Boss ownership.
  for(const name of ['KVPV_MARRY_ARENA','KVPV_KIEM_KHIEU'])try{W[name]?.stop?.();}catch(e){S.errors.push(name+': '+String(e?.message??e));}
  W.KVPV_DESKTOP_CONTROL?.stop?.();
  W.KVPV_DESKTOP_CONTROL=Object.freeze({receive:()=>false,stop(){},scopeProfile:()=>null,distance:()=>302,stageAllowed:()=>true,status:()=>({reason:'javascript_daily_only',lastError:'',modules:{}}),_handoff:()=>({actor,desired:null,failedRevision:null})});
  const c=W.KVPV_DAILY.config;
  Object.assign(c,{enableTienDuyen:true,enableTinhThan:true,enableYeuVuong:true,enableHongHoang:true,enableEventSchedule:true,enableTuVuot:true,
    enableVinhDu:true,enableDinhCao:true,enableTuLa:true,enableDaoTri:true,enableCompose:false,enableTienTonTrace:false,tienTonTraceConsole:false,eventConsoleNotices:false});
  // Luôn dùng lượt/vé hiện có; không mua lượt hoặc cổ vũ KNB.
  W.KVPV_SPENDING_POLICY=Object.freeze({allowKNB:false,dailyInspireKNBMaps:Object.freeze([]),canDailyInspireKNB:()=>false,reason:'PB/Boss daily: không tự tiêu KNB.'});
  W.KVPV_ENTRY_POLICY=Object.freeze({manual:false,idleDaily:false});
  // Unified native combat engine owns Boss casting. Never re-arm retired TH300 or BASIC10.
  W.KVPV_COMBAT_ENGINE?.start?.();
  for(const [name,method] of starters)try{if(typeof W[name]?.[method]==='function'){W[name][method]();S.started.push(name+'.'+method);}}catch(e){S.errors.push(name+': '+String(e?.message??e));}
  S.enabled=true;S.startedAt=Date.now();console.info('[PB + BOSS MỖI NGÀY]',status());return status();
 }
 function stop(){S.enabled=false;if(!own())return status();for(const name of new Set(starters.map(row=>row[0])))try{W[name]?.stop?.();}catch(e){S.errors.push(name+': '+String(e?.message??e));}return status();}
 function status(){return {enabled:S.enabled,actor,day:W.KVPV_DAILY_CLOCK?.key?.()??null,resetHourVN:5,allowKNB:false,startedAt:S.startedAt,started:S.started.slice(),errors:S.errors.slice(),daily:W.KVPV_DAILY?.quickState?.(),trial:W.KVPV_DAILY_TRIAL?.status?.()?.reason,scope:'Các PB/boss đã hỗ trợ và đã mở; tổ đội theo điều kiện game. Giữ tab đăng nhập và máy hoạt động.'};}
 W.KVPV_PB_BOSS_DAILY=Object.freeze({start,stop,status,_handoff:()=>({actor,enabled:S.enabled})});
 if(carry?.actor!==actor||carry.enabled!==false)start();
})();
