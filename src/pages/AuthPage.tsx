import { useState } from "react";
import { checkEmail } from "../apis/User";
import { signin, signup } from "../apis/Auth";
import { SigninResponse } from "../types/signin-res";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nickname, setNickname] = useState("");
  const [region, setRegion] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{5,20}$/;

  const uploadImageToS3 = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("이미지 업로드 실패");
    }

    const data = await res.json();
    return data.imageUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setEmailError("❌ 이메일 형식으로 작성해 주세요");
      return;
    } else {
      setEmailError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "❌ 비밀번호는 5~20자, 숫자 및 특수문자를 포함해야 합니다"
      );
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setPasswordError("❌ 비밀번호가 일치하지 않습니다");
      return;
    }

    setPasswordError("");

    if (isSignup) {
      let imageUrl = "";

      if (imageFile) {
        try {
          imageUrl = await uploadImageToS3(imageFile);
        } catch (err) {
          console.error(err);
          alert("이미지 업로드 중 오류가 발생했습니다.");
          return;
        }
      }

      const payload = {
        email,
        password,
        nickname,
        region,
        imageUrl,
      };

      await signup(payload);
      setIsSignup(false);
    } else {
      const res = await signin({ email, password });

      const accessToken: SigninResponse["accessToken"] = res.data.accessToken;
      const refreshToken: SigninResponse["refreshToken"] =
        res.data.refreshToken;

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isSignup ? "회원가입" : "로그인"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border shadow-sm space-y-4"
      >
        {isSignup && (
          <>
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="지역"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            {isSignup && (
              <div>
                <label className="w-full flex items-center justify-between border rounded-lg px-3 py-2 text-sm cursor-pointer bg-white hover:bg-gray-50 transition">
                  <span className="text-gray-500">프로필 이미지 업로드</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                  {imageFile && (
                    <span className="text-xs text-gray-400 ml-2 truncate max-w-[150px]">
                      {imageFile.name}
                    </span>
                  )}
                </label>
              </div>
            )}
          </>
        )}

        <div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={async (e) => {
              const value = e.target.value;
              setEmail(value);
              if (!emailRegex.test(value)) {
                setEmailError("❌ 이메일 형식으로 작성해 주세요");
              } else {
                setEmailError("");
              }

              if (isSignup) {
                try {
                  const isPossible = await checkEmail({ email: value });
                  if (!isPossible) {
                    setEmailError("❌ 이미 사용 중인 이메일입니다");
                  } else {
                    setEmailError("");
                  }
                } catch (err) {
                  console.error(err);
                  setEmailError("❌ 이메일 중복 확인에 실패했습니다");
                }
              } else {
                setEmailError("");
              }
            }}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);

              if (!passwordRegex.test(value)) {
                setPasswordError(
                  "❌ 비밀번호는 5~20자, 숫자 및 특수문자를 포함해야 합니다"
                );
              } else if (
                isSignup &&
                confirmPassword &&
                confirmPassword !== value
              ) {
                setPasswordError("❌ 비밀번호가 일치하지 않습니다");
              } else {
                setPasswordError("");
              }
            }}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {isSignup && (
          <div>
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
        )}

        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800"
        >
          {isSignup ? "회원가입" : "로그인"}
        </button>

        {!isSignup && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => (window.location.href = "/api/auth/kakao")}
              className="w-full bg-yellow-300 text-black py-2 rounded-xl text-sm font-medium hover:bg-yellow-400"
            >
              카카오 로그인
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = "/api/auth/naver")}
              className="w-full bg-green-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-600"
            >
              네이버 로그인
            </button>
          </div>
        )}

        <p
          className="text-sm text-center text-gray-500 cursor-pointer hover:underline"
          onClick={() => {
            setIsSignup(!isSignup);
            setEmailError("");
            setPasswordError("");
            setConfirmPassword("");
          }}
        >
          {isSignup
            ? "이미 계정이 있으신가요? 로그인"
            : "계정이 없으신가요? 회원가입"}
        </p>
      </form>
    </div>
  );
}
