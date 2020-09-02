<template>
  <!-- 房源系统-管理入口 -->
  <div class="entrance-container">
    <span class="position">当前位置：</span>
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
export default {
  data() {
    return {
      navActiveIndex: 0,
      navList: ["业务管理", "买卖房源", "租赁房源", "客源", "人员管理"]
    };
  },
  methods: {
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
