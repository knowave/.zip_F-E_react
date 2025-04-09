import { useState } from "react";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isSignup ? "회원가입" : "로그인"}
      </h1>

      <form className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        {isSignup && (
          <input
            type="text"
            placeholder="이름"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        )}
        <input
          type="email"
          placeholder="이메일"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <button className="w-full bg-black text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800">
          {isSignup ? "회원가입" : "로그인"}
        </button>

        <p
          className="text-sm text-center text-gray-500 cursor-pointer hover:underline"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "이미 계정이 있으신가요? 로그인"
            : "계정이 없으신가요? 회원가입"}
        </p>
      </form>
    </div>
  );
}
