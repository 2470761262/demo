<template>
  <!-- 新增名言警句弹窗 -->
  <el-dialog
    title="总结点评"
    :visible.sync="visible"
    @close="close"
    :show="dialogVisible"
    width="608px"
    :closeOnClickModal="false"
  >
    <div class="component-container">
      <div class="content">
        <div class="ipt-box">
          <div
            :class="{ 'after-tips': errorBags.has('authorFamous') }"
            :data-tips="errorBags.first('authorFamous')"
          >
            <label for="" class="label">名人</label>
            <el-input
              class="ipt"
              v-model="formData.authorFamous"
              placeholder="请输入名人姓名"
              v-validate="'required'"
              data-vv-as="名人姓名"
              data-vv-name="authorFamous"
            ></el-input>
          </div>
        </div>
        <div class="ipt-box">
          <div
            :class="{ 'after-tips': errorBags.has('contentFamous') }"
            :data-tips="errorBags.first('contentFamous')"
          >
            <label for="" class="label">名言警句</label>
            <el-input
              class="textarea"
              type="textarea"
              placeholder="请输入名言警句"
              v-model="formData.contentFamous"
              maxlength="50"
              show-word-limit
              v-validate="'required'"
              data-vv-as="名言警句"
              data-vv-name="contentFamous"
            >
            </el-input>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="btn-box">
          <button class="cancel" @click="cancel">取消</button>
          <button class="confirm" @click="confirm" v-loading="submitLoading">
            确定
          </button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
      submitLoading: false,
      formData: {
        authorFamous: "",
        contentFamous: ""
      }
    };
  },
  watch: {
    dialogVisible() {
      this.visible = this.dialogVisible;
    }
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("update:dialogVisible", false);
    },
    cancel() {
      this.$emit("update:dialogVisible", false);
    },
    confirm() {
      this.$validator.validateAll().then(e => {
        if (e) {
          this.submitLoading = true;
          this.$api
            .post({
              url: "/attendance/famouseWork/save",
              data: this.formData,
              headers: { "Content-Type": "application/json" }
            })
            .then(e => {
              let result = e.data;
              this.$message({
                message: result.message
              }); //弹窗提示
              if (result.code == 200) {
                this.cancel();
                this.$emit("add");
              }
            })
            .finally(e => {
              this.submitLoading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.el-dialog {
  border-radius: 10px;
  .el-dialog__header {
    position: relative;
    padding: 24px;
    .el-dialog__title {
      line-height: 1;
      font-size: @font24;
      font-weight: bold;
      color: #303133;
    }
    .el-dialog__headerbtn {
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      .el-icon-close {
        font-size: @font24;
      }
    }
  }
  .el-dialog__body {
    display: flex;
    max-height: 70vh;
    overflow: auto;
    padding: 0;
  }
}
/deep/.component-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 24px 30px;
  .content {
    /deep/.ipt-box {
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0;
      }
      .label {
        display: block;
        position: relative;
        padding-left: 16px;
        margin-bottom: 16px;
        line-height: 1;
        font-size: @font16;
        font-weight: bold;
        color: #303133;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: #f62f2f;
          border-radius: 8px;
        }
      }
      .ipt {
        .el-input__inner {
          width: 336px;
          height: 48px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #cecece;
          font-size: @font16;
        }
      }
      .textarea {
        .el-textarea__inner {
          width: 560px;
          height: 158px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #cecece;
          resize: none;
          font-size: @font16;
          box-sizing: border-box;
          &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            background-color: rgba(0, 0, 0, 0);
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 6px;
            background-color: #bbb;
          }
          &::-webkit-scrollbar-track {
            // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #fff;
          }
        }
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 18px;
    .btn-box {
      button {
        width: 109px;
        height: 40px;
        border-radius: 4px;
        border: none;
        line-height: 40px;
        outline: none;
        cursor: pointer;
      }
      .cancel {
        background: #f4f4f5;
        color: #606266;
      }
      .confirm {
        margin-left: 16px;
        background: @backgroud;
        color: #fff;
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
}
</style>
