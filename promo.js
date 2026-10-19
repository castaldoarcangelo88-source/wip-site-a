"use strict";
/* Mostra il banner solo fino al 16/11/2026 incluso (si spegne il 17/11/2026 alle 00:00 ora di Roma = 16/11/2026 23:00 UTC) */
(function(){
  var b=document.getElementById("promo-platino");
  if(!b)return;
  var scadenza=Date.UTC(2026,10,16,23,0,0);
  if(Date.now()<scadenza)b.hidden=false;else if(b.parentNode)b.parentNode.removeChild(b);
})();
