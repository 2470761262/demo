<style lang="less" scoped>
.look-record-content {
  width: 610px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 40px;
  box-sizing: border-box;
  max-height: 710px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  .record-content-title {
    font-size: 18px;
    color: black;
    padding-bottom: 35px;
  }
  .record-content-scroll {
    flex: 1;
    height: 0;
    overflow: auto;
    box-sizing: border-box;
    padding-top: 10px;
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: #999;
      border-radius: 50px;
    }
  }
  .record-content-foot {
    display: flex;
    padding: 0 20px;
    margin: 25px -15px 0;
    .task-button {
      flex: 0 0 calc((100% - 90px) / 3);
      margin: 0 15px;
      /deep/span {
        font-size: 18px;
        color: black;
      }
    }
  }
}

.task-progress-body {
  padding-bottom: 40px;
  .progress-head {
    display: flex;
    align-items: center;
    transform: translateY(-9px);
    .head-tips-chunk {
      margin-right: 36px;
      height: 30px;
      padding: 0 10px;
      font-size: 18px;
      border-radius: 30px;
      color: #fff;
      background: blue;
      line-height: 30px;
    }
    .head-time {
      font-size: 20px;
      color: #666;
    }
  }
  .progress-data-item {
    display: flex;
    margin-top: 15px;
    .data-item-title {
      font-size: 18px;
      color: #666;
      margin-right: 65px;
      flex-shrink: 0;
    }
    .data-item-msg {
      font-size: 18px;
      color: #333;
      word-break: break-all;
    }
  }
}
</style>
<template>
  <div class="look-record-content">
    <h3 class="record-content-title">带看记录</h3>
    <div class="record-content-scroll">
      <left-progress v-for="(item, index) in list" :key="index">
        <template v-slot:default="scope">
          <div class="task-progress-body">
            <div class="progress-head">
              <div
                class="head-tips-chunk"
                :style="{ 'background-color': '#' + scope.color }"
              >
                预约带看
              </div>
              <div class="head-time">{{ item.StartTime }}</div>
            </div>
            <div class="progress-data-item">
              <div class="data-item-title">带看时间:</div>
              <div class="data-item-msg">{{ item.EndTime }}</div>
            </div>
            <div class="progress-data-item">
              <div class="data-item-title">带看楼盘:</div>
              <div class="data-item-msg">{{ item.communityName }}</div>
            </div>
            <div class="progress-data-item">
              <div class="data-item-title">带看总结:</div>
              <div class="data-item-msg">
                {{ item.Memo }}
              </div>
            </div>
          </div>
        </template>
      </left-progress>
    </div>
    <div class="record-content-foot">
      <el-button class="task-button">取消再谈</el-button>
      <el-button class="task-button" @click="openPop('reserveFlag')"
        >预约带看</el-button
      >
      <el-button class="task-button" @click="openPop('beltlookFlag')"
        >添加带看</el-button
      >
    </div>
    <!-- 添加带看 -->
    <add-belt-look
      :visible.sync="beltlookFlag"
      v-if="beltlookFlag"
      title="添加带看"
      style-type="0"
      width="4.63rem"
    >
    </add-belt-look>

    <!-- 预约带看 -->
    <reserve-belt-look
      :visible.sync="reserveFlag"
      v-if="reserveFlag"
      title="预约带看"
      style-type="0"
      width="4.63rem"
    >
    </reserve-belt-look>
  </div>
</template>

<script>
import leftProgress from "../otherCom/leftProgress";
import { mapState, mapMutations } from "vuex";
import moment from "moment";
export default {
  components: {
    leftProgress,
    //添加带看
    addBeltLook: () => import("../../components/addBeltLook"),
    //预约带看
    reserveBeltLook: () => import("../../components/reserveBeltLook")
  },
  data() {
    return {
      list: [],
      reserveFlag: false, //预约带看弹框开关
      beltlookFlag: false // 添加带看弹框开关
    };
  },
  methods: {
    /**
     * @example:统一打开弹框
     * @param {string} popName  弹框对应的名字
     */

    openPop(popName) {
      this[popName] = true;
    }
  },
  watch: {
    detail: {
      deep: true,
      handler(newValue) {
        if (newValue.code == 200) {
          //设置带看进度
          this.list = newValue.data.SalePairOrderTblDtoList;
        } else {
          this.$message({
            type: "info",
            message: newValue.message
          });
        }
      }
    }
  },
  computed: {
    ...mapState({
      detail: value => {
        return value.customers.process.salePairProcess;
      }
    })
  }
};
</script>
