let currencySymbol = '$';

// ===============================
// DRAW PRODUCTS
// ===============================

function drawProducts() {
    const categories = {
        cakes:     [100, 106, 107, 108, 109],
        cookies:   [103, 110, 111, 112, 113],
        cupcake:   [101, 114, 115, 116, 117],
        croissant: [104, 118, 119, 120, 121],
        donut:     [102, 122, 123, 124, 125],
        rolls:     [105, 126, 127, 128, 129]
    };

    for (let category in categories) {
        let container = document.querySelector(`.${category}`);
        if (!container) continue;
        let productItems = '';

        categories[category].forEach(id => {
            const product = products.find(p => p.productId === id);
            if (product) {
                productItems += `
                    <div class="product-card" data-productId="${product.productId}">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="price">${currencySymbol}${product.price}</p>
                        <button class="add-to-cart">Add to Cart 🛒</button>
                    </div>
                `;
            }
        });

        container.innerHTML = productItems;
    }
}

// ===============================
// DRAW CART
// ===============================

function drawCart() {
    let cartList = document.querySelector('.cart');
    let cartItems = '';

    cart.forEach((element) => {
        let itemTotal = element.price * element.quantity;
        cartItems += `
            <div class="cart-item" data-productId="${element.productId}">
                <h3>${element.name}</h3>
                <p>Price: ${currencySymbol}${element.price}</p>
                <p>Qty: ${element.quantity} &nbsp;|&nbsp; Total: ${currencySymbol}${itemTotal}</p>
                <div class="cart-item-btns">
                    <button class="qup">+</button>
                    <button class="qdown">-</button>
                    <button class="remove">Remove</button>
                </div>
            </div>
        `;
    });

    cart.length
        ? (cartList.innerHTML = cartItems)
        : (cartList.innerHTML = '<p class="empty-msg">Cart is empty 🛒</p>');
}

// ===============================
// DRAW CHECKOUT
// ===============================

function drawCheckout() {
    let checkout = document.querySelector('.cart-total');
    let cartSum = cartTotal();
    checkout.innerHTML = `<p class="total-line">Cart Total: <strong>${currencySymbol}${cartSum}</strong></p>`;
}

// ===============================
// INITIALIZE
// ===============================

drawProducts();
drawCart();
drawCheckout();

// ===============================
// ADD TO CART
// ===============================

const categorySelectors = '.cakes, .cupcake, .croissant, .cookies, .donut, .rolls';

document.querySelectorAll(categorySelectors).forEach(container => {
    container.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart')) return;
        let productId = Number(e.target.parentNode.getAttribute('data-productId'));
        addProductToCart(productId);
        drawCart();
        drawCheckout();
        document.getElementById('cartbtn').classList.add('cart-bounce');
        setTimeout(() => document.getElementById('cartbtn').classList.remove('cart-bounce'), 400);
    });
});

// ===============================
// CART ACTIONS
// ===============================

document.querySelector('.cart').addEventListener('click', (e) => {
    function runCartFunction(fn) {
        let productId = Number(e.target.parentNode.parentNode.getAttribute('data-productId'));
        fn(productId);
        drawCart();
        drawCheckout();
    }
    if (e.target.classList.contains('remove')) {
        runCartFunction(removeProductFromCart);
    } else if (e.target.classList.contains('qup')) {
        runCartFunction(increaseQuantity);
    } else if (e.target.classList.contains('qdown')) {
        runCartFunction(decreaseQuantity);
    }
});

// ===============================
// PAY
// ===============================

document.querySelector('.pay').addEventListener('click', (e) => {
    e.preventDefault();
    let amount = Number(document.querySelector('.received').value);
    if (isNaN(amount) || amount <= 0) { alert('Please enter a valid amount.'); return; }
    if (cart.length === 0) { alert('Your cart is empty!'); return; }

    let cashReturn = pay(amount);
    let paymentSummary = document.querySelector('.pay-summary');
    let div = document.createElement('div');
    div.classList.add('receipt-block');

    if (cashReturn >= 0) {
        div.innerHTML = `
            <p>✅ Total Paid: ${currencySymbol}${totalPaid}</p>
            <p>🧾 Order Total: ${currencySymbol}${cartTotal()}</p>
            <p>💰 Change: ${currencySymbol}${cashReturn}</p>
            <p>🙏 Thank you! See you soon ☕</p>
        `;
        emptyCart();   // resets cart AND totalPaid = 0
        drawCart();
        drawCheckout();
        document.querySelector('.received').value = '';
    } else {
        document.querySelector('.received').value = '';
        div.innerHTML = `
            <p>💵 Paid so far: ${currencySymbol}${totalPaid}</p>
            <p>🧾 Order Total: ${currencySymbol}${cartTotal()}</p>
            <p>⚠️ Still need: ${currencySymbol}${Math.abs(cashReturn)}</p>
            <p>Please pay the remaining balance.</p><hr/>
        `;
    }
    paymentSummary.innerHTML = '';
    paymentSummary.append(div);
});

// ===============================
// EMPTY CART
// ===============================

function dropCart() {
    let shoppingCart = document.querySelector('.empty-btn');
    let btn = document.createElement('button');
    btn.classList.add('empty');
    btn.innerHTML = 'Empty Cart 🗑️';
    shoppingCart.append(btn);
}
dropCart();

document.querySelector('.empty-btn').addEventListener('click', (e) => {
    if (e.target.classList.contains('empty')) {
        emptyCart();
        drawCart();
        drawCheckout();
        document.querySelector('.pay-summary').innerHTML = '';
    }
});

// ===============================
// CART OPEN / CLOSE
// ===============================

const cartBtn = document.getElementById('cartbtn');
const cartSection = document.querySelector('.cart-section');
const closeCart = document.getElementById('closeCart');

cartBtn.addEventListener('click', () => { cartSection.classList.toggle('cart-open'); });
closeCart.addEventListener('click', () => { cartSection.classList.remove('cart-open'); });
