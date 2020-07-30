<style lang="less" scoped>
.el-main {
  padding-bottom: 0;
}
.page-cell-conter {
  height: 100vh;
  .page-cell-header {
    min-width: 1280px;
  }
  .page-cell-main-menu {
    // prettier-ignore
    height: calc(100% - 80PX);
    &.is-nest {
      height: 100% !important;
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
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }
  }
}
.is-map-nav {
  .el-main {
    padding: 0;
  }
}
.is-map-nav-top {
  .el-main {
    padding: 0;
    /deep/.nav-breadcrumb {
      margin-top: 20px;
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
<template>
  <section class="page-cell-conter">
    <el-container>
      <el-header v-if="asideNavFlag" height="80px">
        <header-content :userInfoData="loginUserData"></header-content>
      </el-header>
    </el-container>
    <el-container
      :class="[isPad, { 'is-nest': isNest || isHander }]"
      class="page-cell-main-menu"
      id="page-cell-main"
    >
      <el-aside class="el-background" v-if="asideNavFlag">
        <asideNav :menuNodeDatas="menuDatasInParent"></asideNav>
      </el-aside>
      <el-main>
        <feedback ref="feedback" v-show="isMapNav" />
        <div class="children-page" :style="isMapNavStyle">
          <!-- 二级页面 router-view -->
          <keep-alive :max="3">
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" />
          <right-fixed-chunk @click="triggerFeedback"></right-fixed-chunk>
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
import getToken from "@/minxi/getUrlToken";
import rightFixedChunk from "@/components/rightFixedChunk";
export default {
  mixins: [getToken],
  name: "menuFrame",
  components: {
    asideNav,
    headerContent,
    rightFixedChunk
  },
  data() {
    return {
      isHander: false,
      asideNavFlag: true,
      loginUserData: {},
      menuDatasInParent: []
    };
  },
  computed: {
    isNest() {
      return !(window.self == window.parent);
    },
    isMapNav() {
      return !this.$route.meta.isMapNav;
    },
    isPad() {
      if (!this.isMapNav) {
        return "is-map-nav";
      }
      if (this.$route.meta.isPad) {
        return "is-map-nav-top";
      }
      return "";
    },
    isMapNavStyle() {
      if (this.isMapNav) {
        return { "min-height": "calc(100% - .29rem)" };
      } else {
        return { "min-height": "100%" };
      }
    }
  },
  methods: {
    /**
     * @example: 触发feedback的打开功能反馈提示
     */
    triggerFeedback() {
      this.$refs.feedback.hitOuterVisible();
    }
  },
  created() {
    this.$nextTick(() => {
      this.asideNavFlag = util.localStorageGet("nest");
      this.isHander = document.querySelector(".page-cell-header")
        ? false
        : true;
    });
    this.loginUserData = util.localStorageGet(LOGINDATA);
    if (this.loginUserData && this.loginUserData.menuNodes) {
      this.menuDatasInParent = this.loginUserData.menuNodes;
    }
  }
};
</script>
