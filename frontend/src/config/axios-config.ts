import axios from "axios";


const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 50000,
});


axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = token
    }
    return config;
  },
  (error) => Promise.reject(error)
);



axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data.message || error.message);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
