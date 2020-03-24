<style lang="less" scoped>
.count-content {
  text-align: center;
  padding: 15px 25px 20px;
  position: absolute;
  bottom: 0;
  z-index: 500;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.8);
    // filter: blur(2px);
  }
  .count-content-title {
    font-size: 18px;
    padding-bottom: 5px;
    color: #656160;
    position: relative;
    z-index: 10;
  }
  .conut-trans {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    position: relative;
    z-index: 10;
    .conut-trans-tips {
      font-size: 15px;
      color: #656160;
      margin-right: 10px;
      white-space: nowrap;
      &:last-child {
        margin-right: 0;
      }
    }
    .conut-trans-data {
      margin-right: 10px;
      width: 30px;
      height: 30px;
      border-radius: 4px;
      text-align: center;
      background: #01575a;
      line-height: 30px;
      overflow: hidden;
      .conut-trans-scroll {
        width: 100%;
        height: 100%;
        transition: all 1s ease-in-out;
        @transToColunm: 0%, 100%, 200%, 300%, 400%, 500%, 600%, 700%, 800%, 900%;
        .loop(@i,@value: extract(@transToColunm, @i+1))
          when
          (@i < length(@transToColunm)) {
          &.trans@{i} {
            transform: translate3d(0, -@value, 0);
          }
          .loop(@i+1);
        }
        .loop(0);
        span {
          font-size: 18px;
          color: #fff;
          display: block;
          border-bottom: 1px solid #fff;
          box-sizing: border-box;
          height: 100%;
        }
      }
    }
  }
}
</style>
<template>
  <div class="count-content">
    <h3 class="count-content-title">距离房源对赌结束</h3>
    <div class="conut-trans">
      <span class="conut-trans-tips">还剩</span>
      <div class="conut-trans-data">
        <div class="conut-trans-scroll"
             :class="['trans'+daysTransAfter]">
          <span v-for="(item,index) in timeItemList"
                :key="index">{{item}}</span>
        </div>
      </div>
      <div class="conut-trans-data">
        <div class="conut-trans-scroll"
             :class="['trans'+daysTransBefore]">
          <span v-for="(item,index) in timeItemList"
                :key="index">{{item}}</span>
        </div>
      </div>
      <span class="conut-trans-tips">天</span>
      <div class="conut-trans-data">
        <div class="conut-trans-scroll"
             :class="['trans'+hoursTransAfter]">
          <span v-for="(item,index) in timeItemList"
                :key="index">{{item}}</span>
        </div>
      </div>
      <div class="conut-trans-data">
        <div class="conut-trans-scroll"
             :class="['trans'+hoursTransBefore]">
          <span v-for="(item,index) in timeItemList"
                :key="index">{{item}}</span>
        </div>
      </div>
      <span class="conut-trans-tips">时</span>
      <div class="conut-trans-data">
        <div class="conut-trans-scroll"
             :class="['trans'+minutesTransAfter]">
          <span v-for="(item,index) in timeItemList"
                :key="index">{{item}}</span>
        </div>
      </div>
      <div class="conut-trans-data">
        <div class="conut-trans-scroll"
             :class="['trans'+minutesTransBefore]">
          <span v-for="(item,index) in timeItemList"
                :key="index">{{item}}</span>
        </div>
      </div>
      <span class="conut-trans-tips">分</span>
      <div class="conut-trans-data">
        <div class="conut-trans-scroll"
             :class="['trans'+secondsTransAfter]">
          <span v-for="(item,index) in timeItemList"
                :key="index">{{item}}</span>
        </div>
      </div>
      <div class="conut-trans-data">
        <div class="conut-trans-scroll"
             :class="['trans'+secondsTransBefore]">
          <span v-for="(item,index) in timeItemList"
                :key="index">{{item}}</span>
        </div>
      </div>
      <span class="conut-trans-tips">秒</span>
    </div>
  </div>
</template>

<script>
let num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export default {
  props: {
    endTime: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      timeItemList: num,
      daysTransAfter: 0,
      daysTransBefore: 0,
      hoursTransAfter: 0,
      hoursTransBefore: 0,
      minutesTransAfter: 0,
      minutesTransBefore: 0,
      secondsTransAfter: 0,
      secondsTransBefore: 0,
      timeID: null
    }
  },
  mounted () {
    this.getTime();
  },
  methods: {
    getTime () {
      let endTime = new Date(this.endTime)
      let nowTime = new Date();
      let time = endTime - nowTime;
      if (time <= 0) {
        //结束了
      } else {

        let days = Math.floor(time / 1000 / 60 / 60 / 24);
        let hours = Math.floor(time / 1000 / 60 / 60 - days * 24);
        let minutes = Math.floor(time / 1000 / 60 - (days * 24 * 60 + hours * 60));
        let second = Math.floor(time / 1000 - (days * 24 * 60 * 60 + hours * 60 * 60) - minutes * 60);
        if (String(days).length == 1) {
          days = '0' + days;
        }
        if (String(hours).length == 1) {
          hours = '0' + hours;
        }
        if (String(minutes).length == 1) {
          minutes = '0' + minutes;
        }
        if (String(second).length == 1) {
          second = '0' + second;
        }
        //Array.prototype.splice.call();
        this.daysTransAfter = Array.from(String(days))[0];
        this.daysTransBefore = Array.from(String(days))[1];
        this.hoursTransAfter = Array.from(String(hours))[0];
        this.hoursTransBefore = Array.from(String(hours))[1];
        this.minutesTransAfter = Array.from(String(minutes))[0];
        this.minutesTransBefore = Array.from(String(minutes))[1];
        this.secondsTransAfter = Array.from(String(second))[0];
        this.secondsTransBefore = Array.from(String(second))[1];
        this.timeID = setTimeout(this.getTime, 1000);
      }
    }
  },
  destroyed () {
    clearTimeout(this.timeID);
  },
}
</script>
