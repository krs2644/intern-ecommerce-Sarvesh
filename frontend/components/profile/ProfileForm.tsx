"use client";

import { useState } from "react";
import { User } from "@/types";
import { updateProfile, deleteProfile } from "@/services/user.service";
import Toast from "@/components/ui/Toast";

type Props = {
    profile: User;
    onProfileUpdate: (user: User) => void;
    onDelete: () => void;
};

export default function ProfileForm({ profile, onProfileUpdate, onDelete }: Props) {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState<string | null>(null);

    async function handleUpdate() {
        setSaving(true);
        try {
            const updateData: { name?: string; email?: string; password?: string } = {};
            if (name !== profile.name) updateData.name = name;
            if (email !== profile.email) updateData.email = email;
            if (password) updateData.password = password;

            if (Object.keys(updateData).length === 0) {
                setEditing(false);
                return;
            }

            const updated = await updateProfile(updateData);
            onProfileUpdate(updated);
            setPassword("");
            setEditing(false);
            setToast("Profile updated successfully");
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to update profile");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );
        if (!confirmed) return;

        try {
            await deleteProfile();
            onDelete();
            alert("Account deleted successfully");
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to delete account");
        }
    }

    return (
        <>
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}

            <div className="mb-8 flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-700 text-3xl font-bold text-white">
                    {profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                    <p className="text-gray-400">{profile.email}</p>
                </div>
            </div>

            {editing ? (
                <div className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm text-gray-400">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-blue-500/20 bg-slate-900/70 px-4 py-3 text-white outline-none"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm text-gray-400">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-blue-500/20 bg-slate-900/70 px-4 py-3 text-white outline-none"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm text-gray-400">
                            New Password (leave blank to keep current)
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-blue-500/20 bg-slate-900/70 px-4 py-3 text-white outline-none placeholder-gray-500"
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleUpdate}
                            disabled={saving}
                            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            onClick={() => {
                                setEditing(false);
                                setName(profile.name);
                                setEmail(profile.email);
                                setPassword("");
                            }}
                            className="rounded-xl bg-gray-700 px-6 py-3 font-semibold text-white hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-between border-b border-blue-500/20 py-3">
                        <span className="text-gray-400">Name</span>
                        <span className="text-white">{profile.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-500/20 py-3">
                        <span className="text-gray-400">Email</span>
                        <span className="text-white">{profile.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-500/20 py-3">
                        <span className="text-gray-400">Member Since</span>
                        <span className="text-white">
                            {new Date(profile.createdAt).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                    <div className="flex gap-3 pt-6">
                        <button
                            onClick={() => setEditing(true)}
                            className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={handleDelete}
                            className="rounded-xl bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
