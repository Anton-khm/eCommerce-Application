export function renderAboutPage(root: HTMLElement) {
    root.innerHTML = `
    <section class="about-page">
      <h1>About</h1>
      <div class="about-content">
        <img src="https://avatars.githubusercontent.com/u/83237969?v=4" alt="Developer photo" class="about-photo" />
        <p>
          Привет! Меня зовут Антон. Я фронтенд-разработчик, увлеченный созданием веб-приложений с хорошей архитектурой и UX.  
          Мой GitHub: <a href="https://github.com/Anton-khm" target="_blank">github.com/Anton-khm</a>
        </p>
      </div>
      <div class="cart-nav">
        <a href="#/catalog">Catalog</a>
        <a href="#/cart">Cart</a>
      </div>
    </section>
  `;
}
