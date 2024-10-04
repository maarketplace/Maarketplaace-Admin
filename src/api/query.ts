import axios from "axios";

const { VITE_ENDPOINT } = import.meta.env;
const { VITE_TOKEN } = import.meta.env;


export const getAllCourses = async () => {
    const adminToken = localStorage.getItem(VITE_TOKEN);
    return await axios.get(`${VITE_ENDPOINT}/courses`, {
        headers: {
            'Authorization': `Bearer ${adminToken}`,
        },
    })
}