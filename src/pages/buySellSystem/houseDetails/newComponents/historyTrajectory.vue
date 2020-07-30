<style lang="less" scoped>
@import "../newLess/cardContent";
.trajectory-content {
  margin-top: 17px;
  .card-content;
  .card-message-content {
    // prettier-ignore
    min-height: 175PX;
    .data-tips {
      font-size: @font14;
      // prettier-ignore
      margin-top: 20PX;
    }
  }
}
</style>
<template>
  <div class="trajectory-content">
    <div class="card-head">
      <h3 class="card-head-title">历史轨迹</h3>
    </div>
    <div class="card-message-content">
      <div class="data-tips">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
