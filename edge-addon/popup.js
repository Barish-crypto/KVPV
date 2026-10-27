// [VI dòng gốc 1] Khai báo biến có thể gán lại bằng let: tabId = null | Khai báo biến không gán lại bằng const: output = gọi document.getElementById('status')
let tabId=null;const output=document.getElementById('status');
// [VI dòng gốc 2] Định nghĩa hàm bất đồng bộ run; tham số: type | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: r = chờ tác vụ bất đồng bộ: gọi chrome.runtime.sendMessage({type,tabId}) để gửi thông điệp qua API đang gọi | Kiểm tra !r?.ok: đúng thì chạy nhánh sau if.
async function run(type){try{const r=await chrome.runtime.sendMessage({type,tabId});if(!r?.ok)throw Error(r?.error||'Không có phản hồi');
// [VI dòng gốc 3] gán output.textContent bằng r.result.nativeState+'\n'+r.result.reason+'\nClick trình duyệt: '+(r.result.inputClick?.enabled?'BẬT':'TẮT')+(r.result.inputClick?.enabled?' · acc '+(r.result.inputClick.actor??'đang nhận diện')+' · '+r.result.inputClick.reason+' · đã gửi '+r.result.inputClick.clicks+' · trusted='+r.result.inputClick.trustedObserved+(r.result.inputClick.lastError?' · '+r.result.inputClick.lastError:''):'') | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán output.textContent bằng e.message
 output.textContent=r.result.nativeState+'\n'+r.result.reason;}catch(e){output.textContent=e.message;}}
// [VI dòng gốc 4] gán document.getElementById('attach').onclick bằng ()=>run('attach') | gán document.getElementById('detach').onclick bằng ()=>run('detach')
document.getElementById('attach').onclick=()=>run('attach');document.getElementById('detach').onclick=()=>run('detach');
// [VI dòng gốc 5] gán document.getElementById('attachAll').onclick bằng ()=>run('attachAll')
document.getElementById('attachAll').onclick=()=>run('attachAll');
// [VI dòng gốc 6] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: [tab] = chờ tác vụ bất đồng bộ: gọi chrome.tabs.query({active:true,currentWindow:true}) | gán tabId bằng tab.id
(async()=>{try{const [tab]=await chrome.tabs.query({active:true,currentWindow:true});tabId=tab.id;await run('status');}catch(e){output.textContent=e.message;}})();
// [VI dòng gốc 7] gọi setInterval(()=>{if(tabId!==null)run('status');}, 1500) để đăng ký tác vụ lặp theo khoảng thời gian | Kiểm tra tabId!==null: đúng thì chạy nhánh sau if. | gọi run('status')
setInterval(()=>{if(tabId!==null)run('status');},1500);
// [VI dòng gốc 8] Dòng trống để tách các phần, không có lệnh thực thi.

document.getElementById('inputOn').onclick=()=>run('inputOn');document.getElementById('inputOff').onclick=()=>run('inputOff');
