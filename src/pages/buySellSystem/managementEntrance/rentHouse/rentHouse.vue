<style lang="less" scoped>
.content {
  background: rgba(240, 247, 247, 1);
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 0;
  .tip-style {
    padding: 50px 0;
    margin-top: 220px;
    text-align: center;
    div {
      text-align: center;
      font-size: @font16;
    }
  }
}
</style>
<template>
  <div class="content">
    <div class="tip-style">
      <img src="../../../../assets/images/zanwu.png" alt="暂无数据" />
      <div>暂无信息</div>
    </div>
  </div>
</template>

<script>
export default {
  provide() {
    return {};
  },
  components: {},
  data() {
    return {};
  }
};
</script>
