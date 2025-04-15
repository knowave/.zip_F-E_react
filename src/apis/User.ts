import { api } from ".";
import { CheckEmailBody } from "../interface/request/user/check-email-body";
import { CheckPasswordBody } from "../interface/request/user/check-password-body";
import { PatchUserBody } from "../interface/request/user/patch-user-body";
import { PatchUserPasswordBody } from "../interface/request/user/patch-user-password-body";

const token = `Bearer ${localStorage.getItem("accessToken")}`;

export const checkEmail = (body: CheckEmailBody) => {
  return api.post("/user/check-email", body);
};

export const checkPassword = (body: CheckPasswordBody) => {
  return api.post("/user/check-password", body, {
    headers: {
      Authorization: token,
    },
  });
};

export const fetchUserEmail = () => {
  return api.get("/user/email", {
    headers: {
      Authorization: token,
    },
  });
};

export const patchUser = (body: PatchUserBody) => {
  return api.patch("/user", body, {
    headers: {
      Authorization: token,
    },
  });
};

export const patchUserPassword = (body: PatchUserPasswordBody) => {
  return api.patch("/user/change-password", body, {
    headers: {
      Authorization: token,
    },
  });
};
