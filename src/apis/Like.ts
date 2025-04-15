import { api } from ".";

const token = `Bearer ${localStorage.getItem("accessToken")}`;

export const apartmentLike = (id: string) => {
  return api.post(`/like/apartment/${id}`, null, {
    headers: {
      Authorization: token,
    },
  });
};
