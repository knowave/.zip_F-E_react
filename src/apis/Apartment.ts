import { api } from ".";
import { FetchApartmentQuery } from "../interface/request/apartment/fetch-apartment-query";

const accessToken = localStorage.getItem("accessToken");

export const getApartmentViewTopThree = () => {
  return api.get("apartment/top-three");
};

export const getApartmentDetail = (id: string) => {
  return api.get(`apartment/${id}`);
};

export const fetchApartments = (query: FetchApartmentQuery) => {
  return api.get("/apartment", {
    params: query,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
