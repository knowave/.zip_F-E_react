import { useLocation, useNavigate } from "react-router-dom";
import { ApartmentResponse } from "../interface/response/apartment-res";
import { useEffect, useState } from "react";
import { getApartmentDetail } from "../apis/Apartment";

export default function ApartmentDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [getApartment, setGetApartment] = useState<ApartmentResponse>();
  const [getApartmentError, setGetApartmentError] = useState("");

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]); // 임시 댓글 리스트

  useEffect(() => {
    if (!state?.id) {
      navigate("/", { replace: true });
      return;
    }

    const fetchApartment = async () => {
      try {
        const res = await getApartmentDetail(state.id);
        setGetApartment(res.data);
      } catch (error) {
        console.error(error);
        setGetApartmentError("아파트 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchApartment();
  }, [state, navigate]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setComments((prev) => [...prev, comment.trim()]);
    setComment("");
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">아파트 상세 정보</h1>

      {getApartmentError && (
        <p className="text-red-500 text-sm mb-4">{getApartmentError}</p>
      )}

      {getApartment && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold">
            {getApartment.announcementName}
          </h2>
          <p className="text-gray-600 mt-1">
            {getApartment.businessDistrict} · {getApartment.totalHouseholds}세대
          </p>
          <p className="text-sm text-gray-400 mt-2">
            조회수: {getApartment.viewCount}회 · ❤ {getApartment.likeCount}명
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">💬 댓글</h3>
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                className="w-full border rounded-lg p-2 text-sm"
                rows={3}
                placeholder="댓글을 입력하세요"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-gray-800"
              >
                등록
              </button>
            </form>

            <ul className="space-y-4">
              {comments.length === 0 && (
                <li className="text-gray-400 text-sm">
                  등록된 댓글이 없습니다.
                </li>
              )}
              {comments.map((c, idx) => (
                <li
                  key={idx}
                  className="bg-gray-50 border rounded-lg px-4 py-3"
                >
                  <p className="text-sm text-gray-800">익명 사용자 · "{c}"</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
