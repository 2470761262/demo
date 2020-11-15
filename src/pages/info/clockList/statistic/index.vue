<template>
  <!-- 考勤统计 -->
  <div class="content">
    <div class="head">
      <div class="head-type">
        <div
          class="head-type-item"
          v-for="(item, index) in navs"
          :key="index"
          :class="{ active: currentNavIndex == index }"
          @click="navigateToOhter(item.path)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="head-underling-nva">
        <div class="head-nav-box">
          <div
            class="head-nav-item"
            v-for="(item, index) in subNavs"
            :key="index"
            :class="{ active: currentSubNavIndex == index }"
            @click="navigateToOhter(item.path, index)"
          >
            {{ item.name }}
          </div>
        </div>
        <button class="btn-add" @click="navigateToAdd()">文档导出</button>
      </div>
    </div>
    <div class="scroll">
      <div class="main">
        <div class="clock-rule-conditions">
          <div class="conditions-box">
            <el-row :gutter="32">
              <el-form label-position="right" label-width="64px">
                <el-col :span="8">
                  <el-form-item label="员工姓名">
                    <el-select
                      class="width100 serch-item-select"
                      popper-class="options-item"
                      v-model="input1"
                      placeholder="请选择"
                    >
                      <el-option value="">111111</el-option>
                      <el-option value="正常考勤">222222</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="在职状态">
                    <el-select
                      class="width100 serch-item-select"
                      popper-class="options-item"
                      v-model="input2"
                      placeholder="请选择"
                    >
                      <el-option value="">111111</el-option>
                      <el-option value="正常考勤">222222</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="岗位">
                    <el-select
                      class="width100 serch-item-select"
                      popper-class="options-item"
                      v-model="input3"
                      placeholder="请选择"
                    >
                      <el-option value="">111111</el-option>
                      <el-option value="正常考勤">222222</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-row :gutter="8">
                    <el-form-item label="房屋坐落">
                      <el-col :span="8">
                        <el-select
                          v-model="buildOptData"
                          placeholder="楼盘名称"
                          clearable
                          filterable
                          remote
                          @focus="remoteBuildInput"
                          @change="remoteBuildChange"
                          :remote-method="buildRemoteMethod"
                          :loading="buildLoading"
                          value-key="value"
                        >
                          <el-option
                            v-for="item in buildForList"
                            :key="item.value"
                            :label="item.name"
                            :value="item"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-select
                          v-model="towerOptData"
                          placeholder="栋座"
                          clearable
                          filterable
                          value-key="value"
                          remote
                          :remote-method="queryRoomNo"
                          @change="remoteRoomNoChange"
                          :loading="towerLoading"
                        >
                          <el-option
                            v-for="item in towerForList"
                            :key="item.value"
                            :label="item.name"
                            :value="item"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-select
                          v-model="roomOptData"
                          placeholder="房间号"
                          clearable
                          filterable
                          remote
                          :remote-method="queryRoomData"
                          :loading="roomLoading"
                          value-key="value"
                          @change="queryRoomDataChange"
                        >
                          <el-option
                            v-for="item in roomForList"
                            :key="item.value"
                            :label="item.name"
                            :value="item"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-row>
                </el-col>
                <el-col :span="6" class="fr">
                  <div class="conditions-btn">
                    <div class="btn" @click="reset">
                      重置
                    </div>
                    <div class="btn active" @click="query(1)">
                      搜索
                    </div>
                  </div>
                </el-col>
              </el-form>
            </el-row>
          </div>
        </div>
        <div class="wrapper">
          <div class="right"></div>
          <div class="center">
            <div class="switch-btn-box">
              <div class="switch-btn" @click="switchDataPanel">
                <i class="el-icon-money"></i>
                <span>{{
                  currentPanelIndex == 0 ? "看考勤扣分" : "看考勤数据"
                }}</span>
              </div>
            </div>
            <div class="table">
              <el-table
                v-if="currentPanelIndex == 0"
                :data="tableData1"
                height="100%"
                v-loading="loading"
                ref="tableList"
              >
                <el-table-column
                  min-width="120"
                  prop="addTime1"
                  label="员工信息"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  min-width="200"
                  prop="addTime2"
                  label="在职状态/岗位"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  min-width="200"
                  prop="addTime3"
                  label="考勤要求"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  min-width="200"
                  prop="addTime5"
                  label="考勤"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  min-width="130"
                  prop="addTime6"
                  label="未提交日志"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  min-width="130"
                  prop="addTime7"
                  label="未批阅"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  min-width="200"
                  prop="addTime3"
                  label="事假"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
              <el-table
                v-else
                :data="tableData"
                height="100%"
                v-loading="loading"
                ref="tableList"
              >
                <el-table-column
                  min-width="120"
                  prop="addTime1"
                  label="员工信息"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  min-width="200"
                  prop="addTime2"
                  label="在职状态/岗位"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  min-width="130"
                  prop="checkStatus"
                  label="考勤要求"
                  align="right"
                  show-overflow-tooltip
                >
                  <template v-slot="scope">
                    <span
                      v-if="scope.row.checkStatusStr == '待验真'"
                      class="span_warning"
                      >{{ scope.row.checkStatusStr }}</span
                    >
                    <span
                      v-if="scope.row.checkStatusStr == '验真成功'"
                      class="span_success"
                      >{{ scope.row.checkStatusStr }}</span
                    >
                    <span
                      v-if="scope.row.checkStatusStr == '验真失败'"
                      class="span_danger"
                      >{{ scope.row.checkStatusStr }}</span
                    >
                    <span
                      v-if="scope.row.checkStatusStr == '无效'"
                      class="span_info"
                      >{{ scope.row.checkStatusStr }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  min-width="200"
                  prop="addTime"
                  label="考勤"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  min-width="200"
                  prop="addTime3"
                  label="日志扣分"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  min-width="200"
                  prop="addTime3"
                  label="未批阅扣分"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  min-width="200"
                  prop="addTime3"
                  label="事假扣分"
                  align="right"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageJson.page"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageJson.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageJson.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="sidebar">
        <div class="calendar-head">
          <button class="change-item" @click="prevYear">
            <span class="iconbianzu3 iconfont"></span>
          </button>
          <div class="head-time">
            <div class="head-time-month">{{ year }}年</div>
            <!-- <div class="head-time-year">{{ year }}年</div> -->
          </div>
          <button class="change-item" @click="afterYear">
            <span class="iconbianzu13 iconfont"></span>
          </button>
        </div>
        <div class="calendar-body">
          <div class="column" v-for="(item, index) in months" :key="index">
            {{ item }}月
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//楼盘 楼栋 房间号 级联 mixins
import cascadeHouse from "@/minxi/cascadeHouse";
import clockRuleHead from "@/pages/info/mixins/clockRuleHead.js";
export default {
  mixins: [clockRuleHead, cascadeHouse],
  data() {
    return {
      currentNavIndex: 0,
      loading: false,
      subNavs: [
        {
          name: "我的日志",
          path: "/clockList/myInfo"
        },
        {
          name: "考勤统计",
          path: "/clockList/statistic"
        },
        {
          name: "考勤审批",
          path: "/clockList/examine"
        }
      ],
      input1: "",
      input2: "",
      input3: "",
      currentPanelIndex: 0,
      tableData1: [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 2 }, { id: 2 }],
      tableData: [
        { id: 1 },
        { id: 2 },
        { id: 2 },
        { id: 2 },
        { id: 2 },
        { id: 2 },
        { id: 2 },
        { id: 2 },
        { id: 2 },
        { id: 2 },
        { id: 2 },
        { id: 2 },
        { id: 2 },
        { id: 2 }
      ],
      pageJson: {
        page: 1,
        limit: 10,
        total: 0,
        pageSum: 0
      },
      sortColumn: "id", //排序字段
      sortType: 1, //排序类型
      year: 2020,
      months: [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二"
      ]
    };
  },
  methods: {
    reset() {},
    query() {},
    /**
     * @example: 改变每页请求数据数量
     * @param {val} 请求数
     * @param {type} 分页类型
     */
    handleSizeChange(val) {
      this.pageJson.limit = val;
      this.query();
    },
    /**
     * @example: 改变分页当前页码
     * @param {val} 页码
     * @param {type} 分页类型
     */
    handleCurrentChange(val) {
      this.pageJson.page = val;
      this.query(val);
    },
    switchDataPanel() {
      this.currentPanelIndex = this.currentPanelIndex == 0 ? 1 : 0;
    },
    prevYear() {},
    afterYear() {}
  }
};
</script>
<style lang="less">
.children-page {
  height: 100%;
}
</style>
<style lang="less" scoped>
/*** element下拉选择面板 ***/
.el-select-dropdown__item {
  height: 40px;
  line-height: 40px;
  font-size: @font14;
}
/*** element开关 ***/
/deep/.el-switch {
  .el-switch__core {
    height: 18px;
  }
  .el-switch__core:after {
    width: 14px;
    height: 14px;
  }
  &.is-checked .el-switch__core::after {
    margin-left: -15px;
  }
}
/deep/.clock-rule-conditions {
  padding: 24px 24px 0;
  .conditions-box {
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f2f5;
  }
  .fr {
    float: right;
  }
  .el-form-item__content {
    line-height: inherit;
  }
  .el-form-item__label {
    padding-right: 8px;
    line-height: 36px;
    font-size: @font14;
    color: #303133;
  }
  .el-input__inner {
    height: 36px;
    font-size: @font14;
  }
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-range-input {
    text-align: left;
    text-indent: 5px;
    font-size: @font14;
  }
  .prefix-icon {
    width: 0;
  }
  .el-date-editor {
    width: 100%;
    .el-range-separator {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      padding: 0;
      line-height: 1;
      text-indent: 0;
      font-size: @font14;
    }
  }
  .width100 {
    width: 100%;
  }
  .conditions-btn {
    display: flex;
    justify-content: flex-end;
    .btn {
      width: 90px;
      height: 36px;
      border: none;
      border-radius: 4px;
      background: #fff;
      outline: none;
      line-height: 36px;
      text-align: center;
      font-size: @font14;
      color: @backgroud;
      cursor: pointer;
      &.active {
        background: @backgroud;
        color: #fff;
      }
    }
  }
}
.content {
  flex: 1;
  height: 0;
  background: #f0f7f7;
  display: flex;
  flex-direction: column;
  .head {
    background: #fff;
    // position: sticky;
    // top: 0;
    // z-index: 10;
    .head-type {
      height: 67px;
      display: flex;
      padding: 0 24px;
      border-bottom: 1px solid #f0f2f5;
      .head-type-item {
        position: relative;
        line-height: 67px;
        margin-right: 46px;
        color: #303133;
        font-size: @font18;
        cursor: pointer;
        &.active {
          color: @backgroud;
          font-weight: bold;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: @backgroud;
            border-radius: 2px 2px 0px 0px;
          }
        }
      }
    }
    .head-underling-nva {
      display: flex;
      height: 58px;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      .head-nav-box {
        display: flex;
        .head-nav-item {
          height: 26px;
          padding: 0 8px;
          border-radius: 4px;
          border: 1px solid transparent;
          box-sizing: border-box;
          font-size: @font14;
          text-align: center;
          line-height: 24px;
          color: #606266;
          margin-right: 16px;
          cursor: pointer;
          &.active {
            color: @backgroud;
            background: @opacityBackground;
            border: 1px solid @backgroud;
          }
        }
      }
      .btn-add {
        height: 40px;
        padding: 0 16px;
        line-height: 40px;
        background: @backgroud;
        border: none;
        border-radius: 4px;
        color: #fff;
        outline: none;
        cursor: pointer;
      }
    }
  }
  .scroll {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 24px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .main {
      display: flex;
      flex-direction: column;
      width: 852px;
      background: #fff;
      box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
      border-radius: 8px;
      box-sizing: border-box;
      .wrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        padding: 0 24px;
        margin: 24px 0 27px;
        background: #fff;
        border-radius: 8px;
        box-sizing: border-box;
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
        .right {
          height: 100%;
        }
        /deep/.center {
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
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
          .switch-btn-box {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 16px;
            .switch-btn {
              display: flex;
              align-items: center;
              cursor: pointer;
              i {
                color: @backgroud;
                font-size: @font16;
              }
              span {
                margin-left: 8px;
                line-height: 1;
                color: @backgroud;
                font-size: @font16;
              }
            }
          }
          .table {
            flex: 1;
            display: flex;
            overflow: auto;
            .caret-wrapper {
              width: 15px;
              height: 14px;
              .sort-caret.ascending {
                top: -5px;
              }
              .sort-caret.descending {
                bottom: -3px;
              }
            }
            .has-gutter:not(.is-group) {
              background: #f0f5f4;
              tr:nth-child(1) {
                th:nth-child(1) {
                  .cell {
                    padding-left: 16px;
                  }
                }
                th:nth-last-child(2) {
                  .cell {
                    padding-right: 16px;
                  }
                }
              }
            }
            .el-table__body-wrapper {
              tr {
                td:nth-child(1) {
                  .cell {
                    padding-left: 16px;
                  }
                }
                td:last-child {
                  .cell {
                    padding-right: 16px;
                  }
                }
              }
            }
            .el-table {
              td {
                .cell {
                  line-height: 1;
                  font-size: @font16;
                  color: #606266;
                }
              }
              th {
                height: 48px;
                padding: 0;
                background: #f6f6f6;
                font-weight: normal;
                font-size: @font16;
                color: #303133;
                .cell {
                  line-height: 1;
                }
              }
            }
            .el-table__fixed-right {
              tr {
                th:last-child {
                  padding-right: 16px;
                }
              }
            }
            .el-table__body td {
              height: 64px;
            }
            .el-button--mini,
            .el-button--small {
              padding: 0 10px;
              font-size: @font16;
            }

            .tab-house-box {
              .tab-house-title {
                margin-bottom: 8px;
                font-size: @font16;
                color: #606266;
              }
              .tab-house-no {
                font-size: @font14;
                color: #909399;
              }
            }
            .span_success,
            .span_danger,
            .span_warning,
            .span_info {
              display: inline-block;
              padding: 6px 13px;
              border-radius: 2px;
              line-height: 1;
              text-align: center;
              font-size: @font14;
            }
            .span_success {
              background: #0da88b19;
              color: #0da88b;
            }
            .span_danger {
              background: #ef565619;
              font-size: @font14;
              color: #ef5656;
            }
            .span_warning {
              background: #f6a42019;
              font-size: @font14;
              color: #f6a420;
            }
            .span_info {
              background: #e4e4e4;
              font-size: @font14;
              color: #909399;
            }
          }
          .el-pagination {
            padding: 24px 5px 8px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .el-pager li,
            .btn-next .el-icon,
            .btn-prev .el-icon,
            button,
            span:not([class*="suffix"]) {
              height: auto;
              line-height: 1;
              font-size: @font16;
              font-weight: normal;
            }
            .el-select .el-input {
              width: 80px;
            }
            .el-pagination__sizes .el-input .el-input__inner {
              height: 22px;
              line-height: 20px;
              font-size: @font14;
            }
            .el-pager .more::before {
              line-height: 1;
            }
            .el-pagination__editor {
              height: auto;
              .el-input__inner {
                height: 22px;
              }
            }
            .el-input--mini .el-input__icon {
              line-height: 1;
            }
          }
          .el-table--border,
          .el-table--group {
            border: none;
          }
          .el-table--border::after,
          .el-table--group::after,
          .el-table::before {
            background-color: transparent;
          }
          .el-table--border td {
            border-right: none;
          }
          .is-group {
            tr:first-child {
              th:nth-child(2),
              th:nth-child(3),
              th:nth-child(4) {
                border-bottom: 1px solid #c3dfd9;
                border-right: 1px solid #c3dfd9;
              }
              th:nth-child(5) {
                border-bottom: 1px solid #c3dfd9;
              }
            }
            tr:nth-child(2) {
              th:nth-child(3),
              th:nth-child(6),
              th:nth-child(9) {
                border-right: 1px solid #c3dfd9;
              }
            }
          }
        }
      }
    }
    .sidebar {
      width: 292px;
      height: 220px;
      margin-left: 24px;
      background: #ffffff;
      box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
      border-radius: 8px;
      box-sizing: border-box;
      .calendar-head {
        height: 84px;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .change-item {
          border: 0;
          outline: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          span {
            font-size: @font16;
            color: #606266;
          }
        }
        .head-time {
          text-align: center;
          line-height: 1;
          .head-time-month {
            font-size: @font16;
            color: #303133;
            font-weight: bold;
          }
          .head-time-year {
            font-size: @font12;
            color: #606266;
            margin-top: 8px;
          }
        }
      }
      .calendar-body {
        display: flex;
        flex-wrap: wrap;
        .column {
          display: flex;
          justify-content: center;
          width: 25%;
          font-size: @font14;
          color: #303133;
          cursor: pointer;
          &:nth-child(n + 5) {
            margin-top: 24px;
          }
        }
      }
    }
  }
}
</style>
