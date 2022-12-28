import axios from 'axios'

const api = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:8000/'
            : 'http://localhost:8000/',
})

// interceptor para adicionar token antes de realizar chamadas
api.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api
