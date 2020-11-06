import Axios from 'axios';
import { API } from '../config/default.json';

Axios.defaults.baseURL = API.baseUrl;
Axios.defaults.timeout = 10000;
Axios.defaults.withCredentials = true;

/*
 * 设置请求传递数据的格式
 * x-www-form-urlencoded
 */
// Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.transformRequest = data => qs.stringify(data);

/*
 * 设置请求拦截器
 * TOKEN校验（JWT）：接收服务器返回的token
 */
Axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/*
 * 响应拦截器
 */
Axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {}
);

export default Axios;
