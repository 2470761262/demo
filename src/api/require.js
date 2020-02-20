import axios from 'axios';
import qs from 'qs';
import util from '@/util/util';
import vm from '@/main.js';
let http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  // 请求超时时间（毫秒）
  timeout: 50000,
});

// 请求拦截器
http.interceptors.request.use(function (config) {
  // Do something before request is sent 
  config.headers.tk = util.localStorageGet("token");
  console.log("设置了token", "请求拦截器");
  return config;
}, function (error) {
  console.log(error, "响应拦截器");
  // Do something with request error
  return Promise.reject(error);
});
// 响应拦截器
http.interceptors.response.use(function (response) {
  // Do something with response data
  console.log(response, "响应拦截器");
  return response;
}, function (error) {
  // Do something with response error
  console.log(error, "响应拦截器");
  return Promise.reject(error);
});
//请求对象
let ApiData = {
  post (arg) {
    if (!arg.method) {
      arg.method = 'POST';
    }
    let sendConfig = Object.assign({ token: true }, arg);
    if (sendConfig.qs && sendConfig.qs == true) // 格式化表单数据
      sendConfig.data = qs.stringify(sendConfig.data);
    return new Promise((resolve, reject) => {
      http(sendConfig).then((e) => {
        if (e.data.code == 401) {
          alert(e.data.message);
          alert('即将跳转到登录页面');
          return;
        }
        resolve(e)
      }).catch((e) => {
        reject(e);
      });
    })
  },
  put (arg) {
    arg.method = 'PUT';
    return this.post.call(this, arg);
  },
  delete (arg) {
    arg.method = 'DELETE';
    return this.post.call(this, arg);
  },
  get (arg) {
    if (arg.data) {
      arg.params = arg.data;
      delete arg.data;
    }
    arg.method = 'GET';
    return this.post.call(this, arg);
  },
  baseUrl () {
    return process.env.VUE_APP_BASE_API;
  }
}
export default {
  ...ApiData
}