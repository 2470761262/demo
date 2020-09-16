<template>
  <!-- 申请实勘人弹窗 -->
  <div>
    <el-dialog title="申请实勘人"
      :visible.sync="visible"
      @close="close"
      :show="dialogInvestigatorVisible"
      width="430px"
      height="530px"
    >
      <div class="investigator-container">
        <div class="tip">
          <i class="el-icon-warning"></i>
          <span class="text">现申请实勘人方式调整为申请拍摄VR视频,拍摄成功后即可变为实勘人</span>
        </div>
        <div class="column">
          <div class="step">
            <span class="circle">1</span>
            <span class="title">申请拍摄</span>
          </div>
          <div class="content">
            <p class="text">找到“无实勘人”的房源，点击申请拍摄，并确认进行VR视频拍摄</p>
          </div>
        </div>
        <div class="column">
          <div class="step">
            <span class="circle">2</span>
            <span class="title">打开123APP，进行拍摄</span>
          </div>
          <div class="content">
            <p class="text">打开123APP，找到所在订单，进行拍摄，拍摄完上传视频图片，进入拍摄阶段</p>
            <div class="bottom">
              如无123APP，请点击右侧进行下载
              <span class="btn">下载APP</span>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="step">
            <span class="circle">3</span>
            <span class="title">视频制作完成</span>
          </div>
          <div class="content">
            <p class="text">视频制作完成后，经纪人将会得到VR视频连接，可以在房源中点击查看预览视频，获得链接的同时，经纪人也会变成房源的实勘人</p>
          </div>
        </div>
        <div class="btn-box">
          <el-button class="btn cancel" @click="cancel">取消</el-button>
          <el-button class="btn confirm" @click="apply">即刻申请</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogInvestigatorVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.dialogInvestigatorVisible
    }
  },
  watch: {
    dialogInvestigatorVisible () {
      this.visible = this.dialogInvestigatorVisible;
    }
  },
  methods: {
    close() {
      this.$emit('update:dialogInvestigatorVisible', false)
    },
    cancel() {
      this.$emit('update:dialogInvestigatorVisible', false)
    },
    apply() {
      this.$emit('update:dialogInvestigatorVisible', false)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-dialog {
  // prettier-ignore
  border-radius: 8PX;
  .el-dialog__header {
    position: relative;
    // prettier-ignore
    padding: 15PX;
    text-align: center;
    .el-dialog__title {
      line-height: 1;
      font-size: @font16;
      font-weight: bold;
    }
    .el-dialog__headerbtn {
      top: 50%;
      transform: translateY(-50%);
      .el-icon-close {
        font-size: @font22;
      }
    }
  }
  .el-dialog__body {
    // prettier-ignore
    padding: 0 30PX 30PX;
  }
}
.investigator-container {
  .tip {
    display: flex;
    flex-direction: row;
    align-items: center;
    // prettier-ignore
    width: 340PX;
    // prettier-ignore
    padding: 5PX 10PX;
    // prettier-ignore
    margin: 0 auto 18PX;
    background: #F2F2F2;
    // prettier-ignore
    border-radius: 10PX;
    .el-icon-warning {
      // prettier-ignore
      margin-right: 5PX;
      color: #EDA236;
      font-size: @font18;
    }
    .text {
      line-height: 1.5;
      font-size: @font12;
      color: #EDA236;
    }
  }
  .column {
    .step {
      // prettier-ignore
      margin: 10PX 0;
      .circle {
        display: inline-block;
        // prettier-ignore
        width: 20PX;
        // prettier-ignore
        height: 20PX;
        margin-right: 10px;
        background: @backgroud;
        border-radius: 100%;
        // prettier-ignore
        line-height: 20PX;
        text-align: center;
        color: #fff;
      }
      .title {
        font-size: @font14;
      }
    }
    .content {
      // prettier-ignore
      padding: 8PX 10PX 15PX;
      background: #F2F2F2;
      // prettier-ignore
      border-radius: 4PX;
      .text {
        line-height: 1.6;
        font-size: @font12;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // prettier-ignore
        height: 34PX;
        // prettier-ignore
        padding: 0 2PX 0 10PX;
        // prettier-ignore
        margin-top: 8PX;
        background: #fff;
        // prettier-ignore
        border-radius: 4PX;
        // prettier-ignore
        line-height: 34PX;
        .btn {
          // prettier-ignore
          height: 30PX;
          // prettier-ignore
          padding: 0 5PX;
          background: @backgroud;
          color: #fff;
          // prettier-ignore
          border-radius: 4PX;
          // prettier-ignore
          line-height: 30PX;
          cursor: pointer;
        }
      }
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    // prettier-ignore
    margin-top: 15PX;
    .btn {
      &.confirm {
        background: @backgroud;
        color: #fff;
      }
    }
  }
}
</style>