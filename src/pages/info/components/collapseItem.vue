<style lang="less" scoped>
.collapseItem-content {
  margin-top: 24px;
  &:first-child {
    margin-top: 0;
  }
  .collapseItem-head {
    display: flex;
    height: 66px;
    background: #ffffff;
    box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
    border-radius: 8px;
    align-items: center;
    padding: 0 24px;
    justify-content: space-between;
    line-height: 1;
    cursor: pointer;
    .collapseItem-text {
      color: #303133;
      font-weight: bold;
      font-size: @font18;
    }
    .el-icon-arrow-right {
      font-size: @font18;
      color: #606266;
    }
  }
}
</style>
<template>
  <div class="collapseItem-content">
    <div class="collapseItem-head" @click="toggleIsShow" v-show="!isShow">
      <div class="collapseItem-text">{{ this.title }}</div>
      <div class="el-icon-arrow-right"></div>
    </div>
    <el-collapse-transition>
      <div class="collapseItem-warp" v-show="isShow">
        <slot></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  props: {
    sign: [String, Number],
    title: String
  },
  inject: ["instance"],
  computed: {
    isShow: {
      get() {
        return this.instance.value == this.sign;
      },
      set(value) {
        this.instance.$emit("change", value);
      }
    }
  },
  methods: {
    toggleIsShow() {
      this.isShow = this.sign;
    }
  }
};
</script>
