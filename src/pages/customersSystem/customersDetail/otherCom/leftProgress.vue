<style lang="less" scoped>
.leftProgress-content {
  position: relative;
  padding-left: 30px;
  &-fb5554 {
    .setColor(#fb5554);
  }
  &-3b6edc {
    .setColor(#3b6edc);
  }
  &::after {
    content: "";
    width: 12px;
    height: 12px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    border-radius: 50%;
  }
  &::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 100%;
    top: 0;
    left: 5px;
  }
}
.setColor(@color) {
  &::after,
  &::before {
    background: @color;
  }
}
</style>
<template>
  <div class="leftProgress-content" :class="'leftProgress-content-' + color">
    <div class="leftProgress-content-body">
      <slot :color="color"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "fb5554"
    }
  }
};
</script>
