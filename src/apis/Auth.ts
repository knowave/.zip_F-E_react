import { api } from ".";

export const signin = (data: { email: string; password: string }) => {
  return api.post("/auth/signin", data);
};

export const signup = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/signup", data);
};

export const getMyInfo = () => {
  return api.get("/auth/me");
};
