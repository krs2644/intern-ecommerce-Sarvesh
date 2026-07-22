"use client";

import { useState } from "react";
import { User } from "@/types";
import { updateProfile, deleteProfile } from "@/services/user.service";
import Toast from "@/components/Toast";

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
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to delete account");
        }
    }

    return (
        <>
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}

            <div className="mb-8 flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                    {profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
                    <p className="text-sm text-slate-500">{profile.email}</p>
                </div>
            </div>

            {editing ? (
                <div className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            New Password (leave blank to keep current)
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="input-field"
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleUpdate}
                            disabled={saving}
                            className="btn-primary"
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
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-0">
                    <div className="flex justify-between border-b border-slate-100 py-3">
                        <span className="text-sm text-slate-500">Name</span>
                        <span className="text-sm font-medium text-slate-900">{profile.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 py-3">
                        <span className="text-sm text-slate-500">Email</span>
                        <span className="text-sm font-medium text-slate-900">{profile.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 py-3">
                        <span className="text-sm text-slate-500">Member Since</span>
                        <span className="text-sm font-medium text-slate-900">
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
                            className="btn-primary"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={handleDelete}
                            className="btn-danger"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
