import { useState } from "react";
import { PatchUserBody } from "../interface/request/user/patch-user-body";
import { uploadImage } from "../apis/Upload";
import { patchUser, patchUserPassword } from "../apis/User";
import { useNavigate } from "react-router-dom";

export default function ProfileEditPage() {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{5,20}$/;

  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [patchUserError, setPatchUserError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async () => {
    let uploadImageUrl = null;

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const { data } = await uploadImage(formData);
        uploadImageUrl = data.url;
      }

      const body: PatchUserBody = {
        nickname,
        region,
        imageUrl: uploadImageUrl,
      };

      if (password) await patchUserPassword({ password });

      await patchUser(body);
      navigate("/");
    } catch (error) {
      console.error(error);
      setPatchUserError("❌ 프로필 수정에 실패했습니다");
    }
  };

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
            value={nickname ?? ""}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            프로필 이미지
          </label>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="profile-image-upload"
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700 border"
            >
              파일 선택
            </label>
            <span className="text-sm text-gray-500">
              {imageFile ? imageFile.name : "선택된 파일 없음"}
            </span>
          </div>

          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            지역
          </label>
          <input
            type="text"
            placeholder="지역 입력"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={region ?? ""}
            onChange={(e) => setRegion(e.target.value)}
            autoComplete="off"
            name="geo-location"
            id="geo-location-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);

              if (!passwordRegex.test(value)) {
                setPasswordError(
                  "❌ 비밀번호는 5~20자, 숫자 및 특수문자를 포함해야 합니다"
                );
              } else if (confirmPassword && confirmPassword !== value) {
                setPasswordError("❌ 비밀번호가 일치하지 않습니다");
              } else {
                setPasswordError("");
              }
            }}
            autoComplete="new-password"
            name="password"
            id="password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => {
              const value = e.target.value;
              setConfirmPassword(value);

              if (password && password !== value) {
                setPasswordError("❌ 비밀번호가 일치하지 않습니다");
              } else {
                setPasswordError("");
              }
            }}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}
        <button
          className="w-full bg-black text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800"
          onClick={handleSubmit}
        >
          저장
        </button>
        {patchUserError && (
          <p className="text-red-500 text-sm mt-2">{patchUserError}</p>
        )}
      </div>
    </div>
  );
}
