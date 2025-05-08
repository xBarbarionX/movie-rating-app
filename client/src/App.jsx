import { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { getUserFromToken } from './utils/auth';
import Register from './pages/Register';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Profile from './pages/Profile';
import MovieDetail from './pages/MovieDetail';
import AdminPanel from "./pages/AdminPanel";

function App() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const user = getUserFromToken();

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <nav className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-200 dark:bg-gray-800">
        <Link to="/" className="text-blue-600 dark:text-blue-400 font-semibold">Movies</Link>
        <div className="flex gap-4 items-center">
          <button onClick={() => setDark(!dark)} className="text-sm px-2 py-1 border rounded">
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-blue-600 dark:text-blue-400">Profile</Link>
              {user?.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
              <button onClick={handleLogout} className="text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 dark:text-blue-400">Login</Link>
              <Link to="/register" className="text-blue-600 dark:text-blue-400">Register</Link>
            </>
          )}
        </div>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/admin" element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;