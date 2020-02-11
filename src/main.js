// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./validate/validate";//表单验证
import Api from "@/api/require"; //请求api
import guard from '@/router/guard'; // 路由拦截器
import themePackers from '@/themePackers/themePackers';//主题
import "babel-polyfill";
Vue.prototype.$api = Api;
Vue.config.productionTip = false;
Vue.use(ElementUI);
guard(router);
themePackers.createImport();
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
