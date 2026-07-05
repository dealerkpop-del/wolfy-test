document.addEventListener("DOMContentLoaded", () => {

let money = 500;
let gems = 500;
let collection = {};
let packInventory = [];
let activeWolves = [];
let currentPage = 1;
const CARDS_PER_PAGE = 9;
const MAX_OPENING_SLOTS = 10;

const PACK_TYPES = {
  classics: { price: 100, duration: 5000, name: "The Classics" },
  colorful: { price: 1200, duration: 30000, name: "Colorful & Powerful" },
  unforgettable: { price: 14000, duration: 60000, name: "Unforgettable Fashion" },
  birthday: { price: 6210, duration: 30000, name: "Happy Birthday Felix" },
  flower: { price: 164000, duration: 150000, name: "Flower Garden" }
};

// ============ POOLS CON bgClass ============
const classicsPool = [
  { cardKey: "lobito", name: "🐺 Lobito", baseIncome: 2, rarity: "common", tags: [] },
  { cardKey: "cachorrito", name: "🐶 Cachorrito", baseIncome: 3, rarity: "common", tags: [] },
  { cardKey: "paletero", name: "🍦 Lobito Paletero", baseIncome: 4, rarity: "rare", tags: [] },
  { cardKey: "espadachin", name: "⚔️ Lobito Espadachín", baseIncome: 6, rarity: "epic", tags: [] },
  { cardKey: "resortero", name: "🪃 Lobito Resortero", baseIncome: 8, rarity: "legendary", tags: [] }
];

const colorfulPool = [
  { cardKey: "bobina_velocidad", name: "⚡ Lobito Bobina Velocidad", baseIncome: 50, rarity: "rare", tags: [], bgClass: "bg-colorful-custom" },
  { cardKey: "bobina_gravitacional", name: "🌀 Lobito Bobina Gravitacional", baseIncome: 75, rarity: "epic", tags: [], bgClass: "bg-colorful-custom" },
  { cardKey: "bobina_regenerativa", name: "💚 Lobito Bobina Regenerativa", baseIncome: 60, rarity: "epic", tags: [], bgClass: "bg-colorful-custom" },
  { cardKey: "lobito_blue", name: " Lobito [Blue Team]", baseIncome: 10, rarity: "rare", tags: ["Blue Team"] },
  { cardKey: "paletero_blue", name: "🔵 Paletero [Blue Team]", baseIncome: 15, rarity: "rare", tags: ["Blue Team"] },
  { cardKey: "espadachin_blue", name: "🔵 Espadachín [Blue Team]", baseIncome: 25, rarity: "epic", tags: ["Blue Team"] },
  { cardKey: "resortero_blue", name: " Resortero [Blue Team]", baseIncome: 35, rarity: "epic", tags: ["Blue Team"] },
  { cardKey: "lobito_red", name: "🔴 Lobito [Red Team]", baseIncome: 10, rarity: "rare", tags: ["Red Team"] },
  { cardKey: "paletero_red", name: "🔴 Paletero [Red Team]", baseIncome: 15, rarity: "rare", tags: ["Red Team"] },
  { cardKey: "espadachin_red", name: "🔴 Espadachín [Red Team]", baseIncome: 25, rarity: "epic", tags: ["Red Team"] },
  { cardKey: "resortero_red", name: "🔴 Resortero [Red Team]", baseIncome: 35, rarity: "epic", tags: ["Red Team"] },
  { cardKey: "cachorrito_colorless", name: "⚪ Cachorrito [Colorless]", baseIncome: 100, rarity: "legendary", tags: ["Colorless"] }
];

const unforgettablePool = [
  { cardKey: "uf_lobito", name: " Lobito", baseIncome: 3, rarity: "common", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_boinero", name: "🎩 Lobito Boinero", baseIncome: 4, rarity: "common", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_pantalonero", name: " Lobito Pantalonero", baseIncome: 10, rarity: "rare", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_fresco", name: "🪮 Lobito Fresco", baseIncome: 18, rarity: "rare", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_marinerito", name: "⚓ Lobito Marinerito", baseIncome: 14, rarity: "rare", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_timido", name: "😳 Lobito Tímido", baseIncome: 8, rarity: "common", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_callejero", name: "🏙️ Lobito Callejero", baseIncome: 12, rarity: "rare", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_estiloso", name: "💅 Lobito Estiloso", baseIncome: 20, rarity: "epic", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_curiosa", name: "🔍 Lobita Curiosa", baseIncome: 22, rarity: "common", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_softcore", name: " Lobito SoftCore", baseIncome: 35, rarity: "rare", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_brownie", name: "🍫 Lobito Brownie", baseIncome: 50, rarity: "rare", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_esponjoso", name: "☁️ Lobito Esponjosito", baseIncome: 30, rarity: "epic", tags: ["Unforgettable Fashion"] },
  { cardKey: "uf_alfa", name: " Lobito Alfa Supremo", baseIncome: 500, rarity: "legendary", tags: ["Unforgettable Fashion"] }
];

const birthdayPool = [
  { cardKey: "felix_v1", name: "🎈 Lobito [Vol.1]", baseIncome: 150, rarity: "rare", tags: ["Felix Birthday"], bgClass: "bg-felix-1" },
  { cardKey: "felix_cach_v1", name: "🎈 Cachorrito [Vol.1]", baseIncome: 225, rarity: "epic", tags: ["Felix Birthday"], bgClass: "bg-felix-1" },
  { cardKey: "felix_v2", name: " Lobito [Vol.2]", baseIncome: 150, rarity: "rare", tags: ["Felix Birthday"], bgClass: "bg-felix-2" },
  { cardKey: "felix_cach_v2", name: "🎈 Cachorrito [Vol.2]", baseIncome: 225, rarity: "epic", tags: ["Felix Birthday"], bgClass: "bg-felix-2" },
  { cardKey: "felix_v3", name: "🎈 Lobito [Vol.3]", baseIncome: 150, rarity: "rare", tags: ["Felix Birthday"], bgClass: "bg-felix-2" },
  { cardKey: "felix_cach_v3", name: "🎈 Cachorrito [Vol.3]", baseIncome: 225, rarity: "epic", tags: ["Felix Birthday"], bgClass: "bg-felix-2" },
  { cardKey: "felix_special", name: "🎂 Lobito Felix [20]", baseIncome: 2106, rarity: "legendary", tags: ["Felix Birthday"], bgClass: "bg-felix-1" }
];

const flowerPool = [
  { cardKey: "flower_lobito", name: "🌷 Lobito [Flower Garden]", baseIncome: 200, rarity: "common", tags: ["Flower Garden"], bgClass: "bg-flower-common" },
  { cardKey: "flower_cachorrito", name: "🌿 Cachorrito Nenúfar", baseIncome: 250, rarity: "common", tags: ["Flower Garden"], bgClass: "bg-flower-common" },
  { cardKey: "flower_pasto", name: " Lobito Pasto", baseIncome: 220, rarity: "common", tags: ["Flower Garden"], bgClass: "bg-flower-common" },
  { cardKey: "flower_jardinero", name: "🌻 Lobito Jardinero", baseIncome: 400, rarity: "rare", tags: ["Flower Garden"], bgClass: "bg-flower-rare" },
  { cardKey: "flower_girasol", name: "🌼 Cachorrito Girasol", baseIncome: 450, rarity: "rare", tags: ["Flower Garden"], bgClass: "bg-flower-rare" },
  { cardKey: "flower_sakura_cach", name: "🌸 Cachorrito Flor de Sakura", baseIncome: 700, rarity: "epic", tags: ["Flower Garden"], bgClass: "bg-flower-epic" },
  { cardKey: "flower_cactus", name: "🌵 Lobito Cactus", baseIncome: 750, rarity: "epic", tags: ["Flower Garden"], bgClass: "bg-flower-epic" },
  { cardKey: "flower_margarita", name: "🌼 Lobita Margarita", baseIncome: 800, rarity: "epic", tags: ["Flower Garden"], bgClass: "bg-flower-epic" },
  { cardKey: "flower_primaveral", name: "🌷 Lobito Primaveral", baseIncome: 1500, rarity: "legendary", tags: ["Flower Garden"], bgClass: "bg-flower-legendary" },
  { cardKey: "flower_sakura", name: "🌸 Lobita Flor de Sakura", baseIncome: 1800, rarity: "legendary", tags: ["Flower Garden"], bgClass: "bg-flower-legendary" },
  { cardKey: "flower_lirio", name: "🤍 Lobita Lirio Blanco", baseIncome: 2000, rarity: "legendary", tags: ["Flower Garden"], bgClass: "bg-flower-legendary" }
];

// ============ FUNCIONES ============
function getIncomePerSecond(card) {
  return Math.floor(card.baseIncome * (card.level + 1) / 2);
}

function checkLevelUp(card) {
  let leveled = false;
  while (card.copies >= Math.pow(2, card.level + 1) - 1) {
    card.level++;
    leveled = true;
  }
  return leveled;
}

function getNextLevelRequirement(card) {
  const needed = Math.pow(2, card.level + 1) - 1;
  return needed - card.copies;
}

function rollCardFromPool(pool, packType) {
  const r = Math.random() * 100;
  let targetRarity;
  
  if (packType === "classics") {
    if (r < 2) targetRarity = "legendary";
    else if (r < 12) targetRarity = "epic";
    else if (r < 42) targetRarity = "rare";
    else targetRarity = "common";
  } else if (packType === "colorful") {
    if (r < 3) targetRarity = "legendary";
    else if (r < 35) targetRarity = "epic";
    else targetRarity = "rare";
  } else if (packType === "unforgettable") {
    if (r < 3) targetRarity = "legendary";
    else if (r < 15) targetRarity = "epic";
    else if (r < 50) targetRarity = "rare";
    else targetRarity = "common";
  } else if (packType === "birthday") {
    if (r < 4) targetRarity = "legendary";
    else if (r < 30) targetRarity = "epic";
    else targetRarity = "rare";
  } else if (packType === "flower") {
    if (r < 5) targetRarity = "legendary";
    else if (r < 25) targetRarity = "epic";
    else if (r < 60) targetRarity = "rare";
    else targetRarity = "common";
  }
  
  const filtered = pool.filter(c => c.rarity === targetRarity);
  const usePool = filtered.length > 0 ? filtered : pool.filter(c => c.rarity === "common");
  return JSON.parse(JSON.stringify(usePool[Math.floor(Math.random() * usePool.length)]));
}

window.buyPack = function(packType) {
  const pack = PACK_TYPES[packType];
  if (money < pack.price) {
    alert(`❌ Dinero insuficiente. Necesitas $${pack.price}.`);
    return;
  }
  money -= pack.price;
  
  let pool;
  if (packType === "classics") pool = classicsPool;
  else if (packType === "colorful") pool = colorfulPool;
  else if (packType === "unforgettable") pool = unforgettablePool;
  else if (packType === "birthday") pool = birthdayPool;
  else pool = flowerPool;
  
  const card = rollCardFromPool(pool, packType);
  
  packInventory.push({
    id: Date.now() + Math.random(),
    type: packType,
    startedAt: null,
    duration: pack.duration,
    status: "waiting",
    card: card
  });
  
  renderAll();
  saveGame();
};

function startOpening(packId) {
  const openingCount = packInventory.filter(p => p.status === "opening").length;
  if (openingCount >= MAX_OPENING_SLOTS) {
    alert(`❌ Máximo ${MAX_OPENING_SLOTS} paquetes abriéndose al mismo tiempo.`);
    return;
  }
  
  const pack = packInventory.find(p => p.id === packId);
  if (!pack || pack.status !== "waiting") return;
  
  pack.status = "opening";
  pack.startedAt = Date.now();
  renderAll();
  saveGame();
}

function collectCard(packId) {
  const pack = packInventory.find(p => p.id === packId);
  if (!pack || pack.status !== "ready") return;
  
  const card = pack.card;
  
  if (!collection[card.cardKey]) {
    collection[card.cardKey] = {
      name: card.name,
      baseIncome: card.baseIncome,
      level: 1,
      copies: 0,
      pendingMoney: 0,
      lastCollect: Date.now(),
      rarity: card.rarity,
      tags: card.tags || [],
      bgClass: card.bgClass || '' // ¡IMPORTANTE! Guarda el fondo
    };
  }
  
  collection[card.cardKey].copies++;
  const leveled = checkLevelUp(collection[card.cardKey]);
  
  packInventory = packInventory.filter(p => p.id !== packId);
  
  if (leveled) {
    alert(` ¡${card.name} subió a LvL.${collection[card.cardKey].level}!`);
  }
  
  renderAll();
  saveGame();
}

window.collectCardIncome = function(cardKey) {
  const card = collection[cardKey];
  if (!card) return;
  
  updatePendingMoney(card);
  
  if (card.pendingMoney <= 0) return;
  
  money += Math.floor(card.pendingMoney);
  card.pendingMoney = 0;
  card.lastCollect = Date.now();
  
  const el = document.querySelector(`[data-card-key="${cardKey}"]`);
  if (el) {
    el.classList.add('collecting');
    setTimeout(() => el.classList.remove('collecting'), 300);
  }
  
  renderAll();
  saveGame();
};

function updatePendingMoney(card) {
  const now = Date.now();
  const elapsed = (now - card.lastCollect) / 1000;
  const income = getIncomePerSecond(card);
  card.pendingMoney += income * elapsed;
  card.lastCollect = now;
}

window.equipCard = function(cardKey) {
  const card = collection[cardKey];
  if (!card) return;
  activeWolves.push({ cardKey, name: card.name });
  renderAll();
  saveGame();
};

window.unequipCard = function(index) {
  activeWolves.splice(index, 1);
  renderAll();
  saveGame();
}

window.changePage = function(delta) {
  const totalPages = Math.max(1, Math.ceil(Object.keys(collection).length / CARDS_PER_PAGE));
  currentPage = Math.max(1, Math.min(totalPages, currentPage + delta));
  renderBinder();
};

function renderSlots() {
  const grid = document.getElementById("slotsGrid");
  grid.innerHTML = "";
  
  const now = Date.now();
  packInventory.forEach(pack => {
    if (pack.status === "opening" && pack.startedAt) {
      const elapsed = now - pack.startedAt;
      if (elapsed >= pack.duration) {
        pack.status = "ready";
      }
    }
  });
  
  const slotsToShow = packInventory.slice(0, 20);
  
  if (slotsToShow.length === 0) {
    grid.innerHTML = '<div class="empty-msg">No tienes paquetes. ¡Compra uno en la tienda!</div>';
    return;
  }
  
  slotsToShow.forEach(pack => {
    const slot = document.createElement("div");
    slot.className = `slot ${pack.status}`;
    
    const packInfo = PACK_TYPES[pack.type];
    let icon = '✨';
    if (pack.type === 'classics') icon = '📦';
    else if (pack.type === 'colorful') icon = '🌈';
    else if (pack.type === 'birthday') icon = '🎂';
    else if (pack.type === 'flower') icon = '🌸';
    
    let content = `<div class="slot-icon">${icon}</div>`;
    content += `<div style="font-size:11px;font-weight:bold">${packInfo.name}</div>`;
    
    if (pack.status === "waiting") {
      content += `<div class="slot-timer">Clickea para abrir</div>`;
      slot.onclick = () => startOpening(pack.id);
    } else if (pack.status === "opening") {
      const elapsed = now - pack.startedAt;
      const progress = Math.min(100, (elapsed / pack.duration) * 100);
      const remaining = Math.max(0, Math.ceil((pack.duration - elapsed) / 1000));
      content += `<div class="slot-progress"><div class="slot-progress-fill" style="width:${progress}%"></div></div>`;
      content += `<div class="slot-timer">${remaining}s</div>`;
    } else if (pack.status === "ready") {
      content += `<div style="color:#ff69b4;font-size:11px;font-weight:bold;margin-top:5px">¡LISTO!</div>`;
      content += `<div style="font-size:10px;color:#aaa;margin-top:3px">Clickea para recolectar</div>`;
      slot.onclick = () => collectCard(pack.id);
    }
    
    slot.innerHTML = content;
    grid.appendChild(slot);
  });
}

function renderBinder() {
  const grid = document.getElementById("binderGrid");
  grid.innerHTML = "";
  
  const keys = Object.keys(collection);
  const totalPages = Math.max(1, Math.ceil(keys.length / CARDS_PER_PAGE));
  
  if (currentPage > totalPages) currentPage = totalPages;
  
  document.getElementById("currentPage").innerText = currentPage;
  document.getElementById("totalPages").innerText = totalPages;
  document.getElementById("prevPageBtn").disabled = currentPage <= 1;
  document.getElementById("nextPageBtn").disabled = currentPage >= totalPages;
  
  if (keys.length === 0) {
    grid.innerHTML = '<div class="empty-msg">Tu colección está vacía. ¡Abre paquetes para llenarla!</div>';
    return;
  }
  
  const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
  const pageKeys = keys.slice(startIdx, startIdx + CARDS_PER_PAGE);
  
  pageKeys.forEach(cardKey => {
    const card = collection[cardKey];
    updatePendingMoney(card);
    
    const div = document.createElement("div");
    // ¡AQUÍ SE APLICA EL FONDO!
    const bgClass = card.bgClass || '';
    div.className = `binder-card rarity-${card.rarity} ${bgClass} ${card.pendingMoney > 0 ? 'has-pending' : ''}`;
    div.setAttribute('data-card-key', cardKey);
    div.onclick = () => collectCardIncome(cardKey);
    
    const income = getIncomePerSecond(card);
    const pending = Math.floor(card.pendingMoney);
    const nextLevel = getNextLevelRequirement(card);
    
    let tagsHtml = '';
    if (card.tags && card.tags.length > 0) {
      tagsHtml = '<div class="card-tags">' + card.tags.map(t => {
        const cls = t === 'Flower Garden' ? 'tag-flower' :
                    t === 'Felix Birthday' ? 'tag-felix' :
                    t === 'Unforgettable Fashion' ? 'tag-unforgettable' :
                    t === 'Blue Team' ? 'tag-blue' :
                    t === 'Red Team' ? 'tag-red' :
                    t === 'Colorless' ? 'tag-colorless' :
                    t === 'Birthday' ? 'tag-birthday' : '';
        return `<span class="tag ${cls}">${t}</span>`;
      }).join('') + '</div>';
    }
    
    div.innerHTML = `
      <div class="card-level" title="Nivel ${card.level}">Lv${card.level}</div>
      <div class="card-copies" title="${nextLevel} copias para LvL.${card.level + 1}">x${card.copies}</div>
      <div class="card-name">${card.name}</div>
      ${tagsHtml}
      <div class="card-income">💰 $${income}/s</div>
      ${pending > 0 ? `<div class="card-pending">+$${pending.toLocaleString()}</div>` : ''}
    `;
    
    grid.appendChild(div);
  });
}

function renderActiveWolves() {
  const el = document.getElementById("activeWolves");
  el.innerHTML = "";
  
  if (activeWolves.length === 0) {
    el.innerHTML = '<div class="empty-msg">No tienes lobitos activos. Haz clic en "Equipar" en tu colección.</div>';
    return;
  }
  
  activeWolves.forEach((wolf, i) => {
    const card = collection[wolf.cardKey];
    if (!card) return;
    const income = getIncomePerSecond(card);
    
    const div = document.createElement("div");
    div.className = `binder-card rarity-${card.rarity}`;
    div.innerHTML = `
      <div class="card-name">${card.name}</div>
      <div class="card-income">💰 $${income}/s</div>
      <button onclick="unequipCard(${i})" style="margin-top:5px;font-size:10px;padding:3px 6px">Quitar</button>
    `;
    el.appendChild(div);
  });
  
  const unEquippedCount = Object.keys(collection).length - activeWolves.length;
  if (unEquippedCount > 0) {
    const equipDiv = document.createElement("div");
    equipDiv.className = "binder-card";
    equipDiv.style.border = "2px dashed #00ff88";
    equipDiv.style.cursor = "pointer";
    equipDiv.innerHTML = `
      <div style="font-size:11px">Equipar todas<br>las cartas</div>
      <div style="color:#00ff88;font-size:10px;margin-top:5px">+${unEquippedCount} cartas</div>
    `;
    equipDiv.onclick = () => {
      Object.keys(collection).forEach(key => {
        if (!activeWolves.find(w => w.cardKey === key)) {
          activeWolves.push({ cardKey: key, name: collection[key].name });
        }
      });
      renderAll();
      saveGame();
    };
    el.appendChild(equipDiv);
  }
}

function renderUI() {
  document.getElementById("money").innerText = Math.floor(money).toLocaleString();
  document.getElementById("gems").innerText = gems;
  document.getElementById("slotsUsed").innerText = packInventory.filter(p => p.status === "opening").length;
}

function renderAll() {
  renderUI();
  renderSlots();
  renderBinder();
  renderActiveWolves();
}

window.saveGame = function() {
  Object.values(collection).forEach(updatePendingMoney);
  
  localStorage.setItem("wolfyCardCollection", JSON.stringify({
    money, gems, collection, packInventory, activeWolves, currentPage
  }));
};

function loadGame() {
  const data = JSON.parse(localStorage.getItem("wolfyCardCollection") || "null");
  if (!data) return;
  money = data.money ?? 500;
  gems = data.gems ?? 500;
  collection = data.collection ?? {};
  packInventory = data.packInventory ?? [];
  activeWolves = data.activeWolves ?? [];
  currentPage = data.currentPage ?? 1;
  
  const now = Date.now();
  packInventory.forEach(pack => {
    if (pack.status === "opening" && pack.startedAt) {
      const elapsed = now - pack.startedAt;
      if (elapsed >= pack.duration) {
        pack.status = "ready";
      }
    }
  });
  
  Object.values(collection).forEach(card => {
    if (!card.lastCollect) card.lastCollect = now;
    updatePendingMoney(card);
  });
}

window.loadGameAndRender = function() {
  loadGame();
  renderAll();
};

window.resetGame = function() {
  if (!confirm("¿Borrar TODO el progreso?")) return;
  localStorage.removeItem("wolfyCardCollection");
  money = 500;
  gems = 500;
  collection = {};
  packInventory = [];
  activeWolves = [];
  currentPage = 1;
  renderAll();
};

setInterval(() => {
  renderSlots();
  renderUI();
}, 1000);

setInterval(() => {
  renderBinder();
  saveGame();
}, 2000);

loadGame();
renderAll();

});
