import { getCart, removeFromCart, clearCart } from '../state/cart';

export function renderCartPage(root: HTMLElement) {
    const cart = getCart();

    if (cart.length === 0) {
        root.innerHTML = `
      <div class="cart-empty">
        <h2>Cart is empty</h2>
        <a href="#/catalog">Go to catalog</a>
      </div>
    `;
        return;
    }

    root.innerHTML = `
    <h1>Корзина</h1>
    <div id="cart-items">
      ${cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h3>${item.name}</h3>
            <p>${item.price} ₽ × ${item.quantity}</p>
            <button class="remove-btn" data-id="${item.id}">Удалить</button>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="cart-nav">
      <a href="#/catalog">Catalog</a>
      <a href="#/about">About</a>
    </div>
  `;

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = (e.target as HTMLButtonElement).dataset.id!;
            removeFromCart(id);
            renderCartPage(root);
        });
    });
}