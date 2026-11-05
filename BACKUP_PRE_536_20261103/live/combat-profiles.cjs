// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: scopes = tạo mảng gồm 5 vị trí: ['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN','ROAD_TRIAL']
const scopes=['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN','ROAD_TRIAL'];
// [VI dòng gốc 3] Định nghĩa hàm validCombatProfiles; tham số: profiles | Kết thúc hàm hiện tại và trả về: !!profiles&&typeof profiles==='object'&&!Array.isArray(profiles) và chỉ đánh giá vế phải khi vế trái truthy: Object.entries(profiles).every(([scope,p])=>scopes.includes(scope)&&p&&typeof p==='object'&&!Array.isArray(p)&&['mode','distance','intervalMs'].every(k=>Object.hasOwn(p,k))&&Object….
function validCombatProfiles(profiles){return !!profiles&&typeof profiles==='object'&&!Array.isArray(profiles)&&Object.entries(profiles).every(([scope,p])=>scopes.includes(scope)&&p&&typeof p==='object'&&!Array.isArray(p)&&['mode','distance','intervalMs'].every(k=>Object.hasOwn(p,k))&&Object.keys(p).every(k=>['mode','distance','intervalMs','rideFollow','mansionFollow'].includes(k))&&['rideFollow','mansionFollow'].every(k=>p[k]===undefined||typeof p[k]==='boolean')&&(scope==='ROAD_TRIAL'?['native','basic8001']:['mixed','basic8001']).includes(p.mode)&&Number.isSafeInteger(p.intervalMs)&&p.intervalMs>=0&&p.intervalMs<=5000&&Number.isFinite(p.distance)&&p.distance>=(scope==='ROAD_TRIAL'?20:281)&&p.distance<=(scope==='ROAD_TRIAL'?150:600));}
// [VI dòng gốc 4] gán module.exports bằng {scopes,validCombatProfiles}
module.exports={scopes,validCombatProfiles};
// [VI dòng gốc 5] Dòng trống để tách các phần, không có lệnh thực thi.
