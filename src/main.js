import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "@/store/store";
import VueCookies from "vue-cookies"; //cookies
import "./validate/validate"; //表单验证
import Api from "@/api/require"; //请求api
import Report from "@/api/report"; //请求api
import guard from "@/router/guard"; // 路由拦截器
import logWebSocket from "./components/log/logWebSocket";
import * as socketApi from "./util/webSocket";
import { getColor } from "@/themePackers/getSkin";
import componentsIndex from "@/components/index";
import directives from "@/directives/directive";
import * as md5Util from "./util/md5";
import "./console";
//import "babel-polyfill";
Vue.prototype.socketApi = socketApi;
Vue.prototype.md5Util = md5Util;
Vue.prototype.$api = Api;
Vue.prototype.$apiReport = Report;
Vue.config.productionTip = false;
Vue.prototype.log_socket = logWebSocket;
Vue.use(ElementUI);
Vue.use(VueCookies);
Vue.use(componentsIndex);
Vue.use(directives);
guard(router);
getColor();
Vue.use(ElementUI);
const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default app;
