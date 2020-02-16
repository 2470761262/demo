import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import menuFrame from "@/pages/menuFrame";
Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

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
          //房源列表
          path: "/menuFrame/houseList",
          name: "houseList",
          meta: {
            isLogin: true,
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
        {
          //房源配对列表
          path: "/menuFrame/mateHouseList",
          name: "mateHouseList",
          meta: {
            isLogin: true,
            routeArray: [
              {
                path: "/menuFrame",
                name: "买卖系统"
              },
              {
                path: "/menuFrame/houseList",
                name: "房源列表"
              },
              {
                path: "/menuFrame/mateHouseList",
                name: "房源配对列表"
              }
            ]
          },
          component: () =>
            import(/* webpackChunkName: "mateHouseList" */ "@/components/mateHouseList.vue")
        },
        {
          //房源列表
          path: "/menuFrame/newAgentHouse",
          name: "houseList",
          meta: {
            isLogin: true,
            routeArray: [
              {
                path: "/menuFrame",
                name: "买卖系统"
              },
              {
                path: "/menuFrame/newAgentHouse",
                name: "房源列表"
              }
            ]
          },
          component: () =>
            import(/* webpackChunkName: "newAgentHouse" */ "@/pages/newAgentHouse.vue")
        },
        {
          //验证房源列表
          path: "/menuFrame/validateHouseList",
          name: "validateHouseList",
          meta: {
            isLogin: true,
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
            import(
              /* webpackChunkName: "validateHouseList" */ "@/pages/validateHouseList.vue"
            )
        },
        {
          //验真房源审核
          path: "/menuFrame/validateHouseExamineList",
          name: "validateHouseExamineList",
          meta: {
            isLogin: true,
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
            import(
              /* webpackChunkName: "validateHouseExamineList" */ "@/pages/validateHouseExamineList.vue"
            )
        },
        {
          //房源作业方审核
          path: "/menuFrame/houseTaskExamineList",
          name: "houseTaskExamineList",
          meta: {
            isLogin: true,
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
            import(
              /* webpackChunkName: "errorValidathouseTaskExamineListeList" */ "@/pages/houseTaskExamineList.vue"
            )
        },
        {
          //验证房源列表
          path: "/menuFrame/errorValidateList",
          name: "errorValidateList",
          meta: {
            isLogin: true,
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
            import(
              /* webpackChunkName: "errorValidateList" */ "@/pages/errorValidateList.vue"
            )
        },
        {
          //补充楼盘审核
          path: "/menuFrame/addFloorList",
          name: "addFloorList",
          meta: {
            isLogin: true,
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
            import(
              /* webpackChunkName: "addFloorList" */ "@/pages/addFloorList.vue"
            )
        },
        {
          //录入房源
          path: "/menuFrame/addHouse",
          name: "addHouse",
          meta: {
            isLogin: true,
            routeArray: [
              {
                path: "/menuFrame",
                name: "买卖系统"
              },
              {
                path: "/menuFrame/houseList",
                name: "房源列表"
              },
              {
                path: "/menuFrame/addHouse",
                name: "房源录入"
              }
            ]
          },
          component: () =>
            import(/* webpackChunkName: "addHouse" */ "@/pages/addHouse.vue")
        },
        {
          //公告管理
          path: "/menuFrame/noticeManageList",
          name: "noticeManageList",
          meta: {
            isLogin: true,
            routeArray: [
              {
                path: "/menuFrame",
                name: "系统管理"
              },
              {
                path: "/menuFrame/noticeManageList",
                name: "公告管理"
              }
            ]
          },
          component: () =>
            import(
              "@/pages/noticeManage/noticeManageList.vue"
            )
        },
        {
          //查看公告详情
          path: "/menuFrame/noticeDetail",
          name: "noticeDetail",
          meta: {
            isLogin: true,
            routeArray: [
              {
                path: "/menuFrame",
                name: "系统管理"
              },
              {
                path: "/menuFrame/noticeManageList",
                name: "公告管理"
              },
              {
                path: "/menuFrame/noticeDetail",
                name: "公告详情"
              }
            ]
          },
          component: () =>
            import( "@/pages/noticeManage/noticeDetail.vue")
        },
        {
          //添加公告
          path: "/menuFrame/addNotice",
          name: "addNotice",
          meta: {
            isLogin: true,
            routeArray: [
              {
                path: "/menuFrame",
                name: "系统管理"
              },
              {
                path: "/menuFrame/noticeManageList",
                name: "公告管理"
              },
              {
                path: "/menuFrame/addNotice",
                name: "添加公告"
              }
            ]
          },
          component: () =>
            import( "@/pages/noticeManage/addNotice.vue")
        }
      ]
    }
  ]
});
