/* ==================== ADMIN DEBUG PANEL ==================== */
/* File terpisah — gak ganggu logic admin.js */

var DEBUG_LOG = [];

function dbgLog(type, msg) {
  var time = new Date().toLocaleTimeString();
  var color = type === "error" ? "#ef4444" : type === "success" ? "#10b981" : type === "warn" ? "#fbbf24" : "#06b6d4";
  var icon = type === "error" ? "❌" : type === "success" ? "✅" : type === "warn" ? "⚠️" : "ℹ️";
  DEBUG_LOG.push({ time: time, type: type, msg: msg });

  var log = document.getElementById("debug-log-body");
  if (log) {
    var div = document.createElement("div");
    div.style.cssText = "color:" + color + ";margin-bottom:4px;word-break:break-word;line-height:1.4;";
    div.textContent = "[" + time + "] " + icon + " " + msg;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    while (log.children.length > 100) log.removeChild(log.firstChild);
  }
  console.log("[" + type + "] " + msg);
}

function buildDebugPanel() {
  var panel = document.getElementById("debug-panel");
  if (!panel) return;
  panel.innerHTML =
    '<div class="debug-header">' +
    '<strong>🐛 Debug Panel</strong>' +
    '<div class="debug-header-btns">' +
    '<button onclick="clearDebugLog()">Clear</button>' +
    '<button onclick="testUpload()">Test Upload</button>' +
    '<button onclick="testFileInput()">Test File Input</button>' +
    '<button onclick="testModalFields()">Test Form</button>' +
    '<button onclick="toggleDebugPanel()" style="background:rgba(239,68,68,0.2);border-color:rgba(239,68,68,0.4);color:#ef4444;">✕</button>' +
    '</div>' +
    '</div>' +
    '<div class="debug-status-grid">' +
    '<div class="debug-status-item" id="dbg-firebase">Firebase: <span>?</span></div>' +
    '<div class="debug-status-item" id="dbg-functions">Functions: <span>?</span></div>' +
    '<div class="debug-status-item debug-full" id="dbg-apis">Upload APIs: <span>?</span></div>' +
    '<div class="debug-status-item debug-full" id="dbg-modal">Modal Fields: <span>?</span></div>' +
    '</div>' +
    '<div class="debug-log" id="debug-log-body">' +
    '<div style="color:#9a9ab0;font-style:italic;">Log akan muncul di sini...</div>' +
    '</div>';

  updateDebugStatus();
}

function clearDebugLog() {
  DEBUG_LOG = [];
  var log = document.getElementById("debug-log-body");
  if (log) log.innerHTML = '<div style="color:#9a9ab0;font-style:italic;">Log cleared.</div>';
}

function toggleDebugPanel() {
  var p = document.getElementById("debug-panel");
  if (!p) return;
  var isVisible = p.classList.contains("show");
  p.classList.toggle("show", !isVisible);
  if (!isVisible) updateDebugStatus();
}

function updateDebugStatus() {
  var fbEl = document.getElementById("dbg-firebase");
  var fnEl = document.getElementById("dbg-functions");
  var apiEl = document.getElementById("dbg-apis");
  var modalEl = document.getElementById("dbg-modal");

  if (fbEl) {
    var ready = typeof firebaseReady !== "undefined" && firebaseReady === true;
    fbEl.innerHTML = 'Firebase: <span style="color:' + (ready ? "#10b981" : "#ef4444") + ';">' + (ready ? "✓ READY" : "✗ FAILED") + '</span>';
  }

  if (fnEl) {
    var fns = ["triggerImageUpload", "handleImageFileSelect", "uploadImageWithFallback", "renderImageUploadField", "loadAllAdmin", "openFormAnime", "saveAnime"];
    var missing = [];
    fns.forEach(function(f) { if (typeof window[f] !== "function") missing.push(f); });
    if (missing.length === 0) {
      fnEl.innerHTML = 'Functions: <span style="color:#10b981;">✓ ALL OK</span>';
    } else {
      fnEl.innerHTML = 'Functions: <span style="color:#ef4444;">✗ ' + missing.join(", ") + '</span>';
    }
  }

  if (apiEl) {
    var apis = (typeof UPLOAD_APIS !== "undefined") ? UPLOAD_APIS : [];
    if (apis.length === 0) {
      apiEl.innerHTML = 'Upload APIs: <span style="color:#ef4444;">✗ UPLOAD_APIS tidak ada</span>';
    } else {
      apiEl.innerHTML = 'Upload APIs: <span style="color:#10b981;">✓ ' + apis.length + '</span><br><span style="color:#6b6b85;font-size:10px;">' + apis.join("<br>") + '</span>';
    }
  }

  if (modalEl) {
    var modalBody = document.getElementById("modal-body");
    var isOpen = document.getElementById("modal") && document.getElementById("modal").style.display !== "none";
    var hasUploadField = modalBody ? !!modalBody.querySelector(".upload-field") : false;
    var hasFileInput = modalBody ? !!modalBody.querySelector('input[type="file"]') : false;
    var hasCoverInput = !!document.getElementById("f-cover");
    var hasLabel = modalBody ? !!modalBody.querySelector('label[for$="-file"]') : false;

    modalEl.innerHTML = 'Modal: ' +
      '<span style="color:' + (isOpen ? "#10b981" : "#6b6b85") + ';">' + (isOpen ? "OPEN" : "closed") + '</span> | ' +
      'f-cover: <span style="color:' + (hasCoverInput ? "#10b981" : "#fbbf24") + ';">' + (hasCoverInput ? "✓" : "✗") + '</span> | ' +
      'file: <span style="color:' + (hasFileInput ? "#10b981" : "#fbbf24") + ';">' + (hasFileInput ? "✓" : "✗") + '</span> | ' +
      'upload-field: <span style="color:' + (hasUploadField ? "#10b981" : "#fbbf24") + ';">' + (hasUploadField ? "✓" : "✗") + '</span> | ' +
      'label: <span style="color:' + (hasLabel ? "#10b981" : "#fbbf24") + ';">' + (hasLabel ? "✓" : "✗") + '</span>';
  }
}

/* ==================== TEST FUNCTIONS ==================== */
function testUpload() {
  dbgLog("info", "🧪 Test upload function...");

  if (typeof uploadImageWithFallback !== "function") {
    dbgLog("error", "uploadImageWithFallback TIDAK ADA!");
    return;
  }
  if (typeof UPLOAD_APIS === "undefined" || UPLOAD_APIS.length === 0) {
    dbgLog("error", "UPLOAD_APIS kosong!");
    return;
  }

  dbgLog("success", "✓ uploadImageWithFallback ada");
  dbgLog("info", "APIs: " + UPLOAD_APIS.join(", "));

  UPLOAD_APIS.forEach(function(api, i) {
    dbgLog("info", "Ping API " + (i + 1) + "...");
    fetch(api + "/upload/poster", { method: "OPTIONS" })
      .then(function(r) { dbgLog("success", "API " + (i + 1) + " status: " + r.status); })
      .catch(function(e) { dbgLog("warn", "API " + (i + 1) + " gagal: " + e.message); });
  });
}

function testFileInput() {
  dbgLog("info", "🧪 Test file input...");
  var input = document.getElementById("f-cover-file");
  if (!input) {
    dbgLog("error", "f-cover-file TIDAK ADA! Buka form Tambah Anime dulu.");
    return;
  }
  dbgLog("success", "✓ f-cover-file ada");
  dbgLog("info", "Trigger click...");
  try {
    input.click();
    dbgLog("success", "✓ click() sukses — cek apakah popup file muncul");
  } catch (e) {
    dbgLog("error", "click() error: " + e.message);
  }
}

function testModalFields() {
  dbgLog("info", "🧪 Test modal fields...");
  var modal = document.getElementById("modal");
  var isOpen = modal && modal.style.display !== "none";
  if (!isOpen) {
    dbgLog("warn", "Modal gak kebuka. Klik Tambah Anime dulu di tab Anime.");
    return;
  }
  var fields = ["f-cover", "f-banner", "f-cover-file", "f-banner-file"];
  fields.forEach(function(id) {
    var el = document.getElementById(fid);
    if (el) dbgLog("success", "✓ " + id + " ada");
    else dbgLog("error", "✗ " + id + " TIDAK ADA");
  });
  updateDebugStatus();
}

/* ==================== INTERCEPT ERROR ==================== */
var _origErr = console.error;
console.error = function() {
  var args = Array.prototype.slice.call(arguments);
  var msg = args.map(function(a) {
    if (a instanceof Error) return a.message;
    if (typeof a === "object") try { return JSON.stringify(a); } catch (e) { return String(a); }
    return String(a);
  }).join(" ");
  dbgLog("error", msg);
  _origErr.apply(console, arguments);
};

var _origWarn = console.warn;
console.warn = function() {
  var args = Array.prototype.slice.call(arguments);
  var msg = args.map(function(a) {
    if (typeof a === "object") try { return JSON.stringify(a); } catch (e) { return String(a); }
    return String(a);
  }).join(" ");
  dbgLog("warn", msg);
  _origWarn.apply(console, arguments);
};

window.addEventListener("error", function(e) {
  dbgLog("error", "🔴 " + e.message + " (line " + e.lineno + ")");
});
window.addEventListener("unhandledrejection", function(e) {
  dbgLog("error", "🔴 Promise: " + (e.reason && e.reason.message ? e.reason.message : e.reason));
});

/* ==================== INIT ==================== */
document.addEventListener("DOMContentLoaded", function() {
  eruda.init();
  buildDebugPanel();
  document.getElementById("debug-toggle-btn").addEventListener("click", toggleDebugPanel);
  dbgLog("success", "🎉 Admin + Debug loaded");
  setTimeout(updateDebugStatus, 500);
});

console.log("Debug panel loaded");