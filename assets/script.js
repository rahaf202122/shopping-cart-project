// ===============================
// PRODUCTS
// ===============================

const products = [

  // ☕ Hot Drinks (100-104)
  {
    name: "Almond Latte ☕",
    price: 18,
    quantity: 0,
    productId: 100,
    image: "./images/drinks/latte.png"
  },
  {
    name: "Nescafé ☕",
    price: 12,
    quantity: 0,
    productId: 106,
    image: "./images/drinks/nescafe.png"
  },
  {
    name: "Espresso ☕",
    price: 10,
    quantity: 0,
    productId: 107,
    image: "./images/drinks/espresso.svg"
  },
  {
    name: "Cappuccino ☕",
    price: 16,
    quantity: 0,
    productId: 108,
    image: "./images/drinks/cappuccino.svg"
  },
  {
    name: "Matcha Latte 🍵",
    price: 20,
    quantity: 0,
    productId: 109,
    image: "./images/drinks/matcha.svg"
  },

  // 🍪 Cookies (103, 110-113)
  {
    name: "Cookies Box 🍪",
    price: 12,
    quantity: 0,
    productId: 103,
    image: "./images/cookies/cokie.png"
  },
  {
    name: "Oreo Stack 🍪",
    price: 10,
    quantity: 0,
    productId: 110,
    image: "./images/cookies/oreo.svg"
  },
  {
    name: "Choco Chip 🍪",
    price: 11,
    quantity: 0,
    productId: 111,
    image: "./images/cookies/chocchip.svg"
  },
  {
    name: "Macarons 🎀",
    price: 15,
    quantity: 0,
    productId: 112,
    image: "./images/cookies/macaron.svg"
  },
  {
    name: "Fudge Brownie 🍫",
    price: 14,
    quantity: 0,
    productId: 113,
    image: "./images/cookies/brownie.svg"
  },

  // 🍹 Mojito (101, 114-117)
  {
    name: "Blue Mojito 🍹",
    price: 15,
    quantity: 0,
    productId: 101,
    image: "./images/mojito/blue.png"
  },
  {
    name: "Pink Mojito 🌸",
    price: 15,
    quantity: 0,
    productId: 114,
    image: "./images/mojito/pink.svg"
  },
  {
    name: "Strawberry Mojito 🍓",
    price: 16,
    quantity: 0,
    productId: 115,
    image: "./images/mojito/strawberry.svg"
  },
  {
    name: "Virgin Mojito 🍃",
    price: 13,
    quantity: 0,
    productId: 116,
    image: "./images/mojito/virgin.svg"
  },
  {
    name: "Passion Mojito 🌼",
    price: 16,
    quantity: 0,
    productId: 117,
    image: "./images/mojito/passion.svg"
  },

  // 🍨 Ice Cream (104, 118-121)
  {
    name: "Vanilla Ice Cream 🍨",
    price: 10,
    quantity: 0,
    productId: 104,
    image: "./images/icecreem/icecreem.png"
  },
  {
    name: "Choco Cone 🍦",
    price: 10,
    quantity: 0,
    productId: 118,
    image: "./images/icecreem/chocolate.svg"
  },
  {
    name: "Strawberry 🍓",
    price: 10,
    quantity: 0,
    productId: 119,
    image: "./images/icecreem/strawberry.svg"
  },
  {
    name: "Pistachio 🟢",
    price: 12,
    quantity: 0,
    productId: 120,
    image: "./images/icecreem/pistachio.svg"
  },
  {
    name: "Mango Pop 🥭",
    price: 11,
    quantity: 0,
    productId: 121,
    image: "./images/icecreem/mango.svg"
  },

  // 🍰 Cakes (102, 122-125)
  {
    name: "Chocolate Cake 🍰",
    price: 22,
    quantity: 0,
    productId: 102,
    image: "./images/cake/choclate.png"
  },
  {
    name: "Red Velvet 🎂",
    price: 25,
    quantity: 0,
    productId: 122,
    image: "./images/cake/redvelvet.svg"
  },
  {
    name: "Berry Cheesecake 🍓",
    price: 28,
    quantity: 0,
    productId: 123,
    image: "./images/cake/cheesecake.svg"
  },
  {
    name: "Tiramisu ☕",
    price: 24,
    quantity: 0,
    productId: 124,
    image: "./images/cake/tiramisu.svg"
  },
  {
    name: "Pink Cupcake 🧁",
    price: 14,
    quantity: 0,
    productId: 125,
    image: "./images/cake/cupcake2.svg"
  },

  // 💨 Shisha (105, 126-129)
  {
    name: "Mint Shisha 💨",
    price: 30,
    quantity: 0,
    productId: 105,
    image: "./images/shisha/shisha.png"
  },
  {
    name: "Grape Shisha 🍇",
    price: 30,
    quantity: 0,
    productId: 126,
    image: "./images/shisha/grape.svg"
  },
  {
    name: "Watermelon 🍉",
    price: 30,
    quantity: 0,
    productId: 127,
    image: "./images/shisha/watermelon.svg"
  },
  {
    name: "Double Apple 🍏",
    price: 32,
    quantity: 0,
    productId: 128,
    image: "./images/shisha/double.svg"
  },
  {
    name: "Lemon Mint 🍋",
    price: 30,
    quantity: 0,
    productId: 129,
    image: "./images/shisha/lemon.svg"
  }

];

// ===============================
// CART
// ===============================

let cart = [];

function addProductToCart(productId) {
  const product = products.find(p => p.productId === productId);
  if (!product) return;
  const existing = cart.find(p => p.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId: product.productId, name: product.name, price: product.price, quantity: 1 });
  }
}

function removeProductFromCart(productId) {
  cart = cart.filter(p => p.productId !== productId);
}

function increaseQuantity(productId) {
  const item = cart.find(p => p.productId === productId);
  if (item) item.quantity += 1;
}

function decreaseQuantity(productId) {
  const item = cart.find(p => p.productId === productId);
  if (!item) return;
  item.quantity -= 1;
  if (item.quantity <= 0) removeProductFromCart(productId);
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Global variable to hold the cumulative amount paid by the customer
let totalPaid = 0;

function pay(amount) {
  totalPaid += amount;
  return parseFloat((totalPaid - cartTotal()).toFixed(2));
}

function emptyCart() {
  cart = [];
  totalPaid = 0;
}
