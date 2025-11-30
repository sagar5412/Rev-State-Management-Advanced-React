// src/guards/AuthGuard.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // We'll build this next

export function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Checking auth...</div>;

  // Not logged in → redirect to login, but remember where they were
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Logged in → show the page
  return children;
}
