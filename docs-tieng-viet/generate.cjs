 
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),out=__dirname;
const acornModule={exports:{}};
const bundledParser=process.binding('natives')['internal/deps/acorn/acorn/dist/acorn'];
if(!bundledParser)throw Error('Node hiện tại không cung cấp bộ phân tích Acorn; chưa ghi tài liệu.');
new Function('exports','module',bundledParser)(acornModule.exports,acornModule);
const acorn=acornModule.exports;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const compact=s=>String(s).replace(/\s+/g,' ').trim();
const short=(s,n=180)=>compact(s).length>n?compact(s).slice(0,n)+'…':compact(s);
const digest=s=>crypto.createHash('sha256').update(s).digest('hex');
const jsExtensions=new Set(['.js','.cjs','.mjs']);
const extensions=new Set([...jsExtensions,'.ps1','.bat','.cs','.css','.html','.json']);
const generated=new Map([
  ['KVPV_V1_FULL.js','build.cjs + runtime-v1.js + src/'],
  ['KVPV_FULL_THIEN_QUAN.js','build.cjs + runtime-v1.js + src/'],
  ['KVPV_SCAN_LIVE_PATCH.js','build.cjs + src/'],
  ['edge-addon/core.js','build-edge-addon.cjs + live/core.cjs'],
  ['android/KVPV_ANDROID.user.js','build-android.cjs + android/loader.js + FULL']
]);
function walk(dir){return fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.posix.join(dir,e.name)):[path.posix.join(dir,e.name)]);}
const files=[...fs.readdirSync(root,{withFileTypes:true}).filter(e=>e.isFile()).map(e=>e.name),...['src','live','scripts','edge-addon','extension','android'].flatMap(walk)]
  .filter(f=>extensions.has(path.extname(f))&&!generated.has(f)).sort();
const category=f=>f.startsWith('src/')?'Mã game':f.startsWith('edge-addon/')?'Extension và native host':f.startsWith('live/')?'Đồng bộ và kiểm tra bản cập nhật':f.startsWith('android/')?'Bộ nạp Android':f.startsWith('scripts/')?'Công cụ phụ':f==='runtime-v1.js'?'Khởi động và nạp module':'Build, cài đặt và cấu hình';
const meanings={
  W:'đối tượng window của frame hiện tại',actor:'ID nhân vật sở hữu phiên này',owned:'kiểm tra đúng nhân vật và phiên còn được phép chạy',
  snapshot:'đọc ảnh chụp trạng thái hiện tại',status:'trả trạng thái để kiểm tra',tick:'xử lý một nhịp kiểm tra',
  start:'khởi động bộ điều khiển',stop:'dừng bộ điều khiển và dọn tài nguyên',release:'nhả quyền điều khiển đang giữ',
  reserve:'xin giữ quyền điều khiển cảnh',refresh:'làm mới dữ liệu theo điều kiện của hàm',
  bossLevel:'cấp boss được chọn',bossLayer:'tầng chứa boss được chọn',limits:'giới hạn sử dụng mỗi loại hoạt động',
  S:'trạng thái riêng của module',C:'biến cấu hình/trạng thái mang tên C; ý nghĩa cụ thể theo khối hiện tại',
  carry:'trạng thái được chuyển từ bản module cũ khi cập nhật',tag:'nhãn nhận diện công việc',
  setBossLevel:'đổi lựa chọn cấp boss cho nhân vật hiện tại',getItem:'đọc giá trị đã lưu',setItem:'ghi giá trị vào bộ lưu trữ',
  setBasicOnly:'bật/tắt chế độ nhân vật chỉ dùng đòn tay 8001 trong Thiên Quan, Linh Lung, Phù Văn và Tru Tiên',
  setBasicAnimationSpeed:'đặt hệ số phát hoạt ảnh 8001 phía client; không phải hệ số sát thương server',
  setBasicPace:'đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ',
  setClientPace:'đặt khoảng chờ thêm chung giữa các lần thử tung chiêu phía client',
  setInterleaved:'bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu',
  setPrimaryBasic:'bật/tắt ưu tiên kỹ năng đánh thường đã chọn',setBasicRotation:'chọn danh sách ID đòn thường được phép luân phiên',
  setBasicHitQuota:'đặt số đòn thường đã xác nhận trước khi cho Tuyệt Học; chế độ basicOnly vẫn chặn Tuyệt Học',
  setAfterTHWait:'đặt thời gian chờ thêm sau Tuyệt Học theo mili giây',setConfirmedTailCut:'bật/tắt cắt phần đuôi hoạt ảnh chỉ sau khi đã ghép được đòn trúng',
  setBurst:'bật/tắt chế độ tung nhóm chiêu; false là tắt',
  armTianQuan:'đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp',
  setInterval:'đăng ký tác vụ lặp theo khoảng thời gian',clearInterval:'hủy tác vụ lặp',setTimeout:'hẹn thực hiện một lần',clearTimeout:'hủy lịch thực hiện một lần',
  readFileSync:'đọc tệp đồng bộ',writeFileSync:'ghi tệp đồng bộ',mkdirSync:'tạo thư mục',readdirSync:'liệt kê mục trong thư mục',
  existsSync:'kiểm tra đường dẫn tồn tại',renameSync:'đổi tên hoặc thay thế tệp',unlinkSync:'xóa một tệp',
  parse:'phân tích dữ liệu đầu vào theo API đang gọi',stringify:'chuyển giá trị thành chuỗi JSON',
  filter:'giữ phần tử thỏa điều kiện',map:'biến đổi từng phần tử',find:'tìm phần tử đầu tiên thỏa điều kiện',
  some:'kiểm tra có ít nhất một phần tử thỏa điều kiện',every:'kiểm tra mọi phần tử đều thỏa điều kiện',
  reduce:'gộp các phần tử thành một kết quả',sort:'sắp xếp mảng tại chỗ',slice:'lấy một đoạn dữ liệu',
  push:'thêm phần tử vào cuối mảng',includes:'kiểm tra dữ liệu có chứa giá trị',
  getCfgById:'tra cấu hình theo ID bằng API client',rqEtScene:'gửi yêu cầu vào/ra cảnh qua luồng native',
  GetMythicalAnimalCopyInfo:'yêu cầu dữ liệu phó bản Thần Thú',GetMythicalAnimalNpcRefreshInfo:'yêu cầu dữ liệu hồi sinh mục tiêu Thần Thú',
  getMABosss:'đọc danh sách mục tiêu Thần Thú theo tầng',getMABossIsLive:'kiểm tra mục tiêu Thần Thú còn sống',
  setTempTargetOcc:'đặt mục tiêu dự kiến trước khi chuyển cảnh',setNpcMovePoint:'giao điểm đi đến NPC cho bộ di chuyển native',
  setTarget:'đặt mục tiêu qua đối tượng đang gọi',acquire:'xin quyền giữ tài nguyên theo bộ điều phối',renew:'gia hạn quyền đang giữ',
  require:'nạp module Node.js',fetch:'gửi yêu cầu mạng theo URL và tùy chọn',sendMessage:'gửi thông điệp qua API đang gọi',
  addEventListener:'đăng ký bộ xử lý sự kiện',removeEventListener:'gỡ bộ xử lý sự kiện',addListener:'đăng ký bộ lắng nghe',
  Object:'công cụ xử lý đối tượng JavaScript',freeze:'khóa thay đổi trực tiếp các thuộc tính của đối tượng ở mức ngoài cùng',
  Number:'chuyển sang số',String:'chuyển sang chuỗi',Boolean:'chuyển sang giá trị đúng/sai'
};
function javascript(source){
  const normalizeTemplate=s=>s.replace(/\/\* (?:BUILD_ID|READINESS) \*\//g,m=>'0'+' '.repeat(m.length-1));
  const parseSource=normalizeTemplate(source);
  const tokens=[],comments=[];let ast;
  const options={ecmaVersion:'latest',locations:true,allowHashBang:true,onToken:tokens,onComment:comments};
  try{ast=acorn.parse(parseSource,{...options,sourceType:'script'});}catch(first){tokens.length=0;comments.length=0;try{ast=acorn.parse(parseSource,{...options,sourceType:'module'});}catch(second){throw Error(second.message);}}
  const text=n=>n?short(source.slice(n.start,n.end)):'';
  const name=n=>n?.type==='Identifier'?n.name:n?.type==='PrivateIdentifier'?'#'+n.name:n?.type==='Literal'?JSON.stringify(n.value):text(n);
  const lastName=n=>n?.type==='MemberExpression'?name(n.property):name(n);
  const functionName=(n,p)=>n.id?.name??(p?.type==='VariableDeclarator'?name(p.id):p?.type==='Property'||p?.type==='MethodDefinition'?name(p.key):p?.type==='AssignmentExpression'?text(p.left):'hàm không đặt tên');
  function expr(n){
    if(!n)return 'không có giá trị';
    if(n.type==='ChainExpression')return expr(n.expression)+' (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)';
    if(n.type==='Identifier')return meanings[n.name]?`${n.name} (${meanings[n.name]})`:n.name;
    if(n.type==='Literal')return name(n);
    if(n.type==='CallExpression'||n.type==='NewExpression'){
      if(['ArrowFunctionExpression','FunctionExpression'].includes(n.callee.type))return 'chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong';
      const callee=text(n.callee),key=lastName(n.callee),args=n.arguments.map(a=>text(a)).join(', ');
      return `${n.type==='NewExpression'?'tạo đối tượng bằng':'gọi'} ${callee}(${short(args,120)})${meanings[key]?' để '+meanings[key]:/^_/.test(key)?'; chức năng nội bộ chưa xác minh từ tên hàm':''}`;
    }
    if(n.type==='AssignmentExpression')return `${n.operator==='='?'gán':n.operator==='??='?'gán khi giá trị hiện tại là null/undefined':n.operator==='||='?'gán khi giá trị hiện tại là falsy':n.operator==='&&='?'gán khi giá trị hiện tại là truthy':'cập nhật bằng toán tử '+n.operator} ${text(n.left)} bằng ${text(n.right)}`;
    if(n.type==='UpdateExpression')return `${n.operator==='++'?'tăng':'giảm'} ${text(n.argument)} một đơn vị${n.prefix?' trước khi lấy giá trị':' sau khi lấy giá trị'}`;
    if(n.type==='AwaitExpression')return 'chờ tác vụ bất đồng bộ: '+expr(n.argument);
    if(n.type==='UnaryExpression')return n.operator==='delete'?'xóa thuộc tính '+text(n.argument):n.operator==='!'?'đảo giá trị đúng/sai của '+text(n.argument):n.operator==='typeof'?'lấy tên kiểu dữ liệu của '+text(n.argument):'áp dụng toán tử '+n.operator+' lên '+text(n.argument);
    if(n.type==='LogicalExpression')return `${text(n.left)} ${n.operator==='&&'?'và chỉ đánh giá vế phải khi vế trái truthy':n.operator==='||'?'hoặc dùng vế phải khi vế trái falsy':'hoặc dùng vế phải khi vế trái là null/undefined'}: ${text(n.right)}`;
    if(n.type==='ConditionalExpression')return `nếu ${text(n.test)} thì lấy ${text(n.consequent)}, ngược lại lấy ${text(n.alternate)}`;
    if(n.type==='SequenceExpression')return 'thực hiện lần lượt: '+n.expressions.map(expr).join('; ');
    if(n.type==='FunctionExpression'||n.type==='ArrowFunctionExpression')return `tạo hàm${n.async?' bất đồng bộ':''} với tham số ${n.params.map(name).join(', ')||'(không có)'}`+(n.type==='ArrowFunctionExpression'&&n.body.type!=='BlockStatement'?'; mỗi lần gọi trả về '+expr(n.body):'');
    if(n.type==='ObjectExpression')return 'tạo đối tượng gồm '+n.properties.map(p=>p.type==='SpreadElement'?'các thuộc tính của '+text(p.argument):name(p.key)).join(', ');
    if(n.type==='ArrayExpression')return `tạo mảng gồm ${n.elements.length} vị trí: ${text(n)}`;
    if(n.type==='MemberExpression')return 'đọc '+text(n)+(n.optional?' nếu đối tượng tồn tại':'');
    if(n.type==='TemplateLiteral')return 'tạo chuỗi mẫu; các phần ${…} được tính rồi chèn vào chuỗi';
    if(n.type==='BinaryExpression')return 'tính biểu thức '+text(n);
    return text(n);
  }
  const byLine=new Map(),scopes=[];
  function add(n,description,rank=1){const line=n.loc.start.line;const list=byLine.get(line)??[];list.push({description:short(description,460),rank,start:n.start});byLine.set(line,list);}
  function visit(n,p){if(!n||typeof n!=='object'||typeof n.type!=='string')return;
    switch(n.type){
      case 'VariableDeclaration':add(n,`Khai báo ${n.kind==='const'?'biến không gán lại bằng const':n.kind==='let'?'biến có thể gán lại bằng let':'biến theo phạm vi hàm bằng var'}: `+n.declarations.map(d=>name(d.id)+(d.init?' = '+expr(d.init):' (chưa gán giá trị)')).join('; '),10);break;
      case 'FunctionDeclaration':case 'FunctionExpression':case 'ArrowFunctionExpression':{
        const fn=functionName(n,p);scopes.push({first:n.loc.start.line,last:n.loc.end.line,name:fn});
        add(n,`Định nghĩa ${n.async?'hàm bất đồng bộ':'hàm'} ${fn}; tham số: ${n.params.map(name).join(', ')||'không có'}${meanings[fn]?'. Mục đích: '+meanings[fn]:''}`,n.type==='FunctionDeclaration'?10:4);break;}
      case 'ExpressionStatement':add(n,expr(n.expression),10);break;
      case 'IfStatement':add(n,'Kiểm tra '+text(n.test)+': đúng thì chạy nhánh sau if'+(n.alternate?', sai thì chạy nhánh else.':'.'),10);break;
      case 'ReturnStatement':add(n,'Kết thúc hàm hiện tại'+(n.argument?' và trả về: '+expr(n.argument):' mà không trả giá trị cụ thể')+'.',10);break;
      case 'ThrowStatement':add(n,'Ném lỗi và chuyển luồng tới catch gần nhất: '+expr(n.argument),10);break;
      case 'TryStatement':add(n,'Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.',10);break;
      case 'CatchClause':add(n,'Nhận lỗi bằng '+name(n.param)+' và chạy phần xử lý lỗi.',10);break;
      case 'ForStatement':add(n,`Lặp for: khởi tạo ${text(n.init)||'(không có)'}; tiếp tục khi ${text(n.test)||'đúng'}; sau mỗi vòng ${text(n.update)||'(không cập nhật)'}.`,10);break;
      case 'ForOfStatement':add(n,'Duyệt từng giá trị trong '+text(n.right)+' bằng '+text(n.left)+(n.await?' và chờ từng bước bất đồng bộ.':'.'),10);break;
      case 'ForInStatement':add(n,'Duyệt các khóa liệt kê được trong '+text(n.right)+' bằng '+text(n.left)+'.',10);break;
      case 'WhileStatement':add(n,'Lặp khi điều kiện còn đúng: '+text(n.test),10);break;
      case 'DoWhileStatement':add(n,'Chạy thân vòng lặp trước, rồi kiểm tra '+text(n.test)+' để quyết định lặp tiếp.',10);break;
      case 'SwitchStatement':add(n,'Chọn nhánh case theo giá trị '+text(n.discriminant)+'.',10);break;
      case 'SwitchCase':add(n,n.test?'Nhánh có giá trị '+text(n.test)+'.':'Nhánh mặc định khi không khớp case nào.',10);break;
      case 'BreakStatement':add(n,'Thoát vòng lặp/switch'+(n.label?' có nhãn '+name(n.label):' hiện tại')+'.',10);break;
      case 'ContinueStatement':add(n,'Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.',10);break;
      case 'Property':if(p?.type==='ObjectExpression')add(n,'Thuộc tính '+name(n.key)+': '+(n.shorthand?'dùng biến cùng tên':expr(n.value)),5);break;
      case 'AssignmentExpression':add(n,expr(n),3);break;
      case 'CallExpression':case 'NewExpression':add(n,expr(n),2);break;
      case 'ClassDeclaration':add(n,'Định nghĩa lớp '+name(n.id)+(n.superClass?' kế thừa '+text(n.superClass):'')+'.',10);break;
      case 'MethodDefinition':add(n,'Định nghĩa phương thức '+name(n.key)+(n.static?' của lớp':' của đối tượng')+'.',8);break;
      case 'ImportDeclaration':add(n,'Nhập module '+text(n.source)+'.',10);break;
      case 'ExportNamedDeclaration':case 'ExportDefaultDeclaration':add(n,'Xuất giá trị/khai báo để module khác sử dụng.',10);break;
      case 'TemplateElement':add(n,'Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.',20);break;
    }
    for(const [key,value]of Object.entries(n)){if(['loc','start','end','type'].includes(key))continue;if(Array.isArray(value))for(const v of value)visit(v,n);else if(value&&typeof value==='object'&&value.type)visit(value,n);}
  }
  visit(ast,null);
  const commentByLine=new Map(),tokenByLine=new Map(),coverByLine=new Map(),scopeByLine=new Map();
  for(const c of comments)for(let l=c.loc.start.line;l<=c.loc.end.line;l++)if(!commentByLine.has(l))commentByLine.set(l,c);
  for(const t of tokens){if(!tokenByLine.has(t.loc.start.line))tokenByLine.set(t.loc.start.line,t);for(let l=t.loc.start.line+1;l<=t.loc.end.line;l++)if(!coverByLine.has(l))coverByLine.set(l,t);}
  for(const s of scopes.sort((a,b)=>(b.last-b.first)-(a.last-a.first)))for(let l=s.first;l<=s.last;l++)scopeByLine.set(l,s);
  const lines=source.split(/\r?\n/),notes=lines.map((line,i)=>{
    const ln=i+1,t=line.trim();if(!t)return 'Dòng trống để tách các phần, không có lệnh thực thi.';
    const cm=commentByLine.get(ln);
    const coveringToken=coverByLine.get(ln);
    if(coveringToken?.type.label==='template'||coveringToken?.type.label==='string')return 'Phần tiếp tục của chuỗi dữ liệu nhiều dòng; giữ nguyên nội dung và xuống dòng.';
    const entries=(byLine.get(ln)??[]).sort((a,b)=>b.rank-a.rank||a.start-b.start);
    if(entries.length){const max=entries[0].rank;return [...new Set(entries.filter(e=>e.rank===max).slice(0,4).map(e=>e.description))].join(' | ');}
    if(cm&&(/^(\/\/|\/\*|\*|\*\/)/.test(t)||cm.loc.start.line<ln))return 'Chú thích gốc của tác giả; không được thực thi. Nội dung: '+short(t.replace(/^(\/\/|\/\*|\*\/|\*)\s?/,''),340);
    if(/^[\]});,\s]+$/.test(t))return 'Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.';
    if(/^else\b/.test(t))return 'Nhánh else được chạy khi điều kiện if tương ứng không đúng.';
    if(/^finally\b/.test(t))return 'Khối finally được chạy khi rời try/catch, kể cả khi có lỗi hoặc return.';
    const scope=scopeByLine.get(ln);
    const token=tokenByLine.get(ln);
    return `Tiếp tục ${scope?'hàm '+scope.name:'biểu thức hoặc khai báo đang mở'}${token?'; thành phần cú pháp bắt đầu bằng '+token.type.label:''}. Đọc cùng dòng mở phía trên: ${short(t,180)}`;
  });
  // Không chèn chú thích vào giữa chuỗi, regex, template hoặc comment nhiều dòng.
  const unsafe=new Set();for(const t of [...tokens,...comments])for(let l=t.loc.start.line+1;l<=t.loc.end.line;l++)unsafe.add(l);
  let annotated=lines.map((line,i)=>unsafe.has(i+1)||i===0&&line.startsWith('#!')?line:`// [VI dòng gốc ${i+1}] ${notes[i].replace(/[\r\n\u2028\u2029]/g,' ').replace(/\/\*/g,'[mở chú thích]').replace(/\*\//g,'[đóng chú thích]')}\n${line}`).join('\n');
  const readTokens=s=>{const a=[];for(const t of acorn.tokenizer(s,{ecmaVersion:'latest',allowHashBang:true}))a.push([t.type.label,t.value??null]);return JSON.stringify(a);};
  if(readTokens(parseSource)!==readTokens(normalizeTemplate(annotated)))throw Error('Token thay đổi khi chèn chú thích');
  // Phân tích cả bản đã chèn, kiểm tra cấu trúc AST thay vì chỉ kiểm tra token.
  const cleanAst=x=>JSON.stringify(x,(k,v)=>['start','end','loc','raw'].includes(k)?undefined:v);
  let result;try{result=acorn.parse(normalizeTemplate(annotated),{ecmaVersion:'latest',sourceType:ast.sourceType,allowHashBang:true});}catch(e){throw Error('Bản chú thích lỗi cú pháp: '+e.message);}
  if(cleanAst(ast)!==cleanAst(result))throw Error('Cấu trúc chương trình thay đổi khi chèn chú thích');
  return {notes,annotated,verified:'AST và token JavaScript tương đương nguồn'+(parseSource!==source?' (đã thay chỗ giữ BUILD_ID bằng giá trị mẫu khi kiểm tra)':'')};
}

// Chỉ xóa các chú thích tự sinh nằm ở dòng riêng, không xóa nội dung giống comment trong chuỗi.
function stripAutoNotes(source){
  const comments=[];for(const token of acorn.tokenizer(source,{ecmaVersion:'latest',locations:true,allowHashBang:true,onComment:comments}))void token;
  const lines=source.split(/\r?\n/),remove=new Set();
  for(const c of comments)if(c.type==='Line'&&/^\s*\[VI dòng gốc \d+\]/.test(c.value)&&c.loc.start.line===c.loc.end.line&&/^\s*\/\//.test(lines[c.loc.start.line-1]))remove.add(c.loc.start.line-1);
  return lines.filter((line,i)=>!remove.has(i)).join('\n');
}
const inline=process.argv.includes('--inline');
if(inline&&!fs.existsSync(path.join(root,'.kvpv-live','maintenance.lock')))throw Error('Cần maintenance.lock trước khi sửa nguồn đang đồng bộ.');
const planned=[];
for(const file of files.filter(f=>jsExtensions.has(path.extname(f)))){
  const current=fs.readFileSync(path.join(root,file),'utf8'),source=stripAutoNotes(current);
  let result;try{result=javascript(source);}catch(e){throw Error(file+': '+e.message);}
  planned.push({file,current,source,result});
}
// Phân tích và so sánh AST toàn bộ trước khi ghi bất cứ tệp nguồn nào.
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const backup=path.join(root,'.kvpv-live','maintenance-backups','inline-vietnamese-'+stamp),records=[];
if(inline)fs.mkdirSync(backup,{recursive:true});
for(const item of planned){
  const destination=inline?path.join(root,item.file):path.join(out,'code-co-chu-thich',item.file);
  if(inline){
    if(fs.readFileSync(destination,'utf8')!==item.current)throw Error('Nguồn vừa đổi trong lúc tạo chú thích: '+item.file);
    const saved=path.join(backup,item.file);fs.mkdirSync(path.dirname(saved),{recursive:true});fs.writeFileSync(saved,item.current);
  }else fs.mkdirSync(path.dirname(destination),{recursive:true});
  fs.writeFileSync(destination,item.result.annotated);
  records.push({file:item.file,originalLines:item.source.split(/\r?\n/).length,before:digest(item.current),after:digest(item.result.annotated),verification:item.result.verified});
}
const report={createdAt:new Date().toISOString(),mode:inline?'inline-original-source':'annotated-copies',files:records.length,originalLines:records.reduce((n,r)=>n+r.originalLines,0),backup:inline?backup:null,records};
fs.writeFileSync(path.join(out,inline?'inline-source-manifest.json':'coverage.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({mode:report.mode,files:report.files,originalLines:report.originalLines,backup:report.backup},null,2));
