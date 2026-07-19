"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/services/user.service";
import { User } from "@/types";

export function useProfile() {
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return { profile, setProfile, loading, error };
}
