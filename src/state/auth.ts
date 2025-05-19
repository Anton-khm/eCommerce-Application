let token: string | null = null;

export function setToken(t: string) {
    token = t;
    localStorage.setItem('access_token', t);
}

export function getToken(): string | null {
    return token || localStorage.getItem('access_token');
}

export function isAuthenticated(): boolean {
    return !!getToken();
}
