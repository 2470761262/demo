<style lang="less" scoped>
.cascader-content {
  //  position: relative;
  .cascader-content-head {
    display: flex;
    height: 45px;
    background: #f2f2f2;
    border-radius: 30px;
    overflow: hidden;
    padding: 0 10px;
    box-sizing: border-box;
    align-items: center;
    position: relative;
    z-index: 5;
    border: 1px solid #eae8e4;
    .head-icon {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      background: #fff;
    }
  }
  .cascader-content-foot {
    width: 100%;
    margin-top: -15px;
    padding-top: 15px;
    border: 2px solid #ddd;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    box-sizing: border-box;
    display: flex;
    background: #f1f1f1;
    overflow: hidden;
  }
}
</style>
<template>
  <div class="cascader-content">
    <div class="cascader-content-head">
      <div class="head-icon"></div>
      <slot name="head"></slot>
    </div>
    <div class="cascader-content-foot" v-show="downUlFlag">
      <slot name="fool"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["downUlFlag"]
};
</script>
