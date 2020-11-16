<template>
  <!-- 请假申请 -->
  <div class="add-rule-container">
    <div class="center">
      <div class="main">
        <div class="panel rule">
          <div class="ipt-box">
            <label for="" class="label">请假类型</label>
            <el-select class="ipt" v-model="company" placeholder="请选择">
              <el-option
                v-for="item in companyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="ipt-gather">
            <div class="ipt-box">
              <label for="" class="label">开始时间</label>
              <el-date-picker
                class="ipt gather"
                v-model="value"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
            <div class="ipt-box">
              <label for="" class="label">结束时间</label>
              <el-date-picker
                class="ipt gather"
                v-model="value"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="ipt-box">
            <label for="" class="label noRequire">总时长</label>
            <el-input
              class="ipt"
              v-model="input2"
              placeholder="请假时长根据请假时间自动计算"
              :disabled="true"
            ></el-input>
          </div>
          <div class="ipt-box">
            <label for="" class="label">请假原因</label>
            <el-input
              class="textarea"
              type="textarea"
              :rows="2"
              placeholder="请输入规则描述"
              v-model="introduction"
            >
            </el-input>
          </div>
        </div>
        <h2 class="topic">审批流</h2>
        <div class="panel"></div>
        <div class="panel bottom">
          <div class="bottom-btn">
            <button class="reset">重置</button>
            <button class="save" @click="save">保存</button>
          </div>
        </div>
      </div>
      <div class="sidebar">
        <div class="panel applyer">
          <div class="title">申请人</div>
          <div class="detail-box">
            <div class="avatar">
              <el-image
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="cover"
              ></el-image>
            </div>
            <div class="detail">
              <div class="author-box">
                <div class="author">林俊杰</div>
                <div class="tag">经纪人</div>
              </div>
              <div class="business-box">
                <div class="business">中诚片区-中诚门店</div>
                <div class="icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      input2: "",
      company: "",
      introduction: "",
      companyList: [
        {
          value: "Beijing",
          label: "北京"
        },
        {
          value: "Shanghai",
          label: "上海"
        },
        {
          value: "Nanjing",
          label: "南京"
        }
      ],
      ruleTime: [
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        }
      ],
      duration: "",
      activeTabName: "first",
      sidebarNavs: [
        {
          label: "适用部门",
          name: "first"
        },
        {
          label: "适用人员",
          name: "second"
        }
      ],
      openFilterPanel: false,
      value: "",
      checkList: ["复选框1"]
    };
  },
  mounted() {
    console.log("1111111111111111111");
    document.addEventListener("click", this.relateInpBlur);
  },
  beforeDestroy() {
    console.log("2222222222222222222");
    document.removeEventListener("click", this.relateInpBlur);
  },
  methods: {
    save() {
      console.log(this.ruleTime, "----");
    },
    /**
     * @description: 复制前一天考勤时间
     * @param {Number} index 当天考勤日
     * @return {*}
     */
    copyPreDayTs(index) {
      let preDayTimeArr = Object.assign({}, this.ruleTime[index - 1]);
      this.ruleTime.splice(index, 1, preDayTimeArr);
      console.log(this.ruleTime);
      //this.$set(this, this.ruleTime[index]);
    },
    openDateDialog() {
      this.dialogClockDateVisible = true;
    },
    /**
     * @description: 部门/人员切换
     * @return {*}
     */
    switchTab() {
      console.log(this.activeTabName, "=========");
    },
    relateIptFocus() {
      this.openFilterPanel = true;
    },
    relateInpBlur(e) {
      console.log(e.target);
      let tp = document.querySelector(".relate-ipt-box");
      if (tp) {
        if (!tp.contains(e.target)) {
          this.openFilterPanel = false;
        }
      }
    },
    relateDepartLoad() {
      console.log("aaaaaaaaaa");
    }
  }
};
</script>
<style lang="less">
/* 时间范围选择器面板begin */
.el-time-range-picker {
  .el-time-spinner__item {
    height: 32px;
    line-height: 32px;
  }
  .el-time-panel__footer {
    height: 36px;
    .el-time-panel__btn {
      line-height: 28px;
      font-size: @font12;
    }
  }
  .el-time-panel__content::after,
  .el-time-panel__content::before {
    height: 32px;
  }
}
/* 时间范围选择器面板end */
</style>
<style lang="less" scoped>
/* 时间范围选择器begin */
/deep/.el-date-editor {
  height: 48px;
  .el-range__icon {
    font-size: @font14;
  }
  .el-range-input,
  .el-range-separator {
    line-height: 34px;
    font-size: @font14;
  }
  .el-range-separator {
    width: auto;
  }
}
/* 时间范围选择器end */
/*** element下拉选择面板 ***/
.el-select-dropdown__item {
  height: 40px;
  line-height: 40px;
  font-size: @font14;
}
.add-rule-container {
  flex: 1;
  display: flex;
  justify-content: center;
  height: 0;
  background: #f0f7f7;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(0, 0, 0, 0);
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #bbb;
  }
  *::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #fff;
  }
  .center {
    display: flex;
    padding: 24px 24px 32px 24px;
    overflow: auto;
    .topic {
      padding: 24px 0;
      line-height: 1;
      font-size: @font18;
      font-weight: bold;
      color: #303133;
    }
    .panel {
      width: 100%;
      padding: 24px;
      background: #fff;
      box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
      border-radius: 8px;
      box-sizing: border-box;
      .tip {
        width: 100%;
        height: 36px;
        padding: 0 16px;
        background: rgba(255, 150, 0, 0.07);
        line-height: 36px;
        font-size: @font16;
        color: #ff9600;
        box-sizing: border-box;
      }
    }
    .main {
      display: flex;
      flex-direction: column;
      width: 852px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .rule {
        .ipt-gather {
          display: flex;
        }
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
            &.noRequire {
              padding-left: 0;
              &::before {
                display: none;
              }
            }
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
            &.gather {
              .el-input__inner {
                width: 160px;
              }
            }
          }
          .textarea {
            .el-textarea__inner {
              width: 336px;
              height: 146px;
              background: #ffffff;
              border-radius: 4px;
              border: 1px solid #cecece;
              resize: none;
              font-size: @font16;
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
        margin-top: 24px;
        .bottom-btn {
          button {
            width: 109px;
            height: 40px;
            border: none;
            border-radius: 4px;
            text-align: center;
            line-height: 40px;
            font-size: @font16;
            outline: none;
            box-sizing: border-box;
            cursor: pointer;
            float: left;
          }
          .reset {
            margin-right: 16px;
            background: #f4f4f5;
            color: #606266;
          }
          .save {
            background: @backgroud;
            color: #fff;
          }
        }
      }
    }
    .sidebar {
      width: 414px;
      margin-left: 24px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .applyer {
        .title {
          margin-bottom: 24px;
          line-height: 1;
          font-size: @font18;
          font-weight: bold;
          color: #303133;
        }
        .detail-box {
          display: flex;
          .avatar {
            width: 52px;
            height: 52px;
            border-radius: 52px;
            overflow: hidden;
            .el-image {
              width: 100%;
              height: 100%;
            }
          }
          .detail {
            flex: 1;
            margin-left: 12px;
            padding-top: 6px;
            .author-box {
              display: flex;
              align-items: center;
              .author {
                line-height: 1;
                font-size: @font18;
                font-weight: bold;
                color: #303133;
              }
              .tag {
                height: 16px;
                margin-left: 12px;
                padding: 0 4px;
                border-radius: 2px;
                border: 1px solid @backgroud;
                line-height: 14px;
                font-size: @font12;
                color: @backgroud;
              }
            }
            .business-box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 4px;
              .business {
                font-size: @font14;
                color: #303133;
              }
              .icon {
                width: 32px;
                height: 32px;
                transform: translateY(5px);
                margin-top: 0px;
                background: url(~@/assets/images/leaveDetail_call_phone.svg)
                  center no-repeat;
                background-size: cover;
              }
            }
          }
        }
      }
    }
  }
}
</style>
