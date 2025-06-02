import { getProductById } from '../api/commercetools';

export async function renderProductDetailsPage(root: HTMLElement, productId: string) {
    root.innerHTML = '<h2>Loading product details...</h2>';

    try {
        const product = await getProductById(productId);
        const imageUrl = product.image || 'https://via.placeholder.com/400x300';

        let priceHTML = '';
        if (product.discountedPrice) {
            priceHTML = `
        <p style="font-size: 1.2rem;">
          <span style="text-decoration: line-through; color: #888;">${product.originalPrice} €</span>
          <span style="color: #d9534f; font-weight: bold; margin-left: 0.5rem;">${product.discountedPrice} €</span>
        </p>
      `;
        } else {
            priceHTML = `<p style="font-size: 1.2rem; font-weight: bold;">${product.originalPrice} €</p>`;
        }

        root.innerHTML = `
      <div class="product-details" style="padding: 2rem; max-width: 800px; margin: auto;">
        <img src="${imageUrl}" alt="${product.name}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px;" />
        <h2 style="margin: 1rem 0 0.5rem; font-size: 2rem;">${product.name}</h2>
        ${priceHTML}
        <p style="font-size: 1rem; color: #333;">${product.description || 'No description available.'}</p>
        <a href="#/catalog" style="display: inline-block; margin-top: 1rem; color: #007bff; text-decoration: underline;">&larr; Back to Catalog</a>
      </div>
    `;
    } catch (err) {
        root.innerHTML = '<p class="error">⚠️ Failed to load product details. Please try again later.</p>';
        console.error(err);
    }
}
