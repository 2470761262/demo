<style lang="less" scoped>
.step-content {
  padding-left: 24px * @base;
  .title {
    font-size: 24px;
    color: rgba(48, 49, 51, 1);
    line-height: 32px;
    margin: 24px 0 41px;
  }
  .input-group {
    .input-content {
      width: 506px ;
      height: 48px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4PX;
      border: 1px solid rgba(206, 206, 206, 1);
    }
  }
}
</style>
<template>
  <section class="step-content">
    <h3 class="title">您的客户信息</h3>
    <div class="input-group">
      <div class="input-head">客户姓名</div>
      <el-input v-model="mock"
                class="input-content"
                placeholder="请输入客户的姓名" />
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      mock: ""
    }
  },
}
</script>

