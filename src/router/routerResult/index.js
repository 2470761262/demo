
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
        //独家房源列表
        path: "/buySellSystem/soleHouse",
        name: "addHouse",
        component: () =>
            import(/* webpackChunkName: "soleHouse" */ "@/pages/buySellSystem/soleHouse/soleHouse.vue")
    },
    {
        //总监推荐房源
        path: "/buySellSystem/chiefRecommendHouse",
        name: "addHouse",
        component: () =>
            import(/* webpackChunkName: "chiefRecommendHouse" */ "@/pages/buySellSystem/houseRecommend/chiefRecommendHouse.vue")
    },
    {
        //资源库-无号码-录入号码
        path: "/buySellSystem/updatePhone",
        name: "addHouse",
        component: () =>
            import(/* webpackChunkName: "updatePhone" */ "@/pages/buySellSystem/houseResource/updatePhone.vue")
    },
    {
        //店长推荐房源
        path: "/buySellSystem/shopownerRecommendHouse",
        name: "addHouse",
        component: () =>
            import(/* webpackChunkName: "shopownerRecommendHouse" */ "@/pages/buySellSystem/houseRecommend/shopownerRecommendHouse.vue")
    },
    {
        //补充楼盘
        path: "/buySellSystem/CommunityReplenish",
        name: "addHouse",
        component: () =>
            import(/* webpackChunkName: "CommunityReplenish" */ "@/pages/buySellSystem/addFloorList/CommunityReplenish.vue")
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
        redirect: "/buySellSystem/concernCommunity",
        component: () =>
            import(/* webpackChunkName: "otherIframe" */ "@/pages/buySellSystem/otherIframe/otherIframe.vue"),
        children: [
            {
                //我的核心盘
                path: "/buySellSystem/concernCommunity",
                name: "concernCommunity",
                component: () =>
                    import(/* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/concernCommunity/concernCommunity.vue")
            },

            {
                //七天内被带看
                path: "/buySellSystem/sevenDaysFollowHouse",
                name: "concernCommunity",
                component: () =>
                    import(/* webpackChunkName: "myAgent" */ "@/pages/buySellSystem/followHouse/sevenDaysFollowHouse.vue")
            },
            {
                //我的跟单
                path: "/buySellSystem/myAgent",
                name: "concernCommunity",
                component: () =>
                    import(/* webpackChunkName: "myAgent" */ "@/pages/buySellSystem/myHouseList/myAgent.vue")
            },
            {
                //我的相关
                path: "/buySellSystem/myRelatedHouse",
                name: "concernCommunity",
                component: () =>
                    import(/* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/myRelatedHouse.vue")
            },
            {
                //我的数据
                path: "/buySellSystem/myHouseData",
                name: "concernCommunity",
                component: () =>
                    import(/* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/myHouseData.vue")
            },
            {
                //我的关注
                path: "/buySellSystem/myConcern",
                name: "concernCommunity",
                component: () =>
                    import(/* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/myConcern.vue")
            },
            {
                //验真列表
                path: "/buySellSystem/draftHouse",
                name: "concernCommunity",
                component: () =>
                    import(/* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/draftHouse.vue")
            },
            {
                //审核列表
                path: "/buySellSystem/checkHouseList",
                name: "concernCommunity",
                component: () =>
                    import(/* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/checkHouseList.vue")
            },
            {
                //资源库-暂不售房源列表
                path: "/buySellSystem/notSale",
                name: "addHouse",
                component: () =>
                    import(/* webpackChunkName: "notSale" */ "@/pages/buySellSystem/houseResource/notSale.vue")
            },
            {
                //资源库-在售无跟单房源列表
                path: "/buySellSystem/saleNotTracking",
                name: "addHouse",
                component: () =>
                    import(/* webpackChunkName: "saleNotTracking" */ "@/pages/buySellSystem/houseResource/saleNotTracking.vue")
            },
            {
                //资源库-无号码
                path: "/buySellSystem/notPhone",
                name: "addHouse",
                component: () =>
                    import(/* webpackChunkName: "notPhone" */ "@/pages/buySellSystem/houseResource/notPhone.vue")
            },
            {
                //资源库-潜在出售列表
                path: "/buySellSystem/potentialHouse",
                name: "addHouse",
                component: () =>
                    import(/* webpackChunkName: "potentialHouse" */ "@/pages/buySellSystem/houseResource/potentialHouse.vue")
            },
            {
                //资源库-店公盘
                path: "/buySellSystem/shopDisk",
                name: "addHouse",
                component: () =>
                    import(/* webpackChunkName: "shopDisk" */ "@/pages/buySellSystem/houseResource/shopDisk.vue")
            },
            {
                //全部在售
                path: "/buySellSystem/saleAll",
                name: "addHouse",
                component: () =>
                    import(/* webpackChunkName: "saleAll" */ "@/pages/buySellSystem/saleAll/saleAll.vue")
            },
            {
                //外网房源
                path: "/buySellSystem/releaseOutsideHouseList",
                name: "concernCommunity",
                component: () =>
                    import(/* webpackChunkName: "concernCommunity" */ "@/pages/buySellSystem/myHouseList/releaseOutsideHouseList.vue")
            },

            {
                //正在开发中提示页面
                path: "/buySellSystem/loadDevelopment",
                name: "loadDevelopment",
                component: () =>
                    import(/* webpackChunkName: "loadDevelopment" */ "@/pages/buySellSystem/loadDevelopment/loadDevelopment.vue")
            },
            {
                //新增房源
                path: "/buySellSystem/newAgentHouse",
                name: "newAgentHouse",
                component: () =>
                    import(/* webpackChunkName: "newAgentHouse" */ "@/pages/buySellSystem/newAgentHouse/newAgentHouse.vue")
            },
            {
                //我的房源
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
            },
            {
                //我司成交
                path: "/buySellSystem/ourComDeal",
                name: "ourComDeal",
                component: () =>
                    import(/* webpackChunkName: "validateHouseList" */ "@/pages/buySellSystem/dealHouse/ourComDeal.vue")
            },
            {
                //他司成交
                path: "/buySellSystem/otherComDeal",
                name: "otherComDeal",
                component: () =>
                    import(/* webpackChunkName: "validateHouseList" */ "@/pages/buySellSystem/dealHouse/otherComDeal.vue")
            },
            {
                //业主自售
                path: "/buySellSystem/selfDeal",
                name: "selfDeal",
                component: () =>
                    import(/* webpackChunkName: "validateHouseList" */ "@/pages/buySellSystem/dealHouse/selfDeal.vue")
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
            },
            {
                //验真房源审核
                path: "/buySellSystem/agentHouseContrast",
                name: "agentHouseContrast",
                component: () =>
                    import(/* webpackChunkName: "validateHouseExamineList" */ "@/pages/buySellSystem/agentHouseContrast/agentHouseContrast.vue")
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
        //系统管理 系统参数配置列表
        path: "/sys/systemConfigList",
        name: "systemConfigList",
        component: () =>
            import(/* webpackChunkName: "systemConfigList" */ "@/pages/systemAdministration/systemConfigList/systemConfigList.vue")
    },
    {
        //系统管理 添加系统参数配置
        path: "/sys/addConfig",
        name: "addConfig",
        component: () =>
            import(/* webpackChunkName: "addConfig" */ "@/pages/systemAdministration/systemConfigList/addConfig.vue")
    },
    {
        //系统管理 添加系统参数配置对象
        path: "/sys/addConfigObject",
        name: "addConfigObject",
        component: () =>
            import(/* webpackChunkName: "addConfigObject" */ "@/pages/systemAdministration/systemConfigList/addConfigObject.vue")
    },
    {
        //系统管理 系统参数配置对象列表
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
        name: "pcOnlineList",
        component: () =>
            import(/* webpackChunkName: "pcOnlineList" */ "@/pages/systemAdministration/pcOnline/list.vue")
    },
    {
        //系统管理 公司PC管理
        path: "/sys/pcManagement/list",
        name: "pcManagementList",
        component: () =>
            import(/* webpackChunkName: "pcOnlineList" */ "@/pages/systemAdministration/pcManagement/list.vue")
    },
    {
        //系统管理 文档管理
        path: "/sys/document/list",
        name: "documentList",
        component: () =>
            import(/* webpackChunkName: "documentList" */ "@/pages/systemAdministration/document/list.vue")
    },
    {
        //系统管理 文档管理 编辑
        path: "/sys/document/edit",
        name: "documentEdit",
        component: () =>
            import(/* webpackChunkName: "documentEdit" */ "@/pages/systemAdministration/document/edit.vue")
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
    },
    {
        //系统管理 游客管理
        path: "/sys/visitorList",
        name: "visitorList",
        component: () =>
            import("@/pages/systemAdministration/visitor/visitorList.vue")
    },
    {
        //系统管理 角色管理
        path: "/sys/ruleManager",
        name: "rule",
        component: () =>
            import(/* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/ruleManager/rule.vue")
    },
    {
        //系统管理
        path: "/sys/notFoundPage",
        name: "notFoundPage",
        component: () =>
            import("@/pages/systemAdministration/common/notFoundPage.vue")
    },
    {
        //系统管理 角色管理
        path: "/sys/positionManager",
        name: "position",
        component: () =>
            import(/* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/positionManager/position.vue")
    },
    {
        //系统管理 权限设置
        path: "/sys/setPosition",
        name: "setPosition",
        component: () =>
            import(/* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/positionManager/setPosition.vue")
    },
    {
        //系统管理 店面管理
        path: "/sys/stroeList",
        name: "stroeList",
        component: () =>
            import("@/pages/systemAdministration/stroe/stroeList.vue")
    },
    {
        //系统管理 店面管理-添加
        path: "/sys/addStroe",
        name: "addStroe",
        component: () =>
            import("@/pages/systemAdministration/stroe/addStroe.vue")
    },
    {
        //系统管理 店面管理-修改
        path: "/sys/editStroe",
        name: "editStroe",
        component: () =>
            import("@/pages/systemAdministration/stroe/editStroe.vue")
    },
    {
        //系统管理 店面管理-修改
        path: "/sys/detailsStroe",
        name: "detailsStroe",
        component: () =>
            import(/* webpackChunkName: "detailsStroe" */ "@/pages/systemAdministration/stroe/detailsStroe.vue")
    },
    {
        //系统管理 权限设置 用户列表
        path: "/sys/authority/employeeList",
        name: "employeeList",
        component: () =>
            import(/* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/authority/employeeList.vue")
    },
    {
        //系统管理 权限设置
        path: "/sys/authority/setAuthority",
        name: "setAuthority",
        component: () =>
            import(/* webpackChunkName: "passwordReset" */ "@/pages/systemAdministration/authority/setAuthority.vue")
    },

]
