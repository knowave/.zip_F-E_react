import { api } from ".";
import { CheckEmailBody } from "../interface/request/user/check-email-body";
import { CheckPasswordBody } from "../interface/request/user/check-password-body";

const accessToken = localStorage.getItem("accessToken");

export const checkEmail = (body: CheckEmailBody) => {
  return api.post("/user/check-email", body);
};

export const checkPassword = (body: CheckPasswordBody) => {
  return api.post("/user/check-password", body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const fetchUserEmail = async () => {
  return api.get("/user/email", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
