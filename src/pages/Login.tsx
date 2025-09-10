
// src/pages/Login.tsx
import { useState } from "react";
import { login } from "../auth/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      login(email.trim(), password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl border shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Log in</h1>
      {error && <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded-xl border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded-xl border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full py-2 rounded-2xl bg-black text-white">Log in</button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        No account?{" "}
        <Link to="/register" className="text-blue-600 underline">Register</Link>
      </p>
    </div>
  );
}
