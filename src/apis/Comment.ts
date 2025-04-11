import { api } from ".";
import { CreateApartmentCommentBody } from "../interface/request/comment/create-apartment-comment-body";

export const createApartmentComment = (
  apartmentId: string,
  body: CreateApartmentCommentBody
) => {
  const accessToken = localStorage.getItem("accessToken");

  return api.post(`comment/${apartmentId}`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
