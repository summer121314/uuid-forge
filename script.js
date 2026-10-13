(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const els = { quantity: $('quantity'), uppercase: $('uppercase'), hyphens: $('hyphens'), results: $('results'), count: $('count'), validation: $('validation'), validationStatus: $('validation-status') };
  let uuids = [];
  function secureUuid() {
    if (!window.crypto || !window.crypto.getRandomValues) throw new Error('Secure randomness is unavailable. Please open this site over HTTPS or localhost.');
    if (typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    const b = new Uint8Array(16); crypto.getRandomValues(b); b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    const h = Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
  }
  function format(id) { let s = els.hyphens.checked ? id : id.replaceAll('-', ''); return els.uppercase.checked ? s.toUpperCase() : s; }
  let toastTimeout;
  function toast(message) { const e = $('toast'); e.textContent = message; e.classList.add('show'); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => e.classList.remove('show'), 2400); }
  function render() {
    els.results.replaceChildren(); const fragment = document.createDocumentFragment();
    uuids.forEach((id, i) => {
      const row = document.createElement('div'); row.className = 'result';
      const idx = document.createElement('span'); idx.className = 'index'; idx.textContent = String(i + 1).padStart(2, '0');
      const code = document.createElement('code'); code.className = 'uuid'; code.textContent = format(id);
      const btn = document.createElement('button'); btn.className = 'copy'; btn.textContent = '⧉ Copy'; btn.setAttribute('aria-label', `Copy UUID ${i + 1}`);
      btn.addEventListener('click', () => copyText(format(id)));
      row.append(idx, code, btn); fragment.appendChild(row);
    });
    els.results.appendChild(fragment); els.count.textContent = `${uuids.length} ID${uuids.length === 1 ? '' : 's'}`;
  }
  function generate() {
    let n = Number(els.quantity.value);
    if (!Number.isInteger(n) || n < 1 || n > 1000) { toast('Enter a whole number from 1 to 1,000'); els.quantity.focus(); return; }
    try { uuids = Array.from({ length: n }, secureUuid); render(); toast(`${n} UUID${n === 1 ? '' : 's'} generated`); } catch (error) { toast(error.message); }
  }
  async function copyText(str) {
    try { await navigator.clipboard.writeText(str); toast('Copied to clipboard'); }
    catch { toast('Clipboard unavailable — please select and copy manually'); }
  }
  $('generate').addEventListener('click', generate);
  els.uppercase.addEventListener('change', render); els.hyphens.addEventListener('change', render);
  $('copy-all').addEventListener('click', () => { if (uuids.length) copyText(uuids.map(format).join('\n')); });
  $('download').addEventListener('click', () => {
    if (!uuids.length) return;
    const blob = new Blob([uuids.map(format).join('\n') + '\n'], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'uuid-forge.txt'; a.click(); URL.revokeObjectURL(url);
  });
  els.validation.addEventListener('input', () => {
    const value = els.validation.value.trim();
    const status = els.validationStatus;
    if (!value) { status.textContent = 'Enter a UUID to check'; status.style.color = ''; return; }
    const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
    status.textContent = valid ? `✓ Valid UUID (version ${value[14]})` : '✕ Not a valid standard UUID';
    status.style.color = valid ? '#7bf0c6' : '#ff9da1';
  });
  $('year').textContent = new Date().getFullYear();
  generate();
})();
