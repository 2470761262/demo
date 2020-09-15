<template>
  <!-- 信息员验真列表 -->
  <div class="container">
    <breadcrumb></breadcrumb>
    <div class="conditions">
      <div class="conditions-box">
        <el-row :gutter="32">
          <el-form label-position="right" label-width="80px">
            <el-col :span="colChunks[0]">
              <el-form-item label="房源编号">
                <el-input
                  v-model="conditions.houseNo"
                  placeholder="请输入房源编号"
                  @change="query(1)"
                  clearable
                  class="anchor-point"
                  :data-anchor="
                    '信息员验真列表搜索 房源编号:' + conditions.houseNo
                  "
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
                      data-anchor="我的验真楼盘 => select"
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
                          '我的验真楼盘 => select => option:' + item.name
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
                      data-anchor="我的验真栋座 => select"
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
                          '我的验真栋座 => select => option:' + item.name
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
                      data-anchor="我的验真房号 => select"
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
                          '我的验真房号 => select => option:' + item.name
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
              <el-form-item label="所属门店">
                <el-select
                  class="width100 anchor-point"
                  popper-class="anchor-point"
                  data-anchor="信息员验真列表所属门店 => select"
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
                      '信息员验真列表所属门店 => select => option:' +
                        item.depName
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
              <el-form-item label="录入人">
                <el-select
                  class="width100 anchor-point"
                  popper-class="anchor-point"
                  data-anchor="信息员验真列表录入人 => select"
                  @click.native="log_socket.sendUserActionData"
                  v-model="agent.value"
                  placeholder="请输入录入人姓名"
                  clearable
                  filterable
                  @change="agentChange"
                  :loading="agent.loading"
                  value-key="value"
                >
                  <el-option
                    class="anchor-point"
                    :data-anchor="
                      '信息员验真列表录入人 => select => option:' + item.perName
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
            <el-col :span="colChunks[4]">
              <el-form-item label="验真状态">
                <el-select
                  class="width100 anchor-point"
                  popper-class="anchor-point"
                  data-anchor="信息员验真列表状态 => select"
                  @click.native="log_socket.sendUserActionData"
                  filterable
                  v-model="validateStatus"
                  clearable
                  @change="query(1)"
                  placeholder="请选择"
                >
                  <el-option
                    class="anchor-point"
                    :data-anchor="
                      '信息员验真列表验真状态 => select => option:' + item.label
                    "
                    @click.native="log_socket.sendUserActionData"
                    v-for="item in validateStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="colChunks[5]">
              <el-form-item label="录入时间">
                <el-date-picker
                  prefix-icon="prefix-icon"
                  v-model="conditions.timeSelect"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="起始时间"
                  end-placeholder="结束时间"
                  value-format="yyyy-MM-dd"
                  @change="query(1)"
                  :default-time="['00:00:00', '23:59:59']"
                  class="anchor-point"
                  :data-anchor="
                    '信息员验真列表 录入时间:' + conditions.timeSelect
                  "
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="colChunks[6]" class="fr">
              <div class="conditions-btn">
                <div
                  class="btn anchor-pointn"
                  @click="reset"
                  data-anchor="信息员验真列表重置"
                >
                  重置
                </div>
                <div
                  class="btn active anchor-pointn"
                  @click="query(1)"
                  data-anchor="信息员验真列表搜索"
                >
                  搜索
                </div>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </div>
    <div class="main">
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
              label="录入人"
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
    <!-- 房源验真弹窗 -->
    <el-dialog
      title="房源验真"
      class="test-dialog"
      :visible.sync="testDialogVisible"
      width="554px"
    >
      <div class="content">
        <div class="title">房源状态</div>
        <el-radio-group class="radio-box" v-model="houseStatus">
          <el-radio-button :label="5">确认出售</el-radio-button>
          <el-radio-button :label="3">暂不考虑</el-radio-button>
          <el-radio-button :label="4">已经出售</el-radio-button>
        </el-radio-group>
        <p class="tip">
          注：若选择“暂不考虑”或“已经出售”，则默认视为验真不通过
        </p>
        <div class="title">详细说明</div>
        <el-input
          class="explain"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          resize="none"
          v-model="testExplain"
        >
        </el-input>
      </div>
      <div slot="footer">
        <el-button class="test-btn cancel" @click="testCancel">取消</el-button>
        <el-button
          class="test-btn submit"
          :loading="testSubmitLoading"
          @click="testSubmit"
          >验真结果提交</el-button
        >
      </div>
    </el-dialog>
    <!-- 房源记录弹窗 -->
    <el-dialog
      title="房源记录"
      class="test-dialog record-content"
      :visible.sync="recordDialogVisible"
    >
      <div class="status-box">
        <span class="title">房源状态：</span>
        <span class="text">{{ recordStatus }}</span>
      </div>
      <div class="detail-box">
        <span class="title">详细说明：</span>
        <div class="detail">
          <p class="text">{{ recordIntroduction || "暂无" }}</p>
          <validate-audio
            v-for="(item, index) in voiceList"
            :key="index"
            :url="item"
          >
          </validate-audio>
          <div class="ts" v-if="recordCheckTime">
            <span>验真时间：</span>
            <span>{{recordCheckTime}}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import breadcrumb from "./components/breadcrumb.vue";
import util from "@/util/util";
import validateAudio from "./components/validateAudio.vue";
export default {
  components: {
    breadcrumb,
    validateAudio
  },
  data() {
    return {
      colChunks: [5, 9, 5, 5, 6, 6, 6], // 条件选项栅格布局
      loading: false,
      conditions: {
        comId: "",
        cbId: "",
        bhId: "",
        houseNo: "", // 房源编号
        timeSelect: ""
      },
      department: {
        loading: false,
        list: [],
        value: ""
      }, // 所属门店
      agent: {
        loading: false,
        list: [],
        value: ""
      }, // 录入人
      buildLoading: false, //楼盘select loading
      buildOptData: {}, //当前楼盘选择数据
      buildForList: [], //楼盘select数据
      towerLoading: false, //栋座select loading
      towerOptData: {}, //栋座选中数据
      towerForList: [], //栋座select数据
      roomLoading: false, //房间号select loading
      roomOptData: {}, //房间号选中数据
      roomForList: [], //房间号select数据
      validateStatus: "", // 验真状态
      validateStatusList: [
        {
          value: 1,
          label: "待验真"
        },
        {
          value: 2,
          label: "验真成功"
        },
        {
          value: 3,
          label: "验真失败"
        }
        // ,
        // {
        //   value: 4,
        //   label: "无效"
        // }
      ],
      tableData: [],
      pageJson: {
        page: 1,
        limit: 10,
        total: 0,
        pageSum: 0
      },
      sortColumn: "id", //排序字段
      sortType: 1, //排序类型
      testDialogVisible: false,
      recordDialogVisible: false,
      testSubmitLoading: false,
      houseStatus: 5, // 房源状态
      testExplain: "", // 房源验真说明
      recordStatus: "", // 房源记录房源状态
      recordIntroduction: "", // 房源记录详细说明
      voiceList: [],
      recordCheckTime: "" // 验真时间
    };
  },
  created() {
    this.query();
    this.setConditionCol();
    window.addEventListener("resize", this.setConditionCol);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setConditionCol);
  },
  methods: {
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
          url: "/informator/verify/spotCheckRecordList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selectType: "MORE_SELECT_SHOP"
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
     * @example: 验真结果提交
     */
    testSubmit() {
      if (this.testExplain == "") {
        this.$message.error("请输入详细说明");
        return;
      }
      this.testSubmitLoading = true;
      let url =
        "/verifyHouse/verify/employee?id=" +
        this.testRowId +
        "&Remark=" +
        this.testExplain +
        "&checkTag=" +
        this.houseStatus;
      this.$api
        .post({
          url: url,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({
              message: e.data.message,
              type: "success"
            });
            this.testCancel();
          } else {
            this.$message.error(e.data.message);
          }
        })
        .finally(() => {
          this.testSubmitLoading = false;
        });
    },
    /**
     * @example: 取消房源验证
     */
    testCancel() {
      this.testDialogVisible = false;
    },
    /**
     * @example: 一键拨号
     */
    handleCallClick(row) {
      this.$api
        .post({
          url: "/noticeManage/common/verifyOneTouchDialPhone",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            draftId: row.id
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({
              message: e.data.message,
              type: "success"
            });
          } else {
            this.$message.error(e.data.message);
          }
        })
        .finally(() => {});
    },
    /**
     * @example: 房源验真
     */
    handleTestClick(row) {
      this.testRowId = row.id;
      this.testDialogVisible = true;
      this.houseStatus = 5;
      this.testExplain = "";
    },
    /**
     * @example: 验真记录
     */
    handleRecordClick(row) {
      this.recordStatus = "";
      this.recordIntroduction = "";
      this.voiceList = [];
      this.recordCheckTime = "";
      this.recordDialogVisible = true;
      this.$api
        .post({
          url: "/informator/verify/result",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            id: row.id
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.recordStatus = e.data.data.houseState;
            this.recordIntroduction = e.data.data.remark;
            this.voiceList = e.data.data.voiceList;
            this.recordCheckTime = e.data.data.checkTime;
          } else {
            this.$message.error(e.data.message);
          }
        })
        .finally(() => {});
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
          url: "/community/information/verify",
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
     * @example: 查询条件重置
     */
    reset() {
      //Object.assign(this.$data, this.$options.data());
      Object.assign(this.$data.conditions, this.$options.data().conditions);
      Object.assign(this.$data.department, this.$options.data().department);
      Object.assign(this.$data.agent, this.$options.data().agent);
      this.buildOptData = {};
      this.towerOptData = {};
      this.roomOptData = {};
      this.validateStatus = "";
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
      params.storeId = this.department.value;
      params.verifyPer = this.agent.value;
      params.checkStatus = this.validateStatus;
      params.beginTime = this.conditions.timeSelect[0];
      params.endTime = this.conditions.timeSelect[1];
      params.houseNo = this.conditions.houseNo;
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      this.$api
        .post({
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          url: "/informator/verify/list",
          data: params
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
          console.log(e, "查询锁定房源列表失败");
        })
        .finally(() => {
          this.loading = false;
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
@import url("~@/assets/publicLess/houseConditionsItem.less");
.el-select-dropdown__item {
  // prettier-ignore
  height: 40PX;
  // prettier-ignore
  line-height: 40PX;
  font-size: @font14;
}
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
  // prettier-ignore
  padding: 12PX 16PX 34PX;
  background: #f0f7f7;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  .conditions {
    // prettier-ignore
    padding: 24PX 24PX 20PX 24PX;
    background: #fff;
    // prettier-ignore
    border-radius: 8PX;
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: row;
    // prettier-ignore
    margin-top: 16PX;
    // prettier-ignore
    padding: 16PX;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
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
/deep/.test-dialog {
  .el-dialog {
    // prettier-ignore
    border-radius: 10PX;
    .el-dialog__header {
      // prettier-ignore
      padding: 32PX 24PX 0;
      .el-dialog__title {
        font-size: @font24;
        color: #303133;
      }
      .el-dialog__close {
        font-size: @font24;
        color: #606266;
      }
      .el-dialog__headerbtn {
        // prettier-ignore
        top: 30PX;
        // prettier-ignore
        right: 30PX;
      }
    }
    .el-dialog__body {
      // prettier-ignore
      padding: 24PX;
    }
    .el-dialog__footer {
      // prettier-ignore
      padding: 0 24PX 29PX;
    }
  }
  .content {
    .title {
      position: relative;
      // prettier-ignore
      margin-bottom: 16PX;
      // prettier-ignore
      padding-left: 14PX;
      // prettier-ignore
      line-height: 21PX;
      font-size: @font16;
      font-weight: bold;
      color: #303133;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        // prettier-ignore
        margin-top: -3PX;
        // prettier-ignore
        width: 6PX;
        // prettier-ignore
        height: 6PX;
        border-radius: 100%;
        background: #f62f2f;
        font-size: @font16;
        color: #909399;
      }
    }
    .radio-box {
      .el-radio-button {
        // prettier-ignore
        margin-right: 32PX;
        &.is-active {
          .el-radio-button__inner {
            background: @backgroud;
            color: #fff;
          }
        }
        .el-radio-button__inner {
          // prettier-ignore
          width: 103PX;
          // prettier-ignore
          height: 48PX;
          padding: 0;
          background: #f0f2f5;
          border: none;
          // prettier-ignore
          border-radius: 4PX;
          // prettier-ignore
          line-height: 48PX;
          font-size: @font16;
          color: #909399;
        }
      }
    }
    .tip {
      // prettier-ignore
      margin: 16PX 0 24PX;
      line-height: 1;
      font-size: @font16;
      color: #f33a3a;
    }
    .explain {
      // prettier-ignore
      height: 147PX;
      .el-textarea__inner {
        height: 100%;
        font-size: @font16;
      }
    }
  }
  .test-btn {
    // prettier-ignore
    width: 136PX;
    // prettier-ignore
    height: 48PX;
    box-sizing: border-box;
    font-size: @font16;
    &.cancel {
      border: 1px solid #cecece;
      color: #909399;
    }
    &.submit {
      background: @backgroud;
      color: #fff;
    }
  }
  &.record-content {
    .status-box {
      // prettier-ignore
      margin-bottom: 24PX;
      line-height: 1;
      font-size: @font16;
      .title {
        color: #909399;
      }
      .text {
        color: #303133;
      }
    }
    .detail-box {
      .title {
        font-size: @font16;
        color: #909399;
      }
      .detail {
        // prettier-ignore
        margin-top: 16PX;
        // prettier-ignore
        padding: 10PX 14PX 15PX;
        background: #f8f8f8;
        // prettier-ignore
        border-radius: 4PX;
        max-height: 300px;
        overflow: auto;
        .text {
          line-height: 1.5;
          font-size: @font16;
          color: #606166;
        }
        .ts {
          // prettier-ignore
          margin-top: 10PX;
          line-height: 1.5;
          font-size: @font14;
          color: #a7a7a7;
        }
      }
    }
  }
}
</style>
