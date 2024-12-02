import axios, { AxiosInstance } from "axios";

const apiConfig:AxiosInstance = axios.create({

    baseURL: 'http://localhost:3000/',
    timeout: 10000,
    headers :{
        'Content-Type': 'application/json',
    },
});

export default apiConfig;