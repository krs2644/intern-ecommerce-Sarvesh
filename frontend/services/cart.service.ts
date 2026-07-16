const API_URL = "http://localhost:3001/carts";

function authHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getCart() {
    const response = await fetch(API_URL, { headers: authHeaders() });

    if (!response.ok) {
        throw new Error("Failed to fetch cart");
    }

    return response.json();
}

export async function getCartTotal() {
    const response = await fetch(`${API_URL}/total`, { headers: authHeaders() });

    if (!response.ok) {
        throw new Error("Failed to fetch total");
    }

    return response.json();
}

export async function addToCart(productId: number, quantity = 1) {
    const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
        },
        body: JSON.stringify({
            productId,
            quantity,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to add product");
    }

    return response.json();
}

export async function increaseQuantity(cartItemId: number) {
    const response = await fetch(
        `${API_URL}/increase/${cartItemId}`,
        {
            method: "PATCH",
            headers: authHeaders(),
        }
    );

    return response.json();
}

export async function decreaseQuantity(cartItemId: number) {
    const response = await fetch(
        `${API_URL}/decrease/${cartItemId}`,
        {
            method: "PATCH",
            headers: authHeaders(),
        }
    );

    return response.json();
}

export async function removeItem(cartItemId: number) {
    const response = await fetch(
        `${API_URL}/${cartItemId}`,
        {
            method: "DELETE",
            headers: authHeaders(),
        }
    );

    return response.json();
}

export async function clearCart() {
    const response = await fetch(API_URL, {
        method: "DELETE",
        headers: authHeaders(),
    });

    return response.json();
}
