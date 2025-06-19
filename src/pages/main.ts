import { logoutCustomer } from '../state/auth';

export function renderMainPage(root: HTMLElement) {
  console.log('✅ renderMainPage CALLED');
  root.innerHTML = `
    <h2>Welcome!</h2>
    <p>This is the main page.</p>
    <a href="#/catalog">Go to catalog</a>
  `;

  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'Logout';
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
