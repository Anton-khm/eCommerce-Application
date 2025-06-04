import { getProductList } from '../api/commercetools';
import { router } from '../router/router';

export async function renderCatalogPage(root: HTMLElement) {
    root.innerHTML = `
    <h2>Product Catalog</h2>
    <a href="#/" style="padding: 0.5rem 1rem; background: #007bff; color: #fff; text-decoration: none; border-radius: 4px; width: 90px; ">На главную</a>
    <div id="product-list" class="product-list" style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      padding: 1rem;
    "></div>
  `;

    const container = document.getElementById('product-list');

    try {
        const products = await getProductList();

        if (!products.length) {
            container!.innerHTML = '<p>No products found.</p>';
            return;
        }

        for (const product of products) {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.cssText = `
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
      `;

            const imageUrl = product.image || 'https://via.placeholder.com/150';

            let priceHTML = '';
            if (product.discountedPrice) {
                priceHTML = `
          <p style="margin: 0.5rem 0;">
            <span style="text-decoration: line-through; color: #888;">${product.originalPrice} €</span>
            <span style="color: #d9534f; font-weight: bold; margin-left: 0.5rem;">${product.discountedPrice} €</span>
          </p>
        `;
            } else {
                priceHTML = `<p style="margin: 0.5rem 0; font-weight: bold;">${product.originalPrice} €</p>`;
            }

            card.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}" style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 0.5rem;" />
        <h3 style="font-size: 1.2rem; margin: 0.5rem 0;">${product.name}</h3>
        <p style="font-size: 0.9rem; color: #555;">${product.description || 'No description available.'}</p>
        ${priceHTML}
        <button data-product-id="${product.id}" class="view-details-btn" style="margin-top: auto; padding: 0.5rem 1rem; border: none; background: #007bff; color: white; border-radius: 4px; cursor: pointer;">View Details</button>
      `;

            container!.appendChild(card);
        }

        container!.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('view-details-btn')) {
                const productId = target.getAttribute('data-product-id');
                if (productId) {
                    location.hash = `#/product/${productId}`;
                }
            }
        });

    } catch (err) {
        container!.innerHTML = '<p class="error">⚠️ Failed to load products. Please try again later.</p>';
        console.error(err);
    }
}