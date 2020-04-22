
<style lang="less" scoped>
.progress-content {
  // display: flex;
  border: 1px solid #ebeef5;
  padding: 10px;
  box-sizing: border-box;
  align-self: flex-start;
  min-width: 230px;
  border-radius: 4px;
  .progress-header {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .progress-header-num,
    .progress-header-compare {
      display: flex;
      flex-direction: column;
    }
    .progress-header-num {
      span:nth-child(1) {
        font-size: 15px;
        color: #555555;
      }
      span:nth-child(2) {
        font-size: 20px;
        color: black;
        margin-top: 4px;
        line-height: 1;
      }
    }
    .progress-header-compare {
      background: var(--color--primary);
      border-radius: 4px;
      text-align: center;
      padding: 0px 7px;
      span {
        color: #fff;
      }
      span:nth-child(1) {
        font-size: 13px;
      }
      span:nth-child(2) {
        font-size: 16px;
      }
    }
  }
  .progress-warp {
    background: #d8dfe4;
    height: 2px;
    margin-top: 20px;
    .progress-back {
      background: var(--color--primary);
      width: 0%;
      min-width: 8px;
      height: 100%;
      position: relative;
      transition: width 0.4s linear;
      color: var(--color--primary);
      .progress-back-span {
        position: absolute;
        border-width: 4px;
        border-style: solid;
        border-top-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: var(--color--primary);
        top: -8px;
        right: 0;
      }
      &::before {
        content: attr(data-progress);
        color: inherit;
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(100%, -100%);
      }
      &.set-num-Direction {
        &::before {
          transform: translate(-8px, -100%);
        }
      }
    }
  }
  .progress-content-tips {
    margin-top: 10px;
    font-size: 13px;
    color: #98a3a8;
  }
}
</style>
<template>
  <section class="progress-content">
    <div class="progress-header">
      <div class="progress-header-num">
        <span>{{title}}</span>
        <span>{{houseNum}}套</span>
      </div>
      <div class="progress-header-compare"
           :style="{background:changeBack}">
        <span>较昨日</span>
        <span>{{compare | isGrZero}}</span>
      </div>
    </div>
    <div class="progress-warp">
      <div class="progress-back"
           :class="{'set-num-Direction':progressNumDirection}"
           :style="{width:progress,background:changeBack,color:changeBack}"
           :data-progress="progress">
        <span class="progress-back-span"
              :style="{borderBottomColor:changeBack}"></span>
      </div>
    </div>
    <div class="progress-content-tips">{{proportion}}</div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "跟单数"
    },
    proportion: {
      type: String,
      default: "占比"
    },
    progress: {
      type: String,
      default: "0%"
    },
    houseNum: {
      type: [Number, String],
      default: 0
    },
    compare: {
      type: Number,
      default: 0
    },
    resetProgress: {
      type: Boolean,
      default: false
    },
    progressBackList: {
      type: Array,
      default: () => [10, 20, 100]
    },
    progressBackRule: {
      type: Array,
      default: () => ["#eb0100", "#fbb761", "#12824d"]
    }
  },
  computed: {
    progressNumDirection () {
      return parseInt(this.progress) > 95 ? true : false;
    },
    changeBack () {
      if (this.resetProgress) {
        const num = parseInt(this.progress);
        const findIndex = this.progressBackList.findIndex(item => num <= item);
        return this.progressBackRule[findIndex];
      }
      return "var(--color--primary)";
    }
  },
  filters: {
    isGrZero (value) {
      if (value >= 0) {
        return "+" + value;
      }
      return value;
    }
  }
};
</script>
