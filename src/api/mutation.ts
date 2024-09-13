
import axios from "axios";
import { ILoginInterface } from "../interface/LoginInterface";

const { VITE_ENDPOINT } = import.meta.env;

export const adminLogin = async (data: ILoginInterface) => {
    return await axios.post(`${VITE_ENDPOINT}/admins/login`, data)
};

