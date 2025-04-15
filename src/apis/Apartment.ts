import { api } from ".";
import { FetchApartmentQuery } from "../interface/request/apartment/fetch-apartment-query";

const token = `Bearer ${localStorage.getItem("accessToken")}`;

export const getApartmentViewTopThree = () => {
  return api.get("/apartment/top-three");
};

export const getApartmentDetail = (id: string) => {
  return api.get(`/apartment/${id}`);
};

export const fetchApartments = (query: FetchApartmentQuery) => {
  return api.get("/apartment", {
    params: query,
    headers: {
      Authorization: token,
    },
  });
};

export const incrementApartmentViewCount = (id: string) => {
  return api.post(`/apartment/view-count/${id}`, null, {
    headers: {
      Authorization: token,
    },
  });
};
