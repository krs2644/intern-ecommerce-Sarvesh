import { fetchAPI } from "@/lib/api";
import { User } from "@/types";

export async function getProfile(): Promise<User> {
    return fetchAPI<User>("/users/profile");
}

export async function updateProfile(data: {
    name?: string;
    email?: string;
    password?: string;
}): Promise<User> {
    return fetchAPI<User>("/users/profile", {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

export async function deleteProfile(): Promise<{ message: string }> {
    return fetchAPI<{ message: string }>("/users/profile", {
        method: "DELETE",
    });
}
