import { api } from ".";
import { CheckEmailBody } from "../interface/user/check-email-body";

export const checkEmail = (body: CheckEmailBody) => {
  return api.post("/user/check-email", body);
};
