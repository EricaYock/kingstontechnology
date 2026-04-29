export default function decorate(block) {
  const rows = [...block.children];
  block.classList.add('cart-block');

  const container = document.createElement('div');
  container.className = 'cart-container';

  // Parse product entries from rows
  const products = [];
  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length >= 2) {
      const product = {
        image: cols[0].querySelector('img'),
        details: cols[1],
      };
      products.push(product);
    }
  });

  if (products.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty</p>
        <a href="/" class="button">Continue Shopping</a>
      </div>
    `;
  } else {
    const cartItems = document.createElement('div');
    cartItems.className = 'cart-items';

    products.forEach((product) => {
      const item = document.createElement('div');
      item.className = 'cart-item';

      const imgDiv = document.createElement('div');
      imgDiv.className = 'cart-item-image';
      if (product.image) {
        const img = document.createElement('img');
        img.src = product.image.src;
        img.alt = product.image.alt || '';
        imgDiv.append(img);
      }

      const detailsDiv = document.createElement('div');
      detailsDiv.className = 'cart-item-details';
      detailsDiv.innerHTML = product.details.innerHTML;

      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'cart-item-actions';

      const qtyLabel = document.createElement('label');
      qtyLabel.textContent = 'Qty:';
      const qtySelect = document.createElement('select');
      qtySelect.className = 'cart-qty';
      for (let i = 1; i <= 10; i += 1) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        qtySelect.append(opt);
      }

      const removeBtn = document.createElement('button');
      removeBtn.className = 'cart-remove';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        item.remove();
        if (!cartItems.children.length) {
          container.innerHTML = `
            <div class="cart-empty">
              <p>Your cart is empty</p>
              <a href="/" class="button">Continue Shopping</a>
            </div>
          `;
        }
      });

      actionsDiv.append(qtyLabel, qtySelect, removeBtn);
      item.append(imgDiv, detailsDiv, actionsDiv);
      cartItems.append(item);
    });

    const cartSummary = document.createElement('div');
    cartSummary.className = 'cart-summary';
    cartSummary.innerHTML = `
      <h3>Order Summary</h3>
      <div class="cart-summary-row"><span>Subtotal</span><span>—</span></div>
      <div class="cart-summary-row"><span>Shipping</span><span>Free</span></div>
      <div class="cart-summary-row cart-total"><span>Total</span><span>—</span></div>
      <a href="#" class="button cart-checkout">Proceed to Checkout</a>
    `;

    container.append(cartItems, cartSummary);
  }

  block.textContent = '';
  block.append(container);
}
