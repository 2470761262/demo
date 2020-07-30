<style lang="less" scoped>
@import "../newLess/cardContent";
.broker-content {
  // prettier-ignore
  margin-top: 17px;
  .card-content;
  .message-content-cell {
    display: flex;
    font-size: @font14;
    // prettier-ignore
    min-height: 100PX;
    // prettier-ignore
    padding-bottom: 24PX;
    box-sizing: border-box;
    &:first-child {
      // prettier-ignore
      min-height: 65PX;
      // prettier-ignore
      margin-top: 16PX;
    }
    .message-cell-title {
      // prettier-ignore
      width: 130PX;
      font-weight: normal;
      color: #aaaaaa;
      font-size: @font14;
      flex-shrink: 0;
    }
    .message-cell-data {
      word-break: break-all;
      text-align: justify;
      // prettier-ignore
      padding-right: 20PX;
    }
  }
}
</style>
<template>
  <div class="broker-content">
    <div class="card-head">
      <h3 class="card-head-title">经纪人点评</h3>
      <span class="card-head-tips">上次更新: 2020-06-28 21:22:23</span>
    </div>
    <div class="card-message-content">
      <div class="message-content-cell">
        <h3 class="message-cell-title">房源标题</h3>
        <div class="message-cell-data">{{ houseData.Title | emptyRead }}</div>
      </div>
      <div class="message-content-cell">
        <h3 class="message-cell-title">小区介绍</h3>
        <div class="message-cell-data">
          {{ houseData.communityPresentation | emptyRead }}
        </div>
      </div>
      <div class="message-content-cell">
        <h3 class="message-cell-title">户型介绍</h3>
        <div class="message-cell-data">
          {{ houseData.houseTypePresentation | emptyRead }}
        </div>
      </div>
      <div class="message-content-cell">
        <h3 class="message-cell-title">税费解析</h3>
        <div class="message-cell-data">
          {{ houseData.taxParsing | emptyRead }}
        </div>
      </div>
      <div class="message-content-cell">
        <h3 class="message-cell-title">核心卖点</h3>
        <div class="message-cell-data">
          {{ houseData.coreSellingPoint | emptyRead }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      houseData: state => state.houseDateil.houseData
    })
  }
};
</script>
