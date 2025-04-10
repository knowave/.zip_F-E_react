import { api } from ".";
import { CheckEmailBody } from "../types/user/CheckEmailBody";

export const checkEmail = (body: CheckEmailBody) => {
  return api.post("/user/check-email", body);
};
