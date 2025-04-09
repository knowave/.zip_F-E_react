import { Link } from "react-router-dom";

export default function Navbar() {
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
          <Link
            to="/profile"
            className="text-gray-700 hover:text-black text-sm font-medium"
          >
            내 프로필
          </Link>
          <Link
            to="/auth/signin"
            className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-800"
          >
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
}
