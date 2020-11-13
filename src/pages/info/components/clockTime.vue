<style lang="less" scoped>
.clock-time {
  width: 292px;
  //margin-left: 24px;
  background: #ffffff;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
  .clock-time-head {
    height: 97px;
    padding: 22px 0 0 34px;
    box-sizing: border-box;
    line-height: 1;
    position: relative;
    .week-head {
      font-size: @font18;
      font-weight: bold;
      position: relative;
      z-index: 1;
      color: #ffffff;
    }
    .time-tips {
      margin-top: 8px;
      font-size: @font16;
      font-weight: bold;
      position: relative;
      z-index: 1;
      color: #ffffff;
      line-height: 21px;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .clock-foot {
    height: 115px;
    background: #fff;
    overflow: hidden;
    padding: 0 15px;
    .paragraph {
      margin-top: 28px;
      font-size: @font14;
      color: #606266;
      height: 43px;
    }
    .affiliation {
      text-align: right;
      padding-right: 11px;
      color: #606266;
      font-size: @font14;
    }
  }
}
</style>
<template>
  <div class="clock-time">
    <div class="clock-time-head">
      <img :src="backImage" alt="" />
      <div class="week-head">{{ weekHead }}</div>
      <div class="time-tips">{{ currentTime }}</div>
    </div>
    <div class="clock-foot">
      <div class="paragraph">“Stay hungry、Stay foolish”</div>
      <div class="affiliation">——史蒂夫·乔布斯</div>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  created() {
    this.getCurrentTime();
    this.getWeekHead();
  },
  data() {
    return {
      currentTime: util.format(new Date(), "hh:mm:ss"),
      timeId: null,
      weekHead: "",
      backImage: "https://img.0be.cn/pc/day.png"
    };
  },
  methods: {
    getCurrentTime() {
      this.currentTime = util.format(new Date(), "hh:mm:ss");
      this.timeId = setTimeout(this.getCurrentTime, 1000);
    },
    getWeekHead() {
      const nowTime = new Date();
      const hour = nowTime.getHours();
      const WeekList = ["日", "一", "二", "三", "四", "五", "六"];
      const week = "周" + WeekList[nowTime.getDay()];
      let prompt = "";
      if (hour > 4 && hour < 12) {
        prompt = "早上好";
      } else if (hour > 12 && hour < 14) {
        prompt = "中午好";
      } else if (hour >= 14 && hour < 18) {
        prompt = "下午好";
      } else {
        prompt = "晚上好";
        this.backImage = "https://img.0be.cn/pc/night.png";
      }

      this.weekHead = week + "，" + prompt + "！";
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeId);
  }
};
</script>
