import { api } from ".";
import { CheckEmailBody } from "../interface/request/user/check-email-body";
import { CheckPasswordBody } from "../interface/request/user/check-password-body";

export const checkEmail = (body: CheckEmailBody) => {
  return api.post("/user/check-email", body);
};

export const checkPassword = (body: CheckPasswordBody) => {
  const accessToken = localStorage.getItem("accessToken");

  return api.post("/user/check-password", body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
