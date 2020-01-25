<style scoped lang="less">
.page-cell-left {
  position: fixed;
  top: 0;
  left: 0;
  width: 190px;
  height: 100vh;
  z-index: 20;
  background-color: rgb(84, 92, 100);
  /deep/.el-menu {
    border: none;
  }
}
</style>
<template>
  <div class="page-cell-left">
    <el-row class="tac">
      <el-col :span="24">
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
          <el-menu-item index="/Middle/Details">
            <i class="el-icon-menu"></i>
            <span slot="title">应用管理</span>
          </el-menu-item>
          <el-menu-item index="/Middle/List">
            <i class="el-icon-menu"></i>
            <span slot="title">日志管理</span>
          </el-menu-item>
          <el-menu-item index="/Middle/Details">
            <i class="el-icon-menu"></i>
            <span slot="title">错误日志</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LeftRegion",
  props: {
    msg: String
  },
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
