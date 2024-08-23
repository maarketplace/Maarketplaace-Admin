import axios from "axios";

const { VITE_ENDPOINT } = import.meta.env;

export const adminLogin = async (data: any) => {
    return await axios.post(`${VITE_ENDPOINT}/admin/login`, data)
};

