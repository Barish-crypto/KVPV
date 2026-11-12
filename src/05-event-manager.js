/* =============== V8.6.23 EVENTS 13 =============== */

/* KVPV MAIN SOLO V8.6.23 - 13 EVENT MODULES
 * Source evidence: V8.6.22 MAIN SOLO + 17,606,388-byte game client.
 * VERIFIED NATIVE ACTIONS (via shared V8 queue):
 * - Escort: _Ba._m8._bmi.ins.escortFairy() / getFairyAward()
 *   Starting escort stays OFF until user verifies the cost on their account.
 * - Dragon Boat old rank: _Ba._htt._z0n.inst.GetDragonBoatRandAward()
 * - Siege Castle: _Ba._sst._Cht.inst.rqEtScene(3101/3102), guarded by server event state
 * All remaining events are schedule/diagnostic only until concrete native execution is verified.
 * No premium spends, no random guessed opcode, no blind replay.
 */

(() => {

'use strict';

const W=window, D=W.KVPV_DAILY, V=W.KVPV_V8, U=W.KVPV_UPGRADES;

if(!D?.lichEvents || !D?.quickState || !V?.register || !V?.toggle || !U?.busy || typeof _Ba==='undefined'){

  console.error('[V8.6.23] Nap KVPV MAIN SOLO FULL dung game-frame truoc.');return;

}

if(W.KVPV_EVENTS13?.start){W.KVPV_EVENTS13.start();console.log('[EVENTS13] Da co san: su dung KVPV_EVENTS13.status()');return;}

const ACTOR=window.__KVPV_OWN_ACTOR_ID;

const who=String(_Ba?._rJ?._O$?.ins?.actorId??'');

if(who!==ACTOR){console.error('[V8.6.23] Khong dung acc chinh; tu choi nap:',who);return;}

const config={enabled:true, pollMs:2500, noticeMs:600000, autoEscortFree:false,

  autoEscortClaim:true, maxEscortStartsPerDay:3, autoBoatRankClaim:true,

  autoSaThanhJoin:true, allowPremium:false, minimumActionSpacingMs:3500,

  trackOutsideSchedule:true, verbose:false};

const keys=['tien_phuc','dua_thuyen','ho_tong','trieu_hoi','tien_ton','diet_tho_hao',

 'tranh_ba_tu_phuong','tien_ma','tien_duyen_tac_chien','chien_doi',

 'sa_thanh','tam_tien','thien_the'];

const labels={tien_phuc:'Su Kien Tien Phuc',dua_thuyen:'Dua Thuyen Rong',ho_tong:'Ho Tong x2',

 trieu_hoi:'Trieu Hoi Ho Tro',tien_ton:'Tien Ton Dau Ky',diet_tho_hao:'Diet Tho Hao',

 tranh_ba_tu_phuong:'Tranh Ba Tu Phuong',tien_ma:'Tien Ma Quyet Chien',

 tien_duyen_tac_chien:'Tien Duyen Tac Chien',chien_doi:'Chien Doi Manh Nhat',

 sa_thanh:'Quyet Chien Sa Thanh',tam_tien:'Tam Tien Van Dao',thien_the:'Thien The 8 Tang'};

const capability={

 tien_phuc:['schedule','Chua xac minh lenh su kien / dieu kien qua'],

 dua_thuyen:['partial-auto','Da xac minh nhan thuong BXH cu; chua auto ghep doi/dau'],

 ho_tong:['auto','Da xac minh bat dau bang luot mien phi va nhan thuong'],

 trieu_hoi:['schedule','Chua xac minh lenh trieu hoi tu do'],

 tien_ton:['trace','Giu module trace co san; chua co executor danh'],

 diet_tho_hao:['schedule','Chi co model BOSS Tho Hao; chua xac minh lenh tham chien'],

 tranh_ba_tu_phuong:['schedule','Chua co executor vao/danh'],

 tien_ma:['schedule','Chua xac minh lenh vao chien truong'],

 tien_duyen_tac_chien:['partial-auto','Da xac minh tu vao map 2811/2813; phan moi Tien Lu chua xu ly'],

 chien_doi:['schedule','Chua xac minh lenh chien doi su kien'],

 sa_thanh:['partial-auto','Da xac minh vao map 3101/3102, chua auto toan bo PK'],

 tam_tien:['schedule','Chua xac minh executor'],

 thien_the:['schedule','Chua xac minh executor']};

const S={timer:null,lastTick:0,lastAction:0,actor:who,errors:0,lastError:'',

 records:[],alerts:new Map(),plugins:new Map(),stopped:false,

 escortDay:'',escortStarts:0,attempts:new Map(),sent:0,confirmed:0,

 snapshot:null};

const now=()=>Date.now();

const number=x=>Number.isFinite(Number(x))?Number(x):null;

const int=x=>Number.isSafeInteger(Number(x))?Number(x):null;

const escort=()=>_Ba?._m8?._gmi?.ins;

const escortRpc=()=>_Ba?._m8?._bmi?.ins;

const boat=()=>_Ba?._htt?._stt?.inst;

const boatRpc=()=>_Ba?._htt?._z0n?.inst;

const siegeRpc=()=>_Ba?._sst?._Cht?.inst;

const sceneData=type=>{try{return _Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(type)

  ??_Ba?._sst?._ist?.instance?.getCpSceneStateByType?.(type)??null;}catch(_){return null;}};

const isCommon=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true;

const isBusy=()=>_Ba?._$a?._yo?.ins?.isInMission===true||_Ba?._$a?._yo?.ins?.isInArena===true;

const isIdle=()=>D.quickState()?.running===true&&D.quickState()?.job==='rảnh'&&isCommon()&&!isBusy();

function clock(){

 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',

  year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'})

 .formatToParts(new Date()).map(x=>[x.type,x.value]));

 const y=+parts.year,m=+parts.month,d=+parts.day;

 return {date:`${parts.year}-${parts.month}-${parts.day}`,day:new Date(Date.UTC(y,m-1,d)).getUTCDay(),

 minute:+parts.hour*60+(+parts.minute),second:+parts.second};

}

function range(s,c){const [a,b]=s.split('-');if(!a||!b)return false;

 const conv=z=>{const [h,m]=z.split(':').map(Number);return h*60+m;};

 return c.minute>=conv(a)&&c.minute<conv(b);

}

function eventTime(item,c){

 if(!item)return {active:false,reason:'not-in-schedule'};

 if(item.days?.length&&!item.days.includes(c.day))return {active:false,reason:'not-scheduled-day'};

 const active=(item.slots||[]).some(x=>range(x,c));

 const instant=(item.instants||[]).some(x=>{const [h,m]=x.split(':').map(Number);return c.minute===h*60+m;});

 return {active:active||instant,reason:active?'inside-window':instant?'at-announcement':'outside-window'};

}

function describe(k){

 const source=(D.lichEvents?.()||[]).find(x=>x.key===k), t=eventTime(source,clock());

 return {key:k,name:source?.name||labels[k],mode:capability[k][0],note:capability[k][1],

  active:t.active,reason:t.reason,dayList:source?.days??null,

  times:[...(source?.slots||[]),...(source?.instants||[])]};

}

function append(msg,extra){S.records.push({at:new Date().toISOString(),msg,extra:extra??null});

 if(S.records.length>180)S.records.shift();if(config.verbose)console.log('[EVENTS13]',msg,extra??'');}

function freshDay(){let date=clock().date;if(date!==S.escortDay){S.escortDay=date;S.escortStarts=0;}}

function stateEscort(){freshDay();const m=escort(),f=escortRpc();if(!m||!f)return {ready:false,reason:'missing-model-or-rpc'};

 const times=int(_ft?._gY?.ins?.getCfgById?.(31005)?.[2]?.[0]);

 const count=int(m.escort),left=times!==null&&count!==null?times-count:null;

 const es=int(m.sendState),isDouble=m.isDouble===true, fairy=int(m.fairyId);

 return {state:es,left,count,fairy,isDouble,day:S.escortDay,starts:S.escortStarts,

  signature:`${es}|${count}|${m.endTime}|${fairy}|${isDouble}|${S.escortDay}`};

}

function stateBoat(){const b=boat(),rpc=boatRpc();if(!b||!rpc)return {ready:false,reason:'missing-model-or-rpc'};

 return {beforeFlag:b.beforeFlag===true||b.beforeFlag===1,

  claimed:b.flag===1||b.flag===true,ranking:int(b.myRanking),isopen:b.isopen===true,

  isHave:b.isHave===true,ready:typeof rpc.GetDragonBoatRandAward==='function',

  signature:`${Number(b.beforeFlag||0)}|${Number(b.flag||0)}|${Number(b.myRanking||0)}`};

}

function stateSiege(){const row=sceneData(65),rpc=siegeRpc();

 const start=number(row?.[4]),end=number(row?.[5]),t=number(_Sa?.svrTime);

 const stateOk=Array.isArray(row)&&Number(row[0])===65&&start!==null&&end!==null&&t!==null&&t>start&&t<end;

 const phaseBoundary=number(_ft?._gY?.ins?.getCfgById?.(243800)?.[2]?.[0]);

 const phaseMs=phaseBoundary!==null&&phaseBoundary>=0?phaseBoundary*1000:300000;

 const phase=stateOk?(t>start+phaseMs?2:1):0;

 const eventModel=_Ba?._j6?.__vt?.ins;

 const fcUnlock=typeof _rka!=='undefined'&&_rka?.inst?.getFcIsOpen?.(874)===true;

 const unlock=fcUnlock;

 const next=number(eventModel?.nxtEnterTime);

 const joinTag=eventModel?.joinTag;

 return {ready:stateOk&&unlock&&typeof rpc?.rqEtScene==='function',start,end,time:t,

  phase,unlock,nextEnter:next,joinTag,haveRound:eventModel?.isHaveRound,

  modelFound:!!eventModel,signature:`${Number(row?.[2])}|${start}|${end}|${phase}|${String(joinTag)}|${String(eventModel?.isHaveRound)}`};

}

// Turn schedule records into a UI + server diagnostics list; no unverified RPC.

function probeEvent(k){

 const e=describe(k),base={...e,executable:false,action:'none',blocked:''};

 if(k==='ho_tong'){

  const x=stateEscort();const claim=x.state===2&&config.autoEscortClaim&&typeof escortRpc()?.getFairyAward==='function';

  const start=x.state===0&&x.left>0&&x.fairy>0&&x.isDouble&&e.active&&

     S.escortStarts<config.maxEscortStartsPerDay&&config.autoEscortFree&&

     typeof escortRpc()?.escortFairy==='function';

  return {...base,...x,executable:!!(claim||start),action:claim?'claim':start?'start':'wait',

   blocked:claim||start?'':!config.autoEscortFree&&x.state===0?'Can xac minh chi phi roi bat autoEscortFree':!x.isDouble?'No x2 flag':x.left===0?'Het luot':x.state===1?'Dang ho tong':

       'Khong co dieu kien send/claim'};

 }

 if(k==='dua_thuyen'){

  const x=stateBoat();const claim=x.ready&&x.beforeFlag&&!x.claimed&&config.autoBoatRankClaim;

  return {...base,...x,executable:claim,action:claim?'claim-rank':'wait',

   blocked:claim?'':!x.beforeFlag?'Chua co thuong xep hang cu':'Chua du dieu kien'};

 }

 if(k==='sa_thanh'){

  const x=stateSiege();const enter=x.ready&&e.active&&config.autoSaThanhJoin&&

   (x.nextEnter===null||x.time>=x.nextEnter)&&x.modelFound&&

   (x.phase===1||(x.phase===2&&x.haveRound===true&&x.joinTag!==true));

  return {...base,...x,executable:enter,action:enter?'enter':'wait',

   blocked:enter?'':!x.ready?'Server/event/chuc nang chua san sang':

    x.phase===2&&x.haveRound!==true?'Vong da day':'Chua den gio vao'};

 }

 return {...base,blocked:capability[k][1]};

}

// Each call runs inside the established V8 shared queue; never bypass its pending lock.

const defs=[

 {id:'e23_escort_claim',kind:'claim',k:'ho_tong',act:'claim',fn:p=>escortRpc().getFairyAward(),

  max:8,spend:'none'},

 {id:'e23_escort_start',kind:'work',k:'ho_tong',act:'start',fn:p=>{

    freshDay();S.escortStarts++;escortRpc().escortFairy();},max:3,spend:'none'},

 {id:'e23_boat_rank',kind:'claim',k:'dua_thuyen',act:'claim-rank',fn:p=>boatRpc().GetDragonBoatRandAward(),

  max:2,spend:'none'},

 {id:'e23_siege_enter',kind:'work',k:'sa_thanh',act:'enter',fn:p=>{

   const x=stateSiege();

   if(!x.ready||x.phase!==p.phase||x.signature!==p.signature||

      (x.phase===2&&(x.haveRound!==true||x.joinTag===true)))throw Error('Siege state changed');

   const map=x.phase===2?3102:3101;

   const ok=siegeRpc().rqEtScene(map);

   if(ok===false)throw Error('Client did not request siege entry');

 },max:3,spend:'none'}

];

function pluginProbe(d){if(!config.enabled||!isIdle())return {ready:false,signature:'inactive'};

 const p=probeEvent(d.k);const limitSpacing=now()-S.lastAction>=config.minimumActionSpacingMs;

 return {ready:limitSpacing&&p.executable&&p.action===d.act,

  signature:p.signature||'none',p};

}

function runDef(d,old){

 const current=pluginProbe(d);

 if(!current.ready||String(current.signature)!==String(old.signature))throw Error('Event state changed before queue execution');

 if(!isIdle())throw Error('Another event or quest is running');

 S.lastAction=now();S.sent++;d.fn(current.p);append('SENT '+d.id,{event:d.k,action:d.act});

}

for(const d of defs){

 try{

  V.register({id:d.id,name:`Su kien ${labels[d.k]} / ${d.act}`,kind:d.kind,enabled:true,

   verified:true,redIds:[],spend:d.spend,background:false,hourlyLimit:d.max,

   cooldownMs:10000,probe:()=>pluginProbe(d),run:old=>runDef(d,old)});

  S.plugins.set(d.id,true);

 }catch(e){S.errors++;S.lastError=String(e);console.warn('[EVENTS13] Register',d.id,e);}

}



function watch(){if(!config.enabled || String(_Ba?._rJ?._O$?.ins?.actorId??'')!==ACTOR)return;

 const rows=keys.map(probeEvent);S.snapshot=rows;S.lastTick=now();

 for(const r of rows){

   if(!r.active)continue;

   const id=`${clock().date}:${r.key}:${r.mode}`;

   const t=S.alerts.get(id)||0;

   if(now()-t>config.noticeMs){S.alerts.set(id,now());

     console.info(`[EVENTS13] ${r.name}: ${r.mode}${r.executable?' (ready)':''}`,

       r.mode==='schedule'||r.mode==='trace'?r.blocked:r.action);

   }

 }

}



function start(){if(S.timer)return true;config.enabled=true;S.stopped=false;

 for(const id of S.plugins.keys()){

   // V9: ACK-guarded V8.6.25 owns these actions, never run two senders.

   if(W.KVPV_EVENTS25 && ['e23_escort_claim','e23_boat_rank','e23_siege_enter','e23_escort_start'].includes(id)){

     try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}continue;

   }

   try{V.toggle(id,true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

 }

 S.timer=__KVPV29.every(()=>{try{watch();}catch(e){S.errors++;S.lastError=String(e);}},config.pollMs);

 __KVPV29.tag(S.timer,'events13-watch',20);

 watch();return true;

}



function stop(){config.enabled=false;S.stopped=true;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

 for(const id of S.plugins.keys())try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}return true;

}



function status(print=true){const rows=keys.map(probeEvent);

 const out={enabled:config.enabled,actor:S.actor,autoDaily:D.quickState(),

  pluginCount:S.plugins.size,ready:rows.filter(x=>x.executable).length,

  verifiedAutoEvents:3,traceEvents:1,scheduleOnlyEvents:9,

  sent:S.sent,errors:S.errors,lastError:S.lastError,rows};

 if(print)console.table(rows.map(x=>({SuKien:x.name,Gio:x.times.join('; '),

  CheDo:x.mode,TrongGio:x.active,TacVu:x.action,DungDuoc:x.executable,

  GhiChu:x.executable?'Sẵn sàng':x.blocked})));return out;

}

function inspect(k,verbose=false){if(!keys.includes(k))throw Error('Unknown event: '+k);

 const r=probeEvent(k);if(verbose)console.log('[EVENTS13] INSPECT',r);

 return r;

}

function summary(){const r=status(false);const cnt={total:r.rows.length,verifiedNative:3,

  fullCombatAutomation:0,partialAuto:r.rows.filter(x=>['auto','partial-auto'].includes(x.mode)).length,

  trace:r.rows.filter(x=>x.mode==='trace').length,

  scheduleOnly:r.rows.filter(x=>x.mode==='schedule').length};

 console.table([cnt]);return cnt;

}



function exportReport(){

 const content=JSON.stringify({version:'8.6.23',at:new Date().toISOString(),actor:S.actor,

  summary:summary(),status:status(false),logs:S.records.slice(-70)},null,2);

 const blob=new Blob([content],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob);

 const a=document.createElement('a');a.href=url;a.download=`KVPV_EVENTS13_${clock().date}.json`;

 a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);return a.download;

}

W.KVPV_EVENTS13={config,keys:[...keys],start,stop,status,summary,inspect,

  diagnostics:()=>({status:status(false),logs:S.records.slice(-40),plugins:[...S.plugins.keys()]}),

  exportReport,refresh:watch,version:'8.6.23'};

start();

console.log('[V8.6.23] 13 su kien da dang ky. 3 co native actions an toan (Ho Tong, Dua Thuyen nhan BXH, Sa Thanh vao tran); 1 trace; 9 can xac minh lenh. KVPV_EVENTS13.status()');

})();



/* KVPV MAIN SOLO V8.6.24 - VERIFIED EVENT REWARDS + AUDIT
 * Extends V8.6.23. No speculative entry/combat, premium currency, or auto-spending.
 * Client source: 17,606,388-byte JS, _Ba._$d._X_t.ins (WorldOverlord / Tho Hao).
 * Auto: rank reward, boss-kill reward, eligible personal lucky reward.
 * Read-only event-info refresh via GetWorldOverlordInfo, server ACK 5874.
 * Actual claims verified by native success notifications 5875/5883.
 */

(() => {

  'use strict';

  const W=window, E=W.KVPV_EVENTS13, V=W.KVPV_V8, D=W.KVPV_DAILY;

  const ID=window.__KVPV_OWN_ACTOR_ID;

  if (!E?.inspect || !V?.register || !V?.toggle || !D?.quickState ||

      typeof _Ba==='undefined' || typeof _Sa==='undefined') {

    console.error('[V8.6.24] Nap V8.6.23 MAIN SOLO truoc, dung game-frame');return;

  }

  const actor=String(_Ba?._rJ?._O$?.ins?.actorId??'');

  if(actor!==ID){console.error('[V8.6.24] Sai acc chinh; khong nap:',actor);return;}

  if(W.KVPV_EVENTS24?.version==='8.6.24'){

    W.KVPV_EVENTS24.start();console.info('[V8.6.24] Da nap truoc do');return;

  }

  // Explicitly disable potentially costly/unsupported operations on the main account.

  E.config.autoEscortFree=false; E.config.allowPremium=false;

  const C={enabled:true,autoWorldRankReward:true,autoWorldKillReward:true,autoWorldLuckyReward:true,

    autoWorldInfoRefresh:true,refreshIntervalMs:20*60*1000,

    noAckLockMs:90*60*1000,allowPremium:false,recordLimit:150,

    alertStaleMinutes:30,verbose:false};

  const S={registrations:[],records:[],hooks:[], errors:0,lastError:'',

    acks:{info:0,rank:0,kill:0,lucky:0},locks:{},sent:{info:0,rank:0,kill:0,lucky:0},

    lastRefreshAt:0,lastAckDay:{rank:'',kill:'',lucky:''},disabled:false,traceStartedByUs:false,

    lastEventState:new Map()};

  const now=()=>Date.now();

  const world=()=>_Ba?._$d?._oet?.ins;

  const rpc=()=>_Ba?._$d?._X_t?.ins;

  const actorOK=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'')===ID;

  const safeIdle=()=>{const st=D.quickState?.();return actorOK()&&!!st?.running&&

    st?.job==='rảnh'&&st?.common===true&&_Ba?._$a?.SceneUtil?.isCommonScene===true&&

    _Ba?._$a?._yo?.ins?.isInMission!==true&&_Ba?._$a?._yo?.ins?.isInArena!==true;};

  const vnDay=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+2*3600000).toISOString().slice(0,10);

  const N=x=>Number.isFinite(Number(x))?Number(x):null;

  

  function log(msg,details){

    S.records.push({at:new Date().toISOString(),msg,details:details??null});

    if(S.records.length>C.recordLimit)S.records.shift();

    if(C.verbose)console.info('[EVENTS24]',msg,details??'');

  }

  function getState(k){

    const m=world(),r=rpc();

    if(!m||!r)return {ready:false,signature:'missing-model',reason:'Model/RPC Tho Hao chua tai'};

    if(k==='rank'){

      const val=N(m.rankRState),first=m.isFirst===true;

      const signature=`rank|${val}|${first}|ack:${S.acks.rank}`;

      return {ready:C.autoWorldRankReward&&val===1&&!first&&

        typeof r.GetWorldOverlordRankReward==='function',signature,rankState:val,isFirst:first};

    }

    if(k==='kill'){

      const arr=Array.isArray(m.allRewards)?m.allRewards:[];

      const signature=`kill|${JSON.stringify(arr).slice(0,500)}|ack:${S.acks.kill}`;

      return {ready:C.autoWorldKillReward&&arr.length>0&&

        typeof r.GetWorldOverlordKillReward==='function',signature,remaining:arr.length};

    }

    if(k==='lucky'){

      const rows=Array.isArray(m.worldOverlordLuckyRecord)?m.worldOverlordLuckyRecord:[];

      // Client's successful handler shifts the FIRST record, so require that

      // the first record is ours (not just any row in a shared list).

      const row=rows[0],token=N(row?.[2]),mine=String(row?.[0]??'')===ID;

      const claimState=token!==null&&typeof m.getLuckstate==='function'?N(m.getLuckstate(token)):null;

      const signature=`lucky|${String(token)}|${mine}|${claimState}|ack:${S.acks.lucky}`;

      return {ready:C.autoWorldLuckyReward&&mine&&token!==null&&token>=0&&

        claimState===0&&typeof r.GetWorldOverlordLucky==='function',

        signature,token,mine,claimState};

    }

    if(k==='info'){

      const available=E.status(false)?.rows?.some(x=>x.key==='diet_tho_hao'&&x.active===true)===true;

      const signature=`info|${vnDay()}|ack:${S.acks.info}|world:${N(m.worldOverlordNum)}`;

      return {ready:C.autoWorldInfoRefresh&&available&&

        now()-S.lastRefreshAt>=C.refreshIntervalMs&&

        typeof r.GetWorldOverlordInfo==='function',signature,inEvent:available};

    }

    return {ready:false,signature:'unknown'};

  }

  function claimProbe(k){

    const p=getState(k),lock=S.locks[k],t=now();

    if(!C.enabled||S.disabled||!safeIdle())return {ready:false,signature:p.signature};

    if((k==='rank'||k==='kill'||k==='lucky')&&S.lastAckDay[k]===vnDay())

      return {ready:false,signature:p.signature,reason:'Already confirmed reward claim today'};

    if(lock&&k!=='info'&&lock.at&&vnDay()===lock.day){

      return {ready:false,signature:p.signature,reason:'Claim sent; wait for ACK or next day'};

    }

    if(lock&&lock.signature===p.signature&&(k!=='info'||t<lock.blockUntil)){

      return {ready:false,signature:p.signature,reason:'Waiting for server update, no duplicate send'};

    }

    if(lock&&t<lock.blockUntil&&k==='info')return {ready:false,signature:p.signature};

    return {ready:p.ready===true,signature:p.signature,detail:p};

  }

  // Original client notification signals are emitted AFTER success.

  // 5875 = successful WorldOverlord rank reward; 5883 = successful kill reward;

  // 5874 = updated info. Callbacks may also come from UI, so never treat

  // a notification as a verified transaction if we did not send one.

  const notify=_Sa?.notify;

  const observer={

    onWorldInfo(){S.acks.info++;log('ACK info Tho Hao');},

    onWorldRank(){if(S.sent.rank>0){S.acks.rank++;S.sent.rank--;S.lastAckDay.rank=vnDay();log('ACK rank Tho Hao');}},

    onWorldKill(){if(S.sent.kill>0){S.acks.kill++;S.sent.kill--;S.lastAckDay.kill=vnDay();log('ACK kill reward Tho Hao');}},

    onWorldLucky(){if(S.sent.lucky>0){S.acks.lucky++;S.sent.lucky--;S.lastAckDay.lucky=vnDay();log('ACK lucky reward Tho Hao');}}

  };

  if(typeof notify?.on==='function'){

    for(const [code,cb] of [[5874,'onWorldInfo'],[5875,'onWorldRank'],[5883,'onWorldKill'],[5880,'onWorldLucky']]){

      try{notify.on(code,observer,observer[cb]);S.hooks.push({code,cb});}

      catch(e){S.errors++;S.lastError=String(e);}

    }

  }

  // Do not register native actions without their server notification listener.

  function install(k,kind,action){

    const required=k==='rank'?5875:k==='kill'?5883:k==='lucky'?5880:5874;

    if(!S.hooks.some(x=>x.code===required)){

      log('SKIP plugin: missing notification hook',{k,required});return;

    }

    const id=`e24_world_${k}`;

    V.register({id,name:`Tho Hao / ${k} (native, server ACK)`,kind,

      enabled:true,verified:true,redIds:[],spend:'none',background:false,

      hourlyLimit:k==='info'?3:2,cooldownMs:k==='info'?180000:120000,

      probe:()=>claimProbe(k),run:old=>{

        const fresh=claimProbe(k);

        if(!fresh.ready||fresh.signature!==old.signature||!actorOK()||!safeIdle())

          throw Error('Changed server state or not idle');

        const m=world(),r=rpc();

        if(!m||!r||typeof r[action]!=='function')throw Error('RPC not loaded');

        if(k==='rank'&&(N(m.rankRState)!==1||m.isFirst===true))throw Error('Rank reward not claimable');

        if(k==='kill'&&(!Array.isArray(m.allRewards)||m.allRewards.length===0))throw Error('Kill reward not claimable');

        if(k==='lucky'&&!getState('lucky').ready)throw Error('Lucky reward not claimable');

        if(k==='info'&&!E.status(false)?.rows?.some(x=>x.key==='diet_tho_hao'&&x.active===true))throw Error('Event already closed');

        // Lock BEFORE sending: a timed-out action is not blindly repeated.

        S.locks[k]={signature:fresh.signature,at:now(),day:vnDay(),blockUntil:now()+C.noAckLockMs};

        if(k==='info')S.lastRefreshAt=now();

        else S.sent[k]++;

        try{if(k==='lucky')r[action](fresh.detail.token);

          else r[action]();log('SENT '+id,{signature:fresh.signature});}

        catch(e){

          // V9: never replay an unacknowledged reward request merely due to client exceptions.

          const lock=S.locks[k];if(lock){lock.error=String(e);lock.uncertain=true;}

          log('UNCERTAIN '+id,{error:String(e),locked:true});

          throw e;

        }

      }});

    S.registrations.push(id);

  }

  try{install('rank','claim','GetWorldOverlordRankReward');}

  catch(e){S.errors++;S.lastError=String(e);console.warn('[EVENTS24] rank registration',e);}

  try{install('kill','claim','GetWorldOverlordKillReward');}

  catch(e){S.errors++;S.lastError=String(e);console.warn('[EVENTS24] kill registration',e);}

  try{install('lucky','claim','GetWorldOverlordLucky');}

  catch(e){S.errors++;S.lastError=String(e);console.warn('[EVENTS24] lucky registration',e);}

  try{install('info','work','GetWorldOverlordInfo');}

  catch(e){S.errors++;S.lastError=String(e);console.warn('[EVENTS24] info registration',e);}

  const categories={

    tien_phuc:'Cần xác minh nút/điều kiện Tiên Phúc; thời điểm hiển thị có thể chỉ là thông báo',

    dua_thuyen:'Có nhận thưởng BXH; Trợ uy dùng Nguyên Bảo nên KHÔNG auto; chưa tự đua',

    ho_tong:'Tự nhận thưởng, chưa tự bắt đầu nếu chưa xác minh chi phí',

    trieu_hoi:'Thiếu lệnh triệu hồi và cách xác nhận không tốn tài nguyên',

    tien_ton:'Có trình theo dõi thao tác; chưa tìm đủ lệnh khiêu chiến',

    diet_tho_hao:'Bổ sung nhận thưởng xếp hạng/diệt BOSS/may mắn và tải thông tin, chưa tự đánh',

    tranh_ba_tu_phuong:'Chưa xác minh lệnh vào và phân biệt với Tranh Bá Đỉnh Cao',

    tien_ma:'Chưa xác minh lệnh tham chiến và trạng thái server',

    tien_duyen_tac_chien:'Tự gửi lệnh vào map 2811/2813 khi lịch mở; chưa tự mời Tiên Lữ',

    chien_doi:'Chưa xác minh lệnh vào và vai trò đội',

    sa_thanh:'Có vào bản đồ theo trạng thái vòng; chưa tự PK/nhiệm vụ bên trong',

    tam_tien:'Chưa xác minh lệnh và điều kiện liên server 30 ngày',

    thien_the:'Chưa xác minh lệnh và điều kiện liên server 30 ngày'};

  

  function status(print=true){

    const b=E.status(false);

    const rows=b.rows.map(x=>({

      key:x.key,event:x.name,time:x.times.join(', '),active:x.active,

      mode:x.key==='diet_tho_hao'?'auto-reward-only':x.mode,

      readyNative:x.executable===true||x.key==='diet_tho_hao'&&

        (getState('rank').ready||getState('kill').ready||getState('lucky').ready),

      details:categories[x.key]??x.blocked}));

    const out={version:'8.6.24',actor,enabled:C.enabled,autoDaily:D.quickState(),

      eventCount:rows.length,registered:S.registrations.length,

      actions:{rank:getState('rank'),kill:getState('kill'),lucky:getState('lucky'),info:getState('info')},

      acks:{...S.acks},locks:{...S.locks},errors:S.errors,

      lastError:S.lastError,rows};

    if(print)console.table(rows.map(x=>({SuKien:x.event,TrongGio:x.active,CheDo:x.mode,

      SanSang:x.readyNative,ConThieu:x.details})));

    return out;

  }

  function missing(){const x=status(false).rows.filter(y=>!['auto','partial-auto','auto-reward-only'].includes(y.mode));

    console.table(x);return x;}

  function diagnostics(){const out={...status(false),

    event23:E.diagnostics?.(),eventsQueue:V.report?.().plugins.filter(x=>

      x.id?.startsWith('e24_')||x.id?.startsWith('e23_')),

    recentRecords:S.records.slice(-40),escortAllowed:E.config.autoEscortFree===true,

    unsafeCheerEnabled:false};console.log(out);return out;}

  

  function start(){if(!actorOK())return false;S.disabled=false;C.enabled=true;

    for(const id of S.registrations)try{V.toggle(id,true);}catch(e){log('toggle-error',String(e));}

    return true;}

  

  function stop(){C.enabled=false;S.disabled=true;

    for(const id of S.registrations)try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    // No active interval; hooks remain until unload for clean ACK counting.

    return true;}

  

  function exportReport(){

    const data={date:new Date().toISOString(),version:'8.6.24',

      status:status(false),diagnostics:{lastError:S.lastError,logs:S.records.slice(-50)}};

    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'});

    const url=URL.createObjectURL(blob),el=document.createElement('a');

    el.href=url;el.download=`KVPV_EVENTS24_${vnDay()}.json`;el.click();

    setTimeout(()=>URL.revokeObjectURL(url),5000);return el.download;

  }

  W.KVPV_EVENTS24={version:'8.6.24',config:C,status,missing,diagnostics,

    start,stop,exportReport,worldRewardStatus:()=>({rank:getState('rank'),

      kill:getState('kill'),lucky:getState('lucky'),info:getState('info'),acks:{...S.acks}}),

    clientEvidence:{rank:'GetWorldOverlordRankReward / rankRState=1',

      kill:'GetWorldOverlordKillReward / allRewards.length>0',

      lucky:'GetWorldOverlordLucky / own first record / getLuckstate(token)=0',

      info:'GetWorldOverlordInfo / notify 5874',

      premiumCheer:'DragonBoatCheer(0) uses Trợ Uy Nguyên Bảo; disabled'}};

  console.info('[V8.6.24] Main Solo event audit READY',

    {registered:S.registrations,missing:status(false).rows.filter(x=>x.mode==='schedule').length,

      premiumDragonCheer:'disabled'});

})();



/* V8.6.25 EVENT ACK GUARD - SOLO MAIN ONLY */

/* KVPV MAIN SOLO V8.6.25 - EVENT ACK GUARD / NO-BLIND-RETRY
 * Extends FULL V8.6.24, main character only.
 * Evidence checked in 17,606,388-byte KVPV client:
 * DragonBoat: GetDragonBoatRandAward -> native _P0n -> model.getRankAward; on code=0 notify 6315.
 * Escort: getFairyAward -> native _Gkh (code=0 opens reward panel, no notify);
 *         fairy model updates -> notify 5464, require sendState leave state 2.
 * Siege: rqEtScene(3101/3102), require scene/state change before further attempt.
 * Read-only dragon race standings: GetDragonBoatRandData.
 * All requests sent only via KVPV_V8 shared queue; no auto currency spending,
 * no betting/cheering, no random guessed opcode, no team or clone account.
 */

(() => {

  'use strict';

  const W=window, D=W.KVPV_DAILY, V=W.KVPV_V8, E=W.KVPV_EVENTS13;

  const ACCOUNT=window.__KVPV_OWN_ACTOR_ID, VERSION='8.6.25';

  if(W.KVPV_EVENTS25?.version===VERSION){W.KVPV_EVENTS25.start();return;}

  if(!D?.quickState || !V?.register || !V?.toggle || !E?.status || !W.KVPV_EVENTS24 ||

     typeof _Ba==='undefined'||typeof _Sa==='undefined'){

    console.error('[EVENTS25] Need V8.6.24 FULL in game frame');return;

  }

  const identity=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'');

  if(identity()!==ACCOUNT){console.error('[EVENTS25] Refused wrong character',identity());return;}

  const cfg={enabled:true,boatRankClaim:true,escortRewardClaim:true,

    boatInfoRefresh:true,siegeJoin:true,allowPremium:false,

    pollMs:1100,infoCooldownMs:20*60000,ackDeadlineMs:180000,

    minimumSpacingMs:3500,

    persistLocks:true,verbose:false};

  const S={ids:[],hooks:[],timer:null,lastSend:0,logs:[],errors:0,lastError:'',

    sent:{boat:0,escort:0,siege:0,info:0},acks:{boat:0,escort:0,siege:0,info:0},

    pending:{},locks:{},lastInfo:0,lastScene:null,enabled:true};

  const now=()=>Date.now();

  const day=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+2*3600000).toISOString().slice(0,10);

  const storeKey='KVPV_EVENT25_MAIN_SOLO_'+ACCOUNT;

  function save(){if(!cfg.persistLocks)return;

    try{sessionStorage.setItem(storeKey,JSON.stringify({day:day(),locks:S.locks}));}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

  function load(){if(!cfg.persistLocks)return;

    try{const row=JSON.parse(sessionStorage.getItem(storeKey)||'null');

      if(row?.locks&&typeof row.locks==='object')S.locks=Object.fromEntries(Object.entries(row.locks).filter(([,lock])=>row.day===day()||['waiting','unconfirmed'].includes(lock?.status)));

    }catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

  load();

  const note=(msg,data)=>{S.logs.push({at:new Date().toISOString(),msg,data:data??null});

    if(S.logs.length>100)S.logs.shift();if(cfg.verbose)console.info('[EVENTS25]',msg,data??'');};

  const boat=()=>_Ba?._htt?._stt?.inst;

  const boatApi=()=>_Ba?._htt?._z0n?.inst;

  const fairy=()=>_Ba?._m8?._gmi?.ins;

  const fairyApi=()=>_Ba?._m8?._bmi?.ins;

  const siegeApi=()=>_Ba?._sst?._Cht?.inst;

  const scene=()=>Number(_Ba?._$a?.SceneUtil?.curScene);

  function soloIdle(){const d=D.quickState?.();return cfg.enabled&&S.enabled&&identity()===ACCOUNT&&

    !!d?.running&&d?.job==='rảnh'&&d?.common===true&&

    _Ba?._$a?.SceneUtil?.isCommonScene===true&&

    _Ba?._$a?._yo?.ins?.isInMission!==true&&_Ba?._$a?._yo?.ins?.isInArena!==true;}

  const str=(x)=>String(x??'');

  function lockState(k){const l=S.locks[k];if(!l)return null;

    if(l.day!==day()&&!['waiting','unconfirmed'].includes(l.status)){delete S.locks[k];save();return null;}

    return l;}

  const locked=k=>{const l=lockState(k);if((k==='info'||k==='siege')&&l?.status==='confirmed')return false;

    return !!l&&(l.status==='waiting'||l.status==='unconfirmed'||l.status==='confirmed');};

  function makePending(k,sig){const x={day:day(),at:now(),status:'waiting',signature:sig};

    S.locks[k]=x;S.pending[k]=x;save();return x;}

  function confirm(k,reason){const x=S.pending[k];if(!x)return;

    x.status='confirmed';x.ackAt=now();x.reason=reason;S.acks[k]++;delete S.pending[k];save();note('ACK '+k,{reason});}

  function checkExpired(){for(const [k,l] of Object.entries(S.pending)){

      if(now()-l.at>=cfg.ackDeadlineMs){l.status='unconfirmed';delete S.pending[k];save();

        note('UNCONFIRMED; no blind retry '+k,{sentAt:l.at});

        console.warn('[EVENTS25] Chua co ACK, khoa lenh tranh gui trung:',k);}

    }}

  const boatState=()=>{const m=boat();return {

    supported:!!m&&typeof boatApi()?.GetDragonBoatRandAward==='function',

    oldRank:Boolean(m?.beforeFlag),rank:Number(m?.myRanking||0),claimed:Boolean(m?.flag),

    signature:`${m?.beforeFlag??'x'}|${m?.myRanking??'x'}|${m?.flag??'x'}`};};

  const escortState=()=>{const m=fairy();return {supported:!!m&&typeof fairyApi()?.getFairyAward==='function',

    sendState:Number(m?.sendState),escortCount:Number(m?.escort),fairyId:Number(m?.fairyId),

    signature:`${m?.sendState??'x'}|${m?.escort??'x'}|${m?.endTime??'x'}|${m?.fairyId??'x'}`};};

  function siegeState(){

    // E.inspect() emits a Console INSPECT every ~1.1s even on non-siege days.

    // The legacy observer must use the silent probe, never open/enter a scene.

    const p=E.status(false).rows.find(x=>x.key==='sa_thanh');

    return p||{ready:false,signature:'none'};

  }

  function state(k){

    if(k==='boat')return boatState();

    if(k==='escort')return escortState();

    if(k==='siege')return siegeState();

    if(k==='info')return {signature:`info|${day()}|${S.acks.info}`,supported:!!boatApi()?.GetDragonBoatRandData};

    return {signature:'invalid'};

  }

  function observe(){checkExpired();

    const b=boatState(),f=escortState(),s=scene();

    if(S.pending.boat&&b.claimed)confirm('boat','server model: DragonBoat.flag=1');

    if(S.pending.escort&&f.sendState!==2&&Number.isFinite(f.sendState))

      confirm('escort','server model: Fairy.sendState != 2');

    // V9: scene 65 alone is not enough if the server placed us in an unrelated map.

    // Never release the entry lock on arbitrary scene transitions.

    const siegeMap=Number(_Ba?._$a?._yo?.ins?.intoSce?.[0]);

    if(S.pending.siege&&s===65&&[3101,3102].includes(siegeMap))

      confirm('siege','server confirmed castle scene 65 / map '+siegeMap);

    S.lastScene=s;

  }

  const listener={boat(){if(S.pending.boat)confirm('boat','native notify 6315');},

    fairy(){const f=escortState();if(S.pending.escort&&f.sendState!==2&&Number.isFinite(f.sendState))

      confirm('escort','native notify 5464 + state change');},

    rank(){if(S.pending.info)confirm('info','native notify 6310: rank data updated');}};

  let boatAckSubscribed=false;

  if(typeof _Sa?.notify?.on==='function'){

    for(const [id,m] of [[6315,'boat'],[5464,'fairy'],[6310,'rank']]){

      try{_Sa.notify.on(id,listener,listener[m]);S.hooks.push(id);

        if(id===6315)boatAckSubscribed=true;}

      catch(e){S.errors++;S.lastError=str(e);}

    }

  }

  function offer(k){observe();const p=state(k);

    let reason='';

    if(!soloIdle())reason='Auto busy / not on main';

    else if(now()-S.lastSend<cfg.minimumSpacingMs)reason='Spacing';

    else if(locked(k))reason='Sent, ACK confirmed/awaiting or locked until next day';

    else if(k==='boat'&&(!cfg.boatRankClaim||!boatAckSubscribed||!p.supported||

      !p.oldRank||p.claimed||p.rank<=0))reason='Boat rank not claimable / ACK hook missing';

    else if(k==='escort'&&(!cfg.escortRewardClaim||!p.supported||p.sendState!==2))reason='Escort reward not claimable';

    else if(k==='siege'){

      if(!cfg.siegeJoin||!p.executable||p.action!=='enter'||!p.active)reason='Siege not enterable';

    }else if(k==='info'){

      const b=boat();const r=E.status(false).rows.find(x=>x.key==='dua_thuyen');

      if(!cfg.boatInfoRefresh||typeof boatApi()?.GetDragonBoatRandData!=='function'||

         !r?.active||now()-S.lastInfo<cfg.infoCooldownMs||!b)reason='Race inactive / refresh cooldown';

    }

    const sig=p.signature??'none';

    return {ready:!reason,signature:str(sig)+'|serverAck:'+S.acks[k],reason,detail:p};

  }

  function send(k,previous){const x=offer(k);

    if(!x.ready||x.signature!==str(previous.signature)||!soloIdle())throw Error('State changed or no longer idle');

    const a=k==='boat'?boatApi():k==='escort'?fairyApi():k==='siege'?siegeApi():boatApi();

    const op=k==='boat'?'GetDragonBoatRandAward':k==='escort'?'getFairyAward':

      k==='siege'?'rqEtScene':'GetDragonBoatRandData';

    if(typeof a?.[op]!=='function')throw Error('Native method not available');

    let args=[];

    if(k==='siege'){

      const p=x.detail;

      if(!p.ready||!p.executable||!p.phase)throw Error('Siege phase not ready');

      args=[p.phase===2?3102:3101];

    }

    const l=makePending(k,x.signature);

    S.lastSend=now();S.sent[k]++;

    if(k==='info')S.lastInfo=now();

    try{const result=a[op](...args);

      if(result===false)throw Error('Native call rejected');

      note('SENT '+k,{op,args,signature:x.signature});

    }catch(e){

      // V9: an exception or false return does NOT prove that the RPC was not sent.

      // Keep the durable pending lock until a confirmed response / next-day review.

      const pending=S.pending[k];

      if(pending){pending.error=String(e);pending.status='waiting';save();}

      // Retain pending so a later legitimate server ACK can still confirm it.

      // The existing deadline will mark it unconfirmed without allowing replay.

      note('UNCERTAIN '+k+'; no automatic retry',{error:String(e)});

      throw e;

    }

    // No fake ACK on RPC return; only listener/server state confirms.

  }

  const defs=[

    {k:'boat',id:'e25_boat_rank_ack',kind:'claim',name:'Dua Thuyen: BXH, native ACK 6315',hourly:1,cd:120000},

    {k:'escort',id:'e25_escort_reward_ack',kind:'claim',name:'Ho Tong: nhan thuong, state ACK',hourly:1,cd:120000},

    {k:'siege',id:'e25_siege_guard',kind:'work',name:'Sa Thanh: vao theo cooldown va vong server, state ACK',hourly:60,cd:3500},

    {k:'info',id:'e25_boat_rank_refresh',kind:'work',name:'Dua Thuyen: lam moi BXH (read-only)',hourly:3,cd:cfg.infoCooldownMs}

  ];

  const legacy={boat:'e23_boat_rank',escort:'e23_escort_claim',siege:'e23_siege_enter'};

  for(const d of defs){

    try{

      V.register({id:d.id,name:d.name,kind:d.kind,enabled:true,verified:true,

        redIds:[],spend:'none',background:false,hourlyLimit:d.hourly,

        cooldownMs:d.cd,probe:()=>offer(d.k),run:old=>send(d.k,old)});

      S.ids.push(d.id);

      if(legacy[d.k])try{V.toggle(legacy[d.k],false);}catch(_){/* no older plugin */}

    }catch(e){S.errors++;S.lastError=str(e);console.warn('[EVENTS25] Could not register',d.id,e);}

  }

  // Avoid duplicated older escort-start button: cost not verified and SOLO is unattended.

  E.config.autoEscortFree=false;

  try{V.toggle('e23_escort_start',false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  

  function start(){if(identity()!==ACCOUNT)return false;

    cfg.enabled=true;S.enabled=true;E.config.autoEscortFree=false;

    for(const id of S.ids)try{V.toggle(id,true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    // Disabled legacy while ACK-safe replacements are enabled.

    for(const k of ['boat','escort','siege'])

      if(S.ids.includes(defs.find(d=>d.k===k)?.id))try{V.toggle(legacy[k],false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{V.toggle('e23_escort_start',false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    if(!S.timer)S.timer=__KVPV29.every(()=>{try{observe();}catch(e){S.errors++;S.lastError=str(e);}},cfg.pollMs);

    __KVPV29.tag(S.timer,'event-ack-observer',15);

    observe();return true;

  }

  

  function stop(){S.enabled=false;cfg.enabled=false;

    if(S.timer){__KVPV29.cancel(S.timer);S.timer=null;}

    for(const id of S.ids)try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    return true;

  }

  

  function status(print=true){observe();const actions=defs.map(d=>{const p=offer(d.k);return {

      key:d.k,module:d.id,registered:S.ids.includes(d.id),ready:p.ready,

      reason:p.reason,pending:!!S.pending[d.k],lock:lockState(d.k)?.status||'',

      sent:S.sent[d.k],acks:S.acks[d.k],signature:p.signature};});

    const result={version:VERSION,actor:identity(),running:!!S.timer&&S.enabled,

      modules:S.ids.length,legacyAutoEscortDisabled:E.config.autoEscortFree===false,

      premiumDisabled:true,actions,errors:S.errors,lastError:S.lastError};

    if(print)console.table(actions);return result;}

  function missing(){const x=W.KVPV_EVENTS24.status(false).rows.filter(y=>

      !['auto','partial-auto','auto-reward-only'].includes(y.mode));

    console.table(x.map(y=>({Event:y.event,Mode:y.mode,Missing:y.details})));return x;}

  function diagnostics(){return {status:status(false),locks:S.locks,

    queue:V.report?.().plugins?.filter(x=>x.id.startsWith('e2')),

    event24:W.KVPV_EVENTS24.worldRewardStatus?.(),recent:S.logs.slice(-40)};}

  

  function exportReport(){const out={at:new Date().toISOString(),status:status(false),

      missing:W.KVPV_EVENTS24.status(false).rows.filter(x=>x.mode==='schedule'||x.mode==='trace'),

      diagnostics:diagnostics()};

    const blob=new Blob([JSON.stringify(out,null,2)],{type:'application/json'});

    const url=URL.createObjectURL(blob),a=document.createElement('a');

    a.href=url;a.download='KVPV_EVENTS25_'+day()+'.json';a.click();

    setTimeout(()=>URL.revokeObjectURL(url),5000);return a.download;}

  W.KVPV_EVENTS25={version:VERSION,config:cfg,status,missing,diagnostics,

    exportReport,start,stop,action:k=>offer(k),clearUnconfirmed(k){

      if(!['boat','escort','siege','info'].includes(k))throw Error('Unknown key');

      // Do not permit immediate re-issue after no ACK: only clear after server changed

      // or explicit manual intervention. Users can inspect first.

      const row=lockState(k);

      if(row?.status==='waiting'||row?.status==='unconfirmed')

        throw Error('Unsafe to clear lock without server confirmation');

      delete S.locks[k];save();return true;

    }};

  start();

  console.info('[V8.6.25] MAIN SOLO Event ACK Guard ready',

    {registered:S.ids,boatAck:boatAckSubscribed,neverAutoSpendPremium:true,

     missingAreStillDiagnostic:true});

})();



