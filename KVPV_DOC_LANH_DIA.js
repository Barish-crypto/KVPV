(() => {
  'use strict';
  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||W._Ba?._rJ?._O$?.ins?.actorId||'');
  if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId||''))throw Error('Chạy trong đúng game-frame đã đăng nhập.');
  const ns=W._Ba?._zLt,m=ns?._VLt?.ins;
  const copyValue=(v,depth=0)=>{
    if(v===null||['string','number','boolean'].includes(typeof v))return typeof v==='string'?v.slice(0,2000):v;
    if(depth>=3)return '[depth limit]';
    if(Array.isArray(v))return v.slice(0,80).map(x=>copyValue(x,depth+1));
    if(v&&typeof v==='object'){const out={};for(const [k,d]of Object.entries(Object.getOwnPropertyDescriptors(v)).slice(0,60))if('value'in d&&typeof d.value!=='function')out[k]=copyValue(d.value,depth+1);return out;}
    return null;
  };
  function inspect(object){if(!object)return null;const methods={},values={};let p=object;
    for(let depth=0;p&&depth<4;depth++,p=Object.getPrototypeOf(p)){
      for(const [name,d]of Object.entries(Object.getOwnPropertyDescriptors(p))){if(name==='constructor')continue;
        if(typeof d.value==='function'&&!Object.hasOwn(methods,name))methods[name]=String(d.value).slice(0,16000);
        else if(depth===0&&'value'in d)values[name]=copyValue(d.value);
      }
    }return {methods,values};
  }
  const read=fn=>{try{return copyValue(fn());}catch(e){return {error:String(e.message||e)};}};
  const ids=read(()=>m?.getBsList?.());
  const report={version:1,actor,at:Date.now(),map:Number(W._C?._Mn?._Cn?.currentID)||null,
    sceneType:read(()=>W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7]),daily:read(()=>W.KVPV_DAILY?.quickState?.()),
    modelPresent:!!m,bossIds:ids,selectedOrFinal:read(()=>m?.getShowBsOcc?.()),
    bosses:Array.isArray(ids)?ids.slice(0,40).map(id=>({id,info:read(()=>m?.getBsInfoById?.(id))})):[],
    model:inspect(m),namespaceMembers:ns?Object.keys(ns):[],
    note:'Chỉ đọc model và mã hàm native. Không nhận thưởng, đổi mục tiêu, vào/thoát map hoặc gửi lệnh chiến đấu.'};
  W.KVPV_LANH_DIA_READ=Object.freeze({report:()=>JSON.parse(JSON.stringify(report)),export:()=>JSON.stringify(report,null,2)});
  W.console.info('[Lãnh Địa] Đã đọc dữ liệu. Sao chép: copy(KVPV_LANH_DIA_READ.export())');
})();
