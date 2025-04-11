import { useNavigate } from "react-router-dom";

export default function ApartmentListPage() {
  const navigate = useNavigate();
  const mockApartments = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: `아파트 ${i + 1}`,
    location: "서울시 강남구",
    units: 150 + i * 10,
    liked: 24 + i * 3,
  }));

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">전체 아파트 공고</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockApartments.map((apt) => (
          <div
            key={apt.id}
            className="block bg-white p-5 border border-gray-200 rounded-xl hover:shadow-md transition cursor-pointer"
            onClick={() =>
              navigate("/apartment-detail", { state: { id: apt.id } })
            }
          >
            <h3 className="text-lg font-semibold text-gray-900">{apt.name}</h3>
            <p className="text-sm text-gray-600">
              {apt.location} · {apt.units}세대
            </p>
            <div className="text-xs text-gray-400 mt-2">
              ❤ {apt.liked}명이 좋아합니다
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
