// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Lịch và khoảng giữ chỗ.
/* CHÚ THÍCH V1 — Lịch và khoảng giữ chỗ.
 * Tính lịch theo giờ Việt Nam, trạng thái sẵn sàng và hoạt động sắp mở. Module lập kế hoạch, không tự gửi lệnh vào sự kiện.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: V10.2: pure timetable planner / no timer, RPC, scene transition, or reward request.
/* V10.2: pure timetable planner / no timer, RPC, scene transition, or reward request.
 * Uses the authoritative EVENT_SCHEDULE from the existing Daily closure.
 */
// [VI dòng gốc 7] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 8] "use strict"
  'use strict';
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: W = window; NS = W.KVPV hoặc dùng vế phải khi vế trái falsy: W.KVPV={}
  const W=window,NS=W.KVPV||(W.KVPV={});
// [VI dòng gốc 10] Kiểm tra NS.timeline?.version==='10.2.2': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(NS.timeline?.version==='10.2.2')return;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: config = tạo đối tượng gồm enabled, activeHoldMs, maxPreview, leadMinutes
  const config={enabled:true, activeHoldMs:90000, maxPreview:12,
// [VI dòng gốc 12] Thuộc tính leadMinutes: tạo đối tượng gồm honghoang, dao_nguyen, vinh_du, tu_la, tranh_ba_dinh_cao, tientuyen, lanhdia
    leadMinutes:{
// [VI dòng gốc 13] Thuộc tính honghoang: 10 | Thuộc tính dao_nguyen: 5 | Thuộc tính vinh_du: 20 | Thuộc tính tu_la: 15
      honghoang:10, tam_tien:5, dao_nguyen:5, tien_ton:5, vinh_du:20, tu_la:15,
// [VI dòng gốc 14] Thuộc tính tranh_ba_dinh_cao: 5 | Thuộc tính tientuyen: 5 | Thuộc tính lanhdia: 4
      tranh_ba_dinh_cao:5, tientuyen:5, lanhdia:4
// [VI dòng gốc 15] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }};
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: flags = tạo đối tượng gồm honghoang, dao_nguyen, vinh_du, tu_la, tranh_ba_dinh_cao
  const flags={tam_tien:'enableQuizAuto',honghoang:'enableHongHoang',dao_nguyen:'enableDaoTri',tien_ton:'enableTienTonAuto',
// [VI dòng gốc 17] Thuộc tính vinh_du: "enableVinhDu" | Thuộc tính tu_la: "enableTuLa"
    vinh_du:'enableVinhDu',tu_la:'enableTuLa',
// [VI dòng gốc 18] Thuộc tính tranh_ba_dinh_cao: "enableDinhCao"
    tranh_ba_dinh_cao:'enableDinhCao'};
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: automatic = tạo đối tượng bằng Set(Object.keys(config.leadMinutes))
  const automatic=new Set(Object.keys(config.leadMinutes));
// [VI dòng gốc 20] Khai báo biến có thể gán lại bằng let: registered = tạo mảng gồm 0 vị trí: []; readiness = null
  let registered=[],readiness=null;
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: VN_FORMATTER = tạo đối tượng bằng Intl.DateTimeFormat('en-GB', { timeZone:'Asia/Ho_Chi_Minh',hourCycle:'h23', year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minu…)
  const VN_FORMATTER=new Intl.DateTimeFormat('en-GB',{
// [VI dòng gốc 22] Thuộc tính timeZone: "Asia/Ho_Chi_Minh" | Thuộc tính hourCycle: "h23"
    timeZone:'Asia/Ho_Chi_Minh',hourCycle:'h23',
// [VI dòng gốc 23] Thuộc tính year: "numeric" | Thuộc tính month: "2-digit" | Thuộc tính day: "2-digit" | Thuộc tính hour: "2-digit"
    year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'
// [VI dòng gốc 24] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: two = tạo hàm với tham số v; mỗi lần gọi trả về gọi String(v).padStart(2, '0')
  const two=v=>String(v).padStart(2,'0');
// [VI dòng gốc 26] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chuyển giờ trong lịch thành số phút để so sánh các cửa sổ hoạt động.
  // Chuyển giờ trong lịch thành số phút để so sánh các cửa sổ hoạt động.
// [VI dòng gốc 27] Định nghĩa hàm parseMinute; tham số: t
  function parseMinute(t){
// [VI dòng gốc 28] Kiểm tra !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(String(t)): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(String(t)))return null;
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: [h,m] = gọi t.split(':').map(Number) để biến đổi từng phần tử | Kết thúc hàm hiện tại và trả về: tính biểu thức h*60+m.
    const [h,m]=t.split(':').map(Number);return h*60+m;
// [VI dòng gốc 30] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 31] Định nghĩa hàm dayAt; tham số: ms
  function dayAt(ms){
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: p = gọi Object.fromEntries(VN_FORMATTER.formatToParts(new Date(ms)).map(x=>[x.type,x.value]))
    const p=Object.fromEntries(VN_FORMATTER.formatToParts(new Date(ms)).map(x=>[x.type,x.value]));
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: y = gọi Number(p.year) để chuyển sang số; mo = gọi Number(p.month) để chuyển sang số; d = gọi Number(p.day) để chuyển sang số
    const y=Number(p.year),mo=Number(p.month),d=Number(p.day);
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: minute = tính biểu thức Number(p.hour)*60+Number(p.minute)
    const minute=Number(p.hour)*60+Number(p.minute);
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: wallDay = gọi Date.UTC(y, mo-1, d)
    const wallDay=Date.UTC(y,mo-1,d);
// [VI dòng gốc 36] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm minute, epochMinute, date, weekday, key, hhmm.
    return {minute,epochMinute:wallDay/60000+minute+Number(p.second)/60,
// [VI dòng gốc 37] Thuộc tính date: wallDay | Thuộc tính weekday: gọi new Date(wallDay).getUTCDay()
      date:wallDay,weekday:new Date(wallDay).getUTCDay(),
// [VI dòng gốc 38] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
      key:`${p.year}-${p.month}-${p.day}`,hhmm:two(p.hour)+':'+two(p.minute)};
// [VI dòng gốc 39] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 40] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thay lịch đầu vào cho bộ lập kế hoạch.
  // Thay lịch đầu vào cho bộ lập kế hoạch.
// [VI dòng gốc 41] Định nghĩa hàm setSchedule; tham số: source
  function setSchedule(source){
// [VI dòng gốc 42] Kiểm tra !Array.isArray(source): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!Array.isArray(source))return false;
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: next = tạo mảng gồm 0 vị trí: []
    const next=[];
// [VI dòng gốc 44] Duyệt từng giá trị trong source bằng const item. | Khai báo biến không gán lại bằng const: item (chưa gán giá trị)
    for(const item of source){
// [VI dòng gốc 45] Kiểm tra !item||typeof item.key!=='string': đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!item||typeof item.key!=='string')continue;
// [VI dòng gốc 46] Duyệt từng giá trị trong item.slots||[] bằng const slot. | Khai báo biến không gán lại bằng const: slot (chưa gán giá trị)
      for(const slot of item.slots||[]){
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: [start,end,...extra] = gọi String(slot).split('-')
        const [start,end,...extra]=String(slot).split('-');
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: a = gọi parseMinute(start); b = gọi parseMinute(end)
        const a=parseMinute(start),b=parseMinute(end);
// [VI dòng gốc 49] Kiểm tra extra.length||a===null||b===null||a===b: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(extra.length||a===null||b===null||a===b)continue;
// [VI dòng gốc 50] gọi next.push({key:item.key,name:String(item.name||item.key), from:a,to:b,display:slot,action:item.action||'notice', days:Array.isArra…) để thêm phần tử vào cuối mảng
        next.push({key:item.key,name:String(item.name||item.key),
// [VI dòng gốc 51] Thuộc tính from: a | Thuộc tính to: b | Thuộc tính display: slot | Thuộc tính action: item.action hoặc dùng vế phải khi vế trái falsy: 'notice'
          from:a,to:b,display:slot,action:item.action||'notice',
// [VI dòng gốc 52] Thuộc tính days: nếu Array.isArray(item.days) thì lấy item.days.slice(), ngược lại lấy null
          days:Array.isArray(item.days)?item.days.slice():null,
// [VI dòng gốc 53] Thuộc tính priority: Number(item.priority) hoặc dùng vế phải khi vế trái falsy: 10 | Thuộc tính unlock: item.unlock hoặc dùng vế phải khi vế trái falsy: null
          priority:Number(item.priority)||10,unlock:item.unlock||null});
// [VI dòng gốc 54] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 55] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 56] gán registered bằng next | Kết thúc hàm hiện tại và trả về: true.
    registered=next;return true;
// [VI dòng gốc 57] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 58] Chú thích gốc của tác giả; không được thực thi. Nội dung: Cập nhật điều kiện sẵn sàng được cung cấp từ bên ngoài.
  // Cập nhật điều kiện sẵn sàng được cung cấp từ bên ngoài.
// [VI dòng gốc 59] Định nghĩa hàm setReadiness; tham số: checker | gán readiness bằng typeof checker==='function'?checker:null
  function setReadiness(checker){readiness=typeof checker==='function'?checker:null;}
// [VI dòng gốc 60] Định nghĩa hàm enabledFor; tham số: slot, cfg
  function enabledFor(slot,cfg){
// [VI dòng gốc 61] Kiểm tra !automatic.has(slot.key)||slot.action!=='auto': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!automatic.has(slot.key)||slot.action!=='auto')return false;
// [VI dòng gốc 62] Chú thích gốc của tác giả; không được thực thi. Nội dung: Do not make reservations before the Daily config is available.
    // Do not make reservations before the Daily config is available.
// [VI dòng gốc 63] Kiểm tra !cfg || typeof cfg!=='object': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!cfg || typeof cfg!=='object')return false;
// [VI dòng gốc 64] Khai báo biến không gán lại bằng const: flag = đọc flags[slot.key] | Kiểm tra flag&&cfg[flag]===false: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    const flag=flags[slot.key];if(flag&&cfg[flag]===false)return false;
// [VI dòng gốc 65] Kết thúc hàm hiện tại và trả về: true.
    return true;
// [VI dòng gốc 66] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 67] Định nghĩa hàm isReady; tham số: key
  function isReady(key){
// [VI dòng gốc 68] Kiểm tra !readiness: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(!readiness)return true;
// [VI dòng gốc 69] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: tính biểu thức readiness(key)!==false.
    try{return readiness(key)!==false;}
// [VI dòng gốc 70] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: false.
    catch(_){return false;}
// [VI dòng gốc 71] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 72] Chú thích gốc của tác giả; không được thực thi. Nội dung: Liệt kê các lần diễn ra phù hợp với ngày và cấu hình lịch.
  // Liệt kê các lần diễn ra phù hợp với ngày và cấu hình lịch.
// [VI dòng gốc 73] Định nghĩa hàm occurrences; tham số: atMs=Date.now(), cfg=null
  function occurrences(atMs=Date.now(),cfg=null){
// [VI dòng gốc 74] Khai báo biến không gán lại bằng const: clock = gọi dayAt(atMs); all = tạo mảng gồm 0 vị trí: []
    const clock=dayAt(atMs),all=[];
// [VI dòng gốc 75] Duyệt từng giá trị trong registered bằng const s. | Khai báo biến không gán lại bằng const: s (chưa gán giá trị)
    for(const s of registered){
// [VI dòng gốc 76] Kiểm tra !enabledFor(s,cfg): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!enabledFor(s,cfg))continue;
// [VI dòng gốc 77] Duyệt từng giá trị trong [-1,0,1] bằng const offset. | Khai báo biến không gán lại bằng const: offset (chưa gán giá trị)
      for(const offset of [-1,0,1]){
// [VI dòng gốc 78] Khai báo biến không gán lại bằng const: base = tính biểu thức clock.date+offset*86400000
        const base=clock.date+offset*86400000;
// [VI dòng gốc 79] Khai báo biến không gán lại bằng const: weekday = gọi new Date(base).getUTCDay()
        const weekday=new Date(base).getUTCDay();
// [VI dòng gốc 80] Kiểm tra s.days&&!s.days.includes(weekday): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(s.days&&!s.days.includes(weekday))continue;
// [VI dòng gốc 81] Khai báo biến không gán lại bằng const: a = tính biểu thức base/60000+s.from
        const a=base/60000+s.from;
// [VI dòng gốc 82] Khai báo biến không gán lại bằng const: b = tính biểu thức base/60000+s.to+(s.to<s.from?1440:0)
        const b=base/60000+s.to+(s.to<s.from?1440:0);
// [VI dòng gốc 83] gọi all.push({...s,start:a,end:b,day:new Date(base).toISOString().slice(0,10)}) để thêm phần tử vào cuối mảng
        all.push({...s,start:a,end:b,day:new Date(base).toISOString().slice(0,10)});
// [VI dòng gốc 84] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 85] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 86] gọi all.sort((a,b)=>a.start-b.start||a.priority-b.priority||a.key.localeCompare(b.key)) để sắp xếp mảng tại chỗ
    all.sort((a,b)=>a.start-b.start||a.priority-b.priority||a.key.localeCompare(b.key));
// [VI dòng gốc 87] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm clock, all.
    return {clock,all};
// [VI dòng gốc 88] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 89] Định nghĩa hàm activeAuto; tham số: {atMs=Date.now(),flags:cfg=null}={}
  function activeAuto({atMs=Date.now(),flags:cfg=null}={}){
// [VI dòng gốc 90] Kiểm tra !config.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 0 vị trí: [].
    if(!config.enabled)return [];
// [VI dòng gốc 91] Khai báo biến không gán lại bằng const: {clock,all} = gọi occurrences(atMs, cfg); n = đọc clock.epochMinute
    const {clock,all}=occurrences(atMs,cfg),n=clock.epochMinute;
// [VI dòng gốc 92] Chú thích gốc của tác giả; không được thực thi. Nội dung: Read potentially expensive game models only for events active NOW.
    // Read potentially expensive game models only for events active NOW.
// [VI dòng gốc 93] Khai báo biến không gán lại bằng const: readinessCache = tạo đối tượng bằng Map()
    const readinessCache=new Map();
// [VI dòng gốc 94] Khai báo biến không gán lại bằng const: usable = tạo hàm với tham số e
    const usable=e=>{
// [VI dòng gốc 95] Kiểm tra !readinessCache.has(e.key): đúng thì chạy nhánh sau if. | gọi readinessCache.set(e.key, isReady(e.key))
      if(!readinessCache.has(e.key))readinessCache.set(e.key,isReady(e.key));
// [VI dòng gốc 96] Kết thúc hàm hiện tại và trả về: gọi readinessCache.get(e.key).
      return readinessCache.get(e.key);
// [VI dòng gốc 97] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    };
// [VI dòng gốc 98] Kết thúc hàm hiện tại và trả về: gọi all.filter(x=>n>=x.start&&n<x.end&&usable(x)).sort((a,b)=> a.start-b.start||a.priority-b.priority||a.key.localeCompare(b.key)) để sắp xếp mảng tại chỗ.
    return all.filter(x=>n>=x.start&&n<x.end&&usable(x)).sort((a,b)=>
// [VI dòng gốc 99] gọi a.key.localeCompare(b.key)
      a.start-b.start||a.priority-b.priority||a.key.localeCompare(b.key));
// [VI dòng gốc 100] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 101] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tìm khoảng giữ chỗ cho sự kiện sắp tới, không tự chuyển map.
  // Tìm khoảng giữ chỗ cho sự kiện sắp tới, không tự chuyển map.
// [VI dòng gốc 102] Định nghĩa hàm reservation; tham số: {atMs=Date.now(),flags:cfg=null,excludeKeys=[],forTask='long'}={}
  function reservation({atMs=Date.now(),flags:cfg=null,excludeKeys=[],forTask='long'}={}){
// [VI dòng gốc 103] Kiểm tra !config.enabled||!['long','combat','stage','honghoang'].includes(forTask): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!config.enabled||!['long','combat','stage','honghoang'].includes(forTask))return null;
// [VI dòng gốc 104] Khai báo biến không gán lại bằng const: {clock,all} = gọi occurrences(atMs, cfg); n = đọc clock.epochMinute
    const {clock,all}=occurrences(atMs,cfg),n=clock.epochMinute;
// [VI dòng gốc 105] Khai báo biến không gán lại bằng const: skips = tạo đối tượng bằng Set(excludeKeys)
    const skips=new Set(excludeKeys);
// [VI dòng gốc 106] Duyệt từng giá trị trong all bằng const e. | Khai báo biến không gán lại bằng const: e (chưa gán giá trị)
    for(const e of all.slice().sort((a,b)=>Number(n>=b.start&&n<b.end)-Number(n>=a.start&&n<a.end)||a.start-b.start||a.priority-b.priority)){
// [VI dòng gốc 107] Kiểm tra skips.has(e.key) || (forTask===e.key): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(skips.has(e.key) || (forTask===e.key))continue;
// [VI dòng gốc 108] Khai báo biến không gán lại bằng const: lead = gọi Math.max(0, Math.min(30,Number(config.leadMinutes[e.key])||0))
      const lead=Math.max(0,Math.min(30,Number(config.leadMinutes[e.key])||0));
// [VI dòng gốc 109] Khai báo biến không gán lại bằng const: active = n>=e.start và chỉ đánh giá vế phải khi vế trái truthy: n<e.end
      const active=n>=e.start && n<e.end;
// [VI dòng gốc 110] Khai báo biến không gán lại bằng const: soon = n<e.start và chỉ đánh giá vế phải khi vế trái truthy: (e.start-n)<=lead
      const soon=n<e.start && (e.start-n)<=lead;
// [VI dòng gốc 111] Chú thích gốc của tác giả; không được thực thi. Nội dung: Never freeze general gameplay for an entire event if entry is unavailable.
      // Never freeze general gameplay for an entire event if entry is unavailable.
// [VI dòng gốc 112] Khai báo biến không gán lại bằng const: earlyActive = active và chỉ đánh giá vế phải khi vế trái truthy: (n-e.start)*60000<config.activeHoldMs
      const earlyActive=active;
// [VI dòng gốc 113] Chú thích gốc của tác giả; không được thực thi. Nội dung: Avoid scanning heavy model/config tables outside the reservation window.
      // Avoid scanning heavy model/config tables outside the reservation window.
// [VI dòng gốc 114] Kiểm tra (soon||earlyActive)&&isReady(e.key): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm key, name, time, phase, minutesUntil, day, reason.
      if((soon||earlyActive)&&isReady(e.key))return {key:e.key,name:e.name,time:e.display,
// [VI dòng gốc 115] Thuộc tính phase: nếu soon thì lấy 'upcoming', ngược lại lấy 'opening' | Thuộc tính minutesUntil: gọi Math.max(0, e.start-n)
        phase:soon?'upcoming':'opening',minutesUntil:Math.max(0,e.start-n),
// [VI dòng gốc 116] Thuộc tính day: đọc e.day | Thuộc tính reason: "Reserve scene for scheduled event"
        day:e.day,reason:'Reserve scene for scheduled event'};
// [VI dòng gốc 117] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 118] Kết thúc hàm hiện tại và trả về: null.
    return null;
// [VI dòng gốc 119] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 120] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 121] Định nghĩa hàm status; tham số: atMs=Date.now(), cfg=W.KVPV_DAILY?.config||null. Mục đích: trả trạng thái để kiểm tra
  function status(atMs=Date.now(),cfg=W.KVPV_DAILY?.config||null){
// [VI dòng gốc 122] Khai báo biến không gán lại bằng const: {clock,all} = gọi occurrences(atMs, cfg); n = đọc clock.epochMinute
    const {clock,all}=occurrences(atMs,cfg),n=clock.epochMinute;
// [VI dòng gốc 123] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm version, enabled, scheduleLoaded, eventSlots, vietnamDate, vietnamTime, reservation, active, upcoming.
    return {version:'10.2.2',enabled:config.enabled,scheduleLoaded:registered.length>0,
// [VI dòng gốc 124] Thuộc tính eventSlots: đọc registered.length | Thuộc tính vietnamDate: đọc clock.key | Thuộc tính vietnamTime: đọc clock.hhmm
      eventSlots:registered.length,vietnamDate:clock.key,vietnamTime:clock.hhmm,
// [VI dòng gốc 125] Thuộc tính reservation: gọi reservation({atMs,flags:cfg}) | Thuộc tính atMs: dùng biến cùng tên | Thuộc tính flags: cfg
      reservation:reservation({atMs,flags:cfg}),
// [VI dòng gốc 126] Thuộc tính active: gọi all.filter(e=>n>=e.start&&n<e.end).map(e=>({key:e.key,name:e.name,slot:e.display})) để biến đổi từng phần tử | Thuộc tính key: đọc e.key | Thuộc tính name: đọc e.name | Thuộc tính slot: đọc e.display
      active:all.filter(e=>n>=e.start&&n<e.end).map(e=>({key:e.key,name:e.name,slot:e.display})),
// [VI dòng gốc 127] Thuộc tính upcoming: gọi all.filter(e=>e.start>n).slice(0,config.maxPreview).map(e=>({ key:e.key,name:e.name,slot:e.display,day:e.day,minutesUntil:Math.ceil(e.start-n)})) để biến đổi từng phần tử
      upcoming:all.filter(e=>e.start>n).slice(0,config.maxPreview).map(e=>({
// [VI dòng gốc 128] Thuộc tính key: đọc e.key | Thuộc tính name: đọc e.name | Thuộc tính slot: đọc e.display | Thuộc tính day: đọc e.day
        key:e.key,name:e.name,slot:e.display,day:e.day,minutesUntil:Math.ceil(e.start-n)}))};
// [VI dòng gốc 129] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 130] gán NS.timeline bằng Object.freeze({version:'10.2.2',config,setSchedule,setReadiness, activeAuto,reservation,status,start(){config.enabled=true;return status();}, stop(){config.enabled=false;return sta…
  NS.timeline=Object.freeze({version:'10.2.2',config,setSchedule,setReadiness,
// [VI dòng gốc 131] gán config.enabled bằng true | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    activeAuto,reservation,status,start(){config.enabled=true;return status();},
// [VI dòng gốc 132] gán config.enabled bằng false | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    stop(){config.enabled=false;return status();}});
// [VI dòng gốc 133] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 134] Dòng trống để tách các phần, không có lệnh thực thi.
