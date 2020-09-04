<template>
  <!-- 买卖房源-抽检记录 -->
  <div class="examine-container">
    <tabs :navActiveIndex="6"></tabs>
    <div class="conditions">
      <div class="conditions-box">
        <el-row :gutter="32">
          <el-form label-position="right" label-width="80px">
            <el-col :span="6">
              <el-form-item label="房源编号">
                <el-input
                  v-model="conditions.houseNo"
                  placeholder="请输入房源编号"
                  @change="query(1)"
                  class="anchor-point"
                  :data-anchor="'抽检记录搜索 房源编号:' + conditions.houseNo"
                  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
                        :data-anchor="'抽检记录楼盘 => select => option:' + item.name"
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
                        :data-anchor="'抽检记录栋座 => select => option:' + item.name"
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
                        :data-anchor="'抽检记录房号 => select => option:' + item.name"
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
            <el-col :span="6">
              <el-form-item label="跟单人">
                <el-input
                  v-model="conditions.agentName"
                  placeholder="请输入经纪人姓名"
                  @change="query(1)"
                  class="anchor-point"
                  :data-anchor="'抽检记录搜索 房源编号:' + conditions.agentName"
                  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属门店">
                <el-input
                  v-model="conditions.department"
                  placeholder="请输入门店名称"
                  @change="query(1)"
                  clearable
                  class="anchor-point"
                  :data-anchor="'抽检记录搜索 所属门店:' + conditions.department"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="当前状态">
                <el-select
                  class="width100 anchor-point"
                  popper-class="anchor-point"
                  data-anchor="抽检记录当前状态 => select"
                  @click.native="log_socket.sendUserActionData"
                  filterable
                  v-model="currentStatus"
                  clearable
                  @change="changeCurrentStatus"
                  placeholder="请选择"
                >
                  <el-option
                    class="anchor-point"
                    :data-anchor="'抽检记录当前状态 => select => option:' + item.label"
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
            <el-col :span="8">
              <el-form-item label="抽检结果">
                <el-select
                  class="width100 anchor-point"
                  popper-class="anchor-point"
                  data-anchor="抽检记录抽检结果 => select"
                  @click.native="log_socket.sendUserActionData"
                  filterable
                  v-model="spotCheckResult"
                  clearable
                  @change="querylistByParams"
                  placeholder="请选择"
                >
                  <el-option
                    class="anchor-point"
                    :data-anchor="'抽检记录抽检结果 => select => option:' + item.label"
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
          </el-form>
        </el-row>
      </div>
      <div class="conditions-btn">
        <button
          class="btn anchor-pointn"
          @click="reset"
          data-anchor="审核列表重置"
          >重置</button>
        <button
          class="btn active anchor-pointn"
          @click="query(1)"
          data-anchor="审核列表搜索"
        >搜索</button>
      </div>
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
            @cell-dblclick="toHouseDetail"
          >
            <el-table-column
              v-for="(item, index) in tableColumns"
              :key="index"
              :prop="item.prop"
              :fixed="item.fixed"
              :label="item.label"
              :width="item.width"
              :min-width="item.minWidth"
              :align="item.align"
              :sortable="item.sortable"
              :sort-orders="['ascending', 'descending']"
              show-overflow-tooltip>
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
        :total="pageJson.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 作业人申请
 */
const taskProCheck = [
  { label: "钥匙申请", value: 0 },
  { label: "实勘申请", value: 12 },
  { label: "普通委托申请", value: "2,1" },
  { label: "独家委托申请", value: "1,1" },
  { label: "限时委托申请", value: "3,1" }
];
/**
 * 取代申请
 */
const replaceCheck = [
  { label: "钥匙取代", value: 3 },
  { label: "实勘取代", value: 13 },
  { label: "普通委托取代", value: "2,44" },
  { label: "独家委托取代", value: "1,44" },
  { label: "限时委托取代", value: "3,44" }
];
/**
 * 房源转状态
 */
const houseTypeCheck = [
  { label: "他司售", value: 4 },
  { label: "业主自售", value: 6 },
  { label: "暂不售", value: 5 },
  { label: "无效", value: 3 }
];
/**
 * 举报类型
 */
const reportCheck = [
  { value: "5", label: "虚假实勘" },
  { value: "6", label: "虚假委托" },
  { value: "7", label: "虚假钥匙" },
  { value: "8", label: "虚假跟进" },
  { value: "9", label: "房屋已售" },
  { value: "10", label: "虚假业主号码" },
  { value: "11", label: "其他" }
];
/**
 * 默认类型
 */
const defaultCheck = [
  { value: "0", label: "钥匙人" },
  { value: "1", label: "独家委托审核" },
  { value: "4", label: "他司售" },
  { value: "2", label: "虚假实勘" }
];
import tabs from './components/tabs.vue';
import util from "@/util/util";
import bus from "@/evenBus/but.js";
export default {
  components: {
    tabs
  },
  data() {
    return {
      loading: false,
      currentStatus: "",
      currentStatusList: [
        {
          value: "1",
          label: "作业人申请"
        },
        {
          value: "4",
          label: "取代申请"
        },
        {
          value: "8",
          label: "房源转状态"
        },
        {
          value: "11",
          label: "举报"
        },
        {
          value: "10",
          label: "录入修改"
        }
      ],
      spotCheckResult: "", // 抽检结果
      spotCheckResultList: [],
      conditions: {
        comId: "",
        cbId: "",
        bhId: "",
        houseNo: "",
        agentName: "", // 跟单人
        department: "" // 所属门店
      },
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
          width: "166",
          align: "left",
          fixed: "left"
        }, {
          prop: "checkProject",
          label: "售价",
          align: "left"
        }, {
          prop: "checkType",
          label: "面积",
          align: "left"
        }, {
          prop: "checkAddPerName",
          label: "户型",
          align: "left"
        }, {
          prop: "",
          label: "跟单人",
          align: "right",
          order: true
        }, {
          prop: "",
          label: "挂牌时间",
          align: "right",
          order: true
        }, {
          prop: "",
          label: "30天带看",
          align: "right",
          order: true
        }, {
          prop: "",
          label: "30天电话回访",
          align: "right",
          order: true
        }, {
          prop: "",
          label: "当前状态",
          align: "right",
          order: true
        }, {
          prop: "",
          label: "抽检结果",
          align: "right",
          order: true
        }
      ]
    }
  },
  created() {
    // 切换管理入口nav
    bus.$emit("switchEntranceNav", 1);
    this.query();
  },
  methods: {
    changeCurrentStatus() {

    },
    /**
     * @example: 作业数据排序变化触发事件
     */
    changeWorkSort({column, prop, order}) {
      this.sortColumn = prop;
      this.sortType = order=="ascending" ? 0 : 1;
      Object.assign(this.pageJson, this.$options.data().pageJson);
      this.query();
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
      .get({
        url: "/community/check",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          communityName: query,
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
      this.queryRoomData();
    },
    /**
     * @example: 远程获取房间号信息
     * @param {String} e 输入搜索的文本
     */
    queryRoomData(e) {
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
    query(currentPage=1) {
      this.pageJson.page = currentPage;
      this.loading = true;
      let params = { limit: this.pageJson.limit, page: currentPage };
      params.comId = this.conditions.comId;
      params.cbId = this.conditions.cbId;
      params.bhId = this.conditions.bhId;
      params.houseNo = this.conditions.houseNo;

      params.status = this.status;
      params.checkTypeStr = this.type;
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      this.$api
        .post({
          url: "/myHouse/myCheckList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.$refs.tableList.bodyWrapper.scrollTop = 0;
            this.pageJson.total = data.data.checkList.totalCount;
            this.tableData = data.data.checkList.list;
          }
        })
        .catch(e => {
          console.log("查询审核列表失败");
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 重置查询条件
     */
    reset() {
      Object.assign(this.$data.conditions, this.$options.data().conditions);
      this.buildOptData = {};
      this.towerOptData = {};
      this.roomOptData = {};
      this.type = "";
      this.status = "";
      this.query();
    },
    /**
     * 审核项目change
     */
    reviewProject(value) {
      switch (String(value)) {
        case "1":
          this.typeList = taskProCheck;
          break;
        case "4":
          this.typeList = replaceCheck;
          break;
        case "8":
          this.typeList = houseTypeCheck;
          break;
        case "11":
          this.typeList = reportCheck;
          break;
        default:
          this.typeList = defaultCheck;
          break;
      }
      this.type = "";
      this.querylistByParams();
    },
    querylistByParams() {
      this.query();
    },
    //跳转房源详情页面
    toHouseDetail(row) {
      if (row.tag === 1) return;
      var that = this;
      this.$api
        .get({
          url: "/agent_house/valid/" + row.eid,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          if (e.data.code == 200) {
            if (e.data.data == 1) {
              util.openPage.call(this, {
                name: "houseDetails",
                params: { houseId: row.eid }
              });
            } else {
              util.openPage.call(this, {
                name: "historyDetails",
                params: { houseId: row.eid, tradeType: 0 }
              });
            }
          }
        });
    }
  }
}
</script>
<style lang="less" scoped>
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
  .conditions {
    // prettier-ignore
    padding: 0 24PX 20PX 24PX;
    background: #fff;
    // prettier-ignore
    border-bottom-left-radius: 8PX;
    // prettier-ignore
    border-bottom-right-radius: 8PX;
    /deep/.conditions-box {
      .el-form-item__label {
        // prettier-ignore
        line-height: 36PX;
        font-weight: bold;
        font-size: @font14;
        color: #303133;
      }
      .el-input__inner {
        // prettier-ignore
        height: 36PX;
        font-size: @font14;
      }
      .el-form-item {
        // prettier-ignore
        margin-bottom: 16PX;
      }
      .el-range-input {
        text-align: left;
        // prettier-ignore
        text-indent: 5PX;
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
    }
    .conditions-btn {
      display: flex;
      justify-content: flex-end;
      .btn {
        // prettier-ignore
        width: 90PX;
        // prettier-ignore
        height: 36PX;
        border: none;
        border-radius: 4px;
        background: #fff;
        outline: none;
        line-height: 1;
        text-align: center;
        font-size: @font12;
        color: @backgroud;
        cursor: pointer;
        &.active {
          // prettier-ignore
          margin-left: 9PX;
          background: @backgroud;
          color: #fff;
        }
      }
    }
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: row;
    // prettier-ignore
    min-height: 300PX;
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
          background: #F0F5F4;
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
            background: #F0F5F4;
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
          height: 64PX;
        }
        .el-button--mini, .el-button--small {
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
        span:not([class*=suffix]) {
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
      .el-table--border, .el-table--group {
        border: none;
      }
      .el-table--border::after, .el-table--group::after, .el-table::before {
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
            border-bottom: 1px solid #C3DFD9;
            border-right: 1px solid #c3dfd9;
          }
          th:nth-child(5) {
            border-bottom: 1px solid #C3DFD9;
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
