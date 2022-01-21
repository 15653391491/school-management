import axios from 'axios'
import {BASE_URL} from "@/api/config";
import {store} from "@/vuex";

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? BASE_URL : '/api/',
    timeout: 50000, // 请求超时uploadBuildExcel
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
})

service.interceptors.request.use(config => {
    if (!config.headers.token) {
        config.headers.token = store.state.token
    }
    return config
})

export default service