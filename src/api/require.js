import axios from 'axios';
import qs from 'qs';

function initBaseUrl () {
  if (process.env.NODE_ENV != 'development') { // 线上
    return 'http://bweb.yongxinjia.com';
  }
  return 'http://bweb.ngrok.5fanqie.com'; // 本地
}
axios.defaults.baseURL = initBaseUrl();
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let http = axios.create({
  withCredentials: true,
  // 用于请求之前对请求数据进行操作
  // 只用当请求方法为‘PUT’，‘POST’和‘PATCH’时可用
  // 最后一个函数需return出相应数据
  // 可以修改headers
  transformRequest: [function (data) {
    return data;
  }],
  // 用于对相应数据进行处理
  // 它会通过then或者catch
  transformResponse: [function (data) {
    // 可以对data做任何操作
    return data;
  }],
  // 请求超时时间（毫秒）
  timeout: 1000,
});

// 请求拦截器
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (config.token) {
    config.headers.token = 1111;
    console.log(config, "请求拦截器");
  }
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
    if (!arg.method)
      arg.method = 'POST';
    let sendConfig = Object.assign({ token: true }, arg);
    if (sendConfig.data)
      sendConfig.data = qs.stringify(sendConfig.data);
    return new Promise((resolve, reject) => {
      http(sendConfig).then((e) => {
        resolve(e)
      }).catch((e) => {
        reject(e);
      });
    })
  },
  put (arg) {
    if (!arg.method)
      arg.methods = 'PUT';
    return this.post.call(this, arg);
  },
  delete () {
    if (!arg.method)
      arg.methods = 'DELETE';
    return this.post.call(this, arg);
  },
  get (arg) {
    if (arg.data) {
      arg.params = arg.data;
      delete arg.data;
    }
    arg.method = 'GET';
    return this.post.call(this, arg);
  }
}
export default {
  ...ApiData
}