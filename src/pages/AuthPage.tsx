import { useState } from "react";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{5,20}$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 이메일 유효성 검사
    if (!emailRegex.test(email)) {
      setEmailError("❌ 이메일 형식으로 작성해 주세요");
      return;
    } else {
      setEmailError("");
    }

    // 비밀번호 유효성 검사
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "❌ 비밀번호는 5~20자, 숫자 및 특수문자를 포함해야 합니다"
      );
      return;
    }

    // 회원가입일 경우 비밀번호 확인
    if (isSignup && password !== confirmPassword) {
      setPasswordError("❌ 비밀번호가 일치하지 않습니다");
      return;
    }

    setPasswordError("");

    // TODO: API 요청 보내기
    if (isSignup) {
      console.log("회원가입 요청", { email, password });
    } else {
      console.log("로그인 요청", { email, password });
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
          <input
            type="text"
            placeholder="이름"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        )}
        <div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);

              if (!emailRegex.test(value)) {
                setEmailError("❌ 이메일 형식으로 작성해 주세요");
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
