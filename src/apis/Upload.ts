import { api } from ".";

const token = `Bearer ${localStorage.getItem("accessToken")}`;

export const uploadImage = (formData: FormData) => {
  return api.post("/upload", formData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });
};
