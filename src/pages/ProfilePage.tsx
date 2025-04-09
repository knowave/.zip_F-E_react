export default function ProfilePage() {
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
            비밀번호 변경
          </label>
          <input
            type="password"
            placeholder="새 비밀번호"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <button className="w-full bg-black text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800">
          저장
        </button>
      </div>
    </div>
  );
}
