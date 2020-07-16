<style lang="less" scoped>
.sticky-content {
  display: flex;
  margin-top: 28px;
  padding: 8px 0;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  .sticky-item {
    font-size: @font16;
    flex: 1;
    padding: 7px 0;
    text-align: center;
    border-right: 1px solid #d5d5d5;
    box-sizing: border-box;
    font-weight: 500;
    cursor: pointer;
    &.active {
      background: @backgroud;
      color: #fff;
    }
    &:last-child {
      border: none;
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
      :key="item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
const STICKYLIST = [
  "维护信息",
  "经纪人点评",
  "实勘信息",
  "角色人申请",
  "历史轨迹"
];
export default {
  data() {
    return {
      stickyList: STICKYLIST
    };
  }
};
</script>
