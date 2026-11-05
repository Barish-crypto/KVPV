(() => {
  'use strict';
  const w=window;
  w.KVPV_FRAME_CLICK?.stop?.();
  w.KVPV_FRAME_CLICK=Object.freeze({stop(){},status:()=>({running:false,clicks:0,target:'extension_browser_input',note:'Click JavaScript đã tắt. Bật click cấp trình duyệt bằng popup extension KVPV.'})});
})();
