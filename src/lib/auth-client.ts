/**
 * Simple auth client — replaces better-auth/react
 * signIn  → POST /api/auth/login
 * signOut → POST /api/auth/logout
 */

export const signIn = {
  async email({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ error?: { message: string } }> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) return {};

    const data = await res.json().catch(() => ({}));
    return { error: { message: data.message || "Invalid email or password" } };
  },
};

export async function signOut(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}

// Lightweight session hook — reads from /api/auth/session
import { useEffect, useState } from "react";

interface Session {
  user: { name: string; email: string } | null;
}

export function useSession(): { data: Session | null } {
  const [data, setData] = useState<Session | null>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData({ user: null }));
  }, []);

  return { data };
}
