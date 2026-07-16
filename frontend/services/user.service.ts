const API_URL = "http://localhost:3001/users";

function authHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getProfile() {
    const response = await fetch(`${API_URL}/profile`, {
        headers: authHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }

    return response.json();
}

export async function updateProfile(data: {
    name?: string;
    email?: string;
    password?: string;
}) {
    const response = await fetch(`${API_URL}/profile`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update profile");
    }

    return result;
}

export async function deleteProfile() {
    const response = await fetch(`${API_URL}/profile`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to delete profile");
    }

    return result;
}
