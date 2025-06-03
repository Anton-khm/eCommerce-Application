const PROJECT_KEY = 'ecomm25';
const CLIENT_ID = 'qzT-_OAnZS6bwE0OLMxMFL4K';
const CLIENT_SECRET = '5xEai8ATn9Xxs5ZKS-voqNbI5OJpSfME';
const AUTH_HOST = 'https://auth.europe-west1.gcp.commercetools.com';
const API_HOST = 'https://api.europe-west1.gcp.commercetools.com';
const SCOPE = `manage_customers:${PROJECT_KEY} view_published_products:${PROJECT_KEY} manage_my_orders:${PROJECT_KEY} manage_my_profile:${PROJECT_KEY}`;

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
        if (data.errors) {
            const formattedErrors = data.errors.map((e: any) => {
                switch (e.code) {
                    case 'InvalidJsonInput':
                        return {
                            ...e,
                            userMessage: 'Incorrect data. Check if the input is correct.'
                        };
                    case 'DuplicateField':
                        return {
                            ...e,
                            userMessage: e.field === 'email'
                                ? 'This email is already registered. Please log in or use another.'
                                : 'This value is already in use. Please enter another one.'
                        };
                    case 'InvalidField':
                        return {
                            ...e,
                            userMessage: `Field ${e.field} is filled in incorrectly.`
                        };
                    default:
                        return {
                            ...e,
                            userMessage: 'An error has occurred. Please try again later.'
                        };
                }
            });
            throw { errors: formattedErrors };
        }
        throw data;
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

export async function getProductList(): Promise<any[]> {
    const token = await getAccessTokenClientCredentials();

    const response = await fetch(`${API_HOST}/${PROJECT_KEY}/product-projections/search`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch products');
    }

    return data.results.map((product: any) => {
        const variant = product.masterVariant;

        const priceData = variant?.prices?.[0]?.value;
        const price = priceData ? (priceData.centAmount / 100).toFixed(2) : 'N/A';
        const image = variant?.images?.[0]?.url;

        return {
            id: product.id,
            name: product.name?.en || 'Unnamed product',
            description: product.description?.en || '',
            image: image || null,
            originalPrice: price,
            discountedPrice: null
        };
    });
}

export async function getProductById(productId: string): Promise<any> {
    const token = await getAccessTokenClientCredentials();

    const response = await fetch(`${API_HOST}/${PROJECT_KEY}/product-projections/${productId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch product details');
    return data;
}