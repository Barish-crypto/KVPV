
'use strict';

const scopes=['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN','ROAD_TRIAL'];

function validCombatProfiles(profiles){return !!profiles&&typeof profiles==='object'&&!Array.isArray(profiles)&&Object.entries(profiles).every(([scope,p])=>scopes.includes(scope)&&p&&typeof p==='object'&&!Array.isArray(p)&&['mode','distance','intervalMs'].every(k=>Object.hasOwn(p,k))&&Object.keys(p).every(k=>['mode','distance','intervalMs','rideFollow','mansionFollow'].includes(k))&&['rideFollow','mansionFollow'].every(k=>p[k]===undefined||typeof p[k]==='boolean')&&(scope==='ROAD_TRIAL'?['native','basic8001']:['mixed','basic8001']).includes(p.mode)&&Number.isSafeInteger(p.intervalMs)&&p.intervalMs>=0&&p.intervalMs<=5000&&Number.isFinite(p.distance)&&p.distance>=(scope==='ROAD_TRIAL'?20:281)&&p.distance<=(scope==='ROAD_TRIAL'?150:600));}

module.exports={scopes,validCombatProfiles};

