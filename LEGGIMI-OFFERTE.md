# Offerte a rotazione (devshare.it)

Banner sponsorizzati che girano da soli. **Per ora sono attivi SOLO su devshare.it.**
Non vanno messi su altri siti (e mai sui siti dei clienti, es. landauto.it) se non su ordine del Titolare.

File: `offerte.json` (dati, fonte unica), `offerte.js` (componente), `offerte.css` (stile).
Nessuno script o stile inline: funziona con la CSP del sito (`script-src 'self'; style-src 'self'; connect-src 'self'`).

## Dove sta il file
`https://devshare.it/offerte.json` (radice del sito). Indirizzo stabile: non spostarlo né rinominarlo,
perché lo legge anche il bot che scrive i post del canale Telegram NewsFlow.

## Formato di offerte.json
Un array JSON di oggetti (valido anche con una sola offerta: `[ { ... } ]`; con nessuna offerta: `[]`).
Tutti i campi sono **testo semplice**: niente HTML, niente Markdown (il sito li mostra come testo, non li interpreta).

| Campo | Obbl. | Contenuto |
|---|---|---|
| `id` | sì | Identificativo unico e stabile, minuscole e trattini (es. `amex-platino-2026-11`). Non riusarlo per offerte diverse. |
| `titolo` | sì | Titolo breve del banner. |
| `testo` | sì | Descrizione completa (una o due frasi). |
| `testo_breve` | no | Versione autonoma e compatta, adatta a un post (es. Telegram). Se manca, usare `titolo` + `testo`. |
| `testo_pulsante` | no | Testo del pulsante (default «Scopri l'offerta»). |
| `link` | sì | URL completo `https://...` (senza `https` l'offerta viene scartata). Nel sito è aperto con `rel="sponsored noopener"` e `target="_blank"`. |
| `scadenza` | sì | Data ISO `AAAA-MM-GG`. L'offerta vale **fino alla fine di quel giorno, ora di Roma** (es. `2026-11-16` sparisce il 17/11/2026 alle 00:00 ora di Roma). Data mancante o non valida = offerta non mostrata. |
| `immagine` | no | Percorso di un'immagine **sullo stesso sito** (es. `img/offerte/xyz.webp`, quadrata, < 100 KB). Solo immagini fatte da noi, senza loghi o marchi protetti. Vuoto `""` = banner solo testo. |
| `nota` | no | Riga in piccolo sotto il banner. Default: «Link di presentazione: chi presenta riceve un bonus. Si applicano i Termini e Condizioni dell'emittente.» (per American Express si scrive «di American Express»). |

Le offerte scadute vengono scartate in automatico (anche con la pagina già aperta: controllo ogni minuto).
Se non resta nessuna offerta valida, o il JavaScript è disattivato, il contenitore resta nascosto.

## Aggiungere un'offerta
1. Aggiungi un oggetto all'array in `offerte.json` (attenzione alle virgole tra gli oggetti).
2. Controlla il file: `python3 -m json.tool offerte.json`.
3. Prova in locale: `python3 -m http.server 8000` e apri http://localhost:8000.
4. Le offerte scadute si possono lasciare (non compaiono) ma è meglio toglierle a ogni aggiornamento.

Con più offerte valide il banner ruota ogni 7 secondi, con frecce, puntini e pulsante Pausa/Riprendi.
La rotazione si ferma col mouse sopra o col focus da tastiera; un tocco su telefono la mette in pausa.
Con «riduci movimento» attivo nel sistema (prefers-reduced-motion) non ruota da sola e non ci sono animazioni.

## Inserimento in una pagina (solo su ordine del Titolare per siti diversi da devshare.it)
Copia `offerte.css`, `offerte.js` e `offerte.json` nella radice del sito, poi nella pagina:
```html
<link rel="stylesheet" href="offerte.css">          <!-- nel <head> -->
<div id="offerte" hidden></div>                     <!-- dove deve comparire il banner -->
<script src="offerte.js"></script>                  <!-- in fondo al <body> -->
```
Facoltativo sul contenitore: `data-src="/percorso/offerte.json"` (altro percorso, stessa origine per la CSP)
e `data-intervallo="7000"` (millisecondi, minimo 3000).
