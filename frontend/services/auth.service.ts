import { fetchAPI } from "@/services/api";
import { AuthResponse, SignupResponse, SignupRequest, LoginRequest } from "@/types";

export async function signup(data: SignupRequest): Promise<SignupResponse> {
    return fetchAPI<SignupResponse>("/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
    return fetchAPI<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
