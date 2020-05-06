import axios from "axios";
import qs from "qs";
import util from "@/util/util";
import vm from "@/main.js";
import { TOKEN } from "@/util/constMap";
import { Message } from "element-ui";
import store from "@/store/store";
let CancelToken = axios.CancelToken;
let requerList = [];
let http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  // 请求超时时间（毫秒）
  timeout: 50000
});

// 请求拦截器
http.interceptors.request.use(
  function(config) {
    config.cancelToken = new CancelToken(c => {
      requerList.push(c);
    });
    config.headers.tk = util.localStorageGet(TOKEN);
    if (!config.headers.rid) {
      config.headers.rid = store.state.menuRid.nowRid; // 设置rid
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
// 响应拦截器
http.interceptors.response.use(
  response => {
    if (response.data.code == 401) {
      //取消多个重复弹出框
      requerList.forEach(item => {
        item();
      });
      requerList = [];
      Message({
        message: response.data.message,
        type: "error"
      });
      vm.$router.push({
        path: "/"
      });
      return;
    } else if (response.data.code != 200) {
      Message({
        message: response.data.message,
        type: "error"
      });
      return Promise.reject(response);
    }
    return response;
  },
  error => {
    if (error.message.includes("timeout")) {
      // 判断请求异常信息中是否含有超时timeout字符串
      // Message({
      //   message: '居然请求超时了~',
      //   type: 'error'
      // });
      console.log("接口请求超时");
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 500:
        Message({
          message: "貌似出现了一点问题~",
          type: "error"
        });
        break;
    }
    return Promise.reject(error);
  }
);
//请求对象
let ApiData = {
  post(arg) {
    if (!arg.method) {
      arg.method = "POST";
    }
    let sendConfig = Object.assign(
      {
        token: true
      },
      arg
    );
    if (sendConfig.qs && sendConfig.qs == true)
      // 格式化表单数据
      sendConfig.data = qs.stringify(sendConfig.data, { allowDots: true });
    return new Promise((resolve, reject) => {
      http(sendConfig)
        .then(e => {
          resolve(e);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  put(arg) {
    arg.method = "PUT";
    return this.post.call(this, arg);
  },
  delete(arg) {
    arg.method = "DELETE";
    return this.post.call(this, arg);
  },
  get(arg) {
    if (arg.data) {
      arg.params = arg.data;
      arg.data = true; // 设置data为ture 可以为get添加请求头
    }
    arg.method = "GET";
    return this.post.call(this, arg);
  },
  baseUrl() {
    return process.env.VUE_APP_BASE_API;
  }
};
export default {
  ...ApiData
};
