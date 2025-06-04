export function validateEmail(email: string): { valid: boolean, error: string } {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return { valid: false, error: 'Invalid email format' };
    return { valid: true, error: '' };
}

export function validatePassword(password: string): { valid: boolean, error: string } {
    const trimmed = password.trim();
    const errors = [];
    if (trimmed.length < 8) errors.push('Min. 8 characters');
    if (!/[A-Z]/.test(trimmed)) errors.push('1 uppercase letter');
    if (!/[a-z]/.test(trimmed)) errors.push('1 lowercase letter');
    if (!/[0-9]/.test(trimmed)) errors.push('1 digit');
    return errors.length > 0 ? { valid: false, error: errors.join(', ') } : { valid: true, error: '' };
}

export function validateName(value: string): { valid: boolean, error: string } {
    const valid = /^[A-Za-z]{1,}$/.test(value.trim());
    return valid ? { valid: true, error: '' } : { valid: false, error: 'Invalid name' };
}

export function validateDOB(value: string): { valid: boolean, error: string } {
    const date = new Date(value);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    const valid = !isNaN(date.getTime()) && age >= 13;
    return valid ? { valid: true, error: '' } : { valid: false, error: 'Must be at least 13 years old' };
}

export function validateStreet(value: string) {
    return value.trim().length > 0 ? { valid: true, error: '' } : { valid: false, error: 'Street is required' };
}

export function validateCity(value: string) {
    const valid = /^[A-Za-z\s]{1,}$/.test(value.trim());
    return valid ? { valid: true, error: '' } : { valid: false, error: 'Invalid city name' };
}

export function validatePostalCode(value: string) {
    const valid = /^[\w\s-]{3,10}$/.test(value.trim());
    return valid ? { valid: true, error: '' } : { valid: false, error: 'Invalid postal code' };
}

export function validateCountry(value: string) {
    return value.trim().length > 0 ? { valid: true, error: '' } : { valid: false, error: 'Country is required' };
}
