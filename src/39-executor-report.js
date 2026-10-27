// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Read-only, bounded diagnostics for the local debugger bridge. [đóng chú thích]
/* Read-only, bounded diagnostics for the local debugger bridge. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict"
  'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = window; actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi | Khai báo biến có thể gán lại bằng let: at = áp dụng toán tử - lên Infinity; cached = null
  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');let at=-Infinity,cached=null;
// [VI dòng gốc 5] Chú thích gốc của tác giả; không được thực thi. Nội dung: Retire manual experiment APIs in already-open tabs; preserve any pending state.
  // Retire manual experiment APIs in already-open tabs; preserve any pending state.
// [VI dòng gốc 6] xóa thuộc tính W.KVPV_TOWER_SKILLS | xóa thuộc tính W.KVPV_BUFF_INSPECT
  delete W.KVPV_TOWER_SKILLS;delete W.KVPV_BUFF_INSPECT;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: str = tạo hàm với tham số x; mỗi lần gọi trả về gọi String(x??'').slice(0, 300) để lấy một đoạn dữ liệu
  const str=x=>String(x??'').slice(0,300);
// [VI dòng gốc 8] Định nghĩa hàm snapshot; tham số: không có. Mục đích: đọc ảnh chụp trạng thái hiện tại
  function snapshot(){
// [VI dòng gốc 9] Kiểm tra !actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED)return null;
// [VI dòng gốc 10] Kiểm tra Date.now()-at<5000: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: cached.
    if(Date.now()-at<5000)return cached;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: era = gọi W.KVPV_REBORN_GOALS?.inspect() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rows = W.KVPV_TIENVI_GOALS?.inspect?.() hoặc dùng vế phải khi vế trái là null/undefined: []; mainRow = đọc W._Ba?._zIt?._FIt?.ins?.taskInfo nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); cfg = nếu Array.isArray(mainRow) thì lấy W._ft?.__Z?.ins?.getTaskCfgById?.(mainRow[0]), ngược lại lấy null
    const era=W.KVPV_REBORN_GOALS?.inspect?.(),rows=W.KVPV_TIENVI_GOALS?.inspect?.()??[],mainRow=W._Ba?._zIt?._FIt?.ins?.taskInfo,
// [VI dòng gốc 12] gọi Array.isArray(mainRow) | gọi W._ft?.__Z?.ins?.getTaskCfgById(mainRow[0])
      cfg=Array.isArray(mainRow)?W._ft?.__Z?.ins?.getTaskCfgById?.(mainRow[0]):null;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: main = nếu cfg thì lấy {id:str(mainRow[0]),name:str(cfg[1]),action:Number(cfg[6]),state:Number(mainRow[1])}, ngược lại lấy null
    const main=cfg?{id:str(mainRow[0]),name:str(cfg[1]),action:Number(cfg[6]),state:Number(mainRow[1])}:null;
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: tasks = gọi (era?.tasks??[]).slice(0,20).map(q=>({id:str(q.id),nodeId:q.nodeId,name:str(q.name),state:q.state,progress:q.progress,target:q.target, action:q.action,ra…) để biến đổi từng phần tử
    const tasks=(era?.tasks??[]).slice(0,20).map(q=>({id:str(q.id),nodeId:q.nodeId,name:str(q.name),state:q.state,progress:q.progress,target:q.target,
// [VI dòng gốc 15] Thuộc tính action: đọc q.action | Thuộc tính rawAction: đọc q.rawAction | Thuộc tính mode: đọc q.mode | Thuộc tính kind: gọi str(q.kind)
      action:q.action,rawAction:q.rawAction,mode:q.mode,kind:str(q.kind)}));
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: missing = gọi tasks.filter(q=>q.state!==2&&!['LEVEL','STAGE','LINH_LUNG','FABAO','EQUIPMENT','CO_BAO','ARENA'].includes(q.kind)) để giữ phần tử thỏa điều kiện
    const missing=tasks.filter(q=>q.state!==2&&!['LEVEL','STAGE','LINH_LUNG','FABAO','EQUIPMENT','CO_BAO','ARENA'].includes(q.kind));
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: mainRoute = đọc W.KVPV_V866?.status?.(false)?.route nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const mainRoute=W.KVPV_V866?.status?.(false)?.route;
// [VI dòng gốc 18] Kiểm tra main&&main.state!==2&&mainRoute==='unknown'&&!era?.root: đúng thì chạy nhánh sau if. | gọi missing.push({source:'MAIN',...main,kind:'unverified_executor'}) để thêm phần tử vào cuối mảng
    if(main&&main.state!==2&&mainRoute==='unknown'&&!era?.root)missing.push({source:'MAIN',...main,kind:'unverified_executor'});
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: tv = gọi rows.slice(0,80).map(q=>({id:str(q.id),name:str(q.name),state:q.state,progress:q.progress,target:q.target,action:q.action,executor:str(q.exec…) để biến đổi từng phần tử
    const tv=rows.slice(0,80).map(q=>({id:str(q.id),name:str(q.name),state:q.state,progress:q.progress,target:q.target,action:q.action,executor:str(q.executor),reason:str(q.reason)}));
// [VI dòng gốc 20] Duyệt từng giá trị trong tv bằng const q. | Khai báo biến không gán lại bằng const: q (chưa gán giá trị) | Kiểm tra q.state===0&&['unverified_requirement','waiting_config'].includes(q.executor): đúng thì chạy nhánh sau if. | gọi missing.push({source:'TIEN_VI',...q}) để thêm phần tử vào cuối mảng
    for(const q of tv)if(q.state===0&&['unverified_requirement','waiting_config'].includes(q.executor))missing.push({source:'TIEN_VI',...q});
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: exec = gọi W.KVPV_REBORN_EXECUTORS?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); planner = gọi W.KVPV_PROGRESS_PLANNER?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const exec=W.KVPV_REBORN_EXECUTORS?.status?.(),planner=W.KVPV_PROGRESS_PLANNER?.status?.();
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: windows = tạo mảng gồm 0 vị trí: []; manager = đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const windows=[],manager=W._ft?._Y4n?.ins;
// [VI dòng gốc 23] Duyệt từng giá trị trong [41,46,289,93,113,114,115,116,393] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | Kiểm tra manager?.isOpened?.(id): đúng thì chạy nhánh sau if.
    for(const id of [41,46,289,93,113,114,115,116,393])if(manager?.isOpened?.(id)){
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: p = gọi manager.getPanelById(id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); buttons = tạo mảng gồm 0 vị trí: []
      const p=manager.getPanelById?.(id),buttons=[];
// [VI dòng gốc 25] Duyệt từng giá trị trong ['btn','getBtn','oneBtn','tenBtn','fiftyBtn','allupBtn','upBtn','getAllBtn'] bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị)
      for(const key of ['btn','getBtn','oneBtn','tenBtn','fiftyBtn','allupBtn','upBtn','getAllBtn']){
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: b = đọc p?.[key] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra b: đúng thì chạy nhánh sau if. | gọi buttons.push({key,label:str(b.label),visible:b.visible!==false,disabled:b.disabled===true,gray:b.gray===true}) để thêm phần tử vào cuối mảng
        const b=p?.[key];if(b)buttons.push({key,label:str(b.label),visible:b.visible!==false,disabled:b.disabled===true,gray:b.gray===true});
// [VI dòng gốc 27] gọi windows.push({id,className:str(p?.constructor?.name),visible:p?.visible!==false,buttons}) để thêm phần tử vào cuối mảng
      }windows.push({id,className:str(p?.constructor?.name),visible:p?.visible!==false,buttons});
// [VI dòng gốc 28] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: far = gọi W.KVPV_TH300?.report() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); auto = gọi W.KVPV_HITRUN_AUTO?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); hit = đọc auto?.hitrun nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); basic = gọi W.KVPV_BASIC10?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy c…
    const far=W.KVPV_TH300?.report?.(),auto=W.KVPV_HITRUN_AUTO?.status?.(false),hit=auto?.hitrun,basic=W.KVPV_BASIC10?.status?.();
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: liveRole = gọi W._C?._Ba?.instance?.getRole(Number(actor)) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); liveTarget = đọc liveRole?.getComponent?.(W._d?._Yct?._Het)?.target nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); targetHP = gọi liveTarget?.property?.get('hp') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const liveRole=W._C?._Ba?.instance?.getRole?.(Number(actor)),liveTarget=liveRole?.getComponent?.(W._d?._Yct?._Het)?.target,targetHP=liveTarget?.property?.get?.('hp');
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: truTienEnemies = nếu W.KVPV_FAR_SCOPE?.status?.().kind==='TRU_TIEN' thì lấy Object.values(W._C?._Ba?.instance?.getRoles?.()??{}).filter(r=>r?.isValid!==false&&Number(r?.property?.get?.('type'))===1&&Number(r?.property?.get?.('hp')?.[0])>0).length, ngược lại lấy null
    const truTienEnemies=W.KVPV_FAR_SCOPE?.status?.().kind==='TRU_TIEN'?Object.values(W._C?._Ba?.instance?.getRoles?.()??{}).filter(r=>r?.isValid!==false&&Number(r?.property?.get?.('type'))===1&&Number(r?.property?.get?.('hp')?.[0])>0).length:null;
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: combat = tạo đối tượng gồm truTienEnemies, targetType, targetHP, matchedHits, castSignals, silentCasts, targetOcc, autoMode, autoBlocked, hitReason, hitError, hitRunning, enabled, phase, hpPct, bossId, reason, distance, positioning, hidden, lastTickAt, tickAgeMs, timerActive, timerRepairs, documentFocused, nativeFrameRate, nativePowerPanelOpen, pollingGapMs, activeController, activeAttempts, roadMelee, outsideAttempt…
    const combat={truTienEnemies,targetType:liveTarget?.property?.get?.('type'),targetHP:Array.isArray(targetHP)?targetHP.slice(0,2):null,matchedHits:far?.confirmedCastHitPairs,castSignals:far?.nativeCombat?.dispatch?.signals,silentCasts:far?.nativeCombat?.dispatch?.silent,targetOcc:liveTarget?.property?.get?.('occ'),autoMode:str(auto?.lastMode),autoBlocked:str(auto?.lastBlocked),hitReason:str(hit?.reason),hitError:str(hit?.lastError),hitRunning:hit?.running,enabled:auto?.enabled,phase:hit?.phase,hpPct:hit?.hpPct,bossId:str(hit?.bossId),
// [VI dòng gốc 33] Thuộc tính reason: gọi str(far?.lastReason) | Thuộc tính distance: đọc far?.currentDistance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính positioning: đọc far?.positioning nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      reason:str(far?.lastReason),distance:far?.currentDistance,positioning:far?.positioning,
// [VI dòng gốc 34] Thuộc tính hidden: W.document?.hidden hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính lastTickAt: đọc far?.lastTickAt nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính tickAgeMs: đọc far?.tickAgeMs nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính timerActive: đọc far?.timerActive nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      hidden:W.document?.hidden??null,lastTickAt:far?.lastTickAt,tickAgeMs:far?.tickAgeMs,timerActive:far?.timerActive,timerRepairs:far?.timerRepairs,
// [VI dòng gốc 35] Thuộc tính documentFocused: nếu typeof W.document?.hasFocus==='function' thì lấy W.document.hasFocus(), ngược lại lấy null | Thuộc tính nativeFrameRate: gọi str(W.Laya?.stage?.frameRate) | Thuộc tính nativePowerPanelOpen: W._ft?._Y4n?.ins?.isOpened?.(480) hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính pollingGapMs: W.KVPV_ACCOUNT_POLICY?.pollingGap?.() hoặc dùng vế phải khi vế trái là null/undefined: null
      documentFocused:typeof W.document?.hasFocus==='function'?W.document.hasFocus():null,nativeFrameRate:str(W.Laya?.stage?.frameRate),nativePowerPanelOpen:W._ft?._Y4n?.ins?.isOpened?.(480)??null,pollingGapMs:W.KVPV_ACCOUNT_POLICY?.pollingGap?.()??null,
// [VI dòng gốc 36] Thuộc tính activeController: nếu far?.scope?.inside===true&&far?.running===true thì lấy 'far', ngược lại lấy basic?.active===true?'outside':'native'
      activeController:far?.scope?.inside===true&&far?.running===true?'far':basic?.active===true?'outside':'native',
// [VI dòng gốc 37] Thuộc tính activeAttempts: nếu far?.scope?.inside===true&&far?.running===true thì lấy far?.castAttempts, ngược lại lấy basic?.attempts
      activeAttempts:far?.scope?.inside===true&&far?.running===true?far?.castAttempts:basic?.attempts,
// [VI dòng gốc 38] Thuộc tính roadMelee: đọc basic?.roadMelee nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính outsideAttempts: đọc basic?.attempts nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính outsideBasicAttempts: đọc basic?.basicAttempts nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính outsideSkillAttempts: đọc basic?.tuyetHocAttempts nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      roadMelee:basic?.roadMelee,outsideAttempts:basic?.attempts,outsideBasicAttempts:basic?.basicAttempts,outsideSkillAttempts:basic?.tuyetHocAttempts,
// [VI dòng gốc 39] Thuộc tính basicAnimationSpeed: đọc far?.basicAnimationSpeed nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính scaledBasicAnimations: đọc far?.scaledBasicAnimations nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính basicSpeedTrial: đọc far?.basicSpeedTrial nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính basicOnly: đọc far?.basicOnly nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      basicAnimationSpeed:far?.basicAnimationSpeed,scaledBasicAnimations:far?.scaledBasicAnimations,basicSpeedTrial:far?.basicSpeedTrial,basicOnly:far?.basicOnly,playerSkillIds:far?.playerSkillIds,primaryBasicEnabled:far?.primaryBasicEnabled,primaryBasicSkillId:far?.primaryBasicSkillId,basicAttempts:far?.interleaved?.basicAttempts,basicHits:far?.interleaved?.basicConfirmedHits,basicSuspended:far?.interleaved?.basicSuspended,
// [VI dòng gốc 40] Thuộc tính primaryBasicClientWaitMs: đọc far?.primaryBasicClientWaitMs nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      primaryBasicClientWaitMs:far?.primaryBasicClientWaitMs,
// [VI dòng gốc 41] Thuộc tính clientPaceMs: đọc far?.paceMs nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính clientScanMs: đọc far?.interleaved?.scanMs nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      clientPaceMs:far?.paceMs,clientScanMs:far?.interleaved?.scanMs,
// [VI dòng gốc 42] Thuộc tính afterTHWaitMs: đọc far?.afterTHWaitMs nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính basicHitQuota: đọc far?.basicHitQuota nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính confirmedSinceTH: đọc far?.confirmedSinceTH nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính thCycles: đọc far?.thCycles nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      afterTHWaitMs:far?.afterTHWaitMs,basicHitQuota:far?.basicHitQuota,confirmedSinceTH:far?.confirmedSinceTH,thCycles:far?.thCycles,
// [VI dòng gốc 43] Thuộc tính primaryBasicBurstBeforeSkill: đọc far?.primaryBasicBurstBeforeSkill nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      primaryBasicBurstBeforeSkill:far?.primaryBasicBurstBeforeSkill,
// [VI dòng gốc 44] Thuộc tính basicRotation: đọc far?.basicRotation nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      basicRotation:far?.basicRotation,
// [VI dòng gốc 45] Thuộc tính confirmedBasicTailCut: đọc far?.confirmedBasicTailCut nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính confirmedBasicTailCuts: đọc far?.confirmedBasicTailCuts nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      confirmedBasicTailCut:far?.confirmedBasicTailCut,confirmedBasicTailCuts:far?.confirmedBasicTailCuts,
// [VI dòng gốc 46] Thuộc tính recentNativeCasts: gọi far?.nativeCombat?.dispatch?.recent?.slice(-16).map(c=>({at:c.at,id:c.id,targetId:c.targetId,signaled:c.signaled})) để biến đổi từng phần tử (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính at: đọc c.at | Thuộc tính id: đọc c.id | Thuộc tính targetId: đọc c.targetId
      recentNativeCasts:far?.nativeCombat?.dispatch?.recent?.slice(-16).map(c=>({at:c.at,id:c.id,targetId:c.targetId,signaled:c.signaled})),
// [VI dòng gốc 47] Thuộc tính excludedBasicSkillIds: đọc far?.excludedBasicSkillIds nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      excludedBasicSkillIds:far?.excludedBasicSkillIds,
// [VI dòng gốc 48] Thuộc tính attempts: đọc far?.castAttempts nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính dispatch: đọc far?.nativeCombat?.dispatch?.calls nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính farRunning: đọc far?.running nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      attempts:far?.castAttempts,dispatch:far?.nativeCombat?.dispatch?.calls,farRunning:far?.running,
// [VI dòng gốc 49] Thuộc tính selectorOwned: đọc far?.nativeCombat?.selectorOwned nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính combatOwned: đọc far?.nativeCombat?.combatOwned nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      selectorOwned:far?.nativeCombat?.selectorOwned,combatOwned:far?.nativeCombat?.combatOwned,
// [VI dòng gốc 50] Thuộc tính scope: gọi str(far?.scope?.kind) | Thuộc tính scopeInside: đọc far?.scope?.inside nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính basicActive: đọc basic?.active nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính basicReason: gọi str(basic?.reason)
      scope:str(far?.scope?.kind),scopeInside:far?.scope?.inside,scopeEvidence:W.KVPV_TQ_SCOPE?.status?.(),targetName:str(liveTarget?.property?.get?.('name')),basicActive:basic?.active,basicReason:str(basic?.reason),basicError:str(basic?.lastError),
// [VI dòng gốc 51] Thuộc tính cooldown: đọc far?.nativeCombat?.cooldown nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính animationPlaying: đọc far?.nativeCombat?.animationPlaying nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      cooldown:far?.nativeCombat?.cooldown,animationPlaying:far?.nativeCombat?.animationPlaying,
// [VI dòng gốc 52] Thuộc tính state: gọi str(far?.performance?.current?.state) | Thuộc tính error: gọi str(far?.lastError) | Thuộc tính movementCommands: đọc far?.movementCommands nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      state:str(far?.performance?.current?.state),error:str(far?.lastError),movementCommands:far?.movementCommands};
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: priority = gọi W.KVPV_QUEST_PRIORITY?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); daily = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); scene = gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); parallel = gọi W.KVPV_PARALLEL_ACTIONS?.status() để trả trạng thái …
    const priority=W.KVPV_QUEST_PRIORITY?.status?.(),daily=W.KVPV_DAILY?.quickState?.(),scene=W.KVPV?.core?.scene?.status?.(),parallel=W.KVPV_PARALLEL_ACTIONS?.status?.();
// [VI dòng gốc 54] Khai báo biến không gán lại bằng const: nativeMap = gọi Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]) để chuyển sang số; bossModel = đọc W._Ba?._sst?._ist?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const nativeMap=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]),bossModel=W._Ba?._sst?._ist?.inst;
// [VI dòng gốc 55] Khai báo biến không gán lại bằng const: demonRows = gọi (W._ft?._$st?.ins?.cfgs??[]).filter(r=>Array.isArray(r)&&Number(W._ft?._po?.ins?.getCfgById?.(r[0])?.[7])===10).slice(0, 80) để lấy một đoạn dữ liệu
    const demonRows=(W._ft?._$st?.ins?.cfgs??[]).filter(r=>Array.isArray(r)&&Number(W._ft?._po?.ins?.getCfgById?.(r[0])?.[7])===10).slice(0,80);
// [VI dòng gốc 56] Khai báo biến không gán lại bằng const: hongModel = đọc W._Ba?._OBt?._WBt?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const hongModel=W._Ba?._OBt?._WBt?.inst;
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: hongHoang = tạo đối tượng gồm enabled, serverState, count, max, full, xianFa
    const hongHoang={enabled:W.KVPV_DAILY?.config?.enableHongHoang,serverState:bossModel?.getCpSceneStateByType?.(17)?.slice(0,5),count:hongModel?.gathCount,max:hongModel?.maxNum,full:hongModel?.getGathCountIsMax?.(),xianFa:hongModel?.xFId};
// [VI dòng gốc 58] Khai báo biến không gán lại bằng const: bossRoutine = tạo đối tượng gồm entryLevel, instanceBoss, map, scene, mapType, common, mission, era, demonEnabled, demonQuota, demonRows
    const bossRoutine={entryLevel:W._Ba?._$a?._yo?.ins?.intoSce?.[3],instanceBoss:W._ft?._$st?.ins?.getCfgByMapIdAndLv?.(nativeMap,W._Ba?._$a?._yo?.ins?.intoSce?.[3])?.[2],map:nativeMap,scene:Number(W._Ba?._$a?.SceneUtil?.curScene),mapType:Number(W._ft?._po?.ins?.getCfgById?.(nativeMap)?.[7]),common:daily?.common,mission:W._Ba?._$a?._yo?.ins?.isInMission,era:Number(W._Ba?._rJ?._O$?.ins?.eraLevel),demonEnabled:W.KVPV_DAILY?.config?.enableYeuVuong,demonQuota:bossModel?.getBsTimesBySceneType?.(10)?.[2],demonRows:demonRows.map(r=>({map:r[0],boss:r[2],era:r[3],flag:bossModel?.getBsInfoById?.(r[2])?.[2]?.[0]}))};
// [VI dòng gốc 59] Khai báo biến không gán lại bằng const: stage = tạo đối tượng gồm priority, error, goal, job, step, running, owner, tag, auto, current, pending, parallelReason, parallelError
    const stage={priority:str(priority?.reason),error:str(priority?.lastError),goal:priority?.levelGoal?{id:str(priority.levelGoal.id),current:priority.levelGoal.current,target:priority.levelGoal.target}:null,
// [VI dòng gốc 60] Thuộc tính job: gọi str(daily?.job) | Thuộc tính step: gọi str(daily?.step) | Thuộc tính running: đọc daily?.running nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính owner: gọi str(scene?.owner)
      job:str(daily?.job),step:str(daily?.step),running:daily?.running,owner:str(scene?.owner),tag:str(scene?.tag),
// [VI dòng gốc 61] Thuộc tính auto: đọc W._Ba?._Co?._Mo?.ins?.auto nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính current: đọc W._Ba?._Co?._Mo?.ins?.curLv nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      auto:W._Ba?._Co?._Mo?.ins?.auto,current:W._Ba?._Co?._Mo?.ins?.curLv,
// [VI dòng gốc 62] Thuộc tính pending: gọi (parallel?.pending??[]).slice(0,16).map(p=>({id:str(p.id),reason:str(p.reason),at:p.at})) để biến đổi từng phần tử | Thuộc tính id: gọi str(p.id) | Thuộc tính reason: gọi str(p.reason) | Thuộc tính at: đọc p.at
      pending:(parallel?.pending??[]).slice(0,16).map(p=>({id:str(p.id),reason:str(p.reason),at:p.at})),parallelReason:str(parallel?.reason),parallelError:str(parallel?.lastError)};
// [VI dòng gốc 63] Khai báo biến không gán lại bằng const: upgradeReports = tạo đối tượng gồm | Duyệt từng giá trị trong [['redNavigator',W.KVPV_RED_NAVIGATOR],['appearance',W.KVPV_APPEARANCE_AUTO],['soulStone',W.KVPV_SOUL_STONE_FAST],['seasonRewards',W.KVPV_SEASON_REWARDS]] bằng const [key,api]. | Khai báo biến không gán lại bằng const: [key,api] (chưa gán giá trị)
    const upgradeReports={};for(const [key,api]of [['redNavigator',W.KVPV_RED_NAVIGATOR],['appearance',W.KVPV_APPEARANCE_AUTO],['soulStone',W.KVPV_SOUL_STONE_FAST],['seasonRewards',W.KVPV_SEASON_REWARDS]]){
// [VI dòng gốc 64] Khai báo biến không gán lại bằng const: r = gọi api?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra r: đúng thì chạy nhánh sau if. | gán upgradeReports[key] bằng {reason:str(r.reason),requests:r.requests,confirmed:r.confirmed,pending:!!r.pending,error:str(r.error??r.lastError), groups:r.groups?.slice(0,20).map(g=>({key:str(g.key),ready:g.re…
      const r=api?.status?.();if(r)upgradeReports[key]={reason:str(r.reason),requests:r.requests,confirmed:r.confirmed,pending:!!r.pending,error:str(r.error??r.lastError),
// [VI dòng gốc 65] Thuộc tính groups: gọi r.groups?.slice(0,20).map(g=>({key:str(g.key),ready:g.ready,level:g.level,have:g.have,need:g.need})) để biến đổi từng phần tử (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính key: gọi str(g.key) | Thuộc tính ready: đọc g.ready | Thuộc tính level: đọc g.level
        groups:r.groups?.slice(0,20).map(g=>({key:str(g.key),ready:g.ready,level:g.level,have:g.have,need:g.need}))};
// [VI dòng gốc 66] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 67] Khai báo biến không gán lại bằng const: eye = gọi W.KVPV_WORLD_EYE?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const eye=W.KVPV_WORLD_EYE?.status?.();
// [VI dòng gốc 68] Khai báo biến không gán lại bằng const: worldEye = nếu eye thì lấy {enabled:eye.enabled,map:eye.map,scans:eye.scans,changes:eye.changes,errors:eye.errors,actions:eye.actions?.slice(0,40)}, ngược lại lấy null
    const worldEye=eye?{enabled:eye.enabled,map:eye.map,scans:eye.scans,changes:eye.changes,errors:eye.errors,actions:eye.actions?.slice(0,40)}:null;
// [VI dòng gốc 69] Khai báo biến không gán lại bằng const: trial = gọi W.KVPV_DAILY_TRIAL?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const trial=W.KVPV_DAILY_TRIAL?.status?.();
// [VI dòng gốc 70] Khai báo biến không gán lại bằng const: dailyTrial = nếu trial thì lấy {entries:trial.entries,returns:trial.returns,dungeons:trial.dungeons?.map(d=>({id:d.id,level:d.level,remaining:d.remaining,known:d.known,unlocked:d.unlocked,taskAllowed:d.taskAllow…, ngược lại lấy null
    const dailyTrial=trial?{entries:trial.entries,returns:trial.returns,dungeons:trial.dungeons?.map(d=>({id:d.id,level:d.level,remaining:d.remaining,known:d.known,unlocked:d.unlocked,taskAllowed:d.taskAllowed})),phase:trial.phase,reason:trial.reason,map:trial.pending?.id,cheer:trial.pending?.cheer,knbInspireAllowed:trial.knbInspireAllowed,lastError:trial.lastError}:null;
// [VI dòng gốc 71] Khai báo biến không gán lại bằng const: party = đọc W._Ba?._cm?._q3t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const party=W._Ba?._cm?._q3t?.ins;
// [VI dòng gốc 72] Khai báo biến không gán lại bằng const: nativeRoom = nếu party thì lấy {id:party.roomId,map:party.roomMapId,tier:party.mapLve??party.roomMapLv,leader:party.isLeader, types:[1,2,6].filter(t=>party.getHasTeamByType?.(t)===true),members:(party.getTeamAll…, ngược lại lấy null
    const nativeRoom=party?{id:party.roomId,map:party.roomMapId,tier:party.mapLve??party.roomMapLv,leader:party.isLeader,
// [VI dòng gốc 73] Thuộc tính types: gọi [1,2,6].filter(t=>party.getHasTeamByType?.(t)===true) để giữ phần tử thỏa điều kiện | Thuộc tính members: gọi (party.getTeamAllMembers?.()??[]).slice(0,8).map(r=>r.slice(0,5)) để biến đổi từng phần tử
      types:[1,2,6].filter(t=>party.getHasTeamByType?.(t)===true),members:(party.getTeamAllMembers?.()??[]).slice(0,8).map(r=>r.slice(0,5))}:null;
// [VI dòng gốc 74] Khai báo biến không gán lại bằng const: tg = đọc W._ft?._h$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); tgRows = nếu Array.isArray(tg?._QW) thì lấy tg._QW.filter(r=>Number(r?.[0])===Number(tg._Ait)), ngược lại lấy []; tgMax = nếu tgRows.length thì lấy Math.max(...tgRows.map(r=>Number(r[1])).filter(Number.isFinite)), ngược lại lấy null
    const tg=W._ft?._h$?.ins,tgRows=Array.isArray(tg?._QW)?tg._QW.filter(r=>Number(r?.[0])===Number(tg._Ait)):[],tgMax=tgRows.length?Math.max(...tgRows.map(r=>Number(r[1])).filter(Number.isFinite)):null;
// [VI dòng gốc 75] Khai báo biến không gán lại bằng const: tianguanConfig = tạo đối tượng gồm source, activeMap, rangeRows, maxConfiguredFloor, lastRanges, probes
    const tianguanConfig={source:'scene_copy_tianguan',activeMap:tg?._Ait??null,rangeRows:tgRows.length,maxConfiguredFloor:tgMax,lastRanges:tgRows.slice(-4).map(r=>({map:r[0],through:r[1],requiredKills:r[2],bossFormula:String(r[5]??'').slice(0,200)})),probes:[14000,15000,20000,...(Number.isFinite(tgMax)?[tgMax,tgMax+1]:[])].map(level=>({level,exists:!!tg?.getCfgByLv?.(level)}))};
// [VI dòng gốc 76] Khai báo biến không gán lại bằng const: cobaoConfig = chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
    const cobaoConfig=(()=>{
// [VI dòng gốc 77] Khai báo biến không gán lại bằng const: all = W._ft?._WNn?.ins?.arr hoặc dùng vế phải khi vế trái là null/undefined: []; base = tạo đối tượng gồm ; bonuses = tạo đối tượng gồm ; complete = tạo mảng gồm 0 vị trí: []; partial = tạo mảng gồm 0 vị trí: [] | Khai báo biến có thể gán lại bằng let: fragments = 0
      const all=W._ft?._WNn?.ins?.arr??[],base={},bonuses={},complete=[],partial=[];let fragments=0;
// [VI dòng gốc 78] Duyệt từng giá trị trong all bằng const r. | Khai báo biến không gán lại bằng const: r (chưa gán giá trị) | Khai báo biến không gán lại bằng const: stages = r[7] hoặc dùng vế phải khi vế trái là null/undefined: [] | Khai báo biến có thể gán lại bằng let: n = 0
      for(const r of all){const stages=r[7]??[];let n=0;
// [VI dòng gốc 79] Lặp for: khởi tạo let i=0; tiếp tục khi i<stages.length; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | Kiểm tra Number(stages[i])<=14000: đúng thì chạy nhánh sau if. | tăng n một đơn vị sau khi lấy giá trị
        for(let i=0;i<stages.length;i++)if(Number(stages[i])<=14000){n++;fragments++;const pairs=r[4]?.[i]??[];
// [VI dòng gốc 80] Lặp for: khởi tạo let j=0; tiếp tục khi j<pairs.length; sau mỗi vòng j+=2. | Khai báo biến có thể gán lại bằng let: j = 0 | gán base[pairs[j]] bằng (base[pairs[j]]??0)+Number(pairs[j+1])
          for(let j=0;j<pairs.length;j+=2)base[pairs[j]]=(base[pairs[j]]??0)+Number(pairs[j+1]);}
// [VI dòng gốc 81] Khai báo biến không gán lại bằng const: description = W._ft?._nY?.ins?.des?.(W._ft?._nY?.ins?.getCfgById?.(r[3]),r[3]) hoặc dùng vế phải khi vế trái là null/undefined: ''
        const description=W._ft?._nY?.ins?.des?.(W._ft?._nY?.ins?.getCfgById?.(r[3]),r[3])??'';
// [VI dòng gốc 82] Kiểm tra n===stages.length&&n: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi complete.push({name:r[1],lastStage:Math.max(...stages),description}) để thêm phần tử vào cuối mảng
        if(n===stages.length&&n){complete.push({name:r[1],lastStage:Math.max(...stages),description});
// [VI dòng gốc 83] Khai báo biến không gán lại bằng const: m = gọi description.match(/^(.*?) tăng ([0-9.]+)$/) | Kiểm tra m: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán bonuses[m[1]] bằng (bonuses[m[1]]??0)+Number(m[2]) | gọi partial.push({unparsed:description}) để thêm phần tử vào cuối mảng
          const m=description.match(/^(.*?) tăng ([0-9.]+)$/);if(m)bonuses[m[1]]=(bonuses[m[1]]??0)+Number(m[2]);else partial.push({unparsed:description});
// [VI dòng gốc 84] Kiểm tra n: đúng thì chạy nhánh sau if. | gọi partial.push({name:r[1],unlocked:n,total:stages.length,stages}) để thêm phần tử vào cuối mảng
        }else if(n)partial.push({name:r[1],unlocked:n,total:stages.length,stages});
// [VI dòng gốc 85] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 86] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm target, totalRows, fragments, completed, base, bonuses, partial, lastComplete, sample.
      return {target:14000,totalRows:all.length,fragments,completed:complete.length,base,bonuses,partial,lastComplete:complete.slice(-3),sample:all.filter(r=>String(r[1]).includes('Dao Trì')).map(r=>({row:r,description:W._ft?._nY?.ins?.des?.(W._ft?._nY?.ins?.getCfgById?.(r[3]),r[3])}))};
// [VI dòng gốc 87] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
    })();
// [VI dòng gốc 88] gán cached bằng {desktopControl:W.KVPV_DESKTOP_CONTROL?.status?.()??null,kiemKhieu:W.KVPV_KIEM_KHIEU?.status?.()??null,cobaoConfig,tianguanConfig,transformSkills:W.KVPV_TRANSFORM10?.status?.()??nu…
    cached={tienTon:W.KVPV_TIEN_TON_AUTO?.status?.()??null,desktopControl:W.KVPV_DESKTOP_CONTROL?.status?.()??null,kiemKhieu:W.KVPV_KIEM_KHIEU?.status?.()??null,cobaoConfig,tianguanConfig,transformSkills:W.KVPV_TRANSFORM10?.status?.()??null,fourWorship:W.KVPV_FOUR_WORSHIP?.status?.()??null,marryRewards:W.KVPV_MARRY_REWARDS?.status?.()??null,festivalFree:W.KVPV_FESTIVAL_FREE?.status?.()??null,loginStreak:W.KVPV_LOGIN_STREAK?.status?.()??null,petTravel:W.KVPV_PET_TRAVEL?.status?.()??null,marryArena:W.KVPV_MARRY_ARENA?.status?.()??null,eightChest:W.KVPV_EIGHT_CHEST?.status?.()??null,peakCompletion:W.KVPV_PEAK_COMPLETION?.status?.()??null,stageResume:W.__KVPV_STAGE_RESUME_20261024_USER??null,stageRequested:W.KVPV_DAILY?.config?.enableTuVuot===true,peakChest:W.KVPV_PEAK_CHEST?.status?.()??null,quizAuto:W.KVPV_QUIZ_AUTO?.status?.()??null,roadCadence:W.KVPV_ROAD_CADENCE?.status?.()??null,nativeRoom,hongHoang,idleDaily:W.KVPV_IDLE_DAILY?.status?.()??null,freeDailyBag:W.KVPV_FREE_DAILY_BAG?.status?.()??null,freeTreasure:W.KVPV_FREE_TREASURE?.status?.()??null,crystalCapture:W.KVPV_CRYSTAL_CAPTURE?.status?.()??null,itemTrace:W.KVPV_ITEM_TRACE?.status?.()??null,manualEntry:W.KVPV_MANUAL_ENTRY?.status?.()??null,demonKingRecovery:W.KVPV_DEMON_KING_RECOVERY?.status?.()??null,bossRoutine,companionCombat:W.KVPV_COMPANION_COMBAT?.status?.()??null,adventure:W.KVPV_ADVENTURE?.status?.()??null,activityDay:W.KVPV_DAILY_CLOCK?.status?.()??null,guildBoss:W.KVPV_GUILD_BOSS?.status?.()??null,dailyTrial,bossTeam:W.KVPV_BOSS_TEAM?.status?.()??null,teamCoordinator:W.KVPV_TEAM_COORDINATOR?.status?.()??null,contextPlan:W.KVPV_CONTEXT_BRAIN?.plan?.()??null,worldEye,schema:1,actor,build:str(W.__KVPV_LIVE_BUILD||W.KVPV_V1?.build?.id),at:Date.now(),main,combat,stage,upgradeReports,redDots:(parallel?.redDots??[]).slice(0,128),
// [VI dòng gốc 89] Thuộc tính reborn: tạo đối tượng gồm reason, eraLevel, selected, tasks | Thuộc tính reason: gọi str(era?.reason) | Thuộc tính eraLevel: era?.eraLevel hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính selected: era?.selected?.id hoặc dùng vế phải khi vế trái là null/undefined: null
      reborn:{reason:str(era?.reason),eraLevel:era?.eraLevel??null,selected:era?.selected?.id??null,tasks},tienVi:tv,missing:missing.slice(0,80),windows,
// [VI dòng gốc 90] Thuộc tính executors: tạo đối tượng gồm cobao, arena, materials | Thuộc tính cobao: nếu exec thì lấy {reason:str(exec.cobao?.reason),pending:exec.cobao?.pending?.step??null,confirmed:exec.cobao?.confirmed}, ngược lại lấy null | Thuộc tính reason: gọi str(exec.cobao?.reason) | Thuộc tính pending: exec.cobao?.pending?.step hoặc dùng vế phải khi vế trái là null/undefined: null
      executors:{cobao:exec?{reason:str(exec.cobao?.reason),pending:exec.cobao?.pending?.step??null,confirmed:exec.cobao?.confirmed}:null,
// [VI dòng gốc 91] Thuộc tính arena: nếu exec thì lấy {reason:str(exec.arena?.reason),pending:!!exec.arena?.pending,confirmed:exec.arena?.confirmed,freeAttempts:exec.arena?.plan?.attempts??null}, ngược lại lấy null | Thuộc tính reason: gọi str(exec.arena?.reason) | Thuộc tính pending: đảo giá trị đúng/sai của !exec.arena?.pending | Thuộc tính confirmed: đọc exec.arena?.confirmed nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
        arena:exec?{reason:str(exec.arena?.reason),pending:!!exec.arena?.pending,confirmed:exec.arena?.confirmed,freeAttempts:exec.arena?.plan?.attempts??null}:null,
// [VI dòng gốc 92] Thuộc tính materials: tạo đối tượng gồm reason, missing | Thuộc tính reason: gọi str(planner?.reason) | Thuộc tính missing: planner?.plan?.upgrades?.filter(x=>x.missing>0).slice(0,8).map(x=>({id:x.id,fragment:x.fragment,missing:x.missing})) hoặc dùng vế phải khi vế trái là null/undefined: [] | Thuộc tính id: đọc x.id
        materials:{reason:str(planner?.reason),missing:planner?.plan?.upgrades?.filter(x=>x.missing>0).slice(0,8).map(x=>({id:x.id,fragment:x.fragment,missing:x.missing}))??[]}},
// [VI dòng gốc 93] Thuộc tính modulePresence: gọi (typeof __KVPV_V1_BUILD==='undefined'?[]:__KVPV_V1_BUILD.modules??[]).slice(0,160).map(m=>({file:m.file,present:m.apis.filter(name=>W[name]!=null)})) để biến đổi từng phần tử | Thuộc tính file: đọc m.file | Thuộc tính present: gọi m.apis.filter(name=>W[name]!=null) để giữ phần tử thỏa điều kiện
      modulePresence:(typeof __KVPV_V1_BUILD==='undefined'?[]:__KVPV_V1_BUILD.modules??[]).slice(0,160).map(m=>({file:m.file,present:m.apis.filter(name=>W[name]!=null)})),
// [VI dòng gốc 94] Thuộc tính bagOpenSession: W.KVPV_BAG_OPEN_SESSION?.status?.() hoặc dùng vế phải khi vế trái là null/undefined: null
      bagOpenSession:W.KVPV_BAG_OPEN_SESSION?.status?.()??null,
// [VI dòng gốc 95] Thuộc tính bagInspection: nếu actor==='10158939833447' thì lấy (()=>{ try { const bag=W._Ba?._Ic?._aQ?.ins,items=bag?.getItemsByBagType?.(0); return {at:Date.now(),ready:bag?.isBagInited===true,used:items?.length??null, free:bag?.getBagLeftNum…, ngược lại lấy null
      bagInspection:actor==='10158939833447'?(()=>{
// [VI dòng gốc 96] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
        try {
// [VI dòng gốc 97] Khai báo biến không gán lại bằng const: bag = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); items = gọi bag?.getItemsByBagType(0) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
          const bag=W._Ba?._Ic?._aQ?.ins,items=bag?.getItemsByBagType?.(0);
// [VI dòng gốc 98] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm at, ready, used, free, items.
          return {at:Date.now(),ready:bag?.isBagInited===true,used:items?.length??null,
// [VI dòng gốc 99] Thuộc tính free: bag?.getBagLeftNumById?.(0) hoặc dùng vế phải khi vế trái là null/undefined: null
            free:bag?.getBagLeftNumById?.(0)??null,
// [VI dòng gốc 100] Thuộc tính items: gọi (items??[]).slice(0,240).map(item=>{ const cfg=W._ft?._mY?.ins?.getItemCfgById?.(item[0]); return {id:item[0],count:item[1],uid:String(item[2]),name:…) để biến đổi từng phần tử
            items:(items??[]).slice(0,240).map(item=>{
// [VI dòng gốc 101] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._mY?.ins?.getItemCfgById(item[0]) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
              const cfg=W._ft?._mY?.ins?.getItemCfgById?.(item[0]);
// [VI dòng gốc 102] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, count, uid, name.
              return {id:item[0],count:item[1],uid:String(item[2]),name:str(cfg?.[1])};
// [VI dòng gốc 103] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
            })};
// [VI dòng gốc 104] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm error.
        }catch(e){return {error:str(e.message)};}
// [VI dòng gốc 105] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })():null,
      })():null,
// [VI dòng gốc 106] gán at bằng Date.now() | Kết thúc hàm hiện tại và trả về: cached.
      hamsterAward:(()=>{try{
        const ns=W._Ba?.__1?.hamster_award,m=ns?._Z1?.instance,map=ns?.FitActIdToDatas??{};
        const active=Object.keys(map).map(Number).filter(id=>W._Ba?._IY?._BY?.ins?.getActIsOpen?.(id)===true).slice(0,16);
        const act=Number(m?.curActId),self=m?.getSelAwardInfo?.(act)??[],all=m?.getAllAwardInfo?.(act)??[];
        const probeKey='__KVPV_HAMSTER_AWARD_READ_DIAG',probe=W[probeKey]??(W[probeKey]={actor,at:null,reply:null});
        const socket=W._v?.ins??W._y?.Socket?.ins;
        // Hoàn tất phép đo: chỉ giữ dữ liệu; không hỏi lại server trong báo cáo định kỳ.
        if(probe.transport?.finished&&Object.hasOwn(m??{},'initAllAwardInfo')&&typeof Object.getPrototypeOf(m)?.initAllAwardInfo==='function'&&String(m.initAllAwardInfo).includes('probe.reply='))delete m.initAllAwardInfo;
        const protocol=W._ngr??(typeof _ngr==='object'?_ngr:null);
        const schemas={};for(const code of ['TXHy','TBkK','TqgA','TusK','T0Jj']){const type=protocol?.get_pbtype?.(code);schemas[code]={exists:!!type,fields:Array.isArray(type?.fieldsArray)?type.fieldsArray.map(f=>({name:f.name,id:f.id,type:f.type,rule:f.rule})).slice(0,8):[]};}
        const eventModel=W._Ba?._IY?._BY?.ins,parent=Number(map[act]?.[2]);
        const eventTiming=[act,parent,act-100,parent-100].filter(id=>id>0).map(id=>({id,open:eventModel?.getActIsOpen?.(id),openByTime:eventModel?.getActIsOpenByEndTime?.(id),calOpen:eventModel?.getActIsOpenByCalTime?.(id),raw:Array.isArray(eventModel?._NYi?.[id])?eventModel._NYi[id].slice(0,7):null,round:eventModel?.getActRound?.(id),serverDay:eventModel?.getActSerDay?.(id)}));
        const configRows=W._ft?.FestHamsterAllAward?.ins?.originCfg??[];
        const configGroups={};for(const row of configRows){const group=String(Math.floor(Number(row?.[0])/100000));configGroups[group]=(configGroups[group]??0)+1;}
        const cfg=(api,list)=>({count:api?.originCfg?.length??null,missing:list.filter(r=>!api?.getCfgById?.(Number(r?.[0]))).map(r=>Number(r?.[0])).slice(0,20)});
        return {act,active,serverTime:Number(W._Sa?.svrTime),eventTiming,parentMapping:W._Ba?.__1?.hamster?.FitActIdToDatas?.[parent]??null,schemas,configGroups,configSample:configRows.filter(r=>Math.floor(Number(r?.[0])/100000)===Math.floor(Number(self[0]?.[0])/100000)).slice(0,3),queryAt:probe.at,allReply:probe.reply,queueTrace:probe.queueTrace??null,transport:probe.transport??null,socketAvailable:!!socket,handlers:{self:typeof socket?._P?.TBkK==='function',all:typeof socket?._P?.TusK==='function'},allEventKeys:Object.keys(m?._zZh??{}).slice(0,20),mapping:map[act]??null,self:self.slice(0,25),all:all.slice(0,25),selfCfg:cfg(W._ft?.FestHamsterSelfAward?.ins,self),allCfg:cfg(W._ft?.FestHamsterAllAward?.ins,all)};
      }catch(e){return {error:str(e.message)};}})(),
      dailyPbBoss:W.KVPV_PB_BOSS_DAILY?.status?.()??null,allowKNB:false};at=Date.now();return cached;
// [VI dòng gốc 107] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 108] gán W.KVPV_EXECUTOR_REPORT bằng Object.freeze({snapshot})
  W.KVPV_EXECUTOR_REPORT=Object.freeze({snapshot});
// [VI dòng gốc 109] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 110] Dòng trống để tách các phần, không có lệnh thực thi.
