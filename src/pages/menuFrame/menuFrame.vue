<style lang="less" scoped>
.page-cell-conter {
  height: 100vh;
  .page-cell-header {
    min-width: 1280px;
  }
  .page-cell-main {
    height: calc(100% - 60px);
    width: 1920px;
    .el-aside,
    .el-main {
      height: 100%;
    }
    .el-main {
      background: #f4f4f4;
    }
    .el-aside {
      background-color: rgb(84, 92, 100);
    }
    .children-page {
      padding-top: 20px;
      height: calc(100% - 14px);
      box-sizing: border-box;
    }
  }
}
.el-background {
  background: #e2e2e2 !important;
  width: auto !important;
  max-width: 200px;
  /deep/.el-submenu__title {
    background: #e2e2e2 !important;
    > span {
      color: #323234 !important;
    }
  }
  /deep/.el-menu--inline {
    background: none !important;
  }
  /deep/.el-menu-item {
    background: #dbdbdb !important;
    color: #323234 !important;
  }
  /deep/.el-submenu__icon-arrow {
    display: none !important;
  }
}
</style>
<template >
  <section class="page-cell-conter">
    <el-container>
      <el-header v-if="asideNavFlag">
        <header-content :userInfoData="loginUserData"></header-content>
      </el-header>
    </el-container>
    <el-container class="page-cell-main">
      <el-aside class="el-background"
                v-if="asideNavFlag">
        <asideNav :menuNodeDatas="menuDatasInParent"></asideNav>
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
import headerContent from '@/components/headerContent';
import util from '@/util/util';
import { LOGINDATA } from '@/util/constMap';
export default {
  name: "menuFrame",
  components: {
    asideNav,
    headerContent
  },
  data () {
    return {
      resultRouteArray: this.$route.meta.routeArray,
      asideNavFlag: true,
      loginUserData: {}
    }
  },
  created () {
    window.addEventListener('message', (e) => {
      //  console.log("-------------------", e);
      if (e.data.isXinIfram) {
        this.asideNavFlag = false;
      }
    }, false);
    this.loginUserData = util.localStorageGet(LOGINDATA);
    if (this.loginUserData.menuNodes) {
      this.menuDatasInParent = this.loginUserData.menuNodes;
    }
  },
}
</script>