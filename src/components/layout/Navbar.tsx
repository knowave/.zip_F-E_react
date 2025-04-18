import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { fetchApartmentPopularSearchKeyword } from "../../apis/Apartment";
import { PopularKeywordResponse } from "../../interface/response/apartment/popular-keyword";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [currentKeyword, setCurrentKeywordIndex] = useState(0);
  const [popularKeywords, setPopularKeywords] = useState<
    PopularKeywordResponse[]
  >([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const res = await fetchApartmentPopularSearchKeyword();
        const data = await res.data;
        setPopularKeywords(data);
      } catch (err) {
        console.error("인기 검색어 불러오기 실패", err);
      }
    };

    fetchKeywords();
  }, []);

  useEffect(() => {
    if (isHovering || popularKeywords.length <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentKeywordIndex((prev) => (prev + 1) % popularKeywords.length);
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering, popularKeywords]);

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
        <div
          className="relative text-sm text-gray-600 dark:text-gray-300 cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          🔥 인기 검색어:{" "}
          <span className="font-semibold transition-opacity duration-300 ease-in-out">
            {currentKeyword + 1}위 {popularKeywords[currentKeyword]?.keyword}
          </span>
          {isHovering && (
            <div className="absolute left-0 top-6 mt-2 w-60 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-md shadow-lg z-50 p-3 space-y-1">
              {popularKeywords.map((item, index) => (
                <div key={item.keyword} className="flex justify-between">
                  <span className="font-medium">{index + 1}위</span>
                  <span>{item.keyword}</span>
                </div>
              ))}
            </div>
          )}
        </div>
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

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
            className="ml-4 border px-2 py-1 text-sm rounded-md bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="system">🖥 System</option>
          </select>
        </nav>
      </div>
    </header>
  );
}
