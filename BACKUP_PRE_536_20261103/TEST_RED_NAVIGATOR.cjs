// [VI dòng gốc 1] Khai báo biến không gán lại bằng const: vm = gọi require('vm') để nạp module Node.js; fs = gọi require('fs') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const vm=require('vm'),fs=require('fs'),assert=require('node:assert/strict');
// [VI dòng gốc 2] Khai báo biến có thể gán lại bằng let: now = 10000; opened = 0; sent = 0; busy = false; pending = null; red = true; common = true | Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Set()
let now=10000,opened=0,sent=0,busy=false,pending=null,red=true,common=true;const timers=new Set();
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: m = tạo đối tượng gồm zhList, _csptMtlItem, _mtItemID, getCanUpZH | Định nghĩa lớp Native. | Khai báo biến không gán lại bằng const: panel = tạo đối tượng bằng Native() | gán panel.parent bằng {}
const m={zhList:[[1,5,0]],_csptMtlItem:[[100,10],[200,20]],_mtItemID:[100,10],getCanUpZH:()=>true};class Native{};const panel=new Native();panel.parent={};panel._mTi={get selIdx(){return m._mtItemID[0]===100?0:1;},set selIdx(i){m._mtItemID=m._csptMtlItem[i];}};
// [VI dòng gốc 4] Khai báo biến có thể gán lại bằng let: visible = false | Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_DAILY, KVPV_BG_RESOURCES, setInterval, clearInterval | Kết thúc hàm hiện tại và trả về: common. | gọi assert.equal(id, 192) để kiểm tra hai giá trị bằng nhau
let visible=false;const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345',equipsDic:{keys:[1]}}}},_eW:{_pEt:{inst:m},_NTi:Native},_Ic:{_aQ:{ins:{getItemCountById:id=>id===200?5:0}}},_Xo:{_Ko:{instance:{getRpKeyState:()=>red}}},_$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{isInMission:false}}}},_ft:{_Y4n:{ins:{openTable:{1:true},isOpened:()=>visible,getPanelById:()=>panel,openByActionId:id=>{assert.equal(id,192);opened++;visible=true;}}}},KVPV_DAILY:{quickState:()=>({running:true,job:'ranh'})},KVPV_BG_RESOURCES:{config:{enabled:{soulForge:true}},status:()=>({running:true,active:true,busy,pending,halted:{}}),tick:()=>{sent++;busy=true;pending={kind:'soulForge'};}},setInterval:f=>{timers.add(f);return f;},clearInterval:f=>timers.delete(f)};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(fs.readFileSync('src/44-red-navigator.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W,Date:{now:…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi load() | gọi assert.equal(opened, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(sent, 0) để kiểm tra hai giá trị bằng nhau
const load=()=>vm.runInNewContext(fs.readFileSync('src/44-red-navigator.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:{now:()=>now}});load();assert.equal(opened,1);assert.equal(sent,0);
// [VI dòng gốc 6] gọi W.KVPV_RED_NAVIGATOR.sync() | gọi assert.equal(m._mtItemID[0], 200) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(sent, 0, 'native material tab updates before worker') để kiểm tra hai giá trị bằng nhau
W.KVPV_RED_NAVIGATOR.sync();assert.equal(m._mtItemID[0],200);assert.equal(sent,0,'native material tab updates before worker');W.KVPV_RED_NAVIGATOR.sync();assert.equal(sent,1);
// [VI dòng gốc 7] gọi load() | gọi W.KVPV_RED_NAVIGATOR.sync() | gọi assert.equal(sent, 1, 'reload cannot resend unresolved operation') để kiểm tra hai giá trị bằng nhau | tăng m.zhList[0][1] một đơn vị sau khi lấy giá trị
load();W.KVPV_RED_NAVIGATOR.sync();assert.equal(sent,1,'reload cannot resend unresolved operation');m.zhList[0][1]++;busy=false;pending=null;red=false;W.KVPV_RED_NAVIGATOR.sync();assert.equal(W.KVPV_RED_NAVIGATOR.status().confirmed,1);
// [VI dòng gốc 8] gán red bằng true | gán common bằng false | gọi W.KVPV_RED_NAVIGATOR.sync() | gọi assert.equal(sent, 1, 'never open branch while fighting') để kiểm tra hai giá trị bằng nhau
red=true;common=false;W.KVPV_RED_NAVIGATOR.sync();assert.equal(sent,1,'never open branch while fighting');common=true;W.__KVPV_USER_UI_UNTIL=now+5000;W.KVPV_RED_NAVIGATOR.sync();assert.equal(sent,1,'manual UI gets priority');
// [VI dòng gốc 9] gọi W.KVPV_RED_NAVIGATOR.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(timers.size, 0) để kiểm tra hai giá trị bằng nhau | gọi console.log('PASS red navigator: verified action route, native child/material selection, existing sender, ACK and reload, combat/man…)
W.KVPV_RED_NAVIGATOR.stop();assert.equal(timers.size,0);console.log('PASS red navigator: verified action route, native child/material selection, existing sender, ACK and reload, combat/manual guards');
// [VI dòng gốc 10] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 11] gán W.__KVPV_USER_UI_UNTIL bằng 0 | cập nhật bằng toán tử += now bằng 6000 | gán common bằng true | Khai báo biến có thể gán lại bằng let: stoneCalls = 0; stoneOpens = 0
W.__KVPV_USER_UI_UNTIL=0;now+=6000;common=true;let stoneCalls=0,stoneOpens=0;W._Ba._ZE={_Qgt:{ins:{otherValue:[1],getValueByPos:()=>({keys:[10],get:()=>11})}}};
// [VI dòng gốc 12] gán W.KVPV_SOUL_STONE_FAST bằng {status:()=>({enabled:true,pending:false,error:'',reason:'ready'}),sync:()=>stoneCalls++}
W.KVPV_SOUL_STONE_FAST={status:()=>({enabled:true,pending:false,error:'',reason:'ready'}),sync:()=>stoneCalls++};
// [VI dòng gốc 13] gán W._ft._Y4n.ins.openByActionId bằng id=>{assert.equal(id,18);stoneOpens++;} | gọi assert.equal(id, 18) để kiểm tra hai giá trị bằng nhau | tăng stoneOpens một đơn vị sau khi lấy giá trị | gọi load()
W._ft._Y4n.ins.openByActionId=id=>{assert.equal(id,18);stoneOpens++;};load();assert.equal(stoneOpens,1);W.KVPV_RED_NAVIGATOR.sync();assert.equal(stoneCalls,1);assert.equal(stoneOpens,1,'unchanged branch is not reopened');
// [VI dòng gốc 14] gán W.KVPV_SOUL_STONE_FAST.status bằng ()=>({enabled:true,pending:true}) | gọi W.KVPV_RED_NAVIGATOR.sync() | gọi assert.equal(stoneCalls, 1, 'pending stone request not replayed by navigator') để kiểm tra hai giá trị bằng nhau | gọi W.KVPV_RED_NAVIGATOR.stop() để dừng bộ điều khiển và dọn tài nguyên
W.KVPV_SOUL_STONE_FAST.status=()=>({enabled:true,pending:true});W.KVPV_RED_NAVIGATOR.sync();assert.equal(stoneCalls,1,'pending stone request not replayed by navigator');W.KVPV_RED_NAVIGATOR.stop();
// [VI dòng gốc 15] gọi console.log('PASS soul stone red route: verified action 18, existing fast scanner only, no reopen or pending replay')
console.log('PASS soul stone red route: verified action 18, existing fast scanner only, no reopen or pending replay');
// [VI dòng gốc 16] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 17] gán W.KVPV_RED_NAVIGATOR bằng undefined | Định nghĩa lớp StrengthPanel. | Khai báo biến không gán lại bằng const: levelMap = tạo đối tượng bằng Map([[1,5]]) | gán W._Ba._Agt bằng {_Rgt:{ins:{partLev:{keys:[1],get:k=>levelMap.get(k)},isCanUpEquip:true}},_xUn:StrengthPanel}
W.KVPV_RED_NAVIGATOR=undefined;class StrengthPanel{};const levelMap=new Map([[1,5]]);W._Ba._Agt={_Rgt:{ins:{partLev:{keys:[1],get:k=>levelMap.get(k)},isCanUpEquip:true}},_xUn:StrengthPanel};
// [VI dòng gốc 18] gán W.KVPV_SOUL_STONE_FAST.status bằng ()=>({enabled:false}) | gán W.KVPV_BG_RESOURCES.config.enabled.strength bằng true
W.KVPV_SOUL_STONE_FAST.status=()=>({enabled:false});W.KVPV_BG_RESOURCES.config.enabled.strength=true;
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: strengthPanel = tạo đối tượng bằng StrengthPanel() | gán strengthPanel.parent bằng {} | Khai báo biến có thể gán lại bằng let: strengthOpen = false; strengthCalls = 0
const strengthPanel=new StrengthPanel();strengthPanel.parent={};let strengthOpen=false,strengthCalls=0;
// [VI dòng gốc 20] gán W._ft._Y4n.ins bằng {getWindowConfigById:()=>[56,1,StrengthPanel,[],1,17],getPanelById:()=>strengthPanel,isOpened:()=>strengthOpen,openByActionId:id=>{assert.equal(id,17);strengthOpen=true;}} | gọi assert.equal(id, 17) để kiểm tra hai giá trị bằng nhau | gán strengthOpen bằng true
W._ft._Y4n.ins={getWindowConfigById:()=>[56,1,StrengthPanel,[],1,17],getPanelById:()=>strengthPanel,isOpened:()=>strengthOpen,openByActionId:id=>{assert.equal(id,17);strengthOpen=true;}};
// [VI dòng gốc 21] gán W.KVPV_BG_RESOURCES.tick bằng ()=>{strengthCalls++;pending={kind:'strength'};busy=true;} | tăng strengthCalls một đơn vị sau khi lấy giá trị | gán pending bằng {kind:'strength'} | gán busy bằng true
W.KVPV_BG_RESOURCES.tick=()=>{strengthCalls++;pending={kind:'strength'};busy=true;};busy=false;pending=null;load();assert.equal(strengthOpen,true);W.KVPV_RED_NAVIGATOR.sync();assert.equal(strengthCalls,1);
// [VI dòng gốc 22] gọi load() | gọi W.KVPV_RED_NAVIGATOR.sync() | gọi assert.equal(strengthCalls, 1) để kiểm tra hai giá trị bằng nhau | gọi levelMap.set(1, 6)
load();W.KVPV_RED_NAVIGATOR.sync();assert.equal(strengthCalls,1);levelMap.set(1,6);busy=false;pending=null;W._Ba._Agt._Rgt.ins.isCanUpEquip=false;W.KVPV_RED_NAVIGATOR.sync();assert.equal(W.KVPV_RED_NAVIGATOR.status().confirmed,1);W.KVPV_RED_NAVIGATOR.stop();
// [VI dòng gốc 23] gọi console.log('PASS strength navigation: native window class/action config, existing resource worker, level ACK and no duplicate acros…)
console.log('PASS strength navigation: native window class/action config, existing resource worker, level ACK and no duplicate across reload');
// [VI dòng gốc 24] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 25] gán W.KVPV_RED_NAVIGATOR bằng undefined | Định nghĩa lớp CraftPanel. | gọi assert.equal(type, 10) để kiểm tra hai giá trị bằng nhau | gán craftModel.tClsNow bằng 807
W.KVPV_RED_NAVIGATOR=undefined;class CraftPanel{startShowUIByType(type){assert.equal(type,10);craftModel.tClsNow=807;}}
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: craftModel = tạo đối tượng gồm tClsNow | gán W._Ba._k6 bằng {_Rji:CraftPanel,_rRt:{ins:craftModel}} | Khai báo biến không gán lại bằng const: craftPanel = tạo đối tượng bằng CraftPanel() | gán craftPanel.parent bằng {}
const craftModel={tClsNow:0};W._Ba._k6={_Rji:CraftPanel,_rRt:{ins:craftModel}};const craftPanel=new CraftPanel();craftPanel.parent={};let craftOpen=false,craftCalls=0,verified=0;
// [VI dòng gốc 27] gán W.KVPV_CRAFT_LOW bằng {sync(){}} | gán W._ft._Cji bằng {ins:{getCfgById:id=>[id,400,0,[807]]}}
W.KVPV_CRAFT_LOW={sync(){}};W._ft._Cji={ins:{getCfgById:id=>[id,400,0,[807]]}};
// [VI dòng gốc 28] gán W.KVPV_BG_RESOURCES.config.enabled.gearCraft bằng true | gán W.KVPV_BG_RESOURCES.config.gearCraft bằng {approvedRecipeIds:[99]}
W.KVPV_BG_RESOURCES.config.enabled.gearCraft=true;W.KVPV_BG_RESOURCES.config.gearCraft={approvedRecipeIds:[99]};
// [VI dòng gốc 29] gán W.KVPV_BG_RESOURCES.preview bằng ()=>({gearCraft:{recipe:99,materialIds:[200]}})
W.KVPV_BG_RESOURCES.preview=()=>({gearCraft:{recipe:99,materialIds:[200]}});
// [VI dòng gốc 30] gán W.KVPV_BG_RESOURCES.status bằng ()=>({running:true,active:true,busy,pending,halted:{},stats:{gearCraft:{verified}}})
W.KVPV_BG_RESOURCES.status=()=>({running:true,active:true,busy,pending,halted:{},stats:{gearCraft:{verified}}});
// [VI dòng gốc 31] gán W.KVPV_BG_RESOURCES.tick bằng ()=>{craftCalls++;busy=true;pending={kind:'gearCraft'};} | tăng craftCalls một đơn vị sau khi lấy giá trị | gán busy bằng true | gán pending bằng {kind:'gearCraft'}
W.KVPV_BG_RESOURCES.tick=()=>{craftCalls++;busy=true;pending={kind:'gearCraft'};};busy=false;pending=null;
// [VI dòng gốc 32] gán W._ft._Y4n.ins bằng {getWindowConfigById:()=>[413,1,CraftPanel,[],1,249],getPanelById:()=>craftPanel,isOpened:()=>craftOpen,openByActionId:id=>{assert.equal(id,249);craftOpen=true;}} | gọi assert.equal(id, 249) để kiểm tra hai giá trị bằng nhau | gán craftOpen bằng true
W._ft._Y4n.ins={getWindowConfigById:()=>[413,1,CraftPanel,[],1,249],getPanelById:()=>craftPanel,isOpened:()=>craftOpen,openByActionId:id=>{assert.equal(id,249);craftOpen=true;}};
// [VI dòng gốc 33] gọi load() | gọi assert(craftOpen) để kiểm tra điều kiện của bài test | gọi W.KVPV_RED_NAVIGATOR.sync() | gọi assert.equal(craftModel.tClsNow, 807) để kiểm tra hai giá trị bằng nhau
load();assert(craftOpen);W.KVPV_RED_NAVIGATOR.sync();assert.equal(craftModel.tClsNow,807);W.KVPV_RED_NAVIGATOR.sync();assert.equal(craftCalls,1);
// [VI dòng gốc 34] gọi load() | gọi W.KVPV_RED_NAVIGATOR.sync() | gọi assert.equal(craftCalls, 1) để kiểm tra hai giá trị bằng nhau | tăng verified một đơn vị sau khi lấy giá trị
load();W.KVPV_RED_NAVIGATOR.sync();assert.equal(craftCalls,1);verified++;busy=false;pending=null;W.KVPV_BG_RESOURCES.preview=()=>({gearCraft:null});W.KVPV_RED_NAVIGATOR.sync();assert.equal(W.KVPV_RED_NAVIGATOR.status().confirmed,1);W.KVPV_RED_NAVIGATOR.stop();
// [VI dòng gốc 35] gọi console.log('PASS crafting navigation: verified panel/action and native subcategory, approved recipe only, sole resource sender and …)
console.log('PASS crafting navigation: verified panel/action and native subcategory, approved recipe only, sole resource sender and verified ACK');
// [VI dòng gốc 36] Dòng trống để tách các phần, không có lệnh thực thi.
