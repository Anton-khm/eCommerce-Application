const PROJECT_KEY = 'ecomm25';
const CLIENT_ID = 'ZYsj4Vcrf-UVbT9Unjup62Zq';
const CLIENT_SECRET = 'fnWmoSnPKdd7qlPHKLze0jKa7TDbDHOX';
const AUTH_HOST = 'https://auth.europe-west1.gcp.commercetools.com';
const API_HOST = 'https://api.europe-west1.gcp.commercetools.com';
const SCOPE = `manage_customers:${PROJECT_KEY} manage_my_profile:${PROJECT_KEY} manage_my_orders:${PROJECT_KEY}`;

function getBasicAuthHeader(): string {
    return 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
}

export async function registerCustomer(customerData: any): Promise<any> {
    const token = await getAccessTokenClientCredentials();

    const response = await fetch(`${API_HOST}/${PROJECT_KEY}/customers`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }
    return data;
}

async function getAccessTokenClientCredentials(): Promise<string> {
    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
    body.append('scope', SCOPE);

    const response = await fetch(`${AUTH_HOST}/oauth/token`, {
        method: 'POST',
        headers: {
            'Authorization': getBasicAuthHeader(),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch token');
    return data.access_token;
}

export async function loginCustomer(email: string, password: string): Promise<any> {
    const body = new URLSearchParams();
    body.append('grant_type', 'password');
    body.append('username', email);
    body.append('password', password);
    body.append('scope', SCOPE);

    const headers = new Headers();
    headers.set('Authorization', getBasicAuthHeader());
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const response = await fetch(`${AUTH_HOST}/oauth/${PROJECT_KEY}/customers/token`, {
        method: 'POST',
        headers,
        body: body.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    return data;
}