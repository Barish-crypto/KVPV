// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native Messaging host: chỉ đọc dự án cố định, nhận watch/sync và báo cáo dữ liệu có giới hạn, không nhận shell/path từ website. [đóng chú thích]
/* Native Messaging host: chỉ đọc dự án cố định, nhận watch/sync và báo cáo dữ liệu có giới hạn, không nhận shell/path từ website. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; {execFile} = gọi require('node:child_process') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path'),{execFile}=require('node:child_process');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: {readPartyPeers} = gọi require('../../live/party-relay.cjs') để nạp module Node.js
const {readPartyPeers}=require('../../live/party-relay.cjs');
// [VI dòng gốc 5] Định nghĩa hàm readDesktopControls; tham số: root | Khai báo biến không gán lại bằng const: file = gọi require.resolve('../../live/desktop-controls.cjs') | xóa thuộc tính require.cache[file] | Kết thúc hàm hiện tại và trả về: gọi require(file).readDesktopControls(root).
function readDesktopControls(root){const file=require.resolve('../../live/desktop-controls.cjs');delete require.cache[file];return require(file).readDesktopControls(root);}
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: {saveDiagnostics} = gọi require('../../live/diagnostics.cjs') để nạp module Node.js
const {saveDiagnostics}=require('../../live/diagnostics.cjs');
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: {packet,payloadPackets,Parser} = gọi require('./protocol.cjs') để nạp module Node.js
const {packet,payloadPackets,Parser}=require('./protocol.cjs');
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: {readArtifact,extensionId,watchSources} = gọi require('../../live/project.cjs') để nạp module Node.js
const {readArtifact,extensionId,watchSources}=require('../../live/project.cjs');
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: root = gọi path.resolve(__dirname, '../..'); manifest = gọi JSON.parse(fs.readFileSync(path.join(root,'edge-addon','manifest.json'),'utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
const root=path.resolve(__dirname,'../..'),manifest=JSON.parse(fs.readFileSync(path.join(root,'edge-addon','manifest.json'),'utf8'));
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: id = gọi extensionId(manifest.key)
const id=extensionId(manifest.key);
// [VI dòng gốc 11] Kiểm tra process.argv[2]!=='chrome-extension://'+id+'/': đúng thì chạy nhánh sau if. | gọi process.exit(2)
if(process.argv[2]!=='chrome-extension://'+id+'/')process.exit(2);
// [VI dòng gốc 12] Khai báo biến có thể gán lại bằng let: active = false; building = false; queued = false; debounce = null; current = null; watchers = tạo mảng gồm 0 vị trí: []; relayTimer = null
let active=false,building=false,queued=false,debounce=null,current=null,watchers=[],relayTimer=null;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: send = tạo hàm với tham số m; mỗi lần gọi trả về gọi process.stdout.write(packet(m)); state = tạo hàm với tham số text; mỗi lần gọi trả về gọi send({type:'state',text})
const send=m=>process.stdout.write(packet(m)),state=text=>send({type:'state',text});
// [VI dòng gốc 14] Định nghĩa hàm emitFull; tham số: không có | Kiểm tra current: đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong payloadPackets(current) bằng const m. | Khai báo biến không gán lại bằng const: m (chưa gán giá trị)
function emitFull(){if(current)for(const m of payloadPackets(current))send(m);}
// [VI dòng gốc 15] Định nghĩa hàm build; tham số: không có | Kiểm tra !active: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra building: đúng thì chạy nhánh sau if.
function build(){if(!active)return;if(building){queued=true;return;}building=true;state('Đang kiểm tra bản đồng bộ…');
// [VI dòng gốc 16] gọi execFile(process.execPath, [path.join(root,'live/verify.cjs')], {cwd:root,windowsHide:true,maxBuffer:1024*1024}, (error,stdout,st…)
 execFile(process.execPath,[path.join(root,'live/verify.cjs')],{cwd:root,windowsHide:true,maxBuffer:1024*1024},(error,stdout,stderr)=>{
// [VI dòng gốc 17] gán building bằng false | Kiểm tra error: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán current bằng null | gọi state('Kiểm thử lỗi, giữ bản đang chạy. '+String(stderr||stdout||error.message).slice(-600))
  building=false;if(error){current=null;state('Kiểm thử lỗi, giữ bản đang chạy. '+String(stderr||stdout||error.message).slice(-600));}
// [VI dòng gốc 18] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán current bằng readArtifact(root) | Kiểm tra !queued&&!debounce: đúng thì chạy nhánh sau if. | gọi state((stdout.includes('CACHED ')?'Dùng bản đã kiểm thử · ':'Đã kiểm thử · ')+current.build)
  else try{current=readArtifact(root);if(!queued&&!debounce){state((stdout.includes('CACHED ')?'Dùng bản đã kiểm thử · ':'Đã kiểm thử · ')+current.build);emitFull();}}catch(e){current=null;state(e.message);}
// [VI dòng gốc 19] Kiểm tra queued: đúng thì chạy nhánh sau if. | gán queued bằng false | gọi build()
  if(queued){queued=false;build();}
// [VI dòng gốc 20] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 });}
// [VI dòng gốc 21] Định nghĩa hàm changed; tham số: không có | gọi clearTimeout(debounce) để hủy lịch thực hiện một lần | gán debounce bằng setTimeout(()=>{debounce=null;build();},150) | gán debounce bằng null
function changed(){clearTimeout(debounce);debounce=setTimeout(()=>{debounce=null;build();},150);}
// [VI dòng gốc 22] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | Kiểm tra active: đúng thì chạy nhánh sau if. | Kiểm tra current&&!building: đúng thì chạy nhánh sau if. | gọi emitFull()
function start(){if(active){if(current&&!building)emitFull();return;}active=true;
// [VI dòng gốc 23] gán watchers bằng watchSources(root,changed) | gán relayTimer bằng setInterval(()=>{try{send({type:'partyPeers',peers:readPartyPeers(root)});send({type:'desktopControls',profiles:readDesktopControls(root)});}catch(_){}},1000) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi send({type:'partyPeers',peers:readPartyPeers(root)})
 watchers=watchSources(root,changed);relayTimer=setInterval(()=>{try{send({type:'partyPeers',peers:readPartyPeers(root)});send({type:'desktopControls',profiles:readDesktopControls(root)});}catch(_){}},1000);build();}
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: parser = tạo đối tượng bằng Parser(message=>{if(message.type==='diagnostics'&&active){try{saveDiagnostics(root,message.report);}catch(e){console.error('Dia…) | Kiểm tra message.type==='diagnostics'&&active: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi saveDiagnostics(root, message.report)
const parser=new Parser(message=>{if(message.type==='diagnostics'&&active){try{saveDiagnostics(root,message.report);}catch(e){console.error('Diagnostics: '+e.message);}}else if(message.type==='watch')start();else if(message.type==='sync'&&active){if(current&&!building)emitFull();else if(!building)build();}});
// [VI dòng gốc 25] gọi process.stdin.on('data', bytes=>{try{parser.push(bytes);}catch(e){console.error(e.message);process.exit(2);}}) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi parser.push(bytes) để thêm phần tử vào cuối mảng | Nhận lỗi bằng e và chạy phần xử lý lỗi.
process.stdin.on('data',bytes=>{try{parser.push(bytes);}catch(e){console.error(e.message);process.exit(2);}});
// [VI dòng gốc 26] gọi process.stdin.on('end', ()=>{active=false;clearInterval(relayTimer);clearTimeout(debounce);for(const w of watchers)w.close();process.exit…) | gán active bằng false | gọi clearInterval(relayTimer) để hủy tác vụ lặp | gọi clearTimeout(debounce) để hủy lịch thực hiện một lần
process.stdin.on('end',()=>{active=false;clearInterval(relayTimer);clearTimeout(debounce);for(const w of watchers)w.close();process.exit(0);});
// [VI dòng gốc 27] Dòng trống để tách các phần, không có lệnh thực thi.
