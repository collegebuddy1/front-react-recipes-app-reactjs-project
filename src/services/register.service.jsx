import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const  registerUser= (data) => {
    return axios.post(baseUrl + "/auth/register", data);
};
