
let tabId=null;const output=document.getElementById('status');
const truTienOutput=document.getElementById('truTienStatus');

async function run(type){try{const r=await chrome.runtime.sendMessage({type,tabId});if(!r?.ok)throw Error(r?.error||'Không có phản hồi');

 output.textContent=r.result.nativeState+'\n'+r.result.reason;}catch(e){output.textContent=e.message;}}

async function runTruTien(type){try{const r=await chrome.runtime.sendMessage({type,tabId});if(!r?.ok)throw Error(r?.error||'Không có phản hồi');
 const state=r.result.truTien;
 truTienOutput.textContent=(state.enabled?'Đang bật':'Đang tắt')+' · '+(state.reason||'chưa có trạng thái')+'\n'+(state.selectedPlayer?'Mục tiêu: '+state.targetId:'Chưa chọn mục tiêu người chơi');}
 catch(e){truTienOutput.textContent=e.message;}}

document.getElementById('attach').onclick=()=>run('attach');document.getElementById('detach').onclick=()=>run('detach');

document.getElementById('attachAll').onclick=()=>run('attachAll');
document.getElementById('truTienStart').onclick=()=>runTruTien('truTienStart');
document.getElementById('truTienStop').onclick=()=>runTruTien('truTienStop');

(async()=>{try{const [tab]=await chrome.tabs.query({active:true,currentWindow:true});tabId=tab.id;await run('status');await runTruTien('truTienStatus');}catch(e){output.textContent=e.message;}})();

setInterval(()=>{if(tabId!==null){run('status');runTruTien('truTienStatus');}},1500);


document.getElementById('inputOn').onclick=()=>run('inputOn');document.getElementById('inputOff').onclick=()=>run('inputOff');
