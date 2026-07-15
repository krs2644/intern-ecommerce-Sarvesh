const API_URL = "http://localhost:3001/auth"

export async function signup(data: {
    name: string;
    email: string;
    password: string;
}) {
    const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Signup failed");
    }

    return result;
}

export async function login(data: {
    email: string;
    password: string;
}) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Login failed");
    }

    return result;
}