<style lang="less" scoped>
.sticky-content {
  display: flex;
  // prettier-ignore
  margin-top: 28PX;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
  .sticky-item {
    font-size: @font16;
    flex: 1;
    // prettier-ignore
    padding: 7PX 0;
    text-align: center;
    box-sizing: border-box;
    font-weight: 500;
    cursor: pointer;
    &.active {
      background: @backgroud;
      color: #fff;
      .sticky-item-pad {
        border: none;
      }
    }
    &:last-child {
      .sticky-item-pad {
        border: none;
      }
    }
    .sticky-item-pad {
      padding: 8px 0;
      border-right: 1px solid #d5d5d5;
    }
  }
}
</style>
<template>
  <div class="sticky-content">
    <div
      class="sticky-item"
      :class="{ active: index == 0 }"
      v-for="(item, index) in stickyList"
      :key="item.title"
    >
      <div class="sticky-item-pad">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
const STICKYLIST = [
  { title: "维护信息", dom: "" },
  { title: "经纪人点评", dom: "" },
  { title: "实勘信息", dom: "" },
  { title: "角色人申请", dom: "" },
  { title: "历史轨迹", dom: "" }
];
export default {
  data() {
    return {
      stickyList: STICKYLIST
    };
  }
};
</script>
