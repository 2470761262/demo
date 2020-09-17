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
      color: red;
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
        font-size: @font12;
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
          font-size: @font12;
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
      height="530px"
    >
      <div class="investigator-container">
        <div class="tip">
          <span class="text"
            >绑定账号后,可以直接将房源发布到58房产、安居客等</span
          >
        </div>
        <div class="column">
          <div class="step">
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
