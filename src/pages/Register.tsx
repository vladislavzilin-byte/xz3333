
// src/pages/Register.tsx
import { useState } from "react";
import { register } from "../auth/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      register(email.trim(), password, name.trim() || undefined);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to register");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl border shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name (optional)</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-xl border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            minLength={6}
          />
          <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
        </div>
        <button className="w-full py-2 rounded-2xl bg-black text-white">Create account</button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">Log in</Link>
      </p>
    </div>
  );
}
