interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartItems(): CartItem[] {
    return cart;
}

export function addToCart(item: CartItem) {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    saveCart();
}

export function removeFromCart(id: string) {
    cart = cart.filter((i) => i.id !== id);
    saveCart();
}

export function clearCart() {
    cart = [];
    saveCart();
}

export function updateCartLink() {
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        const count = getCartItems().reduce((sum, item) => sum + item.quantity, 0);
        cartLink.textContent = `Cart (${count})`;
    }
}