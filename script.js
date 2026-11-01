// ==========================================
// RX Market - Data & Logic Application
// ==========================================

// Global State
let currentLang = 'id';
let currentTheme = 'dark';
let currentUser = null;
let cart = [];

// Dictionary Multi-Bahasa
const translations = {
  id: {
    search_placeholder: "Cari produk impianmu...",
    login_google: "Masuk Google",
    hero_tag: "✨ Platform Jual Beli Masa Depan",
    hero_title: "Belanja & Jual Produk Pilihanmu di RX Market",
    hero_subtitle: "Nikmati pengalaman bertransaksi cepat, aman, dan transparan dengan antarmuka modern berbahan dasar liquid glass.",
    start_selling: "Mulai Jualan",
    explore_products: "Jelajahi Produk",
    explore_title: "Katalog Produk",
    explore_desc: "Temukan barang berkualitas dari berbagai penjual terpercaya.",
    btn_add_product: "+ Tambah Produk Toko",
    cart_title: "Keranjang Belanja",
    total_price: "Total:",
    checkout_btn: "Lanjut ke Pembayaran",
    modal_title: "Tambah Produk ke Toko RX",
    label_name: "Nama Produk",
    label_price: "Harga (Rp)",
    label_discount: "Diskon (%)",
    label_stock: "Stok Produk",
    label_condition: "Kondisi Barang",
    cond_new: "Baru (New)",
    cond_like_new: "Bekas (Like New)",
    cond_used: "Bekas (Normal)",
    label_variants: "Varian Produk (Pisahkan koma)",
    label_image: "URL Gambar Produk",
    label_desc: "Deskripsi Produk",
    btn_publish: "Tayangkan Produk",
    add_to_cart: "Beli Sekarang",
    stock_label: "Stok",
    seller_label: "Toko"
  },
  en: {
    search_placeholder: "Search your dream products...",
    login_google: "Sign in with Google",
    hero_tag: "✨ Future P2P Marketplace",
    hero_title: "Shop & Sell Anything on RX Market",
    hero_subtitle: "Experience fast, secure, and seamless trading powered by iOS-style liquid glass design.",
    start_selling: "Start Selling",
    explore_products: "Explore Items",
    explore_title: "Product Catalog",
    explore_desc: "Discover high quality items from trusted independent sellers.",
    btn_add_product: "+ Add Store Item",
    cart_title: "Shopping Cart",
    total_price: "Total:",
    checkout_btn: "Proceed to Checkout",
    modal_title: "Publish Item to RX Market",
    label_name: "Product Name",
    label_price: "Price (IDR)",
    label_discount: "Discount (%)",
    label_stock: "Stock Quantity",
    label_condition: "Item Condition",
    cond_new: "Brand New",
    cond_like_new: "Used (Like New)",
    cond_used: "Used (Normal)",
    label_variants: "Product Variants (Comma separated)",
    label_image: "Product Image URL",
    label_desc: "Product Description",
    btn_publish: "Publish Product",
    add_to_cart: "Add to Cart",
    stock_label: "Stock",
    seller_label: "Seller"
  }
};

// Initial Mock Products
let products = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 3499000,
    discount: 15,
    stock: 12,
    condition: "Baru",
    seller: "TechCentral",
    variants: ["Matte Black", "Silver", "Navy Blue"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    desc: "Suara jernih dengan peredam bising aktif premium. Baterai tahan hingga 30 jam."
  },
  {
    id: 2,
    name: "Smart Watch Series X - Glass Edition",
    price: 4899000,
    discount: 0,
    stock: 5,
    condition: "Bekas (Like New)",
    seller: "iStore Official",
    variants: ["40mm Silver", "44mm Black"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    desc: "Layar OLED selalu aktif, sensor detak jantung presisi tinggi dan GPS terintegrasi."
  },
  {
    id: 3,
    name: "Mechanical Keyboard RGB Custom",
    price: 1250000,
    discount: 10,
    stock: 20,
    condition: "Baru",
    seller: "KeyCraft ID",
    variants: ["Blue Switch", "Red Switch", "Brown Switch"],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    desc: "Keyboard mekanikal ergonomis dengan lampu RGB berkilau dan keycaps PBT berkualitas."
  }
];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartBadge = document.getElementById('cartBadge');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const langToggleBtn = document.getElementById('langToggleBtn');
const langText = document.getElementById('langText');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const googleAuthBtn = document.getElementById('googleAuthBtn');
const authContainer = document.getElementById('authContainer');
const sellModal = document.getElementById('sellModal');
const openSellModalBtn = document.getElementById('openSellModalBtn');
const openSellModalHeroBtn = document.getElementById('openSellModalHeroBtn');
const closeSellModalBtn = document.getElementById('closeSellModalBtn');
const sellForm = document.getElementById('sellForm');
const searchInput = document.getElementById('searchInput');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupEventListeners();
});

// Render Products Grid
function renderProducts(items) {
  productGrid.innerHTML = '';
  if (items.length === 0) {
    productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Tidak ada produk ditemukan.</p>`;
    return;
  }

  items.forEach(prod => {
    const discountedPrice = prod.discount > 0 ? prod.price * (1 - prod.discount / 100) : prod.price;
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${prod.image}" alt="${prod.name}">
        ${prod.discount > 0 ? `<span class="discount-tag">-${prod.discount}%</span>` : ''}
        <span class="condition-tag">${prod.condition}</span>
      </div>
      <div class="product-info">
        <span class="product-seller"><i class="fa-solid fa-store"></i> ${prod.seller}</span>
        <h3 class="product-title">${prod.name}</h3>
        <p class="product-desc">${prod.desc}</p>
        
        <div class="variants-container">
          ${prod.variants.map(v => `<span class="variant-chip">${v}</span>`).join('')}
        </div>
        
        <div class="price-row">
          <span class="current-price">Rp ${discountedPrice.toLocaleString('id-ID')}</span>
          ${prod.discount > 0 ? `<span class="old-price">Rp ${prod.price.toLocaleString('id-ID')}</span>` : ''}
        </div>
        
        <div class="stock-info">${translations[currentLang].stock_label}: ${prod.stock} unit</div>
        
        <button class="btn-primary btn-full" onclick="addToCart(${prod.id})">
          <i class="fa-solid fa-cart-plus"></i> ${translations[currentLang].add_to_cart}
        </button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Add to Cart Logic
function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    if (existing.qty < item.stock) {
      existing.qty++;
    } else {
      alert("Stok batas maksimum tercapai!");
    }
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCartUI();
}

// Update Cart Sidebar & Badge
function updateCartUI() {
  cartBadge.textContent = cart.reduce((acc, curr) => acc + curr.qty, 0);
  cartItemsContainer.innerHTML = '';
  
  let total = 0;
  cart.forEach(item => {
    const finalPrice = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
    total += finalPrice * item.qty;
    
    const cartEl = document.createElement('div');
    cartEl.className = 'cart-item';
    cartEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">Rp ${finalPrice.toLocaleString('id-ID')} x ${item.qty}</div>
      </div>
    `;
    cartItemsContainer.appendChild(cartEl);
  });

  cartTotalPrice.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Event Listeners Setup
function setupEventListeners() {
  // Toggle Theme
  themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeIcon.className = currentTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  });

  // Toggle Language
  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    langText.textContent = currentLang.toUpperCase();
    applyLanguage();
  });

  // Open & Close Cart Drawer
  cartBtn.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  });

  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Auth Simulation
  googleAuthBtn.addEventListener('click', () => {
    currentUser = {
      name: "Rian Ekky",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
    };
    authContainer.innerHTML = `
      <div class="glass-btn user-profile-btn">
        <img src="${currentUser.avatar}" class="user-avatar" />
        <span>${currentUser.name}</span>
      </div>
    `;
  });

  // Modal Jualan
  openSellModalBtn.addEventListener('click', () => sellModal.classList.add('open'));
  openSellModalHeroBtn.addEventListener('click', () => sellModal.classList.add('open'));
  closeSellModalBtn.addEventListener('click', () => sellModal.classList.remove('open'));

  // Form Submit New Product
  sellForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProd = {
      id: Date.now(),
      name: document.getElementById('prodName').value,
      price: parseFloat(document.getElementById('prodPrice').value),
      discount: parseFloat(document.getElementById('prodDiscount').value) || 0,
      stock: parseInt(document.getElementById('prodStock').value),
      condition: document.getElementById('prodCondition').value,
      seller: currentUser ? currentUser.name : "RX Seller",
      variants: document.getElementById('prodVariants').value.split(',').map(s => s.trim()).filter(Boolean),
      image: document.getElementById('prodImage').value,
      desc: document.getElementById('prodDesc').value
    };

    products.unshift(newProd);
    renderProducts(products);
    sellForm.reset();
    sellModal.classList.remove('open');
  });

  // Search Input Filter
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
    renderProducts(filtered);
  });
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
}

// Apply Language Dynamic Strings
function applyLanguage() {
  const dict = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });

  renderProducts(products);
}
