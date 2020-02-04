<style lang="less" scoped>
.sdsd {
  height: 2000px;
}
.page-cell {
  height: 100vh;
  .page-cell-main {
    height: calc(100% - 60px);
    .el-aside,
    .el-main {
      height: 100%;
    }
    .el-aside {
      background-color: rgb(84, 92, 100);
    }
    .children-page {
      margin-top: 20px;
    }
  }
}
</style>
<template >
  <section class="page-cell">
    <el-container>
      <el-header>头部 </el-header>
    </el-container>
    <el-container class="page-cell-main">
      <el-aside width="200px">
        <asideNav></asideNav>
      </el-aside>
      <el-main>
        <!-- 面包导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path:meta.path}"
                              v-for="(meta, index) in resultRouteArray"
                              :key="index">{{ meta.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="children-page">
          <!-- 二级页面 router-view -->
          <router-view />
        </div>
      </el-main>
    </el-container>
  </section>
</template>
<script>
//左侧菜单
import asideNav from '@/components/asideNav';
export default {
  name: "menuFrame",
  components: {
    asideNav
  },
  computed: {
    resultRouteArray () {
      return this.$route.meta.routeArray;
    }
  },
  created () {

  },
}
</script>