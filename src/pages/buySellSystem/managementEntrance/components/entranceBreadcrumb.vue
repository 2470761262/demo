<template>
  <!-- 面包屑 -->
  <!-- <span class="position">当前位置：</span> -->
  <div class="nav-flex">
    <span class="title"> <i class="iconhome iconfont"></i>当前位置： </span>
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
</template>
<script>
export default {
  data() {
    return {
      isShowReturn: true
    };
  },
  watch: {
    $route(newValue) {
      this.breadcrumbSet(newValue.matched);
    }
  },
  created() {
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
    }
  }
};
</script>
<style lang="less" scoped>
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

</style>
