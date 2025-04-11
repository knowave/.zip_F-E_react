import { api } from ".";

export const createApartmentComment = (
  apartmentId: string,
  userId: string,
  body
) => {
  return api.post(`comment/${apartmentId}`);
};
