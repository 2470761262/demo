<style lang="less">
.page-cell-middle {
  display: flex;
  .middle-left {
    width: 190px;
    height: 100vh;
  }
  .middle-main {
    flex: 1;
    .middle-main-nav {
      margin: 20px 30px 0;
    }
  }
}
</style>
<template>
  <div class="page-cell-middle">
    <div class="middle-left hidden-xs-only">
      <left-region></left-region>
    </div>
    <div class="middle-main">
      <div class="middle-main-nav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="(meta, index) in resultRouteArray"
            :key="index"
            >{{ meta.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import LeftRegion from "@/components/LeftRegion";
export default {
  name: "middle",
  components: {
    LeftRegion
  },
  computed: {
    resultRouteArray() {
      return this.$route.meta.routeArray;
    }
  },
  data() {
    return {};
  }
};
</script>
