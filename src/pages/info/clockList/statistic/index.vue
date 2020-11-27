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
                  <el-col
                    :span="10"
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
                            @blur="query()"
                          >
                            <el-option
                              v-for="item in company.list"
                              :key="item.coId"
                              :label="item.companyName"
                              :value="item.coId"
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
                            @blur="query()"
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
                  <el-col :span="7" v-if="functionRuleObj.employee">
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
                        @blur="query()"
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
                  <el-col :span="7" v-if="functionRuleObj.status">
                    <el-form-item label="在职状态">
                      <el-select
                        class="width100"
                        popper-class="options-item"
                        v-model="status"
                        placeholder="请选择"
                        @blur="query()"
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
                  <el-col :span="8" v-if="functionRuleObj.position">
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
                        @blur="query()"
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
                  <el-col :span="8" class="fr">
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
                  :data="tableData"
                  v-loading="loading"
                  ref="tableList"
                  @sort-change="sortChange"
                >
                  <el-table-column
                    min-width="140"
                    label="员工信息"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <div class="person-info">
                        <el-image
                          style="width: 40px; height: 40px"
                          :src="scope.row.userImage"
                          fit="cover"
                        ></el-image>
                        <div class="info">
                          <div class="name">{{ scope.row.perName }}</div>
                          <div class="deptname">{{ scope.row.deptName }}</div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="131"
                    label="在职状态/岗位"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>{{ scope.row.del }}/{{ scope.row.position }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="92"
                    label="考勤要求"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span
                        v-if="scope.row.isFreedom == '正常考勤'"
                        class="span_success"
                        >{{ scope.row.isFreedom }}</span
                      >
                      <span
                        v-if="scope.row.isFreedom == '免考勤'"
                        class="span_warning"
                        >{{ scope.row.isFreedom }}</span
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="110"
                    label="考勤"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <div
                        class="attendance-beLate"
                        v-if="
                          scope.row.beLateNum == 0 &&
                            scope.row.absenceNum == 0 &&
                            scope.row.leaveEarlyNum == 0
                        "
                      >
                        无异常
                      </div>
                      <div class="attendance-beLate" v-else>
                        <div class="item" v-if="scope.row.beLateNum != 0">
                          迟到：{{ scope.row.beLateNum }}次
                        </div>
                        <div class="item" v-if="scope.row.absenceNum != 0">
                          旷工：{{ scope.row.absenceNum }}天
                        </div>
                        <div class="item" v-if="scope.row.leaveEarlyNum != 0">
                          早退：{{ scope.row.leaveEarlyNum }}次
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="133"
                    prop="unCommitReportNum"
                    label="未提交日志"
                    align="left"
                    sortable="custom"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      {{ scope.row.unCommitReportNum }}次</template
                    >
                  </el-table-column>
                  <el-table-column
                    min-width="111"
                    prop="unAuditNum"
                    label="未批阅"
                    align="left"
                    sortable="custom"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      {{ scope.row.unAuditNum }}次</template
                    >
                  </el-table-column>
                  <el-table-column
                    min-width="80"
                    prop="casualLeaveNum"
                    label="事假"
                    align="left"
                    sortable="custom"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span v-if="scope.row.casualLeaveNum == 0">满勤</span>
                      <span v-else>{{ scope.row.casualLeaveNum }}天</span>
                    </template>
                  </el-table-column>
                </el-table>
                <!-------------------------- 考勤扣分 ---------------------------->
                <el-table
                  v-else
                  :data="tableData"
                  v-loading="loading"
                  ref="tableList"
                  @sort-change="sortChange"
                >
                  <el-table-column
                    min-width="140"
                    label="员工信息"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <div class="person-info">
                        <el-image
                          style="width: 40px; height: 40px"
                          :src="scope.row.userImage"
                          fit="cover"
                        ></el-image>
                        <div class="info">
                          <div class="name">{{ scope.row.perName }}</div>
                          <div class="deptname">{{ scope.row.deptName }}</div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="131"
                    label="在职状态/岗位"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>{{ scope.row.del }}/{{ scope.row.position }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="92"
                    label="考勤要求"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span
                        v-if="scope.row.isFreedom == '正常考勤'"
                        class="span_success"
                        >{{ scope.row.isFreedom }}</span
                      >
                      <span
                        v-if="scope.row.isFreedom == '免考勤'"
                        class="span_warning"
                        >{{ scope.row.isFreedom }}</span
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="110"
                    label="考勤扣分"
                    align="left"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <div
                        class="attendance-beLate"
                        v-if="
                          scope.row.beLatePoint == 0 &&
                            scope.row.absencePoint == 0 &&
                            scope.row.leaveEarlyPoint == 0
                        "
                      >
                        无异常
                      </div>
                      <div class="attendance-beLate">
                        <div class="item" v-if="scope.row.beLatePoint != 0">
                          迟到：{{ scope.row.beLatePoint }}分
                        </div>
                        <div class="item" v-if="scope.row.absencePoint != 0">
                          旷工：{{ scope.row.absencePoint }}分
                        </div>
                        <div class="item" v-if="scope.row.leaveEarlyPoint != 0">
                          早退：{{ scope.row.leaveEarlyPoint }}分
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="95"
                    prop="unCommitReportPoint"
                    label="日志扣分"
                    align="left"
                    sortable="custom"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      {{ scope.row.unCommitReportPoint }}分</template
                    >
                  </el-table-column>
                  <el-table-column
                    min-width="120"
                    prop="unAuditPoint"
                    label="未批阅扣分"
                    align="left"
                    sortable="custom"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      {{ scope.row.unAuditPoint }}分</template
                    >
                  </el-table-column>
                  <el-table-column
                    min-width="105"
                    prop="casualLeavePoint"
                    label="事假扣分"
                    align="left"
                    sortable="custom"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>{{ scope.row.casualLeavePoint }}分</span>
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
        <div class="sidebar">
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
        </div>
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
      currentSubNavIndex: 1,
      loading: false,
      subNavs: [
        {
          name: "我的日志",
          path: "/clockList/log",
          rUrl: "myWorkSummary"
        },
        {
          name: "考勤统计",
          path: "/clockList/statistic",
          rUrl: "statistics"
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
  created() {
    this.getFunction();
    this.query();
  },
  methods: {
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
      let date = this.year + "-" + this.currentMonth + "-01";
      let params = {
        date: date,
        page: this.pageJson.page,
        limit: this.pageJson.limit,
        companyId: this.companyId,
        departmentId: this.departmentId,
        accountId: this.employeeId,
        positionId: this.positionId,
        status: this.status,
        sortType: this.sortType,
        sortColumn: this.sortColumn
      };
      this.$api
        .post({
          url: "/attendance/statistics/data",
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
     * @description: 上一年
     * @param {*}
     * @return {*}
     */
    prevYear() {
      this.year--;
      this.query();
    },
    /**
     * @description: 下一年
     * @param {*}
     * @return {*}
     */
    afterYear() {
      this.year++;
      this.query();
    },
    /**
     * @description: 设置月份
     * @param {*} index
     * @return {*}
     */
    switchMonth(index) {
      this.currentMonth = index + 1;
      this.query();
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
        .get({
          url: "/attendance/statistics/company",
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
            this.company.list = data.data.list;
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
          .get({
            url: "/attendance/statistics/department-under",
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
        .get({
          url: "/attendance/statistics/employee-under",
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
          url: "/attendance/statistics/role-company",
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
      let date = this.year + "-" + this.currentMonth + "-01";
      let params = {
        date: date,
        page: this.pageJson.page,
        limit: this.pageJson.limit,
        companyId: this.companyId,
        departmentId: this.departmentId,
        accountId: this.employeeId,
        positionId: this.positionId,
        status: this.status,
        sortType: this.sortType,
        sortColumn: this.sortColumn
      };
      this.$api
        .post({
          url: "/attendance/statistics/export",
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
</style>
