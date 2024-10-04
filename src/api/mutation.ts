
import axios from "axios";
import { ILoginInterface, IVerify2fa } from "../interface/LoginInterface";

const { VITE_ENDPOINT } = import.meta.env;
const { VITE_TOKEN } = import.meta.env;
export const adminLogin = async (data: ILoginInterface) => {
    return await axios.post(`${VITE_ENDPOINT}/admins/login`, data)
};

export const verify2fa = async (data: IVerify2fa, email: string | null) => {
    return await axios.patch(`${VITE_ENDPOINT}/admins/2fa?email=${email}`, {
        token: data.token
    });
};
export const enable2fa = async (email: string | null) => {
    return await axios.post(`${VITE_ENDPOINT}/admins/2fa?email=${email}`);
};

export const approveCourse = async (id: string) => {
    const adminToken = localStorage.getItem(VITE_TOKEN);
    return await axios.post(`${VITE_ENDPOINT}/courses?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${adminToken}`,
        },
    })
}
