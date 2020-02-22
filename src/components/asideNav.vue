
<style lang="less" >
.el-menu {
  border: none !important;
}
</style>
<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>买卖系统</span>
        </template>
        <!-- <el-menu-item-group> -->
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="/buySellSystem/houseList">
          <i class="el-icon-location"></i>房源管理
        </el-menu-item>
        <el-menu-item index="/buySellSystem/addFloorList">
          <i class="el-icon-location"></i>补充楼盘审核
        </el-menu-item>
        <!-- </el-menu-item-group> -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>

        <el-menu-item index="/sys/noticeManageList">公告管理</el-menu-item>
        <el-menu-item index="/sys/onLineUserList">在线用户</el-menu-item>
        <el-menu-item index="/sys/systemConfigList">系统参数配置</el-menu-item>
        <el-menu-item index="/menuFrame/agentHouseContrast">房源对比</el-menu-item>
        <el-menu-item index="/sys/passwordReset">用户密码重置</el-menu-item>
        <el-menu-item index="/sys/pcOnline/list">PC在线管理</el-menu-item>
        <el-menu-item index="/sys/roleManagementList">岗位管理</el-menu-item>
        <el-menu-item index="/sys/companyList">公司管理</el-menu-item>
        <el-menu-item index="/sys/deptManageList">部门管理</el-menu-item>
        <el-menu-item index="/sys/employeeList">员工管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
