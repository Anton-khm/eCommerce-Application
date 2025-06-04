import { validateEmail, validatePassword } from '../utils/validators';
import { loginCustomer } from '../api/commercetools';
import { setToken, isAuthenticated } from '../state/auth';
import { router } from '../router/router';

export function renderLoginPage(root: HTMLElement) {
  if (isAuthenticated()) {
    console.log('🔒 Already authenticated, redirecting to /main');
    location.hash = '#/main';
    return;
  }

  root.innerHTML = `
    <form id="login-form">
      <label>Email:
        <input type="email" id="email" />
        <span id="email-error" class="error"></span>
      </label>

      <label>Password:
        <input type="password" id="password" />
        <span id="password-error" class="error"></span>
      </label>

      <label class="checkbox">
        <input type="checkbox" id="toggle-password" /> Show password
      </label>

      <button type="submit" class="login-btn">Login</button>
    </form>

    <button id="to-registration" class="link-button">Go to Registration</button>
  `;

  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const emailError = document.getElementById('email-error')!;
  const passwordError = document.getElementById('password-error')!;
  const togglePassword = document.getElementById('toggle-password') as HTMLInputElement;
  const toRegistrationBtn = document.getElementById('to-registration')!;

  emailInput.addEventListener('input', () => {
    emailInput.classList.remove('invalid');
    const { valid, error } = validateEmail(emailInput.value);
    emailError.textContent = valid ? '' : error;
  });

  passwordInput.addEventListener('input', () => {
    passwordInput.classList.remove('invalid');
    const { valid, error } = validatePassword(passwordInput.value);
    passwordError.textContent = valid ? '' : error;
  });

  togglePassword.addEventListener('change', () => {
    passwordInput.type = togglePassword.checked ? 'text' : 'password';
  });

  document.getElementById('login-form')!.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailValid = validateEmail(emailInput.value);
    const passwordValid = validatePassword(passwordInput.value);

    if (emailValid.valid && passwordValid.valid) {
      try {
        const data = await loginCustomer(emailInput.value, passwordInput.value);
        setToken(data.access_token);
        console.log('🟢 Token saved:', data.access_token);
        location.hash = '#/main';
        // if (location.hash !== '#/main') {
        //   location.hash = '#/main';
        // } else {
        //   const root = document.getElementById('app');
        //   if (root) router(root);
        // }

        // // Или гарантированно принудительно:
        // setTimeout(() => {
        //   const root = document.getElementById('app');
        //   if (root) router(root);
        // }, 0);
      } catch (err: any) {
        emailError.textContent = 'Invalid email or password';
        passwordError.textContent = '';
        emailInput.classList.add('invalid');
        passwordInput.classList.add('invalid');
      }
    } else {
      emailError.textContent = emailValid.error;
      passwordError.textContent = passwordValid.error;
    }
  });

  toRegistrationBtn.addEventListener('click', () => {
    location.hash = '#/register';
  });
}