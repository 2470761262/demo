<template>
  <!-- 买卖房源选项卡 -->
  <div class="content-warp">
    <div class="implant-nav">
      <div
        class="implant-nav-item"
        :class="{ active: navActiveIndex == index }"
        v-for="(item, index) in implantList"
        :key="index"
        @click="changeNav(index, item.url)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
const IMPLANTLIST = [
  { title: "房源调配", url: "/managementEntrance/houseDeploy" },
  { title: "3天新增", url: "" },
  { title: "7天内被看房源", url: "" },
  { title: "锁定房源", url: "/managementEntrance/houseLockingList" },
  { title: "审核列表", url: "/managementEntrance/houseExamineHouse" }
];
export default {
  props: {
    navActiveIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      implantList: IMPLANTLIST
    };
  },
  methods: {
    changeNav(index, url) {
      this.$router.push(url);
    }
  }
};
</script>
<style lang="less" scoped>
.content-warp {
  background: #fff;
  // prettier-ignore
  padding: 0 24PX;
  .implant-nav {
    display: flex;
    // prettier-ignore
    padding: 16PX 0 24PX;
    .implant-nav-item {
      // prettier-ignore
      height: 30PX;
      // prettier-ignore
      padding: 0 16PX;
      line-height: 30PX;
      color: #606266;
      cursor: pointer;
      // prettier-ignore
      margin-right: 8PX;
      font-size: @font14;
      &.active {
        color: #fff;
        background: @backgroud;
        // prettier-ignore
        border-radius: 4PX ;
      }
    }
  }
}
</style>
