// ==UserScript==
// @name         KVPV FULL Android
// @namespace    kvpv.local.android
// @version      1.0.1
// @description  FULL ngoại tuyến; chỉ khởi động trong frame game Kiếm Vũ Phong Vân 1046. Build 13bd22a92d07
// @match        http://*/*
// @match        https://*/*
// @run-at       document-idle
// @grant        none
// @sandbox      raw
// @updateURL    none
// ==/UserScript==





(() => {

  'use strict';

  const build="13bd22a92d07",revision=2,channel='kvpv-android-loader-v2';

  function gameURL(value){try{const u=new URL(value);return /^https?:$/.test(u.protocol)&&

    u.hostname==='play.choingay.vn'&&/^\/1046(?:\/|$)/.test(u.pathname);}catch(_){return false;}}

  function inGameScope(){

    if(gameURL(location.href)||gameURL(document.referrer))return true;

    try{const u=new URL(document.referrer);if(window.parent!==window&&/^https?:$/.test(u.protocol)&&

      u.hostname==='play.choingay.vn'&&u.pathname==='/')return true;}catch(_){}

    let frame=window;

    for(let n=0;n<12;n++){

      try{if(gameURL(frame.location.href))return true;if(frame.parent===frame)break;frame=frame.parent;}catch(_){break;}

    }

    return false;

  }

  const prior=window.__KVPV_ANDROID_LOADER;

  if(prior?.build===build&&prior.revision===revision&&['waiting_scope','waiting','loaded','failed','blocked'].includes(prior.state))return;

  prior?.cancel?.();

  let scoped=inGameScope(),timer=null,attempted=false,started=Date.now(),badge=null,expanded=false;

  const children=new Map();

  const status={build,revision,state:scoped?'waiting':'waiting_scope',reason:'waiting_game',error:'',cancel(){

    if(timer!==null)window.clearInterval(timer);timer=null;

  }};

  window.__KVPV_ANDROID_LOADER=status;

  const send=(target,type,detail)=>{try{target?.postMessage?.({channel,build,type,...detail},'*');}catch(_){}};

  function directChild(source){try{for(let i=0;i<window.frames.length;i++)if(window.frames[i]===source)return true;}catch(_){}return false;}

  function grantChildren(){if(!scoped)return;try{for(let i=0;i<window.frames.length;i++)send(window.frames[i],'scope');}catch(_){}}

  function summary(){

    const list=[status,...children.values()];

    return list.find(s=>s.state==='loaded')||list.find(s=>s.state==='failed')||status;

  }

  function publish(){if(!scoped)return;

    const s=summary();

    if(window.parent!==window)send(window.parent,'status',{state:s.state,reason:s.reason,error:s.error});

    if(!gameURL(location.href)||typeof document.createElement!=='function')return;

    if(!badge){badge=document.createElement('button');badge.type='button';

      badge.style.cssText='position:fixed;top:6px;left:6px;z-index:2147483647;background:#172638;color:white;border:1px solid #66d9a6;border-radius:6px;padding:7px;font:12px sans-serif;max-width:90vw;white-space:pre-wrap;text-align:left;';

      badge.onclick=()=>{expanded=!expanded;publish();};(document.body||document.documentElement)?.appendChild(badge);}

    const labels={loaded:'Đã chạy',failed:'Lỗi nạp',timeout:'Hết thời gian chờ',waiting:'Chờ game/frame',waiting_scope:'Chờ frame'};

    badge.textContent='KVPV: '+(labels[s.state]||s.state)+(expanded?'\n'+build+' / loader 1.0.1\n'+s.reason+(s.error?'\n'+s.error:''):' · bấm xem');

  }

  window.addEventListener?.('message',event=>{

    const data=event.data;if(!data||data.channel!==channel||data.build!==build)return;

    if(data.type==='scope'&&event.source===window.parent&&window.parent!==window){

      if(!scoped){scoped=true;status.state='waiting';begin();}grantChildren();

    }else if(scoped&&directChild(event.source)){

      if(data.type==='request')send(event.source,'scope');

      else if(data.type==='status'&&['waiting','loaded','failed','timeout','blocked'].includes(data.state)){

        children.set(event.source,{state:data.state,reason:String(data.reason||'').slice(0,100),error:String(data.error||'').slice(0,300)});publish();

      }

    }

  });

  function check(){

    grantChildren();

    if(attempted)return;

    if(Date.now()-started>600000){status.state='timeout';status.reason='game_not_ready';status.cancel();publish();return;}

    try{

      const ready=(() => {
 const W=window,p=W._Ba?._rJ?._O$?.ins,actor=String(p?.actorId||'');
 if(!p||!W._ft||!W._Sa||!(/^[1-9]\d{4,24}$/).test(actor))return {ready:false};
 if(W.__KVPV_UNIVERSAL_HALTED||W.KVPV_V1&&String(W.__KVPV_OWN_ACTOR_ID)!==actor)return {ready:false,reason:'account_changed_open_new_tab'};
 if(p.isDead===true)return {ready:false,reason:'waiting_revive'};
 const types=W._d?._Yct,world=W._C?._Ba?.instance,role=world?.getRole?.(Number(actor))||world?.getRole?.(actor);
 if(!types?._Eet||!types?._Het||!types?._zet||!role?.getComponent?.(types._Eet)||!role.getComponent(types._Het)||!role.getComponent(types._zet))return {ready:false,reason:'waiting_components'};
 let diagnostics=null;try{diagnostics=W.KVPV_EXECUTOR_REPORT?.snapshot?.()??null;}catch(_){}
 return {ready:true,actor,hasRuntime:!!W.KVPV_V1,loaded:W.__KVPV_LIVE_BUILD||null,runtimeModules:Array.isArray(W.__KVPV_RUNTIME_MODULE_SET)?W.__KVPV_RUNTIME_MODULE_SET:null,diagnostics};
})();

      if(!ready.ready){status.reason=ready.reason||'waiting_game';publish();return;}

      if(window.__KVPV_LIVE_BUILD===build){status.state='loaded';status.reason='already_loaded';status.cancel();publish();return;}

      attempted=true;status.cancel();installFull();

      if(!window.KVPV_V1)throw Error('FULL did not install');

      window.__KVPV_LIVE_BUILD=build;status.state='loaded';status.reason='ready';publish();

      console.info('[KVPV Android] FULL ready',build);

    }catch(e){attempted=true;status.cancel();status.state='failed';status.error=String(e);publish();console.error('[KVPV Android]',e);}

  }

  function begin(){started=Date.now();timer=window.setInterval(check,500);check();}

  if(scoped)begin();else if(window.parent!==window)send(window.parent,'request');

  function installFull(){

/* KVPV V1 / generated from esm/; edit esm/modules/, not this file. */
(()=>{
const __KVPV_V1_BUILD=Object.freeze({"id":"13bd22a92d07","release":"1.0.0","recovery":"35-100-observed-ring","rustCore":{"abi":1,"sha256":"8de9c0f29668bf3516737110bfd8068aebecc69c1eaccf03cef0d1bd7d9dd442"},"modules":[{"file":"00-account-policy.js","apis":["KVPV_ACCOUNT_POLICY"]},{"file":"00-boss-recovery.js","apis":["KVPV_BOSS_RECOVERY"]},{"file":"00-boss-session.js","apis":["KVPV_BOSS_LOG"]},{"file":"00-combat-metrics.js","apis":["KVPV_COMBAT_METRICS"]},{"file":"00-daily-clock.js","apis":["KVPV_DAILY_CLOCK"]},{"file":"00-far-scope.js","apis":["KVPV_FAR_SCOPE"]},{"file":"00-manual-entry-policy.js","apis":["KVPV_ENTRY_POLICY"]},{"file":"00-material-reserve.js","apis":["KVPV_MATERIAL_RESERVE"]},{"file":"00-preflight.js","apis":["KVPV_CHECK"]},{"file":"00-skill-async-observer.js","apis":["KVPV_SKILL_ASYNC_OBSERVER"]},{"file":"00-skill-pacing.js","apis":["KVPV_SKILL_PACING"]},{"file":"00-spending-policy.js","apis":["KVPV_SPENDING_POLICY"]},{"file":"00-territory-loot.js","apis":["KVPV_TERRITORY_LOOT"]},{"file":"00-thienquan-scope.js","apis":["KVPV_TQ_SCOPE"]},{"file":"00-tq-basic-profile.js","apis":["KVPV_TQ_BASIC_PROFILE"]},{"file":"01-identity.js","apis":[]},{"file":"01-parallel-actions.js","apis":["KVPV_PARALLEL_ACTIONS"]},{"file":"01-quest-priority.js","apis":["KVPV_QUEST_PRIORITY"]},{"file":"01-red-dot-module.js","apis":["KVPV_ADVENTURE","KVPV_RED_DOT","KVPV_RED_DOT_MODULE"]},{"file":"02-scene.js","apis":[]},{"file":"03-daily-core.js","apis":["KVPV_DAILY","KVPV_RED_DOT_TASKS","KVPV_TD925","KVPV_TULA27"]},{"file":"03-timeline.js","apis":[]},{"file":"04-engine.js","apis":["KVPV_ALWAYS923","KVPV_ASYNC_V35","KVPV_AUDIT28","KVPV_BG_RESOURCES","KVPV_BIENTHAN33","KVPV_BOSS92","KVPV_BOSS921","KVPV_BOSS_POSITION","KVPV_BUILD_CLEAN","KVPV_CUONG_HOA","KVPV_DAILY","KVPV_DUC_HON","KVPV_EVENTS9","KVPV_FAST926","KVPV_FOCUS922","KVPV_GEAR36","KVPV_HEALTH34","KVPV_HITRUN1","KVPV_HITRUN_AUTO","KVPV_HITRUN_FIX","KVPV_KHAM_DA_HON","KVPV_LINHLUNG922","KVPV_MAIL_AUTO","KVPV_MAIN_SOLO","KVPV_MATHAN32","KVPV_MATHAN_READY","KVPV_QUEST_ATLAS","KVPV_QUEST_GUARD","KVPV_SMELT25","KVPV_SOLO_EXP30","KVPV_TD925","KVPV_TIANKIEP45","KVPV_TIENVI_AUTO","KVPV_TIEN_PHU","KVPV_TOWER_MANUAL925","KVPV_TQ112","KVPV_TQ113","KVPV_TQ114","KVPV_TQ115","KVPV_TQ117","KVPV_TQ118","KVPV_TQ119","KVPV_TULA26","KVPV_TULA27","KVPV_TU_VUOT","KVPV_TU_VUOT_ASYNC","KVPV_UNIFIED29","KVPV_UNIVERSAL35","KVPV_UNIVERSAL36","KVPV_UPGRADES","KVPV_V121_PERF","KVPV_V122_RETURN","KVPV_V123_SURVIVAL","KVPV_V124_EFFICIENCY","KVPV_V125_ORBIT","KVPV_V126_SIGNAL","KVPV_V127_BASIC","KVPV_V127_HEAL","KVPV_V129_RANGE","KVPV_V12_COMBAT","KVPV_V8","KVPV_V81","KVPV_V82","KVPV_V83","KVPV_V84","KVPV_V85","KVPV_V86","KVPV_V863","KVPV_V864","KVPV_V865","KVPV_V866","KVPV_V868","KVPV_V870","KVPV_V871","KVPV_V873","KVPV_V874","KVPV_V875","KVPV_V876","KVPV_V877","KVPV_V878","KVPV_V878_STRENGTH","KVPV_V879_FAST","KVPV_V879_STONE","KVPV_V880","KVPV_V881","KVPV_V9","KVPV_V92","KVPV_V921","KVPV_V922","KVPV_V923","KVPV_V924_STAR"]},{"file":"05-event-manager.js","apis":["KVPV_EVENTS13","KVPV_EVENTS24","KVPV_EVENTS25"]},{"file":"06-range.js","apis":[]},{"file":"07-th300-hitrun-compat.js","apis":["KVPV_HITRUN1","KVPV_HITRUN_AUTO"]},{"file":"07-tuyet-hoc.js","apis":[]},{"file":"08-range-evidence.js","apis":["KVPV_TH300","KVPV_TQ_BASIC_PROFILE","KVPV_TQ_SINGLE_STRONGEST_TH"]},{"file":"09-boss-unified.js","apis":["KVPV_BOSS_UNIFIED"]},{"file":"09-combat-engine.js","apis":["KVPV_COMBAT_ENGINE"]},{"file":"09-modes.js","apis":["KVPV_MODE"]},{"file":"09-range-keeper310.js","apis":["KVPV_RANGE_KEEP310"]},{"file":"09-th300-scan-default.js","apis":["KVPV_TH300_RESTORE","KVPV_TQ_POSITION_ONLY"]},{"file":"09-tq-ma-than.js","apis":["KVPV_TQ_MA_THAN"]},{"file":"10-experimental-boost.js","apis":["KVPV_EXPERIMENTAL_BOOST"]},{"file":"10-tq-basic-force.js","apis":["KVPV_TQ_BASIC_FORCE"]},{"file":"11-auto-tianquan.js","apis":["KVPV_TQ_POSITION_ONLY","KVPV_TQ_SINGLE_STRONGEST_TH"]},{"file":"12-basic-outside.js","apis":["KVPV_BASIC10"]},{"file":"13-transform-skills.js","apis":["KVPV_TRANSFORM10"]},{"file":"14-eight-floor.js","apis":["KVPV_EIGHT_FLOOR"]},{"file":"15-honor-targets.js","apis":["KVPV_HONOR_TARGET"]},{"file":"16-phu-van-th.js","apis":[]},{"file":"16-strongest-team.js","apis":["KVPV_STRONGEST_TEAM"]},{"file":"17-linh-lung-th.js","apis":["KVPV_LINHLUNG_TH"]},{"file":"18-supervisors.js","apis":["KVPV_V111_COMBAT","KVPV_V11_STABLE"]},{"file":"19-account-features.js","apis":["KVPV_ACCOUNT_FEATURES","KVPV_ASYNC928","KVPV_FAST927","KVPV_QUEST929","KVPV_RUNES930","KVPV_RUNE_INLAY931","KVPV_STAR_REWARD932","KVPV_TD925"]},{"file":"20-daily-trial.js","apis":["KVPV_DAILY_TRIAL"]},{"file":"21-quick-use.js","apis":["KVPV_QUICK_USE"]},{"file":"22-confirm-popups.js","apis":["KVPV_CONFIRM_POPUPS"]},{"file":"23-beast-island.js","apis":["KVPV_BEAST_ISLAND"]},{"file":"24-summon-boss.js","apis":["KVPV_SUMMON_BOSS"]},{"file":"25-rune-boss.js","apis":["KVPV_RUNE_BOSS"]},{"file":"26-fabao-fast.js","apis":["KVPV_FABAO_FAST"]},{"file":"27-craft-low.js","apis":["KVPV_CRAFT_LOW"]},{"file":"28-appearance-auto.js","apis":["KVPV_APPEARANCE_AUTO"]},{"file":"29-quest-goals.js","apis":["KVPV_QUEST_GOALS"]},{"file":"30-tienvi-goals.js","apis":["KVPV_TIENVI_GOALS"]},{"file":"31-cuu-tieu-lenh.js","apis":["KVPV_CUU_TIEU_LENH"]},{"file":"31-four-async-scans.js","apis":["KVPV_FOUR_SCANS"]},{"file":"31-map-task-radar.js","apis":["KVPV_MAP_TASK_RADAR"]},{"file":"31-skill-rewards.js","apis":["KVPV_SKILL_REWARDS"]},{"file":"32-combat-stall.js","apis":[]},{"file":"32-thac-an-cd0.js","apis":[]},{"file":"32-xa-menh-lv2-cd0.js","apis":[]},{"file":"33-progress-planner.js","apis":["KVPV_PROGRESS_PLANNER"]},{"file":"34-co-bao-native.js","apis":["KVPV_CO_BAO_NATIVE"]},{"file":"34-fabao-treasure.js","apis":["KVPV_FABAO_TREASURE","KVPV_TREASURE_AUTO"]},{"file":"35-equipment-treasure.js","apis":["KVPV_EQUIPMENT_TREASURE"]},{"file":"36-fast-actions.js","apis":[]},{"file":"37-reborn-goals.js","apis":["KVPV_REBORN_GOALS"]},{"file":"38-reborn-executors.js","apis":["KVPV_REBORN_EXECUTORS"]},{"file":"39-executor-report.js","apis":["KVPV_EXECUTOR_REPORT"]},{"file":"40-soul-stone-fast.js","apis":["KVPV_SOUL_STONE_FAST"]},{"file":"41-season-rewards.js","apis":["KVPV_SEASON_REWARDS"]},{"file":"42-world-eye.js","apis":["KVPV_WORLD_EYE"]},{"file":"43-context-brain.js","apis":["KVPV_CONTEXT_BRAIN"]},{"file":"44-red-navigator.js","apis":["KVPV_RED_NAVIGATOR"]},{"file":"45-monster-plate.js","apis":["KVPV_MONSTER_PLATE"]},{"file":"46-team-coordinator.js","apis":["KVPV_TEAM_COORDINATOR"]},{"file":"47-boss-team.js","apis":["KVPV_BOSS_TEAM"]},{"file":"48-guild-boss.js","apis":["KVPV_GUILD_BOSS"]},{"file":"49-adventure.js","apis":["KVPV_ADVENTURE"]},{"file":"50-companion-combat.js","apis":["KVPV_COMPANION_COMBAT"]},{"file":"51-demon-king-recovery.js","apis":["KVPV_DEMON_KING_RECOVERY"]},{"file":"52-item-trace.js","apis":["KVPV_ITEM_TRACE"]},{"file":"55-crystal-capture.js","apis":["KVPV_CRYSTAL_CAPTURE"]},{"file":"56-free-treasure.js","apis":["KVPV_FREE_TREASURE"]},{"file":"57-free-daily-bag.js","apis":["KVPV_FREE_DAILY_BAG"]},{"file":"58-idle-daily.js","apis":["KVPV_IDLE_DAILY"]},{"file":"59-road-cadence.js","apis":["KVPV_ROAD_CADENCE"]},{"file":"60-quiz-auto.js","apis":["KVPV_QUIZ_AUTO"]},{"file":"61-peak-chest.js","apis":["KVPV_PEAK_CHEST"]},{"file":"62-event-priority.js","apis":["KVPV_EVENT_PRIORITY"]},{"file":"62-resume-stage.js","apis":[]},{"file":"63-peak-completion.js","apis":["KVPV_PEAK_COMPLETION"]},{"file":"64-eight-chest.js","apis":["KVPV_EIGHT_CHEST"]},{"file":"65-marry-arena.js","apis":["KVPV_MARRY_ARENA"]},{"file":"66-pet-travel.js","apis":["KVPV_PET_TRAVEL"]},{"file":"67-login-streak.js","apis":["KVPV_LOGIN_STREAK"]},{"file":"68-festival-free.js","apis":["KVPV_FESTIVAL_FREE"]},{"file":"69-marry-rewards.js","apis":["KVPV_MARRY_REWARDS"]},{"file":"70-four-worship.js","apis":["KVPV_FOUR_WORSHIP"]},{"file":"71-kiem-khieu-basic.js","apis":["KVPV_KIEM_KHIEU_BASIC"]},{"file":"71-kiem-khieu.js","apis":["KVPV_KIEM_KHIEU"]},{"file":"72-bag-open-session.js","apis":["KVPV_BAG_OPEN_SESSION"]},{"file":"72-desktop-control.js","apis":["KVPV_DESKTOP_CONTROL"]},{"file":"73-frame-click.js","apis":[]},{"file":"74-tien-ton-native-auto.js","apis":["KVPV_TIEN_TON_AUTO"]},{"file":"75-pvp-luofeng.js","apis":[]},{"file":"76-trutien-pvp.js","apis":[]},{"file":"77-strongest-team-pvp.js","apis":[]},{"file":"78-tula-pvp.js","apis":[]},{"file":"79-honghoang-map-ready.js","apis":["KVPV_HONG_MAP_READY"]},{"file":"79-mathan-rage.js","apis":["KVPV_MATHAN_RAGE"]},{"file":"80-diet-tho-hao-auto.js","apis":["KVPV_DIET_THO_HAO_AUTO"]},{"file":"80-tienma-quyetchien-pvp.js","apis":[]},{"file":"81-tranh-ba-tu-phuong-pvp.js","apis":[]},{"file":"82-move-visual99.js","apis":["KVPV_MOVE_VISUAL99"]},{"file":"83-movement-observer.js","apis":["KVPV_MOVEMENT_OBSERVER"]},{"file":"84-basic310-universal.js","apis":["KVPV_BASIC310_UNIVERSAL"]},{"file":"85-le-hoi-khu-thu-boss.js","apis":[]},{"file":"86-dinh-cao-basic-combo.js","apis":[]},{"file":"86-tien-duyen-dai-chien.js","apis":["KVPV_TIEN_DUYEN_DAI_CHIEN"]},{"file":"86-xianfu-tasks.js","apis":["KVPV_XIANFU_TASKS"]},{"file":"87-crossserver-achievements.js","apis":["KVPV_CROSSSERVER_ACHIEVEMENTS"]},{"file":"88-lilian-team-rewards.js","apis":["KVPV_LILIAN_TEAM_REWARDS"]},{"file":"89-free-daily-sign.js","apis":["KVPV_FREE_DAILY_SIGN"]},{"file":"99-manual-entry.js","apis":["KVPV_MANUAL_ENTRY"]},{"file":"99-z-pb-boss-daily.js","apis":["KVPV_PB_BOSS_DAILY"]}],"consolidatedSources":[],"embeddedModules":["00-boss-recovery.js","00-preflight.js","00-daily-clock.js","00-manual-entry-policy.js","00-spending-policy.js","00-account-policy.js","00-far-scope.js","00-thienquan-scope.js","00-combat-metrics.js","00-skill-pacing.js","00-tq-basic-profile.js","00-territory-loot.js","02-scene.js","03-timeline.js","06-range.js","08-range-evidence.js","32-combat-stall.js","39-executor-report.js","43-context-brain.js","99-z-pb-boss-daily.js","07-tuyet-hoc.js","09-modes.js","09-th300-scan-default.js","16-phu-van-th.js","36-fast-actions.js","72-desktop-control.js","73-frame-click.js","99-manual-entry.js"]});
if(window.KVPV_V1){
if(window.__KVPV_RUST_CORE_BUILD!=="8de9c0f29668bf3516737110bfd8068aebecc69c1eaccf03cef0d1bd7d9dd442"){const encoded=atob("AGFzbQEAAAABIAVgAn9/AX9gAnx8AX9gAnx8AXxgAXwBf2AEfHx8fAF8AwcGAAECAwQABAUBcAEBAQUDAQAQB7ABBwZtZW1vcnkCABlrdnB2X2FjY291bnRfcG9sbGluZ19tb2RlAAAaa3Zwdl9ib3NzX3JlY292ZXJ5X2Z1bGxfaHAAARhrdnB2X2Jvc3NfcmVjb3ZlcnlfcmFuZ2UAAh5rdnB2X2Jvc3NfcmVjb3ZlcnlfcmFuZ2Vfa25vd24AAxdrdnB2X2Jvc3NfcmVjb3ZlcnlfcmluZwAEFGt2cHZfcHJlZmxpZ2h0X3JlYWR5AAUK7QIGDgBBAUEAQQIgARsgABsLWAEBfiAAvUIBhkKAgICAgICAcFQgAb0iAkJ/fEL/////////B1QgAkL///////////8Ag0KAgICAgICAeHxCgICAgICAgPD/AFQgAkJ/VXFyIAAgAWZxcQtKAQF+IAAgASAAIAC9IgJCAFMbIAEgAkL///////////8Ag0KAgICAgICAeHxCgICAgICAgPD/AFQbIAJCf3xC/////////wdUGwtBAQF+IAC9IgFCf3xC/////////wdUIAFC////////////AINCgICAgICAgHh8QoCAgICAgIDw/wBUIAFCf1VxcgtrAQF+IAAgASAAIAC9IgRCAFMbIAEgBEL///////////8Ag0KAgICAgICAeHxCgICAgICAgPD/AFQbIARCf3xC/////////wdUGyACoCIAIAMgAyADYhsiAyADIAAgACAAYhsiACADIABkGwsKACABIABxIAFGCwC/AQRuYW1lABQTa3Zwdl9ydXN0X2NvcmUud2FzbQGhAQYAGWt2cHZfYWNjb3VudF9wb2xsaW5nX21vZGUBGmt2cHZfYm9zc19yZWNvdmVyeV9mdWxsX2hwAhhrdnB2X2Jvc3NfcmVjb3ZlcnlfcmFuZ2UDHmt2cHZfYm9zc19yZWNvdmVyeV9yYW5nZV9rbm93bgQXa3Zwdl9ib3NzX3JlY292ZXJ5X3JpbmcFFGt2cHZfcHJlZmxpZ2h0X3JlYWR5AE0JcHJvZHVjZXJzAghsYW5ndWFnZQEEUnVzdAAMcHJvY2Vzc2VkLWJ5AQVydXN0Yx0xLjk5LjEgKDU4Y2Y4ZjljMyAyMDI2LTEwLTEzKQCUAQ90YXJnZXRfZmVhdHVyZXMIKwtidWxrLW1lbW9yeSsPYnVsay1tZW1vcnktb3B0KxZjYWxsLWluZGlyZWN0LW92ZXJsb25nKwptdWx0aXZhbHVlKw9tdXRhYmxlLWdsb2JhbHMrE25vbnRyYXBwaW5nLWZwdG9pbnQrD3JlZmVyZW5jZS10eXBlcysIc2lnbi1leHQ=");const bytes=Uint8Array.from(encoded,c=>c.charCodeAt(0));const exports=new WebAssembly.Instance(new WebAssembly.Module(bytes)).exports;if(typeof exports.kvpv_preflight_ready!=='function'||typeof exports.kvpv_account_polling_mode!=='function'||typeof exports.kvpv_boss_recovery_range!=='function'||typeof exports.kvpv_boss_recovery_range_known!=='function'||typeof exports.kvpv_boss_recovery_ring!=='function'||typeof exports.kvpv_boss_recovery_full_hp!=='function')throw Error('Rust/WASM export missing');window.__KVPV_RUST_CORE=Object.freeze({preflightReady:exports.kvpv_preflight_ready,accountPollingMode:exports.kvpv_account_polling_mode,bossRecoveryRange:exports.kvpv_boss_recovery_range,bossRecoveryRangeKnown:exports.kvpv_boss_recovery_range_known,bossRecoveryRing:exports.kvpv_boss_recovery_ring,bossRecoveryFullHP:exports.kvpv_boss_recovery_full_hp});window.__KVPV_RUST_CORE_BUILD="8de9c0f29668bf3516737110bfd8068aebecc69c1eaccf03cef0d1bd7d9dd442";}
const actor=String(window._Ba?._rJ?._O$?.ins?.actorId??'');
if(/^[1-9]\d{4,24}$/.test(actor)&&!window.__KVPV_OWN_ACTOR_ID&&typeof window._ft!=='undefined'&&typeof window._Sa!=='undefined')Object.defineProperty(window,'__KVPV_OWN_ACTOR_ID',{value:actor,enumerable:false,writable:false,configurable:false});
if(!actor||actor!==String(window.__KVPV_OWN_ACTOR_ID??'')||window.__KVPV_UNIVERSAL_HALTED){console.error('[KVPV V1] Reload blocked: actor changed or session halted.');return;}

const W=window;
if(!W.KVPV_V1){console.warn("[KVPV] Live update skipped: V1 session unavailable");return;}
if(W._Ba?._rJ?._O$?.ins?.isDead===true)throw Error("Hồi sinh nhân vật trước khi chạy bản vá");
if(String(W.__KVPV_OWN_ACTOR_ID)!==String(W._Ba?._rJ?._O$?.ins?.actorId)||W.__KVPV_UNIVERSAL_HALTED)throw Error("Actor/session mismatch");
W.KVPV_TQ_SINGLE_STRONGEST_TH=false;W.KVPV_TH300?.setBasicOnly?.(false);W.KVPV_TH300?.setTianQuanTuyetHoc?.(false);W.KVPV_TH300?.setTianQuanFiveBasics?.(false);W.KVPV_TH300?.stop?.('user');W.KVPV_TQ_BASIC_FORCE?.stop?.('native combat restored');W.KVPV_MODE?.stop?.("Custom skill controllers removed");W.KVPV_COMBAT_ENGINE?.stop?.();W.KVPV_BASIC310_UNIVERSAL?.stop?.();W.KVPV_TQ_8001_CD?.stop?.('native combat restored');W.KVPV_BEAST_ISLAND?.stop?.();W.KVPV_COMPANION_COMBAT?.stop?.();W.KVPV_KIEM_KHIEU_BASIC?.stop?.();W.KVPV_TRUTIEN_PVP?.stop?.();W.KVPV_STRONGEST_PVP?.stop?.();W.KVPV_TIENMA_PVP?.stop?.();W.KVPV_TRANH_BA_TU_PHUONG?.stop?.();W.KVPV_LE_HOI_KHU_THU?.stop?.();W.KVPV_PVP_LUOFENG?.stop?.();W.KVPV_STRONGEST_TEAM?.stop?.();W.KVPV_HONOR_TARGET?.stop?.();W.KVPV_BASIC10?.stop?.();W.KVPV_STAND281?.stop?.();
}else{

 

const __KVPV_V1_READY = (() => {

  'use strict';

  const W = window;

  const actor = typeof _Ba === 'undefined' ? '' : String(_Ba?._rJ?._O$?.ins?.actorId ?? '');

  if (!/^[1-9]\d{4,24}$/.test(actor) || typeof _ft === 'undefined' || typeof _Sa === 'undefined') {

    console.error('[KVPV V1] Chọn game-frame và đợi nhân vật tải xong.');

    return;

  }

  if (W.KVPV_V1 || W.KVPV_MAIN_SOLO?.installed || W.KVPV_V881?.installed ||

      W.__KVPV_UNIVERSAL_HALTED || (W.__KVPV_OWN_ACTOR_ID && W.__KVPV_OWN_ACTOR_ID !== actor)) {

    console.error('[KVPV V1] F5 game trước khi nạp lại hoặc đổi nhân vật.');

    return;

  }

  

  const errors = [];

  let errorCount = 0;

  const diagnostics = Object.freeze({

    record(error) {

      errorCount++;

      errors.push({at:Date.now(),message:String(error?.message ?? error).slice(0,1000)});

      if (errors.length > 100) errors.shift();

    },

    status() { return {total:errorCount,recent:errors.map(item => ({...item}))}; },

    clear() { errors.length=0;errorCount=0; }

  });

  

  const intervals = new Map(), timeouts = new Map();

  const timerAPI = Object.freeze({

    setInterval(callback, delay, ...args) {

      const handle = W.setInterval(callback, delay, ...args);

      intervals.set(handle, {delay, name:callback?.name || 'anonymous'});

      return handle;

    },

    clearInterval(handle) {

      intervals.delete(handle);timeouts.delete(handle);

      return W.clearInterval(handle);

    },

    setTimeout(callback, delay, ...args) {

      // Native string handlers keep their original semantics.

      if (typeof callback !== 'function') return W.setTimeout(callback, delay, ...args);

      const handle = W.setTimeout(function (...values) {

        timeouts.delete(handle);

        return callback.apply(this, values);

      }, delay, ...args);

      timeouts.set(handle, {delay, name:callback.name || 'anonymous'});

      return handle;

    },

    clearTimeout(handle) {

      timeouts.delete(handle);intervals.delete(handle);

      return W.clearTimeout(handle);

    },

    status() {

      return {intervals:intervals.size,timeouts:timeouts.size,

        tasks:[...intervals.values()].map(item => ({...item}))};

    }

  });

  const build=typeof __KVPV_V1_BUILD==='undefined'?null:__KVPV_V1_BUILD;

  // Lock the observed game actor before any live installer captures ownership.
  if(!Object.getOwnPropertyDescriptor(W,'__KVPV_OWN_ACTOR_ID'))
    Object.defineProperty(W,'__KVPV_OWN_ACTOR_ID',{value:actor,enumerable:false,writable:false,configurable:false});
  W.KVPV_V1 = Object.freeze({version:'1.0.0',build,diagnostics,timers:timerAPI});

  return true;

})();


if(!__KVPV_V1_READY)return;
if(window.__KVPV_RUST_CORE_BUILD!=="8de9c0f29668bf3516737110bfd8068aebecc69c1eaccf03cef0d1bd7d9dd442"){const encoded=atob("AGFzbQEAAAABIAVgAn9/AX9gAnx8AX9gAnx8AXxgAXwBf2AEfHx8fAF8AwcGAAECAwQABAUBcAEBAQUDAQAQB7ABBwZtZW1vcnkCABlrdnB2X2FjY291bnRfcG9sbGluZ19tb2RlAAAaa3Zwdl9ib3NzX3JlY292ZXJ5X2Z1bGxfaHAAARhrdnB2X2Jvc3NfcmVjb3ZlcnlfcmFuZ2UAAh5rdnB2X2Jvc3NfcmVjb3ZlcnlfcmFuZ2Vfa25vd24AAxdrdnB2X2Jvc3NfcmVjb3ZlcnlfcmluZwAEFGt2cHZfcHJlZmxpZ2h0X3JlYWR5AAUK7QIGDgBBAUEAQQIgARsgABsLWAEBfiAAvUIBhkKAgICAgICAcFQgAb0iAkJ/fEL/////////B1QgAkL///////////8Ag0KAgICAgICAeHxCgICAgICAgPD/AFQgAkJ/VXFyIAAgAWZxcQtKAQF+IAAgASAAIAC9IgJCAFMbIAEgAkL///////////8Ag0KAgICAgICAeHxCgICAgICAgPD/AFQbIAJCf3xC/////////wdUGwtBAQF+IAC9IgFCf3xC/////////wdUIAFC////////////AINCgICAgICAgHh8QoCAgICAgIDw/wBUIAFCf1VxcgtrAQF+IAAgASAAIAC9IgRCAFMbIAEgBEL///////////8Ag0KAgICAgICAeHxCgICAgICAgPD/AFQbIARCf3xC/////////wdUGyACoCIAIAMgAyADYhsiAyADIAAgACAAYhsiACADIABkGwsKACABIABxIAFGCwC/AQRuYW1lABQTa3Zwdl9ydXN0X2NvcmUud2FzbQGhAQYAGWt2cHZfYWNjb3VudF9wb2xsaW5nX21vZGUBGmt2cHZfYm9zc19yZWNvdmVyeV9mdWxsX2hwAhhrdnB2X2Jvc3NfcmVjb3ZlcnlfcmFuZ2UDHmt2cHZfYm9zc19yZWNvdmVyeV9yYW5nZV9rbm93bgQXa3Zwdl9ib3NzX3JlY292ZXJ5X3JpbmcFFGt2cHZfcHJlZmxpZ2h0X3JlYWR5AE0JcHJvZHVjZXJzAghsYW5ndWFnZQEEUnVzdAAMcHJvY2Vzc2VkLWJ5AQVydXN0Yx0xLjk5LjEgKDU4Y2Y4ZjljMyAyMDI2LTEwLTEzKQCUAQ90YXJnZXRfZmVhdHVyZXMIKwtidWxrLW1lbW9yeSsPYnVsay1tZW1vcnktb3B0KxZjYWxsLWluZGlyZWN0LW92ZXJsb25nKwptdWx0aXZhbHVlKw9tdXRhYmxlLWdsb2JhbHMrE25vbnRyYXBwaW5nLWZwdG9pbnQrD3JlZmVyZW5jZS10eXBlcysIc2lnbi1leHQ=");const bytes=Uint8Array.from(encoded,c=>c.charCodeAt(0));const exports=new WebAssembly.Instance(new WebAssembly.Module(bytes)).exports;if(typeof exports.kvpv_preflight_ready!=='function'||typeof exports.kvpv_account_polling_mode!=='function'||typeof exports.kvpv_boss_recovery_range!=='function'||typeof exports.kvpv_boss_recovery_range_known!=='function'||typeof exports.kvpv_boss_recovery_ring!=='function'||typeof exports.kvpv_boss_recovery_full_hp!=='function')throw Error('Rust/WASM export missing');window.__KVPV_RUST_CORE=Object.freeze({preflightReady:exports.kvpv_preflight_ready,accountPollingMode:exports.kvpv_account_polling_mode,bossRecoveryRange:exports.kvpv_boss_recovery_range,bossRecoveryRangeKnown:exports.kvpv_boss_recovery_range_known,bossRecoveryRing:exports.kvpv_boss_recovery_ring,bossRecoveryFullHP:exports.kvpv_boss_recovery_full_hp});window.__KVPV_RUST_CORE_BUILD="8de9c0f29668bf3516737110bfd8068aebecc69c1eaccf03cef0d1bd7d9dd442";}
}
window.__KVPV_CONTROL_SCHEMA=Object.freeze({"00-boss-session.js":["KVPV_BOSS_LOG"],"00-material-reserve.js":["KVPV_MATERIAL_RESERVE"],"00-skill-async-observer.js":["KVPV_SKILL_ASYNC_OBSERVER"],"01-parallel-actions.js":["KVPV_PARALLEL_ACTIONS"],"01-quest-priority.js":["KVPV_QUEST_PRIORITY"],"01-red-dot-module.js":["KVPV_ADVENTURE","KVPV_RED_DOT_MODULE"],"03-daily-core.js":["KVPV_DAILY"],"04-engine.js":["KVPV_ALWAYS923","KVPV_BIENTHAN33","KVPV_DAILY","KVPV_FAST926","KVPV_FOCUS922","KVPV_HEALTH34","KVPV_HITRUN_AUTO","KVPV_QUEST_ATLAS","KVPV_TIENVI_AUTO","KVPV_TOWER_MANUAL925","KVPV_TQ112","KVPV_TQ113","KVPV_TQ114","KVPV_TQ115","KVPV_TQ117","KVPV_TQ118","KVPV_TQ119","KVPV_UNIVERSAL35","KVPV_UNIVERSAL36","KVPV_UPGRADES","KVPV_V121_PERF","KVPV_V122_RETURN","KVPV_V8","KVPV_V82","KVPV_V83","KVPV_V84","KVPV_V85","KVPV_V868","KVPV_V871","KVPV_V873","KVPV_V874","KVPV_V875","KVPV_V876","KVPV_V877","KVPV_V878","KVPV_V878_STRENGTH","KVPV_V879_STONE","KVPV_V880","KVPV_V881","KVPV_V9","KVPV_V924_STAR"],"05-event-manager.js":["KVPV_EVENTS13","KVPV_EVENTS24","KVPV_EVENTS25"],"07-th300-hitrun-compat.js":["KVPV_HITRUN1","KVPV_HITRUN_AUTO"],"09-boss-unified.js":["KVPV_BOSS_UNIFIED"],"09-combat-engine.js":"KVPV_COMBAT_ENGINE","09-range-keeper310.js":["KVPV_RANGE_KEEP310"],"09-tq-ma-than.js":["KVPV_TQ_MA_THAN"],"10-experimental-boost.js":["KVPV_EXPERIMENTAL_BOOST"],"10-tq-basic-force.js":["KVPV_TQ_BASIC_FORCE"],"12-basic-outside.js":["KVPV_BASIC10"],"13-transform-skills.js":["KVPV_TRANSFORM10"],"14-eight-floor.js":"KVPV_EIGHT_FLOOR","15-honor-targets.js":"KVPV_HONOR_TARGET","16-strongest-team.js":"KVPV_STRONGEST_TEAM","17-linh-lung-th.js":"KVPV_LINHLUNG_TH","18-supervisors.js":["KVPV_V111_COMBAT","KVPV_V11_STABLE"],"19-account-features.js":["KVPV_ASYNC928"],"20-daily-trial.js":"KVPV_DAILY_TRIAL","21-quick-use.js":["KVPV_QUICK_USE"],"22-confirm-popups.js":["KVPV_CONFIRM_POPUPS"],"23-beast-island.js":["KVPV_BEAST_ISLAND"],"24-summon-boss.js":"KVPV_SUMMON_BOSS","25-rune-boss.js":"KVPV_RUNE_BOSS","26-fabao-fast.js":["KVPV_FABAO_FAST"],"27-craft-low.js":["KVPV_CRAFT_LOW"],"28-appearance-auto.js":["KVPV_APPEARANCE_AUTO"],"29-quest-goals.js":["KVPV_QUEST_GOALS"],"30-tienvi-goals.js":["KVPV_TIENVI_GOALS"],"31-cuu-tieu-lenh.js":["KVPV_CUU_TIEU_LENH"],"31-four-async-scans.js":["KVPV_FOUR_SCANS"],"31-map-task-radar.js":["KVPV_MAP_TASK_RADAR"],"31-skill-rewards.js":["KVPV_SKILL_REWARDS"],"33-progress-planner.js":["KVPV_PROGRESS_PLANNER"],"34-co-bao-native.js":["KVPV_CO_BAO_NATIVE"],"34-fabao-treasure.js":["KVPV_FABAO_TREASURE"],"35-equipment-treasure.js":["KVPV_EQUIPMENT_TREASURE"],"37-reborn-goals.js":["KVPV_REBORN_GOALS"],"38-reborn-executors.js":["KVPV_REBORN_EXECUTORS"],"40-soul-stone-fast.js":["KVPV_SOUL_STONE_FAST"],"41-season-rewards.js":["KVPV_SEASON_REWARDS"],"42-world-eye.js":["KVPV_WORLD_EYE"],"44-red-navigator.js":["KVPV_RED_NAVIGATOR"],"45-monster-plate.js":["KVPV_MONSTER_PLATE"],"46-team-coordinator.js":["KVPV_TEAM_COORDINATOR"],"47-boss-team.js":["KVPV_BOSS_TEAM"],"48-guild-boss.js":["KVPV_GUILD_BOSS"],"49-adventure.js":["KVPV_ADVENTURE"],"50-companion-combat.js":["KVPV_COMPANION_COMBAT"],"51-demon-king-recovery.js":["KVPV_DEMON_KING_RECOVERY"],"52-item-trace.js":["KVPV_ITEM_TRACE"],"55-crystal-capture.js":["KVPV_CRYSTAL_CAPTURE"],"56-free-treasure.js":"KVPV_FREE_TREASURE","57-free-daily-bag.js":"KVPV_FREE_DAILY_BAG","58-idle-daily.js":["KVPV_IDLE_DAILY"],"59-road-cadence.js":"KVPV_ROAD_CADENCE","60-quiz-auto.js":"KVPV_QUIZ_AUTO","61-peak-chest.js":"KVPV_PEAK_CHEST","62-event-priority.js":["KVPV_EVENT_PRIORITY"],"63-peak-completion.js":"KVPV_PEAK_COMPLETION","64-eight-chest.js":"KVPV_EIGHT_CHEST","65-marry-arena.js":"KVPV_MARRY_ARENA","66-pet-travel.js":"KVPV_PET_TRAVEL","67-login-streak.js":"KVPV_LOGIN_STREAK","68-festival-free.js":"KVPV_FESTIVAL_FREE","69-marry-rewards.js":"KVPV_MARRY_REWARDS","70-four-worship.js":"KVPV_FOUR_WORSHIP","71-kiem-khieu-basic.js":["KVPV_KIEM_KHIEU_BASIC"],"71-kiem-khieu.js":"KVPV_KIEM_KHIEU","72-bag-open-session.js":["KVPV_BAG_OPEN_SESSION"],"79-honghoang-map-ready.js":["KVPV_HONG_MAP_READY"],"79-mathan-rage.js":["KVPV_MATHAN_RAGE"],"80-diet-tho-hao-auto.js":["KVPV_DIET_THO_HAO_AUTO"],"82-move-visual99.js":["KVPV_MOVE_VISUAL99"],"83-movement-observer.js":["KVPV_MOVEMENT_OBSERVER"],"84-basic310-universal.js":["KVPV_BASIC310_UNIVERSAL"],"86-tien-duyen-dai-chien.js":["KVPV_TIEN_DUYEN_DAI_CHIEN"],"86-xianfu-tasks.js":["KVPV_XIANFU_TASKS"],"87-crossserver-achievements.js":["KVPV_CROSSSERVER_ACHIEVEMENTS"],"88-lilian-team-rewards.js":["KVPV_LILIAN_TEAM_REWARDS"],"89-free-daily-sign.js":["KVPV_FREE_DAILY_SIGN"],"74-tien-ton-native-auto.js":"KVPV_TIEN_TON_AUTO","75-pvp-luofeng.js":"KVPV_PVP_LUOFENG","76-trutien-pvp.js":"KVPV_TRUTIEN_PVP","77-strongest-team-pvp.js":"KVPV_STRONGEST_PVP","78-tula-pvp.js":"KVPV_TULA_PVP","80-tienma-quyetchien-pvp.js":"KVPV_TIENMA_PVP","81-tranh-ba-tu-phuong-pvp.js":"KVPV_TRANH_BA_TU_PHUONG","11-auto-tianquan.js":"KVPV_TQ_AUTO_CONTROL","62-resume-stage.js":"KVPV_STAGE_RESUME_CONTROL","85-le-hoi-khu-thu-boss.js":"KVPV_LE_HOI_KHU_THU","86-dinh-cao-basic-combo.js":"KVPV_DINH_CAO_BASIC_COMBO"});
window.__KVPV_CONTROL_PROFILE_VERSION=6;
/*__KVPV_MODULE_RUNTIME_START__*/
var __KVPV_RUNTIME_ENTRY = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // esm/runtime-profile.mjs
  var runtime_profile_exports = {};
  __export(runtime_profile_exports, {
    moduleInitializers: () => moduleInitializers
  });

  // esm/api.mjs
  function getKVPV_ACCOUNT_POLICY() {
    return globalThis.KVPV_ACCOUNT_POLICY;
  }
  function getKVPV_ADVENTURE() {
    return globalThis.KVPV_ADVENTURE;
  }
  function getKVPV_APPEARANCE_AUTO() {
    return globalThis.KVPV_APPEARANCE_AUTO;
  }
  function getKVPV_BAG_OPEN_SESSION() {
    return globalThis.KVPV_BAG_OPEN_SESSION;
  }
  function getKVPV_BASIC10() {
    return globalThis.KVPV_BASIC10;
  }
  function getKVPV_BOSS_LOG() {
    return globalThis.KVPV_BOSS_LOG;
  }
  function getKVPV_BOSS_POSITION() {
    return globalThis.KVPV_BOSS_POSITION;
  }
  function getKVPV_BOSS_TEAM() {
    return globalThis.KVPV_BOSS_TEAM;
  }
  function getKVPV_BUFF_INSPECT() {
    return globalThis.KVPV_BUFF_INSPECT;
  }
  function getKVPV_COMBAT_ENGINE() {
    return globalThis.KVPV_COMBAT_ENGINE;
  }
  function getKVPV_COMBAT_METRICS() {
    return globalThis.KVPV_COMBAT_METRICS;
  }
  function getKVPV_COMPANION_COMBAT() {
    return globalThis.KVPV_COMPANION_COMBAT;
  }
  function getKVPV_CONFIRM_POPUPS() {
    return globalThis.KVPV_CONFIRM_POPUPS;
  }
  function getKVPV_CONTEXT_BRAIN() {
    return globalThis.KVPV_CONTEXT_BRAIN;
  }
  function getKVPV_CRYSTAL_CAPTURE() {
    return globalThis.KVPV_CRYSTAL_CAPTURE;
  }
  function getKVPV_DAILY() {
    return globalThis.KVPV_DAILY;
  }
  function getKVPV_DAILY_CLOCK() {
    return globalThis.KVPV_DAILY_CLOCK;
  }
  function getKVPV_DAILY_TRIAL() {
    return globalThis.KVPV_DAILY_TRIAL;
  }
  function getKVPV_DEMON_KING_RECOVERY() {
    return globalThis.KVPV_DEMON_KING_RECOVERY;
  }
  function getKVPV_DESKTOP_CONTROL() {
    return globalThis.KVPV_DESKTOP_CONTROL;
  }
  function getKVPV_EIGHT_CHEST() {
    return globalThis.KVPV_EIGHT_CHEST;
  }
  function getKVPV_EIGHT_FLOOR() {
    return globalThis.KVPV_EIGHT_FLOOR;
  }
  function getKVPV_ENTRY_POLICY() {
    return globalThis.KVPV_ENTRY_POLICY;
  }
  function getKVPV_EVENT_PRIORITY() {
    return globalThis.KVPV_EVENT_PRIORITY;
  }
  function getKVPV_EXPERIMENTAL_BOOST() {
    return globalThis.KVPV_EXPERIMENTAL_BOOST;
  }
  function getKVPV_FAR_SCOPE() {
    return globalThis.KVPV_FAR_SCOPE;
  }
  function getKVPV_FESTIVAL_FREE() {
    return globalThis.KVPV_FESTIVAL_FREE;
  }
  function getKVPV_FOUR_WORSHIP() {
    return globalThis.KVPV_FOUR_WORSHIP;
  }
  function getKVPV_FREE_DAILY_BAG() {
    return globalThis.KVPV_FREE_DAILY_BAG;
  }
  function getKVPV_FREE_TREASURE() {
    return globalThis.KVPV_FREE_TREASURE;
  }
  function getKVPV_GUILD_BOSS() {
    return globalThis.KVPV_GUILD_BOSS;
  }
  function getKVPV_HITRUN1() {
    return globalThis.KVPV_HITRUN1;
  }
  function getKVPV_HITRUN_AUTO() {
    return globalThis.KVPV_HITRUN_AUTO;
  }
  function getKVPV_IDLE_DAILY() {
    return globalThis.KVPV_IDLE_DAILY;
  }
  function getKVPV_ITEM_TRACE() {
    return globalThis.KVPV_ITEM_TRACE;
  }
  function getKVPV_KIEM_KHIEU() {
    return globalThis.KVPV_KIEM_KHIEU;
  }
  function getKVPV_LINHLUNG922() {
    return globalThis.KVPV_LINHLUNG922;
  }
  function getKVPV_LINHLUNG_TH() {
    return globalThis.KVPV_LINHLUNG_TH;
  }
  function getKVPV_LOGIN_STREAK() {
    return globalThis.KVPV_LOGIN_STREAK;
  }
  function getKVPV_MANUAL_ENTRY() {
    return globalThis.KVPV_MANUAL_ENTRY;
  }
  function getKVPV_MARRY_ARENA() {
    return globalThis.KVPV_MARRY_ARENA;
  }
  function getKVPV_MARRY_REWARDS() {
    return globalThis.KVPV_MARRY_REWARDS;
  }
  function getKVPV_MODE() {
    return globalThis.KVPV_MODE;
  }
  function getKVPV_PARALLEL_ACTIONS() {
    return globalThis.KVPV_PARALLEL_ACTIONS;
  }
  function getKVPV_PB_BOSS_DAILY() {
    return globalThis.KVPV_PB_BOSS_DAILY;
  }
  function getKVPV_PEAK_CHEST() {
    return globalThis.KVPV_PEAK_CHEST;
  }
  function getKVPV_PEAK_COMPLETION() {
    return globalThis.KVPV_PEAK_COMPLETION;
  }
  function getKVPV_PET_TRAVEL() {
    return globalThis.KVPV_PET_TRAVEL;
  }
  function getKVPV_PHUVAN_TH() {
    return globalThis.KVPV_PHUVAN_TH;
  }
  function getKVPV_PROGRESS_PLANNER() {
    return globalThis.KVPV_PROGRESS_PLANNER;
  }
  function getKVPV_QUEST_PRIORITY() {
    return globalThis.KVPV_QUEST_PRIORITY;
  }
  function getKVPV_QUIZ_AUTO() {
    return globalThis.KVPV_QUIZ_AUTO;
  }
  function getKVPV_RANGE281() {
    return globalThis.KVPV_RANGE281;
  }
  function getKVPV_RANGE_KEEP310() {
    return globalThis.KVPV_RANGE_KEEP310;
  }
  function getKVPV_REBORN_EXECUTORS() {
    return globalThis.KVPV_REBORN_EXECUTORS;
  }
  function getKVPV_REBORN_GOALS() {
    return globalThis.KVPV_REBORN_GOALS;
  }
  function getKVPV_RED_DOT_MODULE() {
    return globalThis.KVPV_RED_DOT_MODULE;
  }
  function getKVPV_RED_NAVIGATOR() {
    return globalThis.KVPV_RED_NAVIGATOR;
  }
  function getKVPV_ROAD_CADENCE() {
    return globalThis.KVPV_ROAD_CADENCE;
  }
  function getKVPV_RUNE_BOSS() {
    return globalThis.KVPV_RUNE_BOSS;
  }
  function getKVPV_SEASON_REWARDS() {
    return globalThis.KVPV_SEASON_REWARDS;
  }
  function getKVPV_SKILL_PACING() {
    return globalThis.KVPV_SKILL_PACING;
  }
  function getKVPV_SOUL_STONE_FAST() {
    return globalThis.KVPV_SOUL_STONE_FAST;
  }
  function getKVPV_TEAM_COORDINATOR() {
    return globalThis.KVPV_TEAM_COORDINATOR;
  }
  function getKVPV_TH300() {
    return globalThis.KVPV_TH300;
  }
  function getKVPV_THAC_AN_CD0() {
    return globalThis.KVPV_THAC_AN_CD0;
  }
  function getKVPV_TH_FAR() {
    return globalThis.KVPV_TH_FAR;
  }
  function getKVPV_TIENVI_GOALS() {
    return globalThis.KVPV_TIENVI_GOALS;
  }
  function getKVPV_TIEN_TON_AUTO() {
    return globalThis.KVPV_TIEN_TON_AUTO;
  }
  function getKVPV_TOWER_SKILLS() {
    return globalThis.KVPV_TOWER_SKILLS;
  }
  function getKVPV_TQ112() {
    return globalThis.KVPV_TQ112;
  }
  function getKVPV_TQ113() {
    return globalThis.KVPV_TQ113;
  }
  function getKVPV_TQ_BASIC_FORCE() {
    return globalThis.KVPV_TQ_BASIC_FORCE;
  }
  function getKVPV_TQ_BASIC_PROFILE() {
    return globalThis.KVPV_TQ_BASIC_PROFILE;
  }
  function getKVPV_TQ_POSITION_ONLY() {
    return globalThis.KVPV_TQ_POSITION_ONLY;
  }
  function getKVPV_TQ_SCOPE() {
    return globalThis.KVPV_TQ_SCOPE;
  }
  function getKVPV_TQ_SINGLE_STRONGEST_TH() {
    return globalThis.KVPV_TQ_SINGLE_STRONGEST_TH;
  }
  function getKVPV_TRANSFORM10() {
    return globalThis.KVPV_TRANSFORM10;
  }
  function getKVPV_TRUTIEN_PVP() {
    return globalThis.KVPV_TRUTIEN_PVP;
  }
  function getKVPV_V1() {
    return globalThis.KVPV_V1;
  }
  function getKVPV_V127_BASIC() {
    return globalThis.KVPV_V127_BASIC;
  }
  function getKVPV_V866() {
    return globalThis.KVPV_V866;
  }
  function getKVPV_WORLD_EYE() {
    return globalThis.KVPV_WORLD_EYE;
  }
  function getKVPV_XA_MENH_LV2() {
    return globalThis.KVPV_XA_MENH_LV2;
  }

  // esm/modules/00-boss-recovery.mjs
  function __captureESMFunction(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal0;
  var __esmLocal1;
  var __esmLocal2;
  function initialize() {
    __captureESMFunction(__esmLocal0 = (() => {
      "use strict";
      const W = window, policy = Object.freeze({ leavePct: 35, returnPct: 100, margin: 80, minRing: 360, fallbackRange: 350 });
      const rustCore = W.__KVPV_RUST_CORE;
      if (typeof rustCore?.bossRecoveryRange !== "function" || typeof rustCore?.bossRecoveryRangeKnown !== "function" || typeof rustCore?.bossRecoveryRing !== "function" || typeof rustCore?.bossRecoveryFullHP !== "function")
        throw Error("Rust/WASM boss recovery policy unavailable");
      function geometry(nativeRange) {
        const value = Number(nativeRange);
        const range = rustCore.bossRecoveryRange(value, policy.fallbackRange);
        return {
          range,
          known: rustCore.bossRecoveryRangeKnown(value) === 1,
          ring: rustCore.bossRecoveryRing(value, policy.fallbackRange, policy.margin, policy.minRing)
        };
      }
      __esmLocal1 = geometry;
      function fullHP(hp) {
        if (!hp) return false;
        const current = Number.isFinite(hp.current) ? hp.current : Number.NaN;
        const maximum = Number.isFinite(hp.max) ? hp.max : Number.NaN;
        return rustCore.bossRecoveryFullHP(current, maximum) === 1;
      }
      __esmLocal2 = fullHP;
      W.KVPV_BOSS_RECOVERY = Object.freeze({ version: "1.0.0", policy, geometry, fullHP });
    }), "")();
  }
  var api = Object.freeze({
    get KVPV_BOSS_RECOVERY() {
      return globalThis.KVPV_BOSS_RECOVERY;
    }
  });

  // esm/modules/09-combat-engine.mjs
  function call_KVPV_COMBAT_ENGINE_status(...args) {
    const target = globalThis["KVPV_COMBAT_ENGINE"];
    const fn = globalThis["KVPV_COMBAT_ENGINE"]?.["status"];
    if (typeof fn !== "function") throw Error("KVPV_COMBAT_ENGINE.status is not available");
    return Reflect.apply(fn, target, args);
  }
  var api2 = Object.freeze({
    get KVPV_COMBAT_ENGINE() {
      return globalThis.KVPV_COMBAT_ENGINE;
    }
  });

  // esm/modules/00-preflight.mjs
  function __captureESMFunction2(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal02;
  var __esmLocal12;
  var __esmLocal22;
  var __esmLocal3;
  var __esmLocal4;
  var __esmLocal5;
  var __esmLocal6;
  var __esmLocal7;
  var __esmLocal8;
  function initialize2() {
    __captureESMFunction2(__esmLocal02 = (() => {
      "use strict";
      window.KVPV_CHECK = __captureESMFunction2(__esmLocal12 = (function KVPV_CHECK() {
        const W = window, checks = [];
        function check(name, fn) {
          try {
            checks.push({ name, ok: fn() === true });
          } catch (error) {
            checks.push({ name, ok: false, error: String(error?.message ?? error) });
          }
        }
        __esmLocal22 = check;
        check("session", __captureESMFunction2(__esmLocal3 = (() => !!getKVPV_V1() && !W.__KVPV_UNIVERSAL_HALTED), ""));
        check("actor identity", __captureESMFunction2(__esmLocal4 = (() => String(W.__KVPV_OWN_ACTOR_ID || "") !== "" && String(W.__KVPV_OWN_ACTOR_ID) === String(W._Ba?._rJ?._O$?.ins?.actorId ?? "")), ""));
        check("Red-dot progression core", __captureESMFunction2(__esmLocal5 = (() => typeof getKVPV_RED_DOT_MODULE()?.start === "function" && typeof getKVPV_RED_DOT_MODULE()?.register === "function"), ""));
        check("single Boss combat", __captureESMFunction2(__esmLocal6 = (() => typeof getKVPV_COMBAT_ENGINE()?.status === "function" && call_KVPV_COMBAT_ENGINE_status()?.singleSender === true), ""));
        check("combat log", __captureESMFunction2(__esmLocal7 = (() => typeof getKVPV_BOSS_LOG()?.start === "function"), ""));
        const rustCore = W.__KVPV_RUST_CORE;
        if (typeof rustCore?.preflightReady !== "function") throw Error("Rust/WASM preflight core unavailable");
        if (checks.length > 32) throw Error("Rust/WASM preflight supports at most 32 checks");
        const checkMask = checks.reduce(__captureESMFunction2(__esmLocal8 = ((mask, item, index) => item.ok ? mask | 1 << index : mask), ""), 0);
        const requiredMask = checks.length === 32 ? 4294967295 : (1 << checks.length) - 1;
        return {
          ready: rustCore.preflightReady(checkMask, requiredMask) === 1,
          build: getKVPV_V1()?.build ?? null,
          checks,
          diagnostics: getKVPV_V1()?.diagnostics?.status?.() ?? null,
          note: "Readiness only; game movement, healing and server reach still require an observed fight."
        };
      }), "KVPV_CHECK");
    }), "")();
  }
  var api3 = Object.freeze({
    get KVPV_CHECK() {
      return globalThis.KVPV_CHECK;
    }
  });

  // esm/modules/00-daily-clock.mjs
  function __captureESMFunction3(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal03;
  var __esmLocal13;
  var __esmLocal23;
  var __esmLocal32;
  function initialize3() {
    __captureESMFunction3(__esmLocal03 = (() => {
      "use strict";
      const W = window, DAY = 864e5, OFFSET = 2 * 36e5;
      const key = __captureESMFunction3(__esmLocal13 = ((at = Date.now()) => new Date(Number(at) + OFFSET).toISOString().slice(0, 10)), "key");
      const nextResetAt = __captureESMFunction3(__esmLocal23 = ((at = Date.now()) => (Math.floor((Number(at) + OFFSET) / DAY) + 1) * DAY - OFFSET), "nextResetAt");
      W.KVPV_DAILY_CLOCK = Object.freeze({ key, nextResetAt, status: __captureESMFunction3(__esmLocal32 = (() => ({ timezone: "Asia/Saigon", resetHour: 5, day: key(), nextResetAt: new Date(nextResetAt()).toISOString() })), "status") });
    }), "")();
  }
  var api4 = Object.freeze({
    get KVPV_DAILY_CLOCK() {
      return globalThis.KVPV_DAILY_CLOCK;
    }
  });

  // esm/modules/00-manual-entry-policy.mjs
  function initialize4() {
    window.KVPV_ENTRY_POLICY = Object.freeze({ manual: false, idleDaily: false });
  }
  var api5 = Object.freeze({
    get KVPV_ENTRY_POLICY() {
      return globalThis.KVPV_ENTRY_POLICY;
    }
  });

  // esm/modules/00-spending-policy.mjs
  function __captureESMFunction4(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal04;
  var __esmLocal14;
  function initialize5() {
    __captureESMFunction4(__esmLocal04 = (() => {
      const inspireMaps = Object.freeze([2051, 2061]);
      window.KVPV_SPENDING_POLICY = Object.freeze({
        allowKNB: false,
        dailyInspireKNBMaps: inspireMaps,
        canDailyInspireKNB: __captureESMFunction4(__esmLocal14 = ((map) => inspireMaps.includes(Number(map))), "canDailyInspireKNB"),
        reason: "No general KNB spending. User permits native inspiration only in daily trial maps 2051 and 2061."
      });
    }), "")();
  }
  var api6 = Object.freeze({
    get KVPV_SPENDING_POLICY() {
      return globalThis.KVPV_SPENDING_POLICY;
    }
  });

  // esm/modules/00-account-policy.mjs
  function __captureESMFunction5(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  function __captureESMMethod(receiver, key, kind) {
    let owner = receiver;
    while (owner !== null && (typeof owner === "object" || typeof owner === "function") && !Object.prototype.hasOwnProperty.call(owner, key)) owner = Object.getPrototypeOf(owner);
    if (owner === null) return void 0;
    const descriptor = Object.getOwnPropertyDescriptor(owner, key);
    return kind === "get" ? descriptor.get : kind === "set" ? descriptor.set : descriptor.value;
  }
  var __esmLocal05;
  var __esmLocal15;
  var __esmLocal24;
  var __esmLocal33;
  var __esmLocal42;
  function initialize6() {
    __captureESMFunction5(__esmLocal05 = (() => {
      const W = window, config = { pauseWhenHidden: false, backgroundTickMs: 1, unfocusedTickMs: 1 };
      const focused = __captureESMFunction5(__esmLocal15 = (() => typeof W.document?.hasFocus === "function" ? W.document.hasFocus() : null), "focused");
      const pollingGap = __captureESMFunction5(__esmLocal24 = (() => {
        const rustCore = W.__KVPV_RUST_CORE;
        if (typeof rustCore?.accountPollingMode !== "function") throw Error("Rust/WASM account policy unavailable");
        const focus = focused(), focusState = focus === false ? 0 : focus === true ? 1 : -1;
        const mode = rustCore.accountPollingMode(W.document?.hidden ? 1 : 0, focusState);
        if (mode === 1) return config.backgroundTickMs;
        if (mode === 2) return config.unfocusedTickMs;
        if (mode === 0) return 0;
        throw Error("Rust/WASM returned an invalid account polling mode: " + mode);
      }), "pollingGap");
      W.KVPV_ACCOUNT_POLICY = Object.freeze({ config, pollingGap, status() {
        __esmLocal33 = __captureESMMethod(this, "status", "init");
        const actor = String(W._Ba?._rJ?._O$?.ins?.actorId ?? ""), owner = String(W.__KVPV_OWN_ACTOR_ID ?? "");
        const me = W._C?._Ba?.instance?.getRole?.(Number(actor)) ?? W._C?._Ba?.instance?.getRole?.(actor);
        const types = W._d?._Yct, selector = me?.getComponent?.(types?._Eet);
        return {
          actorId: actor,
          ownerId: owner,
          actorMatches: !!actor && actor === owner,
          playerLoaded: !!me,
          hidden: W.document?.hidden ?? null,
          pauseWhenHidden: config.pauseWhenHidden,
          backgroundTickMs: config.backgroundTickMs,
          focused: focused(),
          pollingGapMs: pollingGap(),
          components: { selector: !!selector, combat: !!me?.getComponent?.(types?._Het), mover: !!me?.getComponent?.(types?._zet) },
          nativeSkillIds: [...new Set([...selector?._rtt ?? [], ...selector?._wet ?? []].map(__captureESMFunction5(__esmLocal42 = ((row) => Number(row?.[0])), "")).filter(Number.isSafeInteger))],
          note: "Per-frame session; no fixed main/clone identity. Background browser/game throttling is not bypassed."
        };
      } });
    }), "")();
  }
  var api7 = Object.freeze({
    get KVPV_ACCOUNT_POLICY() {
      return globalThis.KVPV_ACCOUNT_POLICY;
    }
  });

  // esm/modules/00-far-scope.mjs
  function call_KVPV_FAR_SCOPE_eligible(...args) {
    const target = globalThis["KVPV_FAR_SCOPE"];
    const fn = globalThis["KVPV_FAR_SCOPE"]?.["eligible"];
    if (typeof fn !== "function") throw Error("KVPV_FAR_SCOPE.eligible is not available");
    return Reflect.apply(fn, target, args);
  }
  function __captureESMFunction6(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  function __captureESMMethod2(receiver, key, kind) {
    let owner = receiver;
    while (owner !== null && (typeof owner === "object" || typeof owner === "function") && !Object.prototype.hasOwnProperty.call(owner, key)) owner = Object.getPrototypeOf(owner);
    if (owner === null) return void 0;
    const descriptor = Object.getOwnPropertyDescriptor(owner, key);
    return kind === "get" ? descriptor.get : kind === "set" ? descriptor.set : descriptor.value;
  }
  var __esmLocal06;
  var __esmLocal16;
  var __esmLocal25;
  var __esmLocal34;
  var __esmLocal43;
  var __esmLocal52;
  var __esmLocal62;
  var __esmLocal72;
  var __esmLocal82;
  var __esmLocal9;
  function initialize7() {
    __captureESMFunction6(__esmLocal06 = (() => {
      const W = window;
      function genericBoss() {
        return null;
      }
      __esmLocal16 = genericBoss;
      function tower() {
        try {
          const entry = W._Ba?._$a?._yo?.ins, live = Number(W._C?._Mn?._Cn?.currentID);
          const current = Number.isFinite(live) && live > 0 ? live : Number(entry?.intoSce?.[0]);
          const model = W._Ba?._tQ?._$Y?.ins, progress = Number(model?.finishLevel);
          const run = getKVPV_LINHLUNG922()?.status?.(false);
          const floors = [run?.pendingFloor, progress + 1, progress].map(Number).filter(__captureESMFunction6(__esmLocal34 = ((n) => Number.isSafeInteger(n) && n > 0), ""));
          let floor = null;
          for (const n of floors) {
            const cfg = W._ft?._u$?.ins?.getCfgByLv?.(n);
            if (Number(cfg?.[0]) === current) {
              floor = n;
              break;
            }
          }
          const inside = floor !== null && current > 0 && (entry?.isInMission === true || W._Ba?._$a?.SceneUtil?.isCommonScene === false);
          return { inside, current, floor, highestFloor: Number.isFinite(progress) ? progress : null };
        } catch (e) {
          return { inside: false, error: String(e) };
        }
      }
      __esmLocal25 = tower;
      function rune() {
        try {
          const entry = W._Ba?._$a?._yo?.ins, live = Number(W._C?._Mn?._Cn?.currentID);
          const current = Number.isFinite(live) && live > 0 ? live : Number(entry?.intoSce?.[0]);
          const model = W._Ba?._IH?._ZY?.inst;
          const floor = Number(getKVPV_RUNE_BOSS()?.status?.().pending?.floor ?? model?.currLv);
          const cfg = W._ft?._wZ?.ins?.getCfgByLv?.(floor);
          const inside = current === 2201 && Number(entry?.intoSce?.[0]) === 2201 && Number.isSafeInteger(floor) && floor > 0 && Number(cfg?.[0]) === floor && (entry?.isInMission === true || W._Ba?._$a?.SceneUtil?.isCommonScene === false);
          return { inside, current, floor, highestFloor: Number(model?.finishLv) };
        } catch (e) {
          return { inside: false, error: String(e) };
        }
      }
      __esmLocal43 = rune;
      function truTien() {
        try {
          const entry = W._Ba?._$a?._yo?.ins, live = Number(W._C?._Mn?._Cn?.currentID), current = Number.isFinite(live) && live > 0 ? live : Number(entry?.intoSce?.[0]);
          const cfg = W._ft?._po?.ins?.getCfgById?.(current), type = Number(cfg?.[7]);
          const inside = current > 0 && Number(entry?.intoSce?.[0]) === current && type === 52 && W._Ba?._$a?.SceneUtil?.isCommonScene === false;
          return { inside, current, floor: Number(entry?.intoSce?.[3]) || null, type };
        } catch (e) {
          return { inside: false, error: String(e) };
        }
      }
      __esmLocal52 = truTien;
      function status() {
        const ll = tower();
        if (ll.inside && getKVPV_LINHLUNG_TH()?.enabled !== false) return { ...ll, kind: "LINH_LUNG" };
        const rv = rune();
        if (rv.inside) return { ...rv, kind: "PHU_VAN" };
        const tt = truTien();
        if (tt.inside) return { ...tt, kind: "TRU_TIEN" };
        const tq = getKVPV_TQ_SCOPE()?.status?.();
        if (tq?.inside) return { ...tq, inside: true, kind: "THIEN_QUAN" };
        return genericBoss() ?? { ...tq, inside: false, kind: "OUTSIDE" };
      }
      __esmLocal62 = status;
      function eligible(target) {
        if (!target || target.isValid === false) return false;
        const targetType = Number(target.property?.get?.("type"));
        const scope = status();
        if (targetType !== 1 && !(scope.inside && scope.kind === "TRU_TIEN" && targetType === 3)) return false;
        const hp = target.property?.get?.("hp");
        if (Array.isArray(hp) && Number(hp[0]) <= 0) return false;
        const s = status();
        if (!s.inside) return false;
        if (s.kind === "ALL_BOSS") {
          const candidate = genericBoss(target);
          return candidate !== null && candidate.bossId === s.bossId && candidate.occ === s.occ;
        }
        if (["LINH_LUNG", "PHU_VAN", "TRU_TIEN"].includes(s.kind)) return true;
        const lv = W._Ba?._Co?._Mo?.ins?.curLv, cfg = W._ft?._h$?.ins?.getCfgByLv?.(lv);
        const expected = Number(cfg && W._ft?._h$?.ins?.occ?.(cfg, lv));
        return expected > 0 && Number(target.property?.get?.("occ")) === expected;
      }
      __esmLocal72 = eligible;
      W.KVPV_FAR_SCOPE = Object.freeze({ status, tower, rune, truTien, inside: __captureESMFunction6(__esmLocal82 = (() => status().inside), "inside"), eligible, genericBoss, setAllBosses() {
        __esmLocal9 = __captureESMMethod2(this, "setAllBosses", "init");
        return status();
      } });
    }), "")();
  }
  var api8 = Object.freeze({
    get KVPV_FAR_SCOPE() {
      return globalThis.KVPV_FAR_SCOPE;
    }
  });

  // esm/modules/00-thienquan-scope.mjs
  function __captureESMFunction7(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal07;
  var __esmLocal17;
  var __esmLocal26;
  function initialize8() {
    __captureESMFunction7(__esmLocal07 = (() => {
      const W = window;
      let confirmedMap = null;
      let lastStageProof = null;
      const PROOF_GRACE_MS = 5e3;
      function status() {
        try {
          const model = W._Ba?._Co?._Mo?.ins;
          const entry = Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
          const live = Number(W._C?._Mn?._Cn?.currentID);
          const current = Number.isFinite(live) && live > 0 ? live : entry;
          const stageCfg = W._ft?._h$?.ins?.getCfgByLv?.(model?.curLv);
          const expected = Number(stageCfg?.[0]);
          const type = Number(W._ft?._po?.ins?.getCfgById?.(current)?.[7]);
          const mission = W._Ba?._$a?._yo?.ins?.isInMission === true;
          const observedStageMap = [2992, 2995, 2996].includes(current) && type === 35;
          const actor = String(W.__KVPV_OWN_ACTOR_ID || W._Ba?._rJ?._O$?.ins?.actorId || "");
          const world = W._C?._Ba?.instance;
          const role = world?.getRole?.(Number(actor)) ?? world?.getRole?.(actor);
          const target = role?.getComponent?.(W._d?._Yct?._Het)?.target;
          const expectedOcc = Number(stageCfg && W._ft?._h$?.ins?.occ?.(stageCfg, model?.curLv));
          const targetOcc = Number(target?.property?.get?.("occ"));
          const stageBossMatches = target?.isValid !== false && Number(target?.property?.get?.("type")) === 1 && expectedOcc > 0 && targetOcc === expectedOcc;
          if (confirmedMap !== current) confirmedMap = null;
          const actorNow = String(W._Ba?._rJ?._O$?.ins?.actorId ?? "");
          const owned = actorNow !== "" && actorNow === String(W.__KVPV_OWN_ACTOR_ID ?? "");
          if (lastStageProof && (lastStageProof.map !== current || lastStageProof.actor !== actorNow || lastStageProof.occ !== expectedOcc || !mission)) lastStageProof = null;
          if (mission && owned && stageBossMatches && Number.isFinite(current) && current > 0) {
            lastStageProof = { map: current, actor: actorNow, occ: expectedOcc, at: Date.now() };
          }
          if (target && !stageBossMatches) lastStageProof = null;
          const briefNativeGap = !target && !!lastStageProof && mission && owned && Date.now() - lastStageProof.at <= PROOF_GRACE_MS;
          if (type === 35 && stageBossMatches) confirmedMap = current;
          const missionStageBoss = mission && stageBossMatches && (type === 0 || type === 1 || type === 35);
          const nativeStage = missionStageBoss || type === 35 && stageBossMatches || mission && confirmedMap === current || briefNativeGap;
          const inside = Number.isFinite(current) && current > 0 && (nativeStage || mission && (type === 1 || observedStageMap) || expected > 0 && current === expected && W._Ba?._$a?.SceneUtil?.isCommonScene !== true);
          return { inside, current, entry, expected, type, mission, observedStageMap, stageBossMatches, targetOcc, expectedOcc, briefNativeGap, proofAgeMs: lastStageProof ? Date.now() - lastStageProof.at : null };
        } catch (e) {
          return { inside: false, error: String(e) };
        }
      }
      __esmLocal17 = status;
      W.KVPV_TQ_SCOPE = Object.freeze({ inside: __captureESMFunction7(__esmLocal26 = (() => status().inside), "inside"), status });
    }), "")();
  }
  var api9 = Object.freeze({
    get KVPV_TQ_SCOPE() {
      return globalThis.KVPV_TQ_SCOPE;
    }
  });

  // esm/modules/00-combat-metrics.mjs
  function __captureESMFunction8(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  function __captureESMMethod3(receiver, key, kind) {
    let owner = receiver;
    while (owner !== null && (typeof owner === "object" || typeof owner === "function") && !Object.prototype.hasOwnProperty.call(owner, key)) owner = Object.getPrototypeOf(owner);
    if (owner === null) return void 0;
    const descriptor = Object.getOwnPropertyDescriptor(owner, key);
    return kind === "get" ? descriptor.get : kind === "set" ? descriptor.set : descriptor.value;
  }
  var __esmLocal08;
  var __esmLocal19;
  var __esmLocal27;
  var __esmLocal35;
  var __esmLocal44;
  var __esmLocal53;
  var __esmLocal63;
  var __esmLocal73;
  var __esmLocal83;
  var __esmLocal92;
  var __esmLocal10;
  var __esmLocal11;
  var __esmLocal122;
  var __esmLocal132;
  var __esmLocal142;
  var __esmLocal152;
  var __esmLocal162;
  var __esmLocal172;
  var __esmLocal182;
  var __esmLocal192;
  var __esmLocal20;
  var __esmLocal21;
  var __esmLocal222;
  var __esmLocal232;
  var __esmLocal242;
  var __esmLocal252;
  var __esmLocal262;
  var __esmLocal272;
  function initialize9() {
    __captureESMFunction8(__esmLocal08 = (() => {
      window.KVPV_COMBAT_METRICS = Object.freeze({ create() {
        __esmLocal19 = __captureESMMethod3(this, "create", "init");
        let active = null;
        const completed = [];
        const at = __captureESMFunction8(__esmLocal27 = (() => Date.now()), "at");
        const combatStates = /* @__PURE__ */ new Set(["fighting", "native_cooldown", "skill_readiness", "waiting_pace", "waiting_burst_gap", "dungeon_native_finish_2pct"]);
        const group = __captureESMFunction8(__esmLocal35 = ((id) => id >= 8001 && id <= 8005 ? "basic" : id >= 1001 && id <= 1008 ? "tuyetHoc" : "other"), "group");
        const rate = __captureESMFunction8(__esmLocal44 = ((damage, ms) => ms > 0 ? damage * 100 / ms : null), "rate");
        function finishAnimation(now, interrupted = false) {
          if (!active?.animation) return;
          const wait = active.animation, r = row(wait.id), duration = Math.max(0, now - wait.startedAt);
          if (r) {
            r.animationWaitMs += duration;
            r.animationWaitEpisodes++;
            r.animationWaitMaxMs = Math.max(r.animationWaitMaxMs, duration);
          }
          if (interrupted) active.animationCensored++;
          active.animation = null;
        }
        __esmLocal53 = finishAnimation;
        function charge(now) {
          if (active) {
            const delta = Math.max(0, now - active.updatedAt);
            active.timeMs[active.state] = (active.timeMs[active.state] || 0) + delta;
            if (active.eligible) active.attackWindowMs += delta;
            active.updatedAt = now;
          }
        }
        __esmLocal63 = charge;
        function row(id) {
          if (!active) return null;
          if (!active.skills.has(id) && active.skills.size < 64) active.skills.set(id, { id, attempts: 0, hits: 0, matchedDamage: 0, unconfirmed: 0, interrupted: 0, lastPaceMs: null, animationWaitMs: 0, animationWaitEpisodes: 0, animationWaitMaxMs: 0 });
          return active.skills.get(id);
        }
        __esmLocal73 = row;
        function snapshot(s, now) {
          const timeMs = { ...s.timeMs };
          if (s === active) timeMs[s.state] = (timeMs[s.state] || 0) + Math.max(0, now - s.updatedAt);
          const elapsedMs = Math.max(0, (s.endedAt ?? now) - s.startedAt), attackWindowMs = s.attackWindowMs + (s === active && s.eligible ? Math.max(0, now - s.updatedAt) : 0), end = s.endedAt ?? now, windowMs = Math.min(1e4, elapsedMs);
          const recent = s.damageEvents.filter(__captureESMFunction8(__esmLocal92 = ((e) => e.at > end - 1e4 && e.at <= end), "")), pending = /* @__PURE__ */ new Map(), rolling = /* @__PURE__ */ new Map();
          for (const id of s.pending.values()) pending.set(id, (pending.get(id) || 0) + 1);
          for (const e of recent) rolling.set(e.id, (rolling.get(e.id) || 0) + e.damage);
          const skills = [...s.skills.values()].map(__captureESMFunction8(__esmLocal10 = ((r) => ({ ...r, animationWaitMs: r.animationWaitMs + (s === active && s.animation?.id === r.id ? Math.max(0, now - s.animation.startedAt) : 0), animationWaitOngoingMs: s === active && s.animation?.id === r.id ? Math.max(0, now - s.animation.startedAt) : 0, animationWaitAverageMs: r.animationWaitEpisodes ? r.animationWaitMs / r.animationWaitEpisodes : null, group: group(r.id), pending: pending.get(r.id) || 0, matchedDps: rate(r.matchedDamage, elapsedMs), attackWindowContributionDps: rate(r.matchedDamage, attackWindowMs), rolling10sMatchedDps: rate(rolling.get(r.id) || 0, windowMs), averageMatchedDamage: r.hits ? r.matchedDamage / r.hits : null, confirmationRate: r.hits + r.unconfirmed > 0 ? r.hits / (r.hits + r.unconfirmed) : null })), ""));
          const groups = Object.fromEntries(["basic", "tuyetHoc", "other"].map(__captureESMFunction8(__esmLocal11 = ((key) => {
            const selected = skills.filter(__captureESMFunction8(__esmLocal122 = ((r) => r.group === key), "")), damage = selected.reduce(__captureESMFunction8(__esmLocal132 = ((n, r) => n + r.matchedDamage), ""), 0), rollingDamage = recent.filter(__captureESMFunction8(__esmLocal142 = ((e) => group(e.id) === key), "")).reduce(__captureESMFunction8(__esmLocal152 = ((n, e) => n + e.damage), ""), 0);
            return [key, { matchedDamage: damage, hits: selected.reduce(__captureESMFunction8(__esmLocal162 = ((n, r) => n + r.hits), ""), 0), attempts: selected.reduce(__captureESMFunction8(__esmLocal172 = ((n, r) => n + r.attempts), ""), 0), matchedDps: rate(damage, elapsedMs), attackWindowContributionDps: rate(damage, attackWindowMs), rolling10sMatchedDps: rate(rollingDamage, windowMs) }];
          }), "")));
          const matchedDamage = skills.reduce(__captureESMFunction8(__esmLocal182 = ((n, r) => n + r.matchedDamage), ""), 0);
          return {
            key: s.key,
            bossId: s.bossId,
            occ: s.occ,
            scene: s.scene,
            startedAt: s.startedAt,
            endedAt: s.endedAt,
            reason: s.reason,
            bossName: s.bossName ?? "",
            actor: s.actor ?? null,
            elapsedMs,
            attackWindowMs,
            state: s.state,
            timeMs,
            recoveryResumes: s.resumes,
            summary: { matchedDamage, matchedDps: rate(matchedDamage, elapsedMs), attackWindowContributionDps: rate(matchedDamage, attackWindowMs), rolling10sMatchedDps: rate(recent.reduce(__captureESMFunction8(__esmLocal192 = ((n, e) => n + e.damage), ""), 0), windowMs), rollingWindowMs: windowMs, rollingBufferTruncated: s.rollingTruncated },
            groups,
            animationAttribution: "FIGHT animation-blocked time attributed to the latest observed controller cast, not proven skill duration or server lock. In-progress waits are included in total only; waits ended by a cast or encounter close are censored.",
            animationCensored: s.animationCensored,
            paceMs: s.paceMs,
            paceReason: s.paceReason,
            paceHistory: s.paceHistory.map(__captureESMFunction8(__esmLocal20 = ((x) => ({ ...x })), "")),
            skills
          };
        }
        __esmLocal83 = snapshot;
        function close(reason = "target_changed") {
          if (!active) return;
          const now = at();
          charge(now);
          finishAnimation(now, true);
          for (const id of active.pending.values()) {
            const r = row(id);
            if (r) r.interrupted++;
          }
          active.pending.clear();
          active.endedAt = now;
          active.reason = reason;
          completed.push(snapshot(active, now));
          if (completed.length > 20) completed.shift();
          active = null;
        }
        __esmLocal21 = close;
        return Object.freeze({
          open(info) {
            __esmLocal222 = __captureESMMethod3(this, "open", "init");
            if (active?.key === info.key) return;
            close();
            const now = at();
            active = {
              ...info,
              startedAt: now,
              endedAt: null,
              reason: "active",
              lastCastId: null,
              animation: null,
              animationCensored: 0,
              updatedAt: now,
              state: "initializing",
              timeMs: {},
              attackWindowMs: 0,
              eligible: false,
              damageEvents: [],
              rollingTruncated: false,
              skills: /* @__PURE__ */ new Map(),
              pending: /* @__PURE__ */ new Map(),
              resumes: 0,
              paceMs: null,
              paceReason: null,
              paceHistory: []
            };
          },
          close,
          state(reason, phase, pace, paceReason) {
            __esmLocal232 = __captureESMMethod3(this, "state", "init");
            if (!active) return;
            charge(at());
            active.state = phase === "RETREAT" ? "recovery" : phase === "DODGE" ? "dodge" : phase === "KITE" ? "kite" : /position|move_wait|unknown_position/.test(reason) ? "positioning" : reason === "waiting_native_cooldown" ? "native_cooldown" : reason === "waiting_ready_tuyet_hoc" ? "skill_readiness" : reason === "hidden_tab" ? "hidden" : reason === "casting_native_skill" || reason === "holding_far" ? "fighting" : reason;
            const animationId = phase === "FIGHT" && active.state === "waiting_native_animation" ? active.lastCastId : null;
            if (active.animation && active.animation.id !== animationId) finishAnimation(at(), phase !== "FIGHT");
            if (animationId !== null && !active.animation) active.animation = { id: animationId, startedAt: at() };
            active.eligible = phase === "FIGHT" && combatStates.has(active.state);
            if (active.paceMs !== pace || active.paceReason !== (paceReason ?? null)) {
              active.paceHistory.push({ at: at(), paceMs: pace, reason: paceReason ?? null });
              if (active.paceHistory.length > 60) active.paceHistory.shift();
            }
            active.paceMs = pace;
            active.paceReason = paceReason ?? null;
          },
          cast(serial, id, pace) {
            __esmLocal242 = __captureESMMethod3(this, "cast", "init");
            const r = row(id);
            if (!r) return;
            finishAnimation(at(), true);
            active.lastCastId = id;
            r.attempts++;
            r.lastPaceMs = pace;
            if (active.pending.size >= 250) {
              const [old, oldId] = active.pending.entries().next().value;
              row(oldId).interrupted++;
              active.pending.delete(old);
            }
            active.pending.set(serial, id);
          },
          result(serial, hit, damage = 0, interrupted = false) {
            __esmLocal252 = __captureESMMethod3(this, "result", "init");
            if (!active?.pending.has(serial)) return;
            const id = active.pending.get(serial), r = row(id);
            active.pending.delete(serial);
            if (hit) {
              const amount = Number.isFinite(Number(damage)) && Number(damage) > 0 ? Number(damage) : 0;
              r.hits++;
              r.matchedDamage += amount;
              const now = at();
              active.damageEvents.push({ id, damage: amount, at: now });
              while (active.damageEvents.length && active.damageEvents[0].at <= now - 1e4) active.damageEvents.shift();
              if (active.damageEvents.length > 1024) {
                active.damageEvents.shift();
                active.rollingTruncated = true;
              }
            } else if (interrupted) r.interrupted++;
            else r.unconfirmed++;
          },
          resume() {
            __esmLocal262 = __captureESMMethod3(this, "resume", "init");
            if (active) active.resumes++;
          },
          report() {
            __esmLocal272 = __captureESMMethod3(this, "report", "init");
            return {
              current: active ? snapshot(active, at()) : null,
              completed: JSON.parse(JSON.stringify(completed)),
              limits: { completedBosses: 20, skillsPerBoss: 64, pendingCasts: 250, rollingDamageEvents: 1024 },
              interpretation: "Matched direct-hit DPS only; may omit DOT/later multi-hit/companion damage. Encounter DPS includes positioning/dodge/recovery. Attack-window contribution divides by controller FIGHT attack/readiness time, not individual skill duration. Unconfirmed is not a proven miss. Rolling DPS uses at most 10 seconds and a bounded event buffer. No automatic combo changes."
            };
          }
        });
      } });
    }), "")();
  }
  var api10 = Object.freeze({
    get KVPV_COMBAT_METRICS() {
      return globalThis.KVPV_COMBAT_METRICS;
    }
  });

  // esm/modules/00-skill-pacing.mjs
  function __captureESMFunction9(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  function __captureESMMethod4(receiver, key, kind) {
    let owner = receiver;
    while (owner !== null && (typeof owner === "object" || typeof owner === "function") && !Object.prototype.hasOwnProperty.call(owner, key)) owner = Object.getPrototypeOf(owner);
    if (owner === null) return void 0;
    const descriptor = Object.getOwnPropertyDescriptor(owner, key);
    return kind === "get" ? descriptor.get : kind === "set" ? descriptor.set : descriptor.value;
  }
  var __esmLocal09;
  var __esmLocal110;
  var __esmLocal28;
  var __esmLocal36;
  var __esmLocal45;
  var __esmLocal54;
  function initialize10() {
    __captureESMFunction9(__esmLocal09 = (() => {
      window.KVPV_SKILL_PACING = Object.freeze({ create() {
        __esmLocal110 = __captureESMMethod4(this, "create", "init");
        const steps = [1, 5, 10, 25, 50, 75, 125, 200, 350, 500];
        let pace = 1, context = "", batch = [], changes = 0, accepted = 0, ignored = 0, lastAction = "learning";
        return Object.freeze({
          context(key) {
            __esmLocal28 = __captureESMMethod4(this, "context", "init");
            if (key !== context) {
              context = key;
              pace = 1;
              batch = [];
              accepted = 0;
              ignored = 0;
              lastAction = "new_boss_baseline";
            }
          },
          observe(hit, qualified) {
            __esmLocal36 = __captureESMMethod4(this, "observe", "init");
            if (!qualified) {
              ignored++;
              return;
            }
            accepted++;
            batch.push(hit === true);
            if (batch.length < 8) return;
            const hits = batch.filter(Boolean).length, index = steps.indexOf(pace);
            batch = [];
            if (hits >= 7 && index > 0) {
              pace = steps[index - 1];
              changes++;
              lastAction = "faster_after_observed_hits";
            } else if (hits <= 4 && index < steps.length - 1) {
              pace = steps[index + 1];
              changes++;
              lastAction = "slower_after_missing_confirmations";
            } else lastAction = "hold_inconclusive";
          },
          pace: __captureESMFunction9(__esmLocal45 = (() => pace), "pace"),
          status: __captureESMFunction9(__esmLocal54 = (() => ({
            enabled: true,
            context,
            paceMs: pace,
            minMs: 1,
            maxMs: 500,
            batchSize: 8,
            pendingSamples: batch.length,
            acceptedSamples: accepted,
            ignoredSamples: ignored,
            changes,
            lastAction,
            note: "Only skills already proven by two direct cast-hit pairs affect tuning. Missing confirmation is not proof of a server rejection."
          })), "status")
        });
      } });
    }), "")();
  }
  var api11 = Object.freeze({
    get KVPV_SKILL_PACING() {
      return globalThis.KVPV_SKILL_PACING;
    }
  });

  // esm/modules/00-tq-basic-profile.mjs
  function __captureESMFunction10(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  function __captureESMMethod5(receiver, key, kind) {
    let owner = receiver;
    while (owner !== null && (typeof owner === "object" || typeof owner === "function") && !Object.prototype.hasOwnProperty.call(owner, key)) owner = Object.getPrototypeOf(owner);
    if (owner === null) return void 0;
    const descriptor = Object.getOwnPropertyDescriptor(owner, key);
    return kind === "get" ? descriptor.get : kind === "set" ? descriptor.set : descriptor.value;
  }
  var __esmLocal010;
  var __esmLocal111;
  var __esmLocal37;
  var __esmLocal46;
  var __esmLocal55;
  var __esmLocal233;
  var __esmLocal273;
  var __esmLocal282;
  var __esmLocal29;
  var __esmLocal30;
  var __esmLocal31;
  var __esmLocal322;
  function initialize11() {
    __captureESMFunction10(__esmLocal010 = (() => {
      "use strict";
      window.KVPV_TQ_BASIC_PROFILE = Object.freeze({ create(env) {
        __esmLocal111 = __captureESMMethod5(this, "create", "init");
        const allIds = [8001, 8002, 8003, 8004, 8005];
        let ids = allIds.slice();
        let enabled = false, waitMs = 10, tuyetHoc = false;
        const active = __captureESMFunction10(__esmLocal37 = (() => enabled && ["THIEN_QUAN", "LINH_LUNG", "PHU_VAN"].includes(env.scope())), "active");
        const learned = __captureESMFunction10(__esmLocal46 = (() => ids.filter(__captureESMFunction10(__esmLocal55 = ((id) => env.learned().includes(id)), ""))), "learned");
        function report() {
          return { enabled, active: active(), tuyetHocEnabled: tuyetHoc, tuyetHocActive: active() && tuyetHoc, waitClientMs: waitMs, ids, learned: learned() };
        }
        __esmLocal233 = report;
        return Object.freeze({
          active,
          allowsTuyetHoc: __captureESMFunction10(__esmLocal273 = (() => active() && tuyetHoc), "allowsTuyetHoc"),
          setTuyetHoc(value = true) {
            __esmLocal282 = __captureESMMethod5(this, "setTuyetHoc", "init");
            tuyetHoc = !!value;
            return report();
          },
          wait: __captureESMFunction10(__esmLocal29 = (() => waitMs), "wait"),
          ids: __captureESMFunction10(__esmLocal30 = (() => ids.slice()), "ids"),
          report,
          configure(on = true, wait = 0, skillIds = null) {
            __esmLocal31 = __captureESMMethod5(this, "configure", "init");
            if (!Number.isFinite(wait) || wait < 0 || wait > 1e3) throw Error("Wait must be 0..1000ms");
            if (skillIds !== null && (!Array.isArray(skillIds) || !skillIds.length || skillIds.some(__captureESMFunction10(__esmLocal322 = ((id) => !allIds.includes(Number(id))), "")))) throw Error("Basic profile requires native IDs 8001..8005");
            enabled = !!on;
            waitMs = wait;
            ids = skillIds === null ? allIds.slice() : [...new Set(skillIds.map(Number))];
            return report();
          }
        });
      } });
    }), "")();
  }
  var api12 = Object.freeze({
    get KVPV_TQ_BASIC_PROFILE() {
      return globalThis.KVPV_TQ_BASIC_PROFILE;
    }
  });

  // esm/modules/00-territory-loot.mjs
  function __captureESMFunction11(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  function __captureESMMethod6(receiver, key, kind) {
    let owner = receiver;
    while (owner !== null && (typeof owner === "object" || typeof owner === "function") && !Object.prototype.hasOwnProperty.call(owner, key)) owner = Object.getPrototypeOf(owner);
    if (owner === null) return void 0;
    const descriptor = Object.getOwnPropertyDescriptor(owner, key);
    return kind === "get" ? descriptor.get : kind === "set" ? descriptor.set : descriptor.value;
  }
  var __esmLocal011;
  var __esmLocal112;
  var __esmLocal210;
  var __esmLocal38;
  var __esmLocal47;
  var __esmLocal56;
  var __esmLocal64;
  var __esmLocal74;
  var __esmLocal84;
  var __esmLocal93;
  var __esmLocal102;
  var __esmLocal113;
  var __esmLocal123;
  var __esmLocal133;
  var __esmLocal143;
  var __esmLocal153;
  var __esmLocal163;
  var __esmLocal173;
  function initialize12() {
    __captureESMFunction11(__esmLocal011 = (() => {
      "use strict";
      const W = window, actor = String(W.__KVPV_OWN_ACTOR_ID || "");
      let cutoff = 11, last = { reason: "waiting_territory", selected: null, skipped: [] };
      const prop = __captureESMFunction11(__esmLocal112 = ((o, k) => o?.property?.get?.(k)), "prop");
      const groups = { weapon: "than binh", fashion: "thoi trang", talisman: "linh ti", wings: "linh duc" };
      function lootKind(name) {
        const text = String(name ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
        return Object.keys(groups).find(__captureESMFunction11(__esmLocal38 = ((key) => (" " + text + " ").includes(" " + groups[key] + " ")), "")) ?? null;
      }
      __esmLocal210 = lootKind;
      function percent(target) {
        const hp = prop(target, "hp");
        if (!Array.isArray(hp)) return null;
        const current = Number(hp[0]), max = Number(hp[1]);
        return Number.isFinite(current) && Number.isFinite(max) && current >= 0 && max > 0 ? current / max * 100 : null;
      }
      __esmLocal47 = percent;
      function active() {
        return actor && actor === String(W._Ba?._rJ?._O$?.ins?.actorId || "") && !W.__KVPV_UNIVERSAL_HALTED && getKVPV_DAILY()?.quickState?.()?.job === "lanhdia" && Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]) === 2164;
      }
      __esmLocal56 = active;
      function shouldBlock(target) {
        if (!active() || Number(prop(target, "type")) !== 1 || !lootKind(prop(target, "name"))) return false;
        const ids = W._Ba?._zLt?._VLt?.ins?.getBsList?.();
        return Array.isArray(ids) && ids.some(__captureESMFunction11(__esmLocal74 = ((id) => Number(id) === Number(prop(target, "occ"))), "")) && percent(target) !== null && percent(target) <= cutoff;
      }
      __esmLocal64 = shouldBlock;
      function decide({ ids, final, selected, target, state, alive, dead = __captureESMFunction11(__esmLocal93 = (() => false), "dead") }) {
        if (state.territoryLoot?.version !== 2) state.territoryLoot = { version: 2, skipped: {}, seenGroups: {} };
        const skipped = state.territoryLoot.skipped, seen = state.territoryLoot.seenGroups, list = Array.isArray(ids) ? ids : [], pct = percent(target), occ = Number(prop(target, "occ")), kind = lootKind(prop(target, "name"));
        if (Number(prop(target, "type")) === 1 && kind) {
          const observed = list.find(__captureESMFunction11(__esmLocal102 = ((id) => Number(id) === occ), ""));
          if (observed !== void 0) {
            seen[kind] = true;
            if (pct !== null && pct <= cutoff) skipped[String(observed)] = pct;
          }
        }
        const eligible = __captureESMFunction11(__esmLocal113 = ((id) => !Object.hasOwn(skipped, String(id)) && alive(id) === true), "eligible");
        const next = list.find(__captureESMFunction11(__esmLocal123 = ((id) => String(id) === String(selected) && eligible(id)), "")) ?? list.find(__captureESMFunction11(__esmLocal133 = ((id) => String(id) === String(final) && eligible(id)), "")) ?? list.find(eligible) ?? null;
        const done = list.length > 0 && Object.keys(groups).every(__captureESMFunction11(__esmLocal143 = ((key) => seen[key] === true), "")) && list.every(__captureESMFunction11(__esmLocal153 = ((id) => Object.hasOwn(skipped, String(id)) || dead(id) === true), ""));
        last = { reason: done ? "all_reward_cutoffs_reached" : next === null ? "waiting_available_boss" : kind ? "attack_for_drops" : "kill_progression_boss", selected: next, cutoffHPPercent: cutoff, observedHPPercent: pct, observedBossName: String(prop(target, "name") ?? ""), lootGroup: kind, seenLootGroups: Object.keys(seen), skipped: Object.keys(skipped) };
        return { next, done };
      }
      __esmLocal84 = decide;
      W.KVPV_TERRITORY_LOOT = Object.freeze({ decide, shouldBlock, percent, lootKind, status: __captureESMFunction11(__esmLocal163 = (() => ({ ...last, cutoffHPPercent: cutoff, seenLootGroups: (last.seenLootGroups ?? []).slice(), skipped: last.skipped.slice() })), "status"), setCutoff(value = 11) {
        __esmLocal173 = __captureESMMethod6(this, "setCutoff", "init");
        if (!Number.isFinite(value) || value < 0 || value >= 100) throw Error("HP cutoff must be 0..99.999 percent");
        cutoff = value;
        return cutoff;
      } });
    }), "")();
  }
  var api13 = Object.freeze({
    get KVPV_TERRITORY_LOOT() {
      return globalThis.KVPV_TERRITORY_LOOT;
    }
  });

  // esm/modules/02-scene.mjs
  function __captureESMFunction12(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  function __captureESMMethod7(receiver, key, kind) {
    let owner = receiver;
    while (owner !== null && (typeof owner === "object" || typeof owner === "function") && !Object.prototype.hasOwnProperty.call(owner, key)) owner = Object.getPrototypeOf(owner);
    if (owner === null) return void 0;
    const descriptor = Object.getOwnPropertyDescriptor(owner, key);
    return kind === "get" ? descriptor.get : kind === "set" ? descriptor.set : descriptor.value;
  }
  var __esmLocal012;
  var __esmLocal114;
  var __esmLocal211;
  var __esmLocal39;
  var __esmLocal48;
  var __esmLocal57;
  var __esmLocal65;
  var __esmLocal75;
  var __esmLocal85;
  var __esmLocal94;
  var __esmLocal103;
  var __esmLocal115;
  var __esmLocal124;
  var __esmLocal134;
  var __esmLocal144;
  var __esmLocal154;
  var __esmLocal164;
  var __esmLocal174;
  var __esmLocal183;
  var __esmLocal193;
  var __esmLocal202;
  function initialize13() {
    __captureESMFunction12(__esmLocal012 = (() => {
      "use strict";
      const W = window, NS = W.KVPV || (W.KVPV = {});
      const initialActor = String(W.__KVPV_OWN_ACTOR_ID || "");
      const opts = { enabled: true, leaseMs: 4e3, maxHistory: 60 };
      const state = { lease: null, denied: 0, grants: 0, history: [] };
      const now = __captureESMFunction12(__esmLocal114 = (() => Date.now()), "now");
      function actorValid() {
        if (W.__KVPV_UNIVERSAL_HALTED) return false;
        if (!initialActor) return true;
        try {
          return String(_Ba?._rJ?._O$?.ins?.actorId ?? "") === initialActor;
        } catch (_) {
          return false;
        }
      }
      __esmLocal211 = actorValid;
      function dailyJob() {
        try {
          const q = getKVPV_DAILY()?.quickState?.();
          return q?.job && q.job !== "r\u1EA3nh" && q.job !== "ranh" ? String(q.job) : null;
        } catch (_) {
          return null;
        }
      }
      __esmLocal39 = dailyJob;
      function hitrunRunning() {
        try {
          return getKVPV_HITRUN1()?.status?.(false)?.running === true;
        } catch (_) {
          return false;
        }
      }
      __esmLocal48 = hitrunRunning;
      function stageState() {
        try {
          const m = _Ba?._Co?._Mo?.ins;
          const stageAuto = m?.auto === true;
          const current = Number(_Ba?._$a?._yo?.ins?.intoSce?.[0]);
          const stageMap = Number(_ft?._h$?.ins?.getCfgByLv?.(m?.curLv)?.[0]);
          const common = _Ba?._$a?.SceneUtil?.isCommonScene === true;
          return { auto: stageAuto, inside: !common && Number.isFinite(stageMap) && stageMap > 0 && current === stageMap };
        } catch (_) {
          return { auto: false, inside: false };
        }
      }
      __esmLocal57 = stageState;
      function lease() {
        if (state.lease && state.lease.until <= now()) state.lease = null;
        return state.lease;
      }
      __esmLocal65 = lease;
      function yieldStageForCombat() {
        const l = lease(), scope = getKVPV_FAR_SCOPE()?.status?.();
        if (l?.who === "stage" && l.tag === "tu-vuot" && actorValid() && !dailyJob() && scope?.kind === "THIEN_QUAN" && scope.inside === true && getKVPV_MODE()?.status?.(false)?.pendingTianQuanMode) {
          state.lease = null;
          log("handoff", "stage", "verified Tian Quan combat");
          return true;
        }
        return false;
      }
      __esmLocal75 = yieldStageForCombat;
      function log(event, who, why) {
        state.history.push({ time: now(), event, who, why });
        if (state.history.length > opts.maxHistory) state.history.shift();
      }
      __esmLocal85 = log;
      function eightEntryReady(who, tag) {
        if (who !== "combat" || tag !== "thien-the-8-tang") return false;
        try {
          const d = getKVPV_EIGHT_FLOOR()?.status?.();
          return d?.enabled === true && d?.scheduled === true && d?.open === true && d?.unlocked === true && d?.cooldownReady === true && d?.inside === false && d?.doneToday !== true && W._Ba?._$a?.SceneUtil?.isCommonScene === true && getKVPV_DAILY_TRIAL()?.status?.()?.inFlight !== true;
        } catch (_) {
          return false;
        }
      }
      __esmLocal94 = eightEntryReady;
      function conflict(who, tag = "") {
        if (!actorValid()) return "actor/session unavailable";
        if (!opts.enabled) return "core stopped";
        if (who === "combat") yieldStageForCombat();
        const j = dailyJob(), s = stageState(), l = lease(), eight = eightEntryReady(who, tag);
        if (tag !== "daily-trial" && !j && !hitrunRunning() && !s.inside && (!l || l.who !== "combat" || l.tag === "daily-trial") && getKVPV_DAILY_TRIAL()?.hasPriority?.() === true)
          return "priority: daily trial";
        if (tag !== "daily-trial" && (who === "combat" || who === "stage") && !hitrunRunning() && !j && !s.inside && !["LINH_LUNG", "PHU_VAN", "TRU_TIEN"].includes(getKVPV_FAR_SCOPE()?.status?.().kind)) {
          const hold = W.KVPV?.timeline?.reservation?.({
            atMs: now(),
            flags: getKVPV_DAILY()?.config || null,
            forTask: who
          });
          if (hold && !(eight && hold.key === "tranh_ba_dinh_cao")) return "upcoming event " + hold.key + " (" + hold.time + ")";
        }
        if (who === "combat") {
          if (j) return "daily job " + j;
          const controlledStage = (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() === true && !!getKVPV_MODE()?.status?.(false)?.pendingTianQuanMode;
          if ((s.auto || s.inside) && !controlledStage) return "native Tu Vuot";
          if (l && l.who !== who) return "reserved by " + l.who;
        } else if (who === "stage") {
          if (j) return "daily job " + j;
          if (hitrunRunning()) return "HitRun active";
          if (l && l.who !== who) return "reserved by " + l.who;
        } else if (who === "daily") {
          if (hitrunRunning()) return "HitRun active";
          if (s.inside) return "Tu Vuot scene";
          if (l && l.who === "combat") return "reserved by combat";
        } else return "invalid owner";
        return null;
      }
      __esmLocal103 = conflict;
      const scene = Object.freeze({
        can: __captureESMFunction12(__esmLocal115 = ((who) => conflict(who) === null), "can"),
        reason: __captureESMFunction12(__esmLocal124 = ((who, tag = "") => conflict(who, tag)), "reason"),
        acquire(who, tag = "") {
          __esmLocal134 = __captureESMMethod7(this, "acquire", "init");
          if (getKVPV_CONFIRM_POPUPS()?.beforeTask?.() === true) {
            state.denied++;
            log("denied", who, "priority: agree popup");
            return false;
          }
          const reason = conflict(who, tag);
          if (reason) {
            state.denied++;
            log("denied", who, reason);
            return false;
          }
          state.lease = { who, tag: String(tag), until: now() + opts.leaseMs };
          state.grants++;
          return true;
        },
        renew(who) {
          __esmLocal144 = __captureESMMethod7(this, "renew", "init");
          if (who === "stage" && yieldStageForCombat()) return false;
          const l = lease();
          if (!l || l.who !== who) return false;
          l.until = now() + opts.leaseMs;
          return true;
        },
        release(who) {
          __esmLocal154 = __captureESMMethod7(this, "release", "init");
          const l = lease();
          if (l?.who === who) {
            state.lease = null;
            return true;
          }
          return false;
        },
        status() {
          __esmLocal164 = __captureESMMethod7(this, "status", "init");
          const l = lease(), stage = stageState();
          return {
            owner: l?.who || null,
            tag: l?.tag || null,
            ttlMs: l ? Math.max(0, l.until - now()) : 0,
            dailyJob: dailyJob(),
            combatRunning: hitrunRunning(),
            stage,
            denied: state.denied,
            grants: state.grants,
            canCombat: !conflict("combat"),
            canDaily: !conflict("daily"),
            canStage: !conflict("stage")
          };
        },
        history: __captureESMFunction12(__esmLocal174 = (() => state.history.slice()), "history")
      });
      NS.core = Object.freeze({
        version: "10.1.0",
        config: opts,
        scene,
        start() {
          __esmLocal183 = __captureESMMethod7(this, "start", "init");
          opts.enabled = true;
          return this.status();
        },
        stop() {
          __esmLocal193 = __captureESMMethod7(this, "stop", "init");
          opts.enabled = false;
          state.lease = null;
          return this.status();
        },
        status() {
          __esmLocal202 = __captureESMMethod7(this, "status", "init");
          return { version: "10.1.0", enabled: opts.enabled, scene: scene.status() };
        }
      });
    }), "")();
  }
  var api14 = Object.freeze({});

  // esm/modules/03-timeline.mjs
  function __captureESMFunction13(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  function __captureESMMethod8(receiver, key, kind) {
    let owner = receiver;
    while (owner !== null && (typeof owner === "object" || typeof owner === "function") && !Object.prototype.hasOwnProperty.call(owner, key)) owner = Object.getPrototypeOf(owner);
    if (owner === null) return void 0;
    const descriptor = Object.getOwnPropertyDescriptor(owner, key);
    return kind === "get" ? descriptor.get : kind === "set" ? descriptor.set : descriptor.value;
  }
  var __esmLocal013;
  var __esmLocal116;
  var __esmLocal212;
  var __esmLocal310;
  var __esmLocal49;
  var __esmLocal58;
  var __esmLocal66;
  var __esmLocal76;
  var __esmLocal86;
  var __esmLocal95;
  var __esmLocal104;
  var __esmLocal117;
  var __esmLocal125;
  var __esmLocal135;
  var __esmLocal145;
  var __esmLocal155;
  var __esmLocal165;
  var __esmLocal175;
  var __esmLocal184;
  var __esmLocal194;
  var __esmLocal203;
  var __esmLocal213;
  var __esmLocal223;
  var __esmLocal234;
  function initialize14() {
    __captureESMFunction13(__esmLocal013 = (() => {
      "use strict";
      const W = window, NS = W.KVPV || (W.KVPV = {});
      if (NS.timeline?.version === "10.2.2") return;
      const config = {
        enabled: true,
        activeHoldMs: 9e4,
        maxPreview: 12,
        leadMinutes: {
          honghoang: 10,
          tam_tien: 5,
          dao_nguyen: 5,
          tien_ton: 5,
          vinh_du: 20,
          tu_la: 15,
          tranh_ba_dinh_cao: 5,
          tientuyen: 5,
          lanhdia: 4
        }
      };
      const flags = {
        tam_tien: "enableQuizAuto",
        honghoang: "enableHongHoang",
        dao_nguyen: "enableDaoTri",
        tien_ton: "enableTienTonAuto",
        vinh_du: "enableVinhDu",
        tu_la: "enableTuLa",
        tranh_ba_dinh_cao: "enableDinhCao"
      };
      const automatic = new Set(Object.keys(config.leadMinutes));
      let registered = [], readiness = null;
      const VN_FORMATTER = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Ho_Chi_Minh",
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      const two = __captureESMFunction13(__esmLocal116 = ((v) => String(v).padStart(2, "0")), "two");
      function parseMinute(t) {
        if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(String(t))) return null;
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
      }
      __esmLocal212 = parseMinute;
      function dayAt(ms) {
        const p = Object.fromEntries(VN_FORMATTER.formatToParts(new Date(ms)).map(__captureESMFunction13(__esmLocal49 = ((x) => [x.type, x.value]), "")));
        const y = Number(p.year), mo = Number(p.month), d = Number(p.day);
        const minute = Number(p.hour) * 60 + Number(p.minute);
        const wallDay = Date.UTC(y, mo - 1, d);
        return {
          minute,
          epochMinute: wallDay / 6e4 + minute + Number(p.second) / 60,
          date: wallDay,
          weekday: new Date(wallDay).getUTCDay(),
          key: `${p.year}-${p.month}-${p.day}`,
          hhmm: two(p.hour) + ":" + two(p.minute)
        };
      }
      __esmLocal310 = dayAt;
      function setSchedule(source) {
        if (!Array.isArray(source)) return false;
        const next = [];
        for (const item of source) {
          if (!item || typeof item.key !== "string") continue;
          for (const slot of item.slots || []) {
            const [start, end, ...extra] = String(slot).split("-");
            const a = parseMinute(start), b = parseMinute(end);
            if (extra.length || a === null || b === null || a === b) continue;
            next.push({
              key: item.key,
              name: String(item.name || item.key),
              from: a,
              to: b,
              display: slot,
              action: item.action || "notice",
              days: Array.isArray(item.days) ? item.days.slice() : null,
              priority: Number(item.priority) || 10,
              unlock: item.unlock || null
            });
          }
        }
        registered = next;
        return true;
      }
      __esmLocal58 = setSchedule;
      function setReadiness(checker) {
        readiness = typeof checker === "function" ? checker : null;
      }
      __esmLocal66 = setReadiness;
      function enabledFor(slot, cfg) {
        if (!automatic.has(slot.key) || slot.action !== "auto") return false;
        if (!cfg || typeof cfg !== "object") return false;
        const flag = flags[slot.key];
        if (flag && cfg[flag] === false) return false;
        return true;
      }
      __esmLocal76 = enabledFor;
      function isReady(key) {
        if (key === "tien_ton") {
          const score = W._Ba?._Xit?._nst?.inst?.ttiScore;
          const left = Array.isArray(score) ? Number(score[3]) : NaN;
          if (Number.isFinite(left) && left <= 0) return false;
        }
        if (!readiness) return true;
        try {
          return readiness(key) !== false;
        } catch (_) {
          return false;
        }
      }
      __esmLocal86 = isReady;
      function occurrences(atMs = Date.now(), cfg = null) {
        const clock = dayAt(atMs), all = [];
        for (const s of registered) {
          if (!enabledFor(s, cfg)) continue;
          for (const offset of [-1, 0, 1]) {
            const base = clock.date + offset * 864e5;
            const weekday = new Date(base).getUTCDay();
            if (s.days && !s.days.includes(weekday)) continue;
            const a = base / 6e4 + s.from;
            const b = base / 6e4 + s.to + (s.to < s.from ? 1440 : 0);
            all.push({ ...s, start: a, end: b, day: new Date(base).toISOString().slice(0, 10) });
          }
        }
        all.sort(__captureESMFunction13(__esmLocal104 = ((a, b) => a.start - b.start || a.priority - b.priority || a.key.localeCompare(b.key)), ""));
        return { clock, all };
      }
      __esmLocal95 = occurrences;
      function activeAuto({ atMs = Date.now(), flags: cfg = null } = {}) {
        if (!config.enabled) return [];
        const { clock, all } = occurrences(atMs, cfg), n = clock.epochMinute;
        const readinessCache = /* @__PURE__ */ new Map();
        const usable = __captureESMFunction13(__esmLocal125 = ((e) => {
          if (!readinessCache.has(e.key)) readinessCache.set(e.key, isReady(e.key));
          return readinessCache.get(e.key);
        }), "usable");
        return all.filter(__captureESMFunction13(__esmLocal135 = ((x) => n >= x.start && n < x.end && usable(x)), "")).sort(__captureESMFunction13(__esmLocal145 = ((a, b) => a.start - b.start || a.priority - b.priority || a.key.localeCompare(b.key)), ""));
      }
      __esmLocal117 = activeAuto;
      function reservation({ atMs = Date.now(), flags: cfg = null, excludeKeys = [], forTask = "long" } = {}) {
        if (!config.enabled || !["long", "combat", "stage", "honghoang"].includes(forTask)) return null;
        const { clock, all } = occurrences(atMs, cfg), n = clock.epochMinute;
        const skips = new Set(excludeKeys);
        for (const e of all.slice().sort(__captureESMFunction13(__esmLocal165 = ((a, b) => Number(n >= b.start && n < b.end) - Number(n >= a.start && n < a.end) || a.start - b.start || a.priority - b.priority), ""))) {
          if (skips.has(e.key) || forTask === e.key) continue;
          const lead = Math.max(0, Math.min(30, Number(config.leadMinutes[e.key]) || 0));
          const active = n >= e.start && n < e.end;
          const soon = n < e.start && e.start - n <= lead;
          const earlyActive = active;
          if ((soon || earlyActive) && isReady(e.key)) return {
            key: e.key,
            name: e.name,
            time: e.display,
            phase: soon ? "upcoming" : "opening",
            minutesUntil: Math.max(0, e.start - n),
            day: e.day,
            reason: "Reserve scene for scheduled event"
          };
        }
        return null;
      }
      __esmLocal155 = reservation;
      function status(atMs = Date.now(), cfg = getKVPV_DAILY()?.config || null) {
        const { clock, all } = occurrences(atMs, cfg), n = clock.epochMinute;
        return {
          version: "10.2.2",
          enabled: config.enabled,
          scheduleLoaded: registered.length > 0,
          eventSlots: registered.length,
          vietnamDate: clock.key,
          vietnamTime: clock.hhmm,
          reservation: reservation({ atMs, flags: cfg }),
          active: all.filter(__captureESMFunction13(__esmLocal184 = ((e) => n >= e.start && n < e.end), "")).map(__captureESMFunction13(__esmLocal194 = ((e) => ({ key: e.key, name: e.name, slot: e.display })), "")),
          upcoming: all.filter(__captureESMFunction13(__esmLocal203 = ((e) => e.start > n), "")).slice(0, config.maxPreview).map(__captureESMFunction13(__esmLocal213 = ((e) => ({
            key: e.key,
            name: e.name,
            slot: e.display,
            day: e.day,
            minutesUntil: Math.ceil(e.start - n)
          })), ""))
        };
      }
      __esmLocal175 = status;
      NS.timeline = Object.freeze({
        version: "10.2.2",
        config,
        setSchedule,
        setReadiness,
        activeAuto,
        reservation,
        status,
        start() {
          __esmLocal223 = __captureESMMethod8(this, "start", "init");
          config.enabled = true;
          return status();
        },
        stop() {
          __esmLocal234 = __captureESMMethod8(this, "stop", "init");
          config.enabled = false;
          return status();
        }
      });
      getKVPV_DAILY()?.configureTimeline?.();
    }), "")();
  }
  var api15 = Object.freeze({});

  // esm/modules/06-range.mjs
  function __captureESMFunction14(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  function __captureESMMethod9(receiver, key, kind) {
    let owner = receiver;
    while (owner !== null && (typeof owner === "object" || typeof owner === "function") && !Object.prototype.hasOwnProperty.call(owner, key)) owner = Object.getPrototypeOf(owner);
    if (owner === null) return void 0;
    const descriptor = Object.getOwnPropertyDescriptor(owner, key);
    return kind === "get" ? descriptor.get : kind === "set" ? descriptor.set : descriptor.value;
  }
  var __esmLocal014;
  var __esmLocal118;
  var __esmLocal214;
  var __esmLocal311;
  var __esmLocal410;
  var __esmLocal59;
  var __esmLocal67;
  var __esmLocal77;
  var __esmLocal87;
  var __esmLocal96;
  var __esmLocal105;
  function initialize15() {
    __captureESMFunction14(__esmLocal014 = (() => {
      "use strict";
      const W = window;
      try {
        getKVPV_RANGE281()?.stop?.();
      } catch (_) {
        getKVPV_V1()?.diagnostics?.record(_);
      }
      const name = "KVPV_RANGE281";
      const baseRadius = 280;
      let requestedRadius = 281;
      const P = W._d?._Yct?._Het?.prototype;
      const pos = getKVPV_BOSS_POSITION();
      const actorId = String(W._Ba?._rJ?._O$?.ins?.actorId ?? "");
      if (!P || typeof P.isValidRange !== "function" || !actorId) {
        console.error("[RANGE281] Module V1 ch\u01B0a s\u1EB5n s\xE0ng; ki\u1EC3m tra game-frame.");
        return;
      }
      const prevStatus = pos?.status?.(false) || {};
      const wasPositionEnabled = !!prevStatus.active;
      let legacyPositionRetired = false;
      if (pos?.version === "3.8.0" && typeof pos.stop === "function") {
        pos.stop();
        legacyPositionRetired = true;
      }
      const source = P.isValidRange;
      const ownDescriptor = Object.getOwnPropertyDescriptor(P, "isValidRange");
      if (ownDescriptor && !ownDescriptor.configurable) {
        console.error("[RANGE281] isValidRange kh\xF4ng cho ph\xE9p thay th\u1EBF an to\xE0n.");
        return;
      }
      let enabled = false, stopped = false, overrides = 0, nativeOK = 0, excluded = 0, lastDistance = null, lastTarget = "", lastError = "", lastReason = "waiting_for_eligible_boss";
      const get = __captureESMFunction14(__esmLocal118 = ((r, k) => {
        try {
          return r?.property?.get?.(k) ?? null;
        } catch (_) {
          return null;
        }
      }), "get");
      const stageOcc = __captureESMFunction14(__esmLocal214 = (() => {
        try {
          const lvl = Number(W._Ba?._Co?._Mo?.ins?.curLv);
          const cfg = W._ft?._h$?.ins?.getCfgByLv?.(lvl);
          if (!cfg) return null;
          const v = Number(W._ft._h$.ins.occ(cfg, lvl));
          return Number.isSafeInteger(v) && v > 0 ? v : null;
        } catch (_) {
          return null;
        }
      }), "stageOcc");
      function qualifies(self) {
        if (!self || String(get(self.owner, "id") ?? self.owner?.id ?? "") !== actorId || String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") !== actorId) return { ok: false, reason: "different_actor" };
        if ([2, 9].includes(Number(get(self.owner, "type")))) return { ok: false, reason: "companion_native_range" };
        const target = self.target;
        if (!target || target.isValid === false || Number(get(target, "type")) !== 1)
          return { ok: false, reason: "not_monster_target" };
        const h = get(target, "hp"), hp = Number(h?.[0]), maxHp = Number(h?.[1]);
        const actual = Number(get(target, "occ"));
        const expected = ["LINH_LUNG", "PHU_VAN", "TRU_TIEN"].includes(getKVPV_FAR_SCOPE()?.status?.().kind) && call_KVPV_FAR_SCOPE_eligible(target) ? actual : stageOcc();
        if (expected === null || actual !== expected) return { ok: false, reason: "not_current_tianquan_boss" };
        if (typeof self.isValidTarget !== "function" || self.isValidTarget() !== true)
          return { ok: false, reason: "native_target_invalid" };
        const scene = W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID));
        if (!scene) return { ok: false, reason: "scene_unavailable" };
        if (Number(scene[7]) === 50 && !W._Ba?._htt?._stt?.inst?.isWar)
          return { ok: false, reason: "war_scene_block" };
        if (W._BLa?.isLandScapeScreen?.() || Number(scene[0]) === 8601)
          return { ok: false, reason: "different_native_range_rule" };
        const monster = W._ft?._tY?.ins?.getCfgById?.(actual);
        const nativeRadius = Number(monster?.[3]);
        if (!Number.isFinite(nativeRadius) || nativeRadius <= 0) return { ok: false, reason: "unknown_monster_range" };
        const a = self._Ha, b = get(target, "position");
        if (!Number.isFinite(Number(a?.x)) || !Number.isFinite(Number(a?.y)) || !Number.isFinite(Number(b?.x)) || !Number.isFinite(Number(b?.y)))
          return { ok: false, reason: "missing_position" };
        const d = Math.hypot(Number(a.x) - Number(b.x), Number(a.y) - Number(b.y));
        return {
          ok: Number.isFinite(d) && d > nativeRadius && d <= requestedRadius,
          reason: "within_trial_extension",
          distance: d,
          target: String(get(target, "name") ?? "")
        };
      }
      __esmLocal311 = qualifies;
      function hooked() {
        const result = source.apply(this, arguments);
        if (result === true) {
          nativeOK++;
          return result;
        }
        if (stopped || !enabled || (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() === false) return result;
        try {
          const q = qualifies(this);
          lastReason = q.reason;
          if (Number.isFinite(q.distance)) lastDistance = +q.distance.toFixed(3);
          if (q.target) lastTarget = q.target;
          if (!q.ok) {
            excluded++;
            return result;
          }
          overrides++;
          return true;
        } catch (e) {
          lastError = String(e);
          return result;
        }
      }
      __esmLocal410 = hooked;
      function ensure() {
        if (P.isValidRange !== hooked) {
          throw Error("isValidRange was replaced by another add-on; not overriding it");
        }
      }
      __esmLocal59 = ensure;
      const restorePosition = __captureESMFunction14(__esmLocal67 = (() => {
        try {
          if (pos && pos === getKVPV_BOSS_POSITION() && wasPositionEnabled && !pos.status(false).active) pos.enable(true);
        } catch (e) {
          console.warn("[RANGE281] Kh\xF4ng kh\xF4i ph\u1EE5c \u0111\u01B0\u1EE3c Boss Position:", e);
        }
      }), "restorePosition");
      function status(show = true) {
        const s = {
          version: "281-client-trial",
          legacyPositionRetired,
          enabled: enabled && !stopped,
          actorId,
          clientCfgRange: baseRadius,
          trialRange: requestedRadius,
          bossPositionOverrideDisabled: !!getKVPV_BOSS_POSITION() && !pos.status(false).active,
          hookAttached: P.isValidRange === hooked,
          extraOneUnitAllowed: overrides,
          nativeAlreadyValid: nativeOK,
          notEligible: excluded,
          lastDistance,
          lastTarget,
          lastReason,
          lastError,
          note: "Client trial radius; The configured trial radius is used only in scan/strict mode, not evidence of server cast reach."
        };
        if (show) console.table([s]);
        return s;
      }
      __esmLocal77 = status;
      function stop() {
        if (stopped) return;
        stopped = true;
        enabled = false;
        if (P.isValidRange === hooked) {
          if (ownDescriptor) Object.defineProperty(P, "isValidRange", ownDescriptor);
          else delete P.isValidRange;
        } else console.warn("[RANGE281] Hook changed externally; leaving it untouched.");
        restorePosition();
        if (W[name] === api33) delete W[name];
        console.log("[RANGE281] \u0110\xE3 ho\xE0n t\xE1c \u0111i\u1EC1u ch\u1EC9nh client +1.");
      }
      __esmLocal87 = stop;
      const api33 = {
        version: "281-client-trial",
        status,
        stop,
        setTrialRange(value) {
          __esmLocal96 = __captureESMMethod9(this, "setTrialRange", "init");
          const v = Number(value);
          if (!Number.isFinite(v) || v <= 280 || v > 610) throw Error("Client trial range: (280,610]");
          requestedRadius = v;
          return status(false);
        },
        enable(v = true) {
          __esmLocal105 = __captureESMMethod9(this, "enable", "init");
          enabled = !!v && !stopped;
          try {
            if (pos && pos === getKVPV_BOSS_POSITION()) {
              if (enabled) pos.enable(false);
              else if (wasPositionEnabled) pos.enable(true);
            }
          } catch (e) {
            lastError = String(e);
          }
          return status(false);
        }
      };
      try {
        pos?.enable?.(false);
        Object.defineProperty(P, "isValidRange", { value: hooked, writable: true, enumerable: !!ownDescriptor?.enumerable, configurable: true });
        ensure();
        W[name] = api33;
      } catch (e) {
        lastError = String(e);
        restorePosition();
        console.error("[RANGE281] Failed to install:", e);
        return;
      }
      console.log("[RANGE281] \u0110\xE3 \u0111\u1EB7t m\u1ED1c th\u1EED client 281 (Boss Thi\xEAn Quan c\xF3 cfg 280). Kh\xF4ng \xE9p server t\u0103ng t\u1EA7m.");
      status(true);
    }), "")();
  }
  var api16 = Object.freeze({});

  // esm/modules/13-transform-skills.mjs
  function call_KVPV_TRANSFORM10_has(...args) {
    const target = globalThis["KVPV_TRANSFORM10"];
    const fn = globalThis["KVPV_TRANSFORM10"]?.["has"];
    if (typeof fn !== "function") throw Error("KVPV_TRANSFORM10.has is not available");
    return Reflect.apply(fn, target, args);
  }
  function call_KVPV_TRANSFORM10_skills(...args) {
    const target = globalThis["KVPV_TRANSFORM10"];
    const fn = globalThis["KVPV_TRANSFORM10"]?.["skills"];
    if (typeof fn !== "function") throw Error("KVPV_TRANSFORM10.skills is not available");
    return Reflect.apply(fn, target, args);
  }
  function call_KVPV_TRANSFORM10_select(...args) {
    const target = globalThis["KVPV_TRANSFORM10"];
    const fn = globalThis["KVPV_TRANSFORM10"]?.["select"];
    if (typeof fn !== "function") throw Error("KVPV_TRANSFORM10.select is not available");
    return Reflect.apply(fn, target, args);
  }
  var api17 = Object.freeze({
    get KVPV_TRANSFORM10() {
      return globalThis.KVPV_TRANSFORM10;
    }
  });

  // esm/modules/08-range-evidence.mjs
  function __captureESMFunction15(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  function __captureESMMethod10(receiver, key, kind) {
    let owner = receiver;
    while (owner !== null && (typeof owner === "object" || typeof owner === "function") && !Object.prototype.hasOwnProperty.call(owner, key)) owner = Object.getPrototypeOf(owner);
    if (owner === null) return void 0;
    const descriptor = Object.getOwnPropertyDescriptor(owner, key);
    return kind === "get" ? descriptor.get : kind === "set" ? descriptor.set : descriptor.value;
  }
  var __esmLocal332;
  var __esmLocal342;
  var __esmLocal352;
  var __esmLocal362;
  var __esmLocal372;
  var __esmLocal382;
  var __esmLocal392;
  var __esmLocal40;
  var __esmLocal41;
  var __esmLocal422;
  var __esmLocal432;
  var __esmLocal442;
  var __esmLocal452;
  var __esmLocal462;
  var __esmLocal472;
  var __esmLocal482;
  var __esmLocal492;
  var __esmLocal50;
  var __esmLocal51;
  var __esmLocal522;
  var __esmLocal532;
  var __esmLocal542;
  var __esmLocal552;
  var __esmLocal562;
  var __esmLocal572;
  var __esmLocal582;
  var __esmLocal592;
  var __esmLocal60;
  var __esmLocal61;
  var __esmLocal622;
  var __esmLocal632;
  var __esmLocal642;
  var __esmLocal652;
  var __esmLocal672;
  var __esmLocal68;
  var __esmLocal70;
  var __esmLocal71;
  var __esmLocal722;
  var __esmLocal732;
  var __esmLocal742;
  var __esmLocal752;
  var __esmLocal762;
  var __esmLocal772;
  var __esmLocal78;
  var __esmLocal79;
  var __esmLocal80;
  var __esmLocal81;
  var __esmLocal822;
  var __esmLocal832;
  var __esmLocal842;
  var __esmLocal852;
  var __esmLocal862;
  var __esmLocal872;
  var __esmLocal88;
  var __esmLocal89;
  var __esmLocal90;
  var __esmLocal91;
  var __esmLocal922;
  var __esmLocal932;
  var __esmLocal942;
  var __esmLocal952;
  var __esmLocal962;
  var __esmLocal97;
  var __esmLocal98;
  var __esmLocal99;
  var __esmLocal100;
  var __esmLocal101;
  var __esmLocal1022;
  var __esmLocal1032;
  var __esmLocal1112;
  var __esmLocal1172;
  var __esmLocal1222;
  var __esmLocal1232;
  var __esmLocal1242;
  var __esmLocal1252;
  var __esmLocal126;
  var __esmLocal127;
  var __esmLocal128;
  var __esmLocal129;
  var __esmLocal130;
  var __esmLocal131;
  var __esmLocal1322;
  var __esmLocal1332;
  var __esmLocal1342;
  var __esmLocal1352;
  var __esmLocal136;
  var __esmLocal137;
  var __esmLocal138;
  var __esmLocal139;
  var __esmLocal140;
  var __esmLocal141;
  var __esmLocal1422;
  var __esmLocal1432;
  var __esmLocal1442;
  var __esmLocal1452;
  var __esmLocal146;
  var __esmLocal147;
  var __esmLocal148;
  var __esmLocal149;
  var __esmLocal157;
  var __esmLocal158;
  var __esmLocal159;
  var __esmLocal160;
  var __esmLocal161;
  var __esmLocal1622;
  var __esmLocal1632;
  var __esmLocal1642;
  var __esmLocal1652;
  var __esmLocal166;
  var __esmLocal167;
  var __esmLocal168;
  var __esmLocal169;
  var __esmLocal170;
  var __esmLocal171;
  var __esmLocal1722;
  var __esmLocal1732;
  var __esmLocal1742;
  var __esmLocal1752;
  var __esmLocal176;
  var __esmLocal177;
  var __esmLocal178;
  var __esmLocal179;
  var __esmLocal180;
  var __esmLocal181;
  var __esmLocal1822;
  var __esmLocal1832;
  var __esmLocal1842;
  var __esmLocal185;
  var __esmLocal186;
  var __esmLocal187;
  var __esmLocal188;
  var __esmLocal189;
  var __esmLocal190;
  var __esmLocal191;
  var __esmLocal1922;
  var __esmLocal1942;
  var __esmLocal195;
  var __esmLocal196;
  var __esmLocal197;
  var __esmLocal198;
  var __esmLocal199;
  var __esmLocal200;
  var __esmLocal201;
  var __esmLocal2022;
  var __esmLocal2032;
  var __esmLocal204;
  var __esmLocal205;
  var __esmLocal206;
  var __esmLocal207;
  var __esmLocal208;
  var __esmLocal209;
  var __esmLocal2102;
  var __esmLocal2112;
  var __esmLocal2122;
  var __esmLocal2132;
  var __esmLocal2142;
  var __esmLocal215;
  var __esmLocal216;
  var __esmLocal217;
  var __esmLocal218;
  var __esmLocal219;
  var __esmLocal220;
  var __esmLocal221;
  var __esmLocal2222;
  var __esmLocal2232;
  var __esmLocal224;
  var __esmLocal225;
  var __esmLocal226;
  var __esmLocal227;
  var __esmLocal228;
  var __esmLocal229;
  var __esmLocal230;
  var __esmLocal231;
  var __esmLocal2322;
  var __esmLocal2332;
  var __esmLocal2342;
  var __esmLocal236;
  var __esmLocal237;
  var __esmLocal238;
  var __esmLocal239;
  var __esmLocal240;
  var __esmLocal241;
  var __esmLocal2422;
  var __esmLocal245;
  var __esmLocal246;
  var __esmLocal247;
  var __esmLocal257;
  var __esmLocal258;
  var __esmLocal259;
  var __esmLocal260;
  var __esmLocal261;
  var __esmLocal2622;
  var __esmLocal263;
  var __esmLocal264;
  var __esmLocal265;
  var __esmLocal266;
  var __esmLocal267;
  var __esmLocal268;
  var __esmLocal269;
  var __esmLocal270;
  var __esmLocal271;
  var __esmLocal2722;
  var __esmLocal2732;
  var __esmLocal274;
  var __esmLocal275;
  var __esmLocal276;
  var __esmLocal277;
  var __esmLocal278;
  var __esmLocal279;
  var __esmLocal280;
  var __esmLocal281;
  var __esmLocal2822;
  var __esmLocal283;
  var __esmLocal284;
  var __esmLocal285;
  var __esmLocal286;
  var __esmLocal287;
  var __esmLocal288;
  var __esmLocal289;
  var __esmLocal290;
  var __esmLocal291;
  var __esmLocal292;
  var __esmLocal293;
  var __esmLocal294;
  var __esmLocal295;
  var __esmLocal296;
  var __esmLocal297;
  var __esmLocal298;
  var __esmLocal299;
  var __esmLocal300;
  var __esmLocal301;
  var __esmLocal302;
  var __esmLocal303;
  var __esmLocal304;
  var __esmLocal305;
  var __esmLocal306;
  var __esmLocal307;
  var __esmLocal308;
  var __esmLocal309;
  var __esmLocal3102;
  var __esmLocal3112;
  var __esmLocal312;
  var __esmLocal313;
  var __esmLocal314;
  var __esmLocal315;
  var __esmLocal316;
  var __esmLocal317;
  var __esmLocal318;
  var __esmLocal319;
  var __esmLocal325;
  var __esmLocal326;
  var __esmLocal327;
  var __esmLocal328;
  var __esmLocal329;
  var __esmLocal330;
  var __esmLocal331;
  var __esmLocal3322;
  var __esmLocal333;
  var __esmLocal334;
  var __esmLocal335;
  var __esmLocal336;
  var __esmLocal337;
  var __esmLocal338;
  var __esmLocal339;
  var __esmLocal340;
  var __esmLocal341;
  var __esmLocal3422;
  var __esmLocal343;
  var __esmLocal344;
  var __esmLocal345;
  var __esmLocal346;
  var __esmLocal347;
  var __esmLocal348;
  var __esmLocal349;
  var __esmLocal350;
  var __esmLocal351;
  var __esmLocal3522;
  var __esmLocal354;
  var __esmLocal355;
  var __esmLocal356;
  var __esmLocal357;
  var __esmLocal358;
  var __esmLocal359;
  var __esmLocal360;
  var __esmLocal361;
  var __esmLocal3622;
  var __esmLocal363;
  var __esmLocal364;
  var __esmLocal365;
  var __esmLocal366;
  var __esmLocal367;
  var __esmLocal368;
  var __esmLocal369;
  var __esmLocal370;
  var __esmLocal371;
  var __esmLocal3722;
  var __esmLocal373;
  var __esmLocal374;
  var __esmLocal375;
  var __esmLocal376;
  var __esmLocal377;
  var __esmLocal378;
  var __esmLocal379;
  var __esmLocal380;
  var __esmLocal381;
  var __esmLocal3822;
  var __esmLocal383;
  var __esmLocal384;
  var __esmLocal385;
  var __esmLocal386;
  var __esmLocal389;
  var __esmLocal393;
  var __esmLocal394;
  var __esmLocal395;
  function initialize16() {
    __captureESMFunction15(__esmLocal332 = (() => {
      "use strict";
      const W = window, TAG = "[TH300 V12.9.6]", actorId = String(W.__KVPV_OWN_ACTOR_ID || "");
      getKVPV_BASIC10()?.release?.();
      try {
        getKVPV_TH300()?.stop?.("reload");
      } catch (_) {
        getKVPV_V1()?.diagnostics?.record(_);
      }
      const Skill = W._d?._Yct?._Eet, Combat = W._d?._Yct?._Het, Move = W._d?._Yct?._zet;
      if (!actorId || !Skill || !Combat || !Move) {
        console?.warn?.(TAG, "Ch\u01B0a v\xE0o game-frame");
        return;
      }
      const CFG = { min: 300, max: 312, goal: 302, tolerance: 5, scanMs: 100, basicOnly: false, basicAnimationSpeed: 1, tqBasicVisualSpeed: 1, tqTuyetHocVisualSpeed: 99, clientPaceMs: null, afterTHWaitMs: 0, moveWaitMs: 150, castTtlMs: 3500, minCastConfirmations: 2, paceMs: 75 };
      let statusReentrant = false;
      const scopedCombat = __captureESMFunction15(__esmLocal342 = (() => getKVPV_DESKTOP_CONTROL()?.scopeProfile?.(getKVPV_FAR_SCOPE()?.status?.()?.kind) ?? null), "scopedCombat");
      const tqDistanceOnly = __captureESMFunction15(__esmLocal352 = (() => getKVPV_TQ_POSITION_ONLY()?.enabled === true && getKVPV_FAR_SCOPE()?.status?.()?.kind === "THIEN_QUAN"), "tqDistanceOnly");
      const tqConfiguredGoal = __captureESMFunction15(__esmLocal362 = (() => {
        const p = getKVPV_TQ_POSITION_ONLY(), d = Number(p?.distance);
        return p?.enabled === false && getKVPV_FAR_SCOPE()?.status?.()?.kind === "THIEN_QUAN" && Number.isFinite(d) && d > 280 && d <= 600 ? d : null;
      }), "tqConfiguredGoal");
      for (const key2 of ["goal", "min", "max", "basicOnly"]) {
        let base = CFG[key2];
        Object.defineProperty(CFG, key2, { enumerable: true, configurable: true, get() {
          __esmLocal372 = __captureESMMethod10(this, "get", "init");
          if (tqDistanceOnly()) {
            if (key2 === "goal") return 310;
            if (key2 === "min") return 300;
            if (key2 === "max") return 320;
          }
          const fixed = tqConfiguredGoal();
          if (fixed !== null && key2 !== "basicOnly") {
            if (key2 === "goal") return fixed;
            if (key2 === "max") return fixed + 10;
            return fixed === 300 ? 295 : fixed > 300 ? 300 : 280;
          }
          const p = scopedCombat();
          if (!p) return base;
          if (key2 === "basicOnly") return p.mode === "basic8001";
          if (key2 === "goal") return p.distance;
          if (key2 === "max") return p.distance + 10;
          return p.distance === 300 ? 295 : p.distance > 300 ? 300 : 280;
        }, set(value) {
          __esmLocal382 = __captureESMMethod10(this, "set", "init");
          base = value;
        } });
      }
      const metrics = getKVPV_COMBAT_METRICS()?.create?.() ?? null;
      const pacer = getKVPV_SKILL_PACING()?.create?.() ?? null;
      const transforming = __captureESMFunction15(__esmLocal392 = (() => getKVPV_TRANSFORM10()?.transformed?.() && getKVPV_TRANSFORM10()?.isEnabled?.() === true), "transforming");
      const isTransformSkill = __captureESMFunction15(__esmLocal40 = ((id) => transforming() && getKVPV_TRANSFORM10()?.has?.(Number(id)) === true), "isTransformSkill");
      const currentPace = __captureESMFunction15(__esmLocal41 = (() => mixed.enabled && skillPriority === "interleaved" && ["THIEN_QUAN", "LINH_LUNG", "PHU_VAN"].includes(getKVPV_FAR_SCOPE()?.status?.()?.kind) ? 0 : tqFive?.active() ? tqFive.wait() : scopedCombat()?.intervalMs ?? CFG.clientPaceMs ?? (transforming() ? 10 : mixed.enabled && mixed.wantBasic && mixed.basicPaceMs !== null ? mixed.basicPaceMs : pacer?.pace() ?? CFG.paceMs)), "currentPace");
      function setClientPace(value = 1) {
        if (value === null) {
          CFG.clientPaceMs = null;
          return { clientPaceMs: null };
        }
        const n = Number(value);
        if (!Number.isFinite(n) || n < 0 || n > 1e3) throw Error("Client pace must be 0..1000 ms");
        CFG.clientPaceMs = n;
        return { clientPaceMs: n };
      }
      __esmLocal422 = setClientPace;
      function setScanInterval(value = 100) {
        const n = Number(value);
        if (!Number.isInteger(n) || n < 1 || n > 100) throw Error("Scan interval must be 1..100 ms");
        CFG.scanMs = n;
        if (ST.timer !== null) {
          (getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval)(ST.timer);
          const schedule = getKVPV_V1()?.timers?.setInterval ?? W.setInterval;
          ST.timer = typeof schedule === "function" ? schedule(tick, CFG.scanMs) : null;
        }
        return { scanMs: CFG.scanMs, running: ST.running, nativeCooldownPreserved: true };
      }
      __esmLocal432 = setScanInterval;
      const ST = {
        running: false,
        mode: "OFF",
        s: null,
        c: null,
        target: null,
        targetOcc: null,
        owner: {},
        lastMove: 0,
        timer: null,
        lastTickAt: null,
        timerRepairs: 0,
        casts: [],
        proofs: /* @__PURE__ */ new Map(),
        evidence: /* @__PURE__ */ new Map(),
        stats: /* @__PURE__ */ new Map(),
        seen: /* @__PURE__ */ new Set(),
        blocked: 0,
        skillWaits: 0,
        moves: 0,
        castAttempts: 0,
        confirmedPairs: 0,
        basicImpactSerial: null,
        basicTailReleases: 0,
        lastDistance: null,
        lastHitDistance: null,
        arrivalSample: null,
        arrivalSnap: false,
        positionSample: null,
        positionRetries: 0,
        positionOffset: 0,
        positionCommands: 0,
        positionPause: null,
        positionRecovery: 0,
        movement: [],
        positioning: true,
        ownMove: false,
        moveGoal: null,
        lastInvocation: -Infinity,
        lastTHAt: -Infinity,
        fastCasts: 0,
        blockedSteering: 0,
        finishTarget: null,
        finishCursor: 0,
        finishLastMove: -Infinity,
        finishMoveAttempts: 0,
        lastBackgroundTick: -Infinity,
        skillCursor: 0,
        lastOwnerPhase: null,
        resumes: 0,
        lastReason: "off",
        lastError: "",
        tqSelectedBasic: null,
        scaledTowerSkillAnimations: 0,
        scaledTowerBasicAnimations: 0,
        history: []
      };
      const thCalibration = { autoLocked: false, skillId: null, completedAt: null, reason: "not_started", minHitsPerSkill: 3, maxUnconfirmedPerSkill: 3 };
      const mixed = { enabled: false, primary: false, primaryStreak: 0, hitQuota: null, confirmedSinceTH: 0, thCycles: 0, rotation: [], rotationCursor: 0, wantBasic: false, suspended: false, unconfirmed: 0, basicPaceMs: null, ready: /* @__PURE__ */ new Map(), attempts: 0, hits: 0, damage: 0, examples: [] };
      let mixedTargetKey = null;
      let skillPriority = "interleaved";
      const tqIdleFill = {
        enabled: true,
        minRepeatMs: 180,
        maxPendingPerTH: 2,
        repeatCalls: 0,
        deniedPending: 0,
        ambiguousHits: 0
      };
      const cosmic = {
        enabled: true,
        thCasts: 0,
        basicCasts: 0,
        lastNativeAt: null,
        lastNativeSkill: null,
        thMeasured: /* @__PURE__ */ new Map(),
        thRanked: 0,
        basicRanked: 0,
        exploration: 0
      };
      const luoFeng = {
        enabled: false,
        sampleWindow: 12,
        idleThresholdMs: 650,
        robustMinHits: 5,
        trimPerTail: 1,
        lastExploreTH: -1,
        lastExploreBasic: -1
      };
      const luoFengActive = __captureESMFunction15(__esmLocal442 = (() => luoFeng.enabled && cosmicActive()), "luoFengActive");
      function keepRecentHit(row, damage) {
        if (!Array.isArray(row.recent)) row.recent = [];
        const v = Number(damage);
        if (!Number.isFinite(v) || v <= 0) return;
        row.recent.push(v);
        if (row.recent.length > luoFeng.sampleWindow) row.recent.splice(0, row.recent.length - luoFeng.sampleWindow);
      }
      __esmLocal452 = keepRecentHit;
      const apexDamage = __captureESMFunction15(__esmLocal462 = ((sample) => luoFengActive() && Array.isArray(sample?.recent) && sample.recent.length >= 2 ? sample.recent.reduce(__captureESMFunction15(__esmLocal472 = ((n, v) => n + v), ""), 0) / sample.recent.length : sample?.hits >= 2 && sample.damage > 0 ? sample.damage / sample.hits : null), "apexDamage");
      function apexRobustDamage(sample) {
        const recent = sample?.recent;
        if (!luoFengActive() || !Array.isArray(recent) || recent.length < luoFeng.robustMinHits)
          return apexDamage(sample);
        const valid = recent.filter(__captureESMFunction15(__esmLocal492 = ((v) => Number.isFinite(v) && v > 0), "")).sort(__captureESMFunction15(__esmLocal50 = ((a, b) => a - b), ""));
        const trim = luoFeng.trimPerTail;
        if (valid.length < luoFeng.robustMinHits || valid.length <= trim * 2) return apexDamage(sample);
        const kept = valid.slice(trim, valid.length - trim);
        return kept.reduce(__captureESMFunction15(__esmLocal51 = ((sum, v) => sum + v), ""), 0) / kept.length;
      }
      __esmLocal482 = apexRobustDamage;
      const apexRhythm = {
        key: null,
        hp: null,
        lossAt: null,
        sampleAt: -Infinity,
        losses: 0,
        intervals: [],
        minMs: 1200,
        maxMs: 12e3,
        debounceMs: 700
      };
      function resetApexRhythm() {
        apexRhythm.key = null;
        apexRhythm.hp = null;
        apexRhythm.lossAt = null;
        apexRhythm.sampleAt = -Infinity;
        apexRhythm.losses = 0;
        apexRhythm.intervals = [];
      }
      __esmLocal522 = resetApexRhythm;
      function observeApexRhythm(key2, hp, now = Date.now()) {
        if (!luoFengActive() || !key2) {
          resetApexRhythm();
          return;
        }
        if (apexRhythm.key !== key2) {
          resetApexRhythm();
          apexRhythm.key = key2;
        }
        const v = Number(hp);
        if (!Number.isFinite(v) || v < 0 || !Number.isFinite(now) || now - apexRhythm.sampleAt < 80) return;
        apexRhythm.sampleAt = now;
        if (apexRhythm.hp !== null && v < apexRhythm.hp) {
          const last = apexRhythm.lossAt, dt = last === null ? null : now - last;
          if (dt === null || dt >= apexRhythm.debounceMs) {
            apexRhythm.losses++;
            if (dt !== null) {
              if (dt >= apexRhythm.minMs && dt <= apexRhythm.maxMs) {
                apexRhythm.intervals.push(dt);
                if (apexRhythm.intervals.length > 8) apexRhythm.intervals.shift();
              } else apexRhythm.intervals = [];
            }
            apexRhythm.lossAt = now;
          }
        }
        apexRhythm.hp = v;
      }
      __esmLocal532 = observeApexRhythm;
      function apexRhythmReport(now = Date.now()) {
        const a = apexRhythm.intervals.slice().sort(__captureESMFunction15(__esmLocal552 = ((x, y) => x - y), ""));
        const median = __captureESMFunction15(__esmLocal562 = ((arr) => arr.length ? arr.length % 2 ? arr[arr.length >> 1] : (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2 : null), "median");
        const cycle = median(a), jitter = cycle === null ? null : Math.max(...a.map(__captureESMFunction15(__esmLocal572 = ((x) => Math.abs(x - cycle)), "")));
        const regular = luoFengActive() && a.length >= 3 && jitter <= Math.max(250, cycle * 0.15);
        const age = apexRhythm.lossAt === null ? null : now - apexRhythm.lossAt;
        const predicted = regular && age >= 0 && age <= cycle ? apexRhythm.lossAt + cycle : null;
        return {
          active: luoFengActive(),
          observedHpLosses: apexRhythm.losses,
          intervalSamples: a.length,
          estimatedCycleMs: cycle,
          jitterMs: jitter,
          confidence: regular ? "tentative-rhythmic" : "insufficient",
          predictedNextHpLossAt: predicted,
          msUntilPrediction: predicted === null ? null : predicted - now,
          source: "player_hp_loss_unattributed",
          advisoryOnly: true
        };
      }
      __esmLocal542 = apexRhythmReport;
      const pilot4100 = {
        enabled: false,
        key: null,
        phase: "off",
        phaseMs: 18e3,
        elapsed: 0,
        drop: 0,
        lastHP: null,
        lastAt: null,
        combo: null,
        thOnly: null,
        choice: "combo",
        skipped: 0,
        missing: 0
      };
      const pilot4100Active = __captureESMFunction15(__esmLocal582 = (() => pilot4100.enabled && luoFengActive() && Number(W._Ba?._Co?._Mo?.ins?.curLv) === 4100 && getKVPV_FAR_SCOPE()?.status?.()?.kind === "THIEN_QUAN"), "pilot4100Active");
      function resetPilot4100() {
        pilot4100.key = null;
        pilot4100.phase = pilot4100.enabled ? "waiting" : "off";
        pilot4100.elapsed = 0;
        pilot4100.drop = 0;
        pilot4100.lastHP = null;
        pilot4100.lastAt = null;
        pilot4100.combo = null;
        pilot4100.thOnly = null;
        pilot4100.choice = "combo";
        pilot4100.skipped = 0;
        pilot4100.missing = 0;
      }
      __esmLocal592 = resetPilot4100;
      const pilot4100THOnly = __captureESMFunction15(__esmLocal60 = (() => pilot4100Active() && (pilot4100.phase === "thOnly" || pilot4100.phase === "chosen" && pilot4100.choice === "thOnly")), "pilot4100THOnly");
      function observePilot4100() {
        if (!pilot4100Active() || !ST.targetKey) {
          if (pilot4100.key !== null) resetPilot4100();
          return;
        }
        if (pilot4100.key !== ST.targetKey) {
          resetPilot4100();
          pilot4100.key = ST.targetKey;
          pilot4100.phase = "combo";
        }
        const hp = prop(ST.target, "hp"), now = Date.now(), cur = Array.isArray(hp) ? Number(hp[0]) : NaN, max = Array.isArray(hp) ? Number(hp[1]) : NaN;
        if (!Number.isFinite(cur) || !Number.isFinite(max) || max <= 0 || cur < 0 || cur > max) {
          pilot4100.missing++;
          pilot4100.lastHP = null;
          pilot4100.lastAt = null;
          return;
        }
        const previous = pilot4100.lastHP, at = pilot4100.lastAt;
        pilot4100.lastHP = cur;
        pilot4100.lastAt = now;
        if (previous === null || at === null || pilot4100.phase === "chosen") return;
        const dt = now - at;
        if (dt <= 0 || dt > 2500 || !canFight() || !atPosition(role())) {
          pilot4100.skipped++;
          return;
        }
        pilot4100.elapsed += dt;
        pilot4100.drop += Math.max(0, previous - cur);
        if (pilot4100.elapsed < pilot4100.phaseMs) return;
        const result = {
          durationMs: pilot4100.elapsed,
          hpDrop: pilot4100.drop,
          observedHpDps: pilot4100.drop * 1e3 / pilot4100.elapsed
        };
        if (pilot4100.phase === "combo") {
          pilot4100.combo = result;
          pilot4100.phase = "thOnly";
          pilot4100.elapsed = 0;
          pilot4100.drop = 0;
          return;
        }
        if (pilot4100.phase === "thOnly") {
          pilot4100.thOnly = result;
          const a = pilot4100.combo?.observedHpDps ?? 0, b = result.observedHpDps;
          pilot4100.choice = b > 0 && b > a * 1.12 ? "thOnly" : "combo";
          pilot4100.phase = "chosen";
          pilot4100.elapsed = 0;
          pilot4100.drop = 0;
        }
      }
      __esmLocal61 = observePilot4100;
      function pilot4100Status() {
        return {
          enabled: pilot4100.enabled,
          active: pilot4100Active(),
          phase: pilot4100.phase,
          bossKey: pilot4100.key,
          activeMode: pilot4100THOnly() ? "thOnly" : "combo",
          selectedMode: pilot4100.phase === "chosen" ? pilot4100.choice : null,
          phaseElapsedMs: pilot4100.elapsed,
          phaseDurationMs: pilot4100.phaseMs,
          phaseHpDrop: pilot4100.drop,
          combo: pilot4100.combo,
          thOnly: pilot4100.thOnly,
          skippedSamples: pilot4100.skipped,
          missingHpSamples: pilot4100.missing,
          requirement: "TH-only must exceed combo observed HP DPS by 12% to be chosen",
          note: "Stage 4100 only; Boss HP can include other damage sources. No new casts, cooldown bypass, or range edits."
        };
      }
      __esmLocal622 = pilot4100Status;
      const basicSolo4100 = { enabled: false, blockedTH: 0 };
      const basicSolo4100Prior = Object.freeze([8005, 8004, 8002, 8003, 8001]);
      const basicSolo4100Active = __captureESMFunction15(__esmLocal632 = (() => basicSolo4100.enabled && Number(W._Ba?._Co?._Mo?.ins?.curLv) === 4100 && tqDistanceOnly() && tqFive?.active() && luoFengActive() && !transforming()), "basicSolo4100Active");
      function setTianQuan4100BasicSolo(enabled = true) {
        basicSolo4100.enabled = enabled === true;
        if (basicSolo4100.enabled) {
          pilot4100.enabled = false;
          resetPilot4100();
        }
        return basicSolo4100Status();
      }
      __esmLocal642 = setTianQuan4100BasicSolo;
      function basicSolo4100Status() {
        return {
          enabled: basicSolo4100.enabled,
          active: basicSolo4100Active(),
          stage: Number(W._Ba?._Co?._Mo?.ins?.curLv) || null,
          skillIds: [8001, 8002, 8003, 8004, 8005],
          startupPreference: basicSolo4100Prior.slice(),
          blockedTH: basicSolo4100.blockedTH,
          configuredDistance: CFG.goal,
          nativeCooldownPreserved: true,
          note: "Basic attacks only while stage 4100 Tian Quan is active. Native cooldown is preserved; range/hits still require confirmation."
        };
      }
      __esmLocal652 = basicSolo4100Status;
      const localLogCleanup = { enabled: false, intervalMs: 1e4, nextAt: Infinity, clears: 0 };
      function localLogCleanupStatus() {
        return {
          enabled: localLogCleanup.enabled,
          intervalMs: localLogCleanup.intervalMs,
          clears: localLogCleanup.clears,
          nextInMs: localLogCleanup.enabled ? Math.max(0, localLogCleanup.nextAt - Date.now()) : null,
          onlyLocalDiagnostics: true,
          chromeDevToolsWebSocketFramesCleared: false,
          countersAndMatchedDpsPreserved: true
        };
      }
      __esmLocal672 = localLogCleanupStatus;
      function setLocalLogAutoClear(enabled = true, intervalMs = 1e4) {
        if (!Number.isInteger(intervalMs) || intervalMs < 1e3 || intervalMs > 12e4)
          throw Error("Local-log interval must be 1000..120000ms");
        localLogCleanup.enabled = enabled === true;
        localLogCleanup.intervalMs = intervalMs;
        localLogCleanup.nextAt = localLogCleanup.enabled ? Date.now() + intervalMs : Infinity;
        return localLogCleanupStatus();
      }
      __esmLocal68 = setLocalLogAutoClear;
      function localLogCleanupSync() {
        if (!localLogCleanup.enabled || Date.now() < localLogCleanup.nextAt) return;
        localLogCleanup.nextAt = Date.now() + localLogCleanup.intervalMs;
        ST.history.length = 0;
        dispatch.recent.length = 0;
        hitDiagnostics.recent.length = 0;
        localLogCleanup.clears++;
      }
      __esmLocal70 = localLogCleanupSync;
      const cosmicActive = __captureESMFunction15(__esmLocal71 = (() => cosmic.enabled && tqFive?.active() && !transforming() && ST.running), "cosmicActive");
      function cosmicReset() {
        cosmic.thCasts = 0;
        cosmic.basicCasts = 0;
        cosmic.lastNativeAt = null;
        cosmic.lastNativeSkill = null;
        cosmic.thMeasured.clear();
        cosmic.thRanked = 0;
        cosmic.basicRanked = 0;
        cosmic.exploration = 0;
        luoFeng.lastExploreTH = -1;
        luoFeng.lastExploreBasic = -1;
        resetApexRhythm();
        resetPilot4100();
      }
      __esmLocal722 = cosmicReset;
      const cosmicScore = __captureESMFunction15(__esmLocal732 = ((map, id) => apexRobustDamage(map.get(Number(id)))), "cosmicScore");
      function cosmicRank(rows, kind, fallback) {
        if (!cosmicActive() || thGap.picking) return rows.sort(fallback);
        const samples = kind === "th" ? cosmic.thMeasured : thGap.measured, casts = kind === "th" ? cosmic.thCasts : cosmic.basicCasts, explore = casts > 0 && casts % 7 === 6;
        if (explore) {
          const key2 = kind === "th" ? "lastExploreTH" : "lastExploreBasic";
          if (!luoFengActive() || luoFeng[key2] !== casts) {
            cosmic.exploration++;
            if (luoFengActive()) luoFeng[key2] = casts;
          }
        } else if (kind === "th") cosmic.thRanked++;
        else cosmic.basicRanked++;
        return rows.sort(__captureESMFunction15(__esmLocal752 = ((a, b) => {
          const aid = Number(a[0]), bid = Number(b[0]), ah = samples.get(aid)?.hits || 0, bh = samples.get(bid)?.hits || 0;
          if (explore && ah !== bh) return ah - bh;
          if (!explore) {
            const as = cosmicScore(samples, aid), bs = cosmicScore(samples, bid);
            if (as !== null || bs !== null) {
              if (as === null) return 1;
              if (bs === null) return -1;
              if (as !== bs) return bs - as;
            }
          }
          return fallback(a, b);
        }), ""));
      }
      __esmLocal742 = cosmicRank;
      const thGap = { enabled: false, windowMs: 1200, lastAt: -Infinity, lastTarget: "", lastSerial: 0, picking: false, attempts: 0, accepted: 0, blockedCooldown: 0, lastBasic: null, measured: /* @__PURE__ */ new Map() };
      function resetThGap() {
        thGap.lastAt = -Infinity;
        thGap.lastTarget = "";
        thGap.lastSerial = 0;
        thGap.picking = false;
        thGap.lastBasic = null;
        thGap.measured.clear();
      }
      __esmLocal762 = resetThGap;
      function thGapActive(c = role().c) {
        return thGap.enabled && tqDistanceOnly() && ST.running && tqFive?.active() && tqFive.allowsTuyetHoc() && !transforming() && ST.targetKey === thGap.lastTarget && thGap.lastSerial === ST.castAttempts && Date.now() - thGap.lastAt >= 0 && Date.now() - thGap.lastAt <= thGap.windowMs && animationPlaying(c) && canFight() && castReady();
      }
      __esmLocal772 = thGapActive;
      const thGapNativeReady = __captureESMFunction15(__esmLocal78 = ((c) => typeof c?.isCooldown === "function" && c.isCooldown() === false), "thGapNativeReady");
      function strongestThGapBasic() {
        const rows = basicRotation().map(__captureESMFunction15(__esmLocal80 = ((id) => ({ id, ...thGap.measured.get(id) || { hits: 0, damage: 0 } })), "")).filter(__captureESMFunction15(__esmLocal81 = ((r) => r.hits >= 2), ""));
        rows.sort(__captureESMFunction15(__esmLocal822 = ((a, b) => (apexRobustDamage(b) ?? 0) - (apexRobustDamage(a) ?? 0) || a.id - b.id), ""));
        return rows[0]?.id ?? null;
      }
      __esmLocal79 = strongestThGapBasic;
      const tqFive = getKVPV_TQ_BASIC_PROFILE()?.create?.({ scope: __captureESMFunction15(__esmLocal832 = (() => getKVPV_FAR_SCOPE()?.status?.()?.kind ?? (getKVPV_TQ_SCOPE()?.inside?.() === true ? "THIEN_QUAN" : "OUTSIDE")), "scope"), context: __captureESMFunction15(__esmLocal842 = (() => scene() + "/" + identity(role().c?.target)), "context"), phase: __captureESMFunction15(__esmLocal852 = (() => combatOwner()?.phase), "phase"), hp: __captureESMFunction15(__esmLocal862 = (() => {
        const h = prop(role().a, "hp");
        return Array.isArray(h) && Number(h[1]) > 0 ? Number(h[0]) / Number(h[1]) * 100 : null;
      }), "hp"), learned: __captureESMFunction15(__esmLocal872 = (() => [...role().s?._rtt ?? [], ...role().s?._wet ?? []].map(__captureESMFunction15(__esmLocal88 = ((r) => Number(r?.[0])), ""))), "learned") }) ?? null;
      for (const key2 of ["goal", "min", "max", "scanMs"]) {
        const descriptor = Object.getOwnPropertyDescriptor(CFG, key2);
        let base = CFG[key2];
        Object.defineProperty(CFG, key2, { enumerable: true, configurable: true, get() {
          __esmLocal89 = __captureESMMethod10(this, "get", "init");
          if (tqDistanceOnly() && key2 !== "scanMs") return key2 === "goal" ? 310 : key2 === "min" ? 300 : 320;
          if (key2 === "scanMs" && tqFive?.active()) return Math.max(1, tqFive.wait());
          return descriptor.get ? descriptor.get() : base;
        }, set(value) {
          __esmLocal90 = __captureESMMethod10(this, "set", "init");
          if (descriptor.set) descriptor.set(value);
          else base = value;
        } });
      }
      const isBasic = __captureESMFunction15(__esmLocal91 = ((id) => Number.isSafeInteger(Number(id)) && Number(id) >= 8001 && Number(id) <= 8009), "isBasic");
      const excludedBasics = /* @__PURE__ */ new Set([8002]);
      const selectedBasic = __captureESMFunction15(__esmLocal922 = ((id) => tqFive?.active() ? tqFive.ids().includes(Number(id)) : !excludedBasics.has(Number(id)) && (!mixed.primary || !mixed.rotation.length || mixed.rotation.includes(Number(id)))), "selectedBasic");
      function learnedBasics() {
        const s = role().s;
        return [...new Set([...s?._rtt ?? [], ...s?._wet ?? []].map(__captureESMFunction15(__esmLocal942 = ((r) => Number(r?.[0])), "")).filter(__captureESMFunction15(__esmLocal952 = ((id) => isBasic(id) && (tqFive?.active() || !excludedBasics.has(id))), "")))].sort(__captureESMFunction15(__esmLocal962 = ((a, b) => a - b), ""));
      }
      __esmLocal932 = learnedBasics;
      function ensureTianQuanRotation() {
        if (getKVPV_FAR_SCOPE()?.status?.()?.kind !== "THIEN_QUAN" || !tqFive) return;
        const ids = [8001, 8002, 8003, 8004, 8005], p = tqFive.report();
        if (burst.enabled && p.enabled && p.tuyetHocEnabled && p.waitClientMs === 0) {
          mixed.enabled = false;
          mixed.wantBasic = false;
          return;
        }
        if (p.enabled && p.waitClientMs === 0 && p.tuyetHocEnabled && ids.every(__captureESMFunction15(__esmLocal98 = ((id) => p.ids.includes(id)), "")) && mixed.enabled && mixed.primary && mixed.basicPaceMs === 0 && mixed.rotation.length === ids.length && ids.every(__captureESMFunction15(__esmLocal99 = ((id) => mixed.rotation.includes(id)), ""))) return;
        tqFive.configure(true, 0, ids);
        tqFive.setTuyetHoc(true);
        mixed.enabled = true;
        mixed.primary = true;
        mixed.primaryStreak = 0;
        mixed.rotation = ids.slice();
        mixed.rotationCursor = 0;
        mixed.wantBasic = true;
        mixed.suspended = false;
        mixed.basicPaceMs = 0;
        mixed.ready.clear();
        CFG.clientPaceMs = 0;
        CFG.afterTHWaitMs = 0;
      }
      __esmLocal97 = ensureTianQuanRotation;
      function basicRotation() {
        const learned = learnedBasics();
        return (tqFive?.active() ? tqFive.ids() : mixed.rotation).filter(__captureESMFunction15(__esmLocal101 = ((id) => learned.includes(id)), ""));
      }
      __esmLocal100 = basicRotation;
      function basicQuota() {
        return basicRotation().length || 3;
      }
      __esmLocal1022 = basicQuota;
      function primaryBasicId() {
        const order = basicRotation();
        return order.length ? order[mixed.rotationCursor % order.length] : learnedBasics()[0] ?? null;
      }
      __esmLocal1032 = primaryBasicId;
      const burst = { enabled: false, dispatch: false, desired: null, nextAt: 0, serial: 0, active: null, lastPass: null, history: [] };
      const hitDiagnostics = { received: 0, accepted: 0, rejected: {}, recent: [] };
      let confirmedTailCut = false, confirmedTailCuts = 0;
      function setConfirmedTailCut(enabled = true) {
        confirmedTailCut = !!enabled;
        return { enabled: confirmedTailCut, onlyAfterMatchedHit: true };
      }
      __esmLocal1112 = setConfirmedTailCut;
      const dispatch = { actor: null, pending: null, calls: 0, signals: 0, silent: 0, recent: [] };
      const speedClips = /* @__PURE__ */ new Map();
      let thVisualCalls = 0, thVisualScaled = 0, thVisualUnavailable = 0, thVisualLastSkill = null;
      let tqBasicVisualCalls = 0, tqBasicVisualScaled = 0, tqBasicVisualUnavailable = 0, tqBasicVisualLastSkill = null;
      function restoreSpeedClips() {
        for (const [clip, s] of speedClips) try {
          if (clip?._nt === s.applied || clip?.timeScale === s.applied) clip.timeScale = s.before;
        } catch (e) {
          ST.lastError = String(e);
        }
        speedClips.clear();
      }
      __esmLocal1172 = restoreSpeedClips;
      function animationCall(native, self, args) {
        const id = Number(args[0]), avatar = self?._Qrt, scope = getKVPV_FAR_SCOPE()?.status?.()?.kind, inTower = ["THIEN_QUAN", "LINH_LUNG", "PHU_VAN"].includes(scope), inTQ = scope === "THIEN_QUAN" && tqFive?.active() && ST.running, thVisual = id >= 1001 && id <= 1008 && inTQ && tqFive.allowsTuyetHoc() === true && CFG.tqTuyetHocVisualSpeed > 1, tqBasicVisual = inTQ && id >= 8001 && id <= 8005 && CFG.tqBasicVisualSpeed > 1, towerSkillVisual = inTower && !isBasic(id) && candidate(id) && CFG.basicAnimationSpeed > 1, towerBasicVisual = inTower && id >= 8001 && id <= 8005 && CFG.basicAnimationSpeed > 1, basicVisual = id === 8001 && CFG.basicOnly, factor = thVisual ? CFG.tqTuyetHocVisualSpeed : tqBasicVisual ? CFG.tqBasicVisualSpeed : CFG.basicAnimationSpeed;
        if (factor <= 1 || !thVisual && !tqBasicVisual && !towerSkillVisual && !towerBasicVisual && !basicVisual || self.owner !== dispatch.actor || !canFight() || typeof avatar?.getActionTween !== "function") return native.apply(self, args);
        let action;
        try {
          action = self._mvt?.(id)?.[5];
        } catch (_) {
          action = null;
        }
        if (thVisual) {
          thVisualCalls++;
          thVisualLastSkill = id;
        }
        if (tqBasicVisual) {
          tqBasicVisualCalls++;
          tqBasicVisualLastSkill = id;
        }
        if ((thVisual || tqBasicVisual || towerSkillVisual || towerBasicVisual) && (typeof action !== "string" || !action.trim())) {
          if (thVisual) thVisualUnavailable++;
          if (tqBasicVisual) tqBasicVisualUnavailable++;
          return native.apply(self, args);
        }
        const original = avatar.getActionTween, expectedAction = String(action || "attack");
        const wrapped = __captureESMFunction15(__esmLocal1232 = (function(...a) {
          if (a[0] !== expectedAction) return original.apply(this, a);
          const before = Number(a[2] ?? 1);
          if (!Number.isFinite(before) || before <= 0) return original.apply(this, a);
          a[2] = Math.min(factor, before * factor);
          const tween = original.apply(this, a), clip = this.getCurAction;
          if (clip && typeof clip === "object" && speedClips.size < 32) speedClips.set(clip, { before, applied: a[2] });
          if (thVisual) thVisualScaled++;
          else if (tqBasicVisual) tqBasicVisualScaled++;
          else if (towerSkillVisual) ST.scaledTowerSkillAnimations++;
          else if (towerBasicVisual) ST.scaledTowerBasicAnimations++;
          else ST.scaledBasicAnimations = (ST.scaledBasicAnimations ?? 0) + 1;
          return tween;
        }), "wrapped");
        const own = Object.getOwnPropertyDescriptor(avatar, "getActionTween");
        if (own && own.writable === false && own.configurable === false) {
          if (thVisual) thVisualUnavailable++;
          if (tqBasicVisual) tqBasicVisualUnavailable++;
          return native.apply(self, args);
        }
        try {
          avatar.getActionTween = wrapped;
        } catch (_) {
          if (thVisual) thVisualUnavailable++;
          if (tqBasicVisual) tqBasicVisualUnavailable++;
          return native.apply(self, args);
        }
        if (avatar.getActionTween !== wrapped) {
          if (thVisual) thVisualUnavailable++;
          if (tqBasicVisual) tqBasicVisualUnavailable++;
          return native.apply(self, args);
        }
        try {
          return native.apply(self, args);
        } finally {
          if (avatar.getActionTween === wrapped) {
            if (own && "value" in own && own.writable === true) {
              avatar.getActionTween = original;
              Object.defineProperty(avatar, "getActionTween", own);
            } else if (own) Object.defineProperty(avatar, "getActionTween", own);
            else delete avatar.getActionTween;
          }
        }
      }
      __esmLocal1222 = animationCall;
      function onNativeCast(targetId, skillId) {
        const p = dispatch.pending;
        if (p) {
          if (p.events.length < 4) p.events.push({ targetId: String(targetId), id: Number(skillId) });
          if (String(targetId) === p.targetId && Number(skillId) === p.id) p.signaled = true;
        }
      }
      __esmLocal1242 = onNativeCast;
      function detachDispatch() {
        if (dispatch.actor) {
          dispatch.actor.off?.(1039, ST.owner, onNativeCast);
          dispatch.actor = null;
        }
      }
      __esmLocal1252 = detachDispatch;
      function attachDispatch(a) {
        if (dispatch.actor === a) return;
        detachDispatch();
        if (typeof a?.on === "function" && typeof a?.off === "function") {
          a.on(1039, ST.owner, onNativeCast);
          dispatch.actor = a;
        }
      }
      __esmLocal126 = attachDispatch;
      function invokeNative(native, self, args) {
        if (!ST.running || !dispatch.actor) return native.apply(self, args);
        dispatch.actor.off(1039, ST.owner, onNativeCast);
        dispatch.actor.on(1039, ST.owner, onNativeCast);
        const pending = { id: Number(args[0]), targetId: identity(self.target), signaled: false, events: [] };
        dispatch.pending = pending;
        dispatch.calls++;
        try {
          return animationCall(native, self, args);
        } finally {
          if (pending.signaled) {
            dispatch.signals++;
            if (ST.targetKey === identity(self.target) + "/" + String(prop(self.target, "occ")) + "/" + scene()) {
              cosmic.lastNativeAt = Date.now();
              cosmic.lastNativeSkill = pending.id;
              if (isBasic(pending.id)) cosmic.basicCasts++;
              else if (pending.id >= 1001 && pending.id <= 1008) cosmic.thCasts++;
            }
            if (thGap.picking && isBasic(pending.id)) {
              thGap.accepted++;
              thGap.lastBasic = pending.id;
            }
            if (pending.id >= 1001 && pending.id <= 1008) {
              ST.lastTHAt = Date.now();
              thGap.lastAt = ST.lastTHAt;
              thGap.lastTarget = ST.targetKey;
              thGap.lastSerial = ST.castAttempts;
            }
            if (mixed.hitQuota !== null && pending.id >= 1001 && pending.id <= 1008) {
              mixed.confirmedSinceTH = 0;
              mixed.thCycles++;
              mixed.wantBasic = true;
            }
          } else dispatch.silent++;
          let silentDetail = null;
          if (!pending.signaled) {
            let effect = null, effectError = "";
            try {
              if (typeof self._mvt === "function") effect = !!self._mvt(pending.id);
            } catch (e) {
              effectError = String(e?.message || e);
            }
            silentDetail = {
              ownerId: identity(self.owner),
              ownerType: prop(self.owner, "type"),
              ownerMatchesActor: self.owner === dispatch.actor,
              validTarget: self.isValidTarget?.() ?? null,
              effectAvailable: effect,
              effectError,
              nativeFunction: Function.prototype.toString.call(native).slice(0, 240)
            };
          }
          dispatch.recent.push({ at: Date.now(), id: pending.id, targetId: pending.targetId, signaled: pending.signaled, events: pending.events, silentDetail });
          if (dispatch.recent.length > 16) dispatch.recent.shift();
          dispatch.pending = null;
        }
      }
      __esmLocal127 = invokeNative;
      const prop = __captureESMFunction15(__esmLocal128 = ((o, k) => {
        try {
          return o?.property?.get?.(k) ?? null;
        } catch (_) {
          return null;
        }
      }), "prop");
      const identity = __captureESMFunction15(__esmLocal129 = ((o) => String(prop(o, "id") ?? o?.id ?? "")), "identity");
      const loc = __captureESMFunction15(__esmLocal130 = ((o) => {
        const p = prop(o, "position");
        const x = Number(p?.x), y = Number(p?.y);
        return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
      }), "loc");
      const radius = __captureESMFunction15(__esmLocal131 = ((a, b) => {
        const p = loc(a), q = loc(b);
        return p && q ? Math.hypot(p.x - q.x, p.y - q.y) : null;
      }), "radius");
      function role() {
        const world = W._C?._Ba?.instance;
        const a = world?.getRole?.(Number(actorId)) ?? world?.getRole?.(actorId);
        return { a, s: a?.getComponent?.(Skill), c: a?.getComponent?.(Combat), m: a?.getComponent?.(Move) };
      }
      __esmLocal1322 = role;
      function stageOcc() {
        if (["LINH_LUNG", "PHU_VAN", "TRU_TIEN"].includes(getKVPV_FAR_SCOPE()?.status?.().kind)) {
          const t = role().c?.target;
          return call_KVPV_FAR_SCOPE_eligible(t) ? Number(prop(t, "occ")) : null;
        }
        try {
          const lv = Number(W._Ba?._Co?._Mo?.ins?.curLv), c = W._ft?._h$?.ins?.getCfgByLv?.(lv);
          const n = c ? Number(W._ft._h$.ins.occ(c, lv)) : NaN;
          return Number.isSafeInteger(n) && n > 0 ? n : null;
        } catch (_) {
          return null;
        }
      }
      __esmLocal1332 = stageOcc;
      function eligible(t) {
        if (!t || t.isValid === false) return false;
        const scope = getKVPV_FAR_SCOPE()?.status?.();
        const type = Number(prop(t, "type"));
        if (type !== 1 && !(scope?.inside && scope.kind === "TRU_TIEN" && type === 3)) return false;
        return stageOcc() !== null && Number(prop(t, "occ")) === stageOcc();
      }
      __esmLocal1342 = eligible;
      function key(occ, id) {
        return String(occ) + "/" + String(id);
      }
      __esmLocal1352 = key;
      const scene = __captureESMFunction15(__esmLocal136 = (() => String(W._Ba?._$a?._yo?.ins?.intoSce?.[0] ?? "")), "scene");
      function skill1008Info(show = true) {
        const read = __captureESMFunction15(__esmLocal138 = ((fn) => {
          try {
            return fn() ?? null;
          } catch {
            return null;
          }
        }), "read");
        const pack = __captureESMFunction15(__esmLocal139 = ((v, depth = 0) => {
          if (v === null || ["number", "string", "boolean"].includes(typeof v)) return v;
          if (depth >= 3) return null;
          if (Array.isArray(v)) return v.slice(0, 96).map(__captureESMFunction15(__esmLocal140 = ((x) => pack(x, depth + 1)), ""));
          return null;
        }), "pack");
        const r = read(__captureESMFunction15(__esmLocal141 = (() => role()), "")), learned = read(__captureESMFunction15(__esmLocal1422 = (() => W._Ba?._rJ?._O$?.ins?.skills), "")), row = Array.isArray(learned) ? learned.find(__captureESMFunction15(__esmLocal1432 = ((x) => Number(x?.[0]) === 1008), "")) : null, level = Number(row?.[1]);
        const native = read(__captureESMFunction15(__esmLocal1442 = (() => r?.c?._mvt?.(1008)), "")), table = Number.isFinite(level) && level > 0 ? read(__captureESMFunction15(__esmLocal1452 = (() => W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(1008, level)), "")) : null;
        const result = { skillId: 1008, at: Date.now(), level: Number.isFinite(level) ? level : null, name: typeof (native ?? table)?.[2] === "string" ? (native ?? table)[2] : null, nativeConfigRaw: pack(native), learnedLevelConfigRaw: pack(table), selectorRows: [r?.s?._rtt, r?.s?._wet].flatMap(__captureESMFunction15(__esmLocal146 = ((x) => Array.isArray(x) ? x : []), "")).filter(__captureESMFunction15(__esmLocal147 = ((x) => Number(x?.[0]) === 1008), "")).map(__captureESMFunction15(__esmLocal148 = ((x) => pack(x)), "")), observed: metrics?.report()?.current?.skills?.find(__captureESMFunction15(__esmLocal149 = ((x) => x.id === 1008), "")) ?? null, effectInterpretation: "Raw native/learned-level config only. Unmapped columns are not interpreted as buffs, duration, range or damage. No confirmed buff-effect mapping available." };
        if (show) console.log("[Skill 1008]", result);
        return result;
      }
      __esmLocal137 = skill1008Info;
      function candidate(id) {
        if (getKVPV_TRANSFORM10()?.transformed?.()) return call_KVPV_TRANSFORM10_has(id);
        if (!Number.isSafeInteger(id) || id <= 0 || id >= 8001 && id <= 8009) return false;
        const r = role();
        return [r.s?._rtt, r.s?._wet].some(__captureESMFunction15(__esmLocal158 = ((rows) => Array.isArray(rows) && rows.some(__captureESMFunction15(__esmLocal159 = ((row) => Number(row?.[0]) === id), ""))), ""));
      }
      __esmLocal157 = candidate;
      const isTuyetHocSkill = __captureESMFunction15(__esmLocal160 = ((id) => Number.isSafeInteger(Number(id)) && Number(id) >= 1001 && Number(id) <= 1008), "isTuyetHocSkill");
      const tianQuanThMode = __captureESMFunction15(__esmLocal161 = (() => ["SCAN", "STRICT"].includes(ST.mode) && getKVPV_TQ_SINGLE_STRONGEST_TH() === true && ["BOSS_TH300_SCAN", "BOSS_TH300"].includes(getKVPV_MODE()?.status?.(false)?.mode) && getKVPV_FAR_SCOPE()?.status?.()?.kind === "THIEN_QUAN"), "tianQuanThMode");
      function tuyetHocCalibration(occ = ST.targetOcc) {
        const roster = skillNames().map(__captureESMFunction15(__esmLocal1632 = ((x) => Number(x.id)), "")).filter(isTuyetHocSkill);
        const rows = roster.map(__captureESMFunction15(__esmLocal1642 = ((id) => {
          const m = stats(occ, id);
          return {
            id,
            hits: m.hits,
            attempts: m.attempts,
            unconfirmed: m.unconfirmed,
            averageDamage: m.hits ? m.damage / m.hits : 0,
            verified: verified(occ, id),
            verifiedDistance: supportedDistance(occ, id)
          };
        }), ""));
        const complete = rows.length > 0 && rows.every(__captureESMFunction15(__esmLocal1652 = ((x) => x.hits >= thCalibration.minHitsPerSkill || x.unconfirmed >= thCalibration.maxUnconfirmedPerSkill), ""));
        const eligible2 = rows.filter(__captureESMFunction15(__esmLocal166 = ((x) => x.hits >= thCalibration.minHitsPerSkill && x.verified && x.verifiedDistance >= 300), "")).sort(__captureESMFunction15(__esmLocal167 = ((a, b) => b.averageDamage - a.averageDamage || a.id - b.id), ""));
        return {
          complete,
          locked: thCalibration.autoLocked,
          selectedSkillId: thCalibration.skillId,
          minHitsPerSkill: thCalibration.minHitsPerSkill,
          rows,
          best: eligible2[0] ?? null,
          reason: thCalibration.reason
        };
      }
      __esmLocal1622 = tuyetHocCalibration;
      function updateTuyetHocCalibration() {
        if (!tianQuanThMode() || ST.mode !== "SCAN" || thCalibration.autoLocked) return;
        const result = tuyetHocCalibration();
        if (!result.complete) return;
        thCalibration.autoLocked = true;
        thCalibration.skillId = result.best?.id ?? null;
        thCalibration.completedAt = Date.now();
        thCalibration.reason = result.best ? "locked_highest_confirmed_average_damage" : "no_skill_confirmed_at_scan_range";
        ST.mode = "STRICT";
        ST.skillCursor = 0;
        note("TUYET_HOC_LOCKED", {
          skillId: thCalibration.skillId,
          averageDamage: result.best?.averageDamage ?? null,
          measured: result.rows.map(__captureESMFunction15(__esmLocal169 = ((x) => ({ id: x.id, hits: x.hits, unconfirmed: x.unconfirmed, averageDamage: x.averageDamage, verifiedDistance: x.verifiedDistance })), ""))
        });
      }
      __esmLocal168 = updateTuyetHocCalibration;
      const tqMpack = { enabled: true };
      const hangMaSkillName = __captureESMFunction15(__esmLocal170 = ((id) => {
        const learned = W._Ba?._rJ?._O$?.ins?.skills ?? [], level = Number(learned.find(__captureESMFunction15(__esmLocal171 = ((row) => Number(row?.[0]) === Number(id)), ""))?.[1]);
        if (!Number.isSafeInteger(level) || level < 1) return false;
        let name = "";
        try {
          name = String(W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(Number(id), level)?.[2] ?? "");
        } catch (_) {
        }
        const normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
        return normalized.includes("hang ma chan quyet");
      }), "hangMaSkillName");
      function tqMpackExtraAllowed(value) {
        const id = Number(value);
        if (!tqMpack.enabled || !tqFive?.active() || !tqFive.allowsTuyetHoc() || basicSolo4100Active() || transforming() || getKVPV_FAR_SCOPE()?.status?.()?.kind !== "THIEN_QUAN" || !Number.isSafeInteger(id) || id < 1 || isBasic(id) || id >= 1001 && id <= 1008) return false;
        if (!candidate(id) || !hangMaSkillName(id)) return false;
        const nativeList = (typeof _vX !== "undefined" ? _vX?.ins?.skills : null) ?? W._vX?.ins?.skills;
        const playerList = W._Ba?._rJ?._O$?.ins?.skills;
        const learned = Array.isArray(nativeList) ? nativeList : playerList;
        const entry = Array.isArray(learned) ? learned.find(__captureESMFunction15(__esmLocal1732 = ((row) => Number(row?.[0]) === id), "")) : null;
        const lv = Number(entry?.[1]);
        if (!entry || !Number.isSafeInteger(lv) || lv < 1) return false;
        let cfg;
        try {
          cfg = W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id, lv);
        } catch (_) {
          return false;
        }
        if (!Array.isArray(cfg) || Number(cfg[1]) !== id || Number(cfg[4]) !== 1 || /chủ động\s*$/i.test(String(cfg[2] ?? ""))) return false;
        const maps = cfg[17];
        if (Array.isArray(maps) && maps.length && !maps.some(__captureESMFunction15(__esmLocal1742 = ((m) => Number(m) === Number(scene())), ""))) return false;
        return true;
      }
      __esmLocal1722 = tqMpackExtraAllowed;
      function tqActiveExtraIds() {
        if (!tqMpack.enabled || !tqFive?.active() || !tqFive.allowsTuyetHoc() || getKVPV_FAR_SCOPE()?.status?.()?.kind !== "THIEN_QUAN") return [];
        const r = role();
        const ids = [...new Set([r.s?._rtt, r.s?._wet].flatMap(__captureESMFunction15(__esmLocal176 = ((rows) => Array.isArray(rows) ? rows.map(__captureESMFunction15(__esmLocal177 = ((row) => Number(row?.[0])), "")) : []), "")))];
        return ids.filter(tqMpackExtraAllowed).sort(__captureESMFunction15(__esmLocal178 = ((a, b) => a - b), ""));
      }
      __esmLocal1752 = tqActiveExtraIds;
      const tqSelectableNative = __captureESMFunction15(__esmLocal179 = ((id) => {
        const skillId = Number(id);
        return isTuyetHocSkill(skillId) ? candidate(skillId) : tqMpackExtraAllowed(skillId) && hangMaSkillName(skillId);
      }), "tqSelectableNative");
      function setTianQuanMpackExtras(enabled = true) {
        tqMpack.enabled = enabled === true;
        return { enabled: tqMpack.enabled, extraIds: tqActiveExtraIds(), nativeOnly: true };
      }
      __esmLocal180 = setTianQuanMpackExtras;
      function bossRange() {
        const cfg = Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(role().c?.target, "occ")))?.[3]) || 0;
        const observed = Number(getKVPV_HITRUN1()?.status?.(false)?.observedDangerRadius) || 0;
        return Math.max(cfg, observed);
      }
      __esmLocal181 = bossRange;
      function outside(d) {
        return Number.isFinite(d) && d > CFG.min && d <= CFG.max;
      }
      __esmLocal1822 = outside;
      function combatOwner() {
        return tqDistanceOnly() ? { running: true, phase: "FIGHT", owner: "TQ_DISTANCE_ONLY", leavePct: 0 } : getKVPV_HITRUN1()?.status?.(false);
      }
      __esmLocal1832 = combatOwner;
      function towerFinish() {
        const threshold = null;
        if (threshold === null) return false;
        const t = role().c?.target, h = prop(t, "hp"), current = Number(h?.[0]), max = Number(h?.[1]);
        return eligible(t) && Array.isArray(h) && Number.isFinite(current) && Number.isFinite(max) && max > 0 && current > 0 && current / max <= threshold;
      }
      __esmLocal1842 = towerFinish;
      function canFight() {
        if (W._Ba?._rJ?._O$?.ins?.isDead === true || (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() === false) return false;
        const hr = combatOwner(), r = role(), hp = prop(r.a, "hp");
        const pct = Array.isArray(hp) && Number(hp[1]) > 0 ? Number(hp[0]) / Number(hp[1]) * 100 : hr?.hpPct;
        return hr?.running === true && hr.phase === "FIGHT" && Number.isFinite(pct) && pct > Number(hr.leavePct ?? 35) && r.m?._fut !== 3 && r.m?._fut !== 4;
      }
      __esmLocal185 = canFight;
      function stats(occ, id) {
        const k = key(occ, id);
        if (!ST.stats.has(k)) ST.stats.set(k, { attempts: 0, hits: 0, damage: 0, unconfirmed: 0 });
        return ST.stats.get(k);
      }
      __esmLocal186 = stats;
      function settle(c, hit) {
        pacer?.observe(hit, c.tuningEligible === true && canFight() && atPosition(role()) && c.targetId === identity(role().c?.target) && c.scene === scene());
      }
      __esmLocal187 = settle;
      function expire() {
        const t = Date.now();
        for (const c of ST.casts) if (!c.used && t - c.time > CFG.castTtlMs) {
          c.used = true;
          stats(c.occ, c.id).unconfirmed++;
          metrics?.result(c.serial, false, 0, c.metricsInterrupted === true);
          if (c.mixedBasic && !c.metricsInterrupted && c.targetId === identity(ST.target) && !tqFive?.active()) {
            mixed.unconfirmed++;
            if (mixed.hits === 0 && mixed.unconfirmed >= 3 && !mixed.suspended) {
              mixed.suspended = true;
              mixed.wantBasic = false;
              note("BASIC-SUSPENDED", { reason: "three_unconfirmed_basic_results", bossId: c.targetId });
            }
          }
          settle(c, false);
        }
      }
      __esmLocal188 = expire;
      function supportedDistance(occ, id) {
        const a = (ST.evidence.get(key(occ, id)) || []).map(__captureESMFunction15(__esmLocal190 = ((x) => Math.min(x.castDistance, x.hitDistance)), "")).sort(__captureESMFunction15(__esmLocal191 = ((a2, b) => b - a2), ""));
        return a[CFG.minCastConfirmations - 1] ?? 0;
      }
      __esmLocal189 = supportedDistance;
      function verified(occ, id) {
        return (ST.proofs.get(key(occ, id))?.size || 0) >= CFG.minCastConfirmations;
      }
      __esmLocal1922 = verified;
      function basicPendingBlocks(c) {
        const combat = role().c;
        if (tqFive?.active()) return animationPlaying(combat);
        if (CFG.basicOnly) return animationPlaying(combat) || combat?.isCooldown?.() !== false;
        if (mixed.hitQuota === null) return true;
        const rows = [...role().s?._rtt || [], ...role().s?._wet || []];
        const row = rows.find(__captureESMFunction15(__esmLocal195 = ((r) => Number(r[0]) === c.id), ""));
        const wait = Math.max(500, Number(row?.[2]) || 0);
        return Date.now() - c.time < wait || animationPlaying(combat) || combat?.isCooldown?.() !== false;
      }
      __esmLocal1942 = basicPendingBlocks;
      const basicQuotaSatisfied = __captureESMFunction15(__esmLocal196 = ((id) => mixed.suspended || mixed.hitQuota === null || Number(id) < 1001 || Number(id) > 1008 || mixed.confirmedSinceTH >= mixed.hitQuota), "basicQuotaSatisfied");
      function allowed(id, occ, d) {
        const transformSkill = isTransformSkill(id);
        if (!transformSkill && tianQuanThMode() && (!isTuyetHocSkill(Number(id)) || ST.mode === "STRICT" && thCalibration.autoLocked && Number(id) !== thCalibration.skillId)) return false;
        if (!transformSkill && tqFive?.active() && (isBasic(id) ? !tqFive.ids().includes(Number(id)) : !tqFive.allowsTuyetHoc() || !tqSelectableNative(id))) return false;
        if (isBasic(id)) return selectedBasic(id) && (tqFive?.active() || mixed.enabled && !mixed.suspended) && [role().s?._rtt, role().s?._wet].some(__captureESMFunction15(__esmLocal198 = ((rows) => Array.isArray(rows) && rows.some(__captureESMFunction15(__esmLocal199 = ((row) => Number(row?.[0]) === Number(id)), ""))), "")) && !ST.casts.some(__captureESMFunction15(__esmLocal200 = ((c) => !c.used && c.basicCast && basicPendingBlocks(c) && c.id === Number(id) && c.targetId === identity(role().c?.target) && c.scene === scene() && Date.now() - c.time <= CFG.castTtlMs), ""));
        return (isTransformSkill(id) || basicQuotaSatisfied(id)) && candidate(Number(id)) && !((burst.enabled || pacer) && !transforming() && __captureESMFunction15(__esmLocal201 = (() => {
          const pending = ST.casts.filter(__captureESMFunction15(__esmLocal2022 = ((c) => !c.used && c.id === Number(id) && c.targetId === identity(role().c?.target) && c.scene === scene() && Date.now() - c.time <= CFG.castTtlMs), ""));
          if (!pending.length) return false;
          const allowedRetry = tqNativeReadyRepeat(Number(id), pending);
          if (!allowedRetry && tqIdleFill.enabled && tqFive?.active() && tqDistanceOnly() && Number(id) >= 1001 && Number(id) <= 1008) tqIdleFill.deniedPending++;
          return !allowedRetry;
        }), "")()) && (ST.mode === "SCAN" || verified(occ, id) && Number.isFinite(d) && d <= supportedDistance(occ, id) + 0.01);
      }
      __esmLocal197 = allowed;
      function tqNativeReadyRepeat(id, pending) {
        if (!tqIdleFill.enabled || ST.mode !== "SCAN" || !tqFive?.active() || !tqDistanceOnly() || !Number.isSafeInteger(id) || id < 1001 || id > 1008) return false;
        if (pending.length >= tqIdleFill.maxPendingPerTH) return false;
        const r = role(), now = Date.now(), c = r.c;
        if (typeof c?.isCooldown !== "function" || c.isCooldown() !== false || animationPlaying(c) || !castReady()) return false;
        const row = [...r.s?._rtt ?? [], ...r.s?._wet ?? []].find(__captureESMFunction15(__esmLocal204 = ((x) => Number(x?.[0]) === id), ""));
        const token = ST.tqSelectedNative;
        const selectedNow = token?.id === id && token.targetId === identity(c?.target) && token.scene === scene() && now - token.at >= 0 && now - token.at <= 40;
        if (!row || !Number.isFinite(Number(row[1])) || Number(row[1]) >= now && !selectedNow) return false;
        const duration = Number(row[2]);
        const minGap = Math.max(
          tqIdleFill.minRepeatMs,
          Number.isFinite(duration) && duration > 0 ? Math.min(1e3, duration) : 0
        );
        return now - Math.max(...pending.map(__captureESMFunction15(__esmLocal205 = ((x) => x.time), ""))) >= minGap;
      }
      __esmLocal2032 = tqNativeReadyRepeat;
      function targetDistance() {
        if (tqDistanceOnly()) return 310;
        if (tqFive?.active()) return CFG.goal;
        if (ST.mode !== "STRICT") return CFG.goal;
        const occ = stageOcc(), distances = skillNames().filter(__captureESMFunction15(__esmLocal207 = ((x) => verified(occ, x.id)), "")).map(__captureESMFunction15(__esmLocal208 = ((x) => supportedDistance(occ, x.id)), ""));
        if (!distances.length) return null;
        return Math.min(CFG.goal, Math.max(...distances) - 0.2);
      }
      __esmLocal206 = targetDistance;
      function note(type, data) {
        ST.history.push({ time: Date.now(), type, data });
        if (ST.history.length > 60) ST.history.shift();
      }
      __esmLocal209 = note;
      function restore(h) {
        if (!h) return;
        const { obj, k, fn, own } = h;
        if (obj[k] !== fn) {
          ST.lastError = "Hook replaced externally: " + k;
          return;
        }
        try {
          if (own) Object.defineProperty(obj, k, own);
          else delete obj[k];
        } catch (e) {
          ST.lastError = String(e);
        }
      }
      __esmLocal2102 = restore;
      function hook(obj, k, mk) {
        if (typeof obj?.[k] !== "function") return null;
        let own = Object.getOwnPropertyDescriptor(obj, k);
        if (own && !own.configurable) return null;
        let base = obj[k];
        const seen = /* @__PURE__ */ new Set();
        while (typeof base?.__KVPV_TH300_PARENT === "function" && !seen.has(base)) {
          seen.add(base);
          base = base.__KVPV_TH300_PARENT;
        }
        const legacy = __captureESMFunction15(__esmLocal2122 = ((fn) => {
          const text = Function.prototype.toString.call(fn);
          return k === "combat" ? text.startsWith("function(skillId){") && text.includes("ST.running&&this===r.c") && text.includes("ST.lastInvocation=Date.now()") : k === "_f7t" && text.startsWith("function(active,common,mode){") && text.includes("ST.running&&this===r.s") && text.includes("ST.skillWaits");
        }), "legacy");
        if (legacy(base)) {
          let proto = Object.getPrototypeOf(obj), candidate2;
          while (proto) {
            const d = Object.getOwnPropertyDescriptor(proto, k);
            if (typeof d?.value === "function") {
              candidate2 = d.value;
              break;
            }
            proto = Object.getPrototypeOf(proto);
          }
          if (!candidate2 || legacy(candidate2)) {
            ST.lastError = "Cannot safely unwrap legacy TH300 " + k;
            return null;
          }
          base = candidate2;
        }
        if (base !== obj[k]) {
          const inherited = Object.getPrototypeOf(obj)?.[k];
          own = base === inherited ? void 0 : { value: base, writable: true, configurable: true, enumerable: !!own?.enumerable };
          note("HOOK-DEDUP", { method: k });
        }
        const wrapped = mk(base);
        Object.defineProperty(wrapped, "__KVPV_TH300_PARENT", { value: base });
        Object.defineProperty(obj, k, { value: wrapped, writable: true, configurable: true, enumerable: !!own?.enumerable });
        return { obj, k, fn: wrapped, own };
      }
      __esmLocal2112 = hook;
      function unbind() {
        ST.basicImpactSerial = null;
        detachDispatch();
        for (const h of ST.movement.slice().reverse()) restore(h);
        ST.movement = [];
        restore(ST.s);
        restore(ST.c);
        ST.s = null;
        ST.c = null;
        ST.positioning = false;
      }
      __esmLocal2132 = unbind;
      function atPosition(r) {
        if (getKVPV_FAR_SCOPE()?.status?.()?.kind === "TRU_TIEN") return r.c?.target?.isValidRange?.() === true;
        const d = radius(r.a, r.c?.target), goal = targetDistance();
        return goal !== null && outside(d) && Math.abs(d - goal) <= CFG.tolerance + (ST.mode === "SCAN" && ST.arrivalSnap ? 1 : 0) && (ST.mode !== "STRICT" || d <= goal + 0.2);
      }
      __esmLocal2142 = atPosition;
      function castReady() {
        const r = role();
        return canFight() && !ST.positioning && atPosition(r);
      }
      __esmLocal215 = castReady;
      function guardMovement(r) {
        const entryGuard = __captureESMFunction15(__esmLocal217 = (() => {
          const hr = combatOwner(), hp = prop(r.a, "hp");
          return ST.running && getKVPV_FAR_SCOPE()?.status?.()?.kind === "THIEN_QUAN" && !hr?.running && W._Ba?._rJ?._O$?.ins?.isDead !== true && Array.isArray(hp) && Number(hp[1]) > 0 && Number(hp[0]) / Number(hp[1]) * 100 > 35;
        }), "entryGuard");
        for (const method of ["moveTo", "moveToCoordinate", "moveByPath"]) {
          if (typeof r.m[method] !== "function") continue;
          const move = hook(r.m, method, __captureESMFunction15(__esmLocal218 = ((native) => __captureESMFunction15(__esmLocal219 = (function(...args) {
            if (ST.running && getKVPV_FAR_SCOPE()?.status?.()?.kind !== "TRU_TIEN" && (canFight() || entryGuard()) && eligible(r.c?.target) && !towerFinish() && !ST.ownMove) {
              ST.blockedSteering++;
              return void 0;
            }
            return native.apply(this, args);
          }), "")), ""));
          if (!move) {
            for (const h of ST.movement.slice().reverse()) restore(h);
            ST.movement = [];
            return false;
          }
          ST.movement.push(move);
        }
        if (!ST.movement.length) return false;
        if (typeof r.m.stop === "function") {
          const stopHook = hook(r.m, "stop", __captureESMFunction15(__esmLocal220 = ((native) => __captureESMFunction15(__esmLocal221 = (function(...args) {
            if (ST.running && getKVPV_FAR_SCOPE()?.status?.()?.kind !== "TRU_TIEN" && ST.positioning && canFight() && !towerFinish() && !ST.ownMove && !atPosition(r)) {
              ST.blockedSteering++;
              return void 0;
            }
            return native.apply(this, args);
          }), "")), ""));
          if (!stopHook) {
            for (const h of ST.movement.slice().reverse()) restore(h);
            ST.movement = [];
            return false;
          }
          ST.movement.push(stopHook);
        }
        return true;
      }
      __esmLocal216 = guardMovement;
      const animationPlaying = __captureESMFunction15(__esmLocal2222 = ((c) => c?._jh?.isPlaying === true), "animationPlaying");
      const basicTailReady = __captureESMFunction15(__esmLocal2232 = (() => mixed.enabled && ST.basicImpactSerial === ST.castAttempts && ST.basicImpactSerial !== null), "basicTailReady");
      const confirmedTailSkill = __captureESMFunction15(__esmLocal224 = ((id) => tqFive?.active() ? tqFive.ids().includes(Number(id)) : [8001, 8005].includes(Number(id))), "confirmedTailSkill");
      function nativeReady(c) {
        if (confirmedTailCut && basicTailReady() && canFight()) {
          const cast = ST.casts.findLast?.(__captureESMFunction15(__esmLocal226 = ((x) => x.serial === ST.basicImpactSerial), "")), tween = c?._jh;
          if (cast?.used && !cast.tailCut && confirmedTailSkill(cast.id) && cast.targetId === identity(c.target) && cast.scene === scene() && tween?.isPlaying === true && typeof tween.stop === "function") {
            cast.tailCut = true;
            try {
              tween.stop();
              if (c._jh === tween) c._jh = null;
              confirmedTailCuts++;
            } catch (e) {
              confirmedTailCut = false;
              ST.lastError = String(e?.message || e);
            }
          }
        }
        return (!animationPlaying(c) || basicTailReady()) && (typeof c?.isCooldown !== "function" || c.isCooldown() === false);
      }
      __esmLocal225 = nativeReady;
      function tqBasicDispatchReady(id, c) {
        const token = ST.tqSelectedBasic, now = Date.now();
        return tqFive?.active() && isBasic(id) && token?.id === Number(id) && token.targetId === identity(c?.target) && token.scene === scene() && now - token.at >= 0 && now - token.at <= 80 && (!animationPlaying(c) || basicTailReady());
      }
      __esmLocal227 = tqBasicDispatchReady;
      function burstCast(r) {
        const now = Date.now(), batchGap = Math.max(100, CFG.scanMs);
        if (now < burst.nextAt) {
          ST.lastReason = "waiting_burst_gap";
          return;
        }
        if (!nativeReady(r.c)) {
          ST.lastReason = "waiting_native_cooldown";
          return;
        }
        if (r.c.isValidTarget?.() !== true) {
          ST.lastReason = "native_target_invalid";
          return;
        }
        const selectorRows = [r.s?._rtt, r.s?._wet].flatMap(__captureESMFunction15(__esmLocal229 = ((rows) => Array.isArray(rows) ? rows : []), "")), readyIds = [...new Set(selectorRows.filter(__captureESMFunction15(__esmLocal230 = ((row) => isTuyetHocSkill(Number(row?.[0])) && Number.isFinite(Number(row?.[1])) && Number(row[1]) < now && tqSelectableNative(Number(row[0]))), "")).map(__captureESMFunction15(__esmLocal231 = ((row) => Number(row[0])), "")))], roster = skillNames().map(__captureESMFunction15(__esmLocal2322 = ((x) => x.id), "")).filter(__captureESMFunction15(__esmLocal2332 = ((id) => readyIds.includes(id)), "")), offset = roster.length ? ST.skillCursor % roster.length : 0, ids = roster.slice(offset).concat(roster.slice(0, offset));
        if (!ids.length) {
          ST.lastReason = "waiting_ready_tuyet_hoc";
          burst.lastPass = { at: now, readyIds: [], attempted: [], selectorRejected: [], blockedBy: "no_native_ready_rows" };
          burst.nextAt = now + batchGap;
          return;
        }
        const group = { serial: burst.serial + 1, at: now, bossId: identity(r.c.target), scene: scene(), readyIds: ids.slice(), attempted: [], selectorRejected: [], confirmed: [], matchedDamage: 0 };
        burst.history.push(group);
        burst.active = group;
        burst.dispatch = true;
        burst.nextAt = now + batchGap;
        burst.lastPass = group;
        try {
          for (const id of ids) {
            if (!castReady() || !eligible(r.c.target) || identity(r.c.target) !== group.bossId || scene() !== group.scene) break;
            burst.desired = id;
            const selected = Number(r.s.selectSkill?.());
            if (selected !== id) {
              group.selectorRejected.push({ id, selected: Number.isFinite(selected) ? selected : null });
              continue;
            }
            const before = ST.castAttempts;
            r.c.combat(id);
            if (ST.castAttempts > before) {
              group.attempted.push(id);
              ST.fastCasts++;
            }
          }
        } finally {
          burst.dispatch = false;
          burst.desired = null;
          burst.active = null;
          if (!group.attempted.length) burst.history.pop();
          else {
            burst.serial++;
            if (burst.history.length > 30) burst.history.shift();
          }
        }
        ST.lastReason = group.attempted.length ? "burst_dispatched" : ST.casts.some(__captureESMFunction15(__esmLocal2342 = ((c) => !c.used && c.targetId === identity(r.c.target) && c.scene === scene()), "")) ? "burst_waiting_results" : "waiting_ready_tuyet_hoc";
      }
      __esmLocal228 = burstCast;
      function thGapCast(r) {
        if (basicSolo4100Active() || pilot4100THOnly() || !thGapActive(r.c)) return false;
        if (!thGapNativeReady(r.c)) {
          thGap.blockedCooldown++;
          ST.lastReason = "th_gap_native_cooldown";
          return true;
        }
        if (r.c.isValidTarget?.() !== true) {
          ST.lastReason = "native_target_invalid";
          return true;
        }
        thGap.picking = true;
        try {
          const id = Number(r.s.selectSkill?.()), occ = Number(prop(r.c.target, "occ")), d = radius(r.a, r.c.target);
          if (!isBasic(id) || id > 8005 || !allowed(id, occ, d)) {
            ST.lastReason = "th_gap_no_ready_basic";
            return true;
          }
          const before = ST.castAttempts;
          r.c.combat(id);
          if (ST.castAttempts > before) {
            thGap.attempts++;
            ST.fastCasts++;
            ST.lastReason = "th_gap_basic_native_attempt";
          } else ST.lastReason = "th_gap_basic_blocked";
          return true;
        } finally {
          thGap.picking = false;
        }
      }
      __esmLocal236 = thGapCast;
      function fastCast(r) {
        const pace = currentPace();
        if (!castReady()) return;
        if (burst.enabled && !transforming()) return burstCast(r);
        if (Date.now() - ST.lastInvocation < pace) {
          ST.lastReason = "waiting_pace";
          return;
        }
        if (thGapCast(r)) return;
        if (typeof r.c.isCooldown !== "function") {
          ST.lastReason = "native_cooldown_unavailable";
          return;
        }
        if (!nativeReady(r.c)) {
          ST.lastReason = animationPlaying(r.c) ? "waiting_native_animation" : "waiting_native_cooldown";
          return;
        }
        if (typeof r.c.isValidTarget !== "function" || r.c.isValidTarget() !== true) {
          ST.lastReason = "native_target_invalid";
          return;
        }
        const skill = Number(r.s.selectSkill?.());
        if (allowed(skill, Number(prop(r.c.target, "occ")), radius(r.a, r.c.target))) {
          r.c.combat(skill);
          ST.fastCasts++;
          ST.lastReason = "casting_native_skill";
        } else ST.lastReason = CFG.basicOnly ? "waiting_ready_basic_" + String(basicRotation()[0] ?? mixed.rotation[0] ?? 8001) : basicSolo4100Active() ? "waiting_ready_basic" : "waiting_ready_tuyet_hoc";
      }
      __esmLocal237 = fastCast;
      function dungeonFinishBasic(r) {
        if (!towerFinish() || !canFight() || !eligible(r.c?.target)) return false;
        if (typeof r.c?.isValidTarget === "function" && r.c.isValidTarget() !== true) {
          ST.lastReason = "dungeon_finish_invalid_target";
          return false;
        }
        if (typeof r.c?.isValidRange === "function" && r.c.isValidRange() !== true) {
          ST.lastReason = "dungeon_finish_out_of_native_range";
          return false;
        }
        const now = Date.now();
        if (now - ST.lastInvocation < Math.max(1, currentPace())) {
          ST.lastReason = "dungeon_finish_waiting_pace";
          return false;
        }
        if (!nativeReady(r.c)) {
          ST.lastReason = "dungeon_finish_waiting_native_ready";
          return false;
        }
        const learned = [...r.s?._rtt ?? [], ...r.s?._wet ?? []].filter(__captureESMFunction15(__esmLocal239 = ((row) => Array.isArray(row) && Number.isSafeInteger(Number(row[0])) && Number(row[0]) >= 8001 && Number(row[0]) <= 8005 && selectedBasic(Number(row[0])) && Number.isFinite(Number(row[1])) && Number(row[1]) < now), ""));
        if (!learned.length) {
          ST.lastReason = "dungeon_finish_waiting_basic_ready";
          return false;
        }
        const id = Number(learned[ST.finishCursor % learned.length][0]);
        ST.finishCursor = (ST.finishCursor + 1) % 5;
        r.c.combat(id);
        ST.lastInvocation = now;
        ST.fastCasts++;
        ST.lastReason = "dungeon_finish_basic_cast";
        return true;
      }
      __esmLocal238 = dungeonFinishBasic;
      function onHit(source, marker, damage, flags, receiver) {
        if (!ST.running) return;
        hitDiagnostics.received++;
        const reject = __captureESMFunction15(__esmLocal241 = ((reason) => {
          hitDiagnostics.rejected[reason] = (hitDiagnostics.rejected[reason] || 0) + 1;
          if (String(source) === actorId) {
            hitDiagnostics.recent.push({ at: Date.now(), reason, source: String(source), receiver: String(receiver), marker: Number(marker), damage: Number(damage), flags: Number(flags) });
            if (hitDiagnostics.recent.length > 16) hitDiagnostics.recent.shift();
          }
        }), "reject");
        if (String(source) !== actorId) {
          reject("foreign_source");
          return;
        }
        if (String(receiver) !== identity(ST.target)) {
          reject("wrong_receiver");
          return;
        }
        if (!(Number(damage) > 0)) {
          reject("nonpositive_damage");
          return;
        }
        const raw = Number(marker), id = raw / 1e4, fl = Number(flags) || 0;
        if (!Number.isSafeInteger(raw) || raw % 1e4) {
          reject("unsupported_marker");
          return;
        }
        if (!candidate(id) && !isBasic(id)) {
          reject("unsupported_skill");
          return;
        }
        if (fl & (4 | 16 | 32 | 64 | 128 | 256)) {
          reject("auxiliary_flags");
          return;
        }
        const d = radius(role().a, ST.target);
        ST.lastHitDistance = d == null ? null : +d.toFixed(2);
        const closeBasic = id === 8001 && mixed.hitQuota !== null && towerFinish() && canFight();
        if (!outside(d) && !closeBasic) {
          reject("hit_outside_trial_band");
          return;
        }
        const t = Date.now();
        const cast = ST.casts.findLast?.(__captureESMFunction15(__esmLocal2422 = ((c) => !c.used && c.targetId === identity(ST.target) && c.scene === scene() && c.occ === ST.targetOcc && c.id === id && t - c.time >= 0 && t - c.time <= CFG.castTtlMs && (outside(c.distance) || closeBasic && c.finishBasic)), ""));
        if (!cast) {
          reject("no_matching_pending_cast");
          return;
        }
        hitDiagnostics.accepted++;
        if (cast.basicCast) {
          if (tqFive?.active() && isBasic(id)) {
            const sample = thGap.measured.get(id) || { hits: 0, damage: 0 };
            sample.hits++;
            sample.damage += Number(damage);
            keepRecentHit(sample, damage);
            thGap.measured.set(id, sample);
          }
          if (cast.mixedBasic && id === 8001 && mixed.hitQuota !== null) {
            mixed.confirmedSinceTH++;
            mixed.wantBasic = mixed.confirmedSinceTH < mixed.hitQuota;
          }
          cast.used = true;
          if (cast.mixedBasic && cast.serial === ST.castAttempts) ST.basicImpactSerial = cast.serial;
          const metric2 = stats(cast.occ, id);
          metric2.hits++;
          metric2.damage += Number(damage);
          metrics?.result(cast.serial, true, damage);
          mixed.hits++;
          mixed.damage += Number(damage);
          mixed.examples.push({ id, bossId: cast.targetId, scene: cast.scene, castDistance: cast.distance, hitDistance: d, damage: Number(damage) });
          if (mixed.examples.length > 30) mixed.examples.shift();
          mixed.suspended = false;
          note("BASIC-CONFIRMED", mixed.examples.at(-1));
          return;
        }
        cast.used = true;
        if (cast.ambiguousTH) {
          tqIdleFill.ambiguousHits++;
          metrics?.result(cast.serial, true, damage);
          const metric2 = stats(cast.occ, id);
          metric2.hits++;
          metric2.damage += Number(damage);
          note("TH-OVERLAP-HIT-AMBIGUOUS", { id, damage: Number(damage) });
          return;
        }
        ST.confirmedPairs++;
        if (cast.burstSerial != null) {
          const g = burst.history.find(__captureESMFunction15(__esmLocal245 = ((x) => x.serial === cast.burstSerial), ""));
          if (g) {
            g.confirmed.push(id);
            g.matchedDamage += Number(damage);
          }
        }
        metrics?.result(cast.serial, true, damage);
        settle(cast, true);
        const k = key(cast.occ, id), set = ST.proofs.get(k) || /* @__PURE__ */ new Set();
        set.add(cast.serial);
        ST.proofs.set(k, set);
        const observations = ST.evidence.get(k) || [];
        observations.push({ castDistance: cast.distance, hitDistance: d });
        if (observations.length > 100) observations.shift();
        ST.evidence.set(k, observations);
        const metric = stats(cast.occ, id);
        metric.hits++;
        metric.damage += Number(damage);
        if (tqFive?.active() && id >= 1001 && id <= 1008) {
          const row = cosmic.thMeasured.get(id) || { hits: 0, damage: 0 };
          row.hits++;
          row.damage += Number(damage);
          keepRecentHit(row, damage);
          cosmic.thMeasured.set(id, row);
        }
        note("CONFIRMED", { id, castDistance: cast.distance, hitDistance: +d.toFixed(2), pairs: set.size });
      }
      __esmLocal240 = onHit;
      function unlisten() {
        ST.tqSelectedNative = null;
        resetThGap();
        cosmicReset();
        metrics?.close(ST.running ? "target_changed" : "stopped");
        if (ST.target) {
          try {
            ST.target.off?.(1012, ST.owner, onHit);
          } catch (_) {
            getKVPV_V1()?.diagnostics?.record(_);
          }
        }
        ST.target = null;
        ST.targetOcc = null;
        ST.targetKey = null;
        ST.casts = [];
      }
      __esmLocal246 = unlisten;
      function listen(t) {
        const targetKey = identity(t) + "/" + String(prop(t, "occ")) + "/" + scene();
        if (t === ST.target && targetKey === ST.targetKey) return;
        const previousTargetKey = ST.targetKey;
        unlisten();
        if (!eligible(t)) return;
        if (previousTargetKey && targetKey !== previousTargetKey && thCalibration.autoLocked) {
          thCalibration.autoLocked = false;
          thCalibration.skillId = null;
          thCalibration.completedAt = null;
          thCalibration.reason = "new_boss_recalibration";
          ST.mode = "SCAN";
        }
        ST.target = t;
        ST.targetKey = targetKey;
        ST.positionSample = null;
        ST.positionRetries = 0;
        ST.positionOffset = 0;
        ST.positionCommands = 0;
        ST.positionPause = null;
        ST.positionRecovery = 0;
        ST.arrivalSample = null;
        ST.arrivalSnap = false;
        ST.basicImpactSerial = null;
        ST.lastInvocation = -Infinity;
        ST.skillCursor = 0;
        ST.moveGoal = null;
        ST.lastMove = -Infinity;
        ST.positioning = true;
        ST.lastOwnerPhase = null;
        burst.nextAt = 0;
        if (mixedTargetKey !== targetKey) {
          mixedTargetKey = targetKey;
          mixed.primaryStreak = 0;
          mixed.rotationCursor = 0;
          mixed.wantBasic = mixed.primary && (mixed.hitQuota === null || mixed.confirmedSinceTH < mixed.hitQuota);
          mixed.suspended = false;
          mixed.unconfirmed = 0;
          mixed.ready.clear();
          hitDiagnostics.received = 0;
          hitDiagnostics.accepted = 0;
          hitDiagnostics.rejected = {};
          hitDiagnostics.recent = [];
          mixed.attempts = 0;
          mixed.hits = 0;
          mixed.damage = 0;
          mixed.examples = [];
        }
        ST.targetOcc = Number(prop(t, "occ"));
        metrics?.open({ key: targetKey, bossId: identity(t), bossName: String(prop(t, "name") ?? ""), actor: actorId, occ: ST.targetOcc, scene: scene() });
        try {
          t.on?.(1012, ST.owner, onHit);
        } catch (e) {
          ST.lastError = "listen: " + String(e);
        }
      }
      __esmLocal247 = listen;
      function selectBasic(native, selector, all, mode, occ, d) {
        const basicWait = tqFive?.active() ? tqFive.wait() : mixed.basicPaceMs, now = Date.now(), trial = (tqFive?.active() || mixed.enabled) && basicWait !== null;
        const rotation = basicRotation(), order = rotation.slice(mixed.rotationCursor).concat(rotation.slice(0, mixed.rotationCursor));
        const basicFallback = __captureESMFunction15(__esmLocal258 = ((a, b) => {
          if (basicSolo4100Active()) {
            const ai = basicSolo4100Prior.indexOf(Number(a[0])), bi = basicSolo4100Prior.indexOf(Number(b[0]));
            if (ai !== bi && ai >= 0 && bi >= 0) return ai - bi;
          }
          return rotation.length ? order.indexOf(Number(a[0])) - order.indexOf(Number(b[0])) : Number(a[0]) - Number(b[0]);
        }), "basicFallback");
        const basicRowEligible = __captureESMFunction15(__esmLocal259 = ((row) => isBasic(row?.[0]) && (!mixed.primary || (rotation.length ? rotation.includes(Number(row[0])) : Number(row[0]) === primaryBasicId())) && allowed(Number(row[0]), occ, d) && Number.isFinite(Number(row[1])) && (!basicSolo4100Active() || Number(row[1]) < now)), "");
        const rows = all.filter(basicRowEligible).map(__captureESMFunction15(__esmLocal260 = ((row) => {
          if (!trial) return row;
          const id2 = Number(row[0]), copy = row.slice();
          if (!mixed.ready.has(id2)) mixed.ready.set(id2, Number(row[1]) < now ? 0 : now + Math.min(basicWait, Math.max(0, Number(row[1]) - now)));
          copy[1] = mixed.ready.get(id2);
          copy[2] = basicWait;
          return copy;
        }), "")).filter(__captureESMFunction15(__esmLocal261 = ((row) => Number(row[1]) < now), "")).sort(__captureESMFunction15(__esmLocal2622 = ((a, b) => {
          if (thGap.picking) {
            const best = strongestThGapBasic();
            if (best !== null) {
              const ap = Number(a[0]) === best, bp = Number(b[0]) === best;
              if (ap !== bp) return ap ? -1 : 1;
            }
          }
          return basicSolo4100Active() ? basicFallback(a, b) : rotation.length ? order.indexOf(Number(a[0])) - order.indexOf(Number(b[0])) : Number(stats(occ, Number(b[0])).hits > 0) - Number(stats(occ, Number(a[0])).hits > 0);
        }), ""));
        if (cosmicActive() && !thGap.picking) cosmicRank(rows, "basic", basicFallback);
        const nativeBasicReady = new Set(all.filter(__captureESMFunction15(__esmLocal263 = ((row) => isBasic(row?.[0]) && Number.isFinite(Number(row?.[1])) && Number(row[1]) < now), "")).map(__captureESMFunction15(__esmLocal264 = ((row) => Number(row[0])), "")));
        const id = Number(native.call(selector, rows, [], mode));
        ST.tqSelectedBasic = isBasic(id) && nativeBasicReady.has(id) ? { id, at: Date.now(), targetId: identity(role().c?.target), scene: scene() } : null;
        if (trial && isBasic(id)) {
          const picked = rows.find(__captureESMFunction15(__esmLocal265 = ((row) => Number(row[0]) === id), ""));
          if (picked) mixed.ready.set(id, Math.max(now + basicWait, Number(picked[1]) || 0));
        }
        return id;
      }
      __esmLocal257 = selectBasic;
      function bind(r) {
        getKVPV_BASIC10()?.release?.();
        if (ST.s?.obj === r.s && ST.c?.obj === r.c && r.s?._f7t === ST.s.fn && r.c?.combat === ST.c.fn) return true;
        if (ST.s?.obj === r.s && ST.c?.obj === r.c) {
          if (r.s?._f7t === ST.s.fn && r.c?.combat?.__KVPV_GUARD_PARENT === ST.c.fn) return true;
          ST.lastError = "Unexpected external skill/combat hook; refresh before resuming";
          return false;
        }
        unbind();
        attachDispatch(r.a);
        const s = hook(r.s, "_f7t", __captureESMFunction15(__esmLocal267 = ((native) => __captureESMFunction15(__esmLocal268 = (function(active, common, mode) {
          if (tqFive?.active() && ST.running && this === r.s && !transforming()) {
            const all = [...Array.isArray(active) ? active : [], ...Array.isArray(common) ? common : []], occ2 = Number(prop(r.c.target, "occ")), d = radius(r.a, r.c.target);
            const pickBasic = __captureESMFunction15(__esmLocal269 = (() => selectBasic(native, this, all, mode, occ2, d)), "pickBasic");
            const cooldownReady = thGap.picking ? thGapNativeReady(r.c) : nativeReady(r.c);
            const readyBasic = all.some(__captureESMFunction15(__esmLocal270 = ((row) => isBasic(row?.[0]) && Number.isFinite(Number(row?.[1])) && Number(row[1]) < Date.now()), ""));
            if (mode !== 1 || !eligible(r.c?.target) || !castReady() || !cooldownReady && (!readyBasic || animationPlaying(r.c)) || Date.now() - ST.lastInvocation < currentPace()) return -1;
            if (!cooldownReady) return pickBasic();
            if (basicSolo4100Active() || !tqFive.allowsTuyetHoc() || thGap.picking) return pickBasic();
            const roster2 = skillNames().map(__captureESMFunction15(__esmLocal271 = ((x) => x.id), "")).filter(tqSelectableNative), offset2 = roster2.length ? ST.skillCursor % roster2.length : 0, order2 = roster2.slice(offset2).concat(roster2.slice(0, offset2));
            const pickTH = __captureESMFunction15(__esmLocal2722 = (() => {
              ST.tqSelectedNative = null;
              const rows = cosmicRank(all.filter(__captureESMFunction15(__esmLocal2732 = ((row) => tqSelectableNative(Number(row?.[0])) && Number.isFinite(Number(row[1])) && Number(row[1]) < Date.now() && allowed(Number(row[0]), occ2, d)), "")), "th", __captureESMFunction15(__esmLocal274 = ((a, b) => order2.indexOf(Number(a[0])) - order2.indexOf(Number(b[0]))), ""));
              const id2 = Number(native.call(this, rows, [], mode));
              if (rows.some(__captureESMFunction15(__esmLocal275 = ((row) => Number(row?.[0]) === id2), "")))
                ST.tqSelectedNative = { id: id2, at: Date.now(), targetId: identity(r.c?.target), scene: scene() };
              return id2;
            }), "pickTH");
            if (pilot4100THOnly()) return pickTH();
            const first = mixed.wantBasic ? pickBasic : pickTH, second = mixed.wantBasic ? pickTH : pickBasic, id = first();
            return isBasic(id) || tqSelectableNative(id) ? id : second();
          }
          if (CFG.basicOnly && ST.running && this === r.s && (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() !== false) {
            if (getKVPV_FAR_SCOPE()?.status?.()?.kind === "TRU_TIEN" && !eligible(r.c?.target)) return native.call(this, active, common, mode);
            if (!eligible(r.c?.target) || !(towerFinish() ? canFight() : castReady()) || !nativeReady(r.c)) return -1;
            const rows = [...Array.isArray(active) ? active : [], ...Array.isArray(common) ? common : []].filter(__captureESMFunction15(__esmLocal276 = ((row) => Number(row?.[0]) === (basicRotation()[0] ?? mixed.rotation[0] ?? 8001)), ""));
            return selectBasic(native, this, rows, mode, Number(prop(r.c.target, "occ")), radius(r.a, r.c.target));
          }
          if (ST.running && this === r.s && !transforming() && !burst.dispatch && (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() !== false && Date.now() - ST.lastTHAt < CFG.afterTHWaitMs) return -1;
          if (ST.running && this === r.s && towerFinish() && canFight() && !transforming()) {
            const filter2 = __captureESMFunction15(__esmLocal277 = ((rows) => Array.isArray(rows) ? rows.filter(__captureESMFunction15(__esmLocal278 = ((row) => isBasic(row?.[0]) ? selectedBasic(row[0]) : mixed.hitQuota === null || Number(row[0]) < 1001 || Number(row[0]) > 1008 || mixed.confirmedSinceTH >= mixed.hitQuota), "")) : rows), "filter");
            return native.call(this, filter2(active), filter2(common), mode);
          }
          if (ST.running && this === r.s && mode === 2 && transforming() && (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() !== false) {
            if (!eligible(r.c?.target) || !castReady() || !nativeReady(r.c) || (pacer || scopedCombat() || tqFive?.active()) && Date.now() - ST.lastInvocation < currentPace()) return -1;
            const occ2 = Number(prop(r.c.target, "occ")), dist2 = radius(r.a, r.c.target);
            const filter2 = __captureESMFunction15(__esmLocal279 = ((rows) => (Array.isArray(rows) ? rows : []).filter(__captureESMFunction15(__esmLocal280 = ((row) => allowed(Number(row?.[0]), occ2, dist2)), ""))), "filter");
            return call_KVPV_TRANSFORM10_select(native, this, filter2(active), filter2(common), mode);
          }
          if (!ST.running || this !== r.s || mode !== 1 || (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() === false) return native.apply(this, arguments);
          if (!eligible(r.c?.target) || !Array.isArray(active)) return -1;
          if (mixed.enabled && !mixed.suspended && mixed.wantBasic && skillPriority === "interleaved") {
            if (!castReady() || !nativeReady(r.c)) return -1;
            const occ2 = Number(prop(r.c.target, "occ")), d = radius(r.a, r.c.target);
            const picked2 = selectBasic(native, this, [...active, ...Array.isArray(common) ? common : []], mode, occ2, d);
            if (isBasic(picked2)) return picked2;
          }
          const dist = radius(r.a, r.c.target), occ = Number(prop(r.c.target, "occ"));
          if (!castReady() || !burst.dispatch && !nativeReady(r.c) || !outside(dist) || (pacer || scopedCombat() || tqFive?.active()) && !burst.dispatch && Date.now() - ST.lastInvocation < currentPace()) {
            ST.skillWaits++;
            return -1;
          }
          const filter = __captureESMFunction15(__esmLocal281 = ((rows) => Array.isArray(rows) ? rows.filter(__captureESMFunction15(__esmLocal2822 = ((x) => !isBasic(x?.[0]) && (!tianQuanThMode() || isTuyetHocSkill(Number(x?.[0])) && !(ST.mode === "STRICT" && thCalibration.autoLocked && (thCalibration.skillId === null || Number(x?.[0]) !== thCalibration.skillId))) && allowed(Number(x?.[0]), occ, dist) && (!burst.dispatch || Number(x[0]) === burst.desired && Number.isFinite(Number(x[1])) && Number(x[1]) < Date.now())), "")) : []), "filter");
          const roster = skillNames().map(__captureESMFunction15(__esmLocal283 = ((x) => x.id), "")).filter(__captureESMFunction15(__esmLocal284 = ((id) => !tianQuanThMode() || isTuyetHocSkill(Number(id))), "")), offset = roster.length ? ST.skillCursor % roster.length : 0;
          const order = roster.slice(offset).concat(roster.slice(0, offset));
          const tower = ["LINH_LUNG", "PHU_VAN", "TRU_TIEN"].includes(getKVPV_FAR_SCOPE()?.status?.().kind), fairTurn = ST.castAttempts % 4 === 0;
          const score = __captureESMFunction15(__esmLocal285 = ((id) => {
            const m = stats(occ, Number(id));
            return m.hits >= 2 ? m.damage / m.hits : 0;
          }), "score");
          const ranked = __captureESMFunction15(__esmLocal286 = ((rows) => filter(rows).sort(__captureESMFunction15(__esmLocal287 = ((a, b) => {
            if ((skillPriority === "tuyet_hoc_first" || tower && !mixed.enabled) && !fairTurn) {
              const delta = score(b[0]) - score(a[0]);
              if (delta) return delta;
            }
            return order.indexOf(Number(a[0])) - order.indexOf(Number(b[0]));
          }), ""))), "ranked");
          const picked = Number(native.call(this, ranked(active), ranked(common), mode));
          if (allowed(picked, occ, dist)) {
            ST.seen.add(picked);
            return picked;
          }
          if (mixed.enabled && !mixed.suspended && nativeReady(r.c)) {
            const basic = selectBasic(native, this, [...active, ...Array.isArray(common) ? common : []], mode, occ, dist);
            if (isBasic(basic)) return basic;
          }
          ST.skillWaits++;
          return -1;
        }), "")), ""));
        if (!s) {
          ST.lastError = "Selector hook unavailable";
          return false;
        }
        const c = hook(r.c, "combat", __captureESMFunction15(__esmLocal288 = ((native) => __captureESMFunction15(__esmLocal289 = (function(skillId) {
          if (ST.running && this === r.c && basicSolo4100Active() && Number(skillId) >= 1001 && Number(skillId) <= 1008) {
            basicSolo4100.blockedTH++;
            ST.blocked++;
            return void 0;
          }
          if (CFG.basicOnly && !tqFive?.active() && ST.running && this === r.c && (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() !== false && Number(skillId) !== (basicRotation()[0] ?? 8001)) {
            ST.blocked++;
            return void 0;
          }
          if (ST.running && this === r.c && !transforming() && !burst.dispatch && (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() !== false && Date.now() - ST.lastTHAt < CFG.afterTHWaitMs) {
            ST.blocked++;
            return;
          }
          if (ST.running && this === r.c && (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() !== false && isBasic(skillId) && !selectedBasic(skillId)) {
            ST.blocked++;
            return void 0;
          }
          if (ST.running && this === r.c && towerFinish() && canFight() && !transforming()) {
            const id = Number(skillId);
            if (mixed.hitQuota !== null) {
              if (id >= 1001 && id <= 1008 && !isTransformSkill(id) && mixed.confirmedSinceTH < mixed.hitQuota) {
                ST.blocked++;
                return;
              }
              if (id === 8001) {
                expire();
                if (ST.casts.some(__captureESMFunction15(__esmLocal290 = ((c2) => !c2.used && basicPendingBlocks(c2) && c2.id === id && c2.targetId === identity(this.target) && Date.now() - c2.time <= CFG.castTtlMs), ""))) {
                  ST.blocked++;
                  return;
                }
                ST.castAttempts++;
                mixed.attempts++;
                ST.casts.push({ serial: ST.castAttempts, id, occ: Number(prop(this.target, "occ")), targetId: identity(this.target), scene: scene(), time: Date.now(), distance: radius(r.a, this.target), used: false, basicCast: true, mixedBasic: true, finishBasic: true });
              }
            }
            return invokeNative(native, this, arguments);
          }
          if (ST.running && this === r.c && (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() !== false) {
            const id = Number(skillId), occ = Number(prop(this.target, "occ")), d = radius(r.a, this.target);
            const gapBasic = thGap.picking && isBasic(id) && id <= 8005 && thGapActive(this) && thGapNativeReady(this);
            const basicCooldownReady = tqBasicDispatchReady(id, this);
            if (!eligible(this.target) || !castReady() || !burst.dispatch && !gapBasic && !basicCooldownReady && !nativeReady(this) || !allowed(id, occ, d) || !outside(d) || (pacer || scopedCombat() || tqFive?.active()) && !burst.dispatch && Date.now() - ST.lastInvocation < currentPace()) {
              ST.blocked++;
              return void 0;
            }
            if (animationPlaying(this) && basicTailReady()) ST.basicTailReleases++;
            ST.lastInvocation = Date.now();
            const roster = skillNames().map(__captureESMFunction15(__esmLocal291 = ((x) => x.id), ""));
            if (!isBasic(id)) ST.skillCursor = Math.max(0, roster.indexOf(id) + 1);
            if (mixed.enabled) {
              const order = basicRotation();
              if (order.includes(id)) mixed.rotationCursor = (order.indexOf(id) + 1) % order.length;
              mixed.primaryStreak = isBasic(id) ? mixed.primaryStreak + 1 : 0;
              mixed.wantBasic = (mixed.primary ? mixed.hitQuota !== null ? mixed.confirmedSinceTH < mixed.hitQuota : mixed.primaryStreak < basicQuota() : !isBasic(id)) && !mixed.suspended;
              if (isBasic(id)) mixed.attempts++;
            }
            expire();
            stats(occ, id).attempts++;
            const overlap = tqIdleFill.enabled && ST.tqSelectedNative?.id === id && ST.tqSelectedNative.targetId === identity(this.target) && !isBasic(id) && tqFive?.active() && tqDistanceOnly() && ST.casts.filter(__captureESMFunction15(__esmLocal292 = ((c2) => !c2.used && c2.id === id && c2.targetId === identity(this.target) && c2.scene === scene() && Date.now() - c2.time <= CFG.castTtlMs), "")) || [];
            if (overlap.length) {
              for (const previous of overlap) previous.ambiguousTH = true;
              tqIdleFill.repeatCalls++;
            }
            ST.castAttempts++;
            ST.casts.push({ serial: ST.castAttempts, id, occ, targetId: identity(this.target), scene: scene(), time: Date.now(), distance: d, used: false, ambiguousTH: overlap.length > 0, basicCast: mixed.enabled && isBasic(id), mixedBasic: mixed.enabled && isBasic(id), burstSerial: burst.active?.serial ?? null, tuningEligible: !isBasic(id) && !burst.dispatch && !transforming() && verified(occ, id) });
            ST.tqSelectedNative = null;
            ST.tqSelectedBasic = null;
            if (tqFive?.active() && isBasic(id)) {
              ST.casts.at(-1).basicCast = true;
              ST.casts.at(-1).mixedBasic = true;
              mixed.rotationCursor = (tqFive.ids().indexOf(id) + 1) % tqFive.ids().length;
            }
            metrics?.cast(ST.castAttempts, id, currentPace());
            if (ST.casts.length > 250) ST.casts.splice(0, ST.casts.length - 250);
          }
          return invokeNative(native, this, arguments);
        }), "")), ""));
        if (!c) {
          restore(s);
          ST.lastError = "Combat hook unavailable";
          return false;
        }
        ST.s = s;
        ST.c = c;
        if (!guardMovement(r)) {
          unbind();
          ST.lastError = "Movement ownership unavailable";
          return false;
        }
        return true;
      }
      __esmLocal266 = bind;
      function tick() {
        if (!ST.running) return;
        getKVPV_TQ_BASIC_FORCE()?.sync?.();
        localLogCleanupSync();
        ensureTianQuanRotation();
        ST.lastTickAt = Date.now();
        ST.lastBackgroundTick = Date.now();
        try {
          if (!canFight() || !atPosition(role())) {
            for (const c of ST.casts) if (!c.used) {
              c.tuningEligible = false;
              c.metricsInterrupted = true;
            }
          }
          expire();
          updateTuyetHocCalibration();
          if (String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") !== actorId || W.__KVPV_UNIVERSAL_HALTED) {
            stop("actor changed");
            return;
          }
          if ((getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() === false) {
            releaseOutsideScope();
            ST.lastReason = "outside_tianquan_native_combat";
            return;
          }
          const r = role();
          if (!r.a || !r.s || !r.c || !r.m) {
            ST.lastReason = "missing_components";
            return;
          }
          const owner = combatOwner(), previousPhase = ST.lastOwnerPhase;
          ST.lastOwnerPhase = owner?.phase ?? "OFF";
          if (!bind(r)) {
            ST.lastReason = "hook_failed";
            return;
          }
          if (!eligible(r.c.target)) {
            unlisten();
            ST.lastReason = getKVPV_FAR_SCOPE()?.status?.()?.kind === "TRU_TIEN" ? "trutien_waiting_native_monster_target" : "not_tianquan_boss";
            return;
          }
          pacer?.context(identity(r.c.target) + "/" + String(prop(r.c.target, "occ")) + "/" + scene() + "/" + (transforming() ? "transform" : "native"));
          const newPositionTarget = ST.target !== r.c.target || ST.targetKey !== identity(r.c.target) + "/" + String(prop(r.c.target, "occ")) + "/" + scene();
          listen(r.c.target);
          observeApexRhythm(ST.targetKey, prop(r.a, "hp")?.[0]);
          observePilot4100();
          if (newPositionTarget && getKVPV_FAR_SCOPE()?.status?.()?.kind !== "TRU_TIEN" && (owner?.running && owner.phase === "FIGHT" && canFight() || !owner?.running && getKVPV_FAR_SCOPE()?.status?.()?.kind === "THIEN_QUAN" && W._Ba?._rJ?._O$?.ins?.isDead !== true)) {
            ST.ownMove = true;
            try {
              r.m.stop?.();
            } finally {
              ST.ownMove = false;
            }
          }
          if (towerFinish() && canFight()) {
            ST.positioning = false;
            ST.moveGoal = null;
            const kind = getKVPV_FAR_SCOPE()?.status?.()?.kind, targetKey = kind + "/" + scene() + "/" + identity(r.c.target), a2 = loc(r.a), b2 = loc(r.c.target), d2 = radius(r.a, r.c.target);
            const nativeRange = Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(r.c.target, "occ")))?.[3]);
            if (ST.finishTarget !== targetKey) {
              ST.finishTarget = targetKey;
              ST.finishCursor = 0;
              ST.finishLastMove = -Infinity;
              ST.finishMoveAttempts = 0;
            }
            if (!a2 || !b2 || !Number.isFinite(d2) || !(Number.isFinite(nativeRange) && nativeRange > 0)) {
              ST.lastReason = "dungeon_finish_waiting_position_or_native_range";
              return;
            }
            ST.lastDistance = +d2.toFixed(2);
            const validRange = typeof r.c.isValidRange === "function" ? r.c.isValidRange() === true : true;
            const goal2 = nativeRange * 0.8;
            if (d2 > goal2 + CFG.tolerance || !validRange) {
              const now = Date.now(), moving = r.m.running?.() === true;
              if (moving || now - ST.finishLastMove < 600 || ST.finishMoveAttempts >= 6) {
                ST.lastReason = moving ? "dungeon_finish_approaching" : ST.finishMoveAttempts >= 6 ? "dungeon_finish_approach_paused" : "dungeon_finish_move_wait";
                return;
              }
              const nextGoal = !validRange && d2 <= goal2 + CFG.tolerance ? Math.max(1, d2 - 20) : goal2;
              if (typeof r.m.moveTo !== "function") {
                ST.lastReason = "dungeon_finish_no_mover";
                return;
              }
              ST.ownMove = true;
              try {
                r.m.stop?.();
                r.m.moveTo(
                  b2.x + (a2.x - b2.x) / Math.max(d2, 1) * nextGoal,
                  b2.y + (a2.y - b2.y) / Math.max(d2, 1) * nextGoal
                );
                ST.moves++;
                ST.finishMoveAttempts++;
                ST.finishLastMove = now;
              } finally {
                ST.ownMove = false;
              }
              ST.lastReason = "dungeon_finish_approaching";
              return;
            }
            dungeonFinishBasic(r);
            return;
          }
          ST.finishTarget = null;
          ST.finishCursor = 0;
          ST.finishMoveAttempts = 0;
          ST.finishLastMove = -Infinity;
          if (getKVPV_FAR_SCOPE()?.status?.()?.kind === "TRU_TIEN") {
            ST.positioning = false;
            ST.moveGoal = null;
            ST.lastDistance = radius(r.a, r.c.target);
            if (!canFight()) {
              ST.lastReason = "trutien_hitrun_wait";
              return;
            }
            if (atPosition(r)) {
              ST.lastReason = "trutien_native_range";
              fastCast(r);
            } else {
              const a2 = loc(r.a), b2 = loc(r.c.target), d2 = radius(r.a, r.c.target);
              const nativeRange = Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(r.c.target, "occ")))?.[3]);
              const goal2 = Number.isFinite(nativeRange) && nativeRange > 0 ? Math.min(80, nativeRange * 0.7) : 40;
              const now = Date.now();
              if (a2 && b2 && Number.isFinite(d2) && d2 > goal2 + 5 && now - ST.lastMove >= 1e3 && r.m.running?.() !== true && now >= Number(W.__KVPV_USER_UI_UNTIL || 0) && !W._Ba?._K_t?._Z7t?.ins?.gathering && typeof r.m.moveTo === "function") {
                ST.ownMove = true;
                try {
                  r.m.moveTo(
                    b2.x + (a2.x - b2.x) / Math.max(d2, 1) * goal2,
                    b2.y + (a2.y - b2.y) / Math.max(d2, 1) * goal2
                  );
                  ST.lastMove = now;
                  ST.moves++;
                  ST.lastReason = "trutien_chase_commanded";
                } finally {
                  ST.ownMove = false;
                }
              } else ST.lastReason = "trutien_native_approach";
            }
            return;
          }
          const goal = targetDistance();
          if (goal === null) {
            ST.lastReason = "waiting_verified_skill";
            return;
          }
          if (goal <= CFG.min) {
            ST.lastReason = "goal_inside_boss_range";
            return;
          }
          const hr = owner;
          if (!hr?.running || hr.phase !== "FIGHT") {
            ST.basicImpactSerial = null;
            ST.positioning = false;
            ST.lastReason = "hitrun_" + (hr?.phase || "off");
            return;
          }
          if (!canFight()) {
            ST.positioning = false;
            ST.lastReason = "low_hp_or_disabled";
            return;
          }
          if (previousPhase && previousPhase !== "FIGHT") {
            ST.ownMove = true;
            try {
              r.m.stop?.();
            } finally {
              ST.ownMove = false;
            }
            ST.positionSample = null;
            ST.positionRetries = 0;
            ST.positionOffset = 0;
            ST.positionCommands = 0;
            ST.positionPause = null;
            ST.positionRecovery = 0;
            ST.arrivalSample = null;
            ST.arrivalSnap = false;
            ST.moveGoal = null;
            ST.lastMove = -Infinity;
            ST.positioning = true;
            if (previousPhase === "RETREAT") ST.resumes++;
            if (previousPhase === "RETREAT") metrics?.resume();
            note("RESUME", { from: previousPhase, bossId: identity(r.c.target), goal });
          }
          if (W.document?.hidden && getKVPV_ACCOUNT_POLICY()?.config?.pauseWhenHidden === true) {
            ST.lastReason = "hidden_tab";
            return;
          }
          const a = loc(r.a), b = loc(r.c.target), d = radius(r.a, r.c.target);
          ST.lastDistance = d == null ? null : +d.toFixed(2);
          if (!a || !b || d == null) {
            ST.lastReason = "unknown_position";
            return;
          }
          const snapCandidate = ST.mode === "SCAN" && (ST.moveGoal || ST.arrivalSnap) && outside(d) && Math.abs(d - goal) <= CFG.tolerance + 1;
          if (!snapCandidate) {
            ST.arrivalSample = null;
            ST.arrivalSnap = false;
          } else {
            const sample = ST.arrivalSample;
            if (!sample || Math.hypot(a.x - sample.ax, a.y - sample.ay) > 0.25 || Math.hypot(b.x - sample.bx, b.y - sample.by) > 0.25) {
              ST.arrivalSample = { ax: a.x, ay: a.y, bx: b.x, by: b.y, at: Date.now() };
              ST.arrivalSnap = false;
            } else if (!ST.arrivalSnap && Date.now() - sample.at >= 1e3) {
              ST.arrivalSnap = true;
              note("NATIVE-ARRIVAL-SNAP", { distance: d, goal, extraTolerance: 1 });
            }
          }
          if (atPosition(r)) {
            if (ST.positioning && ST.moveGoal) {
              ST.ownMove = true;
              try {
                r.m.stop?.();
              } finally {
                ST.ownMove = false;
              }
            }
            ST.positioning = false;
            ST.moveGoal = null;
            ST.positionSample = null;
            ST.positionRetries = 0;
            ST.positionOffset = 0;
            ST.positionCommands = 0;
            ST.positionPause = null;
            ST.positionRecovery = 0;
            ST.lastReason = "holding_far";
            fastCast(r);
            return;
          }
          ST.positioning = true;
          if (ST.positionPause) {
            if (Math.hypot(b.x - ST.positionPause.x, b.y - ST.positionPause.y) < 20 && Date.now() - ST.positionPause.at < 8e3) {
              ST.lastReason = ST.positionPause.reason;
              return;
            }
            ST.positionPause = null;
            ST.positionCommands = 0;
            ST.positionRetries = 0;
            ST.positionOffset = 0;
            ST.positionSample = null;
            ST.moveGoal = null;
            ST.lastMove = -Infinity;
            ST.positionRecovery++;
            note("POSITION-RECOVERY", { cycle: ST.positionRecovery, distance: d });
          }
          if (ST.positionCommands >= 24) {
            ST.ownMove = true;
            try {
              r.m.stop?.();
            } finally {
              ST.ownMove = false;
            }
            ST.positionPause = { x: b.x, y: b.y, at: Date.now(), reason: "position_oscillation_bounded" };
            ST.lastReason = "position_oscillation_bounded";
            note("POSITION-OSCILLATION-PAUSED", { distance: d, goal, commands: ST.positionCommands });
            return;
          }
          const progress = ST.positionSample;
          if (!progress || Math.hypot(a.x - progress.ax, a.y - progress.ay) > 0.75 || Math.hypot(b.x - progress.bx, b.y - progress.by) > 0.75)
            ST.positionSample = { ax: a.x, ay: a.y, bx: b.x, by: b.y, at: Date.now() };
          else if (ST.moveGoal && Date.now() - progress.at >= 1800 && ST.positionRetries < 6) {
            ST.positionRetries++;
            ST.positionOffset = d < goal ? Math.min(32, ST.positionRetries * 8) : d > goal + CFG.tolerance ? -Math.min(24, ST.positionRetries * 8) : 0;
            ST.ownMove = true;
            try {
              r.m.stop?.();
            } finally {
              ST.ownMove = false;
            }
            ST.lastMove = -Infinity;
            ST.moveGoal = null;
            ST.positionSample.at = Date.now();
            note("POSITION-RETRY", { distance: d, goal, attempt: ST.positionRetries, waypointExtra: ST.positionOffset });
          }
          if (ST.positionRetries >= 6 && ST.positionSample && Date.now() - ST.positionSample.at >= 1800) {
            if (ST.lastReason !== "position_stalled_bounded") {
              ST.ownMove = true;
              try {
                r.m.stop?.();
              } finally {
                ST.ownMove = false;
              }
              note("POSITION-PAUSED", { distance: d, goal, attempts: ST.positionRetries });
            }
            ST.positionPause = { x: b.x, y: b.y, at: Date.now(), reason: "position_stalled_bounded" };
            ST.lastReason = "position_stalled_bounded";
            return;
          }
          const ux = d >= 1 ? (a.x - b.x) / d : 1, uy = d >= 1 ? (a.y - b.y) / d : 0;
          const recoveryAngle = ST.positionRecovery ? (ST.positionRecovery % 2 ? 1 : -1) * Math.min(90, Math.ceil(ST.positionRecovery / 2) * 30) * Math.PI / 180 : 0;
          const angle = recoveryAngle + (ST.positionRetries >= 3 ? (ST.positionRetries % 2 ? 1 : -1) * Math.min(30, (ST.positionRetries - 2) * 15) * Math.PI / 180 : 0);
          const waypointRadius = goal + ST.positionOffset;
          const x = b.x + (ux * Math.cos(angle) - uy * Math.sin(angle)) * waypointRadius, y = b.y + (ux * Math.sin(angle) + uy * Math.cos(angle)) * waypointRadius;
          if (typeof r.m.running === "function" && r.m.running() && ST.moveGoal && Date.now() - ST.lastMove < 4500 && Math.hypot(ST.moveGoal.x - x, ST.moveGoal.y - y) < 15) {
            ST.lastReason = "positioning_in_progress";
            return;
          }
          if (Date.now() - ST.lastMove < CFG.moveWaitMs) {
            ST.lastReason = "move_wait";
            return;
          }
          if (typeof r.m.moveTo !== "function") {
            ST.lastReason = "no_mover";
            return;
          }
          ST.ownMove = true;
          try {
            r.m.moveTo(x, y);
          } finally {
            ST.ownMove = false;
          }
          ST.moveGoal = { x, y };
          ST.positionCommands++;
          ST.moves++;
          ST.lastMove = Date.now();
          ST.lastReason = "positioning_far";
        } catch (e) {
          ST.lastError = String(e?.message || e);
          ST.lastReason = "error";
        } finally {
          metrics?.state(ST.lastReason, ST.lastOwnerPhase, currentPace(), pacer?.status()?.lastAction);
        }
      }
      __esmLocal293 = tick;
      function skillNames() {
        if (getKVPV_TRANSFORM10()?.transformed?.()) return call_KVPV_TRANSFORM10_skills();
        const r = role();
        const rows = [r.s?._rtt, r.s?._wet].flatMap(__captureESMFunction15(__esmLocal295 = ((x) => Array.isArray(x) ? x : []), "")), ids = [...new Set(rows.map(__captureESMFunction15(__esmLocal296 = ((x) => Number(x?.[0])), "")).filter(candidate))];
        return ids.map(__captureESMFunction15(__esmLocal297 = ((id) => {
          let name = "";
          try {
            const arr = W._Ba?._rJ?._O$?.ins?.skills || [];
            const level = Number(arr.find(__captureESMFunction15(__esmLocal298 = ((x) => Number(x?.[0]) === id), ""))?.[1]) || 1;
            name = String(W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id, level)?.[2] || "");
          } catch (_) {
            getKVPV_V1()?.diagnostics?.record(_);
          }
          return { id, name };
        }), ""));
      }
      __esmLocal294 = skillNames;
      function status(show = false) {
        if (statusReentrant) return { version: "1.0.0", running: ST.running, operation: ST.mode, statusReentrant: true, modeStatus: null };
        statusReentrant = true;
        try {
          return statusImpl(show);
        } finally {
          statusReentrant = false;
        }
      }
      __esmLocal299 = status;
      function statusImpl(show = false) {
        const occ = stageOcc(), ready = skillNames(), proved = ready.filter(__captureESMFunction15(__esmLocal301 = ((x) => verified(occ, x.id)), "")).map(__captureESMFunction15(__esmLocal302 = ((x) => ({ ...x, confirmations: ST.proofs.get(key(occ, x.id))?.size || 0 })), ""));
        const tqIds = tqFive?.active() ? [...basicRotation(), ...!basicSolo4100Active() && tqFive.allowsTuyetHoc() ? ready.filter(__captureESMFunction15(__esmLocal303 = ((x) => tqSelectableNative(x.id)), "")).map(__captureESMFunction15(__esmLocal304 = ((x) => x.id), "")) : []] : null;
        const ret = {
          basicAnimationSpeed: CFG.basicAnimationSpeed,
          tqTuyetHocVisualSpeed: CFG.tqTuyetHocVisualSpeed,
          tqBasicVisualSpeed: CFG.tqBasicVisualSpeed,
          tqBasicVisualCalls,
          tqBasicVisualScaled,
          tqBasicVisualUnavailable,
          tqBasicVisualLastSkill,
          tqTuyetHocVisualCalls: thVisualCalls,
          tqTuyetHocVisualScaled: thVisualScaled,
          tqTuyetHocVisualUnavailable: thVisualUnavailable,
          tqTuyetHocVisualLastSkill: thVisualLastSkill,
          modeStatus: null,
          // Avoid calling KVPV_MODE.status(): its inspect path reads this status again.
          scaledBasicAnimations: ST.scaledBasicAnimations ?? 0,
          scaledTowerSkillAnimations: ST.scaledTowerSkillAnimations,
          scaledTowerBasicAnimations: ST.scaledTowerBasicAnimations,
          basicOnly: tqFive?.active() ? basicSolo4100Active() || !tqFive.allowsTuyetHoc() : CFG.basicOnly,
          playerSkillIds: tqFive?.active() ? tqIds : CFG.basicOnly ? [basicRotation()[0] ?? 8001] : null,
          interleavedBasic: tqFive?.active() || mixed.enabled,
          version: "1.0.0",
          running: ST.running,
          operation: ST.mode,
          goalDistance: targetDistance() ?? CFG.goal,
          requestedDistance: CFG.goal,
          requireDistanceGreaterThan: CFG.min,
          clientRangeLimit: CFG.max,
          nativeTuyetHoc: ready,
          tuyetHocCalibration: tuyetHocCalibration(occ),
          tianQuanMpackExtras: { enabled: tqMpack.enabled, ids: tqActiveExtraIds(), source: "native _vX.ins.skills (fallback player model) + native selector + MPACK active category; no passive/proc/scene bypass", learnedSource: Array.isArray((typeof _vX !== "undefined" ? _vX?.ins?.skills : null) ?? W._vX?.ins?.skills) ? "native_vX" : "player_model_fallback" },
          confirmedSkills: proved,
          confirmedOver300: proved.filter(__captureESMFunction15(__esmLocal305 = ((x) => supportedDistance(occ, x.id) > 300), "")),
          bossClientRange: bossRange(),
          minimumDistance: CFG.min,
          skills: ready.map(__captureESMFunction15(__esmLocal306 = ((x) => ({ ...x, ...stats(occ, x.id), verifiedDistance: supportedDistance(occ, x.id), verified: verified(occ, x.id) })), "")),
          afterTHWaitMs: CFG.afterTHWaitMs,
          basicHitQuota: mixed.hitQuota,
          confirmedSinceTH: mixed.confirmedSinceTH,
          thCycles: mixed.thCycles,
          primaryBasicEnabled: tqFive?.active() || mixed.primary,
          primaryBasicSkillId: primaryBasicId(),
          primaryBasicClientWaitMs: tqFive?.active() ? tqFive.wait() : mixed.basicPaceMs,
          primaryBasicNativeCooldown: !tqFive?.active() && mixed.basicPaceMs === null,
          primaryBasicBurstBeforeSkill: basicQuota(),
          basicRotation: basicRotation(),
          excludedBasicSkillIds: tqFive?.active() ? [] : [...excludedBasics],
          tianQuanFiveBasics: tqFive?.report() ?? null,
          cosmic: {
            enabled: cosmic.enabled,
            active: cosmicActive(),
            thCasts: cosmic.thCasts,
            basicCasts: cosmic.basicCasts,
            supportedScopes: ["THIEN_QUAN", "LINH_LUNG", "PHU_VAN"],
            requiresTQFiveBasics: true,
            lastNativeSkill: cosmic.lastNativeSkill,
            sinceNativeCastMs: cosmic.lastNativeAt === null ? null : Math.max(0, Date.now() - cosmic.lastNativeAt),
            waitingReason: ST.lastReason,
            animationPlaying: animationPlaying(role().c),
            rankedTH: cosmic.thRanked,
            rankedBasic: cosmic.basicRanked,
            explorationChecks: cosmic.exploration,
            strongestTH: [...cosmic.thMeasured].filter(__captureESMFunction15(__esmLocal307 = (([, x]) => x.hits >= 2), "")).sort(__captureESMFunction15(__esmLocal308 = ((a, b) => b[1].damage / b[1].hits - a[1].damage / a[1].hits), ""))[0]?.[0] ?? null,
            skillObservations: [...cosmic.thMeasured].map(__captureESMFunction15(__esmLocal309 = (([id, x]) => ({ id, hits: x.hits, meanDamage: x.hits ? x.damage / x.hits : null })), "")),
            note: "Confirmed direct hits on current Boss; explores less-observed native-ready skills periodically. No cooldown modification."
          },
          luoFeng: {
            enabled: luoFeng.enabled,
            active: luoFengActive(),
            profile: "LA_PHONG_DINH_PHONG",
            sampleWindow: luoFeng.sampleWindow,
            idleThresholdMs: luoFeng.idleThresholdMs,
            robustMinHits: luoFeng.robustMinHits,
            trimPerTail: luoFeng.trimPerTail,
            lastNativeSkill: cosmic.lastNativeSkill,
            idleMs: cosmic.lastNativeAt == null ? null : Math.max(0, Date.now() - cosmic.lastNativeAt),
            possibleIdle: luoFengActive() && cosmic.lastNativeAt !== null && Date.now() - cosmic.lastNativeAt >= luoFeng.idleThresholdMs,
            lastReason: ST.lastReason,
            rhythm: apexRhythmReport(),
            dpsPilot4100: pilot4100Status(),
            basicSolo4100: basicSolo4100Status(),
            recentTH: [...cosmic.thMeasured].map(__captureESMFunction15(__esmLocal3102 = (([id, x]) => ({ id, hits: x.hits, recentHits: x.recent?.length ?? 0, recentMeanDamage: apexDamage(x), robustScore: apexRobustDamage(x) })), "")),
            recentBasics: [...thGap.measured].map(__captureESMFunction15(__esmLocal3112 = (([id, x]) => ({ id, hits: x.hits, recentHits: x.recent?.length ?? 0, recentMeanDamage: apexDamage(x), robustScore: apexRobustDamage(x) })), "")),
            note: "Apex V3: robust damage ranking and HP-loss rhythm observation only; not confirmed Boss attacks. No auto-dodge, native cooldown or movement changes."
          },
          tqIdleFill: { ...tqIdleFill, scope: "THIEN_QUAN_SCAN", nativeReadyOnly: true, strictProofProtected: true },
          thGapBasics: {
            enabled: thGap.enabled,
            windowMs: thGap.windowMs,
            active: thGapActive(),
            strongestVerifiedBasic: strongestThGapBasic(),
            attempts: thGap.attempts,
            nativeAccepted: thGap.accepted,
            blockedCooldown: thGap.blockedCooldown,
            lastBasic: thGap.lastBasic,
            measured: [...thGap.measured].map(__captureESMFunction15(__esmLocal312 = (([id, x]) => ({ id, hits: x.hits, meanDamage: x.hits ? x.damage / x.hits : null })), ""))
          },
          confirmedBasicTailCut: confirmedTailCut,
          confirmedBasicTailCuts: confirmedTailCuts,
          confirmedTailSkillIds: tqFive?.active() ? tqFive.ids() : [8001, 8005],
          skillPriority: tqFive?.active() ? basicSolo4100Active() ? "4100_native_basics_only" : tqFive.allowsTuyetHoc() ? "five_basics_plus_tuyet_hoc_10ms" : "five_basics_10ms" : CFG.basicOnly ? "basic8001" : skillPriority === "tuyet_hoc_first" ? "ready_tuyet_hoc_observed_damage_then_basic" : mixed.enabled ? mixed.primary ? basicRotation().length ? "native_basic_rotation_then_tuyet_hoc" : "three_primary_basics_then_tuyet_hoc" : "alternating_native_rotation" : ["LINH_LUNG", "PHU_VAN", "TRU_TIEN"].includes(getKVPV_FAR_SCOPE()?.status?.().kind) ? "observed_damage_with_fair_rotation" : "native_rotation",
          eligibleSkillIds: tqFive?.active() ? tqIds : ST.mode === "SCAN" ? ready.map(__captureESMFunction15(__esmLocal313 = ((x) => x.id), "")) : proved.map(__captureESMFunction15(__esmLocal314 = ((x) => x.id), "")),
          lastDistance: ST.lastDistance,
          currentDistance: radius(role().a, role().c?.target),
          lastHitDistance: ST.lastHitDistance,
          combatRunning: ST.running && combatOwner()?.running === true,
          combatPhase: ST.running ? combatOwner()?.phase : "OFF",
          recoveryEnabled: !tqDistanceOnly(),
          distanceOnly310: tqDistanceOnly(),
          finishBossHpPct: ["LINH_LUNG", "PHU_VAN", "TRU_TIEN"].includes(getKVPV_FAR_SCOPE()?.status?.().kind) ? 2 : null,
          combatOwner: combatOwner()?.owner ?? "HITRUN",
          positionTolerance: CFG.tolerance,
          positionRetries: ST.positionRetries,
          positionWaypointExtra: ST.positionOffset,
          nativeArrivalSnap: ST.arrivalSnap,
          nativeArrivalExtraTolerance: ST.arrivalSnap ? 1 : 0,
          movementCommands: ST.moves,
          recoveryResumes: ST.resumes,
          hitrunPhase: ST.lastOwnerPhase,
          positioning: ST.positioning,
          paceMs: currentPace(),
          adaptivePacing: pacer?.status() ?? null,
          fastCasts: ST.fastCasts,
          blockedNativeSteering: ST.blockedSteering,
          castAttempts: ST.castAttempts,
          confirmedCastHitPairs: ST.confirmedPairs,
          blockedOtherSkills: ST.blocked,
          lastReason: ST.lastReason,
          lastError: ST.lastError,
          localLogCleanup: localLogCleanupStatus(),
          timerActive: ST.timer != null,
          lastTickAt: ST.lastTickAt,
          tickAgeMs: ST.lastTickAt === null ? null : Math.max(0, Date.now() - ST.lastTickAt),
          timerRepairs: ST.timerRepairs,
          warning: proved.length === 0 ? "No independently verified skill at this distance yet. STRICT will wait; use SCAN to observe combat." : "Observed matching skill damage at tested distance; this does not guarantee safety from Boss attacks."
        };
        if (show) {
          console.table(ready.map(__captureESMFunction15(__esmLocal315 = ((x) => ({ ...x, verified: verified(occ, x.id), pairs: ST.proofs.get(key(occ, x.id))?.size || 0 })), "")));
          console.log(TAG, ret);
        }
        return ret;
      }
      __esmLocal300 = statusImpl;
      function start(mode = "STRICT") {
        if (mode !== "STRICT" && mode !== "SCAN") throw Error("Use STRICT or SCAN");
        if (String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") !== actorId) throw Error("wrong actor");
        if (CFG.goal > 600) throw Error("Boss danger range exceeds the bounded far-skill trial");
        getKVPV_RANGE281()?.setTrialRange?.(CFG.max);
        ST.positionSample = null;
        ST.positionRetries = 0;
        ST.positionOffset = 0;
        ST.positionCommands = 0;
        ST.positionPause = null;
        ST.positionRecovery = 0;
        if (mode === "SCAN") {
          thCalibration.autoLocked = false;
          thCalibration.skillId = null;
          thCalibration.completedAt = null;
          thCalibration.reason = "measuring_confirmed_damage";
        }
        ST.mode = mode;
        ST.running = true;
        ST.positioning = true;
        ST.moveGoal = null;
        ST.lastMove = -Infinity;
        ST.lastOwnerPhase = null;
        ST.lastReason = "starting";
        ST.lastError = "";
        if (ST.timer == null) {
          const schedule = getKVPV_V1()?.timers?.setInterval ?? W.setInterval;
          if (typeof schedule === "function") ST.timer = schedule(tick, CFG.scanMs);
        }
        tick();
        return status(false);
      }
      __esmLocal316 = start;
      function repairPolling() {
        if (!ST.running || W.document?.hidden === true || W.__KVPV_UNIVERSAL_HALTED || String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") !== actorId) return false;
        if (ST.timer != null && ST.lastTickAt !== null && Date.now() - ST.lastTickAt < 2500) return false;
        if (ST.timer != null) (getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval)(ST.timer);
        ST.timer = typeof (getKVPV_V1()?.timers?.setInterval ?? W.setInterval) === "function" ? (getKVPV_V1()?.timers?.setInterval ?? W.setInterval)(tick, CFG.scanMs) : null;
        ST.timerRepairs++;
        tick();
        return true;
      }
      __esmLocal317 = repairPolling;
      function stop(reason = "user") {
        if (reason === "user" || String(reason).startsWith("Ng\u01B0\u1EDDi d\xF9ng d\u1EEBng")) getKVPV_TQ_BASIC_FORCE()?.stop?.("th300_manual_stop");
        else getKVPV_TQ_BASIC_FORCE()?.suspend?.("th300_paused");
        localLogCleanup.enabled = false;
        const ownPositioning = ST.positioning && ST.moveGoal, r = role();
        ST.running = false;
        ST.mode = "OFF";
        if (ST.timer != null) {
          (getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval)(ST.timer);
          ST.timer = null;
        }
        restoreSpeedClips();
        if (ST.c && ST.c.obj?.combat?.__KVPV_GUARD_PARENT === ST.c.fn) getKVPV_HITRUN1()?.stop?.("Release guarded far-skill hook");
        unbind();
        unlisten();
        if (ownPositioning) r.m?.stop?.();
        ST.moveGoal = null;
        ST.lastReason = reason;
        return status(false);
      }
      __esmLocal318 = stop;
      function report() {
        expire();
        const combat = role().c, cooldown = typeof combat?.isCooldown === "function" ? combat.isCooldown() : null;
        const animating = animationPlaying(combat);
        const tuyetHocRows = [role().s?._rtt, role().s?._wet].flatMap((rows) => Array.isArray(rows) ? rows : []).filter((row) => isTuyetHocSkill(Number(row?.[0]))).slice(0, 16).map((row) => ({ id: Number(row[0]), readyAt: Number(row[1]), ready: Number.isFinite(Number(row[1])) && Number(row[1]) < Date.now() }));
        return {
          hitDiagnostics: JSON.parse(JSON.stringify(hitDiagnostics)),
          nativeCombat: {
            dispatch: { observed: !!dispatch.actor, calls: dispatch.calls, signals: dispatch.signals, silent: dispatch.silent, recent: dispatch.recent.slice() },
            targetId: identity(combat?.target),
            trackedTargetId: identity(ST.target),
            internalTargetId: identity(combat?._wft),
            selectorOwned: role().s?._f7t === ST.s?.fn,
            combatOwned: combat?.combat === ST.c?.fn || combat?.combat?.__KVPV_GUARD_PARENT === ST.c?.fn,
            cooldown,
            animationPlaying: animating
          },
          nativeGate: { blockedBy: [...cooldown === true ? ["cooldown"] : [], ...animating ? ["animation"] : []], cooldown, animationPlaying: animating, lastReason: ST.lastReason },
          interleaved: {
            enabled: tqFive?.active() || mixed.enabled,
            basicClientWaitMs: tqFive?.active() ? tqFive.wait() : mixed.basicPaceMs,
            basicSuspended: mixed.suspended,
            basicUnconfirmed: mixed.unconfirmed,
            nativeAnimationGate: true,
            scanMs: CFG.scanMs,
            nextPreferred: mixed.wantBasic ? "basic" : "tuyet_hoc",
            basicAttempts: mixed.attempts,
            basicConfirmedHits: mixed.hits,
            confirmedHitTailRelease: true,
            basicTailReleases: ST.basicTailReleases,
            basicMatchedDamage: mixed.damage,
            examples: mixed.examples.map((x) => ({ ...x }))
          },
          burst: {
            enabled: burst.enabled,
            experimental: true,
            minBatchGapMs: Math.max(100, CFG.scanMs),
            maxSkillsPerBatch: 8,
            resultWaitScope: "per_skill",
            nativeRows: tuyetHocRows,
            lastPass: JSON.parse(JSON.stringify(burst.lastPass)),
            batches: JSON.parse(JSON.stringify(burst.history)),
            note: "Client calls in one JS turn; matched damage is required for each skill. Not guaranteed simultaneous server execution. Native per-skill readiness is preserved."
          },
          performance: metrics?.report() ?? null,
          build: getKVPV_V1()?.build ?? null,
          controllerBuild: typeof __KVPV_V1_BUILD === "undefined" ? null : __KVPV_V1_BUILD,
          ...status(false),
          history: ST.history.slice(),
          scope: getKVPV_FAR_SCOPE()?.status?.() ?? null,
          interpretation: "attempts are client combat calls; only matched damage confirms a hit. Unconfirmed does not prove a server range limit."
        };
      }
      __esmLocal319 = report;
      function setDistance(value) {
        const d = tqDistanceOnly() ? 310 : Number(value);
        if (!Number.isFinite(d) || d <= 280 || d > 600) throw Error("Distance must be in (280,600]");
        getKVPV_RANGE281()?.setTrialRange?.(d + 10);
        CFG.goal = d;
        CFG.min = d === 300 ? 295 : d > 300 ? 300 : 280;
        CFG.max = d + 10;
        ST.lastMove = -Infinity;
        ST.moveGoal = null;
        ST.positioning = true;
        if (ST.running) tick();
        return status(false);
      }
      __esmLocal325 = setDistance;
      function performance() {
        const p = metrics?.report() ?? null;
        console.table(p?.current?.skills ?? []);
        console.log(TAG, p);
        return p;
      }
      __esmLocal326 = performance;
      function bossInfo(show = true) {
        const read = __captureESMFunction15(__esmLocal328 = ((fn) => {
          try {
            return fn() ?? null;
          } catch {
            return null;
          }
        }), "read");
        const snapshot = __captureESMFunction15(__esmLocal329 = ((value) => read(__captureESMFunction15(__esmLocal330 = (() => JSON.parse(JSON.stringify(value))), ""))), "snapshot");
        const raw = __captureESMFunction15(__esmLocal331 = ((row) => Array.isArray(row) ? row.slice(0, 24).map(__captureESMFunction15(__esmLocal3322 = ((v) => v === null || ["string", "number", "boolean"].includes(typeof v) ? v : null), "")) : null), "raw");
        const r = read(__captureESMFunction15(__esmLocal333 = (() => role()), "")), boss = r?.c?.target, bossId = identity(boss), occ = Number(prop(boss, "occ"));
        const nativeBoss = read(__captureESMFunction15(__esmLocal334 = (() => W._ft?._tY?.ins?.isBoss?.(occ)), ""));
        if (!boss || boss.isValid === false || !bossId || Number(prop(boss, "type")) !== 1 || ![true, 1].includes(nativeBoss)) {
          const result2 = { at: Date.now(), available: false, reason: "no_selected_native_boss" };
          if (show) console.log("[Boss]", result2);
          return result2;
        }
        const cfg = read(__captureESMFunction15(__esmLocal335 = (() => W._ft?._tY?.ins?.getCfgById?.(occ)), ""));
        const bc = read(__captureESMFunction15(__esmLocal336 = (() => boss.getComponent?.(Combat)), "")), selector = read(__captureESMFunction15(__esmLocal337 = (() => boss.getComponent?.(Skill)), ""));
        const cast = read(__captureESMFunction15(__esmLocal338 = (() => getKVPV_TQ113()?.status?.(false)), "")), impact = read(__captureESMFunction15(__esmLocal339 = (() => getKVPV_TQ112()?.status?.(false)), ""));
        const castModel = String(cast?.bossId ?? "") === bossId ? cast : null;
        const impactModel = String(impact?.selectedBoss ?? "") === bossId ? impact : null;
        const rows = [...Array.isArray(selector?._rtt) ? selector._rtt : [], ...Array.isArray(selector?._wet) ? selector._wet : []].slice(0, 64);
        const trained = Array.isArray(castModel?.trained) ? castModel.trained : [];
        const ids = [...new Set([...rows.map(__captureESMFunction15(__esmLocal340 = ((row) => Number(row?.[0])), "")), ...trained.map(__captureESMFunction15(__esmLocal341 = ((row) => Number(row.skillId)), "")), Number(castModel?.pending?.skillId)].filter(__captureESMFunction15(__esmLocal3422 = ((id) => Number.isSafeInteger(id) && id > 0), "")))].slice(0, 32);
        const skills = ids.map(__captureESMFunction15(__esmLocal343 = ((skillId) => {
          const live = read(__captureESMFunction15(__esmLocal344 = (() => bc?._mvt?.(skillId)), "")), fallback = live ? null : read(__captureESMFunction15(__esmLocal345 = (() => W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(skillId, 1)), "")), config = live ?? fallback;
          return { skillId, name: typeof config?.[2] === "string" ? config[2] : null, configSource: live ? "boss_native_config" : fallback ? "level_1_fallback_not_confirmed_boss_level" : "unavailable", nativeRows: rows.filter(__captureESMFunction15(__esmLocal346 = ((row) => Number(row?.[0]) === skillId), "")).map(raw), configRaw: raw(config), observedCastToDamageMs: snapshot(trained.find(__captureESMFunction15(__esmLocal347 = ((row) => Number(row.skillId) === skillId), ""))?.castToImpactMs ?? []) };
        }), ""));
        const hp = snapshot(prop(boss, "hp")), hpNow = Array.isArray(hp) ? Number(hp[0]) : NaN, hpMax = Array.isArray(hp) ? Number(hp[1]) : NaN;
        const result = snapshot({ version: 1, at: Date.now(), available: true, actor: actorId, bossId, occ, name: prop(boss, "name"), scene: scene(), hp, hpPct: Number.isFinite(hpNow) && Number.isFinite(hpMax) && hpMax > 0 ? 100 * hpNow / hpMax : null, distance: radius(r.a, boss), nativeBossRange: Number.isFinite(Number(cfg?.[3])) && Number(cfg?.[3]) > 0 ? Number(cfg[3]) : null, bossConfigRaw: raw(cfg), bossAnimationPlaying: read(__captureESMFunction15(__esmLocal348 = (() => bc?._jh?.isPlaying), "")), skills, existingCastModel: castModel, existingImpactModel: impactModel, limits: "Read-only snapshot using existing observations. No new timers or combat hooks. Configured range is not a guaranteed dodge boundary; static config is not cast windup. Missing skills/signals remain unknown." });
        if (show) {
          console.table([{ name: result.name, bossId, occ, hpPct: result.hpPct, distance: result.distance, nativeBossRange: result.nativeBossRange }]);
          console.table(result.skills);
          console.log("[Boss]", result);
        }
        return result;
      }
      __esmLocal327 = bossInfo;
      function dps(show = true) {
        const p = metrics?.report() ?? null;
        if (p) {
          const boss = bossInfo(false);
          p.bossInfo = boss;
          p.skill1008 = skill1008Info(false);
          p.bossMatchesEncounter = !!boss.available && String(p.current?.bossId ?? "") === boss.bossId;
        }
        if (show) {
          if (p?.current) {
            console.table(Object.entries(p.current.groups).map(__captureESMFunction15(__esmLocal350 = (([group, values]) => ({ group, ...values })), "")));
            console.table(p.current.skills.map(__captureESMFunction15(__esmLocal351 = ((r) => ({ id: r.id, group: r.group, hits: r.hits, matchedDamage: r.matchedDamage, matchedDps: r.matchedDps, rolling10sMatchedDps: r.rolling10sMatchedDps, averageMatchedDamage: r.averageMatchedDamage, animationWaitMs: r.animationWaitMs, animationWaitAverageMs: r.animationWaitAverageMs, animationWaitMaxMs: r.animationWaitMaxMs, unconfirmed: r.unconfirmed })), "")));
          }
          console.log("[DPS matched]", p);
        }
        return p;
      }
      __esmLocal349 = dps;
      function setBurst(enabled = true) {
        burst.enabled = !!enabled;
        if (burst.enabled) {
          mixed.enabled = false;
          mixed.wantBasic = false;
        }
        burst.nextAt = 0;
        return { enabled: burst.enabled, experimental: true, maps: ["THIEN_QUAN", "LINH_LUNG", "PHU_VAN", "TRU_TIEN"] };
      }
      __esmLocal3522 = setBurst;
      function setInterleaved(enabled = true, distance = 302) {
        mixed.enabled = !!enabled;
        mixed.wantBasic = false;
        mixed.suspended = false;
        mixed.unconfirmed = 0;
        if (mixed.enabled) {
          burst.enabled = false;
          setDistance(distance);
        }
        return { enabled: mixed.enabled, distance: CFG.goal, burst: burst.enabled };
      }
      __esmLocal354 = setInterleaved;
      function setBasicPace(value = 1) {
        if (value === null) {
          mixed.basicPaceMs = null;
          mixed.ready.clear();
          return { enabled: false };
        }
        const n = Number(value);
        if (!Number.isFinite(n) || n < 0 || n > 1e3) throw Error("Basic client wait must be 0..1000 ms");
        mixed.basicPaceMs = n;
        mixed.ready.clear();
        return { enabled: true, clientWaitMs: n, nativeAnimationGate: true };
      }
      __esmLocal355 = setBasicPace;
      function setPrimaryBasic(enabled = true) {
        mixed.primary = !!enabled;
        mixed.primaryStreak = 0;
        mixed.wantBasic = mixed.primary && !mixed.suspended;
        mixed.ready.clear();
        return { enabled: mixed.primary, skillId: primaryBasicId(), clientWaitMs: mixed.basicPaceMs, nativeCombatGate: true };
      }
      __esmLocal356 = setPrimaryBasic;
      function setAfterTHWait(value = 1) {
        if (!Number.isFinite(value) || value < 0 || value > 1e3) throw Error("TH wait must be 0..1000 ms");
        CFG.afterTHWaitMs = value;
        return value;
      }
      __esmLocal357 = setAfterTHWait;
      function setBasicHitQuota(value = null) {
        if (value !== null && (!Number.isSafeInteger(value) || value < 1)) throw Error("Hit quota must be a positive integer");
        mixed.hitQuota = value;
        mixed.confirmedSinceTH = 0;
        mixed.thCycles = 0;
        mixed.wantBasic = mixed.primary;
        return value;
      }
      __esmLocal358 = setBasicHitQuota;
      function setBasicRotation(ids = []) {
        const solo8002 = Array.isArray(ids) && ids.length === 1 && Number(ids[0]) === 8002 && getKVPV_FAR_SCOPE()?.status?.()?.kind === "THIEN_QUAN";
        if (!Array.isArray(ids) || ids.some(__captureESMFunction15(__esmLocal360 = ((id) => !isBasic(id) || excludedBasics.has(Number(id)) && !tqFive?.report()?.enabled && !solo8002), ""))) throw Error("Rotation requires allowed native basic IDs");
        if (solo8002) excludedBasics.delete(8002);
        else excludedBasics.add(8002);
        mixed.rotation = [...new Set(ids.map(Number))];
        mixed.rotationCursor = 0;
        mixed.primaryStreak = 0;
        mixed.wantBasic = mixed.primary && !mixed.suspended;
        return basicRotation();
      }
      __esmLocal359 = setBasicRotation;
      function releaseOutsideScope() {
        if ((getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() !== false) return false;
        if (!ST.s && !ST.c && !ST.target && !ST.movement.length) return true;
        if (ST.c && ST.c.obj?.combat?.__KVPV_GUARD_PARENT === ST.c.fn) getKVPV_HITRUN1()?.stop?.("Leave far-map hook ownership");
        unbind();
        unlisten();
        ST.moveGoal = null;
        return true;
      }
      __esmLocal361 = releaseOutsideScope;
      function setBasicOnly(enabled = true) {
        CFG.basicOnly = !!enabled;
        CFG.scanMs = 100;
        if (enabled) {
          mixed.enabled = true;
          mixed.primary = true;
          mixed.rotation = [8001];
          mixed.rotationCursor = 0;
          mixed.wantBasic = true;
          mixed.basicPaceMs = 0;
          mixed.ready.clear();
          burst.enabled = false;
          CFG.clientPaceMs = 0;
        }
        if (ST.timer !== null) {
          (getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval)(ST.timer);
          ST.timer = typeof (getKVPV_V1()?.timers?.setInterval ?? W.setInterval) === "function" ? (getKVPV_V1()?.timers?.setInterval ?? W.setInterval)(tick, CFG.scanMs) : null;
        }
        return { enabled: CFG.basicOnly, skillId: 8001, scanMs: CFG.scanMs, addedClientWaitMs: CFG.clientPaceMs, serverMultiplierVerified: false };
      }
      __esmLocal3622 = setBasicOnly;
      function tianQuan4100Diagnosis(show = true) {
        const current = metrics?.report()?.current ?? null, pilot = pilot4100Status(), states = current?.timeMs ?? {}, elapsedMs = current?.elapsedMs ?? null;
        const rows = Object.entries(states).map(__captureESMFunction15(__esmLocal364 = (([reason, ms]) => ({
          reason,
          ms,
          pct: elapsedMs > 0 ? +(ms / elapsedMs * 100).toFixed(1) : null
        })), "")).sort(__captureESMFunction15(__esmLocal365 = ((a, b) => b.ms - a.ms), ""));
        const relevant = current?.skills ?? [], basic = relevant.filter(__captureESMFunction15(__esmLocal366 = ((r) => r.group === "basic"), "")), th = relevant.filter(__captureESMFunction15(__esmLocal367 = ((r) => r.group === "tuyetHoc"), ""));
        const groupInfo = __captureESMFunction15(__esmLocal368 = ((rows2) => ({
          casts: rows2.reduce(__captureESMFunction15(__esmLocal369 = ((n, r) => n + r.attempts), ""), 0),
          directHits: rows2.reduce(__captureESMFunction15(__esmLocal370 = ((n, r) => n + r.hits), ""), 0),
          unconfirmed: rows2.reduce(__captureESMFunction15(__esmLocal371 = ((n, r) => n + r.unconfirmed), ""), 0),
          directDamage: rows2.reduce(__captureESMFunction15(__esmLocal3722 = ((n, r) => n + r.matchedDamage), ""), 0)
        })), "groupInfo");
        const recommendations = [];
        const spent = __captureESMFunction15(__esmLocal373 = ((key2) => Number(states[key2] || 0)), "spent");
        if (spent("positioning") > 0.2 * Number(elapsedMs || 0))
          recommendations.push("Positioning is costly: inspect moving Boss/orbit/retries before changing damage rotation.");
        if (spent("waiting_native_animation") > 0.2 * Number(elapsedMs || 0))
          recommendations.push("Native animation gate dominates: inspect animationWaitMs, never assume client visual speed reduces server cooldown.");
        if (spent("native_cooldown") + spent("waiting_native_cooldown") > 0.2 * Number(elapsedMs || 0))
          recommendations.push("Native cooldown dominates: prioritize higher confirmed damage on ready skills; 1ms polling cannot shorten server cooldown.");
        if (spent("skill_readiness") + spent("waiting_ready_tuyet_hoc") > 0.2 * Number(elapsedMs || 0))
          recommendations.push("Skill readiness dominates: inspect verified TH range and client/native pending casts.");
        if (pilot.phase === "chosen")
          recommendations.push("Boss HP A/B selected " + pilot.selectedMode + "; improvement is observed, not guaranteed on the next Boss.");
        if (!recommendations.length)
          recommendations.push("Need more confirmed Boss-HP and cast-hit observations before choosing a safe acceleration.");
        const out = {
          stage: Number(W._Ba?._Co?._Mo?.ins?.curLv) || null,
          scope: getKVPV_FAR_SCOPE()?.status?.()?.kind ?? null,
          distance: radius(role().a, role().c?.target),
          configuredBossRange: bossRange(),
          elapsedMs,
          topTimeCosts: rows.slice(0, 8),
          directMatchedDps: current?.summary?.matchedDps ?? null,
          rolling10sMatchedDps: current?.summary?.rolling10sMatchedDps ?? null,
          skillGroups: { basic: groupInfo(basic), tuyetHoc: groupInfo(th) },
          dpsPilot: pilot,
          recommendations,
          warning: "Client matched-hit DPS omits some damage sources; Boss HP drops can include companions/other players. No server speed guarantee."
        };
        if (show) {
          console.table(out.topTimeCosts);
          console.table(out.skillGroups);
          console.log("[La Phong 4100]", out);
        }
        return out;
      }
      __esmLocal363 = tianQuan4100Diagnosis;
      function setTianQuan4100Pilot(enabled = true) {
        pilot4100.enabled = enabled === true;
        if (pilot4100.enabled) basicSolo4100.enabled = false;
        resetPilot4100();
        return pilot4100Status();
      }
      __esmLocal374 = setTianQuan4100Pilot;
      function setTianQuanLuoFeng(enabled = true) {
        luoFeng.enabled = !!enabled;
        if (enabled) cosmic.enabled = true;
        else resetApexRhythm();
        return {
          enabled: luoFeng.enabled,
          scope: "THIEN_QUAN",
          sampleWindow: luoFeng.sampleWindow,
          inheritedCosmic: cosmic.enabled,
          nativeCooldownUnchanged: true
        };
      }
      __esmLocal375 = setTianQuanLuoFeng;
      function setTianQuanCosmic(enabled = true) {
        cosmic.enabled = !!enabled;
        return { enabled: cosmic.enabled, scope: ["THIEN_QUAN", "LINH_LUNG", "PHU_VAN"], requiresTQFiveBasics: true, nativeOnly: true, requiresMatchedHits: 2, exploreEvery: 7 };
      }
      __esmLocal376 = setTianQuanCosmic;
      function setTianQuanIdleFill(enabled = true) {
        tqIdleFill.enabled = enabled === true;
        return {
          enabled: tqIdleFill.enabled,
          minRepeatMs: tqIdleFill.minRepeatMs,
          maxPendingPerTH: tqIdleFill.maxPendingPerTH,
          scope: "THIEN_QUAN_SCAN",
          nativeOnly: true
        };
      }
      __esmLocal377 = setTianQuanIdleFill;
      function setTianQuanTHGapBasics(enabled = true, windowMs = 1200) {
        if (!Number.isInteger(windowMs) || windowMs < 100 || windowMs > 2e3) throw Error("TH gap window must be 100..2000ms");
        thGap.enabled = !!enabled;
        thGap.windowMs = windowMs;
        if (!thGap.enabled) resetThGap();
        return { enabled: thGap.enabled, windowMs: thGap.windowMs, nativeReadyOnly: true, perTHLimit: 1 };
      }
      __esmLocal378 = setTianQuanTHGapBasics;
      function setTianQuanTuyetHocVisualSpeed(factor = 99) {
        if (![1, 9, 30, 99, 99999].includes(factor)) throw Error("TH visual speed must be 1, 9, 30, 99 or 99999");
        CFG.tqTuyetHocVisualSpeed = factor;
        if (factor === 1) restoreSpeedClips();
        return { factor, scope: "THIEN_QUAN", ids: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008], visualOnly: true, serverCooldownUnchanged: true };
      }
      __esmLocal379 = setTianQuanTuyetHocVisualSpeed;
      function setTianQuanBasicVisualSpeed(factor = 1) {
        if (![1, 9, 30, 99, 9999, 99999].includes(factor)) throw Error("TQ basic visual speed must be 1, 9, 30, 99, 9999 or 99999");
        CFG.tqBasicVisualSpeed = factor;
        if (factor === 1) restoreSpeedClips();
        return { factor, scope: "THIEN_QUAN", ids: [8001, 8002, 8003, 8004, 8005], visualOnly: true, serverCooldownUnchanged: true };
      }
      __esmLocal380 = setTianQuanBasicVisualSpeed;
      function setTianQuanVisualSpeed(factor = 9999) {
        if (![1, 9, 30, 99, 9999, 99999].includes(factor)) throw Error("Unsupported visual speed");
        if (factor === 9999 || factor === 99999) {
          CFG.tqTuyetHocVisualSpeed = factor;
        } else setTianQuanTuyetHocVisualSpeed(factor);
        setTianQuanBasicVisualSpeed(factor);
        return { factor, scope: "THIEN_QUAN", basic: [8001, 8002, 8003, 8004, 8005], tuyetHoc: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008], visualOnly: true, serverCooldownUnchanged: true };
      }
      __esmLocal381 = setTianQuanVisualSpeed;
      function setBasicAnimationSpeed(factor = 1) {
        if (![1, 9, 99, 99999].includes(factor)) throw Error("Native animation factor must be 1, 9, 99 or 99999");
        restoreSpeedClips();
        CFG.basicAnimationSpeed = factor;
        return { factor, scope: ["THIEN_QUAN", "LINH_LUNG", "PHU_VAN", "TRU_TIEN"], playerSkillId: 8001, serverDamageMultiplierVerified: false };
      }
      __esmLocal3822 = setBasicAnimationSpeed;
      function setTianQuanFiveBasics(enabled = true, wait = 10) {
        if (!tqFive) return { enabled: false, available: false, reason: "five_basics_profile_not_loaded" };
        const out = tqFive.configure(enabled, wait);
        mixed.ready.clear();
        mixed.rotationCursor = 0;
        if (ST.timer !== null) {
          (getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval)(ST.timer);
          ST.timer = typeof (getKVPV_V1()?.timers?.setInterval ?? W.setInterval) === "function" ? (getKVPV_V1()?.timers?.setInterval ?? W.setInterval)(tick, CFG.scanMs) : null;
        }
        return out;
      }
      __esmLocal383 = setTianQuanFiveBasics;
      function setTianQuanFourBasics(enabled = true, wait = 1) {
        if (!tqFive) return { enabled: false, available: false, reason: "four_basics_profile_not_loaded" };
        const out = tqFive.configure(enabled, wait, enabled ? [8001, 8002, 8003, 8004] : null);
        mixed.ready.clear();
        mixed.rotationCursor = 0;
        if (ST.timer !== null) {
          (getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval)(ST.timer);
          ST.timer = typeof (getKVPV_V1()?.timers?.setInterval ?? W.setInterval) === "function" ? (getKVPV_V1()?.timers?.setInterval ?? W.setInterval)(tick, CFG.scanMs) : null;
        }
        return out;
      }
      __esmLocal384 = setTianQuanFourBasics;
      function setTianQuanThreeBasics(enabled = true, wait = 1) {
        if (!tqFive) return { enabled: false, available: false, reason: "three_basics_profile_not_loaded" };
        const out = tqFive.configure(enabled, wait, enabled ? [8001, 8002, 8003] : null);
        mixed.ready.clear();
        mixed.rotationCursor = 0;
        if (ST.timer !== null) {
          (getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval)(ST.timer);
          ST.timer = typeof (getKVPV_V1()?.timers?.setInterval ?? W.setInterval) === "function" ? (getKVPV_V1()?.timers?.setInterval ?? W.setInterval)(tick, CFG.scanMs) : null;
        }
        return out;
      }
      __esmLocal385 = setTianQuanThreeBasics;
      function setTianQuanTuyetHoc(enabled = true) {
        if (!tqFive) return { enabled: false, available: false, reason: "five_basics_profile_not_loaded" };
        return tqFive.setTuyetHoc(enabled);
      }
      __esmLocal386 = setTianQuanTuyetHoc;
      function setSkillPriority(value = "tuyet_hoc_first") {
        if (!["tuyet_hoc_first", "interleaved"].includes(value)) throw Error("Skill priority must be tuyet_hoc_first or interleaved");
        skillPriority = value;
        return { skillPriority };
      }
      __esmLocal389 = setSkillPriority;
      const api33 = { setLocalLogAutoClear, tianQuan4100Diagnosis, setTianQuan4100BasicSolo, setTianQuan4100Pilot, setTianQuanLuoFeng, setTianQuanCosmic, setTianQuanIdleFill, setTianQuanTHGapBasics, setTianQuanTuyetHocVisualSpeed, setTianQuanBasicVisualSpeed, setTianQuanVisualSpeed, setTianQuanTuyetHoc, setTianQuanMpackExtras, setTianQuanFiveBasics, setTianQuanFourBasics, setTianQuanThreeBasics, setSkillPriority, setBasicAnimationSpeed, setBasicOnly, isBasicOnly: __captureESMFunction15(__esmLocal393 = (() => tqFive?.active() ? basicSolo4100Active() || !tqFive.allowsTuyetHoc() : CFG.basicOnly), "isBasicOnly"), releaseOutsideScope, setClientPace, setScanInterval, setConfirmedTailCut, setAfterTHWait, setBasicHitQuota, setBasicRotation, setPrimaryBasic, setBasicPace, setInterleaved, setBurst, performance, dps, bossInfo, skill1008Info, version: "1.0.0", start, stop, status, report, setDistance, repairPolling, sync: tick, export: __captureESMFunction15(__esmLocal394 = (() => JSON.stringify(report(), null, 2)), "export"), history: __captureESMFunction15(__esmLocal395 = (() => ST.history.slice()), "history") };
      W.KVPV_TH300 = api33;
      console?.info?.(TAG, 'READY/OFF. START: KVPV_MODE.start("BOSS_TH300_SCAN") then KVPV_MODE.start("BOSS_TH300")');
    }), "")();
  }
  var api18 = Object.freeze({
    get KVPV_TH300() {
      return globalThis.KVPV_TH300;
    },
    get KVPV_TQ_BASIC_PROFILE() {
      return globalThis.KVPV_TQ_BASIC_PROFILE;
    },
    get KVPV_TQ_SINGLE_STRONGEST_TH() {
      return globalThis.KVPV_TQ_SINGLE_STRONGEST_TH;
    }
  });

  // esm/modules/32-combat-stall.mjs
  function __captureESMFunction16(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal015;
  var __esmLocal119;
  var __esmLocal235;
  var __esmLocal320;
  var __esmLocal411;
  var __esmLocal510;
  var __esmLocal69;
  var __esmLocal710;
  var __esmLocal810;
  var __esmLocal910;
  var __esmLocal106;
  var __esmLocal1110;
  var __esmLocal1210;
  function initialize17() {
    __captureESMFunction16(__esmLocal015 = (() => {
      "use strict";
      const W = window, KEY = "KVPV_COMBAT_STALL";
      const actor = String(W.__KVPV_OWN_ACTOR_ID ?? "");
      let progressWatch = { key: "", since: 0, lastSampleAt: 0, lastProgressAt: 0, samples: 0, changes: 0, lastHp: "" };
      const safe = __captureESMFunction16(__esmLocal119 = ((fn) => {
        try {
          return fn();
        } catch (e) {
          return { error: String(e?.message || e) };
        }
      }), "safe");
      const state = __captureESMFunction16(__esmLocal235 = ((obj, ...args) => safe(__captureESMFunction16(__esmLocal320 = (() => obj?.status?.(...args) ?? null), ""))), "state");
      function observeProgress({ own, scene, far, mode, th, basics, hr, target, targetType, targetOcc, targetHp }) {
        const now = Date.now(), active = mode?.combatRunning === true || th?.running === true || hr?.running === true || far?.inside === false && basics?.enabled === true;
        const hp = Array.isArray(targetHp) ? targetHp.slice(0, 2).map(Number) : typeof targetHp === "number" && Number.isFinite(targetHp) ? [targetHp] : null;
        if (!own || !active || !target || !hp?.length || hp.some((value) => !Number.isFinite(value))) {
          progressWatch = { key: "", since: 0, lastSampleAt: 0, lastProgressAt: 0, samples: 0, changes: 0, lastHp: "" };
          return { state: "not_observed", reason: !own ? "game_context_not_ready" : !active ? "no_active_combat_controller" : !target ? "no_native_target" : "target_hp_unavailable", samples: 0, unchangedMs: 0, confidence: "none" };
        }
        const key = JSON.stringify([scene, String(targetOcc ?? ""), String(targetType ?? "")]), hpKey = JSON.stringify(hp);
        if (progressWatch.key !== key) {
          progressWatch = { key, since: now, lastSampleAt: 0, lastProgressAt: now, samples: 0, changes: 0, lastHp: "" };
        }
        if (now - progressWatch.lastSampleAt >= 4e3) {
          if (progressWatch.lastHp && progressWatch.lastHp !== hpKey) {
            progressWatch.lastProgressAt = now;
            progressWatch.changes++;
          }
          progressWatch.lastHp = hpKey;
          progressWatch.lastSampleAt = now;
          progressWatch.samples++;
        }
        const unchangedMs = Math.max(0, now - progressWatch.lastProgressAt);
        const stalled = progressWatch.samples >= 4 && unchangedMs >= 6e4;
        return {
          state: stalled ? "possible_stall" : unchangedMs >= 2e4 ? "waiting" : "observing",
          reason: stalled ? "target_hp_unchanged" : unchangedMs >= 2e4 ? "no_recent_target_hp_change" : "collecting_samples",
          observedMs: Math.max(0, now - progressWatch.since),
          unchangedMs,
          samples: progressWatch.samples,
          progressChanges: progressWatch.changes,
          lastSampleAt: progressWatch.lastSampleAt,
          confidence: stalled ? "low" : "medium"
        };
      }
      function snapshot() {
        const own = String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") === actor && !!actor && !W.__KVPV_UNIVERSAL_HALTED;
        const scene = Number(W._C?._Mn?._Cn?.currentID ?? W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
        const far = state(getKVPV_FAR_SCOPE()), mode = state(getKVPV_MODE(), false), th = state(getKVPV_TH300(), false), basics = state(getKVPV_BASIC10()), hr = state(getKVPV_HITRUN1(), false), force = state(getKVPV_TQ_BASIC_FORCE()), thac = state(getKVPV_THAC_AN_CD0()), xa = state(getKVPV_XA_MENH_LV2());
        const me = safe(__captureESMFunction16(__esmLocal510 = (() => {
          const world = W._C?._Ba?.instance;
          return world?.getRole?.(Number(actor)) ?? world?.getRole?.(actor);
        }), ""));
        const comp = safe(__captureESMFunction16(__esmLocal69 = (() => me?.getComponent?.(W._d?._Yct?._Het)), ""));
        const selector = safe(__captureESMFunction16(__esmLocal710 = (() => me?.getComponent?.(W._d?._Yct?._Eet)), ""));
        const target = comp?.target;
        const targetType = safe(__captureESMFunction16(__esmLocal810 = (() => target?.property?.get?.("type") ?? null), ""));
        const targetOcc = safe(() => target?.property?.get?.("occ") ?? null);
        const targetHp = safe(__captureESMFunction16(__esmLocal910 = (() => target?.property?.get?.("hp") ?? null), ""));
        const progress = observeProgress({ own, scene, far, mode, th, basics, hr, target, targetType, targetOcc, targetHp });
        const hints = [];
        if (!own) hints.push("game_frame_actor_or_session_not_ready");
        if (thac?.unresolved?.length) hints.push("thac_an_client_cooldowns_still_zero");
        if (xa?.unresolved === true) hints.push("xa_menh_client_cooldown_still_zero");
        if (!comp || typeof comp?.combat !== "function") hints.push("native_combat_component_missing");
        if (!selector || typeof selector?._f7t !== "function") hints.push("native_skill_selector_missing");
        if (target == null) hints.push("native_target_missing");
        if (mode?.mode === "OFF" && far?.inside === true) hints.push("far_combat_mode_off_or_waiting");
        if (far?.inside === false && basics?.enabled === false) hints.push("outside_basic_controller_off");
        if (typeof th?.reason === "string" && /animation|cooldown|skill_readiness/.test(th.reason))
          hints.push("long_range_controller_waiting_" + th.reason);
        if (typeof basics?.reason === "string" && /cooldown|ready|target|range/.test(basics.reason))
          hints.push("outside_controller_waiting_" + basics.reason);
        let diagnosis = { code: "no_known_blocker", confidence: "low", evidence: [], nextStep: "collect_more_runtime_samples" };
        if (!own) diagnosis = { code: "game_context_not_ready", confidence: "high", evidence: ["game_frame_actor_or_session_not_ready"], nextStep: "check_actor_and_live_session" };
        else if (!comp || typeof comp?.combat !== "function") diagnosis = { code: "native_combat_component_missing", confidence: "high", evidence: ["native_combat_component_missing"], nextStep: "wait_for_game_components" };
        else if (!selector || typeof selector?._f7t !== "function") diagnosis = { code: "native_skill_selector_missing", confidence: "high", evidence: ["native_skill_selector_missing"], nextStep: "wait_for_game_components" };
        else if (mode?.mode === "OFF" && far?.inside === true) diagnosis = { code: "far_combat_mode_disabled", confidence: "high", evidence: ["far_combat_mode_off_or_waiting"], nextStep: "check_combat_mode_setting" };
        else if (thac?.unresolved?.length || xa?.unresolved === true) diagnosis = {
          code: "client_cooldown_not_restored",
          confidence: "high",
          evidence: hints.filter((hint) => hint === "thac_an_client_cooldowns_still_zero" || hint === "xa_menh_client_cooldown_still_zero"),
          nextStep: "review_verified_cooldown_recovery"
        };
        else if (target == null) diagnosis = { code: "waiting_for_native_target", confidence: "medium", evidence: ["native_target_missing"], nextStep: "wait_for_target_selection" };
        else if (hints.some((hint) => hint.startsWith("long_range_controller_waiting_") || hint.startsWith("outside_controller_waiting_")))
          diagnosis = { code: "combat_controller_waiting", confidence: "medium", evidence: hints.filter((hint) => hint.startsWith("long_range_controller_waiting_") || hint.startsWith("outside_controller_waiting_")), nextStep: "inspect_controller_status" };
        else if (hints.includes("outside_basic_controller_off")) diagnosis = { code: "outside_basic_controller_disabled", confidence: "high", evidence: ["outside_basic_controller_off"], nextStep: "check_outside_controller_setting" };
        else if (progress.state === "possible_stall" && diagnosis.code === "no_known_blocker")
          diagnosis = { code: "possible_combat_stall", confidence: "low", evidence: ["target_hp_unchanged_for_60s", "multiple_runtime_samples"], nextStep: "compare_recent_diagnostics_before_manual_recovery" };
        return {
          version: 3,
          diagnosis,
          progress,
          actorMatches: own,
          map: scene,
          scene: far?.kind ?? "unknown",
          native: {
            combatPresent: typeof comp?.combat === "function",
            selectorPresent: typeof selector?._f7t === "function",
            cooldownMethodPresent: typeof comp?.isCooldown === "function",
            targetType,
            targetHp
          },
          hints,
          mode: {
            mode: mode?.mode ?? null,
            reason: mode?.reason ?? null,
            lastError: mode?.lastError ?? null,
            running: mode?.combatRunning ?? null
          },
          outside: {
            enabled: basics?.enabled ?? null,
            reason: basics?.reason ?? null,
            attempts: basics?.attempts ?? null,
            lastError: basics?.lastError ?? null
          },
          long: {
            running: th?.running ?? null,
            reason: th?.reason ?? th?.lastReason ?? null,
            phase: th?.phase ?? th?.combatPhase ?? null,
            lastError: th?.lastError ?? null
          },
          hitrun: { running: hr?.running ?? null, phase: hr?.phase ?? null },
          hooks: { tqBasicForce: force?.enabled ?? null },
          thac: { enabled: thac?.enabled ?? null, unresolved: thac?.unresolved ?? [], rollbackCount: thac?.rollbackCount ?? null },
          xa: { enabled: xa?.enabled ?? null, ms: xa?.configCooldownMs ?? null, rollbackCount: xa?.rollbackCount ?? null },
          note: "Read-only snapshot; no server skill outcome proven. Do not infer reason from a still image alone."
        };
      }
      __esmLocal411 = snapshot;
      function recover() {
        safe(__captureESMFunction16(__esmLocal1110 = (() => getKVPV_XA_MENH_LV2()?.recover?.()), ""));
        safe(__captureESMFunction16(__esmLocal1210 = (() => getKVPV_THAC_AN_CD0()?.recover?.()), ""));
        return snapshot();
      }
      __esmLocal106 = recover;
      W[KEY] = Object.freeze({ snapshot, status: snapshot, recover });
    }), "")();
  }
  var api19 = Object.freeze({});

  // esm/modules/39-executor-report.mjs
  function __captureESMFunction17(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal016;
  var __esmLocal120;
  var __esmLocal243;
  var __esmLocal321;
  var __esmLocal412;
  var __esmLocal511;
  var __esmLocal610;
  var __esmLocal711;
  var __esmLocal811;
  var __esmLocal911;
  var __esmLocal107;
  var __esmLocal1111;
  var __esmLocal1211;
  var __esmLocal1310;
  var __esmLocal1410;
  var __esmLocal156;
  var __esmLocal1610;
  var __esmLocal1710;
  var __esmLocal1810;
  var __esmLocal1910;
  var __esmLocal2010;
  var __esmLocal2110;
  var __esmLocal2210;
  var __esmLocal2310;
  var __esmLocal244;
  var __esmLocal253;
  var __esmLocal2610;
  var __esmLocal2710;
  var __esmLocal2810;
  var __esmLocal2910;
  var __esmLocal3010;
  var __esmLocal3110;
  var __esmLocal323;
  var __esmLocal3310;
  var __esmLocal3410;
  var __esmLocal353;
  var __esmLocal3610;
  var __esmLocal3710;
  var __esmLocal387;
  var __esmLocal396;
  var __esmLocal402;
  function initialize18() {
    __captureESMFunction17(__esmLocal016 = (() => {
      "use strict";
      const W = window, actor = String(W.__KVPV_OWN_ACTOR_ID || "");
      let at = -Infinity, cached = null;
      delete getKVPV_TOWER_SKILLS();
      delete getKVPV_BUFF_INSPECT();
      const str = __captureESMFunction17(__esmLocal120 = ((x) => String(x ?? "").slice(0, 300)), "str");
      function economySnapshot() {
        const ids = [20320001, 20330001, 20330002, 20340001, 20340002, 20340003, 20340004, 20340005];
        const amounts = [2e4, 25e4, 5e5, 1e6, 2e6, 5e6, 1e7, 2e7];
        const integer = __captureESMFunction17(__esmLocal321 = ((x) => typeof x === "number" && Number.isSafeInteger(x) && x >= 0 ? x : null), "integer");
        try {
          const user = W._Ba?._rJ?._O$?.ins, bag = W._Ba?._Ic?._aQ?.ins;
          if (String(user?.actorId ?? "") !== actor) return null;
          const items = bag?.isBagInited === true ? bag.getItemsByBagType?.(0) : null;
          const inventoryReady = Array.isArray(items), counts = new Map(ids.map(__captureESMFunction17(__esmLocal412 = ((id) => [id, 0]), "")));
          if (inventoryReady) for (const item of items) {
            if (!Array.isArray(item) || !counts.has(item[0])) continue;
            const count = integer(item[1]), previous = counts.get(item[0]);
            counts.set(item[0], count === null || previous === null ? null : integer(previous + count));
          }
          return {
            actor,
            at: Date.now(),
            source: "client_state_only",
            moneyReady: user.isInitedMoney === true,
            gold: user.isInitedMoney === true ? integer(user.copper) : null,
            ingot: user.isInitedMoney === true ? integer(user.ingot) : null,
            inventoryReady,
            goldChests: ids.map(__captureESMFunction17(__esmLocal511 = ((id, i) => ({ id, count: inventoryReady ? counts.get(id) : null, goldPerChest: amounts[i] })), ""))
          };
        } catch (e) {
          return { actor, at: Date.now(), source: "client_state_only", error: str(e.message) };
        }
      }
      __esmLocal243 = economySnapshot;
      function snapshot() {
        if (!actor || actor !== String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") || W.__KVPV_UNIVERSAL_HALTED) return null;
        if (Date.now() - at < 5e3) return cached;
        const era = getKVPV_REBORN_GOALS()?.inspect?.(), rows = getKVPV_TIENVI_GOALS()?.inspect?.() ?? [], mainRow = W._Ba?._zIt?._FIt?.ins?.taskInfo, cfg = Array.isArray(mainRow) ? W._ft?.__Z?.ins?.getTaskCfgById?.(mainRow[0]) : null;
        const main = cfg ? { id: str(mainRow[0]), name: str(cfg[1]), action: Number(cfg[6]), state: Number(mainRow[1]) } : null;
        const tasks = (era?.tasks ?? []).slice(0, 20).map(__captureESMFunction17(__esmLocal711 = ((q) => ({
          id: str(q.id),
          nodeId: q.nodeId,
          name: str(q.name),
          state: q.state,
          progress: q.progress,
          target: q.target,
          action: q.action,
          rawAction: q.rawAction,
          mode: q.mode,
          kind: str(q.kind)
        })), ""));
        const missing = tasks.filter(__captureESMFunction17(__esmLocal811 = ((q) => q.state !== 2 && !["LEVEL", "STAGE", "LINH_LUNG", "FABAO", "EQUIPMENT", "CO_BAO", "ARENA"].includes(q.kind)), ""));
        const mainRoute = getKVPV_V866()?.status?.(false)?.route;
        if (main && main.state !== 2 && mainRoute === "unknown" && !era?.root) missing.push({ source: "MAIN", ...main, kind: "unverified_executor" });
        const tv = rows.slice(0, 80).map(__captureESMFunction17(__esmLocal911 = ((q) => ({ id: str(q.id), name: str(q.name), state: q.state, progress: q.progress, target: q.target, action: q.action, executor: str(q.executor), reason: str(q.reason) })), ""));
        for (const q of tv) if (q.state === 0 && ["unverified_requirement", "waiting_config"].includes(q.executor)) missing.push({ source: "TIEN_VI", ...q });
        const exec = getKVPV_REBORN_EXECUTORS()?.status?.(), planner = getKVPV_PROGRESS_PLANNER()?.status?.();
        const redDotModule = getKVPV_RED_DOT_MODULE(), redDotHealth = redDotModule?.health?.() ?? null;
        const redDotCatalog = (W.KVPV_RED_DOT?.catalog?.() ?? []).filter((item) => item?.automatic === true && ["src/01-red-dot-module.js", "KVPV_RED_DOT_MODULE"].includes(item.actionModule)).slice(0, 256).map((item) => ({ id: Number(item.id), name: str(item.name).slice(0, 100), controlGroup: str(item.controlGroup).slice(0, 80), enabled: item.enabled !== false }));
        let combatStall = null;
        try {
          combatStall = W.KVPV_COMBAT_STALL?.snapshot?.() ?? null;
        } catch (e) {
          combatStall = { error: str(e?.message ?? e) };
        }
        let nativeSkillRotation = null;
        try {
          nativeSkillRotation = W.KVPV_SKILL_ASYNC_OBSERVER?.status?.() ?? null;
        } catch (e) {
          nativeSkillRotation = { error: str(e?.message ?? e) };
        }
        const windows = [], manager = W._ft?._Y4n?.ins;
        for (const id of [41, 46, 289, 93, 113, 114, 115, 116, 393]) if (manager?.isOpened?.(id)) {
          const p = manager.getPanelById?.(id), buttons = [];
          for (const key of ["btn", "getBtn", "oneBtn", "tenBtn", "fiftyBtn", "allupBtn", "upBtn", "getAllBtn"]) {
            const b = p?.[key];
            if (b) buttons.push({ key, label: str(b.label), visible: b.visible !== false, disabled: b.disabled === true, gray: b.gray === true });
          }
          windows.push({ id, className: str(p?.constructor?.name), visible: p?.visible !== false, buttons });
        }
        const far = getKVPV_TH300()?.report?.(), auto = getKVPV_HITRUN_AUTO()?.status?.(false), hit = auto?.hitrun, basic = getKVPV_BASIC10()?.status?.();
        const liveRole = W._C?._Ba?.instance?.getRole?.(Number(actor)), liveTarget = liveRole?.getComponent?.(W._d?._Yct?._Het)?.target, targetHP = liveTarget?.property?.get?.("hp");
        const truTienEnemies = getKVPV_FAR_SCOPE()?.status?.().kind === "TRU_TIEN" ? Object.values(W._C?._Ba?.instance?.getRoles?.() ?? {}).filter(__captureESMFunction17(__esmLocal107 = ((r) => r?.isValid !== false && Number(r?.property?.get?.("type")) === 1 && Number(r?.property?.get?.("hp")?.[0]) > 0), "")).length : null;
        const combat = {
          truTienEnemies,
          targetType: liveTarget?.property?.get?.("type"),
          targetHP: Array.isArray(targetHP) ? targetHP.slice(0, 2) : null,
          matchedHits: far?.confirmedCastHitPairs,
          castSignals: far?.nativeCombat?.dispatch?.signals,
          silentCasts: far?.nativeCombat?.dispatch?.silent,
          targetOcc: liveTarget?.property?.get?.("occ"),
          autoMode: str(auto?.lastMode),
          autoBlocked: str(auto?.lastBlocked),
          hitReason: str(hit?.reason),
          hitError: str(hit?.lastError),
          hitRunning: hit?.running,
          enabled: auto?.enabled,
          phase: hit?.phase,
          hpPct: hit?.hpPct,
          bossId: str(hit?.bossId),
          reason: str(far?.lastReason),
          distance: far?.currentDistance,
          positioning: far?.positioning,
          hidden: W.document?.hidden ?? null,
          lastTickAt: far?.lastTickAt,
          tickAgeMs: far?.tickAgeMs,
          timerActive: far?.timerActive,
          timerRepairs: far?.timerRepairs,
          documentFocused: typeof W.document?.hasFocus === "function" ? W.document.hasFocus() : null,
          nativeFrameRate: str(W.Laya?.stage?.frameRate),
          nativePowerPanelOpen: W._ft?._Y4n?.ins?.isOpened?.(480) ?? null,
          pollingGapMs: getKVPV_ACCOUNT_POLICY()?.pollingGap?.() ?? null,
          activeController: far?.scope?.inside === true && far?.running === true ? "far" : basic?.active === true ? "outside" : "native",
          activeAttempts: far?.scope?.inside === true && far?.running === true ? far?.castAttempts : basic?.attempts,
          roadMelee: basic?.roadMelee,
          outsideAttempts: basic?.attempts,
          outsideBasicAttempts: basic?.basicAttempts,
          outsideSkillAttempts: basic?.tuyetHocAttempts,
          basicAnimationSpeed: far?.basicAnimationSpeed,
          scaledBasicAnimations: far?.scaledBasicAnimations,
          basicSpeedTrial: far?.basicSpeedTrial,
          basicOnly: far?.basicOnly,
          playerSkillIds: far?.playerSkillIds,
          primaryBasicEnabled: far?.primaryBasicEnabled,
          primaryBasicSkillId: far?.primaryBasicSkillId,
          basicAttempts: far?.interleaved?.basicAttempts,
          basicHits: far?.interleaved?.basicConfirmedHits,
          basicSuspended: far?.interleaved?.basicSuspended,
          primaryBasicClientWaitMs: far?.primaryBasicClientWaitMs,
          clientPaceMs: far?.paceMs,
          clientScanMs: far?.interleaved?.scanMs,
          afterTHWaitMs: far?.afterTHWaitMs,
          basicHitQuota: far?.basicHitQuota,
          confirmedSinceTH: far?.confirmedSinceTH,
          thCycles: far?.thCycles,
          primaryBasicBurstBeforeSkill: far?.primaryBasicBurstBeforeSkill,
          basicRotation: far?.basicRotation,
          confirmedBasicTailCut: far?.confirmedBasicTailCut,
          confirmedBasicTailCuts: far?.confirmedBasicTailCuts,
          recentNativeCasts: far?.nativeCombat?.dispatch?.recent?.slice(-16).map(__captureESMFunction17(__esmLocal1111 = ((c) => ({ at: c.at, id: c.id, targetId: c.targetId, signaled: c.signaled })), "")),
          excludedBasicSkillIds: far?.excludedBasicSkillIds,
          attempts: far?.castAttempts,
          dispatch: far?.nativeCombat?.dispatch?.calls,
          farRunning: far?.running,
          selectorOwned: far?.nativeCombat?.selectorOwned,
          combatOwned: far?.nativeCombat?.combatOwned,
          scope: str(far?.scope?.kind),
          scopeInside: far?.scope?.inside,
          scopeEvidence: getKVPV_TQ_SCOPE()?.status?.(),
          targetName: str(liveTarget?.property?.get?.("name")),
          basicActive: basic?.active,
          basicReason: str(basic?.reason),
          basicError: str(basic?.lastError),
          cooldown: far?.nativeCombat?.cooldown,
          animationPlaying: far?.nativeCombat?.animationPlaying,
          nativeGate: far?.nativeGate,
          burstEnabled: far?.burst?.enabled,
          burstMinBatchGapMs: far?.burst?.minBatchGapMs,
          burstNativeRows: far?.burst?.nativeRows,
          burstLastPass: far?.burst?.lastPass,
          burstBatches: far?.burst?.batches?.slice(-2),
          state: str(far?.performance?.current?.state),
          error: str(far?.lastError),
          movementCommands: far?.movementCommands
        };
        const priority = getKVPV_QUEST_PRIORITY()?.status?.(), daily = getKVPV_DAILY()?.quickState?.(), scene = W.KVPV?.core?.scene?.status?.(), parallel = getKVPV_PARALLEL_ACTIONS()?.status?.();
        const nativeMap = Number(W._C?._Mn?._Cn?.currentID ?? W._Ba?._$a?._yo?.ins?.intoSce?.[0]), bossModel = W._Ba?._sst?._ist?.inst;
        const demonRows = (W._ft?._$st?.ins?.cfgs ?? []).filter(__captureESMFunction17(__esmLocal1211 = ((r) => Array.isArray(r) && Number(W._ft?._po?.ins?.getCfgById?.(r[0])?.[7]) === 10), "")).slice(0, 80);
        const hongModel = W._Ba?._OBt?._WBt?.inst;
        const hongHoang = { enabled: getKVPV_DAILY()?.config?.enableHongHoang, serverState: bossModel?.getCpSceneStateByType?.(17)?.slice(0, 5), count: hongModel?.gathCount, max: hongModel?.maxNum, full: hongModel?.getGathCountIsMax?.(), xianFa: hongModel?.xFId };
        const bossRoutine = { entryLevel: W._Ba?._$a?._yo?.ins?.intoSce?.[3], instanceBoss: W._ft?._$st?.ins?.getCfgByMapIdAndLv?.(nativeMap, W._Ba?._$a?._yo?.ins?.intoSce?.[3])?.[2], map: nativeMap, scene: Number(W._Ba?._$a?.SceneUtil?.curScene), mapType: Number(W._ft?._po?.ins?.getCfgById?.(nativeMap)?.[7]), common: daily?.common, mission: W._Ba?._$a?._yo?.ins?.isInMission, era: Number(W._Ba?._rJ?._O$?.ins?.eraLevel), demonEnabled: getKVPV_DAILY()?.config?.enableYeuVuong, demonQuota: bossModel?.getBsTimesBySceneType?.(10)?.[2], demonRows: demonRows.map(__captureESMFunction17(__esmLocal1310 = ((r) => ({ map: r[0], boss: r[2], era: r[3], flag: bossModel?.getBsInfoById?.(r[2])?.[2]?.[0] })), "")) };
        const stage = {
          priority: str(priority?.reason),
          error: str(priority?.lastError),
          goal: priority?.levelGoal ? { id: str(priority.levelGoal.id), current: priority.levelGoal.current, target: priority.levelGoal.target } : null,
          job: str(daily?.job),
          step: str(daily?.step),
          running: daily?.running,
          owner: str(scene?.owner),
          tag: str(scene?.tag),
          auto: W._Ba?._Co?._Mo?.ins?.auto,
          current: W._Ba?._Co?._Mo?.ins?.curLv,
          pending: (parallel?.pending ?? []).slice(0, 16).map(__captureESMFunction17(__esmLocal1410 = ((p) => ({ id: str(p.id), reason: str(p.reason), at: p.at })), "")),
          parallelReason: str(parallel?.reason),
          parallelError: str(parallel?.lastError)
        };
        const upgradeReports = {};
        for (const [key, api33] of [["redNavigator", getKVPV_RED_NAVIGATOR()], ["appearance", getKVPV_APPEARANCE_AUTO()], ["soulStone", getKVPV_SOUL_STONE_FAST()], ["seasonRewards", getKVPV_SEASON_REWARDS()]]) {
          const r = api33?.status?.();
          if (r) upgradeReports[key] = {
            reason: str(r.reason),
            requests: r.requests,
            confirmed: r.confirmed,
            pending: !!r.pending,
            error: str(r.error ?? r.lastError),
            groups: r.groups?.slice(0, 20).map(__captureESMFunction17(__esmLocal156 = ((g) => ({ key: str(g.key), ready: g.ready, level: g.level, have: g.have, need: g.need })), ""))
          };
        }
        const eye = getKVPV_WORLD_EYE()?.status?.();
        const worldEye = eye ? { enabled: eye.enabled, map: eye.map, scans: eye.scans, changes: eye.changes, errors: eye.errors, actions: eye.actions?.slice(0, 40) } : null;
        const trial = getKVPV_DAILY_TRIAL()?.status?.();
        const dailyTrial = trial ? { entries: trial.entries, returns: trial.returns, dungeons: trial.dungeons?.map(__captureESMFunction17(__esmLocal1610 = ((d) => ({ id: d.id, level: d.level, remaining: d.remaining, known: d.known, unlocked: d.unlocked, taskAllowed: d.taskAllowed })), "")), phase: trial.phase, reason: trial.reason, map: trial.pending?.id, cheer: trial.pending?.cheer, knbInspireAllowed: trial.knbInspireAllowed, lastError: trial.lastError } : null;
        const party = W._Ba?._cm?._q3t?.ins;
        const nativeRoom = party ? {
          id: party.roomId,
          map: party.roomMapId,
          tier: party.mapLve ?? party.roomMapLv,
          leader: party.isLeader,
          types: [1, 2, 6].filter(__captureESMFunction17(__esmLocal1710 = ((t) => party.getHasTeamByType?.(t) === true), "")),
          members: (party.getTeamAllMembers?.() ?? []).slice(0, 8).map(__captureESMFunction17(__esmLocal1810 = ((r) => r.slice(0, 5)), ""))
        } : null;
        const tg = W._ft?._h$?.ins, tgRows = Array.isArray(tg?._QW) ? tg._QW.filter(__captureESMFunction17(__esmLocal1910 = ((r) => Number(r?.[0]) === Number(tg._Ait)), "")) : [], tgMax = tgRows.length ? Math.max(...tgRows.map(__captureESMFunction17(__esmLocal2010 = ((r) => Number(r[1])), "")).filter(Number.isFinite)) : null;
        const tianguanConfig = { source: "scene_copy_tianguan", activeMap: tg?._Ait ?? null, rangeRows: tgRows.length, maxConfiguredFloor: tgMax, lastRanges: tgRows.slice(-4).map(__captureESMFunction17(__esmLocal2110 = ((r) => ({ map: r[0], through: r[1], requiredKills: r[2], bossFormula: String(r[5] ?? "").slice(0, 200) })), "")), probes: [14e3, 15e3, 2e4, ...Number.isFinite(tgMax) ? [tgMax, tgMax + 1] : []].map(__captureESMFunction17(__esmLocal2210 = ((level) => ({ level, exists: !!tg?.getCfgByLv?.(level) })), "")) };
        const cobaoConfig = __captureESMFunction17(__esmLocal2310 = (() => {
          const all = W._ft?._WNn?.ins?.arr ?? [], base = {}, bonuses = {}, complete = [], partial = [];
          let fragments = 0;
          for (const r of all) {
            const stages = r[7] ?? [];
            let n = 0;
            for (let i = 0; i < stages.length; i++) if (Number(stages[i]) <= 14e3) {
              n++;
              fragments++;
              const pairs = r[4]?.[i] ?? [];
              for (let j = 0; j < pairs.length; j += 2) base[pairs[j]] = (base[pairs[j]] ?? 0) + Number(pairs[j + 1]);
            }
            const description = W._ft?._nY?.ins?.des?.(W._ft?._nY?.ins?.getCfgById?.(r[3]), r[3]) ?? "";
            if (n === stages.length && n) {
              complete.push({ name: r[1], lastStage: Math.max(...stages), description });
              const m = description.match(/^(.*?) tăng ([0-9.]+)$/);
              if (m) bonuses[m[1]] = (bonuses[m[1]] ?? 0) + Number(m[2]);
              else partial.push({ unparsed: description });
            } else if (n) partial.push({ name: r[1], unlocked: n, total: stages.length, stages });
          }
          return { target: 14e3, totalRows: all.length, fragments, completed: complete.length, base, bonuses, partial, lastComplete: complete.slice(-3), sample: all.filter(__captureESMFunction17(__esmLocal244 = ((r) => String(r[1]).includes("Dao Tr\xEC")), "")).map(__captureESMFunction17(__esmLocal253 = ((r) => ({ row: r, description: W._ft?._nY?.ins?.des?.(W._ft?._nY?.ins?.getCfgById?.(r[3]), r[3]) })), "")) };
        }), "")();
        cached = {
          tienTon: getKVPV_TIEN_TON_AUTO()?.status?.() ?? null,
          desktopControl: getKVPV_DESKTOP_CONTROL()?.status?.() ?? null,
          kiemKhieu: getKVPV_KIEM_KHIEU()?.status?.() ?? null,
          cobaoConfig,
          tianguanConfig,
          transformSkills: getKVPV_TRANSFORM10()?.status?.() ?? null,
          fourWorship: getKVPV_FOUR_WORSHIP()?.status?.() ?? null,
          marryRewards: getKVPV_MARRY_REWARDS()?.status?.() ?? null,
          festivalFree: getKVPV_FESTIVAL_FREE()?.status?.() ?? null,
          loginStreak: getKVPV_LOGIN_STREAK()?.status?.() ?? null,
          petTravel: getKVPV_PET_TRAVEL()?.status?.() ?? null,
          marryArena: getKVPV_MARRY_ARENA()?.status?.() ?? null,
          eightChest: getKVPV_EIGHT_CHEST()?.status?.() ?? null,
          peakCompletion: getKVPV_PEAK_COMPLETION()?.status?.() ?? null,
          stageResume: W.__KVPV_STAGE_RESUME_20261024_USER ?? null,
          stageRequested: getKVPV_DAILY()?.config?.enableTuVuot === true,
          peakChest: getKVPV_PEAK_CHEST()?.status?.() ?? null,
          quizAuto: getKVPV_QUIZ_AUTO()?.status?.() ?? null,
          roadCadence: getKVPV_ROAD_CADENCE()?.status?.() ?? null,
          nativeRoom,
          hongHoang,
          idleDaily: getKVPV_IDLE_DAILY()?.status?.() ?? null,
          freeDailyBag: getKVPV_FREE_DAILY_BAG()?.status?.() ?? null,
          freeTreasure: getKVPV_FREE_TREASURE()?.status?.() ?? null,
          crystalCapture: getKVPV_CRYSTAL_CAPTURE()?.status?.() ?? null,
          itemTrace: getKVPV_ITEM_TRACE()?.status?.() ?? null,
          manualEntry: getKVPV_MANUAL_ENTRY()?.status?.() ?? null,
          demonKingRecovery: getKVPV_DEMON_KING_RECOVERY()?.status?.() ?? null,
          bossRoutine,
          companionCombat: getKVPV_COMPANION_COMBAT()?.status?.() ?? null,
          adventure: getKVPV_ADVENTURE()?.status?.() ?? null,
          activityDay: getKVPV_DAILY_CLOCK()?.status?.() ?? null,
          guildBoss: getKVPV_GUILD_BOSS()?.status?.() ?? null,
          dailyTrial,
          bossTeam: getKVPV_BOSS_TEAM()?.status?.() ?? null,
          teamCoordinator: getKVPV_TEAM_COORDINATOR()?.status?.() ?? null,
          contextPlan: getKVPV_CONTEXT_BRAIN()?.plan?.() ?? null,
          worldEye,
          schema: 1,
          actor,
          build: str(W.__KVPV_LIVE_BUILD || getKVPV_V1()?.build?.id),
          at: Date.now(),
          main,
          combat,
          stage,
          upgradeReports,
          redDots: (parallel?.redDots ?? []).slice(0, 128),
          reborn: { reason: str(era?.reason), eraLevel: era?.eraLevel ?? null, selected: era?.selected?.id ?? null, tasks },
          tienVi: tv,
          missing: missing.slice(0, 80),
          windows,
          executors: {
            cobao: exec ? { reason: str(exec.cobao?.reason), pending: exec.cobao?.pending?.step ?? null, confirmed: exec.cobao?.confirmed } : null,
            arena: exec ? { reason: str(exec.arena?.reason), pending: !!exec.arena?.pending, confirmed: exec.arena?.confirmed, freeAttempts: exec.arena?.plan?.attempts ?? null } : null,
            materials: { reason: str(planner?.reason), missing: planner?.plan?.upgrades?.filter(__captureESMFunction17(__esmLocal2610 = ((x) => x.missing > 0), "")).slice(0, 8).map(__captureESMFunction17(__esmLocal2710 = ((x) => ({ id: x.id, fragment: x.fragment, missing: x.missing })), "")) ?? [] }
          },
          modulePresence: (typeof __KVPV_V1_BUILD === "undefined" ? [] : __KVPV_V1_BUILD.modules ?? []).slice(0, 160).map(__captureESMFunction17(__esmLocal2810 = ((m) => ({ file: m.file, present: m.apis.filter(__captureESMFunction17(__esmLocal2910 = ((name) => W[name] != null), "")) })), "")),
          economy: economySnapshot(),
          bagOpenSession: getKVPV_BAG_OPEN_SESSION()?.status?.() ?? null,
          bagInspection: actor === "10158939833447" ? __captureESMFunction17(__esmLocal3010 = (() => {
            try {
              const bag = W._Ba?._Ic?._aQ?.ins, items = bag?.getItemsByBagType?.(0);
              return {
                at: Date.now(),
                ready: bag?.isBagInited === true,
                used: items?.length ?? null,
                free: bag?.getBagLeftNumById?.(0) ?? null,
                items: (items ?? []).slice(0, 240).map(__captureESMFunction17(__esmLocal3110 = ((item) => {
                  const cfg2 = W._ft?._mY?.ins?.getItemCfgById?.(item[0]);
                  return { id: item[0], count: item[1], uid: String(item[2]), name: str(cfg2?.[1]) };
                }), ""))
              };
            } catch (e) {
              return { error: str(e.message) };
            }
          }), "")() : null,
          hamsterAward: __captureESMFunction17(__esmLocal323 = (() => {
            try {
              const ns = W._Ba?.__1?.hamster_award, m = ns?._Z1?.instance, map = ns?.FitActIdToDatas ?? {};
              const active = Object.keys(map).map(Number).filter(__captureESMFunction17(__esmLocal3310 = ((id) => W._Ba?._IY?._BY?.ins?.getActIsOpen?.(id) === true), "")).slice(0, 16);
              const act = Number(m?.curActId), self = m?.getSelAwardInfo?.(act) ?? [], all = m?.getAllAwardInfo?.(act) ?? [];
              const probeKey = "__KVPV_HAMSTER_AWARD_READ_DIAG", probe = W[probeKey] ?? (W[probeKey] = { actor, at: null, reply: null });
              const socket = W._v?.ins ?? W._y?.Socket?.ins;
              if (probe.transport?.finished && Object.hasOwn(m ?? {}, "initAllAwardInfo") && typeof Object.getPrototypeOf(m)?.initAllAwardInfo === "function" && String(m.initAllAwardInfo).includes("probe.reply=")) delete m.initAllAwardInfo;
              const protocol = W._ngr ?? (typeof _ngr === "object" ? _ngr : null);
              const schemas = {};
              for (const code of ["TXHy", "TBkK", "TqgA", "TusK", "T0Jj"]) {
                const type = protocol?.get_pbtype?.(code);
                schemas[code] = { exists: !!type, fields: Array.isArray(type?.fieldsArray) ? type.fieldsArray.map(__captureESMFunction17(__esmLocal3410 = ((f) => ({ name: f.name, id: f.id, type: f.type, rule: f.rule })), "")).slice(0, 8) : [] };
              }
              const eventModel = W._Ba?._IY?._BY?.ins, parent = Number(map[act]?.[2]);
              const eventTiming = [act, parent, act - 100, parent - 100].filter(__captureESMFunction17(__esmLocal353 = ((id) => id > 0), "")).map(__captureESMFunction17(__esmLocal3610 = ((id) => ({ id, open: eventModel?.getActIsOpen?.(id), openByTime: eventModel?.getActIsOpenByEndTime?.(id), calOpen: eventModel?.getActIsOpenByCalTime?.(id), raw: Array.isArray(eventModel?._NYi?.[id]) ? eventModel._NYi[id].slice(0, 7) : null, round: eventModel?.getActRound?.(id), serverDay: eventModel?.getActSerDay?.(id) })), ""));
              const configRows = W._ft?.FestHamsterAllAward?.ins?.originCfg ?? [];
              const configGroups = {};
              for (const row of configRows) {
                const group = String(Math.floor(Number(row?.[0]) / 1e5));
                configGroups[group] = (configGroups[group] ?? 0) + 1;
              }
              const cfg2 = __captureESMFunction17(__esmLocal3710 = ((api33, list) => ({ count: api33?.originCfg?.length ?? null, missing: list.filter(__captureESMFunction17(__esmLocal387 = ((r) => !api33?.getCfgById?.(Number(r?.[0]))), "")).map(__captureESMFunction17(__esmLocal396 = ((r) => Number(r?.[0])), "")).slice(0, 20) })), "cfg");
              return { act, active, serverTime: Number(W._Sa?.svrTime), eventTiming, parentMapping: W._Ba?.__1?.hamster?.FitActIdToDatas?.[parent] ?? null, schemas, configGroups, configSample: configRows.filter(__captureESMFunction17(__esmLocal402 = ((r) => Math.floor(Number(r?.[0]) / 1e5) === Math.floor(Number(self[0]?.[0]) / 1e5)), "")).slice(0, 3), queryAt: probe.at, allReply: probe.reply, queueTrace: probe.queueTrace ?? null, transport: probe.transport ?? null, socketAvailable: !!socket, handlers: { self: typeof socket?._P?.TBkK === "function", all: typeof socket?._P?.TusK === "function" }, allEventKeys: Object.keys(m?._zZh ?? {}).slice(0, 20), mapping: map[act] ?? null, self: self.slice(0, 25), all: all.slice(0, 25), selfCfg: cfg2(W._ft?.FestHamsterSelfAward?.ins, self), allCfg: cfg2(W._ft?.FestHamsterAllAward?.ins, all) };
            } catch (e) {
              return { error: str(e.message) };
            }
          }), "")(),
          dailyPbBoss: getKVPV_PB_BOSS_DAILY()?.status?.() ?? null,
          allowKNB: false
        };
        cached.redDotHealth = redDotHealth;
        cached.redDotCatalog = redDotCatalog;
        cached.combatStall = combatStall;
        cached.nativeSkillRotation = nativeSkillRotation;
        at = Date.now();
        return cached;
      }
      __esmLocal610 = snapshot;
      W.KVPV_EXECUTOR_REPORT = Object.freeze({ snapshot });
    }), "")();
  }
  var api20 = Object.freeze({
    get KVPV_EXECUTOR_REPORT() {
      return globalThis.KVPV_EXECUTOR_REPORT;
    }
  });

  // esm/modules/43-context-brain.mjs
  function __captureESMFunction18(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal017;
  var __esmLocal121;
  var __esmLocal248;
  function initialize19() {
    __captureESMFunction18(__esmLocal017 = (() => {
      "use strict";
      const W = window, actor = String(W.__KVPV_OWN_ACTOR_ID || "");
      const profileKey = "KVPV_CONTEXT_BRAIN_PROFILE_V1:" + encodeURIComponent(actor);
      const maxContexts = 1e3, maxActionsPerContext = 30, maxProfileChars = 2e6;
      const profileState = { status: "not_loaded", error: "" };
      let savedProfile = null, profileLoaded = false;
      const autoPve = { enabled: false, timer: null, startedAt: 0, ownedStage: false, attempts: 0, reason: "starting", lastError: "" };
      const stageProgress = { key: "", map: null, level: null, samples: 0, lastChangeAt: 0, completed: 0, mapChanges: 0 };
      function observeStageProgress(now = Date.now()) {
        const stage = W._Ba?._Co?._Mo?.ins;
        if (stage?.auto !== true) {
          stageProgress.key = "";
          stageProgress.samples = 0;
          return;
        }
        const map = Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]), level = Number(stage.curLv);
        if (!Number.isSafeInteger(map) || map < 1 || !Number.isSafeInteger(level) || level < 1) return;
        const key = map + ":" + level;
        if (!stageProgress.key) {
          stageProgress.key = key;
          stageProgress.map = map;
          stageProgress.level = level;
          stageProgress.samples = 1;
          stageProgress.lastChangeAt = now;
          return;
        }
        if (key !== stageProgress.key) {
          if (map === stageProgress.map && level > stageProgress.level) stageProgress.completed += level - stageProgress.level;
          if (map !== stageProgress.map) stageProgress.mapChanges++;
          stageProgress.key = key;
          stageProgress.map = map;
          stageProgress.level = level;
          stageProgress.samples = 1;
          stageProgress.lastChangeAt = now;
          return;
        }
        stageProgress.samples = Math.min(1e6, stageProgress.samples + 1);
      }
      function progressSnapshot(now = Date.now()) {
        const stage = W._Ba?._Co?._Mo?.ins, active = stage?.auto === true && !!stageProgress.key;
        const unchangedMs = active ? Math.max(0, now - stageProgress.lastChangeAt) : 0;
        return {
          active,
          map: active ? stageProgress.map : null,
          level: active ? stageProgress.level : null,
          samples: active ? stageProgress.samples : 0,
          unchangedMs,
          possibleStall: active && stageProgress.samples >= 4 && unchangedMs >= 6e4,
          confidence: "low",
          completedStages: stageProgress.completed,
          mapChanges: stageProgress.mapChanges
        };
      }
      function autoPveStatus() {
        const daily = getKVPV_DAILY(), stage = W._Ba?._Co?._Mo?.ins;
        return {
          enabled: autoPve.enabled,
          scope: "native_stage_progression_only",
          executor: "KVPV_DAILY.tuVuotIdle",
          ownedStage: autoPve.ownedStage,
          gameAuto: stage?.auto === true,
          attempts: autoPve.attempts,
          startedAt: autoPve.startedAt || null,
          reason: autoPve.reason,
          lastError: autoPve.lastError,
          controllerEnabled: daily?.tuVuotCanRun?.() === true,
          progress: progressSnapshot()
        };
      }
      function autoPveTick() {
        if (!autoPve.enabled) return autoPveStatus();
        const daily = getKVPV_DAILY();
        try {
          if (!actor || actor !== String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") || W.__KVPV_UNIVERSAL_HALTED) {
            autoPve.reason = "actor_or_session";
            return autoPveStatus();
          }
          if (W._Ba?._rJ?._O$?.ins?.isDead === true) {
            autoPve.reason = "actor_dead";
            return autoPveStatus();
          }
          observeStageProgress();
          if (getKVPV_ENTRY_POLICY()?.manual === true) {
            autoPve.reason = "manual_entry_policy";
            return autoPveStatus();
          }
          if (Date.now() < Number(W.__KVPV_USER_UI_UNTIL || 0)) {
            autoPve.reason = "user_ui_active";
            return autoPveStatus();
          }
          if (W.KVPV?.stageGuard?.isLocked?.() === true) {
            autoPve.reason = "stage_manually_paused";
            return autoPveStatus();
          }
          if (getKVPV_RED_DOT_MODULE()?.ownsProgression?.() === true) {
            autoPve.reason = "red_dot_progression_owner";
            return autoPveStatus();
          }
          const eventHold = getKVPV_EVENT_PRIORITY()?.hold?.();
          if (eventHold) {
            autoPve.reason = "event_reservation_" + String(eventHold.key ?? "active");
            return autoPveStatus();
          }
          const scene = W.KVPV?.core?.scene;
          if (typeof scene?.can !== "function" || typeof scene?.acquire !== "function") {
            autoPve.reason = "scene_arbiter_unavailable";
            return autoPveStatus();
          }
          if (scene.can("stage") !== true) {
            autoPve.reason = String(scene.reason?.("stage") ?? "scene_reserved");
            return autoPveStatus();
          }
          if (daily?.tuVuotCanRun?.() !== true) {
            autoPve.reason = "stage_controller_disabled";
            return autoPveStatus();
          }
          if (typeof daily?.tuVuotIdle !== "function") throw Error("KVPV_DAILY.tuVuotIdle is unavailable");
          if (autoPve.ownedStage) {
            if (typeof daily.tuVuotProgressTick === "function") daily.tuVuotProgressTick();
            if (W._Ba?._Co?._Mo?.ins?.auto === true) {
              autoPve.reason = "native_stage_running";
              autoPve.lastError = "";
              return autoPveStatus();
            }
            autoPve.ownedStage = false;
          }
          if (daily.tuVuotIdle() === true) {
            autoPve.ownedStage = true;
            autoPve.attempts++;
            autoPve.reason = "native_stage_started";
          } else autoPve.reason = "waiting_native_stage_condition";
          autoPve.lastError = "";
        } catch (error) {
          autoPve.lastError = String(error?.message ?? error).slice(0, 200);
          autoPve.reason = "executor_error";
          console.error("[KVPV CONTEXT BRAIN] PvE executor tick failed:", error);
        }
        return autoPveStatus();
      }
      function startAutoPve({ resumeController = false } = {}) {
        if (autoPve.enabled) return autoPveStatus();
        if (!actor || actor !== String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") || W.__KVPV_UNIVERSAL_HALTED)
          return { ...autoPveStatus(), enabled: false, reason: "actor_or_session" };
        const daily = getKVPV_DAILY();
        if (resumeController && daily?.tuVuotCanRun?.() !== true) {
          if (typeof daily?.tuVuotStart !== "function") return { ...autoPveStatus(), reason: "stage_controller_unavailable" };
          daily.tuVuotStart();
        }
        const schedule = getKVPV_V1()?.timers?.setInterval ?? W.setInterval;
        if (typeof schedule !== "function") return { ...autoPveStatus(), reason: "timer_unavailable" };
        autoPve.enabled = true;
        autoPve.startedAt = Date.now();
        autoPve.reason = "starting";
        autoPve.lastError = "";
        try {
          autoPve.timer = schedule(autoPveTick, 1e3);
        } catch (error) {
          autoPve.enabled = false;
          autoPve.startedAt = 0;
          autoPve.reason = "timer_error";
          autoPve.lastError = String(error?.message ?? error).slice(0, 200);
          console.error("[KVPV CONTEXT BRAIN] Cannot start PvE scheduler:", error);
          return autoPveStatus();
        }
        autoPveTick();
        return autoPveStatus();
      }
      function stopAutoPve() {
        if (autoPve.timer !== null) {
          const cancel = getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval;
          if (typeof cancel !== "function") throw Error("PvE brain timer cannot be cancelled");
          cancel(autoPve.timer);
          autoPve.timer = null;
        }
        if (autoPve.ownedStage) {
          const daily = getKVPV_DAILY();
          if (typeof daily?.tuVuotStop !== "function") throw Error("Owned native stage controller cannot be stopped");
          daily.tuVuotStop();
          autoPve.ownedStage = false;
        }
        autoPve.enabled = false;
        autoPve.startedAt = 0;
        autoPve.reason = "stopped";
        return autoPveStatus();
      }
      function initializeAutoPve() {
        if (!actor || actor !== String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") || W.__KVPV_UNIVERSAL_HALTED) return;
        startAutoPve();
      }
      function blankProfile() {
        return { version: 1, actor, updatedAt: 0, contexts: [] };
      }
      function storageError(status2, error) {
        profileState.status = status2;
        profileState.error = String(error?.message ?? error ?? status2).slice(0, 200);
        console.warn("[KVPV CONTEXT BRAIN] profile storage " + status2 + ": " + profileState.error);
      }
      function validProfile(value) {
        if (!value || typeof value !== "object" || Array.isArray(value) || value.version !== 1 || value.actor !== actor || !Array.isArray(value.contexts) || value.contexts.length > maxContexts) return false;
        return value.contexts.every((c) => c && typeof c === "object" && !Array.isArray(c) && Number.isSafeInteger(c.map) && c.map > 0 && typeof c.target === "string" && c.target.length <= 80 && typeof c.activity === "string" && c.activity.length <= 40 && typeof c.job === "string" && c.job.length <= 40 && Number.isSafeInteger(c.observations) && c.observations >= 0 && Number.isFinite(c.lastObservedAt) && Array.isArray(c.actions) && c.actions.length <= maxActionsPerContext && c.actions.every((a) => a && typeof a === "object" && Number.isSafeInteger(a.panel) && a.panel >= 0 && typeof a.kind === "string" && a.kind.length <= 32 && Number.isSafeInteger(a.seen) && a.seen >= 0 && Number.isSafeInteger(a.ready) && a.ready >= 0 && a.ready <= a.seen && Number.isFinite(a.lastSeen)));
      }
      function loadProfile() {
        if (profileLoaded) return savedProfile;
        if (!actor) {
          storageError("unavailable", "actor identity is unavailable");
          profileLoaded = true;
          return null;
        }
        try {
          const storage = W.localStorage;
          if (typeof storage?.getItem !== "function") {
            storageError("unavailable", "localStorage.getItem is not available");
            profileLoaded = true;
            return null;
          }
          const raw = storage.getItem(profileKey);
          if (raw === null) {
            savedProfile = blankProfile();
            profileState.status = "ready";
            profileState.error = "";
            profileLoaded = true;
            return savedProfile;
          }
          if (typeof raw !== "string" || raw.length > maxProfileChars) {
            storageError("corrupt", "stored profile exceeds its size limit");
            profileLoaded = true;
            return null;
          }
          const parsed = JSON.parse(raw);
          if (!validProfile(parsed)) {
            storageError("corrupt", "stored profile failed validation");
            profileLoaded = true;
            return null;
          }
          savedProfile = parsed;
          profileState.status = "ready";
          profileState.error = "";
          profileLoaded = true;
          return savedProfile;
        } catch (error) {
          storageError("error", error);
          profileLoaded = true;
          return null;
        }
      }
      function persistProfile() {
        if (!savedProfile || profileState.status === "corrupt" || profileState.status === "error" || profileState.status === "unavailable") return false;
        try {
          const storage = W.localStorage;
          if (typeof storage?.setItem !== "function") throw Error("localStorage.setItem is not available");
          storage.setItem(profileKey, JSON.stringify(savedProfile));
          profileState.status = "ready";
          profileState.error = "";
          return true;
        } catch (error) {
          storageError("error", error);
          return false;
        }
      }
      function profileSnapshot() {
        const data = loadProfile();
        return {
          enabled: true,
          status: profileState.status,
          error: profileState.error,
          actorScoped: true,
          maxContexts,
          maxActionsPerContext,
          contexts: data ? data.contexts.map((c) => ({ ...c, actions: c.actions.map((a) => ({ ...a })) })) : []
        };
      }
      function clearProfile() {
        try {
          if (!actor) throw Error("actor identity is unavailable");
          const storage = W.localStorage;
          if (typeof storage?.removeItem !== "function") throw Error("localStorage.removeItem is not available");
          storage.removeItem(profileKey);
          savedProfile = blankProfile();
          profileLoaded = true;
          profileState.status = "ready";
          profileState.error = "";
          return { ok: true, profile: profileSnapshot() };
        } catch (error) {
          storageError("error", error);
          return { ok: false, status: profileState.status, error: profileState.error };
        }
      }
      function activity() {
        if (!actor || actor !== String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") || W.__KVPV_UNIVERSAL_HALTED) return { kind: "UNAVAILABLE", direct: false, reason: "actor_or_session" };
        if (W._Ba?._rJ?._O$?.ins?.isDead === true) return { kind: "DEAD", direct: false, reason: "wait_revive" };
        const q = getKVPV_DAILY()?.quickState?.();
        if (["entering", "exiting", "matching", "result"].includes(q?.step)) return { kind: "TRANSITION", direct: false, reason: q.step };
        const ui = W._ft?._Y4n?.ins, Type = W._Ba?._We?._p9i, p = ui?.getPanelById?.(297), m = W._Ba?._We?._eJ?.inst;
        const mission = W._Ba?._$a?._yo?.ins?.isInMission === true;
        if (mission && typeof Type === "function" && p instanceof Type && p.parent && p.visible !== false && ui?.isOpened?.(297) === true && Number(m?.cpInfo?.[0]) > 0)
          return { kind: "TRAN_MA", direct: q?.running === true, reason: "native_panel_and_active_timer", remainingMs: Number(m.cpInfo[0]), damage: String(m.ht ?? "").slice(0, 80) };
        if (q?.running === true && q.step === "fighting") return { kind: "DAILY_FIGHT", direct: true, reason: String(q.job ?? "").slice(0, 80) };
        if (!mission && W._Ba?._$a?.SceneUtil?.isCommonScene === true) return { kind: "COMMON", direct: false, reason: "idle_rules_apply" };
        return { kind: "OTHER_MAP", direct: false, reason: "use_existing_combat_scope_rules" };
      }
      __esmLocal121 = activity;
      function buildPlan(record) {
        const context = activity(), eye = getKVPV_WORLD_EYE()?.status?.(), actions = [], profile = loadProfile();
        for (const a of (eye?.actions ?? []).slice(0, 80)) actions.push({
          panel: a.panel,
          key: a.key,
          kind: a.kind,
          decision: a.kind === "manual_control" ? "manual_only" : a.kind === "paid_or_currency" ? "blocked_currency" : a.kind === "unknown" ? "inspect_only" : !a.ready ? "wait_native_condition" : a.kind === "navigate" && context.kind !== "COMMON" ? "defer_until_activity_finishes" : "ready_for_review"
        });
        const learned = /* @__PURE__ */ new Map();
        const map = Number(W._C?._Mn?._Cn?.currentID ?? W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
        const job = String(getKVPV_DAILY()?.quickState?.()?.job ?? "").slice(0, 40);
        const role = W._C?._Ba?.instance?.getRole?.(Number(actor));
        const target = role?.getComponent?.(W._d?._Yct?._Het)?.target;
        const targetType = Number(target?.property?.get?.("type"));
        const targetId = targetType === 1 ? String(target?.property?.get?.("id") ?? target?.id ?? "").slice(0, 80) : "";
        const stableContext = Number.isSafeInteger(map) && map > 0 && targetType !== 4 && context.kind !== "UNAVAILABLE" && context.kind !== "TRANSITION" && context.kind !== "DEAD";
        const currentProfile = profile && stableContext ? profile.contexts.find((c) => c.map === map && c.target === targetId && c.activity === context.kind && c.job === job) : null;
        for (const a of currentProfile?.actions ?? []) learned.set(a.panel + ":" + a.kind, a);
        for (const a of actions) {
          const panel = Number(a.panel), history = Number.isSafeInteger(panel) ? learned.get(panel + ":" + String(a.kind)) : null;
          a.history = { observations: history?.seen ?? 0, readyRate: history?.seen ? history.ready / history.seen : null };
        }
        const priority = { ready_for_review: 4, wait_native_condition: 3, defer_until_activity_finishes: 2, inspect_only: 1, manual_only: 0, blocked_currency: 0 };
        actions.sort((a, b) => (priority[b.decision] ?? 1) - (priority[a.decision] ?? 1) || (b.history.observations >= 3 ? b.history.readyRate ?? 0 : -1) - (a.history.observations >= 3 ? a.history.readyRate ?? 0 : -1));
        if (record && profile && stableContext) {
          let entry = profile.contexts.find((c) => c.map === map && c.target === targetId && c.activity === context.kind && c.job === job);
          if (!entry) {
            entry = { map, target: targetId, activity: context.kind, job, observations: 0, lastObservedAt: 0, actions: [] };
            profile.contexts.push(entry);
          }
          entry.observations = Math.min(1e6, entry.observations + 1);
          entry.lastObservedAt = Date.now();
          for (const a of (eye?.actions ?? []).slice(0, 80)) {
            const panel = Number(a.panel), kind = String(a.kind ?? "").slice(0, 32);
            if (!Number.isSafeInteger(panel) || panel < 0 || !kind) continue;
            let seen = entry.actions.find((x) => x.panel === panel && x.kind === kind);
            if (!seen) {
              seen = { panel, kind, seen: 0, ready: 0, lastSeen: 0 };
              entry.actions.push(seen);
            }
            seen.seen = Math.min(1e6, seen.seen + 1);
            if (a.ready === true) seen.ready = Math.min(seen.seen, seen.ready + 1);
            seen.lastSeen = entry.lastObservedAt;
          }
          entry.actions.sort((a, b) => b.lastSeen - a.lastSeen);
          entry.actions = entry.actions.slice(0, maxActionsPerContext);
          profile.contexts = profile.contexts.filter((c) => c !== entry);
          profile.contexts.unshift(entry);
          profile.contexts = profile.contexts.slice(0, maxContexts);
          profile.updatedAt = entry.lastObservedAt;
          persistProfile();
        }
        return { context, profile: profileSnapshot(), autoPve: autoPveStatus(), policy: {
          automation: "auto_existing_pve",
          executorCalls: "verified_native_stage_controller_only",
          gameCommands: "existing_native_controller_only",
          automaticNavigation: false,
          keepCurrentActivity: context.kind !== "COMMON",
          directRewardsAndUpgrades: context.direct,
          noKNB: true,
          unknownActions: "inspect_only",
          sceneChanges: "recommend_only"
        }, actions };
      }
      function plan() {
        return buildPlan(true);
      }
      function status() {
        return buildPlan(false);
      }
      __esmLocal248 = plan;
      W.KVPV_CONTEXT_BRAIN = Object.freeze({
        activity,
        plan,
        status,
        profile: profileSnapshot,
        clearProfile,
        startAutoPve: () => startAutoPve({ resumeController: true }),
        stopAutoPve,
        autoPveStatus
      });
      initializeAutoPve();
    }), "")();
  }
  var api21 = Object.freeze({
    get KVPV_CONTEXT_BRAIN() {
      return globalThis.KVPV_CONTEXT_BRAIN;
    }
  });

  // esm/modules/99-z-pb-boss-daily.mjs
  function __captureESMFunction19(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal018;
  var __esmLocal150;
  function initialize20() {
    __captureESMFunction19(__esmLocal018 = (() => {
      "use strict";
      window.KVPV_PB_BOSS_DAILY = Object.freeze({
        status: __captureESMFunction19(__esmLocal150 = (() => ({ enabled: false, reason: "red-dot-only; legacy daily profile disabled", allowKNB: false })), "status")
      });
    }), "")();
  }
  var api22 = Object.freeze({
    get KVPV_PB_BOSS_DAILY() {
      return globalThis.KVPV_PB_BOSS_DAILY;
    }
  });

  // esm/modules/07-tuyet-hoc.mjs
  function __captureESMFunction20(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal019;
  var __esmLocal151;
  var __esmLocal249;
  var __esmLocal324;
  var __esmLocal413;
  var __esmLocal512;
  var __esmLocal611;
  var __esmLocal712;
  var __esmLocal812;
  var __esmLocal912;
  var __esmLocal108;
  var __esmLocal1113;
  var __esmLocal1212;
  var __esmLocal1311;
  var __esmLocal1411;
  var __esmLocal1510;
  var __esmLocal1611;
  var __esmLocal1711;
  var __esmLocal1811;
  var __esmLocal1911;
  var __esmLocal2011;
  var __esmLocal2111;
  var __esmLocal2211;
  var __esmLocal2311;
  var __esmLocal2410;
  var __esmLocal254;
  var __esmLocal2611;
  var __esmLocal2711;
  function initialize21() {
    __captureESMFunction20(__esmLocal019 = (() => {
      "use strict";
      const W = window, NAME = "KVPV_TH_FAR", TAG = "[TH-FAR V12.9.5]";
      try {
        W[NAME]?.stop?.("reload");
      } catch (_) {
        getKVPV_V1()?.diagnostics?.record(_);
      }
      const actorId = String(W.__KVPV_OWN_ACTOR_ID || "");
      const Comp = W._d?._Yct?._Het, Sel = W._d?._Yct?._Eet, Mov = W._d?._Yct?._zet;
      if (!actorId || !Comp || !Sel || !Mov || !getKVPV_HITRUN1()?.status) {
        console?.warn?.(TAG, "Ch\u01B0a s\u1EB5n s\xE0ng trong game-frame");
        return;
      }
      const TH = /* @__PURE__ */ new Set([1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008]);
      const CFG = {
        goal: 280.4,
        tolerance: 0.45,
        moveIntervalMs: 1500,
        scanMs: 500,
        closeGuard: 330,
        warnNoHitMs: 25e3
      };
      const S = {
        running: false,
        stopped: false,
        selector: null,
        combat: null,
        target: null,
        owner: {},
        bossId: "",
        bossName: "",
        lastTarget: "",
        selectorChoices: 0,
        blockedBasics: 0,
        blockedOther: 0,
        allowedTH: 0,
        confirmedTH: 0,
        noReady: 0,
        moves: 0,
        skips: 0,
        lastMoveAt: 0,
        lastHitAt: 0,
        startedAt: 0,
        lastDistance: null,
        lastHitDistance: null,
        lastReason: "off",
        lastError: "",
        hookChanges: 0,
        interval: null,
        seenIds: /* @__PURE__ */ new Set(),
        history: []
      };
      function prop(o, k) {
        try {
          return o?.property?.get?.(k) ?? null;
        } catch (_) {
          return null;
        }
      }
      __esmLocal151 = prop;
      const rid = __captureESMFunction20(__esmLocal249 = ((o) => String(prop(o, "id") ?? o?.id ?? "")), "rid");
      function point(o) {
        const p = prop(o, "position");
        if (!p) return null;
        const x = Number(p.x), y = Number(p.y);
        return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
      }
      __esmLocal324 = point;
      function current() {
        const w = W._C?._Ba?.instance;
        const a = w?.getRole?.(Number(actorId)) || w?.getRole?.(actorId) || null;
        return {
          a,
          selector: a?.getComponent?.(Sel),
          combat: a?.getComponent?.(Comp),
          mover: a?.getComponent?.(Mov)
        };
      }
      __esmLocal413 = current;
      function stageOcc() {
        try {
          const lv = Number(W._Ba?._Co?._Mo?.ins?.curLv);
          const t = W._ft?._h$?.ins;
          const c = t?.getCfgByLv?.(lv);
          const n = c ? Number(t.occ(c, lv)) : NaN;
          return Number.isSafeInteger(n) && n > 0 ? n : null;
        } catch (_) {
          return null;
        }
      }
      __esmLocal512 = stageOcc;
      function sceneOk(c) {
        const t = c?.combat?.target;
        if (!t || t.isValid === false || Number(prop(t, "type")) !== 1) return false;
        const stage = stageOcc();
        return stage !== null && Number(prop(t, "occ")) === stage;
      }
      __esmLocal611 = sceneOk;
      function log(type, detail = "") {
        S.history.push({ at: Date.now(), type, detail });
        if (S.history.length > 35) S.history.shift();
      }
      __esmLocal712 = log;
      function restore(link) {
        if (!link) return;
        const { obj, key, wrapper, own } = link;
        if (obj[key] !== wrapper) {
          S.lastError = "Another hook replaced " + key + "; not overwriting";
          return;
        }
        try {
          if (own) Object.defineProperty(obj, key, own);
          else delete obj[key];
        } catch (e) {
          S.lastError = "Cannot restore " + key + ": " + String(e);
        }
      }
      __esmLocal812 = restore;
      function hook(obj, key, fn) {
        if (typeof obj?.[key] !== "function") return null;
        const own = Object.getOwnPropertyDescriptor(obj, key);
        if (own && own.configurable === false) return null;
        const before = obj[key];
        const wrapper = fn(before);
        Object.defineProperty(obj, key, {
          configurable: true,
          writable: true,
          enumerable: own?.enumerable ?? false,
          value: wrapper
        });
        return { obj, key, own, wrapper };
      }
      __esmLocal912 = hook;
      function unbind() {
        restore(S.selector);
        restore(S.combat);
        S.selector = null;
        S.combat = null;
      }
      __esmLocal108 = unbind;
      function bind(c) {
        if (S.selector?.obj === c.selector && S.combat?.obj === c.combat && S.selector?.obj?._f7t === S.selector?.wrapper && S.combat?.obj?.combat === S.combat?.wrapper) return true;
        unbind();
        const sh = hook(c.selector, "_f7t", __captureESMFunction20(__esmLocal1212 = ((native) => __captureESMFunction20(__esmLocal1311 = (function(active, common, mode) {
          if (!S.running || this !== c.selector || mode !== 1 || !sceneOk(current()) || !Array.isArray(active))
            return native.apply(this, arguments);
          const a = active.filter(__captureESMFunction20(__esmLocal1411 = ((r) => TH.has(Number(r?.[0]))), ""));
          const b = Array.isArray(common) ? common.filter(__captureESMFunction20(__esmLocal1510 = ((r) => TH.has(Number(r?.[0]))), "")) : [];
          const chosen = native.call(this, a, b, mode);
          if (TH.has(Number(chosen))) {
            S.selectorChoices++;
            S.seenIds.add(Number(chosen));
          } else S.noReady++;
          return TH.has(Number(chosen)) ? chosen : -1;
        }), "")), ""));
        if (!sh) {
          S.lastError = "Cannot hook native skill selector";
          return false;
        }
        const ch = hook(c.combat, "combat", __captureESMFunction20(__esmLocal1611 = ((native) => __captureESMFunction20(__esmLocal1711 = (function(skillId) {
          if (S.running && this === c.combat && sceneOk(current())) {
            const id = Number(skillId);
            if (id === -1) return void 0;
            if (!TH.has(id)) {
              if (id >= 8001 && id <= 8009) S.blockedBasics++;
              else S.blockedOther++;
              return void 0;
            }
            S.allowedTH++;
          }
          return native.apply(this, arguments);
        }), "")), ""));
        if (!ch) {
          restore(sh);
          S.lastError = "Cannot hook native combat";
          return false;
        }
        S.selector = sh;
        S.combat = ch;
        S.hookChanges++;
        log("HOOK", "actor main combat + main selector");
        return true;
      }
      __esmLocal1113 = bind;
      function detachTarget() {
        if (S.target) {
          try {
            S.target.off?.(1012, S.owner, onHit);
          } catch (_) {
            getKVPV_V1()?.diagnostics?.record(_);
          }
        }
        S.target = null;
        S.bossId = "";
        S.bossName = "";
      }
      __esmLocal1811 = detachTarget;
      function onHit(source, marker, damage, flags, receiver) {
        if (!S.running || String(source) !== actorId || String(receiver) !== S.bossId) return;
        const raw = Number(marker), id = raw / 1e4, f = Number(flags) || 0;
        if (!Number.isSafeInteger(raw) || raw % 1e4 !== 0 || !TH.has(id) || !(Number(damage) > 0) || f & (4 | 16 | 32 | 128 | 256)) return;
        S.confirmedTH++;
        S.lastHitAt = Date.now();
        const c = current(), a = point(c.a), b = point(S.target);
        S.lastHitDistance = a && b ? +Math.hypot(a.x - b.x, a.y - b.y).toFixed(1) : null;
        log("HIT", { skillId: id, distance: S.lastHitDistance });
      }
      __esmLocal1911 = onHit;
      function attachTarget(t) {
        if (S.target === t) return;
        detachTarget();
        if (!t || !rid(t)) return;
        S.target = t;
        S.bossId = rid(t);
        S.bossName = String(prop(t, "name") || "Boss");
        try {
          t.on?.(1012, S.owner, onHit);
        } catch (e) {
          S.lastError = "Hit listener: " + String(e);
        }
      }
      __esmLocal2011 = attachTarget;
      function tick() {
        if (!S.running) return;
        try {
          if (String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") !== actorId || W.__KVPV_UNIVERSAL_HALTED) {
            stop("actor/session change");
            return;
          }
          const c = current();
          if (!c.a || !c.combat || !c.selector || !c.mover) {
            S.lastReason = "no_live_components";
            return;
          }
          if (!bind(c)) {
            S.lastReason = "hook_failed";
            return;
          }
          if (!sceneOk(c)) {
            detachTarget();
            S.lastReason = "not_tianquan";
            return;
          }
          attachTarget(c.combat.target);
          if (getKVPV_MODE()?.status?.(false)?.mode !== "BOSS_TH") {
            S.lastReason = "mode_not_boss_th";
            return;
          }
          const hr = getKVPV_HITRUN1()?.status?.(false);
          if (!hr?.running || hr.phase !== "FIGHT") {
            S.lastReason = "hitrun_" + (hr?.phase || "off");
            return;
          }
          if (Number(hr.hpPct) < Math.max(48, Number(hr.leavePct || 35) + 10)) {
            S.lastReason = "low_hp";
            return;
          }
          if (W.document?.hidden) {
            S.lastReason = "tab_background";
            return;
          }
          const next = getKVPV_V127_BASIC()?.status?.(false)?.nextImpactInMs;
          if (Number.isFinite(next) && next >= -100 && next <= 1350) {
            S.lastReason = "dodge_soon";
            return;
          }
          const a = point(c.a), b = point(c.combat.target);
          if (!a || !b) {
            S.lastReason = "position_missing";
            return;
          }
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          S.lastDistance = +d.toFixed(2);
          if (!Number.isFinite(d) || d < 1) {
            S.lastReason = "overlap";
            return;
          }
          if (Math.abs(d - CFG.goal) <= CFG.tolerance) {
            S.lastReason = "holding_far";
            return;
          }
          if (d > CFG.closeGuard) {
            S.lastReason = "native_approach";
            return;
          }
          if (Date.now() - S.lastMoveAt < CFG.moveIntervalMs) {
            S.lastReason = "move_cooldown";
            return;
          }
          if (typeof c.mover.moveTo !== "function") {
            S.lastReason = "no_mover";
            return;
          }
          const x = b.x + dx / d * CFG.goal, y = b.y + dy / d * CFG.goal;
          if (!Number.isFinite(x) || !Number.isFinite(y)) return;
          c.mover.moveTo(x, y);
          S.lastMoveAt = Date.now();
          S.moves++;
          S.lastReason = d < CFG.goal ? "move_out" : "move_in";
        } catch (e) {
          S.lastError = String(e?.message || e);
          S.lastReason = "error";
        }
      }
      __esmLocal2111 = tick;
      function status(show = true) {
        const c = current();
        const ids = [];
        for (const rows of [c.selector?._rtt, c.selector?._wet]) if (Array.isArray(rows)) {
          for (const row of rows) if (TH.has(Number(row?.[0]))) ids.push(Number(row[0]));
        }
        const out = {
          version: "12.9.5",
          enabled: S.running,
          modeControl: "KVPV_MODE",
          goalDistance: CFG.goal,
          measuredDistance: S.lastDistance,
          availableTuyetHoc: [...new Set(ids)].sort(__captureESMFunction20(__esmLocal2311 = ((a, b) => a - b), "")),
          selectedTuyetHoc: [...S.seenIds].sort(__captureESMFunction20(__esmLocal2410 = ((a, b) => a - b), "")),
          allowedTH: S.allowedTH,
          confirmedTH: S.confirmedTH,
          blockedBasics: S.blockedBasics,
          blockedOther: S.blockedOther,
          cooldownNoReady: S.noReady,
          moves: S.moves,
          boss: S.bossName || null,
          lastHitDistance: S.lastHitDistance,
          lastReason: S.lastReason,
          lastError: S.lastError,
          selectorHooked: !!S.selector && S.selector.obj._f7t === S.selector.wrapper,
          combatHooked: !!S.combat && S.combat.obj.combat === S.combat.wrapper,
          note: ids.length ? "Only 1001..1008 from native selector; when cooling down NO basic fallback. Server hit range unchanged." : "No native Tuyet Hoc 1001..1008 in current selector; waits without basic attacks. Check game skill configuration."
        };
        if (show) console.table([out]);
        return out;
      }
      __esmLocal2211 = status;
      function start() {
        if (S.stopped) throw Error("B\u1EA3n n\xE0y \u0111\xE3 stop v\u0129nh vi\u1EC5n, c\u1EA7n F5 n\u1EA1p l\u1EA1i");
        if (S.running) return status(false);
        if (String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") !== actorId) throw Error("Sai nh\xE2n v\u1EADt");
        S.running = true;
        S.startedAt = Date.now();
        S.lastReason = "starting";
        S.interval = (getKVPV_V1()?.timers?.setInterval ?? W.setInterval)(tick, CFG.scanMs);
        tick();
        return status(false);
      }
      __esmLocal254 = start;
      function stop(reason = "user stop") {
        S.running = false;
        if (S.interval !== null) {
          (getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval)(S.interval);
          S.interval = null;
        }
        unbind();
        detachTarget();
        S.lastReason = reason;
        log("STOP", reason);
        return status(false);
      }
      __esmLocal2611 = stop;
      const api33 = { start, stop, status, history: __captureESMFunction20(__esmLocal2711 = (() => S.history.slice()), "history") };
      W[NAME] = api33;
      console?.info?.(TAG, 'READY/OFF. Ch\u1EA1y KVPV_MODE.start("BOSS_TH") \u0111\u1EC3 ch\u1EC9 x\u1EA3 Tuy\u1EC7t H\u1ECDc \u1EDF xa.');
    }), "")();
  }
  var api23 = Object.freeze({});

  // esm/modules/07-th300-hitrun-compat.mjs
  var api24 = Object.freeze({
    get KVPV_HITRUN1() {
      return globalThis.KVPV_HITRUN1;
    },
    get KVPV_HITRUN_AUTO() {
      return globalThis.KVPV_HITRUN_AUTO;
    }
  });
  function call_KVPV_HITRUN1_start(...args) {
    const target = globalThis.KVPV_HITRUN1;
    const fn = target?.start;
    if (typeof fn !== "function") throw Error("KVPV_HITRUN1.start is not available");
    return Reflect.apply(fn, target, args);
  }
  function call_KVPV_HITRUN1_stop(...args) {
    const target = globalThis.KVPV_HITRUN1;
    const fn = target?.stop;
    if (typeof fn !== "function") throw Error("KVPV_HITRUN1.stop is not available");
    return Reflect.apply(fn, target, args);
  }
  function call_KVPV_HITRUN1_status(...args) {
    const target = globalThis.KVPV_HITRUN1;
    const fn = target?.status;
    if (typeof fn !== "function") throw Error("KVPV_HITRUN1.status is not available");
    return Reflect.apply(fn, target, args);
  }
  function call_KVPV_HITRUN_AUTO_rearm(...args) {
    const target = globalThis.KVPV_HITRUN_AUTO;
    const fn = target?.rearm;
    if (typeof fn !== "function") throw Error("KVPV_HITRUN_AUTO.rearm is not available");
    return Reflect.apply(fn, target, args);
  }
  function call_KVPV_HITRUN_AUTO_status(...args) {
    const target = globalThis.KVPV_HITRUN_AUTO;
    const fn = target?.status;
    if (typeof fn !== "function") throw Error("KVPV_HITRUN_AUTO.status is not available");
    return Reflect.apply(fn, target, args);
  }
  function call_KVPV_HITRUN_AUTO_stop(...args) {
    const target = globalThis.KVPV_HITRUN_AUTO;
    const fn = target?.stop;
    if (typeof fn !== "function") throw Error("KVPV_HITRUN_AUTO.stop is not available");
    return Reflect.apply(fn, target, args);
  }

  // esm/modules/09-modes.mjs
  function __captureESMFunction21(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal020;
  var __esmLocal1100;
  var __esmLocal250;
  var __esmLocal388;
  var __esmLocal414;
  var __esmLocal513;
  var __esmLocal612;
  var __esmLocal713;
  var __esmLocal813;
  var __esmLocal913;
  var __esmLocal109;
  var __esmLocal1114;
  var __esmLocal1213;
  var __esmLocal1312;
  var __esmLocal1412;
  var __esmLocal1511;
  var __esmLocal1612;
  var __esmLocal1712;
  var __esmLocal1812;
  var __esmLocal1912;
  var __esmLocal2012;
  var __esmLocal2113;
  var __esmLocal2212;
  var __esmLocal2312;
  function initialize22() {
    __captureESMFunction21(__esmLocal020 = (() => {
      "use strict";
      const W = window, TAG = "[KVPV V12.9.4 MODES]";
      const MODE = Object.freeze({ OFF: "OFF", BOSS: "BOSS", BOSS_TH: "BOSS_TH", BOSS_TH300: "BOSS_TH300", BOSS_TH300_SCAN: "BOSS_TH300_SCAN" });
      const initialActor = String(W.__KVPV_OWN_ACTOR_ID || W._Ba?._rJ?._O$?.ins?.actorId || "");
      const S = {
        mode: "OFF",
        reason: "Ch\u01B0a ch\u1ECDn mode",
        switches: 0,
        errors: 0,
        lastError: "",
        lastChangedAt: null,
        history: []
      };
      let scopedMode = null, mapTimer = null, towerAttempt = null, lastScopeKey = null, lastMaintenanceAt = -Infinity, lastTianQuanKey = null, lastTruAcquire = -Infinity, lastTowerRetryAt = -Infinity;
      const inFarMap = __captureESMFunction21(__esmLocal1100 = (() => (getKVPV_FAR_SCOPE() ?? getKVPV_TQ_SCOPE())?.inside?.() !== false), "inFarMap");
      const tqNoHeal = __captureESMFunction21(__esmLocal250 = (() => getKVPV_TQ_POSITION_ONLY()?.enabled === true && getKVPV_FAR_SCOPE()?.status?.()?.kind === "THIEN_QUAN"), "tqNoHeal");
      const tqDistance = __captureESMFunction21(__esmLocal388 = (() => Number(getKVPV_TQ_POSITION_ONLY()?.distance ?? 310)), "tqDistance");
      let entryMoveHook = null;
      function releaseEntryMove() {
        const h = entryMoveHook;
        if (h && h.m.moveTo === h.fn) {
          if (h.own) Object.defineProperty(h.m, "moveTo", h.own);
          else delete h.m.moveTo;
        }
        entryMoveHook = null;
      }
      __esmLocal414 = releaseEntryMove;
      function guardEntryMove() {
        const me = W._C?._Ba?.instance?.getRole?.(Number(initialActor)), m = me?.getComponent?.(W._d?._Yct?._zet);
        if (!m || typeof m.moveTo !== "function" || entryMoveHook?.m === m) return;
        releaseEntryMove();
        const own = Object.getOwnPropertyDescriptor(m, "moveTo"), native = m.moveTo;
        if (own && !own.configurable) return;
        const fn = __captureESMFunction21(__esmLocal612 = (function(x, y, ...args) {
          const scope = getKVPV_FAR_SCOPE()?.status?.(), hr = getKVPV_HITRUN1()?.status?.(false);
          const target = me?.getComponent?.(W._d?._Yct?._Het)?.target, hp = me?.property?.get?.("hp");
          const a = me?.property?.get?.("position"), b = target?.property?.get?.("position"), entryGoal = tqDistance();
          if (scopedMode && valid() && scope?.inside && scope.kind === "THIEN_QUAN" && getKVPV_TH300()?.basicRangeProbeGoal?.() == null && Array.isArray(hp) && Number(hp[1]) > 0 && Number(hp[0]) > 0 && (tqNoHeal() || (!hr?.running || hr.phase === "FIGHT") && Number(hp[0]) / Number(hp[1]) * 100 > 35) && getKVPV_FAR_SCOPE()?.eligible?.(target) && a && b && Number.isFinite(x) && Number.isFinite(y) && Math.hypot(x - b.x, y - b.y) < Math.max(280, entryGoal - 2)) {
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d > 0) {
              if (Math.abs(d - entryGoal) <= 2) {
                log("ENTRY-310", "blocked native close-range approach");
                return;
              }
              x = b.x + (a.x - b.x) / d * entryGoal;
              y = b.y + (a.y - b.y) / d * entryGoal;
              log("ENTRY-310", "redirect native inward path");
            }
          }
          return native.call(this, x, y, ...args);
        }), "fn");
        Object.defineProperty(m, "moveTo", { configurable: true, writable: true, enumerable: own?.enumerable ?? false, value: fn });
        entryMoveHook = { m, own, fn };
      }
      __esmLocal513 = guardEntryMove;
      function syncTowerBoss() {
        const scope = getKVPV_FAR_SCOPE()?.status?.();
        if (!["LINH_LUNG", "PHU_VAN", "TRU_TIEN"].includes(scope?.kind)) return;
        if (!valid() || W._Ba?._rJ?._O$?.ins?.isDead === true) return;
        const me = W._C?._Ba?.instance?.getRole?.(Number(initialActor));
        const combat = me?.getComponent?.(W._d?._Yct?._Het);
        let target = combat?.target;
        if (scope.kind === "TRU_TIEN" && !call_KVPV_FAR_SCOPE_eligible(target)) {
          const currentHitrun = getKVPV_HITRUN1()?.status?.(false);
          if (currentHitrun?.running && currentHitrun.phase !== "FIGHT" || Date.now() < Number(W.__KVPV_USER_UI_UNTIL || 0) || W._Ba?._K_t?._Z7t?.ins?.gathering) return;
          towerAttempt = null;
          S.reason = "Tru Ti\xEAn: ch\u1EDD m\u1EE5c ti\xEAu qu\xE1i";
          const user = W._Ba?._rJ?._O$?.ins;
          if (typeof user?.selectTar === "function" && Date.now() - lastTruAcquire >= 1e3) {
            lastTruAcquire = Date.now();
            user.selectTar(1, -1);
            target = combat?.target;
            log("TRU-TARGET-SEARCH", "native monsters only");
          }
        }
        if (!call_KVPV_FAR_SCOPE_eligible(target)) return;
        if (scope.kind === "ALL_BOSS" && (Date.now() < Number(W.__KVPV_USER_UI_UNTIL || 0) || W.KVPV?.core?.scene?.can?.("combat", "hitrun") === false)) return;
        const id = String(target.property?.get?.("id") ?? target.id ?? "");
        if (!id) return;
        const key = scope.current + "/" + scope.floor + "/" + id;
        const existing = getKVPV_HITRUN1()?.status?.(false);
        if (towerAttempt === key && existing?.running === true) return;
        if (towerAttempt === key && Date.now() - lastTowerRetryAt < 3e3) return;
        const hr = getKVPV_HITRUN1()?.status?.(false);
        towerAttempt = key;
        lastTowerRetryAt = Date.now();
        S.lastError = "";
        try {
          if (hr?.running) call_KVPV_HITRUN1_stop("Chuy\u1EC3n Boss ph\xF3 b\u1EA3n: " + id);
          if (scope.kind === "ALL_BOSS") getKVPV_TH300().setDistance(scope.goal);
          call_KVPV_HITRUN1_start();
          getKVPV_TH300().sync?.();
          log("TOWER-HITRUN", key);
        } catch (e) {
          S.lastError = String(e?.message || e);
          log("TOWER-HANDOFF-BLOCKED", S.lastError);
        }
      }
      __esmLocal713 = syncTowerBoss;
      function syncTianQuanBoss() {
        const scope = getKVPV_FAR_SCOPE()?.status?.();
        if (scope?.kind !== "THIEN_QUAN" || !scope.inside) return;
        if (!valid() || W._Ba?._rJ?._O$?.ins?.isDead === true) return;
        const me = W._C?._Ba?.instance?.getRole?.(Number(initialActor));
        const target = me?.getComponent?.(W._d?._Yct?._Het)?.target;
        if (!call_KVPV_FAR_SCOPE_eligible(target)) return;
        const id = String(target.property?.get?.("id") ?? target.id ?? ""), occ = Number(target.property?.get?.("occ"));
        const key = scope.current + "/" + String(W._Ba?._Co?._Mo?.ins?.curLv ?? "") + "/" + occ + "/" + id;
        if (!id || lastTianQuanKey === key) return;
        const hr = getKVPV_HITRUN1()?.status?.(false);
        if (!tqNoHeal() && lastTianQuanKey === null && hr?.running && String(hr.bossId) === id) {
          lastTianQuanKey = key;
          return;
        }
        lastTianQuanKey = key;
        try {
          stopOwners("Chuy\u1EC3n Boss Thi\xEAn Quan: " + id);
          getKVPV_RANGE281().setTrialRange(Number(getKVPV_TH300().status(false).requestedDistance ?? 302) + 10);
          getKVPV_RANGE281().enable(true);
          getKVPV_TH300().start("SCAN");
          S.mode = MODE.BOSS_TH300_SCAN;
          scopedMode = MODE.BOSS_TH300_SCAN;
          if (W.KVPV?.combat?.config) W.KVPV.combat.config.autoArm = !tqNoHeal();
          if (tqNoHeal()) stopTqHealing("TQ 310 distance only");
          else call_KVPV_HITRUN_AUTO_rearm();
          if (!tqNoHeal() && call_KVPV_HITRUN1_status(false)?.running !== true) call_KVPV_HITRUN1_start();
          getKVPV_TH300().sync?.();
          S.lastError = "";
          S.switches++;
          S.lastChangedAt = (/* @__PURE__ */ new Date()).toISOString();
          log("TQ-BOSS-HANDOFF", key);
        } catch (e) {
          S.lastError = String(e?.message || e);
          log("TQ-HANDOFF-BLOCKED", S.lastError);
        }
      }
      __esmLocal813 = syncTianQuanBoss;
      function syncMap() {
        if (!scopedMode) return;
        if (!valid()) {
          stop("Actor/session changed");
          return;
        }
        guardEntryMove();
        const scope = getKVPV_FAR_SCOPE()?.status?.();
        if (scope?.inside === true && scope.kind === "TRU_TIEN") {
          if (getKVPV_TRUTIEN_PVP()?.status?.()?.enabled === true)
            getKVPV_TRUTIEN_PVP().stop("trutien_native_recovery");
          const z = inspect();
          if (S.mode !== MODE.OFF || z.long?.running || z.boss?.running || z.auto?.enabled) {
            stopOwners("Tru Tien: restore native combat");
            S.mode = MODE.OFF;
            towerAttempt = null;
          }
          releaseEntryMove();
          S.reason = "Tru Tien: native combat only";
          lastScopeKey = scope.kind + "/" + scope.current + "/" + (scope.floor ?? "");
          return;
        }
        if (lastScopeKey?.startsWith("TRU_TIEN/") && scope?.kind !== "TRU_TIEN")
          getKVPV_TH300()?.setClientPace?.(1);
        if (scope) {
          const key = scope.kind + "/" + scope.current + "/" + (scope.floor ?? "");
          if (lastScopeKey !== null && lastScopeKey !== key) {
            stopOwners("\u0110\u1ED5i ph\u1EA1m vi/map/t\u1EA7ng");
            S.mode = MODE.OFF;
            towerAttempt = null;
            lastTianQuanKey = null;
          }
          if (lastScopeKey !== key && scope.kind === "THIEN_QUAN" && scope.inside) getKVPV_TH300()?.setDistance?.(tqDistance());
          lastScopeKey = key;
        }
        if (!inFarMap()) {
          if (S.mode !== MODE.OFF || getKVPV_TH300()?.status?.(false)?.running || getKVPV_HITRUN1()?.status?.(false)?.running) {
            stopOwners("R\u1EDDi Thi\xEAn Quan: tr\u1EA3 combat m\u1EB7c \u0111\u1ECBnh");
            S.mode = MODE.OFF;
            towerAttempt = null;
            log("MAP-EXIT", "native combat");
          }
          getKVPV_EXPERIMENTAL_BOOST()?.sync?.();
          S.reason = "Ngo\xE0i Thi\xEAn Quan/Linh Lung: ch\u1EDD v\xE0o map";
          return;
        }
        if (tqNoHeal()) stopTqHealing("Thi\xEAn Quan gi\u1EEF 310, kh\xF4ng h\u1ED3i m\xE1u");
        const me = W._C?._Ba?.instance?.getRole?.(Number(initialActor));
        const hp = me?.property?.get?.("hp");
        const dead = W._Ba?._rJ?._O$?.ins?.isDead === true || Array.isArray(hp) && Number(hp[0]) <= 0;
        if (dead) {
          const z = inspect();
          if (S.mode !== MODE.OFF || z.auto?.enabled || z.boss?.running || z.long?.running) stopOwners("Ch\u1EBFt: ch\u1EDD h\u1ED3i sinh, gi\u1EEF ch\u1EBF \u0111\u1ED9 t\u1EF1 \u0111\u1ED9ng");
          S.mode = MODE.OFF;
          lastTianQuanKey = null;
          towerAttempt = null;
          S.reason = "Ch\u1EDD h\u1ED3i sinh; v\u1EABn gi\u1EEF t\u1EF1 \u0111\u1ED9ng Thi\xEAn Quan/Linh Lung";
          return;
        }
        if (S.mode !== MODE.OFF && Date.now() - lastMaintenanceAt >= 2e3) {
          lastMaintenanceAt = Date.now();
          const z = inspect(), tower = ["LINH_LUNG", "PHU_VAN", "TRU_TIEN"].includes(scope?.kind);
          if (z.long?.running !== true || !tower && z.auto?.enabled === false && z.auto?.lastMode === "session-unavailable" && !z.boss?.running) {
            log("AUTO-RESUME", "Kh\xF4i ph\u1EE5c b\u1ED9 \u0111\xE1nh trong map sau khi gi\xE1n \u0111o\u1EA1n");
            start(scopedMode);
            return;
          }
          if (!tower && z.auto?.enabled === true && z.auto?.timerActive === false) getKVPV_HITRUN_AUTO()?.repairPolling?.();
          getKVPV_TH300()?.repairPolling?.();
        }
        if (S.mode === MODE.BOSS_TH300) {
          const evidence = getKVPV_TH300()?.status?.(false);
          if (evidence?.running && (evidence.confirmedSkills ?? evidence.confirmedOver300 ?? []).length === 0) {
            log("RESCAN", "Boss hi\u1EC7n t\u1EA1i ch\u01B0a c\xF3 chi\xEAu x\xE1c nh\u1EADn");
            start(MODE.BOSS_TH300_SCAN);
            return;
          }
        }
        if (S.mode === MODE.OFF && W._Ba?._rJ?._O$?.ins?.isDead !== true) start(scopedMode);
        if (S.mode !== MODE.OFF) {
          syncTowerBoss();
          syncTianQuanBoss();
        }
      }
      __esmLocal913 = syncMap;
      function watchMap(mode) {
        scopedMode = mode;
        const schedule = getKVPV_V1()?.timers?.setInterval ?? W.setInterval;
        if (mapTimer == null && typeof schedule === "function") mapTimer = schedule(syncMap, 75);
      }
      __esmLocal109 = watchMap;
      const actorNow = __captureESMFunction21(__esmLocal1114 = (() => String(W._Ba?._rJ?._O$?.ins?.actorId ?? "")), "actorNow");
      const valid = __captureESMFunction21(__esmLocal1213 = (() => !!initialActor && actorNow() === initialActor && !W.__KVPV_UNIVERSAL_HALTED), "valid");
      const log = __captureESMFunction21(__esmLocal1312 = ((event, detail = "") => {
        S.history.push({ at: (/* @__PURE__ */ new Date()).toISOString(), event, detail });
        if (S.history.length > 40) S.history.shift();
      }), "log");
      const inspect = __captureESMFunction21(__esmLocal1412 = (() => ({
        boss: getKVPV_HITRUN1()?.status?.(false),
        auto: getKVPV_HITRUN_AUTO()?.status?.(false),
        range: getKVPV_RANGE281()?.status?.(false),
        th: getKVPV_TH_FAR()?.status?.(false),
        long: getKVPV_TH300()?.status?.(false)
      })), "inspect");
      function stopTqHealing(reason) {
        if (!tqNoHeal()) return;
        try {
          if (getKVPV_HITRUN_AUTO()?.status?.(false)?.enabled === true) call_KVPV_HITRUN_AUTO_stop(true);
        } catch (e) {
          log("tq-auto-stop-error", String(e));
        }
        try {
          if (getKVPV_HITRUN1()?.status?.(false)?.running === true) call_KVPV_HITRUN1_stop(reason);
        } catch (e) {
          log("tq-hitrun-stop-error", String(e));
        }
        try {
          if (W.KVPV?.combat?.config) W.KVPV.combat.config.autoArm = false;
        } catch (e) {
          log("tq-autoarm-error", String(e));
        }
      }
      __esmLocal1511 = stopTqHealing;
      function stopOwners(reason) {
        try {
          getKVPV_HITRUN_AUTO()?.stop?.(true);
        } catch (e) {
          log("auto-stop-error", String(e));
        }
        try {
          if (getKVPV_HITRUN1()?.status?.(false)?.running) call_KVPV_HITRUN1_stop(reason);
        } catch (e) {
          log("boss-stop-error", String(e));
        }
        try {
          getKVPV_TH300()?.stop?.(reason);
        } catch (e) {
          log("long-stop-error", String(e));
        }
        try {
          getKVPV_TH_FAR()?.stop?.(reason);
        } catch (e) {
          log("th-stop-error", String(e));
        }
        try {
          getKVPV_RANGE281()?.enable?.(false);
        } catch (e) {
          log("range-stop-error", String(e));
        }
        try {
          if (W.KVPV?.combat?.config) W.KVPV.combat.config.autoArm = false;
        } catch (e) {
          log("flag-stop-error", String(e));
        }
      }
      __esmLocal1612 = stopOwners;
      function cleanState() {
        const z = inspect();
        if ([MODE.BOSS, MODE.BOSS_TH, MODE.BOSS_TH300, MODE.BOSS_TH300_SCAN].includes(S.mode) && z.boss?.running !== true)
          return ["LINH_LUNG", "PHU_VAN", "TRU_TIEN"].includes(getKVPV_FAR_SCOPE()?.status?.().kind) ? S.lastError || "Ph\xF3 b\u1EA3n: ch\u1EDD m\u1EE5c ti\xEAu h\u1EE3p l\u1EC7 \u0111\u1EC3 b\u1EADt HitRun 35/100" : z.auto?.enabled === true ? "Boss ch\u01B0a ch\u1EA1y: " + String(z.auto.lastError || z.auto.lastBlocked || z.auto.lastMode || "ch\u1EDD game ch\u1ECDn Boss") : "Boss auto OFF / awaiting explicit BOSS start";
        return S.reason;
      }
      __esmLocal1712 = cleanState;
      function status(show = true) {
        const z = inspect();
        const out = {
          version: "1.0.0",
          mode: S.mode,
          actorId: initialActor,
          actorValid: valid(),
          tianQuanOnly: !!scopedMode && !getKVPV_FAR_SCOPE(),
          farMapsOnly: !!scopedMode,
          insideTianQuan: getKVPV_TQ_SCOPE()?.inside?.() ?? false,
          farScope: getKVPV_FAR_SCOPE()?.status?.() ?? null,
          pendingTianQuanMode: scopedMode,
          mapScope: getKVPV_TQ_SCOPE()?.status?.() ?? null,
          tianQuanBossKey: lastTianQuanKey,
          autoMaintain: !!scopedMode,
          manualStopCommand: "KVPV_MODE.stop()",
          reason: cleanState(),
          switched: S.switches,
          lastChangedAt: S.lastChangedAt,
          combatOwner: z.long?.combatOwner ?? "HITRUN",
          combatRunning: z.long?.running ? z.long?.combatRunning === true : z.boss?.running === true,
          combatPhase: z.long?.running ? z.long?.combatPhase : z.boss?.phase,
          distanceOnly310: tqNoHeal(),
          healingEnabled: !tqNoHeal(),
          bossRunning: z.boss?.running === true,
          bossPhase: z.boss?.phase ?? null,
          bossAutoEnabled: z.auto?.enabled === true,
          stand281Enabled: false,
          bossAutoState: z.auto?.lastMode ?? null,
          bossAutoBlocked: z.auto?.lastBlocked ?? null,
          bossAutoError: z.auto?.lastError ?? "",
          bossDistanceTarget: [MODE.BOSS_TH300, MODE.BOSS_TH300_SCAN].includes(S.mode) ? z.long?.goalDistance ?? null : S.mode === MODE.BOSS_TH ? z.th?.goalDistance ?? null : null,
          tuyetHocOnly: S.mode === MODE.BOSS_TH && z.th?.enabled === true || z.long?.running === true && !z.long?.interleavedBasic && !z.long?.basicOnly && !z.long?.tianQuanFiveBasics?.enabled,
          tuyetHocConfirmed: z.th?.confirmedTH ?? 0,
          longRangeProof: z.long?.confirmedSkills || z.long?.confirmedOver300 || [],
          longScan: z.long?.operation === "SCAN",
          range281Enabled: z.range?.enabled === true && z.range?.hookAttached === true,
          errors: S.errors,
          lastError: S.lastError,
          history: S.history.slice(-8),
          note: "BOSS_TH300_SCAN probes native Tuyet Hoc at the configured distance (default 302) to measure cast+hit; BOSS_TH300 only uses independently confirmed skills at the configured distance. If none verified, it waits. Range override never guarantees server reach."
        };
        if (show) {
          console.table([{
            mode: out.mode,
            valid: out.actorValid,
            boss: out.bossRunning,
            phase: out.bossPhase,
            stand281: out.stand281Enabled,
            distance: out.bossDistanceTarget,
            thOnly: out.tuyetHocOnly,
            lastError: out.lastError
          }]);
        }
        return out;
      }
      __esmLocal1812 = status;
      function choose(input) {
        const name = String(input ?? "").trim().toUpperCase();
        const aliases = {
          BOSS: "BOSS",
          BOSS_281: "BOSS",
          THIENQUAN: "BOSS",
          THIEN_QUAN: "BOSS",
          BOSS_TH: "BOSS_TH",
          TH: "BOSS_TH",
          TUYETHOC: "BOSS_TH",
          TUYET_HOC: "BOSS_TH",
          BOSS_TH300: "BOSS_TH300",
          BOSS_TH300_SCAN: "BOSS_TH300_SCAN",
          OFF: "OFF",
          STOP: "OFF"
        };
        if (!Object.prototype.hasOwnProperty.call(aliases, name))
          throw Error("Ch\u1ECDn BOSS | BOSS_TH | BOSS_TH300_SCAN | BOSS_TH300 | OFF");
        return aliases[name];
      }
      __esmLocal1912 = choose;
      function stop(reason = "Ng\u01B0\u1EDDi d\xF9ng d\u1EEBng combat mode") {
        releaseEntryMove();
        scopedMode = null;
        lastTianQuanKey = null;
        if (mapTimer != null) {
          (getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval)?.(mapTimer);
          mapTimer = null;
        }
        stopOwners(reason);
        S.mode = MODE.OFF;
        S.reason = reason;
        S.switches++;
        S.lastChangedAt = (/* @__PURE__ */ new Date()).toISOString();
        log("STOP", reason);
        return status(false);
      }
      __esmLocal2012 = stop;
      function start(modeName) {
        let target = choose(modeName);
        if (target === MODE.OFF) return stop();
        if (W._Ba?._rJ?._O$?.ins?.isDead === true) throw Error("Nh\xE2n v\u1EADt \u0111\xE3 ch\u1EBFt; h\u1ED3i sinh r\u1ED3i START l\u1EA1i");
        if (!valid()) throw Error("Sai game-frame ho\u1EB7c nh\xE2n v\u1EADt ch\u01B0a s\u1EB5n s\xE0ng");
        if (!getKVPV_HITRUN_AUTO() || !getKVPV_HITRUN1())
          throw Error("Thi\u1EBFu module combat trong V1");
        if (target === MODE.BOSS_TH && (!getKVPV_RANGE281()?.enable || !getKVPV_RANGE281()?.setTrialRange))
          throw Error("Thi\u1EBFu RANGE281 cho mode Tuy\u1EC7t H\u1ECDc th\u1EED nghi\u1EC7m");
        if (target === MODE.BOSS_TH && !getKVPV_TH_FAR()?.start) throw Error("Thi\u1EBFu TUYET HOC FAR");
        if ([MODE.BOSS_TH300, MODE.BOSS_TH300_SCAN].includes(target) && !getKVPV_TH300()?.start) throw Error("Thi\u1EBFu b\u1ED9 \u0111i\u1EC1u khi\u1EC3n TH300");
        if (target === MODE.BOSS_TH300) {
          const evidence = getKVPV_TH300().status(false);
          if ((evidence.confirmedSkills ?? evidence.confirmedOver300 ?? []).length === 0) {
            target = MODE.BOSS_TH300_SCAN;
            log("RESCAN", "STRICT ch\u01B0a c\xF3 b\u1EB1ng ch\u1EE9ng cho Boss hi\u1EC7n t\u1EA1i");
          }
        }
        if ([MODE.BOSS_TH300, MODE.BOSS_TH300_SCAN].includes(target)) {
          watchMap(target);
          if (!inFarMap()) {
            stopOwners("Ch\u1EDD map Thi\xEAn Quan/Linh Lung");
            S.mode = MODE.OFF;
            S.reason = "Ngo\xE0i Thi\xEAn Quan/Linh Lung: combat m\u1EB7c \u0111\u1ECBnh; ch\u1EDD v\xE0o map";
            return status(false);
          }
        } else {
          scopedMode = null;
          if (mapTimer != null) {
            (getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval)?.(mapTimer);
            mapTimer = null;
          }
        }
        const previous = S.mode;
        getKVPV_BASIC10()?.release?.();
        const z = inspect();
        if (previous === target && (target === MODE.BOSS || target === MODE.BOSS_TH && z.th?.enabled === true || [MODE.BOSS_TH300, MODE.BOSS_TH300_SCAN].includes(target) && z.long?.running === true) && (z.auto?.enabled || z.boss?.running || tqNoHeal() && z.long?.running === true)) return status(false);
        stopOwners("Chuy\u1EC3n combat mode " + previous + " \u2192 " + target);
        S.mode = MODE.OFF;
        try {
          if ([MODE.BOSS, MODE.BOSS_TH, MODE.BOSS_TH300, MODE.BOSS_TH300_SCAN].includes(target)) {
            if (target !== MODE.BOSS && getKVPV_RANGE281()?.enable) {
              if (typeof getKVPV_RANGE281().setTrialRange === "function") getKVPV_RANGE281().setTrialRange([MODE.BOSS_TH300, MODE.BOSS_TH300_SCAN].includes(target) ? Number(getKVPV_TH300().status(false).requestedDistance ?? getKVPV_TH300().status(false).goalDistance ?? 302) + 10 : 281);
              getKVPV_RANGE281().enable(true);
            }
            if (target === MODE.BOSS_TH) getKVPV_TH_FAR().start();
            if (target === MODE.BOSS_TH300_SCAN) getKVPV_TH300().start("SCAN");
            if (target === MODE.BOSS_TH300) getKVPV_TH300().start("STRICT");
            if (W.KVPV?.combat?.config) W.KVPV.combat.config.autoArm = !tqNoHeal();
            if (["LINH_LUNG", "PHU_VAN", "TRU_TIEN"].includes(getKVPV_FAR_SCOPE()?.status?.().kind)) {
              syncTowerBoss();
            } else if (tqNoHeal()) stopTqHealing("TQ 310 distance only");
            else {
              call_KVPV_HITRUN_AUTO_rearm();
              const ar = call_KVPV_HITRUN_AUTO_status(false);
              if (ar?.enabled !== true) throw Error("Boss auto-arm ch\u01B0a b\u1EADt");
            }
            if ([MODE.BOSS_TH300, MODE.BOSS_TH300_SCAN].includes(target)) getKVPV_TH300().sync?.();
            S.reason = target === MODE.BOSS_TH300_SCAN ? "TH300 SCAN: th\u1EED k\u1EF9 n\u0103ng native \u1EDF kho\u1EA3ng c\xE1ch c\u1EA5u h\xECnh, ghi nh\u1EADn s\xE1t th\u01B0\u01A1ng" : target === MODE.BOSS_TH300 ? "TH300 STRICT: ch\u1EC9 d\xF9ng chi\xEAu c\xF3 >=2 hit x\xE1c nh\u1EADn \u1EDF kho\u1EA3ng c\xE1ch \u0111\xE3 \u0111o, kh\xF4ng c\xF3 th\xEC ch\u1EDD" : target === MODE.BOSS_TH ? "Boss ch\u1EC9 d\xF9ng Tuy\u1EC7t H\u1ECDc 1001..1008, \u0111\u1EE9ng xa 280.4 khi FIGHT" : "Boss combo g\u1ED1c; HP <=35% ch\u1EA1y v\xF2ng ngo\xE0i t\u1EA7m, \u0111\u1EA7y 100% m\u1EDBi \u0111\xE1nh ti\u1EBFp";
          }
          S.mode = target;
          S.switches++;
          S.lastChangedAt = (/* @__PURE__ */ new Date()).toISOString();
          S.lastError = "";
          log("START", target);
          try {
            return status(true);
          } catch (reportError) {
            S.errors++;
            S.lastError = String(reportError?.message || reportError);
            S.reason = "\u0110\xE3 b\u1EADt " + target + "; l\u1ED7i khi \u0111\u1ECDc tr\u1EA1ng th\xE1i: " + S.lastError;
            log("START-REPORT-ERROR", S.lastError);
            return { mode: S.mode, reason: S.reason, lastError: S.lastError };
          }
        } catch (e) {
          S.errors++;
          S.lastError = String(e?.message || e);
          log("START-ERROR", S.lastError);
          stopOwners("Start " + target + " th\u1EA5t b\u1EA1i: " + S.lastError);
          S.mode = MODE.OFF;
          S.reason = "Kh\xF4ng kh\u1EDFi \u0111\u1ED9ng \u0111\u01B0\u1EE3c " + target + ": " + S.lastError;
          console?.warn?.(TAG, S.lastError);
          return status(true);
        }
      }
      __esmLocal2113 = start;
      function armTianQuan() {
        lastTianQuanKey = null;
        watchMap(MODE.BOSS_TH300_SCAN);
        syncMap();
        return status(false);
      }
      __esmLocal2212 = armTianQuan;
      const api33 = Object.freeze({
        version: "1.0.0",
        start,
        stop,
        status,
        syncMap,
        armTianQuan,
        modes: MODE,
        history: __captureESMFunction21(__esmLocal2312 = (() => S.history.slice()), "history")
      });
      try {
        getKVPV_MODE()?.stop?.("Reload integrated FULL");
      } catch (_) {
        getKVPV_V1()?.diagnostics?.record(_);
      }
      W.KVPV_MODE = api33;
      stopOwners("Kh\u1EDFi t\u1EA1o: ch\u1EDD ch\u1ECDn mode");
      console?.info?.(TAG, 'READY/OFF. Ch\u1EA1y KVPV_MODE.start("BOSS") | .start("BOSS_TH") | .start("BOSS_TH300_SCAN") | .start("BOSS_TH300") | .stop()');
    }), "")();
  }
  var api25 = Object.freeze({
    get KVPV_MODE() {
      return globalThis.KVPV_MODE;
    }
  });

  // esm/modules/09-th300-scan-default.mjs
  function __captureESMFunction22(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal021;
  var __esmLocal1101;
  var __esmLocal814;
  function initialize23() {
    __captureESMFunction22(__esmLocal021 = (() => {
      "use strict";
      const W = window;
      function activate() {
        const legacy = getKVPV_TH300(), mode = getKVPV_MODE();
        if (!legacy?.start || !mode?.start) return { ready: false, reason: "legacy_dependencies_missing" };
        try {
          getKVPV_COMBAT_ENGINE()?.stop?.();
          getKVPV_RANGE_KEEP310()?.stop?.();
          W.KVPV_TQ_POSITION_ONLY = { ...getKVPV_TQ_POSITION_ONLY() ?? {}, enabled: true, distance: 310 };
          legacy.setDistance?.(310);
          legacy.setBasicOnly?.(false);
          const five = legacy.setTianQuanFiveBasics?.(true, 1);
          if (five?.available === false || five?.enabled === false) throw Error("Tian Quan five-basics profile unavailable");
          legacy.setTianQuanTuyetHoc?.(false);
          legacy.setBasicRotation?.([8001, 8002, 8003, 8004, 8005]);
          legacy.setInterleaved?.(true, 310);
          legacy.setPrimaryBasic?.(true);
          legacy.setSkillPriority?.("interleaved");
          legacy.setBasicAnimationSpeed?.(1);
          legacy.setTianQuanBasicVisualSpeed?.(1);
          legacy.setClientPace?.(1);
          mode.start("BOSS_TH300_SCAN");
          legacy.setTianQuanTuyetHoc?.(false);
          getKVPV_TH_FAR()?.stop?.("tianquan_five_basics_only");
          getKVPV_COMBAT_ENGINE()?.stop?.();
          getKVPV_RANGE_KEEP310()?.stop?.();
          const th = legacy.status?.(false);
          return { ready: true, mode: mode.status?.(), th, requestedBasicIds: [8001, 8002, 8003, 8004, 8005], tuyetHocEnabled: false };
        } catch (e) {
          return { ready: false, reason: String(e?.message ?? e) };
        }
      }
      __esmLocal1101 = activate;
      W.KVPV_TH300_RESTORE = Object.freeze({ activate, status: __captureESMFunction22(__esmLocal814 = (() => ({ mode: getKVPV_MODE()?.status?.(), th: getKVPV_TH300()?.status?.(false), newEngine: getKVPV_COMBAT_ENGINE()?.status?.() })), "status") });
      activate();
    }), "")();
  }
  var api26 = Object.freeze({
    get KVPV_TH300_RESTORE() {
      return globalThis.KVPV_TH300_RESTORE;
    },
    get KVPV_TQ_POSITION_ONLY() {
      return globalThis.KVPV_TQ_POSITION_ONLY;
    }
  });

  // esm/modules/16-phu-van-th.mjs
  function __captureESMFunction23(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal022;
  function initialize24() {
    __captureESMFunction23(__esmLocal022 = (() => {
      const W = window;
      if (getKVPV_TH300()) {
        getKVPV_TH300().setBasicOnly?.(false);
        getKVPV_TH300().setTianQuanMpackExtras?.(true);
        getKVPV_TH300().setTianQuanTuyetHoc?.(true);
        getKVPV_TH300().setBasicAnimationSpeed?.(99);
        getKVPV_TH300().setScanInterval?.(1);
        getKVPV_TH300().setInterleaved?.(true, 310);
        getKVPV_TH300().setSkillPriority?.("interleaved");
      }
      if (getKVPV_PHUVAN_TH()) {
        getKVPV_PHUVAN_TH().enabled = true;
      }
      if (getKVPV_MODE()) {
        getKVPV_MODE().armTianQuan();
      }
    }), "")();
  }
  var api27 = Object.freeze({});

  // esm/modules/36-fast-actions.mjs
  function initialize25() {
  }
  var api28 = Object.freeze({});

  // esm/modules/72-desktop-control.mjs
  function __captureESMFunction24(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal023;
  var __esmLocal1102;
  var __esmLocal251;
  var __esmLocal390;
  var __esmLocal415;
  var __esmLocal514;
  var __esmLocal613;
  var __esmLocal714;
  var __esmLocal815;
  var __esmLocal914;
  var __esmLocal1010;
  var __esmLocal1115;
  var __esmLocal1214;
  var __esmLocal1313;
  var __esmLocal1413;
  var __esmLocal1512;
  var __esmLocal1613;
  var __esmLocal1713;
  function initialize26() {
    __captureESMFunction24(__esmLocal023 = (() => {
      "use strict";
      const W = window, old = getKVPV_DESKTOP_CONTROL(), carry = old?._handoff?.();
      old?.stop?.();
      const actor = String(W.__KVPV_OWN_ACTOR_ID || ""), schema = W.__KVPV_CONTROL_SCHEMA ?? {};
      let desired = carry?.actor === actor ? carry.desired : null, applied = "", timer = null, reason = "waiting_desktop", error = "", combatApi = null, redDotsApi = null, redDotsRevision = "", stageRevision = "", stageStopRevision = "", stageStopApi = null, failedRevision = carry?.actor === actor ? carry.failedRevision : "", reloadRequired = false;
      const targets = /* @__PURE__ */ new Map(), states = /* @__PURE__ */ new Map(), stoppedApis = /* @__PURE__ */ new Map();
      let roadApi = null;
      function validCombatProfiles(profiles) {
        return !!profiles && typeof profiles === "object" && !Array.isArray(profiles) && Object.entries(profiles).every(__captureESMFunction24(__esmLocal251 = (([scope, p]) => ["THIEN_QUAN", "LINH_LUNG", "PHU_VAN", "TRU_TIEN", "ROAD_TRIAL"].includes(scope) && p && typeof p === "object" && !Array.isArray(p) && ["mode", "distance", "intervalMs"].every(__captureESMFunction24(__esmLocal390 = ((k) => Object.hasOwn(p, k)), "")) && Object.keys(p).every(__captureESMFunction24(__esmLocal415 = ((k) => ["mode", "distance", "intervalMs", "rideFollow", "mansionFollow"].includes(k)), "")) && ["rideFollow", "mansionFollow"].every(__captureESMFunction24(__esmLocal514 = ((k) => p[k] === void 0 || typeof p[k] === "boolean"), "")) && (scope === "ROAD_TRIAL" ? ["native", "basic8001"] : ["mixed", "basic8001"]).includes(p.mode) && Number.isSafeInteger(p.intervalMs) && p.intervalMs >= 0 && p.intervalMs <= 5e3 && Number.isFinite(p.distance) && p.distance >= (scope === "ROAD_TRIAL" ? 20 : 281) && p.distance <= (scope === "ROAD_TRIAL" ? 150 : 600)), ""));
      }
      __esmLocal1102 = validCombatProfiles;
      function scopeProfile(scope) {
        return desired?.combatProfiles?.[scope] ?? null;
      }
      __esmLocal613 = scopeProfile;
      function validRedDotControls(value) {
        return !!value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).every((k) => k === "groups" || k === "ids") && !!value.groups && typeof value.groups === "object" && !Array.isArray(value.groups) && !!value.ids && typeof value.ids === "object" && !Array.isArray(value.ids) && Object.entries(value.groups).length <= 128 && Object.entries(value.ids).length <= 256 && Object.entries(value.groups).every(([k, v]) => typeof k === "string" && k.length > 0 && k.length <= 80 && !/[\u0000-\u001f]/.test(k) && typeof v === "boolean") && Object.entries(value.ids).every(([k, v]) => /^\d{1,5}$/.test(k) && typeof v === "boolean");
      }
      function valid(p) {
        return p && String(p.actor) === actor && /^[a-f0-9]{32}$/.test(p.revision) && Object.keys(p).every(__captureESMFunction24(__esmLocal815 = ((k) => ["actor", "revision", "modules", "redDots", "distance", "animationSpeed", "stageAuto", "dailyEnabled", "roadCombatMode", "towerBasicOnly", "roadMinCastMs", "combatProfiles"].includes(k)), "")) && (p.distance === void 0 || Number.isFinite(p.distance) && p.distance >= 281 && p.distance <= 600) && (p.animationSpeed === void 0 || [1, 9, 99, 99999].includes(p.animationSpeed)) && (p.stageAuto === void 0 || typeof p.stageAuto === "boolean") && (p.dailyEnabled === void 0 || p.dailyEnabled === true) && (p.roadCombatMode === void 0 || ["native", "basic8001"].includes(p.roadCombatMode)) && (p.towerBasicOnly === void 0 || typeof p.towerBasicOnly === "boolean") && (p.roadMinCastMs === void 0 || Number.isSafeInteger(p.roadMinCastMs) && p.roadMinCastMs >= 0 && p.roadMinCastMs <= 5e3) && (p.combatProfiles === void 0 || validCombatProfiles(p.combatProfiles)) && (p.redDots === void 0 || validRedDotControls(p.redDots)) && (p.modules === void 0 || p.modules && typeof p.modules === "object" && !Array.isArray(p.modules) && Object.entries(p.modules).every(__captureESMFunction24(__esmLocal914 = (([file, on]) => Object.prototype.hasOwnProperty.call(schema, file) && typeof on === "boolean"), "")));
      }
      __esmLocal714 = valid;
      function stopEnabledModules() {
        for (const [file, on] of states) {
          if (!on) continue;
          const names = Array.isArray(schema[file]) ? schema[file] : [schema[file]];
          for (const name of names) W[name]?.stop?.();
          states.set(file, false);
        }
        targets.clear();
        stoppedApis.clear();
      }
      function receive(rows) {
        if (!Array.isArray(rows) || rows.length > 8) return false;
        const p = rows.find(__captureESMFunction24(__esmLocal1115 = ((x) => String(x?.actor) === actor), ""));
        if (!p) return false;
        if (!valid(p)) {
          reason = "invalid_desktop_profile";
          return false;
        }
        if (desired?.revision !== p.revision) {
          desired = JSON.parse(JSON.stringify(p));
          error = "";
          failedRevision = "";
        }
        const loaded = W.__KVPV_RUNTIME_MODULE_SET, requested = Object.entries(p.modules ?? {}).filter(([, on]) => on === true).map(([file]) => file);
        const loadedSet = Array.isArray(loaded) ? [...loaded].sort() : null, requestedSet = requested.sort();
        if (!loadedSet || loadedSet.length !== requestedSet.length || loadedSet.some((file, index) => file !== requestedSet[index])) {
          reloadRequired = true;
          reason = "reload_required";
          error = "Thay \u0111\u1ED5i module c\u1EA7n t\u1EA3i l\u1EA1i tab game.";
          failedRevision = "";
          stopEnabledModules();
          return true;
        }
        reloadRequired = false;
        tick();
        return true;
      }
      __esmLocal1010 = receive;
      function tick() {
        try {
          if (String(W._Ba?._rJ?._O$?.ins?.actorId ?? "") !== actor || W.__KVPV_UNIVERSAL_HALTED) return;
          if (reloadRequired) return;
          if (desired && failedRevision === desired.revision) return;
          const moduleSettings = desired?.modules ?? {};
          for (const file of Object.keys(schema)) {
            if (moduleSettings[file] === true) continue;
            const names = Array.isArray(schema[file]) ? schema[file] : [schema[file]], stopped = stoppedApis.get(file) || /* @__PURE__ */ new Set();
            for (const name of names) {
              const api33 = W[name];
              if (!api33) continue;
              if (typeof api33.stop !== "function") throw Error("Module stop API unavailable: " + file + " (" + name + ")");
              if (!stopped.has(api33)) {
                api33.stop();
                stopped.add(api33);
              }
            }
            stoppedApis.set(file, stopped);
            states.set(file, false);
          }
          if (!desired) {
            reason = "waiting_local_profile";
            return;
          }
          if (desired.stageAuto === false) {
            const stage = W._Ba?._Co?._Mo?.ins;
            if (stage && stage.auto === true) stage.auto = false;
            stageStopRevision = desired.revision;
            stageStopApi = stage;
          }
          if (W._Ba?._rJ?._O$?.ins?.isDead !== false || Date.now() < Number(W.__KVPV_USER_UI_UNTIL || 0)) {
            reason = "waiting_user_or_revive";
            return;
          }
          for (const file of Object.keys(schema)) {
            const names = Array.isArray(schema[file]) ? schema[file] : [schema[file]], on = moduleSettings[file] === true;
            if (!on) continue;
            let apis = names.map((name) => W[name]);
            const previous = targets.get(file);
            let installed = false;
            if (apis.some((api33) => !api33 || typeof api33.stop !== "function")) {
              const install = W.__KVPV_CONTROL_INSTALLERS?.[file];
              if (typeof install !== "function") throw Error("Installer unavailable: " + file);
              install();
              installed = true;
              apis = names.map((name) => W[name]);
            }
            if (apis.some((api33) => !api33 || typeof api33.stop !== "function")) throw Error("Module API unavailable after install: " + file);
            if (Array.isArray(previous) && previous.length === apis.length && previous.every((api33, index) => api33 === apis[index]) && states.get(file) === on) continue;
            {
              const install = W.__KVPV_CONTROL_INSTALLERS?.[file];
              if (!installed) {
                if (typeof install !== "function") throw Error("Installer unavailable: " + file);
                install();
                apis = names.map((name) => W[name]);
              }
              if (apis.some((api33) => !api33 || typeof api33.stop !== "function")) throw Error("Module API unavailable after install: " + file);
              for (const api33 of apis) if (typeof api33.start === "function") api33.start();
              stoppedApis.delete(file);
            }
            targets.set(file, apis);
            states.set(file, on);
          }
          if (!desired) {
            reason = "waiting_local_profile";
            return;
          }
          if (desired.redDots !== void 0) {
            const api33 = W.KVPV_RED_DOT_MODULE;
            if (typeof api33?.setControls !== "function") throw Error("Red-dot controls API unavailable");
            if (redDotsApi !== api33 || redDotsRevision !== desired.revision) {
              api33.setControls(desired.redDots);
              redDotsApi = api33;
              redDotsRevision = desired.revision;
            }
          }
          if (desired.roadCombatMode !== void 0 || desired.roadMinCastMs !== void 0) {
            const api33 = getKVPV_ROAD_CADENCE();
            if (desired.roadCombatMode !== void 0 && typeof api33?.setCombatMode !== "function" || desired.roadMinCastMs !== void 0 && typeof api33?.setMinCastInterval !== "function") throw Error("Road settings API unavailable");
            if (roadApi !== api33 || applied !== desired.revision) {
              if (desired.roadCombatMode !== void 0) api33.setCombatMode(desired.roadCombatMode);
              if (desired.roadMinCastMs !== void 0) api33.setMinCastInterval(desired.roadMinCastMs);
              roadApi = api33;
            }
          }
          const combat = getKVPV_TH300();
          if (desired.towerBasicOnly !== void 0 && typeof combat?.setBasicOnly !== "function") throw Error("Tower combat mode API unavailable");
          if (combat && (combatApi !== combat || applied !== desired.revision)) {
            if (desired.towerBasicOnly !== void 0) combat.setBasicOnly(desired.towerBasicOnly);
            if (desired.distance !== void 0) combat.setDistance(desired.distance);
            if (desired.animationSpeed !== void 0) combat.setBasicAnimationSpeed(desired.animationSpeed);
            combatApi = combat;
          }
          if (stageRevision !== desired.revision) {
            if (desired.stageAuto === true) {
              const stage = W._Ba?._Co?._Mo?.ins;
              if (stage) stage.auto = true;
            }
            stageRevision = desired.revision;
          }
          applied = desired.revision;
          reason = "desktop_applied";
          error = "";
        } catch (e) {
          failedRevision = desired?.revision;
          error = String(e.message || e).slice(0, 300);
          reason = "desktop_apply_error";
        }
      }
      __esmLocal1214 = tick;
      function stop() {
        if (timer !== null) (getKVPV_V1()?.timers?.clearInterval ?? W.clearInterval)(timer);
        timer = null;
      }
      __esmLocal1313 = stop;
      W.KVPV_DESKTOP_CONTROL = Object.freeze({
        receive,
        sync: tick,
        stop,
        scopeProfile,
        distance: __captureESMFunction24(__esmLocal1413 = (() => scopeProfile(getKVPV_FAR_SCOPE()?.status?.()?.kind)?.distance ?? desired?.distance), "distance"),
        stageAllowed: __captureESMFunction24(__esmLocal1512 = (() => desired?.stageAuto === true || desired?.modules?.["62-resume-stage.js"] === true), "stageAllowed"),
        status: __captureESMFunction24(__esmLocal1613 = (() => ({ reason, lastError: error, reloadRequired, runtimeModules: Array.isArray(W.__KVPV_RUNTIME_MODULE_SET) ? W.__KVPV_RUNTIME_MODULE_SET : [], requested: desired?.revision ?? null, applied, modules: desired?.modules ?? {}, redDots: desired?.redDots ?? null, distance: desired?.distance ?? null, animationSpeed: desired?.animationSpeed ?? null, stageAuto: desired?.stageAuto ?? null })), "status"),
        _handoff: __captureESMFunction24(__esmLocal1713 = (() => ({ actor, desired, failedRevision })), "_handoff")
      });
      timer = (getKVPV_V1()?.timers?.setInterval ?? W.setInterval)(tick, 1e3);
    }), "")();
  }
  var api29 = Object.freeze({
    get KVPV_DESKTOP_CONTROL() {
      return globalThis.KVPV_DESKTOP_CONTROL;
    }
  });

  // esm/modules/73-frame-click.mjs
  function __captureESMFunction25(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  function __captureESMMethod11(receiver, key, kind) {
    let owner = receiver;
    while (owner !== null && (typeof owner === "object" || typeof owner === "function") && !Object.prototype.hasOwnProperty.call(owner, key)) owner = Object.getPrototypeOf(owner);
    if (owner === null) return void 0;
    const descriptor = Object.getOwnPropertyDescriptor(owner, key);
    return kind === "get" ? descriptor.get : kind === "set" ? descriptor.set : descriptor.value;
  }
  var __esmLocal024;
  var __esmLocal1103;
  var __esmLocal255;
  function initialize27() {
    __captureESMFunction25(__esmLocal024 = (() => {
      "use strict";
      const w = window;
      w.KVPV_FRAME_CLICK?.stop?.();
      w.KVPV_FRAME_CLICK = Object.freeze({ stop() {
        __esmLocal1103 = __captureESMMethod11(this, "stop", "init");
      }, status: __captureESMFunction25(__esmLocal255 = (() => ({ running: false, clicks: 0, target: "extension_browser_input", note: "Click JavaScript \u0111\xE3 t\u1EAFt. B\u1EADt click c\u1EA5p tr\xECnh duy\u1EC7t b\u1EB1ng popup extension KVPV." })), "status") });
    }), "")();
  }
  var api30 = Object.freeze({});

  // esm/modules/01-red-dot-module.mjs
  function call_KVPV_RED_DOT_MODULE_start(...args) {
    const target = globalThis["KVPV_RED_DOT_MODULE"];
    const fn = globalThis["KVPV_RED_DOT_MODULE"]?.["start"];
    if (typeof fn !== "function") throw Error("KVPV_RED_DOT_MODULE.start is not available");
    return Reflect.apply(fn, target, args);
  }
  var api31 = Object.freeze({
    get KVPV_ADVENTURE() {
      return globalThis.KVPV_ADVENTURE;
    },
    get KVPV_RED_DOT() {
      return globalThis.KVPV_RED_DOT;
    },
    get KVPV_RED_DOT_MODULE() {
      return globalThis.KVPV_RED_DOT_MODULE;
    }
  });

  // esm/modules/99-manual-entry.mjs
  function __captureESMFunction26(fn, name) {
    if (fn.name !== name) Object.defineProperty(fn, "name", { value: name, configurable: true });
    return fn;
  }
  var __esmLocal025;
  var __esmLocal1104;
  var __esmLocal256;
  function initialize28() {
    __captureESMFunction26(__esmLocal025 = (() => {
      "use strict";
      const W = window;
      let result = { started: false, reason: "not_started" };
      function main() {
        const actor = String(W._Ba?._rJ?._O$?.ins?.actorId ?? "");
        if (!actor || actor !== String(W.__KVPV_OWN_ACTOR_ID ?? "") || W.__KVPV_UNIVERSAL_HALTED)
          return result = { started: false, reason: "invalid_actor_or_halted" };
        if (typeof getKVPV_RED_DOT_MODULE()?.start !== "function")
          return result = { started: false, reason: "red_dot_module_unavailable" };
        call_KVPV_RED_DOT_MODULE_start();
        return result = { started: true, reason: "red_dot_main_started" };
      }
      __esmLocal1104 = main;
      main();
      W.KVPV_MANUAL_ENTRY = Object.freeze({ main, status: __captureESMFunction26(__esmLocal256 = (() => ({ ...result, mode: "red-dot-only", at: Date.now() })), "status") });
    }), "")();
  }
  var api32 = Object.freeze({
    get KVPV_MANUAL_ENTRY() {
      return globalThis.KVPV_MANUAL_ENTRY;
    }
  });

  // esm/runtime-profile.mjs
  var moduleInitializers = Object.freeze({ "00-boss-recovery.js": initialize, "00-preflight.js": initialize2, "00-daily-clock.js": initialize3, "00-manual-entry-policy.js": initialize4, "00-spending-policy.js": initialize5, "00-account-policy.js": initialize6, "00-far-scope.js": initialize7, "00-thienquan-scope.js": initialize8, "00-combat-metrics.js": initialize9, "00-skill-pacing.js": initialize10, "00-tq-basic-profile.js": initialize11, "00-territory-loot.js": initialize12, "02-scene.js": initialize13, "03-timeline.js": initialize14, "06-range.js": initialize15, "08-range-evidence.js": initialize16, "32-combat-stall.js": initialize17, "39-executor-report.js": initialize18, "43-context-brain.js": initialize19, "99-z-pb-boss-daily.js": initialize20, "07-tuyet-hoc.js": initialize21, "09-modes.js": initialize22, "09-th300-scan-default.js": initialize23, "16-phu-van-th.js": initialize24, "36-fast-actions.js": initialize25, "72-desktop-control.js": initialize26, "73-frame-click.js": initialize27, "99-manual-entry.js": initialize28 });
  window.__KVPV_RUNTIME_MODULE_SET = Object.freeze([]);
  window.__KVPV_CONTROL_INSTALLERS = Object.freeze({});
  initialize();
  initialize2();
  initialize3();
  initialize4();
  initialize5();
  initialize6();
  initialize7();
  initialize8();
  initialize9();
  initialize10();
  initialize11();
  initialize12();
  initialize13();
  initialize14();
  initialize15();
  initialize16();
  initialize17();
  initialize18();
  initialize19();
  initialize20();
  initialize21();
  initialize22();
  initialize23();
  initialize24();
  initialize25();
  initialize26();
  initialize27();
  initialize28();
  window.KVPV_DESKTOP_CONTROL?.sync?.();
  return __toCommonJS(runtime_profile_exports);
})();

/*__KVPV_MODULE_RUNTIME_END__*/
if(!__KVPV_RUNTIME_ENTRY?.moduleInitializers)throw Error('Runtime module initializers missing');
})();


  }

})();
