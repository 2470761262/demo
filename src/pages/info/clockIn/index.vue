<style lang="less" scoped>
.content {
  flex: 1;
  background: #f0f7f7;
  display: flex;
  justify-content: center;
  .center {
    padding: 24px 24px 32px 24px;
    .clock-title {
      font-size: @font24;
    }
    .layout-warper {
      margin-top: 24px;
      display: flex;
      .clock-content {
        width: 852px;
        background: #fff;
        box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
        border-radius: 8px;
        padding: 24px;
        box-sizing: border-box;
        .col-title {
          font-size: @font16;
          display: flex;
          align-items: center;
          color: #303133;
          font-weight: bold;
          margin-top: 24px;
          &:first-child {
            margin-top: 0;
          }
          &.is-require {
            &::before {
              content: "";
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #f62f2f;
              margin-right: 4px;
            }
            &::after {
              content: attr(data-tips);
              font-size: @font14;
              margin-left: 20px;
              color: red;
            }
          }
        }
        .col-content {
          .col-check {
            display: flex;
            margin-top: 16px;
            .col-check-item {
              height: 48px;
              width: 103px;
              background: #f0f2f5;
              border-radius: 4px;
              font-size: @font16;
              text-align: center;
              line-height: 48px;
              margin-right: 16px;
              cursor: pointer;
              color: #909399;
              input {
                display: none;
              }
              &.active {
                background: @backgroud;
                color: #fff;
              }
            }
          }
          .col-textarea {
            margin-top: 16px;
            width: 579px;
            height: 162px;
            /deep/.el-textarea {
              height: 100%;
              .el-textarea__inner {
                height: 100%;
                padding: 16px;
                font-size: @font16;
                font-family: "Microsoft Yahei", Helvetica, Arial, sans-serif;
                //   &::placeholder {
                //     font-size: @font16;
                //   }
              }
              .el-input__count {
                bottom: 16px;
                right: 16px;
                font-size: @font16;
              }
            }
          }
        }
        .clock-foot {
          display: flex;
          margin-top: 24px;
          button {
            width: 109px;
            height: 40px;
            background: #f4f4f5;
            border-radius: 4px;
            outline: none;
            border: 0;
            font-size: @font16;
            margin-right: 16px;
            cursor: pointer;
            &:last-child {
              margin-right: 0;
            }
          }
          .btn-reset {
            background: #f4f4f5;
          }
          .btn-submit {
            color: #fff;
            background: @backgroud;
          }
        }
      }
      .clock-righ {
        margin-left: 24px;
      }
    }
  }
}
</style>
<template>
  <div class="content">
    <div class="center" v-loading="loading">
      <h3 class="clock-title">忙碌一日后，不妨写一点什么记录一下今天！</h3>
      <div class="layout-warper">
        <div class="clock-content">
          <div
            class="col-title is-require"
            :data-tips="errorBags.first('activeScore')"
          >
            自评分
          </div>
          <div class="col-content">
            <div class="col-check">
              <label
                class="col-check-item"
                v-for="item in score"
                :key="item"
                :class="{ active: form.activeScore == item }"
              >
                <input
                  type="radio"
                  v-model="form.activeScore"
                  :value="item"
                  name="activeScore"
                  v-validate="'required'"
                  data-vv-name="activeScore"
                  data-vv-as="自评分"
                />
                <span>{{ item }}分</span>
              </label>
            </div>
          </div>
          <template v-if="config.growth">
            <div
              class="col-title is-require"
              :data-tips="errorBags.first('growth')"
            >
              今日成长与问题
            </div>
            <div class="col-content">
              <div class="col-textarea">
                <el-input
                  type="textarea"
                  placeholder="请输入今日总结"
                  v-model="form.growth"
                  maxlength="50"
                  data-vv-validate-on="change"
                  v-validate="'required|arrGTLength:20'"
                  data-vv-name="growth"
                  data-vv-as="今日总结"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </div>
            </div>
          </template>
          <template v-if="config.share">
            <div
              class="col-title is-require"
              :data-tips="errorBags.first('share')"
            >
              今日案例分享
            </div>
            <div class="col-content">
              <div class="col-textarea">
                <el-input
                  type="textarea"
                  placeholder="请输入今日案例分享"
                  v-model="form.share"
                  maxlength="50"
                  show-word-limit
                  resize="none"
                  data-vv-validate-on="change"
                  v-validate="'required|arrGTLength:20'"
                  data-vv-name="share"
                  data-vv-as="今日案例分享"
                >
                </el-input>
              </div>
            </div>
          </template>
          <template v-if="config.excavate">
            <div class="col-title">今日挖掘优质房源</div>
            <div class="col-content">
              <div class="col-textarea">
                <el-input
                  type="textarea"
                  placeholder="请输入今日挖掘优质房源"
                  v-model="form.excavate"
                  maxlength="50"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </div>
            </div>
          </template>
          <template v-if="config.clientDemand">
            <div class="col-title ">急购客户需求</div>
            <div class="col-content">
              <div class="col-textarea">
                <el-input
                  type="textarea"
                  placeholder="请输入急购客户需求"
                  v-model="form.clientDemand"
                  maxlength="50"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </div>
            </div>
          </template>
          <template v-if="config.plan">
            <div class="col-title">明日计划</div>
            <div class="col-content">
              <div class="col-textarea">
                <el-input
                  type="textarea"
                  placeholder="请输入明日计划"
                  v-model="form.plan"
                  maxlength="50"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </div>
            </div>
          </template>

          <div class="clock-foot">
            <button class="btn-reset" @click="resetForm">重置</button>
            <button class="btn-submit" @click="validateForm">提交日志</button>
          </div>
        </div>
        <div class="clock-righ">
          <clock-time />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clockTime from "../components/clockTime";
export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    clockTime
  },
  data() {
    return {
      loading: true,
      score: [1, 2, 3, 4, 5],
      form: {
        activeScore: "",
        plan: "", //明日计划 >> (普通,经纪人,店长)
        growth: "", //今日成长与问题 >> (普通,经纪人,店长)
        excavate: "", //今日挖掘优质房源 >> (经纪人,店长)
        clientDemand: "", //急购客户需求 >> (经纪人,店长)
        share: "" //案例分享 >> (店长)
      },
      config: {
        plan: false,
        growth: false,
        excavate: false,
        clientDemand: false,
        share: false
      }
    };
  },
  created() {
    this.getPerType();
  },
  methods: {
    /**
     * @example: 获取人员显示权限
     */
    getPerType() {
      this.$api
        .post({
          url: "/attendance/attendanceWorkSummary/judgeSummaryType"
        })
        .then(({ data }) => {
          switch (data.data.type) {
            case 1: //普通员工
              this.setConfig({
                growth: true,
                plan: true
              });
              break;
            case 2: //经纪人
              this.setConfig({
                growth: true,
                plan: true,
                excavate: true,
                clientDemand: true
              });
              break;
            case 3: //店长
              this.setConfig({
                growth: true,
                plan: true,
                excavate: true,
                clientDemand: true,
                share: true
              });
              break;
            default:
              //默认普通员工
              this.setConfig({
                growth: true,
                plan: true
              });
              break;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //重置
    resetForm() {
      this.$router.go();
    },
    //显示界面
    setConfig(options) {
      this.config = { ...this.config, ...options };
    },
    //表单验证
    validateForm() {
      this.$validator.validate().then(e => {
        if (e) {
          this.submitForm();
        }
      });
    },
    submitForm() {
      this.$api
        .post({
          url: "/attendance/attendanceWorkSummary/saveSummary",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selfScore: this.form.activeScore,
            planTomorrow: this.form.plan,
            caseShareToday: this.form.share,
            excavateHouseToday: this.form.excavate,
            urgentCustomerRequire: this.form.clientDemand,
            summaryToday: this.form.growth
          }
        })
        .then(({ data }) => {
          this.$message.success(data.message);
          setTimeout(() => {
            this.$router.go(-1);
          }, 500);
        });
    }
  }
};
</script>
