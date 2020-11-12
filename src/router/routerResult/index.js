export default [
  {
    //买卖系统房源列表
    path: "/info",
    meta: {
      keepAlive: true,
      title: "新首页",
      // isScrollTop: true, //是否需要记录坐标
      isMapNav: true, //不需要导航
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(/* webpackChunkName: "info" */ "@/pages/info/home/index.vue")
  },
  {
    //买卖系统房源列表
    path: "/clockIn",
    meta: {
      keepAlive: true,
      title: "打卡",
      // isScrollTop: true, //是否需要记录坐标
      isMapNav: true, //不需要导航
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(/* webpackChunkName: "clockIn" */ "@/pages/info/clockIn/index.vue")
  },
  {
    //买卖系统房源列表
    path: "/clockList",
    meta: {
      keepAlive: true,
      title: "考勤",
      // isScrollTop: true, //是否需要记录坐标
      isMapNav: true, //不需要导航
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(
        /* webpackChunkName: "clockList" */ "@/pages/info/clockList/index.vue"
      ),

    //我的房源
    redirect: "/clockList/myInfo",
    children: [
      {
        //买卖系统开发线索
        path: "/clockList/myInfo",
        meta: {
          keepAlive: true,
          title: "我的日志",
          // isScrollTop: true, //是否需要记录坐标
          isMapNav: true, //不需要导航
          isPad: true //不需要el-main padding
        },
        component: () =>
          import(
            /* webpackChunkName: "myInfo" */ "@/pages/info/clockList/myInfo/index.vue"
          )
      }
    ]
  },
  {
    //买卖系统房源列表
    path: "/buySellSystem/houseList",
    meta: {
      keepAlive: true,
      title: "首页",
      // isScrollTop: true, //是否需要记录坐标
      isMapNav: true, //不需要导航
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(
        /* webpackChunkName: "houseList" */ "@/pages/buySellSystem/houseList/houseList.vue"
      )
  },
  {
    //买卖系统开发线索
    path: "/buySellSystem/threadDevelop",
    meta: {
      keepAlive: true,
      title: "开发线索",
      // isScrollTop: true, //是否需要记录坐标
      isMapNav: true, //不需要导航
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(
        /* webpackChunkName: "threadDevelop" */ "@/pages/buySellSystem/threadDevelop/threadDevelop.vue"
      )
  },
  {
    //买卖系统录入房源
    path:
      "/buySellSystem/houseDetails/:houseId/:browse?/:key?/:dept?/:detailType?",
    name: "houseDetails",
    meta: {
      title: "房源详情",
      // isMapNav: true, //不需要导航
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(
        /* webpackChunkName: "houseDetails" */ "@/pages/buySellSystem/houseDetails/houseDetails.vue"
      )
  },
  {
    //买卖系统历史房源
    path: "/buySellSystem/historyDetails/:houseId/:tradeType?/:browse?/:key?",
    name: "historyDetails",
    meta: {
      title: "历史详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "historyDetails" */ "@/pages/buySellSystem/houseDetails/historyDetails.vue"
      )
  },
  {
    //买卖系统验证房源
    path: "/buySellSystem/validateHouseDetails/:houseId",
    name: "validateHouseDetails",
    meta: {
      title: "验真详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "validateHouseDetails" */ "@/pages/buySellSystem/houseDetails/validateHouseDetails.vue"
      )
  },
  {
    //买卖系统楼盘详情
    path: "/buySellSystem/buildingHouseDetail/:houseId/:browse?/:key?",
    name: "buildingHouseDetail",
    meta: {
      title: "楼盘详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "buildingHouseDetail" */ "@/pages/buySellSystem/houseDetails/buildingHouseDetail.vue"
      )
  },
  {
    //买卖系统交易房源详情
    path: "/buySellSystem/tradeHouseDetail/:houseId/:houseType?/:browse?/:key?",
    name: "tradeHouseDetail",
    meta: {
      title: "房源历史交易详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "tradeHouseDetail" */ "@/pages/buySellSystem/houseDetails/tradeHouseDetail.vue"
      )
  },
  {
    //潜在出售房源详情
    path:
      "/buySellSystem/potentialHouseDetail/:houseId/:houseType?/:browse?/:key?",
    name: "potentialHouseDetail",
    meta: {
      title: "潜在出售房源详情",
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "potentialHouseDetail" */ "@/pages/buySellSystem/houseDetails/potentialHouseDetail.vue"
      )
  },
  {
    path: "/buySellSystem/addHouse",
    name: "addHouse",
    meta: {
      title: "录入房源"
    },
    component: () =>
      import(
        /* webpackChunkName: "addHouse" */ "@/pages/buySellSystem/addHouse/addHouse.vue"
      )
  },

  {
    //审核补充楼盘
    path: "/buySellSystem/checkFloorList",
    meta: {
      title: "补充楼盘"
    },
    component: () =>
      import(
        /* webpackChunkName: "checkFloorList" */ "@/pages/buySellSystem/addFloorList/checkFloorList.vue"
      )
  },
  {
    //独家房源列表
    path: "/buySellSystem/soleHouse",
    meta: {
      title: "独家房源"
    },
    component: () =>
      import(
        /* webpackChunkName: "soleHouse" */ "@/pages/buySellSystem/soleHouse/soleHouse.vue"
      )
  },
  {
    //总监推荐房源
    path: "/buySellSystem/chiefRecommendHouse",
    meta: {
      title: "总监推荐"
    },
    component: () =>
      import(
        /* webpackChunkName: "chiefRecommendHouse" */ "@/pages/buySellSystem/houseRecommend/chiefRecommendHouse.vue"
      )
  },
  {
    path: "/buySellSystem/validateHome",
    name: "validateHome",
    meta: {
      title: "验真首页",
      isMapNav: true, //不需要导航
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(
        /* webpackChunkName: "validateHome" */ "@/pages/buySellSystem/newvalidate/validateHome.vue"
      )
  },
  {
    path: "/buySellSystem/messageValidate",
    name: "messageValidate",
    meta: {
      title: "信息员验真",
      isMapNav: true, //不需要导航
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(
        /* webpackChunkName: "messageValidate" */ "@/pages/buySellSystem/newvalidate/messageValidate.vue"
      )
  },
  {
    path: "/buySellSystem/pMsgValidate",
    name: "pMsgValidate",
    meta: {
      title: "短信验真",
      isMapNav: true, //不需要导航
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(
        /* webpackChunkName: "pMsgValidate" */ "@/pages/buySellSystem/newvalidate/pMsgValidate.vue"
      )
  },
  {
    path: "/buySellSystem/wxValidate",
    name: "wxValidate",
    meta: {
      title: "微信验真",
      isMapNav: true, //不需要导航
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(
        /* webpackChunkName: "wxValidate" */ "@/pages/buySellSystem/newvalidate/wxValidate.vue"
      )
  },
  {
    //我的房源
    path: "/buySellSystem/myHouse",
    redirect: "/myHouse/myRole",
    meta: {
      title: "我的房源",
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(
        /* webpackChunkName: "myHouse" */ "@/pages/buySellSystem/myHouse/myHouse.vue"
      ),
    children: [
      {
        //我的角色
        path: "/myHouse/myRole",
        name: "myRole",
        meta: {
          title: "我的角色",
          keepAlive: true,
          isPad: true //不需要el-main padding
        },
        component: () =>
          import(
            /* webpackChunkName: "myRole" */ "@/pages/buySellSystem/myHouse/myRole/myRole.vue"
          )
      },
      {
        //我的验真
        path: "/myHouse/myValidate",
        name: "myValidate",
        meta: {
          title: "我的验真",
          keepAlive: true,
          isPad: true //不需要el-main padding
        },
        component: () =>
          import(
            /* webpackChunkName: "myValidate" */ "@/pages/buySellSystem/myHouse/myValidate/myValidate.vue"
          )
      },
      {
        //我的审核
        path: "/myHouse/myExamine",
        name: "myExamine",
        meta: {
          title: "我的审核",
          keepAlive: true,
          isPad: true //不需要el-main padding
        },
        component: () =>
          import(
            /* webpackChunkName: "myExamine" */ "@/pages/buySellSystem/myHouse/myExamine/myExamine.vue"
          )
      },
      {
        //我的对赌
        path: "/myHouse/myBet",
        name: "myBet",
        meta: {
          title: "我的对赌",
          keepAlive: true,
          isPad: true //不需要el-main padding
        },
        component: () =>
          import(
            /* webpackChunkName: "myBet" */ "@/pages/buySellSystem/myHouse/myBet/myBet.vue"
          )
      },
      {
        // VR拍摄
        path: "/myHouse/vrShooting",
        name: "vrShooting",
        meta: {
          title: "VR拍摄",
          keepAlive: true,
          isPad: true
        },
        component: () =>
          import(
            /* webpackChunkName: "vrShooting" */ "@/pages/buySellSystem/myHouse/vrShooting/vrShooting.vue"
          )
      }
    ]
  },
  {
    //资源库-无号码-录入号码
    path: "/buySellSystem/updatePhone",
    meta: {
      title: "录入号码"
    },
    component: () =>
      import(
        /* webpackChunkName: "updatePhone" */ "@/pages/buySellSystem/houseResource/updatePhone.vue"
      )
  },
  {
    //店长推荐房源
    path: "/buySellSystem/shopownerRecommendHouse",
    meta: {
      title: "店长推荐"
    },
    component: () =>
      import(
        /* webpackChunkName: "shopownerRecommendHouse" */ "@/pages/buySellSystem/houseRecommend/shopownerRecommendHouse.vue"
      )
  },
  {
    //补充楼盘
    path: "/buySellSystem/CommunityReplenish",
    meta: {
      title: "补充楼盘"
    },
    component: () =>
      import(
        /* webpackChunkName: "CommunityReplenish" */ "@/pages/buySellSystem/addFloorList/CommunityReplenish.vue"
      )
  },
  {
    //七天内被带看
    path: "/buySellSystem/sevenDaysFollowHouse",
    meta: {
      title: "七天内被带看"
    },
    component: () =>
      import(
        /* webpackChunkName: "myAgent" */ "@/pages/buySellSystem/followHouse/sevenDaysFollowHouse.vue"
      )
  },
  {
    //新增房源
    path: "/buySellSystem/newAgentHouse",
    meta: {
      title: "新增房源"
    },
    component: () =>
      import(
        /* webpackChunkName: "newAgentHouse" */ "@/pages/buySellSystem/newAgentHouse/newAgentHouse.vue"
      )
  },
  {
    //楼盘补充
    path: "/buySellSystem/addFloorList",
    meta: {
      title: "楼盘补充"
    },
    component: () =>
      import(
        /* webpackChunkName: "addFloorList" */ "@/pages/buySellSystem/addFloorList/addFloorList.vue"
      )
  },
  {
    //数据看板配置列表
    path: "/report/reportTableList",
    meta: {
      title: "数据看板表管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "reportConfList" */ "@/pages/report/table/reportTableList.vue"
      )
  },
  {
    path: "/report/addTable",
    name: "addTable",
    meta: {
      title: "添加表"
    },
    component: () =>
      import(
        /* webpackChunkName: "addReport" */ "@/pages/report/table/addTable.vue"
      )
  },
  {
    //数据看板配置列表
    path: "/report/reportConfList",
    meta: {
      title: "数据看板配置列表"
    },
    component: () =>
      import(
        /* webpackChunkName: "reportConfList" */ "@/pages/report/reportConfList.vue"
      )
  },
  {
    //数据看板
    path: "/report/reportDataList",
    meta: {
      title: "看板数据"
    },
    component: () =>
      import(
        /* webpackChunkName: "reportDataList" */ "@/pages/report/reportDataList.vue"
      )
  },
  {
    path: "/buySellSystem/resourceManage",
    redirect: "/buySellSystem/resourceManageList",
    component: () =>
      import(
        /* webpackChunkName: "resourceManage" */ "@/pages/buySellSystem/resourceManage/index.vue"
      ),
    children: [
      {
        path: "/buySellSystem/resourceManageList",
        meta: {
          title: "资源库管理",
          isMapNav: true, //不需要导航
          isPad: true, //不需要el-main padding
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "resourceManageList" */ "@/pages/buySellSystem/resourceManage/list.vue"
          )
      },
      {
        path: "/buySellSystem/resourceManageDetail/:id",
        name: "resourceManageDetail",
        meta: {
          title: "资源库管理",
          isMapNav: true, //不需要导航
          isPad: true //不需要el-main padding
        },
        component: () =>
          import(
            /* webpackChunkName: "resourceManageDetail" */ "@/pages/buySellSystem/resourceManage/detail.vue"
          )
      }
    ]
  },
  {
    // 房源系统-管理入口
    path: "/buySellSystem/managementEntrance",
    redirect: "/managementEntrance/business",
    meta: {
      title: "管理入口",
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(
        /* webpackChunkName: "managementEntrance" */ "@/pages/buySellSystem/managementEntrance/index.vue"
      ),
    children: [
      {
        path: "/managementEntrance/business",
        meta: {
          title: "业务管理",
          isMapNav: true, //不需要导航
          isPad: true //不需要el-main padding
        },
        component: () =>
          import(
            /* webpackChunkName: "managementEntranceOfBusiness" */ "@/pages/buySellSystem/managementEntrance/business.vue"
          )
      },
      {
        path: "/managementEntrance/houseDeploy",
        meta: {
          title: "房源调配",
          isMapNav: true, //不需要导航
          isPad: true //不需要el-main padding
        },
        component: () =>
          import(
            /* webpackChunkName: "houseDeploy" */ "@/pages/buySellSystem/managementEntrance/houseDeploy/houseDeploy.vue"
          )
      },
      {
        path: "/managementEntrance/3day",
        meta: {
          title: "3天新增",
          isMapNav: true, //不需要导航
          isPad: true //不需要el-main padding
        },
        component: () =>
          import(
            /* webpackChunkName: "house3Day" */ "@/pages/buySellSystem/managementEntrance/3day/house3Day.vue"
          )
      },
      {
        path: "/managementEntrance/7day",
        meta: {
          title: "7天被看房源",
          isMapNav: true, //不需要导航
          isPad: true //不需要el-main padding
        },
        component: () =>
          import(
            /* webpackChunkName: "house7Day" */ "@/pages/buySellSystem/managementEntrance/7day/house7Day.vue"
          )
      },
      {
        path: "/managementEntrance/houseLockingList",
        meta: {
          title: "锁定列表",
          isMapNav: true, //不需要导航
          isPad: true //不需要el-main padding
        },
        component: () =>
          import(
            /* webpackChunkName: "houseLockingList" */ "@/pages/buySellSystem/managementEntrance/buySellHouse/lockingList.vue"
          )
      },
      {
        path: "/managementEntrance/houseExamineHouse",
        meta: {
          title: "审核列表",
          isMapNav: true,
          isPad: true
        },
        component: () =>
          import(
            /* webpackChunkName: "houseExamineHouse" */ "@/pages/buySellSystem/managementEntrance/buySellHouse/examineList.vue"
          )
      },
      {
        //抽检列表
        path: "/managementEntrance/spotCheckList",
        meta: {
          title: "抽检列表",
          isMapNav: true //不需要导航
        },
        component: () =>
          import(
            /* webpackChunkName: "spotCheckList" */ "@/pages/buySellSystem/managementEntrance/buySellHouse/spotCheckList.vue"
          )
      },
      {
        path: "/managementEntrance/spotCheckRecord",
        meta: {
          title: "抽检记录",
          isMapNav: true,
          isPad: true
        },
        component: () =>
          import(
            /* webpackChunkName: "spotCheckRecord" */ "@/pages/buySellSystem/managementEntrance/buySellHouse/spotCheckRecord.vue"
          )
      },
      {
        path: "/managementEntrance/customers",
        meta: {
          title: "客源",
          isMapNav: true,
          isPad: true
        },
        component: () =>
          import(
            /* webpackChunkName: "houseExamineHouse" */ "@/pages/buySellSystem/managementEntrance/customers/customersList.vue"
          )
      },
      {
        path: "/managementEntrance/rentHouse",
        meta: {
          title: "租赁房源",
          isMapNav: true,
          isPad: true
        },
        component: () =>
          import(
            /* webpackChunkName: "houseExamineHouse" */ "@/pages/buySellSystem/managementEntrance/rentHouse/rentHouse.vue"
          )
      },
      {
        path: "/managementEntrance/personnel",
        meta: {
          title: "人员管理",
          isMapNav: true,
          isPad: true
        },
        component: () =>
          import(
            /* webpackChunkName: "houseExamineHouse" */ "@/pages/buySellSystem/managementEntrance/personnel/personnel.vue"
          )
      }
    ]
  },
  {
    // 信息员验真列表
    path: "/buySellSystem/employeeValidateList",
    meta: {
      title: "信息员验真列表",
      isMapNav: true,
      isPad: true
    },
    component: () =>
      import(
        /* webpackChunkName: "employeeValidateList" */ "@/pages/buySellSystem/employeeValidateList/index.vue"
      )
  },
  {
    path: "/report/addReport",
    name: "addReport",
    meta: {
      title: "添加看板"
    },
    component: () =>
      import(/* webpackChunkName: "addReport" */ "@/pages/report/addReport.vue")
  },
  {
    //买卖系统三级路由
    path: "/buySellSystem/otherIframe",
    name: "otherIframe",
    redirect: "/buySellSystem/concernCommunity",
    meta: {
      title: "买卖系统"
    },
    component: () =>
      import(
        /* webpackChunkName: "otherIframe" */ "@/pages/buySellSystem/otherIframe/otherIframe.vue"
      ),
    children: [
      {
        //我的核心盘
        path: "/buySellSystem/concernCommunity",
        name: "concernCommunity",
        meta: {
          title: "我的核心盘",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/concernCommunity/concernCommunity.vue"
          )
      },
      {
        //对赌房源
        path: "/buySellSystem/houseBet",
        meta: {
          title: "对赌房源",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "shopownerRecommendHouse" */ "@/pages/buySellSystem/houseBet/houseBet.vue"
          )
      },
      {
        //我的跟单
        path: "/buySellSystem/myAgent",
        meta: {
          title: "我的跟单",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "myAgent" */ "@/pages/buySellSystem/myHouseList/myAgent.vue"
          )
      },
      {
        //我的相关
        path: "/buySellSystem/myRelatedHouse",
        meta: {
          title: "我的相关",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/myRelatedHouse.vue"
          )
      },
      {
        //我的数据
        path: "/buySellSystem/myHouseData",
        meta: {
          title: "我的数据",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/myHouseData.vue"
          )
      },
      {
        //我的关注
        path: "/buySellSystem/myConcern",
        meta: {
          title: "我的关注",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/myConcern.vue"
          )
      },
      {
        //验真列表
        path: "/buySellSystem/draftHouse",
        meta: {
          title: "验真列表",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/draftHouse.vue"
          )
      },
      {
        //审核列表
        path: "/buySellSystem/checkHouseList",
        meta: {
          title: "审核列表",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/checkHouseList.vue"
          )
      },
      {
        //资源库-暂不售房源列表
        path: "/buySellSystem/notSale",
        meta: {
          title: "暂不售房源",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "notSale" */ "@/pages/buySellSystem/houseResource/notSale.vue"
          )
      },
      {
        //资源库-在售无跟单房源列表
        path: "/buySellSystem/saleNotTracking",
        meta: {
          title: "在售无跟单",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "saleNotTracking" */ "@/pages/buySellSystem/houseResource/saleNotTracking.vue"
          )
      },
      {
        //资源库-无号码
        path: "/buySellSystem/notPhone",
        meta: {
          title: "无号码",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "notPhone" */ "@/pages/buySellSystem/houseResource/notPhone.vue"
          )
      },
      {
        //资源库-潜在出售列表
        path: "/buySellSystem/potentialHouse",
        meta: {
          title: "潜在出售",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "potentialHouse" */ "@/pages/buySellSystem/houseResource/potentialHouse.vue"
          )
      },
      {
        //资源库-店公盘
        path: "/buySellSystem/shopDisk",
        meta: {
          title: "店公盘",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "shopDisk" */ "@/pages/buySellSystem/houseResource/shopDisk.vue"
          )
      },
      {
        //全部在售
        path: "/buySellSystem/saleAll",
        meta: {
          title: "全部在售",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "saleAll" */ "@/pages/buySellSystem/saleAll/saleAll.vue"
          )
      },
      {
        //外网房源
        path: "/buySellSystem/releaseOutsideHouseList",
        meta: {
          title: "外网房源"
        },
        component: () =>
          import(
            /* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/releaseOutsideHouseList.vue"
          )
      },

      {
        //正在开发中提示页面
        path: "/buySellSystem/loadDevelopment",
        meta: {
          title: "good boy"
        },
        component: () =>
          import(
            /* webpackChunkName: "loadDevelopment" */ "@/pages/buySellSystem/loadDevelopment/loadDevelopment.vue"
          )
      },
      {
        //我的房源
        path: "/buySellSystem/myHouseList",
        meta: {
          title: "我的房源"
        },
        component: () =>
          import(
            /* webpackChunkName: "myHouseList" */ "@/pages/buySellSystem/myHouseList/myHouseList.vue"
          )
      },
      {
        //异常验真
        path: "/buySellSystem/errorValidateList",
        meta: {
          title: "异常验真"
        },
        component: () =>
          import(
            /* webpackChunkName: "errorValidateList" */ "@/pages/buySellSystem/errorValidateList/errorValidateList.vue"
          )
      },
      {
        //房源作业方审核
        path: "/buySellSystem/houseTaskExamineList",
        meta: {
          title: "房源作业方审核"
        },
        component: () =>
          import(
            /* webpackChunkName: "houseTaskExamineList" */ "@/pages/buySellSystem/houseTaskExamineList/houseTaskExamineList.vue"
          )
      },
      {
        //验真房源审核
        path: "/buySellSystem/validateHouseExamineList",
        meta: {
          title: "验真房源审核"
        },
        component: () =>
          import(
            /* webpackChunkName: "validateHouseExamineList" */ "@/pages/buySellSystem/validateHouseExamineList/validateHouseExamineList.vue"
          )
      },
      {
        //验真房源列表
        path: "/buySellSystem/validateHouseList",
        meta: {
          title: "验真房源列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "validateHouseList" */ "@/pages/buySellSystem/validateHouseList/validateHouseList.vue"
          )
      },
      // {
      //   //我司成交
      //   path: "/buySellSystem/ourComDeal",
      //   meta: {
      //     title: "我司成交",
      //     keepAlive: true
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "validateHouseList" */ "@/pages/buySellSystem/dealHouse/ourComDeal.vue"
      //     )
      // },
      {
        //他司成交
        path: "/buySellSystem/otherComDeal",
        meta: {
          title: "他司成交",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "validateHouseList" */ "@/pages/buySellSystem/dealHouse/otherComDeal.vue"
          )
      },
      {
        //业主自售
        path: "/buySellSystem/selfDeal",
        meta: {
          title: "业主自售",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "validateHouseList" */ "@/pages/buySellSystem/dealHouse/selfDeal.vue"
          )
      },
      {
        //浏览记录
        path: "/buySellSystem/browseLog",
        meta: {
          title: "浏览记录",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "validateHouseList" */ "@/pages/buySellSystem/myHouseList/browseLog.vue"
          )
      },
      {
        //锁定列表-已锁定
        path: "/buySellSystem/lockingList",
        meta: {
          title: "锁定列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "lockingList" */ "@/pages/buySellSystem/lockingList/lockingList.vue"
          )
      }
    ]
  },
  {
    //系统管理 公告管理
    path: "/sys/noticeManageList",
    meta: {
      title: "公告管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "noticeManageList" */ "@/pages/systemAdministration/noticeManage/noticeManageList.vue"
      )
  },
  {
    //系统管理 在线用户统计
    path: "/sys/onLineUserList",
    meta: {
      title: "在线用户统计"
    },
    component: () =>
      import("@/pages/systemAdministration/onLineUser/onLineUserList.vue")
  },
  {
    //补充楼盘
    path: "/buySellSystem/CommunityReplenish",
    meta: {
      title: "补充楼盘"
    },
    component: () =>
      import(
        /* webpackChunkName: "CommunityReplenish" */ "@/pages/buySellSystem/addFloorList/checkFloorList.vue"
      )
  },
  {
    //思冲的页面
    path: "/buySellSystem/mateHouseList",
    component: () =>
      import(
        /* webpackChunkName: "mateHouseList" */ "@/pages/buySellSystem/mateHouseList/mateHouseList.vue"
      )
  },
  {
    //系统管理 添加公告
    path: "/sys/addNotice",
    meta: {
      title: "添加公告"
    },
    component: () =>
      import(
        /* webpackChunkName: "addNotice" */ "@/pages/systemAdministration/noticeManage/addNotice.vue"
      )
  },
  {
    //系统管理 修改公告
    path: "/sys/editNotice",
    name: "manageEditNotice",
    meta: {
      title: "修改公告"
    },
    component: () =>
      import(
        /* webpackChunkName: "addNotice" */ "@/pages/systemAdministration/noticeManage/editNotice.vue"
      )
  },
  {
    //系统管理 公告详情
    path: "/sys/noticeDetail",
    meta: {
      title: "公告详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "noticeDetail" */ "@/pages/systemAdministration/noticeManage/noticeDetail.vue"
      )
  },
  {
    //系统管理 系统参数配置列表
    path: "/sys/systemConfigList",
    meta: {
      title: "系统参数配置列表"
    },
    component: () =>
      import(
        /* webpackChunkName: "systemConfigList" */ "@/pages/systemAdministration/systemConfigList/systemConfigList.vue"
      )
  },
  {
    //系统管理 添加系统参数配置
    path: "/sys/addConfig",
    meta: {
      title: "添加系统参数配置"
    },
    component: () =>
      import(
        /* webpackChunkName: "addConfig" */ "@/pages/systemAdministration/systemConfigList/addConfig.vue"
      )
  },
  {
    //系统管理 添加系统参数配置对象
    path: "/sys/addConfigObject",
    name: "addConfigObject",
    meta: {
      title: "添加系统参数配置对象"
    },
    component: () =>
      import(
        /* webpackChunkName: "addConfigObject" */ "@/pages/systemAdministration/systemConfigList/addConfigObject.vue"
      )
  },
  {
    //系统管理 系统参数配置对象列表
    path: "/sys/configObjectList",
    meta: {
      title: "系统参数配置对象列表"
    },
    component: () =>
      import(
        /* webpackChunkName: "configObjectList" */ "@/pages/systemAdministration/systemConfigList/configObjectList.vue"
      )
  },
  {
    //系统管理 密码重置
    path: "/sys/passwordReset",
    meta: {
      title: "密码重置"
    },
    component: () =>
      import(
        /* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/passwordReset/passwordReset.vue"
      )
  },
  {
    //系统管理 PC在线管理
    path: "/sys/pcOnline/list",
    meta: {
      title: "PC在线管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "pcOnlineList" */ "@/pages/systemAdministration/pcOnline/list.vue"
      )
  },
  {
    //系统管理 公司PC管理
    path: "/sys/pcManagement/list",
    meta: {
      title: "公司PC管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "pcOnlineList" */ "@/pages/systemAdministration/pcManagement/list.vue"
      )
  },
  {
    //系统管理 文档管理
    path: "/sys/document/list",
    meta: {
      title: "文档管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "documentList" */ "@/pages/systemAdministration/document/list.vue"
      )
  },
  {
    //系统管理 文档管理 编辑
    path: "/sys/document/edit",
    meta: {
      title: "文档管理编辑"
    },
    component: () =>
      import(
        /* webpackChunkName: "documentEdit" */ "@/pages/systemAdministration/document/edit.vue"
      )
  },
  {
    //系统管理 规则管理
    path: "/sys/docRules/list",
    meta: {
      title: "规则管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "docRulesList" */ "@/pages/systemAdministration/docRules/list.vue"
      )
  },
  {
    //系统管理 规则管理 编辑
    path: "/sys/docRules/edit",
    meta: {
      title: "规则管理编辑"
    },
    component: () =>
      import(
        /* webpackChunkName: "docRulesList" */ "@/pages/systemAdministration/docRules/edit.vue"
      )
  },
  {
    //系统管理 组织结构
    path: "/sys/hrTree/hrTree",
    meta: {
      title: "组织结构"
    },
    component: () =>
      import(
        /* webpackChunkName: "hrTree" */ "@/pages/systemAdministration/hrTree/hrTree.vue"
      )
  },
  {
    //系统管理 获取授权器密码
    path: "/sys/logonRegPwd/view",
    meta: {
      title: "获取授权器密码"
    },
    component: () =>
      import(
        /* webpackChunkName: "logonRegPwd" */ "@/pages/systemAdministration/logonRegPwd/view.vue"
      )
  },
  {
    //系统管理 岗位管理
    path: "/sys/roleManagementList",
    meta: {
      title: "岗位管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "roleManagementList" */ "@/pages/systemAdministration/roleManagement/roleManagementList.vue"
      )
  },
  {
    //系统管理 岗位管理-添加
    path: "/sys/addRoleManagementList",
    meta: {
      title: "岗位管理添加"
    },
    component: () =>
      import(
        /* webpackChunkName: "addRoleManagementList" */ "@/pages/systemAdministration/roleManagement/addRoleManagementList.vue"
      )
  },
  {
    //系统管理 岗位管理-修改
    path: "/sys/editRoleDetail",
    meta: {
      title: "岗位管理修改"
    },
    component: () =>
      import(
        /* webpackChunkName: "editRoleDetail" */ "@/pages/systemAdministration/roleManagement/editRoleDetail.vue"
      )
  },
  {
    //系统管理 公司管理
    path: "/sys/companyList",
    meta: {
      title: "公司管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "companyList" */ "@/pages/systemAdministration/organization/companyList.vue"
      )
  },
  {
    //系统管理 公司管理-添加
    path: "/sys/addCompanyManage",
    meta: {
      title: "公司管理添加"
    },
    component: () =>
      import(
        /* webpackChunkName: "addCompanyManage" */ "@/pages/systemAdministration/organization/addCompanyManage.vue"
      )
  },
  {
    //系统管理 公司管理-修改
    path: "/sys/editCompanyDetail",
    meta: {
      title: "公司管理修改"
    },
    component: () =>
      import(
        /* webpackChunkName: "editCompanyDetail" */ "@/pages/systemAdministration/organization/editCompanyDetail.vue"
      )
  },
  {
    //系统管理 公司管理-设置网站
    path: "/sys/setCompanyWebsite",
    meta: {
      title: "设置网站"
    },
    component: () =>
      import(
        /* webpackChunkName: "setCompanyWebsite" */ "@/pages/systemAdministration/organization/setCompanyWebsite.vue"
      )
  },
  {
    //系统管理 部门管理
    path: "/sys/deptManageList",
    meta: {
      title: "部门管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "deptManageList" */ "@/pages/systemAdministration/organization/deptManageList.vue"
      )
  },
  {
    //系统管理 部门管理-添加
    path: "/sys/addDeptManage",
    meta: {
      title: "部门管理添加"
    },
    component: () =>
      import(
        /* webpackChunkName: "addDeptManage" */ "@/pages/systemAdministration/organization/addDeptManage.vue"
      )
  },
  {
    //系统管理 部门管理-修改
    path: "/sys/editDeptDetail",
    meta: {
      title: "部门管理修改"
    },
    component: () =>
      import(
        /* webpackChunkName: "editDeptDetail" */ "@/pages/systemAdministration/organization/editDeptDetail.vue"
      )
  },
  {
    //系统管理 用户管理
    path: "/sys/employeeList",
    meta: {
      title: "用户管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "deptManageList" */ "@/pages/systemAdministration/employee/employeeList.vue"
      )
  },
  {
    //系统管理 用户管理-详情
    path: "/sys/employeedetails",
    meta: {
      title: "用户管理详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "employeedetails" */ "@/pages/systemAdministration/employee/employeedetails.vue"
      )
  },
  {
    //系统管理 用户管理-添加
    path: "/sys/addemployee",
    meta: {
      title: "用户管理添加"
    },
    component: () =>
      import(
        /* webpackChunkName: "addDeptManage" */ "@/pages/systemAdministration/employee/addemployee.vue"
      )
  },
  {
    //系统管理 用户管理-修改
    path: "/sys/editemployee",
    meta: {
      title: "用户管理修改"
    },
    component: () =>
      import(
        /* webpackChunkName: "editDeptDetail" */ "@/pages/systemAdministration/employee/editemployee.vue"
      )
  },
  {
    //系统管理 游客管理
    path: "/sys/visitorList",
    meta: {
      title: "游客管理"
    },
    component: () =>
      import("@/pages/systemAdministration/visitor/visitorList.vue")
  },
  {
    //系统管理 角色管理
    path: "/sys/ruleManager",
    meta: {
      title: "角色管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/ruleManager/rule.vue"
      )
  },
  {
    //系统管理
    path: "/sys/notFoundPage",
    meta: {
      title: "系统管理"
    },
    component: () =>
      import("@/pages/systemAdministration/common/notFoundPage.vue")
  },
  {
    //系统管理 角色管理
    path: "/sys/positionManager",
    meta: {
      title: "角色管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/positionManager/position.vue"
      )
  },
  {
    //系统管理 权限设置
    path: "/sys/setPosition",
    meta: {
      title: "权限设置"
    },
    component: () =>
      import(
        /* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/positionManager/setPosition.vue"
      )
  },
  {
    //系统管理 店面管理
    path: "/sys/stroeList",
    meta: {
      title: "店面管理"
    },
    component: () => import("@/pages/systemAdministration/stroe/stroeList.vue")
  },
  {
    //系统管理 店面管理-添加
    path: "/sys/addStroe",
    meta: {
      title: "店面管理添加"
    },
    component: () => import("@/pages/systemAdministration/stroe/addStroe.vue")
  },
  {
    //系统管理 店面管理-修改
    path: "/sys/editStroe",
    meta: {
      title: "店面管理"
    },
    component: () => import("@/pages/systemAdministration/stroe/editStroe.vue")
  },
  {
    //系统管理 店面管理-修改
    path: "/sys/detailsStroe",
    meta: {
      title: "店面管理修改"
    },
    component: () =>
      import(
        /* webpackChunkName: "detailsStroe" */ "@/pages/systemAdministration/stroe/detailsStroe.vue"
      )
  },
  {
    //系统管理 权限设置 用户列表
    path: "/sys/authority/employeeList",
    meta: {
      title: "用户列表"
    },
    component: () =>
      import(
        /* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/authority/employeeList.vue"
      )
  },
  {
    //系统管理 权限设置
    path: "/sys/authority/setAuthority",
    meta: {
      title: "权限设置"
    },
    component: () =>
      import(
        /* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/authority/setAuthority.vue"
      )
  },
  {
    //系统管理 反馈列表
    path: "/sys/feedback",
    meta: {
      title: "反馈列表"
    },
    component: () =>
      import(
        /* webpackChunkName: "feedbackList" */ "@/pages/systemAdministration/feedback/feedbackList.vue"
      )
  },
  {
    //系统管理 人员异动列表
    path: "/sys/personLogList",
    meta: {
      title: "人员异动列表"
    },
    component: () =>
      import(
        /* webpackChunkName: "personLogList" */ "@/pages/systemAdministration/personLog/personLogList.vue"
      )
  },
  {
    //系统管理 人员异动列表-详情
    path: "/sys/editPersonLogDetail",
    meta: {
      title: "人员异动列表详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "editPersonLogDetail" */ "@/pages/systemAdministration/personLog/editPersonLogDetail.vue"
      )
  },
  {
    //系统管理 客户列表
    path: "/sys/baseCustomersList",
    meta: {
      title: "客户列表"
    },
    component: () =>
      import(
        /* webpackChunkName: "baseCustomersList" */ "@/pages/systemAdministration/employee/baseCustomersList.vue"
      )
  },
  {
    //系统管理 客户列表
    path: "/sys/editBaseCustomersDetail",
    meta: {
      title: "客户列表详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "editBaseCustomersDetail" */ "@/pages/systemAdministration/employee/editBaseCustomersDetail.vue"
      )
  },
  {
    //系统管理 公司权限设置
    path: "/sys/authorityConfiguration",
    meta: {
      title: "公司权限设置"
    },
    component: () =>
      import(
        /* webpackChunkName: "authorityConfiguration" */ "@/pages/systemAdministration/authorityConfiguration/configList.vue"
      )
  },
  {
    //系统管理 公司权限配置
    path: "/sys/authorityConfiguration/setAuthority",
    meta: {
      title: "公司权限配置"
    },
    component: () =>
      import(
        /* webpackChunkName: "authorityConfigurationSetAuthority" */ "@/pages/systemAdministration/authorityConfiguration/setAuthority.vue"
      )
  },
  {
    //客源系统 新整客户
    path: "/customers/addCustomers",
    meta: {
      title: "新增客源",
      isMapNav: true //不需要导航
    },
    component: () =>
      import(
        /* webpackChunkName: "addCustomers" */ "@/pages/customersSystem/addCustomers/addCustomers.vue"
      )
  },
  {
    //客源系统 新整客户
    path: "/customers/editCustomers",
    meta: {
      title: "修改客户信息",
      isMapNav: true //不需要导航
    },
    component: () =>
      import(
        /* webpackChunkName: "editCustomers" */ "@/pages/customersSystem/addCustomers/editCustomers.vue"
      )
  },
  {
    //客源系统 私客列表
    path: "/customers/privateCustomersList",
    meta: {
      title: "私客列表",
      keepAlive: true,
      isMapNav: true //不需要导航
    },
    component: () =>
      import(
        /* webpackChunkName: "privateCustomersList" */ "@/pages/customersSystem/privateCustomersList/privateCustomersList.vue"
      )
  },
  {
    //客源系统 公客列表
    path: "/customers/publicCustomersList",
    meta: {
      title: "公客列表",
      keepAlive: true,
      isMapNav: true //不需要导航
    },
    component: () =>
      import(
        /* webpackChunkName: "publicCustomersList" */ "@/pages/customersSystem/publicCustomersList/publicCustomersList.vue"
      )
  },
  {
    //客源系统 公客详情
    path: "/customers/publicCustomersDetail",
    meta: {
      title: "公客详情",
      isMapNav: true //不需要导航
    },
    component: () =>
      import(
        /* webpackChunkName: "publicCustomersList" */ "@/pages/customersSystem/publicCustomersDetail/publicCustomersDetail.vue"
        //客源系统 新整客户
      )
  },
  {
    //客源系统 私客详情
    path: "/customers/customersDetail",
    meta: {
      title: "私客详情",
      isMapNav: true //不需要导航
    },
    component: () =>
      import(
        /* webpackChunkName: "customersDetail" */ "@/pages/customersSystem/customersDetail/customersDetail.vue"
      )
  },
  {
    //客源系统 添加带看
    path: "/customers/takeLook",
    meta: {
      title: "添加带看",
      isMapNav: true //不需要导航
    },
    component: () =>
      import(
        /* webpackChunkName: "takeLook" */ "@/pages/customersSystem/customersDetail/takeLook.vue"
      )
  },
  {
    path: "/buySellSystem/dictContrast",
    name: "dictContrast",
    meta: {
      title: "小区对标",
      isMapNav: true, //不需要导航
      isPad: true //不需要el-main padding
    },
    component: () =>
      import(
        /* webpackChunkName: "messageValidate" */ "@/pages/buySellSystem/dictContrast/list.vue"
      )
  },
  {
    //官网留言管理 配置
    path: "/sys/configure",
    meta: {
      title: "配置管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "noticeManageList" */ "@/pages/systemAdministration/officialWebsite/configure.vue"
      )
  },
  {
    //官网留言管理 留言列表
    path: "/sys/message",
    meta: {
      title: "留言列表"
    },
    component: () =>
      import(
        /* webpackChunkName: "noticeManageList" */ "@/pages/systemAdministration/officialWebsite/messageList.vue"
      )
  }
];
