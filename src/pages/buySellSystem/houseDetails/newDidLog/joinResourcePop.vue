<template>
  <!-- 申请实勘人弹窗 -->
  <div>
    <el-dialog
      title="加入我的58房源库"
      :visible.sync="visible"
      @close="close"
      :show="dialogVisible"
      width="500px"
      :closeOnClickModal="false"
    >
      <div class="investigator-container" v-show="flag">
        <div class="tip">
          <i class="el-icon-warning"></i>
          <span class="text">加入后，需用58发布才可以在58C端展示</span>
        </div>
        <div class="column">
          <div class="head">
            <span class="title">房源标题</span>
            <span class="btn" @click="changeText('houseTitle')">换一个</span>
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
            <span class="btn" @click="changeText('houseDetail')">换一个</span>
          </div>
          <el-input
            type="textarea"
            v-model="selfPublishInfo.houseDetail"
            placeholder="请输入房源详情"
            resize="vertical"
            autosize
            maxlength="300"
            show-word-limit
          ></el-input>
        </div>
        <div class="column">
          <div class="head">
            <span class="title">业主心态</span>
            <span class="btn" @click="changeText('ownerMentality')"
              >换一个</span
            >
          </div>
          <el-input
            type="textarea"
            v-model="selfPublishInfo.ownerMentality"
            placeholder="请输入业主心态"
            resize="vertical"
            autosize
            maxlength="300"
            show-word-limit
          ></el-input>
        </div>
        <div class="column">
          <div class="head">
            <span class="title">服务介绍</span>
            <span class="btn" @click="changeText('serveIntroduction')"
              >换一个</span
            >
          </div>
          <el-input
            type="textarea"
            v-model="selfPublishInfo.serveIntroduction"
            placeholder="请输入服务介绍"
            resize="vertical"
            autosize
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
      <div class="investigator-container" v-show="!flag">
        <div class="formwork" v-infinite-scroll="load">
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <div>1111111111111111111<br /></div>
          <p v-if="loading">加载中...</p>
          <p v-if="true">没有更多了</p>
        </div>
        <div class="btn-box formwork-btn">
          <el-button class="btn cancel" @click="back">取消</el-button>
          <el-button class="btn confirm" @click="selectConfirm"
            >确定选择</el-button
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
          serveIntroduction: "",
          communityName: "",
          middleSchool: "",
          price: "",
          averagePrice: ""
        };
      }
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
      joinLoading: false,
      selfPublishInfo: this.publishInfo,
      houseTitleId: null,
      houseDetailId: null,
      ownerMentalityId: null,
      serveIntroductionId: null,
      flag: true,
      loading: false
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
  mounted() {
    this.getDefaultDetail();
  },
  methods: {
    getDefaultDetail() {
      this.$api
        .get({
          url: "/releaseWuBaTemplate/list",
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.selfPublishInfo.houseTitle = data.data[0].details;
            this.selfPublishInfo.ownerMentality = data.data[1].details;
            this.selfPublishInfo.serveIntroduction = data.data[2].details;
            this.houseTitleId = data.data[0].id;
            this.ownerMentalityId = data.data[1].id;
            this.serveIntroductionId = data.data[2].id;
          } else {
            this.$message.error(e.data.message);
          }
        })
        .catch(e => {});
    },
    close() {
      this.$emit("update:dialogVisible", false);
    },
    cancel() {
      this.$emit("update:dialogVisible", false);
    },
    changeText(title) {
      let type;
      let field = title + "Id";
      let id = this[field];
      switch (title) {
        case "houseTitle":
          type = 0;
          break;
        case "houseDetail":
          type = 1;
          break;
        case "ownerMentality":
          type = 2;
          break;
        case "serveIntroduction":
          type = 3;
          break;
      }
      // this.$api
      //   .post({
      //     url: "/releaseWuBaTemplate/random",
      //     data: {
      //       id: id || 0,
      //       type: type
      //     },
      //     headers: { "Content-Type": "application/json;charset=UTF-8" }
      //   })
      //   .then(e => {
      //     if (e.data.code == 200) {
      //       let content = e.data.data.details
      //         .replace("communityName", this.selfPublishInfo.communityName)
      //         .replace("middleSchool", this.selfPublishInfo.middleSchool)
      //         .replace("price", this.selfPublishInfo.price)
      //         .replace("averagePrice", this.selfPublishInfo.averagePrice);
      //       this.selfPublishInfo[title] = content;
      //       this[field] = e.data.data.id;
      //     } else {
      //       this.$message.error(e.data.message);
      //     }
      //   })
      //   .catch(e => {});
      this.flag = false;
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
            this.$message({
              message: e.data.message,
              type: "success"
            });
            this.$parent.publishBtnType = 2;
            this.$emit("update:dialogVisible", false);
          } else {
            this.$message.error(e.data.message);
          }
        })
        .finally(() => {
          this.joinLoading = false;
        });
    },
    back() {
      this.flag = true;
    },
    selectConfirm() {
      this.flag = true;
    },
    load() {
      console.log("loading...");
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
    display: flex;
    // prettier-ignore
    min-height: 460PX;
    // prettier-ignore
    max-height: 70vh;
    overflow: auto;
    // prettier-ignore
    padding: 0 30PX 30PX;
  }
}
/deep/.investigator-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  .formwork {
    flex: 1;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 50px;
    }
  }
  .formwork-btn {
  }
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
        cursor: pointer;
      }
    }
    textarea {
      // prettier-ignore
      min-height: 65PX !important;
      // prettier-ignore
      max-height: 120PX;
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
