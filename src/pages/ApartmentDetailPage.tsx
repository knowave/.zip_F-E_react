import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApartmentDetail } from "../apis/Apartment";
import { createApartmentComment } from "../apis/Comment";
import { ApartmentDetailResponse } from "../interface/response/apartment/apartment-detail";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { apartmentLike } from "../apis/Like";

export default function ApartmentDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [fetchApartment, setFetchApartment] =
    useState<ApartmentDetailResponse>();
  const [fetchApartmentError, setFetchApartmentError] = useState("");

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!state?.id) {
      navigate("/", { replace: true });
      return;
    }
    const liked = localStorage.getItem(`liked-apartment-${state.id}`);

    if (liked !== null) {
      setIsLiked(JSON.parse(liked));
    }

    fetchApartmentDetail(state.id);
  }, [state, navigate]);

  const fetchApartmentDetail = async (id: string) => {
    try {
      const res = await getApartmentDetail(id);
      const apartmentDetail: ApartmentDetailResponse = res.data;
      setFetchApartment(apartmentDetail);
    } catch (error) {
      console.error(error);
      setFetchApartmentError("아파트 정보를 불러오는데 실패했습니다.");
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);

      await createApartmentComment(state.id, {
        content: comment.trim(),
        isPrivate: false,
        type: "APT",
      });

      setComment("");
      await fetchApartmentDetail(state.id);
    } catch (error) {
      console.error(error);
      setFetchApartmentError("댓글을 작성하는데 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeToggle = async () => {
    if (!fetchApartment) return;

    try {
      const { data: isLike } = await apartmentLike(state.id);

      setIsLiked(isLike);
      localStorage.setItem(
        `liked-apartment-${state.id}`,
        JSON.stringify(isLike)
      );
      await fetchApartmentDetail(state.id);
    } catch (error) {
      console.error(error);
      setFetchApartmentError("❌ 좋아요를 누르는데 실패했습니다.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">아파트 상세 정보</h1>

      {fetchApartmentError && (
        <p className="text-red-500 text-sm mb-4">{fetchApartmentError}</p>
      )}

      {fetchApartment && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold">
            {fetchApartment.announcementName}
          </h2>
          <p className="text-gray-600 mt-1">
            {fetchApartment.businessDistrict} · {fetchApartment.totalHouseholds}
            세대
          </p>
          <p className="text-sm text-gray-400 mt-2 flex items-center">
            조회수: {fetchApartment.viewCount}회
            <button
              onClick={handleLikeToggle}
              className="ml-4 text-red-500 hover:text-red-600"
            >
              {isLiked ? "♥" : "♡"} {fetchApartment.likeCount}
            </button>
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-gray-800 disabled:opacity-50"
              >
                등록
              </button>
            </form>

            <ul className="space-y-4">
              {fetchApartment.comments?.length === 0 && (
                <li className="text-gray-400 text-sm">
                  등록된 댓글이 없습니다.
                </li>
              )}
              {fetchApartment.comments?.map((c) => (
                <li
                  key={c.id}
                  className="bg-gray-50 border rounded-lg px-4 py-3"
                >
                  <p className="text-sm text-gray-800">
                    {c.username} · "{c.content}"
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(c.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
