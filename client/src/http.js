import axios from 'axios';
import router from './router';

// 請求攔截 request 再把 請求發送到 server 端之前，攔截後改變此 請求的內容
axios.interceptors.request.use(
  (config) => {
    if (localStorage.chatToken) {
      config.headers.Authorization = localStorage.chatToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 響應攔截 response

axios.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    // 錯誤提醒
    const { status } = erroe.response;
    if (status == 401) {
      alert('token 過期了，請重新登入！');
      // 清除 token
      localStorage.removeItem('chatToken');
      // 頁面跳轉
      router.push('/login');
    } else {
      alert(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axios;
