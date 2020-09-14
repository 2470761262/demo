<template>
  <div class="entrance-container">
    <router-view></router-view>
  </div>
  <!-- 房源系统-管理入口 -->
</template>
<script></script>
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
}
</style>
