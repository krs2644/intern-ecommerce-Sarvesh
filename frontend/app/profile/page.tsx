"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks";
import AuthGuard from "@/components/auth/AuthGuard";
import ProfileForm from "@/components/profile/ProfileForm";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

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
            <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 p-10">
                <h1 className="mb-10 text-4xl font-bold text-white">My Profile</h1>

                <div className="mx-auto max-w-2xl">
                    <div className="glass-card p-8">
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
            </main>
        </AuthGuard>
    );
}
