const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint, { method = 'GET', headers = {}, body, ...options } = {}) {
    console.log(BASE_URL);

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...options,
    });

    if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`API error ${res.status}: ${errorBody}`);
    }

    if (res.status === 204) return null;

    return res.json();
}
