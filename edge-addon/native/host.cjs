'use strict';

const fs=require('node:fs'),path=require('node:path'),{execFile}=require('node:child_process');

const {readPartyPeers}=require('../../live/party-relay.cjs');

function readDesktopControls(root){const file=require.resolve('../../live/desktop-controls.cjs');delete require.cache[file];return require(file).readDesktopControls(root);}

const {saveDiagnostics,touchDiagnostics}=require('../../live/diagnostics.cjs');

const {packet,payloadPackets,Parser}=require('./protocol.cjs');

const {readExtensionArtifact,extensionId,watchSources}=require('../../live/project.cjs');
const {profileRuntime,modulesForProfile}=require('../../live/runtime-bundles.cjs');
const {update:gitAutoUpdate}=require('../../live/git-autoupdate.cjs');

const root=path.resolve(__dirname,'../..'),manifest=JSON.parse(fs.readFileSync(path.join(root,'edge-addon','manifest.json'),'utf8'));

const id=extensionId(manifest.key);
// Pull only fast-forward commits that pass an isolated build and artifact validation.
// The existing source watcher then safely verifies and hot-loads the ESM bundle.
let updateTimer=null;
function checkGit(){void gitAutoUpdate().then(r=>{if(r.status==='updated')state('GitHub: updated '+r.head+'; validating ESM');else if(r.status==='kept_current')state('GitHub update skipped; current ESM retained: '+r.error);}).catch(e=>console.error('Git auto update: '+e.message));}

if(process.argv[2]!=='chrome-extension://'+id+'/')process.exit(2);

let active=false,building=false,queued=false,debounce=null,current=null,watchers=[],relayTimer=null,profileSignature=null;

const send=m=>process.stdout.write(packet(m)),state=text=>send({type:'state',text});

function profileKey(profiles){return JSON.stringify(profiles.map(profile=>[profile.actor,profile.revision,profile.modules]));}
function emitBundle(bundle,actor=null){for(const m of payloadPackets({...bundle,actor}))send(m);}
function emitFull(profiles=readDesktopControls(root)){if(!current)return;profileSignature=profileKey(profiles);send({type:'profilesBegin'});send({type:'desktopControls',profiles});emitBundle(current);for(const profile of profiles)emitBundle(profileRuntime(root,current,modulesForProfile(profile)),String(profile.actor));send({type:'profilesReady'});}
function emitProfiles(profiles){profileSignature=profileKey(profiles);send({type:'profilesBegin'});send({type:'desktopControls',profiles});if(current)for(const profile of profiles)emitBundle(profileRuntime(root,current,modulesForProfile(profile)),String(profile.actor));send({type:'profilesReady'});}

function build(){if(!active)return;if(building){queued=true;return;}building=true;state('Đang build bản đồng bộ…');

 execFile(process.execPath,[path.join(root,'live/verify.cjs')],{cwd:root,windowsHide:true,maxBuffer:1024*1024},(error,stdout,stderr)=>{

  building=false;if(error){current=null;state('Build lỗi, giữ bản đang chạy. '+String(stderr||stdout||error.message).slice(-600));}

  else try{current=readExtensionArtifact(root);if(!queued&&!debounce){state((stdout.includes('CACHED ')?'Dùng bản đã xác thực · ':'Đã build · ')+current.build);emitFull();}}catch(e){current=null;state(e.message);}

  if(queued){queued=false;build();}

 });}

function changed(){clearTimeout(debounce);debounce=setTimeout(()=>{debounce=null;build();},150);}

function start(){if(active){if(current&&!building)emitFull();return;}active=true;

 watchers=watchSources(root,changed);updateTimer=setInterval(checkGit,300000);setTimeout(checkGit,15000);relayTimer=setInterval(()=>{try{send({type:'partyPeers',peers:readPartyPeers(root)});const profiles=readDesktopControls(root);if(profileKey(profiles)!==profileSignature)emitProfiles(profiles);else send({type:'desktopControls',profiles});}catch(_){}},1000);build();}

const parser=new Parser(message=>{if(message.type==='diagnostics'&&active){try{saveDiagnostics(root,message.report);}catch(e){console.error('Diagnostics: '+e.message);}}else if(message.type==='heartbeat'&&active){try{touchDiagnostics(root,message.actor);}catch(e){console.error('Diagnostics heartbeat: '+e.message);}}else if(message.type==='watch')start();else if(message.type==='sync'&&active){if(current&&!building)emitFull();else if(!building)build();}});

process.stdin.on('data',bytes=>{try{parser.push(bytes);}catch(e){console.error(e.message);process.exit(2);}});

process.stdin.on('end',()=>{active=false;clearInterval(relayTimer);clearTimeout(debounce);for(const w of watchers)w.close();process.exit(0);});
