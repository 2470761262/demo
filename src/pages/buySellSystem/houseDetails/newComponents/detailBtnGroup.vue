<style lang="less" scoped>
.detail-btn-group {
  display: flex;
  flex-direction: column;
  border: 1px solid #d5d5d5;
  // prettier-ignore
  margin: 0 8PX 0 13PX;
  .btn-item {
    // prettier-ignore
    width: 100PX;
    // prettier-ignore
    height: 55PX;
    font-size: @font16;
    outline: none;
    border: none;
    background: #fff;
    border-bottom: 1px solid #d5d5d5;
    //transition: background 0.2s ease-in;
    cursor: pointer;
    &.active {
      background: @backgroud;
      color: #fff;
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
<template>
  <div class="detail-btn-group">
    <button
      class="btn-item"
      :class="{ active: activeItem == index }"
      v-for="(item, index) in btnlist"
      :key="item.title"
      :disabled="item.disabled"
      @click="setBtnIndex(index)"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<script>
const BTNLIST = [
  { title: "编辑房源", fun: "", disabled: false },
  { title: "查看电话", fun: "", disabled: false },
  { title: "添加跟进", fun: "", disabled: false },
  { title: "添加面访", fun: "", disabled: false },
  { title: "发布外网", fun: "", disabled: false },
  { title: "转换状态", fun: "", disabled: false },
  { title: "锁定房源", fun: "", disabled: false },
  { title: "关注小区", fun: "", disabled: false },
  { title: "取消角色人", fun: "", disabled: false }
];
export default {
  data() {
    return {
      btnlist: BTNLIST,
      activeItem: -1
    };
  },
  methods: {
    setBtnIndex(index) {
      this.activeItem = index;
    }
  }
};
</script>
