<template>
  <div class="add-rule-container">
    <div class="center">
      <div class="main" v-loading="mainLoading">
        <h2 class="topic">考勤规则</h2>
        <div class="panel rule">
          <div class="ipt-box">
            <label for="" class="label" :data-tips="errorBags.first('name')"
              >考勤名称</label
            >
            <el-input
              class="ipt"
              v-model="name"
              name="name"
              placeholder="请输入考勤名称"
              v-validate="'required'"
              data-vv-name="name"
              data-vv-as="考勤名称"
            ></el-input>
          </div>
          <div class="ipt-box">
            <label
              for=""
              class="label"
              :data-tips="errorBags.first('companyId')"
              >适用公司</label
            >
            <el-select
              class="ipt"
              v-model="companyId"
              placeholder="请选择"
              v-validate="'required'"
              data-vv-name="companyId"
              data-vv-as="适用公司"
            >
              <el-option
                v-for="item in companyList"
                :key="item.value"
                :label="item.name"
                :value="item.nameId"
              >
              </el-option>
            </el-select>
          </div>
          <div class="ipt-box">
            <label
              for=""
              class="label"
              :data-tips="errorBags.first('description')"
              >考勤描述</label
            >
            <el-input
              class="textarea"
              type="textarea"
              :rows="2"
              placeholder="请输入规则描述"
              v-model="description"
              v-validate="'required'"
              data-vv-name="description"
              data-vv-as="适用公司"
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
              <span class="prefix">{{ item.day }}，早上</span>
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
                  v-model.number="elasticityNumber"
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
          <div
            class="info"
            v-if="workCalendarDays.length != 0 || workCalendarDays.length != 0"
          >
            <p class="red" v-if="workCalendarDays.length != 0">
              已将{{
                typeof workCalendarDays == "string"
                  ? workCalendarDays
                  : workCalendarDays.join("、")
              }}设置为上班日
            </p>
            <p class="green" v-if="restCalendarDays.length != 0">
              已将{{
                typeof restCalendarDays == "string"
                  ? restCalendarDays
                  : restCalendarDays.join("、")
              }}设置为休息日
            </p>
          </div>
          <button class="set-btn" @click="openDateDialog">
            设置特殊考勤日期
          </button>
        </div>
        <div class="panel bottom">
          <div class="bottom-btn">
            <button class="reset" @click="reset">重置</button>
            <button class="save" @click="save">保存</button>
          </div>
          <button class="del" v-if="ruleId" @click="deleteClick">删除</button>
        </div>
      </div>
      <div class="sidebar">
        <h2 class="topic">关联考勤部门/人员</h2>
        <attendance-relation
          :ruleId="ruleId"
          :companyId="relateCompanyId"
          ref="relationRef"
        ></attendance-relation>
      </div>
    </div>
    <!-- 设置特殊考勤日期弹窗 -->
    <set-clock-date
      :dialogVisible.sync="dialogClockDateVisible"
      :workCalendarDays="workCalendarDays"
      :restCalendarDays="restCalendarDays"
      @setClockSuccess="setClockSuccess"
    ></set-clock-date>
  </div>
</template>
<script>
import setClockDate from "./components/setClockDate.vue";
import attendanceRelation from "./components/attendanceRelation.vue";
export default {
  components: { setClockDate, attendanceRelation },
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      mainLoading: false,
      ruleId: null,
      dialogClockDateVisible: false,
      workCalendarDays: [],
      restCalendarDays: [],
      name: "",
      companyId: "",
      description: "",
      companyList: [],
      ruleTime: [
        {
          day: "周一",
          morningTs: ["", ""],
          afternoonTs: ["", ""]
        },
        {
          day: "周二",
          morningTs: ["", ""],
          afternoonTs: ["", ""]
        },
        {
          day: "周三",
          morningTs: ["", ""],
          afternoonTs: ["", ""]
        },
        {
          day: "周四",
          morningTs: ["", ""],
          afternoonTs: ["", ""]
        },
        {
          day: "周五",
          morningTs: ["", ""],
          afternoonTs: ["", ""]
        },
        {
          day: "周六",
          morningTs: ["", ""],
          afternoonTs: ["", ""]
        },
        {
          day: "周日",
          morningTs: ["", ""],
          afternoonTs: ["", ""]
        }
      ],
      elasticityNumber: "",
      relateCompanyId: null
    };
  },
  created() {
    if (this.$route.query.id) {
      this.ruleId = this.$route.query.id;
      this.getRuleDetail();
    }
    this.queryCompany();
  },
  methods: {
    /**
     * @description: 获取考勤规则详情
     * @param {*}
     * @return {*}
     */
    getRuleDetail() {
      this.mainLoading = true;
      this.$api
        .get({
          url: `/attendance/rule/${this.ruleId}`,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.relateCompanyId = data.data.companyId;
            this.name = data.data.name;
            this.companyId = data.data.companyId;
            this.companyName = data.data.companyName;
            this.description = data.data.description;
            this.elasticityNumber = data.data.elasticityNumber;
            // 特殊日期时间转化
            let specialDoChecking = data.data.specialDoChecking.map(item => {
              return item.replace(" 00:00:00", "");
            });
            let specialNoChecking = data.data.specialNoChecking.map(item => {
              return item.replace(" 00:00:00", "");
            });
            this.workCalendarDays = specialDoChecking;
            this.restCalendarDays = specialNoChecking;
            data.data.doChecking.map(item => {
              this.ruleTime[item.type - 1].morningTs = [
                item.morningStartTime,
                item.morningEndTime
              ];
              this.ruleTime[item.type - 1].afternoonTs = [
                item.afternoonStartTime,
                item.afternoonEndTime
              ];
            });
          }
        })
        .finally(e => {
          this.mainLoading = false;
        });
    },
    /**
     * @description: 获取适用公司列表
     * @param {*}
     * @return {*}
     */
    queryCompany() {
      this.$api
        .get({
          url: "/attendance/rule/auth/company",
          data: {},
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.companyList = e.data.data;
          }
        });
    },
    /**
     * @description: 复制前一天考勤时间
     * @param {Number} index 当天考勤日
     * @return {*}
     */
    copyPreDayTs(index) {
      let preDayTimeArr = Object.assign({}, this.ruleTime[index - 1], {
        day: this.ruleTime[index].day
      });
      this.ruleTime.splice(index, 1, preDayTimeArr);
    },
    openDateDialog() {
      this.dialogClockDateVisible = true;
    },
    setClockSuccess(date1, date2) {
      this.workCalendarDays = date1;
      this.restCalendarDays = date2;
      this.dialogClockDateVisible = false;
    },
    /**
     * @description: 重置
     * @param {*}
     * @return {*}
     */
    reset() {
      Object.assign(this.$data, this.$options.data(), {
        ruleId: this.$data.ruleId,
        companyList: this.$data.companyList
      });
    },
    /**
     * @description: 保存
     * @param {*}
     * @return {*}
     */
    save() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          this.$message.error("请先填写完整考勤规则内容！");
        } else {
          let doChecking = [];
          this.ruleTime.forEach((item, index) => {
            doChecking.push({
              type: index + 1,
              morningStartTime: item.morningTs[0],
              morningEndTime: item.morningTs[1],
              afternoonStartTime: item.afternoonTs[0],
              afternoonEndTime: item.afternoonTs[1]
            });
          });
          let specialDoChecking = this.workCalendarDays.map(item => {
            return item + " 00:00:00";
          });
          let specialNoChecking = this.restCalendarDays.map(item => {
            return item + " 00:00:00";
          });
          let currentCompanyIndex = this.companyList.findIndex(row => {
            return row.nameId == this.companyId;
          });
          let params = {
            name: this.name,
            companyId: this.companyId,
            companyName: this.companyList[currentCompanyIndex].name,
            description: this.description,
            doChecking: doChecking,
            specialDoChecking: specialDoChecking,
            specialNoChecking: specialNoChecking,
            elasticityNumber: this.elasticityNumber
          };
          if (this.ruleId) {
            params.id = this.ruleId;
          }
          this.$api
            .post({
              url: "/attendance/rule",
              data: params,
              headers: { "Content-Type": "application/json" }
            })
            .then(e => {
              if (e.data.code == 200) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.ruleId = e.data.data;
                this.relateCompanyId = this.companyId;
              }
            });
        }
      });
    },
    /**
     * @description: 删除
     * @param {*}
     * @return {*}
     */
    deleteClick() {
      this.$confirm("您确定要删除选中的数据吗?删除后，数据将不可恢复", {
        confirmButtonText: "扔要删除",
        cancelButtonText: "我再想想",
        title: "温馨提示",
        center: true
      }).then(() => {
        this.$api
          .delete({
            url: `/attendance/rule/${this.ruleId}`
          })
          .then(e => {
            if (e.data.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.$router.go(-1);
            }
          });
      });
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
    padding: 0 24px 32px 24px;
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
      width: 730px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
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
            &::after {
              content: attr(data-tips);
              font-size: @font14;
              margin-left: 20px;
              color: red;
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
        .del {
          height: 40px;
          background: transparent;
          border: none;
          line-height: 40px;
          font-size: @font16;
          color: #f56c6c;
          outline: none;
          cursor: pointer;
          float: right;
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
    }
  }
}
</style>
