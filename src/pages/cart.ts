import { getCartItems, removeFromCart, updateCartLink } from '../state/cart';

export function renderCartPage(root: HTMLElement) {
    const cartItems = getCartItems();

    root.innerHTML = `
    <header class="cart-header">
      <h1>Shopping Cart</h1>
      <nav>
        <a href="#/catalog">Back to Catalog</a>
        <a href="#/about">About</a>
      </nav>
    </header>
    <div class="cart-container">
      ${cartItems.length === 0 ? `
        <p>Your cart is empty. <a href="#/catalog">Go to Catalog</a></p>
      ` : `
        <ul class="cart-list" style="list-style: none;">
          ${cartItems.map(item => `
            <li class="cart-item">
            <div style="max-width: 400px; max-height: 400px;">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width: 100%"/>
            </div>
              <div class="cart-item-details">
                <h2>${item.name}</h2>
                <p>Price: ${item.price?.toFixed ? item.price.toFixed(2) : 'N/A'} €</p>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
              </div>
            </li>
          `).join('')}
        </ul>
      `}
    </div>
  `;

    document.querySelectorAll('.remove-from-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = (btn as HTMLElement).getAttribute('data-id');
            if (id) {
                removeFromCart(id);
                renderCartPage(root);
            }
        });
    });

    updateCartLink();
}