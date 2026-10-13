"use strict";
(function(){
  var g=document.getElementById("griglia");
  function el(t,c,txt){var e=document.createElement(t);if(c)e.className=c;if(txt)e.textContent=txt;return e;}
  function sicuro(u){try{var x=new URL(u,location.href);return /^https?:$/.test(x.protocol)?x.href:"";}catch(e){return "";}}
  function link(href,txt,cls){var a=el("a",cls,txt);a.href=href;a.target="_blank";a.rel="noopener noreferrer";return a;}
  fetch("attivita.json",{cache:"no-cache"}).then(function(r){return r.json();}).then(function(lista){
    g.textContent="";if(lista.length<=2)g.classList.add("poche");
    lista.forEach(function(a){
      var c=el("article","card"+(a.in_evidenza?" evidenza":""));
      if(a.in_evidenza)c.appendChild(el("span","tag","In evidenza"));
      if(a.immagine){var i=el("img");i.src=a.immagine;i.alt=a.nome;i.loading="lazy";c.appendChild(i);}
      else c.appendChild(el("div","logo",(a.nome||"?").charAt(0)));
      c.appendChild(el("h2","",a.nome));c.appendChild(el("p","",a.descrizione));
      var az=el("div","azioni"),u=a.link&&sicuro(a.link);
      if(u)az.appendChild(link(u,a.etichetta_link||"Visita","btn"));
      var n=(a.whatsapp||"").replace(/\D/g,"");
      if(n)az.appendChild(link("https://wa.me/"+n,"Scrivi su WhatsApp","btn wa"));
      if(az.children.length)c.appendChild(az);g.appendChild(c);
    });
  }).catch(function(){g.textContent="Impossibile caricare gli annunci.";});
})();
