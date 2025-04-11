import { api } from ".";
import { SigninBody } from "../interface/request/auth/sign-in-body";
import { SignupBody } from "../interface/request/auth/sign-up-body";

export const signin = (body: SigninBody) => {
  return api.post("/auth/signin", body);
};

export const signup = (body: SignupBody) => {
  return api.post("/auth/signup", body);
};

export const getMyInfo = () => {
  return api.get("/auth/me");
};
