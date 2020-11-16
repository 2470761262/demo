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
    // prettier-ignore
    margin: 0 0 10PX;
    // prettier-ignore
    border-radius: 10PX;
    line-height: 1.5;
    font-size: @font12;
    color: #ff8585;
  }
  .column {
    // prettier-ignore
    margin-bottom: 15PX;
    .step {
      // prettier-ignore
      margin: 10PX 0;
      .red {
        font-size: @font14;
        color: #ff8585;
      }
      .title {
        font-size: @font14;
      }
    }
    .content {
      // prettier-ignore
      margin: 8PX 0 0;
      // prettier-ignore
      border-radius: 4PX;
      .text {
        line-height: 1.6;
        font-size: @font12;
      }
    }
  }
  .question-box {
    display: flex;
    flex-direction: row;
    // prettier-ignore
    margin-bottom: 8PX;
    &:nth-child(even) {
      // prettier-ignore
      margin-bottom: 15PX;
    }
    .dd {
      font-size: @font14;
    }
    .dt {
      flex: 1;
      line-height: 1.6;
      font-size: @font14;
      &.block {
        // prettier-ignore
        padding: 5PX;
        background: #eaeaea;
        // prettier-ignore
        border-radius: 4PX;
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
.after-tips {
  &:after {
    content: attr(data-tips);
    display: block;
    color: red;
  }
}
</style>
<template>
  <!-- 绑定58账号弹窗 -->
  <div>
    <el-dialog
      title="绑定58账号"
      :visible.sync="visible"
      @close="close"
      :show="openFlag"
      width="430px"
      top="25vh"
    >
      <div class="investigator-container">
        <div class="tip">
          绑定账号后,可以直接将房源发布到58房产、安居客等
        </div>
        <div class="column">
          <div class="step">
            <span class="red">*</span>
            <span class="title">58三网账号</span>
          </div>
          <div
            :class="{ 'after-tips': errorBags.has('loginMobile') }"
            :data-tips="errorBags.first('loginMobile')"
          >
            <div class="content">
              <el-input
                placeholder="请输入58三网账号"
                v-validate="'required'"
                data-vv-as="58三网账号"
                data-vv-name="loginMobile"
                v-model="loginMobile"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="question-box">
          <span class="dd">Q：</span>
          <p class="dt">绑定账号后能干嘛？</p>
        </div>
        <div class="question-box">
          <span class="dd">A：</span>
          <p class="dt block">
            绑定后，经纪人能在鑫伽系统直接将房源发布至58经纪人房源库，无需登录58重新录入
          </p>
        </div>
        <div class="question-box">
          <span class="dd">Q：</span>
          <p class="dt">我能支付将房源发布到58的外网吗？</p>
        </div>
        <div class="question-box">
          <span class="dd">A：</span>
          <p class="dt block">
            房源发布后，房源存在于58房源库，经纪人需登录后，点击发布外网展示，才能发布
          </p>
        </div>
        <div class="btn-box">
          <el-button class="btn cancel" @click="cancel">取消</el-button>
          <el-button class="btn confirm" @click="apply" :loading="applyLoading"
            >即刻提交</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  props: {
    openFlag: {
      type: Boolean,
      default: false
    },
    accountId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      visible: this.openFlag,
      loginMobile: "",
      applyLoading: false
    };
  },
  watch: {
    openFlag() {
      this.visible = this.openFlag;
    }
  },
  methods: {
    close() {
      this.$emit("update:openFlag", false);
    },
    cancel() {
      this.$emit("update:openFlag", false);
    },
    apply() {
      this.$validator.validateAll().then(e => {
        console.log(e);
        if (e) {
          this.applyLoading = true;
          this.$api
            .post({
              url: `/employee/bindBroker58`,
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: {
                accountId: this.accountId,
                loginMobile: this.loginMobile
              }
            })
            .then(e => {
              let type = "error";
              if (e.data.code == 200) {
                type = "sucesss";
                this.$emit("update:openFlag", false);
                this.$emit("bindBorkerWuBa");
              }
              this.$message({
                message: e.data.message,
                type: type
              });
            })
            .finally(e => {
              this.applyLoading = false;
            });
        }
      });
    }
  }
};
</script>
