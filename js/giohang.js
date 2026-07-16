document.addEventListener('DOMContentLoaded', () => {
  const cartItems = document.getElementById('cart-items');
  const cartTable = document.getElementById('cart-table');
  const emptyState = document.getElementById('cart-empty-state');
  const itemCount = document.getElementById('cart-item-count');
  const summaryQty = document.getElementById('summary-qty');
  const summaryTotal = document.getElementById('summary-total');
  const checkoutButton = document.getElementById('checkout-btn');
  const clearCartButton = document.getElementById('clear-cart-btn');

  function renderCart() {
    const cart = CartDemo.getCart();
    const summary = CartDemo.getSummary(cart);

    itemCount.textContent = `${summary.quantity} sản phẩm`;
    summaryQty.textContent = summary.quantity;
    summaryTotal.textContent = CartDemo.formatVND(summary.total);

    if (!cart.length) {
      emptyState.classList.remove('d-none');
      cartTable.classList.add('d-none');
      cartItems.innerHTML = '';
      checkoutButton.disabled = true;
      clearCartButton.disabled = true;
      return;
    }

    emptyState.classList.add('d-none');
    cartTable.classList.remove('d-none');
    checkoutButton.disabled = false;
    clearCartButton.disabled = false;

    cartItems.innerHTML = cart.map(item => `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-3">
            <img src="../${item.img}" alt="${item.name}" style="width:72px;height:72px;object-fit:contain;background:#fff;border-radius:12px;padding:8px;box-shadow:0 1px 4px rgba(0,0,0,.08);">
            <div>
              <div class="fw-bold" style="color:#0d1b3e">${item.name}</div>
              <div class="small text-muted">${item.model}</div>
            </div>
          </div>
        </td>
        <td class="text-center">
          <div class="d-inline-flex align-items-center gap-2">
            <button class="btn btn-sm btn-outline-dark" data-action="decrease" data-model="${item.model}">-</button>
            <span class="fw-bold" style="min-width: 24px; display: inline-block;">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-dark" data-action="increase" data-model="${item.model}">+</button>
          </div>
        </td>
        <td class="text-end">${CartDemo.formatVND(item.price)}</td>
        <td class="text-end fw-bold text-danger">${CartDemo.formatVND(item.price * item.quantity)}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-danger" data-action="remove" data-model="${item.model}">
            Xóa
          </button>
        </td>
      </tr>
    `).join('');
  }

  cartItems.addEventListener('click', event => {
    const actionButton = event.target.closest('[data-action]');

    if (!actionButton) {
      return;
    }

    const model = actionButton.dataset.model;
    const action = actionButton.dataset.action;
    const currentItem = CartDemo.getCart().find(item => item.model === model);

    if (!currentItem) {
      return;
    }

    if (action === 'increase') {
      CartDemo.updateItem(model, currentItem.quantity + 1);
    }

    if (action === 'decrease') {
      if (currentItem.quantity <= 1) {
        CartDemo.removeItem(model);
      } else {
        CartDemo.updateItem(model, currentItem.quantity - 1);
      }
    }

    if (action === 'remove') {
      CartDemo.removeItem(model);
    }

    renderCart();
  });

  checkoutButton.addEventListener('click', () => {
    const cart = CartDemo.getCart();

    if (!cart.length) {
      alert('Giỏ hàng đang trống.');
      return;
    }

    alert('Thanh toán thành công (demo). Cảm ơn bạn đã đặt hàng.');
    CartDemo.clearCart();
    renderCart();
  });

  clearCartButton.addEventListener('click', () => {
    const cart = CartDemo.getCart();

    if (!cart.length) {
      return;
    }

    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng không?')) {
      CartDemo.clearCart();
      renderCart();
    }
  });

  renderCart();
});