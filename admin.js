/* ==================== CONFIG ==================== */
var FIREBASE_CONFIG = {
  apiKey: "AIzaSyB63hKXEZGsIiibm5cxt7NCAsk4VG3Rgs8",
  authDomain: "mikostrem-app.firebaseapp.com",
  projectId: "mikostrem-app",
  storageBucket: "mikostrem-app.firebasestorage.app",
  messagingSenderId: "899585533522",
  appId: "1:899585533522:web:085604f2d9f8e2a836218b",
  measurementId: "G-T9YJM77T3R"
};
var ADMIN_PASSWORD = "P";
var VERIFIED_ICON_URL = "https://cdn.phototourl.com/member/2026-09-27-ed3d428a-b1fc-4bdd-9949-5896ceacb079.png";

/* ==================== UPLOAD CONFIG ==================== */
var UPLOAD_API = "https://video.animekuu.web.id";
var UPLOAD_APIS = [
  "https://video.animekuu.web.id",
  "https://cdn.animekuu.web.id",
  "https://media.animekuu.web.id"
];

/* ==================== RESOLUSI ==================== */
var RESOLUTIONS = ["360p", "480p", "720p", "1080p"];
var RES_KEY_MAP = {
  "360p": "videoUrl360",
  "480p": "videoUrl480",
  "720p": "videoUrl720",
  "1080p": "videoUrl1080"
};

/* ==================== CUSTOM POPUP SYSTEM ==================== */
function buildPopupOverlay() {
  var existing = document.getElementById("custom-popup-overlay");
  if (existing) return existing;
  var el = document.createElement("div");
  el.id = "custom-popup-overlay";
  el.className = "custom-popup-overlay";
  el.innerHTML =
    '<div class="custom-popup-backdrop"></div>' +
    '<div class="custom-popup-box" id="custom-popup-box"></div>';
  document.body.appendChild(el);
  return el;
}

function showCustomPopup(opts) {
  return new Promise(function(resolve) {
    opts = opts || {};
    var type = opts.type || "alert";
    var title = opts.title || "";
    var message = opts.message || "";
    var okText = opts.okText || "OK";
    var cancelText = opts.cancelText || "Batal";
    var danger = opts.danger === true;
    var inputPlaceholder = opts.inputPlaceholder || "";
    var inputDefault = opts.inputDefault || "";
    var inputType = opts.inputType || "text";

    var overlay = buildPopupOverlay();
    var box = document.getElementById("custom-popup-box");

    var iconHTML = "";
    if (type === "alert") {
      iconHTML = danger
        ? '<div class="popup-icon popup-icon-danger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>'
        : '<div class="popup-icon popup-icon-info"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div>';
    } else if (type === "confirm") {
      iconHTML = danger
        ? '<div class="popup-icon popup-icon-danger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></div>'
        : '<div class="popup-icon popup-icon-warn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>';
    } else if (type === "prompt") {
      iconHTML = '<div class="popup-icon popup-icon-edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></div>';
    }

    var inputHTML = "";
    if (type === "prompt") {
      inputHTML = '<input type="' + inputType + '" class="popup-input" id="popup-input-field" placeholder="' + escapeHtmlAttr(inputPlaceholder) + '" value="' + escapeHtmlAttr(inputDefault) + '">';
    }

    var actionsHTML = "";
    if (type === "alert") {
      actionsHTML = '<button class="popup-btn popup-btn-primary" id="popup-ok">' + escapeHtmlAttr(okText) + '</button>';
    } else if (type === "confirm") {
      actionsHTML =
        '<button class="popup-btn popup-btn-secondary" id="popup-cancel">' + escapeHtmlAttr(cancelText) + '</button>' +
        '<button class="popup-btn ' + (danger ? 'popup-btn-danger' : 'popup-btn-primary') + '" id="popup-ok">' + escapeHtmlAttr(okText) + '</button>';
    } else if (type === "prompt") {
      actionsHTML =
        '<button class="popup-btn popup-btn-secondary" id="popup-cancel">' + escapeHtmlAttr(cancelText) + '</button>' +
        '<button class="popup-btn popup-btn-primary" id="popup-ok">' + escapeHtmlAttr(okText) + '</button>';
    }

    box.innerHTML =
      (iconHTML ? '<div class="popup-icon-wrap">' + iconHTML + '</div>' : "") +
      (title ? '<div class="popup-title">' + escapeHtmlAdmin(title) + '</div>' : "") +
      (message ? '<div class="popup-message">' + escapeHtmlAdmin(message) + '</div>' : "") +
      inputHTML +
      '<div class="popup-actions">' + actionsHTML + '</div>';

    setTimeout(function() { overlay.classList.add("show"); }, 10);

    var cleanup = function() {
      overlay.classList.remove("show");
      setTimeout(function() {
        if (!overlay.classList.contains("show")) {
          box.innerHTML = "";
        }
      }, 250);
    };

    var confirmResolve = function(val) {
      cleanup();
      resolve(val);
    };

    if (type === "prompt") {
      setTimeout(function() {
        var input = document.getElementById("popup-input-field");
        if (input) { input.focus(); input.select(); }
      }, 150);
    } else {
      setTimeout(function() {
        var okBtn = document.getElementById("popup-ok");
        if (okBtn) okBtn.focus();
      }, 150);
    }

    var okBtn = document.getElementById("popup-ok");
    var cancelBtn = document.getElementById("popup-cancel");

    if (okBtn) {
      okBtn.onclick = function() {
        if (type === "prompt") {
          var input = document.getElementById("popup-input-field");
          confirmResolve(input ? input.value : "");
        } else {
          confirmResolve(true);
        }
      };
    }

    if (cancelBtn) {
      cancelBtn.onclick = function() {
        if (type === "prompt") confirmResolve(null);
        else confirmResolve(false);
      };
    }

    box.onkeydown = function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (okBtn) okBtn.click();
      } else if (e.key === "Escape") {
        e.preventDefault();
        if (cancelBtn) cancelBtn.click();
        else { cleanup(); resolve(true); }
      }
    };

    var backdrop = overlay.querySelector(".custom-popup-backdrop");
    if (backdrop) {
      backdrop.onclick = function() {
        if (type === "alert") confirmResolve(true);
        else if (type === "prompt") confirmResolve(null);
        else confirmResolve(false);
      };
    }
  });
}

function showAlert(message, title, opts) {
  opts = opts || {};
  return showCustomPopup({
    type: "alert", title: title || "", message: message,
    okText: opts.okText || "OK", danger: opts.danger === true
  });
}
function showConfirm(message, title, opts) {
  opts = opts || {};
  return showCustomPopup({
    type: "confirm", title: title || "Konfirmasi", message: message,
    okText: opts.okText || "Ya, Lanjut", cancelText: opts.cancelText || "Batal",
    danger: opts.danger === true
  });
}
function showPrompt(message, defaultValue, title, opts) {
  opts = opts || {};
  return showCustomPopup({
    type: "prompt", title: title || "Input", message: message,
    inputDefault: defaultValue || "", inputPlaceholder: opts.placeholder || "",
    inputType: opts.inputType || "text",
    okText: opts.okText || "Simpan", cancelText: opts.cancelText || "Batal"
  });
}

/* ==================== CUSTOM SELECT COMPONENT ==================== */
var __openCustomSelect = null;

function renderCustomSelect(id, options, selectedValue, onChangeFn) {
  var selectedOpt = options.find(function(o) { return o.value === selectedValue; }) || options[0];
  if (!selectedOpt) return "";

  var optionsHTML = options.map(function(o) {
    var isSelected = o.value === selectedValue;
    return '<div class="custom-select-option ' + (isSelected ? 'selected' : '') + '" data-value="' + escapeHtmlAttr(o.value) + '" onclick="event.stopPropagation(); pickCustomSelect(\'' + id + '\', \'' + escapeHtmlAttr(o.value) + '\', \'' + (onChangeFn || '') + '\')">' +
      '<span>' + escapeHtmlAdmin(o.label) + '</span>' +
      '<span class="custom-select-option-check"></span>' +
      '</div>';
  }).join("");

  return '<div class="custom-select" id="' + id + '" data-value="' + escapeHtmlAttr(selectedValue) + '">' +
    '<button type="button" class="custom-select-trigger" onclick="event.stopPropagation(); toggleCustomSelect(\'' + id + '\')">' +
    '<span class="custom-select-value">' + escapeHtmlAdmin(selectedOpt.label) + '</span>' +
    '<svg viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>' +
    '</button>' +
    '<div class="custom-select-dropdown">' + optionsHTML + '</div>' +
    '</div>';
}

function toggleCustomSelect(id) {
  var el = document.getElementById(id);
  if (!el) return;

  if (__openCustomSelect && __openCustomSelect !== id) {
    var old = document.getElementById(__openCustomSelect);
    if (old) old.classList.remove("open");
  }

  var isOpen = el.classList.contains("open");
  if (isOpen) {
    el.classList.remove("open");
    __openCustomSelect = null;
  } else {
    el.classList.add("open");
    __openCustomSelect = id;
  }
}

function pickCustomSelect(id, value, onChangeFn) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("open");
  __openCustomSelect = null;

  var prevValue = el.dataset.value || "";
  if (prevValue === value) return;

  el.dataset.value = value;

  var valEl = el.querySelector(".custom-select-value");
  if (valEl) {
    var optEl = el.querySelector('.custom-select-option[data-value="' + value + '"]');
    if (optEl) valEl.textContent = optEl.querySelector("span").textContent;
  }

  el.querySelectorAll(".custom-select-option").forEach(function(o) {
    o.classList.toggle("selected", o.dataset.value === value);
  });

  if (onChangeFn && typeof window[onChangeFn] === "function") {
    window[onChangeFn](value);
  }
}

document.addEventListener("click", function(e) {
  if (!e.target.closest(".custom-select")) {
    if (__openCustomSelect) {
      var el = document.getElementById(__openCustomSelect);
      if (el) el.classList.remove("open");
      __openCustomSelect = null;
    }
  }
});

function makeOptions(pairs) {
  return pairs.map(function(p) {
    if (Array.isArray(p)) return { value: p[0], label: p[1] };
    return { value: p, label: p };
  });
}

/* ==================== FIREBASE INIT ==================== */
var db = null;
var auth = null;
var firebaseReady = false;

function initFirebase() {
  try {
    if (firebase.apps.length === 0) firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
    auth = firebase.auth();
    firebaseReady = true;
    console.log("Firebase siap");
    return true;
  } catch (e) {
    console.error("Firebase error:", e);
    return false;
  }
}
initFirebase();

/* ==================== FIRESTORE CRUD ==================== */
async function fbGetAll(col) {
  if (!firebaseReady) return [];
  try {
    var snap = await db.collection(col).get();
    var data = [];
    snap.forEach(function(d) { data.push(Object.assign({ id: d.id }, d.data())); });
    return data;
  } catch (e) { console.error("Gagal ambil " + col + ":", e); return []; }
}
async function fbGetOne(col, id) {
  if (!firebaseReady) return null;
  try {
    var doc = await db.collection(col).doc(id).get();
    return doc.exists ? Object.assign({ id: doc.id }, doc.data()) : null;
  } catch (e) { console.error(e); return null; }
}
async function fbGetOneSub(p, pdoc, sub, id) {
  if (!firebaseReady) return null;
  try {
    var doc = await db.collection(p).doc(pdoc).collection(sub).doc(id).get();
    return doc.exists ? Object.assign({ id: doc.id }, doc.data()) : null;
  } catch (e) { console.error(e); return null; }
}
async function fbSet(col, id, data, merge) {
  if (!firebaseReady) return false;
  try {
    await db.collection(col).doc(id).set(data, { merge: merge || false });
    return true;
  } catch (e) { console.error(e); return false; }
}
async function fbSetSub(p, pdoc, sub, id, data, merge) {
  if (!firebaseReady) return false;
  try {
    await db.collection(p).doc(pdoc).collection(sub).doc(id).set(data, { merge: merge || false });
    return true;
  } catch (e) { console.error(e); return false; }
}
async function fbUpdate(col, id, data) {
  if (!firebaseReady) return false;
  try { await db.collection(col).doc(id).update(data); return true; }
  catch (e) { console.error(e); return false; }
}
async function fbDelete(col, id) {
  if (!firebaseReady) return false;
  try { await db.collection(col).doc(id).delete(); return true; }
  catch (e) { console.error(e); return false; }
}
async function fbDeleteSub(p, pdoc, sub, id) {
  if (!firebaseReady) return false;
  try { await db.collection(p).doc(pdoc).collection(sub).doc(id).delete(); return true; }
  catch (e) { console.error(e); return false; }
}
async function fbGetSubcollection(p, pdoc, sub) {
  if (!firebaseReady) return [];
  try {
    var snap = await db.collection(p).doc(pdoc).collection(sub).get();
    var data = [];
    snap.forEach(function(d) { data.push(Object.assign({ id: d.id }, d.data())); });
    data.sort(function(a, b) {
      var na = Number(a.id), nb = Number(b.id);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      return String(a.id).localeCompare(String(b.id));
    });
    return data;
  } catch (e) { console.error(e); return []; }
}

/* ==================== HELPER ==================== */
function calculateLevel(xp) {
  xp = Number(xp) || 0;
  if (xp <= 0) return 1;
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}
function xpForLevel(level) {
  level = Number(level) || 1;
  if (level <= 1) return 0;
  return Math.pow(level - 1, 2) * 100;
}
function xpToNextLevel(xp) {
  var cl = calculateLevel(xp);
  var nl = xpForLevel(cl + 1);
  var clx = xpForLevel(cl);
  var needed = nl - clx;
  var prog = xp - clx;
  return { needed: needed, progress: prog, percent: needed > 0 ? Math.min(100, Math.round((prog / needed) * 100)) : 0 };
}
function calculateRank(level) {
  level = Number(level) || 1;
  if (level >= 1000) return { name: "Mythic", color: "#ef4444" };
  if (level >= 500) return { name: "Legend", color: "#fbbf24" };
  if (level >= 200) return { name: "Grandmaster", color: "#f97316" };
  if (level >= 100) return { name: "Master", color: "#a855f7" };
  if (level >= 70) return { name: "Diamond", color: "#06b6d4" };
  if (level >= 40) return { name: "Platinum", color: "#10b981" };
  if (level >= 20) return { name: "Gold", color: "#fbbf24" };
  if (level >= 10) return { name: "Silver", color: "#94a3b8" };
  if (level >= 5) return { name: "Bronze", color: "#b45309" };
  return { name: "Rookie", color: "#6b7280" };
}
function formatXP(xp) {
  xp = Number(xp) || 0;
  if (xp >= 1000000) return (xp / 1000000).toFixed(1) + "M";
  if (xp >= 1000) return (xp / 1000).toFixed(1) + "K";
  return xp.toString();
}
function showToast(msg, dur) {
  dur = dur || 2000;
  var t = document.getElementById("app-toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "app-toast";
    t.className = "app-toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(function() { t.classList.remove("show"); }, dur);
}
function escapeHtmlAttr(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function(m) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
  });
}
function escapeHtmlAdmin(s) {
  return escapeHtmlAttr(s);
}

/* ==================== EXTRACT URL ==================== */
function extractUrls(text) {
  if (!text) return [];
  var urlRegex = /https?:\/\/[^\s\)\]\},;"'<>]+/gi;
  var matches = text.match(urlRegex) || [];
  var seen = {};
  var result = [];
  matches.forEach(function(u) {
    u = u.replace(/[.,;:!?]+$/, "");
    if (!seen[u]) {
      seen[u] = true;
      result.push(u);
    }
  });
  return result;
}

var icons = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  diamond: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
};

/* ==================== ADMIN STATE ==================== */
var adminCurrentTab = "anime";
var adminData = { anime: [], top: [], users: [], premium: [], pengumuman: [] };
var currentEditingId = null;

/* ==================== LOGIN ==================== */
var LOGIN_ATTEMPT_KEY = "admin_login_attempts";
var LOGIN_LOCK_KEY = "admin_login_lock_until";
var SESSION_KEY = "admin_session_expiry";
var MAX_ATTEMPTS = 5;
var LOCK_DURATION_MS = 5 * 60 * 1000;
var SESSION_DURATION_MS = 12 * 60 * 60 * 1000;

function getLoginAttempts() {
  try { return parseInt(localStorage.getItem(LOGIN_ATTEMPT_KEY) || "0") || 0; } catch (e) { return 0; }
}
function setLoginAttempts(n) {
  try { localStorage.setItem(LOGIN_ATTEMPT_KEY, String(n)); } catch (e) {}
}
function getLockUntil() {
  try { return parseInt(localStorage.getItem(LOGIN_LOCK_KEY) || "0") || 0; } catch (e) { return 0; }
}
function setLockUntil(ts) {
  try { localStorage.setItem(LOGIN_LOCK_KEY, String(ts)); } catch (e) {}
}
function isLoginLocked() { return Date.now() < getLockUntil(); }
function getRemainingLockSeconds() { return Math.ceil((getLockUntil() - Date.now()) / 1000); }
function formatLockTime(sec) {
  var m = Math.floor(sec / 60);
  var s = sec % 60;
  return m + "m " + s + "s";
}

function doLogin() {
  var err = document.getElementById("login-error");
  var btn = document.querySelector(".login-btn");
  var input = document.getElementById("login-password");

  if (isLoginLocked()) {
    err.textContent = "Terlalu banyak percobaan. Coba lagi dalam " + formatLockTime(getRemainingLockSeconds());
    return;
  }

  var pass = input.value;
  if (pass === ADMIN_PASSWORD) {
    setLoginAttempts(0);
    setLockUntil(0);
    localStorage.setItem("admin_logged_in", "true");
    localStorage.setItem(SESSION_KEY, String(Date.now() + SESSION_DURATION_MS));
    showAdmin();
  } else {
    var attempts = getLoginAttempts() + 1;
    setLoginAttempts(attempts);

    if (attempts >= MAX_ATTEMPTS) {
      setLockUntil(Date.now() + LOCK_DURATION_MS);
      err.textContent = "Terlalu banyak percobaan! Terkunci " + formatLockTime(LOCK_DURATION_MS / 1000);
      input.value = "";
      input.disabled = true;
      if (btn) btn.disabled = true;
      var tick = setInterval(function() {
        var rem = getRemainingLockSeconds();
        if (rem <= 0) {
          clearInterval(tick);
          input.disabled = false;
          if (btn) btn.disabled = false;
          err.textContent = "";
          setLoginAttempts(0);
        } else {
          err.textContent = "Terkunci " + formatLockTime(rem);
        }
      }, 1000);
    } else {
      err.textContent = "Password salah! Sisa percobaan: " + (MAX_ATTEMPTS - attempts);
      input.value = "";
      input.focus();
    }
  }
}

async function doLogout() {
  var ok = await showConfirm("Yakin mau logout dari panel admin?", "Logout", { okText: "Ya, Logout", danger: true });
  if (!ok) return;
  localStorage.removeItem("admin_logged_in");
  localStorage.removeItem(SESSION_KEY);
  location.reload();
}

function isSessionValid() {
  if (localStorage.getItem("admin_logged_in") !== "true") return false;
  var expiry = parseInt(localStorage.getItem(SESSION_KEY) || "0") || 0;
  if (expiry > 0 && Date.now() > expiry) {
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem(SESSION_KEY);
    return false;
  }
  return true;
}

function showAdmin() {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("admin-screen").style.display = "block";
  loadAllAdmin();
}

function checkLogin() {
  if (isSessionValid()) showAdmin();
  else document.getElementById("login-screen").style.display = "flex";
}

function openUserApp() { window.open("../index.html", "_blank"); }

/* ==================== UPLOAD FILE (FIXED) ==================== */
async function uploadFileChange(fileInput, hiddenInputId, previewImgId) {
  var file = fileInput.files && fileInput.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showToast("File harus gambar");
    fileInput.value = "";
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast("Max 10MB");
    fileInput.value = "";
    return;
  }

  // ============ DETEKSI TYPE DARI ID ============
  var uploadType = "poster";
  if (hiddenInputId === "f-banner") uploadType = "banner";
  else if (hiddenInputId === "f-cover") uploadType = "poster";
  // =============================================

  var reader = new FileReader();
  reader.onload = function(e) {
    var preview = document.getElementById(previewImgId);
    var empty = document.getElementById(previewImgId + "-empty");
    if (preview) { preview.src = e.target.result; preview.style.display = "block"; }
    if (empty) empty.style.display = "none";
  };
  reader.readAsDataURL(file);

  showToast("Mengupload " + uploadType + "...");

  var success = false;
  var finalUrl = "";
  var lastError = "";

  // Endpoint prioritas: sesuai type dulu, baru fallback ke yang lain
  var endpoints = [
    "/upload/" + uploadType,
    "/upload/avatar",
    "/upload/banner"
  ];

  // Dedupe endpoints
  endpoints = endpoints.filter(function(v, i, arr) { return arr.indexOf(v) === i; });

  for (var i = 0; i < UPLOAD_APIS.length && !success; i++) {
    for (var e = 0; e < endpoints.length && !success; e++) {
      var apiBase = UPLOAD_APIS[i];
      var endpoint = apiBase + endpoints[e];

      try {
        var fd = new FormData();
        fd.append("file", file);
        fd.append("type", uploadType);   // ← INI YANG FIX

        var res = await fetch(endpoint, { method: "POST", body: fd });
        var data = await res.json();

        if (data.success === true && data.url) {
          success = true;
          finalUrl = data.url;
          console.log("✅ Upload OK:", endpoint, "type:", uploadType, "→", finalUrl);
        } else {
          lastError = data.error || "Response tidak valid";
          console.warn("❌ Gagal:", endpoint, "type:", uploadType, "→", lastError);
        }
      } catch (err) {
        lastError = err.message;
        console.warn("❌ Error:", endpoint, "type:", uploadType, "→", lastError);
      }
    }
  }

  if (success) {
    document.getElementById(hiddenInputId).value = finalUrl;
    document.getElementById(previewImgId).src = finalUrl;
    document.getElementById(previewImgId).style.display = "block";
    var empty = document.getElementById(previewImgId + "-empty");
    if (empty) empty.style.display = "none";

    var stat = document.getElementById("stat-cover");
    if (stat && hiddenInputId === "f-cover") stat.textContent = "Sudah ada";

    showToast("✅ " + uploadType + " berhasil!");
  } else {
    showToast("❌ Gagal upload " + uploadType + ": " + (lastError || "Semua API gagal"));

    var hidden = document.getElementById(hiddenInputId);
    var oldUrl = hidden ? hidden.value : "";
    var preview = document.getElementById(previewImgId);
    var emptyEl = document.getElementById(previewImgId + "-empty");
    if (preview) {
      preview.src = oldUrl;
      preview.style.display = oldUrl ? "block" : "none";
    }
    if (emptyEl) emptyEl.style.display = oldUrl ? "none" : "block";

    fileInput.value = "";
  }
}

/* ==================== LOAD ALL ==================== */
async function loadAllAdmin() {
  showToast("Memuat data...");
  try {
    var results = await Promise.all([
      fbGetAll("anime"),
      fbGetAll("top"),
      fbGetAll("users"),
      fbGetAll("premium_plans"),
      fbGetAll("notifications")
    ]);
    var anime = results[0] || [], top = results[1] || [], users = results[2] || [], premium = results[3] || [], pengumuman = results[4] || [];
    console.log("Loaded:", { anime: anime.length, top: top.length, users: users.length, premium: premium.length, pengumuman: pengumuman.length });

    adminData.anime = anime.map(function(a) {
      return {
        id: a.id, slug: a.slug || a.id, title: a.title || a.judul || "-",
        cover: a.cover || a.sampul || "", banner: a.banner || a.spanduk || "",
        rating: a.rating || a.peringkat || 0, studio: a.studio || "",
        type: a.type || a.tipe || "TV", totalEpisodes: a.totalEpisodes || a.jumlah_episode || 0,
        views: a.views || a.pandangan || 0, year: a.year || a.tahun || 0,
        genres: a.genres || a.genre || [], synopsis: a.synopsis || a.sinopsis || "",
        status: a.status || "ongoing", updateDay: a.updateDay || a["hari update"] || "Senin",
        updateTime: a.updateTime || a["waktu update"] || "",
        completed: a.completed === true, isNew: a.isNew !== false
      };
    });

    adminData.top = top;

    adminData.users = users.map(function(u) {
      var xp = u.xp || 0;
      var level = u.level || calculateLevel(xp);
      var rank = calculateRank(level);
      return {
        id: u.id, userId: u.userId || u["user id"] || "#?",
        username: u.username || u.nama || "-", avatar: u.avatar || u.foto || "",
        xp: xp, level: level, rank: rank.name, rankColor: rank.color,
        followers: u.followers || 0, watchMinutes: u.watchMinutes || 0,
        comments: u.comments || 0, historyCount: u.historyCount || 0,
        joinedMonths: u.joinedMonths || 1, badges: u.badges || u.lencana || [],
        isDefault: u.isDefault || false, verified: u.verified || "",
        isPremium: u.isPremium === true,
        isAdmin: u.isAdmin === true,
        isBanned: u.isBanned === true
      };
    });
    adminData.users.sort(function(a, b) {
      var na = parseInt(String(a.userId).replace("#", "")) || 999999;
      var nb = parseInt(String(b.userId).replace("#", "")) || 999999;
      return na - nb;
    });

    adminData.premium = premium;
    adminData.pengumuman = pengumuman;
  } catch (e) {
    console.error(e);
    showToast("Gagal memuat data");
  }
  renderAdminTab();
}

/* ==================== TAB ==================== */
function switchAdminTab(tab) {
  adminCurrentTab = tab;
  document.querySelectorAll(".admin-tab").forEach(function(t) { t.classList.toggle("active", t.dataset.tab === tab); });
  renderAdminTab();
}
function renderAdminTab() {
  var c = document.getElementById("admin-content");
  if (!c) return;
  if (adminCurrentTab === "anime") renderAnimeList(c);
  else if (adminCurrentTab === "episode") renderEpisodeList(c);
  else if (adminCurrentTab === "top") renderTopList(c);
  else if (adminCurrentTab === "users") renderUsersList(c);
  else if (adminCurrentTab === "premium") renderPremiumList(c);
  else if (adminCurrentTab === "pengumuman") renderPengumumanList(c);
}

/* ==================== ANIME ==================== */
function renderAnimeList(container) {
  container.innerHTML =
    '<div class="admin-toolbar">' +
    '<input class="admin-search" id="anime-search" placeholder="Cari anime..." oninput="filterAnimeList(this.value)">' +
    '<button class="admin-add-btn" onclick="openFormAnime()">' + icons.plus + ' Tambah</button>' +
    '</div>' +
    '<div class="admin-list" id="anime-list">' +
    (adminData.anime.length === 0 ? '<div class="admin-empty">Belum ada anime</div>' : adminData.anime.map(animeAdminItemHTML).join("")) +
    '</div>';
}
function animeAdminItemHTML(a) {
  var badges = [];
  if (a.completed) badges.push('<span style="color:var(--success);">COMPLETED</span>');
  if (!a.isNew) badges.push('<span style="color:var(--text-mute);">NO-NEW</span>');
  var b = badges.length > 0 ? " | " + badges.join(" | ") : "";
  return '<div class="admin-item" data-search="' + escapeHtmlAttr((a.title || "").toLowerCase()) + '">' +
    '<div class="admin-item-thumb"><img src="' + escapeHtmlAttr(a.cover || '') + '" alt=""></div>' +
    '<div class="admin-item-body">' +
    '<div class="admin-item-title">' + escapeHtmlAdmin(a.title || "Tanpa judul") + '</div>' +
    '<div class="admin-item-sub">' + escapeHtmlAdmin(a.slug || "-") + ' | ' + (a.totalEpisodes || 0) + ' eps | ' + (a.rating || 0) + b + '</div>' +
    '</div>' +
    '<div class="admin-item-actions">' +
    '<button class="admin-action-btn edit" onclick="openFormAnime(\'' + a.id + '\')">' + icons.edit + '</button>' +
    '<button class="admin-action-btn delete" onclick="deleteAnime(\'' + a.id + '\')">' + icons.trash + '</button>' +
    '</div></div>';
}
function filterAnimeList(q) {
  q = q.toLowerCase();
  document.querySelectorAll("#anime-list .admin-item").forEach(function(el) {
    el.style.display = el.dataset.search.indexOf(q) > -1 ? "flex" : "none";
  });
}

function openFormAnime(id) {
  currentEditingId = id || null;
  var a = id ? adminData.anime.find(function(x) { return x.id === id; }) : { isNew: true, completed: false };
  var coverUrl = a.cover || "";
  var bannerUrl = a.banner || "";

  document.getElementById("modal-title").textContent = id ? "Edit Anime" : "Tambah Anime";
  document.getElementById("modal-body").innerHTML =
    '<div class="form-group"><label class="form-label">Judul *</label><input class="form-input" id="f-title" value="' + escapeHtmlAttr(a.title || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Slug</label><input class="form-input" id="f-slug" value="' + escapeHtmlAttr(a.slug || '') + '"></div>' +

    '<div class="form-group">' +
    '<label class="form-label">Cover / Poster</label>' +
    '<input type="hidden" id="f-cover" value="' + escapeHtmlAttr(coverUrl) + '">' +
    '<div style="display:flex;gap:10px;align-items:center;">' +
    '<div style="flex:0 0 90px;width:90px;aspect-ratio:2/3;background:#1c1c2b;border:1px solid #26263a;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;">' +
    '<img id="prev-cover" src="' + escapeHtmlAttr(coverUrl) + '" style="width:100%;height:100%;object-fit:cover;display:' + (coverUrl ? "block" : "none") + ';">' +
    '<span id="prev-cover-empty" style="font-size:10px;color:#6b6b85;display:' + (coverUrl ? "none" : "block") + ';">Kosong</span>' +
    '</div>' +
    '<div style="flex:1;display:flex;flex-direction:column;gap:6px;">' +
    '<button type="button" onclick="document.getElementById(\'file-cover\').click();" style="padding:12px;background:#1c1c2b;border:1px solid #26263a;border-radius:10px;color:#fff;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;">Pilih Gambar</button>' +
    '<div id="stat-cover" style="font-size:10px;color:#6b6b85;text-align:center;">' + (coverUrl ? "Sudah ada" : "Belum ada") + '</div>' +
    '</div>' +
    '</div>' +
    '<input type="file" id="file-cover" accept="image/*" style="display:none;" onchange="uploadFileChange(this, \'f-cover\', \'prev-cover\')">' +
    '</div>' +

    '<div class="form-group">' +
    '<label class="form-label">Banner</label>' +
    '<input type="hidden" id="f-banner" value="' + escapeHtmlAttr(bannerUrl) + '">' +
    '<div style="width:100%;aspect-ratio:16/9;background:#1c1c2b;border:1px solid #26263a;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">' +
    '<img id="prev-banner" src="' + escapeHtmlAttr(bannerUrl) + '" style="width:100%;height:100%;object-fit:cover;display:' + (bannerUrl ? "block" : "none") + ';">' +
    '<span id="prev-banner-empty" style="font-size:11px;color:#6b6b85;display:' + (bannerUrl ? "none" : "block") + ';">Belum ada banner</span>' +
    '</div>' +
    '<button type="button" onclick="document.getElementById(\'file-banner\').click();" style="width:100%;padding:12px;background:#1c1c2b;border:1px solid #26263a;border-radius:10px;color:#fff;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;">Pilih Banner</button>' +
    '<input type="file" id="file-banner" accept="image/*" style="display:none;" onchange="uploadFileChange(this, \'f-banner\', \'prev-banner\')">' +
    '</div>' +

    '<div class="form-group"><label class="form-label">Rating</label><input class="form-input" id="f-rating" type="number" step="0.1" value="' + (a.rating || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Studio</label><input class="form-input" id="f-studio" value="' + escapeHtmlAttr(a.studio || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Tipe</label>' +
    renderCustomSelect("f-type", makeOptions(["TV", "Movie", "OVA", "ONA"]), a.type || "TV", "") +
    '</div>' +
    '<div class="form-group"><label class="form-label">Total Episode</label><input class="form-input" id="f-totalEpisodes" type="number" value="' + (a.totalEpisodes || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Views</label><input class="form-input" id="f-views" type="number" value="' + (a.views || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Tahun</label><input class="form-input" id="f-year" type="number" value="' + (a.year || 2026) + '"></div>' +
    '<div class="form-group"><label class="form-label">Genre (pisah koma)</label><input class="form-input" id="f-genres" value="' + escapeHtmlAttr((a.genres || []).join(', ')) + '"></div>' +
    '<div class="form-group"><label class="form-label">Sinopsis</label><textarea class="form-textarea" id="f-synopsis">' + escapeHtmlAttr(a.synopsis || '') + '</textarea></div>' +
    '<div class="form-group"><label class="form-label">Status</label>' +
    renderCustomSelect("f-status", makeOptions([["ongoing", "Ongoing"], ["completed", "Completed"], ["upcoming", "Upcoming"]]), a.status || "ongoing", "") +
    '</div>' +
    '<div class="form-group"><label class="form-label">Hari Update</label>' +
    renderCustomSelect("f-updateDay", makeOptions(["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"]), a.updateDay || "Senin", "") +
    '</div>' +
    '<div class="form-group"><label class="form-label">Waktu Update</label><input class="form-input" id="f-updateTime" value="' + escapeHtmlAttr(a.updateTime || '') + '"></div>' +
    '<div class="admin-toggle-row"><div class="admin-toggle-info"><div class="admin-toggle-title">Completed</div><div class="admin-toggle-desc">Kalau ON, anime hilang dari jadwal tayang</div></div><div class="admin-toggle ' + (a.completed ? 'on' : '') + '" id="f-completed" onclick="toggleAdminField(\'f-completed\')"><span class="admin-toggle-text">' + (a.completed ? 'ON' : 'OFF') + '</span><div class="admin-toggle-switch"></div></div></div>' +
    '<div class="admin-toggle-row"><div class="admin-toggle-info"><div class="admin-toggle-title">Badge NEW</div><div class="admin-toggle-desc">Kalau ON, badge NEW muncul di card anime</div></div><div class="admin-toggle ' + (a.isNew ? 'on' : '') + '" id="f-isNew" onclick="toggleAdminField(\'f-isNew\')"><span class="admin-toggle-text">' + (a.isNew ? 'ON' : 'OFF') + '</span><div class="admin-toggle-switch"></div></div></div>' +
    '<div class="form-actions"><button class="form-btn form-btn-cancel" onclick="closeModal()">Batal</button><button class="form-btn form-btn-save" onclick="saveAnime()">Simpan</button></div>';

  openModal();
}

function toggleAdminField(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var isOn = el.classList.contains("on");
  el.classList.toggle("on", !isOn);
  var text = el.querySelector(".admin-toggle-text");
  if (text) text.textContent = !isOn ? "ON" : "OFF";
}

async function saveAnime() {
  var title = document.getElementById("f-title").value.trim();
  if (!title) { showToast("Judul wajib diisi"); return; }
  var slug = document.getElementById("f-slug").value.trim();
  if (!slug) slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  var completedEl = document.getElementById("f-completed");
  var isNewEl = document.getElementById("f-isNew");
  var completed = completedEl ? completedEl.classList.contains("on") : false;
  var isNew = isNewEl ? isNewEl.classList.contains("on") : true;
  var data = {
    slug: slug, title: title,
    cover: document.getElementById("f-cover").value.trim(),
    banner: document.getElementById("f-banner").value.trim(),
    rating: Number(document.getElementById("f-rating").value) || 0,
    studio: document.getElementById("f-studio").value.trim(),
    type: document.getElementById("f-type").dataset.value || "TV",
    totalEpisodes: Number(document.getElementById("f-totalEpisodes").value) || 0,
    views: Number(document.getElementById("f-views").value) || 0,
    year: Number(document.getElementById("f-year").value) || 2026,
    genres: document.getElementById("f-genres").value.split(",").map(function(g) { return g.trim(); }).filter(Boolean),
    synopsis: document.getElementById("f-synopsis").value.trim(),
    status: document.getElementById("f-status").dataset.value || "ongoing",
    updateDay: document.getElementById("f-updateDay").dataset.value || "Senin",
    updateTime: document.getElementById("f-updateTime").value.trim(),
    completed: completed, isNew: isNew
  };
  showToast("Menyimpan...");
  var ok;
  if (currentEditingId) ok = await fbUpdate("anime", currentEditingId, data);
  else {
    var existing = await fbGetOne("anime", slug);
    if (existing) { showToast("Slug sudah dipakai"); return; }
    ok = await fbSet("anime", slug, data);
  }
  if (ok) { showToast(currentEditingId ? "Anime diperbarui" : "Anime disimpan"); closeModal(); await loadAllAdmin(); }
  else showToast("Gagal menyimpan");
}
async function deleteAnime(id) {
  var ok = await showConfirm("Yakin mau hapus anime ini? Semua episode juga bakal hilang.", "Hapus Anime", { okText: "Ya, Hapus", danger: true });
  if (!ok) return;
  var res = await fbDelete("anime", id);
  if (res) { showToast("Anime dihapus"); await loadAllAdmin(); }
  else showToast("Gagal hapus");
}

/* ==================== EPISODE ==================== */
var currentEpisodeAnime = null;
var currentEpisodeDraft = {};
var batchTextareaValue = "";
var batchSelectedRes = "720p";
var expandedEpisodes = {};

function renderEpisodeList(container) {
  container.innerHTML =
    '<div class="admin-toolbar">' +
    '<button class="admin-search admin-search-trigger" onclick="openAnimePicker()">' +
    '<span class="admin-search-icon">' + icons.search + '</span>' +
    '<span class="admin-search-label">' + (currentEpisodeAnime ? escapeHtmlAdmin((adminData.anime.find(function(a){return a.id===currentEpisodeAnime;}) || {}).title || 'Pilih anime...') : 'Pilih anime...') + '</span>' +
    '<span class="admin-search-caret">▾</span>' +
    '</button>' +
    '<button class="admin-add-btn" onclick="openBulkAddColumn()">' + icons.plus + ' Kolom</button>' +
    '</div>' +
    (currentEpisodeAnime ? renderBatchPasteSection() : "") +
    '<div id="ep-editor-wrap">' +
    (currentEpisodeAnime ? renderEpisodeEditor() : '<div class="admin-empty">Pilih anime dulu buat isi episode</div>') +
    '</div>';
}

function renderBatchPasteSection() {
  var urls = extractUrls(batchTextareaValue);

  return '<div class="batch-paste-section">' +
    '<div class="batch-paste-header">' +
    '<div class="batch-paste-title">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' +
    '<span>Batch Paste</span>' +
    '</div>' +
    '<div class="batch-paste-count" id="batch-counter">' + urls.length + ' link</div>' +
    '</div>' +
    '<div class="batch-paste-row">' +
    '<label class="batch-paste-res-label">Resolusi:</label>' +
    renderCustomSelect("batch-res-select", makeOptions(RESOLUTIONS), batchSelectedRes, "onBatchResChange") +
    '</div>' +
    '<div class="batch-paste-sub">Paste link untuk resolusi <b>' + batchSelectedRes + '</b>. Bisa dari Telegram/WA juga.</div>' +
    '<textarea class="batch-paste-textarea" id="batch-input" placeholder="URL&#10;URL&#10;URL&#10;..." oninput="onBatchInput(this.value)" spellcheck="false" autocorrect="off" autocapitalize="off">' + escapeHtmlAttr(batchTextareaValue) + '</textarea>' +
    '<button class="batch-paste-apply-btn" onclick="applyBatchInput()">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>' +
    ' Terapkan ke Kolom (' + batchSelectedRes + ')' +
    '</button>' +
    '</div>';
}

function onBatchResChange(res) {
  batchSelectedRes = res;
  var section = document.querySelector(".batch-paste-section");
  if (section && section.parentNode) {
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = renderBatchPasteSection();
    section.parentNode.replaceChild(tempDiv.firstChild, section);
  }
}

function openAnimePicker() {
  document.getElementById("modal-title").textContent = "Pilih Anime";
  document.getElementById("modal-body").innerHTML =
    '<div class="picker-search-wrap">' +
    '<input class="picker-search-input" id="picker-search" placeholder="Cari judul anime..." oninput="filterPickerAnime(this.value)" autocomplete="off">' +
    '<button class="picker-search-clear" onclick="document.getElementById(\'picker-search\').value=\'\'; filterPickerAnime(\'\');">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
    '</button>' +
    '</div>' +
    '<div class="picker-list" id="picker-list">' + renderPickerItems("") + '</div>';
  openModal();
  setTimeout(function() { var inp = document.getElementById("picker-search"); if (inp) inp.focus(); }, 150);
}

function renderPickerItems(query) {
  var list = adminData.anime;
  if (query && query.trim()) {
    var q = query.toLowerCase();
    list = list.filter(function(a) { return (a.title || "").toLowerCase().indexOf(q) > -1; });
  }
  if (list.length === 0) return '<div class="picker-empty">Anime gak ditemukan</div>';
  return list.map(function(a) {
    var selected = a.id === currentEpisodeAnime;
    return '<div class="picker-item ' + (selected ? 'selected' : '') + '" onclick="pickAnime(\'' + escapeHtmlAttr(a.id) + '\')">' +
      '<div class="picker-item-thumb"><img src="' + escapeHtmlAttr(a.cover || '') + '" alt="" loading="lazy"></div>' +
      '<div class="picker-item-body">' +
      '<div class="picker-item-title">' + escapeHtmlAdmin(a.title || "Tanpa judul") + '</div>' +
      '<div class="picker-item-sub">' + escapeHtmlAdmin(a.slug || "-") + ' • ' + (a.totalEpisodes || 0) + ' eps</div>' +
      '</div>' +
      (selected ? '<div class="picker-item-check">✓</div>' : '') +
      '</div>';
  }).join("");
}

function filterPickerAnime(q) {
  var list = document.getElementById("picker-list");
  if (list) list.innerHTML = renderPickerItems(q);
}

function pickAnime(animeId) {
  closeModal();
  selectEpisodeAnime(animeId);
}

async function selectEpisodeAnime(animeId) {
  currentEpisodeAnime = animeId || null;
  currentEpisodeDraft = {};
  batchTextareaValue = "";
  expandedEpisodes = {};

  if (!animeId) {
    document.getElementById("ep-editor-wrap").innerHTML = '<div class="admin-empty">Pilih anime dulu</div>';
    var label = document.querySelector(".admin-search-label");
    if (label) label.textContent = "Pilih anime...";
    return;
  }

  var label = document.querySelector(".admin-search-label");
  var animeObj = adminData.anime.find(function(a) { return a.id === animeId; });
  if (label && animeObj) label.textContent = animeObj.title;

  var wrap = document.getElementById("ep-editor-wrap");
  wrap.innerHTML = '<div class="admin-empty">Memuat episode...</div>';

  var eps = await fbGetSubcollection("anime", animeId, "episode");
  var totalEp = animeObj ? (animeObj.totalEpisodes || 0) : 0;

  var maxExisting = 0;
  eps.forEach(function(e) {
    var n = Number(e.id);
    if (!isNaN(n) && n > maxExisting) maxExisting = n;
  });
  var finalMax = Math.max(maxExisting, totalEp, 12);

  var listMap = {};
  for (var i = 1; i <= finalMax; i++) {
    listMap[i] = {
      title: "", duration: 1440,
      videoUrl360: "", videoUrl480: "", videoUrl720: "", videoUrl1080: "",
      videoUrl: "",
      hasData: false
    };
  }

  eps.forEach(function(e) {
    var n = Number(e.id);
    if (isNaN(n)) return;
    var entry = {
      title: e.title || "",
      duration: e.duration || 1440,
      videoUrl360: e.videoUrl360 || "",
      videoUrl480: e.videoUrl480 || "",
      videoUrl720: e.videoUrl720 || "",
      videoUrl1080: e.videoUrl1080 || "",
      videoUrl: e.videoUrl || "",
      hasData: false
    };
    if (entry.videoUrl360 || entry.videoUrl480 || entry.videoUrl720 || entry.videoUrl1080 || entry.videoUrl) {
      entry.hasData = true;
    }
    listMap[n] = entry;
  });

  window.__epListMap = listMap;
  window.__epFinalMax = finalMax;

  renderEpisodeList(document.getElementById("admin-content"));
}

function renderEpisodeEditor() {
  if (!currentEpisodeAnime) return '<div class="admin-empty">Pilih anime dulu</div>';
  return renderManualEditor();
}

function renderManualEditor() {
  var listMap = window.__epListMap || {};
  var finalMax = window.__epFinalMax || 12;

  var filledCount = 0;
  Object.keys(listMap).forEach(function(k) {
    if (listMap[k].hasData) filledCount++;
  });

  var anime = adminData.anime.find(function(a) { return a.id === currentEpisodeAnime; });
  var animeTitle = anime ? anime.title : currentEpisodeAnime;

  var html =
    '<div class="bulk-ep-header">' +
    '<div class="bulk-ep-title">' + escapeHtmlAdmin(animeTitle) + '</div>' +
    '<div class="bulk-ep-sub" id="bulk-ep-sub">' + filledCount + ' dari ' + finalMax + ' episode keisi' +
    (Object.keys(currentEpisodeDraft).length > 0 ? ' • <span style="color:var(--accent-2);font-weight:700;">' + Object.keys(currentEpisodeDraft).length + ' perubahan belum disave</span>' : '') +
    '</div>' +
    '</div>' +
    '<div class="bulk-ep-grid">';

  for (var i = 1; i <= finalMax; i++) {
    var ep = listMap[i] || {
      title: "", duration: 1440,
      videoUrl360: "", videoUrl480: "", videoUrl720: "", videoUrl1080: "",
      videoUrl: "", hasData: false
    };
    var draft = currentEpisodeDraft[i] || {};

    var v360 = draft.videoUrl360 !== undefined ? draft.videoUrl360 : ep.videoUrl360;
    var v480 = draft.videoUrl480 !== undefined ? draft.videoUrl480 : ep.videoUrl480;
    var v720 = draft.videoUrl720 !== undefined ? draft.videoUrl720 : ep.videoUrl720;
    var v1080 = draft.videoUrl1080 !== undefined ? draft.videoUrl1080 : ep.videoUrl1080;

    var hasAny = !!(v360 || v480 || v720 || v1080 || ep.videoUrl);
    var isExpanded = expandedEpisodes[i] === true;

    var badges = [];
    if (v360) badges.push('<span class="res-badge on">360</span>');
    if (v480) badges.push('<span class="res-badge on">480</span>');
    if (v720) badges.push('<span class="res-badge on">720</span>');
    if (v1080) badges.push('<span class="res-badge on">1080</span>');
    if (badges.length === 0 && ep.videoUrl) badges.push('<span class="res-badge on">LEGACY</span>');
    if (badges.length === 0) badges.push('<span class="res-badge">kosong</span>');

    html += '<div class="bulk-ep-item ' + (hasAny ? 'filled' : '') + ' ' + (isExpanded ? 'expanded' : '') + '" data-ep-item="' + i + '">' +
      '<div class="bulk-ep-row-head" onclick="toggleEpisodeExpand(' + i + ')">' +
      '<div class="bulk-ep-num">' +
      '<span>Eps ' + i + '</span>' +
      (hasAny ? '<span class="bulk-ep-check">✓</span>' : '') +
      '</div>' +
      '<div class="bulk-ep-badges">' + badges.join("") + '</div>' +
      '<button type="button" class="bulk-ep-expand-btn">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>' +
      '</button>' +
      '</div>' +
      (isExpanded ? '<div class="bulk-ep-body">' +
        RESOLUTIONS.map(function(res) {
          var key = RES_KEY_MAP[res];
          var val = draft[key] !== undefined ? draft[key] : ep[key];
          return '<div class="res-input-row">' +
            '<div class="res-input-label">' + res + '</div>' +
            '<input class="bulk-ep-input" type="url" placeholder="Link ' + res + '..." ' +
            'value="' + escapeHtmlAttr(val || '') + '" ' +
            'data-ep="' + i + '" data-res="' + res + '" ' +
            'inputmode="url" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" ' +
            'oninput="onEpisodeResChange(' + i + ', \'' + res + '\', this.value)" ' +
            'onpaste="var self=this; setTimeout(function(){ onEpisodeResChange(' + i + ', \'' + res + '\', self.value); }, 30)">' +
            '<button class="bulk-ep-clear" onclick="clearEpisodeRes(' + i + ', \'' + res + '\')" title="Kosongkan">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '</button>' +
            '</div>';
        }).join("") +
        '</div>' : "") +
      '</div>';
  }

  html += '</div>';
  html += '<div class="bulk-ep-actions">' +
    '<button class="bulk-ep-btn secondary" onclick="clearAllDrafts()">Reset Draft</button>' +
    '<button class="bulk-ep-btn primary" onclick="saveBulkEpisodes()">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>' +
    ' Simpan Semua' +
    '</button>' +
    '</div>';

  return html;
}

function toggleEpisodeExpand(epNum) {
  expandedEpisodes[epNum] = !expandedEpisodes[epNum];
  var item = document.querySelector('[data-ep-item="' + epNum + '"]');
  if (!item) return;
  var rect = item.getBoundingClientRect();
  var wrap = document.getElementById("ep-editor-wrap");
  if (wrap) wrap.innerHTML = renderEpisodeEditor();
  var newItem = document.querySelector('[data-ep-item="' + epNum + '"]');
  if (newItem) {
    var newRect = newItem.getBoundingClientRect();
    var diff = newRect.top - rect.top;
    window.scrollBy(0, diff);
  }
}

function onEpisodeResChange(epNum, res, value) {
  var listMap = window.__epListMap || {};
  var key = RES_KEY_MAP[res];
  var ep = listMap[epNum] || {};

  if (!currentEpisodeDraft[epNum]) {
    currentEpisodeDraft[epNum] = {
      title: "Episode " + epNum,
      duration: 1440,
      videoUrl360: ep.videoUrl360 || "",
      videoUrl480: ep.videoUrl480 || "",
      videoUrl720: ep.videoUrl720 || "",
      videoUrl1080: ep.videoUrl1080 || ""
    };
  }
  currentEpisodeDraft[epNum][key] = value;
  updateEpisodeItemVisual(epNum);
}

function updateEpisodeItemVisual(epNum) {
  var listMap = window.__epListMap || {};
  var ep = listMap[epNum] || {};
  var draft = currentEpisodeDraft[epNum] || {};

  var v360 = draft.videoUrl360 !== undefined ? draft.videoUrl360 : ep.videoUrl360;
  var v480 = draft.videoUrl480 !== undefined ? draft.videoUrl480 : ep.videoUrl480;
  var v720 = draft.videoUrl720 !== undefined ? draft.videoUrl720 : ep.videoUrl720;
  var v1080 = draft.videoUrl1080 !== undefined ? draft.videoUrl1080 : ep.videoUrl1080;
  var hasAny = !!(v360 || v480 || v720 || v1080 || ep.videoUrl);

  var item = document.querySelector('[data-ep-item="' + epNum + '"]');
  if (!item) return;
  item.classList.toggle("filled", hasAny);

  var badges = [];
  if (v360) badges.push('<span class="res-badge on">360</span>');
  if (v480) badges.push('<span class="res-badge on">480</span>');
  if (v720) badges.push('<span class="res-badge on">720</span>');
  if (v1080) badges.push('<span class="res-badge on">1080</span>');
  if (badges.length === 0 && ep.videoUrl) badges.push('<span class="res-badge on">LEGACY</span>');
  if (badges.length === 0) badges.push('<span class="res-badge">kosong</span>');

  var badgesWrap = item.querySelector(".bulk-ep-badges");
  if (badgesWrap) badgesWrap.innerHTML = badges.join("");

  var numDiv = item.querySelector(".bulk-ep-num");
  if (numDiv) {
    var check = numDiv.querySelector(".bulk-ep-check");
    if (hasAny && !check) {
      var c = document.createElement("span");
      c.className = "bulk-ep-check";
      c.textContent = "✓";
      numDiv.appendChild(c);
    } else if (!hasAny && check) {
      check.remove();
    }
  }

  var listKeys = Object.keys(listMap);
  var filledCount = 0;
  listKeys.forEach(function(k) {
    var e = listMap[k];
    var d = currentEpisodeDraft[k] || {};
    var a360 = d.videoUrl360 !== undefined ? d.videoUrl360 : e.videoUrl360;
    var a480 = d.videoUrl480 !== undefined ? d.videoUrl480 : e.videoUrl480;
    var a720 = d.videoUrl720 !== undefined ? d.videoUrl720 : e.videoUrl720;
    var a1080 = d.videoUrl1080 !== undefined ? d.videoUrl1080 : e.videoUrl1080;
    if (a360 || a480 || a720 || a1080 || e.videoUrl) filledCount++;
  });
  var sub = document.getElementById("bulk-ep-sub");
  if (sub) {
    sub.innerHTML = filledCount + ' dari ' + (window.__epFinalMax || 12) + ' episode keisi' +
      (Object.keys(currentEpisodeDraft).length > 0 ? ' • <span style="color:var(--accent-2);font-weight:700;">' + Object.keys(currentEpisodeDraft).length + ' perubahan belum disave</span>' : '');
  }
}

function clearEpisodeRes(epNum, res) {
  var input = document.querySelector('.bulk-ep-input[data-ep="' + epNum + '"][data-res="' + res + '"]');
  if (input) input.value = "";
  onEpisodeResChange(epNum, res, "");
}

function onBatchInput(value) {
  batchTextareaValue = value;
  var urls = extractUrls(value);
  var counter = document.getElementById("batch-counter");
  if (counter) counter.textContent = urls.length + " link";
}

function applyBatchInput() {
  var urls = extractUrls(batchTextareaValue);
  if (urls.length === 0) { showToast("Gak ada link terdeteksi"); return; }

  var listMap = window.__epListMap || {};
  var finalMax = window.__epFinalMax || 12;
  var resKey = RES_KEY_MAP[batchSelectedRes];
  var resLabel = batchSelectedRes;

  var filled = 0;
  var linkIdx = 0;
  var skipped = 0;

  for (var i = 1; i <= finalMax && linkIdx < urls.length; i++) {
    var ep = listMap[i] || {};

    if (ep[resKey]) {
      skipped++;
      continue;
    }

    if (!currentEpisodeDraft[i]) {
      currentEpisodeDraft[i] = {
        title: "Episode " + i,
        duration: 1440,
        videoUrl360: ep.videoUrl360 || "",
        videoUrl480: ep.videoUrl480 || "",
        videoUrl720: ep.videoUrl720 || "",
        videoUrl1080: ep.videoUrl1080 || ""
      };
    }
    currentEpisodeDraft[i][resKey] = urls[linkIdx];
    linkIdx++;
    filled++;
  }

  if (filled === 0) {
    showToast("Semua kolom udah keisi di " + resLabel);
    return;
  }

  var remaining = urls.length - linkIdx;
  var msg = filled + " link " + resLabel + " masuk ke kolom";
  if (skipped > 0) msg += " (" + skipped + " di-skip)";
  if (remaining > 0) msg += " • " + remaining + " kelebihan";
  showToast(msg);

  batchTextareaValue = "";

  Object.keys(currentEpisodeDraft).forEach(function(k) {
    updateEpisodeItemVisual(Number(k));
  });

  var ta = document.getElementById("batch-input");
  if (ta) ta.value = "";
  var counter = document.getElementById("batch-counter");
  if (counter) counter.textContent = "0 link";
}

async function clearAllDrafts() {
  if (Object.keys(currentEpisodeDraft).length === 0) {
    showToast("Gak ada draft");
    return;
  }
  var ok = await showConfirm("Reset semua perubahan yang belum disave?", "Reset Draft", { okText: "Ya, Reset", danger: true });
  if (!ok) return;
  currentEpisodeDraft = {};
  expandedEpisodes = {};
  selectEpisodeAnime(currentEpisodeAnime);
}

async function saveBulkEpisodes() {
  if (!currentEpisodeAnime) { showToast("Pilih anime dulu"); return; }
  var draftKeys = Object.keys(currentEpisodeDraft);
  if (draftKeys.length === 0) { showToast("Gak ada perubahan"); return; }

  var validEntries = [];
  draftKeys.forEach(function(k) {
    var d = currentEpisodeDraft[k];
    var hasAny = !!(d.videoUrl360 || d.videoUrl480 || d.videoUrl720 || d.videoUrl1080);
    if (hasAny) validEntries.push(k);
  });

  var msg = "Simpan " + validEntries.length + " episode?";
  if (validEntries.length < draftKeys.length) {
    msg += "\n\n" + (draftKeys.length - validEntries.length) + " episode tanpa link (semua res kosong) — ini bakal DIHAPUS dari Firestore.";
  }

  var ok = await showConfirm(msg, "Simpan Episode", { okText: "Ya, Simpan" });
  if (!ok) return;

  showToast("Menyimpan " + validEntries.length + " episode...");

  try {
    var batch = db.batch();
    var animeRef = db.collection("anime").doc(currentEpisodeAnime);

    validEntries.forEach(function(epNum) {
      var d = currentEpisodeDraft[epNum];
      var epRef = animeRef.collection("episode").doc(String(epNum));
      batch.set(epRef, {
        title: d.title || ("Episode " + epNum),
        duration: d.duration || 1440,
        videoUrl360: d.videoUrl360 || "",
        videoUrl480: d.videoUrl480 || "",
        videoUrl720: d.videoUrl720 || "",
        videoUrl1080: d.videoUrl1080 || "",
        updatedAt: new Date().toISOString()
      }, { merge: true });
    });

    draftKeys.forEach(function(epNum) {
      var d = currentEpisodeDraft[epNum];
      var hasAny = !!(d.videoUrl360 || d.videoUrl480 || d.videoUrl720 || d.videoUrl1080);
      if (!hasAny) {
        var listMap = window.__epListMap || {};
        var ep = listMap[epNum] || {};
        var wasFilled = !!(ep.videoUrl360 || ep.videoUrl480 || ep.videoUrl720 || ep.videoUrl1080 || ep.videoUrl);
        if (wasFilled) {
          var epRef = animeRef.collection("episode").doc(String(epNum));
          batch.delete(epRef);
        }
      }
    });

    await batch.commit();

    var listMap = window.__epListMap || {};
    var newMax = 0;
    Object.keys(listMap).forEach(function(k) {
      var n = Number(k);
      if (isNaN(n)) return;
      var d = currentEpisodeDraft[k];
      var hasNow = false;
      if (d !== undefined) {
        hasNow = !!(d.videoUrl360 || d.videoUrl480 || d.videoUrl720 || d.videoUrl1080);
      } else {
        var e = listMap[k];
        hasNow = !!(e.videoUrl360 || e.videoUrl480 || e.videoUrl720 || e.videoUrl1080 || e.videoUrl);
      }
      if (hasNow && n > newMax) newMax = n;
    });
    if (newMax > 0) {
      await fbUpdate("anime", currentEpisodeAnime, { totalEpisodes: newMax });
    }

    showToast(validEntries.length + " episode tersimpan!");
    currentEpisodeDraft = {};
    expandedEpisodes = {};
    await selectEpisodeAnime(currentEpisodeAnime);
    await loadAllAdmin();

  } catch (e) {
    console.error(e);
    showToast("Gagal simpan: " + e.message);
  }
}

async function openBulkAddColumn() {
  if (!currentEpisodeAnime) { showToast("Pilih anime dulu"); return; }
  var extra = await showPrompt("Tambah berapa kolom episode baru?", "10", "Tambah Kolom", {
    placeholder: "Contoh: 10",
    inputType: "number",
    okText: "Tambah"
  });
  if (!extra || isNaN(Number(extra))) return;
  var n = Math.max(1, Math.min(500, Number(extra)));
  var currentMax = window.__epFinalMax || 12;
  var newMax = currentMax + n;
  window.__epFinalMax = newMax;
  var listMap = window.__epListMap || {};
  for (var i = currentMax + 1; i <= newMax; i++) {
    listMap[i] = {
      title: "", duration: 1440,
      videoUrl360: "", videoUrl480: "", videoUrl720: "", videoUrl1080: "",
      videoUrl: "", hasData: false
    };
  }
  window.__epListMap = listMap;
  document.getElementById("ep-editor-wrap").innerHTML = renderEpisodeEditor();
  showToast("Ditambah " + n + " kolom");
}

/* ==================== TOP ==================== */
function renderTopList(container) {
  container.innerHTML =
    '<div class="admin-toolbar">' +
    renderCustomSelect("top-type-filter", makeOptions([
      ["", "Semua Tipe"],
      ["giveaway", "Giveaway (Manual)"],
      ["level", "Level (Auto)"],
      ["rank", "Rank (Auto)"],
      ["clan", "Clan (Manual)"]
    ]), "", "renderTopListFiltered") +
    '<button class="admin-add-btn" onclick="openFormTop()">' + icons.plus + ' Tambah</button>' +
    '</div>' +
    '<div class="admin-list" id="top-list">' + renderTopItems() + '</div>';
}
function renderTopListFiltered() {
  var el = document.getElementById("top-list");
  if (el) el.innerHTML = renderTopItems();
}
function renderTopItems() {
  var filterEl = document.getElementById("top-type-filter");
  var filter = filterEl ? filterEl.dataset.value : "";
  var list = [];
  if (filter === "level" || filter === "rank") {
    var sorted = adminData.users.slice().sort(function(a, b) { return (b.xp || 0) - (a.xp || 0); });
    list = sorted.slice(0, 20).map(function(u, i) {
      return { id: "auto-" + u.id, type: filter, rank: i + 1, name: u.username, avatar: u.avatar, tag: u.rank || "Member", score: formatXP(u.xp || 0) + " XP", isAuto: true };
    });
  } else if (filter === "giveaway" || filter === "clan") {
    list = adminData.top.filter(function(t) { return t.type === filter; });
  } else {
    var sorted2 = adminData.users.slice().sort(function(a, b) { return (b.xp || 0) - (a.xp || 0); });
    var autoList = sorted2.slice(0, 20).map(function(u, i) {
      return { id: "auto-level-" + u.id, type: "level", rank: i + 1, name: u.username, avatar: u.avatar, tag: u.rank || "Member", score: formatXP(u.xp || 0) + " XP", isAuto: true };
    });
    list = adminData.top.concat(autoList);
  }
  if (list.length === 0) return '<div class="admin-empty">Belum ada data</div>';
  return list.map(function(t) {
    return '<div class="admin-item">' +
      '<div class="admin-item-thumb"><img src="' + escapeHtmlAttr(t.avatar || '') + '" alt=""></div>' +
      '<div class="admin-item-body"><div class="admin-item-title">' + escapeHtmlAdmin(t.name || '-') + ' ' + (t.isAuto ? '<span>AUTO</span>' : '') + '</div>' +
      '<div class="admin-item-sub">' + t.type + ' | Rank ' + t.rank + ' | ' + escapeHtmlAdmin(t.score || '-') + '</div></div>' +
      '<div class="admin-item-actions">' +
      (t.isAuto ? '<button class="admin-action-btn" onclick="showToast(\'Data otomatis\')">' + icons.edit + '</button>' : '<button class="admin-action-btn edit" onclick="openFormTop(\'' + t.id + '\')">' + icons.edit + '</button>') +
      (t.isAuto ? '<button class="admin-action-btn" onclick="showToast(\'Data otomatis\')">' + icons.trash + '</button>' : '<button class="admin-action-btn delete" onclick="deleteTop(\'' + t.id + '\')">' + icons.trash + '</button>') +
      '</div></div>';
  }).join("");
}
function openFormTop(id) {
  currentEditingId = id || null;
  var t = id ? adminData.top.find(function(x) { return x.id === id; }) : {};
  document.getElementById("modal-title").textContent = id ? "Edit Top" : "Tambah Top";
  document.getElementById("modal-body").innerHTML =
    '<div class="form-group"><label class="form-label">Tipe</label>' +
    renderCustomSelect("t-type", makeOptions([["giveaway", "Giveaway"], ["clan", "Clan"]]), t.type || "giveaway", "") +
    '</div>' +
    '<div class="form-group"><label class="form-label">Rank</label><input class="form-input" id="t-rank" type="number" value="' + (t.rank || 1) + '"></div>' +
    '<div class="form-group"><label class="form-label">Nama *</label><input class="form-input" id="t-name" value="' + escapeHtmlAttr(t.name || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">URL Avatar</label><input class="form-input" id="t-avatar" value="' + escapeHtmlAttr(t.avatar || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Tag</label><input class="form-input" id="t-tag" value="' + escapeHtmlAttr(t.tag || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Score</label><input class="form-input" id="t-score" value="' + escapeHtmlAttr(t.score || '') + '"></div>' +
    '<div class="form-actions"><button class="form-btn form-btn-cancel" onclick="closeModal()">Batal</button><button class="form-btn form-btn-save" onclick="saveTop()">Simpan</button></div>';
  openModal();
}
async function saveTop() {
  var data = {
    type: document.getElementById("t-type").dataset.value || "giveaway",
    rank: Number(document.getElementById("t-rank").value) || 1,
    name: document.getElementById("t-name").value.trim(),
    avatar: document.getElementById("t-avatar").value.trim(),
    tag: document.getElementById("t-tag").value.trim(),
    score: document.getElementById("t-score").value.trim()
  };
  if (!data.name) { showToast("Nama wajib"); return; }
  var ok;
  if (currentEditingId) ok = await fbUpdate("top", currentEditingId, data);
  else ok = await fbSet("top", data.type + "-" + data.rank + "-" + Date.now(), data);
  if (ok) { showToast(currentEditingId ? "Top diperbarui" : "Top disimpan"); closeModal(); await loadAllAdmin(); }
  else showToast("Gagal");
}
async function deleteTop(id) {
  var ok = await showConfirm("Hapus data top ini?", "Hapus Top", { okText: "Ya, Hapus", danger: true });
  if (!ok) return;
  var res = await fbDelete("top", id);
  if (res) { showToast("Dihapus"); await loadAllAdmin(); }
  else showToast("Gagal");
}

/* ==================== USERS ==================== */
function renderUsersList(container) {
  container.innerHTML =
    '<div class="admin-toolbar">' +
    '<input class="admin-search" id="user-search" placeholder="Cari username / ID..." oninput="filterUserList(this.value)">' +
    '<button class="admin-add-btn" style="background:var(--bg-3);color:var(--text);box-shadow:none;border:1px solid var(--border);" onclick="showStatistics()">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' +
    '</button>' +
    '<button class="admin-add-btn" onclick="openFormUser()">' + icons.plus + '</button>' +
    '</div>' +
    '<div class="admin-list" id="user-list">' +
    (adminData.users.length === 0 ? '<div class="admin-empty">Belum ada user</div>' : adminData.users.map(userAdminItemHTML).join("")) +
    '</div>';
}

function filterUserList(q) {
  q = q.toLowerCase().trim();
  document.querySelectorAll("#user-list .admin-item").forEach(function(el) {
    var txt = (el.dataset.search || "").toLowerCase();
    el.style.display = !q || txt.indexOf(q) > -1 ? "flex" : "none";
  });
}

function userAdminItemHTML(u) {
  var vh = u.verified ? '<img class="verified-inline" src="' + escapeHtmlAttr(u.verified) + '" alt="">' : "";
  var premiumBadge = u.isPremium ? '<span style="color:var(--gold);font-weight:800;"> PREMIUM</span>' : "";
  var adminBadge = u.isAdmin ? '<span style="color:var(--accent-2);font-weight:800;"> ADMIN</span>' : "";
  var bannedBadge = u.isBanned ? '<span style="color:var(--danger);font-weight:800;"> BANNED</span>' : "";
  var searchStr = ((u.username || "") + " " + (u.userId || "")).toLowerCase();

  return '<div class="admin-item" data-search="' + escapeHtmlAttr(searchStr) + '" style="flex-direction:column;align-items:stretch;' + (u.isBanned ? 'opacity:0.6;border-color:rgba(239,68,68,0.4);' : '') + '">' +
    '<div style="display:flex;gap:12px;align-items:center;">' +
    '<div class="admin-item-thumb"><img src="' + escapeHtmlAttr(u.avatar || '') + '" alt=""></div>' +
    '<div class="admin-item-body"><div class="admin-item-title">' + escapeHtmlAdmin(u.username || '-') + ' ' + vh + ' <span>' + escapeHtmlAdmin(u.userId || '') + '</span>' + premiumBadge + adminBadge + bannedBadge + '</div>' +
    '<div class="admin-item-sub">Lvl ' + u.level + ' | ' + u.rank + ' | ' + formatXP(u.xp || 0) + ' XP' + (u.isDefault ? ' | Default' : '') + '</div></div>' +
    '<div class="admin-item-actions">' +
    '<button class="admin-action-btn edit" onclick="openFormUser(\'' + u.id + '\')">' + icons.edit + '</button>' +
    (u.isBanned
      ? '<button class="admin-action-btn" style="border-color:rgba(16,185,129,0.4);" onclick="unbanUser(\'' + u.id + '\')" title="Unban"><svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><polyline points="20 6 9 17 4 12"/></svg></button>'
      : '<button class="admin-action-btn delete" onclick="banUser(\'' + u.id + '\')" title="Ban"><svg viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg></button>') +
    '<button class="admin-action-btn delete" onclick="deleteUser(\'' + u.id + '\')">' + icons.trash + '</button>' +
    '</div></div>' +
    '<div class="verified-row"><span class="verified-label">Centang Biru</span>' +
    '<div class="verified-toggle ' + (u.verified ? 'on' : '') + '" onclick="toggleVerified(\'' + u.id + '\', \'' + (u.verified ? 'on' : 'off') + '\')">' +
    '<img class="verified-icon-preview ' + (u.verified ? 'active' : '') + '" src="' + VERIFIED_ICON_URL + '" alt="">' +
    '<div class="verified-switch"></div>' +
    '<span class="verified-text">' + (u.verified ? 'ON' : 'OFF') + '</span>' +
    '</div></div>' +
    '<div class="verified-row"><span class="verified-label">Premium</span>' +
    '<div class="verified-toggle ' + (u.isPremium ? 'on' : '') + '" onclick="toggleUserField(\'' + u.id + '\', \'isPremium\', ' + (u.isPremium ? 'true' : 'false') + ')">' +
    '<div class="verified-switch"></div>' +
    '<span class="verified-text">' + (u.isPremium ? 'ON' : 'OFF') + '</span>' +
    '</div></div>' +
    '<div class="verified-row"><span class="verified-label">Admin</span>' +
    '<div class="verified-toggle ' + (u.isAdmin ? 'on' : '') + '" onclick="toggleUserField(\'' + u.id + '\', \'isAdmin\', ' + (u.isAdmin ? 'true' : 'false') + ')">' +
    '<div class="verified-switch"></div>' +
    '<span class="verified-text">' + (u.isAdmin ? 'ON' : 'OFF') + '</span>' +
    '</div></div>' +
    '</div>';
}

async function toggleVerified(userId, currentStatus) {
  var isOn = currentStatus === "on";
  var newValue = isOn ? "" : VERIFIED_ICON_URL;
  showToast(isOn ? "Menghapus verified..." : "Menambah verified...");
  var ok = await fbSet("users", userId, { verified: newValue }, true);
  if (ok) {
    var idx = adminData.users.findIndex(function(u) { return u.id === userId; });
    if (idx > -1) adminData.users[idx].verified = newValue;
    showToast(isOn ? "Verified dihapus" : "Verified aktif");
    var c = document.getElementById("admin-content");
    if (c) renderUsersList(c);
  } else showToast("Gagal update");
}

async function toggleUserField(userId, fieldName, currentValue) {
  var newValue = !currentValue;
  var label = fieldName === "isPremium" ? "Premium" : "Admin";
  showToast((newValue ? "Mengaktifkan " : "Menonaktifkan ") + label + "...");

  var updateData = {};
  updateData[fieldName] = newValue;

  if (fieldName === "isPremium" && newValue === true) {
    var idxCheck = adminData.users.findIndex(function(u) { return u.id === userId; });
    if (idxCheck > -1 && !adminData.users[idxCheck].verified) {
      updateData.verified = VERIFIED_ICON_URL;
    }
  }
  if (fieldName === "isPremium" && newValue === false) {
    var idxCheck2 = adminData.users.findIndex(function(u) { return u.id === userId; });
    if (idxCheck2 > -1 && adminData.users[idxCheck2].verified === VERIFIED_ICON_URL) {
      updateData.verified = "";
    }
  }

  var ok = await fbSet("users", userId, updateData, true);
  if (ok) {
    var idx = adminData.users.findIndex(function(u) { return u.id === userId; });
    if (idx > -1) {
      adminData.users[idx][fieldName] = newValue;
      if (updateData.verified !== undefined) adminData.users[idx].verified = updateData.verified;
    }
    showToast(label + " " + (newValue ? "aktif" : "nonaktif"));
    var c = document.getElementById("admin-content");
    if (c) renderUsersList(c);
  } else showToast("Gagal update");
}

function openFormUser(id) {
  currentEditingId = id || null;
  var u = id ? adminData.users.find(function(x) { return x.id === id; }) : {};
  var cx = u.xp || 0;
  var cl = calculateLevel(cx);
  var cr = calculateRank(cl);
  var n = xpToNextLevel(cx);
  document.getElementById("modal-title").textContent = id ? "Edit User" : "Tambah User";
  document.getElementById("modal-body").innerHTML =
    '<div class="form-group"><label class="form-label">User ID</label><input class="form-input" id="u-userId" value="' + escapeHtmlAttr(u.userId || '') + '"' + (id ? ' disabled' : '') + '></div>' +
    '<div class="form-group"><label class="form-label">Username *</label><input class="form-input" id="u-username" value="' + escapeHtmlAttr(u.username || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">URL Avatar</label><input class="form-input" id="u-avatar" value="' + escapeHtmlAttr(u.avatar || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">XP</label><input class="form-input" id="u-xp" type="number" value="' + cx + '" oninput="updateUserPreview()"><div class="form-hint" id="u-xp-hint">Lvl ' + cl + ' | ' + cr.name + ' | ' + n.progress + '/' + n.needed + ' XP (' + n.percent + '%)</div></div>' +
    '<div class="form-group"><label class="form-label">Followers</label><input class="form-input" id="u-followers" type="number" value="' + (u.followers || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Total Nonton (menit)</label><input class="form-input" id="u-watchMinutes" type="number" value="' + (u.watchMinutes || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Jumlah Komentar</label><input class="form-input" id="u-comments" type="number" value="' + (u.comments || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Jumlah Riwayat</label><input class="form-input" id="u-historyCount" type="number" value="' + (u.historyCount || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Lama Bergabung (bulan)</label><input class="form-input" id="u-joinedMonths" type="number" value="' + (u.joinedMonths || 1) + '"></div>' +
    '<div class="form-group"><label class="form-label">Badges (pisah koma)</label><input class="form-input" id="u-badges" value="' + escapeHtmlAttr((u.badges || []).join(', ')) + '"></div>' +
    '<div class="form-group"><label class="form-label">Default User?</label>' +
    renderCustomSelect("u-isDefault", makeOptions([["false", "Tidak"], ["true", "Ya"]]), u.isDefault ? "true" : "false", "") +
    '</div>' +
    '<div class="admin-toggle-row"><div class="admin-toggle-info"><div class="admin-toggle-title">Premium</div><div class="admin-toggle-desc">Auto dapet Verified, akses stiker, ganti banner</div></div><div class="admin-toggle ' + (u.isPremium ? 'on' : '') + '" id="u-premium" onclick="toggleAdminField(\'u-premium\')"><span class="admin-toggle-text">' + (u.isPremium ? 'ON' : 'OFF') + '</span><div class="admin-toggle-switch"></div></div></div>' +
    '<div class="admin-toggle-row"><div class="admin-toggle-info"><div class="admin-toggle-title">Admin</div><div class="admin-toggle-desc">User bisa akses panel admin</div></div><div class="admin-toggle ' + (u.isAdmin ? 'on' : '') + '" id="u-admin" onclick="toggleAdminField(\'u-admin\')"><span class="admin-toggle-text">' + (u.isAdmin ? 'ON' : 'OFF') + '</span><div class="admin-toggle-switch"></div></div></div>' +
    '<div class="form-actions"><button class="form-btn form-btn-cancel" onclick="closeModal()">Batal</button><button class="form-btn form-btn-save" onclick="saveUser()">Simpan</button></div>';
  openModal();
}

function updateUserPreview() {
  var xp = Number(document.getElementById("u-xp").value) || 0;
  var lvl = calculateLevel(xp);
  var rank = calculateRank(lvl);
  var next = xpToNextLevel(xp);
  var hint = document.getElementById("u-xp-hint");
  if (hint) hint.textContent = "Lvl " + lvl + " | " + rank.name + " | " + next.progress + "/" + next.needed + " XP (" + next.percent + "%)";
}

async function saveUser() {
  var username = document.getElementById("u-username").value.trim();
  if (!username) { showToast("Username wajib"); return; }
  var xp = Number(document.getElementById("u-xp").value) || 0;
  var level = calculateLevel(xp);
  var rank = calculateRank(level);
  var userId = document.getElementById("u-userId").value.trim();
  if (!userId || userId === "#") userId = "#" + Date.now().toString().slice(-6);

  var premiumEl = document.getElementById("u-premium");
  var adminEl = document.getElementById("u-admin");
  var isPremium = premiumEl ? premiumEl.classList.contains("on") : false;
  var isAdmin = adminEl ? adminEl.classList.contains("on") : false;

  var data = {
    userId: userId, username: username,
    avatar: document.getElementById("u-avatar").value.trim(),
    xp: xp, level: level, rank: rank.name, rankColor: rank.color,
    followers: Number(document.getElementById("u-followers").value) || 0,
    watchMinutes: Number(document.getElementById("u-watchMinutes").value) || 0,
    comments: Number(document.getElementById("u-comments").value) || 0,
    historyCount: Number(document.getElementById("u-historyCount").value) || 0,
    joinedMonths: Number(document.getElementById("u-joinedMonths").value) || 1,
    badges: document.getElementById("u-badges").value.split(",").map(function(b) { return b.trim(); }).filter(Boolean),
    isDefault: document.getElementById("u-isDefault").dataset.value === "true",
    isPremium: isPremium,
    isAdmin: isAdmin
  };
  showToast("Menyimpan...");
  var ok;
  if (currentEditingId) ok = await fbUpdate("users", currentEditingId, data);
  else ok = await fbSet("users", "user-" + Date.now(), data);
  if (ok) { showToast(currentEditingId ? "User diperbarui" : "User disimpan"); closeModal(); await loadAllAdmin(); }
  else showToast("Gagal");
}

async function deleteUser(id) {
  var ok = await showConfirm("Hapus user ini permanen?\n\nKalau cuma mau freeze, pakai Ban aja.", "Hapus User", { okText: "Ya, Hapus", danger: true });
  if (!ok) return;
  var res = await fbDelete("users", id);
  if (res) { showToast("User dihapus"); await loadAllAdmin(); }
  else showToast("Gagal");
}

async function banUser(userId) {
  var ok = await showConfirm("BAN user ini?\n\nUser gak bisa login dan aktifitasnya di-freeze.", "Ban User", { okText: "Ya, Ban", danger: true });
  if (!ok) return;
  showToast("Memban user...");
  var res = await fbSet("users", userId, { isBanned: true, bannedAt: new Date().toISOString() }, true);
  if (res) {
    var idx = adminData.users.findIndex(function(u) { return u.id === userId; });
    if (idx > -1) adminData.users[idx].isBanned = true;
    showToast("User di-ban");
    var c = document.getElementById("admin-content");
    if (c) renderUsersList(c);
  } else showToast("Gagal ban");
}

async function unbanUser(userId) {
  var ok = await showConfirm("Unban user ini?", "Unban User", { okText: "Ya, Unban" });
  if (!ok) return;
  showToast("Unban...");
  var res = await fbSet("users", userId, { isBanned: false, bannedAt: "" }, true);
  if (res) {
    var idx = adminData.users.findIndex(function(u) { return u.id === userId; });
    if (idx > -1) adminData.users[idx].isBanned = false;
    showToast("User di-unban");
    var c = document.getElementById("admin-content");
    if (c) renderUsersList(c);
  } else showToast("Gagal unban");
}

async function showStatistics() {
  document.getElementById("modal-title").textContent = "Statistik";
  document.getElementById("modal-body").innerHTML = '<div class="admin-empty">Menghitung...</div>';
  openModal();

  try {
    var snaps = await Promise.all([
      db.collection("anime").get(),
      db.collection("users").get(),
      db.collection("clans").get(),
      db.collection("comments").get(),
      db.collection("messages").get(),
      db.collection("top").get(),
      db.collection("notifications").get()
    ]);

    var animeSnap = snaps[0], userSnap = snaps[1], clanSnap = snaps[2];
    var commentSnap = snaps[3], messageSnap = snaps[4], topSnap = snaps[5], pumSnap = snaps[6];

    var totalAnime = animeSnap.size, totalUsers = userSnap.size, totalClans = clanSnap.size;
    var totalComments = commentSnap.size, totalMessages = messageSnap.size, totalTop = topSnap.size;
    var totalPum = pumSnap.size;

    var premiumCount = 0, adminCount = 0, verifiedCount = 0, bannedCount = 0;
    userSnap.forEach(function(d) {
      var u = d.data();
      if (u.isPremium === true) premiumCount++;
      if (u.isAdmin === true) adminCount++;
      if (u.verified) verifiedCount++;
      if (u.isBanned === true) bannedCount++;
    });

    var totalEpisodes = 0;
    for (var i = 0; i < animeSnap.docs.length; i++) {
      var subSnap = await animeSnap.docs[i].ref.collection("episode").get();
      totalEpisodes += subSnap.size;
    }

    document.getElementById("modal-body").innerHTML =
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
      statCard("Anime", totalAnime, "var(--accent-2)") +
      statCard("Episode", totalEpisodes, "var(--accent-2)") +
      statCard("User", totalUsers, "var(--accent)") +
      statCard("Clan", totalClans, "var(--accent)") +
      statCard("Komentar", totalComments, "var(--gold)") +
      statCard("Chat", totalMessages, "var(--gold)") +
      statCard("Top Manual", totalTop, "var(--success)") +
      statCard("Pengumuman", totalPum, "var(--blue)") +
      statCard("Premium", premiumCount, "var(--gold)") +
      statCard("Admin", adminCount, "var(--accent-2)") +
      statCard("Verified", verifiedCount, "var(--blue)") +
      statCard("Banned", bannedCount, "var(--danger)") +
      '</div>' +
      '<div class="form-actions" style="margin-top:16px;">' +
      '<button class="form-btn form-btn-cancel" onclick="closeModal()">Tutup</button>' +
      '</div>';
  } catch (e) {
    console.error(e);
    document.getElementById("modal-body").innerHTML = '<div class="admin-empty">Gagal memuat statistik</div>';
  }
}

function statCard(label, value, color) {
  return '<div style="padding:14px;background:var(--bg-3);border:1px solid var(--border);border-radius:12px;text-align:center;">' +
    '<div style="font-size:22px;font-weight:800;color:' + color + ';">' + value + '</div>' +
    '<div style="font-size:11px;color:var(--text-mute);text-transform:uppercase;letter-spacing:0.5px;margin-top:4px;">' + label + '</div>' +
    '</div>';
}

/* ==================== PREMIUM ==================== */
function renderPremiumList(container) {
  container.innerHTML =
    '<div class="admin-toolbar">' +
    '<div style="flex:1;font-size:13px;color:var(--text-mute);">Total: ' + adminData.premium.length + ' paket</div>' +
    '<button class="admin-add-btn" onclick="openFormPremium()">' + icons.plus + ' Tambah</button>' +
    '</div>' +
    '<div class="admin-list">' +
    (adminData.premium.length === 0 ? '<div class="admin-empty">Belum ada paket premium</div>' :
      adminData.premium.map(function(p) {
        return '<div class="admin-item"><div class="admin-item-thumb">' + icons.diamond + '</div>' +
          '<div class="admin-item-body"><div class="admin-item-title">' + escapeHtmlAdmin(p.name || '-') + '</div>' +
          '<div class="admin-item-sub">' + escapeHtmlAdmin(p.price || '-') + ' ' + escapeHtmlAdmin(p.period || '') + (p.popular ? ' | Populer' : '') + '</div></div>' +
          '<div class="admin-item-actions">' +
          '<button class="admin-action-btn edit" onclick="openFormPremium(\'' + p.id + '\')">' + icons.edit + '</button>' +
          '<button class="admin-action-btn delete" onclick="deletePremium(\'' + p.id + '\')">' + icons.trash + '</button>' +
          '</div></div>';
      }).join("")) +
    '</div>';
}
function openFormPremium(id) {
  currentEditingId = id || null;
  var p = id ? adminData.premium.find(function(x) { return x.id === id; }) : {};
  document.getElementById("modal-title").textContent = id ? "Edit Paket" : "Tambah Paket";
  document.getElementById("modal-body").innerHTML =
    '<div class="form-group"><label class="form-label">Nama Paket *</label><input class="form-input" id="p-name" value="' + escapeHtmlAttr(p.name || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Harga</label><input class="form-input" id="p-price" value="' + escapeHtmlAttr(p.price || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Harga (angka)</label><input class="form-input" id="p-priceNum" type="number" value="' + (p.priceNum || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Periode</label><input class="form-input" id="p-period" value="' + escapeHtmlAttr(p.period || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Fitur (pisah koma)</label><input class="form-input" id="p-features" value="' + escapeHtmlAttr((p.features || []).join(', ')) + '"></div>' +
    '<div class="form-group"><label class="form-label">Populer?</label>' +
    renderCustomSelect("p-popular", makeOptions([["false", "Tidak"], ["true", "Ya"]]), p.popular ? "true" : "false", "") +
    '</div>' +
    '<div class="form-actions"><button class="form-btn form-btn-cancel" onclick="closeModal()">Batal</button><button class="form-btn form-btn-save" onclick="savePremium()">Simpan</button></div>';
  openModal();
}
async function savePremium() {
  var name = document.getElementById("p-name").value.trim();
  if (!name) { showToast("Nama wajib"); return; }
  var data = {
    name: name,
    price: document.getElementById("p-price").value.trim(),
    priceNum: Number(document.getElementById("p-priceNum").value) || 0,
    period: document.getElementById("p-period").value.trim(),
    features: document.getElementById("p-features").value.split(",").map(function(f) { return f.trim(); }).filter(Boolean),
    popular: document.getElementById("p-popular").dataset.value === "true"
  };
  var ok;
  if (currentEditingId) ok = await fbUpdate("premium_plans", currentEditingId, data);
  else ok = await fbSet("premium_plans", "plan-" + Date.now(), data);
  if (ok) { showToast(currentEditingId ? "Paket diperbarui" : "Paket disimpan"); closeModal(); await loadAllAdmin(); }
  else showToast("Gagal");
}
async function deletePremium(id) {
  var ok = await showConfirm("Hapus paket ini?", "Hapus Paket", { okText: "Ya, Hapus", danger: true });
  if (!ok) return;
  var res = await fbDelete("premium_plans", id);
  if (res) { showToast("Dihapus"); await loadAllAdmin(); }
  else showToast("Gagal");
}

/* ==================== PENGUMUMAN ==================== */
var pengumumanTargetType = "global";
var pengumumanTargetId = "";
var pengumumanTargetLabel = "";

function renderPengumumanList(container) {
  var list = adminData.pengumuman.slice().sort(function(a, b) {
    var ta = a.createdAt && a.createdAt.seconds ? a.createdAt.seconds : 0;
    var tb = b.createdAt && b.createdAt.seconds ? b.createdAt.seconds : 0;
    return tb - ta;
  });

  container.innerHTML =
    '<div class="admin-toolbar">' +
    '<div style="flex:1;font-size:13px;color:var(--text-mute);">Total: ' + list.length + ' pengumuman</div>' +
    '<button class="admin-add-btn" onclick="openFormPengumuman()">' + icons.plus + ' Tambah</button>' +
    '</div>' +
    '<div class="admin-list">' +
    (list.length === 0
      ? '<div class="admin-empty">Belum ada pengumuman</div>'
      : list.map(pengumumanItemHTML).join("")) +
    '</div>';
}

function pengumumanItemHTML(p) {
  var targetLabel = "Global";
  var targetColor = "#06b6d4";
  if (p.targetType === "anime") {
    targetLabel = "Anime: " + (p.targetLabel || "-");
    targetColor = "#a855f7";
  } else if (p.targetType === "user") {
    targetLabel = "User: " + (p.targetLabel || "-");
    targetColor = "#fbbf24";
  }

  var timeStr = "-";
  if (p.createdAt && p.createdAt.seconds) {
    var d = new Date(p.createdAt.seconds * 1000);
    timeStr = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " +
      String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }

  return '<div class="admin-item" style="flex-direction:column;align-items:stretch;">' +
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">' +
    '<div style="flex:1;min-width:0;">' +
    '<div class="pengumuman-badge" style="background:' + targetColor + ';">' + escapeHtmlAdmin(targetLabel) + '</div>' +
    '<div class="admin-item-title" style="margin-top:6px;">' + escapeHtmlAdmin(p.title || "Tanpa judul") + '</div>' +
    '<div class="admin-item-sub" style="margin-top:4px;white-space:pre-wrap;">' + escapeHtmlAdmin(p.message || "") + '</div>' +
    '<div style="font-size:10px;color:var(--text-mute);margin-top:6px;">' + timeStr + '</div>' +
    '</div>' +
    '<div class="admin-item-actions">' +
    '<button class="admin-action-btn edit" onclick="openFormPengumuman(\'' + p.id + '\')">' + icons.edit + '</button>' +
    '<button class="admin-action-btn delete" onclick="deletePengumuman(\'' + p.id + '\')">' + icons.trash + '</button>' +
    '</div>' +
    '</div>' +
    '</div>';
}

function openFormPengumuman(id) {
  currentEditingId = id || null;
  var p = id ? adminData.pengumuman.find(function(x) { return x.id === id; }) : {};

  if (window.__pumDraftTargetType) {
    pengumumanTargetType = window.__pumDraftTargetType;
  } else {
    pengumumanTargetType = p.targetType || "global";
  }
  if (!pengumumanTargetId) pengumumanTargetId = p.targetId || "";
  if (!pengumumanTargetLabel) pengumumanTargetLabel = p.targetLabel || "";

  document.getElementById("modal-title").textContent = id ? "Edit Pengumuman" : "Bikin Pengumuman";

  document.getElementById("modal-body").innerHTML =
    '<div class="form-group">' +
    '<label class="form-label">Tipe Target</label>' +
    '<div class="target-selector">' +
    '<button type="button" class="target-btn ' + (pengumumanTargetType === "global" ? "active" : "") + '" data-target="global" onclick="setPengumumanTarget(\'global\')">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
    ' Global' +
    '</button>' +
    '<button type="button" class="target-btn ' + (pengumumanTargetType === "anime" ? "active" : "") + '" data-target="anime" onclick="setPengumumanTarget(\'anime\')">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>' +
    ' Anime' +
    '</button>' +
    '<button type="button" class="target-btn ' + (pengumumanTargetType === "user" ? "active" : "") + '" data-target="user" onclick="setPengumumanTarget(\'user\')">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
    ' User' +
    '</button>' +
    '</div>' +
    '</div>' +

    '<div class="form-group" id="target-anime-wrap" style="display:' + (pengumumanTargetType === "anime" ? "block" : "none") + ';">' +
    '<label class="form-label">Pilih Anime</label>' +
    '<button type="button" class="admin-search admin-search-trigger" onclick="openTargetPicker(\'anime\')">' +
    '<span class="admin-search-icon">' + icons.search + '</span>' +
    '<span class="admin-search-label" id="target-anime-label">' + (pengumumanTargetType === "anime" && pengumumanTargetLabel ? escapeHtmlAdmin(pengumumanTargetLabel) : "Pilih anime...") + '</span>' +
    '<span class="admin-search-caret">▾</span>' +
    '</button>' +
    '</div>' +

    '<div class="form-group" id="target-user-wrap" style="display:' + (pengumumanTargetType === "user" ? "block" : "none") + ';">' +
    '<label class="form-label">Pilih User</label>' +
    '<button type="button" class="admin-search admin-search-trigger" onclick="openTargetPicker(\'user\')">' +
    '<span class="admin-search-icon">' + icons.search + '</span>' +
    '<span class="admin-search-label" id="target-user-label">' + (pengumumanTargetType === "user" && pengumumanTargetLabel ? escapeHtmlAdmin(pengumumanTargetLabel) : "Pilih user...") + '</span>' +
    '<span class="admin-search-caret">▾</span>' +
    '</button>' +
    '</div>' +

    '<div class="form-group">' +
    '<label class="form-label">Judul</label>' +
    '<input class="form-input" id="p-title" value="' + escapeHtmlAttr(window.__pumDraftTitle || p.title || '') + '" placeholder="Contoh: Update Episode Baru">' +
    '</div>' +

    '<div class="form-group">' +
    '<label class="form-label">Isi Pengumuman</label>' +
    '<textarea class="form-textarea" id="p-message" style="min-height:120px;" placeholder="Contoh: Episode 11-12 udah rilis!">' + escapeHtmlAttr(window.__pumDraftMessage || p.message || '') + '</textarea>' +
    '</div>' +

    '<div class="form-group">' +
    '<label class="form-label">Tipe Notif (icon di app)</label>' +
    renderCustomSelect("p-notifType", makeOptions([
      ["update", "Update (icon play)"],
      ["comment", "Comment (icon chat)"],
      ["premium", "Premium (icon star)"]
    ]), window.__pumDraftNotifType || p.type || "update", "") +
    '</div>' +

    '<div class="form-actions">' +
    '<button class="form-btn form-btn-cancel" onclick="closeModal()">Batal</button>' +
    '<button class="form-btn form-btn-save" onclick="savePengumuman()">' + (id ? "Simpan" : "Kirim") + '</button>' +
    '</div>';

  openModal();
}

function setPengumumanTarget(type) {
  pengumumanTargetType = type;
  window.__pumDraftTargetType = type;
  document.querySelectorAll(".target-btn").forEach(function(b) {
    b.classList.toggle("active", b.dataset.target === type);
  });
  var animeWrap = document.getElementById("target-anime-wrap");
  var userWrap = document.getElementById("target-user-wrap");
  if (animeWrap) animeWrap.style.display = type === "anime" ? "block" : "none";
  if (userWrap) userWrap.style.display = type === "user" ? "block" : "none";
}

function openTargetPicker(kind) {
  var list = kind === "anime"
    ? adminData.anime.map(function(a) { return { id: a.id, label: a.title, sub: a.slug || "", avatar: a.cover || "" }; })
    : adminData.users.map(function(u) { return { id: u.id, label: u.username, sub: u.userId || "#?", avatar: u.avatar || "" }; });

  document.getElementById("modal-title").textContent = kind === "anime" ? "Pilih Anime" : "Pilih User";
  document.getElementById("modal-body").innerHTML =
    '<div class="picker-search-wrap">' +
    '<input class="picker-search-input" id="target-search" placeholder="Cari..." oninput="filterTargetPicker(\'' + kind + '\', this.value)" autocomplete="off">' +
    '<button class="picker-search-clear" onclick="document.getElementById(\'target-search\').value=\'\'; filterTargetPicker(\'' + kind + '\', \'\');">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
    '</button>' +
    '</div>' +
    '<div class="picker-list" id="target-picker-list">' + renderTargetPickerItems(kind, list, "") + '</div>';

  window.__targetPickerKind = kind;
  window.__targetPickerList = list;

  openModal();
  setTimeout(function() { var inp = document.getElementById("target-search"); if (inp) inp.focus(); }, 150);
}

function renderTargetPickerItems(kind, list, query) {
  var filtered = list;
  if (query && query.trim()) {
    var q = query.toLowerCase();
    filtered = list.filter(function(item) {
      return (item.label || "").toLowerCase().indexOf(q) > -1 || (item.sub || "").toLowerCase().indexOf(q) > -1;
    });
  }
  if (filtered.length === 0) return '<div class="picker-empty">Gak ada hasil</div>';

  var currentId = pengumumanTargetId;
  return filtered.map(function(item) {
    var selected = item.id === currentId;
    var initial = (item.label || "?").charAt(0).toUpperCase();
    var avatarHTML = item.avatar
      ? '<img src="' + escapeHtmlAttr(item.avatar) + '" alt="" style="width:100%;height:100%;object-fit:cover;">'
      : '<span style="font-size:14px;font-weight:800;color:var(--accent-2);">' + escapeHtmlAdmin(initial) + '</span>';
    return '<div class="picker-item ' + (selected ? 'selected' : '') + '" onclick="pickTarget(\'' + escapeHtmlAttr(item.id) + '\', \'' + escapeHtmlAttr(String(item.label).replace(/'/g, "\\'")) + '\')">' +
      '<div class="picker-item-thumb">' + avatarHTML + '</div>' +
      '<div class="picker-item-body">' +
      '<div class="picker-item-title">' + escapeHtmlAdmin(item.label) + '</div>' +
      '<div class="picker-item-sub">' + escapeHtmlAdmin(item.sub || "") + '</div>' +
      '</div>' +
      (selected ? '<div class="picker-item-check">✓</div>' : '') +
      '</div>';
  }).join("");
}

function filterTargetPicker(kind, query) {
  var list = window.__targetPickerList || [];
  var box = document.getElementById("target-picker-list");
  if (box) box.innerHTML = renderTargetPickerItems(kind, list, query);
}

function pickTarget(id, label) {
  pengumumanTargetId = id;
  pengumumanTargetLabel = label;
  var kind = window.__targetPickerKind;

  var titleEl = document.getElementById("p-title");
  var messageEl = document.getElementById("p-message");
  var notifTypeEl = document.getElementById("p-notifType");
  window.__pumDraftTitle = titleEl ? titleEl.value : "";
  window.__pumDraftMessage = messageEl ? messageEl.value : "";
  window.__pumDraftNotifType = notifTypeEl ? notifTypeEl.dataset.value : "update";

  openFormPengumuman(currentEditingId);

  setTimeout(function() {
    setPengumumanTarget(kind);
    if (kind === "anime") {
      var lblA = document.getElementById("target-anime-label");
      if (lblA) lblA.textContent = label;
    } else if (kind === "user") {
      var lblU = document.getElementById("target-user-label");
      if (lblU) lblU.textContent = label;
    }
  }, 60);
}

async function savePengumuman() {
  var title = document.getElementById("p-title").value.trim();
  var message = document.getElementById("p-message").value.trim();
  var notifType = document.getElementById("p-notifType").dataset.value || "update";

  if (!title) { showToast("Judul wajib diisi"); return; }
  if (!message) { showToast("Isi pengumuman wajib diisi"); return; }
  if (pengumumanTargetType === "anime" && !pengumumanTargetId) { showToast("Pilih anime dulu"); return; }
  if (pengumumanTargetType === "user" && !pengumumanTargetId) { showToast("Pilih user dulu"); return; }

  showToast("Menyimpan...");

  var data = {
    title: title,
    message: message,
    type: notifType,
    targetType: pengumumanTargetType,
    targetId: pengumumanTargetId,
    targetLabel: pengumumanTargetLabel,
    time: "baru saja",
    readBy: []
  };

  if (!currentEditingId) {
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  }

  var ok;
  if (currentEditingId) {
    ok = await fbUpdate("notifications", currentEditingId, data);
  } else {
    ok = await fbSet("notifications", "pum" + Date.now(), data);
  }

  if (ok) {
    showToast(currentEditingId ? "Pengumuman diperbarui" : "Pengumuman terkirim!");
    closeModal();
    await loadAllAdmin();
    if (adminCurrentTab === "pengumuman") renderAdminTab();
  } else {
    showToast("Gagal menyimpan");
  }
}

async function deletePengumuman(id) {
  var ok = await showConfirm("Hapus pengumuman ini?", "Hapus Pengumuman", { okText: "Ya, Hapus", danger: true });
  if (!ok) return;
  var res = await fbDelete("notifications", id);
  if (res) {
    showToast("Pengumuman dihapus");
    await loadAllAdmin();
    if (adminCurrentTab === "pengumuman") renderAdminTab();
  } else {
    showToast("Gagal hapus");
  }
}

/* ==================== MODAL ==================== */
function openModal() {
  document.getElementById("modal").style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.body.style.overflow = "";
  currentEditingId = null;
  window.__pumDraftTitle = "";
  window.__pumDraftMessage = "";
  window.__pumDraftNotifType = "update";
  window.__pumDraftTargetType = "";
  pengumumanTargetType = "global";
  pengumumanTargetId = "";
  pengumumanTargetLabel = "";
}

/* ==================== INIT ==================== */
console.log("Admin script loaded. firebaseReady:", firebaseReady);
checkLogin();