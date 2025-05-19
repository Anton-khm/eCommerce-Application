export let authToken: string | null = null;

export function setToken(token: string) {
    authToken = token;
    localStorage.setItem('authToken', token);
}

export function getToken(): string | null {
    return authToken || localStorage.getItem('authToken');
}