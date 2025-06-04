import { router } from './router/router';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    // let app = document.getElementById('app') as HTMLElement;
    // if (!app) {
    const app = document.createElement('div');
    app.id = 'app';
    document.body.appendChild(app);
    // }

    router(app);

    window.addEventListener('hashchange', () => {
        console.log('🔁 Hash changed:', location.hash);
        router(app);
    });
});