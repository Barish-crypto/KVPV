// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Android page-context loader: chờ game thật, relay phạm vi xuống iframe lồng.
/* Android page-context loader: chờ game thật, relay phạm vi xuống iframe lồng.
 * Thông điệp chỉ chuyển quyền dò model và trạng thái, không nhận code hay lệnh game.
 * FULL chạy tối đa một lần/document sau khi kiểm tra nhân vật + component. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] "use strict"
  'use strict';
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: build = 0; revision = 2; channel = "kvpv-android-loader-v2"
  const build=/* BUILD_ID */,revision=2,channel='kvpv-android-loader-v2';
// [VI dòng gốc 7] Định nghĩa hàm gameURL; tham số: value | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: u = tạo đối tượng bằng URL(value) | Kết thúc hàm hiện tại và trả về: /^https?:$/.test(u.protocol)&& u.hostname==='play.choingay.vn' và chỉ đánh giá vế phải khi vế trái truthy: /^\/1046(?:\/|$)/.test(u.pathname).
  function gameURL(value){try{const u=new URL(value);return /^https?:$/.test(u.protocol)&&
// [VI dòng gốc 8] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: false.
    u.hostname==='play.choingay.vn'&&/^\/1046(?:\/|$)/.test(u.pathname);}catch(_){return false;}}
// [VI dòng gốc 9] Định nghĩa hàm inGameScope; tham số: không có
  function inGameScope(){
// [VI dòng gốc 10] Kiểm tra gameURL(location.href)||gameURL(document.referrer): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(gameURL(location.href)||gameURL(document.referrer))return true;
// [VI dòng gốc 11] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: u = tạo đối tượng bằng URL(document.referrer) | Kiểm tra window.parent!==window&&/^https?:$/.test(u.protocol)&& u.hostname==='play.choingay.vn'&&u.pathname==='/': đúng thì chạy nhánh sau if.
    try{const u=new URL(document.referrer);if(window.parent!==window&&/^https?:$/.test(u.protocol)&&
// [VI dòng gốc 12] Kết thúc hàm hiện tại và trả về: true. | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
      u.hostname==='play.choingay.vn'&&u.pathname==='/')return true;}catch(_){}
// [VI dòng gốc 13] Khai báo biến có thể gán lại bằng let: frame = window
    let frame=window;
// [VI dòng gốc 14] Lặp for: khởi tạo let n=0; tiếp tục khi n<12; sau mỗi vòng n++. | Khai báo biến có thể gán lại bằng let: n = 0
    for(let n=0;n<12;n++){
// [VI dòng gốc 15] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra gameURL(frame.location.href): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true. | Kiểm tra frame.parent===frame: đúng thì chạy nhánh sau if.
      try{if(gameURL(frame.location.href))return true;if(frame.parent===frame)break;frame=frame.parent;}catch(_){break;}
// [VI dòng gốc 16] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 17] Kết thúc hàm hiện tại và trả về: false.
    return false;
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: prior = đọc window.__KVPV_ANDROID_LOADER
  const prior=window.__KVPV_ANDROID_LOADER;
// [VI dòng gốc 20] Kiểm tra prior?.build===build&&prior.revision===revision&&['waiting_scope','waiting','loaded','failed','blocked'].includes(prior.state): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(prior?.build===build&&prior.revision===revision&&['waiting_scope','waiting','loaded','failed','blocked'].includes(prior.state))return;
// [VI dòng gốc 21] gọi prior?.cancel() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  prior?.cancel?.();
// [VI dòng gốc 22] Khai báo biến có thể gán lại bằng let: scoped = gọi inGameScope(); timer = null; attempted = false; started = gọi Date.now(); badge = null; expanded = false
  let scoped=inGameScope(),timer=null,attempted=false,started=Date.now(),badge=null,expanded=false;
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: children = tạo đối tượng bằng Map()
  const children=new Map();
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: status = tạo đối tượng gồm build, revision, state, reason, error, cancel
  const status={build,revision,state:scoped?'waiting':'waiting_scope',reason:'waiting_game',error:'',cancel(){
// [VI dòng gốc 25] Kiểm tra timer!==null: đúng thì chạy nhánh sau if. | gọi window.clearInterval(timer) để hủy tác vụ lặp | gán timer bằng null
    if(timer!==null)window.clearInterval(timer);timer=null;
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }};
// [VI dòng gốc 27] gán window.__KVPV_ANDROID_LOADER bằng status
  window.__KVPV_ANDROID_LOADER=status;
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: send = tạo hàm với tham số target, type, detail | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi target?.postMessage({channel,build,type,...detail}, '*') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
  const send=(target,type,detail)=>{try{target?.postMessage?.({channel,build,type,...detail},'*');}catch(_){}};
// [VI dòng gốc 29] Định nghĩa hàm directChild; tham số: source | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Lặp for: khởi tạo let i=0; tiếp tục khi i<window.frames.length; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0
  function directChild(source){try{for(let i=0;i<window.frames.length;i++)if(window.frames[i]===source)return true;}catch(_){}return false;}
// [VI dòng gốc 30] Định nghĩa hàm grantChildren; tham số: không có | Kiểm tra !scoped: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function grantChildren(){if(!scoped)return;try{for(let i=0;i<window.frames.length;i++)send(window.frames[i],'scope');}catch(_){}}
// [VI dòng gốc 31] Định nghĩa hàm summary; tham số: không có
  function summary(){
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: list = tạo mảng gồm 2 vị trí: [status,...children.values()]
    const list=[status,...children.values()];
// [VI dòng gốc 33] Kết thúc hàm hiện tại và trả về: list.find(s=>s.state==='loaded')||list.find(s=>s.state==='failed') hoặc dùng vế phải khi vế trái falsy: status.
    return list.find(s=>s.state==='loaded')||list.find(s=>s.state==='failed')||status;
// [VI dòng gốc 34] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 35] Định nghĩa hàm publish; tham số: không có | Kiểm tra !scoped: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function publish(){if(!scoped)return;
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: s = gọi summary()
    const s=summary();
// [VI dòng gốc 37] Kiểm tra window.parent!==window: đúng thì chạy nhánh sau if. | gọi send(window.parent, 'status', {state:s.state,reason:s.reason,error:s.error})
    if(window.parent!==window)send(window.parent,'status',{state:s.state,reason:s.reason,error:s.error});
// [VI dòng gốc 38] Kiểm tra !gameURL(location.href)||typeof document.createElement!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!gameURL(location.href)||typeof document.createElement!=='function')return;
// [VI dòng gốc 39] Kiểm tra !badge: đúng thì chạy nhánh sau if. | gán badge bằng document.createElement('button') | gán badge.type bằng 'button'
    if(!badge){badge=document.createElement('button');badge.type='button';
// [VI dòng gốc 40] gán badge.style.cssText bằng 'position:fixed;top:6px;left:6px;z-index:2147483647;background:#172638;color:white;border:1px solid #66d9a6;border-radius:6px;padding:7px;font:12px sans-serif;max-width:90vw;white-…
      badge.style.cssText='position:fixed;top:6px;left:6px;z-index:2147483647;background:#172638;color:white;border:1px solid #66d9a6;border-radius:6px;padding:7px;font:12px sans-serif;max-width:90vw;white-space:pre-wrap;text-align:left;';
// [VI dòng gốc 41] gán badge.onclick bằng ()=>{expanded=!expanded;publish();} | gán expanded bằng !expanded | gọi publish() | gọi (document.body||document.documentElement)?.appendChild(badge) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      badge.onclick=()=>{expanded=!expanded;publish();};(document.body||document.documentElement)?.appendChild(badge);}
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: labels = tạo đối tượng gồm loaded, failed, timeout, waiting, waiting_scope
    const labels={loaded:'Đã chạy',failed:'Lỗi nạp',timeout:'Hết thời gian chờ',waiting:'Chờ game/frame',waiting_scope:'Chờ frame'};
// [VI dòng gốc 43] gán badge.textContent bằng 'KVPV: '+(labels[s.state]||s.state)+(expanded?'\n'+build+' / loader 1.0.1\n'+s.reason+(s.error?'\n'+s.error:''):' · bấm xem')
    badge.textContent='KVPV: '+(labels[s.state]||s.state)+(expanded?'\n'+build+' / loader 1.0.1\n'+s.reason+(s.error?'\n'+s.error:''):' · bấm xem');
// [VI dòng gốc 44] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 45] gọi window.addEventListener('message', event=>{ const data=event.data;if(!data||data.channel!==channel||data.build!==build)return; if(data.type==='s…) để đăng ký bộ xử lý sự kiện (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  window.addEventListener?.('message',event=>{
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: data = đọc event.data | Kiểm tra !data||data.channel!==channel||data.build!==build: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const data=event.data;if(!data||data.channel!==channel||data.build!==build)return;
// [VI dòng gốc 47] Kiểm tra data.type==='scope'&&event.source===window.parent&&window.parent!==window: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(data.type==='scope'&&event.source===window.parent&&window.parent!==window){
// [VI dòng gốc 48] Kiểm tra !scoped: đúng thì chạy nhánh sau if. | gán scoped bằng true | gán status.state bằng 'waiting' | gọi begin()
      if(!scoped){scoped=true;status.state='waiting';begin();}grantChildren();
// [VI dòng gốc 49] Kiểm tra scoped&&directChild(event.source): đúng thì chạy nhánh sau if.
    }else if(scoped&&directChild(event.source)){
// [VI dòng gốc 50] Kiểm tra data.type==='request': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi send(event.source, 'scope')
      if(data.type==='request')send(event.source,'scope');
// [VI dòng gốc 51] Kiểm tra data.type==='status'&&['waiting','loaded','failed','timeout','blocked'].includes(data.state): đúng thì chạy nhánh sau if.
      else if(data.type==='status'&&['waiting','loaded','failed','timeout','blocked'].includes(data.state)){
// [VI dòng gốc 52] gọi children.set(event.source, {state:data.state,reason:String(data.reason||'').slice(0,100),error:String(data.error||'').slice(0,300)}) | gọi publish()
        children.set(event.source,{state:data.state,reason:String(data.reason||'').slice(0,100),error:String(data.error||'').slice(0,300)});publish();
// [VI dòng gốc 53] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 54] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 55] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 56] Định nghĩa hàm check; tham số: không có
  function check(){
// [VI dòng gốc 57] gọi grantChildren()
    grantChildren();
// [VI dòng gốc 58] Kiểm tra attempted: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(attempted)return;
// [VI dòng gốc 59] Kiểm tra Date.now()-started>600000: đúng thì chạy nhánh sau if. | gán status.state bằng 'timeout' | gán status.reason bằng 'game_not_ready' | gọi status.cancel()
    if(Date.now()-started>600000){status.state='timeout';status.reason='game_not_ready';status.cancel();publish();return;}
// [VI dòng gốc 60] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: ready = 0
      const ready=/* READINESS */;
// [VI dòng gốc 62] Kiểm tra !ready.ready: đúng thì chạy nhánh sau if. | gán status.reason bằng ready.reason||'waiting_game' | gọi publish() | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!ready.ready){status.reason=ready.reason||'waiting_game';publish();return;}
// [VI dòng gốc 63] Kiểm tra window.__KVPV_LIVE_BUILD===build: đúng thì chạy nhánh sau if. | gán status.state bằng 'loaded' | gán status.reason bằng 'already_loaded' | gọi status.cancel()
      if(window.__KVPV_LIVE_BUILD===build){status.state='loaded';status.reason='already_loaded';status.cancel();publish();return;}
// [VI dòng gốc 64] gán attempted bằng true | gọi status.cancel() | gọi installFull()
      attempted=true;status.cancel();installFull();
// [VI dòng gốc 65] Kiểm tra !window.KVPV_V1: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('FULL did not install')
      if(!window.KVPV_V1)throw Error('FULL did not install');
// [VI dòng gốc 66] gán window.__KVPV_LIVE_BUILD bằng build | gán status.state bằng 'loaded' | gán status.reason bằng 'ready' | gọi publish()
      window.__KVPV_LIVE_BUILD=build;status.state='loaded';status.reason='ready';publish();
// [VI dòng gốc 67] gọi console.info('[KVPV Android] FULL ready', build)
      console.info('[KVPV Android] FULL ready',build);
// [VI dòng gốc 68] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán attempted bằng true | gọi status.cancel() | gán status.state bằng 'failed'
    }catch(e){attempted=true;status.cancel();status.state='failed';status.error=String(e);publish();console.error('[KVPV Android]',e);}
// [VI dòng gốc 69] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 70] Định nghĩa hàm begin; tham số: không có | gán started bằng Date.now() | gán timer bằng window.setInterval(check,500) | gọi check()
  function begin(){started=Date.now();timer=window.setInterval(check,500);check();}
// [VI dòng gốc 71] Kiểm tra scoped: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi begin() | Kiểm tra window.parent!==window: đúng thì chạy nhánh sau if. | gọi send(window.parent, 'request')
  if(scoped)begin();else if(window.parent!==window)send(window.parent,'request');
// [VI dòng gốc 72] Định nghĩa hàm installFull; tham số: không có
  function installFull(){
// [VI dòng gốc 73] Chú thích gốc của tác giả; không được thực thi. Nội dung: FULL_BUNDLE [đóng chú thích]
/* FULL_BUNDLE */
// [VI dòng gốc 74] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 75] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 76] Dòng trống để tách các phần, không có lệnh thực thi.
