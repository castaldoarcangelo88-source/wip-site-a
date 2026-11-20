# Vetrina DevShare (devshare.it)

Sito statico, nessuna build, nessuno script esterno. File: `index.html`, `style.css`, `app.js`, `attivita.json`, cartella `img/`.

## Aggiungere un annuncio
1. Apri `attivita.json` e aggiungi un oggetto all'elenco (attenzione alle virgole tra gli oggetti):
```json
{"nome":"Nome attività","descrizione":"Una riga di descrizione.","immagine":"img/logo.webp","link":"https://sito.it","etichetta_link":"Visita il sito","whatsapp":"393331234567","in_evidenza":false}
```
2. Campi: `immagine`, `link`, `etichetta_link`, `whatsapp` sono facoltativi (lascia `""`). Senza immagine compare l'iniziale del nome.
3. `whatsapp`: numero con prefisso internazionale, solo cifre (es. 39...). Genera il pulsante wa.me.
4. `in_evidenza: true` rende il riquadro più largo (consigliato al massimo uno).
5. Metti le immagini in `img/` (meglio WebP, 16:9, < 200 KB).
6. Controlla il JSON (es. `python3 -m json.tool attivita.json`).

La griglia si adatta da sola: con 1-2 annunci i riquadri sono grandi, con molti si compattano.

## Prova in locale
`python3 -m http.server 8000` nella cartella, poi apri http://localhost:8000 (aprendo il file direttamente il JSON non si carica).

## Blog (recuperato dal vecchio WordPress, 22/10/2026)
- `blog/` (indice), `blog/<slug>/` (articoli), `blog/img/` (copertine 1600x800, 800x400, social 1200x630), `blog/blog.css`.
- Le cartelle in radice con i vecchi indirizzi WordPress (`/<vecchio-slug>/` e `/AAAA/MM/GG/<vecchio-slug>/`) contengono solo redirect (meta refresh + canonical) verso `/blog/<slug>/`.
- `sitemap.xml` e `robots.txt` in radice. Le pagine riservate non sono nella sitemap.
- Le pagine sono generate da `genera.py` (fuori dal repository, in /workspace/blog-devshare-recupero/) a partire dai testi in `testi/*.md`.

## Barre pubblicitarie laterali (staging 20/11/2026, v2)
- File: `ads.css`, `ads.js`, snippet `partials/barre-pubblicitarie.html` (già inserito in `index.html`).
- Desktop (da 1200px): barre a sinistra e a destra del contenuto. Sotto 1200px: le barre vanno in fondo, dopo il contenuto. Le barre restano ferme durante lo scorrimento solo se entrano intere nello schermo (lo decide `ads.js`).
- Il sito ha una CSP rigida: niente stili o script in linea, solo file locali.

### Cambiare i testi: UN SOLO PUNTO
Tutti i riquadri (spazi in vendita, News, Prodotto in offerta) stanno nell'elenco `ANNUNCI` in cima a `ads.js`. Si modificano solo le stringhe tra virgolette; l'ordine nell'elenco è l'ordine in pagina. Lo slot BBVA invece è scritto in `index.html` (non toccarlo senza ordine).
- `tipo`: `"libero"` (spazio in vendita), `"news"`, `"prodotto"`.
- `colonna`: `"sx"` o `"dx"`.
- `esempio: true` mostra il bollino «Esempio»: toglierlo (o metterlo a `false`) quando il contenuto è vero.
- `link`: se esterno a devsharesrl.it/devshare.it, si apre in nuova scheda con `rel="sponsored noopener"` (automatico).
- Prezzi sempre con lo spazio: «10 €».
- Vendere uno spazio: sostituire un oggetto `"libero"` con un `"news"` o `"prodotto"` (o con testi propri dell'inserzionista).
- Senza JavaScript compare un solo riquadro di riserva «Spazio pubblicitario disponibile – contattaci» per colonna.

### Tipi di banner (classi CSS generate da ads.js)
- Spazio in vendita – `div.ad-slot.ad-libero`: `p.ad-etichetta` («Pubblicità»), `p.ad-libero-titolo`, `p.ad-libero-testo`, `p.ad-prezzo-spazio`, `a.ad-btn.ad-btn-scuro`.
  `{tipo:"libero", colonna:"sx", titolo:"…", testo:"…", prezzo:"10 € al mese + IVA", cta:"Prenota il tuo spazio", link:"https://www.devsharesrl.it/contatti/"}`
- News – `div.ad-slot.ad-news`: `p.ad-etichetta` («Pubblicità · News» o «Pubblicità · Promo»), `p.ad-news-titolo`, `p.ad-news-testo`, `a.ad-link`.
  `{tipo:"news", colonna:"sx", etichetta:"News", titolo:"…", testo:"…", cta:"Leggi la notizia", link:"…"}`
- Prodotto in offerta – `div.ad-slot.ad-prodotto`: `p.ad-etichetta` («Pubblicità · Promo»), `p.ad-prodotto-nome`, `p.ad-prezzi` con `del.ad-prezzo-prima` (aria-label «prezzo precedente …») e `strong.ad-prezzo-ora` (aria-label «prezzo scontato …»), `p.ad-prodotto-testo`, `a.ad-btn.ad-btn-promo`.
  `{tipo:"prodotto", colonna:"dx", nome:"…", prezzo_prima:"… €", prezzo_ora:"… €", testo:"…", cta:"Scopri l'offerta", link:"…"}`
- Bollino contenuto finto: `span.ad-esempio` («Esempio»), attivato da `esempio:true`.
