<style lang="less" scoped>
.content {
  flex: 1;
  background: #f0f7f7;
  display: flex;
  justify-content: center;
  padding: 24px;
  .content-left {
    width: 852px;
    .evaluate {
      display: flex;
      .self-evaluate {
        .box;
        margin-right: 24px;
        width: 201px;
        min-height: 132px;
        line-height: 1;
        .self-title {
          margin-top: 20px;
          font-size: @font14;
          color: #909399;
        }
        .self-point-value {
          display: flex;
          align-items: baseline;
          font-size: 32px;
          color: #303133;
          font-weight: bold;
          margin-top: 30px;
        }
      }
      .other-evaluate {
        flex: 1;
        .box;
        display: flex;
        .other-point {
          line-height: 1;
          width: 124px;
          padding-top: 20px;
          .other-point-title {
            font-size: @font14;
            color: #909399;
          }
          .other-point-value {
            .self-evaluate > .self-point-value;
            font-size: @font24;
          }
        }
        .split-line {
          align-self: center;
          width: 1px;
          height: 74px;
          background: #f0f2f5;
        }
        .other-evaluate-right {
          margin-left: 24px;
          flex: 1;
          padding: 20px 0;
          line-height: 1;
          .other-evaluate-title {
            font-size: @font14;
            color: #909399;
          }
          .other-evaluate-tips {
            padding: 8px 8px 8px 20px;
            background: #f8f8f9;
            display: flex;
            margin-top: 24px;
            align-items: center;
            div {
              flex: 1;
              color: #606266;
              font-size: @font14;
            }
            button {
              height: 32px;
              background: #ffa02a;
              border-radius: 4px;
              outline: none;
              border: 0;
              color: #fff;
              width: 84px;
              cursor: pointer;
              &.sumit {
                background: @backgroud;
                color: #fff;
              }
            }
          }
        }
      }
    }
    .layout-contnet {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -12px;
      .cell-item {
        flex: 0 0 calc((100% - 48px) / 2);
        margin: 24px 12px 0;
        min-height: 188px;
        .box;
        padding-bottom: 24px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        h3 {
          padding-top: 24px;
          font-size: @font18;
          font-weight: bold;
          line-height: 1;
        }
        p {
          margin-top: 12px;
          flex: 1;
          font-size: @font14;
          line-height: 26px;
          color: #606266;
          word-break: break-all;
        }
      }
    }
  }
  .content-righ {
    margin-left: 24px;
    .check-detail-box {
      .box;
      margin-top: 24px;
      .check-detail-time {
        .detail-item-title {
          font-size: @font18;
          color: #303133;
          line-height: 1;
          font-weight: bold;
          padding-top: 24px;
          padding-bottom: 18px;
        }
        .detail-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 1;
          padding-bottom: 24px;
          .flex-item {
            .itme-title {
              font-size: @font14;
              color: #909399;
              margin-bottom: 17px;
            }
            .item-time {
              font-size: @font24;
              color: #303133;
              font-weight: bold;
            }
            .item-type {
              margin-top: 12px;
              font-size: @font14;
              &[data-type="error"] {
                color: #ef5656;
              }
              &[data-type="info"] {
                color: #909399;
              }
              &[data-type="normal"] {
                color: #0da88b;
              }
              &[data-type="warning"] {
                color: #f6a420;
              }
            }
          }
        }
      }
      .log-time {
        border-top: 1px solid #f0f2f5;
        border-bottom: 1px solid #f0f2f5;
        padding-bottom: 24px;
        .log-time-title {
          .check-detail-time > .detail-item-title;
        }
        .log-operate-warp {
          display: flex;
          justify-content: space-between;
          align-items: center;
          div {
            color: #303133;
            font-size: @font16;
          }
          button {
            border: 0;
            outline: none;
            background: @backgroud;
            color: #fff;
            width: 62px;
            height: 28px;
            border-radius: 4px;
            cursor: pointer;
          }
        }
      }
      .per-warp {
        display: flex;
        align-items: center;
        padding: 24px 0;
        img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
        }
        .per-data {
          margin-left: 12px;
          .per-data-head {
            display: flex;
            align-items: center;
            line-height: 1;
            .per-data-name {
              display: flex;
              color: #303133;
              font-size: @font18;
              font-weight: bold;
            }
            .per-data-type {
              padding: 0 4px;
              height: 16px;
              border-radius: 2px;
              border: 1px solid @backgroud;
              box-sizing: border-box;
              text-align: center;
              line-height: 14px;
              color: @backgroud;
              margin-left: 8px;
            }
          }
          .per-data-phone {
            font-size: @font14;
            color: #303133;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
.box() {
  background: #ffffff;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
  padding: 0 24px;
}
.point-after {
  &::after {
    content: "分";
    font-size: @font14;
  }
}
</style>

<template>
  <div class="content" v-loading="loading">
    <div class="content-left">
      <div class="evaluate">
        <div class="self-evaluate">
          <div class="self-title">员工自评分</div>
          <div
            class="self-point-value "
            :class="{ 'point-after': detailt.selfScore != null }"
          >
            {{ detailt.selfScore | isNull }}
          </div>
        </div>
        <div class="other-evaluate">
          <div class="other-point">
            <div class="other-point-title">上级评分</div>
            <div
              class="other-point-value"
              :class="{ 'point-after': detailt.checkScore != null }"
            >
              {{ detailt.checkScore | isNull }}
            </div>
          </div>
          <div class="split-line"></div>
          <div class="other-evaluate-right">
            <div class="other-evaluate-title">上级评价</div>
            <div class="other-evaluate-tips">
              <div v-if="isShowRemindBtn">
                好像还没点评哦！可以适当的提醒一下
              </div>
              <div v-else>{{ detailt.checkContent | isNull }}</div>
              <button v-if="isShowRemindBtn" @click="remindLog">
                提醒
              </button>
              <button
                class="sumit"
                @click="setvisible(true)"
                v-if="isShowRemark"
              >
                开始点评
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="layout-contnet">
        <div class="cell-item" v-if="config.excavate">
          <h3>今日挖掘优质房源</h3>
          <p>
            {{ detailt.excavateHouseToday }}
          </p>
        </div>
        <div class="cell-item" v-if="config.clientDemand">
          <h3>急购客户需求</h3>
          <p>
            {{ detailt.urgentCustomerRequire || "暂无" }}
          </p>
        </div>
        <div class="cell-item" v-if="config.growth">
          <h3>今日总结</h3>
          <p>
            {{ detailt.summaryToday || "暂无" }}
          </p>
        </div>
        <div class="cell-item" v-if="config.plan">
          <h3>明日计划</h3>
          <p>
            {{ detailt.planTomorrow || "暂无" }}
          </p>
        </div>
        <div class="cell-item" v-if="config.share">
          <h3>今日案例分享</h3>
          <p>
            {{ detailt.caseShareToday || "暂无" }}
          </p>
        </div>
      </div>
    </div>
    <div class="content-righ">
      <clock-time />
      <div class="check-detail-box">
        <template v-if="!detailt.isMyAddSummary && !loading">
          <div class="per-warp">
            <img :src="detailt.personImageUrl" alt="" />
            <div class="per-data">
              <div class="per-data-head">
                <div class="per-data-name">{{ detailt.personName }}</div>
                <div class="per-data-type">{{ detailt.roleName }}</div>
              </div>
              <div class="per-data-phone">{{ detailt.tel }}</div>
            </div>
          </div>
          <div class="log-time">
            <div class="log-time-title">日志提交时间</div>
            <div class="log-operate-warp">
              <div>{{ detailt.addSummaryTime }}</div>
              <button v-if="isShowRemark" @click="setvisible(true)">
                去点评
              </button>
            </div>
          </div>
        </template>
        <div class="check-detail-time">
          <div class="detail-item-title">考勤时间</div>
          <div class="detail-flex">
            <div class="flex-item">
              <div class="itme-title">上班</div>
              <div class="item-time">
                {{ detailt.morningCheckInTime || "暂无" }}
              </div>
              <div class="item-type" data-type="normal">
                {{ detailt.morningCheckInResult | getText }}
              </div>
            </div>
            <div>/</div>
            <div class="flex-item">
              <div class="itme-title">上班</div>
              <div class="item-time">
                {{ detailt.afternoonCheckInTime || "暂无" }}
              </div>
              <div class="item-type" data-type="error">
                {{ detailt.afternoonCheckInResult | getText }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <summary-comment-pop
      title="总结点评"
      width="608px"
      @hideChange="getDetailSummary"
      :visible.sync="visible"
      v-if="visible"
    />
  </div>
</template>

<script>
import clockTime from "../components/clockTime";
import summaryCommentPop from "./compoents/summaryCommentPop";

function textColor(type) {
  switch (type) {
    case 0:
      return "normal";
    case 1: //迟到
    case 2: //早退
    case 4: //请假
    case 5: //迟到请假
      return "warning";
    case 3: //旷工
      return "error";
    default:
      return "warning";
  }
}
export default {
  components: {
    clockTime,
    summaryCommentPop
  },
  filters: {
    getText(value) {
      if (value == null || value == "") return "暂无";
      const text = ["正常", "迟到", "早退", "旷工", "请假", "迟到早退"];
      return text[value];
    },
    isNull(value) {
      return value == null ? "暂无" : value;
    }
  },
  computed: {
    //是否显示提醒按钮
    isShowRemindBtn() {
      if (!this.loading) {
        if (this.detailt.isMyAddSummary && this.detailt.checkStatus == 0) {
          return true;
        }
      }
      return false;
    },
    //不是自己的写的就显示去点评 未批阅状态
    isShowRemark() {
      if (!this.loading) {
        if (!this.detailt.isMyAddSummary && this.detailt.checkStatus == 0) {
          return true;
        }
      }
      return false;
    }
  },
  data() {
    return {
      visible: false,
      loading: true,
      detailt: {},
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
    Promise.all([this.getPerType(), this.getDetailSummary()]).finally(() => {
      this.loading = false;
    });
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
        });
    },
    /**
     * @example: 提醒批阅日志
     */
    remindLog() {
      this.$api
        .post({
          url: "/attendance/attendanceWorkSummary/remindCheckSummary",
          data: {
            id: this.$route.query.id
          },
          qs: true
        })
        .then(({ data }) => {
          this.$message.success(data.message);
        });
    },
    //显示界面
    setConfig(options) {
      this.config = { ...this.config, ...options };
    },
    setvisible(bool) {
      this.visible = bool;
    },
    /**
     * @example: 获取详情
     */
    getDetailSummary() {
      this.$api
        .post({
          url: "/attendance/attendanceWorkSummary/detailSummary",
          data: {
            id: this.$route.query.id
          },
          qs: true
        })
        .then(({ data }) => {
          this.detailt = {
            ...data.data,
            morningCheckInType: textColor(data.data.morningCheckInResult),
            afternoonCheckInType: textColor(data.data.afternoonCheckInResult)
          };
        });
    }
  }
};
</script>
