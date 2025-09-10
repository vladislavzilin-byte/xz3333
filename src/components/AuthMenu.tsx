
// src/components/AuthMenu.tsx
import { useEffect, useState } from "react";
import { getSession, logout } from "../auth/auth";
import { Link, useNavigate } from "react-router-dom";

export default function AuthMenu() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(getSession());
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (!e || e.key === null || e.key === "demo_session_v1") {
        setSession(getSession());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    logout();
    setSession(null);
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        className="px-3 py-2 rounded-2xl border shadow-sm hover:shadow transition"
        onClick={() => setOpen((v) => !v)}
      >
        {session ? session.user.email : "Account"}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border bg-white shadow-lg p-2 space-y-1 z-50">
          {!session ? (
            <>
              <Link
                className="block px-3 py-2 rounded-xl hover:bg-gray-100"
                to="/login"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>
              <Link
                className="block px-3 py-2 rounded-xl hover:bg-gray-100"
                to="/register"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="px-3 py-2 text-sm text-gray-600">
                Signed in as <span className="font-medium">{session.user.email}</span>
              </div>
              <button
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
