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
    // if (!/[!@#$%^&*]/.test(trimmed)) errors.push('1 special char');
    return errors.length > 0 ? { valid: false, error: errors.join(', ') } : { valid: true, error: '' };
}