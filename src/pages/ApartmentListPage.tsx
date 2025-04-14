import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApartments } from "../apis/Apartment";
import { ApartmentResponse } from "../interface/response/apartment/apartment-res";
import { FetchApartmentQuery } from "../interface/request/apartment/fetch-apartment-query";

export default function ApartmentListPage() {
  const DEFAULT_QUERY: FetchApartmentQuery = {
    page: 1,
    take: 9,
  };

  const navigate = useNavigate();
  const [apartments, setApartments] = useState<ApartmentResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [query, setQuery] = useState<FetchApartmentQuery>(DEFAULT_QUERY);

  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const PAGE_GROUP_SIZE = 10;
  const totalPages = Math.ceil(totalCount / query.take);
  const currentGroup = Math.floor((query.page - 1) / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);
  const nextGroupStart = groupEnd + 1;
  const prevGroupStart = Math.max(1, groupStart - PAGE_GROUP_SIZE);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchApartments(query);

        const data = res.data;
        const apartmentList = data.apartmentList;

        setApartments(
          Array.isArray(apartmentList) ? apartmentList : apartmentList.data
        );
        setTotalCount(data.totalCount ?? 0);
        setError(null);
      } catch (e) {
        console.error("조회 실패", e);
        setError("아파트 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [query]);

  const handleSearch = () => {
    setQuery({
      page: 1,
      take: query.take,
      supplyAreaName: searchInput || undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
  };

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({ ...prev, page }));
  };

  const handleTakeChange = (take: number) => {
    setQuery((prev) => ({ ...prev, take, page: 1 }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">전체 아파트 공고</h1>

      <div className="flex flex-wrap gap-3 mb-6 items-end">
        <div>
          <label className="block text-sm font-medium">시작일</label>
          <input
            type="date"
            value={startDate ?? ""}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">종료일</label>
          <input
            type="date"
            value={endDate ?? ""}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium">공급지역으로 검색</label>
          <input
            type="text"
            placeholder="예: 서울"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          검색
        </button>
      </div>
      <div className="mb-6">
        <label className="mr-2 font-medium">페이지당 개수:</label>
        <select
          value={query.take}
          onChange={(e) => handleTakeChange(Number(e.target.value))}
          className="border rounded-md px-3 py-1"
        >
          {[9, 12, 15, 18, 21].map((t) => (
            <option key={t} value={t}>
              {t}개
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-500">불러오는 중...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {apartments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white border rounded-xl p-5 cursor-pointer hover:shadow-md transition"
              onClick={() =>
                navigate("/apartment-detail", { state: { id: apt.id } })
              }
            >
              <h3 className="text-lg font-semibold">{apt.announcementName}</h3>
              <p className="text-sm text-gray-600">
                {apt.businessDistrict} · {apt.numberOfUnits}세대
              </p>
              <p className="text-xs text-gray-400 mt-1">
                공고일:{" "}
                {apt.announcementDate &&
                  new Date(apt.announcementDate).toLocaleDateString("ko-KR")}
              </p>

              <div className="text-xs text-gray-500 mt-2">
                ❤ {apt.likeCount}명이 좋아합니다
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-10 flex-wrap gap-2">
        {groupStart > 1 && (
          <button
            onClick={() =>
              setQuery((prev) => ({
                ...prev,
                page: prevGroupStart,
              }))
            }
            className="px-3 py-1 rounded-md border bg-white text-gray-700"
          >
            ◀
          </button>
        )}
        {Array.from(
          { length: groupEnd - groupStart + 1 },
          (_, i) => groupStart + i
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-md border ${
              query.page === page
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        {nextGroupStart <= totalPages && (
          <button
            onClick={() =>
              setQuery((prev) => ({
                ...prev,
                page: nextGroupStart,
              }))
            }
            className="px-3 py-1 rounded-md border bg-white text-gray-700"
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
}
