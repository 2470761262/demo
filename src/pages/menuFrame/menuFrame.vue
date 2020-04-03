<style lang="less" scoped>
.el-main {
  padding-bottom: 0;
}
.page-cell-conter {
  height: 100vh;
  .page-cell-header {
    min-width: 1280px;
  }
  .page-cell-main {
    height: calc(100% - 80px);
    @media screen and(max-width: 1280px) {
      height: calc(100% - 100px);
    }

    .el-aside,
    .el-main {
      height: 100%;
      &::-webkit-scrollbar,
      &::-webkit-scrollbar-button,
      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-track-piece {
        display: none;
      }
    }
    .el-main {
      background: #f4f4f4;
    }
    .el-aside {
      background-color: rgb(84, 92, 100);
    }
    .children-page {
      height: calc(100% - 55px);
      box-sizing: border-box;
    }
  }
}
.el-background {
  background: #e2e2e2 !important;
  width: auto !important;
  max-width: 200px;
  /deep/.el-menu-item {
    background: #dbdbdb !important;
    min-width: auto;
    padding: 0 0 0 40px !important;
  }
  /deep/.el-submenu__icon-arrow {
    display: none !important;
  }
}
/deep/.el-header {
  background: var(--color--primary);
}
</style>
<template >
  <section class="page-cell-conter">
    <el-container>
      <el-header v-if="asideNavFlag"
                 height="80px">
        <header-content :userInfoData="loginUserData"></header-content>
      </el-header>
    </el-container>
    <el-container class="page-cell-main"
                  id="page-cell-main">
      <el-aside class="el-background"
                v-if="asideNavFlag">
        <asideNav :menuNodeDatas="menuDatasInParent"></asideNav>
      </el-aside>
      <el-main>
        <feedback />
        <div class="children-page">
          <!-- 二级页面 router-view -->
          <transition name="el">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive" />
            </keep-alive>
          </transition>
          <transition name="el">
            <router-view v-if="!$route.meta.keepAlive" />
          </transition>
        </div>
      </el-main>
    </el-container>
  </section>
</template>
<script>
//左侧菜单
import asideNav from "@/components/asideNav";
import headerContent from "@/components/headerContent";
import util from "@/util/util";
import { LOGINDATA } from "@/util/constMap";
import but from "@/evenBus/but";
export default {
  name: "menuFrame",
  components: {
    asideNav,
    headerContent
  },
  data() {
    return {
      asideNavFlag: true,
      loginUserData: {},
      menuDatasInParent: []
    };
  },
  created() {
    but.$on("asideNav", e => {
      this.asideNavFlag = e;
    });
    window.addEventListener(
      "message",
      e => {
        //  console.log("-------------------", e);
        if (e.data.isXinIfram) {
          this.asideNavFlag = false;
        }
      },
      false
    );
    this.loginUserData = util.localStorageGet(LOGINDATA);
    if (this.loginUserData.menuNodes) {
      this.menuDatasInParent = this.loginUserData.menuNodes;
    }
  }
};
</script>