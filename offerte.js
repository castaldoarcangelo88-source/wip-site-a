/* Offerte a rotazione - componente riutilizzabile (vedi LEGGIMI-OFFERTE.md).
   Uso: <div id="offerte" hidden></div> + offerte.css + offerte.js (+ offerte.json).
   Facoltativo sul contenitore: data-src="percorso/offerte.json", data-intervallo="7000". */
"use strict";
(function(){
  var box=document.getElementById("offerte")||document.querySelector("[data-offerte]");
  if(!box||!window.fetch)return;
  var SRC=box.getAttribute("data-src")||"offerte.json";
  var INTERVALLO=Math.max(3000,parseInt(box.getAttribute("data-intervallo"),10)||7000);
  var NOTA="Link di presentazione: chi presenta riceve un bonus. Si applicano i Termini e Condizioni dell'emittente.";
  var ridotto=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Ora legale UE (Italia): UTC+2 dall'ultima domenica di marzo alle ultima di ottobre, 01:00 UTC. */
  function ultimaDomenica(y,m){var d=new Date(Date.UTC(y,m+1,0));return Date.UTC(y,m,d.getUTCDate()-d.getUTCDay(),1);}
  function offsetRomaMs(utc){var y=new Date(utc).getUTCFullYear();return (utc>=ultimaDomenica(y,2)&&utc<ultimaDomenica(y,9))?7200000:3600000;}
  /* "2026-11-16" -> istante UTC di 2026-11-17 00:00 ora di Roma (fine validità, esclusa). */
  function fineGiorno(iso){
    var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso||"").trim());if(!m)return NaN;
    var mezzanotte=Date.UTC(+m[1],+m[2]-1,+m[3]+1);
    return mezzanotte-offsetRomaMs(mezzanotte-3600000);
  }
  function linkSicuro(u){try{var x=new URL(u,location.href);return x.protocol==="https:"?x.href:"";}catch(e){return "";}}
  function valide(lista){var ora=Date.now();return lista.filter(function(o){return o&&o.titolo&&linkSicuro(o.link)&&ora<fineGiorno(o.scadenza);});}
  function el(t,c,txt){var e=document.createElement(t);if(c)e.className=c;if(txt)e.textContent=txt;return e;}

  var offerte=[],i=0,timer=null,pausaUtente=ridotto,pausaTemp=false,slide,ctrl,dots=[],btnPausa;

  function nascondi(){clearInterval(timer);timer=null;box.hidden=true;box.textContent="";}
  function disegna(annuncia){
    offerte=valide(offerte);
    if(!offerte.length){nascondi();return;}
    if(i>=offerte.length)i=0;
    var o=offerte[i],s=el("div","of-slide");
    s.setAttribute("role","group");s.setAttribute("aria-roledescription","offerta");
    if(offerte.length>1)s.setAttribute("aria-label",(i+1)+" di "+offerte.length);
    if(o.immagine){var im=el("img","of-img");im.src=o.immagine;im.alt="";im.loading="lazy";im.decoding="async";im.onerror=function(){im.remove();};s.appendChild(im);}
    var t=el("div","of-testo");
    t.appendChild(el("p","of-etichetta","Annuncio · Offerta a tempo limitato"));
    t.appendChild(el("h2","of-titolo",o.titolo));
    if(o.testo)t.appendChild(el("p","of-desc",o.testo));
    s.appendChild(t);
    var az=el("div","of-azione"),a=el("a","of-btn",o.testo_pulsante||"Scopri l'offerta");
    a.href=linkSicuro(o.link);a.target="_blank";a.rel="sponsored noopener";
    az.appendChild(a);s.appendChild(az);
    s.appendChild(el("p","of-nota",o.nota||NOTA));
    box.setAttribute("aria-live",annuncia?"polite":"off");
    if(slide)box.replaceChild(s,slide);else box.insertBefore(s,box.firstChild);
    slide=s;
    aggiornaCtrl();
  }
  function aggiornaCtrl(){
    if(offerte.length<2){if(ctrl){ctrl.remove();ctrl=null;}dots=[];return;}
    if(!ctrl||dots.length!==offerte.length){
      if(ctrl)ctrl.remove();dots=[];
      ctrl=el("div","of-ctrl");
      var prec=el("button","of-freccia","\u2039");prec.type="button";prec.setAttribute("aria-label","Offerta precedente");
      prec.onclick=function(){vai(i-1,true);};ctrl.appendChild(prec);
      offerte.forEach(function(_,k){var d=el("button","of-dot");d.type="button";d.setAttribute("aria-label","Offerta "+(k+1)+" di "+offerte.length);
        d.onclick=function(){vai(k,true);};ctrl.appendChild(d);dots.push(d);});
      var succ=el("button","of-freccia","\u203a");succ.type="button";succ.setAttribute("aria-label","Offerta successiva");
      succ.onclick=function(){vai(i+1,true);};ctrl.appendChild(succ);
      btnPausa=el("button","of-pausa");btnPausa.type="button";
      btnPausa.onclick=function(){pausaUtente=!pausaUtente;aggiornaCtrl();avvia();};
      ctrl.appendChild(btnPausa);box.appendChild(ctrl);
    }
    dots.forEach(function(d,k){if(k===i)d.setAttribute("aria-current","true");else d.removeAttribute("aria-current");});
    btnPausa.textContent=pausaUtente?"Riprendi":"Pausa";
    btnPausa.setAttribute("aria-label",pausaUtente?"Riprendi la rotazione delle offerte":"Metti in pausa la rotazione delle offerte");
  }
  function vai(k,daUtente){
    var n=offerte.length;if(!n)return;i=((k%n)+n)%n;disegna(daUtente);avvia();
  }
  function avvia(){
    clearInterval(timer);timer=null;
    /* Controllo scadenza ogni minuto anche con una sola offerta o in pausa. */
    timer=setInterval(function(){
      if(offerte.length>1&&!pausaUtente&&!pausaTemp&&!document.hidden)vai(i+1,false);
      else disegna(false);
    },offerte.length>1&&!pausaUtente?INTERVALLO:60000);
  }
  box.addEventListener("mouseenter",function(){pausaTemp=true;});
  box.addEventListener("mouseleave",function(){pausaTemp=false;});
  box.addEventListener("focusin",function(){pausaTemp=true;});
  box.addEventListener("focusout",function(e){if(!box.contains(e.relatedTarget))pausaTemp=false;});
  box.addEventListener("touchstart",function(){if(!pausaUtente){pausaUtente=true;aggiornaCtrl();avvia();}},{passive:true});

  fetch(SRC,{cache:"no-cache"}).then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(dati){
    offerte=valide(Array.isArray(dati)?dati:(dati&&Array.isArray(dati.offerte)?dati.offerte:[]));
    if(!offerte.length)return;
    box.classList.add("offerte");if(!ridotto)box.classList.add("of-anim");
    box.setAttribute("role","region");box.setAttribute("aria-label","Offerte sponsorizzate");
    box.textContent="";disegna(false);box.hidden=false;avvia();
  }).catch(function(){box.hidden=true;});
})();
