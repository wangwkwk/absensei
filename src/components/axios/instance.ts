import axios from "axios";


const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
})

instance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('authToken')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

instance.interceptors.response.use(
    (response) => response,
    (error)=>{
        if(error.response?.status === 403){
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
    
)

export default instance;