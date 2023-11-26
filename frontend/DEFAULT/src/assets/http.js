import axios from 'axios';
require('dotenv').config()

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    "Content-Type": "application/json"
});

export default axiosInstance;