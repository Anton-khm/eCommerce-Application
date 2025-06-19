export function renderAboutPage(root: HTMLElement) {
    root.innerHTML = `
    <section class="about-page">
      <h1>About</h1>
      <div class="about-content">
        <img src="https://avatars.githubusercontent.com/u/83237969?v=4" alt="Developer photo" class="about-photo" />
        <p>
          Hello! My name is Anton. </p>
          <p>I am a frontend developer, passionate about creating web applications with good architecture and UX.</p> 
          <p>Unfortunately, due to lack of time, I did the work alone.</p>
          <p> Thank you for understanding) </p>
          <p>My GitHub: <a href="https://github.com/Anton-khm" target="_blank">github.com/Anton-khm</a></p>
          <p>RSSchool: <a href="https://rs.school/" target="_blank">RSSchool</a></p>
        </p>
      </div>
      <div class="cart-nav">
        <a href="#/catalog">Catalog</a>
        <a href="#/cart">Cart</a>
      </div>
    </section>
  `;
}
