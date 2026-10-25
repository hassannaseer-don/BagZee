/**
 * bag.Ze order and payment screenshot receiver (Google Apps Script).
 *
 * What it does: when a customer sends an order from the website, this script
 *  - saves the payment screenshot as an image in your Google Drive folder "bag.Ze payment proofs"
 *  - adds one row per order to the Google Sheet this script is attached to
 *  - emails you a summary with the link to the screenshot
 *
 * Setup is in setup/README.md.
 */
var OWNER_EMAIL = 'hassannaseer533@gmail.com';
var FOLDER_NAME = 'bag.Ze payment proofs';
var MAX_IMAGE_CHARS = 3000000; // about 2 MB of image data

function clean(v) {
  v = String(v == null ? '' : v).slice(0, 600);
  return /^[=+\-@]/.test(v) ? "'" + v : v; // stops spreadsheet formulas from running
}

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var link = '';
    var shot = String(d.screenshot || '');
    if (/^data:image\/jpeg;base64,/.test(shot) && shot.length < MAX_IMAGE_CHARS) {
      var folders = DriveApp.getFoldersByName(FOLDER_NAME);
      var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(FOLDER_NAME);
      var blob = Utilities.newBlob(Utilities.base64Decode(shot.split(',')[1]), 'image/jpeg', 'proof-' + Date.now() + '.jpg');
      link = folder.createFile(blob).getUrl();
    }
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Time', 'Name', 'Phone', 'City', 'Address', 'Payment', 'Advance via', 'Total (PKR)', 'Due now (PKR)', 'Items', 'Screenshot']);
    }
    sheet.appendRow([new Date(), clean(d.name), clean(d.phone), clean(d.city), clean(d.address), clean(d.payment),
      clean(d.advanceVia), Number(d.total) || 0, Number(d.dueNow) || 0, clean(d.items), link]);
    MailApp.sendEmail(OWNER_EMAIL, 'New bag.Ze order from ' + clean(d.name),
      'Name: ' + clean(d.name) + '\nPhone: ' + clean(d.phone) + '\nCity: ' + clean(d.city) + '\nAddress: ' + clean(d.address) +
      '\nPayment: ' + clean(d.payment) + (d.advanceVia ? ' (advance via ' + clean(d.advanceVia) + ')' : '') +
      '\nTotal: PKR ' + (Number(d.total) || 0) + '\nDue now: PKR ' + (Number(d.dueNow) || 0) +
      '\nItems: ' + clean(d.items) + '\nScreenshot: ' + (link || 'none'));
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error');
  }
}
