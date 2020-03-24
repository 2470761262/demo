// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "@/store/store";
import VueCookies from 'vue-cookies'; //cookies
import "./validate/validate"; //表单验证
import Api from "@/api/require"; //请求api
import guard from "@/router/guard"; // 路由拦截器
import * as socketApi from './util/webSocket';
import themePackers from "@/themePackers/themePackers";
import componentsIndex from "@/components/index";
import directives from "@/directives/directive";
import * as md5Util from './util/md5';
import "babel-polyfill";
Vue.prototype.socketApi = socketApi;
Vue.prototype.md5Util = md5Util;
Vue.prototype.$api = Api;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCookies);
Vue.use(componentsIndex);
Vue.use(directives);
guard(router);
themePackers.createImport();
/* eslint-disable no-new */
let app = new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});

export default app;
