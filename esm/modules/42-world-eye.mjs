import {getKVPV_UPGRADES as __getKVPV0,getKVPV_V1 as __getKVPV1,getKVPV_WORLD_EYE as __getKVPV2} from '../api.mjs';
export function call_KVPV_WORLD_EYE_sync(...args){const target=globalThis["KVPV_WORLD_EYE"];const fn=globalThis["KVPV_WORLD_EYE"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_WORLD_EYE.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_WORLD_EYE_stop(...args){const target=globalThis["KVPV_WORLD_EYE"];const fn=globalThis["KVPV_WORLD_EYE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_WORLD_EYE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_WORLD_EYE_status(...args){const target=globalThis["KVPV_WORLD_EYE"];const fn=globalThis["KVPV_WORLD_EYE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_WORLD_EYE.status is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
let __esmLocal4;
let __esmLocal5;
let __esmLocal6;
let __esmLocal7;
let __esmLocal8;
let __esmLocal9;
let __esmLocal10;
let __esmLocal11;
let __esmLocal12;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_call_2};
export {__esmLocal3 as local_note_3};
export {__esmLocal4 as local_discover_4};
export {__esmLocal5 as local_anonymous_44_47_5};
export {__esmLocal6 as local_read_6};
export {__esmLocal7 as local_anonymous_78_234_7};
export {__esmLocal8 as local_tick_8};
export {__esmLocal9 as local_changed_9};
export {__esmLocal10 as local_stop_10};
export {__esmLocal11 as local_status_11};
export {__esmLocal12 as local_anonymous_122_84_12};
export function initialize(){

/* Continuous observer, not a second sender. Wake existing guarded executors on change. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window;__getKVPV2()?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,map:null,task:null,taskDirty:false,inventoryDirty:false,lastInventory:-Infinity,lastRead:-Infinity,scans:0,changes:0,groups:{},actions:[],errors:{},history:[]};

  const listener={},notify=W._Sa?.notify??(typeof _Sa!=='undefined'?_Sa.notify:null);

  const owned=__captureESMFunction((__esmLocal1=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  const groups={boss:['KVPV_BASIC10','KVPV_HITRUN_AUTO'],dungeons:['KVPV_DAILY_TRIAL','KVPV_RUNE_BOSS','KVPV_SUMMON_BOSS','KVPV_BEAST_ISLAND'],

    bagSmeltCraft:['KVPV_BG_RESOURCES','KVPV_QUICK_USE','KVPV_CRAFT_LOW'],skillsCharacterPets:['KVPV_APPEARANCE_AUTO','KVPV_SKILL_REWARDS'],

    equipment:['KVPV_FABAO_FAST','KVPV_SOUL_STONE_FAST'],quests:['KVPV_QUEST_PRIORITY','KVPV_REBORN_GOALS','KVPV_SEASON_REWARDS']};

  function call(name,method){try{const api=W[name];if(typeof api?.[method]==='function')return api[method](false);}catch(e){S.errors[name]=String(e).slice(0,200);}return null;}
__esmLocal2=call;


  function note(kind,value){S.changes++;S.history.push({at:Date.now(),kind,value});if(S.history.length>30)S.history.shift();}
__esmLocal3=note;


  function discover(){const ui=W._ft?._Y4n?.ins,out=[];

    const ids=Object.keys(ui?.openTable??ui?._H$t??{}).slice(0,80);

    for(const raw of ids){try{const id=Number(raw);if(!Number.isSafeInteger(id)||ui?.isOpened?.(id)!==true)continue;

      const p=ui.getPanelById?.(id)||ui.getDialogById?.(id);if(!p?.parent||p.visible===false)continue;

      const queue=[{node:p,path:'',depth:0}],seen=new Set();let visited=0;

      while(queue.length&&visited++<160){const {node:b,path:key,depth}=queue.shift();

        if(!b||typeof b!=='object'||seen.has(b)||b.visible===false||b.destroyed===true)continue;seen.add(b);

        if(depth<4){

          for(const k of Object.keys(b).filter(__captureESMFunction((__esmLocal5=(k=>/btn|button|box|panel|item|list|view|tab/i.test(k))),"")).slice(0,40)){

            const child=b[k];if(child&&typeof child==='object'&&!Array.isArray(child))queue.push({node:child,path:key?key+'.'+k:k,depth:depth+1});

          }

          const children=b._children??b._childs;

          if(Array.isArray(children))for(const [i,child]of children.slice(0,40).entries())queue.push({node:child,path:key+'.children['+i+']',depth:depth+1});

        }

        if(!key)continue;

        const label=String(b.label??'').slice(0,100),n=label.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();

        if(!label||b.visible===false||b.destroyed===true)continue;

        const kind=/huy|cau cuu/.test(n)?'manual_control':/mua|nap|knb|nguyen bao/.test(n)?'paid_or_currency':/nhan/.test(n)?'claim':/dung luyen/.test(n)?'smelt':/dung/.test(n)?'use':/tang cap|tang nhanh|tang bac|kich hoat/.test(n)?'upgrade':/den|khieu chien/.test(n)?'navigate':'unknown';

        const ready=b.disabled!==true&&b.gray!==true&&b.mouseEnabled!==false;

        out.push({panel:id,className:String(p.constructor?.name??'').slice(0,80),key,label,kind,ready,

          decision:kind==='manual_control'?'manual_only':kind==='paid_or_currency'?'blocked_currency':!ready?'waiting_native_condition':'needs_verified_handler'});

        if(out.length>=80)return out;

      }

    }catch(e){S.errors.ui=String(e).slice(0,160);}}return out;

  }
__esmLocal4=discover;


  function read(){const cfg=__getKVPV0()?.config;S.groups.homeForge={available:!!cfg,managedBy:'KVPV_UPGRADES',claims:cfg?.tienPhu,upgrades:cfg?.phongThuy};for(const [group,names]of Object.entries(groups))S.groups[group]=names.map(__captureESMFunction((__esmLocal7=(name=>{

    const r=call(name,'status');return {name,available:!!W[name],reason:String(r?.reason??r?.phase??'').slice(0,160),enabled:r?.enabled,

      pending:!!r?.pending,requests:r?.requests,confirmed:r?.confirmed,error:String(r?.lastError??r?.error??'').slice(0,160)};

  })),""));}
__esmLocal6=read;


  function tick(){if(!S.enabled)return;if(!owned()){stop();return;}S.scans++;

    const now=Date.now(),map=String(W._C?._Mn?._Cn?.currentID??''),q=W._Ba?._zIt?._FIt?.ins?.taskInfo;

    const task=JSON.stringify(Array.isArray(q)?q.slice(0,3):null);

    if(map!==S.map){S.map=map;note('map',map);call('KVPV_MODE','syncMap');}

    const changed=task!==S.task;if(changed){S.task=task;S.taskDirty=true;note('task',task);}

    const userBusy=now<Number(W.__KVPV_USER_UI_UNTIL||0);

    if(!userBusy&&S.taskDirty){S.taskDirty=false;call('KVPV_QUEST_PRIORITY','sync');call('KVPV_REBORN_GOALS','sync');}

    if(!userBusy&&S.inventoryDirty&&now-S.lastInventory>=500){S.inventoryDirty=false;S.lastInventory=now;note('inventory','changed');

      for(const name of ['KVPV_APPEARANCE_AUTO','KVPV_SKILL_REWARDS','KVPV_FABAO_FAST','KVPV_SOUL_STONE_FAST','KVPV_PARALLEL_ACTIONS'])call(name,'sync');

    }

    if(now-S.lastRead>=2000){S.lastRead=now;read();S.actions=discover();}

  }
__esmLocal8=tick;


  listener.changed=__captureESMFunction((__esmLocal9=(()=>{S.inventoryDirty=true;})),"changed");

  if(typeof notify?.on==='function')for(const id of [5074,5079])notify.on(id,listener,listener.changed);

  function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV1()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;

    if(typeof notify?.off==='function')for(const id of [5074,5079])notify.off(id,listener,listener.changed);

  }
__esmLocal10=stop;


  W.KVPV_WORLD_EYE=Object.freeze({sync:tick,stop,status:__captureESMFunction((__esmLocal11=(()=>({enabled:S.enabled,mapPollMs:100,modelPollMs:2000,inventoryDebounceMs:500,

    map:S.map,scans:S.scans,changes:S.changes,groups:S.groups,actions:S.actions.map(__captureESMFunction((__esmLocal12=(a=>({...a}))),"")),errors:{...S.errors},history:S.history.slice()}))),"status")});

  S.timer=(__getKVPV1()?.timers?.setInterval??W.setInterval)(tick,100);tick();

})),""))();


}
export {getKVPV_WORLD_EYE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_WORLD_EYE(){return globalThis.KVPV_WORLD_EYE;},
});