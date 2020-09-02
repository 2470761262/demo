<template>
  <!-- 买卖房源-锁定房源 -->
  <div class="locking-container">
    <tabs :navActiveIndex="3"></tabs>
    <div class="conditions">
      <div class="conditions-box">
        <el-row :gutter="32">
          <el-form label-position="right" label-width="80px">
            <el-col :span="12">
              <el-row :gutter="10">
                <el-form-item label="楼盘">
                  <el-col :span="8">
                    <el-select
                      class="anchor-point"
                      popper-class="anchor-point"
                      data-anchor="锁定房源楼盘 => select"
                      @click.native="log_socket.sendUserActionData"
                      v-model="buildOptData"
                      placeholder="楼盘"
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
                        :data-anchor="'锁定房源楼盘 => select => option:' + item.name"
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
                      data-anchor="锁定房源栋座 => select"
                      @click.native="log_socket.sendUserActionData"
                      v-model="towerOptData"
                      placeholder="栋座"
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
                        :data-anchor="'锁定房源栋座 => select => option:' + item.name"
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
                      data-anchor="锁定房源房号 => select"
                      @click.native="log_socket.sendUserActionData"
                      v-model="roomOptData"
                      placeholder="请输入房号"
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
                        :data-anchor="'锁定房源房号 => select => option:' + item.name"
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
              <el-form-item label="房源编号">
                <el-input
                  v-model="conditions.houseNo"
                  placeholder="请输入房源编号"
                  @change="query(1)"
                  clearable
                  class="anchor-point"
                  :data-anchor="'锁定房源搜索 房源编号:' + conditions.houseNo"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="锁定时间">
                <el-date-picker
                  prefix-icon="prefix-icon"
                  v-model="conditions.timeSelect"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="query(1)"
                  :default-time="['00:00:00', '23:59:59']"
                  class="anchor-point"
                  :data-anchor="'锁定房源搜索 锁定时间:' + conditions.timeSelect"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div class="conditions-btn">
        <button
          class="btn anchor-pointn"
          @click="reset"
          data-anchor="锁定房源重置"
          >重置</button>
        <button
          class="btn active anchor-pointn"
          @click="query(1)"
          data-anchor="锁定房源搜索"
          >搜索</button>
      </div>
    </div>
    <div class="main">
      <div class="content">
        <div class="table">
          <el-table
            :data="tableData"
            height="100%"
            v-loading="loading"
            ref="tableList"
          >
            <el-table-column
              v-for="(item, index) in workColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :min-width="item.minWidth"
              :align="item.align"
              :sortable="item.sortable"
              :sort-orders="['ascending', 'descending']"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160">
              <template v-slot="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="unLock(scope.row.id)"
                  >解锁</el-button
                >
                <el-button
                  type="text"
                  size="mini"
                  @click="toLook(scope.row.id)"
                  >查看</el-button
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
        :total="pageJson.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import tabs from "./components/tabs.vue";
import util from "@/util/util";
export default {
  components: { tabs },
  data() {
    return {
      loading: false,
      conditions: {
        comId: "",
        cbId: "",
        bhId: "",
        houseNo: "",
        timeSelect: ""
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
      tableData: [],
      workColumn: [
        {
          prop: "houseNo",
          label: "房源编号",
          align: "left"
        }, {
          prop: "communityName",
          label: "楼盘名称",
          width: "166",
          align: "right"
        }, {
          prop: "buildingName",
          label: "楼栋号",
          align: "right"
        }, {
          prop: "roomNo",
          label: "房间号",
          align: "right"
        }, {
          prop: "plate",
          label: "状态",
          align: "right"
        }, {
          prop: "agentName",
          label: "跟单人",
          align: "right"
        }, {
          prop: "lockName",
          label: "锁定人",
          align: "right"
        }, {
          prop: "lockTime",
          label: "锁定时间",
          width: "220",
          align: "right"
        }, {
          prop: "lockRecord",
          label: "锁定原因",
          align: "right"
        }
      ],
      pageJson: {
        page: 1,
        limit: 10,
        total: 0,
        pageSum: 0
      },
      sortColumn: "id", //排序字段
      sortType: "descending", //排序类型
    }
  },
  created() {
    this.query();
  },
  methods: {
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
        url: "/community/saleAll",
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
      Object.assign(this.$data, this.$options.data());
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
      params.beginTime = this.conditions.timeSelect[0];
      params.endTime = this.conditions.timeSelect[1];
      params.houseNo = this.conditions.houseNo;
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      this.$api
        .post({
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          url: "/lockingHouse/lockedList",
          data: params
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.$refs.tableList.bodyWrapper.scrollTop = 0;
            this.pageJson.total = data.data.data.totalCount;
            this.tableData = data.data.data.list;
            // let btnList = data.data.btnList;
          }
        })
        .catch(e => {
          console.log("查询锁定房源列表失败");
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @example: 解锁
     */
    unLock(id) {
      let that = this;
      let params = {
        Eid: id,
        Islocking: 0
      };
      that.loading = true;
      this.$api
        .post({
          url: "/agentHouse/property/locking",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          that.$message(result.message);
          if (result.code == 200) {
            this.query(1);
          }
          that.loading = false;
        })
        .catch(e => {});
    },
    /**
     * @example: 查看
     */
    toLook(id) {
      var that = this;
      util.openPage.call(this, {
        name: "houseDetails",
        params: { houseId: id }
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
.locking-container {
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
        margin-bottom: 24PX;
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
    flex-direction: column;
    // prettier-ignore
    margin-top: 16PX;
    // prettier-ignore
    padding: 16PX;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    /deep/.content {
      flex: 1;
      display: flex;
      flex-direction: column;
      .table {
        flex: 1;
        // prettier-ignore
        min-height: 150PX;
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
          // perttier-ignore
          height: 64PX;
        }
        .el-button--mini, .el-button--small {
          // prettier-ignore
          padding: 0 10PX;
          font-size: @font16;
        }
      }
      .el-pagination {
        // perttier-ignore
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
          // perttier-ignore
          width: 80PX;
        }
        .el-pagination__sizes .el-input .el-input__inner {
          // perttier-ignore
          height: 22PX;
          // perttier-ignore
          line-height: 20PX;
          font-size: @font14;
        }
        .el-pager .more::before {
          line-height: 1;
        }
        .el-pagination__editor {
          height: auto;
          .el-input__inner {
            // perttier-ignore
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
