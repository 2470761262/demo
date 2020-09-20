<template>
  <!-- 申请实勘人弹窗 -->
  <div>
    <el-dialog
      title="加入我的58房源库"
      :visible.sync="visible"
      @close="close"
      :show="dialogVisible"
      width="430px"
      height="530px"
    >
      <div class="investigator-container">
        <div class="tip">
          <i class="el-icon-warning"></i>
          <span class="text">加入后，需用58发布才可以在58C端展示</span>
        </div>
        <div class="column">
          <div class="head">
            <span class="title">房源标题</span>
            <span class="btn">换一个</span>
          </div>
          <el-input
            v-model="selfPublishInfo.houseTitle"
            placeholder="请输入房源标题"
            maxlength="30"
            :validate-event="true"
            clearable
          ></el-input>
        </div>
        <div class="column">
          <div class="head">
            <span class="title">房源详情</span>
            <span class="btn">换一个</span>
          </div>
          <el-input
            type="textarea"
            v-model="selfPublishInfo.houseDetail"
            placeholder="请输入房源详情"
            resize="none"
            maxlength="300"
            show-word-limit
          ></el-input>
        </div>
        <div class="column">
          <div class="head">
            <span class="title">业主心态</span>
            <span class="btn">换一个</span>
          </div>
          <el-input
            type="textarea"
            v-model="selfPublishInfo.ownerMentality"
            placeholder="请输入业主心态"
            resize="none"
            maxlength="300"
            show-word-limit
          ></el-input>
        </div>
        <div class="column">
          <div class="head">
            <span class="title">服务介绍</span>
            <span class="btn">换一个</span>
          </div>
          <el-input
            type="textarea"
            v-model="selfPublishInfo.serveIntroduction"
            placeholder="请输入服务介绍"
            resize="none"
            maxlength="300"
            show-word-limit
          ></el-input>
        </div>
        <div class="btn-box">
          <el-button class="btn cancel" @click="cancel">取消</el-button>
          <el-button class="btn confirm" @click="confirm" :loading="joinLoading"
            >确定加入</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    publishInfo: {
      type: Object,
      default: () => {
        return {
          houseTitle: "",
          houseDetail: "",
          ownerMentality: "",
          serveIntroduction: ""
        };
      }
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
      joinLoading: false,
      selfPublishInfo: this.publishInfo
    };
  },
  watch: {
    dialogVisible() {
      this.visible = this.dialogVisible;
    },
    publishInfo: {
      deep: true,
      handler(val) {
        this.selfPublishInfo = val;
      }
    }
  },
  methods: {
    close() {
      this.$emit("update:dialogVisible", false);
    },
    cancel() {
      this.$emit("update:dialogVisible", false);
    },
    confirm() {
      if (this.selfPublishInfo.houseTitle.length < 10) {
        this.$message.error("房源标题必须在10-30字之间");
        return;
      }
      if (this.selfPublishInfo.houseDetail.length < 20) {
        this.$message.error("房源详情必须在20-300字之间");
        return;
      }
      if (this.selfPublishInfo.ownerMentality.length < 20) {
        this.$message.error("业主心态必须在20-300字之间");
        return;
      }
      if (this.selfPublishInfo.serveIntroduction.length < 20) {
        this.$message.error("服务介绍必须在20-300字之间");
        return;
      }
      this.joinLoading = true;
      this.$api
        .post({
          url: "/agent_house/releaseWuBa",
          data: {
            houseId: this.selfPublishInfo.houseId,
            title: this.selfPublishInfo.houseTitle,
            houseDetails: this.selfPublishInfo.houseDetail,
            ownersMentality: this.selfPublishInfo.ownerMentality,
            serviceIntroduction: this.selfPublishInfo.serveIntroduction
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          if (e.data.code == 200) {
              console.log("www");
            // this.$emit('update:dialogVisible', false)
          }
            this.$message({
              message: e.data.message,
            });
        })
        .finally(() => {
          this.joinLoading = false;
        });
    }
  }
};
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
/deep/.investigator-container {
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
    background: #f2f2f2;
    // prettier-ignore
    border-radius: 10PX;
    .el-icon-warning {
      // prettier-ignore
      margin-right: 5PX;
      color: #eda236;
      font-size: @font18;
    }
    .text {
      line-height: 1.5;
      font-size: @font12;
      color: #eda236;
    }
  }
  .column {
    // prettier-ignore
    margin-bottom: 10PX;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // prettier-ignore
      margin-bottom: 5PX;
      .title {
        font-size: @font14;
        font-weight: bold;
      }
      .btn {
        // prettier-ignore
        padding: 6PX 10PX;
        background: @backgroud;
        // prettier-ignore
        border-radius: 10PX;
        line-height: 1;
        font-size: @font12;
        color: #fff;
      }
    }
    textarea {
      // prettier-ignore
      height: 65PX;
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
