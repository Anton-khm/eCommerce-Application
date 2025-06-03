import { renderLoginPage } from '../pages/login';
import { renderMainPage } from '../pages/main';
import { renderRegisterPage } from '../pages/register';
import { renderCatalogPage } from '../pages/catalog';
import { renderProductDetailsPage } from '../pages/productDetails';

export function router(root: HTMLElement) {
    const route = location.hash;
    const isAuthenticated = !!localStorage.getItem('authToken');

    if (!isAuthenticated && route !== '#/login' && route !== '#/register') {
        location.hash = '#/login';
        return;
    }

    if (route === '#/login') {
        renderLoginPage(root);
    } else if (route === '#/main') {
        renderMainPage(root);
    } else if (route === '#/register') {
        renderRegisterPage(root);
    } else if (route === '#/catalog') {
        renderCatalogPage(root);
    } else if (route.startsWith('#/product/')) {
        const productId = route.split('/')[2];
        if (productId) {
            renderProductDetailsPage(root, productId);
        } else {
            root.innerHTML = '<p class="error">⚠️ Invalid product ID.</p>';
        }
    } else {
        location.hash = '#/login';
    }
}