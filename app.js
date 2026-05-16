const CURRENCY = 'د.م';
const STORAGE_KEYS = { GAMES: 'overstore_games', CART: 'overstore_cart' };

const DEFAULT_GAMES = [
const DEFAULT_GAMES = [
  {
    id:'p1',
    title:'Grand Theft Auto V',
    category:'أكشن',
    price:250,
    disc:20,
    rating:4.9,
    img:'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200',
    desc:'عالم مفتوح ضخم...'
  },

  {
    id:'p2',
    title:'Cyberpunk 2077',
    category:'RPG',
    price:450,
    disc:35,
    rating:4.5,
    img:'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200',
    desc:'مستقبل مرئي...'
  },

  {
    id:'p3',
    title:'Elden Ring',
    img:'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200'
  },

  {
    id:'p4',
    title:'EA Sports FC 24',
    img:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200'
  },

  {
    id:'p5',
    title:'Red Dead Redemption 2',
    img:'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200'
  },

  {
    id:'p6',
    title:'Spider-Man Remastered',
    img:'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200'
  },

  {
    id:'p7',
    title:'God of War',
    img:'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200'
  },

  {
    id:'p8',
    title:'Hogwarts Legacy',
    img:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200'
  },

  {
    id:'p9',
    title:'The Witcher 3',
    img:'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=1200'
  },

  {
    id:'p10',
    title:'Resident Evil 4',
    img:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200'
  },

  {
    id:'p11',
    title:'Forza Horizon 5',
    img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200'
  },

  {
    id:'p12',
    title:'Baldur’s Gate 3',
    img:'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200'
  },

  {
    id:'p13',
    title:'Free Fire',
    img:'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=1200'
  },

  {
    id:'p14',
    title:'eFootball',
    img:'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200'
  },

  {
    id:'p15',
    title:'PES Mobile',
    img:'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200'
  },

  {
    id:'p16',
    title:'PUBG Mobile',
    img:'https://images.unsplash.com/photo-1548686304-89d188a80029?w=1200'
  }
];

let appGames = [];
let cart = [];

function loadSavedGames() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.GAMES) || '[]');
}

function saveCart() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

function loadCart() {
  cart = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]');
}

function getFinalPrice(game) {
  return Number(game.disc ? game.price * (1 - game.disc / 100) : game.price);
}

function formatPrice(value) {
  return Number(value).toFixed(2);
}

function makeStars(score) {
  const fullStars = Math.floor(score);
  const halfStar = score % 1 >= 0.5 ? '½' : '';
  return '★'.repeat(fullStars) + halfStar;
}

function mergeGames(remoteGames = []) {
  const saved = loadSavedGames();
  const defaultIds = new Set(DEFAULT_GAMES.map((game) => game.id));
  const merged = [
    ...DEFAULT_GAMES,
    ...saved.filter((game) => !defaultIds.has(game.id)),
    ...remoteGames.filter((game) => !defaultIds.has(game.id))
  ];
  return merged.map((game) => ({
    ...game,
    category: game.category || game.cat || 'عام',
    desc: game.desc || 'لعبة مميزة مع عرض حصري من OVERSTORE',
    rating: Number(game.rating || 4.6),
    isOffer: Boolean(game.disc),
    isNew: Boolean(game.isNew),
    isBestseller: Boolean(game.isBestseller)
  }));
}

function buildCategoryMenu() {
  const categoryList = document.getElementById('categoryList');
  const filterCategory = document.getElementById('filterCategory');
  if (!categoryList || !filterCategory) return;

  const categories = ['الكل', ...new Set(appGames.map((game) => game.category || 'عام'))];
  categoryList.innerHTML = categories
    .map((category) => `<button type="button" data-category="${category}" class="btn outline">${category}</button>`)
    .join('');

  filterCategory.innerHTML = categories
    .map((category) => `<option value="${category === 'الكل' ? 'all' : category}">${category}</option>`)
    .join('');

  categoryList.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      document.getElementById('filterCategory').value = category === 'الكل' ? 'all' : category;
      renderGames();
    });
  });
}

function createGameCard(game) {
  const finalPrice = formatPrice(getFinalPrice(game));
  const card = document.createElement('article');
  card.className = 'game-card';
  card.innerHTML = `
    <div class="game-thumb">
      ${game.disc ? `<span class="badge">-${game.disc}%</span>` : ''}
      <img src="${game.img}" alt="${game.title}" loading="lazy">
    </div>
    <div class="game-info">
      <span class="category">${game.category}</span>
      <h3 class="title">${game.title}</h3>
      <div class="badge rating-badge">${makeStars(game.rating)} <span>${game.rating}</span></div>
      <p class="game-desc">${game.desc}</p>
      <div class="price-box">
        <span class="now">${finalPrice} ${CURRENCY}</span>
        ${game.disc ? `<span class="old">${formatPrice(game.price)} ${CURRENCY}</span>` : ''}
      </div>
      <div class="card-actions">
        <button type="button" class="btn neon buy-now">شراء سريع</button>
        <button type="button" class="btn outline add-cart">أضف إلى السلة</button>
      </div>
    </div>
  `;

  card.querySelector('.buy-now').addEventListener('click', () => handleWhatsAppCheckout([game]));
  card.querySelector('.add-cart').addEventListener('click', () => addToCart(game.id));
  return card;
}

function renderSection(sectionId, games) {
  const container = document.getElementById(sectionId);
  if (!container) return;
  container.innerHTML = '';
  if (!games.length) {
    container.innerHTML = `<p class="empty-msg">لا توجد ألعاب في هذا القسم حالياً.</p>`;
    return;
  }
  games.forEach((game) => container.appendChild(createGameCard(game)));
}

function renderAllSections() {
  const bestsellerGames = appGames.filter((game) => game.isBestseller || game.disc >= 25).slice(0, 6);
  const newGames = appGames.filter((game) => game.isNew).slice(0, 6);
  const offerGames = appGames.filter((game) => game.isOffer).slice(0, 6);
  renderSection('bestsellerList', bestsellerGames);
  renderSection('newList', newGames);
  renderSection('offersList', offerGames);
}

function renderGames() {
  const searchValue = document.getElementById('search').value.trim().toLowerCase();
  const selectedCategory = document.getElementById('filterCategory').value;
  const sortBy = document.getElementById('sortBy').value;
  let filtered = [...appGames];

  if (selectedCategory && selectedCategory !== 'all') {
    filtered = filtered.filter((game) => game.category === selectedCategory);
  }
  if (searchValue) {
    filtered = filtered.filter((game) =>
      game.title.toLowerCase().includes(searchValue) ||
      game.category.toLowerCase().includes(searchValue) ||
      game.desc.toLowerCase().includes(searchValue)
    );
  }

  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
  } else {
    filtered.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
  }

  renderSection('gamesList', filtered);
}

function updateCartCount() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = cartCount;
}

function renderCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;
  container.innerHTML = '';
  if (!cart.length) {
    container.innerHTML = '<p class="empty-msg">السلة فارغة. أضف ألعاباً الآن.</p>';
    updateCartTotal();
    return;
  }

  cart.forEach((item) => {
    const lineTotal = formatPrice(getFinalPrice(item) * item.quantity);
    const card = document.createElement('div');
    card.className = 'cart-item';
    card.innerHTML = `
      <div class="cart-info">
        <h4>${item.title}</h4>
        <p>${item.quantity} × ${formatPrice(getFinalPrice(item))} ${CURRENCY} = ${lineTotal} ${CURRENCY}</p>
      </div>
      <div class="cart-actions">
        <button type="button" class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button type="button" class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
        <button type="button" class="remove-btn" data-id="${item.id}">✕</button>
      </div>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll('.qty-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const action = button.dataset.action;
      const item = cart.find((entry) => entry.id === id);
      if (!item) return;
      if (action === 'increase') item.quantity += 1;
      if (action === 'decrease') item.quantity = Math.max(1, item.quantity - 1);
      saveCart();
      renderCart();
      updateCartCount();
    });
  });

  container.querySelectorAll('.remove-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      cart = cart.filter((item) => item.id !== id);
      saveCart();
      renderCart();
      updateCartCount();
    });
  });

  updateCartTotal();
}

function updateCartTotal() {
  const total = formatPrice(cart.reduce((sum, item) => sum + getFinalPrice(item) * item.quantity, 0));
  document.getElementById('cartTotal').textContent = total;
}

function addToCart(gameId) {
  const game = appGames.find((item) => item.id === gameId);
  if (!game) return;
  const existing = cart.find((item) => item.id === gameId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...game, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  renderCart();
  alert(`تمت إضافة ${game.title} إلى السلة`);
}

function handleWhatsAppCheckout(items) {
  const phone = '212646181714';
  const lines = items.map((item) => {
    const quantity = item.quantity || 1;
    const total = formatPrice(getFinalPrice(item) * quantity);
    return `- ${item.title} (${quantity}) = ${total} ${CURRENCY}`;
  });
  const total = formatPrice(items.reduce((sum, item) => sum + getFinalPrice(item) * (item.quantity || 1), 0));
  const text = encodeURIComponent(`مرحباً OverStore، أريد طلباً:\n${lines.join('\n')}\nالمجموع: ${total} ${CURRENCY}`);
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

function checkout() {
  if (!cart.length) {
    alert('السلة فارغة. أضف ألعاباً قبل إتمام الشراء.');
    return;
  }
  handleWhatsAppCheckout(cart);
}

function toggleCartPanel() {
  const panel = document.getElementById('cartPanel');
  if (!panel) return;
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

function updateLoginStatus() {
  const loginBtn = document.getElementById('loginBtn');
  const user = JSON.parse(localStorage.getItem('overstore_user') || 'null');
  if (loginBtn) {
    loginBtn.textContent = user ? 'حسابك' : 'تسجيل';
  }
}

function refreshUI() {
  appGames = mergeGames();
  buildCategoryMenu();
  renderAllSections();
  renderGames();
  updateCartCount();
  renderCart();
}

async function initApp() {
  loadCart();
  if (window.FirebaseService && window.FirebaseService.enabled) {
    try {
      const firebaseGames = await window.FirebaseService.getGames();
      const remoteGames = firebaseGames.map((game) => ({
        ...game,
        category: game.category || game.cat || 'عام',
        desc: game.desc || 'لعبة مميزة من OVERSTORE',
        rating: Number(game.rating || 4.6),
        isOffer: Boolean(game.disc),
        isNew: Boolean(game.isNew),
        isBestseller: Boolean(game.isBestseller)
      }));
      appGames = mergeGames(remoteGames);
      if (window.FirebaseService.onGamesChanged) {
        window.FirebaseService.onGamesChanged((list) => {
          const remote = list.map((game) => ({
            ...game,
            category: game.category || game.cat || 'عام',
            desc: game.desc || 'لعبة مميزة من OVERSTORE',
            rating: Number(game.rating || 4.6),
            isOffer: Boolean(game.disc),
            isNew: Boolean(game.isNew),
            isBestseller: Boolean(game.isBestseller)
          }));
          appGames = mergeGames(remote);
          refreshUI();
        });
      }
    } catch (error) {
      console.warn('Firebase load failed', error);
      appGames = mergeGames();
    }
  } else {
    appGames = mergeGames();
  }
  refreshUI();
}

window.refreshGames = refreshUI;

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) loginBtn.addEventListener('click', openAuth);
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', toggleCartPanel);
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
  const searchInput = document.getElementById('search');
  if (searchInput) searchInput.addEventListener('input', renderGames);
  const filterCategory = document.getElementById('filterCategory');
  if (filterCategory) filterCategory.addEventListener('change', renderGames);
  const sortBy = document.getElementById('sortBy');
  if (sortBy) sortBy.addEventListener('change', renderGames);
  updateLoginStatus();
  initApp();
});
