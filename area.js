(()=>{const D={"s":"unzyg2Kjm8FALhEYx0qKbw==","v":"+ch00H8Fl2K233Jc","c":"STJUAYSfoiu8sToevQ+A9XqrA6bIg1Mh2OBid+MW1B7MdA==","it":600000};
const u=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0)),$=i=>document.getElementById(i);
const W=()=>{try{return +localStorage.getItem("pt")||0}catch(_){return 0}},SW=n=>{try{localStorage.setItem("pt",n)}catch(_){}};
const dlg=$("ar-dlg"),f=$("ar-f"),pw=$("ar-pw"),er=$("ar-err"),bt=$("ar-ok");
$("ar-apri").addEventListener("click",()=>{er.textContent="";pw.value="";dlg.showModal();pw.focus()});
$("ar-chiudi").addEventListener("click",()=>dlg.close());
f.addEventListener("submit",async e=>{e.preventDefault();if(bt.disabled)return;bt.disabled=true;er.textContent="Verifica…";const p=pw.value;
try{const k0=await crypto.subtle.importKey("raw",new TextEncoder().encode(p),"PBKDF2",false,["deriveKey"]);
const k=await crypto.subtle.deriveKey({name:"PBKDF2",salt:u(D.s),iterations:D.it,hash:"SHA-256"},k0,{name:"AES-GCM",length:256},false,["decrypt"]);
const r=new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:u(D.v)},k,u(D.c)));
if(!/^\/r-[a-z0-9]+\/$/.test(r))throw 0;SW(0);try{sessionStorage.setItem("pp",p)}catch(_){}location.href=r+"progetti/"}
catch(_){const n=W()+1;SW(n);let s=Math.min(2**(n-1),30);const t=()=>{er.textContent="Eh no, qui non sei autorizzato."+(s>0?" Riprova tra "+s+" s":"");if(s--<=0)bt.disabled=false;else setTimeout(t,1000)};t()}});
})();
