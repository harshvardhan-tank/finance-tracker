import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Only lets logged-in users see the page; others go to /login
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user || !localStorage.getItem("token")) return <Navigate to="/login" replace />;
  return children;
}
