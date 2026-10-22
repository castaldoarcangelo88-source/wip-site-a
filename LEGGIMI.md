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
