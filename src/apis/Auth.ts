import { api } from ".";
import { SigninBody } from "../types/auth/SignInBody";
import { SignupBody } from "../types/auth/SignupBody";

export const signin = (body: SigninBody) => {
  return api.post("/auth/signin", body);
};

export const signup = (body: SignupBody) => {
  return api.post("/auth/signup", body);
};

export const getMyInfo = () => {
  return api.get("/auth/me");
};
