window.CartDemo = (() => {
  const STORAGE_KEY = 'chocomint-demo-cart';

  function formatVND(value) {
    return new Intl.NumberFormat('vi-VN').format(value) + ' đ';
  }

  function getCart() {
    try {
      const rawCart = localStorage.getItem(STORAGE_KEY);
      const parsedCart = rawCart ? JSON.parse(rawCart) : [];
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function addItem(product, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.model === product.model);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        model: product.model,
        name: product.name,
        desc: product.desc,
        price: product.price,
        img: product.img,
        quantity
      });
    }

    saveCart(cart);
    return cart;
  }

  function updateItem(model, quantity) {
    const cart = getCart();
    const targetItem = cart.find(item => item.model === model);

    if (!targetItem) {
      return cart;
    }

    targetItem.quantity = Math.max(1, quantity);
    saveCart(cart);
    return cart;
  }

  function removeItem(model) {
    const cart = getCart().filter(item => item.model !== model);
    saveCart(cart);
    return cart;
  }

  function clearCart() {
    saveCart([]);
  }

  function getSummary(cart = getCart()) {
    return cart.reduce((summary, item) => {
      summary.quantity += item.quantity;
      summary.total += item.quantity * item.price;
      return summary;
    }, { quantity: 0, total: 0 });
  }

  return {
    formatVND,
    getCart,
    saveCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    getSummary
  };
})();