import { api } from ".";

export const getApartmentViewTopThree = () => {
  return api.get("apartment/top-three");
};

export const getApartmentDetail = (id: string) => {
  return api.get(`apartment/${id}`);
};
