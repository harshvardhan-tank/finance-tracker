import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">💰</span>
          <span className="hidden sm:inline">Finance Tracker</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-slate-500 md:inline dark:text-slate-400">{user?.email}</span>
          <button onClick={toggleTheme} className="btn-ghost" aria-label="Toggle dark mode">
            {dark ? "☀️" : "🌙"}
          </button>
          <button onClick={handleLogout} className="btn-ghost">Logout</button>
        </div>
      </div>
    </header>
  );
}
