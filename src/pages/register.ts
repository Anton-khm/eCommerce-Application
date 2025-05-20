import { validateEmail, validatePassword, validateName, validateDOB, validateStreet, validateCity, validatePostalCode, validateCountry } from '../utils/validators';
import { registerCustomer } from '../api/commercetools';

export function renderRegisterPage(root: HTMLElement) {
    root.innerHTML = `
    <form id="register-form">
        <div class="both">
        <div class="left">
    <label>Email: <input type="email" id="email" /></label><span class="error" id="email-error"></span>
    <label>Password: <input type="password" id="password" /></label><span class="error" id="password-error"></span>
    <label>First Name: <input type="text" id="firstName" /></label><span class="error" id="firstName-error"></span>
    <label>Last Name: <input type="text" id="lastName" /></label><span class="error" id="lastName-error"></span>
        </div>
        <div class="right">
    <label>Date of Birth: <input type="date" id="dob" /></label><span class="error" id="dob-error"></span>
    <label>Street: <input type="text" id="street" /></label><span class="error" id="street-error"></span>
    <label>City: <input type="text" id="city" /></label><span class="error" id="city-error"></span>
    <label>Postal Code: <input type="text" id="postalCode" /></label><span class="error" id="postalCode-error"></span>
    <label>Country: <input type="text" id="country" /></label><span class="error" id="country-error"></span>
        </div>
        </div>
      <button type="submit" class="login-btn">Register</button>
      <div id="success-message" class="success"></div>
    </form>
    <p class="login-redirect">Already have an account? <a href="#/login" id="login-link">Sign up</a></p>
  `;

    const form = document.getElementById('register-form') as HTMLFormElement;
    const successMessage = document.getElementById('success-message') as HTMLElement;
    const fields = [
        'email', 'password', 'firstName', 'lastName', 'dob',
        'street', 'city', 'postalCode', 'country'
    ];

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;
        const data: any = {};

        fields.forEach(field => {
            const input = document.getElementById(field) as HTMLInputElement;
            const error = document.getElementById(`${field}-error`)!;
            input.classList.remove('invalid');
            error.textContent = '';

            let validation;
            switch (field) {
                case 'email': validation = validateEmail(input.value); break;
                case 'password': validation = validatePassword(input.value); break;
                case 'firstName':
                case 'lastName': validation = validateName(input.value); break;
                case 'dob': validation = validateDOB(input.value); break;
                case 'street': validation = validateStreet(input.value); break;
                case 'city': validation = validateCity(input.value); break;
                case 'postalCode': validation = validatePostalCode(input.value); break;
                case 'country': validation = validateCountry(input.value); break;
            }

            if (validation && !validation.valid) {
                error.textContent = validation.error;
                input.classList.add('invalid');
                isValid = false;
            } else {
                data[field] = input.value;
            }
        });

        if (isValid) {
            try {
                const customerDraft = {
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    dateOfBirth: data.dob,
                    addresses: [
                        {
                            streetName: data.street,
                            city: data.city,
                            postalCode: data.postalCode,
                            country: data.country.toUpperCase(),
                        },
                    ],
                    defaultShippingAddress: 0,
                };

                await registerCustomer(customerDraft);
                form.innerHTML = '<p class="success">🎉 Account successfully created! You can now <a href="#/login">log in</a>.</p>';
            } catch (error: any) {
                const errors = error.errors || [];
                if (Array.isArray(errors)) {
                    for (const err of errors) {
                        if (err.code === 'DuplicateField' && err.field === 'email') {
                            showError('email', 'This email is already registered. Please log in or use another.');
                        } else if (err.code === 'InvalidField') {
                            showError(err.field, err.message || 'Invalid field input.');
                        } else {
                            showError('general', '⚠️ An unexpected error occurred. Please try again later.');
                        }
                    }
                } else {
                    showError('general', '⚠️ Failed to register. Please try again later.');
                }
            }

            function showError(field: string, message: string) {
                const target = document.getElementById(`${field}-error`);
                if (target) {
                    target.textContent = message;
                    target.classList.add('error');
                    const input = document.getElementById(field) as HTMLInputElement;
                    if (input) input.classList.add('invalid');
                } else {
                    const general = document.createElement('div');
                    general.className = 'error';
                    general.textContent = message;
                    form.appendChild(general);
                }
            }
        }
    });
}