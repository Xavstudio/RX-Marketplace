// DATA 10 HP FLAGSHIP BEKAS DENGAN HARGA REALISTIS INDONESIA (RP)
const products = [
    {
        id: 1,
        name: "Xiaomi 12 Pro",
        brand: "xiaomi",
        price: 5200000,
        specs: "12GB/256GB • Snapdragon 8 Gen 1 • Mulus 95%",
        img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop&q=80"
    },
    {
        id: 2,
        name: "Google Pixel 6 Pro",
        brand: "google",
        price: 4500000,
        specs: "12GB/128GB • Google Tensor • IMEI Bea Cukai",
        img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop&q=80"
    },
    {
        id: 3,
        name: "Samsung Galaxy S21+",
        brand: "samsung",
        price: 4300000,
        specs: "8GB/256GB • Exynos 2100 • Resmi SEIN",
        img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop&q=80"
    },
    {
        id: 4,
        name: "Samsung Galaxy S22",
        brand: "samsung",
        price: 5800000,
        specs: "8GB/128GB • Snapdragon 8 Gen 1 • Fullset SEIN",
        img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop&q=80"
    },
    {
        id: 5,
        name: "Samsung Galaxy S23",
        brand: "samsung",
        price: 8200000,
        specs: "8GB/256GB • Snapdragon 8 Gen 2 • Mulus Like New",
        img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop&q=80"
    },
    {
        id: 6,
        name: "Sony Xperia XZ3",
        brand: "sony",
        price: 1850000,
        specs: "4GB/64GB • Snapdragon 845 • OLED Curved",
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80"
    },
    {
        id: 7,
        name: "Xiaomi 13T Pro",
        brand: "xiaomi",
        price: 7800000,
        specs: "12GB/512GB • Dimensity 9200+ • Kamera Leica",
        img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop&q=80"
    },
    {
        id: 8,
        name: "Google Pixel 7",
        brand: "google",
        price: 5900000,
        specs: "8GB/128GB • Google Tensor G2 • Dual SIM",
        img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop&q=80"
    },
    {
        id: 9,
        name: "iPhone 13",
        brand: "apple",
        price: 8500000,
        specs: "128GB • A15 Bionic • BH 88% iBox",
        img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&auto=format&fit=crop&q=80"
    },
    {
        id: 10,
        name: "iPhone 14 Pro Max",
        brand: "apple",
        price: 14200000,
        specs: "256GB • Dynamic Island • BH 91% Fullset",
        img: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&auto=format&fit=crop&q=80"
    }
];

// STATE MANAGEMENT
let cart = [];
let currentUser = null;
let currentBrand = 'all';

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
});

// PAGE SWITCHING
function switchPage(pageName) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const targetSection = document.getElementById(`page-${pageName}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// RENDER PRODUCTS
function renderProducts(items) {
    const container = document.getElementById('product-container');
    if (!container) return;
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--gray-light);">Tidak ada produk yang ditemukan.</p>`;
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card liquid-glass';
        card.innerHTML = `
            <span class="brand-tag">${product.brand}</span>
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-specs">${product.specs}</p>
                <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
            </div>
            <button class="add-btn" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
        `;
        container.appendChild(card);
    });
}

// FILTER BRAND
function filterBrand(brand, element) {
    currentBrand = brand;
    document.querySelectorAll('.tag').forEach(tag => tag.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
    filterProducts();
}

// FILTER SEARCH & BRAND
function filterProducts() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    
    const filtered = products.filter(product => {
        const matchesBrand = currentBrand === 'all' || product.brand === currentBrand;
        const matchesSearch = product.name.toLowerCase().includes(query) || product.specs.toLowerCase().includes(query);
        return matchesBrand && matchesSearch;
    });
    renderProducts(filtered);
}

// CART DRAWER TOGGLE
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
        drawer.classList.toggle('open');
        overlay.classList.toggle('open');
    }
}

// ADD TO CART
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        updateCartUI();
        toggleCart();
    }
}

// REMOVE FROM CART
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// UPDATE CART UI
function updateCartUI() {
    const badge = document.getElementById('cart-count');
    const itemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');

    if (badge) badge.textContent = cart.length;
    if (!itemsContainer) return;

    itemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div>
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Hapus</button>
        `;
        itemsContainer.appendChild(itemDiv);
    });

    if (totalElement) {
        totalElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    }
}

// CHECKOUT
function checkout() {
    if (cart.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }
    alert("Terima kasih! Pesanan Anda berhasil diproses ke tahap pembayaran.");
    cart = [];
    updateCartUI();
    toggleCart();
}

// AUTH MODAL TOGGLE
function toggleAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.toggle('open');
    }
}

// GOOGLE LOGIN SIMULATION
function handleGoogleLogin() {
    const emailInput = document.getElementById('user-email-input');
    const email = emailInput ? emailInput.value : '';

    if (!email || !email.includes('@')) {
        alert("Masukkan email yang valid!");
        return;
    }

    currentUser = email;
    const username = email.split('@')[0];
    
    const authText = document.getElementById('auth-text');
    if (authText) authText.textContent = username;

    toggleAuthModal();
    alert(`Berhasil masuk sebagai ${email}`);
}
