const PROJECT_KEY = 'ecomm25';
const AUTH_URL = `https://auth.europe-west1.gcp.commercetools.com/oauth/${PROJECT_KEY}/customers/token`;
const CLIENT_ID = '0o5zSTdVp3FReC6bzb09Gblg';
const CLIENT_SECRET = 'p-oive48Ivam-WUhI8VB_s_9nugxq9pq';

export async function loginCustomer(email: string, password: string): Promise<any> {
    const body = new URLSearchParams();
    body.append('grant_type', 'password');
    body.append('username', email);
    body.append('password', password);

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`));
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    try {
        const response = await fetch(AUTH_URL, {
            method: 'POST',
            headers,
            body: body.toString(),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
}