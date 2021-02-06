import axios from 'axios';
import history from '../utils/history'

const instance = axios.create({
  baseURL: 'http://bytedancecamp.rooftopj.cn:8080',
  timeout: 5000
})

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
instance.interceptors.response.use(
  response => {
    const res = response.data;

    switch (res.code) {
      case 203: {
        alert("请登录");
        history.push('/login');
        window.location.reload(); // This may be better.
        break;
      }
      case 202: {
        alert(res.message);
        break;
      }
    }

    return res.data;
  },
  error => {
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

export default instance.request; 
