import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/login/login";
import menuFrame from "@/pages/menuFrame/menuFrame";
import routerResult from "@/router/routerResult/index";
import util from "@/util/util";
const caceDom = document;
Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      // 二级路由
      path: "/menuFrame",
      name: "menuFrame",
      component: menuFrame,
      redirect: "/buySellSystem/houseList",
      meta: {
        title: "首页"
      },
      children: routerResult
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    const scrollTop = util.sessionLocalStorageGet("scrollTop");
    // 从第二页返回首页时savedPosition为undefined
    if (savedPosition || typeof savedPosition === "undefined") {
      //后退
      // 只处理设置了路由元信息的组件
      from.meta.keepAlive =
        typeof from.meta.keepAlive === "undefined" ? undefined : false;
      to.meta.keepAlive =
        typeof to.meta.keepAlive === "undefined" ? undefined : true;
      if (savedPosition) {
        caceDom.querySelector(".el-main").scrollTop = to.meta.scrollTop;
        // return savedPosition;
      }
    } else {
      //如果有skipKeepAlive属性则代表自己在内部添加跳转逻辑，跳过统一缓存
      if (!from.meta.skipKeepAlive == true) {
        //前进
        from.meta.keepAlive =
          typeof from.meta.keepAlive === "undefined" ? undefined : true;
        to.meta.keepAlive =
          typeof to.meta.keepAlive === "undefined" ? undefined : false;
      } else {
        //to.meta.skipKeepAlive = false;
        from.meta.skipKeepAlive = false;
      }
      from.meta.scrollTop = scrollTop;
    }
  }
});
