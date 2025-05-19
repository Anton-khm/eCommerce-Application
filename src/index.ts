import { router } from './router/router';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');
    if (root) {
        router(root);
    } else {
        console.error("Root element with id 'app' not found.");
    }
});

window.addEventListener('hashchange', () => {
    const root = document.getElementById('app');
    if (root) {
        router(root);
    }
});