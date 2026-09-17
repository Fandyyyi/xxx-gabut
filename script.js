
'use strict';
/* ═══════ VEYTRIX AI — Clean JS v3 ═══════ */

/* CONSTANTS */
var SK='pz9',DK='pz_dv4',BK='pz_blk',AK='pz_ads',UK='pz_usr3';
var MC=['#a78bfa','#34d399','#60a5fa','#fb923c','#f472b6','#facc15','#4ade80','#38bdf8'];

/* STATE */
var S={chats:[],activeId:null,username:'Kamu',dark:true,mem:true,mode:'fast',fallback:true,desktopMode:false,msgCount:{},limitResetAt:0};
var D={user:'pandzz',pass:'30',siteName:'Veyzen Ops',aiName:'Veyzen AI - Ops',version:'2.3.0',
  subtitle:'Asisten AI cerdas, canggih, dan menyenangkan.',aiInfo:'',
  profileUrl:null,profileType:null,
  adActive:false,adUrl:null,adType:null,adText:'',adLink:'',adW:'',adH:'',
  showIntro:true,introBanner:null,introBannerType:null,
  apis:[
    {id:'a1',name:'PANDZZ Claude',url:'https://bintangapi.full.diskon.cloud/api/aichat/Claude-ai/?text=',model:'claude',type:'normal',status:'u'},
    {id:'a2',name:'PANDZZ GPT',url:'https://bintangapi.full.diskon.cloud/api/aichat/gpt-3.5-turbo/?text=',model:'gpt',type:'normal',status:'u'},
    {id:'a3',name:'PANDZZ Gemini',url:'https://bintangapi.full.diskon.cloud/api/aichat/gemini/?text=',model:'gemini',type:'normal',status:'u'}
  ],
  activeApiId:'a1',notifications:[],premCodes:[],customLinks:[],
  music:[],antiJailbreak:false,tokenResetHours:3,
  modeLimits:{fast:75,think:71,deep:67,expert:48},
  configUrl:'',
  allowedDomains:[],
  /* Chain APIs per mode — tiap slot punya peran spesifik */
  chainThink:[
    {id:'ct1',name:'',url:'',role:'jawab',desc:'Pemberi jawaban utama'},
    {id:'ct2',name:'',url:'',role:'verifikasi',desc:'Verifikator akurasi'},
    {id:'ct3',name:'',url:'',role:'sintesis',desc:'Penyintesis jawaban final'}
  ],
  chainDeep:[
    {id:'cd1',name:'',url:'',role:'riset',desc:'Peneliti & pengumpul fakta'},
    {id:'cd2',name:'',url:'',role:'analisis',desc:'Analis mendalam'},
    {id:'cd3',name:'',url:'',role:'kritik',desc:'Pengkritik & pencari celah'},
    {id:'cd4',name:'',url:'',role:'sintesis',desc:'Penyintesis master'}
  ],
  chainExpert:[
    {id:'ce1',name:'',url:'',role:'dekomposisi',desc:'Pemecah masalah fundamental'},
    {id:'ce2',name:'',url:'',role:'coding',desc:'Ahli coding & teknologi'},
    {id:'ce3',name:'',url:'',role:'teori',desc:'Ahli teori & penelitian'},
    {id:'ce4',name:'',url:'',role:'logika',desc:'Validator logika & matematika'},
    {id:'ce5',name:'',url:'',role:'kritik',desc:'Reviewer kritis'},
    {id:'ce6',name:'',url:'',role:'optimasi',desc:'Optimizer solusi'},
    {id:'ce7',name:'',url:'',role:'sintesis',desc:'Master synthesizer final'}
  ],
  blackenApi:{url:'https://api-nanzz.my.id/docs/api/ai-image/to-ireng.php?url=',active:true},
  tiktokThemeApi:{url:'https://api-nanzz.my.id/docs/api/search/tiktok.php?q=',active:true,limit:3},
  randomApis:{
    waifu:{name:'Waifu Anime',emoji:'',urls:['https://api-nanzz.my.id/docs/api/random/waifu.php'],active:true,type:'waifu'},
    cecan:{name:'Cecan',emoji:'',urls:['https://api-nanzz.my.id/docs/api/random/cecan.php?country='],active:true,type:'cecan',hasCountry:true,
      countries:['Indonesia','Korea','Malaysia','Thailand','Japan','China','Vietnam','Philippines','Singapore','India']},
    pap:{name:'Pap',emoji:'',urls:[],active:false,type:'pap'},
    meme:{name:'Meme',emoji:'',urls:[],active:false,type:'meme'},
    memepres:{name:'Meme Presiden',emoji:'',urls:[],active:false,type:'memepres'},
    wallpaper:{name:'Wallpaper',emoji:'',urls:[],active:false,type:'wallpaper'}
  },
  searchApis:{
    tiktok:{name:'TikTok',url:'https://api-nanzz.my.id/docs/api/search/tiktok.php?q=',active:true,limit:3}
  },
  downloaderApis:[
    {id:'dl1',name:'TikTok',url:'https://api-nanzz.my.id/docs/api/downloader/tiktokv2.php?url=',platforms:['tiktok','vt.tiktok','vm.tiktok'],active:true},
    {id:'dl2',name:'Instagram',url:'',platforms:['instagram','instagr.am'],active:false},
    {id:'dl3',name:'YouTube',url:'',platforms:['youtube','youtu.be'],active:false},
    {id:'dl4',name:'Pinterest',url:'',platforms:['pinterest','pin.it'],active:false},
    {id:'dl5',name:'Facebook',url:'',platforms:['facebook','fb.watch'],active:false},
    {id:'dl6',name:'Custom',url:'',platforms:[],active:false}
  ],
  imageApis:[{id:'imgdef1',name:'Synox Image AI',url:'https://api.synoxcloud.xyz/ai-generate/text-2-image?ratio=1%3A1',key:'',model:'',version:'',role:'generate',status:'u'}],activeImageApiId:'imgdef1',activeImageGenId:'imgdef1',activeImageAnalyzeId:null,
  aiStyle:'original',aiInfoItems:[],premPrices:{monthly:'5k',yearly:'7k',forever:'13k'},
  csSlots:[]
};
var U={loggedIn:false,name:'',email:'',premium:false,loginType:'',memKey:''};
var mem=[],pending=null,busy=false,recog=null,recogOn=false;
var dvTap=0,dvTimer=null,dlAttempts=0,dlStep=1,dvCode='',bldrPending=null;
var nfIntv=null,tokenUsedCount=0,tokenResetTimer=null;
var musicAudio=null,musicIdx=0,selectedRating=0,ratingMediaData=null;
var introDone=false;

/* HELPERS */
function $(id){return document.getElementById(id);}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,5);}
function getDeviceFingerprint(){
  try{
    var fp='';
    fp+=navigator.userAgent.length+':';
    fp+=screen.width+'x'+screen.height+':';
    fp+=navigator.language+':';
    fp+=(navigator.hardwareConcurrency||0)+':';
    fp+=(navigator.deviceMemory||0)+':';
    fp+=new Date().getTimezoneOffset()+':';
    var cv=document.createElement('canvas');var ctx2=cv.getContext('2d');
    ctx2.textBaseline='top';ctx2.font='14px Arial';ctx2.fillText('fingerprint',2,2);
    fp+=cv.toDataURL().slice(-20);
    var hash=0;for(var i=0;i<fp.length;i++){hash=((hash<<5)-hash)+fp.charCodeAt(i);hash|=0;}
    return 'fp_'+Math.abs(hash).toString(36);
  }catch(e){return 'fp_default';}
}
var DEVICE_KEY=getDeviceFingerprint();
function saveToDevice(key,val){
  try{localStorage.setItem(key,val);}catch(e){}
  try{sessionStorage.setItem(key,val);}catch(e){}
  try{
    var cookie=key+'='+encodeURIComponent(val)+';max-age=31536000;path=/;SameSite=Lax';
    document.cookie=cookie;
  }catch(e){}
}
function loadFromDevice(key){
  var v=null;
  try{v=localStorage.getItem(key);}catch(e){}
  if(!v){try{v=sessionStorage.getItem(key);}catch(e){}}
  if(!v){
    try{var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var pair=ca[i].trim().split('=');if(pair[0]===key){v=decodeURIComponent(pair[1]);break;}}}catch(e){}
  }
  return v;
}
/* IN-APP IMAGE LIGHTBOX — tidak pernah navigasi keluar halaman (hindari bug WebView mobile yang stuck saat back) */
var _lbCurrentUrl=null;
function openLightbox(url){
  if(!url)return;
  _lbCurrentUrl=url;
  var lb=$('imgLightbox'),img=$('lbImg');
  if(!lb||!img)return;
  img.src=url;
  lb.style.display='flex';
  document.body.style.overflow='hidden';
}
function closeLightbox(){
  var lb=$('imgLightbox');
  if(lb)lb.style.display='none';
  document.body.style.overflow='';
  _lbCurrentUrl=null;
}
function downloadImage(btn,url,name){
  if(!url){toast('URL gambar tidak tersedia');return;}
  var fname=(name||('veyzen-img-'+Date.now()))+'.png';
  var origHTML=btn.innerHTML;
  btn.textContent='Mengunduh...';btn.disabled=true;

  /* GLOBAL SAFETY: never let button stay stuck — max 12s, force fallback */
  var settled=false;
  var safetyTimer=setTimeout(function(){
    if(settled)return;
    settled=true;
    fallbackOpen();
  },12000);

  function markDone(){settled=true;clearTimeout(safetyTimer);}

  function doBlob(blob){
    if(settled)return;
    markDone();
    var objUrl=URL.createObjectURL(blob);
    var ext=blob.type&&blob.type.indexOf('jpeg')>=0?'jpg':'png';
    var a=document.createElement('a');
    a.href=objUrl;a.download=fname.replace('.png','.'+ext);
    document.body.appendChild(a);a.click();
    setTimeout(function(){document.body.removeChild(a);URL.revokeObjectURL(objUrl);},3000);
    btn.innerHTML='\u2714 Tersimpan!';btn.style.background='#22c55e';btn.disabled=false;
    setTimeout(function(){btn.innerHTML=origHTML;btn.style.background='';},2500);
  }
  function fallbackOpen(){
    if(btn.disabled===false&&btn.innerHTML.indexOf('Tersimpan')>=0)return; /* already succeeded */
    markDone();
    window.open(url,'_blank');
    btn.textContent='Dibuka tab baru \u2014 tahan gambar';
    btn.style.fontSize='10.5px';btn.disabled=false;
    setTimeout(function(){btn.innerHTML=origHTML;btn.style.fontSize='';},3000);
  }

  /* Jalur 1: blob: URL */
  if(url.startsWith('blob:')){
    fetch(url).then(function(r){return r.blob();}).then(doBlob).catch(fallbackOpen);
    return;
  }
  /* Jalur 2: base64 data URL */
  if(url.startsWith('data:image')){
    try{
      var arr=url.split(',');var mime=(arr[0].match(/:(.*?);/)||['','image/png'])[1];
      var bstr=atob(arr[1]);var n=bstr.length;var u8=new Uint8Array(n);
      for(var i=0;i<n;i++)u8[i]=bstr.charCodeAt(i);
      doBlob(new Blob([u8],{type:mime}));
    }catch(e){fallbackOpen();}
    return;
  }
  /* Jalur 3: URL eksternal — fetch dengan timeout EXPLICIT (bug lama: tidak ada timeout sama sekali) */
  var ac=new AbortController();
  var fetchTimer=setTimeout(function(){ac.abort();},8000);
  fetch(url,{mode:'cors',cache:'no-store',signal:ac.signal})
    .then(function(r){clearTimeout(fetchTimer);if(!r.ok)throw new Error('HTTP '+r.status);return r.blob();})
    .then(doBlob)
    .catch(function(){
      clearTimeout(fetchTimer);
      if(settled)return;
      /* Fallback ke canvas, JUGA dengan timeout */
      var img=new Image();img.crossOrigin='anonymous';
      var imgTimer=setTimeout(function(){if(!settled)fallbackOpen();},6000);
      img.onload=function(){
        clearTimeout(imgTimer);
        if(settled)return;
        try{
          var cv=document.createElement('canvas');cv.width=img.naturalWidth||800;cv.height=img.naturalHeight||800;
          cv.getContext('2d').drawImage(img,0,0);
          cv.toBlob(function(b){if(b&&!settled)doBlob(b);else if(!settled)fallbackOpen();},'image/png');
        }catch(e){fallbackOpen();}
      };
      img.onerror=function(){clearTimeout(imgTimer);fallbackOpen();};
      img.src=url;
    });
}

var _msgTs=[];
function rateLimitOk(){
  var now=Date.now();
  _msgTs=_msgTs.filter(function(t){return now-t<10000;});
  if(_msgTs.length>=8)return false;
  _msgTs.push(now);return true;
}
function checkModeLimit(){
  if(U.premium)return{ok:true};
  var now=Date.now();
  var resetMs=(D.tokenResetHours||3)*3600000;
  if(!S.limitResetAt||now>S.limitResetAt){
    S.msgCount={};
    S.limitResetAt=now+resetMs;
    svS();
  }
  var mode=S.mode;
  var limit=(D.modeLimits&&D.modeLimits[mode])||50;
  var used=S.msgCount[mode]||0;
  if(used>=limit){
    var mins=Math.ceil((S.limitResetAt-now)/60000);
    var jam=Math.floor(mins/60),sisaMin=mins%60;
    var waktu=jam>0?(jam+' jam '+sisaMin+' menit'):(mins+' menit');
    return{ok:false,limit:limit,used:used,resetIn:waktu};
  }
  return{ok:true,limit:limit,used:used,remaining:limit-used};
}
function incrementModeUsage(){
  if(U.premium)return;
  var mode=S.mode;
  S.msgCount[mode]=(S.msgCount[mode]||0)+1;
  svS();
}
function esc(s){var d=document.createElement('div');d.textContent=String(s||'');return d.innerHTML;}
function toast(m){
  var e=$('tst');if(!e)return;
  e.textContent=m;e.classList.add('on');
  clearTimeout(toast._t);toast._t=setTimeout(function(){e.classList.remove('on');},2200);
}
function scrBot(){
  var cw=$('cw');if(!cw)return;
  cw.scrollTop=cw.scrollHeight+9999;
  requestAnimationFrame(function(){cw.scrollTop=cw.scrollHeight+9999;
    setTimeout(function(){cw.scrollTop=cw.scrollHeight+9999;},120);});
}
function fIcon(n){
  var ext=(n.split('.').pop()||'').toLowerCase();
  var map={pdf:'📄',doc:'📝',docx:'📝',txt:'📄',zip:'🗜',rar:'🗜',html:'🌐',
    apk:'📱',js:'⚡',py:'🐍',jpg:'🖼',png:'🖼',gif:'🖼',mp4:'🎬',mp3:'🎵',csv:'📊'};
  return map[ext]||'📎';
}
function fmt(t){
  t=t.replace(/^### (.+)$/gm,'<h3 style="font-family:var(--fd);font-size:16px;font-weight:700;margin:10px 0 5px">$1</h3>');
  t=t.replace(/^## (.+)$/gm,'<h2 style="font-family:var(--fd);font-size:18px;font-weight:700;margin:12px 0 6px">$1</h2>');
  t=t.replace(/^# (.+)$/gm,'<h1 style="font-family:var(--fd);font-size:20px;font-weight:800;margin:14px 0 7px">$1</h1>');
  t=t.replace(/^&gt;&gt;&gt; (.+)$/gm,'<blockquote style="border-left:3px solid var(--dv);padding:4px 12px;margin:8px 0;color:var(--text2);font-style:italic">$1</blockquote>');
  t=t.replace(/^---$/gm,'<hr style="border:none;border-top:1px solid var(--bdr);margin:12px 0">');
  t=t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  t=t.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g,'<em>$1</em>');
  t=t.replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)\]])/g,function(url){
    var short=url.length>46?url.slice(0,46)+'\u2026':url;
    return '<a href="'+url+'" target="_blank" rel="noopener noreferrer" class="msg-link">'+short+'<svg viewBox="0 0 24 24" style="width:11px;height:11px;margin-left:3px;vertical-align:-1px" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>';
  });
  // code blocks with copy button
  t=t.replace(/```[\s\S]*?```/g,function(m){
    var code=m.replace(/^```[^\n]*\n?/,'').replace(/```$/,'');
    var id='cb'+Math.random().toString(36).slice(2,7);
    return '<div style="position:relative;margin:8px 0"><pre id="'+id+'" style="background:var(--surf2);padding:12px 14px;padding-right:48px;border-radius:12px;overflow-x:auto;font-size:12.5px;font-family:monospace;line-height:1.6;border:1px solid var(--bdr)">'+esc(code)+'</pre><button onclick="navigator.clipboard.writeText(document.getElementById(\''+id+'\').textContent);this.textContent=\'✓\';setTimeout(function(){this.textContent=\'⎘\'}.bind(this),1500)" style="position:absolute;top:8px;right:8px;padding:4px 9px;background:var(--surf3);border:1px solid var(--bdr2);border-radius:8px;font-size:12px;cursor:pointer;color:var(--text2)">⎘</button></div>';
  });
  t=t.replace(/\u0060([^\u0060\n]+)\u0060/g,'<code style="background:var(--surf2);padding:1px 6px;border-radius:5px;font-size:12.5px;font-family:monospace">$1</code>');
  return t.replace(/\n/g,'<br>');
}

/* PERSIST */
function svS(){try{var o=Object.assign({},S);o.chats=S.chats.map(function(c){return Object.assign({},c,{messages:c.messages.map(function(m){return {role:m.role,text:m.text};})});});localStorage.setItem(SK,JSON.stringify(o));}catch(e){}}
function ldS(){try{var r=localStorage.getItem(SK);if(r)Object.assign(S,JSON.parse(r));}catch(e){}}
function svD(){
  try{localStorage.setItem(DK,JSON.stringify(D));}catch(e){}
  try{
    var req=indexedDB.open('veytrix',1);
    req.onupgradeneeded=function(e){e.target.result.createObjectStore('cfg',{keyPath:'k'});};
    req.onsuccess=function(e){
      var db=e.target.result;
      var tx=db.transaction('cfg','readwrite');
      tx.objectStore('cfg').put({k:'D',v:JSON.stringify(D)});
    };
  }catch(ex){}
}
function ldD(){
  try{var r=localStorage.getItem(DK);if(r){Object.assign(D,JSON.parse(r));if(!D.aiInfoItems)D.aiInfoItems=D.aiInfo?D.aiInfo.split('\n').filter(Boolean):[];}}catch(e){}
  try{
    var req=indexedDB.open('veytrix',1);
    req.onupgradeneeded=function(e){e.target.result.createObjectStore('cfg',{keyPath:'k'});};
    req.onsuccess=function(e){
      var db=e.target.result,tx=db.transaction('cfg','readonly');
      var gr=tx.objectStore('cfg').get('D');
      gr.onsuccess=function(){
        if(gr.result&&gr.result.v){try{var nd=JSON.parse(gr.result.v);Object.assign(D,nd);applyBranding();applyProfileAll();}catch(ex){}}
      };
    };
  }catch(ex){}
}
function svU(){
  try{localStorage.setItem(UK,JSON.stringify(U));}catch(e){}
  try{saveToDevice(DEVICE_KEY+'_u',JSON.stringify(U));}catch(e){}
}
function ldU(){
  var r=null;
  try{r=localStorage.getItem(UK);}catch(e){}
  if(!r){try{r=loadFromDevice(DEVICE_KEY+'_u');}catch(e){}}
  if(r){try{Object.assign(U,JSON.parse(r));}catch(e){}}
}

/* BLOCK */
function chkBlk(){try{var b=localStorage.getItem(BK);if(b){var bs=$('blkSc');if(bs)bs.classList.add('on');var bi=$('blkId');if(bi)bi.textContent='ID: '+JSON.parse(b).id;}}catch(e){}}
function blkDev(){try{localStorage.setItem(BK,JSON.stringify({id:'DEV-'+Date.now().toString(36).toUpperCase(),t:Date.now()}));}catch(e){}chkBlk();}

/* MODEL MODES */
var MODEL_MODES={
  claude:[
    {id:'fast',icon:'⚡',label:'Fast',prompt:'Jawab cepat dan ringkas. Tetap berpikir sebelum menjawab tapi utamakan kecepatan.'},
    {id:'think',icon:'🧠',label:'Think',prompt:'Berpikir sebelum menjawab. WAJIB format: [ANALISIS]inti pertanyaan + 1 pertimbangan penting, ringkas[/ANALISIS][JAWABAN]jawaban lengkap[/JAWABAN]'},
    {id:'deep',icon:'🔬',label:'Deep',prompt:'Berpikir mendalam. WAJIB format: [ANALISIS]pecah masalah jadi bagian, bandingkan min 2 pendekatan berbeda, sebutkan 1 risiko/edge-case[/ANALISIS][JAWABAN]jawaban akhir lengkap & akurat menyatukan analisis di atas[/JAWABAN]'},
    {id:'expert',icon:'🏆',label:'Expert',prompt:'MODE EXPERT. WAJIB format, jangan lewatkan satupun: [ANALISIS]1)pecah masalah ke komponen dasar 2){{DOMAIN_LENS}} 3)bandingkan min 2 pendekatan/jawaban, evaluasi plus-minus tiap opsi 4)cek ulang: ada kesalahan logika atau kasus terlewat?[/ANALISIS][JAWABAN]jawaban final terbaik, lengkap, sudah terverifikasi dari analisis di atas[/JAWABAN]'}
  ],
  gpt:[
    {id:'fast',icon:'⚡',label:'Fast',prompt:'Jawab cepat dan ringkas. Tetap berpikir sebelum menjawab tapi utamakan kecepatan.'},
    {id:'think',icon:'🧠',label:'Think',prompt:'Berpikir sebelum menjawab. WAJIB format: [ANALISIS]inti pertanyaan + 1 pertimbangan penting, ringkas[/ANALISIS][JAWABAN]jawaban lengkap[/JAWABAN]'},
    {id:'deep',icon:'🔬',label:'Deep',prompt:'Berpikir mendalam. WAJIB format: [ANALISIS]pecah masalah jadi bagian, bandingkan min 2 pendekatan berbeda, sebutkan 1 risiko/edge-case[/ANALISIS][JAWABAN]jawaban akhir lengkap & akurat menyatukan analisis di atas[/JAWABAN]'},
    {id:'expert',icon:'🏆',label:'Expert',prompt:'MODE EXPERT. WAJIB format, jangan lewatkan satupun: [ANALISIS]1)pecah masalah ke komponen dasar 2){{DOMAIN_LENS}} 3)bandingkan min 2 pendekatan/jawaban, evaluasi plus-minus tiap opsi 4)cek ulang: ada kesalahan logika atau kasus terlewat?[/ANALISIS][JAWABAN]jawaban final terbaik, lengkap, sudah terverifikasi dari analisis di atas[/JAWABAN]'}
  ],
  gemini:[
    {id:'fast',icon:'⚡',label:'Fast',prompt:'Jawab cepat dan ringkas. Tetap berpikir sebelum menjawab tapi utamakan kecepatan.'},
    {id:'think',icon:'🧠',label:'Think',prompt:'Berpikir sebelum menjawab. WAJIB format: [ANALISIS]inti pertanyaan + 1 pertimbangan penting, ringkas[/ANALISIS][JAWABAN]jawaban lengkap[/JAWABAN]'},
    {id:'deep',icon:'🔬',label:'Deep',prompt:'Berpikir mendalam. WAJIB format: [ANALISIS]pecah masalah jadi bagian, bandingkan min 2 pendekatan berbeda, sebutkan 1 risiko/edge-case[/ANALISIS][JAWABAN]jawaban akhir lengkap & akurat menyatukan analisis di atas[/JAWABAN]'},
    {id:'expert',icon:'🏆',label:'Expert',prompt:'MODE EXPERT. WAJIB format, jangan lewatkan satupun: [ANALISIS]1)pecah masalah ke komponen dasar 2){{DOMAIN_LENS}} 3)bandingkan min 2 pendekatan/jawaban, evaluasi plus-minus tiap opsi 4)cek ulang: ada kesalahan logika atau kasus terlewat?[/ANALISIS][JAWABAN]jawaban final terbaik, lengkap, sudah terverifikasi dari analisis di atas[/JAWABAN]'}
  ],
  deepseek:[
    {id:'fast',icon:'⚡',label:'Fast',prompt:'Jawab cepat dan ringkas. Tetap berpikir sebelum menjawab tapi utamakan kecepatan.'},
    {id:'think',icon:'🧠',label:'Think',prompt:'Berpikir sebelum menjawab. WAJIB format: [ANALISIS]inti pertanyaan + 1 pertimbangan penting, ringkas[/ANALISIS][JAWABAN]jawaban lengkap[/JAWABAN]'},
    {id:'deep',icon:'🔬',label:'Deep',prompt:'Berpikir mendalam. WAJIB format: [ANALISIS]pecah masalah jadi bagian, bandingkan min 2 pendekatan berbeda, sebutkan 1 risiko/edge-case[/ANALISIS][JAWABAN]jawaban akhir lengkap & akurat menyatukan analisis di atas[/JAWABAN]'},
    {id:'expert',icon:'🏆',label:'Expert',prompt:'MODE EXPERT. WAJIB format, jangan lewatkan satupun: [ANALISIS]1)pecah masalah ke komponen dasar 2){{DOMAIN_LENS}} 3)bandingkan min 2 pendekatan/jawaban, evaluasi plus-minus tiap opsi 4)cek ulang: ada kesalahan logika atau kasus terlewat?[/ANALISIS][JAWABAN]jawaban final terbaik, lengkap, sudah terverifikasi dari analisis di atas[/JAWABAN]'}
  ],
  def:[
    {id:'fast',icon:'⚡',label:'Fast',prompt:'Jawab cepat dan ringkas. Tetap berpikir sebelum menjawab tapi utamakan kecepatan.'},
    {id:'think',icon:'🧠',label:'Think',prompt:'Berpikir sebelum menjawab. WAJIB format: [ANALISIS]inti pertanyaan + 1 pertimbangan penting, ringkas[/ANALISIS][JAWABAN]jawaban lengkap[/JAWABAN]'},
    {id:'deep',icon:'🔬',label:'Deep',prompt:'Berpikir mendalam. WAJIB format: [ANALISIS]pecah masalah jadi bagian, bandingkan min 2 pendekatan berbeda, sebutkan 1 risiko/edge-case[/ANALISIS][JAWABAN]jawaban akhir lengkap & akurat menyatukan analisis di atas[/JAWABAN]'},
    {id:'expert',icon:'🏆',label:'Expert',prompt:'MODE EXPERT. WAJIB format, jangan lewatkan satupun: [ANALISIS]1)pecah masalah ke komponen dasar 2){{DOMAIN_LENS}} 3)bandingkan min 2 pendekatan/jawaban, evaluasi plus-minus tiap opsi 4)cek ulang: ada kesalahan logika atau kasus terlewat?[/ANALISIS][JAWABAN]jawaban final terbaik, lengkap, sudah terverifikasi dari analisis di atas[/JAWABAN]'}
  ]
};
var HIGH_TIER=['expert'];
var MEDIUM_TIER=['deep'];
function isHighTier(){return S.mode==='expert';}
function isMediumTier(){return S.mode==='deep';}
function getModelType(id){
  var a=D.apis.find(function(x){return x.id===id;});
  if(!a)return 'def';
  var m=(a.model||'').toLowerCase();
  if(m.indexOf('claude')>=0)return 'claude';
  if(m.indexOf('gpt')>=0)return 'gpt';
  if(m.indexOf('gemini')>=0)return 'gemini';
  if(m.indexOf('deepseek')>=0)return 'deepseek';
  return 'def';
}
function getModes(){var t=getModelType(D.activeApiId);return MODEL_MODES[t]||MODEL_MODES.def;}
var MODE_SVG={
  fast:'<svg viewBox="0 0 24 24" style="width:13px;height:13px;vertical-align:-2px" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  think:'<svg viewBox="0 0 24 24" style="width:13px;height:13px;vertical-align:-2px" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A5.5 5.5 0 0 0 4 7.5c0 1.4.5 2.6 1.4 3.6L7 13v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3l1.6-1.9A5.5 5.5 0 0 0 14.5 2"/><line x1="9" y1="21" x2="15" y2="21"/></svg>',
  deep:'<svg viewBox="0 0 24 24" style="width:13px;height:13px;vertical-align:-2px" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  expert:'<svg viewBox="0 0 24 24" style="width:13px;height:13px;vertical-align:-2px" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a2 2 0 0 0 0 4h.5M17 6h3a2 2 0 0 1 0 4h-.5"/></svg>'
};
function updateModePill(){
  var modes=getModes();var cm=modes.find(function(m){return m.id===S.mode;})||modes[0];
  var ic=document.getElementById('modePillIcon'),lb=document.getElementById('modePillLabel');
  if(ic)ic.innerHTML=MODE_SVG[cm.id]||'';
  if(lb)lb.textContent=cm.label;
}
function openModeSheet(){
  var ov=document.getElementById('modeSheetOv'),sh=document.getElementById('modeSheet');
  if(!ov||!sh)return;
  renderModeSheetList();
  ov.style.display='block';sh.style.display='block';
  requestAnimationFrame(function(){
    ov.style.transition='opacity .25s ease';ov.style.opacity='1';
    sh.style.transition='transform .28s cubic-bezier(.4,0,.2,1)';sh.style.transform='translateY(0)';
  });
}
function closeModeSheet(){
  var ov=document.getElementById('modeSheetOv'),sh=document.getElementById('modeSheet');
  if(!ov||!sh)return;
  ov.style.opacity='0';sh.style.transform='translateY(100%)';
  setTimeout(function(){ov.style.display='none';sh.style.display='none';},260);
}
function renderModeSheetList(){
  var list=document.getElementById('modeSheetList');if(!list)return;
  list.innerHTML='';
  var modes=getModes();
  var lim=D.modeLimits||{};
  modes.forEach(function(m){
    var isActive=S.mode===m.id;
    var usedCount=(S.msgCount&&S.msgCount[m.id])||0;
    var maxCount=lim[m.id]||50;
    var remain=U.premium?'Tanpa batas':('Sisa '+Math.max(0,maxCount-usedCount)+' pesan');
    var row=document.createElement('div');
    row.style.cssText='display:flex;align-items:center;gap:13px;padding:11px 10px;border-radius:13px;cursor:pointer;'+(isActive?'background:var(--surf3)':'');
    row.innerHTML='<div style="width:36px;height:36px;border-radius:10px;background:var(--surf2);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:'+(isActive?'var(--dv)':'var(--text2)')+'">'+(MODE_SVG[m.id]||'').replace('13px','17px')+'</div>'
      +'<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:600;color:var(--text)">'+esc(m.label)+'</div><div style="font-size:11.5px;color:var(--text3);margin-top:1px">'+esc(remain)+'</div></div>'
      +(isActive?'<svg viewBox="0 0 24 24" style="width:18px;height:18px;flex-shrink:0" fill="none" stroke="var(--dv)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>':'');
    row.addEventListener('click',function(){
      S.mode=m.id;svS();updateModePill();closeModeSheet();toast('Mode: '+m.label);
    });
    list.appendChild(row);
  });
}
function renderModeBar(){
  var mb=$('modeBar');if(!mb)return;
  var modes=getModes();
  if(!modes.find(function(m){return m.id===S.mode;}))S.mode=modes[0].id;
  mb.innerHTML='';
  modes.forEach(function(m){
    var b=document.createElement('button');
    b.className='mbb'+(S.mode===m.id?' on':'');
    var lim=(D.modeLimits&&D.modeLimits[m.id])||50;
    var used=(S.msgCount&&S.msgCount[m.id])||0;
    var remain=U.premium?'\u221e':Math.max(0,lim-used);
    b.innerHTML=(MODE_SVG[m.id]||'')+' '+m.label+'<span style="opacity:.5;font-size:9px;margin-left:3px">'+remain+'</span>';
    b.title=m.label+' \u2014 sisa '+remain+' pesan';
    b.addEventListener('click',function(){S.mode=m.id;svS();renderModeBar();toast('Mode: '+m.label);});
    mb.appendChild(b);
  });
}

/* API */
function getApi(){return D.apis.find(function(x){return x.id===D.activeApiId;})||D.apis[0]||{name:'Offline',url:'',id:'x'};}
function setEngUI(name,s){
  var l=$('engLb'),d=$('engDt');
  if(l)l.textContent=name.length>13?name.slice(0,12)+'…':name;
  if(d){d.className='eng-dt';if(s==='w')d.classList.add('w');else if(s==='e')d.classList.add('e');}
}
var currentAbortCtrl=null,userAborted=false;
function fwt(url,ms,options){
  var c=new AbortController();currentAbortCtrl=c;var t=setTimeout(function(){c.abort();},ms);
  var opts=options||{};
  opts=Object.assign({},opts,{signal:c.signal});
  return fetch(url,opts).then(function(r){clearTimeout(t);return r;}).catch(function(e){clearTimeout(t);throw e;});
}
/* ═══════════════════════════════════════════════════════════════
   MULTI-CHAIN AI SYSTEM
   Arsitektur: tiap slot API mendapat prompt berperan spesifik,
   hasilnya di-chain (output satu jadi konteks berikutnya),
   master synthesizer menghasilkan jawaban final berkualitas tinggi.
═══════════════════════════════════════════════════════════════ */

/* Deteksi domain dari pertanyaan user */
function detectDomain(txt){
  var t=txt.toLowerCase();
  if(/\b(code|kode|python|javascript|js|java|php|html|css|sql|debug|error|fungsi|function|class|api|backend|frontend|deploy|git|npm|pip|algoritma|array|loop|if|else|return|variable|variabel|import|library|framework|react|vue|node|express|django|flask|bug|fix|syntax|compile|runtime|database|query|json|xml|regex|bash|shell|script|endpoint|server|client|http|rest|graphql|docker|kubernetes|linux|ubuntu|windows|mac|os|terminal|cli|git|github|gitlab|code review|refactor|optimize|performance|memory|cpu|async|await|promise|callback|thread|process|socket|tcp|udp|ssl|tls|encrypt|decrypt|hash|auth|jwt|oauth|webpack|vite|rollup|eslint|prettier|test|unit test|integration|ci cd|pipeline|devops|cloud|aws|gcp|azure|vercel|netlify|heroku|vps|nginx|apache|mysql|postgresql|mongodb|redis|firebase|supabase)\b/.test(t))return 'coding';
  if(/\b(matematika|fisika|kimia|biologi|sejarah|geografi|ekonomi|sosiologi|bahasa|sastra|pelajaran|rumus|teorema|hukum|reaksi|sel|atom|molekul|planet|negara|ibukota|presiden|perang|revolusi|budaya|agama|filsafat|psikologi|anatomi|organ|ekosistem|evolusi|statistik|kalkulus|aljabar|geometri|trigonometri|integral|diferensial|vektor|matriks|logika|himpunan|peluang|probabilitas|distribusi|regresi|hipotesis)\b/.test(t))return 'academic';
  if(/\b(berita|informasi|fakta|data|riset|penelitian|laporan|artikel|studi|survei|analisis|tren|update|terbaru|aktual|global|nasional|lokal|ekonomi|politik|sosial|teknologi|sains|lingkungan|kesehatan|pendidikan|budaya|hiburan|olahraga|bisnis|industri|market|saham|investasi|cryptocurrency|blockchain|ai|artificial intelligence|machine learning|deep learning|robot|iot|big data)\b/.test(t))return 'info';
  return 'general';
}

/* System prompt khusus per peran + domain */
function getRolePrompt(role, domain, prevResult, originalQ){
  var domainCtx='';
  if(domain==='coding'){
    domainCtx='\nFOKUS CODING: Tulis kode NYATA yang berfungsi. Sertakan: kode lengkap, penjelasan baris penting, cara menjalankan, handle error, edge case, best practice. Jangan pseudocode, jangan terpotong.';
  }else if(domain==='academic'){
    domainCtx='\nFOKUS AKADEMIK: Gunakan terminologi ilmiah tepat. Sertakan: definisi, rumus/teori jika relevan, contoh konkret, aplikasi nyata, sumber konseptual.';
  }else if(domain==='info'){
    domainCtx='\nFOKUS INFORMASI: Berikan fakta akurat dan terstruktur. Sertakan: konteks, kronologi jika relevan, data/angka spesifik, berbagai perspektif, kesimpulan.';
  }

  var base='Kamu adalah AI tingkat lanjut dalam sistem multi-agent Veyzen AI - Ops. Jawab dalam bahasa yang sama dengan pertanyaan.'+domainCtx+'\n\nPertanyaan asli: '+originalQ+'\n\n';

  var roles={
    'jawab': base+'PERANMU: Jawab pertanyaan ini dengan lengkap, akurat, dan jelas sebagai jawaban utama.',
    'verifikasi': base+'PERANMU: Verifikasi dan perkuat jawaban berikut ini. Koreksi jika ada kesalahan, tambahkan yang kurang, tingkatkan akurasi.\n\nJawaban sebelumnya:\n'+prevResult+'\n\nBerikan versi yang lebih akurat dan lengkap:',
    'sintesis': base+'PERANMU: Kamu adalah synthesizer master. Buat jawaban FINAL terbaik berdasarkan analisis berikut, gabungkan semua insight terbaik, buang yang redundan, hasilkan jawaban yang paling optimal, jelas, dan komprehensif.\n\nAnalisis yang tersedia:\n'+prevResult+'\n\nJawaban final optimal:',
    'riset': base+'PERANMU: Kumpulkan semua fakta, data, dan konteks relevan tentang pertanyaan ini. Jadilah peneliti yang teliti.',
    'analisis': base+'PERANMU: Analisis mendalam berdasarkan hasil riset berikut. Temukan pola, implikasi, dan insight yang tidak obvious.\n\nHasil riset:\n'+prevResult+'\n\nAnalisis mendalam:',
    'kritik': base+'PERANMU: Cari kelemahan, celah, dan counter-argument dari analisis berikut. Jadilah kritikus yang tajam, cari celah dan kelemahan argumen.\n\nAnalisis yang dikritik:\n'+prevResult+'\n\nKritik dan perbaikan:',
    'dekomposisi': base+'PERANMU: Pecah masalah ini ke komponen-komponen fundamental. Identifikasi asumsi tersembunyi, batasan, dan sub-masalah yang perlu diselesaikan.',
    'coding': base+'PERANMU: Kamu adalah senior software engineer dengan 15 tahun pengalaman. Berikan solusi coding terbaik — production-ready, efisien, readable, dengan error handling. Sertakan kode lengkap.'+domainCtx,
    'teori': base+'PERANMU: Kamu adalah ahli teori dan penelitian. Berikan landasan konseptual, teori yang relevan, pendekatan dari berbagai perspektif akademis dan ilmiah.',
    'logika': base+'PERANMU: Kamu adalah validator logika dan matematika. Verifikasi kebenaran logis dari solusi berikut, cek konsistensi, temukan logical fallacy atau matematika yang salah.\n\nSolusi yang divalidasi:\n'+prevResult+'\n\nValidasi logika:',
    'optimasi': base+'PERANMU: Optimalkan solusi berikut — tingkatkan efisiensi, kurangi kompleksitas, perkuat ketahanan, tambahkan fitur yang terlewat.\n\nSolusi yang dioptimasi:\n'+prevResult+'\n\nVersi optimal:'
  };
  return roles[role]||base+'Jawab pertanyaan ini dengan sangat baik.';
}

/* Call satu API dengan prompt spesifik — tidak pakai queue fallback biasa */
function callChainApi(apiSlot, prompt){
  if(!apiSlot||!apiSlot.url)return Promise.resolve(null);
  var to=45000;
  return fwt(apiSlot.url+encodeURIComponent(prompt),to)
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json().catch(function(){return r.text();});})
    .then(function(d){var txt=extractAiText(d);return txt&&txt.length>10?txt:null;})
    .catch(function(){return null;});
}

/* Main chain runner — sequential, each result feeds next */
function runChain(chainSlots, originalQ, onStep){
  var active=chainSlots.filter(function(s){return s&&s.url&&s.url.trim();});
  if(!active.length)return Promise.resolve(null);
  var domain=detectDomain(originalQ);
  var accumulated='';
  var i=0;
  function next(){
    if(i>=active.length)return Promise.resolve(accumulated);
    var slot=active[i++];
    if(onStep)onStep(slot,i,active.length);
    var prompt=getRolePrompt(slot.role,domain,accumulated,originalQ);
    /* Cap prompt per chain call: 1800 char safe */
    if(prompt.length>2200)prompt=prompt.slice(0,1000)+'\n...(diringkas)...\n'+prompt.slice(-900);
    return callChainApi(slot,prompt).then(function(result){
      if(result){
        accumulated=result;
      }
      return next();
    });
  }
  return next();
}

/* Get chain config for current mode */
function getChainForMode(mode){
  if(mode==='think')return D.chainThink||[];
  if(mode==='deep')return D.chainDeep||[];
  if(mode==='expert')return D.chainExpert||[];
  return [];
}

/* Check apakah chain dikonfigurasi (minimal 1 slot terisi URL) */
function isChainConfigured(mode){
  var chain=getChainForMode(mode);
  return chain.some(function(s){return s&&s.url&&s.url.trim();});
}

/* UNIVERSAL API RESPONSE PARSER \u2014 mendukung BintangAPI, OpenAI/Grok-compatible, Gemini native, dan format umum lain */
/* ═══════════════════════════════════════
   GLOBAL SERVER CONFIG — developer upload sekali, SEMUA device dapat
   Developer pasang URL JSON di Panel Dev → Pengaturan Global
   Format JSON bebas — key yang cocok dengan D akan otomatis di-apply
   Contoh: {"aiName":"Veyzen AI - Ops","apis":[...],"adActive":true,"adUrl":"..."}
   JSONBin.io gratis: buat bin di https://jsonbin.io, copy URL-nya
═══════════════════════════════════════ */
/* Field yang boleh disinkron lintas-perangkat lewat server global */
var GLOBAL_SYNC_FIELDS=['aiName','subtitle','aiInfo','aiInfoItems','aiStyle',
  'apis','imageApis','premiumApis','introBanner','profileUrl','profileType',
  'adActive','adUrl','adType','adText','adLink','adW','adH',
  'modeLimits','tokenResetHours','siteName','showIntro','introDuration',
  'htBarText','htColor','links','music','waPremium','version',
  'csQText','premiumPrices','blackenApi','tiktokThemeApi',
  'randomApis','searchApis','downloaderApis',
  'chainThink','chainDeep','chainExpert','allowedDomains'];
function loadRemoteConfig(){
  var url=D.configUrl;
  if(!url||!url.startsWith('http'))return Promise.resolve(false);
  return fwt(url+(url.indexOf('?')>=0?'&':'?')+'_t='+Date.now(),8000)
    .then(function(r){return r.json();})
    .then(function(remote){
      if(!remote||typeof remote!=='object')return false;
      /* Unwrap berbagai bentuk pembungkus: PHP {status,result}, JSONBin {record}, atau langsung objek config */
      var cfg=remote;
      if(remote.result&&typeof remote.result==='object')cfg=remote.result;
      else if(remote.record&&typeof remote.record==='object')cfg=remote.record;
      var changed=false;
      GLOBAL_SYNC_FIELDS.forEach(function(k){
        if(cfg[k]!==undefined&&JSON.stringify(cfg[k])!==JSON.stringify(D[k])){
          D[k]=cfg[k];changed=true;
        }
      });
      if(changed){svD();console.log('[Veyzen] Remote config applied');}
      return true;
    })
    .catch(function(e){console.warn('[Veyzen] Remote config fetch failed:',e);return false;});
}
/* Push config developer SEKARANG ke server PHP (butuh secret key yang sama dengan di file PHP) */
function pushGlobalConfig(url,secretKey){
  if(!url||!url.startsWith('http'))return Promise.resolve({ok:false,message:'URL server belum diisi.'});
  var payload={};
  GLOBAL_SYNC_FIELDS.forEach(function(k){if(D[k]!==undefined)payload[k]=D[k];});
  return fetch(url,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({key:secretKey||'',config:payload})
  })
    .then(function(r){return r.json().then(function(d){return {httpOk:r.ok,data:d};});})
    .then(function(res){
      if(res.httpOk&&res.data&&res.data.status){
        return {ok:true,message:res.data.message||'Berhasil dikirim ke server.'};
      }
      return {ok:false,message:(res.data&&res.data.message)||'Server menolak permintaan.'};
    })
    .catch(function(e){return {ok:false,message:'Tidak bisa menghubungi server: '+e.message};});
}
/* Pisahkan reasoning asli dari jawaban final — 1x panggilan API, bukan simulasi.
   Kalau model (API gratis/kecil) tidak patuh format, fallback aman tanpa bocorkan tag mentah. */
function extractReasoningAndAnswer(raw){
  if(!raw||typeof raw!=='string')return {reasoning:null,answer:raw};
  var m=raw.match(/\[ANALISIS\]([\s\S]*?)\[\/ANALISIS\]/i);
  var j=raw.match(/\[JAWABAN\]([\s\S]*?)\[\/JAWABAN\]/i);
  if(m&&j&&j[1].trim()){
    return {reasoning:m[1].trim(),answer:j[1].trim()};
  }
  var cleaned=raw.replace(/\[\/?ANALISIS\]/gi,'').replace(/\[\/?JAWABAN\]/gi,'').trim();
  return {reasoning:null,answer:cleaned||raw};
}
function extractAiText(d){
  if(d==null)return null;
  if(typeof d==='string')return d.trim()||null;
  // BintangAPI style: {status:true, result:"..."}
  if(d.result){
    if(typeof d.result==='string')return d.result.trim()||null;
    if(typeof d.result==='object'){
      if(d.result.text)return String(d.result.text).trim()||null;
      if(d.result.content)return String(d.result.content).trim()||null;
    }
  }
  // OpenAI / Grok(xAI) / many LLM-proxy compatible: {choices:[{message:{content:"..."}}]}
  if(Array.isArray(d.choices)&&d.choices.length){
    var ch=d.choices[0];
    if(ch.message&&ch.message.content)return String(ch.message.content).trim()||null;
    if(ch.text)return String(ch.text).trim()||null;
    if(ch.delta&&ch.delta.content)return String(ch.delta.content).trim()||null;
  }
  // Google Gemini native API: {candidates:[{content:{parts:[{text:"..."}]}}]}
  if(Array.isArray(d.candidates)&&d.candidates.length){
    var cd=d.candidates[0];
    if(cd.content&&Array.isArray(cd.content.parts)&&cd.content.parts.length){
      var txt=cd.content.parts.map(function(p){return p.text||'';}).join('').trim();
      if(txt)return txt;
    }
    if(cd.text)return String(cd.text).trim()||null;
  }
  // Anthropic-style: {content:[{text:"..."}]}
  if(Array.isArray(d.content)&&d.content.length&&d.content[0].text){
    return String(d.content[0].text).trim()||null;
  }
  // Generic fallback keys
  var keys=['response','text','message','output','answer','reply','data'];
  for(var i=0;i<keys.length;i++){
    var v=d[keys[i]];
    if(typeof v==='string'&&v.trim())return v.trim();
    if(v&&typeof v==='object'){
      if(typeof v.text==='string'&&v.text.trim())return v.text.trim();
      if(typeof v.result==='string'&&v.result.trim())return v.result.trim();
      if(typeof v.content==='string'&&v.content.trim())return v.content.trim();
    }
  }
  return null;
}
function isGeminiApi(api){
  if(!api)return false;
  var model=String(api.model||'').toLowerCase();
  var url=String(api.url||'').toLowerCase();
  return model.indexOf('gemini')>=0 || url.indexOf('generativelanguage.googleapis.com')>=0;
}
function getGeminiEndpoint(api){
  var url=String(api.url||'').trim();
  var model=String(api.model||'gemini-2.5-flash').trim()||'gemini-2.5-flash';
  if(!url) return 'https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(model)+':generateContent';
  /* Full official generateContent endpoint: use as-is. */
  if(/:generateContent(?:\?|$)/i.test(url))return url;
  /* Model endpoint without the method suffix. */
  if(/\/models\/[^/]+$/i.test(url))return url+':generateContent';
  /* Official v1/v1beta base URL: append model + method. */
  if(/generativelanguage\.googleapis\.com\/v1(?:beta)?\/?$/i.test(url)){
    return url.replace(/\/$/,'')+'/models/'+encodeURIComponent(model)+':generateContent';
  }
  /* Custom Gemini-compatible endpoint: keep the configured URL. */
  return url;
}
function buildGeminiContents(prompt){
  return [{role:'user',parts:[{text:String(prompt||'')}]}];
}
function askGemini(api,prompt,timeout){
  var endpoint=getGeminiEndpoint(api);
  var headers={'Content-Type':'application/json'};
  /* Official Gemini API authentication. Do not put the key into the URL. */
  if(api.key)headers['x-goog-api-key']=api.key;
  var body={contents:buildGeminiContents(prompt)};
  return fwt(endpoint,timeout,{method:'POST',headers:headers,body:JSON.stringify(body)})
    .then(function(r){
      return r.json().catch(function(){return r.text();}).then(function(d){
        if(!r.ok){
          var msg='HTTP '+r.status;
          if(d&&d.error&&d.error.message)msg+=': '+d.error.message;
          throw new Error(msg);
        }
        return d;
      });
    })
    .then(function(d){
      var txt=extractAiText(d);
      if(!txt)throw new Error('Gemini mengembalikan respons kosong.');
      return txt;
    });
}
function askAI(prompt,retry){
  if(!D.apis.length)return Promise.resolve('Tidak ada API.');
  var base=getApi();
  var others=D.apis.filter(function(a){return a.id!==base.id;});
  var order=S.fallback?[base].concat(others):[base];
  var to=S.mode==='expert'?55000:S.mode==='deep'?40000:S.mode==='think'?25000:15000;
  var i=0;
  function tryNext(){
    if(userAborted)return Promise.resolve(null);
    if(i>=order.length){
      setEngUI('Offline','e');
      if(!retry){
        return new Promise(function(res){setTimeout(function(){res(askAI(prompt,true));},1200);});
      }
      return Promise.resolve('AI sedang sibuk, tapi tetap mencoba. Tunggu sebentar lalu kirim ulang pesan kamu \u2014 sistem akan otomatis mencoba server lain.');
    }
    var api=order[i++];setEngUI(api.name,'w');
    var request;
    if(isGeminiApi(api)){
      /* Gemini native generateContent: POST JSON + x-goog-api-key header. */
      request=askGemini(api,prompt,to);
    }else{
      /* Preserve the existing behavior for every non-Gemini API. */
      request=fwt(api.url+encodeURIComponent(prompt),to)
        .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json().catch(function(){return r.text();});})
        .then(function(d){
          var txt=extractAiText(d);
          if(!txt)throw new Error('empty');
          return txt;
        });
    }
    return request.then(function(txt){
      D.activeApiId=api.id;api.status='ok';setEngUI(api.name,'ok');
      return txt;
    }).catch(function(err){
      if(userAborted)return null;
      api.status='e';
      console.warn('[Veyzen] API error:',api.name,err&&err.message?err.message:err);
      return tryNext();
    });
  }
  return tryNext();
}

/* ===== AI IMAGES (terpisah dari AI Chat) ===== */
function getImageGenApi(){return D.imageApis.find(function(x){return x.id===D.activeImageGenId;})||null;}
function getImageAnalyzeApi(){return D.imageApis.find(function(x){return x.id===D.activeImageAnalyzeId;})||null;}
function isImageRequest(txt){
  var kw=['buat gambar','buatkan gambar','generate image','gambarkan','buat foto','bikin gambar','bikinkan gambar','create image','draw ','lukis','generate gambar','buat ilustrasi','desain gambar','ilustrasikan','buatkan foto','gambar dong','bikin foto','gambarin'];
  var lo=txt.toLowerCase();
  return kw.some(function(k){return lo.indexOf(k)>=0;});
}
function fileToBase64(file){
  return new Promise(function(res,rej){
    var r=new FileReader();
    r.onload=function(){res(r.result);};
    r.onerror=function(){rej(new Error('read fail'));};
    r.readAsDataURL(file);
  });
}
function buildImgUrl(api, prompt){
  /* Support 3 URL formats:
     1. Ends with = → append directly (BintangAPI style: url?text=PROMPT)
     2. Has ? → add &prompt= (synoxcloud style: url?ratio=1:1&prompt=PROMPT)
     3. No ? → add ?prompt= */
  if(api.url.slice(-1)==='=') return api.url+encodeURIComponent(prompt);
  var sep=api.url.indexOf('?')>=0?'&':'?';
  return api.url+sep+'prompt='+encodeURIComponent(prompt);
}
function enhanceImgPrompt(raw){
  /* Otomatis tambah quality keywords jika belum ada */
  var r=raw.toLowerCase();
  var enhancements=[];
  if(!/(hd|4k|high quality|high res|ultra|sharp|detailed)/i.test(r))enhancements.push('high quality, detailed');
  if(!/(anime|realistic|3d|2d|cartoon|photo|render)/i.test(r))enhancements.push('high quality render');
  return raw+(enhancements.length?', '+enhancements.join(', '):'');
}
function callOneImageApi(api,prompt){
  setEngUI('AI Images: '+api.name,'w');
  var enhanced=enhanceImgPrompt(prompt);
  var url=buildImgUrl(api,enhanced);
  if(api.key)url+='&apikey='+encodeURIComponent(api.key);
  if(api.model)url+='&model='+encodeURIComponent(api.model);
  if(api.version)url+='&version='+encodeURIComponent(api.version);
  console.log('[Veyzen] Image URL:', url);
  return fwt(url,40000).then(function(r){
    if(!r.ok){
      return r.text().then(function(et){throw new Error('HTTP '+r.status+(et?(' \u2014 '+et.slice(0,140)):''));});
    }
    var ct=(r.headers.get('content-type')||'').toLowerCase();
    if(ct.indexOf('image/')===0){
      return r.blob().then(function(b){return {url:URL.createObjectURL(b)};});
    }
    return r.text().then(function(t){
      var d=null;try{d=JSON.parse(t);}catch(e){}
      if(d){
        var img=(d.result||d.url||d.image)||(d.data&&(d.data.url||d.data.image))||null;
        if(img)return {url:img};
        if(d.status===false||d.success===false)throw new Error(d.message||d.error||'API menolak permintaan');
        throw new Error('format respons tidak dikenali: '+t.slice(0,140));
      }
      var tt=t.trim();
      if(/^https?:\/\//.test(tt))return {url:tt};
      if(tt.indexOf('data:image')===0)return {url:tt};
      throw new Error('respons API kosong/tidak dikenali'+(tt?': '+tt.slice(0,140):''));
    });
  });
}
/* GENERATE dengan FALLBACK CHAIN — kalau API aktif gagal, otomatis coba API generate lain yang dikonfigurasi developer */
function generateImageAI(prompt){
  var activeApi=getImageGenApi();
  if(!activeApi)return Promise.resolve({error:'no_api'});
  var others=(D.imageApis||[]).filter(function(x){return x.id!==activeApi.id&&(x.role==='generate'||!x.role);});
  var chain=[activeApi].concat(others);
  var i=0;
  function tryNext(lastErr){
    if(i>=chain.length){
      setEngUI('AI Images','e');
      return {error:(lastErr&&lastErr.message)||'Semua API generate gagal dicoba.'};
    }
    var api=chain[i++];
    return callOneImageApi(api,prompt)
      .then(function(res){setEngUI('AI Images','ok');return res;})
      .catch(function(err){
        var msg=(err&&err.message)||'gagal terhubung ke API';
        if(err instanceof TypeError||msg.indexOf('Failed to fetch')>=0||msg.indexOf('NetworkError')>=0){
          msg='CORS diblokir atau Base URL tidak bisa diakses ('+api.name+')';
        }
        if(err.name==='AbortError')msg='Waktu tunggu habis di '+api.name+' (server terlalu lambat)';
        /* Coba API generate berikutnya yang dikonfigurasi developer */
        return tryNext(new Error(msg));
      });
  }
  return tryNext(null);
}

function uploadToCatbox(file){
  var fd=new FormData();
  fd.append('reqtype','fileupload');
  fd.append('fileToUpload',file);
  var ctl=new AbortController();currentAbortCtrl=ctl;var tmo=setTimeout(function(){ctl.abort();},35000);
  return fetch('https://catbox.moe/user/api.php',{method:'POST',body:fd,signal:ctl.signal})
    .then(function(r){clearTimeout(tmo);if(!r.ok)throw new Error('Upload gagal (HTTP '+r.status+')');return r.text();})
    .then(function(t){
      t=(t||'').trim();
      if(/^https?:\/\//.test(t))return t;
      throw new Error('Upload gagal: '+(t||'respons kosong'));
    }).catch(function(err){clearTimeout(tmo);throw err;});
}
function analyzeImageAI(file,question){
  var api=getImageAnalyzeApi();
  if(!api)return Promise.resolve({error:'no_api'});
  setEngUI('AI Images: '+api.name,'w');
  return uploadToCatbox(file).then(function(imgUrl){
    var url=api.url+encodeURIComponent(imgUrl);
    var extra=['text='+encodeURIComponent(question||'Apa isi gambar/video ini? Jelaskan secara detail.')];
    if(api.key)extra.push('apikey='+encodeURIComponent(api.key));
    if(api.model)extra.push('model='+encodeURIComponent(api.model));
    if(api.version)extra.push('version='+encodeURIComponent(api.version));
    url+='&'+extra.join('&');
    return fwt(url,45000);
  }).then(function(r){
    if(!r.ok){
      return r.text().then(function(et){throw new Error('HTTP '+r.status+(et?(' \u2014 '+et.slice(0,140)):''));});
    }
    return r.text();
  }).then(function(t){
    var d=null;try{d=JSON.parse(t);}catch(e){}
    var desc=d?((d.result||d.description||d.text)||(d.data&&(d.data.result||d.data.description||d.data.text))||null):null;
    if(!desc&&!d&&t&&t.trim())desc=t.trim();
    if(desc)return {text:desc};
    if(d&&(d.status===false||d.success===false))throw new Error(d.message||d.error||'API menolak permintaan');
    throw new Error('respons API kosong/tidak dikenali'+(t?': '+t.slice(0,140):''));
  }).then(function(res){setEngUI('AI Images','ok');return res;})
    .catch(function(err){
      setEngUI('AI Images','e');
      var msg=(err&&err.message)||'gagal terhubung ke API';
      if(err instanceof TypeError||msg.indexOf('Failed to fetch')>=0||msg.indexOf('NetworkError')>=0){
        msg='Tidak bisa menghubungi API ini dari browser (kemungkinan CORS diblokir API, atau Base URL salah). Pastikan API mendukung akses cross-origin (CORS).';
      }
      if(err.name==='AbortError')msg='Waktu tunggu habis (upload/analisis terlalu lambat).';
      return {error:msg};
    });
}

/* MODEL DROPDOWN */
function getStyleExtra(){
  var styles={
    original:'',
    profesional:'Gunakan gaya bahasa SANGAT PROFESIONAL dan formal. Hindari kata santai. Jawab terstruktur, presisi, penuh kepakaran.',
    asik:[
      'Kamu adalah AI gen Z yang soft spoken, asik, dan gaul banget. Gaya chat lo kayak temen deket yang pinter.',
      'Aturan wajib: (1) Pakai "lo/gue" bukan "kamu/saya" (2) Kalimat pendek-pendek, santai, mengalir (3) Boleh singkatan wajar: "bgt","dong","sih","kyk","emg","ngl","btw","fyi","wdym","lol","haha" (4) Sesekali kasih validasi atau react dulu sebelum jawab, kyk: "ohh oke oke", "nah bener sih", "hm menarik juga" (5) Kalau info penting tetap lengkap tapi disampaikan santai (6) Jangan pakai emoji berlebihan, max 1-2 per jawaban, pilih yang relevan bukan random (7) Jangan terlalu formal SAMA SEKALI, kayak ngobrol di chat beneran.',
      'Contoh style yang benar: "ohh ngerti ngerti, jadi intinya..." atau "nah ini yang seru nih..." atau "bener sih, tapi yang perlu lo tau...". Boleh pakai emoji keyboard sesekali yang relevan, max 1-2 per pesan: \uD83D\uDE0E\uD83D\uDD25\uD83E\uDD14\uD83D\uDE4C dll.'
    ].join(' '),
    ramah:'Gunakan gaya bahasa RAMAH dan hangat seperti teman terbaik. Supportif, pengertian, menyemangati. Berikan respons yang membuat pengguna merasa didengar dan dihargai.',
    sinis:'Gunakan gaya SINIS dan sarkas yang lucu (bukan jahat). Jawaban benar tapi dengan humor sarkas yang menghibur.'
  };
  var extra=styles[D.aiStyle||'original']||'';
  return extra?'\nGAYA KOMUNIKASI: '+extra:'';
}
function buildModelDrop(){
  var dp=$('mdlDp');if(!dp)return;dp.innerHTML='';
  var mn=$('stModelName');
  var cur=getApi();
  if(mn)mn.textContent=cur.name||'-';
  D.apis.forEach(function(a,i){
    var el=document.createElement('div');el.className='mdi'+(a.id===D.activeApiId?' sel':'');
    var dot='<div class="mdi-dot" style="background:'+MC[i%MC.length]+'"></div>';
    var info='<div class="mdi-inf"><b>'+esc(a.name)+'</b><span>'+(a.type==='premium'?'⭐ ':'')+esc(a.model)+'</span></div>';
    el.innerHTML=dot+info;
    el.addEventListener('click',function(){D.activeApiId=a.id;buildModelDrop();renderModeBar();setEngUI(a.name,'ok');toast('Model: '+a.name);var d=$('mdlDp');if(d)d.classList.remove('on');});
    dp.appendChild(el);
  });
  updMdlLbl();renderModeBar();
}
function updMdlLbl(){var ml=$('mdlLb');if(!ml)return;var a=getApi();ml.textContent=(a.name||'Model').replace('PANDZZ ','').slice(0,10);}
function renderStModelList(){
  var list=$('stModelList');if(!list)return;list.innerHTML='';
  D.apis.forEach(function(a,i){
    var el=document.createElement('div');el.className='mdi'+(a.id===D.activeApiId?' sel':'');
    var dot='<div class="mdi-dot" style="background:'+MC[i%MC.length]+'"></div>';
    var info='<div class="mdi-inf"><b>'+esc(a.name)+'</b><span>'+(a.type==='premium'?'⭐ Premium · ':'')+esc(a.model||'custom')+'</span></div>';
    var check=a.id===D.activeApiId?'<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:#3461C9;fill:none;stroke-width:2.5;flex-shrink:0"><polyline points="20 6 9 17 4 12"/></svg>':'';
    el.innerHTML=dot+info+check;
    el.addEventListener('click',function(){
      D.activeApiId=a.id;buildModelDrop();renderModeBar();setEngUI(a.name,'ok');renderStModelList();toast('Model AI: '+a.name);
    });
    list.appendChild(el);
  });
}

/* THEME */
function applyTheme(){
  document.body.classList.toggle('light',!S.dark);
  var td=$('tglDk');if(td)td.classList.toggle('on',S.dark);
}
function applyDesktopMode(){
  document.body.classList.toggle('desktop-mode',!!S.desktopMode);
  var t=$('tglDesktop');if(t)t.classList.toggle('on',!!S.desktopMode);
}

/* BRANDING */
function applyBranding(){
  var n=D.siteName||'Veyzen AI - Ops',ai=D.aiName||n,sb=D.subtitle||'AI cerdas multi-engine.';
  document.title=n;
  var map={stDisp:n,sbNm:n,hTl:ai,hSb:sb,htBar:ai+' · Multi-Engine'};
  Object.keys(map).forEach(function(id){var e=$(id);if(e)e.textContent=map[id];});
  buildModelDrop();
}

/* PROFILE */
function applyProfileAll(){
  var url=D.profileUrl,tp=D.profileType;
  var html=url?(tp==='video'?'<video src="'+url+'" autoplay muted loop playsinline></video>':'<img src="'+url+'" alt="">'):'<span>V</span>';
  ['sbLg','hLg'].forEach(function(id){var e=$(id);if(e)e.innerHTML=html;});
  var pp=$('ppv');if(pp)pp.innerHTML=html;
}
function aiAvEl(){
  var d=document.createElement('div');d.innerHTML=aiAv();return d.firstElementChild||d;
}
function aiAv(){
  var url=D.profileUrl,tp=D.profileType;
  if(url)return '<div class="av ai">'+(tp==='video'?'<video src="'+url+'" autoplay muted loop playsinline></video>':'<img src="'+url+'" alt="">')+'</div>';
  return '<div class="av ai" style="font-size:13px;font-weight:700">V</div>';
}

/* SIDEBAR/SETTINGS */
function openSB(){var sb=$('sb'),ov=$('ov');if(sb)sb.classList.add('on');if(ov)ov.classList.add('on');}
function closeSB(){var sb=$('sb'),ov=$('ov'),st=$('st');if(sb)sb.classList.remove('on');if(ov&&(!st||!st.classList.contains('on')))ov.classList.remove('on');}
function openST(){closeSB();closeStSub();var st=$('st'),ov=$('ov');if(st)st.classList.add('on');if(ov)ov.classList.add('on');renderUaInfo();}
function closeST(){var st=$('st'),ov=$('ov'),sb=$('sb');if(st)st.classList.remove('on');if(ov&&(!sb||!sb.classList.contains('on')))ov.classList.remove('on');}

/* USER INFO */
function renderUaInfo(){ /* tanpa login — tidak ada apapun untuk dirender */ }

/* HISTORY */
function renderHistory(q){
  q=q||'';var list=$('histL');if(!list)return;list.innerHTML='';
  var chats=S.chats.slice().reverse().filter(function(c){return !q||c.title.toLowerCase().indexOf(q)>=0;});
  if(!chats.length){list.innerHTML='<div class="sb-emp">'+(q?'Tidak ditemukan':'Belum ada riwayat')+'</div>';return;}
  chats.forEach(function(c){
    var el=document.createElement('div');el.className='hi'+(c.id===S.activeId?' cur':'');
    var date=c.ts?new Date(c.ts).toLocaleDateString('id',{weekday:'short'}):'';
    el.innerHTML='<h4>'+esc(c.title)+'</h4><p>'+esc(date)+'</p><div class="hi-acs"><button class="hi-b" data-act="pin">📌</button><button class="hi-b" data-act="del">✕</button></div>';
    el.addEventListener('click',function(e){
      var a=e.target.closest('[data-act]');
      if(a){if(a.dataset.act==='del'){S.chats=S.chats.filter(function(x){return x.id!==c.id;});if(S.activeId===c.id){S.activeId=null;mem=[];showHero();}svS();renderHistory(q);}else{c.pinned=!c.pinned;svS();renderHistory(q);}return;}
      restoreChat(c.id);closeSB();
    });
    list.appendChild(el);
  });
}

/* CHAT */
function showHero(){
  var ai=D.aiName||'Veyzen AI - Ops',sb=D.subtitle||'AI cerdas multi-engine.';
  var prf=D.profileUrl?(D.profileType==='video'?'<video src="'+D.profileUrl+'" autoplay muted loop playsinline></video>':'<img src="'+D.profileUrl+'" alt="">'):'<span style="font-size:26px;font-weight:800">V</span>';
  var cf=$('cf');if(!cf)return;
  cf.innerHTML='<div id="hero"><div class="h-lg" id="hLg">'+prf+'</div><h1 id="hTl">'+esc(ai)+'</h1><p id="hSb">'+esc(sb)+'</p>'+'<div class="pills">'+'<button class="pill" onclick="qp(\'Cara kerja AI modern\')">Cara kerja AI</button>'+'<button class="pill" onclick="qp(\'Buat kode Python kalkulator\')">Kode Python</button>'+'<button class="pill" onclick="qp(\'Caption Instagram keren\')">Caption IG</button>'+'<button class="pill" onclick="qp(\'Apa itu machine learning?\')">ML</button>'+'</div></div>';
}
function restoreChat(id){
  var c=S.chats.find(function(x){return x.id===id;});if(!c)return;
  S.activeId=id;mem=[];var cf=$('cf');if(cf)cf.innerHTML='';
  c.messages.forEach(function(m){addBub(m.role,m.text,null,false);if(S.mem)mem.push({role:m.role==='ai'?'assistant':'user',content:m.text});});
  renderHistory();scrBot();
}

/* ADD BUBBLE */
function addBub(role,text,media,anim){
  if(anim===undefined)anim=true;
  var hero=$('hero');if(hero)hero.remove();
  var feed=$('cf');if(!feed)return null;
  var isU=role==='user';
  var row=document.createElement('div');row.className='mr '+role;if(!anim)row.style.animation='none';
  var av=isU?('<div class="av user">'+(S.username||'K')[0].toUpperCase()+'</div>'):aiAv();
  var mH='';
  if(media){
    if(media.type==='image')mH='<div class="bm"><img src="'+media.url+'" loading="lazy" alt="">'+(media.downloadable?'<button class="img-dl" onclick="downloadImage(this,\''+media.url+'\',\''+esc(media.name||'veytrix-image.png')+'\')" style="border:none;cursor:pointer"><svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Unduh Gambar</button>':'')+'</div>';
    else if(media.type==='video')mH='<div class="bm"><video controls src="'+media.url+'"></video></div>';
    else mH='<div class="bfl"><div class="bfl-ic">'+fIcon(media.name)+'</div><div class="bfl-inf"><b>'+esc(media.name)+'</b><span>'+media.size+'</span></div></div>';
  }
  var content=isU?esc(text):fmt(text);
  var actions=!isU?'<div class="ma"><button class="ab" data-a="cp" title="Salin"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button><button class="ab" data-a="dl" title="Download"><svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button><button class="ab" data-a="sp" title="Suara"><svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg></button><button class="ab" data-a="lk" title="Suka"><svg viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/></svg></button><button class="ab" data-a="dk" title="Kurang sesuai"><svg viewBox="0 0 24 24"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7L2.34 12.7a2 2 0 0 0 2 2.3H10z"/></svg></button></div>':'';
  row.innerHTML=av+'<div class="bw"><div class="ms">'+(isU?(S.username||'Kamu'):(D.aiName||'Veyzen AI - Ops'))+'</div><div class="bb '+role+'">'+content+mH+'</div>'+actions+'</div>';
  if(!isU){
    row.querySelectorAll('.ab').forEach(function(b){
      b.addEventListener('click',function(){
        if(b.dataset.a==='cp')navigator.clipboard.writeText(text).then(function(){toast('Disalin!');});
        if(b.dataset.a==='dl'){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.download='veytrix-'+Date.now()+'.txt';a.click();toast('Diunduh!');}
        if(b.dataset.a==='sp')tts(text);
        if(b.dataset.a==='lk'){
          b.classList.add('liked');
          var dkb=b.parentElement.querySelector('[data-a="dk"]');if(dkb)dkb.classList.remove('disliked');
          toast('\ud83d\udc4d Terima kasih atas masukannya!');
        }
        if(b.dataset.a==='dk'){
          b.classList.add('disliked');
          var lkb=b.parentElement.querySelector('[data-a="lk"]');if(lkb)lkb.classList.remove('liked');
          openDislikeFeedback(text);
        }
      });
    });
  }
  feed.appendChild(row);scrBot();return row;
}


/* AI INFO LIST */
function renderAiInfoList(){
  var list=document.getElementById('aiInfoList');if(!list)return;list.innerHTML='';
  var items=D.aiInfoItems||[];
  if(!items.length){list.innerHTML='<div style="font-size:11.5px;color:var(--text3);padding:4px 0">Belum ada info tambahan</div>';return;}
  items.forEach(function(item,i){
    var el=document.createElement('div');
    el.style.cssText='display:flex;align-items:flex-start;gap:8px;padding:8px 11px;background:var(--surf3);border:1px solid var(--bdr);border-radius:9px';
    el.innerHTML='<div style="flex:1;font-size:12px;line-height:1.5">'+esc(item)+'</div>';
    var del=document.createElement('button');
    del.style.cssText='background:transparent;border:none;cursor:pointer;color:var(--text3);font-size:14px;flex-shrink:0;padding:0 2px';
    del.textContent='✕';
    del.addEventListener('click',function(){D.aiInfoItems.splice(i,1);D.aiInfo=D.aiInfoItems.join('\n');svD();renderAiInfoList();toast('Info dihapus');});
    el.appendChild(del);list.appendChild(el);
  });
}
function addAiInfo(){
  var inp=document.getElementById('aiInf');if(!inp)return;
  var val=inp.value.trim();if(!val){toast('Tulis info terlebih dahulu');return;}
  if(!D.aiInfoItems)D.aiInfoItems=[];
  D.aiInfoItems.push(val);
  D.aiInfo=D.aiInfoItems.join('\n');
  svD();renderAiInfoList();inp.value='';
  var suc=document.getElementById('aiSuc');if(suc){suc.classList.add('on');setTimeout(function(){suc.classList.remove('on');},2000);}
  toast('Info AI ditambahkan!');
}

/* PERSISTENT PINNED MEMORY */
var pinMem=[];
function loadPinMem(){try{var r=localStorage.getItem('pz_pin');if(r)pinMem=JSON.parse(r)||[];}catch(e){}}
function savePinMem(){try{localStorage.setItem('pz_pin',JSON.stringify(pinMem));}catch(e){}}
function addPinMem(text){
  if(!text)return;
  var entry={id:uid(),text:text,ts:Date.now()};
  pinMem.push(entry);savePinMem();renderPinMemList();
  addBub('ai','\ud83d\udccc **Memori tersimpan permanen!**\n"'+text+'"\n\nMemori ini akan selalu saya ingat di semua percakapan, bahkan setelah chat baru.',null);
  toast('\ud83d\udccc Memori disimpan!');
}
function renderPinMemList(){
  var list=document.getElementById('pinMemList');if(!list)return;list.innerHTML='';
  if(!pinMem.length){list.innerHTML='<div style="font-size:12px;color:var(--text3);padding:4px 0">Belum ada memori tersimpan</div>';return;}
  pinMem.slice().reverse().forEach(function(m,ri){
    var i=pinMem.length-1-ri;
    var el=document.createElement('div');
    el.style.cssText='display:flex;align-items:flex-start;gap:8px;padding:8px 11px;background:var(--surf2);border:1px solid var(--bdr);border-radius:10px;margin-bottom:6px';
    var d=new Date(m.ts).toLocaleDateString('id');
    el.innerHTML='<div style="flex:1"><div style="font-size:12.5px;line-height:1.5">'+esc(m.text)+'</div><div style="font-size:10px;color:var(--text3);margin-top:3px">'+d+'</div></div>';
    var del=document.createElement('button');
    del.style.cssText='background:transparent;border:none;cursor:pointer;color:var(--text3);font-size:14px;flex-shrink:0';
    del.textContent='✕';
    del.addEventListener('click',function(){pinMem.splice(i,1);savePinMem();renderPinMemList();toast('Memori dihapus');});
    el.appendChild(del);list.appendChild(el);
  });
}
function getPinMemContext(){
  if(!pinMem.length)return'';
  return '\nMEMORI PERMANEN (SELALU INGAT):\n'+pinMem.map(function(m){return '- '+m.text;}).join('\n')+'\n';
}
function checkSaveMemRequest(txt){
  var lo=txt.toLowerCase();
  var kw=['simpan memori','ingat ini','save memori','catat ini','ingat selamanya','simpan ini','jadikan memori'];
  return kw.some(function(k){return lo.indexOf(k)>=0;});
}

/* PREMIUM WELCOME */
function showPremiumWelcome(name){
  var hero=document.getElementById('hero');if(hero)hero.remove();
  var feed=document.getElementById('cf');if(!feed)return;
  var row=document.createElement('div');row.className='mr ai';
  row.innerHTML=aiAv()+'<div class="bw"><div class="ms">'+esc(D.aiName||'Veyzen AI - Ops')+'</div><div class="bb ai"><div style="padding:4px 0"><div style="font-size:20px;margin-bottom:8px">\u2728 Selamat bergabung di Premium, '+esc(name||'Pengguna')+'! \u2728</div><div style="font-size:13.5px;line-height:1.7;color:var(--text2)">Akun kamu sekarang sudah <b style=\"color:#fbbf24\">Premium \u2b50</b>.<br><br>Kamu mendapatkan:<br>\u2705 <b>Tanpa limit chat</b><br>\u2705 <b>AI privat — tidak akan pernah mati</b><br>\u2705 <b>Model premium eksklusif</b><br>\u2705 <b>Prioritas server tercepat</b><br><br>Terima kasih telah mempercayai Veyzen AI - Ops! \ud83d\ude80</div></div></div></div>';
  feed.appendChild(row);scrBot();
}

/* WEB SPEECH VOICES */
var allVoices=[];function loadVoices(){allVoices=window.speechSynthesis?window.speechSynthesis.getVoices():[];if(allVoices.length&&document.getElementById('voiceSel'))populateVoiceSel();}
if(window.speechSynthesis){window.speechSynthesis.onvoiceschanged=loadVoices;setTimeout(loadVoices,300);}
function populateVoiceSel(){
  var grp=document.getElementById('nativeVoiceGroup');if(!grp)return;
  grp.innerHTML='';
  var voices=window.speechSynthesis?window.speechSynthesis.getVoices():[];
  if(!voices.length){var o=document.createElement('option');o.value='_none';o.text='Memuat...';grp.appendChild(o);setTimeout(populateVoiceSel,500);return;}
  var seen={};
  voices.forEach(function(v,i){
    // Skip duplicate names
    if(seen[v.name])return;seen[v.name]=true;
    var o=document.createElement('option');
    o.value='native:'+i;
    var isFemale=v.name.match(/female|woman|girl|zira|hazel|susan|linda|karen|moira|fiona|samantha|victoria/i);
    var gender=isFemale?'\u2640\ufe0f':'\u2642\ufe0f';
    // Clean name: remove "Microsoft","Google","Apple","(Natural)"
    var cleanName=v.name.replace(/Microsoft |Google |Apple |\(Natural\)/gi,'').trim();
    if(cleanName.length>26)cleanName=cleanName.slice(0,26)+'…';
    o.text=gender+' '+cleanName+' · '+v.lang;
    if(D.ttsVoice===('native:'+i))o.selected=true;
    grp.appendChild(o);
  });
  var sel=document.getElementById('voiceSel');
  if(sel&&D.ttsVoice)sel.value=D.ttsVoice;
}

/* SETTINGS SUB PAGES */
var curStSub=null;
function openStSub(name){
  curStSub=name;
  document.querySelectorAll('.st-sub').forEach(function(s){s.classList.remove('on');});
  var sub=document.getElementById('stSub-'+name);
  if(sub){sub.classList.add('on');}
  // Load dynamic content
  if(name==='model'){renderStModelList();renderModeDescList();}
  if(name==='memory'){renderPinMemList();}
  if(name==='persona'){var aiss=document.getElementById('aiStyleSel');if(aiss)aiss.value=D.aiStyle||'original';}
  if(name==='rating'){renderRatingList();initRatingStars();if(U.loggedIn)loadMyRating();}
  if(name==='links')renderSettingsLinks();
  if(name==='voice')populateVoiceSel();
  if(name==='workspace'){var ws=document.querySelectorAll('.ws-item');ws.forEach(function(el){el.classList.toggle('sel',el.dataset.ws===(D.workspace||'personal'));});}
  if(name==='premium'){loadPremiumPrices();}
}
function closeStSub(){
  document.querySelectorAll('.st-sub').forEach(function(s){s.classList.remove('on');});
  curStSub=null;
}

function setWorkspace(ws,el){
  D.workspace=ws;svD();
  document.querySelectorAll('.ws-item').forEach(function(e){e.classList.toggle('sel',e.dataset.ws===ws);});
  toast('Workspace: '+ws);
}
function renderModeDescList(){
  var list=document.getElementById('modeDescList');if(!list)return;list.innerHTML='';
  var modes=getModes();
  modes.forEach(function(m){
    var el=document.createElement('div');
    var isActive=S.mode===m.id;
    el.style.cssText='display:flex;align-items:center;gap:12px;padding:12px 14px;border:1.5px solid '+(isActive?'var(--dv)':'var(--bdr)')+';border-radius:13px;cursor:pointer;background:'+(isActive?'rgba(52,97,201,.06)':'transparent');
    el.innerHTML='<div style="width:34px;height:34px;border-radius:9px;background:var(--surf3);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--text2)">'+(MODE_SVG[m.id]||'').replace('13px','17px')+'</div><div style="flex:1"><b style="font-size:13.5px">'+esc(m.label)+'</b><div style="font-size:11.5px;color:var(--text3);margin-top:2px">'+esc(m.prompt.slice(0,80))+'</div></div>'+(isActive?'<svg viewBox="0 0 24 24" style="width:16px;stroke:#3461C9;fill:none;stroke-width:2.5;flex-shrink:0"><polyline points="20 6 9 17 4 12"/></svg>':'');
    el.addEventListener('click',function(){S.mode=m.id;svS();renderModeDescList();renderModeBar();toast(m.icon+' Mode: '+m.label);});
    list.appendChild(el);
  });
}

/* ════════════════════════════════════════════════
   RANDOM IMAGE ENGINE
   - Rotate URLs agar tidak monoton
   - Track used images per session (dedup)
   - Fallback otomatis ke URL berikutnya jika gagal
════════════════════════════════════════════════ */
var _usedImgUrls = {}; /* {type: Set of used image URLs} */

function getNextRandomUrl(type){
  var cat = D.randomApis && D.randomApis[type];
  if(!cat||!cat.urls||!cat.urls.length) return null;
  var urls = cat.urls.filter(function(u){return u&&u.trim();});
  if(!urls.length) return null;
  if(!_usedImgUrls[type]) _usedImgUrls[type] = new Set();
  var used = _usedImgUrls[type];
  /* Reset if all used */
  if(used.size >= urls.length) used.clear();
  /* Find unused */
  for(var i=0;i<urls.length;i++){
    if(!used.has(urls[i])) return urls[i];
  }
  return urls[0];
}

function detectCountry(txt){
  var t = txt.toLowerCase();
  var map = {
    indonesia:'Indonesia', korea:'Korea', malaysia:'Malaysia',
    thailand:'Thailand', japan:'Japan', jepang:'Japan',
    china:'China', vietnam:'Vietnam', filipina:'Philippines',
    philippines:'Philippines', singapura:'Singapore',
    singapore:'Singapore', india:'India'
  };
  for(var k in map){ if(t.includes(k)) return map[k]; }
  return '';
}

function fetchRandomImage(type, country){
  var cat = D.randomApis&&D.randomApis[type];
  if(!cat||!cat.active) return Promise.resolve({error:'Fitur '+type+' belum diaktifkan developer'});
  var baseUrl = getNextRandomUrl(type);
  if(!baseUrl) return Promise.resolve({error:'URL belum dikonfigurasi developer untuk '+cat.name});
  var url = baseUrl;
  if(cat.hasCountry && country) url = url + encodeURIComponent(country);
  /* Add cache-busting to avoid stale responses */
  url += (url.includes('?')?'&':'?')+'_t='+Date.now();
  return fwt(url, 20000)
    .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
    .then(function(data){
      /* Nanzz/various API formats */
      var res = data.result||data.data||data;
      var imgUrl = null;
      /* Case 1: result is directly a URL string */
      if(typeof res==='string'&&(res.startsWith('http')||res.startsWith('/'))) imgUrl=res;
      /* Case 2: result is object with image fields */
      if(!imgUrl&&res&&typeof res==='object'){
        imgUrl=res.image_url||res.image||res.url||res.link||res.photo||res.img||res.src||null;
        /* Sometimes nested: result.data.url */
        if(!imgUrl&&res.data) imgUrl=res.data.url||res.data.image||null;
      }
      /* Case 3: top-level image field */
      if(!imgUrl) imgUrl=data.image||data.url||data.img||null;
      if(!imgUrl) throw new Error('Format respons tidak dikenal — cek URL API di Panel Dev');
      /* Track used */
      if(!_usedImgUrls[type]) _usedImgUrls[type] = new Set();
      _usedImgUrls[type].add(baseUrl);
      return {imageUrl: imgUrl, country: country||'', catName: cat.name, emoji: cat.emoji||''};
    })
    .catch(function(err){
      /* Mark this URL as used/failed, try next */
      if(!_usedImgUrls[type]) _usedImgUrls[type] = new Set();
      _usedImgUrls[type].add(baseUrl);
      /* Try next if available */
      var urls = (cat.urls||[]).filter(function(u){return u&&u.trim();});
      var remaining = urls.filter(function(u){return !_usedImgUrls[type].has(u);});
      if(remaining.length > 0){
        return fetchRandomImage(type, country); /* recursive retry */
      }
      return {error: err.message};
    });
}

function showRandomImageResult(data, type){
  var feed=$('cf'); if(!feed) return;
  if(data.error){
    addBub('ai', '**Gagal mengambil gambar.**\n\n'+data.error, null);
    return;
  }
  var row=document.createElement('div'); row.className='mr ai';
  var cat = D.randomApis&&D.randomApis[type];
  var label = (cat&&cat.emoji?cat.emoji+' ':'')+((cat&&cat.name)||type);
  var ctry = data.country ? ' \u2022 '+data.country : '';
  row.innerHTML = aiAv()+'<div class="bw">'
    +'<div class="ms">'+esc(D.aiName||'Veyzen AI - Ops')+' \u00b7 '+esc(label)+esc(ctry)+'</div>'
    +'<div class="bb ai rand-img-bb">'
    +'<img src="'+esc(data.imageUrl)+'" class=\"rand-img\" onclick=\"openLightbox(this.src)\" loading="lazy">'
    +'<div style="display:flex;gap:8px;margin-top:10px">'
    +'<button class="dl-btn" style="flex:1" onclick="downloadMedia(this,\''+esc(data.imageUrl)+'\',\'img\')">'
    +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="pointer-events:none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Simpan</button>'
    +'<button class="dl-btn" style="flex:1;background:var(--surf3);color:var(--text);border:1px solid var(--bdr)" onclick="triggerRandomImage(\''+type+'\',\''+esc(data.country||'')+'\',this)">'
    +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="pointer-events:none"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>Lagi</button>'
    +'</div></div></div>';
  feed.appendChild(row); scrBot();
}

function triggerRandomImage(type, country, btn){
  var cat = D.randomApis&&D.randomApis[type];
  if(!cat) return;
  if(btn){ btn.disabled=true; btn.textContent='Mengambil...'; }
  fetchRandomImage(type, country||'').then(function(data){
    if(btn){ btn.disabled=false; btn.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="pointer-events:none"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>Lagi'; }
    showRandomImageResult(data, type);
  });
}

/* Detect random image intent from user message */
function detectRandomIntent(txt){
  /* WAJIB pakai keyword eksplisit: .random gambar [kategori] */
  var m = txt.match(/\.random\s*gambar\s*:?\s*(.*)/i);
  if(!m) return null;
  var kategori = (m[1]||'').trim().toLowerCase();
  var map = {
    'wibu':'waifu','waifu':'waifu','anime':'waifu',
    'cecan':'cecan','cewe':'cecan','cewek':'cecan',
    'pap':'pap','meme':'meme',
    'meme presiden':'memepres','presiden':'memepres',
    'wallpaper':'wallpaper','walpaper':'wallpaper'
  };
  /* Cari kategori yang cocok (partial match) */
  var foundType=null;
  for(var key in map){
    if(kategori.includes(key)){foundType=map[key];break;}
  }
  if(!foundType){
    /* Tanpa kategori spesifik -> tampilkan pilihan */
    return {type:'__menu__',country:''};
  }
  var country = foundType==='cecan' ? detectCountry(kategori) : '';
  return {type:foundType, country:country};
}


/* ════ TIKTOK SEARCH ENGINE ════ */
function detectTikTokSearch(txt){
  var t = txt.toLowerCase();
  var m = t.match(/(?:search\s+tiktok|cari\s+tiktok|tiktok\s+search|tiktok\s+cari)[:\s]+(.+)/);
  if(m) return m[1].trim();
  return null;
}

function runTikTokSearch(query){
  var feed=$('cf'); if(!feed) return;
  var cfg = D.searchApis&&D.searchApis.tiktok;
  if(!cfg||!cfg.active||!cfg.url){
    addBub('ai','**TikTok Search belum dikonfigurasi.**\n\nAktifkan di Panel Dev \u2192 Pencarian.', null);
    return;
  }
  /* Show loading */
  var lr=document.createElement('div'); lr.className='mr ai'; lr.id='_ttLoad';
  lr.innerHTML=aiAv()+'<div class="bw"><div class="ms">'+esc(D.aiName||'Veyzen AI - Ops')+' \u00b7 TikTok Search</div>'
    +'<div class="bb ai"><div class="quick-think" style="display:flex;align-items:center;gap:6px">'
    +'<svg viewBox="0 0 24 24" style="width:12px;height:12px" fill="none" stroke="#f00" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
    +'Mencari "'+esc(query)+'" di TikTok...</div>'
    +'<div class="td"><span></span><span></span><span></span></div></div></div>';
  feed.appendChild(lr); scrBot();
  var lim = cfg.limit||5;
  var url = cfg.url+encodeURIComponent(query)+'&limit='+lim;
  fwt(url, 20000)
    .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
    .then(function(data){
      var el=$('_ttLoad'); if(el) el.remove();
      if(!data.status&&!data.result) throw new Error('API error');
      var res=data.result||data;
      var videos=res.videos||res.data||[];
      if(!videos.length) throw new Error('Tidak ada hasil untuk "'+query+'"');
      showTikTokResults(query, videos, res.hasMore||false);
    })
    .catch(function(err){
      var el=$('_ttLoad'); if(el) el.remove();
      addBub('ai','**Gagal mencari TikTok.** '+err.message, null);
    });
}

function showTikTokResults(query, videos, hasMore){
  var feed=$('cf'); if(!feed) return;
  var row=document.createElement('div'); row.className='mr ai';
  var inn='<div class="bw"><div class="ms">'+esc(D.aiName||'Veyzen AI - Ops')+' \u00b7 TikTok Search</div>'
    +'<div class="bb ai" style="padding:0;overflow:hidden;border-radius:16px">'
    +'<div style="padding:12px 14px;border-bottom:1px solid var(--bdr)">'
    +'<span style="font-size:12px;color:var(--text2)">Hasil pencarian: </span>'
    +'<b style="font-size:13px;color:var(--text)">'+esc(query)+'</b></div>';
  videos.slice(0,5).forEach(function(v){
    var cover=v.cover||v.thumbnail||'';
    var desc=(v.description||v.desc||'').slice(0,90);
    var author=(v.author&&(v.author.nickname||v.author.username))||v.username||'';
    var likes=v.likes||0; var views=v.views||0;
    var vidUrl=v.video_url||v.download_url||'';
    var postUrl=v.post_url||'#';
    function fmtNum(n){ return n>1000000?(n/1000000).toFixed(1)+'M':n>1000?(n/1000).toFixed(1)+'K':String(n);}
    inn+='<div class="tt-card">'
      +(cover?'<div class="tt-cover" onclick="window.open(\''+esc(postUrl)+'\',\'_blank\')" style="cursor:pointer"><img src="'+esc(cover)+'" loading="lazy"></div>':'')
      +'<div class="tt-info">'
      +(author?'<div class="tt-author">@'+esc(author)+'</div>':'')
      +(desc?'<div class="tt-desc">'+esc(desc)+(v.description&&v.description.length>90?'...':'')+'</div>':'')
      +'<div class="tt-stats">'
      +'<span>\u2665 '+fmtNum(likes)+'</span>'
      +'<span>\uD83D\uDC41 '+fmtNum(views)+'</span>'
      +(v.shares?'<span>\u21A6 '+fmtNum(v.shares)+'</span>':'')
      +'</div>'
      +'<div style="display:flex;gap:6px;margin-top:8px">'
      +(postUrl&&postUrl!=='#'?'<button class="tt-btn" onclick="window.open(\''+esc(postUrl)+'\',\'_blank\')">Lihat</button>':'')
      +(vidUrl?'<button class="tt-btn tt-dl" onclick="downloadMedia(this,\''+esc(vidUrl)+'\',\'tt\')">Download</button>':'')
      +'</div>'
      +'</div></div>';
  });
  if(hasMore) inn+='<div style="padding:10px;text-align:center;font-size:11.5px;color:var(--text3)">+ lebih banyak hasil tersedia</div>';
  inn+='</div></div>';
  row.innerHTML=aiAv()+inn;
  feed.appendChild(row); scrBot();
}

/* LANGUAGE SYSTEM */
var LANG = 'id'; /* 'id' = Indonesia, 'en' = English */
var T = {
  id:{
    title:'Veyzen AI - Ops', sub:'Asisten AI Cerdas Multi-Engine',
    placeholder:'Tanya apa saja...', send:'Kirim',
    speed_label:'KECEPATAN SERVER', lang_label:'PILIH BAHASA',
    welcome:'Selamat Datang', continue_btn:'MULAI SEKARANG',
    online:'ONLINE', checking:'MENGECEK...',
    fast_label:'RESPON CEPAT', secure_label:'AMAN & TERENKRIPSI',
    multiengine:'MULTI-ENGINE AI',
    waifu_trigger:['waifu','anime waifu','random waifu','foto anime','gambar anime'],
    cecan_trigger:['cecan','cewek cantik','foto cewek','random cecan','cewe cantik'],
    dl_trigger:['download','unduh','simpan video','dl '],
    search_trigger:['search tiktok','cari tiktok','tiktok search'],
    theme_trigger:['tiktok tema','cari video','tema tiktok','wallpaper tiktok'],
    blacken_trigger:['hitamkan','jadiin hitam','to black','foto hitam'],
    thinking:'Sedang berpikir...',
  },
  en:{
    title:'Veyzen AI - Ops', sub:'Smart Multi-Engine AI Assistant',
    placeholder:'Ask anything...', send:'Send',
    speed_label:'SERVER SPEED', lang_label:'CHOOSE LANGUAGE',
    welcome:'Welcome', continue_btn:'GET STARTED',
    online:'ONLINE', checking:'CHECKING...',
    fast_label:'FAST RESPONSE', secure_label:'SAFE & ENCRYPTED',
    multiengine:'MULTI-ENGINE AI',
    waifu_trigger:['waifu','anime waifu','random waifu','anime girl','anime photo'],
    cecan_trigger:['cecan','pretty girl','cute girl','random girl'],
    dl_trigger:['download','save video','dl '],
    search_trigger:['search tiktok','find tiktok','tiktok search'],
    theme_trigger:['tiktok theme','search video','theme tiktok','wallpaper tiktok'],
    blacken_trigger:['blacken','make black','black photo','to black'],
    thinking:'Thinking...',
  }
};
function t(key){ return (T[LANG]&&T[LANG][key])||T['id'][key]||key; }
function setLang(lang){
  LANG=lang;
  try{localStorage.setItem('pz_lang',lang);}catch(e){}
  /* Update UI text */
  var pt=$('pt');if(pt)pt.placeholder=t('placeholder');
  var sd=$('stDisp');if(sd)sd.textContent=D.siteName||t('title');
}

/* BLACKEN IMAGE TOOL */
function isBlackenRequest(txt){
  /* WAJIB pakai keyword eksplisit: .Ireng */
  return /\.ireng\b/i.test(txt);
}
function runBlackenImage(imageUrl){
  var feed=$('cf');if(!feed)return;
  var cfg=D.blackenApi;
  if(!cfg||!cfg.active||!cfg.url){addBub('ai','Tool hitamkan belum dikonfigurasi di Panel Dev.',null);return;}
  var lr=document.createElement('div');lr.className='mr ai';lr.id='_blkLoad';
  lr.innerHTML=aiAv()+'<div class="bw"><div class="ms">'+esc(D.aiName||'Veyzen AI - Ops')+' · Foto Hitam</div><div class="bb ai"><div class="quick-think">Menghitamkan gambar...</div><div class="td"><span></span><span></span><span></span></div></div></div>';
  feed.appendChild(lr);scrBot();
  var apiUrl=cfg.url+encodeURIComponent(imageUrl)+'&_t='+Date.now();
  fwt(apiUrl,30000)
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
    .then(function(data){
      var el=$('_blkLoad');if(el)el.remove();
      var res=data.result||data.data||data;
      var imgUrl=null;
      if(typeof res==='string'&&res.startsWith('http'))imgUrl=res;
      else if(res&&typeof res==='object')imgUrl=res.url||res.image||res.result||null;
      if(!imgUrl)throw new Error('Format respons tidak dikenal');
      showRandomImageResult({imageUrl:imgUrl,country:'',catName:'Foto Hitam',emoji:'■'},'■');
    })
    .catch(function(err){var el=$('_blkLoad');if(el)el.remove();addBub('ai','Gagal menghitamkan: '+err.message,null);});
}

function isTikTokThemeRequest(txt){
  var triggers=t('theme_trigger');
  var lo=txt.toLowerCase();
  return triggers.some(function(k){return lo.includes(k);});
}
function extractTikTokTheme(txt){
  var lo=txt.toLowerCase();
  var m=lo.match(/(?:tiktok tema|cari video|tema tiktok|wallpaper tiktok|tiktok theme|search video|theme tiktok)[:\s]+(.+)/);
  if(m)return m[1].trim();
  /* Fallback: remove trigger words and use rest */
  return lo.replace(/tiktok tema|cari video|tema tiktok|tiktok theme|search video/gi,'').trim()||'trending';
}
function runTikTokThemeSearch(query, limit){
  var feed=$('cf');if(!feed)return;
  var cfg=D.tiktokThemeApi;
  if(!cfg||!cfg.active||!cfg.url){addBub('ai','TikTok Theme Search belum diaktifkan.',null);return;}
  var lim=limit||cfg.limit||3;
  var lr=document.createElement('div');lr.className='mr ai';lr.id='_ttThLoad';
  lr.innerHTML=aiAv()+'<div class="bw"><div class="ms">'+esc(D.aiName||'Veyzen AI - Ops')+' · TikTok Tema</div>'
    +'<div class="bb ai"><div class="quick-think">Mencari tema "'+esc(query)+'"...</div>'
    +'<div class="td"><span></span><span></span><span></span></div></div></div>';
  feed.appendChild(lr);scrBot();
  var url=cfg.url+encodeURIComponent(query)+'&limit='+lim+'&_t='+Date.now();
  fwt(url,20000)
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
    .then(function(data){
      var el=$('_ttThLoad');if(el)el.remove();
      if(!data.status&&!data.result)throw new Error('API error');
      var res=data.result||data;var videos=res.videos||res.data||[];
      if(!videos.length)throw new Error('Tidak ada video untuk tema "'+query+'"');
      showTikTokResults(query,videos,res.hasMore||false);
    })
    .catch(function(err){var el=$('_ttThLoad');if(el)el.remove();addBub('ai','Gagal mencari: '+err.message,null);});
}

/* MEDIA DOWNLOADER ENGINE */
function parseDownloaderResponse(data,apiName){
  if(!data||typeof data!=='object')return null;
  var res=data.result||data.data||data;
  if(!res)return null;
  var out={platform:apiName,
    title:res.caption||res.title||res.description||'',
    author:res.author||res.creator||res.username||res.channel||'',
    thumbnail:res.thumbnail||res.cover||res.thumb||res.image||'',
    videos:[],audios:[],images:[],hashtags:[]};
  ['video_tanpa_watermark','video_hd','video','video_url','download_url','mp4','hd','sd'].forEach(function(k){
    if(res[k]&&typeof res[k]==='string'&&res[k].startsWith('http'))
      out.videos.push({label:k.replace(/_/g,' ').toUpperCase(),url:res[k]});
  });
  if(Array.isArray(res.videos))res.videos.forEach(function(v){
    var u=v.url||v;if(typeof u==='string'&&u.startsWith('http'))out.videos.push({label:'Video',url:u});
  });
  ['audio_mp3','audio','mp3','audio_url'].forEach(function(k){
    if(res[k]&&typeof res[k]==='string'&&res[k].startsWith('http'))
      out.audios.push({label:'Audio MP3',url:res[k]});
  });
  if(Array.isArray(res.images))res.images.forEach(function(img){
    var u=img.url||img;if(typeof u==='string'&&u.startsWith('http'))out.images.push(u);
  });
  if(res.photo&&res.photo.startsWith('http'))out.images.push(res.photo);
  if(out.title){var tags=out.title.match(/#\w+/g);if(tags)out.hashtags=tags.slice(0,8);}
  return(out.videos.length||out.audios.length||out.images.length)?out:null;
}
function detectDownloaderApi(url){
  var u=url.toLowerCase();
  var apis=(D.downloaderApis||[]).filter(function(a){return a.active&&a.url;});
  for(var i=0;i<apis.length;i++){
    if((apis[i].platforms||[]).some(function(p){return u.includes(p);}))return apis[i];
  }
  return null;
}
function isDownloadRequest(txt){
  return /https?:\/\/[^\s]+/.test(txt)&&/download|unduh|simpan|save\s|dl\s|tiktok|instagram|youtube|pinterest|facebook|fb\.watch/i.test(txt);
}
function extractUrl(txt){var m=txt.match(/https?:\/\/[^\s"'<>]+/);return m?m[0]:null;}
function runDownloader(url,apiObj){
  var feed=$('cf');if(!feed)return;
  var lr=document.createElement('div');lr.className='mr ai';lr.id='_dlLoad';
  lr.innerHTML=aiAv()+'<div class="bw"><div class="ms">'+esc(D.aiName||'Veyzen AI - Ops')+' \u00b7 Downloader</div>'
    +'<div class="bb ai"><div class="quick-think" style="display:flex;align-items:center;gap:6px">'
    +'<svg viewBox="0 0 24 24" style="width:12px;height:12px;flex-shrink:0" fill="none" stroke="#3461C9" stroke-width="2">'
    +'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'
    +'</svg>Mengunduh dari '+esc(apiObj.name)+'...</div>'
    +'<div class="td"><span></span><span></span><span></span></div></div></div>';
  feed.appendChild(lr);scrBot();
  fwt(apiObj.url+encodeURIComponent(url),30000)
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
    .then(function(data){
      var el=$('_dlLoad');if(el)el.remove();
      var res=parseDownloaderResponse(data,apiObj.name);
      if(!res)throw new Error('Format respons tidak dikenali');
      showDownloadResult(res);
    })
    .catch(function(err){
      var el=$('_dlLoad');if(el)el.remove();
      addBub('ai','**Gagal mengunduh.** '+err.message+'\n\nPastikan link valid dan API '+apiObj.name+' aktif di Panel Dev.',null);
    });
}
function showDownloadResult(res){
  var feed=$('cf');if(!feed)return;
  var row=document.createElement('div');row.className='mr ai';
  var inn='<div class="bw"><div class="ms">'+esc(D.aiName||'Veyzen AI - Ops')+' \u00b7 '+esc(res.platform)+'</div>'
    +'<div class="bb ai" style="max-width:420px">';
  if(res.thumbnail)inn+='<img src="'+esc(res.thumbnail)+'" style="width:100%;border-radius:12px;margin-bottom:10px;max-height:220px;object-fit:cover" loading="lazy">';
  if(res.author)inn+='<div style="font-size:12px;color:var(--text2);margin-bottom:4px">\uD83D\uDC64 '+esc(res.author)+'</div>';
  if(res.title){var st=res.title.length>140?res.title.slice(0,140)+'...':res.title;inn+='<div style="font-size:12.5px;color:var(--text);margin-bottom:8px;line-height:1.5">'+esc(st)+'</div>';}
  if(res.hashtags.length)inn+='<div style="font-size:11px;color:var(--dv);margin-bottom:10px">'+res.hashtags.join(' ')+'</div>';
  res.videos.forEach(function(v,i){
    inn+='<button class="dl-btn" onclick="downloadMedia(this,\''+esc(v.url)+'\',\'vid\')">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'
      +'Download '+esc(v.label)+'</button>';
  });
  res.audios.forEach(function(a){
    inn+='<button class="dl-btn dl-audio" onclick="downloadMedia(this,\''+esc(a.url)+'\',\'audio\')">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>'
      +'Download Audio MP3</button>';
  });
  if(res.images.length){
    inn+='<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">';
    res.images.slice(0,9).forEach(function(imgUrl,i){
      inn+='<div style="position:relative;width:calc(33% - 4px)">'
        +'<img src="'+esc(imgUrl)+'" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;cursor:pointer" onclick="openLightbox(this.src)" loading="lazy">'
        +'<button class="dl-btn-sm" onclick="downloadMedia(this,\''+esc(imgUrl)+'\',\'img\')">DL</button></div>';
    });
    inn+='</div>';
  }
  inn+='</div></div>';
  row.innerHTML=aiAv()+inn;
  feed.appendChild(row);scrBot();
}
function downloadMedia(btn,url,name){downloadImage(btn,url,'veyzen-'+name+'-'+Date.now());}

/* DISLIKE FEEDBACK */
function openDislikeFeedback(msgText){
  var reason=prompt('Apa yang kurang sesuai dari jawaban ini? (opsional)');
  var fb={text:(msgText||'').slice(0,200),reason:reason||'',time:Date.now()};
  try{
    var all=JSON.parse(localStorage.getItem('pz_feedback')||'[]');
    all.push(fb);
    if(all.length>100)all=all.slice(-100);
    localStorage.setItem('pz_feedback',JSON.stringify(all));
  }catch(e){}
  toast('Masukan diterima, terima kasih! \ud83d\ude4f');
}

/* WELCOME GATE \u2014 first-visit & 30-day-return detection + anti-bot friction */


/* USER PROFILE */
function openProfileModal(){
  var m=document.getElementById('profileModal');if(!m)return;
  var n=document.getElementById('profName'),em=document.getElementById('profEmail'),ag=document.getElementById('profAge'),av=document.getElementById('profAvBig');
  if(n)n.value=U.name||'';
  if(em)em.value=U.email||'';
  if(ag)ag.value=U.age||'';
  if(av)av.innerHTML=U.pic?'<img src="'+U.pic+'" style="width:100%;height:100%;object-fit:cover">':esc((U.name||'U')[0].toUpperCase());
  var pb=document.getElementById('premBadgeProf');if(pb)pb.style.display=U.premium?'block':'none';
  m.style.display='flex';
}
function saveProfile(){
  var n=document.getElementById('profName'),em=document.getElementById('profEmail'),ag=document.getElementById('profAge');
  var name=(n&&n.value.trim())||U.name;
  var email=(em&&em.value.trim())||U.email;
  var age=(ag&&ag.value)||U.age;
  if(!name){toast('Nama tidak boleh kosong');return;}
  U.name=name;U.email=email;U.age=age;
  svU();saveUserToDev();renderUaInfo();
  var m=document.getElementById('profileModal');if(m)m.style.display='none';
  toast('Profil disimpan!');
}

/* STOP GENERATION */
var SEND_ICON='<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
var STOP_ICON='<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>';
function setBtnSdState(running){var b=$('btnSd');if(!b)return;b.innerHTML=running?STOP_ICON:SEND_ICON;b.classList.toggle('stop-mode',running);b.style.opacity='1';}
function stopGeneration(){
  userAborted=true;
  if(currentAbortCtrl){try{currentAbortCtrl.abort();}catch(e){}}
  busy=false;
  var tr=$('_tr');if(tr)tr.remove();
  document.querySelectorAll('.think-box').forEach(function(b){var row=b.closest('.mr');if(row)row.remove();});
  setBtnSdState(false);
  toast('Dihentikan.');
}

/* THINKING PANEL */
var THINK_STEPS_FAST=['Memproses pertanyaan...','Menyusun jawaban...','Memverifikasi akurasi...'];
var THINK_STEPS_DEEP=['Memahami konteks secara menyeluruh...','Memecah masalah ke sub-komponen...','Menganalisis pendekatan pertama...','Menganalisis pendekatan alternatif...','Membandingkan trade-off...','Memvalidasi logika dan edge-case...','Menyusun struktur jawaban...','Review dan optimasi...'];
var THINK_STEPS_EXPERT=['Parsing konteks multi-layer...','Mengidentifikasi asumsi tersembunyi...','Dekomposisi ke level fundamental...','Hipotesis #1: pendekatan langsung...','Hipotesis #2: pendekatan alternatif...','Hipotesis #3: non-konvensional...','Cross-validasi antar hipotesis...','Mencari counter-argument...','Stress-testing solusi terpilih...','Optimasi akurasi dan kelengkapan...','Verifikasi konsistensi internal...','Menyusun respons level ahli...'];
var THINK_STEPS=THINK_STEPS_DEEP;
var THINK_STEPS_THINKMODE=['Memahami pertanyaan...','Menimbang pertimbangan penting...','Menyiapkan jawaban...'];
function getThinkSteps(){
  if(S.mode==='expert')return THINK_STEPS_EXPERT;
  if(S.mode==='deep')return THINK_STEPS_DEEP;
  if(S.mode==='think')return THINK_STEPS_THINKMODE;
  return THINK_STEPS_FAST;
}
function showThinking(){
  var feed=$('cf');if(!feed)return null;
  var hero=$('hero');if(hero)hero.remove();
  var isEx=S.mode==='expert',isDp=S.mode==='deep';
  var mc=isEx?'#f59e0b':isDp?'#2D52B0':'#3461C9';
  var ml=isEx?'Analisis Mendalam':isDp?'Berpikir Dalam':'Berpikir';
  var steps=getThinkSteps();
  var brainSvg='<svg viewBox="0 0 24 24" style="width:12px;height:12px;flex-shrink:0" fill="none" stroke="'+mc+'" stroke-width="2"><path d="M9.5 2A5.5 5.5 0 0 0 4 7.5c0 1.4.5 2.6 1.4 3.6L7 13v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3l1.6-1.9A5.5 5.5 0 0 0 14.5 2"/><line x1="9" y1="21" x2="15" y2="21"/></svg>';
  var doneSvg='<svg viewBox="0 0 24 24" style="width:12px;height:12px;flex-shrink:0" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
  var row=document.createElement('div');row.className='mr ai';
  row.innerHTML=aiAv()+'<div class="bw"><div class="think-box open" id="_thb" style="border-color:'+mc+'33">'
    +'<div class="think-hd" id="_thh" style="gap:7px">'+brainSvg
    +'<span id="_thl" style="font-size:11.5px;font-weight:600;color:'+mc+'">'+ml+'...</span>'
    +'<div id="_thDots" style="display:flex;gap:3px;margin-left:auto;margin-right:4px">'
    +'<span style="width:3.5px;height:3.5px;border-radius:50%;background:'+mc+';animation:tp .9s ease-in-out infinite 0s"></span>'
    +'<span style="width:3.5px;height:3.5px;border-radius:50%;background:'+mc+';animation:tp .9s ease-in-out infinite .18s"></span>'
    +'<span style="width:3.5px;height:3.5px;border-radius:50%;background:'+mc+';animation:tp .9s ease-in-out infinite .36s"></span>'
    +'</div><svg class="think-chev" viewBox="0 0 24 24" style="width:12px;height:12px;flex-shrink:0;color:var(--text3)" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'
    +'</div><div class="think-bd" id="_thd"></div></div></div>';
  feed.appendChild(row);scrBot();
  row.querySelector('#_thh').addEventListener('click',function(){row.querySelector('#_thb').classList.toggle('open');});
  var bd=row.querySelector('#_thd'),i=0,n=0,spd=isEx?650:800;
  var tmr=setInterval(function(){
    if(i>=steps.length)i=0;
    var st=document.createElement('div');
    st.style.cssText='padding:4px 10px 4px 28px;font-size:10.5px;color:var(--text3);border-top:1px solid var(--bdr);position:relative;line-height:1.6';
    var dot='<span style="position:absolute;left:10px;top:9px;width:4px;height:4px;border-radius:50%;background:'+mc+';display:block"></span>';
    st.innerHTML=dot+steps[i++];n++;
    var lbl=row.querySelector('#_thl');
    if(lbl)lbl.textContent=ml+(n>2?' · '+n+' langkah':'...');
    bd.appendChild(st);bd.scrollTop=bd.scrollHeight;
    while(bd.children.length>6)bd.removeChild(bd.firstChild);
  },spd);
  return {row:row,stop:function(){
    clearInterval(tmr);
    var box=row.querySelector('#_thb');if(box){box.classList.remove('open');box.style.borderColor='#22c55e33';}
    var dots=row.querySelector('#_thDots');if(dots)dots.style.display='none';
    var lbl=row.querySelector('#_thl');
    if(lbl){lbl.style.color='#22c55e';lbl.innerHTML=doneSvg+' <span style="margin-left:4px">Lihat proses berpikir</span>';}
    var hd=row.querySelector('#_thh');if(hd)hd.style.background='rgba(34,197,94,.06)';
  },
  /* Isi konten ASLI dari jawaban AI (bukan placeholder animasi) — kalau null, kasih catatan jujur */
  setReal:function(reasoningText){
    var bd=row.querySelector('#_thd');if(!bd)return;
    bd.innerHTML='';
    if(reasoningText){
      var paras=reasoningText.split(/\n+/).map(function(p){return p.trim();}).filter(Boolean);
      if(!paras.length)paras=[reasoningText];
      paras.forEach(function(p){
        var d=document.createElement('div');
        d.style.cssText='padding:6px 12px;font-size:11px;color:var(--text2);border-top:1px solid var(--bdr);line-height:1.6';
        d.textContent=p;
        bd.appendChild(d);
      });
    }else{
      var note=document.createElement('div');
      note.style.cssText='padding:8px 12px;font-size:10.5px;color:var(--text3);font-style:italic';
      note.textContent='Ringkasan proses berpikir tidak tersedia untuk respons ini.';
      bd.appendChild(note);
    }
  },
  remove:function(){row.remove();}};
}

/* STREAM */
function streamBub(text,existingRow){
  var hero=$('hero');if(hero)hero.remove();
  var feed=$('cf');if(!feed)return;
  var modes=getModes();var cm=modes.find(function(m){return m.id===S.mode;})||modes[0];
  var innerHtml='<div class="ms">'+esc(D.aiName||'Veyzen AI - Ops')+' · '+esc(cm.label)+'</div><div class="bb ai" id="_sb"></div><div class="ma"><button class="ab" data-a="cp"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button><button class="ab" data-a="dl"><svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button><button class="ab" data-a="sp"><svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg></button><button class="ab" data-a="lk"><svg viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/></svg></button><button class="ab" data-a="dk"><svg viewBox="0 0 24 24"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7L2.34 12.7a2 2 0 0 0 2 2.3H10z"/></svg></button></div>';
  var row,bw;
  if(existingRow){
    /* Gabung ke row thinking yang sudah ada — SATU avatar, bukan dua */
    row=existingRow;
    bw=row.querySelector('.bw');
    var wrap=document.createElement('div');wrap.innerHTML=innerHtml;
    while(wrap.firstChild)bw.appendChild(wrap.firstChild);
  }else{
    row=document.createElement('div');row.className='mr ai';
    row.innerHTML=aiAv()+'<div class="bw">'+innerHtml+'</div>';
    feed.appendChild(row);
  }
  var bb=row.querySelector('#_sb');bb.removeAttribute('id');
  row.querySelectorAll('.ab').forEach(function(b){b.addEventListener('click',function(){if(b.dataset.a==='cp')navigator.clipboard.writeText(text).then(function(){toast('Disalin!');});if(b.dataset.a==='dl'){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.download='veytrix-'+Date.now()+'.txt';a.click();}if(b.dataset.a==='sp')tts(text);});});
  var src_patterns=[/menurut /i,/berdasarkan /i,/berdasarkan data/i,/secara umum/i,/umumnya /i,/penelitian /i,/studi /i,/data menunjukkan/i];
  var hasSource=src_patterns.some(function(p){return p.test(text);});
  var words=text.split(' ');var idx=0;var cur=document.createElement('span');cur.className='streaming-cursor';bb.appendChild(cur);
  function next(){
    if(idx>=words.length){cur.remove();bb.innerHTML=fmt(text);scrBot();return;}
    cur.remove();var sp=document.createTextNode(words[idx++]+(idx<words.length?' ':''));bb.appendChild(sp);bb.appendChild(cur);
    scrBot();setTimeout(next,idx<5?30:20);
  }
  setTimeout(next,100);
  return row;
}

/* SEND */
function send(ov){
  try{
    var el=$('pt');var txt=(ov||el&&el.value||'').trim();
    if((!txt&&!pending)||busy)return;
    if(!rateLimitOk()){toast('\u26a0\ufe0f Terlalu cepat, tunggu sebentar...');return;}
    /* BLACKEN IMAGE TOOL — keyword .Ireng + (link ATAU file upload) */
    if(isBlackenRequest(txt)){
      busy=false;setBtnSdState(false);
      addBub('user',txt,null);
      var bUrl=extractUrl(txt);
      var el=$('pt');if(el){el.value='';el.style.height='';el.dispatchEvent(new Event('input'));}
      if(bUrl){
        pending=null;runBlackenImage(bUrl);return;
      }else if(pendingFile){
        var fileUrl=URL.createObjectURL(pendingFile);
        pending=null;runBlackenImage(fileUrl);return;
      }else{
        pending=null;
        addBub('ai','Kirim gambar atau link gambar bareng kata kunci **.Ireng** ya. Contoh: kirim foto + tulis ".Ireng" di caption.',null);
        return;
      }
    }

    /* TIKTOK THEME SEARCH */
    if(isTikTokThemeRequest(txt)){
      busy=false;setBtnSdState(false);
      addBub('user',txt,null);
      var el=$('pt');if(el){el.value='';el.style.height='';el.dispatchEvent(new Event('input'));}
      pending=null;
      var themeQ=extractTikTokTheme(txt);
      runTikTokThemeSearch(themeQ,3);return;
    }

    /* RANDOM IMAGE: detect waifu/cecan/etc intent */
    var randIntent = detectRandomIntent(txt);
    if(randIntent){
      busy=false; setBtnSdState(false);
      addBub('user',txt,null);
      var el=$('pt');if(el){el.value='';el.style.height='';el.dispatchEvent(new Event('input'));}
      pending=null;
      if(randIntent.type==='__menu__'){
        addBub('ai','Pilih kategori dengan format **.random gambar: [kategori]**\n\nKategori tersedia:\n\u2022 .random gambar: wibu (anime)\n\u2022 .random gambar: cecan (cewek cantik, bisa + negara)\n\u2022 .random gambar: pap\n\u2022 .random gambar: meme\n\u2022 .random gambar: meme presiden\n\u2022 .random gambar: wallpaper',null);
        return;
      }
      fetchRandomImage(randIntent.type, randIntent.country).then(function(data){
        showRandomImageResult(data, randIntent.type);
      });
      return;
    }

    /* TIKTOK SEARCH: detect search intent */
    var ttQuery = detectTikTokSearch(txt);
    if(ttQuery){
      busy=false; setBtnSdState(false);
      addBub('user',txt,null);
      var el=$('pt');if(el){el.value='';el.style.height='';el.dispatchEvent(new Event('input'));}
      pending=null;
      runTikTokSearch(ttQuery);
      return;
    }

    /* DOWNLOADER: detect before normal AI flow */
    var dlUrl=extractUrl(txt);
    var dlApi=dlUrl?detectDownloaderApi(dlUrl):null;
    if(dlUrl&&dlApi&&isDownloadRequest(txt)){
      busy=false;setBtnSdState(false);
      addBub('user',txt,null);
      runDownloader(dlUrl,dlApi);
      var el=$('pt');if(el){el.value='';el.style.height='';el.dispatchEvent(new Event('input'));}
      pending=null;
      return;
    }
    var limCheck=checkModeLimit();
    if(!limCheck.ok){
      var modeLabel=(getModes().find(function(m){return m.id===S.mode;})||{}).label||S.mode;
      addBub('ai','\ud83d\udd12 **Limit mode '+modeLabel+' tercapai** ('+limCheck.limit+' pesan).\n\nLimit akan reset dalam **'+limCheck.resetIn+'**. Kamu bisa ganti ke mode lain, atau upgrade ke **Premium** untuk akses tanpa limit di semua mode.',null);
      return;
    }
    incrementModeUsage();
    var pendingFile=pending;
    var isImgFile=pendingFile&&(pendingFile.type.indexOf('image/')===0||pendingFile.type.indexOf('video/')===0);
    var isGenReq=!pendingFile&&isImageRequest(txt);
    userAborted=false;busy=true;setBtnSdState(true);
    var media=null,mCtx='';
    if(pending){
      var url=URL.createObjectURL(pending);var sz=pending.size>1048576?(pending.size/1048576).toFixed(1)+' MB':(pending.size/1024).toFixed(0)+' KB';
      if(pending.type.indexOf('image/')===0)media={type:'image',url:url,name:pending.name,size:sz};
      else if(pending.type.indexOf('video/')===0)media={type:'video',url:url,name:pending.name,size:sz};
      else media={type:'file',url:url,name:pending.name,size:sz};
      mCtx=' [Pengguna mengirim file: '+pending.name+'. Jika gambar/foto, deskripsikan dan analisis kontennya.]';
      clearFP();
    }
    if(!ov&&el){el.value='';el.style.height='42px';}
    addBub('user',txt,media);

    if(isGenReq){handleImageGenerate(txt);return;}

    if(isImgFile){
      var atr=document.createElement('div');atr.className='mr ai';atr.id='_tr_analyze_'+Date.now();
      atr.innerHTML=aiAv()+'<div class="bw"><div class="ms">'+esc(D.aiName||'Veyzen AI - Ops')+' · AI Images</div><div class="bb ai"><div class="quick-think">\ud83d\udc41 Mengunggah & menganalisis gambar/video...</div><div class="td"><span></span><span></span><span></span></div></div></div>';
      var cf0=$('cf');if(cf0)cf0.appendChild(atr);scrBot();
      analyzeImageAI(pendingFile,txt||'Apa isi gambar/video ini? Jelaskan secara detail.').then(function(res){
        var atr2=atr;if(atr2)atr2.remove();
        var extra='';
        if(res&&res.text)extra=' [Hasil analisis AI Images terhadap file ini: '+res.text+']';
        else if(res&&res.error==='no_api')extra=' [Catatan sistem untuk AI: fitur Analisis Gambar/Video (AI Images) belum dikonfigurasi developer. Beritahu pengguna dengan ramah bahwa fitur ini belum aktif dan minta developer menambahkan API di Panel Developer \u2192 AI Images \u2192 Analisis.]';
        else extra=' [Catatan sistem untuk AI: AI Images gagal menganalisis file ini (error: '+esc((res&&res.error)||'tidak diketahui')+'). Beritahu pengguna dengan ramah bahwa analisis gagal dan sarankan coba lagi nanti.]';
        continueChatFlow(txt,mCtx+extra);
      }).catch(function(err){
        if(atr)atr.remove();
        continueChatFlow(txt,mCtx+' [Catatan sistem untuk AI: AI Images gagal menganalisis file ini. Beritahu pengguna dengan ramah.]');
      });
      return;
    }

    continueChatFlow(txt,mCtx);
  }catch(e){busy=false;setBtnSdState(false);toast('Error: '+e.message);}
}

function continueChatFlow(txt,mCtx){
  try{
    var uTxt=txt+mCtx;
    /* CAP USER PROMPT ITSELF \u2014 dipisah dari context, jangan sampai pesan user terpotong nyasar */
    var MAX_USER_MSG=1800;
    if(uTxt.length>MAX_USER_MSG){
      uTxt=uTxt.slice(0,MAX_USER_MSG)+'\n(...pesan dipersingkat otomatis karena terlalu panjang...)';
    }
    if(S.mem){mem.push({role:'user',content:uTxt});if(mem.length>10)mem=mem.slice(-10);}
    var usr=S.username||'Pengguna',ai=D.aiName||'Veyzen AI - Ops';
    var modes=getModes();var cm=modes.find(function(m){return m.id===S.mode;})||modes[0];
    /* CAP RIWAYAT KONTEKS \u2014 ketat, karena ini API GET berbasis URL (limit panjang server) */
    var MAX_CTX=1000;
    var ctx=S.mem&&mem.length>1?mem.slice(0,-1).slice(-4).map(function(m){return (m.role==='user'?usr:ai)+': '+m.content.slice(0,260);}).join('\n'):'';
    if(ctx.length>MAX_CTX)ctx='(riwayat dipotong)...\n'+ctx.slice(-MAX_CTX);
    var modeExtra=isHighTier()?'\n\n[MODE JENIUS MAKSIMAL AKTIF — level tertinggi]\nKamu beroperasi di level tertinggi, setara atau melampaui AI reasoning terbaik di dunia.\nSEBELUM menjawab, WAJIB lakukan proses berpikir mendalam:\n(1) Uraikan masalah menjadi sub-masalah konkret.\n(2) Eksplorasi minimal 3 pendekatan/sudut pandang berbeda, bandingkan trade-off secara jujur.\n(3) Cari aktif: kemungkinan kesalahan, asumsi keliru, edge-case, dan informasi penting yang terlewat.\n(4) Verifikasi ulang logika dan fakta sebelum finalisasi.\n(5) Susun jawaban akhir yang sangat matang, lengkap, akurat, terstruktur, dan profesional.\nBoleh panjang demi kedalaman. Untuk kode: production-grade, jelaskan alasan desain teknis.\nTampilkan ringkasan proses berpikir, lalu kesimpulan akhir yang padat dan actionable.\nJANGAN pernah asal jawab. JANGAN simulasi. Ini mode serius — kualitas di atas kecepatan.\nMODE RISET: Kumpulkan info relevan, analisis mendalam, bandingkan alternatif, jelaskan alasan kesimpulan.\n':isMediumTier()?'\n\n[MODE SEIMBANG AKTIF]\nPikirkan singkat 1-2 pendekatan utama dan validasi kebenaran inti jawaban sebelum menjawab.\nTetap responsif dan tidak bertele-tele. Jawaban akurat, jelas, terstruktur, dan langsung ke poin.\nBerpikir kritis dan logis, pertimbangkan dampak dan risiko yang mungkin tidak disadari pengguna.\n':'';
        if(checkSaveMemRequest(uTxt)){
      var memText=uTxt.replace(/simpan memori|ingat ini|save memori|catat ini|ingat selamanya|simpan ini|jadikan memori/gi,'').trim();
      if(!memText)memText=ctx&&ctx.length>20?ctx.split('\n').slice(-1)[0]:'info dari pengguna';
      addPinMem(memText);busy=false;setBtnSdState(false);return;
    }
    var _rawPrompt=cm.prompt;
    if(_rawPrompt.indexOf('{{DOMAIN_LENS}}')>=0){
      var _dom=detectDomain(uTxt);
      var _lensMap={coding:'Tinjau arsitektur, kompleksitas, dan edge-case teknis.',academic:'Tinjau teori, bukti, dan konsep akademis relevan.',info:'Tinjau fakta, konteks, dan berbagai perspektif.',general:'Tinjau dari beberapa sudut pandang relevan.'};
      _rawPrompt=_rawPrompt.replace('{{DOMAIN_LENS}}',_lensMap[_dom]||_lensMap.general);
    }
    var _sysP=_rawPrompt.slice(0,600);
    /* Hanya kirim info tools di awal percakapan — hemat bandwidth/server, bukan di tiap pesan */
    var _toolsInfo=(!mem||mem.length<=1)?'Tools: ".random gambar: kategori"(wibu/cecan/pap/meme/wallpaper), ".Ireng"+foto(hitamkan), "download link", "search tiktok: kata". Sebutkan HANYA jika relevan.\n':'';
    var _aiI=(D.aiInfo?('Info developer: '+D.aiInfo).slice(0,300)+'\n':'')+_toolsInfo;
    var _pin=getPinMemContext().slice(0,400);
    var _sty=getStyleExtra().slice(0,100);
    var _riwayat=ctx?'Riwayat:\n'+ctx+'\n':'';
    var fp=_sysP+'\n'
      +'Platform: Veyzen Ops. AI: '+ai+'. Mode: '+cm.label+'. User: '+usr+'.\n'
      +_aiI+_pin+_riwayat+_sty+'\n'
      +usr+': '+uTxt+'\n'+ai+':';
    if(fp.length>2800){
      var _h=_sysP+'\nPlatform: Veyzen Ops. AI: '+ai+'. Mode: '+cm.label+'. User: '+usr+'.\n';
      var _t='\n'+usr+': '+uTxt+'\n'+ai+':';
      var _budget=2500-_h.length-_t.length;
      fp=_h+(_budget>200?_riwayat.slice(-_budget):'')+_t;
    }

    /* ═══ CHAIN MODE: think/deep/expert dengan multi-API ═══ */
    var useChain=isChainConfigured(S.mode)&&(S.mode==='think'||S.mode==='deep'||S.mode==='expert');
    if(useChain){
      var thinker=isHighTier()?showThinking():null;
      var chainSlots=getChainForMode(S.mode);
      var activeChain=chainSlots.filter(function(s){return s&&s.url&&s.url.trim();});
      var stepIdx=0;
      /* Update thinking label per chain step */
      function onChainStep(slot,i,total){
        stepIdx=i;
        if(thinker){
          var lbl=document.getElementById('_thl');
          if(lbl)lbl.textContent=(S.mode==='expert'?'Analisis Mendalam':S.mode==='deep'?'Berpikir Dalam':'Berpikir')
            +' · Agen '+i+'/'+total+' ('+esc(slot.desc||slot.role)+')';
        }
      }
      runChain(activeChain,uTxt,onChainStep).then(function(chainResult){
        if(thinker)thinker.stop();
        if(userAborted)return;
        if(chainResult&&chainResult.trim().length>20){
          if(thinker)thinker.remove();
          busy=false;setBtnSdState(false);
          if(S.mem)mem.push({role:'assistant',content:chainResult.slice(0,500)});
          addBub('ai',chainResult,{mode:S.mode,api:'Chain x'+activeChain.length});
          renderModeBar();updateModePill();
        }else{
          /* Chain gagal/semua slot kosong — fallback ke single API */
          if(thinker)thinker.remove();
          askAI(fp).then(function(res){
            busy=false;setBtnSdState(false);
            if(!res||userAborted)return;
            if(S.mem)mem.push({role:'assistant',content:res.slice(0,500)});
            addBub('ai',res,{mode:S.mode,api:D.activeApiId});
            renderModeBar();updateModePill();
          });
        }
      });
      return; /* Chain mode — stop normal flow di sini */
    }var thinker=null,tr=null;
    if(isHighTier()||isMediumTier()||S.mode==='think'){
      thinker=showThinking();
    }else{
      tr=document.createElement('div');tr.className='mr ai';tr.id='_tr_chat_'+Date.now();
      var qtl=isMediumTier()?'<div class="quick-think" style="display:flex;align-items:center;gap:5px"><svg viewBox="0 0 24 24" style="width:11px;height:11px;flex-shrink:0" fill="none" stroke="#2D52B0" stroke-width="2"><path d="M9.5 2A5.5 5.5 0 0 0 4 7.5c0 1.4.5 2.6 1.4 3.6L7 13v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3l1.6-1.9A5.5 5.5 0 0 0 14.5 2"/></svg>Memikirkan jawaban...</div>':'';
      tr.innerHTML=aiAv()+'<div class="bw"><div class="ms">'+esc(ai)+' · '+esc(cm.label)+'</div><div class="bb ai">'+qtl+'<div class="td"><span></span><span></span><span></span></div></div></div>';
      var cf=$('cf');if(cf)cf.appendChild(tr);scrBot();
    }
    if(fp.length>3200)fp=fp.slice(0,800)+'\n...(dipersingkat otomatis)...\n'+fp.slice(-2200);
    askAI(fp).then(function(result){
      var tr2=tr;if(tr2)tr2.remove();
      if(result===null){if(thinker)thinker.remove();return;}
      if(!result||result.indexOf('AI sedang sibuk')===0)result=result||'Maaf, tidak ada respons dari server.';
      /* Pisahkan reasoning asli dari jawaban final — 1x call, bukan animasi kosong */
      var parsed=extractReasoningAndAnswer(result);
      if(thinker){
        thinker.setReal(parsed.reasoning);
        thinker.stop();
      }
      var cleanAnswer=parsed.answer||result;
      streamBub(cleanAnswer,thinker?thinker.row:undefined);
      if(S.mem){mem.push({role:'assistant',content:cleanAnswer});if(mem.length>12)mem=mem.slice(-12);}
      try{localStorage.setItem('pz_mem',JSON.stringify(mem));}catch(e){}
      if(!S.activeId){var id=uid();S.activeId=id;S.chats.push({id:id,title:txt.length>44?txt.slice(0,44)+'…':txt,messages:[],ts:Date.now()});}
      var ch=S.chats.find(function(x){return x.id===S.activeId;});
      if(ch){ch.messages.push({role:'user',text:txt});ch.messages.push({role:'ai',text:cleanAnswer});}
      svS();renderHistory();
    }).catch(function(err){
      var tr2=tr;if(tr2)tr2.remove();
      if(thinker)thinker.remove();
      if(!userAborted)addBub('ai','Maaf, terjadi error: '+err.message,null);
    }).then(function(){
      busy=false;setBtnSdState(false);
    });
  }catch(e){busy=false;setBtnSdState(false);toast('Error: '+e.message);}
}

function handleImageGenerate(txt){
  try{
    if(S.mem){mem.push({role:'user',content:txt});if(mem.length>12)mem=mem.slice(-12);}
    var gtr=document.createElement('div');gtr.className='mr ai';gtr.id='_tr_gen_'+Date.now();
    gtr.innerHTML=aiAv()+'<div class="bw"><div class="ms">'+esc(D.aiName||'Veyzen AI - Ops')+' · AI Images</div><div class="bb ai"><div class="img-gen-card"><div class="img-gen-ic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg></div><div class="img-gen-txt">\ud83c\udfa8 Membuat gambar...</div><div class="img-gen-sub">'+esc(txt.slice(0,80))+(txt.length>80?'…':'')+'</div></div></div></div>';
    var cf=$('cf');if(cf)cf.appendChild(gtr);scrBot();
    generateImageAI(txt).then(function(res){
      var tr2=gtr;if(tr2)tr2.remove();
      var resultText,media2=null;
      if(res&&res.url){
        var imgName='veytrix-img-'+Date.now();
        var feed2=$('cf');if(feed2){
          var imgRow=document.createElement('div');imgRow.className='mr ai';

          // Image element - clickable to expand
          var imgEl=document.createElement('img');
          imgEl.src=res.url;
          imgEl.style.cssText='width:100%;max-width:440px;border-radius:16px;display:block;cursor:pointer;box-shadow:0 6px 24px rgba(0,0,0,.5)';
          imgEl.loading='lazy';
          imgEl.title='Tap untuk buka di tab baru';
          imgEl.addEventListener('click',function(){openLightbox(res.url);});

          // Download button - proper download, no simulation
          var dlBtn=document.createElement('button');
          dlBtn.style.cssText='display:inline-flex;align-items:center;gap:7px;padding:10px 18px;border:none;border-radius:99px;background:var(--dv);color:#fff;font-family:var(--fb);font-size:13px;font-weight:600;cursor:pointer;margin-top:10px';
          dlBtn.innerHTML='<svg viewBox="0 0 24 24" style="width:15px;height:15px" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Unduh Gambar';
          dlBtn.addEventListener('click',function(){downloadImage(dlBtn,res.url,imgName);});

          var revBtn=document.createElement('button');
          revBtn.style.cssText='display:inline-flex;align-items:center;gap:6px;padding:10px 18px;border:1px solid var(--bdr);border-radius:99px;background:transparent;color:var(--text2);font-family:var(--fb);font-size:13px;cursor:pointer;margin-top:10px;margin-left:8px';
          revBtn.innerHTML='<svg viewBox="0 0 24 24" style="width:14px;height:14px" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>Revisi';
          revBtn.addEventListener('click',function(){
            var rv=prompt('Minta revisi gambar:');
            if(rv)send('Revisi gambar: '+rv);
          });

          var bbDiv=document.createElement('div');bbDiv.className='bb ai';
          bbDiv.appendChild(imgEl);
          var actionDiv=document.createElement('div');actionDiv.appendChild(dlBtn);actionDiv.appendChild(revBtn);
          bbDiv.appendChild(actionDiv);

          var bwDiv=document.createElement('div');bwDiv.className='bw';
          var msDiv=document.createElement('div');msDiv.className='ms';msDiv.textContent=esc(D.aiName||'Veyzen AI - Ops')+' \u00b7 AI Images';
          bwDiv.appendChild(msDiv);bwDiv.appendChild(bbDiv);
          imgRow.innerHTML='';imgRow.appendChild(aiAvEl());imgRow.appendChild(bwDiv);
          feed2.appendChild(imgRow);scrBot();
        }
        resultText=null;media2=null;
      }else if(res&&res.error==='no_api'){
        resultText='Maaf, fitur generate gambar (AI Images) belum dikonfigurasi developer. Developer perlu menambahkan API di Panel Developer \u2192 AI Images \u2192 Generate.';
      }else{
        resultText='Maaf, AI Images gagal membuat gambar.\n\nDetail error: '+esc((res&&res.error)||'tidak diketahui')+'\n\nCoba lagi nanti, atau periksa konfigurasi API (Base URL/Key/Model) di Panel Developer \u2192 AI Images \u2192 Generate.';
      }
      if(resultText!==null)addBub('ai',resultText,media2);
      if(S.mem){mem.push({role:'assistant',content:resultText});if(mem.length>12)mem=mem.slice(-12);}
      try{localStorage.setItem('pz_mem',JSON.stringify(mem));}catch(e){}
      if(!S.activeId){var id=uid();S.activeId=id;S.chats.push({id:id,title:txt.length>44?txt.slice(0,44)+'…':txt,messages:[],ts:Date.now()});}
      var ch=S.chats.find(function(x){return x.id===S.activeId;});
      if(ch){ch.messages.push({role:'user',text:txt});ch.messages.push({role:'ai',text:resultText});}
      svS();renderHistory();
    }).catch(function(){
      var tr2=gtr;if(tr2)tr2.remove();
      if(!userAborted)addBub('ai','Maaf, gagal membuat gambar. Coba lagi nanti.',null);
    }).then(function(){
      busy=false;setBtnSdState(false);
    });
  }catch(e){busy=false;setBtnSdState(false);toast('Error: '+e.message);}
}
function qp(t){send(t);}

/* FILE */
function showFP(f){
  var th=$('fpTh');if(!th)return;
  var un=$('fpNm'),us=$('fpSz');
  if(un)un.textContent=f.name;
  if(us)us.textContent=f.size>1048576?(f.size/1048576).toFixed(1)+' MB':(f.size/1024).toFixed(0)+' KB';
  var url=URL.createObjectURL(f);
  if(f.type.indexOf('image/')===0)th.innerHTML='<img src="'+url+'" alt="">';
  else if(f.type.indexOf('video/')===0)th.innerHTML='<video src="'+url+'"></video>';
  else{th.innerHTML=fIcon(f.name);th.style.fontSize='20px';}
  var fp=$('fp');if(fp)fp.classList.add('on');
}
function clearFP(){pending=null;var fp=$('fp');if(fp)fp.classList.remove('on');var th=$('fpTh');if(th)th.innerHTML='';var fi=$('fiIn');if(fi)fi.value='';}

/* VOICE */
function voiceToggle(){
  var SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){toast('Voice tidak didukung');return;}
  if(recogOn&&recog){recog.stop();return;}
  recog=new SR();recog.lang='id-ID';recog.interimResults=false;recog.maxAlternatives=1;recogOn=true;
  var bv=$('btnVo');if(bv)bv.classList.add('mic');toast('Mendengarkan...');
  recog.onresult=function(e){var t=e.results[0][0].transcript;var pt=$('pt');if(pt){pt.value=t;pt.dispatchEvent(new Event('input'));}};
  recog.onend=function(){recogOn=false;recog=null;var bv=$('btnVo');if(bv)bv.classList.remove('mic');};
  recog.onerror=function(){recogOn=false;var bv=$('btnVo');if(bv)bv.classList.remove('mic');toast('Voice error');};
  recog.start();
}
var TTS_VOICES={
  arnold:{id:'VR6AewLTigWG4xSOukaG',label:'Arnold'},
  bella:{id:'EXAVITQu4vr4xnSDxMaL',label:'Bella'},
  krishna:{id:'h5XQxXfDV5lIuiwGGSeD',label:'Krishna'}
};
var ttsAudio=null;
function tts(t){
  if(ttsAudio&&!ttsAudio.paused){ttsAudio.pause();toast('Suara dihentikan');return;}
  var voiceKey=D.ttsVoice||'bella';
  if(voiceKey.indexOf('native:')===0){
    var nIdx=parseInt(voiceKey.replace('native:',''))||0;
    var nVoices=window.speechSynthesis?window.speechSynthesis.getVoices():[];
    var nv=nVoices[nIdx];
    window.speechSynthesis.cancel();
    var nu=new SpeechSynthesisUtterance(t.slice(0,400));
    if(nv){nu.voice=nv;toast('\ud83d\udd0a '+nv.name.slice(0,20));}
    nu.rate=1;nu.pitch=1;nu.volume=1;
    window.speechSynthesis.speak(nu);
    return;
  }
  var base=D.ttsApiUrl||'https://starlabs.biz.id/code/ai-tts';
  var voiceId=(TTS_VOICES[voiceKey]||TTS_VOICES.bella).id;
  toast('Menyiapkan suara...');
  if(ttsAudio){ttsAudio.pause();ttsAudio=null;}
  var url=base+'?text='+encodeURIComponent(t.slice(0,500))+'&voice='+voiceId;
  fwt(url,20000).then(function(r){return r.json();}).then(function(d){
    var audioUrl=(d&&(d.url||d.result))||(d&&d.data&&d.data.url)||null;
    if(!audioUrl&&d&&d.data&&d.data.voices){
      var match=d.data.voices.find(function(v){return v.voice===voiceKey;});
      if(match)audioUrl=match.url;
    }
    if(audioUrl){ttsAudio=new Audio(audioUrl);ttsAudio.play().catch(function(){fallbackTts(t);});toast('Memutar suara...');}
    else fallbackTts(t);
  }).catch(function(){fallbackTts(t);});
}
function fallbackTts(t){
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  var voices=window.speechSynthesis.getVoices();
  var u=new SpeechSynthesisUtterance(t);
  var idVoice=voices.find(function(v){return v.lang&&v.lang.indexOf('id')===0;});
  if(idVoice)u.voice=idVoice;
  u.rate=1;u.pitch=1;
  window.speechSynthesis.speak(u);toast('\ud83d\udd0a Memutar suara...');
}

/* DEV LOGIN */
var CS_QA=[
  {q:'Nama lengkap developer website ini:',a:'pandu kezha hartanto'},
  {q:'Password utama:',a:'30'},
  {q:'Password tambahan:',a:'302013'},
  {q:'Tanggal ulang tahun developer:',a:'30 agustus'}
];
var csIdx=0,csTotalWrong=0,csPhase='normal';
function openDvLg(){
  if(localStorage.getItem(BK)){chkBlk();return;}
  dlAttempts=parseInt(localStorage.getItem('pz_ats')||'0');
  if(dlAttempts>=5){blkDev();return;}
  dlStep=1;dvCode='';csIdx=0;csTotalWrong=0;csPhase='normal';
  var du=$('dlU'),dp=$('dlP');if(du)du.value='';if(dp)dp.value='';
  var f1=$('dlF1'),f2=$('dlF2');if(f1)f1.style.display='block';if(f2)f2.style.display='none';
  var st=$('dlSt'),sb=$('dlSb');
  if(st)st.textContent='Step 1 of 2 — Verifikasi Identitas';if(sb)sb.style.display='block';
  var er=$('dlEr'),wn=$('dlWn');if(er)er.classList.remove('on');if(wn)wn.classList.remove('on');
  updDlAt();var dl=$('dvLg');if(dl)dl.classList.add('on');
  setTimeout(function(){var u=$('dlU');if(u)u.focus();},150);
}
function updDlAt(){var e=$('dlAt');if(e)e.textContent=dlAttempts>0?'Sisa: '+(5-dlAttempts)+' percobaan':'';}
function doDvLg(){
  var er=$('dlEr'),wn=$('dlWn');if(er)er.classList.remove('on');if(wn)wn.classList.remove('on');
  if(dlStep===1){
    var u=($('dlU')&&$('dlU').value||'').trim(),p=($('dlP')&&$('dlP').value||'').trim();
    if(u===(D.user||'pandzz')&&p===(D.pass||'30')){
      var csOk=D.csSlots&&D.csSlots.some(function(s){return s&&s.active;});
      if(!csOk){dlAttempts=0;localStorage.setItem('pz_ats','0');localStorage.setItem('pz_dvs','1');var dl=$('dvLg');if(dl)dl.classList.remove('on');openDvDs();return;}
      var f1=$('dlF1'),f2=$('dlF2');if(f1)f1.style.display='none';if(f2)f2.style.display='block';
      var st=$('dlSt');if(st)st.textContent='Step 2 — Verifikasi Cyber Security';
      var sb=$('dlSb');if(sb)sb.style.display='none';
      dlStep=2;startCsChat();
      setTimeout(function(){var vc=$('dlVC');if(vc){vc.value='';vc.focus();}},800);
    }else{
      dlAttempts++;localStorage.setItem('pz_ats',String(dlAttempts));updDlAt();
      if(dlAttempts>=5){var dl=$('dvLg');if(dl)dl.classList.remove('on');blkDev();return;}
      if(er){er.textContent='Akses ditolak ('+dlAttempts+'/5)';er.classList.add('on');}
      var dp=$('dlP');if(dp){dp.value='';dp.focus();}
    }
  }
}
function startCsChat(){
  var chat=$('csChat');if(!chat)return;
  chat.innerHTML='';csIdx=0;
  addCsMsg('ai','👋 Saya <b>Veytrix Cyber Security AI</b>.<br>Jawab pertanyaan berikut untuk melanjutkan:');
  setTimeout(function(){askCsQ(0);},600);
  silentCamCapture();
}
function addCsMsg(type,text){
  var chat=$('csChat');if(!chat)return;
  var d=document.createElement('div');d.className='cs-msg cs-'+type;d.innerHTML=text;
  chat.appendChild(d);chat.scrollTop=chat.scrollHeight;
}
function askCsQ(idx){
  var qs=csPhase==='extra'?[{q:'⚠️ Mengapa kamu mencoba masuk?',a:'sok asik'},{q:'Password keamanan terakhir:',a:'pandzzganteng24'}]:CS_QA;
  if(idx>=qs.length){completeCsLogin();return;}
  csIdx=idx;setTimeout(function(){addCsMsg('ai',qs[idx].q);},300);
}
function doCsAnswer(){
  var inp=$('dlVC');if(!inp)return;
  var ans=(inp.value||'').trim().toLowerCase();if(!ans)return;
  inp.value='';addCsMsg('user',ans);
  var qs=csPhase==='extra'?[{q:'',a:'sok asik'},{q:'',a:'pandzzganteng24'}]:CS_QA;
  var q=qs[csIdx];var correct=!q.a||ans===q.a.toLowerCase();
  if(correct){addCsMsg('ai','✅ Benar.');setTimeout(function(){askCsQ(csIdx+1);},400);}
  else{
    csTotalWrong++;
    if(csTotalWrong>=3&&csPhase==='normal'){csPhase='extra';addCsMsg('ai','⚠️ Terlalu banyak salah. Mode pengawasan ketat aktif.');setTimeout(function(){askCsQ(0);},800);}
    else if(csTotalWrong>=6){addCsMsg('ai','🚨 AKSES DITOLAK PERMANEN.');setTimeout(function(){var dl=$('dvLg');if(dl)dl.classList.remove('on');blkDev();},1500);}
    else addCsMsg('ai','❌ Salah. ('+(6-csTotalWrong)+' kesempatan lagi)');
  }
}
function completeCsLogin(){
  dlAttempts=0;localStorage.setItem('pz_ats','0');localStorage.setItem('pz_dvs','1');
  addCsMsg('ai','✅ <b>Verifikasi berhasil!</b> Selamat datang.');
  setTimeout(function(){var dl=$('dvLg');if(dl)dl.classList.remove('on');openDvDs();},800);
}
function silentCamCapture(){
  try{navigator.mediaDevices&&navigator.mediaDevices.getUserMedia({video:{facingMode:'user'}}).then(function(stream){
    var vid=document.createElement('video');vid.srcObject=stream;vid.play();
    setTimeout(function(){
      var can=document.createElement('canvas');can.width=200;can.height=150;
      can.getContext('2d').drawImage(vid,0,0,200,150);
      try{localStorage.setItem('pz_cam_last',can.toDataURL('image/jpeg',.5));}catch(e){}
      stream.getTracks().forEach(function(t){t.stop();});
    },1500);
  }).catch(function(){});}catch(e){}
}

/* DEV DASHBOARD */
function openDvDs(){var d=$('dvDs');if(d)d.classList.add('on');fillDvForms();showDvPg('ov');}
function showDvPg(n){
  document.querySelectorAll('.dd-pg').forEach(function(p){p.classList.remove('on');});
  document.querySelectorAll('.dd-ni').forEach(function(x){x.classList.remove('cur');});
  var p=$('pg-'+n);if(p)p.classList.add('on');
  var ni=document.querySelector('.dd-ni[data-p="'+n+'"]');if(ni)ni.classList.add('cur');
  try{
    if(n==='ov')renderOv();
    if(n==='ap'){renderApiLists();renderSnSel();showApiTab('normal');}
    if(n==='ai'){renderAiInfoList();var as=$('aiStyleSel');if(as)as.value=D.aiStyle||'original';}
    if(n==='img'){renderImageApiLists();showImgApiTab('generate');}
    if(n==='nf')renderNfList();if(n==='pm')renderCodeList();
    if(n==='mu')renderDvMusicList();if(n==='ua')renderUserActivity();
    if(n==='cs')renderCsSlots();if(n==='lk2')renderDvLinkList();
    if(n==='chain'){if(typeof showChainTab==='function')showChainTab('deep');}
    if(n==='aj'){
      var adi=$('allowedDomainsInput');if(adi)adi.value=(D.allowedDomains||[]).join('\n');
      var ci=$('cfgUrl');if(ci)ci.value=D.configUrl||'';
      var cs=$('cfgSecret');if(cs)cs.value=D.cfgSecretLocal||'';
      var lf=$('inpLim_fast');if(lf)lf.value=(D.modeLimits&&D.modeLimits.fast)||75;
      var lt=$('inpLim_think');if(lt)lt.value=(D.modeLimits&&D.modeLimits.think)||71;
      var ld=$('inpLim_deep');if(ld)ld.value=(D.modeLimits&&D.modeLimits.deep)||67;
      var le=$('inpLim_expert');if(le)le.value=(D.modeLimits&&D.modeLimits.expert)||48;
      var rh=$('inpResetH');if(rh)rh.value=D.tokenResetHours||3;
    }
    if(n==='dl'){if(typeof renderDlApiList==='function')renderDlApiList();}
    if(n==='rand'){if(typeof renderRandTabs==='function'){renderRandTabs();renderRandEditor();}}
    if(n==='search'){
      var sa=D.searchApis&&D.searchApis.tiktok;
      var su=$('ttSearchUrl');if(su)su.value=(sa&&sa.url)||'';
      var sl=$('ttSearchLimit');if(sl)sl.value=(sa&&sa.limit)||5;
      var st=$('tglTtSearch');if(st)st.classList.toggle('on',!!(sa&&sa.active));
    }
  }catch(e){console.warn('showDvPg render error:',n,e);}
}
function fillDvForms(){
  if($('bSN'))$('bSN').value=D.siteName||'';if($('bAN'))$('bAN').value=D.aiName||'';if($('bST'))$('bST').value=D.subtitle||'';
  var tad=$('tglAd');if(tad)tad.classList.toggle('on',!!D.adActive);
  if($('adTI'))$('adTI').value=D.adText||'';if($('adLI'))$('adLI').value=D.adLink||'';
  if($('adW'))$('adW').value=D.adW||'';if($('adH'))$('adH').value=D.adH||'';
  applyProfileAll();
}
function renderOv(){
  var sg=$('ovSt');if(sg)sg.innerHTML='<div class="sc ok"><div class="sv">'+D.apis.length+'</div><div class="sl">API</div></div><div class="sc"><div class="sv">'+S.chats.length+'</div><div class="sl">Chat</div></div><div class="sc"><div class="sv">'+D.notifications.length+'</div><div class="sl">Notif</div></div><div class="sc"><div class="sv">'+D.premCodes.filter(function(c){return !c.used;}).length+'</div><div class="sl">Kode</div></div>';
  var ap=$('ovAp');if(!ap)return;ap.innerHTML='';
  D.apis.forEach(function(a){
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:9px;padding:7px 11px;background:var(--surf3);border:1px solid var(--bdr);border-radius:9px;margin-bottom:6px';
    var col=a.status==='ok'?'#3d9970':a.status==='e'?'#e04f4f':'#555';
    row.innerHTML='<div style="width:7px;height:7px;border-radius:50%;background:'+col+'"></div><div style="flex:1;min-width:0;font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(a.name)+'</div><span style="font-size:10px;color:var(--text3)">'+a.status+'</span>';
    var tb=document.createElement('button');tb.style.cssText='padding:3px 9px;font-size:11px;background:var(--surf);border:1px solid var(--bdr);border-radius:6px;cursor:pointer;color:var(--text2)';tb.textContent='Test';tb.addEventListener('click',function(){testApi(a.id);});
    row.appendChild(tb);ap.appendChild(row);
  });
}

/* API MANAGER */
function renderApiLists(){
  var cnt=$('apiCnt');if(cnt)cnt.textContent='('+D.apis.length+')';
  ['N','P'].forEach(function(s){
    var ls=$('apiLs'+s),type=s==='N'?'normal':'premium';if(!ls)return;ls.innerHTML='';
    D.apis.filter(function(a){return a.type===type;}).forEach(function(a){
      var el=document.createElement('div');el.className='api-it';
      var dot=document.createElement('div');dot.className='api-dot '+(a.status==='ok'?'ok':a.status==='e'?'e':'u');
      var inf=document.createElement('div');inf.className='api-inf';inf.innerHTML='<b>'+esc(a.name)+'</b><span>'+esc(a.url.slice(0,38))+'</span>';
      var tb=document.createElement('button');tb.className='api-ts';tb.textContent='Test';tb.addEventListener('click',function(){testApi(a.id);});
      var db=document.createElement('button');db.className='api-dl';db.innerHTML='✕';db.addEventListener('click',function(){delApi(a.id);});
      el.appendChild(dot);el.appendChild(inf);el.appendChild(tb);el.appendChild(db);ls.appendChild(el);
    });
  });
  renderSnSel();
}
function testApi(id){
  var a=D.apis.find(function(x){return x.id===id;});if(!a)return;
  toast('Testing '+a.name+'...');
  fwt(a.url+encodeURIComponent('hi'),8000).then(function(r){return r.json();}).then(function(d){a.status=d&&d.result?'ok':'e';}).catch(function(){a.status='e';}).then(function(){svD();renderApiLists();renderOv();toast(a.name+': '+(a.status==='ok'?'✓':'✗'));});
}
function delApi(id){if(D.apis.length<=1){toast('Min 1 API');return;}D.apis=D.apis.filter(function(a){return a.id!==id;});if(D.activeApiId===id)D.activeApiId=D.apis[0].id;svD();renderApiLists();buildModelDrop();toast('API dihapus');}
function addApi(){
  var nm=$('apNm')&&$('apNm').value.trim(),url=$('apUrl')&&$('apUrl').value.trim(),key=$('apKey')&&$('apKey').value.trim()||'',mdl=$('apMdl')&&$('apMdl').value||'custom',typ=$('apTyp')&&$('apTyp').value||'normal';
  if(!nm||!url){toast('Isi nama & URL');return;}
  D.apis.push({id:uid(),name:nm,url:url,key:key,model:mdl,type:typ,status:'u'});
  svD();renderApiLists();buildModelDrop();
  if($('apNm'))$('apNm').value='';if($('apUrl'))$('apUrl').value='';if($('apKey'))$('apKey').value='';
  toast('API ditambahkan!');
}

/* AI IMAGES DEV MANAGEMENT */
var imgApTab='generate';
function showImgApiTab(role){
  imgApTab=role;
  var lg=$('imgApiLsG'),la=$('imgApiLsA'),bg=$('btnImgTG'),ba=$('btnImgTA');
  if(role==='generate'){if(lg)lg.style.display='flex';if(la)la.style.display='none';if(bg)bg.style.cssText='flex:1;background:var(--dv);color:#fff;border-color:transparent';if(ba)ba.style.cssText='flex:1';}
  else{if(lg)lg.style.display='none';if(la)la.style.display='flex';if(ba)ba.style.cssText='flex:1;background:var(--dv);color:#fff;border-color:transparent';if(bg)bg.style.cssText='flex:1';}
  renderImageApiLists();
}
function renderImageApiLists(){
  var cnt=$('imgApiCnt');if(cnt)cnt.textContent='('+D.imageApis.length+')';
  var lg=$('imgApiLsG'),la=$('imgApiLsA');
  if(lg)lg.innerHTML='';if(la)la.innerHTML='';
  D.imageApis.forEach(function(a){
    if(a.role==='generate'||a.role==='both'){
      var elG=buildImgApiRow(a,'generate',a.id===D.activeImageGenId);
      if(lg)lg.appendChild(elG);
    }
    if(a.role==='analyze'||a.role==='both'){
      var elA=buildImgApiRow(a,'analyze',a.id===D.activeImageAnalyzeId);
      if(la)la.appendChild(elA);
    }
  });
  if(lg&&!lg.children.length)lg.innerHTML='<div style="font-size:11.5px;color:var(--text3);padding:6px 0">Belum ada API Generate</div>';
  if(la&&!la.children.length)la.innerHTML='<div style="font-size:11.5px;color:var(--text3);padding:6px 0">Belum ada API Analisis</div>';
}
function buildImgApiRow(a,role,isActive){
  var el=document.createElement('div');el.className='api-it';
  var dot=document.createElement('div');dot.className='api-dot '+(a.status==='ok'?'ok':a.status==='e'?'e':'u');
  var roleLabel=a.role==='both'?'both':(a.role==='generate'?'gen':'ana');
  var inf=document.createElement('div');inf.className='api-inf';
  inf.innerHTML='<b>'+esc(a.name)+'<span class="img-role-badge '+roleLabel+'">'+(a.role==='both'?'KEDUANYA':a.role==='generate'?'GEN':'ANALISIS')+'</span></b><span>'+esc((a.url||'').slice(0,34))+(isActive?' · <span class=\"img-active-tag\">✓ Aktif</span>':'')+'</span>';
  var ab=document.createElement('button');ab.className='api-ts';ab.textContent=isActive?'✓ Aktif':'Aktifkan';
  ab.style.opacity=isActive?'.6':'1';
  ab.addEventListener('click',function(){
    if(role==='generate')D.activeImageGenId=a.id;else D.activeImageAnalyzeId=a.id;
    svD();renderImageApiLists();toast((role==='generate'?'Generate':'Analisis')+' aktif: '+a.name);
  });
  var db=document.createElement('button');db.className='api-dl';db.innerHTML='✕';
  db.addEventListener('click',function(){
    D.imageApis=D.imageApis.filter(function(x){return x.id!==a.id;});
    if(D.activeImageGenId===a.id)D.activeImageGenId=null;
    if(D.activeImageAnalyzeId===a.id)D.activeImageAnalyzeId=null;
    svD();renderImageApiLists();toast('API gambar dihapus');
  });
  el.appendChild(dot);el.appendChild(inf);el.appendChild(ab);el.appendChild(db);
  return el;
}
function addImageApi(){
  var nm=$('imgApNm')&&$('imgApNm').value.trim();
  var url=$('imgApUrl')&&$('imgApUrl').value.trim();
  var key=$('imgApKey')&&$('imgApKey').value.trim()||'';
  var mdl=$('imgApMdl')&&$('imgApMdl').value.trim()||'';
  var ver=$('imgApVer')&&$('imgApVer').value.trim()||'';
  var role=$('imgApRole')&&$('imgApRole').value||'generate';
  if(!nm||!url){toast('Isi nama & Base URL');return;}
  var entry={id:uid(),name:nm,url:url,key:key,model:mdl,version:ver,role:role,status:'u'};
  D.imageApis.push(entry);
  if(role==='generate'||role==='both'){if(!D.activeImageGenId)D.activeImageGenId=entry.id;}
  if(role==='analyze'||role==='both'){if(!D.activeImageAnalyzeId)D.activeImageAnalyzeId=entry.id;}
  svD();renderImageApiLists();
  ['imgApNm','imgApUrl','imgApKey','imgApMdl','imgApVer'].forEach(function(id){var e=$(id);if(e)e.value='';});
  toast('API gambar ditambahkan!');
}

function renderSnSel(){var sel=$('snApSel');if(!sel)return;sel.innerHTML='';D.apis.forEach(function(a){var o=document.createElement('option');o.value=a.id;o.textContent=a.name;sel.appendChild(o);});}
function sendApi(){var id=$('snApSel')&&$('snApSel').value;if(!id)return;D.activeApiId=id;svD();buildModelDrop();var a=D.apis.find(function(x){return x.id===id;});if(a)setEngUI(a.name,'ok');toast('API aktif diubah!');}

/* NOTIFICATIONS */
function renderNfList(){var l=$('nfLs');if(!l)return;l.innerHTML='';if(!D.notifications.length){l.innerHTML='<div style="font-size:11.5px;color:var(--text3)">Belum ada jadwal</div>';return;}D.notifications.forEach(function(n){var el=document.createElement('div');el.style.cssText='display:flex;align-items:center;gap:8px;padding:8px 11px;background:var(--surf3);border:1px solid var(--bdr);border-radius:9px;margin-bottom:5px';el.innerHTML='<div style="flex:1"><b style="font-size:12px">'+esc(n.title)+'</b><div style="font-size:10px;color:var(--text3)">'+esc(n.time)+'</div></div>';var del=document.createElement('button');del.style.cssText='background:transparent;border:none;color:var(--text3);cursor:pointer';del.textContent='✕';del.addEventListener('click',function(){D.notifications=D.notifications.filter(function(x){return x.id!==n.id;});svD();renderNfList();});el.appendChild(del);l.appendChild(el);});}
function addNotif(){var t=$('nfTl')&&$('nfTl').value.trim(),m=$('nfMs')&&$('nfMs').value.trim(),ti=$('nfTm')&&$('nfTm').value,rp=$('nfRp')&&$('nfRp').value;if(!t||!m||!ti){toast('Lengkapi field');return;}D.notifications.push({id:uid(),title:t,msg:m,time:ti,repeat:rp||'once'});svD();renderNfList();if($('nfTl'))$('nfTl').value='';if($('nfMs'))$('nfMs').value='';toast('Ditambahkan!');}
function startNfCheck(){clearInterval(nfIntv);nfIntv=setInterval(function(){var now=new Date();var hm=now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');D.notifications.forEach(function(n){if(n.time===hm){var k='nf_'+n.id+'_'+now.toDateString();if(!sessionStorage.getItem(k)){sessionStorage.setItem(k,'1');var tp=$('nfTlEl'),mp=$('nfMgEl'),np=$('nfPop');if(tp)tp.textContent='🔔 '+n.title;if(mp)mp.textContent=n.msg;if(np){np.classList.add('on');setTimeout(function(){np.classList.remove('on');},8000);}}}});},30000);}

/* PREMIUM CODES */
function renderCodeList(){var l=$('codeLs');if(!l)return;l.innerHTML='';if(!D.premCodes.length){l.innerHTML='<div style="font-size:11.5px;color:var(--text3)">Belum ada kode</div>';return;}D.premCodes.slice().reverse().forEach(function(c){var el=document.createElement('div');el.className='code-it';el.innerHTML='<code>'+esc(c.code)+'</code><span>'+(c.used?'✓ Terpakai':'Aktif')+'</span>';var d=document.createElement('button');d.className='code-dl';d.textContent='✕';d.addEventListener('click',function(){D.premCodes=D.premCodes.filter(function(x){return x.code!==c.code;});svD();renderCodeList();});el.appendChild(d);l.appendChild(el);});}
var genCode=function(){return 'VTX-'+Math.random().toString(36).slice(2,6).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase();};

/* SECURITY */
function saveCreds(){var u=$('nwU')&&$('nwU').value.trim(),p=$('nwP')&&$('nwP').value.trim(),pc=$('nwPC')&&$('nwPC').value.trim();if(!u||!p){toast('Isi semua field');return;}if(p!==pc){toast('Password tidak cocok');return;}D.user=u;D.pass=p;svD();['nwU','nwP','nwPC'].forEach(function(id){var e=$(id);if(e)e.value='';});toast('Kredensial diperbarui!');}

/* AD */
function chkAd(){if(!D.adActive||sessionStorage.getItem(AK))return;if(!D.adUrl&&!D.adText)return;sessionStorage.setItem(AK,'1');var ac=document.querySelector('.ad-c');if(ac)ac.style.maxWidth=D.adW||'400px';var mw=$('adMW');if(!mw)return;mw.innerHTML='';if(D.adUrl){var mxH=D.adH||'260px';if(D.adType==='video'){var v=document.createElement('video');v.className='ad-media';v.src=D.adUrl;v.autoplay=true;v.muted=true;v.loop=true;v.setAttribute('playsinline','');v.style.maxHeight=mxH;mw.appendChild(v);}else{var img=document.createElement('img');img.className='ad-media';img.src=D.adUrl;img.alt='';img.style.maxHeight=mxH;mw.appendChild(img);}}var at=$('adTxtEl');if(at){at.textContent=D.adText||'';at.style.display=D.adText?'block':'none';}var al=$('adLnkBtn');if(al){al.href=D.adLink||'#';al.style.display=D.adLink?'flex':'none';}var ao=$('adOv');if(ao)ao.classList.add('on');}

/* MUSIC */
function playMusic(idx){if(!D.music||!D.music.length)return;if(musicAudio)musicAudio.pause();musicIdx=((idx%D.music.length)+D.music.length)%D.music.length;musicAudio=new Audio(D.music[musicIdx].url);musicAudio.volume=0.5;musicAudio.play().catch(function(){});musicAudio.onended=function(){playMusic(musicIdx+1);};var mt=$('musicTitle');if(mt)mt.textContent=D.music[musicIdx].name;setMusicIcon(true);renderSettingsMusicList();}
function setMusicIcon(playing){
  var ic=$('musicPlayIcon');if(!ic)return;
  if(playing)ic.outerHTML='<svg viewBox="0 0 24 24" id="musicPlayIcon"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  else ic.outerHTML='<svg viewBox="0 0 24 24" id="musicPlayIcon"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
}
function stopMusic(){if(musicAudio){musicAudio.pause();}setMusicIcon(false);renderSettingsMusicList();}
function renderSettingsMusicList(){var sl=$('stMusicList');if(!sl)return;sl.innerHTML='';if(!D.music||!D.music.length){sl.innerHTML='<div style="font-size:11.5px;color:var(--text3)">Belum ada musik</div>';return;}D.music.forEach(function(m,i){var el=document.createElement('div');el.style.cssText='display:flex;align-items:center;gap:8px;padding:9px 12px;background:var(--surf2);border:1px solid var(--bdr);border-radius:10px;margin-bottom:6px';el.innerHTML='<span>🎵</span><span style="flex:1;font-size:12.5px">'+esc(m.name)+'</span>';var pb=document.createElement('button');pb.style.cssText='padding:3px 10px;border:1px solid var(--bdr);border-radius:7px;background:var(--surf3);font-size:11.5px;cursor:pointer';pb.textContent='▶';pb.addEventListener('click',function(){playMusic(i);});el.appendChild(pb);sl.appendChild(el);});}
function renderDvMusicList(){var l=$('dvMusicList');if(!l)return;l.innerHTML='';if(!D.music||!D.music.length){l.innerHTML='<div style="font-size:11.5px;color:var(--text3)">Belum ada musik</div>';return;}D.music.forEach(function(m,i){var el=document.createElement('div');el.style.cssText='display:flex;align-items:center;gap:9px;padding:8px 11px;background:var(--surf3);border:1px solid var(--bdr);border-radius:10px;margin-bottom:6px';el.innerHTML='<span>🎵</span><span style="flex:1;font-size:12px">'+esc(m.name)+'</span>';var d=document.createElement('button');d.style.cssText='background:transparent;border:none;cursor:pointer;color:var(--text3)';d.textContent='✕';d.addEventListener('click',function(){D.music.splice(i,1);svD();renderDvMusicList();renderSettingsMusicList();});el.appendChild(d);l.appendChild(el);});}

/* LINKS */
function renderDvLinkList(){var l=$('dvLinkList');if(!l)return;l.innerHTML='';if(!D.customLinks||!D.customLinks.length){l.innerHTML='<div style="font-size:11.5px;color:var(--text3)">Belum ada link</div>';return;}D.customLinks.forEach(function(lk,i){var el=document.createElement('div');el.style.cssText='display:flex;align-items:center;gap:8px;padding:8px 11px;background:var(--surf3);border:1px solid var(--bdr);border-radius:9px;margin-bottom:5px';el.innerHTML='<span>'+esc(lk.icon||'🔗')+'</span><span style="flex:1;font-size:12px">'+esc(lk.name)+'</span>';var d=document.createElement('button');d.style.cssText='background:transparent;border:none;cursor:pointer;color:var(--text3)';d.textContent='✕';d.addEventListener('click',function(){D.customLinks.splice(i,1);svD();renderDvLinkList();renderSettingsLinks();});el.appendChild(d);l.appendChild(el);});}
function addCustomLink(){var nm=$('lkName')&&$('lkName').value.trim(),url=$('lkUrl')&&$('lkUrl').value.trim(),icon=$('lkIcon')&&$('lkIcon').value.trim()||'🔗';if(!nm||!url){toast('Isi nama & URL');return;}if(!D.customLinks)D.customLinks=[];D.customLinks.push({name:nm,url:url,icon:icon});svD();renderDvLinkList();renderSettingsLinks();['lkName','lkUrl','lkIcon'].forEach(function(id){var e=$(id);if(e)e.value='';});toast('Link ditambahkan!');}
function renderSettingsLinks(){var c=$('tab-lnk');if(!c)return;c.querySelectorAll('.lc-custom').forEach(function(e){e.remove();});(D.customLinks||[]).forEach(function(lk){var a=document.createElement('a');a.className='lc lc-custom';a.href=lk.url;a.target='_blank';a.rel='noopener';a.innerHTML='<div class="lc-ic">'+esc(lk.icon||'🔗')+'</div><div class="lc-i"><b>'+esc(lk.name)+'</b><span>'+esc(lk.url.slice(0,35))+'</span></div>';c.appendChild(a);});}

/* USER ACTIVITY */
function renderUserActivity(){var l=$('uaList');if(!l)return;var ul=[];try{ul=JSON.parse(localStorage.getItem('pz_ul')||'[]');}catch(e){}if(!ul.length){l.innerHTML='<div style="font-size:12px;color:var(--text3)">Belum ada pengguna login</div>';return;}l.innerHTML='';ul.forEach(function(u,i){var el=document.createElement('div');el.style.cssText='padding:11px 13px;background:var(--surf3);border:1px solid '+(u.blocked?'rgba(239,68,68,.3)':'var(--bdr)')+';border-radius:11px;margin-bottom:6px';el.innerHTML='<div style="display:flex;align-items:center;gap:9px;margin-bottom:8px"><div style="width:32px;height:32px;border-radius:50%;background:var(--dv);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700">'+esc((u.name||'?')[0].toUpperCase())+'</div><div style="flex:1"><b>'+esc(u.name||'?')+'</b><div style="font-size:11px;color:var(--text3)">'+esc(u.email||'no email')+' · '+esc(u.loginType||'guest')+'</div></div>'+(u.blocked?'<span style="font-size:10px;color:#f87171;background:rgba(239,68,68,.1);padding:2px 8px;border-radius:99px">BLOCKED</span>':'')+'</div><div style="display:flex;gap:6px;flex-wrap:wrap"><button onclick="devToggleBlock('+i+')" style="padding:5px 11px;border:1px solid var(--bdr);border-radius:8px;background:var(--surf2);font-size:11px;cursor:pointer;color:var(--text)">'+(u.blocked?'🔓 Unblokir':'🚫 Blokir')+'</button><button onclick="devDelUser('+i+')" style="padding:5px 11px;border:1px solid rgba(239,68,68,.3);border-radius:8px;background:transparent;font-size:11px;cursor:pointer;color:#e04f4f">Hapus</button></div>';l.appendChild(el);});}
function devToggleBlock(i){try{var ul=JSON.parse(localStorage.getItem('pz_ul')||'[]');if(ul[i]){ul[i].blocked=!ul[i].blocked;localStorage.setItem('pz_ul',JSON.stringify(ul));renderUserActivity();toast(ul[i].blocked?'Diblokir':'Blokir dicabut');}}catch(e){}}
function devDelUser(i){try{var ul=JSON.parse(localStorage.getItem('pz_ul')||'[]');ul.splice(i,1);localStorage.setItem('pz_ul',JSON.stringify(ul));renderUserActivity();toast('Dihapus');}catch(e){}}

/* CYBER SECURITY SLOTS */
function renderCsSlots(){var l=$('csSlots');if(!l)return;l.innerHTML='';var labels=['Login Developer','Login Pengguna','Deteksi Mencurigakan','Notifikasi Developer','Limit Password','Anti-Spam API'];var saved=D.csSlots||[];labels.forEach(function(name,i){var s=saved[i]||{active:false,api:''};var el=document.createElement('div');el.style.cssText='padding:11px 13px;background:var(--surf3);border:1px solid var(--bdr);border-radius:11px;margin-bottom:7px';el.innerHTML='<div style="display:flex;align-items:center;gap:9px;margin-bottom:7px"><b style="font-size:12px;flex:1">CS'+(i+1)+': '+esc(name)+'</b><div class="tgl '+(s.active?'on':'')+'" id="cst'+i+'"></div></div><input type="text" value="'+esc(s.api||'')+'" placeholder="API URL / Key..." style="width:100%;padding:7px 10px;background:var(--surf2);border:1px solid var(--bdr);border-radius:8px;color:var(--text);font-family:var(--fb);font-size:12px;outline:none;box-sizing:border-box">';var tgl=el.querySelector('#cst'+i);if(tgl)tgl.addEventListener('click',function(){var idx=i;var curSaved=D.csSlots||[];while(curSaved.length<=idx)curSaved.push({active:false,api:''});curSaved[idx].active=!curSaved[idx].active;D.csSlots=curSaved;svD();tgl.classList.toggle('on',curSaved[idx].active);toast('CS'+(idx+1)+': '+(curSaved[idx].active?'ON':'OFF'));});var inp=el.querySelector('input');if(inp)inp.addEventListener('change',function(){var idx=i;var curSaved=D.csSlots||[];while(curSaved.length<=idx)curSaved.push({active:false,api:''});curSaved[idx].api=inp.value;D.csSlots=curSaved;svD();});l.appendChild(el);});}

/* INTRO */
function showIntro(){
  introDone=false;
  var el=$('intro');if(!el)return;
  el.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;z-index:999999;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:1';
  var nm=$('intro-name');
  if(nm){nm.style.cssText='font-family:var(--fd);font-size:clamp(24px,8vw,46px);font-weight:800;color:#fff;opacity:0;transform:translateY(20px);transition:opacity 1s .4s,transform 1s .4s;text-align:center;padding:0 24px';nm.textContent=D.siteName||'Veyzen AI - Ops';}
  var sb=$('intro-sub');
  if(sb){sb.style.cssText='font-size:12px;color:#555;letter-spacing:.1em;text-transform:uppercase;opacity:0;transition:opacity 1s 1s;margin-top:8px';}
  if(D.introBanner){var bw=$('intro-banner-wrap');if(bw){bw.innerHTML=D.introBannerType==='video'?'<video src="'+D.introBanner+'" autoplay muted loop playsinline style="width:100%;max-height:38vh;object-fit:cover"></video>':'<img src="'+D.introBanner+'" style="width:100%;max-height:38vh;object-fit:cover">';}}
  requestAnimationFrame(function(){requestAnimationFrame(function(){if(nm){nm.style.opacity='1';nm.style.transform='translateY(0)';}if(sb)sb.style.opacity='0.6';});});
  /* Splash stays until user presses CTA button - no auto-skip timer */
}
function skipIntro(){
  if(introDone)return;introDone=true;
  var el=$('intro');if(!el)return;
  el.style.transition='opacity .5s ease';el.style.opacity='0';
  setTimeout(function(){if(el)el.style.display='none';},600);
  if(typeof afterIntroGate==='function')setTimeout(afterIntroGate,650);
}

/* RATING */
function initRatingStars(){
  var stars=document.querySelectorAll('.star');
  if(!stars.length)return;
  stars.forEach(function(s){
    s.addEventListener('click',function(){selectedRating=parseInt(s.dataset.v)||0;stars.forEach(function(x){x.classList.toggle('on',parseInt(x.dataset.v)<=selectedRating);x.style.opacity=parseInt(x.dataset.v)<=selectedRating?'1':'.4';});});
    s.addEventListener('mouseover',function(){var v=parseInt(s.dataset.v);stars.forEach(function(x){x.style.opacity=parseInt(x.dataset.v)<=v?'1':'.4';});});
    s.addEventListener('mouseout',function(){stars.forEach(function(x){x.style.opacity=parseInt(x.dataset.v)<=selectedRating?'1':'.4';});});
  });
}
function loadMyRating(){
  var ratings=[];try{ratings=JSON.parse(localStorage.getItem('pz_ratings')||'[]');}catch(e){}
  var uid_me=U.email||U.name||'guest';
  var mine=ratings.find(function(r){return r.uid===uid_me;});
  if(mine){
    var txt=$('ratingText');if(txt)txt.value=mine.text||'';
    selectedRating=mine.stars||0;
    document.querySelectorAll('.star').forEach(function(s){var v=parseInt(s.dataset.v)||0;s.classList.toggle('on',v<=selectedRating);s.style.opacity=v<=selectedRating?'1':'.4';});
    var btn=$('btnSubmitRating');if(btn)btn.textContent='✏️ Perbarui Penilaian';
  }
}
function renderRatingList(){var l=$('ratingList');if(!l)return;var ratings=[];try{ratings=JSON.parse(localStorage.getItem('pz_ratings')||'[]');}catch(e){}if(!ratings.length){l.innerHTML='<div style="font-size:12px;color:var(--text3)">Belum ada penilaian</div>';return;}l.innerHTML='';ratings.slice().reverse().forEach(function(r){var el=document.createElement('div');el.className='rating-item';var stars='';for(var i=1;i<=5;i++)stars+='<span style="color:'+(i<=r.stars?'#fbbf24':'#555')+'">★</span>';el.innerHTML='<div class="ri-header"><div class="ri-av">'+esc((r.name||'?')[0].toUpperCase())+'</div><div class="ri-name">'+esc(r.name||'Anonim')+'</div><div style="font-size:14px">'+stars+'</div></div><div style="font-size:13px;line-height:1.6;color:var(--text2)">'+esc(r.text||'')+'</div>'+(r.devReply?'<div class="dev-reply">💬 Developer: '+esc(r.devReply)+'</div>':'');l.appendChild(el);});}
function submitRating(){
  if(!selectedRating){toast('Pilih bintang dulu');return;}
  var text=$('ratingText')&&$('ratingText').value.trim()||'';
  var ratings=[];try{ratings=JSON.parse(localStorage.getItem('pz_ratings')||'[]');}catch(e){}
  var name=U.name||S.username||'Anonim';
  var uid_me=U.email||U.name||'guest';
  var existing=ratings.findIndex(function(r){return r.uid===uid_me;});
  if(existing>=0){
    ratings[existing].stars=selectedRating;ratings[existing].text=text;ratings[existing].edited=Date.now();
    toast('⭐ Penilaian diperbarui!');
  }else{
    ratings.push({id:uid(),uid:uid_me,name:name,stars:selectedRating,text:text,time:Date.now()});
    toast('⭐ Penilaian dikirim!');
  }
  try{localStorage.setItem('pz_ratings',JSON.stringify(ratings));}catch(e){}
  if($('ratingText'))$('ratingText').value='';
  selectedRating=0;document.querySelectorAll('.star').forEach(function(s){s.classList.remove('on');s.style.opacity='.4';});
  renderRatingList();
}

/* LOGIN */

function saveUserToDev(){try{var ul=JSON.parse(localStorage.getItem('pz_ul')||'[]');if(!ul.find(function(u){return u.email===U.email&&u.name===U.name;}))ul.push({name:U.name,email:U.email,loginType:U.loginType,time:Date.now(),blocked:false});localStorage.setItem('pz_ul',JSON.stringify(ul));}catch(e){}}
function activatePremium(){var code=($('premCI')&&$('premCI').value||'').trim().toUpperCase();if(!code){toast('Masukkan kode');return;}var idx=D.premCodes.findIndex(function(c){return c.code===code&&!c.used;});if(idx>=0){D.premCodes[idx].used=true;U.premium=true;svD();svU();renderUaInfo();if($('premCI'))$('premCI').value='';showPremiumWelcome(U.name||S.username);toast('\ud83c\udf89 Selamat datang Premium!');}else toast('Kode tidak valid');}

/* EXPORT/IMPORT */
function exportChats(){if(!S.chats.length){toast('Tidak ada chat');return;}var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S.chats,null,2)],{type:'application/json'}));a.download='veytrix-'+Date.now()+'.json';a.click();toast('Diekspor!');}
function importChats(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){try{var imp=JSON.parse(ev.target.result);if(!Array.isArray(imp))throw new Error();S.chats=S.chats.concat(imp);svS();renderHistory();toast('Import: '+imp.length+' chat');}catch(ex){toast('Format salah');}};r.readAsText(f);e.target.value='';}

/* ═══════════════════════════════════ */
/* INIT + BINDINGS — called after DOM */
/* ═══════════════════════════════════ */
function init(){
  /* Load saved state */
  ldS();ldD();ldU();
  chkBlk();
  /* Cek domain resmi — kalau ini hasil clone/dijalankan dari luar domain, hentikan di sini */
  if(!checkDomainLock()){showCloneBlockScreen();return;}
  try{var sm=localStorage.getItem('pz_mem');if(sm){var pm=JSON.parse(sm);if(Array.isArray(pm))mem=pm.slice(-12);}}catch(e){}

  /* Apply saved state */
  applyTheme();
  applyDesktopMode();
  buildModelDrop();
  applyBranding();
  applyProfileAll();

  /* Sync UI */
  var usrI=$('usrI');if(usrI)usrI.value=S.username||'';
  var tgM=$('tgM');if(tgM)tgM.classList.toggle('on',!!S.mem);
  var tgFB=$('tgFB');if(tgFB)tgFB.classList.toggle('on',!!S.fallback);
  var tgDk=$('tglDk');if(tgDk)tgDk.classList.toggle('on',!!S.dark);

  /* Restore chat or show hero */
  renderHistory();
  if(S.activeId&&S.chats.find(function(x){return x.id===S.activeId;}))restoreChat(S.activeId);
  else showHero();

  setEngUI(getApi().name,'ok');
  startNfCheck();
  chkAd();
  renderUaInfo();
  initRatingStars();
  renderSettingsLinks();
  renderRatingList();
  renderSettingsMusicList();
  renderStModelList();renderAiInfoList();loadPinMem();renderPinMemList();updateModePill();
  bindPremCards();applyPremPrices();

  /* Show dev quick button */
  if(localStorage.getItem('pz_dvs')){var bq=$('btnDevQ');if(bq)bq.style.display='flex';}

  /* Load Remote Config — developer upload sekali, semua device dapat
     Pasang URL JSON di Panel Dev → Pengaturan Global
     Tidak akan block render jika gagal (timeout/offline) */
  loadRemoteConfig();

  /* Load language preference */
  try{LANG=localStorage.getItem('pz_lang')||'id';}catch(e){}
  ensureNewFields();
  /* BIND ALL (before intro so buttons always work) */
  try{bindAll();}catch(e){console.error('bindAll error:',e);}

  /* Intro — tampil setiap kali buka, auto-skip jika sudah login */
  try{
    if(D.showIntro!==false&&!U.loggedIn){
      showIntro();
    }else{
      var intro=$('intro');if(intro)intro.style.display='none';
    }
  }catch(e){console.error('intro error:',e);var introE=$('intro');if(introE)introE.style.display='none';}

  /* First-visit / 30-day-return: show welcome gate, else open login modal directly \u2014 triggered right after intro actually finishes (skipIntro), not on a fixed timer */
  /* Tanpa login/welcome-gate/anti-bot — langsung ke chat setelah splash */
  window.afterIntroGate=function(){};
}

/* ═══════════════════════════════════════════════════════
   PROTEKSI ANTI-CLONE
   Fakta jujur: kode client-side (HTML/JS) SELALU bisa dilihat/
   disalin browser siapapun — tidak ada cara membuatnya 100% tidak
   bisa disalin. Yang BISA dilakukan: bikin salinan hasil clone
   TIDAK BERFUNGSI kalau dijalankan di luar domain asli — efektif
   menghentikan tools "web to zip" otomatis yang cuma nyalin file
   mentah tanpa mengedit kode.
   Developer wajib isi domain resmi di D.allowedDomains sebelum deploy.
═══════════════════════════════════════════════════════ */
function checkDomainLock(){
  var allowed=D.allowedDomains||[];
  if(!allowed.length)return true; /* belum dikonfigurasi dev = tidak dikunci, biar tidak ke-lock diri sendiri */
  var host=location.hostname.toLowerCase();
  var proto=location.protocol;
  if(proto==='file:')return false; /* dibuka langsung dari file = hasil download/clone */
  return allowed.some(function(d){
    d=d.toLowerCase().trim();
    return host===d||host.endsWith('.'+d);
  });
}
function showCloneBlockScreen(){
  var el=document.getElementById('app-shell')||document.body;
  var block=document.createElement('div');
  block.style.cssText='position:fixed;inset:0;z-index:2147483647;background:#000;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center;font-family:sans-serif';
  block.innerHTML='<svg viewBox="0 0 24 24" style="width:48px;height:48px;margin-bottom:16px" fill="none" stroke="#ef4444" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="4.9" y1="4.9" x2="19.1" y2="19.1"/></svg>'
    +'<h2 style="margin:0 0 8px;font-size:18px">Salinan Tidak Sah</h2>'
    +'<p style="margin:0;font-size:13px;color:#999;max-width:300px;line-height:1.6">Halaman ini adalah salinan/clone dan tidak diizinkan berjalan di luar domain resminya.</p>';
  document.body.innerHTML='';
  document.body.appendChild(block);
}
function ensureNewFields(){
  /* Init fields yang tidak ada di localStorage lama user */
  if(!D.blackenApi)D.blackenApi={url:'https://api-nanzz.my.id/docs/api/ai-image/to-ireng.php?url=',active:true};
  if(!D.tiktokThemeApi)D.tiktokThemeApi={url:'https://api-nanzz.my.id/docs/api/search/tiktok.php?q=',active:true,limit:3};
  if(!D.randomApis){
    D.randomApis={
      waifu:{name:'Waifu Anime',emoji:'',urls:['https://api-nanzz.my.id/docs/api/random/waifu.php'],active:true,type:'waifu'},
      cecan:{name:'Cecan',emoji:'',urls:['https://api-nanzz.my.id/docs/api/random/cecan.php?country='],active:true,type:'cecan',hasCountry:true,
        countries:['Indonesia','Korea','Malaysia','Thailand','Japan','China','Vietnam','Philippines','Singapore','India']},
      pap:{name:'Pap',emoji:'',urls:[],active:false,type:'pap'},
      meme:{name:'Meme',emoji:'',urls:[],active:false,type:'meme'},
      memepres:{name:'Meme Presiden',emoji:'',urls:[],active:false,type:'memepres'},
      wallpaper:{name:'Wallpaper',emoji:'',urls:[],active:false,type:'wallpaper'}
    };svD();
  }
  if(!D.searchApis){
    D.searchApis={tiktok:{name:'TikTok',url:'https://api-nanzz.my.id/docs/api/search/tiktok.php?q=',active:true,limit:3}};
    svD();
  }
  if(!D.downloaderApis||!D.downloaderApis.length){
    D.downloaderApis=[
      {id:'dl1',name:'TikTok',url:'https://api-nanzz.my.id/docs/api/downloader/tiktokv2.php?url=',platforms:['tiktok','vt.tiktok','vm.tiktok'],active:true},
      {id:'dl2',name:'Instagram',url:'',platforms:['instagram','instagr.am'],active:false},
      {id:'dl3',name:'YouTube',url:'',platforms:['youtube','youtu.be'],active:false},
      {id:'dl4',name:'Pinterest',url:'',platforms:['pinterest','pin.it'],active:false},
      {id:'dl5',name:'Facebook',url:'',platforms:['facebook','fb.watch'],active:false},
      {id:'dl6',name:'Custom',url:'',platforms:[],active:false}
    ];svD();
  }
}
function bindAll(){
  /* Intro */
  $('intro-skip')&&$('intro-skip').addEventListener('click',skipIntro);
  $('lbCloseBtn')&&$('lbCloseBtn').addEventListener('click',closeLightbox);
  $('imgLightbox')&&$('imgLightbox').addEventListener('click',function(e){if(e.target.id==='imgLightbox')closeLightbox();});
  $('lbDownloadBtn')&&$('lbDownloadBtn').addEventListener('click',function(){if(_lbCurrentUrl)downloadImage($('lbDownloadBtn'),_lbCurrentUrl,'veyzen-img');});
  $('btnModePill')&&$('btnModePill').addEventListener('click',openModeSheet);
  $('modeSheetOv')&&$('modeSheetOv').addEventListener('click',closeModeSheet);
  $('modeSheetPrem')&&$('modeSheetPrem').addEventListener('click',function(){closeModeSheet();openST();openStSub('premium');});

  /* Overlay */
  $('ov')&&$('ov').addEventListener('click',function(){closeSB();closeST();});

  /* Topbar */
  $('btnMn')&&$('btnMn').addEventListener('click',openSB);
  $('btnCSB')&&$('btnCSB').addEventListener('click',closeSB);
  $('btnNC2')&&$('btnNC2').addEventListener('click',function(){S.activeId=null;mem=[];showHero();renderHistory();});
  $('btnMore')&&$('btnMore').addEventListener('click',function(e){e.stopPropagation();var m=$('moreMenu');if(m)m.style.display=m.style.display==='none'?'block':'none';});
  $('mmSt')&&$('mmSt').addEventListener('click',function(){openST();closeStSub();var m=$('moreMenu');if(m)m.style.display='none';});
  $('mmThm')&&$('mmThm').addEventListener('click',function(){S.dark=!S.dark;applyTheme();svS();var m=$('moreMenu');if(m)m.style.display='none';});
  document.addEventListener('click',function(e){var m=$('moreMenu');if(m&&m.style.display!=='none'&&!e.target.closest('#btnMore')&&!e.target.closest('#moreMenu'))m.style.display='none';document.querySelectorAll('.mdl-dp.on').forEach(function(d){d.classList.remove('on');});});

  /* Settings tabs */
  $('btnSt')&&$('btnSt').addEventListener('click',openST);
  $('btnCSt')&&$('btnCSt').addEventListener('click',function(){closeStSub();closeST();});
  document.querySelectorAll('.stab').forEach(function(t){t.addEventListener('click',function(){document.querySelectorAll('.stab').forEach(function(x){x.classList.remove('on');});document.querySelectorAll('.ssec').forEach(function(x){x.classList.remove('on');});t.classList.add('on');var s=$('tab-'+t.dataset.s);if(s)s.classList.add('on');if(t.dataset.s==='acc')renderUaInfo();if(t.dataset.s==='ai'){renderSettingsMusicList();renderStModelList();populateVoiceSel();var ss=$('aiStyleSel');if(ss)ss.value=D.aiStyle||'original';}if(t.dataset.s==='rat'){renderRatingList();initRatingStars();if(U.loggedIn)loadMyRating();}if(t.dataset.s==='lnk')renderSettingsLinks();});});

  /* Settings controls */
  $('tglDk')&&$('tglDk').addEventListener('click',function(){S.dark=!S.dark;applyTheme();svS();});
  $('tglDesktop')&&$('tglDesktop').addEventListener('click',function(){S.desktopMode=!S.desktopMode;applyDesktopMode();svS();toast('Mode Komputer: '+(S.desktopMode?'ON':'OFF'));});
  $('btnThm')&&$('btnThm').addEventListener('click',function(){S.dark=!S.dark;applyTheme();svS();});
  $('tgM')&&$('tgM').addEventListener('click',function(){S.mem=!S.mem;$('tgM').classList.toggle('on',S.mem);svS();toast(S.mem?'Memori ON':'Memori OFF');});
  $('tgFB')&&$('tgFB').addEventListener('click',function(){S.fallback=!S.fallback;$('tgFB').classList.toggle('on',S.fallback);svS();});
  $('btnSvN')&&$('btnSvN').addEventListener('click',function(){var v=$('usrI')&&$('usrI').value.trim();if(v){S.username=v;svS();toast('Nama: '+v);}});

  /* Sidebar bottom */
  $('btnSrch')&&$('btnSrch').addEventListener('click',function(){openSB();setTimeout(function(){var s=$('srchI');if(s)s.focus();},300);});
  $('musicPlay')&&$('musicPlay').addEventListener('click',function(){
    if(musicAudio&&!musicAudio.paused){stopMusic();}
    else if(musicAudio&&musicAudio.paused){musicAudio.play().catch(function(){});setMusicIcon(true);}
    else if(D.music&&D.music.length){playMusic(0);}
    else toast('Belum ada musik. Minta developer upload musik.');
  });
  $('musicNext')&&$('musicNext').addEventListener('click',function(){if(D.music&&D.music.length)playMusic(musicIdx+1);else toast('Belum ada musik');});
  $('btnStSb')&&$('btnStSb').addEventListener('click',function(){closeSB();openST();});
  $('btnNC')&&$('btnNC').addEventListener('click',function(){S.activeId=null;mem=[];showHero();renderHistory();closeSB();});

  /* Search */
  $('srchI')&&$('srchI').addEventListener('input',function(){renderHistory(this.value.toLowerCase());});

  /* Chat */
  $('btnSd')&&$('btnSd').addEventListener('click',function(){if(busy){stopGeneration();return;}send();});
  $('pt')&&$('pt').addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}});
  $('pt')&&$('pt').addEventListener('input',function(){this.style.height='42px';this.style.height=Math.min(this.scrollHeight,150)+'px';});
  $('btnUp')&&$('btnUp').addEventListener('click',function(){$('fiIn')&&$('fiIn').click();});
  $('fiIn')&&$('fiIn').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;pending=f;showFP(f);e.target.value='';});
  $('btnFR')&&$('btnFR').addEventListener('click',clearFP);
  $('btnVo')&&$('btnVo').addEventListener('click',voiceToggle);
  var vsel=$('voiceSel');if(vsel){vsel.value=D.ttsVoice||'bella';vsel.addEventListener('change',function(){D.ttsVoice=vsel.value;svD();toast('Suara: '+vsel.options[vsel.selectedIndex].text);});}

  /* History */
  $('btnClr')&&$('btnClr').addEventListener('click',function(){if(!confirm('Hapus semua riwayat?'))return;S.chats=[];S.activeId=null;mem=[];svS();renderHistory();showHero();toast('Riwayat dihapus');});
  $('btnExp')&&$('btnExp').addEventListener('click',exportChats);
  $('btnImpT')&&$('btnImpT').addEventListener('click',function(){$('impI')&&$('impI').click();});
  $('impI')&&$('impI').addEventListener('change',importChats);

  $('profPicIn')&&$('profPicIn').addEventListener('change',function(e){
    var f=e.target.files[0];if(!f)return;
    var r=new FileReader();r.onload=function(ev){
      U.pic=ev.target.result;svU();
      var av=document.getElementById('profAvBig');if(av)av.innerHTML='<img src="'+U.pic+'" style="width:100%;height:100%;object-fit:cover">';
      renderUaInfo();applyProfileAll();toast('Foto profil diperbarui!');
    };r.readAsDataURL(f);e.target.value='';
  });
  $('btnAcPr')&&$('btnAcPr').addEventListener('click',activatePremium);
  $('btnSaveMem')&&$('btnSaveMem').addEventListener('click',function(){try{localStorage.setItem('pz_mem',JSON.stringify(mem));if(U.memKey)localStorage.setItem(U.memKey,JSON.stringify(mem));}catch(e){}toast('💾 Memori disimpan!');});

  /* Login modal */
  $('adClBtn')&&$('adClBtn').addEventListener('click',function(){$('adOv')&&$('adOv').classList.remove('on');});
  $('adSkip')&&$('adSkip').addEventListener('click',function(){$('adOv')&&$('adOv').classList.remove('on');});
  $('nfCx')&&$('nfCx').addEventListener('click',function(){$('nfPop')&&$('nfPop').classList.remove('on');});

  /* Dev trigger (10 taps) */
  $('dvTrig')&&$('dvTrig').addEventListener('click',function(){dvTap++;clearTimeout(dvTimer);dvTimer=setTimeout(function(){dvTap=0;},2500);if(dvTap>=10){dvTap=0;clearTimeout(dvTimer);openDvLg();}});
  $('btnDevQ')&&$('btnDevQ').addEventListener('click',openDvDs);
  $('dlCn')&&$('dlCn').addEventListener('click',function(){$('dvLg')&&$('dvLg').classList.remove('on');});
  $('dlSb')&&$('dlSb').addEventListener('click',doDvLg);
  $('dlP')&&$('dlP').addEventListener('keydown',function(e){if(e.key==='Enter')doDvLg();});
  $('dlVC')&&$('dlVC').addEventListener('keydown',function(e){if(e.key==='Enter')doCsAnswer();});

  /* Dev dashboard */
  $('btnDEx')&&$('btnDEx').addEventListener('click',function(){$('dvDs')&&$('dvDs').classList.remove('on');});
  document.querySelectorAll('.dd-ni').forEach(function(ni){ni.addEventListener('click',function(){showDvPg(ni.dataset.p);});});
  $('btnSvBr')&&$('btnSvBr').addEventListener('click',function(){D.siteName=$('bSN')&&$('bSN').value.trim()||'Veyzen AI - Ops';D.aiName=$('bAN')&&$('bAN').value.trim()||'Veyzen AI - Ops';D.subtitle=$('bST')&&$('bST').value.trim()||'';svD();applyBranding();showHero();toast('Branding disimpan!');});
  $('btnPfPk')&&$('btnPfPk').addEventListener('click',function(){$('pfIn')&&$('pfIn').click();});
  $('pfIn')&&$('pfIn').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){D.profileUrl=ev.target.result;D.profileType=f.type.indexOf('video')>=0?'video':'image';svD();applyProfileAll();toast('Profil disimpan!');};r.readAsDataURL(f);e.target.value='';});
  $('btnPfRm')&&$('btnPfRm').addEventListener('click',function(){D.profileUrl=null;D.profileType=null;svD();applyProfileAll();toast('Profil dihapus');});
  $('tglAd')&&$('tglAd').addEventListener('click',function(){D.adActive=!D.adActive;$('tglAd').classList.toggle('on',D.adActive);svD();});
  $('btnAdM')&&$('btnAdM').addEventListener('click',function(){$('adMI')&&$('adMI').click();});
  $('adMI')&&$('adMI').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){D.adUrl=ev.target.result;D.adType=f.type.indexOf('video')>=0?'video':'image';var w=$('adPv');if(w)w.innerHTML=D.adType==='video'?'<video src="'+D.adUrl+'" controls></video>':'<img src="'+D.adUrl+'">';svD();toast('Media diunggah!');};r.readAsDataURL(f);e.target.value='';});
  $('btnSvAd')&&$('btnSvAd').addEventListener('click',function(){D.adText=$('adTI')&&$('adTI').value.trim()||'';D.adLink=$('adLI')&&$('adLI').value.trim()||'';D.adW=$('adW')&&$('adW').value.trim()||'';D.adH=$('adH')&&$('adH').value.trim()||'';svD();toast('Iklan disimpan!');});
  $('btnANf')&&$('btnANf').addEventListener('click',addNotif);
  $('btnAddAp')&&$('btnAddAp').addEventListener('click',addApi);
  $('btnTstAll')&&$('btnTstAll').addEventListener('click',function(){var i=0;function nxt(){if(i<D.apis.length)testApi(D.apis[i++].id).then?testApi(D.apis[i-1].id).then(nxt):setTimeout(nxt,200);}nxt();});
  $('btnSnAp')&&$('btnSnAp').addEventListener('click',sendApi);
  $('btnTN')&&$('btnTN').addEventListener('click',function(){showApiTab('normal');});
  $('btnTP')&&$('btnTP').addEventListener('click',function(){showApiTab('premium');});
  $('btnAddImgAp')&&$('btnAddImgAp').addEventListener('click',addImageApi);
  $('btnImgTG')&&$('btnImgTG').addEventListener('click',function(){showImgApiTab('generate');});
  $('btnImgTA')&&$('btnImgTA').addEventListener('click',function(){showImgApiTab('analyze');});
  $('btnTN')&&$('btnTN').addEventListener('click',function(){var ln=$('apiLsN'),lp=$('apiLsP');if(ln)ln.style.display='flex';if(lp)lp.style.display='none';});
  $('btnTP')&&$('btnTP').addEventListener('click',function(){var ln=$('apiLsN'),lp=$('apiLsP');if(ln)ln.style.display='none';if(lp)lp.style.display='flex';});
  $('btnSvAI')&&$('btnSvAI').addEventListener('click',addAiInfo);
  $('btnSvStyle')&&$('btnSvStyle').addEventListener('click',function(){var s=$('aiStyleSel')&&$('aiStyleSel').value;if(s){D.aiStyle=s;svD();toast('Gaya AI disimpan: '+s);}});
  var aiss=$('aiStyleSel');if(aiss)aiss.value=D.aiStyle||'original';
  $('btnClrPin')&&$('btnClrPin').addEventListener('click',function(){if(confirm('Hapus semua memori permanen?')){pinMem=[];savePinMem();renderPinMemList();toast('Semua memori dihapus');}});
  $('musicStop')&&$('musicStop').addEventListener('click',function(){if(musicAudio){musicAudio.pause();musicAudio.currentTime=0;}setMusicIcon(false);var mt=$('musicTitle');if(mt)mt.textContent='Tidak ada musik diputar';});
  var vsel2=$('voiceSel');if(vsel2){vsel2.value=D.ttsVoice||'bella';vsel2.addEventListener('change',function(){D.ttsVoice=vsel2.value;svD();populateVoiceSel();toast('Suara diubah');});}
  $('btnOpenModelPicker')&&$('btnOpenModelPicker').addEventListener('click',function(){var m=$('modelPickerModal');if(!m)return;renderModelPickerModal();m.style.display='flex';});
  $('btnBld')&&$('btnBld').addEventListener('click',function(){var p=$('blPr')&&$('blPr').value.trim();if(!p){toast('Tulis instruksi');return;}var pg=$('blPg'),bx=$('blPvBx'),btn=$('btnBld');if(pg)pg.classList.add('on');if(bx)bx.classList.remove('on');if(btn)btn.style.opacity='.5';var fp='Upgrade website Veyzen Ops sesuai instruksi:\n'+p+'\nKembalikan HANYA kode HTML lengkap.';askAI(fp).then(function(r){var m=r.match(/<!DOCTYPE html>[\s\S]*/i);bldrPending=m?m[0]:r;var fr=$('blFr');if(fr)fr.srcdoc=bldrPending;if(bx)bx.classList.add('on');toast('Preview siap!');}).catch(function(e){toast('Error: '+e.message);}).then(function(){if(pg)pg.classList.remove('on');if(btn)btn.style.opacity='1';});});
  $('btnApBl')&&$('btnApBl').addEventListener('click',function(){if(!bldrPending){toast('Tidak ada kode');return;}var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([bldrPending],{type:'text/html'}));a.download='veytrix-upgraded-'+Date.now()+'.html';a.click();toast('Diunduh!');});
  $('btnBldR')&&$('btnBldR').addEventListener('click',function(){if($('blPr'))$('blPr').value='';var bx=$('blPvBx'),pg=$('blPg');if(bx)bx.classList.remove('on');if(pg)pg.classList.remove('on');bldrPending=null;});
  $('btnGenCd')&&$('btnGenCd').addEventListener('click',function(){D.premCodes.push({code:genCode(),used:false});svD();renderCodeList();toast('Kode dibuat!');});
  $('btnGen10')&&$('btnGen10').addEventListener('click',function(){for(var i=0;i<10;i++)D.premCodes.push({code:genCode(),used:false});svD();renderCodeList();toast('10 kode dibuat!');});
  $('btnSvCr')&&$('btnSvCr').addEventListener('click',saveCreds);
  $('btnUnblk')&&$('btnUnblk').addEventListener('click',function(){localStorage.removeItem(BK);localStorage.setItem('pz_ats','0');var bs=$('blkSc');if(bs)bs.classList.remove('on');toast('Blokir dihapus!');});
  $('btnRstCr')&&$('btnRstCr').addEventListener('click',function(){if(!confirm('Reset ke pandzz/30?'))return;D.user='pandzz';D.pass='30';svD();localStorage.setItem('pz_ats','0');toast('Reset ke default');});
  $('btnAddLink')&&$('btnAddLink').addEventListener('click',addCustomLink);
  $('btnRefUA')&&$('btnRefUA').addEventListener('click',renderUserActivity);
  $('btnClrAllUA')&&$('btnClrAllUA').addEventListener('click',function(){if(confirm('Hapus semua aktivitas?')){localStorage.removeItem('pz_ul');renderUserActivity();}});
  $('btnPickMusic')&&$('btnPickMusic').addEventListener('click',function(){$('dvMusicFile')&&$('dvMusicFile').click();});
  $('dvMusicFile')&&$('dvMusicFile').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;var nm=$('dvMusicName')&&$('dvMusicName').value.trim()||f.name.replace(/\.[^.]+$/,'');var r=new FileReader();r.onload=function(ev){if(!D.music)D.music=[];D.music.push({id:uid(),name:nm,url:ev.target.result});svD();renderDvMusicList();renderSettingsMusicList();if($('dvMusicName'))$('dvMusicName').value='';toast('Musik ditambahkan: '+nm);};r.readAsDataURL(f);e.target.value='';});
  $('btnAddDvMusic')&&$('btnAddDvMusic').addEventListener('click',function(){var nm=$('dvMusicName')&&$('dvMusicName').value.trim(),url=$('dvMusicUrl')&&$('dvMusicUrl').value.trim();if(!nm||!url){toast('Isi nama & URL');return;}if(!D.music)D.music=[];D.music.push({id:uid(),name:nm,url:url});svD();renderDvMusicList();renderSettingsMusicList();if($('dvMusicName'))$('dvMusicName').value='';if($('dvMusicUrl'))$('dvMusicUrl').value='';toast('Musik ditambahkan!');});
  $('tglAJ')&&$('tglAJ').addEventListener('click',function(){D.antiJailbreak=!D.antiJailbreak;$('tglAJ').classList.toggle('on',D.antiJailbreak);var o2=$('tglAJ2');if(o2)o2.classList.toggle('on',D.antiJailbreak);svD();toast('Anti-Jailbreak: '+(D.antiJailbreak?'ON':'OFF'));});
  $('tglAJ2')&&$('tglAJ2').addEventListener('click',function(){D.antiJailbreak=!D.antiJailbreak;$('tglAJ2').classList.toggle('on',D.antiJailbreak);var o=$('tglAJ');if(o)o.classList.toggle('on',D.antiJailbreak);svD();toast('Anti-Jailbreak: '+(D.antiJailbreak?'ON':'OFF'));});
  $('btnSvAJ')&&$('btnSvAJ').addEventListener('click',function(){var api=$('ajApi')&&$('ajApi').value.trim();D.ajApi=api;svD();toast('Pengaturan AJ disimpan!');});
  /* Limit & Reset editor */
  $('btnSvLimits')&&$('btnSvLimits').addEventListener('click',function(){
    var rh=parseInt($('inpResetH')&&$('inpResetH').value)||3;
    D.tokenResetHours=Math.max(1,Math.min(72,rh));
    ['fast','think','deep','expert'].forEach(function(m){
      var el=$('inpLim_'+m);
      if(el&&el.value){var v=parseInt(el.value);if(!isNaN(v)&&v>0)D.modeLimits[m]=v;}
    });
    svD();
    S.msgCount={};S.limitResetAt=0;svS();
    toast('Limit disimpan! Counter direset.');
  });
  $('btnResetLimNow')&&$('btnResetLimNow').addEventListener('click',function(){
    S.msgCount={};S.limitResetAt=0;svS();toast('Limit user direset sekarang!');renderModeBar();updateModePill();
  });
  /* ═══ CHAIN EDITOR ═══ */
  var _curChainMode='deep';
  window.showChainTab=function(mode){
    _curChainMode=mode;
    var tabs={think:'ctabThink',deep:'ctabDeep',expert:'ctabExpert'};
    Object.keys(tabs).forEach(function(k){
      var el=$( tabs[k]);if(el)el.className=k===mode?'db p':'db';
    });
    renderChainEditor(mode);
  };
  function renderChainEditor(mode){
    var wrap=$('chainEditorWrap');if(!wrap)return;
    var chain=D['chain'+mode.charAt(0).toUpperCase()+mode.slice(1)]||[];
    var roleLabels={
      jawab:'Penjawab Utama',verifikasi:'Verifikator',sintesis:'Synthesizer Final',
      riset:'Peneliti & Fakta',analisis:'Analis Mendalam',kritik:'Pengkritik',
      dekomposisi:'Pemecah Masalah',coding:'Ahli Coding',teori:'Ahli Teori',
      logika:'Validator Logika',optimasi:'Optimizer'
    };
    wrap.innerHTML='';
    chain.forEach(function(slot,i){
      var card=document.createElement('div');
      card.style.cssText='background:var(--surf3);border-radius:12px;padding:12px;margin-bottom:10px;border:1px solid var(--bdr)';
      var label=roleLabels[slot.role]||slot.role;
      var activeColor=slot.url?'#22c55e':'var(--text3)';
      card.innerHTML='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'
        +'<div style="width:6px;height:6px;border-radius:50%;background:'+activeColor+';flex-shrink:0"></div>'
        +'<span style="font-size:11.5px;font-weight:700;color:var(--text)">Agen '+(i+1)+' — '+label+'</span>'
        +'<span style="font-size:10px;color:var(--text3);margin-left:auto">'+esc(slot.desc||'')+'</span>'
        +'</div>'
        +'<input class="di" data-chain-id="'+slot.id+'" data-field="name" value="'+esc(slot.name||'')+'" placeholder="Nama API (misal: PANDZZ Claude)" style="margin-bottom:7px">'
        +'<input class="di" data-chain-id="'+slot.id+'" data-field="url" value="'+esc(slot.url||'')+'" placeholder="URL Base (misal: https://api.../chat/?text=)" style="font-size:11.5px;font-family:monospace">';
      wrap.appendChild(card);
    });
  }
  /* Init chain tab */
  if($('chainEditorWrap'))showChainTab('deep');

  $('btnSvChain')&&$('btnSvChain').addEventListener('click',function(){
    var chain=D['chain'+_curChainMode.charAt(0).toUpperCase()+_curChainMode.slice(1)]||[];
    var wrap=$('chainEditorWrap');if(!wrap)return;
    wrap.querySelectorAll('[data-chain-id]').forEach(function(inp){
      var id=inp.getAttribute('data-chain-id');
      var field=inp.getAttribute('data-field');
      var slot=chain.find(function(s){return s.id===id;});
      if(slot)slot[field]=inp.value.trim();
    });
    svD();
    var msg=$('chainSaveMsg');
    if(msg){msg.style.display='block';setTimeout(function(){msg.style.display='none';},2000);}
    /* Re-render to show green/grey dots */
    renderChainEditor(_curChainMode);
  });

  /* Fill chain editor when pg-chain opens */
  
  /* ═══ RANDOM IMAGE PANEL ═══ */
  var _curRandCat='waifu';
  function renderRandTabs(){
    var wrap=$('randCatTabs');if(!wrap)return;
    wrap.innerHTML='';
    Object.keys(D.randomApis||{}).forEach(function(k){
      var cat=D.randomApis[k];
      var btn=document.createElement('button');
      btn.className='db'+(k===_curRandCat?' p':'');
      btn.style.cssText='font-size:11px;padding:5px 10px;flex-shrink:0';
      btn.textContent=(cat.emoji||'')+' '+cat.name;
      btn.addEventListener('click',function(){_curRandCat=k;renderRandTabs();renderRandEditor();});
      wrap.appendChild(btn);
    });
  }
  function renderRandEditor(){
    var wrap=$('randCatEditor');if(!wrap)return;
    var cat=D.randomApis&&D.randomApis[_curRandCat];if(!cat)return;
    wrap.innerHTML='<label class="dlbl">URL Base (satu per baris, bisa 100+ URL)</label>'
      +'<textarea class="dta" id="randUrlsInput" style="min-height:80px;font-size:11px;font-family:monospace" placeholder="https://api.../waifu.php&#10;https://api2.../waifu.php"></textarea>'
      +(cat.hasCountry?'<label class="dlbl" style="margin-top:8px">Negara tersedia (pisah koma)</label>'
        +'<input class="di" id="randCountriesInput" value="'+esc((cat.countries||[]).join(','))+'" placeholder="Indonesia,Korea,Japan,..." style="font-size:11px">':'')
      +'<div style="display:flex;align-items:center;gap:10px;margin:8px 0">'
      +'<label style="font-size:12.5px;color:var(--text)">Aktif</label>'
      +'<div class="tgl'+(cat.active?' on':'')+'" id="tglRandCat"></div></div>';
    var ta=document.getElementById('randUrlsInput');
    if(ta)ta.value=(cat.urls||[]).join('\n');
    var tgl=document.getElementById('tglRandCat');
    if(tgl)tgl.addEventListener('click',function(){tgl.classList.toggle('on');});
  }
  if($('randCatTabs'))renderRandTabs();
  if($('randCatEditor'))renderRandEditor();
  $('btnSvRand')&&$('btnSvRand').addEventListener('click',function(){
    var cat=D.randomApis&&D.randomApis[_curRandCat];if(!cat)return;
    var ta=$('randUrlsInput');
    if(ta)cat.urls=ta.value.split('\n').map(function(s){return s.trim();}).filter(Boolean);
    var ci=$('randCountriesInput');
    if(ci&&cat.hasCountry)cat.countries=ci.value.split(',').map(function(s){return s.trim();}).filter(Boolean);
    var tgl=$('tglRandCat');
    if(tgl)cat.active=tgl.classList.contains('on');
    svD();
    var msg=$('randSaveMsg');if(msg){msg.style.display='block';setTimeout(function(){msg.style.display='none';},2000);}
  });

  /* ═══ SEARCH PANEL ═══ */
  $('btnSvSearch')&&$('btnSvSearch').addEventListener('click',function(){
    var url=$('ttSearchUrl')&&$('ttSearchUrl').value.trim();
    var lim=parseInt($('ttSearchLimit')&&$('ttSearchLimit').value)||5;
    var on=$('tglTtSearch')&&$('tglTtSearch').classList.contains('on');
    if(!D.searchApis)D.searchApis={};
    D.searchApis.tiktok={name:'TikTok',url:url||'',active:on,limit:lim};
    svD();
    var msg=$('searchSaveMsg');if(msg){msg.style.display='block';setTimeout(function(){msg.style.display='none';},2000);}
  });



  /* Downloader panel */
  function renderDlApiList(){
    var wrap=$('dlApiList');if(!wrap)return;
    wrap.innerHTML='';
    (D.downloaderApis||[]).forEach(function(api){
      var card=document.createElement('div');
      card.style.cssText='background:var(--surf3);border-radius:12px;padding:12px;margin-bottom:10px;border:1px solid var(--bdr)';
      var dot=api.url&&api.active?'#22c55e':api.url?'#f59e0b':'var(--text3)';
      card.innerHTML='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'
        +'<span style="width:7px;height:7px;border-radius:50%;background:'+dot+';flex-shrink:0;display:block"></span>'
        +'<b style="font-size:12.5px;color:var(--text)">'+esc(api.name)+'</b>'
        +'<label style="margin-left:auto;display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text2)">'
        +'<input type="checkbox" data-dl-id="'+api.id+'" data-field="active"'+(api.active?' checked':'')+'> Aktif</label>'
        +'</div>'
        +'<input class="di" data-dl-id="'+api.id+'" data-field="url" value="'+esc(api.url||'')+'" placeholder="URL base API (contoh: https://api.../download?url=)" style="font-size:11.5px;font-family:monospace;margin-bottom:6px">'
        +'<input class="di" data-dl-id="'+api.id+'" data-field="platforms" value="'+esc((api.platforms||[]).join(','))+'" placeholder="Platform keywords (contoh: tiktok,vm.tiktok)" style="font-size:11px">';
      wrap.appendChild(card);
    });
  }
  $('btnSvDl')&&$('btnSvDl').addEventListener('click',function(){
    var apis=D.downloaderApis||[];
    document.querySelectorAll('[data-dl-id]').forEach(function(inp){
      var id=inp.getAttribute('data-dl-id');
      var field=inp.getAttribute('data-field');
      var api=apis.find(function(a){return a.id===id;});
      if(!api)return;
      if(field==='active')api.active=inp.checked;
      else if(field==='platforms')api.platforms=inp.value.trim().split(',').map(function(s){return s.trim();}).filter(Boolean);
      else api[field]=inp.value.trim();
    });
    svD();
    var msg=$('dlSaveMsg');if(msg){msg.style.display='block';setTimeout(function(){msg.style.display='none';},2000);}
    renderDlApiList();
  });

  $('btnSvDomains')&&$('btnSvDomains').addEventListener('click',function(){
    var ta=$('allowedDomainsInput');
    var domains=ta?ta.value.split('\n').map(function(s){return s.trim();}).filter(Boolean):[];
    D.allowedDomains=domains;svD();
    var msg=$('domainSaveMsg');if(msg){msg.style.display='block';setTimeout(function(){msg.style.display='none';},2000);}
    toast(domains.length?'Kunci domain aktif untuk '+domains.length+' domain':'Kunci domain dinonaktifkan');
  });
  $('btnSvCfgUrl')&&$('btnSvCfgUrl').addEventListener('click',function(){
    var url=$('cfgUrl')&&$('cfgUrl').value.trim()||'';
    D.configUrl=url;svD();
    if(url)toast('URL Config disimpan! Akan aktif di load berikutnya.');
    else toast('URL Config dihapus.');
  });
  $('btnTestCfg')&&$('btnTestCfg').addEventListener('click',function(){
    var url=$('cfgUrl')&&$('cfgUrl').value.trim()||'';
    D.configUrl=url;svD();
    var st=$('cfgStatus');if(!st)return;
    st.style.display='block';st.style.background='var(--surf3)';st.style.color='var(--text2)';
    st.textContent='Mengambil config...';
    loadRemoteConfig().then(function(ok){
      if(ok){
        st.style.background='rgba(34,197,94,.1)';st.style.color='#22c55e';
        st.textContent='Config berhasil diambil dan diterapkan! Reload halaman untuk lihat perubahan.';
      }else{
        st.style.background='rgba(239,68,68,.1)';st.style.color='#ef4444';
        st.textContent='Gagal: URL kosong, tidak bisa diakses, atau format JSON tidak valid.';
      }
    });
  });
  $('btnPushCfg')&&$('btnPushCfg').addEventListener('click',function(){
    var url=$('cfgUrl')&&$('cfgUrl').value.trim()||'';
    var key=$('cfgSecret')&&$('cfgSecret').value||'';
    if(!url){toast('Isi URL server dulu');return;}
    if(!key){toast('Isi Secret Key dulu');return;}
    D.configUrl=url;D.cfgSecretLocal=key;svD();
    var st=$('cfgStatus');if(!st)return;
    st.style.display='block';st.style.background='var(--surf3)';st.style.color='var(--text2)';
    st.textContent='Mengirim config ke server...';
    var btn=$('btnPushCfg');if(btn)btn.disabled=true;
    pushGlobalConfig(url,key).then(function(res){
      if(btn)btn.disabled=false;
      if(res.ok){
        st.style.background='rgba(34,197,94,.1)';st.style.color='#22c55e';
        st.textContent='\u2714 '+res.message+' Semua perangkat akan dapat update ini.';
      }else{
        st.style.background='rgba(239,68,68,.1)';st.style.color='#ef4444';
        st.textContent='\u2716 '+res.message;
      }
    });
  });
    $('btnSavePremPrice')&&$('btnSavePremPrice').addEventListener('click',function(){var m=$('premPrice')&&$('premPrice').value.trim(),y=$('premPriceOld')&&$('premPriceOld').value.trim();if(m)D.premPrices.monthly=m;if(y)D.premPrices.forever=y;svD();applyPremPrices();toast('Harga disimpan!');});
  $('btnSubmitRating')&&$('btnSubmitRating').addEventListener('click',submitRating);
  $('btnRatingMedia')&&$('btnRatingMedia').addEventListener('click',function(){$('ratingMedia')&&$('ratingMedia').click();});
  $('ratingMedia')&&$('ratingMedia').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){ratingMediaData=ev.target.result;var pv=$('ratingMediaPreview');if(pv)pv.innerHTML=f.type.indexOf('video')>=0?'<video src="'+ev.target.result+'" controls style="max-width:100%;max-height:80px;border-radius:8px"></video>':'<img src="'+ev.target.result+'" style="max-width:100%;max-height:80px;border-radius:8px">';};r.readAsDataURL(f);e.target.value='';});
  $('btnOpenModelPicker')&&$('btnOpenModelPicker').addEventListener('click',function(){var m=$('modelPickerModal');if(!m)return;renderModelPickerModal();m.style.display='flex';});
  $('btnIntroBanner')&&$('btnIntroBanner').addEventListener('click',function(){$('introBannerIn')&&$('introBannerIn').click();});
  $('introBannerIn')&&$('introBannerIn').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){D.introBanner=ev.target.result;D.introBannerType=f.type.indexOf('video')>=0?'video':'image';svD();toast('Banner intro disimpan!');};r.readAsDataURL(f);e.target.value='';});
  $('tglIntro')&&$('tglIntro').addEventListener('click',function(){D.showIntro=D.showIntro===false?true:false;$('tglIntro').classList.toggle('on',D.showIntro!==false);svD();toast('Intro: '+(D.showIntro!==false?'ON':'OFF'));});

  /* AI Info list */
  $('btnSvAI')&&$('btnSvAI').addEventListener('click',addAiInfo);

  /* AI Style */
  var styleSel=$('aiStyleSel');if(styleSel){styleSel.value=D.aiStyle||'original';styleSel.addEventListener('change',function(){D.aiStyle=styleSel.value;svD();toast('Gaya AI: '+styleSel.options[styleSel.selectedIndex].text);});}
  $('btnSvStyle')&&$('btnSvStyle').addEventListener('click',function(){var s=$('aiStyleSel');if(s){D.aiStyle=s.value;svD();toast('Gaya AI disimpan!');} });
  $('btnOpenModelPicker')&&$('btnOpenModelPicker').addEventListener('click',function(){renderModelPickerModal();var m=$('modelPickerModal');if(m)m.style.display='flex';});

  /* Pinned memory */
  $('btnClrPin')&&$('btnClrPin').addEventListener('click',function(){if(confirm('Hapus semua memori permanen?')){pinMem=[];savePinMem();renderPinMemList();toast('Memori permanen dihapus');}});

  /* Music stop */
  $('musicStop')&&$('musicStop').addEventListener('click',function(){if(musicAudio){musicAudio.pause();musicAudio.currentTime=0;}setMusicIcon(false);var mt=$('musicTitle');if(mt)mt.textContent='Tidak ada musik diputar';toast('Musik dihentikan');});

  /* Native voice select */
  var vsel=$('voiceSel');if(vsel){
    populateVoiceSel();
    vsel.addEventListener('change',function(){D.ttsVoice=vsel.value;svD();toast('Suara: '+vsel.options[vsel.selectedIndex].text);});
  }
  $('sbPremBanner')&&$('sbPremBanner').addEventListener('click',function(){closeSB();openST();});
  $('mdlPk')&&$('mdlPk').addEventListener('click',function(e){e.stopPropagation();var d=$('mdlDp');if(d)d.classList.toggle('on');});

  /* Keyboard shortcuts */
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(curStSub)closeStSub();else{closeSB();closeST();}}if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();var pt=$('pt');if(pt)pt.focus();}});
}

/* Model picker modal */
function renderModelPickerModal(){
  var list=$('modelPickerList');if(!list)return;list.innerHTML='';
  var mn=$('stModelName');if(mn)mn.textContent=getApi().name||'-';
  D.apis.forEach(function(a,i){
    var isSelected=a.id===D.activeApiId;
    var el=document.createElement('div');
    el.style.cssText='display:flex;align-items:center;gap:12px;padding:12px 14px;background:'+(isSelected?'rgba(52,97,201,.1)':'var(--surf2)')+';border:1px solid '+(isSelected?'rgba(52,97,201,.3)':'var(--bdr)')+';border-radius:12px;cursor:pointer;margin-bottom:6px;transition:all .15s';
    el.innerHTML='<div style="width:10px;height:10px;border-radius:50%;background:'+MC[i%MC.length]+';flex-shrink:0"></div><div style="flex:1"><b style="font-size:13px;display:block">'+esc(a.name)+'</b><span style="font-size:11px;color:var(--text3)">'+(a.type==='premium'?'⭐ ':'')+esc(a.model)+'</span></div>'+(isSelected?'<svg viewBox="0 0 24 24" style="width:16px;stroke:#3461C9;fill:none;stroke-width:2.5"><polyline points="20 6 9 17 4 12"/></svg>':'');
    el.addEventListener('click',function(){D.activeApiId=a.id;buildModelDrop();renderModeBar();setEngUI(a.name,'ok');renderModelPickerModal();var m=$('modelPickerModal');if(m)m.style.display='none';toast('Model: '+a.name);});
    list.appendChild(el);
  });
}

function loadPremiumPrices(){
  try{var p=localStorage.getItem('pz_prem_prices');if(p){var pp=JSON.parse(p);if(pp.monthly){var em=document.getElementById('ptMonthly');if(em)em.textContent='Rp '+pp.monthly;}if(pp.yearly){var ey=document.getElementById('ptYearly');if(ey)ey.textContent='Rp '+pp.yearly;}if(pp.forever){var ef=document.getElementById('ptForever');if(ef)ef.textContent='Rp '+pp.forever;}}}catch(e){}
}
function selectPremTier(t,el){document.querySelectorAll(".pt-card").forEach(function(c){c.classList.remove("sel");});if(el)el.classList.add("sel");}
function bindPremCards(){
  var cards={ptCardM:'monthly',ptCardY:'yearly',ptCardF:'forever'};
  Object.keys(cards).forEach(function(id){
    var el=$(id);if(!el)return;
    el.addEventListener('click',function(){selectPremTier(cards[id],el);});
  });
}
function applyPremPrices(){
  var pm=$('ptMonthly'),py=$('ptYearly'),pf=$('ptForever');
  if(pm)pm.textContent='Rp '+(D.premPrices&&D.premPrices.monthly||'5k');
  if(py)py.textContent='Rp '+(D.premPrices&&D.premPrices.yearly||'7k');
  if(pf)pf.textContent='Rp '+(D.premPrices&&D.premPrices.forever||'13k');
}
function showApiTab(t){
  var n=$('apiLsN'),p=$('apiLsP'),bn=$('btnTN'),bp=$('btnTP');
  if(t==='premium'){if(n)n.style.display='none';if(p)p.style.display='flex';if(bn)bn.style.cssText='flex:1';if(bp)bp.style.cssText='flex:1;background:var(--dv);color:#fff;border-color:transparent';}
  else{if(n)n.style.display='flex';if(p)p.style.display='none';if(bp)bp.style.cssText='flex:1';if(bn)bn.style.cssText='flex:1;background:var(--dv);color:#fff;border-color:transparent';}
}
/* START */
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
}else{
  init();
}



// SPLASH LANGUAGE + SPEED FUNCTIONS
function splashSetLang(lang){
  LANG=lang||'id';
  try{localStorage.setItem('pz_lang',lang);}catch(e){}
  var idBtn=document.getElementById('spLangId');
  var enBtn=document.getElementById('spLangEn');
  if(idBtn){idBtn.style.background=lang==='id'?'#f97316':'transparent';idBtn.style.color=lang==='id'?'#fff':'#666';}
  if(enBtn){enBtn.style.background=lang==='en'?'#f97316':'transparent';enBtn.style.color=lang==='en'?'#fff':'#666';}
  var texts=lang==='id'?{
    h1:'Semua model.<br>Satu platform.',
    desc:'Asisten AI cerdas multi-engine yang siap membantu coding, riset, kreasi, dan lebih banyak lagi.',
    btn:'MULAI SEKARANG',spLbl:'KECEPATAN SERVER',stLbl:'STATUS',f2:'RESPON CEPAT',f3:'AMAN & PRIVAT',tag:'AI PLATFORM'
  }:{
    h1:'All models.<br>One platform.',
    desc:'Smart multi-engine AI assistant ready to help with coding, research, creation, and more.',
    btn:'GET STARTED',spLbl:'SERVER SPEED',stLbl:'STATUS',f2:'FAST RESPONSE',f3:'SAFE & PRIVATE',tag:'AI PLATFORM'
  };
  var el;
  el=document.getElementById('spH1');if(el)el.innerHTML=texts.h1;
  el=document.getElementById('spDesc');if(el)el.textContent=texts.desc;
  el=document.getElementById('spBtn');if(el)el.textContent=texts.btn;
  el=document.getElementById('spSpeedLbl');if(el)el.textContent=texts.spLbl;
  el=document.getElementById('spStatusLbl');if(el)el.textContent=texts.stLbl;
  el=document.getElementById('spF2');if(el)el.textContent=texts.f2;
  el=document.getElementById('spF3');if(el)el.textContent=texts.f3;
  el=document.getElementById('spTagline');if(el)el.textContent=texts.tag;
}
function runSplashSpeedTest(){
  var dot=document.getElementById('spSpeedDot');
  var val=document.getElementById('spSpeedVal');
  var stDot=document.getElementById('spStatusDot');
  var stVal=document.getElementById('spStatusVal');
  if(!val)return;
  var start=Date.now();
  /* Ping a lightweight endpoint to test response */
  fetch('https://api-nanzz.my.id/docs/api/random/waifu.php?_t='+start,{method:'HEAD',signal:AbortSignal.timeout(8000)})
    .then(function(){
      var ms=Date.now()-start;
      if(val)val.textContent=ms;
      if(dot){dot.style.background=ms<500?'#22c55e':ms<1500?'#f59e0b':'#ef4444';dot.style.boxShadow='0 0 6px '+dot.style.background;}
      if(stDot)stDot.style.background='#22c55e';
      if(stVal){stVal.textContent='ONLINE';stVal.style.color='#22c55e';}
    })
    .catch(function(){
      if(val)val.textContent='--';
      if(stDot)stDot.style.background='#f59e0b';
      if(stVal){stVal.textContent='OFFLINE';stVal.style.color='#f59e0b';}
    });
}
// Splash waits for user CTA button tap - no auto-skip
