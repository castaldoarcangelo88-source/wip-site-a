# Pubblicare i siti con un tocco dal telefono

Due pulsanti, uno per sito. Nessuno dei due pubblica da solo: dopo il tocco il Titolare deve approvare.

## Una tantum: preparazione (da computer o dal browser del telefono, github.com)

Repository **devsharesrl-sorgente** (sito devsharesrl.it):
1. Settings → Secrets and variables → Actions → **New repository secret**.
   Nome: `DEVSHARESRL_FTP_PASSWORD`. Valore: la password FTP. Salva.
2. Settings → Environments → **New environment** → nome `produzione`.
   Spunta **Required reviewers**, aggiungi il tuo utente GitHub. Salva.
   (Facoltativo: «Deployment branches» → solo il ramo da cui si pubblica.)

Repository **wip-site-a** (sito devshare.it):
3. Settings → Environments → **New environment** → `produzione`, con **Required reviewers** come sopra.
4. Se main è protetto, consenti a GitHub Actions di aggiornarlo (Settings → Actions → General → Workflow permissions: «Read and write»).

## Ogni volta: pubblicare dall'app GitHub

1. Apri l'app **GitHub** → il repository (devsharesrl-sorgente oppure wip-site-a).
2. Tocca **Actions** → scegli **«Pubblica devsharesrl.it»** oppure **«Pubblica devshare.it»**.
3. Tocca **Run workflow**.
   - devsharesrl.it: lascia «Solo prova» spento per pubblicare; acceso per vedere cosa cambierebbe senza caricare nulla.
   - devshare.it: indica il ramo da pubblicare (di solito `anteprima`).
4. Tocca di nuovo **Run workflow** per confermare.
5. Arriva la notifica «Review pending»: apri il lavoro → **Review deployments** → spunta `produzione` → **Approve and deploy**.
6. Attendi la spunta verde (2–4 minuti). Se diventa rossa:
   - devsharesrl.it: i file sostituiti vengono ricaricati in automatico dal backup; la copia resta scaricabile nel lavoro, voce «backup-online» (90 giorni).
   - devshare.it: main non viene toccato se i controlli falliscono.

## Cosa fa (e cosa non fa mai)
- devsharesrl.it: build del sito, confronto con i file online, backup dei file che verranno sostituiti, caricamento FTPS **solo dei file cambiati** (prima immagini e codice, poi le pagine), controllo che le pagine rispondano e non abbiano noindex. **Mai cancellazioni, mai .htaccess.**
- devshare.it: porta il ramo scelto su main senza riscrivere la storia; GitHub Pages pubblica in un minuto.
