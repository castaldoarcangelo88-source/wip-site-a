(function(){"use strict";
var W=window,D=document;if(!W||!D||W.__ndsAttivo)return;
var sc=D.currentScript,ds=(sc&&sc.dataset)||{},uc=W.NATALE_DEVSHARE||{};
function pk(k,v){return uc[k]!==undefined?uc[k]:(ds[k]!==undefined?ds[k]:v)}
function bf(k,d){var v=pk(k,d);return v!==false&&v!=="false"}
var C={testo:pk("testo","Buone feste e felice anno nuovo"),bg:pk("bg","#0A2463"),fg:pk("fg","#FFFAFF"),accent:pk("accent","#D8315B"),decoro:pk("decoro","#E8B84B"),neveColore:pk("neveColore","#F4F8FC"),neveBordo:pk("neveBordo","rgba(18,22,30,.5)"),inizio:pk("inizio",""),fine:pk("fine","2027-01-07"),neve:bf("neve",1),decoroHeader:bf("decoroHeader",1),selettoreLogo:pk("selettoreLogo",""),cssUrl:pk("cssUrl",""),chiave:pk("chiave","nds_2026"),forza:pk("forza",0)===true||pk("forza",0)==="true"};
function og(){try{return new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Rome",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date())}catch(e){var d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}}
if(!C.forza&&!/[?&]natale_prova=1(?:&|$)/.test(location.search||"")){var td=og();if((C.inizio&&td<C.inizio)||(C.fine&&td>C.fine))return}
function ls(k,v){try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v)}catch(e){return null}}
if(ls(C.chiave+"_chiuso")==="1")return;
W.__ndsAttivo=true;
function pH(h){if(typeof h!=="string")return null;h=h.trim().replace(/^#/,"");if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];return/^[0-9a-fA-F]{6}$/.test(h)?[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]:null}
function lum(r){return r.reduce(function(s,c,i){c/=255;return s+[.2126,.7152,.0722][i]*(c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4))},0)}
function cr(a,b){var x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
var fgS=(function(){var bg=pH(C.bg),fg=pH(C.fg);if(!bg||!fg||cr(bg,fg)>=4.5)return C.fg;return cr(bg,[255,255,255])>=cr(bg,[17,18,22])?"#FFFFFF":"#111216"})();
var rootCss=":root{--nds-bg:"+C.bg+";--nds-fg:"+fgS+";--nds-accent:"+C.accent+";--nds-decoro:"+C.decoro+";--nds-neve:"+C.neveColore+";--nds-neve-bordo:"+C.neveBordo+";--nds-foglia:#2E6B3A;--nds-bacca:#C41E3A}";
var css=rootCss+".nds-nastro{position:relative;z-index:9999;display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:52px;padding:8px 16px 14px;box-sizing:border-box;background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,.18) 50%,transparent 60%),var(--nds-bg);color:var(--nds-fg);font:700 16.5px/1.3 system-ui,-apple-system,sans-serif;} .nds-nastro *{box-sizing:border-box} .nds-nastro-corpo{display:flex;align-items:center;justify-content:center;gap:8px;flex:1 1 auto;min-width:0;text-align:center} .nds-nastro-testo{overflow-wrap:anywhere;letter-spacing:.01em} .nds-nastro-azioni{display:flex;align-items:center;gap:8px;flex:0 0 auto} .nds-lato{display:inline-flex;align-items:center;gap:4px;flex:0 0 auto;color:var(--nds-decoro)} .nds-icona{width:20px;height:20px;flex:0 0 auto;display:block} .nds-icona-lg{width:24px;height:24px} .nds-btn{appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:5px;min-height:32px;padding:4px 12px;border-radius:999px;border:1.5px solid currentColor;background:transparent;color:var(--nds-fg);font:700 13px/1.2 system-ui,-apple-system,sans-serif;cursor:pointer;white-space:nowrap} .nds-btn:hover{opacity:.88} .nds-btn:focus-visible{outline:2px solid var(--nds-fg);outline-offset:2px} .nds-btn-chiudi{min-width:32px;padding:4px 10px;font-size:18px} .nds-luci{position:absolute;left:0;right:0;bottom:0;height:10px;pointer-events:none;overflow:hidden;z-index:2} .nds-luci svg{display:block;width:100%;height:10px} .nds-neve{position:fixed;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:9998} .nds-fiocco{position:absolute;top:-22px;left:var(--x,50%);width:var(--s,12px);height:var(--s,12px);opacity:var(--o,.85);will-change:transform;pointer-events:none;animation:nds-c var(--d,14s) linear var(--r,0s) infinite;color:var(--nds-neve)} .nds-fiocco-punto{border-radius:50%;background:var(--nds-neve);box-shadow:0 0 2px 1px var(--nds-neve-bordo),0 0 7px 2px rgba(255,255,255,.9)} .nds-fiocco-cristallo{filter:drop-shadow(0 0 1px var(--nds-neve-bordo)) drop-shadow(0 0 3px rgba(255,255,255,.95))} .nds-fiocco-cristallo svg{width:100%;height:100%;display:block} .nds-decoro-logo{position:absolute;width:36px;height:36px;pointer-events:none;z-index:6;display:inline-flex;align-items:center;justify-content:center;color:var(--nds-accent);filter:drop-shadow(0 1px 2px rgba(0,0,0,.45))} .nds-decoro-logo svg{width:36px;height:36px;display:block;overflow:visible} .nds-header-luci{position:absolute;left:0;right:0;bottom:0;height:10px;pointer-events:none;z-index:6;overflow:hidden} .nds-header-luci svg{display:block;width:100%;height:10px} @media(max-width:520px){.nds-nastro{min-height:48px;padding:7px 10px 12px;font-size:14.5px;gap:6px} .nds-nastro-corpo{justify-content:flex-start;text-align:left} .nds-lato-dx,.nds-btn-neve-testo{display:none} .nds-icona{width:18px;height:18px} .nds-decoro-logo,.nds-decoro-logo svg{width:30px;height:30px}} @media(prefers-reduced-motion:reduce){.nds-neve,.nds-fiocco,.nds-btn-neve{display:none!important;animation:none!important}} @keyframes nds-c{0%{transform:translate3d(0,-20px,0)} 50%{transform:translate3d(var(--dx,16px),52vh,0)} 100%{transform:translate3d(calc(var(--dx,16px)*-.5),105vh,0)}}";
function mk(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!==undefined)e.innerHTML=h;return e}
function rc(e){return e.getBoundingClientRect()}
function at(e,k,v){e.setAttribute(k,v)}
var SVG_STELLA='<svg class="nds-icona" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2l2.6 6.6L22 9.2l-5.2 4.4L18.4 21 12 17.2 5.6 21l1.6-7.4L2 9.2l7.4-.6z"/></svg>';
var SVG_AGRIFOGLIO='<svg class="nds-icona nds-icona-lg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="#2E6B3A" d="M3.5 13.5c4.2-.6 7-5.8 7-5.8s1.4 5.5 8 6.2c-3.2 2.4-6.4 2-8.2.6-1.8 1.6-5.2 1.8-6.8-1z"/><path fill="#247044" d="M8 9.2C10.6 4.6 16 2.8 16 2.8s-.2 5.2-3.4 8.2C11.4 10.4 9.4 9.8 8 9.2z"/><circle cx="12.2" cy="13.2" r="1.9" fill="#C41E3A"/><circle cx="15.1" cy="14.1" r="1.55" fill="#C41E3A"/><circle cx="13.4" cy="16.1" r="1.45" fill="#C41E3A"/></svg>';
var SVG_CRISTALLO='<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2v20M4.2 7l15.6 10M4.2 17l15.6-10"/><path d="M12 5.2 10 3.4M12 5.2l2-1.8M12 18.8 10 20.6M12 18.8l2 1.8M6.2 8.2 4.2 7.2M6.2 8.2l-.4 2.4M17.8 8.2l2-1M17.8 8.2l.4 2.4M6.2 15.8l-2 1M6.2 15.8l-.4-2.4M17.8 15.8l2 1M17.8 15.8l.4-2.4"/></g></svg>';
var SVG_CAPPELLO='<svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true"><path fill="currentColor" d="M7 31C13 28 19 26 25 28L33 9C23 12 15 19 7 31Z"/><ellipse cx="16.5" cy="31" rx="13" ry="6" fill="#F4EFE6" stroke="#2C2620" stroke-width="1.2"/><circle cx="33" cy="9" r="5" fill="#F4EFE6" stroke="#2C2620" stroke-width="1.2"/></svg>';
function inGap(cx,gaps){if(!gaps)return false;for(var i=0;i<gaps.length;i++){if(cx>=gaps[i].x1&&cx<=gaps[i].x2)return true}return false}
function luciHtml(w,gaps){
  w=Math.max(280,Math.round(w||800));gaps=gaps||[];
  var step=18,n=Math.floor((w-10)/step),cols=["#C41E3A","#E8B84B","#FFFAFF","#2E6B3A"],segs=[],x0=0;
  for(var g=0;g<gaps.length;g++){var a=Math.max(0,gaps[g].x1),b=Math.min(w,gaps[g].x2);if(b>a){if(a>x0+2)segs.push([x0,a]);x0=b}}
  if(x0<w-2)segs.push([x0,w]);
  var s='<svg viewBox="0 0 '+w+' 10" width="100%" height="10" preserveAspectRatio="none" aria-hidden="true">';
  for(var i=0;i<segs.length;i++)s+='<line x1="'+segs[i][0]+'" y1="5" x2="'+segs[i][1]+'" y2="5" stroke="#E8B84B" stroke-width="1.2" opacity=".8"/>';
  for(var i=0;i<n;i++){var cx=9+i*step;if(inGap(cx,gaps))continue;var c=cols[i%4];s+='<circle cx="'+cx+'" cy="5" r="3.4" fill="'+c+'" stroke="rgba(20,24,30,.35)" stroke-width=".45"/><circle cx="'+(cx-1)+'" cy="4" r="1.15" fill="#fff" opacity=".6"/>'}
  return s+"</svg>";
}
function av(){
  if(!D.body||!D.head)return;
  if(C.cssUrl){var rs=D.documentElement.style;[["--nds-bg",C.bg],["--nds-fg",fgS],["--nds-accent",C.accent],["--nds-decoro",C.decoro],["--nds-neve",C.neveColore],["--nds-neve-bordo",C.neveBordo],["--nds-foglia","#2E6B3A"],["--nds-bacca","#C41E3A"]].forEach(function(p){rs.setProperty(p[0],p[1])})}
  var st=C.cssUrl?Object.assign(mk("link"),{rel:"stylesheet",href:C.cssUrl,id:"nds-stili"}):Object.assign(mk("style"),{id:"nds-stili",textContent:css});
  D.head.appendChild(st);
  var mq=W.matchMedia?W.matchMedia("(prefers-reduced-motion: reduce)"):null,rid=!!(mq&&mq.matches),sp=ls(C.chiave+"_neve")==="0";
  var nas=mk("div","nds-nastro");nas.id="nds-nastro";at(nas,"role","region");at(nas,"aria-label","Auguri di buone feste");
  var latoSx=mk("span","nds-lato nds-lato-sx",SVG_AGRIFOGLIO+SVG_STELLA);
  latoSx.setAttribute("aria-hidden","true");
  var crp=mk("div","nds-nastro-corpo");
  var tx=mk("span","nds-nastro-testo");tx.textContent=C.testo;crp.appendChild(tx);
  var latoDx=mk("span","nds-lato nds-lato-dx",SVG_STELLA+SVG_AGRIFOGLIO);
  latoDx.setAttribute("aria-hidden","true");
  var az=mk("div","nds-nastro-azioni");
  var bN=C.neve?Object.assign(mk("button","nds-btn nds-btn-neve"),{type:"button"}):null;
  if(bN)az.appendChild(bN);
  var bC=Object.assign(mk("button","nds-btn nds-btn-chiudi",'<span aria-hidden="true">&times;</span>'),{type:"button",title:"Chiudi auguri e neve"});
  at(bC,"aria-label","Chiudi auguri e neve");az.appendChild(bC);
  nas.appendChild(latoSx);nas.appendChild(crp);nas.appendChild(latoDx);nas.appendChild(az);
  var luciNas=mk("div","nds-luci");at(luciNas,"aria-hidden","true");nas.appendChild(luciNas);
  D.body.insertBefore(nas,D.body.firstChild);
  var cspNo=!C.cssUrl&&getComputedStyle(nas).zIndex!=="9999";
  if(cspNo){
    nas.style.cssText="position:relative;z-index:9999;display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:52px;padding:8px 16px 14px;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.18) 50%,transparent 60%),"+C.bg+";color:"+fgS+";font:700 16.5px/1.3 system-ui,sans-serif;box-sizing:border-box";
    crp.style.cssText="display:flex;align-items:center;justify-content:center;gap:8px;flex:1 1 auto;min-width:0;text-align:center;font-weight:700";
    az.style.cssText="display:flex;align-items:center;gap:8px;flex:0 0 auto";
    latoSx.style.cssText="display:inline-flex;align-items:center;gap:4px;color:"+C.decoro;
    latoDx.style.cssText="display:inline-flex;align-items:center;gap:4px;color:"+C.decoro;
    luciNas.style.cssText="position:absolute;left:0;right:0;bottom:0;height:10px;pointer-events:none;overflow:hidden";
    var bs="appearance:none;display:inline-flex;align-items:center;gap:5px;min-height:32px;padding:4px 12px;border-radius:999px;border:1.5px solid currentColor;background:transparent;color:"+fgS+";font:700 13px/1.2 system-ui,sans-serif;cursor:pointer";
    if(bN)bN.style.cssText=bs;bC.style.cssText=bs+";min-width:32px;font-size:18px";
  }
  function drawLuci(el,w,gaps){el.innerHTML=luciHtml(w||el.offsetWidth||innerWidth,gaps)}
  drawLuci(luciNas,nas.offsetWidth);

  var nv=null,anims=[];
  function nFiocchi(){return innerWidth<=520?38:78}
  function stopAnims(){for(var i=0;i<anims.length;i++){try{anims[i].cancel()}catch(e){}}anims=[]}
  function mkNv(){
    if(nv||!C.neve||sp||rid)return;
    nv=mk("div","nds-neve");nv.id="nds-neve";at(nv,"aria-hidden","true");
    if(cspNo)nv.style.cssText="position:fixed;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:9998";
    var fr=D.createDocumentFragment(),n=nFiocchi();
    for(var i=0;i<n;i++){
      var crystal=i%3===0,s=crystal?10+(i%9):6+(i%9),d=11+(i*5)%8,o=(.7+(i%4)*.1).toFixed(2),dx=((i%2?-1:1)*(12+(i%5)*6)),x=((4+i*12.7)%96).toFixed(1),delay=-((i/n)*d);
      var f=mk("span",crystal?"nds-fiocco nds-fiocco-cristallo":"nds-fiocco nds-fiocco-punto",crystal?SVG_CRISTALLO:"");
      var fs=f.style;
      fs.setProperty("--x",x+"%");fs.setProperty("--s",s+"px");fs.setProperty("--d",d+"s");fs.setProperty("--r",delay.toFixed(2)+"s");fs.setProperty("--o",o);fs.setProperty("--dx",dx+"px");
      if(cspNo){
        fs.cssText="position:absolute;top:-22px;left:"+x+"%;width:"+s+"px;height:"+s+"px;opacity:"+o+";pointer-events:none;will-change:transform;color:"+C.neveColore+";"+(crystal?"filter:drop-shadow(0 0 1px rgba(18,22,30,.6)) drop-shadow(0 0 3px rgba(255,255,255,.95))":"border-radius:50%;background:"+C.neveColore+";box-shadow:0 0 2px 1px rgba(18,22,30,.5),0 0 7px 2px rgba(255,255,255,.9)");
        if(f.animate){var a=f.animate([{transform:"translate3d(0,-20px,0)"},{transform:"translate3d("+dx+"px,52vh,0)"},{transform:"translate3d("+(dx*-.5)+"px,105vh,0)"}],{duration:d*1000,delay:delay*1000,iterations:1/0,easing:"linear"});anims.push(a)}
      }
      fr.appendChild(f);
    }
    nv.appendChild(fr);D.body.appendChild(nv);
  }
  function syB(){if(!bN)return;var on=!sp&&!rid;at(bN,"aria-pressed",on?"true":"false");at(bN,"aria-label",on?"Disattiva neve decorativa":"Attiva neve decorativa");bN.innerHTML='<span aria-hidden="true">&#10052;</span><span class="nds-btn-neve-testo">'+(on?"Neve: s\u00ec":"Neve: no")+"</span>"}
  function killNv(){stopAnims();if(nv){nv.remove();nv=null}}
  mkNv();syB();
  if(bN)bN.addEventListener("click",function(){sp=!sp;ls(C.chiave+"_neve",sp?"0":"1");if(sp)killNv();else mkNv();syB()});

  var fx=[],dc=null,hLuci=null,hM=null,hO="",tm=null,mo=null,lastW=innerWidth,lastMob=innerWidth<=520;
  function rFx(){
    for(var i=0;i<fx.length;i++)fx[i].el.style.top=fx[i].orig;fx=[];
    D.querySelectorAll("header,nav,[role='banner']").forEach(function(el){if(el===nas||nas.contains(el))return;var cs=getComputedStyle(el),t=parseFloat(cs.top),r=rc(el);if(cs.position==="fixed"&&!isNaN(t)&&t<=4&&r.width>=innerWidth*.5)fx.push({el:el,orig:el.style.top,base:t})});
  }
  function aFx(){if(!nas.isConnected)return;var off=Math.max(0,(nas.offsetHeight||0)-(scrollY||pageYOffset||0));for(var i=0;i<fx.length;i++)fx[i].el.style.top=(fx[i].base+off)+"px"}
  function clearDec(){if(dc&&dc.isConnected)dc.remove();dc=null;if(hLuci&&hLuci.isConnected)hLuci.remove();hLuci=null;if(hM){hM.style.position=hO;hM=null}}
  function pDc(){
    if(!W.__ndsAttivo)return;clearDec();if(!C.decoroHeader)return;
    var hd=D.querySelector("header,.testata,.top");if(!hd||hd===nas)return;
    var lg=C.selettoreLogo?D.querySelector(C.selettoreLogo):null;
    if(!lg){var sl=["a[href='/']","a[href='#top']","a[href='#inizio']",".marchio",".brand","[class*='logo']","img","svg"];for(var i=0;i<sl.length&&!lg;i++){var c=hd.querySelector(sl[i]);if(c&&rc(c).width>0)lg=c}}
    var hr=rc(hd);
    if(getComputedStyle(hd).position==="static"){hO=hd.style.position;hd.style.position="relative";hM=hd}
    hLuci=mk("div","nds-header-luci");at(hLuci,"aria-hidden","true");
    if(cspNo)hLuci.style.cssText="position:absolute;left:0;right:0;bottom:0;height:10px;pointer-events:none;z-index:6;overflow:hidden";
    hd.appendChild(hLuci);
    var gaps=[];
    if(lg){var lr0=rc(lg);gaps.push({x1:lr0.left-hr.left-10,x2:lr0.right-hr.left+10})}
    drawLuci(hLuci,hd.offsetWidth||hr.width,gaps);
    if(!lg||hr.width<120)return;
    var lr=rc(lg);if(lr.width<=0)return;
    var ost=[],sz=innerWidth<=520?30:36;
    hd.querySelectorAll("a,button").forEach(function(it){if(it===lg||lg.contains(it)||it.contains(lg))return;var ir=rc(it);if(ir.width>0&&ir.height>0)ost.push(ir)});
    function ok(x,y){
      if(x<hr.left+2||x+sz>hr.right-2||y<hr.top+2||y+sz>hr.bottom-2)return false;
      if(!(x+sz<=lr.left-2||x>=lr.right+2||y+sz<=lr.top-2||y>=lr.bottom+2))return false;
      for(var k=0;k<ost.length;k++){var o=ost[k];if(!(x+sz<=o.left-4||x>=o.right+4||y+sz<=o.top-2||y>=o.bottom+2))return false}
      return true;
    }
    var yMid=lr.top+Math.max(0,(lr.height-sz)/2),yTop=lr.top-2,cands=[
      {x:lr.right+5,y:yTop},{x:lr.right+5,y:yMid},{x:lr.left-sz-5,y:yTop},{x:lr.left-sz-5,y:yMid},
      {x:lr.right-4,y:hr.top+3},{x:lr.left-sz+4,y:hr.top+3}
    ],p=null;
    for(var i=0;i<cands.length&&!p;i++)if(ok(cands[i].x,cands[i].y))p=cands[i];
    if(!p)return;
    dc=mk("span","nds-decoro-logo",SVG_CAPPELLO);at(dc,"aria-hidden","true");
    dc.style.cssText="position:absolute;width:"+sz+"px;height:"+sz+"px;pointer-events:none;z-index:6;display:inline-flex;align-items:center;justify-content:center;color:"+C.accent+";filter:drop-shadow(0 1px 2px rgba(0,0,0,.45));left:"+Math.round(p.x-hr.left)+"px;top:"+Math.round(p.y-hr.top)+"px";
    hd.appendChild(dc);
  }
  function syAll(){
    if(!W.__ndsAttivo)return;
    rFx();aFx();pDc();drawLuci(luciNas,nas.offsetWidth);
    var mob=innerWidth<=520;
    if(nv&&(Math.abs(innerWidth-lastW)>40||mob!==lastMob)){lastW=innerWidth;lastMob=mob;killNv();mkNv()}
    else{lastW=innerWidth;lastMob=mob}
  }
  syAll();
  if(W.MutationObserver){mo=new MutationObserver(function(){if(!tm&&W.__ndsAttivo)tm=setTimeout(function(){tm=null;syAll()},150)});mo.observe(D.body,{childList:true,subtree:true});setTimeout(function(){if(mo){mo.disconnect();mo=null}},4000)}
  addEventListener("scroll",aFx,{passive:true});addEventListener("resize",syAll,{passive:true});
  if(W.ResizeObserver)new ResizeObserver(function(){if(W.__ndsAttivo){aFx();drawLuci(luciNas,nas.offsetWidth)}}).observe(nas);
  if(mq&&mq.addEventListener)mq.addEventListener("change",function(ev){rid=ev.matches;if(rid)killNv();else mkNv();syB()});
  bC.addEventListener("click",function(){
    W.__ndsAttivo=false;ls(C.chiave+"_chiuso","1");
    if(tm){clearTimeout(tm);tm=null}if(mo){mo.disconnect();mo=null}
    removeEventListener("scroll",aFx);removeEventListener("resize",syAll);
    for(var i=0;i<fx.length;i++)fx[i].el.style.top=fx[i].orig;
    clearDec();killNv();nas.remove();if(st)st.remove();
  });
}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",av,{once:true});else av();
})();
