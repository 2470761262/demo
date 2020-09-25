<template>
  <!-- 小区对标列表 -->
  <div class="container">
    <div class="conditions">
      <div class="conditions-box">
        <el-row :gutter="32">
          <el-form label-position="right" label-width="100px">
            <el-col :span="colChunks[0]">
              <el-row :gutter="10">
                <el-form-item label="楼盘名称">
                  <el-select
                    class="width100 anchor-point"
                    popper-class="anchor-point"
                    data-anchor="小区对标楼盘 => select"
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
                        '小区对标楼盘 => select => option:' + item.name
                      "
                      @click.native="log_socket.sendUserActionData"
                      v-for="item in buildForList"
                      :key="item.value"
                      :label="item.name"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col :span="colChunks[1]">
              <el-row :gutter="10">
                <el-form-item label="楼盘地区">
                  <el-col :span="8">
                    <el-select
                      class="anchor-point"
                      popper-class="anchor-point"
                      data-anchor="小区对标省 => select"
                      v-model="province"
                      placeholder="选择省"
                      clearable
                      filterable
                      remote
                      :loading="provinceLoading"
                      value-key="value"
                    >
                      <el-option
                        class="anchor-point"
                        :data-anchor="
                          '小区对标省 => select => option:' + item.name
                        "
                        v-for="item in provinceList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select
                      class="anchor-point"
                      popper-class="anchor-point"
                      data-anchor="小区对标市 => select"
                      @click.native="log_socket.sendUserActionData"
                      v-model="city"
                      placeholder="选择市"
                      clearable
                      filterable
                      remote
                      :loading="cityLoading"
                      value-key="value"
                      @change="getCounty"
                    >
                      <el-option
                        class="anchor-point"
                        :data-anchor="
                          '小区对标市 => select => option:' + item.name
                        "
                        @click.native="log_socket.sendUserActionData"
                        v-for="item in cityList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select
                      class="anchor-point"
                      popper-class="anchor-point"
                      data-anchor="小区对标区/县 => select"
                      @click.native="log_socket.sendUserActionData"
                      v-model="county"
                      placeholder="选择区/县"
                      clearable
                      filterable
                      remote
                      :loading="countyLoading"
                      value-key="value"
                      @change="query(1)"
                    >
                      <el-option
                        class="anchor-point"
                        :data-anchor="
                          '小区对标区/县 => select => option:' + item.name
                        "
                        @click.native="log_socket.sendUserActionData"
                        v-for="item in countyList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col :span="colChunks[2]">
              <el-form-item label="58对标情况">
                <el-select
                  class="width100 anchor-point"
                  popper-class="anchor-point"
                  data-anchor="小区对标列表58对标情况 => select"
                  @click.native="log_socket.sendUserActionData"
                  filterable
                  v-model="benchmarkingStatus"
                  clearable
                  @change="query(1)"
                  placeholder="请选择"
                >
                  <el-option
                    class="anchor-point"
                    :data-anchor="
                      '小区对标列表58对标情况 => select => option:' + item.label
                    "
                    @click.native="log_socket.sendUserActionData"
                    v-for="item in benchmarkingStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="colChunks[3]">
              <el-form-item label="关系同步情况" v-if="false">
                <el-select
                  class="width100 anchor-point"
                  popper-class="anchor-point"
                  data-anchor="小区对标列表关系同步情况 => select"
                  @click.native="log_socket.sendUserActionData"
                  filterable
                  v-model="relationStatus"
                  clearable
                  @change="query(1)"
                  placeholder="请选择"
                >
                  <el-option
                    class="anchor-point"
                    :data-anchor="
                      '小区对标列表关系同步情况 => select => option:' +
                        item.label
                    "
                    @click.native="log_socket.sendUserActionData"
                    v-for="item in relationStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="colChunks[4]" class="fr">
              <div class="conditions-btn">
                <div
                  class="btn anchor-pointn"
                  @click="reset"
                  data-anchor="小区对标列表重置"
                >
                  重置
                </div>
                <div
                  class="btn active anchor-pointn"
                  @click="query(1)"
                  data-anchor="小区对标列表搜索"
                >
                  查询
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
        <div class="btn-box">
          <button
            class="batch-button anchor-pointn"
            @click="batchBenchmarking"
            data-anchor="小区对标列表批量对标"
          >
            批量对标
          </button>
          <button
            class="batch-button anchor-pointn"
            @click="batchRelation"
            data-anchor="小区对标列表批量关系同步"
          >
            批量关系同步
          </button>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            height="100%"
            v-loading="loading"
            ref="tableList"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
              :selectable="isChooise"
            ></el-table-column>
            <el-table-column
              fixed="left"
              label="楼盘名称"
              align="left"
              min-width="166"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <div class="tab-house-box">
                  <div class="tab-house-title">
                    {{ scope.row.name }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="checkStatus"
              label="所在城市"
              align="right"
              min-width="130"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                {{ scope.row.cityName }}
              </template>
            </el-table-column>
            <el-table-column
              label="所在区/县"
              align="right"
              min-width="130"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <span>{{ scope.row.countyName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="58对标情况"
              align="right"
              min-width="130"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <span>{{ scope.row.contrastStr }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="磐石小区ID"
              align="right"
              min-width="130"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <span>{{ scope.row.panshiCommunityId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="磐石小区名称"
              align="right"
              min-width="140"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <span>{{ scope.row.displayName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="磐石小区地址"
              align="right"
              min-width="140"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <span>{{ scope.row.communityAddress }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="磐石小区所属区域"
              align="right"
              min-width="150"
              show-overflow-tooltip
            >
              <template v-slot="scope">
                <span>{{ scope.row.shangquanDistrictName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="right"
              width="250"
            >
              <template v-slot="scope">
                <el-button
                  class="operate-btn"
                  @click="handleCallClick(scope.row)"
                  :type="scope.row.contrast != -1 ? 'info' : 'primary'"
                  :disabled="scope.row.contrast != -1"
                  >58对标</el-button
                >
                <el-button
                  class="operate-btn"
                  @click="handleSynchro(scope.row)"
                  :type="
                    scope.row.panshiCommunityId != null ? 'info' : 'primary'
                  "
                  :disabled="scope.row.panshiCommunityId != null"
                  >关系同步</el-button
                >
                <el-button
                  class="operate-btn"
                  @click="handleBenchmark(scope.row)"
                  type="primary"
                  >手工对标</el-button
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
    <el-dialog
      class="relation-dialog"
      title="手工对标"
      :visible.sync="dialogTableVisible"
      width="800px"
    >
      <el-table :data="gridData" height="300px">
        <el-table-column
          property="communityId"
          label="磐石小区ID"
          min-width="100"
        ></el-table-column>
        <el-table-column
          property="communityName"
          label="磐石小区名称"
          min-width="120"
        ></el-table-column>
        <el-table-column
          property="address"
          label="磐石小区详细地址"
          min-width="150"
        ></el-table-column>
        <el-table-column
          property="mianShangquanName"
          label="主商圈名称"
          min-width="120"
        ></el-table-column>
        <el-table-column
          property="mainShangquanDistrictName"
          label="主商圈区域名称"
          min-width="120"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="70">
          <template v-slot="scope">
            <el-button
              type="primary"
              class="relation-dialog-btn"
              @click="dialogBenchmark(scope.row)"
              >对标</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
const BENCHMARKINGSTATUSLIST = [
  {
    label: "全部",
    value: null
  },
  {
    label: "未申请对标",
    value: -1
  },
  {
    label: "已申请未对标",
    value: 0
  },
  {
    label: "机器对标成功",
    value: 1
  },
  {
    label: "机器失败等待人工处理",
    value: 2
  },
  {
    label: "对标失败",
    value: 3
  },
  {
    label: "人工对标成功",
    value: 4
  },
  {
    label: "暂停对标",
    value: 5
  },
  {
    label: "手工对标",
    value: 6
  }
];
const RELATIONSTATUSLIST = [
  {
    label: "全部",
    value: null
  },
  {
    label: "已同步",
    value: 1
  },
  {
    label: "未同步",
    value: 0
  }
];
import util from "@/util/util";
export default {
  components: {},
  data() {
    return {
      colChunks: [5, 9, 5, 5, 6], // 条件选项栅格布局
      dialogTableVisible: false,
      gridData: [],
      benchmarkingStatus: null,
      benchmarkingStatusList: BENCHMARKINGSTATUSLIST,
      relationStatus: null,
      relationStatusList: RELATIONSTATUSLIST,
      batchList: [], //批量勾选的数组
      conditions: {
        comId: "",
        cbId: "",
        bhId: ""
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
      province: 350000,
      provinceList: [],
      provinceLoading: false,
      city: null,
      cityList: [],
      cityLoading: false,
      county: null,
      countyList: [],
      countyLoading: false,
      loading: false,
      tableData: [],
      pageJson: {
        page: 1,
        limit: 10,
        total: 0,
        pageSum: 0
      },
      sortColumn: "id", //排序字段
      sortType: 1, //排序类型
      handleId: null
    };
  },
  created() {
    this.query();
    this.setConditionCol();
    window.addEventListener("resize", this.setConditionCol);
    this.getPro();
    this.getCity();
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
        this.colChunks = [5, 9, 5, 5, 6];
      } else {
        this.colChunks = [7, 10, 7, 8, 8];
      }
    },
    /**
     * @example: 批量对标
     */
    batchBenchmarking() {
      console.log(this.batchList);
      if (this.batchList.length == 0) {
        this.$message({
          message: "请选择楼盘",
          type: "error"
        });
        return;
      }
      this.$message({
        message: "对标中，请稍后...",
        type: "info"
      });
      this.loading = true;
      this.$api
        .post({
          url: "/community/contrast/batch/handle",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            ids: this.batchList
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({
              message: e.data.message,
              type: "success"
            });
            this.query(this.pageJson.page);
          } else {
            this.$message.error(e.data.message);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @example: 批量关系同步
     */
    batchRelation() {
      console.log(this.batchList);
      if (this.batchList.length == 0) {
        this.$message({
          message: "请选择楼盘",
          type: "error"
        });
        return;
      }
      this.$message({
        message: "同步中，请稍后...",
        type: "info"
      });
      this.loading = true;
      this.$api
        .post({
          url: "/community/contrast/batch/synchro",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            ids: this.batchList
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({
              message: e.data.message,
              type: "success"
            });
            this.query(this.pageJson.page);
          } else {
            this.$message.error(e.data.message);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @example: 多选框选择改变事件
     */
    handleSelectionChange(item) {
      item.forEach(element => {
        if (!this.batchList.includes(element.id)) {
          this.batchList.push(element.id);
        }
      });
      console.log(this.batchList, "----------");
    },
    isChooise(row, index) {
      if (row.panshiCommunityId != null) {
        return false;
      }
      return true;
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
          url: "/community/contrast/comm/search",
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
      this.buildOptData = {};
      this.towerOptData = {};
      this.roomOptData = {};
      this.query();
    },
    /**
     * @example: 搜索
     */
    query(currentPage = 1) {
      this.pageJson.page = currentPage;
      this.loading = true;
      let params = { limit: this.pageJson.limit, page: currentPage };
      console.log("this.buildOptData", this.buildOptData);
      if (this.buildOptData != null) {
        params.comId = this.buildOptData.value;
      }
      if (this.city != null) {
        params.city = this.city;
      }
      if (this.county != null) {
        params.county = this.county;
      }
      if (this.benchmarkingStatus != null) {
        params.contrast = this.benchmarkingStatus;
      }
      this.$api
        .post({
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          url: "/community/contrast/list",
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
    },
    handleCallClick(row) {
      this.$api
        .post({
          url: "/community/contrast/handle",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            id: row.id,
            name: row.name,
            cityName: row.cityName,
            countyName: row.countyName,
            idFor58: row.idFor58
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({
              message: e.data.message,
              type: "success"
            });
            this.query(this.pageJson.page);
          } else {
            this.$message.error(e.data.message);
          }
        })
        .finally(() => {});
    },
    handleSynchro(row) {
      this.$api
        .post({
          url: "/community/contrast/synchro",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            id: row.id,
            idFor58: row.idFor58
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({
              message: e.data.message,
              type: "success"
            });
            this.query(this.pageJson.page);
          } else {
            this.$message.error(e.data.message);
          }
        })
        .finally(() => {});
    },
    /**
     * @example: 手工对标按钮
     */
    handleBenchmark(row) {
      this.$prompt("", "楼盘名称", {
        inputValue: row.name,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.openBenchmarkPop(row, value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    /**
     * @example: 打开手工对标弹窗表格
     */
    openBenchmarkPop(row, name) {
      this.$message({
        message: "对标查询中...",
        type: "info"
      });
      let params = { name: name, idFor58: row.idFor58 };
      this.handleId = row.id;
      this.$api
        .post({
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          url: "/community/contrast/search",
          data: params
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.gridData = data.data;
            this.dialogTableVisible = true;
          } else {
            this.$message({
              message: e.data.message,
              type: "error"
            });
          }
        })
        .catch(e => {
          console.log(e, "查询锁定房源列表失败");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @example: 手工对标弹窗表格操作按钮
     */
    dialogBenchmark(row) {
      this.$api
        .post({
          url: "/community/contrast/handmade",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            id: this.handleId,
            communityId: row.communityId,
            communityName: row.communityName,
            address: row.address,
            mianShangquanName: row.mianShangquanName,
            mainShangquanDistrictName: row.mainShangquanDistrictName
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({
              message: e.data.message,
              type: "success"
            });
            this.dialogTableVisible = true;
            this.query(this.pageJson.page);
          } else {
            this.$message.error(e.data.message);
          }
        })
        .finally(() => {});
    },
    getPro() {
      this.$api
        .get({
          url: "/community/contrast/region",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            level: 1,
            pid: 100000
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.provinceList = e.data.data;
          }
        })
        .finally(() => {
          this.buildLoading = false;
        });
    },
    getCity() {
      this.$api
        .get({
          url: "/community/contrast/region",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            level: 2,
            pid: this.province
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.cityList = e.data.data;
          }
        })
        .finally(() => {
          this.buildLoading = false;
        });
    },
    getCounty() {
      this.query();
      this.county = null;
      this.$api
        .get({
          url: "/community/contrast/region",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            level: 3,
            pid: this.city
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.countyList = e.data.data;
          }
        })
        .finally(() => {
          this.buildLoading = false;
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
      .batch-button {
        // prettier-ignore
        height: 36PX;
        // prettier-ignore
        padding: 0 10PX;
        // prettier-ignore
        margin: 0 10PX 10PX 0;
        border: none;
        border-radius: 4px;
        outline: none;
        line-height: 1;
        text-align: center;
        font-size: @font14;
        cursor: pointer;
        background: @backgroud;
        color: #fff;
      }
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
        .el-checkbox__inner {
          width: 18px;
          height: 18px;
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
.operate-btn {
  // prettier-ignore
  height: 30PX;
  // prettier-ignore
  padding: 0 10PX;
  border: none;
  // prettier-ignore
  border-radius: 4PX;
  outline: none;
  // prettier-ignore
  line-height: 30PX;
  text-align: center;
  font-size: @font12;
}
/deep/.relation-dialog {
  .el-dialog__title {
    font-size: @font18;
    font-weight: bold;
  }
  .el-dialog__body {
    // prettier-ignore
    padding-top: 10PX;
    .relation-dialog-btn {
      // prettier-ignore
      height: 28PX;
      // prettier-ignore
      padding: 0 10PX;
      border: none;
      // prettier-ignore
      border-radius: 4PX;
      outline: none;
      // prettier-ignore
      line-height: 28PX;
      text-align: center;
      font-size: @font12;
    }
  }
}
</style>
