import { validateEmail, validatePassword } from '../utils/validators';

export function renderLoginPage(root: HTMLElement) {
    root.innerHTML = `
    <form id="login-form">
      <label>Email:<br>
        <input type="email" id="email" />
        <span id="email-error" class="error"></span>
      </label><br>

      <label>Password:<br>
        <input type="password" id="password" />
        <span id="password-error" class="error"></span>
      </label><br>

      <label>
        <input type="checkbox" id="toggle-password" /> Show password
      </label><br>

      <button type="submit">Login</button>
    </form>
  `;

    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const emailError = document.getElementById('email-error')!;
    const passwordError = document.getElementById('password-error')!;
    const togglePassword = document.getElementById('toggle-password') as HTMLInputElement;

    emailInput.addEventListener('input', () => {
        const { valid, error } = validateEmail(emailInput.value);
        emailError.textContent = valid ? '' : error;
    });

    passwordInput.addEventListener('input', () => {
        const { valid, error } = validatePassword(passwordInput.value);
        passwordError.textContent = valid ? '' : error;
    });

    togglePassword.addEventListener('change', () => {
        passwordInput.type = togglePassword.checked ? 'text' : 'password';
    });

    document.getElementById('login-form')!.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailValid = validateEmail(emailInput.value);
        const passwordValid = validatePassword(passwordInput.value);
        if (emailValid.valid && passwordValid.valid) {
            console.log('Submit login form');
        } else {
            emailError.textContent = emailValid.error;
            passwordError.textContent = passwordValid.error;
        }
    });
}
