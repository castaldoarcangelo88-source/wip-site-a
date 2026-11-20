"use strict";
/* ================================================================
   BARRE PUBBLICITARIE – UNICO PUNTO DA MODIFICARE PER I TESTI
   ----------------------------------------------------------------
   Ogni oggetto in ANNUNCI è un riquadro nelle barre laterali, nell'ordine
   in cui compare. Lo slot BBVA NON è qui: è scritto in index.html.
   Campi comuni:
     tipo:     "libero" (spazio in vendita) | "news" | "prodotto"
     colonna:  "sx" (sinistra) | "dx" (destra). Su mobile tutto va in fondo.
     esempio:  true = mostra il bollino «Esempio» (contenuto finto)
     link:     indirizzo del pulsante. Se è esterno a DevShare si apre in una
               nuova scheda con rel="sponsored noopener".
     cta:      testo del pulsante
   Campi per tipo:
     libero:   titolo, testo, prezzo
     news:     etichetta ("News" o "Promo"), titolo, testo
     prodotto: nome (titolo), testo, prezzo_prima, prezzo_ora
   Prezzi: sempre con lo spazio prima di €, es. "10 €".
   ================================================================ */
var ANNUNCI = [
  /* --- colonna sinistra (sotto lo slot BBVA) --- */
  {tipo:"news", colonna:"sx", esempio:true, etichetta:"News",
   titolo:"Titolo della notizia di esempio",
   testo:"Esempio: una frase su cosa cambia per chi legge.",
   cta:"Leggi la notizia", link:"/pubblicita/"},
  {tipo:"libero", colonna:"sx",
   titolo:"Il tuo marchio qui",
   testo:"Uno spazio fisso sul sito DevShare per far conoscere la tua attività, a 10 € al mese + IVA.",
   prezzo:"10 € al mese + IVA", cta:"Prenota il tuo spazio", link:"/pubblicita/"},
  {tipo:"libero", colonna:"sx",
   titolo:"Fatti trovare da chi cerca il digitale",
   testo:"Chi visita DevShare cerca siti, app e software: mostra lì la tua attività, a 10 € al mese + IVA.",
   prezzo:"10 € al mese + IVA", cta:"Prenota il tuo spazio", link:"/pubblicita/"},
  /* --- colonna destra --- */
  {tipo:"prodotto", colonna:"dx", esempio:true,
   nome:"Prodotto di esempio a XX,XX €",
   testo:"Invece di YY,YY €, fino al GG/MM/AAAA.",
   prezzo_prima:"YY,YY €", prezzo_ora:"XX,XX €",
   cta:"Scopri l'offerta", link:"/pubblicita/"},
  {tipo:"libero", colonna:"dx",
   titolo:"Una vetrina sempre accesa",
   testo:"Il tuo annuncio resta online tutto il mese, giorno e notte, a 10 € al mese + IVA.",
   prezzo:"10 € al mese + IVA", cta:"Prenota il tuo spazio", link:"/pubblicita/"},
  {tipo:"libero", colonna:"dx",
   titolo:"Prezzo fisso, nessuna sorpresa",
   testo:"Visibilità sul sito DevShare a 10 € al mese + IVA: sai sempre quanto spendi.",
   prezzo:"10 € al mese + IVA", cta:"Prenota il tuo spazio", link:"/pubblicita/"},
  {tipo:"libero", colonna:"dx",
   titolo:"Spazio disponibile",
   testo:"Metti la tua attività accanto ai contenuti di DevShare e fatti notare, a 10 € al mese + IVA.",
   prezzo:"10 € al mese + IVA", cta:"Prenota il tuo spazio", link:"/pubblicita/"}
];
/* ====================== fine dati, sotto solo codice ====================== */

(function(){
  var DOMINI_DEVSHARE=/(^|\.)(devsharesrl\.it|devshare\.it)$/i;
  function el(t,c,txt){var e=document.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
  function sicuro(u){try{var x=new URL(u,location.href);return /^(https?|mailto):$/.test(x.protocol)?x:null;}catch(e){return null;}}
  function etichette(box,testi,esempio){
    var p=el("p","ad-etichetta");
    p.textContent=testi.join(" · ");
    if(esempio){p.appendChild(document.createTextNode(" "));p.appendChild(el("span","ad-esempio","Esempio"));}
    box.appendChild(p);
  }
  function pulsante(a,cls){
    var u=sicuro(a.link);if(!u||!a.cta)return null;
    var b=el("a",cls,a.cta);b.href=u.href;
    if(/^https?:$/.test(u.protocol)&&!DOMINI_DEVSHARE.test(u.hostname)){b.target="_blank";b.rel="sponsored noopener";}
    return b;
  }
  function libero(a){
    var box=el("div","ad-slot ad-libero");
    etichette(box,["Pubblicità"],a.esempio);
    box.appendChild(el("p","ad-libero-titolo",a.titolo));
    if(a.testo)box.appendChild(el("p","ad-libero-testo",a.testo));
    if(a.prezzo)box.appendChild(el("p","ad-prezzo-spazio",a.prezzo));
    var b=pulsante(a,"ad-btn ad-btn-scuro");if(b)box.appendChild(b);
    return box;
  }
  function news(a){
    var box=el("div","ad-slot ad-news");
    etichette(box,["Pubblicità",a.etichetta||"News"],a.esempio);
    box.appendChild(el("p","ad-news-titolo",a.titolo));
    if(a.testo)box.appendChild(el("p","ad-news-testo",a.testo));
    var b=pulsante(a,"ad-link");if(b)box.appendChild(b);
    return box;
  }
  function prodotto(a){
    var box=el("div","ad-slot ad-prodotto");
    etichette(box,["Pubblicità","Promo"],a.esempio);
    box.appendChild(el("p","ad-prodotto-nome",a.nome));
    var pr=el("p","ad-prezzi");
    if(a.prezzo_prima){var d=el("del","ad-prezzo-prima",a.prezzo_prima);d.setAttribute("aria-label","prezzo precedente "+a.prezzo_prima);pr.appendChild(d);pr.appendChild(document.createTextNode(" "));}
    if(a.prezzo_ora){var s=el("strong","ad-prezzo-ora",a.prezzo_ora);s.setAttribute("aria-label","prezzo scontato "+a.prezzo_ora);pr.appendChild(s);}
    box.appendChild(pr);
    if(a.testo)box.appendChild(el("p","ad-prodotto-testo",a.testo));
    var b=pulsante(a,"ad-btn ad-btn-promo");if(b)box.appendChild(b);
    return box;
  }
  var DISEGNA={libero:libero,news:news,prodotto:prodotto};
  var contenitori=document.querySelectorAll(".ads-dinamici[data-colonna]");
  Array.prototype.forEach.call(contenitori,function(c){
    var col=c.getAttribute("data-colonna"),frag=document.createDocumentFragment(),n=0;
    ANNUNCI.forEach(function(a){if(a.colonna===col&&DISEGNA[a.tipo]){frag.appendChild(DISEGNA[a.tipo](a));n++;}});
    if(n){c.textContent="";c.appendChild(frag);}
  });

  /* Barre ferme durante lo scorrimento solo se entrano intere nello schermo (desktop). */
  var barre=document.querySelectorAll(".ads");
  function fissa(){Array.prototype.forEach.call(barre,function(b){
    b.classList.remove("ads-fissa");
    if(window.innerWidth>=1200&&b.offsetHeight<=window.innerHeight)b.classList.add("ads-fissa");});}
  fissa();window.addEventListener("resize",fissa);

  /* Pulsante "Copia codice" (slot BBVA): si vede solo se JavaScript è attivo. */
  var bottoni=document.querySelectorAll(".ad-copia[data-copia]");
  Array.prototype.forEach.call(bottoni,function(b){
    var cod=document.getElementById(b.getAttribute("data-copia"));if(!cod)return;
    var esito=b.parentNode.querySelector(".ad-copia-esito");
    b.hidden=false;
    function scrivi(t){if(esito){esito.textContent=t;setTimeout(function(){esito.textContent="";},3000);}}
    function selezione(){var r=document.createRange();r.selectNodeContents(cod);var s=window.getSelection();s.removeAllRanges();s.addRange(r);}
    b.addEventListener("click",function(){
      var testo=cod.textContent.trim();
      if(navigator.clipboard&&window.isSecureContext){
        navigator.clipboard.writeText(testo).then(function(){scrivi("Codice copiato");},function(){selezione();scrivi("Premi Ctrl+C per copiare");});
      }else{selezione();scrivi("Premi Ctrl+C per copiare");}
    });
  });
})();
