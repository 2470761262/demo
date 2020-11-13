<template>
  <div class="add-rule-container">
    <div class="center">
      <div class="main">
        <h2 class="topic">考勤规则</h2>
        <div class="panel rule">
          <div class="ipt-box">
            <label for="" class="label">考勤名称</label>
            <el-input
              class="ipt"
              v-model="name"
              placeholder="请输入考勤名称"
            ></el-input>
          </div>
          <div class="ipt-box">
            <label for="" class="label">适用公司</label>
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
          <div class="ipt-box">
            <label for="" class="label">考勤描述</label>
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
        <h2 class="topic">考勤时间</h2>
        <div class="panel time">
          <div class="tip">如不填写时间，则视为无需考勤！</div>
          <div class="content">
            <div
              class="row-time"
              v-for="(item, index) in ruleTime"
              :key="index"
            >
              <span class="prefix">周一，早上</span>
              <el-time-picker
                is-range
                format="HH:mm"
                value-format="HH:mm"
                v-model="item.morningTs"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              >
              </el-time-picker>
              <span class="prefix">下午</span>
              <el-time-picker
                is-range
                format="HH:mm"
                value-format="HH:mm"
                v-model="item.afternoonTs"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              >
              </el-time-picker>
              <span class="set" v-if="index > 0" @click="copyPreDayTs(index)"
                >与前一天一致</span
              >
            </div>
            <div class="row-time">
              <span class="prefix">弹性卡时长</span>
              <div class="duration">
                <el-input
                  v-model.number="duration"
                  type="number"
                  :min="0"
                  placeholder="请输入时长"
                >
                </el-input>
                <span>分钟</span>
              </div>
            </div>
          </div>
        </div>
        <h2 class="topic">特殊日期设置</h2>
        <div class="panel set">
          <div class="tip">要到特殊日期，可在此处配置特殊考勤日期</div>
          <div class="info">
            <p class="red">已将2020年11月8日设置为上班日</p>
            <p class="green">已将2020年11月10日、11日、12日设置为休息日</p>
          </div>
          <button class="set-btn">设置特殊考勤日期</button>
        </div>
        <div class="panel bottom">
          <div class="bottom-btn">
            <button class="reset">重置</button>
            <button class="save" @click="save">保存</button>
          </div>
          <button class="del">删除</button>
        </div>
      </div>
      <div class="sidebar">
        <h2 class="topic">关联考勤部分/人员</h2>
        <div class="panel right">
          <el-tabs
            class="sub-nav"
            v-model="activeTabName"
            @tab-click="switchTab"
          >
            <el-tab-pane
              v-for="(item, index) in sidebarNavs"
              :key="index"
              :label="item.label"
              :name="item.name"
            ></el-tab-pane>
          </el-tabs>
          <div class="content">
            <div class="tabpanel" v-if="activeTabName == 'first'">
              <div class="relate-ipt-box">
                <el-input class="ipt" v-model="value" clearable></el-input>
                <div class="result-panel">
                  <div class="list">
                    <el-checkbox-group v-model="checkList">
                      <div
                        class="column"
                        v-for="(item, index) in 180"
                        :key="index"
                      >
                        <el-checkbox :label="'复选框' + index"></el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </div>
                  <div class="bottom">
                    <button>添加</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tabpanel" v-else>
              <el-select
                v-model="value"
                multiple
                filterable
                clearable
                :collapse-tags="false"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in cities"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.value
                  }}</span>
                </el-option>
              </el-select>
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
      value: "",
      cities: [
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
        },
        {
          value: "Chengdu",
          label: "成都"
        },
        {
          value: "Shenzhen",
          label: "深圳"
        },
        {
          value: "Guangzhou",
          label: "广州"
        }
      ],
      checkList: ["复选框1"]
    };
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
    /**
     * @description: 楼栋信息/车位信息切换
     * @return {*}
     */
    switchTab() {
      console.log(this.activeTabName, "=========");
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
  width: 190px;
  height: 38px;
  padding: 1px 8px;
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
  background: #f0f7f7;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .center {
    display: flex;
    padding: 0 24px 32px 24px;
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
      width: 730px;
      .rule {
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
      .time {
        .content {
          /deep/.row-time {
            margin-top: 24px;
            input {
              color: #606266;
            }
            input::-webkit-input-placeholder {
              color: #909399;
            }
            .prefix {
              margin-right: 8px;
              font-size: @font16;
              color: #606266;
              &:nth-of-type(2) {
                margin-left: 24px;
              }
            }
            .set {
              margin-left: 24px;
              font-size: @font16;
              color: #247257;
              cursor: pointer;
            }
            .duration {
              display: inline-block;
              position: relative;
              width: 160px;
              height: 36px;
              border-radius: 4px;
              border: 1px solid #cecece;
              input {
                width: 120px;
                height: 36px;
                padding: 0 10px;
                background: #ffffff;
                border-radius: 4px;
                border: none;
                outline: none;
              }
              span {
                position: absolute;
                top: 0;
                right: 10px;
                line-height: 36px;
                font-size: @font14;
                color: #303133;
                z-index: 9;
              }
            }
          }
        }
      }
      .set {
        .info {
          margin-top: 24px;
          p {
            position: relative;
            padding-left: 16px;
            margin-top: 17px;
            font-size: @font16;
            color: #606266;
            line-height: 21px;
            &:nth-child(1) {
              margin-top: 0;
            }
            &::before {
              content: "";
              position: absolute;
              top: 7px;
              left: 0;
              width: 8px;
              height: 8px;
              border-radius: 8px;
            }
            &.red::before {
              background: #ef5656;
            }
            &.green::before {
              background: #0da88b;
            }
          }
        }
        .set-btn {
          height: 40px;
          padding: 0 16px;
          margin-top: 24px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #247257;
          line-height: 38px;
          font-size: @font16;
          color: #247257;
          outline: none;
          box-sizing: border-box;
          cursor: pointer;
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
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
        .del {
          background: transparent;
          border: none;
          font-size: @font16;
          color: #f56c6c;
          outline: none;
          cursor: pointer;
        }
      }
    }
    .sidebar {
      width: 414px;
      height: 500px;
      margin-left: 24px;
      .right {
        padding: 24px 0;
        height: 634px;
        /deep/.sub-nav {
          display: flex;
          flex-direction: row;
          padding: 0 24px;
          .el-tabs__header {
            margin: 0;
          }
          .el-tabs__item {
            height: 32px;
            line-height: 1;
            font-size: @font18;
            font-weight: bold;
            color: #303133;
            &.is-active {
              color: @backgroud;
            }
          }
          .el-tabs__active-bar {
            height: 4px;
            border-radius: 4px;
          }
          .el-tabs__nav-wrap::after {
            background: rgba(0, 0, 0, 0);
          }
        }
        .content {
          padding: 16px 24px 0;
          .tabpanel {
            /deep/.relate-ipt-box {
              position: relative;
              .ipt {
                .el-input__inner {
                  height: 46px;
                  background: #ffffff;
                  border-radius: 4px;
                  border: 1px solid #cecece;
                  font-size: @font16;
                }
              }
              .result-panel {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: absolute;
                top: 62px;
                width: 100%;
                height: 456px;
                background: #fff;
                box-shadow: 0px 8px 13px 0px rgba(0, 0, 0, 0.1);
                border-radius: 6px;
                box-sizing: border-box;
                .list {
                  overflow: auto;
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
                .bottom {
                  display: flex;
                  justify-content: flex-end;
                  width: 366px;
                  height: 58px;
                  padding: 9px;
                  background: #fff;
                  box-shadow: 0px -2px 15px 0px rgba(0, 0, 0, 0.1);
                  box-sizing: border-box;
                  button {
                    width: 109px;
                    height: 40px;
                    background: #247257;
                    border: none;
                    border-radius: 4px;
                    font-size: @font16;
                    color: #fff;
                    outline: none;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
