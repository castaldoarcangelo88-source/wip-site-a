"use strict";
/* Barre pubblicitarie: pulsante "Copia codice" (si vede solo se JavaScript è attivo). */
(function(){
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
