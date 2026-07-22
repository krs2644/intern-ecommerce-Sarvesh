"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks";
import AuthGuard from "@/components/AuthGuard";
import ProfileForm from "@/components/ProfileForm";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function ProfilePage() {
    const router = useRouter();
    const { logout } = useAuth();
    const { profile, setProfile, loading, error } = useProfile();

    function handleDelete() {
        logout();
        router.push("/");
    }

    return (
        <AuthGuard>
            <main className="min-h-screen bg-slate-50 py-8">
                <div className="container">
                    <h1 className="mb-8 section-title">My Profile</h1>

                    <div className="mx-auto max-w-2xl">
                        <div className="card p-8">
                            {loading ? (
                                <Spinner />
                            ) : error ? (
                                <ErrorMessage message={error} />
                            ) : profile ? (
                                <ProfileForm
                                    profile={profile}
                                    onProfileUpdate={setProfile}
                                    onDelete={handleDelete}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </main>
        </AuthGuard>
    );
}
