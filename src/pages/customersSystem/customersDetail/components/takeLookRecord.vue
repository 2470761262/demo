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
      flex: 0 0 calc((100% - 90px) / 2);
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
      <left-progress v-for="(item, index) in list" :key="index" color="3b6edc">
        <template v-slot:default="scope">
          <div class="task-progress-body">
            <div class="progress-head">
              <div
                class="head-tips-chunk"
                :style="{ 'background-color': '#' + scope.color }"
              >
                带看记录
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
      <el-button
        v-if="cancelTalkingButton"
        class="task-button"
        @click="openPop('talkingFlag')"
        >取消再谈</el-button
      >
      <el-button
        v-if="addTalkingButton"
        class="task-button"
        @click="openPop('addTalkingFlag')"
        >添加再谈</el-button
      >
      <!-- <el-button class="task-button" @click="openPop('reserveFlag')"
        >预约带看</el-button
      > -->
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
      v-bind:customerId="currentClickCustomerId"
      @progressData="progressData"
    >
    </add-belt-look>

    <!-- 预约带看 -->
    <!-- <reserve-belt-look
      :visible.sync="reserveFlag"
      v-if="reserveFlag"
      title="预约带看"
      style-type="0"
      width="4.63rem"
    >
    </reserve-belt-look> -->

    <!-- 取消再谈 -->
    <cancel-talking
      :visible.sync="talkingFlag"
      v-if="talkingFlag"
      style-type="0"
      title="取消再谈"
      width="3.28rem"
      @transmitConfirm="cancelTalkingTransmit"
    >
    </cancel-talking>

    <!-- 添加再谈 -->
    <add-talking
      :visible.sync="addTalkingFlag"
      v-if="addTalkingFlag"
      style-type="0"
      title="添加再谈"
      width="3.28rem"
      @transmitConfirm="addTalkingTransmit"
    >
    </add-talking>
  </div>
</template>

<script>
import leftProgress from "../otherCom/leftProgress";
import { mapState, mapMutations } from "vuex";
import moment from "moment";
import util from "@/util/util";
export default {
  components: {
    leftProgress,
    //添加带看
    addBeltLook: () => import("../../components/addBeltLook"),
    //预约带看
    // reserveBeltLook: () => import("../../components/reserveBeltLook")
    //取消再看
    cancelTalking: () => import("../didLog/cancelTalking"),
    //添加再看
    addTalking: () => import("../didLog/addTalking")
  },
  data() {
    return {
      list: [],
      // reserveFlag: false, //预约带看弹框开关
      beltlookFlag: false, // 添加带看弹框开关
      talkingFlag: false, //取消再看弹窗开关
      addTalkingFlag: false,
      cancelTalkingButton: true, //取消再谈按钮是否显示
      addTalkingButton: false, //添加再谈按钮是否显示
      currentClickCustomerId: 0
    };
  },
  methods: {
    reloadAjax() {
      let _that = this;
      let obj = this.detail.data.saleCusPropertyTbl;
      //重新获取数据
      _that.$api
        .post({
          url: "/saleCustomerDetail/getSalePairProcess",
          data: { id: obj.Eid },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          console.log("带客看房进度以及記錄---------------------", e);
          if (result.code == 200) {
            //result.data.pageSum
            this.$store.commit("updateProcess", {
              salePairProcess: result
            });
            //关闭取消再谈弹出框
            _that.talkingFlag = false;
          }
        })
        .catch(e => {
          console.log("获取带客看房进度失败");
          console.log(e);
        })
        .finally(() => {});
    },
    //添加带看后的处理
    progressData() {
      this.reloadAjax();
    },
    /**
     * @example:统一打开弹框
     * @param {string} popName  弹框对应的名字
     */

    openPop(popName) {
      this[popName] = true;
    },
    //取消再谈提交
    cancelTalkingTransmit() {
      let _that = this;
      let obj = this.detail.data.saleCusPropertyTbl;
      _that.$api
        .post({
          url: "/saleCustomerDetail/updateTalking",
          data: { id: obj.id, Eid: obj.Eid, isBuy: 0 },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          console.log("takeLookRecord.vue------------", "取消再谈结果", e);
          if (result.code == 200) {
            _that.reloadAjax();
          }
        })
        .catch(e => {
          console.log("takeLookRecord.vue------------", "取消再谈失败");
          console.log("takeLookRecord.vue------------", e);
        })
        .finally(() => {});
    },
    //添加再谈提交
    addTalkingTransmit() {
      let _that = this;
      let obj = this.detail.data.saleCusPropertyTbl;
      _that.$api
        .post({
          url: "/saleCustomerDetail/updateTalking",
          data: { id: obj.id, Eid: obj.Eid, isBuy: 3 },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          console.log("takeLookRecord.vue------------", "添加再谈结果", e);
          if (result.code == 200) {
            //重新获取数据
            _that.$api
              .post({
                url: "/saleCustomerDetail/getSalePairProcess",
                data: { id: obj.Eid },
                headers: { "Content-Type": "application/json" }
              })
              .then(e => {
                let result = e.data;
                console.log("带客看房进度以及記錄", e);
                if (result.code == 200) {
                  //result.data.pageSum
                  this.$store.commit("updateProcess", {
                    salePairProcess: result
                  });
                  //关闭取消再谈弹出框
                  _that.addTalkingFlag = false;
                }
              })
              .catch(e => {
                console.log("获取带客看房进度以及記錄失败");
                console.log(e);
              })
              .finally(() => {});
          }
        })
        .catch(e => {
          console.log("takeLookRecord.vue------------", "取消再谈失败");
          console.log("takeLookRecord.vue------------", e);
        })
        .finally(() => {});
    }
  },
  watch: {
    detail: {
      deep: true,
      handler(newValue) {
        if (newValue.code == 200) {
          //设置带看进度
          this.list = newValue.data.SalePairOrderTblDtoList;
          //设置customerId 客户id
          this.currentClickCustomerId = newValue.data.bsAgentCustomersTbl.id;
          //设置显示取消再谈按钮还是显示添加再谈
          let saleCusPropertyTbl = newValue.data.saleCusPropertyTbl;
          let isBuy = saleCusPropertyTbl.isBuy;
          console.log(
            "takeLookRecord.vue------------saleCusPropertyTbl",
            saleCusPropertyTbl
          );
          if (isBuy != 0) {
            this.cancelTalkingButton = true;
            this.addTalkingButton = false;
          }
          if (isBuy == 0) {
            this.cancelTalkingButton = false;
            this.addTalkingButton = true;
          }
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
