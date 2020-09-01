<template>
  <!-- 房源系统-管理入口 -->
  <div class="entrance-container">
    <span class="position">当前位置：</span>
    <div class="header">
      <div class="nav">
        <div class="item"
         v-for="(item, index) in navList"
         :key="index" :class="{'active': navActiveIndex===index}"
         @click="changeNav(index)"
        >
          {{item}}
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
      navList: ["业务管理", "买卖房源", "租赁房源", "客源", "人员管理"],
    }
  },
  methods: {
    changeNav(index) {
      this.navActiveIndex = index;
      switch(index) {
        case 0:
          this.$router.push("/managementEntrance/business");
          break;
        case 1:
          this.$router.push("/managementEntrance/houseLockingList");
          break;
        case 2:
          this.$router.push("/managementEntrance/houseExamineHouse");
          break;
      }
    }
  }
}
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
  padding: 12PX 16PX 32PX;
  background: #F0F7F7;
  overflow: auto;
  box-sizing: border-box;
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
      border-bottom: 1px solid #F0F2F5;
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
