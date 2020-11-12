<style lang="less" scoped>
.list-content {
  display: flex;
  margin-top: 24px;
  justify-content: center;
  padding-bottom: 24px;
  .list-left {
    width: 852px;
    background: #fff;
    box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
    border-radius: 8px;
    padding: 24px;
    box-sizing: border-box;
    flex-shrink: 0;
    .list-serch {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #f0f2f5;
      .serch-item-btn {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        button {
          outline: 0;
          border: 0;
          width: 90px;
          height: 36px;
          border-radius: 4px;
          line-height: 36px;
          cursor: pointer;
        }
        .serch-reset {
          background: transparent;
          color: @backgroud;
        }
        .serch-submit {
          background: @backgroud;
          color: #fff;
          margin-left: 8px;
        }
      }
      .serch-item {
        display: flex;
        align-items: center;
        margin-right: 16px;
        margin-bottom: 16px;
        &:nth-child(4n -1) {
          margin-right: 0;
        }
        .serch-item-text {
          width: 56px;
          text-align: center;
          color: #303133;
          font-size: @font14;
          margin-right: 8px;
        }
        .serch-item-select {
          width: 193px;
          /deep/.el-input {
            .el-input__inner {
              height: 40px;
              line-height: 40px;
            }
          }
        }
      }
    }
    .list-tab {
      display: table;
      width: 100%;
      //table-layout: fixed;
      border-collapse: collapse;
      margin-top: 24px;
      .list-tab-head {
        background: #f6f6f6;
        display: table-header-group;
        .list-tab-col {
          display: table-cell;
          height: 48px;
          vertical-align: middle;
          font-size: @font16;
          color: #303133;
          &:nth-child(3) {
            padding-right: 20px;
          }
          &:first-child {
            padding-left: 16px;
          }
          &:last-child {
            text-align: center;
          }
        }
      }
      .list-tab-body {
        display: table-row-group;
        .tab-body-row {
          display: table-row;
          width: 100%;
          height: 96px;
          border-bottom: 1px solid #f0f2f5;
          &:hover {
            box-shadow: 0px 7px 12px 0px rgba(0, 0, 0, 0.08);
          }
          .tab-body-cell {
            display: table-cell;
            vertical-align: middle;
            &:first-child {
              padding-left: 16px;
            }
            &:last-child {
              text-align: center;
            }
            .clock-day {
              line-height: 1;
              color: #606266;
              .clock-time-head {
                font-size: @font16;
              }
              .clock-time-week {
                font-size: @font14;
                margin-top: 8px;
              }
            }
            .clock-per {
              display: flex;
              line-height: 1;
              .clock-per-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
              .clock-per-data {
                margin-left: 16px;
                flex-shrink: 0;
                .per-data-head {
                  display: flex;
                  .per-name {
                    color: #606266;
                    font-size: @font16;
                    margin-right: 8px;
                  }
                  .per-type {
                    border: 1px solid @backgroud;
                    width: 56px;
                    height: 16px;
                    font-size: @font12;
                    text-align: center;
                    line-height: 14px;
                    border-radius: 2px;
                    box-sizing: border-box;
                    color: @backgroud;
                  }
                }
                .per-dept {
                  color: #909399;
                  font-size: @font14;
                  margin-top: 10px;
                }
              }
            }
            .clock-result {
              line-height: 1;
              .clock-result-head {
                font-size: @font16;
                color: #606266;
              }
              .clock-result-type {
                font-size: @font12;
                margin-top: 8px;
                &[data-type="error"] {
                  color: #ef5656;
                }
                &[data-type="normal"] {
                  color: #0da88b;
                }
                &[data-type="warning"] {
                  color: #f6a420;
                }
              }
            }
            .clock-log {
              font-size: @font16;
              color: #606266;
            }
            .clock-read {
              width: 80px;
              height: 26px;
              text-align: center;
              line-height: 26px;
              border-radius: 4px;
              font-size: @font14;
              display: inline-block;
              &[data-type="error"] {
                color: #ef5656;
                background: rgba(239, 86, 86, 0.1);
              }
              &[data-type="info"] {
                color: #909399;
                background: rgba(144, 147, 153, 0.1);
              }
              &[data-type="normal"] {
                color: #0da88b;
                background: rgba(13, 168, 139, 0.1);
              }
              &[data-type="warning"] {
                color: #f6a420;
                background: rgba(246, 164, 32, 0.1);
              }
            }
          }
        }
      }
    }
  }
  .list-right {
    width: 292px;
    margin-left: 24px;

    .posi-sticky {
      position: sticky;
      top: 24px;
      .calendar-dots {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        &.is-hide {
          visibility: hidden;
        }
      }
      .calendar-foot {
        display: flex;
        height: 55px;
        align-items: center;
        padding-left: 16px;
        .calendar-foot-item {
          display: flex;
          font-size: @font14;
          align-items: center;
          margin-right: 22px;
          color: #606266;
          &:last-child {
            margin-right: 0;
          }
          &:nth-child(1) {
            &::before {
              background: #0da88b;
            }
          }
          &:nth-child(2) {
            &::before {
              background: #f6a420;
            }
          }
          &:nth-child(3) {
            &::before {
              background: #ef5656;
            }
          }
          &::before {
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 8px;
          }
        }
      }
    }
  }
}
.options-item {
  .el-select-dropdown__item {
    height: 48px;
    line-height: 48px;
    font-size: @font16;
  }
  .el-select-dropdown__wrap {
    // prettier-ignore
    max-height: 274PX;
  }
  .el-select-dropdown__item {
    display: flex;
    // prettier-ignore
    height: 40PX;
    // prettier-ignore
    line-height: 40PX;
    /deep/span {
      font-size: @font14;
    }
  }
  /deep/.popper__arrow {
    // prettier-ignore
    top: -6PX ;
  }
}
</style>
<template>
  <div class="list-content">
    <div class="list-left">
      <div class="list-serch">
        <div class="serch-item">
          <div class="serch-item-text">员工信息</div>
          <el-select
            class="serch-item-select"
            v-model="root.value"
            placeholder="请选择"
            filterable
            popper-class="options-item"
          >
            <el-option value="34">111 </el-option>
          </el-select>
        </div>
        <div class="serch-item">
          <div class="serch-item-text">考勤状态</div>
          <el-select
            class="serch-item-select"
            popper-class="options-item"
            v-model="root.value"
            placeholder="请选择"
          >
            <el-option value="">全部</el-option>
            <el-option value="正常考勤">正常考勤</el-option>
            <el-option value="迟到">迟到</el-option>
            <el-option value="早退">早退</el-option>
            <el-option value="旷工">旷工</el-option>
            <el-option value="请假">请假</el-option>
          </el-select>
        </div>
        <div class="serch-item">
          <div class="serch-item-text">日志提交</div>
          <el-select
            class="serch-item-select"
            v-model="root.value"
            placeholder="请选择"
            popper-class="options-item"
          >
            <el-option value="">全部</el-option>
            <el-option value="已提交">已提交</el-option>
            <el-option value="未提交">未提交</el-option>
          </el-select>
        </div>
        <div class="serch-item">
          <div class="serch-item-text">批阅情况</div>
          <el-select
            class="serch-item-select"
            v-model="root.value"
            placeholder="请选择"
            popper-class="options-item"
          >
            <el-option value="">全部</el-option>
            <el-option value="已批阅">已批阅</el-option>
            <el-option value="未批阅">未批阅</el-option>
          </el-select>
        </div>
        <div class="serch-item-btn">
          <button class="serch-reset">重置</button>
          <button class="serch-submit">搜索</button>
        </div>
      </div>
      <div class="list-tab">
        <div class="list-tab-head">
          <div class="list-tab-col">考勤日志</div>
          <div class="list-tab-col">考勤人</div>
          <div class="list-tab-col">上午考勤</div>
          <div class="list-tab-col">下午考勤</div>
          <div class="list-tab-col">日志</div>
          <div class="list-tab-col">日志批阅</div>
        </div>
        <div class="list-tab-body">
          <div class="tab-body-row">
            <div class="tab-body-cell">
              <div class="clock-day">
                <div class="clock-time-head">2020-12-16</div>
                <div class="clock-time-week">星期五</div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-per">
                <img
                  class="clock-per-img"
                  src="https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1962761216.jpg"
                  alt=""
                />
                <div class="clock-per-data">
                  <div class="per-data-head">
                    <div class="per-name">林俊杰</div>
                    <div class="per-type">无考勤组</div>
                  </div>
                  <div class="per-dept">国贸一店</div>
                </div>
              </div>
            </div>
            <!-- 上午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  11:25:09
                </div>
                <div class="clock-result-type" data-type="error">
                  旷工
                </div>
              </div>
            </div>
            <!-- 下午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  外出，未打卡
                </div>
                <div class="clock-result-type" data-type="normal">
                  已审批
                </div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-log">
                已提交
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-read" data-type="normal">
                已批阅
              </div>
            </div>
          </div>
          <div class="tab-body-row">
            <div class="tab-body-cell">
              <div class="clock-day">
                <div class="clock-time-head">2020-12-16</div>
                <div class="clock-time-week">星期五</div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-per">
                <img
                  class="clock-per-img"
                  src="https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1962761216.jpg"
                  alt=""
                />
                <div class="clock-per-data">
                  <div class="per-data-head">
                    <div class="per-name">林俊杰</div>
                    <div class="per-type">无考勤组</div>
                  </div>
                  <div class="per-dept">国贸一店</div>
                </div>
              </div>
            </div>
            <!-- 上午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  11:25:09
                </div>
                <div class="clock-result-type" data-type="error">
                  旷工
                </div>
              </div>
            </div>
            <!-- 下午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  外出，未打卡
                </div>
                <div class="clock-result-type" data-type="normal">
                  已审批
                </div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-log">
                已提交
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-read" data-type="normal">
                已批阅
              </div>
            </div>
          </div>
          <div class="tab-body-row">
            <div class="tab-body-cell">
              <div class="clock-day">
                <div class="clock-time-head">2020-12-16</div>
                <div class="clock-time-week">星期五</div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-per">
                <img
                  class="clock-per-img"
                  src="https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1962761216.jpg"
                  alt=""
                />
                <div class="clock-per-data">
                  <div class="per-data-head">
                    <div class="per-name">林俊杰</div>
                    <div class="per-type">无考勤组</div>
                  </div>
                  <div class="per-dept">国贸一店</div>
                </div>
              </div>
            </div>
            <!-- 上午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  11:25:09
                </div>
                <div class="clock-result-type" data-type="error">
                  旷工
                </div>
              </div>
            </div>
            <!-- 下午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  外出，未打卡
                </div>
                <div class="clock-result-type" data-type="error">
                  早退
                </div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-log">
                已提交
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-read" data-type="normal">
                已批阅
              </div>
            </div>
          </div>
          <div class="tab-body-row">
            <div class="tab-body-cell">
              <div class="clock-day">
                <div class="clock-time-head">2020-12-16</div>
                <div class="clock-time-week">星期五</div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-per">
                <img
                  class="clock-per-img"
                  src="https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1962761216.jpg"
                  alt=""
                />
                <div class="clock-per-data">
                  <div class="per-data-head">
                    <div class="per-name">林俊杰</div>
                    <div class="per-type">无考勤组</div>
                  </div>
                  <div class="per-dept">国贸一店</div>
                </div>
              </div>
            </div>
            <!-- 上午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  11:25:09
                </div>
                <div class="clock-result-type" data-type="warning">
                  迟到
                </div>
              </div>
            </div>
            <!-- 下午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  外出，未打卡
                </div>
                <div class="clock-result-type" data-type="warning">
                  请假
                </div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-log">
                已提交
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-read" data-type="warning">
                待批阅
              </div>
            </div>
          </div>
          <div class="tab-body-row">
            <div class="tab-body-cell">
              <div class="clock-day">
                <div class="clock-time-head">2020-12-16</div>
                <div class="clock-time-week">星期五</div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-per">
                <img
                  class="clock-per-img"
                  src="https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1962761216.jpg"
                  alt=""
                />
                <div class="clock-per-data">
                  <div class="per-data-head">
                    <div class="per-name">林俊杰</div>
                    <div class="per-type">无考勤组</div>
                  </div>
                  <div class="per-dept">国贸一店</div>
                </div>
              </div>
            </div>
            <!-- 上午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  11:25:09
                </div>
                <div class="clock-result-type" data-type="error">
                  旷工
                </div>
              </div>
            </div>
            <!-- 下午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  外出，未打卡
                </div>
                <div class="clock-result-type" data-type="normal">
                  已审批
                </div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-log">
                已提交
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-read" data-type="info">
                无需批阅
              </div>
            </div>
          </div>
          <div class="tab-body-row">
            <div class="tab-body-cell">
              <div class="clock-day">
                <div class="clock-time-head">2020-12-16</div>
                <div class="clock-time-week">星期五</div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-per">
                <img
                  class="clock-per-img"
                  src="https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1962761216.jpg"
                  alt=""
                />
                <div class="clock-per-data">
                  <div class="per-data-head">
                    <div class="per-name">林俊杰</div>
                    <div class="per-type">无考勤组</div>
                  </div>
                  <div class="per-dept">国贸一店</div>
                </div>
              </div>
            </div>
            <!-- 上午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  11:25:09
                </div>
                <div class="clock-result-type" data-type="error">
                  旷工
                </div>
              </div>
            </div>
            <!-- 下午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  外出，未打卡
                </div>
                <div class="clock-result-type" data-type="normal">
                  已审批
                </div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-log">
                已提交
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-read" data-type="error">
                未批阅
              </div>
            </div>
          </div>
          <div class="tab-body-row">
            <div class="tab-body-cell">
              <div class="clock-day">
                <div class="clock-time-head">2020-12-16</div>
                <div class="clock-time-week">星期五</div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-per">
                <img
                  class="clock-per-img"
                  src="https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1962761216.jpg"
                  alt=""
                />
                <div class="clock-per-data">
                  <div class="per-data-head">
                    <div class="per-name">林俊杰</div>
                    <div class="per-type">无考勤组</div>
                  </div>
                  <div class="per-dept">国贸一店</div>
                </div>
              </div>
            </div>
            <!-- 上午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  11:25:09
                </div>
                <div class="clock-result-type" data-type="error">
                  旷工
                </div>
              </div>
            </div>
            <!-- 下午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  外出，未打卡
                </div>
                <div class="clock-result-type" data-type="normal">
                  已审批
                </div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-log">
                已提交
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-read" data-type="normal">
                已批阅
              </div>
            </div>
          </div>
          <div class="tab-body-row">
            <div class="tab-body-cell">
              <div class="clock-day">
                <div class="clock-time-head">2020-12-16</div>
                <div class="clock-time-week">星期五</div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-per">
                <img
                  class="clock-per-img"
                  src="https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1962761216.jpg"
                  alt=""
                />
                <div class="clock-per-data">
                  <div class="per-data-head">
                    <div class="per-name">林俊杰</div>
                    <div class="per-type">无考勤组</div>
                  </div>
                  <div class="per-dept">国贸一店</div>
                </div>
              </div>
            </div>
            <!-- 上午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  11:25:09
                </div>
                <div class="clock-result-type" data-type="error">
                  旷工
                </div>
              </div>
            </div>
            <!-- 下午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  外出，未打卡
                </div>
                <div class="clock-result-type" data-type="normal">
                  已审批
                </div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-log">
                已提交
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-read" data-type="normal">
                已批阅
              </div>
            </div>
          </div>
          <div class="tab-body-row">
            <div class="tab-body-cell">
              <div class="clock-day">
                <div class="clock-time-head">2020-12-16</div>
                <div class="clock-time-week">星期五</div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-per">
                <img
                  class="clock-per-img"
                  src="https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1962761216.jpg"
                  alt=""
                />
                <div class="clock-per-data">
                  <div class="per-data-head">
                    <div class="per-name">林俊杰</div>
                    <div class="per-type">无考勤组</div>
                  </div>
                  <div class="per-dept">国贸一店</div>
                </div>
              </div>
            </div>
            <!-- 上午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  11:25:09
                </div>
                <div class="clock-result-type" data-type="error">
                  旷工
                </div>
              </div>
            </div>
            <!-- 下午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  外出，未打卡
                </div>
                <div class="clock-result-type" data-type="normal">
                  已审批
                </div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-log">
                已提交
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-read" data-type="normal">
                已批阅
              </div>
            </div>
          </div>
          <div class="tab-body-row">
            <div class="tab-body-cell">
              <div class="clock-day">
                <div class="clock-time-head">2020-12-16</div>
                <div class="clock-time-week">星期五</div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-per">
                <img
                  class="clock-per-img"
                  src="https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1962761216.jpg"
                  alt=""
                />
                <div class="clock-per-data">
                  <div class="per-data-head">
                    <div class="per-name">林俊杰</div>
                    <div class="per-type">无考勤组</div>
                  </div>
                  <div class="per-dept">国贸一店</div>
                </div>
              </div>
            </div>
            <!-- 上午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  11:25:09
                </div>
                <div class="clock-result-type" data-type="error">
                  旷工
                </div>
              </div>
            </div>
            <!-- 下午考勤 -->
            <div class="tab-body-cell">
              <div class="clock-result">
                <div class="clock-result-head">
                  外出，未打卡
                </div>
                <div class="clock-result-type" data-type="normal">
                  已审批
                </div>
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-log">
                已提交
              </div>
            </div>
            <div class="tab-body-cell">
              <div class="clock-read" data-type="normal">
                已批阅
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-right">
      <div class="posi-sticky">
        <ls-collapse v-model="root.activeCollapse">
          <ls-collapse-item sign="calendar" :title="root.calendarTiem">
            <ls-calendar
              :is-empty="false"
              :current="root.current"
              v-model="root.calendarTiem"
            >
              <template v-slot:dots="{ col }">
                <div
                  class="calendar-dots"
                  :class="{ 'is-hide': root.calendarTiem == col.time }"
                  :style="{ 'background-color': root.color[col.type] }"
                ></div>
              </template>
              <template v-slot:foot>
                <div class="calendar-foot">
                  <div class="calendar-foot-item">考勤正常</div>
                  <div class="calendar-foot-item">考勤异常</div>
                  <div class="calendar-foot-item">无考勤</div>
                </div>
              </template>
            </ls-calendar>
          </ls-collapse-item>
          <ls-collapse-item sign="calendar1" title="sxsx">
            <template>
              <div>2222</div>
            </template>
          </ls-collapse-item>
        </ls-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { V2Init } from "vcomposition2";
import lsCalendar from "@/pages/info/components/calendar";
import { enter } from "./realization/index";
import lsCollapse from "@/pages/info/components/collapse";
import lsCollapseItem from "@/pages/info/components/collapseItem";
export default V2Init({
  created: [enter],
  components: {
    lsCalendar,
    lsCollapse,
    lsCollapseItem
  }
});
</script>
