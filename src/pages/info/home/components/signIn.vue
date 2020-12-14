<style lang="less" scoped>
.clock-in {
  background: #ffffff;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
  position: relative;
  // height: 518px;
  padding-bottom: 16px;
  overflow: hidden;
  line-height: 1;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 225px;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(53, 183, 170, 0.17) 0%,
      rgba(24, 129, 113, 0) 100%
    );
  }
  .clock-posi {
    position: relative;
    padding-bottom: 24px;
    .clock-qr {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 8px 8px 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 25px;
      box-sizing: border-box;
      backdrop-filter: blur(2px);
      .refresh-qr {
        color: @backgroud;
        text-align: center;
        margin-top: 24px;
        cursor: pointer;
        font-size: 0;
        div {
          font-size: @font14;
          display: inline-block;
          span {
            margin-right: 8px;
          }
        }
      }
      .close-qr {
        position: absolute;
        font-size: @font18;
        top: 24px;
        right: 24px;
        color: #606266;
        cursor: pointer;
      }

      .clock-qr-tips {
        font-size: @font18;
        color: #303133;
        font-weight: bold;
        margin-top: 18px;
      }
      .posi-center {
        position: relative;
        .tips-refresh {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: @font14;
          color: #606266;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(2px);
        }
      }
    }
    .change-clock {
      padding-top: 4px;
      height: 26px;
      padding-right: 6px;
      display: flex;
      justify-content: flex-end;
      position: relative;
      z-index: 1;
      .qr-tips {
        height: 26px;
        background: #ffffff;
        box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
        width: 125px;
        margin-right: 8px;
        text-align: center;
        line-height: 26px;
        position: relative;
        font-size: @font12;
        color: #303133;
        animation: loopImg 1s infinite alternate;
        @keyframes loopImg {
          0% {
            right: 0;
          }
          100% {
            right: -6px;
          }
        }
        &::after {
          content: "";
          position: absolute;
          border: 4px solid transparent;
          border-left-color: #fff;
          right: 0;
          top: 50%;
          transform: translate(100%, -50%);
        }
      }
      .qr-change {
        width: 26px;
        height: 100%;
        cursor: pointer;
      }
    }
    .per-data {
      position: relative;
      z-index: 1;
      margin-top: 6px;
      text-align: center;
      img {
        border-radius: 50%;
        width: 96px;
        height: 96px;
      }
      h3 {
        color: #303133;
        font-size: 28px;
        margin-top: 18px;
        .iconbianzu15 {
          font-weight: normal;
          color: @backgroud;
          cursor: pointer;
        }
      }
      h4 {
        color: #606266;
        font-size: @font16;
        margin-top: 16px;
        font-weight: normal;
      }
    }
    .clock-pad {
      padding: 0 24px;
      margin-top: 24px;
      .navto-color {
        background: #f8f8f9;
        border-radius: 4px;
        padding: 12px;
        .summary-tips {
          line-height: 24px;
          font-size: 14px;
          color: #909399;
        }
        button {
          margin-top: 16px;
          outline: none;
          background: @backgroud;
          color: #fff;
          height: 36px;
          background: #247257;
          border-radius: 4px;
          border: 0;
          width: 100%;
          cursor: pointer;
        }
      }
    }
  }
  .split-line {
    margin: 0px 24px 0;
    height: 1px;
    background: #f0f2f5;
  }
  .help-title {
    color: #303133;
    font-size: @font18;
    margin: 24px 0 18px;
    padding-left: 24px;
  }
  .help-btn-group {
    display: flex;
    .help-btn-item {
      flex: 1;
      text-align: center;
      font-size: 0;
      .click-area {
        display: inline-block;
        cursor: pointer;
        div {
          margin-top: 9px;
          font-size: @font14;
          color: #303133;
        }
      }
    }
  }
}
.help-box {
  margin-top: 42px;
  .help-ask {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .ask-icon {
      font-size: @font14;
      width: 24px;
      height: 24px;
      line-height: 24px;
      background: #0a6458;
      border-radius: 50%;
      color: #fff;
      text-align: center;
    }
    .ask-title {
      font-size: @font16;
      font-weight: bold;
      margin-left: 8px;
    }
  }
  .help-answer {
    display: flex;
    margin-bottom: 24px;
    .answer-icon {
      display: inline-block;
      margin-top: 10px;
      font-size: @font14;
      width: 24px;
      height: 24px;
      line-height: 24px;
      background: #f69e28;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      flex-shrink: 0;
    }
    .answer-text {
      display: inline-block;
      padding: 10px;
      margin-left: 8px;
      font-size: @font14;
      color: #606266;
      line-height: 24px;
      background: #f7f7f9;
      border-radius: 4px;
    }
  }
}
</style>

<template>
  <div class="clock-in">
    <div class="clock-posi">
      <div class="clock-qr" v-if="showQr">
        <div class="close-qr el-icon-close" @click="changeQr(false)"></div>
        <div class="posi-center">
          <div id="qr"></div>
          <div class="tips-refresh" v-if="tipsRefresh">二维码过期,请刷新</div>
        </div>
        <div class="clock-qr-tips">手机微信扫码签到</div>
        <div class="refresh-qr">
          <div @click="getWorkEndTime(true)">
            <span class="el-icon-refresh"></span>刷新二维码
          </div>
        </div>
      </div>
      <div class="change-clock">
        <div class="qr-tips">提前打卡，点这里</div>
        <div class="qr-change" @click="getWorkEndTime(true)">
          <img src="https://img.0be.cn/pc/attence_bz_03.svg" alt="" />
        </div>
      </div>
      <div class="per-data" v-if="loginDataRemoteMixin.data">
        <img :src="loginDataRemoteMixin.data.headImgUrl" alt="" />
        <h3>
          {{ loginDataRemoteMixin.data.userName }}
          <i class="iconfont iconbianzu15" @click="helpFlag = true"></i>
        </h3>
        <h4>{{ loginDataRemoteMixin.data.deptName }}</h4>
      </div>
      <div class="clock-pad" v-if="isShowWordBtn">
        <div class="navto-color">
          <div class="summary-tips">
            忙碌一日总是非常短暂，不妨写一写今天都做了些什么吧！
          </div>
          <button @click="navToPage">去写总结</button>
        </div>
      </div>
    </div>
    <div>
      <div class="split-line"></div>
    </div>
    <h3 class="help-title">自助申请</h3>
    <div class="help-btn-group">
      <div class="help-btn-item">
        <div class="click-area" @click="jumpToAskForLeave">
          <img src="https://img.0be.cn/pc/attence_22.svg" alt="" />
          <div>请假</div>
        </div>
      </div>
      <div class="help-btn-item" @click="loadingFun">
        <div class="click-area">
          <img src="https://img.0be.cn/pc/attence_21.svg" alt="" />
          <div>保薪酬</div>
        </div>
      </div>
      <div class="help-btn-item" v-if="visitFreedom">
        <div class="click-area" @click="jumpToNoClock">
          <img src="https://img.0be.cn/pc/attence_23.svg" alt="" />
          <div>免考勤</div>
        </div>
      </div>
    </div>
    <fixedPopup
      :visible.sync="helpFlag"
      title="帮助中心"
      v-if="helpFlag"
      styleType="0"
      width="608px"
      :butJson="btnJson"
    >
      <div class="help-box">
        <div class="help-ask">
          <div class="ask-icon">问</div>
          <div class="ask-title">正常考勤时间是什么时候？</div>
        </div>
        <div class="help-answer">
          <div class="answer-icon">答</div>
          <div class="answer-text">
            一个考勤日需要打三次卡，分别为上班打卡（06:00-08:30），中午打卡（12:01-14:30），下班打卡（18:00-次日5:59），在上述三个区间内打卡，则每个打卡区间皆为正常考勤（上述时间为案例时间，具体考勤时间以部门设置的考勤组为准）。
          </div>
        </div>

        <div class="help-ask">
          <div class="ask-icon">问</div>
          <div class="ask-title">9:35分打卡，为什么会被提示旷工了？</div>
        </div>
        <div class="help-answer">
          <div class="answer-icon">答</div>
          <div class="answer-text">
            案例的正常考勤时间为（06:00-08:30），在此区间，视为“正常考勤”；但若超过此区间，在08:31-09:30区间打卡的，则视为为“迟到”，在09:31后打卡的，则视为“旷工”。
          </div>
        </div>

        <div class="help-ask">
          <div class="ask-icon">问</div>
          <div class="ask-title">
            考勤提示异常，存在“迟到、早退、旷工”的记录，要怎么处理？
          </div>
        </div>
        <div class="help-answer">
          <div class="answer-icon">答</div>
          <div class="answer-text">
            如果是因为工作原因导致考勤异常的，可通过小程序“补卡”入口提交补卡申请，待上级领导核实，审批通过后，即可豁免扣分处罚。
          </div>
        </div>

        <div class="help-ask">
          <div class="ask-icon">问</div>
          <div class="ask-title">
            在非下班的时间点打卡了，被显示“早退”，要怎么办？
          </div>
        </div>
        <div class="help-answer">
          <div class="answer-icon">答</div>
          <div class="answer-text">
            只需在正常下班时间点，重新进行打卡，“早退”记录会被更换为正常下班打卡时间。
          </div>
        </div>

        <div class="help-ask">
          <div class="ask-icon">问</div>
          <div class="ask-title">
            为什么我的账号会被提示“锁定”，要怎么处理呢？
          </div>
        </div>
        <div class="help-answer">
          <div class="answer-icon">答</div>
          <div class="answer-text">
            在正常考勤日连续3天未有一次考勤记录的，系统会将账号自动锁定；需解锁账号的，由门店负责人进行申请解锁，上级审核通过后即可解锁。
          </div>
        </div>

        <div class="help-ask">
          <div class="ask-icon">问</div>
          <div class="ask-title">我是免考勤人员，还需要提交工作总结吗？</div>
        </div>
        <div class="help-answer">
          <div class="answer-icon">答</div>
          <div class="answer-text">
            要，免考勤人员在正常考勤日同样需要提交当日工作总结，未提交会被扣分；免考勤人员在正常考勤日需请假的，也同样要提交假条，否则，未提交日志也会被扣分。
          </div>
        </div>
      </div>
    </fixedPopup>
  </div>
</template>

<script>
import util from "@/util/util";
import { LOGINDATA } from "@/util/constMap";
import qrjs2 from "qrcodejs2";
import fixedPopup from "../";
export default {
  inject: ["loginDataRemoteMixin"],
  data() {
    return {
      showQr: false,
      qrUrl: null,
      isShowWordBtn: true,
      qrInstance: null,
      visitFreedom: false,
      tipsRefresh: false,
      tipsRefreshID: null,
      helpFlag: false,
      btnJson: {
        cancelBtnShow: false,
        confirmBtnShow: false
      }
    };
  },
  created() {
    this.getWorkEndTime();
    this.getIsManager();
  },
  beforeDestroy() {
    this.clearTimeout();
  },
  methods: {
    loadingFun() {
      this.$message({
        message: "功能升级中，敬请期待...",
        type: "success"
      });
    },
    getWorkEndTime(isShow = false) {
      // if (isShow) {
      //   this.$message({
      //     message: "二维码加载中.",
      //     type: "success"
      //   });
      // }
      this.$api
        .post({
          url: "/attendance/apply/checking/qrcode",
          data: {
            isShow
          },
          qs: true
        })
        .then(({ data }) => {
          const result = data.data;
          this.clearTimeout();
          if (result.qrcode) {
            this.showQr = true;
            this.qrUrl = result.qrcode;
            this.$nextTick(() => {
              if (!this.qrInstance) {
                this.qrInstance = new qrjs2("qr", {
                  text: this.qrUrl,
                  width: this.isShowWordBtn ? 168 : 112, //二维码的宽度
                  height: this.isShowWordBtn ? 168 : 112, //二维码的高度
                  colorDark: "#008778",
                  correctLevel: qrjs2.CorrectLevel.H
                });
                this.qrInstance._el.title = "";
              } else {
                this.qrInstance.clear(); // 清除代码
                this.qrInstance.makeCode(this.qrUrl);
                this.qrInstance._el.title = "";
              }
              this.tipsRefreshID = setTimeout(() => {
                this.tipsRefresh = true;
              }, 20000);
            });
            this.$message({
              message: "二维码加载完成.",
              type: "success"
            });
          }
          this.isShowWordBtn = result.isShowWorkSummary;
        });
    },
    clearTimeout() {
      clearTimeout(this.tipsRefreshID);
      this.tipsRefresh = false;
    },
    navToPage() {
      this.$router.push({ path: "/clockIn" });
    },
    /**
     * @example: 显示二维化
     */
    changeQr(bool) {
      this.showQr = bool;
      if (!this.showQr) {
        this.qrInstance = null;
        this.clearTimeout();
      }
    },
    jumpToNoClock() {
      this.$router.push({ path: "/noClock" });
    },
    jumpToAskForLeave() {
      this.$router.push({ path: "/askforLeave" });
    },
    getIsManager() {
      this.$api
        .get({
          url: "/attendance/freedom/manager"
        })
        .then(e => {
          let data = e.data.data;
          console.log("data", data);
          if (data != null && parseInt(data) > 0) {
            this.visitFreedom = true;
          }
        });
    }
  }
};
</script>
