/* Sessione dell'area riservata (staging 20/11/2026).
   - sessionStorage "pp" contiene SOLO il flag "1" (accesso già fatto in questa scheda), mai la password.
   - Per aprire le pagine riservate senza richiedere la password a ogni pagina, il browser conserva in IndexedDB
     ("ds-area") la chiave PBKDF2 creata dalla password come CryptoKey NON estraibile: il JavaScript può solo
     usarla per derivare la chiave di ogni pagina, non può leggerla né esportarla.
   - Validità massima 8 ore; senza flag nella scheda, scaduta o non valida viene cancellata.
   - Un vecchio "pp" con la password in chiaro (versione precedente) viene cancellato subito. */
"use strict";
(function(){
  var DB="ds-area",ST="chiavi",ID="accesso",MAX_MS=8*60*60*1000;
  function apriDb(){return new Promise(function(ok,ko){var r=indexedDB.open(DB,1);
    r.onupgradeneeded=function(){r.result.createObjectStore(ST);};
    r.onsuccess=function(){ok(r.result);};r.onerror=function(){ko(r.error);};});}
  function tx(modo,fn){return apriDb().then(function(db){return new Promise(function(ok,ko){
    var t=db.transaction(ST,modo),req=fn(t.objectStore(ST));
    t.oncomplete=function(){db.close();ok(req?req.result:undefined);};
    t.onerror=t.onabort=function(){db.close();ko(t.error);};});});}
  function flag(){try{return sessionStorage.getItem("pp");}catch(e){return null;}}
  function esci(){try{sessionStorage.removeItem("pp");}catch(e){}return tx("readwrite",function(s){return s.delete(ID);}).catch(function(){});}
  window.DSArea={
    /* k: CryptoKey PBKDF2 importata con extractable=false */
    salva:function(k){
      if(!k||k.extractable||k.algorithm.name!=="PBKDF2")return Promise.reject(new Error("chiave non valida"));
      return tx("readwrite",function(s){return s.put({k:k,t:Date.now()},ID);})
        .then(function(){try{sessionStorage.setItem("pp","1");}catch(e){}});
    },
    /* restituisce la CryptoKey se l'accesso è valido in questa scheda, altrimenti null (e pulisce) */
    leggi:function(){
      if(flag()!=="1")return esci().then(function(){return null;});
      return tx("readonly",function(s){return s.get(ID);}).then(function(v){
        if(!v||!v.k||v.k.extractable||!(Date.now()-v.t<MAX_MS))return esci().then(function(){return null;});
        return v.k;
      }).catch(function(){return null;});
    },
    esci:esci
  };
  /* pulizia: vecchio pp con la password, flag assente o accesso scaduto */
  var f=flag();if(f!==null&&f!=="1"){try{sessionStorage.removeItem("pp");}catch(e){}}
  if(flag()!=="1")esci();
})();
