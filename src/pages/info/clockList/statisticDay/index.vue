<template>
  <!-- 考勤统计 -->
  <div class="content" v-loading="pageLoading">
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
        <button
          class="btn-add"
          @click="excelExport"
          v-if="functionRuleObj.export"
        >
          文档导出
        </button>
      </div>
    </div>
    <div class="scroll" ref="scrollRef">
      <div class="scroll-container">
        <div class="main">
          <div class="clock-rule-conditions">
            <div class="conditions-box">
              <el-row :gutter="16">
                <el-form label-position="right" label-width="64px">
                  <el-col :span="6" v-if="functionRuleObj.employee">
                    <el-form-item label="员工姓名">
                      <el-select
                        class="width100"
                        popper-class="options-item"
                        v-model="employeeId"
                        placeholder="请选择"
                        filterable
                        @focus="employeeFocus"
                        remote
                        :remote-method="queryEmployee"
                        :loading="employee.loading"
                        clearable
                        @change="query()"
                      >
                        <el-option
                          v-for="(item, index) in employee.list"
                          :key="index"
                          :value="item.accountId"
                          :label="item.perName"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col
                    :span="6"
                    v-if="functionRuleObj.company && functionRuleObj.department"
                  >
                    <el-row :gutter="8">
                      <el-form-item label="所在部门">
                        <el-col :span="12" v-if="functionRuleObj.company">
                          <el-select
                            class="width100"
                            v-model="companyId"
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
                        <el-col :span="12" v-if="functionRuleObj.department">
                          <el-select
                            v-model="departmentId"
                            placeholder="部门"
                            clearable
                            filterable
                            remote
                            :remote-method="getDepartmentData"
                            :loading="department.loading"
                            value-key="value"
                            @change="query(1)"
                            class="width100"
                          >
                            <el-option
                              v-for="item in department.list"
                              :key="item.deptId"
                              :label="item.deptName"
                              :value="item.deptId"
                            >
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-row>
                  </el-col>
                  <el-col :span="6" v-if="functionRuleObj.position">
                    <el-form-item label="岗位">
                      <el-select
                        class="width100"
                        popper-class="options-item"
                        v-model="positionId"
                        placeholder="请选择"
                        filterable
                        @focus="positionFocus"
                        remote
                        :remote-method="queryPosition"
                        :loading="position.loading"
                        clearable
                        @change="query()"
                      >
                        <el-option
                          v-for="(item, index) in position.list"
                          :key="index"
                          :label="item.positionName"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="functionRuleObj.status">
                    <el-form-item label="在职状态">
                      <el-select
                        class="width100"
                        popper-class="options-item"
                        v-model="status"
                        placeholder="请选择"
                        @change="query()"
                      >
                        <el-option
                          v-for="(item, index) in statusList"
                          :key="index"
                          :value="item.value"
                          :label="item.label"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="functionRuleObj.status">
                    <el-form-item label="考勤要求">
                      <el-select
                        class="width100"
                        popper-class="options-item"
                        v-model="clockRequire"
                        placeholder="请选择"
                        clearable
                        @change="query()"
                      >
                        <el-option
                          v-for="(item, index) in requireList"
                          :key="index"
                          :value="item.value"
                          :label="item.label"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="functionRuleObj.status">
                    <el-form-item label="考勤状态">
                      <el-select
                        class="width100"
                        popper-class="options-item"
                        v-model="clockStatus"
                        placeholder="请选择"
                        clearable
                        @change="query()"
                      >
                        <el-option
                          v-for="(item, index) in clockStatusList"
                          :key="index"
                          :value="item.value"
                          :label="item.label"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" class="fr">
                    <div class="conditions-btn">
                      <div
                        class="btn"
                        @click="reset"
                        v-if="
                          functionRuleObj.company ||
                            functionRuleObj.department ||
                            functionRuleObj.employee ||
                            functionRuleObj.status ||
                            functionRuleObj.position
                        "
                      >
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
              <div class="week-list">
                <div class="cut-box" @click="cutWeek('last')">
                  <i class="iconfont iconbianzu3"></i>
                  <span>上一周</span>
                </div>
                <div
                  v-for="(item, idx) in weekList"
                  :key="idx"
                  @click="changeDate(item)"
                  class="week-box"
                  :class="[
                    { weekDisbled: nowDate < item.time },
                    { weekActive: checkedDate == item.date }
                  ]"
                >
                  <div class="week-text">{{ item.week }}</div>
                  <div class="week-date">{{ item.date }}</div>
                </div>
                <div
                  class="cut-box"
                  @click="cutWeek('next')"
                  :class="{ weekDisbled: nowDate < weekList[6].time }"
                >
                  <i class="iconfont iconbianzu13"></i>
                  <span>下一周</span>
                </div>
              </div>
              <div class="table">
                <el-table
                  :data="tableData"
                  v-loading="loading"
                  ref="tableList"
                  @sort-change="sortChange"
                >
                  <el-table-column
                    min-width="140"
                    label="考勤人/要求"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <div class="person-info">
                        <el-image
                          style="width: 40px; height: 40px"
                          :src="scope.row.personImageUrl"
                          fit="cover"
                        ></el-image>
                        <div class="info">
                          <div class="name">
                            {{ scope.row.personName
                            }}<span
                              v-if="scope.row.attendanceType == 0"
                              class="span_success"
                              >需要考勤</span
                            >
                            <span
                              v-if="scope.row.attendanceType == 1"
                              class="span_warning"
                              >无需考勤</span
                            >
                          </div>
                          <div class="deptname">
                            {{ scope.row.departmentName }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="131"
                    label="上午考勤/状态"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <div class="clock-box">
                        <div class="clock-box-left">
                          <div>
                            上班：{{
                              scope.row.morningOnDutyTime | formateTime
                            }}
                          </div>
                          <div>
                            下班：{{
                              scope.row.morningOffDutyTime | formateTime
                            }}
                          </div>
                        </div>
                        <div class="clock-box-right">
                          <div
                            v-if="
                              scope.row.morningOnDutyResult ==
                                scope.row.morningOffDutyResult
                            "
                          >
                            <div
                              :class="[
                                { green: scope.row.morningOffDutyResult == 0 },
                                {
                                  yellow:
                                    scope.row.morningOffDutyResult == 1 ||
                                    scope.row.morningOffDutyResult == 4
                                },
                                {
                                  red:
                                    scope.row.morningOffDutyResult == 2 ||
                                    scope.row.morningOffDutyResult == 3 ||
                                    scope.row.morningOffDutyResult == 5
                                }
                              ]"
                            >
                              {{
                                scope.row.morningOffDutyResult | formateResult
                              }}
                              <span v-if="scope.row.morningOffDutyResult == 4">
                                {{
                                  scope.row.morningLeaveType || " - 暂无"
                                }}</span
                              >
                            </div>
                          </div>
                          <div v-else>
                            <div
                              :class="[
                                { green: scope.row.morningOnDutyResult == 0 },
                                {
                                  yellow:
                                    scope.row.morningOnDutyResult == 1 ||
                                    scope.row.morningOnDutyResult == 4
                                },
                                {
                                  red:
                                    scope.row.morningOnDutyResult == 2 ||
                                    scope.row.morningOnDutyResult == 3 ||
                                    scope.row.morningOnDutyResult == 5
                                }
                              ]"
                            >
                              {{
                                scope.row.morningOnDutyResult | formateResult
                              }}
                              <span v-if="scope.row.morningOnDutyResult == 4">
                                {{
                                  scope.row.morningLeaveType || " - 暂无"
                                }}</span
                              >
                            </div>
                            <div
                              :class="[
                                { green: scope.row.morningOffDutyResult == 0 },
                                {
                                  yellow:
                                    scope.row.morningOffDutyResult == 1 ||
                                    scope.row.morningOffDutyResult == 4
                                },
                                {
                                  red:
                                    scope.row.morningOffDutyResult == 2 ||
                                    scope.row.morningOffDutyResult == 3 ||
                                    scope.row.morningOffDutyResult == 5
                                }
                              ]"
                            >
                              {{
                                scope.row.morningOffDutyResult | formateResult
                              }}
                              <span v-if="scope.row.morningOffDutyResult == 4">
                                {{
                                  scope.row.morningLeaveType || " - 暂无"
                                }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="131"
                    label="下午考勤/状态"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <div class="clock-box">
                        <div class="clock-box-left">
                          <div>
                            上班：{{
                              scope.row.afternoonOnDutyTime | formateTime
                            }}
                          </div>
                          <div>
                            下班：{{
                              scope.row.afternoonOffDutyTime | formateTime
                            }}
                          </div>
                        </div>
                        <div class="clock-box-right">
                          <div
                            v-if="
                              scope.row.afternoonOnDutyResult ==
                                scope.row.afternoonOffDutyResult
                            "
                          >
                            <div
                              :class="[
                                {
                                  green: scope.row.afternoonOffDutyResult == 0
                                },
                                {
                                  yellow:
                                    scope.row.afternoonOffDutyResult == 1 ||
                                    scope.row.afternoonOffDutyResult == 4
                                },
                                {
                                  red:
                                    scope.row.afternoonOffDutyResult == 2 ||
                                    scope.row.afternoonOffDutyResult == 3 ||
                                    scope.row.afternoonOffDutyResult == 5
                                }
                              ]"
                            >
                              {{
                                scope.row.afternoonOffDutyResult | formateResult
                              }}
                              <span
                                v-if="scope.row.afternoonOffDutyResult == 4"
                              >
                                {{
                                  scope.row.afternoonLeaveType || " - 暂无"
                                }}</span
                              >
                            </div>
                          </div>
                          <div v-else>
                            <div
                              :class="[
                                { green: scope.row.afternoonOnDutyResult == 0 },
                                {
                                  yellow:
                                    scope.row.afternoonOnDutyResult == 1 ||
                                    scope.row.afternoonOnDutyResult == 4
                                },
                                {
                                  red:
                                    scope.row.afternoonOnDutyResult == 2 ||
                                    scope.row.afternoonOnDutyResult == 3 ||
                                    scope.row.afternoonOnDutyResult == 5
                                }
                              ]"
                            >
                              {{
                                scope.row.afternoonOnDutyResult | formateResult
                              }}
                              <span v-if="scope.row.afternoonOnDutyResult == 4">
                                {{
                                  scope.row.afternoonLeaveType || " - 暂无"
                                }}</span
                              >
                            </div>
                            <div
                              :class="[
                                {
                                  green: scope.row.afternoonOffDutyResult == 0
                                },
                                {
                                  yellow:
                                    scope.row.afternoonOffDutyResult == 1 ||
                                    scope.row.afternoonOffDutyResult == 4
                                },
                                {
                                  red:
                                    scope.row.afternoonOffDutyResult == 2 ||
                                    scope.row.afternoonOffDutyResult == 3 ||
                                    scope.row.afternoonOffDutyResult == 5
                                }
                              ]"
                            >
                              {{
                                scope.row.afternoonOffDutyResult | formateResult
                              }}
                              <span
                                v-if="scope.row.afternoonOffDutyResult == 4"
                              >
                                {{
                                  scope.row.afternoonLeaveType || " - 暂无"
                                }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="120"
                    label="补卡"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <div
                        class="make-up"
                        :class="[
                          { 'make-green': scope.row.repairInfo == '补卡通过' },
                          { 'make-red': scope.row.repairInfo == '不通过' }
                        ]"
                      >
                        {{ scope.row.repairInfo || "暂无" }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="leaveInfo"
                    label="请假"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      {{ scope.row.leaveInfo || "暂无" }}</template
                    >
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="awayInfo"
                    label="旷工"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      {{ scope.row.awayInfo || "暂无" }}</template
                    >
                  </el-table-column>
                  <el-table-column width="100" label="操作" align="left">
                    <template v-slot="scope">
                      <div class="check" @click="toDetail(scope.row.accountId)">
                        查看
                      </div>
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
        <!-- <div class="sidebar">
          <div class="sidebar-container">
            <div class="calendar-head">
              <button class="change-item" @click="prevYear">
                <span class="iconbianzu3 iconfont"></span>
              </button>
              <div class="head-time">
                <div class="head-time-month">{{ year }}年</div>
              </div>
              <button class="change-item" @click="afterYear">
                <span class="iconbianzu13 iconfont"></span>
              </button>
            </div>
            <div class="calendar-body">
              <div
                class="column"
                :class="{ active: currentMonth == index + 1 }"
                v-for="(item, index) in months"
                :key="index"
                @click="switchMonth(index)"
              >
                {{ item }}月
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import clockRuleHead from "@/pages/info/mixins/clockRuleHead.js";
export default {
  mixins: [clockRuleHead],
  data() {
    return {
      pageLoading: false,
      currentNavIndex: 0,
      currentSubNavIndex: 2,
      loading: false,
      subNavs: [
        {
          name: "我的日志",
          path: "/clockList/log",
          rUrl: "myWorkSummary"
        },
        {
          name: "考勤月统计",
          path: "/clockList/statisticMonth",
          rUrl: "statistics"
        },
        {
          name: "考勤日统计",
          path: "/clockList/statisticDay",
          rUrl: "attendanceStatisticsDaily"
        },
        {
          name: "考勤审批",
          path: "/clockList/examine",
          rUrl: "audit"
        },
        {
          name: "日志管理",
          path: "/clockList/myInfo",
          rUrl: "workSummary"
        }
      ],
      subSecondNavs: [
        {
          name: "考勤规则管理",
          path: "/clockRule/list",
          rUrl: "rule"
        },
        {
          name: "名言警句配置",
          path: "/clockRule/quotes",
          rUrl: "famous"
        }
      ],
      functionRuleObj: {
        company: false, // 公司
        department: false, // 部门
        employee: false, // 人员
        position: false, // 岗位
        export: false, // 导出
        status: false // 在职状态
      }, // 权限
      statusList: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "在职",
          value: 0
        },
        {
          label: "离职",
          value: 1
        },
        {
          label: "离职未审核",
          value: 2
        }
      ],
      employeeId: "",
      employee: {
        list: [],
        loading: false
      },
      status: "",
      positionId: "",
      position: {
        list: [],
        loadding: false
      },
      companyId: "",
      departmentId: "",
      company: {
        loading: false,
        list: []
      }, //公司json
      department: {
        loading: false,
        list: []
      }, //部门json
      currentPanelIndex: 0,
      tableData: [],
      pageJson: {
        page: 1,
        limit: 10,
        total: 0,
        pageSum: 0
      },
      sortColumn: "", //排序字段
      sortType: 1, //排序类型
      year: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      // 考勤需求
      clockRequire: "",
      requireList: [
        {
          label: "需要考勤",
          value: 0
        },
        {
          label: "无需考勤",
          value: 1
        }
      ],
      // 考勤状态
      clockStatus: "",
      clockStatusList: [
        {
          label: "正常考勤",
          value: 0
        },
        {
          label: "迟到",
          value: 1
        },
        {
          label: "早退",
          value: 2
        },
        {
          label: "旷工",
          value: 3
        },
        {
          label: "请假",
          value: 4
        }
      ],
      weekList: [
        { week: "星期一", date: "", time: "" },
        { week: "星期二", date: "", time: "" },
        { week: "星期三", date: "", time: "" },
        { week: "星期四", date: "", time: "" },
        { week: "星期五", date: "", time: "" },
        { week: "星期六", date: "", time: "" },
        { week: "星期日", date: "", time: "" }
      ],
      nowDate: "",
      checkedDate: ""
    };
  },
  filters: {
    formateResult(val) {
      let list = ["正常", "迟到", "早退", "旷工", "请假", "迟到早退"];
      return list[val];
    },
    formateTime(val) {
      if (val) {
        return val.split(" ")[1];
      } else {
        return "-";
      }
    }
  },
  created() {
    this.getFunction();
    let date = this.getWeekDay();
    this.weekList.forEach((item, idx) => {
      item.date = date[idx].date;
      item.time = date[idx].time;
    });
    let week = new Date().getDay();
    week = week == 0 ? 7 : week;
    this.checkedDate = this.weekList[week - 1].date;
    this.nowDate = new Date(this.checkedDate).getTime();
    console.log(this.nowDate);
    this.query();
  },
  methods: {
    getWeekDay(dateString) {
      let day = "";
      let today = 0;
      if (dateString) {
        day = new Date(dateString).getTime();
      } else {
        day = Date.now();
        today = (new Date().getDay() + 7 - 1) % 7;
      }
      let week = Array.from(new Array(7)).map((_, i) => {
        let date = new Date(day + (i - today) * 1000 * 60 * 60 * 24);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        let time = new Date(`${y}-${m}-${d}`).getTime();
        let obj = {
          date: `${y}-${m}-${d}`,
          time: time
        };
        return obj;
      });
      return week;
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    },
    getFunction() {
      this.$api
        .get({
          url: "/attendance/statistics/detailsFunction",
          data: {},
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            let functionRuleList = data.data.functionRuleList;
            this.functionRuleObj = {
              company:
                functionRuleList.findIndex(
                  item => item.rUrl == "attendanceStatisticsCompany"
                ) != -1, // 公司
              department:
                functionRuleList.findIndex(
                  item => item.rUrl == "attendanceStatisticsDepartment"
                ) != -1, // 部门
              employee:
                functionRuleList.findIndex(
                  item => item.rUrl == "attendanceStatisticsEmployee"
                ) != -1, // 人员
              position:
                functionRuleList.findIndex(
                  item => item.rUrl == "attendanceStatisticsPosition"
                ) != -1, // 岗位
              export:
                functionRuleList.findIndex(
                  item => item.rUrl == "attendanceStatisticsExport"
                ) != -1, // 导出
              status:
                functionRuleList.findIndex(
                  item => item.rUrl == "attendanceStatisticsStatus"
                ) != -1 // 在职状态
            };
          }
        })
        .finally(e => {});
    },
    /**
     * @description: 重置
     * @param {*}
     * @return {*}
     */
    reset() {
      Object.assign(this.$data, this.$options.data(), {
        functionRuleObj: this.$data.functionRuleObj
      });
      let date = this.getWeekDay();
      this.weekList.forEach((item, idx) => {
        item.date = date[idx].date;
        item.time = date[idx].time;
      });
      let week = new Date().getDay();
      week = week == 0 ? 7 : week;
      this.checkedDate = this.weekList[week - 1].date;
      this.nowDate = new Date(this.checkedDate).getTime();
      this.query();
    },
    /**
     * @description: 排序
     * @param {*} column
     * @param {*} prop
     * @param {*} order
     * @return {*}
     */
    sortChange({ column, prop, order }) {
      this.sortType = order == "ascending" ? 0 : 1;
      this.sortColumn = prop;
      this.pageJson.page = 1;
      this.query();
    },
    /**
     * @description: 列表查询
     * @param {*} page
     * @return {*}
     */
    query(page = 1) {
      this.pageJson.page = page;
      this.loading = true;
      let params = {
        attendanceDates: [this.checkedDate],
        page: this.pageJson.page,
        limit: this.pageJson.limit,
        companyId: this.companyId,
        departmentId: this.departmentId,
        personIds: [],
        positionId: this.positionId,
        status: this.status,
        sortType: this.sortType,
        sortColumn: this.sortColumn,
        attendanceStatus: this.clockStatus,
        attendanceType: this.clockRequire
      };
      if (this.employeeId) {
        params.personIds = [this.employeeId];
      }
      this.$api
        .post({
          url: "attendance/record/attendanceStaticsDayInfo",
          data: params,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            // this.$refs.scrollRef.scrollTop = 0;
            this.tableData = data.data.list;
            this.pageJson.total = data.data.totalCount;
            this.pageJson.pageSum = data.data.totalPage;
          }
        })
        .finally(e => {
          this.loading = false;
        });
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
      this.pageJson.page = val;
      this.query(val);
    },
    switchDataPanel() {
      this.currentPanelIndex = this.currentPanelIndex == 0 ? 1 : 0;
    },
    /**
     * @example:公司获取焦点事件
     */
    companyFocus() {
      if (this.company.list.length == 0) {
        this.queryCompanyList();
      }
    },
    /**
     * @description: 公司列表搜索
     * @param {*} keyWork
     * @return {*}
     */
    queryCompanyList(keyWork = "") {
      this.$set(this.company, "loading", true);
      this.$api
        .post({
          url: "attendance/record/companyListForStaticsDayInfo",
          data: {
            limit: 50,
            page: 1,
            keyWord: keyWork
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.company.list = data.data;
          }
        })
        .finally(e => {
          this.$set(this.company, "loading", false);
        });
    },
    /**
     * @example:公司改变事件
     */
    companyChange() {
      this.departmentId = "";
      this.employeeId = "";
      this.employee.list = [];
      this.positionId = "";
      this.position.list = [];
      this.getDepartmentData();
      this.query();
    },
    /**
     * @example:部门搜索事件
     */
    getDepartmentData(keyWord = "") {
      this.department.list = [];
      if (this.companyId) {
        this.$set(this.department, "loading", true);
        this.$api
          .post({
            url: "attendance/record/deptListForStaticsDayInfo",
            data: {
              limit: 50,
              page: 1,
              keyWord: keyWord,
              companyId: this.companyId
            },
            headers: { "Content-Type": "application/json" }
          })
          .then(e => {
            let data = e.data;
            if (data.code == 200) {
              this.department.list = data.data.list;
            }
          })
          .finally(e => {
            this.$set(this.department, "loading", false);
          });
      }
    },
    /**
     * @description: 员工姓名获取焦点事件
     * @param {*}
     * @return {*}
     */
    employeeFocus() {
      if (this.employee.list.length == 0) {
        this.queryEmployee();
      }
    },
    /**
     * @description: 人员模糊搜索
     * @param {*} keyWord
     * @return {*}
     */
    queryEmployee(keyWord = "") {
      this.$set(this.employee, "loading", true);
      this.$api
        .post({
          url: "attendance/record/personListForStaticsDayInfo",
          data: {
            limit: 50,
            page: 1,
            departmentId: this.departmentId,
            keyWord: keyWord
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.employee.list = data.data.list;
          }
        })
        .finally(e => {
          this.$set(this.employee, "loading", false);
        });
    },
    /**
     * @description: 选择岗位获取焦点事件
     * @param {*}
     * @return {*}
     */
    positionFocus() {
      if (this.position.list.length == 0) {
        this.queryPosition();
      }
    },
    /**
     * @description: 岗位模糊搜索
     * @param {*} keyWord
     * @return {*}
     */
    queryPosition(keyWord = "") {
      this.$set(this.position, "loading", true);
      this.$api
        .get({
          url: "attendance/record/statics/positionListByCompany",
          data: {
            limit: 50,
            page: 1,
            companyId: this.companyId,
            keyWord: keyWord
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.position.list = data.data.list;
          }
        })
        .finally(e => {
          this.$set(this.position, "loading", false);
        });
    },
    excelExport() {
      this.pageLoading = true;
      let params = {
        attendanceDates: [this.checkedDate],
        page: this.pageJson.page,
        limit: 2000,
        companyId: this.companyId,
        departmentId: this.departmentId,
        personIds: [],
        positionId: this.positionId,
        status: this.status,
        sortType: this.sortType,
        sortColumn: this.sortColumn,
        attendanceStatus: this.clockStatus,
        attendanceType: this.clockRequire
      };
      if (this.employeeId) {
        params.personIds = [this.employeeId];
      }
      this.$api
        .post({
          url: "attendance/record/excelAttendanceAllPersonStaticsInfo",
          data: params,
          responseType: "blob",
          headers: { "Content-Type": "application/json" },
          isShowErrMsg: false
        })
        .then(res => {})
        .catch(e => {
          const url = window.URL.createObjectURL(new Blob([e.data]));
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "考勤统计.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .finally(e => {
          this.pageLoading = false;
        });
    },
    /**
     * @example: 日期改变事件
     */
    changeDate(item) {
      if (this.nowDate >= item.time) {
        this.checkedDate = item.date;
        this.query();
      }
    },
    cutWeek(key) {
      let day = this.weekList[0].date;
      let date = new Date(day);
      if (key == "last") {
        date.setDate(date.getDate() - 7);
      } else {
        if (this.nowDate < this.weekList[6].time) {
          return;
        }
        date.setDate(date.getDate() + 7);
      }
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let week = this.getWeekDay(`${y}-${m}-${d}`);
      this.weekList.forEach((item, idx) => {
        item.date = week[idx].date;
        item.time = week[idx].time;
      });
    },
    toDetail(id) {
      this.$router.push({
        path: "/clockList/statisticDetail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less">
// .children-page {
//   height: 100%;
// }
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
    padding: 24px;
    overflow: auto;
    .scroll-container {
      display: flex;
      justify-content: center;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .main {
      flex: 1;
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
          .week-list {
            display: flex;
            margin-bottom: 17px;
            .cut-box {
              width: 55px;
              text-align: center;
              color: #606266;
              background: #f0f2f5;
              border-radius: 4px;
              cursor: pointer;
              i {
                display: block;
                margin: 12px 0 9px 0;
              }
              span {
                display: block;
              }
            }
            .week-box {
              padding: 12px;
              flex: 1;
              color: #606266;
              background: #f0f2f5;
              border: 1px solid #f0f2f5;
              border-radius: 4px;
              box-sizing: border-box;
              margin-left: 16px;
              cursor: pointer;
              & + .cut-box {
                margin-left: 16px;
              }
              .week-text {
                font-size: @font14;
                font-weight: bold;
                margin-bottom: 8px;
              }
              .week-date {
                font-size: @font12;
              }
            }
            .weekActive {
              color: @backgroud;
              border-color: @backgroud;
              background: @opacityBackground;
            }
            .weekDisbled {
              color: #909399;
              cursor: not-allowed;
            }
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
            .person-info {
              display: flex;
              .el-image {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                border-radius: 40px;
                overflow: hidden;
              }
              .info {
                margin-left: 16px;
                .name {
                  width: 100%;
                  margin-bottom: 10px;
                  line-height: 1;
                  font-size: @font16;
                  color: #606266;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .deptname {
                  line-height: 1;
                  font-size: @font14;
                  color: #909399;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
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
              height: 96px;
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
              height: 16px;
              padding: 0px 4px;
              margin-left: 8px;
              border-radius: 2px;
              line-height: 1;
              text-align: center;
              font-size: @font12;
              background: #fff;
              border-radius: 2px;
              border-width: 1px;
              border-style: solid;
              box-sizing: border-box;
            }
            .span_success {
              border-color: #247257;
              color: #247257;
            }
            .span_danger {
              border-color: #ef5656;
              color: #ef5656;
            }
            .span_warning {
              border-color: #f6a420;
              color: #f6a420;
            }
            .span_info {
              border-color: #909399;
              color: #909399;
            }
            .attendance-beLate {
              display: flex;
              flex-direction: column;
              .item {
                margin-bottom: 8px;
                line-height: 1;
                font-size: @font16;
                color: #606266;
                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
            .clock-box {
              display: flex;
              align-items: center;
              .clock-box-left {
                padding-right: 17px;
                border-right: 1px solid #f0f2f5;
                div {
                  & + div {
                    margin-top: 8px;
                  }
                }
              }
              .clock-box-right {
                margin-left: 16px;
                div {
                  & + div {
                    margin-top: 8px;
                  }
                }
                .green {
                  color: #0da88b;
                }
                .red {
                  color: #ef5656;
                }
                .yellow {
                  color: #f6a420;
                }
              }
            }
            .make-up {
              width: 80px;
              height: 26px;
              line-height: 26px;
              background: rgba(144, 147, 153, 0.1);
              color: #909399;
              text-align: center;
              border-radius: 2px;
            }
            .make-green {
              color: #0da88b;
              background: rgba(13, 168, 139, 0.1);
            }
            .make-red {
              color: #ef5656;
              background: rgba(239, 86, 86, 0.1);
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
      margin-left: 24px;
      .sidebar-container {
        position: sticky;
        top: 0;
        height: 220px;
        background: #ffffff;
        box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
        border-radius: 8px;
        box-sizing: border-box;
      }
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
          height: 20px;
          line-height: 18px;
          font-size: @font14;
          color: #303133;
          border: 1px solid transparent;
          cursor: pointer;
          box-sizing: border-box;
          &:nth-child(n + 5) {
            margin-top: 24px;
          }
          &.active {
            background: #c4e4d6;
            border: 1px solid #098d55;
            border-radius: 4px;
            color: #098d55;
          }
        }
      }
    }
  }
}
.check {
  color: @backgroud;
  cursor: pointer;
}
</style>
