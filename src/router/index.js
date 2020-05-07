import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/login/login";
import menuFrame from "@/pages/menuFrame/menuFrame";
import routerResult from "@/router/routerResult/index";
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
  ]
});
