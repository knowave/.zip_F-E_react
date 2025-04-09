import { useParams } from "react-router-dom";

export default function ApartmentDetailPage() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">아파트 상세 정보</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold">아파트 {id} 이름</h2>
        <p className="text-gray-600 mt-1">서울시 강남구 · 123세대</p>
        <p className="text-sm text-gray-400 mt-2">조회수: 421회 · ❤ 52명</p>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">💬 댓글</h3>
          <form className="mb-4">
            <textarea
              className="w-full border rounded-lg p-2 text-sm"
              rows={3}
              placeholder="댓글을 입력하세요"
            ></textarea>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-gray-800"
            >
              등록
            </button>
          </form>

          <ul className="space-y-4">
            {[1, 2].map((c) => (
              <li key={c} className="bg-gray-50 border rounded-lg px-4 py-3">
                <p className="text-sm text-gray-800">
                  사용자{c} · "이 아파트 좋아보여요!"
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
