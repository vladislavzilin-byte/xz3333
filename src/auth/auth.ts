
// src/auth/auth.ts
// Extremely simple demo auth using localStorage. Not for production use.
export type User = {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
};

export type Session = {
  user: User;
  token: string;
};

const USERS_KEY = "demo_users_v1";
const SESSION_KEY = "demo_session_v1";

function loadUsers(): Record<string, User & { password: string }> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, User & { password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setSession(session: Session | null) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
  // notify other tabs
  window.dispatchEvent(new StorageEvent("storage", { key: SESSION_KEY }));
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function issueToken() {
  return uid() + "." + uid();
}

export function register(email: string, password: string, name?: string): Session {
  const users = loadUsers();
  const key = email.toLowerCase();
  if (users[key]) {
    throw new Error("Email already registered");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  const user: User & { password: string } = {
    id: uid(),
    email,
    name,
    password,
    createdAt: new Date().toISOString(),
  };
  users[key] = user;
  saveUsers(users);
  const session: Session = { user, token: issueToken() };
  setSession(session);
  return session;
}

export function login(email: string, password: string): Session {
  const users = loadUsers();
  const key = email.toLowerCase();
  const user = users[key];
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }
  const session: Session = { user, token: issueToken() };
  setSession(session);
  return session;
}

export function logout() {
  setSession(null);
}

export function requireAuth(): Session {
  const s = getSession();
  if (!s) throw new Error("Not authenticated");
  return s;
}
