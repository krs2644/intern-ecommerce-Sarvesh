"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/products");
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return null;
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
            <SignupForm />
        </main>
    );
}
