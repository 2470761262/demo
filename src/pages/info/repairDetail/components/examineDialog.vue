<template>
  <!-- 新增名言警句弹窗 -->
  <el-dialog
    title="审批"
    :visible.sync="visible"
    @close="close"
    :show="dialogVisible"
    width="608px"
    :closeOnClickModal="false"
  >
    <div class="component-container">
      <div class="content">
        <div class="ipt-box">
          <label for="" class="label">审批结果</label>
          <div class="radio-group">
            <span
              v-for="(item, index) in examineList"
              :key="index"
              :class="{ active: item.value == formData.statusSwitch }"
              @click="formData.statusSwitch = item.value"
              >{{ item.label }}</span
            >
          </div>
        </div>
        <div
          :class="{ 'after-tips': errorBags.has('reason') }"
          :data-tips="errorBags.first('reason')"
        >
          <div class="ipt-box" v-if="!formData.statusSwitch">
            <label for="" class="label">不通过原因</label>
            <el-input
              class="textarea"
              type="textarea"
              placeholder="请输入不通过原因"
              v-model="formData.reason"
              maxlength="50"
              show-word-limit
              v-validate="'required'"
              data-vv-as="不通过原因"
              data-vv-name="reason"
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
    },
    applyId: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
      examineList: [
        {
          label: "通过",
          value: true
        },
        {
          label: "不通过",
          value: false
        }
      ],
      formData: {
        reason: "",
        statusSwitch: true
      }, //请求参数
      submitLoading: false
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
    /**
     * @example:确定时间
     */
    confirm() {
      this.$validator.validateAll().then(e => {
        if (e) {
          let params = {
            id: this.applyId
          };
          Object.assign(params, JSON.parse(JSON.stringify(this.formData)));
          this.submitLoading = true;
          this.$api
            .post({
              url: "/attendance/apply/audit",
              data: params,
              qs: true
            })
            .then(e => {
              this.$message({
                message: e.data.message
              });
              if (e.data.code == 200) {
                this.cancel();
                this.$emit("checkEnd");
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
      .radio-group {
        span {
          display: inline-block;
          width: 98px;
          height: 42px;
          margin-right: 16px;
          background: #f0f2f5;
          border-radius: 4px;
          line-height: 42px;
          text-align: center;
          font-size: @font16;
          color: #909399;
          cursor: pointer;
          &.active {
            background: @backgroud;
            color: #fff;
          }
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
