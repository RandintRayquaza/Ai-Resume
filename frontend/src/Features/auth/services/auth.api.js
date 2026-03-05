import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const AUTH_BASE_PATH = '/api/auth'

const api = axios.create({
    baseURL: `${API_URL}${AUTH_BASE_PATH}`,
    withCredentials: true
})

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = window.localStorage.getItem('token')
        if (token) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
})

const toError = (error, fallbackMessage) => {
    const message = error?.response?.data?.message || fallbackMessage
    return new Error(message)
}

const request = async (method, path, payload, fallbackMessage) => {
    try {
        const res = await api.request({
            method,
            url: path,
            data: payload
        })
        return res.data
    } catch (error) {
        throw toError(error, fallbackMessage)
    }
}

export const register = ({ username, email, password }) =>
    request('post', '/register', { username, email, password }, 'Failed to register')

export const login = ({ email, password }) =>
    request('post', '/login', { email, password }, 'Failed to login')

export const logout = () =>
    request('post', '/logout', undefined, 'Failed to logout')

export const getME = () =>
    request('get', '/me', undefined, 'Failed to fetch user profile')