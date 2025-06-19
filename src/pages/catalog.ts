import { getProductList } from '../api/commercetools';
import { addToCart } from '../state/cart';

export async function renderCatalogPage(root: HTMLElement) {
    root.innerHTML = `
    <h2>Product Catalog</h2>
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 1rem;">
      <a href="#/" style="padding: 0.5rem 1rem; background: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Main page</a>
      <div>
        <a href="#/cart" style="margin-right: 1rem;">Cart</a>
        <a href="#/about">About</a>
      </div>
    </div>
    <div id="product-list" class="product-list" style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      padding: 1rem;
    "></div>
    <div id="pagination" style="text-align: center; margin: 1rem;"></div>
  `;

    const container = document.getElementById('product-list');
    const pagination = document.getElementById('pagination');

    try {
        const products = await getProductList();
        const PRODUCTS_PER_PAGE = 6;
        let currentPage = 1;
        const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

        function renderPage(page: number) {
            container!.innerHTML = '';
            const start = (page - 1) * PRODUCTS_PER_PAGE;
            const end = start + PRODUCTS_PER_PAGE;
            const pageProducts = products.slice(start, end);

            for (const product of pageProducts) {
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
                    <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                        <button data-product-id="${product.id}" class="view-details-btn" style="padding: 0.5rem 1rem; border: none; background: #007bff; color: white; border-radius: 4px; cursor: pointer;">View Details</button>
                        <button data-product-id="${product.id}" class="add-cart-btn" style="padding: 0.5rem 1rem; border: none; background: #28a745; color: white; border-radius: 4px; cursor: pointer;">To cart</button>
                    </div>
                `;

                container!.appendChild(card);
            }

            pagination!.innerHTML = Array.from({ length: totalPages }, (_, i) => `
              <button class="page-btn" style="margin: 0 5px; padding: 0.3rem 0.6rem; ${i + 1 === page ? 'font-weight: bold;' : ''}" data-page="${i + 1}">${i + 1}</button>
            `).join('');
        }

        renderPage(currentPage);

        pagination!.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('page-btn')) {
                currentPage = parseInt(target.getAttribute('data-page')!);
                renderPage(currentPage);
            }
        });

        container!.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;

            if (target.classList.contains('view-details-btn')) {
                const productId = target.getAttribute('data-product-id');
                if (productId) {
                    location.hash = `#/product/${productId}`;
                }
            }

            if (target.classList.contains('add-cart-btn')) {
                const productId = target.getAttribute('data-product-id');
                const product = products.find(p => p.id === productId);
                if (product) {
                    const variant = product.masterVariant;
                    const imageUrl = product.image || variant?.images?.[0]?.url || 'https://via.placeholder.com/150';
                    const priceData = variant?.prices?.[0]?.value;
                    const price = priceData ? priceData.centAmount / 100 : 0;

                    addToCart({
                        id: product.id,
                        name: product.name,
                        image: imageUrl,
                        price,
                        quantity: 1,
                    });

                    target.textContent = 'Added';
                    setTimeout(() => target.textContent = 'To cart', 1000);
                }
            }
        });

    } catch (err) {
        container!.innerHTML = '<p class="error">⚠️ Failed to load products. Please try again later.</p>';
        console.error(err);
    }
}
