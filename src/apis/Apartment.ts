import { api } from ".";

export const getApartmentViewTopThree = () => {
  return api.get("apartment/top-three");
};
