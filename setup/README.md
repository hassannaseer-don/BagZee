# Payment screenshot setup (one time, about 5 minutes)

The website cannot store files by itself. This small Google script receives each order and
screenshot and saves them in your own Google Drive and Sheet.

1. Open https://sheets.google.com and create a blank sheet named "bag.Ze orders".
2. In the sheet choose Extensions, then Apps Script.
3. Delete the sample code, paste all of `payment-proof.gs`, and click Save.
4. Click Deploy, then New deployment. Click the gear and choose Web app.
5. Set "Execute as" to Me and "Who has access" to Anyone. Click Deploy.
6. Google asks you to allow access to Drive, Sheets and Gmail. Allow it.
7. Copy the Web app URL (it ends with /exec).
8. In `docs/index.html` paste that URL between the quotes of `var PROOF_ENDPOINT = '';` and save.

Until step 8 is done, the page asks customers to attach the screenshot in the WhatsApp chat.
