import { User } from "./user";

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    access_token: string;
    user: User;
}

export interface SignupResponse {
    message: string;
    user: User;
}
