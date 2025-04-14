import { api } from ".";
import { SigninBody } from "../interface/request/auth/sign-in-body";
import { SignupBody } from "../interface/request/auth/sign-up-body";

// 로그인 API
export const signin = (body: SigninBody) => {
  return api.post("/auth/signin", body);
};

// 회원가입 API
export const signup = (body: SignupBody) => {
  return api.post("/auth/signup", body);
};

// 내 정보 조회 API
export const getMyInfo = () => {
  return api.get("/auth/me");
};
