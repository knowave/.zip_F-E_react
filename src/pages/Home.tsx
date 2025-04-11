import { useEffect, useState } from "react";
import { getApartmentViewTopThree } from "../apis/Apartment";
import { TopThreeApartmentResponse } from "../interface/response/top-three-apartment-res";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [apartments, setApartments] = useState<TopThreeApartmentResponse[]>([]);
  const [getApartmentError, setGetApartmentError] = useState("");

  const getApartments = async () => {
    try {
      const res = await getApartmentViewTopThree();
      const topThreeApartments: TopThreeApartmentResponse[] =
        res.data.apartmentList;

      setApartments(topThreeApartments);
    } catch (error) {
      console.error(error);
      setGetApartmentError("아파트 정보를 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    getApartments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">
        Dotzip에 오신 걸 환영합니다 🏠
      </h1>
      <p className="text-gray-700 mb-4">
        공공 및 민영 아파트 정보를 확인하고, 댓글과 좋아요로 소통하세요.
      </p>
      {getApartmentError && (
        <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
          {getApartmentError}
        </div>
      )}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">🔥 지금 인기 있는 아파트</h2>
        <p className="text-gray-500 text-sm mb-6">조회수 기준 Top 3</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {apartments.map((apartment: TopThreeApartmentResponse, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition"
              onClick={() =>
                navigate("/apartment", { state: { id: apartment.id } })
              }
            >
              <h3 className="font-semibold text-lg">
                {apartment.announcementName}
              </h3>
              <p className="text-gray-600 text-sm">
                {apartment.businessDistrict} · {apartment.totalHouseholds}세대
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
