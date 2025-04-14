export default function ProfileEditPage() {
  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">프로필 수정</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            닉네임
          </label>
          <input
            type="text"
            placeholder="닉네임 입력"
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
