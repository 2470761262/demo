<template>
  <!-- 房源系统-管理入口 -->
  <div class="entrance-container">
    <!-- <span class="position">当前位置：</span> -->
    <!-- 面包屑 -->
    <div class="nav-flex">
      <span class="title"><i class="iconhome iconfont"></i>当前位置：</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="index"
          :to="{ path: item.url }"
          >{{ item.title }}</el-breadcrumb-item
        >
        <el-breadcrumb-item
          class="isBack anchor-point"
          v-if="breadcrumbList.length > 1 && isShowReturn"
          @click.native="goBack"
          >返回</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="header">
      <div class="nav">
        <div
          class="item anchor-point"
          :data-anchor="'房源系统类型:' + item"
          v-for="(item, index) in navList"
          :key="index"
          :class="{ active: navActiveIndex === index }"
          @click="changeNav(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import bus from "@/evenBus/but.js";
export default {
  data() {
    return {
      isShowReturn: true,
      navActiveIndex: 0,
      navList: ["业务管理", "买卖房源", "租赁房源", "客源", "人员管理"]
    };
  },
  watch: {
    $route(newValue) {
      this.breadcrumbSet(newValue.matched);
    }
  },
  created() {
    bus.$on("switchEntranceNav", index => {
      this.navActiveIndex = index;
    });
    this.breadcrumbSet(this.$route.matched);
    var url = window.location.href; //获取url中"?"符后的字串
    if (
      url.indexOf("/houseDetails/") != -1 ||
      url.indexOf("/potentialHouseDetail/") != -1 ||
      url.indexOf("/buildingHouseDetail/") != -1 ||
      url.indexOf("/historyDetails/") != -1 ||
      url.indexOf("/validateHouseDetails/") != -1
    ) {
      this.isShowReturn = false;
    }
  },
  beforeDestroy() {
    bus.$off("switchEntranceNav");
  },
  methods: {
    breadcrumbSet(matched) {
      //需要过滤的Path;
      this.breadcrumbList = [];
      let filterPath = ["/buySellSystem/houseList"];
      if (matched.length > 0) {
        matched.forEach(item => {
          if (!filterPath.includes(item.path)) {
            this.breadcrumbList.push({
              title: item.meta.title,
              url: item.path
            });
          }
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    changeNav(index) {
      this.navActiveIndex = index;
      switch (index) {
        case 0:
          this.$router.push("/managementEntrance/business");
          break;
        case 1:
          this.$router.push("/managementEntrance/houseDeploy");
          break;
        case 2:
          this.$router.push("/managementEntrance/rentHouse");
          this.$msgbox({
            title: "温馨提示",
            message: <div>功能正在开发中，敬请期待</div>,
            showCancelButton: false
          });
          break;
        case 3:
          this.$router.push("/managementEntrance/customers");
          break;
        case 4:
          this.$router.push("/managementEntrance/personnel");
          this.$msgbox({
            title: "温馨提示",
            message: <div>功能正在开发中，敬请期待</div>,
            showCancelButton: false
          });
          break;
      }
    }
  }
};
</script>
<style lang="less">
.children-page {
  height: 100%;
}
</style>
<style lang="less" scoped>
.entrance-container::-webkit-scrollbar {
  /*width: 0;宽度为0隐藏*/
  display: none;
}
.entrance-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  // prettier-ignore
  padding: 12PX 16PX 34PX;
  background: #f0f7f7;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  .position {
    line-height: 1;
    font-size: @font12;
    color: #303133;
  }
  /************ 面包屑 ************/
  .nav-flex {
    display: flex;
    align-items: center;
    i {
      margin-right: 3px;
    }
    .title {
      display: flex;
      align-items: center;
      line-height: 1;
      font-size: @font12;
      font-weight: 700;
      color: var(--color--primary);
    }
    .el-breadcrumb {
      line-height: inherit;
    }
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        color: var(--color--primary);
        &.is-link {
          display: inline-block;
          // font-weight: normal;
          font-size: @font12;
        }
      }
      .el-breadcrumb__separator {
        vertical-align: middle;
        font-size: @font12;
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #606266;
        }
      }
    }
    /deep/.isBack {
      .el-breadcrumb__inner {
        cursor: pointer !important;
      }
    }
  }
  .header {
    // prettier-ignore
    margin-top: 12PX;
    // prettier-ignore
    padding: 24PX 24PX 0 24PX;
    background: #fff;
    // prettier-ignore
    border-top-right-radius: 8PX;
    // prettier-ignore
    border-top-left-radius: 8PX;
    .nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #f0f2f5;
      .item {
        // prettier-ignore
        margin: 0 36PX 16PX 0;
        line-height: 1;
        font-size: @font18;
        color: #909399;
        cursor: pointer;
        &.active {
          font-weight: bold;
          color: #303133;
        }
      }
    }
  }
}
</style>
