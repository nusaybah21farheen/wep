/* ---------- Simple Cart Storage ---------- */
let cart = [];

/* Get cart items */
function getCart() {
  return cart;
}

/* Save cart items */
function saveCart(newCart) {
  cart = newCart;
  updateCartCount();
}

/* Update cart item count in header */
function updateCartCount() {
  const countEl = document.getElementById('cartCount');
  if (!countEl) return;
  const totalQty = getCart().reduce((s, it) => s + it.qty, 0);
  countEl.textContent = totalQty;
}

/* ---------- 1) JavaScript Object + Add to Cart Event ---------- */
function initProductButtons() {
  document.querySelectorAll('.product .add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.product');

      // JavaScript object requirement
      const product = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: parseFloat(card.dataset.price),
        image: card.dataset.image
      };

      addToCart(product);

      // Feedback text
      e.target.textContent = 'Added ✓';
      setTimeout(() => (e.target.textContent = 'Add to Cart'), 1200);
    });
  });
}
function addToCart(product) {
  let cartItems = getCart();
  let item = cartItems.find(i => i.id === product.id);

  if (item) {
    item.qty += 1;
  } else {
    cartItems.push({ ...product, qty: 1 });
  }

  saveCart(cartItems);
}


/* ---------- 3) Dynamic HTML Creation ---------- */
function renderCart() {
  const container = document.getElementById('cartContainer');
  if (!container) return;

  const cartItems = getCart();

  if (cartItems.length === 0) {
    container.innerHTML = `<p>Your cart is empty!!</p>`;
    return;
  }

let rows = cartItems.map(it => `
    <tr>
      <td>${it.name}</td>
      <td>${money(it.price)}</td>
      <td>${it.qty}</td>
      <td>${money(it.price * it.qty)}</td>
    </tr>
  `).join('');
}

/* ---------- Initialize on Page Load ---------- */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initProductButtons();
  renderCart();
});

