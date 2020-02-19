
<style lang="less">
.el-menu {
  border: none !important;
}
</style>
<template>
  <div>
    <el-menu :default-active="$route.path"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>买卖系统</span>
        </template>
        <!-- <el-menu-item-group> -->
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="/menuFrame/houseList">房源列表</el-menu-item>
        <el-menu-item index="/menuFrame/validateHouseList">验真房源列表</el-menu-item>
        <el-menu-item index="/menuFrame/validateHouseExamineList">验真房源审核</el-menu-item>
        <el-menu-item index="/menuFrame/houseTaskExamineList">房源作业方审核</el-menu-item>
        <el-menu-item index="/menuFrame/errorValidateList">异常验真列表</el-menu-item>
        <el-menu-item index="/menuFrame/addFloorList">补充楼盘审核</el-menu-item>
        <!-- </el-menu-item-group> -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/menuFrame/noticeManageList">公告管理</el-menu-item>
        <el-menu-item index="/menuFrame/systemConfigList">系统参数配置</el-menu-item>
        <el-menu-item index="/menuFrame/passwordReset">用户密码重置</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  },
}
</script>
