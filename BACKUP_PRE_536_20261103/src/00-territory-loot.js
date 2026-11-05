(() => {
  'use strict';
  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  let cutoff=11,last={reason:'waiting_territory',selected:null,skipped:[]};
  const prop=(o,k)=>o?.property?.get?.(k);
  const groups={weapon:'than binh',fashion:'thoi trang',talisman:'linh ti',wings:'linh duc'};
  function lootKind(name){const text=String(name??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();return Object.keys(groups).find(key=>(' '+text+' ').includes(' '+groups[key]+' '))??null;}
  function percent(target){const hp=prop(target,'hp');if(!Array.isArray(hp))return null;const current=Number(hp[0]),max=Number(hp[1]);return Number.isFinite(current)&&Number.isFinite(max)&&current>=0&&max>0?current/max*100:null;}
  function active(){return actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId||'')&&!W.__KVPV_UNIVERSAL_HALTED&&W.KVPV_DAILY?.quickState?.()?.job==='lanhdia'&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])===2164;}
  function shouldBlock(target){if(!active()||Number(prop(target,'type'))!==1||!lootKind(prop(target,'name')))return false;const ids=W._Ba?._zLt?._VLt?.ins?.getBsList?.();return Array.isArray(ids)&&ids.some(id=>Number(id)===Number(prop(target,'occ')))&&percent(target)!==null&&percent(target)<=cutoff;}
  function decide({ids,final,selected,target,state,alive,dead=()=>false}){
    if(state.territoryLoot?.version!==2)state.territoryLoot={version:2,skipped:{},seenGroups:{}};
    const skipped=state.territoryLoot.skipped,seen=state.territoryLoot.seenGroups,list=Array.isArray(ids)?ids:[],pct=percent(target),occ=Number(prop(target,'occ')),kind=lootKind(prop(target,'name'));
    if(Number(prop(target,'type'))===1&&kind){const observed=list.find(id=>Number(id)===occ);if(observed!==undefined){seen[kind]=true;if(pct!==null&&pct<=cutoff)skipped[String(observed)]=pct;}}
    const eligible=id=>!Object.hasOwn(skipped,String(id))&&alive(id)===true;
    const next=list.find(id=>String(id)===String(selected)&&eligible(id))??list.find(id=>String(id)===String(final)&&eligible(id))??list.find(eligible)??null;
    const done=list.length>0&&Object.keys(groups).every(key=>seen[key]===true)&&list.every(id=>Object.hasOwn(skipped,String(id))||dead(id)===true);
    last={reason:done?'all_reward_cutoffs_reached':next===null?'waiting_available_boss':kind?'attack_for_drops':'kill_progression_boss',selected:next,cutoffHPPercent:cutoff,observedHPPercent:pct,observedBossName:String(prop(target,'name')??''),lootGroup:kind,seenLootGroups:Object.keys(seen),skipped:Object.keys(skipped)};
    return {next,done};
  }
  W.KVPV_TERRITORY_LOOT=Object.freeze({decide,shouldBlock,percent,lootKind,status:()=>({...last,cutoffHPPercent:cutoff,seenLootGroups:(last.seenLootGroups??[]).slice(),skipped:last.skipped.slice()}),setCutoff(value=11){if(!Number.isFinite(value)||value<0||value>=100)throw Error('HP cutoff must be 0..99.999 percent');cutoff=value;return cutoff;}});
})();
