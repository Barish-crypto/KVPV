




(() => {

  'use strict';

  const build=/* BUILD_ID */,revision=2,channel='kvpv-android-loader-v2';

  function gameURL(value){try{const u=new URL(value);return /^https?:$/.test(u.protocol)&&

    u.hostname==='play.choingay.vn'&&/^\/1046(?:\/|$)/.test(u.pathname);}catch(_){return false;}}

  function inGameScope(){

    if(gameURL(location.href)||gameURL(document.referrer))return true;

    try{const u=new URL(document.referrer);if(window.parent!==window&&/^https?:$/.test(u.protocol)&&

      u.hostname==='play.choingay.vn'&&u.pathname==='/')return true;}catch(_){}

    let frame=window;

    for(let n=0;n<12;n++){

      try{if(gameURL(frame.location.href))return true;if(frame.parent===frame)break;frame=frame.parent;}catch(_){break;}

    }

    return false;

  }

  const prior=window.__KVPV_ANDROID_LOADER;

  if(prior?.build===build&&prior.revision===revision&&['waiting_scope','waiting','loaded','failed','blocked'].includes(prior.state))return;

  prior?.cancel?.();

  let scoped=inGameScope(),timer=null,attempted=false,started=Date.now(),badge=null,expanded=false;

  const children=new Map();

  const status={build,revision,state:scoped?'waiting':'waiting_scope',reason:'waiting_game',error:'',cancel(){

    if(timer!==null)window.clearInterval(timer);timer=null;

  }};

  window.__KVPV_ANDROID_LOADER=status;

  const send=(target,type,detail)=>{try{target?.postMessage?.({channel,build,type,...detail},'*');}catch(_){}};

  function directChild(source){try{for(let i=0;i<window.frames.length;i++)if(window.frames[i]===source)return true;}catch(_){}return false;}

  function grantChildren(){if(!scoped)return;try{for(let i=0;i<window.frames.length;i++)send(window.frames[i],'scope');}catch(_){}}

  function summary(){

    const list=[status,...children.values()];

    return list.find(s=>s.state==='loaded')||list.find(s=>s.state==='failed')||status;

  }

  function publish(){if(!scoped)return;

    const s=summary();

    if(window.parent!==window)send(window.parent,'status',{state:s.state,reason:s.reason,error:s.error});

    if(!gameURL(location.href)||typeof document.createElement!=='function')return;

    if(!badge){badge=document.createElement('button');badge.type='button';

      badge.style.cssText='position:fixed;top:6px;left:6px;z-index:2147483647;background:#172638;color:white;border:1px solid #66d9a6;border-radius:6px;padding:7px;font:12px sans-serif;max-width:90vw;white-space:pre-wrap;text-align:left;';

      badge.onclick=()=>{expanded=!expanded;publish();};(document.body||document.documentElement)?.appendChild(badge);}

    const labels={loaded:'Đã chạy',failed:'Lỗi nạp',timeout:'Hết thời gian chờ',waiting:'Chờ game/frame',waiting_scope:'Chờ frame'};

    badge.textContent='KVPV: '+(labels[s.state]||s.state)+(expanded?'\n'+build+' / loader 1.0.1\n'+s.reason+(s.error?'\n'+s.error:''):' · bấm xem');

  }

  window.addEventListener?.('message',event=>{

    const data=event.data;if(!data||data.channel!==channel||data.build!==build)return;

    if(data.type==='scope'&&event.source===window.parent&&window.parent!==window){

      if(!scoped){scoped=true;status.state='waiting';begin();}grantChildren();

    }else if(scoped&&directChild(event.source)){

      if(data.type==='request')send(event.source,'scope');

      else if(data.type==='status'&&['waiting','loaded','failed','timeout','blocked'].includes(data.state)){

        children.set(event.source,{state:data.state,reason:String(data.reason||'').slice(0,100),error:String(data.error||'').slice(0,300)});publish();

      }

    }

  });

  function check(){

    grantChildren();

    if(attempted)return;

    if(Date.now()-started>600000){status.state='timeout';status.reason='game_not_ready';status.cancel();publish();return;}

    try{

      const ready=/* READINESS */;

      if(!ready.ready){status.reason=ready.reason||'waiting_game';publish();return;}

      if(window.__KVPV_LIVE_BUILD===build){status.state='loaded';status.reason='already_loaded';status.cancel();publish();return;}

      attempted=true;status.cancel();installFull();

      if(!window.KVPV_V1)throw Error('FULL did not install');

      window.__KVPV_LIVE_BUILD=build;status.state='loaded';status.reason='ready';publish();

      console.info('[KVPV Android] FULL ready',build);

    }catch(e){attempted=true;status.cancel();status.state='failed';status.error=String(e);publish();console.error('[KVPV Android]',e);}

  }

  function begin(){started=Date.now();timer=window.setInterval(check,500);check();}

  if(scoped)begin();else if(window.parent!==window)send(window.parent,'request');

  function installFull(){

/* FULL_BUNDLE */

  }

})();

