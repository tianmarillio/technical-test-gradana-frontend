import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
})

export default api
