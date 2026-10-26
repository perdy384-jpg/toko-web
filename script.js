
"use strict";

// GANTI DENGAN NOMOR WHATSAPP TOKO.
// Contoh: 081234567890 menjadi 6281234567890.
const NOMOR_WHATSAPP = "6281234567890";

const products = [
  { id: 1, name: "Headphone Wireless", category: "Elektronik", price: 185000, description: "Headphone untuk musik dan belajar.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Smartwatch Sport", category: "Elektronik", price: 275000, description: "Jam pintar untuk aktivitas harian.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Tas Ransel", category: "Fashion", price: 150000, description: "Tas praktis untuk sekolah dan bepergian.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Sneakers Casual", category: "Fashion", price: 320000, description: "Sepatu santai untuk kegiatan sehari-hari.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Kacamata Modern", category: "Aksesori", price: 95000, description: "Gaya simpel untuk melengkapi penampilan.", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Botol Minum", category: "Rumah", price: 45000, description: "Botol minum untuk aktivitas sehari-hari.", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80" },
  { id: 7, name: "Keyboard Mechanical", category: "Elektronik", price: 350000, description: "Keyboard untuk mengetik dan bermain game.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80" },
  { id: 8, name: "Kaos Basic", category: "Fashion", price: 75000, description: "Kaos kasual yang nyaman digunakan.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80" },
  { id: 9, name: "Lampu Meja", category: "Rumah", price: 120000, description: "Lampu untuk meja belajar atau kerja.", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80" },
  { id: 10, name: "Dompet Minimalis", category: "Aksesori", price: 65000, description: "Dompet ringkas untuk barang penting.", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80" },
  { id: 11, name: "Speaker Bluetooth", category: "Elektronik", price: 210000, description: "Speaker portabel untuk mendengarkan musik.", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80" },
  { id: 12, name: "Topi Casual", category: "Fashion", price: 55000, description: "Topi simpel untuk melengkapi gaya.", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80" }
];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");

let cart = loadCart();
let noticeTimer;

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}

function loadCart() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("komengStoreCart") || "[]"
    );

    if (!Array.isArray(saved)) return [];

    return saved.filter(item =>
      Number.isInteger(item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      products.some(product => product.id === item.id)
    );
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem("komengStoreCart", JSON.stringify(cart));
  } catch {
    showNotice("Keranjang tidak dapat disimpan di browser.");
  }
}

function showNotice(message) {
  const notice = document.getElementById("notice");
  notice.textContent = message;
  notice.style.display = "block";

  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => {
    notice.style.display = "none";
  }, 2800);
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const sort = sortSelect.value;

  let filtered = products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(query);
    const matchesCategory =
      category === "all" || product.category === category;

    return matchesName && matchesCategory;
  });

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (filtered.length === 0) {
    productGrid.innerHTML =
      '<p class="empty-state">Produk tidak ditemukan. Coba kata kunci lain.</p>';
    return;
  }

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <img
        class="product-image"
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23eeeeee%22/%3E%3Ctext x=%22200%22 y=%22150%22 font-size=%2220%22 text-anchor=%22middle%22 fill=%22%23777777%22%3EGambar tidak tersedia%3C/text%3E%3C/svg%3E';"
      >
      <div class="product-info">
        <span class="category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
        <p class="price">${rupiah(product.price)}</p>
        <button class="add-button" type="button" data-add="${product.id}">
          + Tambah ke Keranjang
        </button>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  saveCart();
  renderCart();
  showNotice(product.name + " ditambahkan ke keranjang.");
}

function changeQuantity(id, change) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  showNotice("Produk dihapus dari keranjang.");
}

function clearCart() {
  if (cart.length === 0) {
    showNotice("Keranjang sudah kosong.");
    return;
  }

  if (!confirm("Yakin ingin mengosongkan keranjang?")) return;

  cart = [];
  saveCart();
  renderCart();
  showNotice("Keranjang berhasil dikosongkan.");
}

function renderCart() {
  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find(product => product.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  document.getElementById("cartCount").textContent = totalQuantity;
  document.getElementById("itemCount").textContent = totalQuantity;
  document.getElementById("cartTotal").textContent = rupiah(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-state">Keranjang masih kosong. Yuk, pilih produk favoritmu!</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(product => product.id === item.id);
    if (!product) return "";

    return `
      <div class="cart-row">
        <div>
          <div class="cart-product-name">${product.name}</div>
          <div class="cart-product-price">${rupiah(product.price)} per item</div>
        </div>

        <div class="quantity-control" aria-label="Jumlah ${product.name}">
          <button type="button" data-minus="${product.id}"
            aria-label="Kurangi jumlah ${product.name}">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-plus="${product.id}"
            aria-label="Tambah jumlah ${product.name}">+</button>
        </div>

        <strong>${rupiah(product.price * item.quantity)}</strong>

        <button class="remove-button" type="button"
          data-remove="${product.id}">Hapus</button>
      </div>
    `;
  }).join("");
}

// Menangani tombol tambah, kurangi, dan hapus.
document.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const minusButton = event.target.closest("[data-minus]");
  const plusButton = event.target.closest("[data-plus]");
  const removeButton = event.target.closest("[data-remove]");

  if (addButton) addToCart(Number(addButton.dataset.add));
  if (minusButton) changeQuantity(Number(minusButton.dataset.minus), -1);
  if (plusButton) changeQuantity(Number(plusButton.dataset.plus), 1);
  if (removeButton) removeFromCart(Number(removeButton.dataset.remove));
});

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);

document.getElementById("cartJump").addEventListener("click", () => {
  document.getElementById("keranjang").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("clearCart").addEventListener("click", clearCart);

// Menyusun data pesanan dan membuka WhatsApp.
document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();

  if (cart.length === 0) {
    showNotice("Keranjang masih kosong. Pilih produk terlebih dahulu.");
    document.getElementById("produk").scrollIntoView({
      behavior: "smooth"
    });
    return;
  }

  if (!/^[1-9]\d{7,14}$/.test(NOMOR_WHATSAPP)) {
    showNotice("Nomor WhatsApp toko belum diatur dengan benar.");
    return;
  }

  const customerName = document.getElementById("customerName").value.trim();
  const customerPhone = document.getElementById("customerPhone").value.trim();
  const customerAddress = document.getElementById("customerAddress").value.trim();
  const paymentMethod = document.getElementById("paymentMethod").value;
  const shippingMethod = document.getElementById("shippingMethod").value;
  const orderNotes = document.getElementById("orderNotes").value.trim();

  if (
    !customerName ||
    !customerPhone ||
    !customerAddress ||
    !paymentMethod ||
    !shippingMethod
  ) {
    showNotice("Mohon lengkapi semua data wajib.");
    return;
  }

  let total = 0;
  let pesan = "HALO KOMENG STORE, SAYA INGIN MEMESAN:\n\n";

  pesan += "=== DATA PEMBELI ===\n";
  pesan += `Nama: ${customerName}\n`;
  pesan += `Nomor HP: ${customerPhone}\n`;
  pesan += `Alamat: ${customerAddress}\n\n`;
  pesan += "=== RINCIAN PESANAN ===\n";

  cart.forEach((item, index) => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;

    const subtotal = product.price * item.quantity;
    total += subtotal;

    pesan += `${index + 1}. ${product.name}\n`;
    pesan += `   Harga: ${rupiah(product.price)}\n`;
    pesan += `   Jumlah: ${item.quantity}\n`;
    pesan += `   Subtotal: ${rupiah(subtotal)}\n\n`;
  });

  const jumlahBarang = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  pesan += "=== RINGKASAN ===\n";
  pesan += `Total barang: ${jumlahBarang}\n`;
  pesan += `Total harga produk: ${rupiah(total)}\n`;
  pesan += "Ongkos kirim: Mohon konfirmasi dengan penjual\n";
  pesan += `Metode pembayaran: ${paymentMethod}\n`;
  pesan += `Metode pengiriman: ${shippingMethod}\n`;

  if (orderNotes) {
    pesan += `Catatan: ${orderNotes}\n`;
  }

  pesan += "\nMohon konfirmasi ketersediaan barang dan total pembayaran. Terima kasih.";

  const whatsappURL =
    "https://wa.me/" + NOMOR_WHATSAPP +
    "?text=" + encodeURIComponent(pesan);

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
