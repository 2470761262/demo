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
        { //房源列表
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
        {  //验证房源列表
          path: "/menuFrame/validateHouseList",
          name: "validateHouseList",
          meta: {
            routeArray: [
              {
                path: "/menuFrame",
                name: "买卖系统"
              },
              {
                path: "/menuFrame/validateHouseList",
                name: "验真房源列表"
              }
            ]
          },
          component: () =>
            import(/* webpackChunkName: "validateHouseList" */ "@/pages/validateHouseList.vue")
        },
        {  //验真房源审核
          path: "/menuFrame/validateHouseExamineList",
          name: "validateHouseExamineList",
          meta: {
            routeArray: [
              {
                path: "/menuFrame",
                name: "买卖系统"
              },
              {
                path: "/menuFrame/validateHouseExamineList",
                name: "验真房源审核"
              }
            ]
          },
          component: () =>
            import(/* webpackChunkName: "validateHouseExamineList" */ "@/pages/validateHouseExamineList.vue")
        },
        {  //房源作业方审核
          path: "/menuFrame/houseTaskExamineList",
          name: "houseTaskExamineList",
          meta: {
            routeArray: [
              {
                path: "/menuFrame",
                name: "买卖系统"
              },
              {
                path: "/menuFrame/houseTaskExamineList",
                name: "房源作业方审核"
              }
            ]
          },
          component: () =>
            import(/* webpackChunkName: "errorValidathouseTaskExamineListeList" */ "@/pages/houseTaskExamineList.vue")
        },
        {  //验证房源列表
          path: "/menuFrame/errorValidateList",
          name: "errorValidateList",
          meta: {
            routeArray: [
              {
                path: "/menuFrame",
                name: "买卖系统"
              },
              {
                path: "/menuFrame/errorValidateList",
                name: "异常验真列表"
              }
            ]
          },
          component: () =>
            import(/* webpackChunkName: "errorValidateList" */ "@/pages/errorValidateList.vue")
        },
        {  //补充楼盘审核
          path: "/menuFrame/addFloorList",
          name: "addFloorList",
          meta: {
            routeArray: [
              {
                path: "/menuFrame",
                name: "买卖系统"
              },
              {
                path: "/menuFrame/addFloorList",
                name: "补充楼盘审核"
              }
            ]
          },
          component: () =>
            import(/* webpackChunkName: "addFloorList" */ "@/pages/addFloorList.vue")
        },
        {  //公告管理
          path: "/menuFrame/noticeManageList",
          name: "noticeManageList",
          meta: {
            routeArray: [
              {
                path: "/menuFrame",
                name: "系统管理"
              },
              {
                path: "/menuFrame/noticeManageList",
                name: "公告管理类"
              }
            ]
          },
          component: () =>
            import("@/pages/noticeManageList.vue")
        },
      ]
    }
  ]
});
