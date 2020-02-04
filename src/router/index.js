import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import menuFrame from '@/pages/menuFrame';
Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/menuFrame",
      name: "menuFrame",
      component: menuFrame,
      redirect: "/menuFrame/houseList",
      children: [
        {
          path: "/menuFrame/houseList",
          name: "houseList",
          meta: {
            routeArray: [
              {
                path: "/menuFrame",
                name: "买卖系统"
              },
              {
                path: "/menuFrame/houseList",
                name: "房源列表"
              }
            ]
          },
          component: () =>
            import(/* webpackChunkName: "houseList" */ "@/pages/houseList.vue")
        },
      ]
    }
  ]
});
