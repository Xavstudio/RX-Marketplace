// DATA 10 HP FLAGSHIP BEKAS DENGAN HARGA REALISTIS INDONESIA (RP)
const products = [
    {
        id: 1,
        name: "Xiaomi 12 Pro",
        brand: "xiaomi",
        price: 5200000,
        specs: "12GB/256GB • Snapdragon 8 Gen 1 • Mulus 95%",
        img: "https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-12-pro/specs-header.png"
    },
    {
        id: 2,
        name: "Google Pixel 6 Pro",
        brand: "google",
        price: 4500000,
        specs: "12GB/128GB • Google Tensor • IMEI Bea Cukai",
        img: "https://lh3.googleusercontent.com/d-7hVvNf8jJkLqO_B9P0a"
    },
    {
        id: 3,
        name: "Samsung Galaxy S21+",
        brand: "samsung",
        price: 4300000,
        specs: "8GB/256GB • Exynos 2100 • Resmi SEIN",
        img: "https://images.samsung.com/is/image/samsung/p6pim/id/galaxy-s21/gallery/id-galaxy-s21-plus-5g-g996-371239-sm-g996bzvdxid-thumb-368339890"
    },
    {
        id: 4,
        name: "Samsung Galaxy S22",
        brand: "samsung",
        price: 5800000,
        specs: "8GB/128GB • Snapdragon 8 Gen 1 • Fullset SEIN",
        img: "https://images.samsung.com/is/image/samsung/p6pim/id/2202/gallery/id-galaxy-s22-s901-sm-s901ezwdxid-thumb-530964727"
    },
    {
        id: 5,
        name: "Samsung Galaxy S23",
        brand: "samsung",
        price: 8200000,
        specs: "8GB/256GB • Snapdragon 8 Gen 2 • Mulus Like New",
        img: "https://images.samsung.com/is/image/samsung/p6pim/id/2302/gallery/id-galaxy-s23-s911-sm-s911bzgbxid-thumb-534863345"
    },
    {
        id: 6,
        name: "Sony Xperia XZ3",
        brand: "sony",
        price: 1850000,
        specs: "4GB/64GB • Snapdragon 845 • OLED Curved",
        img: "https://www.sony.co.id/image/738df9ea0b1b11f67f6b955c4d0b13ed?fmt=png-alpha&wid=440"
    },
    {
        id: 7,
        name: "Xiaomi 13T Pro",
        brand: "xiaomi",
        price: 7800000,
        specs: "12GB/512GB • Dimensity 9200+ • Kamera Leica",
        img: "https://i02.appmifile.com/839_operator_sg/19/09/2023/15c54c344d9f66bb4f603c80be0a5a54.png"
    },
    {
        id: 8,
        name: "Google Pixel 7",
        brand: "google",
        price: 5900000,
        specs: "8GB/128GB • Google Tensor G2 • Dual SIM",
        img: "https://lh3.googleusercontent.com/97-4N6F9Zk"
    },
    {
        id: 9,
        name: "iPhone 13",
        brand: "apple",
        price: 8500000,
        specs: "128GB • A15 Bionic • BH 88% iBox",
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-blue-select-2021"
    },
    {
        id: 10,
        name: "iPhone 14 Pro Max",
        brand: "apple",
        price: 14200000,
        specs: "256GB • Dynamic Island • BH 91% Fullset",
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple"
    }
];

// STATE MANAGEMENT
let cart = [];
let currentUser = null;
