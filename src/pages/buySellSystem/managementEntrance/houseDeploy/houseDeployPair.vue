<style lang="less" scoped>
.content {
  .nav-map {
    color: #303133;
    font-size: @font12;
    // prettier-ignore
    padding: 12PX 0;
  }
  .content-warp {
    background: #fff;
    // prettier-ignore
    border-radius:8PX;
    // prettier-ignore
    padding: 0 24PX;
    .warp-nav {
      display: flex;
      // prettier-ignore
      padding-top: 24PX;
      // prettier-ignore
      padding-bottom: 16PX;
      border-bottom: 1px solid rgba(240, 242, 245, 1);
      .warp-nav-item {
        font-size: @font18;
        color: #909399;
        // prettier-ignore
        margin-right: 36PX;
        cursor: pointer;
        &.active {
          color: #303133;
          font-weight: bold;
        }
      }
    }
    .implant-nav {
      display: flex;
      // prettier-ignore
      padding:16PX 0 24PX;
      .implant-nav-item {
        // prettier-ignore
        padding: 8PX 16PX;
        color: #606266;
        cursor: pointer;
        // prettier-ignore
        margin-right: 8PX;
        font-size: @font14;
        &.active {
          color: #fff;
          background: @backgroud;
          // prettier-ignore
          border-radius:8PX ;
        }
      }
    }
  }
}
</style>
<template>
  <div class="content">
    <div class="nav-map">当前页面:</div>
    <div class="content-warp">
      <!--  -->
      <div class="warp-nav">
        <div
          class="warp-nav-item"
          :class="{ active: index == 1 }"
          v-for="(item, index) in typeList"
          :key="index"
        >
          {{ item.title }}
        </div>
      </div>
      <!--  -->
      <div class="implant-nav">
        <div
          class="implant-nav-item"
          :class="{ active: index == 0 }"
          v-for="(item, index) in implantList"
          :key="index"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const TYPELIST = [
  { title: "业务管理", url: "" },
  { title: "买卖房源", url: "" },
  { title: "租赁房源", url: "" },
  { title: "客源", url: "" },
  { title: "人员管理", url: "" }
];

const IMPLANTLIST = [
  { title: "房源调配", url: "" },
  { title: "3天新增", url: "" },
  { title: "7天内被看房源", url: "" },
  { title: "锁定房源", url: "" },
  { title: "审核列表", url: "" }
];
export default {
  data() {
    return {
      typeList: TYPELIST,
      implantList: IMPLANTLIST
    };
  }
};
</script>
