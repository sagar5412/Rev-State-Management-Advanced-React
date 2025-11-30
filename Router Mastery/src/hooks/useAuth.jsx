// src/hooks/useAuth.jsx
import { useState, useEffect } from "react";

// Singleton store (simple version, later replace with Context/Recoil)
let globalUser = null;
const listeners = new Set();

function setGlobalUser(user) {
  globalUser = user;
  listeners.forEach((listener) => listener(globalUser)); // Notify all hook instances
}

export function useAuth() {
  const [user, setUser] = useState(globalUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth on mount
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then(setGlobalUser)
      .finally(() => setLoading(false));

    // Subscribe to changes
    listeners.add(setUser);
    return () => listeners.delete(setUser); // Cleanup subscription
  }, []);

  const login = async (email, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Login failed");
    }
    const user = await res.json();
    setGlobalUser(user);
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setGlobalUser(null);
  };

  return { user, loading, login, logout };
}
