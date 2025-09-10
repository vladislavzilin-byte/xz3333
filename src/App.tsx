
// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AuthMenu from "./components/AuthMenu";
import Contacts from "./pages/Contacts";
import Portfolio from "./pages/Portfolio";
import Shop from "./pages/Shop";
import Training from "./pages/Training";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <Link to="/" className="text-xl font-bold">IZ Hair Trend</Link>
            <nav className="flex items-center gap-4">
              <Link to="/portfolio" className="hover:underline">Portfolio</Link>
              <Link to="/shop" className="hover:underline">Shop</Link>
              <Link to="/training" className="hover:underline">Training</Link>
              <Link to="/contacts" className="hover:underline">Contacts</Link>
              {/* Auth dropdown menu */}
              <AuthMenu />
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/training" element={<Training />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <footer className="border-t">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} IZ Hair Trend
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
