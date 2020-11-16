<style lang="less" scoped>
.clock-in {
  background: #ffffff;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
  position: relative;
  height: 518px;
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
      padding-top: 58px;
      box-sizing: border-box;
      .clock-qr-image {
        width: 184px;
        height: 184px;
      }
      .clock-qr-tips {
        font-size: @font18;
        color: #303133;
        font-weight: bold;
        margin-top: 25px;
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
      .split-line {
        margin-top: 24px;
        height: 1px;
        background: #f0f2f5;
      }
    }
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
      <div class="clock-qr">
        <img
          class="clock-qr-image"
          src="https://lsxjytestimgs.oss-cn-shenzhen.aliyuncs.com/scanUpload/96cd92a9348246b78d5b812c63567e0e.jpg"
          alt=""
        />
        <div class="clock-qr-tips">手机微信扫码签到</div>
      </div>
      <div class="change-clock">
        <div class="qr-tips">提前打卡，点这里</div>
        <div class="qr-change">
          <img src="https://img.0be.cn/pc/attence_bz_03.svg" alt="" />
        </div>
      </div>
      <div class="per-data">
        <img
          src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3226010111,403035871&fm=11&gp=0.jpg"
          alt=""
        />
        <h3>史泰龙</h3>
        <h4>国贸一店-中诚片区</h4>
      </div>
      <div class="clock-pad">
        <div class="navto-color">
          <div class="summary-tips">
            忙碌一日总是非常短暂，不妨写一写今天都做了些什么吧！
          </div>
          <button>去写总结</button>
        </div>
        <div class="split-line"></div>
      </div>
    </div>
    <h3 class="help-title">自助申请</h3>
    <div class="help-btn-group">
      <div class="help-btn-item">
        <div class="click-area">
          <img src="https://img.0be.cn/pc/attence_22.svg" alt="" />
          <div>请假</div>
        </div>
      </div>
      <div class="help-btn-item">
        <div class="click-area">
          <img src="https://img.0be.cn/pc/attence_21.svg" alt="" />
          <div>保薪酬</div>
        </div>
      </div>
      <div class="help-btn-item">
        <div class="click-area">
          <img src="https://img.0be.cn/pc/attence_23.svg" alt="" />
          <div>免考勤</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
