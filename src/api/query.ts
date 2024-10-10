import axios from "axios";

const { VITE_ENDPOINT } = import.meta.env;
const { VITE_TOKEN } = import.meta.env;


export const getAdmin = async () => {
    const adminToken = localStorage.getItem(VITE_TOKEN);
    return await axios.get(`${VITE_ENDPOINT}/admins`, {
        headers: {
            'Authorization': `Bearer ${adminToken}`,
        },
    })
}

export const getAllCourses = async () => {
    const adminToken = localStorage.getItem(VITE_TOKEN);
    return await axios.get(`${VITE_ENDPOINT}/courses`, {
        headers: {
            'Authorization': `Bearer ${adminToken}`,
        },
    })
}

export const getAllUser = async () => {
    const adminToken = localStorage.getItem(VITE_TOKEN);
    return await axios.get(`${VITE_ENDPOINT}/users`, {
        headers: {
            'Authorization': `Bearer ${adminToken}`,
        },
    })
}

export const getAllProduct = async () => {
    const adminToken = localStorage.getItem(VITE_TOKEN);
    return await axios.get(`${VITE_ENDPOINT}/products`, {
        headers: {
            'Authorization': `Bearer ${adminToken}`,
        },
    })
}

export const getAllOrder = async () => {
    const adminToken = localStorage.getItem(VITE_TOKEN);
    return await axios.get(`${VITE_ENDPOINT}/orders`, {
        headers: {
            'Authorization': `Bearer ${adminToken}`,
        },
    })
}
