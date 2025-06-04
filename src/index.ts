import { router } from './router/router';
import './styles.css';

// document.addEventListener('DOMContentLoaded', () => {
//     const app = document.createElement('div');
//     app.id = 'app';
//     document.body.appendChild(app);

//     router(app);

//     window.addEventListener('hashchange', () => {
//         router(app);
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    let app = document.getElementById('app') as HTMLElement;
    if (!app) {
        app = document.createElement('div');
        app.id = 'app';
        document.body.appendChild(app);
    }

    router(app);

    window.addEventListener('hashchange', () => {
        router(app);
    });
});