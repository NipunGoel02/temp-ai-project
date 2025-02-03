import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://ai-project-backend-u23l.onrender.com",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance;
