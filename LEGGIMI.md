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
