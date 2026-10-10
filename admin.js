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

/* ==================== FIREBASE INIT ==================== */
var db = null;
var firebaseReady = false;

function initFirebase() {
  try {
    if (firebase.apps.length === 0) firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
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

var icons = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  diamond: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>'
};

/* ==================== ADMIN STATE ==================== */
var adminCurrentTab = "anime";
var adminData = { anime: [], top: [], users: [], premium: [] };
var currentEditingId = null;

/* ==================== LOGIN ==================== */
function doLogin() {
  var pass = document.getElementById("login-password").value;
  var err = document.getElementById("login-error");
  if (pass === ADMIN_PASSWORD) {
    localStorage.setItem("admin_logged_in", "true");
    showAdmin();
  } else {
    err.textContent = "Password salah!";
    document.getElementById("login-password").value = "";
  }
}
function doLogout() {
  if (!confirm("Logout dari panel admin?")) return;
  localStorage.removeItem("admin_logged_in");
  location.reload();
}
function showAdmin() {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("admin-screen").style.display = "block";
  loadAllAdmin();
}
function checkLogin() {
  if (localStorage.getItem("admin_logged_in") === "true") showAdmin();
  else document.getElementById("login-screen").style.display = "flex";
}
function openUserApp() { window.open("../index.html", "_blank"); }

/* ==================== LOAD ALL ==================== */
async function loadAllAdmin() {
  showToast("Memuat data...");
  try {
    var results = await Promise.all([fbGetAll("anime"), fbGetAll("top"), fbGetAll("users"), fbGetAll("premium_plans")]);
    var anime = results[0] || [], top = results[1] || [], users = results[2] || [], premium = results[3] || [];
    console.log("Loaded:", { anime: anime.length, top: top.length, users: users.length, premium: premium.length });

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
        isAdmin: u.isAdmin === true
      };
    });
    adminData.users.sort(function(a, b) {
      var na = parseInt(String(a.userId).replace("#", "")) || 999999;
      var nb = parseInt(String(b.userId).replace("#", "")) || 999999;
      return na - nb;
    });

    adminData.premium = premium;
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
  return '<div class="admin-item" data-search="' + (a.title || "").toLowerCase() + '">' +
    '<div class="admin-item-thumb"><img src="' + (a.cover || '') + '" alt=""></div>' +
    '<div class="admin-item-body">' +
    '<div class="admin-item-title">' + (a.title || "Tanpa judul") + '</div>' +
    '<div class="admin-item-sub">' + (a.slug || "-") + ' | ' + (a.totalEpisodes || 0) + ' eps | ' + (a.rating || 0) + b + '</div>' +
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
  document.getElementById("modal-title").textContent = id ? "Edit Anime" : "Tambah Anime";
  document.getElementById("modal-body").innerHTML =
    '<div class="form-group"><label class="form-label">Judul *</label><input class="form-input" id="f-title" value="' + (a.title || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Slug</label><input class="form-input" id="f-slug" value="' + (a.slug || '') + '"><div class="form-hint">Auto-generate kalau kosong</div></div>' +
    '<div class="form-group"><label class="form-label">URL Cover</label><input class="form-input" id="f-cover" value="' + (a.cover || '') + '" oninput="previewImg(this.value, \'prev-cover\')"><img id="prev-cover" class="form-preview ' + (a.cover ? 'show' : '') + '" src="' + (a.cover || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">URL Banner</label><input class="form-input" id="f-banner" value="' + (a.banner || '') + '" oninput="previewImg(this.value, \'prev-banner\')"><img id="prev-banner" class="form-preview ' + (a.banner ? 'show' : '') + '" src="' + (a.banner || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Rating</label><input class="form-input" id="f-rating" type="number" step="0.1" value="' + (a.rating || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Studio</label><input class="form-input" id="f-studio" value="' + (a.studio || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Tipe</label><select class="form-select" id="f-type">' +
    '<option value="TV"' + (a.type === "TV" ? " selected" : "") + '>TV</option>' +
    '<option value="Movie"' + (a.type === "Movie" ? " selected" : "") + '>Movie</option>' +
    '<option value="OVA"' + (a.type === "OVA" ? " selected" : "") + '>OVA</option>' +
    '<option value="ONA"' + (a.type === "ONA" ? " selected" : "") + '>ONA</option></select></div>' +
    '<div class="form-group"><label class="form-label">Total Episode</label><input class="form-input" id="f-totalEpisodes" type="number" value="' + (a.totalEpisodes || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Views</label><input class="form-input" id="f-views" type="number" value="' + (a.views || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Tahun</label><input class="form-input" id="f-year" type="number" value="' + (a.year || 2026) + '"></div>' +
    '<div class="form-group"><label class="form-label">Genre (pisah koma)</label><input class="form-input" id="f-genres" value="' + (a.genres || []).join(', ') + '"></div>' +
    '<div class="form-group"><label class="form-label">Sinopsis</label><textarea class="form-textarea" id="f-synopsis">' + (a.synopsis || '') + '</textarea></div>' +
    '<div class="form-group"><label class="form-label">Status</label><select class="form-select" id="f-status">' +
    '<option value="ongoing"' + (a.status === "ongoing" ? " selected" : "") + '>Ongoing</option>' +
    '<option value="completed"' + (a.status === "completed" ? " selected" : "") + '>Completed</option>' +
    '<option value="upcoming"' + (a.status === "upcoming" ? " selected" : "") + '>Upcoming</option></select></div>' +
    '<div class="form-group"><label class="form-label">Hari Update</label><select class="form-select" id="f-updateDay">' +
    ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"].map(function(d) { return '<option value="' + d + '"' + (a.updateDay === d ? " selected" : "") + '>' + d + '</option>'; }).join("") +
    '</select></div>' +
    '<div class="form-group"><label class="form-label">Waktu Update</label><input class="form-input" id="f-updateTime" value="' + (a.updateTime || '') + '"></div>' +
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
function previewImg(url, id) {
  var el = document.getElementById(id);
  if (!el) return;
  if (url) { el.src = url; el.classList.add("show"); }
  else { el.classList.remove("show"); }
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
    type: document.getElementById("f-type").value,
    totalEpisodes: Number(document.getElementById("f-totalEpisodes").value) || 0,
    views: Number(document.getElementById("f-views").value) || 0,
    year: Number(document.getElementById("f-year").value) || 2026,
    genres: document.getElementById("f-genres").value.split(",").map(function(g) { return g.trim(); }).filter(Boolean),
    synopsis: document.getElementById("f-synopsis").value.trim(),
    status: document.getElementById("f-status").value,
    updateDay: document.getElementById("f-updateDay").value,
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
  if (!confirm("Hapus anime " + id + "?")) return;
  var ok = await fbDelete("anime", id);
  if (ok) { showToast("Anime dihapus"); await loadAllAdmin(); }
  else showToast("Gagal hapus");
}

/* ==================== EPISODE ==================== */
function renderEpisodeList(container) {
  container.innerHTML =
    '<div class="admin-toolbar">' +
    '<select class="admin-search" id="ep-anime-select" onchange="loadEpisodesFor(this.value)"><option value="">-- Pilih Anime --</option>' +
    adminData.anime.map(function(a) { return '<option value="' + a.id + '">' + a.title + '</option>'; }).join("") +
    '</select>' +
    '<button class="admin-add-btn" onclick="openFormEpisode()">' + icons.plus + ' Episode</button>' +
    '</div>' +
    '<div class="admin-list" id="episode-list"><div class="admin-empty">Pilih anime dulu</div></div>';
}
async function loadEpisodesFor(animeId) {
  var list = document.getElementById("episode-list");
  if (!animeId) { list.innerHTML = '<div class="admin-empty">Pilih anime dulu</div>'; return; }
  list.innerHTML = '<div class="admin-empty">Memuat episode...</div>';
  var eps = await fbGetSubcollection("anime", animeId, "episode");
  if (eps.length === 0) { list.innerHTML = '<div class="admin-empty">Belum ada episode</div>'; return; }
  list.innerHTML = eps.map(function(e) {
    return '<div class="admin-item">' +
      '<div class="admin-item-thumb" style="font-size:18px;font-weight:800;color:var(--accent);">' + e.id + '</div>' +
      '<div class="admin-item-body"><div class="admin-item-title">' + (e.title || 'Episode ' + e.id) + '</div>' +
      '<div class="admin-item-sub">' + (e.videoUrl ? e.videoUrl.substring(0, 40) + '...' : 'URL kosong') + '</div></div>' +
      '<div class="admin-item-actions">' +
      '<button class="admin-action-btn edit" onclick="openFormEpisode(\'' + animeId + '\', \'' + e.id + '\')">' + icons.edit + '</button>' +
      '<button class="admin-action-btn delete" onclick="deleteEpisode(\'' + animeId + '\', \'' + e.id + '\')">' + icons.trash + '</button>' +
      '</div></div>';
  }).join("");
}
function openFormEpisode(animeId, epId) {
  var slug = animeId || (document.getElementById("ep-anime-select") ? document.getElementById("ep-anime-select").value : "");
  if (!slug) { showToast("Pilih anime dulu"); return; }
  epId = epId || "";
  var autoNum = 1;
  if (!epId) autoNum = document.querySelectorAll("#episode-list .admin-item").length + 1;
  document.getElementById("modal-title").textContent = epId ? "Edit Episode" : "Tambah Episode";
  document.getElementById("modal-body").innerHTML =
    '<div class="form-group"><label class="form-label">Anime</label><input class="form-input" value="' + slug + '" disabled></div>' +
    '<div class="form-group"><label class="form-label">Nomor Episode</label><input class="form-input" id="e-number" type="number" value="' + (epId || autoNum) + '"' + (epId ? ' disabled' : '') + '></div>' +
    '<div class="form-group"><label class="form-label">Judul</label><input class="form-input" id="e-title"></div>' +
    '<div class="form-group"><label class="form-label">URL Video *</label><input class="form-input" id="e-videoUrl"></div>' +
    '<div class="form-group"><label class="form-label">Durasi (detik)</label><input class="form-input" id="e-duration" type="number" value="1440"></div>' +
    '<div class="form-actions"><button class="form-btn form-btn-cancel" onclick="closeModal()">Batal</button><button class="form-btn form-btn-save" onclick="saveEpisode(\'' + slug + '\', \'' + epId + '\')">Simpan</button></div>';
  if (epId) {
    (async function() {
      var ep = await fbGetOneSub("anime", slug, "episode", epId);
      if (ep) {
        document.getElementById("e-title").value = ep.title || "";
        document.getElementById("e-videoUrl").value = ep.videoUrl || "";
        document.getElementById("e-duration").value = ep.duration || 1440;
      }
    })();
  }
  openModal();
}
async function saveEpisode(animeId, epId) {
  var number = epId || document.getElementById("e-number").value;
  if (!number) { showToast("Nomor episode wajib"); return; }
  var data = {
    title: document.getElementById("e-title").value.trim() || ("Episode " + number),
    videoUrl: document.getElementById("e-videoUrl").value.trim(),
    duration: Number(document.getElementById("e-duration").value) || 1440
  };
  showToast("Menyimpan...");
  var ok = await fbSetSub("anime", animeId, "episode", String(number), data, true);
  if (ok) { showToast(epId ? "Episode diperbarui" : "Episode disimpan"); closeModal(); await loadEpisodesFor(animeId); }
  else showToast("Gagal");
}
async function deleteEpisode(animeId, epId) {
  if (!confirm("Hapus episode " + epId + "?")) return;
  var ok = await fbDeleteSub("anime", animeId, "episode", epId);
  if (ok) { showToast("Episode dihapus"); await loadEpisodesFor(animeId); }
  else showToast("Gagal");
}

/* ==================== TOP ==================== */
function renderTopList(container) {
  container.innerHTML =
    '<div class="admin-toolbar">' +
    '<select class="admin-search" id="top-type-filter" onchange="renderTopListFiltered()">' +
    '<option value="">Semua Tipe</option><option value="giveaway">Giveaway (Manual)</option>' +
    '<option value="level">Level (Auto)</option><option value="rank">Rank (Auto)</option>' +
    '<option value="clan">Clan (Manual)</option></select>' +
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
  var filter = filterEl ? filterEl.value : "";
  var list = [];
  if (filter === "level" || filter === "rank") {
    var sorted = adminData.users.slice().sort(function(a, b) { return (b.xp || 0) - (a.xp || 0); });
    list = sorted.slice(0, 20).map(function(u, i) {
      return { id: "auto-" + u.id, type: filter, rank: i + 1, name: u.username, avatar: u.avatar, tag: u.rank || "Member", score: formatXP(u.xp || 0) + " XP", isAuto: true };
    });
  } else if (filter === "giveaway" || filter === "clan") {
    list = adminData.top.filter(function(t) { return t.type === filter; });
  } else {
    var sorted = adminData.users.slice().sort(function(a, b) { return (b.xp || 0) - (a.xp || 0); });
    var autoList = sorted.slice(0, 20).map(function(u, i) {
      return { id: "auto-level-" + u.id, type: "level", rank: i + 1, name: u.username, avatar: u.avatar, tag: u.rank || "Member", score: formatXP(u.xp || 0) + " XP", isAuto: true };
    });
    list = adminData.top.concat(autoList);
  }
  if (list.length === 0) return '<div class="admin-empty">Belum ada data</div>';
  return list.map(function(t) {
    return '<div class="admin-item">' +
      '<div class="admin-item-thumb"><img src="' + (t.avatar || '') + '" alt=""></div>' +
      '<div class="admin-item-body"><div class="admin-item-title">' + (t.name || '-') + ' ' + (t.isAuto ? '<span>AUTO</span>' : '') + '</div>' +
      '<div class="admin-item-sub">' + t.type + ' | Rank ' + t.rank + ' | ' + (t.score || '-') + '</div></div>' +
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
    '<div class="form-group"><label class="form-label">Tipe</label><select class="form-select" id="t-type">' +
    '<option value="giveaway"' + (t.type === "giveaway" ? " selected" : "") + '>Giveaway</option>' +
    '<option value="clan"' + (t.type === "clan" ? " selected" : "") + '>Clan</option></select></div>' +
    '<div class="form-group"><label class="form-label">Rank</label><input class="form-input" id="t-rank" type="number" value="' + (t.rank || 1) + '"></div>' +
    '<div class="form-group"><label class="form-label">Nama *</label><input class="form-input" id="t-name" value="' + (t.name || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">URL Avatar</label><input class="form-input" id="t-avatar" value="' + (t.avatar || '') + '" oninput="previewImg(this.value, \'prev-avatar\')"><img id="prev-avatar" class="form-preview ' + (t.avatar ? 'show' : '') + '" src="' + (t.avatar || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Tag</label><input class="form-input" id="t-tag" value="' + (t.tag || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Score</label><input class="form-input" id="t-score" value="' + (t.score || '') + '"></div>' +
    '<div class="form-actions"><button class="form-btn form-btn-cancel" onclick="closeModal()">Batal</button><button class="form-btn form-btn-save" onclick="saveTop()">Simpan</button></div>';
  openModal();
}
async function saveTop() {
  var data = {
    type: document.getElementById("t-type").value,
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
  if (!confirm("Hapus data top ini?")) return;
  var ok = await fbDelete("top", id);
  if (ok) { showToast("Dihapus"); await loadAllAdmin(); }
  else showToast("Gagal");
}

/* ==================== USERS ==================== */
function renderUsersList(container) {
  container.innerHTML =
    '<div class="admin-toolbar">' +
    '<div style="flex:1;font-size:13px;color:var(--text-mute);">Total: ' + adminData.users.length + ' user</div>' +
    '<button class="admin-add-btn" onclick="openFormUser()">' + icons.plus + ' Tambah</button>' +
    '</div>' +
    '<div class="admin-list">' +
    (adminData.users.length === 0 ? '<div class="admin-empty">Belum ada user</div>' : adminData.users.map(userAdminItemHTML).join("")) +
    '</div>';
}

function userAdminItemHTML(u) {
  var vh = u.verified ? '<img class="verified-inline" src="' + u.verified + '" alt="">' : "";
  var premiumBadge = u.isPremium ? '<span style="color:var(--gold);font-weight:800;"> PREMIUM</span>' : "";
  var adminBadge = u.isAdmin ? '<span style="color:var(--accent-2);font-weight:800;"> ADMIN</span>' : "";

  return '<div class="admin-item" style="flex-direction:column;align-items:stretch;">' +
    '<div style="display:flex;gap:12px;align-items:center;">' +
    '<div class="admin-item-thumb"><img src="' + (u.avatar || '') + '" alt=""></div>' +
    '<div class="admin-item-body"><div class="admin-item-title">' + (u.username || '-') + ' ' + vh + ' <span>' + (u.userId || '') + '</span>' + premiumBadge + adminBadge + '</div>' +
    '<div class="admin-item-sub">Lvl ' + u.level + ' | ' + u.rank + ' | ' + formatXP(u.xp || 0) + ' XP' + (u.isDefault ? ' | Default' : '') + '</div></div>' +
    '<div class="admin-item-actions">' +
    '<button class="admin-action-btn edit" onclick="openFormUser(\'' + u.id + '\')">' + icons.edit + '</button>' +
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

  // Kalau Premium ON, otomatis Verified ON (kecuali verified udah ada)
  if (fieldName === "isPremium" && newValue === true) {
    var idxCheck = adminData.users.findIndex(function(u) { return u.id === userId; });
    if (idxCheck > -1 && !adminData.users[idxCheck].verified) {
      updateData.verified = VERIFIED_ICON_URL;
    }
  }

  // Kalau Premium OFF, hapus Verified (kalau verified = VERIFIED_ICON_URL)
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
      if (updateData.verified !== undefined) {
        adminData.users[idx].verified = updateData.verified;
      }
    }
    showToast(label + " " + (newValue ? "aktif" : "nonaktif"));
    var c = document.getElementById("admin-content");
    if (c) renderUsersList(c);
  } else {
    showToast("Gagal update");
  }
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
    '<div class="form-group"><label class="form-label">User ID</label><input class="form-input" id="u-userId" value="' + (u.userId || '') + '"' + (id ? ' disabled' : '') + '></div>' +
    '<div class="form-group"><label class="form-label">Username *</label><input class="form-input" id="u-username" value="' + (u.username || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">URL Avatar</label><input class="form-input" id="u-avatar" value="' + (u.avatar || '') + '" oninput="previewImg(this.value, \'prev-uavatar\')"><img id="prev-uavatar" class="form-preview ' + (u.avatar ? 'show' : '') + '" src="' + (u.avatar || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">XP</label><input class="form-input" id="u-xp" type="number" value="' + cx + '" oninput="updateUserPreview()"><div class="form-hint" id="u-xp-hint">Lvl ' + cl + ' | ' + cr.name + ' | ' + n.progress + '/' + n.needed + ' XP (' + n.percent + '%)</div></div>' +
    '<div class="form-group"><label class="form-label">Followers</label><input class="form-input" id="u-followers" type="number" value="' + (u.followers || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Total Nonton (menit)</label><input class="form-input" id="u-watchMinutes" type="number" value="' + (u.watchMinutes || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Jumlah Komentar</label><input class="form-input" id="u-comments" type="number" value="' + (u.comments || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Jumlah Riwayat</label><input class="form-input" id="u-historyCount" type="number" value="' + (u.historyCount || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Lama Bergabung (bulan)</label><input class="form-input" id="u-joinedMonths" type="number" value="' + (u.joinedMonths || 1) + '"></div>' +
    '<div class="form-group"><label class="form-label">Badges (pisah koma)</label><input class="form-input" id="u-badges" value="' + (u.badges || []).join(', ') + '"></div>' +
    '<div class="form-group"><label class="form-label">Default User?</label><select class="form-select" id="u-isDefault"><option value="false"' + (!u.isDefault ? " selected" : "") + '>Tidak</option><option value="true"' + (u.isDefault ? " selected" : "") + '>Ya</option></select></div>' +
    '<div class="admin-toggle-row"><div class="admin-toggle-info"><div class="admin-toggle-title">Premium</div><div class="admin-toggle-desc">Auto dapet Verified, akses stiker, ganti banner, kualitas max</div></div><div class="admin-toggle ' + (u.isPremium ? 'on' : '') + '" id="u-premium" onclick="toggleAdminField(\'u-premium\')"><span class="admin-toggle-text">' + (u.isPremium ? 'ON' : 'OFF') + '</span><div class="admin-toggle-switch"></div></div></div>' +
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
    isDefault: document.getElementById("u-isDefault").value === "true",
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
  if (!confirm("Hapus user ini?")) return;
  var ok = await fbDelete("users", id);
  if (ok) { showToast("User dihapus"); await loadAllAdmin(); }
  else showToast("Gagal");
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
          '<div class="admin-item-body"><div class="admin-item-title">' + (p.name || '-') + '</div>' +
          '<div class="admin-item-sub">' + (p.price || '-') + ' ' + (p.period || '') + (p.popular ? ' | Populer' : '') + '</div></div>' +
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
    '<div class="form-group"><label class="form-label">Nama Paket *</label><input class="form-input" id="p-name" value="' + (p.name || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Harga</label><input class="form-input" id="p-price" value="' + (p.price || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Harga (angka)</label><input class="form-input" id="p-priceNum" type="number" value="' + (p.priceNum || 0) + '"></div>' +
    '<div class="form-group"><label class="form-label">Periode</label><input class="form-input" id="p-period" value="' + (p.period || '') + '"></div>' +
    '<div class="form-group"><label class="form-label">Fitur (pisah koma)</label><input class="form-input" id="p-features" value="' + (p.features || []).join(', ') + '"></div>' +
    '<div class="form-group"><label class="form-label">Populer?</label><select class="form-select" id="p-popular"><option value="false"' + (!p.popular ? " selected" : "") + '>Tidak</option><option value="true"' + (p.popular ? " selected" : "") + '>Ya</option></select></div>' +
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
    popular: document.getElementById("p-popular").value === "true"
  };
  var ok;
  if (currentEditingId) ok = await fbUpdate("premium_plans", currentEditingId, data);
  else ok = await fbSet("premium_plans", "plan-" + Date.now(), data);
  if (ok) { showToast(currentEditingId ? "Paket diperbarui" : "Paket disimpan"); closeModal(); await loadAllAdmin(); }
  else showToast("Gagal");
}
async function deletePremium(id) {
  if (!confirm("Hapus paket ini?")) return;
  var ok = await fbDelete("premium_plans", id);
  if (ok) { showToast("Dihapus"); await loadAllAdmin(); }
  else showToast("Gagal");
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
}

/* ==================== INIT ==================== */
console.log("Admin script loaded. firebaseReady:", firebaseReady);
checkLogin();