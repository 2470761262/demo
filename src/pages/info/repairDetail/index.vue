<template>
  <!-- 补卡申请详情页 -->
  <div class="add-rule-container">
    <div class="center">
      <div class="main">
        <div class="handle-box">
          <div class="handle">
            <div class="left">
              <div class="title">待审批</div>
              <p class="text">请对改补卡申请进行审核</p>
            </div>
            <button class="handle-btn" @click="openExamineDialog">
              进行审核
            </button>
          </div>
        </div>
        <div class="panel body">
          <div class="row">
            <div class="row-title">补卡时间</div>
            <div class="row-content">
              <div class="row-around">2020-11-10&nbsp;周三</div>
            </div>
          </div>
          <div class="row">
            <div class="row-title">补卡班次</div>
            <div class="row-content">
              <div class="row-leave-duration">
                上午（08:59:00）迟到<span class="pre"></span
                >上午（11:59:00）早退<span class="pre"></span
                >下午（17:59:00）早退
              </div>
            </div>
          </div>
          <div class="row">
            <div class="row-title">补卡原因</div>
            <div class="row-content">
              <div class="row-around">
                这里是总结这里是总结这里是总结这里是总结这里是总结这这里
                这里是总结这里是总结这里是总结这里是总结这里这里
              </div>
            </div>
          </div>
          <div class="row">
            <div class="row-title">图片</div>
            <div class="row-content">
              <div class="row-pic-box">
                <el-image
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"
                ></el-image>
                <el-image
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"
                ></el-image>
              </div>
            </div>
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
        <div class="panel applyer batch">
          <div class="title">审批流</div>
          <div class="timeline">
            <div class="timeline-item pendding">
              <div class="circle"></div>
              <div class="line"></div>
              <div class="timeline-title">
                <span class="ts">2020-11-09 23:28:37</span>
                <span class="status">等待审核</span>
              </div>
              <div class="timeline-content">
                <div class="detail">
                  <span class="row">审批人员：周杰伦（中诚门店）</span>
                  <span class="row">审批情况：审核进行中请耐心等待</span>
                </div>
              </div>
            </div>
            <div class="timeline-item success">
              <div class="circle"></div>
              <div class="line"></div>
              <div class="timeline-title">
                <span class="ts">2020-11-09 23:28:37</span>
                <span class="status">审核通过</span>
              </div>
              <div class="timeline-content">
                <div class="detail">
                  <span class="row">审批人员：周杰伦（中诚门店）</span>
                  <span class="row">审批情况：审核已通过</span>
                </div>
              </div>
            </div>
            <div class="timeline-item fail">
              <div class="circle"></div>
              <div class="line"></div>
              <div class="timeline-title">
                <span class="ts">2020-11-09 23:28:37</span>
                <span class="status">审核不通过</span>
              </div>
              <div class="timeline-content">
                <div class="detail">
                  <span class="row">审批人员：周杰伦（中诚门店）</span>
                  <span class="row">审批情况：审核已通过</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 审核弹窗 -->
    <examine-dialog :dialogVisible.sync="examineDialogVisible"></examine-dialog>
  </div>
</template>
<script>
import examineDialog from "./components/examineDialog.vue";
export default {
  components: { examineDialog },
  data() {
    return {
      examineDialogVisible: false
    };
  },
  methods: {
    openExamineDialog() {
      this.examineDialogVisible = true;
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
  width: 160px;
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
      .handle-box {
        width: 100%;
        margin-bottom: 21px;
        background: #fff;
        box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
        border-radius: 8px;
        box-sizing: border-box;
        .handle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-radius: 8px;
          background: linear-gradient(
            266deg,
            rgba(255, 150, 0, 0) 0%,
            rgba(255, 150, 0, 0.1) 100%
          );
          .left {
            .title {
              margin-bottom: 16px;
              line-height: 1;
              font-size: @font16;
              font-weight: bold;
              color: #303133;
            }
            .text {
              line-height: 1;
              color: #ff9600;
              font-size: @font16;
            }
          }
          .handle-btn {
            height: 32px;
            padding: 0 14px;
            background: @backgroud;
            border: none;
            border-radius: 4px;
            color: #fff;
            outline: none;
            cursor: pointer;
          }
        }
      }
      .body {
        .row {
          &:last-child {
            .row-content {
              margin-bottom: 0;
            }
          }
          .row-title {
            margin-bottom: 16px;
            font-size: @font16;
            font-weight: bold;
            color: #303133;
          }
          .row-content {
            margin-bottom: 24px;
            .row-around {
              line-height: 26px;
              font-size: @font16;
              color: #606266;
            }
            .row-leave-duration {
              margin-bottom: 16px;
              line-height: 1;
              font-size: @font16;
              color: #606266;
              .pre {
                margin: 0 16px;
                color: #303133;
              }
            }
            .row-pic-box {
              display: flex;
              .el-image {
                width: 72px;
                height: 72px;
                margin-right: 16px;
              }
            }
          }
        }
      }
    }
    .sidebar {
      width: 292px;
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
      .batch {
        margin-top: 24px;
        .timeline {
          .timeline-item {
            position: relative;
            &:last-child {
              .line {
                display: none;
              }
            }
            &.pendding {
              .circle {
                background-image: url(~@/assets/images/leaveDetail_timeline_pending.svg);
              }
              .status {
                background: rgba(246, 164, 32, 0.1);
                color: #f6a420;
              }
            }
            &.success {
              .circle {
                background-image: url(~@/assets/images/leaveDetail_timeline_success.svg);
              }
              .status {
                background: rgba(13, 168, 139, 0.1);
                color: #0da88b;
              }
            }
            &.fail {
              .circle {
                background-image: url(~@/assets/images/leaveDetail_timeline_fail.svg);
              }
              .status {
                background: rgba(239, 86, 86, 0.1);
                color: #ef5656;
              }
            }
            .circle {
              position: absolute;
              top: 2px;
              left: 0;
              width: 16px;
              height: 16px;
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
              border-radius: 14px;
              box-sizing: border-box;
            }
            .line {
              position: absolute;
              top: 26px;
              left: 8px;
              bottom: 10px;
              width: 1px;
              background: #d8d8d8;
            }
            .timeline-title {
              display: flex;
              justify-content: space-between;
              height: 20px;
              padding-left: 32px;
              margin-bottom: 12px;
              line-height: 20px;
              .ts {
                font-size: @font14;
                color: #303133;
              }
              .status {
                width: 64px;
                height: 20px;
                border-radius: 2px;
                line-height: 20px;
                text-align: center;
                font-size: @font12;
              }
            }
            .timeline-content {
              padding: 0 0 12px 32px;
              .detail {
                width: 100%;
                padding: 18px 10px;
                background: #f8f8f8;
                border-radius: 4px;
                box-sizing: border-box;
                .row {
                  display: inline-block;
                  margin-bottom: 14px;
                  line-height: 1;
                  font-size: @font12;
                  color: #606266;
                  &:last-child {
                    margin-bottom: 0;
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
