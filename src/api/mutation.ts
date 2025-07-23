
import axiosInstance from "./axiosInstance";
import { ILoginInterface, IVerify2fa } from "../interface/LoginInterface";

export const adminLogin = async (data: ILoginInterface) => {
    return await axiosInstance.post(`/admins/login`, data)
};

export const verify2fa = async (data: IVerify2fa, email: string | null) => {
    return await axiosInstance.patch(`/admins/2fa?email=${email}`, {
        token: data.token
    });
};
export const enable2fa = async (email: string | null) => {
    return await axiosInstance.post(`/admins/2fa?email=${email}`);
};

export const approveCourse = async (id: string) => {
    return await axiosInstance.post(`/courses?id=${id}`, {},)
}


export const messageMerchantByEmail = async (id: string, content: string) => {
    return await axiosInstance.post(`/admins/message/${id}`, {content});
}

export const AdminResetPassword = async (data: { code: string | undefined, password: string, email: string }) => {
    const { code, password } = data
    return await axiosInstance.patch(`/admins/change-password/${code}`, { password, email: data.email });
}
