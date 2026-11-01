/* bag.Ze theme scripts: mobile menu, product photos, sort select, payment screenshot. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- mobile menu drawer ---- */
  var drawer = $('#menu-drawer'), scrim = $('[data-scrim]'), opener = $('[data-menu-open]');
  var BACK = ['.announce', '.site-head', 'main', '.site-foot', '.wa-float'];
  function setInert(on) {
    BACK.forEach(function (q) { var e = $(q); if (e) { if (on) e.setAttribute('inert', ''); else e.removeAttribute('inert'); } });
  }
  function openMenu() {
    if (!drawer) return;
    drawer.hidden = false; scrim.hidden = false;
    document.body.classList.add('lock'); setInert(true);
    if (opener) opener.setAttribute('aria-expanded', 'true');
    var f = $('button, a', drawer); if (f) f.focus();
  }
  function closeMenu() {
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true; scrim.hidden = true;
    document.body.classList.remove('lock'); setInert(false);
    if (opener) { opener.setAttribute('aria-expanded', 'false'); opener.focus(); }
  }
  if (opener) opener.addEventListener('click', openMenu);
  $$('[data-menu-close]').forEach(function (b) { b.addEventListener('click', closeMenu); });
  if (scrim) scrim.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---- product photo thumbnails ---- */
  $$('[data-thumb]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var main = $('[data-main] img');
      if (main) { main.removeAttribute('srcset'); main.src = btn.getAttribute('data-thumb'); }
      $$('[data-thumb]').forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
    });
  });

  /* ---- collection sort ---- */
  var sort = $('[data-sort-select]');
  if (sort) {
    sort.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', sort.value);
      url.searchParams.delete('page');
      window.location.href = url.toString();
    });
  }

  /* ---- payment screenshot form ---- */
  var form = $('#proof-form');
  if (form) {
    var fileInput = $('#pf-file'), prev = $('#pf-prev'), status = $('#pf-status'), data = '';
    var say = function (t) { status.textContent = t; };
    fileInput.addEventListener('change', function () {
      var f = fileInput.files && fileInput.files[0];
      data = ''; prev.hidden = true;
      if (!f) return;
      if (!/^image\//.test(f.type)) { say('Choose an image file (a screenshot or photo).'); fileInput.value = ''; return; }
      var fr = new FileReader();
      fr.onload = function () {
        var im = new Image();
        im.onload = function () {
          var sc = Math.min(1, 1280 / Math.max(im.width, im.height)), c = document.createElement('canvas');
          c.width = Math.round(im.width * sc); c.height = Math.round(im.height * sc);
          var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height);
          data = c.toDataURL('image/jpeg', 0.72);
          prev.src = data; prev.hidden = false; say('Screenshot added.');
        };
        im.onerror = function () { say('This image could not be read. Try another screenshot.'); fileInput.value = ''; };
        im.src = fr.result;
      };
      fr.readAsDataURL(f);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var order = $('#pf-order').value.trim(), name = $('#pf-name').value.trim(), phone = $('#pf-phone').value.trim();
      if (!order || !name || !phone) { say('Enter your order number, name and phone.'); return; }
      if (!data) { say('Add your payment screenshot first.'); return; }
      var btn = $('button[type=submit]', form); btn.disabled = true; say('Sending your screenshot...');
      var body = { name: name, phone: phone, city: '', address: '', payment: 'Screenshot for order ' + order, advanceVia: '', total: 0, dueNow: 0, items: 'Order ' + order, screenshot: data };
      fetch(form.getAttribute('data-endpoint'), { method: 'POST', mode: 'no-cors', body: JSON.stringify(body) }).then(function () {
        say('Screenshot sent. We confirm your order once we check the payment.');
        form.reset(); prev.hidden = true; data = ''; btn.disabled = false;
      }, function () {
        say('The screenshot could not be sent. Check your internet and try again.'); btn.disabled = false;
      });
    });
  }
})();
