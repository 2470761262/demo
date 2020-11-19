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
                      <el-select
                        class="width100"
                        v-model="formData.applyId"
                        placeholder="人员姓名"
                        clearable
                        filterable
                        remote
                        @focus="personnelFocus"
                        @change="query(1)"
                        :remote-method="getPersonnelData"
                        :loading="personnel.loading"
                        value-key="value"
                      >
                        <el-option
                          v-for="item in personnel.list"
                          :key="item.accountId"
                          :label="item.name + '(' + item.departmentName + ')'"
                          :value="item.accountId"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-row :gutter="8">
                      <el-form-item label="所在部门">
                        <el-col :span="12">
                          <el-select
                            v-model="formData.companyId"
                            placeholder="公司名称"
                            clearable
                            filterable
                            remote
                            @focus="companyFocus"
                            @change="companyChange"
                            :loading="company.loading"
                            value-key="value"
                          >
                            <el-option
                              v-for="item in company.list"
                              :key="item.id"
                              :label="item.companyName"
                              :value="item.id"
                            >
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="12">
                          <el-select
                            v-model="formData.departmentId"
                            placeholder="部门"
                            clearable
                            filterable
                            remote
                            :remote-method="getDepartmentData"
                            :loading="department.loading"
                            value-key="value"
                            @change="query(1)"
                            class="width100 serch-item-select"
                          >
                            <el-option
                              v-for="item in department.list"
                              :key="item.id"
                              :label="item.deptName"
                              :value="item.id"
                            >
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-row>
                  </el-col>
                  <el-col :span="9">
                    <el-row :gutter="8">
                      <el-form-item label="申请类型">
                        <el-col :span="12">
                          <el-select
                            class="width100 serch-item-select"
                            popper-class="options-item"
                            v-model="formData.applyType"
                            placeholder="选择申请类型"
                            @change="applyTypeChange"
                          >
                            <el-option
                              v-for="(item, index) in applyTypeList"
                              :key="index"
                              :label="item.key"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="12">
                          <el-select
                            class="width100"
                            v-model="formData.applySubType"
                            clearable
                            placeholder="选择具体类型"
                            @change="query(1)"
                          >
                            <el-option
                              v-for="(item, index) in applySubTypeList"
                              :key="index"
                              :label="item.key"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-row>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="审批状态">
                      <el-select
                        class="width100 serch-item-select"
                        popper-class="options-item"
                        v-model="formData.status"
                        placeholder="请选择审批状态"
                        @change="query(1)"
                      >
                        <el-option
                          v-for="(item, index) in statusList"
                          :key="index"
                          :label="item.key"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="申请时间">
                      <el-date-picker
                        v-model="applyTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        class="anchor-point"
                        @change="applyTimeChange"
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
            <div class="center">
              <div class="table">
                <el-table
                  :data="tableData"
                  height="100%"
                  v-loading="loading"
                  ref="tableList"
                  @row-dblclick="rowDblclick"
                >
                  <el-table-column
                    type="index"
                    width="60"
                    label="序号"
                    prop="id"
                  ></el-table-column>
                  <el-table-column
                    min-width="120"
                    label="申请人"
                    align="right"
                    show-overflow-tooltip
                    prop="applyName"
                  >
                  </el-table-column>
                  <el-table-column
                    min-width="200"
                    prop="applyType"
                    label="类型"
                    align="right"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>{{ scope.row.applyType | applyTypeFilter }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="200"
                    prop="applyDuration"
                    label="时长"
                    align="right"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>{{ scope.row.applyDuration }}天</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="200"
                    prop="createTime"
                    label="申请时间"
                    align="right"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    min-width="200"
                    prop="auditorName"
                    label="审批人"
                    align="right"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>{{ scope.row.auditorName | emptyRead }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="130"
                    prop="status"
                    label="审批结果"
                    align="right"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span :class="statusClass(scope.row.status)">{{
                        scope.row.status | statusFilter
                      }}</span>
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
import clockRuleHead from "@/pages/info/mixins/clockRuleHead.js";
import util from "@/util/util.js";
import { APPLYTYPE } from "@/util/constMap.js";
let statusMap = new Map([
  [0, "未审核"],
  [1, "通过"],
  [2, "不通过"]
]);
let statusClassMap = new Map([
  [0, "span_warning"],
  [1, "span_success"],
  [2, "span_danger"]
]);
export default {
  mixins: [clockRuleHead],
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
      applyTime: [], //申请时间
      tableData: [],
      pageJson: {
        page: 1,
        limit: 10,
        total: 0,
        pageSum: 0
      },
      formData: {
        applyId: "",
        companyId: "",
        departmentId: "",
        applyType: "",
        applySubType: "",
        status: "",
        applyStartTime: "",
        applyEndTime: ""
      },
      applyTypeList: APPLYTYPE, //审核类型
      applySubTypeList: [], //审核子类型
      leaveSubTypeList: [
        {
          key: "事假",
          value: 11
        },
        {
          key: "病假",
          value: 12
        },
        {
          key: "婚嫁",
          value: 13
        },
        {
          key: "产假",
          value: 14
        },
        {
          key: "丧假",
          value: 15
        },
        {
          key: "公休",
          value: 16
        }
      ], //请假子类型
      cardSubTypeList: [
        {
          key: "补卡",
          value: 21
        }
      ], //补卡子类型
      statusList: [
        {
          key: "未审核",
          value: 0
        },
        {
          key: "通过",
          value: 1
        },
        {
          key: "不通过",
          value: 2
        }
      ], //审批状态
      company: {
        loading: false,
        list: []
      }, //公司json
      department: {
        loading: false,
        list: []
      }, //部门json
      personnel: {
        loading: false,
        list: []
      }
    };
  },
  mounted() {
    this.getData();
  },
  computed: {},
  filters: {
    applyTypeFilter(value) {
      return util.countMapFilter(value, "APPLYTYPE", "暂无");
    },
    statusFilter(value) {
      return statusMap.get(value) ? statusMap.get(value) : "暂无";
    }
  },
  methods: {
    /**
     * @example:重置
     */
    reset() {
      Object.keys(this.formData).forEach(item => {
        this.formData[item] = "";
      });
      this.applyTime = "";
      this.query();
    },
    /**
     * @example:查询
     */
    query(page = 1) {
      this.pageJson.page = page;
      this.tableData = [];
      this.getData();
    },
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
      this.query(val);
    },
    /**
     * @example:获取审批结果样式
     */
    statusClass(value) {
      return statusClassMap.get(value);
    },
    /**
     * @example:获取列表数据
     */
    getData() {
      let params = {
        limit: this.pageJson.limit,
        page: this.pageJson.page
      };
      Object.assign(params, JSON.parse(JSON.stringify(this.formData)));
      this.loading = true;
      this.$api
        .post({
          url: "/attendance/apply/list",
          data: params,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.tableData = result.data.list;
            this.pageJson.total = result.data.totalCount;
            this.pageJson.pageSum = result.data.totalPage;
          }
        })
        .finally(e => {
          this.loading = false;
        });
    },
    /**
     * @example:审核类型改变事件
     */
    applyTypeChange(value) {
      let subKeyMap = new Map([
        [1, "leaveSubTypeList"],
        [2, "cardSubTypeList"]
      ]);
      this.applySubTypeList = this[subKeyMap.get(value)];
      this.formData.applySubType = "";
      this.query();
    },
    /**
     * @example: 申请时间改变事件
     */
    applyTimeChange() {
      if (this.applyTime) {
        this.formData.applyStartTime = this.applyTime[0];
        this.formData.applyEndTime = this.applyTime[1];
      } else {
        this.formData.applyStartTime = "";
        this.formData.applyEndTime = "";
      }
      this.query();
    },
    /**
     * @example:公司获取焦点事件
     */
    companyFocus() {
      if (this.company.list.length == 0) {
        this.company.loading = true;
        this.$api
          .post({
            url: "/company/attendance/apply/list"
          })
          .then(e => {
            let result = e.data;
            if (result.code == 200) {
              this.company.list = result.data;
            }
          })
          .finally(e => {
            this.company.loading = false;
          });
      }
    },
    /**
     * @example:公司改变事件
     */
    companyChange() {
      this.formData.departmentId = "";
      this.getDepartmentData();
      this.query();
    },
    /**
     * @example:部门搜索事件
     */
    getDepartmentData(keyWord = "") {
      this.department.list = [];
      if (this.formData.companyId) {
        this.department.loading = true;
        this.$api
          .post({
            url: "/department/attendance/check/list",
            data: {
              limit: 50,
              page: 1,
              keyWord: keyWord,
              companyId: this.formData.companyId
            },
            headers: { "Content-Type": "application/json" }
          })
          .then(e => {
            let result = e.data;
            if (result.code == 200) {
              this.department.list = result.data.list;
            }
          })
          .finally(e => {
            this.department.loading = false;
          });
      }
    },
    /**
     * @example:人员获取焦点事件
     */
    personnelFocus() {
      if (this.personnel.list.length == 0) {
        this.getPersonnelData();
      }
    },
    /**
     * @example:获取人员数据
     */
    getPersonnelData(keyWord) {
      this.personnel.list = [];
      this.personnel.loading = true;
      this.$api
        .post({
          url: "/employee/attendance/check/list",
          data: {
            limit: 50,
            page: 1,
            keyWord: keyWord
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.personnel.list = result.data.list;
          }
        })
        .finally(e => {
          this.personnel.loading = false;
        });
    },
    /**
     * @example:双击事件
     */
    rowDblclick(row) {
      console.log("object :>> ", row);
      let detailsMap = new Map([
        [1, "/leaveDetail"],
        [2, "/repairDetail"]
      ]);
      this.$router.push({
        path: detailsMap.get(row.applyType),
        query: { id: row.id }
      });
    }
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
    }
  }
}
</style>
