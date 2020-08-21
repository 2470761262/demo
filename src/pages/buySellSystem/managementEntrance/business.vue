<template>
  <!-- 房源系统-业务管理 -->
  <div class="container">
    <span class="position">当前位置：</span>
    <div class="header">
      <div class="nav">
        <div class="item" v-for="(item, index) in navList" :key="index" :class="{'active': navActiveIndex}">{{item}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navActiveIndex: 0,
      navList: ["业务管理", "买卖房源", "租赁房源", "客源", "人员管理"]
    }
  }
}
</script>
<style lang="less">
.container {
  min-height: 100%;
  background: #F0F7F7;
  .position {
    font-size: @font14;
  }
  .header {
    .nav {
      .item {
        &.active {
          font-weight: 900;
        }
      }
    }
  }
}
</style>
