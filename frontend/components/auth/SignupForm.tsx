"use client";
import Link from "next/link";
import { useState } from "react";
import { signup } from "@/services/auth.service";

export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit() {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const result = await signup({
                name,
                email,
                password,
            });

            alert(result.message);

        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("something went wrong");
            }
        }
    }

    return (
        <div className="w-full max-w-md rounded-lg border p-8 shadow-lg">
            <h1 className="mb-6 text-center text-3xl font-bold">Sign Up</h1>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border p-3" />

                <input
                    type="email"
                    placeholder="Enter your mail id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border p-3" />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border p-3" />

                <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-md border p-3" />

                <button
                    onClick={handleSubmit}
                    className="w-full rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700">
                    Sign Up
                </button>
            </div>
            <p className="mt-6 text-center">
                Already have an account?{" "}
                <Link href="/login"
                    className="font-semibold text-blue-600 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
}
