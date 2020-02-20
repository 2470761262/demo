
export default [
  {
    //买卖系统房源列表
    path: "/buySellSystem/houseList",
    name: "houseList",
    component: () =>
      import(/* webpackChunkName: "houseList" */ "@/pages/buySellSystem/houseList/houseList.vue")
  },
  {
    //买卖系统录入房源
    path: "/buySellSystem/addHouse",
    name: "addHouse",
    component: () =>
      import(/* webpackChunkName: "addHouse" */ "@/pages/buySellSystem/addHouse/addHouse.vue")
  },
  {
    //买卖系统三级路由
    path: "/buySellSystem/otherIframe",
    name: "otherIframe",
    redirect: "/buySellSystem/addFloorList",
    component: () =>
      import(/* webpackChunkName: "otherIframe" */ "@/pages/buySellSystem/otherIframe/otherIframe.vue"),
    children: [
      {
        //楼盘补充
        path: "/buySellSystem/addFloorList",
        name: "addFloorList",
        component: () =>
          import(/* webpackChunkName: "addFloorList" */ "@/pages/buySellSystem/addFloorList/addFloorList.vue")
      },
      {
        //异常验真
        path: "/buySellSystem/errorValidateList",
        name: "errorValidateList",
        meta: {},
        component: () =>
          import(/* webpackChunkName: "errorValidateList" */ "@/pages/buySellSystem/errorValidateList/errorValidateList.vue")
      },
      {
        //房源作业方审核
        path: "/buySellSystem/houseTaskExamineList",
        name: "houseTaskExamineList",
        component: () =>
          import(/* webpackChunkName: "houseTaskExamineList" */ "@/pages/buySellSystem/houseTaskExamineList/houseTaskExamineList.vue")
      },
      {
        //验真房源审核
        path: "/buySellSystem/validateHouseExamineList",
        name: "validateHouseExamineList",
        component: () =>
          import(/* webpackChunkName: "validateHouseExamineList" */ "@/pages/buySellSystem/validateHouseExamineList/validateHouseExamineList.vue")
      },
      {
        //验真房源列表
        path: "/buySellSystem/validateHouseList",
        name: "validateHouseList",
        component: () =>
          import(/* webpackChunkName: "validateHouseList" */ "@/pages/buySellSystem/validateHouseList/validateHouseList.vue")
      }
    ]
  },
  {
    //系统管理 公告管理
    path: "/sys/noticeManageList",
    name: "noticeManageList",
    component: () =>
      import(/* webpackChunkName: "noticeManageList" */ "@/pages/systemAdministration/noticeManage/noticeManageList.vue")
  },
  {
    //系统管理 添加公告
    path: "/sys/addNotice",
    name: "addNotice",
    component: () =>
      import(/* webpackChunkName: "addNotice" */ "@/pages/systemAdministration/noticeManage/addNotice.vue")
  },
  {
    //系统管理 公告详情
    path: "/sys/noticeDetail",
    name: "noticeDetail",
    component: () =>
      import(/* webpackChunkName: "noticeDetail" */ "@/pages/systemAdministration/noticeManage/noticeDetail.vue")
  },
  {
    //系统管理 系统参数配置
    path: "/sys/systemConfigList",
    name: "systemConfigList",
    component: () =>
      import(/* webpackChunkName: "systemConfigList" */ "@/pages/systemAdministration/systemConfigList/systemConfigList.vue")
  },
  {
    //系统管理 密码重置
    path: "/sys/passwordReset",
    name: "passwordReset",
    component: () =>
      import(/* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/passwordReset/passwordReset.vue")
  }
]