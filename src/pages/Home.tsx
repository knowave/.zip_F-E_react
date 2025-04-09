export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">
        Dotzip에 오신 걸 환영합니다 🏠
      </h1>
      <p className="text-gray-700 mb-4">
        공공 및 민영 아파트 정보를 확인하고, 댓글과 좋아요로 소통하세요.
      </p>
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">🔥 지금 인기 있는 아파트</h2>
        <p className="text-gray-500 text-sm mb-6">조회수 기준 Top 10</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* 아파트 카드 리스트 샘플 */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">아파트 이름 {i + 1}</h3>
              <p className="text-gray-600 text-sm">서울시 어딘가 · 123세대</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
