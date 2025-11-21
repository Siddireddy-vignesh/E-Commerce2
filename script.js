// Simple cart as an object: { id: { name, price, qty } }
const cart = {};

const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

function addToCart(id, name, price) {
    if (!cart[id]) {
        cart[id] = { name, price: Number(price), qty: 0 };
    }
    cart[id].qty += 1;
    renderCart();
}

function changeQuantity(id, delta) {
    if (!cart[id]) return;
    cart[id].qty += delta;
    if (cart[id].qty <= 0) {
        delete cart[id];
    }
    renderCart();
}

function removeFromCart(id) {
    delete cart[id];
    renderCart();
}

function renderCart() {
    cartItemsEl.innerHTML = "";

    const ids = Object.keys(cart);
    if (ids.length === 0) {
        cartItemsEl.innerHTML = '<p class="empty-text">Cart is empty</p>';
        cartTotalEl.textContent = "0";
        cartCountEl.textContent = "0";
        checkoutBtn.disabled = true;
        return;
    }

    let total = 0;
    let itemCount = 0;

    ids.forEach((id) => {
        const item = cart[id];
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        itemCount += item.qty;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-qty-price">Qty: ${item.qty} × ₹${item.price}</span>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" data-id="${id}" data-action="dec">-</button>
                <button class="qty-btn" data-id="${id}" data-action="inc">+</button>
                <span>₹${itemTotal}</span>
                <button class="remove-btn" data-id="${id}" data-action="remove">Remove</button>
            </div>
        `;

        cartItemsEl.appendChild(cartItem);
    });

    cartTotalEl.textContent = total;
    cartCountEl.textContent = itemCount;
    checkoutBtn.disabled = false;
}

// Handle Add to Cart buttons
document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const price = btn.dataset.price;
        addToCart(id, name, price);
    });
});

// Handle quantity + remove actions (event delegation)
cartItemsEl.addEventListener("click", (e) => {
    const btn = e.target;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    if (!id || !action) return;

    if (action === "inc") {
        changeQuantity(id, 1);
    } else if (action === "dec") {
        changeQuantity(id, -1);
    } else if (action === "remove") {
        removeFromCart(id);
    }
});

// Fake checkout
checkoutBtn.addEventListener("click", () => {
    alert("This is a demo site. No real payment is processed.");
});
