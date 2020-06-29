<style lang="less" scoped>
@import "../less/public.less";
.select-cascader-content {
  position: relative;
  .select-input {
    width: 506px;
    height: 48px;
    .input;
  }
}
</style>
<template>
  <div class="select-cascader-content">
    <el-input
      readonly
      v-model="inputValue"
      class="select-input"
      type="text"
      placeholder="请选择客户来源"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: ""
    };
  }
};
</script>
