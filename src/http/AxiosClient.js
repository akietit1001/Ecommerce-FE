import axios from 'axios'

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
})

axiosClient.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.AUTH_TOKEN = `${token}`;
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    })

export default axiosClient;