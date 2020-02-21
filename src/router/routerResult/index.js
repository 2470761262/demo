
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
  },
  {
    //系统管理 在线用户统计
    path: "/sys/onLineUserList",
    name: "onLineUserList",
    component: () =>
      import("@/pages/systemAdministration/onLineUser/onLineUserList.vue")
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
    },
    {
        //系统管理 PC在线管理
        path: "/sys/pcOnline/list",
        name: "list",
        component: () =>
            import(/* webpackChunkName: "pcOnlineList" */ "@/pages/systemAdministration/pcOnline/list.vue")
    },
  {
    //系统管理 岗位管理
    path: "/sys/roleManagementList",
    name: "roleManagementList",
    component: () =>
      import(/* webpackChunkName: "roleManagementList" */ "@/pages/systemAdministration/roleManagement/roleManagementList.vue")
  },
  {
    //系统管理 岗位管理-添加
    path: "/sys/addRoleManagementList",
    name: "addRoleManagementList",
    component: () =>
      import(/* webpackChunkName: "addRoleManagementList" */ "@/pages/systemAdministration/roleManagement/addRoleManagementList.vue")
  },
  {
    //系统管理 岗位管理-修改
    path: "/sys/editRoleDetail",
    name: "editRoleDetail",
    component: () =>
      import(/* webpackChunkName: "editRoleDetail" */ "@/pages/systemAdministration/roleManagement/editRoleDetail.vue")
  },
  {
    //系统管理 公司管理
    path: "/sys/companyList",
    name: "companyList",
    component: () =>
      import(/* webpackChunkName: "companyList" */ "@/pages/systemAdministration/organization/companyList.vue")
  },
  {
    //系统管理 公司管理-添加
    path: "/sys/addCompanyManage",
    name: "addCompanyManage",
    component: () =>
      import(/* webpackChunkName: "addCompanyManage" */ "@/pages/systemAdministration/organization/addCompanyManage.vue")
  },
  {
    //系统管理 公司管理-修改
    path: "/sys/editCompanyDetail",
    name: "editCompanyDetail",
    component: () =>
      import(/* webpackChunkName: "editCompanyDetail" */ "@/pages/systemAdministration/organization/editCompanyDetail.vue")
  },
  {
    //系统管理 部门管理
    path: "/sys/deptManageList",
    name: "deptManageList",
    component: () =>
      import(/* webpackChunkName: "deptManageList" */ "@/pages/systemAdministration/organization/deptManageList.vue")
  },
  {
    //系统管理 部门管理-添加
    path: "/sys/addDeptManage",
    name: "addDeptManage",
    component: () =>
      import(/* webpackChunkName: "addDeptManage" */ "@/pages/systemAdministration/organization/addDeptManage.vue")
  },
  {
    //系统管理 部门管理-修改
    path: "/sys/editDeptDetail",
    name: "editDeptDetail",
    component: () =>
      import(/* webpackChunkName: "editDeptDetail" */ "@/pages/systemAdministration/organization/editDeptDetail.vue")
  },
  {
    //系统管理 员工管理
    path: "/sys/employeeList",
    name: "employeeList",
    component: () =>
      import(/* webpackChunkName: "deptManageList" */ "@/pages/systemAdministration/employee/employeeList.vue")
  },
  {
    //系统管理 员工管理-添加
    path: "/sys/addemployee",
    name: "addemployee",
    component: () =>
      import(/* webpackChunkName: "addDeptManage" */ "@/pages/systemAdministration/employee/addemployee.vue")
  },
  {
    //系统管理 员工管理-修改
    path: "/sys/editemployee",
    name: "editemployee",
    component: () =>
      import(/* webpackChunkName: "editDeptDetail" */ "@/pages/systemAdministration/employee/editemployee.vue")
  }
]
