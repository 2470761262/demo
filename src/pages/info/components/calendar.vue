<style lang="less" scoped>
.calendar-content {
  background: #fff;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
  .calendar-head {
    height: 84px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .change-item {
      border: 0;
      outline: none;
      background: transparent;
      cursor: pointer;
      padding: 0;
      span {
        font-size: @font16;
        color: #606266;
      }
    }
    .head-time {
      text-align: center;
      line-height: 1;
      .head-time-month {
        font-size: @font16;
        color: #303133;
        font-weight: bold;
      }
      .head-time-year {
        font-size: @font12;
        color: #606266;
        margin-top: 8px;
      }
    }
  }
  .calendar-data {
    padding: 0 6px;
    .calendar-data-week {
      display: flex;
      .cell-item {
        flex: 0 0 100% / 7;
        text-align: center;
        height: 40px;
        line-height: 40px;
        color: #909399;
      }
    }
    .calendar-time {
      display: flex;
      flex-wrap: wrap;
      .cell-item {
        .calendar-data-week >.cell-item;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        line-height: 1;
        user-select: none;
        .text {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: block;
          margin: 0 auto;
          line-height: 28px;
          cursor: pointer;
          transition: all 0.2s;
          &.is-interval {
            background: @opacityBackground;
            border-radius: 0;
            width: 100%;
          }
          &.not-select {
            color: #909399;
            cursor: default;
            //cursor: not-allowed;
          }
          &.disabled {
            background: #f5f7fa;
            color: #c0c4cc;
            cursor: not-allowed;
          }
          &.highlight {
            font-weight: bold;
            color: #303133;
          }
          &:hover {
            color: @backgroud;
          }
          &.active {
            background: @backgroud;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="calendar-content">
    <div class="calendar-head">
      <button class="change-item" @click="prevYear">
        <span class="iconbianzu3 iconfont"></span>
      </button>
      <div class="head-time">
        <div class="head-time-month">{{ month }}月</div>
        <div class="head-time-year">{{ year }}年</div>
      </div>
      <button class="change-item" @click="afterYear">
        <span class="iconbianzu13 iconfont"></span>
      </button>
    </div>
    <div class="calendar-data">
      <div class="calendar-data-week">
        <div class="cell-item" v-for="item in Week" :key="item">{{ item }}</div>
      </div>
      <div
        class="calendar-time"
        v-loading="loading"
        :element-loading-text="loadingText"
      >
        <!-- 上个月 -->
        <div
          class="cell-item "
          v-for="item in beforeMonthList"
          :key="item.day + 'before'"
        >
          <span
            class="text not-select"
            :class="item.class"
            :style="item.style"
            >{{ item.day }}</span
          >
          <slot name="dots" :col="item" type="before"></slot>
        </div>
        <!-- 当前月 -->
        <div
          class="cell-item"
          v-for="item in currentMonthList"
          :key="item.day + 'current'"
          @click="checkTime(item)"
        >
          <span
            class="text"
            :class="[
              {
                active: checkResultTime.includes(item.time),
                disabled: item.disabled
              },
              item.class
            ]"
            :style="item.style"
            >{{ item.day }}</span
          >
          <slot name="dots" :col="item" type="current"></slot>
        </div>
        <!-- 下个月 -->
        <div
          class="cell-item "
          :class="item.class"
          v-for="item in afterMonthList"
          :key="item.day + 'after'"
        >
          <span
            class="text not-select"
            :class="item.class"
            :style="item.style"
            >{{ item.day }}</span
          >
          <slot name="dots" :col="item" type="after"></slot>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <slot name="foot"></slot>
  </div>
</template>

<script>
import util from "@/util/util";

const Week = ["日", "一", "二", "三", "四", "五", "六"];

//格子的总数
const gridCount = 42;

/**
 * @example: 获取当前月多少天
 */
function getDate(year, month) {
  return new Date(year, month, 0).getDate();
}

/**
 * @example: 填充
 */
function fill(fillCount, callback) {
  if (callback) {
    return new Array(fillCount).fill().map(callback);
  }
  return new Array(fillCount).fill().map((v, i) => {
    return {
      day: i + 1
    };
  });
}

/**
 * @example: 处理计算边界
 */
function computedTime(year, month, day) {
  if (month > 12) {
    year + 1;
  } else if (month == 0) {
    month = 12;
    year--;
  }
  return util.format(`${year}-${month}-${day}`, "yyyy-MM-dd");
}

/**
 * @example: 比较时间大小
 */
function compareTime(after, before, bool) {
  if (!bool) {
    return Date.parse(after, before) > Date.parse(before);
  }
  return Date.parse(after, before) < Date.parse(before);
}
//保存当前日期实例
const nowData = new Date();

//或者当前实现的实例
const readDate = new Date();

export default {
  props: {
    //是否显示加载中
    loading: {
      type: Boolean,
      default: false
    },
    //是否可以勾选之后为空,
    isEmpty: {
      type: Boolean,
      default: true
    },
    //加载提示语
    loadingText: {
      type: String,
      default: "加载中..."
    },
    before: Array, //之前合并属性
    current: Array, //当前合并属性
    after: Array, //之后合并属性
    value: {
      // value的格式为 YYYY-MM-DD 不可变 其他格式需要在传递之前做处理
      type: [String, Array],
      validator(value) {
        value = Array.isArray(value) ? value : [value];
        value.forEach(v => {
          if (v && new Date(v).toString() === "Invalid Date") {
            throw new Error(
              "calendar directive v-model value not transition Date Error (" +
                value +
                ")"
            );
          }
        });
        return true;
      }
    },
    /**
     * @example: 选择类型
     *  multiple    多选
     *  single      单选
     *  interval    区间
     */
    choice: {
      type: String,
      default: "single"
    }
  },
  data() {
    return {
      Week: Week, //头部
      year: 0, //当前年
      month: 0, //当前月
      day: 0, //当前天
      beforeMonthList: [], //当前月填充前数组
      currentMonthList: [], //当前数组
      afterMonthList: [], //当前月填充之后数组
      checkResultTime: [] //选择结果
    };
  },
  created() {
    this.getDate(nowData);

    this.watchWalk();
  },
  methods: {
    /**
     * @example: 监听合并属性变化
     */
    watchWalk() {
      ["before", "current", "after"].forEach(key => {
        this.$watch(key, this.initDate, {
          deep: true
        });
      });
      this.$watch(
        "value",
        (value, ordValue) => {
          if (value) {
            if (Array.isArray(value)) {
              //如果传入是数组 则把所有元素都格式化
              this.checkResultTime = value.map(v =>
                util.format(v, "yyyy-MM-dd")
              );
            } else {
              //格式化传入时间
              this.checkResultTime = [util.format(value, "yyyy-MM-dd")];
            }
            //只有第一次初始化时去更新时间
            if (this.choice == "interval" && !ordValue && value.length == 2)
              this.setIntervalItemClass();
          } else {
            if (!ordValue) {
              //没传则设置今天为默认选中
              this.checkResultTime = [util.format(readDate, "yyyy-MM-dd")];
            }
          }
        },
        {
          immediate: true
        }
      );
    },
    /**
     * @example:多选
     */
    multipleSelect(item) {
      /**
       * 都看到这里了,代表你需要,那就你来实现把。
       */
      if (this.checkResultTime.includes(item.time)) {
        const filterList = this.checkResultTime.filter(v => v != item.time);

        if (filterList.length == 0 && !this.isEmpty) {
          this.checkResultTime = [item.time];
        } else {
          this.checkResultTime = filterList;
        }
      } else {
        this.checkResultTime.push(item.time);
      }
      this.$emit("input", this.checkResultTime);
    },
    /**
     * @example: 单选
     */
    singleSelect(item) {
      if (this.isEmpty) {
        this.checkResultTime.includes(item.time)
          ? (this.checkResultTime = [])
          : (this.checkResultTime = [item.time]);
      } else {
        if (!this.checkResultTime.includes(item.time)) {
          this.checkResultTime = [item.time];
        } else {
          return;
        }
      }

      this.$emit("input", this.checkResultTime.join(""));
    },
    /**
     * @example: 选择时间
     */
    checkTime(item) {
      if (item.disabled) return;

      switch (this.choice) {
        case "multiple": //多选
          this.multipleSelect(item);
          break;
        case "single": //单选
          this.singleSelect(item);
          break;
        case "interval": //区间
          //区间选择将会执行下面的change通知
          //在intervalSelect方法内判断是否需要执行change
          this.intervalSelect(item);
          return;
      }

      //change通知this.checkResultTime将不转换格式直接输出数组
      this.$emit("change", this.checkResultTime);
    },
    /**
     * @example: 区间
     */
    intervalSelect(item) {
      if (!Array.isArray(this.checkResultTime)) this.checkResultTime = [];

      if (this.checkResultTime.length == 2) {
        this.checkResultTime = [item.time];
      } else if (this.checkResultTime.length < 2) {
        if (compareTime(item.time, this.checkResultTime, true)) {
          this.checkResultTime.unshift(item.time);
        } else {
          this.checkResultTime.push(item.time);
        }
      }

      // 设置区间样式
      this.setIntervalItemClass();

      if (this.checkResultTime.length == 2) {
        this.$emit("input", this.checkResultTime);
        this.$emit("change", this.checkResultTime);
      }
    },
    /**
     * @example: 设置区间样式
     */
    setIntervalItemClass() {
      this.beforeMonthList = this.beforeMonthList.map(
        this.compareTimeInitMonthList
      );

      this.currentMonthList = this.currentMonthList.map(
        this.compareTimeInitMonthList
      );

      this.afterMonthList = this.afterMonthList.map(
        this.compareTimeInitMonthList
      );
    },
    /**
     * @example: 比较是否时间在区间内
     */
    compareTimeInitMonthList(v) {
      if (
        compareTime(v.time, this.checkResultTime[0], false) &&
        compareTime(v.time, this.checkResultTime[1], true)
      ) {
        //如果已经有默认数组了直接添加
        if (v.class) v.class.push("is-interval");
        else v.class = ["is-interval"]; //没有默认数组
      } else {
        if (v.class) v.class = v.class.filter(v => v != "is-interval");
      }

      return v;
    },
    /**
     * @example: 下一个月
     */

    afterYear() {
      if (this.month + 1 <= 12) {
        nowData.setMonth(this.month);
      } else {
        nowData.setFullYear(nowData.getFullYear() + 1);
        nowData.setMonth(0);
      }
      this.getDate(nowData);
    },
    /**
     * @example: 上一个月
     */
    prevYear() {
      if (this.month - 1 > 0) {
        nowData.setMonth(this.month - 2);
      } else {
        nowData.setFullYear(nowData.getFullYear() - 1);
        nowData.setMonth(11);
      }
      this.getDate(nowData);
    },
    /**
     * @example: 获得今天的日期
     */
    getDate(date) {
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
      this.initDate();
      //切换为当前选择的区间月时重置计算
      if (this.choice == "interval") this.setIntervalItemClass();
    },
    getWeekDay(year, month, day) {
      return new Date(`${year}/${month}/${day}`).getDay();
    },
    initDate() {
      // 获得当前月份1号是星期几
      const firstDay = this.getWeekDay(this.year, this.month, 1);

      // 获得上个月多少天
      const afterDay = getDate(this.year, this.month - 1);

      //填充上个月
      this.beforeMonthList = fill(firstDay, (v, i) => {
        const day = afterDay - i;
        //合并传递属性
        let filterMerge = this.before
          ? JSON.parse(
              JSON.stringify(this.before.filter(b => b.day == day)[0] || {})
            )
          : {};

        return {
          day,
          time: computedTime(this.year, this.month - 1, day),
          ...filterMerge
        };
      }).reverse();

      //填充当前月
      this.currentMonthList = fill(getDate(this.year, this.month), (v, i) => {
        const day = i + 1;
        //合并传递属性
        let filterMerge = this.current
          ? JSON.parse(
              JSON.stringify(this.current.filter(b => b.day == day)[0] || {})
            )
          : {};

        //计算现实当前年月小于当前天之前的天数高亮
        if (
          this.year == readDate.getFullYear() &&
          this.month == readDate.getMonth() + 1 &&
          day < readDate.getDate()
        ) {
          try {
            filterMerge.class
              ? filterMerge.class.push("highlight")
              : (filterMerge.class = ["highlight"]);
          } catch (e) {
            console.warn(
              "component calendar props current option class need Array"
            );
          }
        }
        return {
          day,
          time: computedTime(this.year, this.month, day),
          ...filterMerge
        };
      });

      //计算下个月填充多少
      const afterCount =
        gridCount -
        (this.beforeMonthList.length + this.currentMonthList.length);
      this.afterMonthList = fill(afterCount, (v, i) => {
        const day = i + 1;
        //合并传递属性
        let filterMerge = this.after
          ? JSON.parse(
              JSON.stringify(this.after.filter(b => b.day == day)[0] || {})
            )
          : {};
        return {
          day,
          time: computedTime(this.year, this.month + 1, day),
          ...filterMerge
        };
      });
    }
  }
};
</script>
