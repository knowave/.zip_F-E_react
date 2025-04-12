import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, setTheme } = useTheme();

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
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white tracking-tight"
        >
          Dotzip
        </Link>
        <nav className="space-x-4 flex items-center">
          <Link
            to="/apartments"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm font-medium"
          >
            아파트 공고
          </Link>
          {isLoggedIn && (
            <Link
              to="/profile"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm font-medium"
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

          {/* 🌗 테마 토글 버튼 */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
            className="ml-4 border px-2 py-1 text-sm rounded-md bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="light">☀️ 라이트</option>
            <option value="dark">🌙 다크</option>
            <option value="system">🖥 시스템</option>
          </select>
        </nav>
      </div>
    </header>
  );
}
