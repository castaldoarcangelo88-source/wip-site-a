/* Banner cookie + Google Consent Mode v2 per devshare.it.
   - Prima di tutto: consenso "denied" per tutte le categorie.
   - gtag.js viene caricato SOLO dopo "Accetta": prima del consenso nessuna richiesta parte verso Google.
   - La scelta è salvata in localStorage e si può cambiare dal pulsante "Preferenze cookie" nel footer. */
"use strict";
(function(){
  var CHIAVE="ds-consenso-analytics";
  var cfg=window.DS_GA||{};
  var ID=/^G-[A-Z0-9]+$/.test(cfg.measurementId||"")?cfg.measurementId:"";
  window.dataLayer=window.dataLayer||[];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag=window.gtag||gtag;
  /* Consent Mode v2: impostazione predefinita, prima di qualsiasi altro comando */
  gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied"});

  var caricato=false;
  function caricaGA(){
    if(caricato||!ID)return;caricato=true;
    window["ga-disable-"+ID]=false;
    gtag("consent","update",{analytics_storage:"granted"});
    var s=document.createElement("script");s.async=true;
    s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(ID);
    document.head.appendChild(s);
    gtag("js",new Date());
    gtag("config",ID,{anonymize_ip:true});
  }
  function fermaGA(){
    gtag("consent","update",{analytics_storage:"denied"});
    if(ID)window["ga-disable-"+ID]=true;
    /* cancella i cookie _ga eventualmente già scritti */
    document.cookie.split(";").forEach(function(c){
      var n=c.split("=")[0].trim();
      if(/^_ga/.test(n)){
        var h=location.hostname.split("."),d=[""];
        for(var i=0;i<h.length-1;i++)d.push("."+h.slice(i).join("."));
        d.forEach(function(dom){document.cookie=n+"=; Max-Age=0; path=/"+(dom?"; domain="+dom:"");});
      }
    });
  }
  var DURATA_MS=182*24*60*60*1000; /* scelta valida 6 mesi, poi il banner si ripropone */
  function leggi(){try{var v=JSON.parse(localStorage.getItem(CHIAVE)||"null");if(!v||(v.scelta!=="accetta"&&v.scelta!=="rifiuta"))return "";var t=Date.parse(v.data);if(!t||Date.now()-t>DURATA_MS){localStorage.removeItem(CHIAVE);return "";}return v.scelta;}catch(e){return "";}}
  function salva(s){try{localStorage.setItem(CHIAVE,JSON.stringify({scelta:s,data:new Date().toISOString()}));}catch(e){}}

  var banner=null;
  var INFO_URL="/privacy-cookie/",INFO_TESTO="Informativa privacy e cookie";
  function el(t,c,txt){var e=document.createElement(t);if(c)e.className=c;if(txt)e.textContent=txt;return e;}
  function creaBanner(){
    banner=el("section","cc-banner");banner.id="cc-banner";banner.hidden=true;
    banner.setAttribute("role","region");banner.setAttribute("aria-labelledby","cc-tit");
    var t=el("h2","cc-tit","Cookie e statistiche");t.id="cc-tit";
    var p=el("p","cc-testo","Con il tuo consenso usiamo Google Analytics per contare le visite al sito in forma aggregata, con indirizzo IP anonimizzato. Non usiamo cookie pubblicitari. Se rifiuti, non carichiamo nessuno strumento di statistica. Puoi cambiare scelta in qualsiasi momento da «Preferenze cookie» in fondo alla pagina. ");
    var li=el("a","cc-link",INFO_TESTO);li.href=INFO_URL;p.appendChild(li);p.appendChild(document.createTextNode("."));
    /* X di chiusura: vale esattamente come "Rifiuta" */
    var x=el("button","cc-chiudi");x.type="button";x.id="cc-chiudi";x.setAttribute("aria-label","Chiudi e rifiuta");
    var xi=el("span","","\u00d7");xi.setAttribute("aria-hidden","true");x.appendChild(xi);
    x.addEventListener("click",function(){scegli("rifiuta");});
    var az=el("div","cc-azioni");
    var r=el("button","cc-btn","Rifiuta");r.type="button";r.id="cc-rifiuta";
    var a=el("button","cc-btn","Accetta");a.type="button";a.id="cc-accetta";
    r.addEventListener("click",function(){scegli("rifiuta");});
    a.addEventListener("click",function(){scegli("accetta");});
    az.appendChild(r);az.appendChild(a);
    banner.appendChild(x);banner.appendChild(t);banner.appendChild(p);banner.appendChild(az);
    document.body.appendChild(banner);
    var f=document.querySelector("footer");
    if(f){var pr=el("p","cc-pref-riga"),b=el("button","cc-pref","Preferenze cookie");b.type="button";b.id="cc-preferenze";
      b.addEventListener("click",function(){mostra(true);});pr.appendChild(b);
      pr.appendChild(document.createTextNode(" · "));var fi=el("a","cc-pref-link",INFO_TESTO);fi.href=INFO_URL;pr.appendChild(fi);
      f.appendChild(pr);}
    /* Esc con il banner aperto vale come "Rifiuta" (non interferisce con le finestre di dialogo aperte) */
    document.addEventListener("keydown",function(e){
      if((e.key==="Escape"||e.key==="Esc")&&banner&&!banner.hidden&&!document.querySelector("dialog[open]")){e.preventDefault();scegli("rifiuta");}
    });
  }
  /* niente cookie wall: con il banner aperto la pagina resta scorribile e il fondo pagina non resta coperto */
  function spazio(){document.body.style.paddingBottom=banner&&!banner.hidden?(banner.offsetHeight+24)+"px":"";}
  window.addEventListener("resize",spazio);
  function mostra(fuoco){banner.hidden=false;spazio();if(fuoco){var b=document.getElementById("cc-accetta");if(b)b.focus();}}
  function scegli(s){
    var prima=leggi();salva(s);banner.hidden=true;spazio();
    if(s==="accetta")caricaGA();
    else{fermaGA();if(prima==="accetta"&&caricato)location.reload();}
  }

  var scelta=leggi();
  if(scelta==="accetta")caricaGA();
  function avvia(){creaBanner();if(!scelta)mostra(false);}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",avvia);else avvia();
})();
