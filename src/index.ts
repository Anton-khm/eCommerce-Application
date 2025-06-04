import { router } from './router/router';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    let app = document.getElementById('app') as HTMLElement;
    if (!app) {
        app = document.createElement('div');
        app.id = 'app';
        document.body.appendChild(app);
    }

    router(app);

    let lastRoute = '';

    // window.addEventListener('hashchange', () => {
    //     router(app);
    // });
    window.addEventListener('hashchange', () => {
        const root = document.getElementById('app');
        if (root) router(root);
    });
});