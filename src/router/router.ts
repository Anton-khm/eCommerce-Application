import { renderLoginPage } from '../pages/login';

export function router() {
    const app = document.getElementById('app')!;
    const route = window.location.hash || '#/login';
    app.innerHTML = '';
    switch (route) {
        case '#/login':
            renderLoginPage(app);
            break;
        default:
            app.textContent = '404 - Page Not Found';
    }
}