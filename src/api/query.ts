import axiosInstance from "./axiosInstance";

export const getAdmin = async () => {
  return await axiosInstance.get(`/admins`);
};

export const getAllCourses = async () => {
  return await axiosInstance.get(`/courses`);
};

export const getAllUser = async () => {
  return await axiosInstance.get(`/users`);
};

export const getAllProduct = async () => {
  return await axiosInstance.get(`/products`);
};

export const getAllOrder = async () => {
  return await axiosInstance.get(`/orders`);
};

export const getMerchant = async () => {
  return await axiosInstance.get(`/merchants`);
};
export const getProductDetails = async (product_id: string) => {
  return await axiosInstance.get(`/products/${product_id}`);
};
