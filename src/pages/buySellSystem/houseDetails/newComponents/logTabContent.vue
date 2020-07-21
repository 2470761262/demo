<style lang="less" scoped>
.log-content {
  // prettier-ignore
  margin-top: 10PX;
  border: 1px solid #d5d5d5;
  .log-content-head {
    // prettier-ignore
    padding: 0 28PX;
    font-size: @font16;
    display: flex;
    justify-content: space-between;
    // prettier-ignore
    height: 30PX;
    border-bottom: 1px solid #d5d5d5;
    .log-head-item {
      position: relative;
      height: 100%;
      // prettier-ignore
      line-height: 30PX;
      cursor: pointer;
      // prettier-ignore
      padding: 0 10PX;
      &.active {
        color: @backgroud;
        &::after {
          content: "";
          // prettier-ignore
          height: 2PX;
          width: 100%;
          background: @backgroud;
          position: absolute;
          bottom: -1px;
          left: 0;
        }
      }
    }
  }
  .log-tab-content {
    // prettier-ignore
    padding-left: 30PX;
    .log-tab-scroll {
      // prettier-ignore
      padding-top: 30PX;
      max-height: 565px;
      overflow: auto;
      // prettier-ignore
      padding-right: 20PX;
      .item-title {
        font-size: @font16;
        // prettier-ignore
        margin-bottom: 15PX;
      }
      .item-tips {
        display: flex;
        color: #aaaaaa;
        font-size: @font14;
        // prettier-ignore
        margin-bottom: 15PX;
        // &:last-child {
        //   margin-bottom: 0;
        // }
        .item-tips-title {
          // prettier-ignore
          width: 70PX;
          flex-shrink: 0;
        }
        .item-tips-message {
          word-break: break-all;
          text-align: justify;
        }
      }
    }
  }
}
</style>
<template>
  <div class="log-content">
    <div class="log-content-head">
      <div
        class="log-head-item"
        :class="{ active: activeIndex == index }"
        v-for="(item, index) in logTab"
        :key="item.title"
        @click="setTabIndex(item, index)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="log-tab-content">
      <div class="log-tab-scroll">
        <leftProgress>
          <div class="item-title">2020-07-13 11:04:21</div>
          <div class="item-tips">
            <div class="item-tips-title">带看人:</div>
            <div class="item-tips-message">黄少杰(老阴阳人店)</div>
          </div>
          <div class="item-tips">
            <div class="item-tips-title">带看时间:</div>
            <div class="item-tips-message">2020-07-13 9:10:32</div>
          </div>
          <div class="item-tips">
            <div class="item-tips-title">带看总结:</div>
            <div class="item-tips-message">
              客户本来想买房的,觉得我太狗,不想买了妈卖批
            </div>
          </div>
        </leftProgress>
        <leftProgress>
          <div class="item-title">2020-07-13 11:04:21</div>
          <div class="item-tips">
            <div class="item-tips-title">带看人:</div>
            <div class="item-tips-message">黄少杰(老阴阳人店)</div>
          </div>
          <div class="item-tips">
            <div class="item-tips-title">带看时间:</div>
            <div class="item-tips-message">2020-07-13 9:10:32</div>
          </div>
          <div class="item-tips">
            <div class="item-tips-title">带看总结:</div>
            <div class="item-tips-message">
              客户问我建筑房子的人有多少斤。
            </div>
          </div>
        </leftProgress>
        <leftProgress>
          <div class="item-title">2020-07-13 11:04:21</div>
          <div class="item-tips">
            <div class="item-tips-title">带看人:</div>
            <div class="item-tips-message">黄少杰(老阴阳人店)</div>
          </div>
          <div class="item-tips">
            <div class="item-tips-title">带看时间:</div>
            <div class="item-tips-message">2020-07-13 9:10:32</div>
          </div>
          <div class="item-tips">
            <div class="item-tips-title">带看总结:</div>
            <div class="item-tips-message">
              客户问我建筑房子的人家里有多少平方。
            </div>
          </div>
        </leftProgress>
        <leftProgress>
          <div class="item-title">2020-07-13 11:04:21</div>
          <div class="item-tips">
            <div class="item-tips-title">带看人:</div>
            <div class="item-tips-message">黄少杰(老阴阳人店)</div>
          </div>
          <div class="item-tips">
            <div class="item-tips-title">带看时间:</div>
            <div class="item-tips-message">2020-07-13 9:10:32</div>
          </div>
          <div class="item-tips">
            <div class="item-tips-title">带看总结:</div>
            <div class="item-tips-message">
              客户本来想买房的,觉得我太狗,不想买了妈卖批
            </div>
          </div>
        </leftProgress>
      </div>
    </div>
  </div>
</template>

<script>
import leftProgress from "../otherCom/leftProgress";
const LOGTAB = [
  { title: "跟进", listName: "" },
  { title: "带看", listName: "" },
  { title: "语音", listName: "" },
  { title: "面访", listName: "" },
  { title: "日志", listName: "" }
];
export default {
  components: {
    leftProgress
  },
  data() {
    return {
      logTab: LOGTAB,
      activeIndex: 0
    };
  },
  methods: {
    /**
     * @example: 设置当前激活的Index
     * @param {Object} item 当前对象
     * @param {Number} index  当前下标
     */
    setTabIndex(item, index) {
      this.activeIndex = index;
    }
  }
};
</script>
