let token: string | null = null;
const TOKEN_KEY = 'access_token';

export function setToken(t: string) {
    token = t;
    localStorage.setItem(TOKEN_KEY, t);
}

export function getToken(): string | null {
    if (!token) {
        token = localStorage.getItem(TOKEN_KEY);
    }
    return token;
}

export function isAuthenticated(): boolean {
    return getToken() !== null;
}

export function logoutCustomer() {
    token = null;
    localStorage.removeItem(TOKEN_KEY);
    location.hash = '#/login';
}
