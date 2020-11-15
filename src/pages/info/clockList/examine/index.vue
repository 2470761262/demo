<template>
  <!-- 考勤审批 -->
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
        <button class="btn-add" @click="navigateToAdd()">新增考勤规则</button>
      </div>
    </div>
    <div class="scroll">
      <div class="container">
        <div class="main">
          <div class="clock-rule-conditions">
            <div class="conditions-box">
              <el-row :gutter="32">
                <el-form label-position="right" label-width="64px">
                  <el-col :span="6">
                    <el-form-item label="申请人">
                      <el-input
                        class="width100"
                        clearable
                        v-model="input1"
                        maxlength="5"
                        placeholder="员工姓名"
                        oninput="value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')"
                        @blur="query"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-row :gutter="8">
                      <el-form-item label="房屋坐落">
                        <el-col :span="8">
                          <el-select
                            v-model="buildOptData"
                            placeholder="楼盘名称"
                            class="input-content  anchor-point"
                            clearable
                            filterable
                            remote
                            popper-class="options-myhouse-custom-item anchor-point"
                            data-anchor="我的验真楼盘 => select"
                            @click.native="log_socket.sendUserActionData"
                            @focus="remoteBuildInput"
                            @change="remoteBuildChange"
                            :remote-method="buildRemoteMethod"
                            :loading="buildLoading"
                            value-key="value"
                          >
                            <el-option
                              v-for="item in buildForList"
                              class="anchor-point"
                              :data-anchor="
                                '我的验真列表楼盘 => select => option:' +
                                  item.name
                              "
                              @click.native="log_socket.sendUserActionData"
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
                            class="input-content  anchor-point"
                            popper-class="options-myhouse-custom-item anchor-point"
                            data-anchor="我的验真栋座 => select"
                            @click.native="log_socket.sendUserActionData"
                            value-key="value"
                            remote
                            :remote-method="queryRoomNo"
                            @change="remoteRoomNoChange"
                            :loading="towerLoading"
                          >
                            <el-option
                              v-for="item in towerForList"
                              class="anchor-point"
                              :data-anchor="
                                '我的验真列表栋座 => select => option:' +
                                  item.name
                              "
                              @click.native="log_socket.sendUserActionData"
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
                            popper-class="options-myhouse-custom-item anchor-point"
                            class="input-content  anchor-point"
                            data-anchor="我的验真房号 => select"
                            @click.native="log_socket.sendUserActionData"
                            remote
                            :remote-method="queryRoomData"
                            :loading="roomLoading"
                            value-key="value"
                            @change="queryRoomDataChange"
                          >
                            <el-option
                              v-for="item in roomForList"
                              class="anchor-point"
                              :data-anchor="
                                '我的验真列表房号 => select => option:' +
                                  item.name
                              "
                              @click.native="log_socket.sendUserActionData"
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
                  <el-col :span="8">
                    <el-row :gutter="8">
                      <el-form-item label="申请类型">
                        <el-col :span="12">
                          <el-select
                            class="serch-item-select"
                            popper-class="options-item"
                            v-model="input2"
                            placeholder="选择申请类型"
                          >
                            <el-option value="">全部</el-option>
                            <el-option value="正常考勤">正常考勤</el-option>
                            <el-option value="迟到">迟到</el-option>
                            <el-option value="早退">早退</el-option>
                            <el-option value="旷工">旷工</el-option>
                            <el-option value="请假">请假</el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="12">
                          <el-select
                            class="width100"
                            v-model="input3"
                            clearable
                            placeholder="选择具体类型"
                          >
                            <el-option value="">全部</el-option>
                            <el-option value="正常考勤">正常考勤</el-option>
                            <el-option value="迟到">迟到</el-option>
                            <el-option value="早退">早退</el-option>
                            <el-option value="旷工">旷工</el-option>
                            <el-option value="请假">请假</el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-row>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="审批状态">
                      <el-select
                        class="serch-item-select"
                        popper-class="options-item"
                        v-model="input4"
                        placeholder="请选择"
                      >
                        <el-option value="">全部</el-option>
                        <el-option value="正常考勤">正常考勤</el-option>
                        <el-option value="迟到">迟到</el-option>
                        <el-option value="早退">早退</el-option>
                        <el-option value="旷工">旷工</el-option>
                        <el-option value="请假">请假</el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="申请时间">
                      <el-date-picker
                        v-model="time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        class="anchor-point"
                      >
                      </el-date-picker>
                    </el-form-item>
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
            <div class="content">
              <div class="table">
                <el-table
                  :data="tableData"
                  height="100%"
                  v-loading="loading"
                  ref="tableList"
                >
                  <el-table-column
                    fixed="left"
                    label="房屋信息"
                    width="230"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <div class="tab-house-box">
                        <div class="tab-house-title">
                          {{ scope.row.communityName
                          }}{{
                            scope.row.buildingName
                              ? "-" + scope.row.buildingName
                              : ""
                          }}{{ scope.row.roomNo ? "-" + scope.row.roomNo : "" }}
                        </div>
                        <div class="tab-house-no">{{ scope.row.houseNo }}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="130"
                    prop="checkStatus"
                    label="验真状态"
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
                    label="售价"
                    align="right"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>{{ scope.row.price }}万</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="面积"
                    align="right"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>{{ scope.row.inArea }}㎡</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="户型"
                    align="right"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span
                        >{{ scope.row.rooms || 0 }}-{{ scope.row.hall || 0 }}-{{
                          scope.row.toilet || 0
                        }}-{{ scope.row.balcony || 0 }}</span
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="addPerName"
                    label="录入人"
                    align="right"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <div class="tab-house-box">
                        <div class="tab-house-title">
                          {{ scope.row.addPerName }}
                        </div>
                        <div class="tab-house-no">{{ scope.row.deptName }}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="验真类型"
                    align="right"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>{{ scope.row.sourceStr }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="200"
                    prop="addTime"
                    label="提交时间"
                    align="right"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                  <el-table-column
                    fixed="right"
                    label="操作"
                    align="right"
                    width="300"
                  >
                    <template v-slot="scope">
                      <el-button
                        @click="handleCallClick(scope.row)"
                        type="text"
                        size="small"
                        :disabled="scope.row.checkStatusStr != '待验真'"
                        >一键拨号</el-button
                      >
                      <el-button
                        @click="handleTestClick(scope.row)"
                        type="text"
                        size="small"
                        :disabled="scope.row.checkStatusStr != '待验真'"
                        >房源验真</el-button
                      >
                      <el-button
                        @click="handleRecordClick(scope.row)"
                        type="text"
                        size="small"
                        >验真记录</el-button
                      >
                    </template>
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
      input4: "",
      time: [],
      tableData: [],
      pageJson: {
        page: 1,
        limit: 10,
        total: 0,
        pageSum: 0
      },
      sortColumn: "id", //排序字段
      sortType: 1 //排序类型
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
    }
  }
};
</script>
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
    padding: 0;
    line-height: 36px;
    text-align: left;
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
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .container {
      display: flex;
      padding: 24px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        background: #fff;
        box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
        border-radius: 8px;
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
          /deep/.content {
            flex: 1;
            display: flex;
            flex-direction: column;
            width: 100%;
            .table {
              flex: 1;
              display: flex;
              .caret-wrapper {
                // prettier-ignore
                width: 15PX;
                // prettier-ignore
                height: 14PX;
                .sort-caret.ascending {
                  // prettier-ignore
                  top: -5PX;
                }
                .sort-caret.descending {
                  // prettier-ignore
                  bottom: -3PX;
                }
              }
              .has-gutter:not(.is-group) {
                background: #f0f5f4;
                tr:nth-child(1) {
                  th:nth-child(1) {
                    .cell {
                      // prettier-ignore
                      padding-left: 16PX;
                    }
                  }
                  th:nth-last-child(2) {
                    .cell {
                      // prettier-ignore
                      padding-right: 16PX;
                    }
                  }
                }
              }
              .el-table__body-wrapper {
                tr {
                  td:nth-child(1) {
                    .cell {
                      // prettier-ignore
                      padding-left: 16PX;
                    }
                  }
                  td:last-child {
                    .cell {
                      // prettier-ignore
                      padding-right: 16PX;
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
                  // prettier-ignore
                  height: 48PX;
                  padding: 0;
                  background: #f0f5f4;
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
                    // prettier-ignore
                    padding-right: 16PX;
                  }
                }
              }
              .el-table__body td {
                // prettier-ignore
                height: 64PX;
              }
              .el-button--mini,
              .el-button--small {
                // prettier-ignore
                padding: 0 10PX;
                font-size: @font16;
              }

              .tab-house-box {
                .tab-house-title {
                  // prettier-ignore
                  margin-bottom: 8PX;
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
                // prettier-ignore
                padding: 6PX 13PX;
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
              // prettier-ignore
              padding: 24PX 5PX 8PX;
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
                // prettier-ignore
                width: 80PX;
              }
              .el-pagination__sizes .el-input .el-input__inner {
                // prettier-ignore
                height: 22PX;
                // prettier-ignore
                line-height: 20PX;
                font-size: @font14;
              }
              .el-pager .more::before {
                line-height: 1;
              }
              .el-pagination__editor {
                height: auto;
                .el-input__inner {
                  // prettier-ignore
                  height: 22PX;
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
    }
  }
}
</style>
