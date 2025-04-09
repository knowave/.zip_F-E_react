import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-6">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link
        to="/"
        className="inline-block px-5 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
