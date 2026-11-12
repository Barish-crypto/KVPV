
/* Peak scene71 floor9: native NPC selection -> real gather panel click -> server ACK. */

(() => {

'use strict';const W=window,old=W.KVPV_EIGHT_CHEST,c=old?._handoff?.();old?.stop?.();

const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={enabled:true,timer:null,pending:same?c.pending:null,claimed:new Set(same?c.claimed:[]),lastSelect:-Infinity,clicks:same?c.clicks:0,confirmed:same?c.confirmed:0,reason:'waiting_floor9',error:'',listening:false};



const user=()=>W._Ba?._rJ?._O$?.ins,model=()=>W._Ba?._K_t?._Z7t?.ins;

const own=()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

const inside=()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===71&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9;

const day=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+7200000).toISOString().slice(0,10);

function expected(){return -1;}

const chestName=role=>/rương|ruong/.test(String(role?.property?.get?.('name')??'').toLocaleLowerCase('vi'));

const observer={};

function ack(){const p=S.pending;if(!S.enabled||!own()||!inside()||!p||String(model()?.tNpcId)!==p.id)return;S.claimed.add(p.key);S.pending=null;S.confirmed++;S.reason='server_gather_confirmed';}

function tick(){try{

if(!S.enabled||!own())return;

if(!S.listening&&typeof W._Sa?.notify?.on==='function'){W._Sa.notify.on(5038,observer,ack);S.listening=true;}

if(!inside()){S.reason='waiting_floor9';return;}

const key=day()+'/eight-floor9';if(S.claimed.has(key)){S.reason='already_confirmed';return;}if(S.pending){S.reason='waiting_server_ack_no_retry';return;}

if(user()?.isDead!==false){S.reason='waiting_revive';return;}

const occ=expected();

if(model()?.gathering===true){S.reason='native_gathering';return;}

const manager=W._ft?._Y4n?.ins,panel=manager?.getPanelById?.(166),id=model()?.tNpcId,role=W._C?._Ba?.instance?.getRole?.(id);

if(manager?.isOpened?.(166)===true&&panel?.parent&&panel.visible!==false&&String(panel._lhi)===String(id)&&chestName(role)&&typeof panel._tci==='function'&&Number(panel._sci)!==1){

 if(!S.listening){S.reason='waiting_ack_observer';return;}

 S.pending={key,id:String(id),occ,at:Date.now()};S.clicks++;S.reason='clicked_native_gather';panel._tci();return;

}

if(Date.now()-S.lastSelect>=5000&&typeof user()?.selectTar==='function'){S.lastSelect=Date.now();user().selectTar(3,occ);}

S.reason='moving_to_chest_waiting_native_panel';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}

function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(S.listening)W._Sa?.notify?.off?.(5038,observer,ack);S.listening=false;}

W.KVPV_EIGHT_CHEST=Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,inside:inside(),reason:S.reason,lastError:S.error,pending:S.pending,clicks:S.clicks,confirmed:S.confirmed,doneToday:S.claimed.has(day()+'/eight-floor9'),npcSelection:'native_nearest_chest_name_verified'}),_handoff:()=>({actor,pending:S.pending,claimed:[...S.claimed],clicks:S.clicks,confirmed:S.confirmed})});

S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);tick();

})();

