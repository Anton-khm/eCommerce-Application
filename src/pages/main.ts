import { logoutCustomer } from '../state/auth';

export function renderMainPage(root: HTMLElement) {
  root.innerHTML = `
    <h2>Добро пожаловать!</h2>
    <p>Это главная страница приложения.</p>
    <a href="#/catalog">📦 Перейти в каталог</a>
  `;

  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'Выйти';
  logoutButton.style.cssText = `
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #d9534f;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;

  logoutButton.addEventListener('click', () => {
    logoutCustomer();
  });

  root.appendChild(logoutButton);
}
