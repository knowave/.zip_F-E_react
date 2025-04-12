import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkPassword } from "../apis/User"; // 비밀번호 검증 API

export default function ProfilePage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordCheck = async () => {
    try {
      await checkPassword({ password }); // API 내부에서 accessToken으로 유저 식별

      navigate("/profile/edit");
    } catch (err) {
      console.error(err);
      setError("❌ 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">내 프로필</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이메일
          </label>
          <input
            type="email"
            defaultValue="user@example.com"
            disabled
            className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            현재 비밀번호 확인
          </label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <button
          onClick={handlePasswordCheck}
          className="w-full bg-black text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800"
        >
          확인
        </button>
      </div>
    </div>
  );
}
