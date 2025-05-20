import { validateEmail, validatePassword, validateName, validateDOB, validateStreet, validateCity, validatePostalCode, validateCountry } from '../utils/validators';

export function renderRegisterPage(root: HTMLElement) {
    root.innerHTML = `
    <form id="register-form">
    <div class="both">
    <div class="left">
    <label>Email: <input type="email" id="email" /></label>
      <span class="error" id="email-error"></span>

      <label>Password: <input type="password" id="password" /></label>
      <span class="error" id="password-error"></span>

      <label>First Name: <input type="text" id="firstName" /></label>
      <span class="error" id="firstName-error"></span>

      <label>Last Name: <input type="text" id="lastName" /></label>
      <span class="error" id="lastName-error"></span>
    </div>
    <div class="right">
    <label>Date of Birth: <input type="date" id="dob" /></label>
      <span class="error" id="dob-error"></span>

      <label>Street: <input type="text" id="street" /></label>
      <span class="error" id="street-error"></span>

      <label>City: <input type="text" id="city" /></label>
      <span class="error" id="city-error"></span>

      <label>Postal Code: <input type="text" id="postalCode" /></label>
      <span class="error" id="postalCode-error"></span>

      <label>Country: <input type="text" id="country" /></label>
      <span class="error" id="country-error"></span>
    </div>
    </div>
      <button type="submit" class="login-btn">Register</button>
    </form>
  `;

    const form = document.getElementById('register-form')!;
    const fields = [
        'email', 'password', 'firstName', 'lastName', 'dob',
        'street', 'city', 'postalCode', 'country'
    ];

    const validators = {
        email: validateEmail,
        password: validatePassword,
        firstName: validateName,
        lastName: validateName,
        dob: validateDOB,
        street: validateStreet,
        city: validateCity,
        postalCode: validatePostalCode,
        country: validateCountry
    };

    fields.forEach(id => {
        const input = document.getElementById(id) as HTMLInputElement;
        const errorSpan = document.getElementById(`${id}-error`)!;

        input.addEventListener('input', () => {
            input.classList.remove('invalid');
            const { valid, error } = validators[id as keyof typeof validators](input.value);
            errorSpan.textContent = valid ? '' : error;
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        fields.forEach(id => {
            const input = document.getElementById(id) as HTMLInputElement;
            const errorSpan = document.getElementById(`${id}-error`)!;
            const { valid, error } = validators[id as keyof typeof validators](input.value);
            errorSpan.textContent = valid ? '' : error;
            if (!valid) {
                input.classList.add('invalid');
                isValid = false;
            }
        });

        if (isValid) {
            alert('Registration successful (stub)');
        }
    });
}