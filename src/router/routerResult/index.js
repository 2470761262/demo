
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
    path: "/buySellSystem/houseDetails",
    name: "houseDetails",
    component: () =>
      import(/* webpackChunkName: "houseDetails" */ "@/pages/buySellSystem/houseDetails/houseDetails.vue")
  },
  {
    //买卖系统房源详情
    path: "/buySellSystem/addHouse",
    name: "addHouse",
    component: () =>
      import(/* webpackChunkName: "addHouse" */ "@/pages/buySellSystem/addHouse/addHouse.vue")
  },

  {
    //审核补充楼盘
    path: "/buySellSystem/checkFloorList",
    name: "addHouse",
    component: () =>
      import(/* webpackChunkName: "checkFloorList" */ "@/pages/buySellSystem/addFloorList/checkFloorList.vue")
  },
  {
    //补充楼盘
    path: "/buySellSystem/CommunityReplenish",
    name: "addHouse",
    component: () =>
      import(/* webpackChunkName: "CommunityReplenish" */ "@/pages/buySellSystem/addFloorList/checkFloorList.vue")
  },
  {
    //思冲的页面
    path: "/buySellSystem/mateHouseList",
    name: "mateHouseList",
    component: () =>
      import(/* webpackChunkName: "mateHouseList" */ "@/pages/buySellSystem/mateHouseList/mateHouseList.vue")
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
        //不知道谁的页面 但是是列表的
        path: "/buySellSystem/concernCommunity",
        name: "concernCommunity",
        component: () =>
          import(/* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/concernCommunity/concernCommunity.vue")
      },
      {
        //柯名的页面
        path: "/buySellSystem/newAgentHouse",
        name: "newAgentHouse",
        component: () =>
          import(/* webpackChunkName: "newAgentHouse" */ "@/pages/buySellSystem/newAgentHouse/newAgentHouse.vue")
      },
      {
        //柯名的页面
        path: "/buySellSystem/myHouseList",
        name: "addFloorList",
        component: () =>
          import(/* webpackChunkName: "myHouseList" */ "@/pages/buySellSystem/myHouseList/myHouseList.vue")
      },
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
    //系统管理 系统参数配置  不知道谁的页面
    path: "/sys/addConfig",
    name: "addConfig",
    component: () =>
      import(/* webpackChunkName: "addConfig" */ "@/pages/systemAdministration/systemConfigList/addConfig.vue")
  },
  {
    //系统管理 系统参数配置  不知道谁的页面
    path: "/sys/addConfigObject",
    name: "addConfigObject",
    component: () =>
      import(/* webpackChunkName: "addConfigObject" */ "@/pages/systemAdministration/systemConfigList/addConfigObject.vue")
  },
  {
    //系统管理 系统参数配置  不知道谁的页面
    path: "/sys/configObjectList",
    name: "configObjectList",
    component: () =>
      import(/* webpackChunkName: "configObjectList" */ "@/pages/systemAdministration/systemConfigList/configObjectList.vue")
  },
  {
    //系统管理 密码重置
    path: "/sys/passwordReset",
    name: "passwordReset",
    component: () =>
      import(/* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/passwordReset/passwordReset.vue")
  }
]