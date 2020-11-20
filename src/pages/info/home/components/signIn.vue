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
      backdrop-filter: blur(2px);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 25px;
      box-sizing: border-box;
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
      .clock-qr-image {
        width: 168px;
        height: 168px;
        &.is-small {
          width: 112px;
          height: 112px;
        }
      }
      .clock-qr-tips {
        font-size: @font18;
        color: #303133;
        font-weight: bold;
        margin-top: 18px;
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
</style>

<template>
  <div class="clock-in">
    <div class="clock-posi">
      <div class="clock-qr" v-if="showQr">
        <div class="close-qr el-icon-close" @click="changeQr(false)"></div>
        <img
          class="clock-qr-image"
          :class="{ 'is-small': !isShowWordBtn }"
          :src="qrUrl"
          alt=""
        />
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
      <div class="per-data">
        <img :src="loginData.headImgUrl" alt="" />
        <h3>{{ loginData.userName }}</h3>
        <h4>{{ loginData.deptName }}</h4>
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
      <div class="help-btn-item">
        <div class="click-area" @click="jumpToNoClock">
          <img src="https://img.0be.cn/pc/attence_23.svg" alt="" />
          <div>免考勤</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
import { LOGINDATA } from "@/util/constMap";
export default {
  data() {
    return {
      showQr: false,
      loginData: {},
      qrUrl: null,
      isShowWordBtn: false
    };
  },
  created() {
    this.getLocatData();
    this.getWorkEndTime();
  },
  methods: {
    loadingFun() {
      this.$message({
        message: "功能升级中.",
        type: "success"
      });
    },
    getWorkEndTime(isShow = false) {
      if (isShow) {
        this.$message({
          message: "二维码加载中.",
          type: "success"
        });
      }
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
          if (result.qrcode) {
            this.showQr = true;
            this.qrUrl = result.qrcode;
            this.$message({
              message: "二维码加载完成.",
              type: "success"
            });
          }
          this.isShowWordBtn = result.isShowWorkSummary;
        });
    },
    /**
     * @example: 获取登录人信息
     */

    getLocatData() {
      this.loginData = util.localStorageGet(LOGINDATA);
    },
    navToPage() {
      this.$router.push({ path: "/clockIn" });
    },
    /**
     * @example: 显示二维化
     */
    changeQr(bool) {
      this.showQr = bool;
    },
    jumpToNoClock() {
      this.$router.push({ path: "/noClock" });
    },
    jumpToAskForLeave() {
      this.$router.push({ path: "/askforLeave" });
    }
  }
};
</script>
