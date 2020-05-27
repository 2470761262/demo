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
    @media screen and(max-width: 1280px) {
      // prettier-ignore
      height: calc(100% - 100PX);
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
      height: calc(100% - 26px);
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
.feedback-suspension {
  position: fixed;
  z-index: 20;
  right: 40px;
  bottom: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  background: #fff;
  p {
    &:nth-child(1) {
      margin-bottom: 5px;
      font-size: 15px;
    }
    &:nth-child(2) {
      color: #40a375;
    }
  }
  img[alt="在线反馈"] {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}
</style>
<template>
  <section class="page-cell-conter">
    <el-container>
      <el-header v-if="asideNavFlag" height="80px">
        <header-content :userInfoData="loginUserData"></header-content>
      </el-header>
    </el-container>
    <el-container class="page-cell-main-menu" id="page-cell-main">
      <el-aside class="el-background" v-if="asideNavFlag">
        <asideNav :menuNodeDatas="menuDatasInParent"></asideNav>
      </el-aside>
      <el-main>
        <feedback ref="feedback" />
        <div class="children-page">
          <!-- 二级页面 router-view -->
          <transition name="el">
            <keep-alive
              :max="3"
              include="houseList,otherIframe,customersIframe"
            >
              <!-- <router-view v-if="$route.meta.keepAlive" /> -->
              <router-view />
            </keep-alive>
          </transition>
          <div class="feedback-suspension " @click="triggerFeedback">
            <img
              src="https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/5/27/6a6b1cc898c74452ac219dcc85fc2e33.png"
              alt="在线反馈"
            />
            <div>
              <p>在线反馈</p>
              <p>反馈可以赚鑫币哦</p>
            </div>
          </div>
          <!-- <transition name="el">
            <router-view v-if="!$route.meta.keepAlive" />
          </transition>-->
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
export default {
  mixins: [getToken],
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
    });
    this.loginUserData = util.localStorageGet(LOGINDATA);
    if (this.loginUserData && this.loginUserData.menuNodes) {
      this.menuDatasInParent = this.loginUserData.menuNodes;
    }
  }
};
</script>
