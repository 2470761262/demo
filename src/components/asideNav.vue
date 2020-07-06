<style lang="less">
.el-menu {
  border: none !important;
}
.el-aside {
  overflow-x: hidden;
}
</style>
<template>
  <el-menu
    :default-active="$route.path"
    :collapse="collapse"
    background-color="#eeeeee"
    router
  >
    <el-submenu index="0123">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>新买卖系统</span>
      </template>
      <el-menu-item index="/buySellSystem/houseList">房源管理</el-menu-item>
      <el-menu-item index="/buySellSystem/addFloorList"
        >补充楼盘审核</el-menu-item
      >
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>新系统管理</span>
      </template>
      <el-menu-item index="/sys/noticeManageList">公告管理</el-menu-item>
      <el-menu-item index="/sys/visitorList">游客管理</el-menu-item>
      <el-menu-item index="/sys/onLineUserList">在线用户</el-menu-item>
      <el-menu-item index="/sys/systemConfigList">系统参数配置</el-menu-item>
      <el-menu-item index="/buySellSystem/agentHouseContrast"
        >房源对比</el-menu-item
      >
      <el-menu-item index="/sys/passwordReset">用户密码重置</el-menu-item>
      <el-menu-item index="/sys/pcManagement/list">公司PC管理</el-menu-item>
      <el-menu-item index="/sys/pcOnline/list">公司PC在线管理</el-menu-item>
      <el-menu-item index="/sys/document/list">文档管理</el-menu-item>
      <!-- <el-menu-item index="/sys/docRules/list">规则管理</el-menu-item> -->
      <el-menu-item index="/sys/hrTree/hrTree">组织结构</el-menu-item>
      <el-menu-item index="/sys/roleManagementList">岗位管理</el-menu-item>
      <el-menu-item index="/sys/companyList">公司管理</el-menu-item>
      <el-menu-item index="/sys/deptManageList">部门管理</el-menu-item>
      <el-menu-item index="/sys/employeeList">用户管理</el-menu-item>
      <el-menu-item index="/sys/stroeList">店面管理</el-menu-item>
      <el-menu-item index="/sys/positionManager">角色管理</el-menu-item>
      <el-menu-item index="/sys/ruleManager">功能点管理</el-menu-item>
      <el-menu-item index="/sys/logonRegPwd/view">授权器密码</el-menu-item>
      <el-menu-item index="/sys/personLogList">人员异动</el-menu-item>
      <el-menu-item index="/sys/baseCustomersList">客户管理</el-menu-item>
    </el-submenu>
    <el-submenu index="99">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>新客源系统</span>
      </template>
      <el-menu-item index="/customers/addCustomers">新增客源</el-menu-item>
      <el-menu-item index="/customers/privateCustomersList"
        >私客列表</el-menu-item
      >
      <el-menu-item index="/customers/publicCustomersList"
        >公客列表</el-menu-item
      >
      <el-menu-item index="/customers/customersDetail">客源</el-menu-item>
      <el-menu-item index="/customers/publicCustomersDetail"
        >公客详情</el-menu-item
      >
    </el-submenu>
    <el-submenu
      :index="item.id + ''"
      :key="item.id"
      v-for="item in menuNodeDatas"
    >
      <template slot="title">
        <i class="el-icon-s-flag"></i>
        <span>{{ item.rname }}</span>
      </template>
      <el-menu-item
        :key="subItem.rurl + index"
        v-for="(subItem, index) in item.children"
        :index="subItem.rurl"
        >{{ subItem.rname }}</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  props: ["menuNodeDatas"],
  data() {
    return {
      collapse: false
    };
  },
  created() {
    let that = this;
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1400) {
        that.collapse = true;
      } else {
        that.collapse = false;
      }
    });
  }
};
</script>
