import { getProductById } from '../api/commercetools';
import { addToCart } from '../state/cart';

export async function renderProductDetailsPage(root: HTMLElement, productId: string) {
  root.innerHTML = '<h2>Loading product details...</h2>';

  try {
    const product = await getProductById(productId);
    const variant = product.masterVariant;
    const name = product.name?.en || 'Unnamed';
    const description = product.description?.en || 'No description';
    const imageUrl = variant.images?.[0]?.url || 'https://via.placeholder.com/400x300';
    const priceData = variant.prices?.[0]?.value;
    const originalPrice = priceData ? (priceData.centAmount / 100).toFixed(2) : 'N/A';

    const price = priceData ? priceData.centAmount / 100 : 0;

    root.innerHTML = `
  <div class="product-details" style="padding: 2rem; max-width: 800px; margin: auto;">
    <img src="${imageUrl}" alt="${name}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px;" />
    <h2 style="margin: 1rem 0 0.5rem; font-size: 2rem;">${name}</h2>
    <p style="font-size: 1.2rem; font-weight: bold;">Price: $${price.toFixed(2)} €</p>
    <p style="font-size: 1rem; color: #333;">${description || 'No description available.'}</p>
    <button id="add-to-cart">Add to Cart</button>
    <a href="#/catalog" style="display: inline-block; margin-top: 1rem; color: #007bff; text-decoration: underline;">&larr; Back to Catalog</a>
  </div>
`;

    document.getElementById('add-to-cart')?.addEventListener('click', () => {
      addToCart({
        id: product.id,
        name,
        image: imageUrl,
        price,
        quantity: 1,
      });
    });
  } catch (err) {
    root.innerHTML = '<p class="error">⚠️ Failed to load product details. Please try again later.</p>';
    console.error(err);
  }
}