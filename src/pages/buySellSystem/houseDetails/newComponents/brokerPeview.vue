<style lang="less" scoped>
@import "../newLess/cardContent";
.peview-content {
  // prettier-ignore
  margin-top: 17px;
  .card-content;
  .message-content-cell {
    display: flex;
    .message-cell-title {
      // prettier-ignore
      width: 130PX;
    }
    .message-cell-data {
      word-break: break-all;
    }
  }
}
</style>
<template>
  <div class="peview-content">
    <div class="card-head">
      <h3 class="card-head-title">经纪人点评</h3>
      <span class="card-head-tips">上次更新: 2020-06-28 21:22:23</span>
    </div>
    <div class="card-message-content">
      <div class="message-content-cell">
        <h3 class="message-cell-title">房源标题</h3>
        <div class="message-cell-data">高层精装3房,业主急售</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
