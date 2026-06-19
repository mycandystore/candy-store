let cart = JSON.parse(localStorage.getItem('cart')) || {};

// 🔥 كل المنتجات (لازم كل IDs تكون فريدة)
const allProducts = [
    // 🎁 بوكسات
    { id: 1, name: "بوكس كاندي كيلو", price: 200 },
    { id: 2, name: "بوكيه كاندي ورد", price: 195 },
    { id: 3, name: "بوكيه كاندي 1/2 كيلو", price: 225 },
    { id: 4, name: "بوكيه كاندي 400 جرام", price: 220 },

    // 🍜 اندومي (من 100)
    { id: 101, name: "اندومي بينك", price: 110
     },
    { id: 102, name: "اندومي كريمي", price: 110 },
    { id: 103, name: "اندومي اكس1", price: 110 },
    { id: 104, name: "اندومي اكس2", price: 110 },
    { id: 105, name: "اندومي اكس3", price: 110 },
    { id: 106, name: "اندومي ليمون", price: 110 },
    { id: 107, name: "اندومي خضار", price: 110 },
    { id: 108, name: "اندومي كواترو", price: 110 },
    { id: 108, name: "اندومي كواترو", price: 110 },
    { id: 109, name: "اندومي صويا صوص", price: 100 },
    { id: 110, name: "اندومي سويت اند ساور", price: 100 },
    { id: 111, name: "اندومي فولكانو", price: 100 },
    { id: 112, name: "اندومي كاربونارا", price: 100 },
    { id: 113, name: "اندومي جبنه", price: 100 },
    { id: 114, name: "اندومي كيمتشي", price: 100 },
    
    { id: 115, name: "صوص اندومي بينك", price: 235 },
    { id: 116, name: "صوص اندومي اكس1", price: 235 },
    { id: 117, name: "صوص اندومي اكس2", price: 235 },
    { id: 118, name: "توبوكي جبنه", price: 145 },
    { id: 119, name: "توبوكي جبنه كاربونارا", price: 145 },
    { id: 120, name: "توبوكي حار", price: 145 },
    { id: 121, name: "توبوكي كب كيمتشي", price: 145 },
    { id: 122, name: "توبوكي كب ليمون", price: 145 },

    // 🍭 سويتس (من 200)
    { id: 200, name: "شيكولاته دبي ميلك", price: 135 },
    { id: 201, name: "شيكولاته دبي وايت", price: 135 },
    { id: 202, name: "شيكولاته دبي كنافه لوتس وايت", price: 135 },
    { id: 203, name: "شيكولاته دبي كنافه لوز وايت", price: 135 },
    { id: 204, name: "شيكولاته دبي كنافه مانجا وايت", price: 135 },
    { id: 205, name: "توبليرون ميلك الماني", price: 105 },
    { id: 206, name: "كاندي مشكل كيلو", price: 200 },
    { id: 207, name: "كونو بايتس 1/2 كيلو", price: 75 },
    { id: 208, name: "ويفر رول 1/2 كيلو", price: 80 },
    { id: 209, name: "فواكه مجففة 100جم", price: 150 },
    // 🍭 سويتس (من 300)

    { id: 300, name: "لونج شيبس جبنه", price: 30 },
{ id: 301, name: "لونج شيبس اوريجمال", price: 30 },
{ id: 302, name: "لونج شيبس ساور كريم", price: 30 },
{ id: 303, name: "لونج شيبس سبايسي", price: 30 },
{ id: 304, name: "لونج شيبس عثل", price: 30 },
{ id: 305, name: "لونج شيبس خل وملح", price: 30 },
{ id: 306, name: "تي رولز170جرام", price: 60 },
{ id: 307, name: "تي رولز ازرق", price: 30 },
{ id: 308, name: "تي رولز اخضر", price: 30 },
];

// تحميل المنتجات
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    
    pageProducts.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });

    updateCartDisplay();
}

// إنشاء الكارت
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const qty = cart[product.id] || 0;
    const inCart = qty > 0;

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image"
        onerror="this.src='https://via.placeholder.com/300x140/3498db/ffffff?text=${encodeURIComponent(product.name)}'">

        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price} جنيه</div>

            <div class="counter" style="display:${inCart ? 'flex' : 'none'};">
                <button class="counter-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
                <span class="counter-value">${qty}</span>
                <button class="counter-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
            </div>

            <div class="product-actions">
                ${inCart 
                    ? `<button class="remove-btn" onclick="removeProduct(${product.id})">🗑️ إزالة</button>`
                    : `<button class="add-btn" onclick="addToCart(${product.id})">أضف للسلة</button>`
                }
            </div>
        </div>
    `;
    return card;
}

// إضافة للسلة
function addToCart(id) {
    cart[id] = 1;
    saveCart();
    loadProducts();
}

// تعديل الكمية
function changeQuantity(id, change) {
    if (!cart[id]) return;

    cart[id] += change;

    if (cart[id] <= 0) {
        delete cart[id];
    }

    saveCart();
    loadProducts();
}

// حذف منتج
function removeProduct(id) {
    delete cart[id];
    saveCart();
    loadProducts();
}

// تحديث السلة (🔥 المهم)
function updateCartDisplay() {
    let total = 0;
    let count = 0;

    for (let id in cart) {
        const product = allProducts.find(p => p.id == id);

        if (product) {
            total += product.price * cart[id];
            count += cart[id];
        }
    }

    const totalEl = document.getElementById('totalPrice');
    const countEl = document.getElementById('itemsCount');

    if (totalEl) totalEl.textContent = total;
    if (countEl) countEl.textContent = count + " قطعة";

    // تحديث السلة العائمة كمان
    updateFloatingCart();
}

// إرسال الطلب
function sendOrder() {
    if (Object.keys(cart).length === 0) {
        alert('السلة فارغة!');
        return;
    }

    let text = "📋 طلب جديد\n\n";
    let total = 0;

    for (let id in cart) {
        const product = allProducts.find(p => p.id == id);

        if (product) {
            const qty = cart[id];
            const subtotal = product.price * qty;

            text += `• ${product.name} (${qty}) = ${subtotal}ج\n`;
            total += subtotal;
        }
    }

    text += `\n💰 الإجمالي: ${total} جنيه`;

    window.open(`https://wa.me/201142684154?text=${encodeURIComponent(text)}`);
}
document.getElementById("clearCartBtn").addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
        alert("السلة بالفعل فارغة!");
        return;
    }

    const confirmClear = confirm("هل تريد حقًا إفراغ السلة؟");
    if (confirmClear) {
        clearCart(); // تنادي دالة إفراغ السلة الجاهزة
        alert("تم إفراغ السلة بنجاح!");
    }
});

// تفريغ السلة
function clearCart() {
    cart = {};
    saveCart();
    loadProducts();
}

// حفظ
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// تشغيل
document.addEventListener('DOMContentLoaded', loadProducts);

/* ============================================
   🛒 السلة العائمة (Floating Cart)
   بتفضل ظاهرة فوق الصفحة وانت بتمرر، وبتفتح
   نافذة سريعة فيها تفاصيل السلة وزرار الإرسال
   ============================================ */

// إضافة الـ CSS الخاص بالسلة العائمة مرة واحدة بس
function injectFloatingCartStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .floating-cart-btn {
            position: fixed;
            bottom: calc(20px + env(safe-area-inset-bottom, 0px));
            left: calc(20px + env(safe-area-inset-left, 0px));
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ff6b9d, #c44569);
            color: #fff;
            border: none;
            font-size: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(196, 69, 105, 0.45);
            z-index: 999999;
            transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .floating-cart-btn:active { transform: scale(0.92); }
        .floating-cart-btn.empty { opacity: 0; pointer-events: none; transform: scale(0.6); }

        /* على الموبايل: نرفع الزرار شوية لفوق عشان يضمن إنه فوق أي شريط تحكم
           بيظهر في متصفح الموبايل أو في المتصفح الداخلي بتاع واتساب/إنستجرام */
        @media (max-width: 768px) {
            .floating-cart-btn {
                bottom: calc(85px + env(safe-area-inset-bottom, 0px));
                width: 56px;
                height: 56px;
                font-size: 24px;
            }
        }

        .floating-cart-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            background: #2ecc71;
            color: #fff;
            font-size: 12px;
            font-weight: 700;
            min-width: 22px;
            height: 22px;
            border-radius: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 5px;
            box-shadow: 0 0 0 2px #fff;
        }

        .floating-cart-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            z-index: 9999;
            display: none;
            align-items: flex-end;
            justify-content: center;
        }
        .floating-cart-overlay.open { display: flex; }

        .floating-cart-sheet {
            background: #fff;
            width: 100%;
            max-width: 480px;
            max-height: 80vh;
            border-radius: 20px 20px 0 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            animation: floatingCartSlideUp 0.25s ease-out;
            font-family: 'Cairo', sans-serif;
        }
        @keyframes floatingCartSlideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }

        .floating-cart-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 18px;
            border-bottom: 1px solid #eee;
        }
        .floating-cart-header h3 { margin: 0; font-size: 18px; }
        .floating-cart-close {
            background: #f1f1f1;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            font-size: 18px;
            cursor: pointer;
            line-height: 1;
        }

        .floating-cart-items {
            overflow-y: auto;
            padding: 6px 18px;
            flex: 1;
        }
        .floating-cart-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            padding: 10px 0;
            border-bottom: 1px solid #f3f3f3;
        }
        .floating-cart-item-name { font-size: 14px; font-weight: 600; }
        .floating-cart-item-price { font-size: 12px; color: #888; margin-top: 2px; }
        .floating-cart-item-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
        }
        .floating-cart-item-controls button {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            border: 1px solid #ddd;
            background: #fafafa;
            cursor: pointer;
            font-size: 15px;
            line-height: 1;
        }
        .floating-cart-empty {
            text-align: center;
            color: #999;
            padding: 40px 10px;
            font-size: 14px;
        }

        .floating-cart-footer {
            padding: 14px 18px calc(14px + env(safe-area-inset-bottom, 0px));
            border-top: 1px solid #eee;
        }
        .floating-cart-total {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 12px;
        }
        .floating-cart-actions { display: flex; gap: 10px; }
        .floating-cart-actions button {
            flex: 1;
            padding: 12px;
            border-radius: 10px;
            border: none;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
        }
        .floating-cart-send { background: #25D366; color: #fff; }
        .floating-cart-clear { background: #fbeaea; color: #c0392b; }
    `;
    document.head.appendChild(style);
}

// إنشاء الزرار العائم + نافذة السلة وإضافتهم للصفحة
function createFloatingCart() {
    // الزرار العائم
    const btn = document.createElement('button');
    btn.className = 'floating-cart-btn';
    btn.id = 'floatingCartBtn';
    btn.setAttribute('aria-label', 'السلة');
    btn.innerHTML = `🛒<span class="floating-cart-badge" id="floatingCartBadge">0</span>`;
    btn.addEventListener('click', openFloatingCart);
    document.body.appendChild(btn);

    // النافذة المنبثقة (Bottom Sheet)
    const overlay = document.createElement('div');
    overlay.className = 'floating-cart-overlay';
    overlay.id = 'floatingCartOverlay';
    overlay.innerHTML = `
        <div class="floating-cart-sheet">
            <div class="floating-cart-header">
                <h3>🛒 سلة طلباتك</h3>
                <button class="floating-cart-close" id="floatingCartCloseBtn">×</button>
            </div>
            <div class="floating-cart-items" id="floatingCartItems"></div>
            <div class="floating-cart-footer">
                <div class="floating-cart-total">
                    <span>الإجمالي</span>
                    <span><span id="floatingCartTotal">0</span> جنيه</span>
                </div>
                <div class="floating-cart-actions">
                    <button class="floating-cart-clear" id="floatingCartClearBtn">🗑️ إفراغ</button>
                    <button class="floating-cart-send" id="floatingCartSendBtn">📲 إرسال الطلب</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // إغلاق عند الضغط على الخلفية أو زرار الإغلاق
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeFloatingCart();
    });
    document.getElementById('floatingCartCloseBtn').addEventListener('click', closeFloatingCart);
    document.getElementById('floatingCartClearBtn').addEventListener('click', clearCart);
    document.getElementById('floatingCartSendBtn').addEventListener('click', sendOrder);
}

function openFloatingCart() {
    renderFloatingCartItems();
    document.getElementById('floatingCartOverlay').classList.add('open');
}

function closeFloatingCart() {
    document.getElementById('floatingCartOverlay').classList.remove('open');
}

// رسم محتوى السلة جوه النافذة
function renderFloatingCartItems() {
    const container = document.getElementById('floatingCartItems');
    if (!container) return;

    const ids = Object.keys(cart);

    if (ids.length === 0) {
        container.innerHTML = `<div class="floating-cart-empty">السلة فاضية حاليًا 🙂</div>`;
        return;
    }

    container.innerHTML = '';
    ids.forEach(id => {
        const product = allProducts.find(p => p.id == id);
        if (!product) return;

        const qty = cart[id];
        const item = document.createElement('div');
        item.className = 'floating-cart-item';
        item.innerHTML = `
            <div>
                <div class="floating-cart-item-name">${product.name}</div>
                <div class="floating-cart-item-price">${product.price} جنيه × ${qty}</div>
            </div>
            <div class="floating-cart-item-controls">
                <button onclick="changeQuantity(${product.id}, -1)">−</button>
                <span>${qty}</span>
                <button onclick="changeQuantity(${product.id}, 1)">+</button>
            </div>
        `;
        container.appendChild(item);
    });
}

// تحديث عدّاد وإجمالي الزرار العائم (بتتنادى من updateCartDisplay تلقائي)
function updateFloatingCart() {
    const badge = document.getElementById('floatingCartBadge');
    const btn = document.getElementById('floatingCartBtn');
    const totalEl = document.getElementById('floatingCartTotal');

    let total = 0;
    let count = 0;

    for (let id in cart) {
        const product = allProducts.find(p => p.id == id);
        if (product) {
            total += product.price * cart[id];
            count += cart[id];
        }
    }

    if (badge) badge.textContent = count;
    if (btn) btn.classList.toggle('empty', count === 0);
    if (totalEl) totalEl.textContent = total;

    // لو النافذة مفتوحة، حدّث محتواها كمان عشان تفضل لايف
    const overlay = document.getElementById('floatingCartOverlay');
    if (overlay && overlay.classList.contains('open')) {
        renderFloatingCartItems();
    }
}

// تشغيل السلة العائمة أول ما الصفحة تحمل
document.addEventListener('DOMContentLoaded', () => {
    injectFloatingCartStyles();
    createFloatingCart();
    updateFloatingCart();
});