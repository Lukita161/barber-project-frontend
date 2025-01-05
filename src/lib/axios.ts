import axios from "axios";

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL
})

export const axiosPrivate = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL
})
axiosPrivate.interceptors.request.use(config => {
    const token = localStorage.getItem('sessionToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})