const API_URL = "http://localhost:3001/orders";

function authHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function placeOrder() {
    const response = await fetch(`${API_URL}/place`, {
        method: "POST",
        headers: authHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to place order");
    }

    return result;
}

export async function getOrders() {
    const response = await fetch(API_URL, { headers: authHeaders() });

    if (!response.ok) {
        throw new Error("Failed to fetch orders");
    }

    return response.json();
}
