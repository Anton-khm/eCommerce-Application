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

export function getCart(): CartItem[] {
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