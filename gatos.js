const STORAGE_KEY = "miau_e_grao_v2";

// 1. LISTA DE GATOS (edite aqui os moradores da cafeteria)
const INITIAL_CATS = [
  {
    id: "pacoca",
    name: "Paçoca",
    age: "1 ano e 2 meses",
    sex: "Macho • Castrado",
    status: "disponivel",
    furColor: "#e08e45",
    patchColor: "#fff6eb",
    eyeColor: "#2e7d5b",
    traits: ["Ama colo", "Dócil"],
    story: "Adora dormir perto da máquina de espresso e ronronar no colo.",
    goalTitle: "Arranhador Torre",
    goalCurrent: 180,
    goalTarget: 250,
  },
  {
    id: "capitu",
    name: "Capitu",
    age: "8 meses",
    sex: "Fêmea • Castrada",
    status: "disponivel",
    furColor: "#3b3330",
    patchColor: "#d99b66",
    eyeColor: "#d4a017",
    traits: ["Curiosa", "Brincalhona"],
    story: "Ama bolinhas de papel e observar a rua pela janela.",
    goalTitle: "Vacina Anual V4",
    goalCurrent: 140,
    goalTarget: 200,
  },
  {
    id: "mingau",
    name: "Mingau",
    age: "2 anos",
    sex: "Macho • Castrado",
    status: "disponivel",
    furColor: "#f5f2ed",
    patchColor: "#d8cfc4",
    eyeColor: "#4b86b4",
    traits: ["Calmo", "Ideal p/ apartamento"],
    story: "Tranquilo e carinhoso assim que ganha confiança com petiscos.",
    goalTitle: "Kit Sachês Gourmet",
    goalCurrent: 90,
    goalTarget: 120,
  },
  {
    id: "canela",
    name: "Canela",
    age: "1 ano",
    sex: "Fêmea • Castrada",
    status: "processo",
    furColor: "#b56537",
    patchColor: "#f4d3b8",
    eyeColor: "#2e7d5b",
    traits: ["Carinhosa", "Sociável"],
    story: "Recebe os clientes na porta. Já está em entrevista de adoção!",
    goalTitle: "Caminha Nuvem",
    goalCurrent: 150,
    goalTarget: 150,
  },
  {
    id: "espresso",
    name: "Espresso",
    age: "6 meses",
    sex: "Macho • Castrado",
    status: "disponivel",
    furColor: "#241c18",
    patchColor: "#4a3c35",
    eyeColor: "#e09f3e",
    traits: ["Brincalhão", "Ama varinha"],
    story: "O caçula da casa! Depois de brincar, dorme em cima dos livros.",
    goalTitle: "Túnel Interativo",
    goalCurrent: 70,
    goalTarget: 160,
  },
  {
    id: "chantilly",
    name: "Chantilly",
    age: "3 anos",
    sex: "Fêmea • Castrada",
    status: "disponivel",
    furColor: "#e9dfd5",
    patchColor: "#a68a75",
    eyeColor: "#3a7ca5",
    traits: ["Rainha do sofá", "Tranquila"],
    story: "Aprecia cochilos longos ao sol e cafuné atrás das orelhas.",
    goalTitle: "Check-up Preventivo",
    goalCurrent: 190,
    goalTarget: 240,
  },
];

// 2. CARDÁPIO (edite aqui itens, preços e Patas)
const MENU_ITEMS = [
  {
    id: "coado",
    emoji: "☕",
    name: "Café Coado Especial",
    desc: "Grãos 100% arábica torra média.",
    price: 12.0,
    paws: 15,
  },
  {
    id: "cappuccino",
    emoji: "🐱",
    name: "Cappuccino Miau 3D",
    desc: "Leite vaporizado com espuma de gatinho.",
    price: 16.5,
    paws: 20,
  },
  {
    id: "iced",
    emoji: "🧊",
    name: "Iced Caramel Macchiato",
    desc: "Café gelado com calda artesanal de caramelo.",
    price: 18.0,
    paws: 22,
  },
  {
    id: "pao-queijo",
    emoji: "🧀",
    name: "Pão de Queijo Canastra",
    desc: "6 unidades assadas na hora.",
    price: 15.0,
    paws: 18,
  },
  {
    id: "bolo",
    emoji: "🍰",
    name: "Bolo de Cenoura & Brigadeiro",
    desc: "Fatia com calda quente de chocolate.",
    price: 14.5,
    paws: 18,
  },
  {
    id: "petisco",
    emoji: "🐟",
    name: "Petisco de Salmão (p/ Gatos)",
    desc: "Potinho para oferecer aos gatinhos na sala.",
    price: 9.0,
    paws: 25,
  },
];

// 3. RECOMPENSAS DO CLUBE
const REWARDS = [
  { id: "r1", title: "Café Coado ou Espresso", cost: 60 },
  { id: "r2", title: "Cappuccino Miau Cremoso", cost: 100 },
  { id: "r3", title: "Fatia de Bolo do Dia", cost: 130 },
  { id: "r4", title: "Combo Café + Petisco Felino", cost: 180 },
];

const HAPPY_ENDINGS = [
  {
    name: "Pipoca",
    info: "Adotado há 2 semanas • Família Mariana & Lucas",
    quote: "“Conhecemos o Pipoca na Mesa 02. Hoje ele é o dono do sofá!”",
  },
  {
    name: "Bento",
    info: "Adotado mês passado • Tutora Camila R.",
    quote: "“O processo pelo app foi super rápido e transparente.”",
  },
];

function getDefaultState() {
  return {
    paws: 120,
    table: "Mesa 04",
    checkedInToday: false,
    favorites: ["pacoca"],
    stickers: ["pacoca", "canela"],
    cats: JSON.parse(JSON.stringify(INITIAL_CATS)),
    coupons: [{ code: "BEMVINDO10", title: "10% OFF no Primeiro Café" }],
    adoptions: [],
  };
}

let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || getDefaultState();
let catFilter = "all";
let cart = {};

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatBRL(val) {
  return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.add("hidden"), 3000);
}

// Avatar ilustrado do gato em SVG
function catSVG(cat, size = 108) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="64" r="46" fill="#fff" opacity="0.75"/>
      <polygon points="28,52 34,20 54,40" fill="${cat.furColor}" />
      <polygon points="92,52 86,20 66,40" fill="${cat.furColor}" />
      <ellipse cx="60" cy="66" rx="36" ry="31" fill="${cat.furColor}" />
      <ellipse cx="60" cy="74" rx="20" ry="16" fill="${cat.patchColor}" opacity="0.88" />
      <circle cx="46" cy="61" r="5.5" fill="${cat.eyeColor}" />
      <circle cx="74" cy="61" r="5.5" fill="${cat.eyeColor}" />
      <circle cx="47.5" cy="59.5" r="2" fill="#fff" />
      <circle cx="75.5" cy="59.5" r="2" fill="#fff" />
      <polygon points="56,70 64,70 60,75" fill="#e58c8a" />
      <path d="M53,78 Q60,83 60,75 Q60,83 67,78" fill="none" stroke="#3b2820" stroke-width="2" stroke-linecap="round" />
    </svg>
  `;
}

function syncHeader() {
  document.getElementById("headerPaws").textContent = state.paws;
  document.getElementById("clubPaws").textContent = state.paws;
  document.getElementById("headerTable").textContent = state.table;
  document.getElementById("tableSelect").value = state.table;
  document.getElementById("availCount").textContent = state.cats.filter(
    (c) => c.status === "disponivel",
  ).length;

  const checkinBtn = document.getElementById("qrCheckinBtn");
  const checkinStatus = document.getElementById("checkinStatus");
  if (state.checkedInToday) {
    checkinBtn.textContent = "✅ Check-in Feito";
    checkinBtn.disabled = true;
    checkinStatus.textContent = "+15 🐾 recebidas hoje!";
  } else {
    checkinBtn.textContent = "📷 Fazer Check-in (+15 🐾)";
    checkinBtn.disabled = false;
    checkinStatus.textContent = "Pendente hoje";
  }
}

// Renderiza Vitrine de Gatos
function renderCats() {
  const grid = document.getElementById("catsGrid");
  let list = state.cats;
  if (catFilter === "disponivel")
    list = list.filter((c) => c.status === "disponivel");
  if (catFilter === "favoritos")
    list = list.filter((c) => state.favorites.includes(c.id));

  if (!list.length) {
    grid.innerHTML = '<p class="muted">Nenhum gatinho neste filtro.</p>';
    return;
  }

  grid.innerHTML = list
    .map((cat) => {
      const isFav = state.favorites.includes(cat.id);
      const pct = Math.min(
        100,
        Math.round((cat.goalCurrent / cat.goalTarget) * 100),
      );
      const goalDone = cat.goalCurrent >= cat.goalTarget;
      const isAvail = cat.status === "disponivel";

      return `
      <article class="cat-card">
        <div class="cat-visual">
          <span class="cat-status-badge ${isAvail ? "status-disponivel" : "status-processo"}">
            ${isAvail ? "Disponível" : "Em Processo"}
          </span>
          <button class="fav-btn" data-fav="${cat.id}">${isFav ? "❤️" : "🤍"}</button>
          ${catSVG(cat)}
        </div>
        <div class="cat-body">
          <div class="cat-title-row">
            <h3 class="cat-name">${cat.name}</h3>
            <span class="cat-meta">${cat.age}</span>
          </div>
          <div class="traits-row">
            ${cat.traits.map((t) => `<span class="trait-pill">${t}</span>`).join("")}
          </div>
          <p class="cat-story">${cat.story}</p>
          <div class="sponsor-box">
            <div class="sponsor-header">
              <span>🎯 ${cat.goalTitle}</span>
              <span>${cat.goalCurrent}/${cat.goalTarget} 🐾</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${pct}%"></div>
            </div>
          </div>
          <div class="cat-actions">
            <button class="btn btn-secondary" data-donate="${cat.id}" ${goalDone ? "disabled" : ""}>
              ${goalDone ? "Concluído 🎉" : "Doar 10 🐾"}
            </button>
            <button class="btn btn-primary" data-adopt="${cat.id}">
              ${isAvail ? "Quero Adotar" : "Ver Status"}
            </button>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

// Modal de Adoção
function openCatModal(catId) {
  const cat = state.cats.find((c) => c.id === catId);
  const app = state.adoptions.find((a) => a.catId === catId);
  const body = document.getElementById("modalBody");

  body.innerHTML = `
    <div style="text-align:center; margin-bottom:10px;">
      ${catSVG(cat, 96)}
      <h2 style="font-family:'Fraunces',serif;">${cat.name}</h2>
      <p class="muted">${cat.age} • ${cat.sex}</p>
    </div>
    <p style="font-size:0.9rem; margin-bottom:12px;">${cat.story}</p>
    ${
      app
        ? `
      <div class="protocol-box">
        <strong>✅ Adoção Solicitada!</strong>
        <p style="margin:6px 0;">Protocolo: <strong>${app.protocol}</strong></p>
        <p class="muted">Mostre no balcão para conversar com nossa equipe e ganhar 1 café cortesia ☕.</p>
      </div>
    `
        : cat.status === "processo"
          ? `
      <p class="muted" style="background:var(--amber-soft); padding:10px; border-radius:8px;">
        Este gatinho já está em entrevista de adoção no momento.
      </p>
    `
          : `
      <form id="adoptForm">
        <div class="form-group">
          <label>Seu nome *</label>
          <input type="text" id="adopterName" class="text-input" required placeholder="Ex.: Ana Souza" />
        </div>
        <div class="form-group">
          <label>WhatsApp *</label>
          <input type="tel" id="adopterPhone" class="text-input" required placeholder="(37) 99999-0000" />
        </div>
        <div class="form-group">
          <label>Janelas e varandas têm tela de proteção? *</label>
          <select id="safetyNets" class="select-input" style="width:100%;">
            <option value="sim">Sim, já está telado</option>
            <option value="vou-instalar">Vou instalar antes da adoção</option>
            <option value="nao">Não pretendo telar</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary btn-full" style="margin-top:6px;">
          Enviar Interesse &amp; Agendar Café ☕
        </button>
      </form>
    `
    }
  `;

  document.getElementById("catModal").classList.remove("hidden");

  const form = document.getElementById("adoptForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (document.getElementById("safetyNets").value === "nao") {
        showToast(
          "⚠️ Exigimos telas de proteção nas janelas para adoção segura.",
        );
        return;
      }
      const protocol = `MG-${Math.floor(1000 + Math.random() * 9000)}`;
      cat.status = "processo";
      state.adoptions.push({ catId: cat.id, protocol });
      state.coupons.unshift({
        code: `CAFE-${protocol}`,
        title: `Café Cortesia (${cat.name})`,
      });
      save();
      syncHeader();
      renderCats();
      renderClub();
      openCatModal(cat.id);
      showToast(`🎉 Solicitação enviada! Protocolo ${protocol}.`);
    });
  }
}

// Renderiza Cardápio e Carrinho
function renderMenu() {
  document.getElementById("menuGrid").innerHTML = MENU_ITEMS.map((item) => {
    const qty = cart[item.id] || 0;
    return `
      <div class="menu-item-card">
        <div class="menu-item-top">
          <div>
            <strong>${item.emoji} ${item.name}</strong>
            <p class="muted">${item.desc}</p>
          </div>
          <span class="menu-paws-tag">+${item.paws} 🐾</span>
        </div>
        <div class="menu-item-bottom">
          <strong>${formatBRL(item.price)}</strong>
          <div class="qty-controls">
            ${
              qty > 0
                ? `
              <button class="qty-btn" data-dec="${item.id}">−</button>
              <strong>${qty}</strong>
              <button class="qty-btn" data-inc="${item.id}">+</button>
            `
                : `
              <button class="btn btn-secondary" data-inc="${item.id}">+ Adicionar</button>
            `
            }
          </div>
        </div>
      </div>
    `;
  }).join("");

  const entries = Object.entries(cart).filter(([, q]) => q > 0);
  const itemsEl = document.getElementById("cartItems");
  const footerEl = document.getElementById("cartFooter");
  let count = 0,
    total = 0,
    paws = 0;

  if (!entries.length) {
    itemsEl.className = "muted";
    itemsEl.textContent = "Nenhum item adicionado ainda.";
    footerEl.classList.add("hidden");
  } else {
    itemsEl.className = "";
    itemsEl.innerHTML = entries
      .map(([id, q]) => {
        const it = MENU_ITEMS.find((m) => m.id === id);
        count += q;
        total += it.price * q;
        paws += it.paws * q;
        return `<div class="cart-line"><span>${q}x ${it.name}</span><strong>${formatBRL(it.price * q)}</strong></div>`;
      })
      .join("");
    footerEl.classList.remove("hidden");
  }

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = formatBRL(total);
  document.getElementById("cartPaws").textContent = paws;
}

// Renderiza Clube Fidelidade
function renderClub() {
  document.getElementById("rewardsGrid").innerHTML = REWARDS.map((r) => {
    const ok = state.paws >= r.cost;
    return `
      <div class="reward-card">
        <div>
          <span class="reward-cost">${r.cost} 🐾</span>
          <h4>${r.title}</h4>
        </div>
        <button class="btn ${ok ? "btn-primary" : "btn-outline"}" data-redeem="${r.id}" ${ok ? "" : "disabled"}>
          ${ok ? "Resgatar" : `Faltam ${r.cost - state.paws} 🐾`}
        </button>
      </div>
    `;
  }).join("");

  document.getElementById("couponsList").innerHTML = state.coupons
    .map(
      (c) => `
    <div class="coupon-card">
      <strong>${c.title}</strong>
      <div class="coupon-code">${c.code}</div>
    </div>
  `,
    )
    .join("");
}

// Renderiza Visitas
function renderVisits() {
  document.getElementById("stickersCount").textContent =
    `${state.stickers.length}/${state.cats.length}`;
  document.getElementById("stickersGrid").innerHTML = state.cats
    .map((cat) => {
      const has = state.stickers.includes(cat.id);
      return `
      <div class="sticker-card ${has ? "collected" : ""}" data-sticker="${cat.id}">
        ${catSVG(cat, 62)}
        <strong>${cat.name}</strong>
        <span>${has ? "✅ Conhecido" : "Marcar"}</span>
      </div>
    `;
    })
    .join("");

  document.getElementById("happyGrid").innerHTML = HAPPY_ENDINGS.map(
    (h) => `
    <div class="happy-card">
      <strong>🏡 ${h.name}</strong>
      <small class="muted">${h.info}</small>
      <p style="font-size:0.84rem; font-style:italic;">${h.quote}</p>
    </div>
  `,
  ).join("");
}

function switchTab(id) {
  document
    .querySelectorAll(".tab-panel")
    .forEach((p) => p.classList.toggle("active", p.id === id));
  document
    .querySelectorAll(".nav-item")
    .forEach((b) => b.classList.toggle("active", b.dataset.target === id));
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  syncHeader();
  renderCats();
  renderMenu();
  renderClub();
  renderVisits();

  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.target));
  });

  document
    .getElementById("tableBadgeBtn")
    .addEventListener("click", () => switchTab("tab-menu"));

  document.getElementById("tableSelect").addEventListener("change", (e) => {
    state.table = e.target.value;
    save();
    syncHeader();
    showToast(`🪑 Local alterado para ${state.table}`);
  });

  document.querySelectorAll(".filter-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-chip")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      catFilter = btn.dataset.filter;
      renderCats();
    });
  });

  document.getElementById("catsGrid").addEventListener("click", (e) => {
    const fav = e.target.closest("[data-fav]");
    if (fav) {
      const id = fav.dataset.fav;
      const idx = state.favorites.indexOf(id);
      idx >= 0 ? state.favorites.splice(idx, 1) : state.favorites.push(id);
      save();
      renderCats();
      return;
    }

    const donate = e.target.closest("[data-donate]");
    if (donate) {
      const cat = state.cats.find((c) => c.id === donate.dataset.donate);
      if (state.paws < 10)
        return showToast(
          "Saldo insuficiente! Peça um café para ganhar Patas 🐾.",
        );
      state.paws -= 10;
      cat.goalCurrent = Math.min(cat.goalTarget, cat.goalCurrent + 10);
      save();
      syncHeader();
      renderCats();
      showToast(`🐾 Você doou 10 Patas para ${cat.name}!`);
      return;
    }

    const adopt = e.target.closest("[data-adopt]");
    if (adopt) openCatModal(adopt.dataset.adopt);
  });

  document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("catModal").classList.add("hidden");
  });

  document.getElementById("menuGrid").addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    if (inc) {
      cart[inc.dataset.inc] = (cart[inc.dataset.inc] || 0) + 1;
      renderMenu();
    }
    const dec = e.target.closest("[data-dec]");
    if (dec && cart[dec.dataset.dec] > 0) {
      cart[dec.dataset.dec] -= 1;
      renderMenu();
    }
  });

  document.getElementById("submitOrderBtn").addEventListener("click", () => {
    let earned = 0;
    Object.entries(cart).forEach(([id, q]) => {
      if (q > 0) earned += MENU_ITEMS.find((m) => m.id === id).paws * q;
    });
    if (!earned) return;
    state.paws += earned;
    cart = {};
    save();
    syncHeader();
    renderMenu();
    renderClub();
    showToast(
      `☕ Pedido enviado para ${state.table}! Você ganhou +${earned} 🐾.`,
    );
  });

  document.getElementById("rewardsGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-redeem]");
    if (!btn) return;
    const reward = REWARDS.find((r) => r.id === btn.dataset.redeem);
    if (!reward || state.paws < reward.cost) return;
    state.paws -= reward.cost;
    const code = `MIAU-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    state.coupons.unshift({ code, title: reward.title });
    save();
    syncHeader();
    renderClub();
    showToast(`🎟️ Cupom ${code} gerado!`);
  });

  document.getElementById("qrCheckinBtn").addEventListener("click", () => {
    if (state.checkedInToday) return;
    state.checkedInToday = true;
    state.paws += 15;
    save();
    syncHeader();
    renderClub();
    showToast("📷 Check-in confirmado! +15 🐾 na sua carteira.");
  });

  document.getElementById("stickersGrid").addEventListener("click", (e) => {
    const card = e.target.closest("[data-sticker]");
    if (!card) return;
    const id = card.dataset.sticker;
    const idx = state.stickers.indexOf(id);
    idx >= 0 ? state.stickers.splice(idx, 1) : state.stickers.push(id);
    save();
    renderVisits();
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state = getDefaultState();
    cart = {};
    syncHeader();
    renderCats();
    renderMenu();
    renderClub();
    renderVisits();
    showToast("🔄 Dados restaurados!");
  });
});
