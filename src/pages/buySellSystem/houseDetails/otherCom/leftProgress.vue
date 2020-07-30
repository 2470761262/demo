<style lang="less" scoped>
.leftProgress-content {
  position: relative;
  // prettier-ignore
  padding: 0 0 30PX 22PX;
  &-0a8c39 {
    .setColor(#0a8c39);
  }
  &-3b6edc {
    .setColor(#090a0c);
  }
  &::after {
    content: "";
    // prettier-ignore
    width: 8PX;
    // prettier-ignore
    height: 8PX;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    border-radius: 50%;
  }
  &::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    left: 4px;
    background: #edf4ff;
  }
  .leftProgress-content-body {
    // prettier-ignore
    transform: translateY(-6PX);
  }
}
.setColor(@color) {
  &::after {
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
      default: "0a8c39"
    }
  }
};
</script>
