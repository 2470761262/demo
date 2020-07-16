<template>
  <div class="head-nav-type">
    <div
      class="nav-type-item"
      :class="{ active: index == 0 }"
      v-for="(item, index) in navToPage"
      :key="index"
      @click="navToPageBtn(item)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
//跳转tab
const NAVTOPAGE = [
  { title: "买卖", private: true, url: "" },
  { title: "租赁", private: false, url: "" },
  { title: "新房", private: false, url: "" },
  { title: "商铺写字楼", private: false, url: "" },
  { title: "小区", private: false, url: "" }
];
export default {
  data() {
    return {
      navToPage: NAVTOPAGE //顶部跳转tab
    };
  },
  methods: {
    /**
     * @example: 顶部Tab点击
     * @param {Object} item
     */
    navToPageBtn(item) {
      if (!item.private) {
        this.$msgbox({
          title: "开发中",
          message: <div>开发中。。。</div>,
          showCancelButton: false
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.head-nav-type {
  background: #f6f7fb;
  display: flex;
  border-bottom: 1px solid #f0f2f5;
  .nav-type-item {
    font-size: @font16;
    font-weight: 600;
    color: #606266;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    // prettier-ignore
    padding: 12PX 55PX;
    &.active {
      color: @backgroud;
      border-left: 1px solid #f0f2f5;
      border-right: 1px solid #f0f2f5;
      background: #fff;
    }
    &:first-child {
      border-left: none;
    }
    &:last-child {
      border-right: none;
    }
  }
}
</style>
