const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function authHeaders(): HeadersInit {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
            ...options.headers,
        },
    });

    if (response.status === 401 && typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Session expired");
    }

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Request failed");
    }

    return result as T;
}
