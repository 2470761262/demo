<template>
  <!-- 买卖房源-抽检记录 -->
  <div class="examine-container">
    <breadcrumb></breadcrumb>
    <div class="page-half-top" v-show="panelChange">
      <nav-menu :navMenuIndex="1"></nav-menu>
      <tabs :navActiveIndex="6"></tabs>
      <div class="conditions">
        <div class="conditions-box">
          <el-row :gutter="32">
            <el-form label-position="right" label-width="80px">
              <el-col :span="colChunks[0]">
                <el-form-item label="房源编号">
                  <el-input
                    v-model="conditions.houseNo"
                    placeholder="请输入房源编号"
                    @input="query(1)"
                    class="anchor-point"
                    clearable
                    :data-anchor="'抽检记录搜索 房源编号:' + conditions.houseNo"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="colChunks[1]">
                <el-row :gutter="10">
                  <el-form-item label="房屋坐落">
                    <el-col :span="8">
                      <el-select
                        class="anchor-point"
                        popper-class="anchor-point"
                        data-anchor="抽检记录楼盘 => select"
                        @click.native="log_socket.sendUserActionData"
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
                          class="anchor-point"
                          :data-anchor="
                            '抽检记录楼盘 => select => option:' + item.name
                          "
                          @click.native="log_socket.sendUserActionData"
                          v-for="item in buildForList"
                          :key="item.value"
                          :label="item.name"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="8">
                      <el-select
                        class="anchor-point"
                        popper-class="anchor-point"
                        data-anchor="抽检记录栋座 => select"
                        @click.native="log_socket.sendUserActionData"
                        v-model="towerOptData"
                        placeholder="栋座号"
                        clearable
                        filterable
                        remote
                        :remote-method="queryRoomNo"
                        @change="remoteRoomNoChange"
                        :loading="towerLoading"
                        value-key="value"
                      >
                        <el-option
                          class="anchor-point"
                          :data-anchor="
                            '抽检记录栋座 => select => option:' + item.name
                          "
                          @click.native="log_socket.sendUserActionData"
                          v-for="item in towerForList"
                          :key="item.value"
                          :label="item.name"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="8">
                      <el-select
                        class="anchor-point"
                        popper-class="anchor-point"
                        data-anchor="抽检记录房号 => select"
                        @click.native="log_socket.sendUserActionData"
                        v-model="roomOptData"
                        placeholder="房号"
                        clearable
                        filterable
                        remote
                        :remote-method="queryRoomData"
                        @change="queryRoomDataChange"
                        :loading="roomLoading"
                        value-key="value"
                      >
                        <el-option
                          class="anchor-point"
                          :data-anchor="
                            '抽检记录房号 => select => option:' + item.name
                          "
                          @click.native="log_socket.sendUserActionData"
                          v-for="item in roomForList"
                          :key="item.value"
                          :label="item.name"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :span="colChunks[2]">
                <el-form-item label="所属区域">
                  <el-select
                    class="width100 anchor-point"
                    popper-class="anchor-point"
                    data-anchor="抽检记录所属区域 => select"
                    @click.native="log_socket.sendUserActionData"
                    v-model="area.value"
                    placeholder="请输入区域名称"
                    clearable
                    filterable
                    @focus="areaFocus"
                    @change="areaChange"
                    :loading="area.loading"
                    value-key="value"
                  >
                    <el-option
                      class="anchor-point"
                      :data-anchor="
                        '抽检记录所属区域 => select => option:' + item.depName
                      "
                      @click.native="log_socket.sendUserActionData"
                      v-for="item in area.list"
                      :key="item.depId"
                      :label="item.depName"
                      :value="item.depId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="colChunks[2]">
                <el-form-item label="所属门店">
                  <el-select
                    class="width100 anchor-point"
                    popper-class="anchor-point"
                    data-anchor="抽检记录所属门店 => select"
                    @click.native="log_socket.sendUserActionData"
                    v-model="department.value"
                    placeholder="请输入门店名称"
                    clearable
                    filterable
                    @focus="departmentFocus"
                    @change="departmentChange"
                    :loading="department.loading"
                    value-key="value"
                  >
                    <el-option
                      class="anchor-point"
                      :data-anchor="
                        '抽检记录所属门店 => select => option:' + item.depName
                      "
                      @click.native="log_socket.sendUserActionData"
                      v-for="item in department.list"
                      :key="item.depId"
                      :label="item.depName"
                      :value="item.depId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="colChunks[3]">
                <el-form-item label="跟单人">
                  <el-select
                    class="width100 anchor-point"
                    popper-class="anchor-point"
                    data-anchor="抽检记录跟单人 => select"
                    @click.native="log_socket.sendUserActionData"
                    v-model="agent.value"
                    :placeholder="
                      department.value == ''
                        ? '请先选择门店'
                        : '请输入跟单人姓名'
                    "
                    clearable
                    filterable
                    @change="agentChange"
                    :loading="agent.loading"
                    value-key="value"
                  >
                    <el-option
                      class="anchor-point"
                      :data-anchor="
                        '抽检记录跟单人 => select => option:' + item.perName
                      "
                      @click.native="log_socket.sendUserActionData"
                      v-for="item in agent.list"
                      :key="item.accountId"
                      :label="item.perName"
                      :value="item.accountId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="colChunks[3]">
                <el-form-item label="当前状态">
                  <el-select
                    class="width100 anchor-point"
                    popper-class="anchor-point"
                    data-anchor="抽检记录当前状态 => select"
                    @click.native="log_socket.sendUserActionData"
                    v-model="currentStatus"
                    clearable
                    @change="query(1)"
                    placeholder="请选择"
                  >
                    <el-option
                      class="anchor-point"
                      :data-anchor="
                        '抽检记录当前状态 => select => option:' + item.label
                      "
                      @click.native="log_socket.sendUserActionData"
                      v-for="item in currentStatusList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="colChunks[3]">
                <el-form-item label="抽检结果">
                  <el-select
                    class="width100 anchor-point"
                    popper-class="anchor-point"
                    data-anchor="抽检记录抽检结果 => select"
                    @click.native="log_socket.sendUserActionData"
                    v-model="spotCheckResult"
                    clearable
                    @change="query(1)"
                    placeholder="请选择"
                  >
                    <el-option
                      class="anchor-point"
                      :data-anchor="
                        '抽检记录抽检结果 => select => option:' + item.label
                      "
                      @click.native="log_socket.sendUserActionData"
                      v-for="item in spotCheckResultList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="colChunks[4]">
                <el-form-item label="抽检时间">
                  <el-date-picker
                    prefix-icon="prefix-icon"
                    v-model="addTimeSelect"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="起始时间"
                    end-placeholder="结束时间"
                    value-format="yyyy-MM-dd"
                    @change="query(1)"
                    :default-time="['00:00:00', '23:59:59']"
                    class="anchor-point"
                    :data-anchor="'抽检记录 获得抽检时间:' + addTimeSelect"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="colChunks[6]" class="fr">
                <div class="conditions-btn">
                  <div
                    class="btn anchor-pointn"
                    @click="reset"
                    data-anchor="抽检记录列表重置"
                  >
                    重置
                  </div>
                  <div
                    class="btn active anchor-pointn"
                    @click="query(1)"
                    data-anchor="抽检记录列表搜索"
                  >
                    搜索
                  </div>
                </div>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>
    </div>
    <div class="change-content">
      <span
        @click="panelChangeBtn"
        class="anchor-point"
        data-anchor="首页展开选项/收起"
        >展开选项/收起<i
          class="iconfont iconxingzhuangjiehe1"
          :class="{ rotate: panelChange }"
        ></i
      ></span>
    </div>
    <div class="main">
      <div class="content">
        <div class="table">
          <el-table
            :data="tableData"
            @sort-change="changeWorkSort"
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
            <el-table-column label="售价" align="right" show-overflow-tooltip>
              <template v-slot="scope">
                <span>{{ scope.row.price }}万</span>
              </template>
            </el-table-column>
            <el-table-column label="面积" align="right" show-overflow-tooltip>
              <template v-slot="scope">
                <span>{{ scope.row.inArea }}㎡</span>
              </template>
            </el-table-column>
            <el-table-column label="户型" align="right" show-overflow-tooltip>
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
              label="跟单人"
              align="right"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div class="tab-house-box">
                  <div class="tab-house-title">{{ scope.row.addPerName }}</div>
                  <div class="tab-house-no">{{ scope.row.deptName }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              min-width="100"
              prop="listingStr"
              label="挂牌时间"
              align="right"
              sortable="custom"
              :sort-orders="['ascending', 'descending']"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              min-width="100"
              prop="lookNumber"
              label="30天带看"
              align="right"
              :sortable="true"
              :sort-orders="['ascending', 'descending']"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                {{ scope.row.lookNumber || 0 }}
              </template>
            </el-table-column>
            <el-table-column
              min-width="130"
              prop="callNumber"
              label="30天电话回访"
              align="right"
              :sortable="true"
              :sort-orders="['ascending', 'descending']"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                {{ scope.row.callNumber || 0 }}
              </template>
            </el-table-column>
            <el-table-column
              min-width="130"
              prop="spotCheckStatus"
              label="当前状态"
              align="right"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <span
                  v-if="scope.row.spotCheckStatus == '任务已完结'"
                  class="span_success"
                  >{{ scope.row.spotCheckStatus }}</span
                >
                <span
                  v-if="scope.row.spotCheckStatus == '任务未完成'"
                  class="span_danger"
                  >{{ scope.row.spotCheckStatus }}</span
                >
                <span
                  v-if="scope.row.spotCheckStatus == '任务进行中'"
                  class="span_warning"
                  >{{ scope.row.spotCheckStatus }}</span
                >
              </template>
            </el-table-column>
            <el-table-column
              min-width="140"
              prop="spotCheckResult"
              label="抽检结果"
              align="right"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <span
                  v-if="scope.row.spotCheckResult == '业主验真通过'"
                  class="span_success"
                  >{{ scope.row.spotCheckResult }}</span
                >
                <span
                  v-if="
                    scope.row.spotCheckResult == '业主验真过期' ||
                      scope.row.spotCheckResult == '在售转为暂不售' ||
                      scope.row.spotCheckResult == '已售转入资源库'
                  "
                  class="span_danger"
                  >{{ scope.row.spotCheckResult }}</span
                >
                <span
                  v-if="scope.row.spotCheckResult == '暂无结果'"
                  class="span_warning"
                  >{{ scope.row.spotCheckResult }}</span
                >
              </template>
            </el-table-column>
            <el-table-column
              min-width="200"
              prop="spotCheckTime"
              label="抽检结束时间"
              align="right"
              show-overflow-tooltip
            >
            </el-table-column>
            <!-- <el-table-column
              v-for="(item, index) in tableColumns"
              :key="index"
              :prop="item.prop"
              :fixed="item.fixed"
              :label="item.label"
              :width="item.width"
              :min-width="item.minWidth"
              :align="item.align"
              :sortable="item.order"
              :formatter="item.formart"
              :sort-orders="['ascending', 'descending']"
              show-overflow-tooltip>
            </el-table-column> -->
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
</template>
<script>
import breadcrumb from "../components/entranceBreadcrumb.vue";
import navMenu from "../components/entranceNavMenu.vue";
import tabs from "./components/tabs.vue";
import util from "@/util/util";
export default {
  components: {
    breadcrumb,
    navMenu,
    tabs
  },
  data() {
    return {
      panelChange: true, //折叠面板
      colChunks: [5, 9, 5, 5, 6, 6, 6], // 条件选项栅格布局
      isInitLoadroomList: false, // 选择楼栋是否加载房间列表
      loading: false,
      currentStatus: "",
      addTimeSelect: [],
      currentStatusList: [
        {
          value: 0,
          label: "任务进行中"
        },
        {
          value: 1,
          label: "任务已完结"
        },
        {
          value: 2,
          label: "任务未完成"
        }
      ],
      spotCheckResult: "", // 抽检结果
      spotCheckResultList: [
        {
          value: 0,
          label: "暂无结果"
        },
        {
          value: 1,
          label: "业主验真通过"
        },
        {
          value: 2,
          label: "房源已售转入资源库"
        },
        {
          value: 3,
          label: "房源在售转为暂不售"
        },
        {
          value: 4,
          label: "业主验真过期"
        }
      ],
      conditions: {
        comId: "",
        cbId: "",
        bhId: "",
        houseNo: ""
      },
      area: {
        loading: false,
        list: [],
        value: ""
      }, // 所属区域
      department: {
        loading: false,
        list: [],
        value: ""
      }, // 所属门店
      agent: {
        loading: false,
        list: [],
        value: ""
      }, // 跟单人
      buildLoading: false, //楼盘select loading
      buildOptData: {}, //当前楼盘选择数据
      buildForList: [], //楼盘select数据
      towerLoading: false, //栋座select loading
      towerOptData: {}, //栋座选中数据
      towerForList: [], //栋座select数据
      roomLoading: false, //房间号select loading
      roomOptData: {}, //房间号选中数据
      roomForList: [], //房间号select数据
      sortColumn: "id",
      sortType: 1,
      tableData: [],
      pageJson: {
        page: 1,
        limit: 10,
        total: 0,
        pageSum: 0
      },
      tableColumns: [
        {
          prop: "communityName",
          label: "房屋信息",
          width: "230",
          align: "left",
          fixed: "left",
          formart: item => {
            return (
              <div class="tab-house-box">
                <div class="tab-house-title">{item.communityName}</div>
                <div class="tab-house-no">{item.houseNo}</div>
              </div>
            );
          }
        },
        {
          prop: "price",
          label: "售价",
          align: "left",
          formart: item => {
            return <span>{item.price}万</span>;
          }
        },
        {
          prop: "inArea",
          label: "面积",
          align: "left",
          formart: item => {
            return <span>{item.inArea}㎡</span>;
          }
        },
        {
          prop: "checkAddPerName",
          label: "户型",
          align: "left",
          formart: item => {
            return (
              <span>
                {item.rooms || 0}-{item.hall || 0}-{item.toilet || 0}-
                {item.balcony || 0}
              </span>
            );
          }
        },
        {
          prop: "addPerName",
          label: "跟单人",
          align: "right",
          order: true
        },
        {
          prop: "listingStr",
          minWidth: "100",
          label: "挂牌时间",
          align: "right",
          order: true
        },
        {
          prop: "lookNumber",
          minWidth: "100",
          label: "30天带看",
          align: "right",
          order: true,
          formart: item => {
            return <span>{item.lookNumber}次</span>;
          }
        },
        {
          prop: "callNumber",
          minWidth: "130",
          label: "30天电话回访",
          align: "right",
          order: true,
          formart: item => {
            return <span>{item.callNumber}次</span>;
          }
        },
        {
          prop: "spotCheckStatus",
          minWidth: "120",
          label: "当前状态",
          align: "right",
          order: true,
          formart: item => {
            let className = "";
            switch (item.spotCheckStatus) {
              case "任务已完结":
                return <span class="span_success">{item.spotCheckStatus}</span>;
              case "任务未完成":
                return <span class="span_danger">{item.spotCheckStatus}</span>;
              case "任务进行中":
                return <span class="span_warning">{item.spotCheckStatus}</span>;
            }
          }
        },
        {
          prop: "spotCheckResult",
          minWidth: "140",
          label: "抽检结果",
          align: "right",
          order: true,
          formart: item => {
            switch (item.spotCheckResult) {
              case "业主验真通过":
                return <span class="span_success">{item.spotCheckResult}</span>;
              case "业主验真过期":
              case "在售转为暂不售":
                return <span class="span_danger">{item.spotCheckResult}</span>;
              case "暂无结果":
                return <span class="span_warning">{item.spotCheckResult}</span>;
            }
          }
        }
      ]
    };
  },
  created() {
    this.query();
    this.setConditionCol();
    window.addEventListener("resize", this.setConditionCol);
    this.$nextTick(() => {
      document
        .querySelector(".entrance-container")
        .addEventListener("scroll", this.elMainScroll);
    });
  },
  beforeDestroy() {
    if (document.querySelector(".entrance-container")) {
      document
        .querySelector(".entrance-container")
        .removeEventListener("scroll", this.elMainScroll);
    }
    window.removeEventListener("resize", this.setConditionCol);
  },
  methods: {
    elMainScroll() {
      const { clientHeight, scrollHeight, scrollTop } = document.querySelector(
        ".entrance-container"
      );
      if (clientHeight + scrollTop >= scrollHeight) {
        this.panelChange = false;
      }
    },
    /**
     * @example: 折叠面板
     */
    panelChangeBtn() {
      this.panelChange = !this.panelChange;
    },
    /**
     * @example: 根据当前屏幕窗口宽度设置条件选项栅格布局
     */
    setConditionCol() {
      if (document.body.offsetWidth >= 1440) {
        this.colChunks = [5, 9, 5, 5, 6, 6, 5];
      } else {
        this.colChunks = [7, 10, 7, 8, 8, 8, 8];
      }
    },
    /**
     * @example: 请求所属门店数据
     */
    getDepartmentList() {
      this.department.loading = true;
      this.$api
        .post({
          url: "/spotCheck/spotCheckRecordList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selectType: "MORE_SELECT_SHOP",
            selectDepartment: this.area.value
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.department.list = e.data.data;
          }
        })
        .finally(() => {
          this.department.loading = false;
        });
    },
    /**
     * @example: 请求所属区域数据
     */
    getAreaList() {
      this.department.loading = true;
      this.$api
        .post({
          url: "/spotCheck/spotCheckRecordList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selectType: "MORE_SELECT_AREA"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.area.list = e.data.data;
          }
        })
        .finally(() => {
          this.area.loading = false;
        });
    },
    /**
     * @example: 所属门店获取焦点事件
     */
    areaFocus() {
      this.getAreaList();
    },
    /**
     * @example: 所属门店选择事件
     */
    areaChange(value) {
      this.department.list = [];
      this.department.value = "";
      this.agent.list = [];
      this.agent.value = "";
      this.query();
      if (value != "") {
        this.getDepartmentList();
      }
    },
    /**
     * @example: 所属门店获取焦点事件
     */
    departmentFocus() {
      this.getDepartmentList();
    },
    /**
     * @example: 所属门店选择事件
     */
    departmentChange(value) {
      this.agent.list = [];
      this.agent.value = "";
      this.query();
      if (value != "") {
        this.getAgentList();
      }
    },
    /**
     * @example: 获取跟单人列表数据
     */
    getAgentList() {
      this.agent.loading = true;
      this.$api
        .post({
          url: "/spotCheck/spotCheckRecordList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selectType: "MORE_SELECT_PER",
            selectDepartment: this.department.value
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.agent.list = e.data.data;
          }
        })
        .finally(() => {
          this.agent.loading = false;
        });
    },
    /**
     * @example: 跟单人选择事件
     */
    agentChange(value) {
      this.agent.value = value;
      this.query();
    },
    /**
     * @example: 作业数据排序变化触发事件
     */
    changeWorkSort({ column, prop, order }) {
      this.sortColumn = prop;
      this.sortType = order == "ascending" ? 0 : 1;
      this.sortColumn = prop == "listingStr" ? "listingTime" : prop;
      Object.assign(this.pageJson, this.$options.data().pageJson);
      this.query();
    },
    /**
     * @example: 改变每页请求数据数量
     * @param {val} 请求数
     */
    handleSizeChange(val) {
      this.pageJson.limit = val;
      this.query();
    },
    /**
     * @example: 改变分页当前页码
     * @param {val} 页码
     */
    handleCurrentChange(val) {
      this.pageJson.page = val;
      this.query(val);
    },
    /**
     * @example: 楼盘激活第一时获取数据
     */
    remoteBuildInput() {
      // this.buildForList.length === 0 && this.buildRemoteMethod();
      this.buildRemoteMethod();
    },
    /**
     * @example: 远程获取楼盘信息
     */
    buildRemoteMethod(query) {
      this.buildLoading = true;
      this.$api
        .post({
          url: "/spotCheck/spotCheckRecordList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            communityType: "community",
            communityName: query == undefined ? "" : query.trim(),
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.buildForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.buildLoading = false;
        });
    },
    /**
     * @example: 楼盘选择更改触发事件
     * @param {Obejct} item 当前选中对象
     */
    remoteBuildChange(item) {
      const { name = undefined, value = undefined } = item;

      //如果删除或者手动删除传入空字符串将会把楼栋数据清理为空字符串
      this.conditions.comId = value ? value : "";

      //清理楼栋数据
      this.towerForList = [];
      this.conditions.cbId = "";
      this.towerOptData = {};

      //清理房间号数据
      this.conditions.bhId = "";
      this.roomOptData = {};
      this.roomForList = [];

      this.query();
      //获取楼栋select
      this.queryRoomNo();
    },
    /**
     * @example: 获取栋座远程数据
     * @param {String} name 栋座名称
     */
    queryRoomNo(name) {
      this.towerLoading = true;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comBuildingName: name == undefined ? "" : name.trim(),
            comId: this.conditions.comId,
            page: 1,
            limit: 100
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.towerForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.towerLoading = false;
        });
    },
    /**
     * @example: 楼栋选择更改触发事件
     * @param {Obejct} item 当前选中对象
     */
    remoteRoomNoChange(item) {
      const { name = undefined, value = undefined } = item;

      //如果删除或者手动删除传入空字符串将会把楼栋数据清理为空字符串
      this.conditions.cbId = value ? value : "";

      //清理房间号数据
      this.conditions.bhId = "";
      this.roomOptData = {};
      this.roomForList = [];

      this.query();
      //获取房间号数据
      if (this.isInitLoadroomList) {
        this.queryRoomData();
      }
    },
    /**
     * @example: 远程获取房间号信息
     * @param {String} e 输入搜索的文本
     */
    queryRoomData(e) {
      if (!this.isInitLoadroomList) {
        if (e == undefined || e.trim() == "") {
          this.roomForList = [];
          return;
        }
      }
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.conditions.comId,
            cbId: this.conditions.cbId,
            page: 1,
            limit: 500,
            roomNo: e == undefined ? "" : e.trim()
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.roomForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.towerLoading = false;
        });
    },
    /**
     * @example:房间号修改选中触发事件
     * @param {Ojbect} item 选中时选中的数据
     */
    queryRoomDataChange(item) {
      const { name = undefined, value = undefined } = item;

      this.conditions.bhId = value ? value : "";
      this.query();
    },
    /**
     * @example: 搜索
     */
    query(currentPage = 1) {
      this.pageJson.page = currentPage;
      this.loading = true;
      let params = { limit: this.pageJson.limit, page: currentPage };
      params.comId = this.conditions.comId;
      params.cbId = this.conditions.cbId;
      params.bhId = this.conditions.bhId;
      params.houseNo = this.conditions.houseNo;
      params.areaId = this.area.value;
      params.store = this.department.value;
      params.personnel = this.agent.value;
      params.currentStatus = this.currentStatus;
      params.addTimeSelect = this.addTimeSelect;
      params.currentResult = this.spotCheckResult;
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      this.$api
        .post({
          url: "/spotCheck/spotCheckRecordList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.$refs.tableList.bodyWrapper.scrollTop = 0;
            this.pageJson.total = data.data.totalCount;
            this.tableData = data.data.list;
          }
        })
        .catch(e => {
          console.log(e, "查询抽检记录列表失败");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 重置查询条件
     */
    reset() {
      this.currentStatus = "";
      this.spotCheckResult = "";
      Object.assign(this.$data.conditions, this.$options.data().conditions);
      Object.assign(this.$data.area, this.$options.data().area);
      Object.assign(this.$data.department, this.$options.data().department);
      Object.assign(this.$data.agent, this.$options.data().agent);
      this.addTimeSelect = [];
      this.buildOptData = {};
      this.towerOptData = {};
      this.roomOptData = {};
      this.query();
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
@import url("~@/assets/publicLess/houseConditionsItem.less");
.el-select-dropdown__item {
  // prettier-ignore
  height: 40PX;
  // prettier-ignore
  line-height: 40PX;
  font-size: @font14;
}
.examine-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  .change-content {
    text-align: center;
    margin-bottom: 4px;
    margin-top: 10px;
    color: @backgroud;
    font-size: @font16;
    span {
      cursor: pointer;
      .iconfont {
        margin-left: 8px;
        font-size: @font14;
        transition: transform 0.3s;
        transform: rotateZ(180deg);
        display: inline-block;

        &.rotate {
          transform: rotateZ(0deg) !important;
        }
      }
    }
  }
  .conditions {
    // prettier-ignore
    padding: 0 24PX 20PX 24PX;
    background: #fff;
    // prettier-ignore
    border-bottom-left-radius: 8PX;
    // prettier-ignore
    border-bottom-right-radius: 8PX;
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: row;
    // prettier-ignore
    min-height: 700PX;
    // prettier-ignore
    margin-top: 16PX;
    // prettier-ignore
    padding: 16PX;
    background: #fff;
    border-radius: 8px;
    /deep/.content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .table {
        flex: 1;
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
        .el-table__body td {
          // prettier-ignore
          height: 86PX;
        }
        .el-button--mini,
        .el-button--small {
          // prettier-ignore
          min-width: 60PX;
          // prettier-ignore
          margin-left: 16PX;
          padding: 0;
          text-align: left;
          font-size: @font16;
          &.examine {
            color: #a7a7a7;
          }
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
        .span_warning {
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
</style>
