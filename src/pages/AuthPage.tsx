import { useState } from "react";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("❌ 이메일 형식으로 작성해 주세요");
      return;
    } else {
      setEmailError("");
    }

    // 여기에 회원가입 API 호출 로직 추가
    console.log("회원가입 또는 로그인 요청");
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

              const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
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
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800"
        >
          {isSignup ? "회원가입" : "로그인"}
        </button>

        <p
          className="text-sm text-center text-gray-500 cursor-pointer hover:underline"
          onClick={() => {
            setIsSignup(!isSignup);
            setEmailError(""); // 탭 전환 시 에러 초기화
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
