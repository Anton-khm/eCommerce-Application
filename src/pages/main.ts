export function renderMainPage(root: HTMLElement) {
    root.innerHTML = `
    <h1>Welcome to the Main Page</h1>
    <p>Some content here...</p>
    <a href="#/catalog" style="
      display: inline-block;
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border-radius: 4px;
      text-decoration: none;
      cursor: pointer;
    ">Каталог</a>
  `;
}