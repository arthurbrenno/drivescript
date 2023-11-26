const axios = require('axios');
require('dotenv').config();

const axiosInstance = axios.create({
    baseURL: process.env.ROTA_BACKEND,
    "Content-Type": "application/json"
});

module.exports = axiosInstance;
