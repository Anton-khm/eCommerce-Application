import { renderLoginPage } from '../pages/login';
import { renderMainPage } from '../pages/main';

export function router(root: HTMLElement) {
    const route = location.hash;
    if (route === '#/login') {
        renderLoginPage(root);
    } else if (route === '#/main') {
        renderMainPage(root);
    } else {
        location.hash = '#/login';
    }
}

window.addEventListener('hashchange', () => {
    const root = document.getElementById('app')!;
    router(root);
});

window.addEventListener('load', () => {
    const root = document.getElementById('app')!;
    router(root);
});