"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
    const router = useRouter();
    const { login: authLogin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function handleSubmit() {
        try {
            const result = await login({
                email,
                password,
            });
            authLogin(result.access_token);

            router.push("/products");
            console.log(result);

            alert("Login successful!");
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Something went wrong");
            }
        }
    }

    return (
        <div className="w-full max-w-md rounded-lg border p-8 shadow-lg">
            <h1 className="mb-6 text-center text-3xl font-bold">
                Login
            </h1>

            <div className="space-y-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border p-3"
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border p-3"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
                >
                    Login
                </button>
            </div>

            <p className="mt-6 text-center">
                Don&apos;t have an account?{" "}
                <Link
                    href="/signup"
                    className="font-semibold text-blue-600 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
        </div>
    );
}
