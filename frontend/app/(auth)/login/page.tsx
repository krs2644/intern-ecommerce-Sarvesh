"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.push("/products");
        }
    }, [isAuthenticated, loading, router]);

    if (loading || isAuthenticated) {
        return null;
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
            <LoginForm />
        </main>
    );
}
