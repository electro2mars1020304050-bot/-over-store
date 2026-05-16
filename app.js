const CURRENCY = 'د.م';
const STORAGE_KEYS = { GAMES: 'overstore_games', CART: 'overstore_cart' };

const DEFAULT_GAMES = [
  { id: 'p1', title: 'Grand Theft Auto V', category: 'أكشن', price: 250, disc: 20, rating: 4.9, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg', desc: 'عالم مفتوح ضخم، مهمات متفجرة، وتجربة لعب لا تُنسى.' },
  { id: 'p2', title: 'Cyberpunk 2077', category: 'RPG', price: 450, disc: 35, rating: 4.5, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg', desc: 'مستقبل مرئي وجرافيك خارق، مع عروض حصرية وحسابات VIP.' },
  { id: 'p3', title: 'Elden Ring', category: 'RPG', price: 550, disc: 10, rating: 4.8, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg', desc: 'تجربة RPG ملحمية مع معارك صعبة وعالم غني بالتفاصيل.' },
  { id: 'p4', title: 'EA Sports FC 24', category: 'رياضة', price: 600, disc: 40, rating: 4.7, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2140330/header.jpg', desc: 'كرة قدم احترافية بتحديثات الفرق الحقيقية وتحكم سلس.' },
  { id: 'p5', title: 'Red Dead Redemption 2', category: 'مغامرات', price: 380, disc: 50, rating: 4.9, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg', desc: 'رحلة برية في الغرب الأمريكي مع قصة درامية تنبض بالحياة.' },
  { id: 'p6', title: 'Spider-Man Remastered', category: 'أكشن', price: 420, disc: 15, rating: 4.6, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/header.jpg', desc: 'حركة ديناميكية ورسومات رائعة في مدينة نيويورك الساحرة.' },
  { id: 'p7', title: 'God of War', category: 'أكشن', price: 350, disc: 25, rating: 4.8, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg', desc: 'أسطورة إله الحرب تعود بقصة قوية ومعارك ملحمية.' },
  { id: 'p8', title: 'Hogwarts Legacy', category: 'RPG', price: 500, disc: 20, rating: 4.6, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1912450/header.jpg', desc: 'سحر هوجورتس في تفاصيل مدهشة، مهمات، وتعويذات جديدة.' },
  { id: 'p9', title: 'The Witcher 3', category: 'مغامرات', price: 150, disc: 60, rating: 4.9, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg', desc: 'تحفة لعب الأدوار، عالم خيالي غني وقصة متفرعة.' },
  { id: 'p10', title: 'Resident Evil 4', category: 'رعب', price: 480, disc: 10, rating: 4.7, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg', desc: 'رعب البقاء الممزوج بالإثارة والتشويق الدائم.' },
  { id: 'p11', title: 'Forza Horizon 5', category: 'سباقات', price: 400, disc: 30, rating: 4.8, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg', desc: 'سباقات عالية السرعة في عالم مفتوح مليء بالتحديات.' },
  { id: 'p12', title: 'Baldur\'s Gate 3', category: 'RPG', price: 580, disc: 0, rating: 4.9, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg', desc: 'أكبر تجربة RPG مع قرارات مؤثرة وقصة عميقة.' },
  { id: 'p13', title: 'Free Fire (Android)', category: 'موبايل', price: 30, disc: 10, rating: 4.4, isBestseller: true, img: 'https://img.freefiremobile.com/ffwebsite/news/banner/freefire.jpg', desc: 'معركة ملكية سريعة ومسلية - حسابات وأسلحة داخل اللعبة.' },
  { id: 'p14', title: 'eFootball FC26 (Android)', category: 'موبايل', price: 45, disc: 5, rating: 4.2, isNew: true, img: 'https://cdn.akamai.steamstatic.com/steam/apps/2150020/header.jpg', desc: 'كرة قدم موبايل حديثة مع تحديثات الفرق واللاعبين.' },
  { id: 'p15', title: 'PES Mobile (Android)', category: 'موبايل', price: 40, disc: 15, rating: 4.1, img: 'https://cdn.akamai.steamstatic.com/steam/apps/1354930/header.jpg', desc: 'تحكم ناعم ومباريات حماسية على الجوال.' },
  { id: 'p16', title: 'PUBG Mobile', category: 'موبايل', price: 35, disc: 20, rating: 4.5, isBestseller: true, img: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg', desc: 'معارك تكتيكية، خرائط واسعة، وتجربة لعب متعددة اللاعبين.' }
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
