"use strict";
/* Nasconde la striscia promo ho. Mobile dopo la scadenza in data-scade
   (31/12/2026 23:59:59, ora di Roma, UTC+1 a dicembre). Solo nascondere: l'HTML resta pulito. */
(function(){
  var el=document.getElementById("promo-homobile");
  if(!el)return;
  var fine=Date.parse(el.getAttribute("data-scade")||"");
  if(!isNaN(fine)&&Date.now()>fine)el.hidden=true;
})();
