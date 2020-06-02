<style lang="less" scoped>
.text-content {
  text-align: center;
  color: #666;
  .el-icon-question {
    font-size: 70px;
    color: #999;
  }
  .chunk-text {
    font-size: 16px;
    margin: 20px 0;
  }
}
</style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <template>
      <div class="text-content">
        <div class="el-icon-question"></div>
        <div class="chunk-text">确定添加再谈吗</div>
      </div>
    </template>
  </fixed-popup>
</template>

<script>
export default {
  methods: {
    confirmEmit() {
      this.$emit("transmitConfirm");
    }
  }
};
</script>
