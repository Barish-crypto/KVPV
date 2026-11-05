// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Nhật ký trận Boss.
/* CHÚ THÍCH V1 — Nhật ký trận Boss.
 * Nhận mẫu từ bộ điều khiển có sẵn, giới hạn dung lượng và xuất báo cáo. Giảm máu quan sát được không tự chứng minh nguồn sát thương.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: Optional, bounded combat trace. No timer, attack, movement or network calls. [đóng chú thích]
/* Optional, bounded combat trace. No timer, attack, movement or network calls. */
// [VI dòng gốc 5] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 6] "use strict"
  'use strict';
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: W = window; MAX_SAMPLES = 7200; MAX_EVENTS = 600; SAMPLE_MS = 500
  const W=window, MAX_SAMPLES=7200, MAX_EVENTS=600, SAMPLE_MS=500;
// [VI dòng gốc 8] Khai báo biến có thể gán lại bằng let: recording = false; startedAt = null; endedAt = null; lastSampleAt = áp dụng toán tử - lên Infinity; last = null
  let recording=false,startedAt=null,endedAt=null,lastSampleAt=-Infinity,last=null;
// [VI dòng gốc 9] Khai báo biến có thể gán lại bằng let: samples = tạo mảng gồm 0 vị trí: []; events = tạo mảng gồm 0 vị trí: []; droppedSamples = 0; droppedEvents = 0
  let samples=[],events=[],droppedSamples=0,droppedEvents=0;
// [VI dòng gốc 10] Định nghĩa hàm append; tham số: list, item, limit | gọi list.push(item) để thêm phần tử vào cuối mảng | Kiểm tra list.length>limit: đúng thì chạy nhánh sau if. | gọi list.shift()
  function append(list,item,limit){list.push(item);if(list.length>limit){list.shift();return true;}return false;}
// [VI dòng gốc 11] Định nghĩa hàm record; tham số: kind, data={}
  function record(kind,data={}) {
// [VI dòng gốc 12] Kiểm tra !recording: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!recording)return;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: item = tạo đối tượng gồm at, tickMs, phase, hp, hpMax, hpPct, bossId, bossHP, bossHPMax, distance, bossRange, configuredRange, observedDangerRadius, rangeKnown, ring, player, boss, waypoint
    const item={at:Date.now(),tickMs:data.tickMs,phase:data.phase,hp:data.hp,hpMax:data.hpMax,
// [VI dòng gốc 14] Thuộc tính hpPct: đọc data.hpPct | Thuộc tính bossId: đọc data.bossId | Thuộc tính bossHP: đọc data.bossHP | Thuộc tính bossHPMax: đọc data.bossHPMax
      hpPct:data.hpPct,bossId:data.bossId,bossHP:data.bossHP,bossHPMax:data.bossHPMax,
// [VI dòng gốc 15] Thuộc tính distance: đọc data.distance | Thuộc tính bossRange: đọc data.bossRange | Thuộc tính configuredRange: đọc data.configuredRange
      distance:data.distance,bossRange:data.bossRange,configuredRange:data.configuredRange,
// [VI dòng gốc 16] Thuộc tính observedDangerRadius: đọc data.observedDangerRadius | Thuộc tính rangeKnown: đọc data.rangeKnown
      observedDangerRadius:data.observedDangerRadius,rangeKnown:data.rangeKnown,
// [VI dòng gốc 17] Thuộc tính ring: đọc data.ring | Thuộc tính player: nếu data.player thì lấy {x:data.player.x,y:data.player.y}, ngược lại lấy null | Thuộc tính x: đọc data.player.x | Thuộc tính y: đọc data.player.y
      ring:data.ring,player:data.player?{x:data.player.x,y:data.player.y}:null,
// [VI dòng gốc 18] Thuộc tính boss: nếu data.boss thì lấy {x:data.boss.x,y:data.boss.y}, ngược lại lấy null | Thuộc tính x: đọc data.boss.x | Thuộc tính y: đọc data.boss.y
      boss:data.boss?{x:data.boss.x,y:data.boss.y}:null,
// [VI dòng gốc 19] Thuộc tính waypoint: nếu data.waypoint thì lấy {x:data.waypoint.x,y:data.waypoint.y}, ngược lại lấy null | Thuộc tính x: đọc data.waypoint.x | Thuộc tính y: đọc data.waypoint.y
      waypoint:data.waypoint?{x:data.waypoint.x,y:data.waypoint.y}:null};
// [VI dòng gốc 20] Định nghĩa hàm event; tham số: type, detail | Kiểm tra append(events,{...item,type,detail},MAX_EVENTS): đúng thì chạy nhánh sau if. | tăng droppedEvents một đơn vị sau khi lấy giá trị
    function event(type,detail){if(append(events,{...item,type,detail},MAX_EVENTS))droppedEvents++;}
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: sameBoss = last và chỉ đánh giá vế phải khi vế trái truthy: last.bossId===item.bossId
    const sameBoss=last&&last.bossId===item.bossId;
// [VI dòng gốc 22] Kiểm tra last && (!sameBoss||last.phase!==item.phase): đúng thì chạy nhánh sau if.
    if(last && (!sameBoss||last.phase!==item.phase)){
// [VI dòng gốc 23] gọi event('transition', String(last.phase)+' -> '+String(item.phase))
      event('transition',String(last.phase)+' -> '+String(item.phase));
// [VI dòng gốc 24] Kiểm tra sameBoss&&last.phase==='RETREAT'&&item.phase==='FIGHT'&&item.hp<item.hpMax: đúng thì chạy nhánh sau if.
      if(sameBoss&&last.phase==='RETREAT'&&item.phase==='FIGHT'&&item.hp<item.hpMax)
// [VI dòng gốc 25] gọi event('early-return', 'Returned before full HP')
        event('early-return','Returned before full HP');
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: hpNoise = gọi Math.max(1e-9, (Number(item.hpMax)||0)*1e-8)
    const hpNoise=Math.max(1e-9,(Number(item.hpMax)||0)*1e-8);
// [VI dòng gốc 28] Kiểm tra sameBoss&&item.phase==='RETREAT'&&Number.isFinite(item.hp)&&item.hp<last.hp-hpNoise: đúng thì chạy nhánh sau if.
    if(sameBoss&&item.phase==='RETREAT'&&Number.isFinite(item.hp)&&item.hp<last.hp-hpNoise)
// [VI dòng gốc 29] gọi event('hp-drop-retreat', 'HP decreased during recovery; source not inferred')
      event('hp-drop-retreat','HP decreased during recovery; source not inferred');
// [VI dòng gốc 30] Kiểm tra kind!=='sample': đúng thì chạy nhánh sau if. | gọi event(kind, String(data.detail??'').slice(0,400))
    if(kind!=='sample')event(kind,String(data.detail??'').slice(0,400));
// [VI dòng gốc 31] Kiểm tra item.at-lastSampleAt>=SAMPLE_MS||!last||!sameBoss||last.phase!==item.phase: đúng thì chạy nhánh sau if.
    if(item.at-lastSampleAt>=SAMPLE_MS||!last||!sameBoss||last.phase!==item.phase){
// [VI dòng gốc 32] Kiểm tra append(samples,item,MAX_SAMPLES): đúng thì chạy nhánh sau if. | tăng droppedSamples một đơn vị sau khi lấy giá trị
      if(append(samples,item,MAX_SAMPLES))droppedSamples++;
// [VI dòng gốc 33] gán lastSampleAt bằng item.at
      lastSampleAt=item.at;
// [VI dòng gốc 34] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 35] gán last bằng item
    last=item;
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 37] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 38] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm recording, startedAt, endedAt, samples, events, droppedSamples, droppedEvents, last.
  function status(){return {recording,startedAt,endedAt,samples:samples.length,events:events.length,
// [VI dòng gốc 39] Thuộc tính droppedSamples: dùng biến cùng tên | Thuộc tính droppedEvents: dùng biến cùng tên | Thuộc tính last: nếu last thì lấy JSON.parse(JSON.stringify(last)), ngược lại lấy null
    droppedSamples,droppedEvents,last:last?JSON.parse(JSON.stringify(last)):null};}
// [VI dòng gốc 40] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tổng hợp số liệu và lịch sử cho việc chẩn đoán; phân biệt quan sát với xác nhận từ game.
  // Tổng hợp số liệu và lịch sử cho việc chẩn đoán; phân biệt quan sát với xác nhận từ game.
// [VI dòng gốc 41] Định nghĩa hàm report; tham số: không có
  function report(){
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: returns = gọi events.filter(x=>x.type==='transition'&&x.detail==='RETREAT -> FIGHT') để giữ phần tử thỏa điều kiện
    const returns=events.filter(x=>x.type==='transition'&&x.detail==='RETREAT -> FIGHT');
// [VI dòng gốc 43] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm version, build, status, summary, interpretation, samples, events.
    return {version:'1.0.0',build:W.KVPV_V1?.build??null,status:status(),summary:{
// [VI dòng gốc 44] Thuộc tính scope: "retained events only" | Thuộc tính completedReturns: đọc returns.length | Thuộc tính earlyReturns: đọc events.filter(x=>x.type==='early-return').length
      scope:'retained events only',completedReturns:returns.length,earlyReturns:events.filter(x=>x.type==='early-return').length,
// [VI dòng gốc 45] Thuộc tính hpDropsDuringRetreat: đọc events.filter(x=>x.type==='hp-drop-retreat').length
      hpDropsDuringRetreat:events.filter(x=>x.type==='hp-drop-retreat').length,
// [VI dòng gốc 46] Thuộc tính movementCommands: đọc events.filter(x=>x.type==='move').length
      movementCommands:events.filter(x=>x.type==='move').length,
// [VI dòng gốc 47] Thuộc tính bossHitsDuringRetreat: đọc events.filter(x=>x.type==='boss-hit'&&x.phase==='RETREAT').length
      bossHitsDuringRetreat:events.filter(x=>x.type==='boss-hit'&&x.phase==='RETREAT').length},
// [VI dòng gốc 48] Thuộc tính interpretation: "Client observations; HP drops and distance do not prove server hit range or damage source."
      interpretation:'Client observations; HP drops and distance do not prove server hit range or damage source.',
// [VI dòng gốc 49] Thuộc tính samples: gọi JSON.parse(JSON.stringify(samples)) để phân tích dữ liệu đầu vào theo API đang gọi | Thuộc tính events: gọi JSON.parse(JSON.stringify(events)) để phân tích dữ liệu đầu vào theo API đang gọi
      samples:JSON.parse(JSON.stringify(samples)),events:JSON.parse(JSON.stringify(events))};
// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 51] gán W.KVPV_BOSS_LOG bằng Object.freeze({ start(){recording=true;startedAt=Date.now();endedAt=null;lastSampleAt=-Infinity; last=null;samples=[];events=[];droppedSamples=0;droppedEvents=0;return status();}, …
  W.KVPV_BOSS_LOG=Object.freeze({
// [VI dòng gốc 52] gán recording bằng true | gán startedAt bằng Date.now() | gán endedAt bằng null | gán lastSampleAt bằng -Infinity
    start(){recording=true;startedAt=Date.now();endedAt=null;lastSampleAt=-Infinity;
// [VI dòng gốc 53] gán last bằng null | gán samples bằng [] | gán events bằng [] | gán droppedSamples bằng 0
      last=null;samples=[];events=[];droppedSamples=0;droppedEvents=0;return status();},
// [VI dòng gốc 54] gán recording bằng false | gán endedAt bằng Date.now() | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    stop(){recording=false;endedAt=Date.now();return status();},status,report,
// [VI dòng gốc 55] Kết thúc hàm hiện tại và trả về: gọi JSON.stringify(report(), null, 2) để chuyển giá trị thành chuỗi JSON.
    export(){return JSON.stringify(report(),null,2);},_record:record
// [VI dòng gốc 56] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 57] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 58] Dòng trống để tách các phần, không có lệnh thực thi.
