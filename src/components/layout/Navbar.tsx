import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
          Dotzip
        </Link>
        <nav className="space-x-4">
          <Link
            to="/apartments"
            className="text-gray-700 hover:text-black text-sm font-medium"
          >
            아파트 공고
          </Link>
          {isLoggedIn && (
            <Link
              to="/profile"
              className="text-gray-700 hover:text-black text-sm font-medium"
            >
              내 프로필
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-800"
            >
              로그아웃
            </button>
          ) : (
            <Link
              to="/account/signin"
              className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-800"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
