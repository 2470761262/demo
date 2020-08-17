<template>
  <div class="page-detail-content">
    <div class="page-result-head">
      <!-- 选择楼盘 & 栋座 & 房号搜索 -->
      <div class="cascader-content">
        <div class="cascader-content-build">
          <span class="cascader-title">楼盘</span>
          <!-- 楼栋 -->
          <el-select
            v-model="buildOptData"
            placeholder="请输入楼盘名称"
            class="input-content input_210 anchor-point"
            clearable
            filterable
            remote
            popper-class="options-custom-item anchor-point"
            data-anchor="资源库管理详情楼盘 => select"
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
              :data-anchor="'资源库管理详情楼盘 => select => option:' + item.name"
              @click.native="log_socket.sendUserActionData"
              :key="item.value"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
          <!-- 栋座 -->
          <el-select
            v-model="towerOptData"
            placeholder="请输入栋座"
            clearable
            filterable
            class="input-content input_175 anchor-point"
            popper-class="options-custom-item anchor-point"
            data-anchor="资源库管理详情栋座 => select"
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
              :data-anchor="'资源库管理详情栋座 => select => option:' + item.name"
              @click.native="log_socket.sendUserActionData"
              :key="item.value"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
          <!-- 房间号 -->
          <el-select
            v-model="roomOptData"
            placeholder="请输入房号"
            clearable
            filterable
            popper-class="options-custom-item anchor-point"
            class="input-content input_130 anchor-point"
            data-anchor="资源库管理详情房号 => select"
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
              :data-anchor="'资源库管理详情房号 => select => option:' + item.name"
              @click.native="log_socket.sendUserActionData"
              :key="item.value"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </div>
      </div>
      <resource-buttons></resource-buttons>
    </div>
    <div class="page-detail-panel">
      <div class="tab-page-flex">
        <el-table
          :data="renderList"
          header-cell-class-name="header-tab-cell"
          default-expand-all
          :show-header="false"
          v-loading="loading"
        >
          <el-table-column
            v-for="(item, index) in tableColumnField"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :sortable="item.order"
            :formatter="item.formart"
            :sort-orders="['ascending', 'descending']"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="250" fixed="right">
            <template v-slot="scope">
              <el-button
                class="anchor-point"
                type="primary"
                size="mini"
                data-anchor="资源库管理添加号码 => click"
                @click="addPhone(scope.row.id)"
                icon="el-icon-circle-plus"
                >添加号码</el-button
              >
              <el-button
                class="anchor-point"
                type="primary"
                data-anchor="资源库管理转为在售 => click"
                @click="toSale(
                  scope.row.communityId,
                  scope.row.buildingId,
                  scope.row.id,
                  scope.row.communityName,
                  scope.row.comBuildingName,
                  scope.row.roomNo
                )"
                size="mini"
                icon="el-icon-refresh"
                >转为在售</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tab-page-floot">
        <el-pagination
          @current-change="currentchange"
          @size-change="handleSizeChange"
          :page-sizes="[30, 50, 70]"
          :page-size="pageJson.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageJson.dataCount"
          :current-page="pageJson.currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import resourceButtons from './components/resourceButtons.vue'
export default {
  components: {
    resourceButtons
  },
  data() {
    return {
      buildOptData: {}, //当前楼盘选择数据
      buildForList: [], //楼盘select数据
      buildLoading: false, //楼盘select loading
      towerOptData: {}, //栋座选中数据
      towerForList: [], //栋座select数据
      towerLoading: false, //栋座select loading
      roomOptData: {}, //房间号选中数据
      roomForList: [], //房间号select数据
      roomLoading: false, //房间号select loading
      roomNoList: [], //房间号select数据
      houseNoPage: {
        // 房间分页数据
        currentPage: 1,
        totalPage: 1,
        limit: 30
      },
      loading: false,
      renderList: [],
      tableColumnField: [
        {
          label: "楼盘名称",
          order: false,
          width: "300",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-title">{item.communityName}</div>
                <div class="tab-houseno">{item.area?item.area:'暂无'}平&nbsp;/&nbsp;{item.face?item.face:'暂无'}&nbsp;/&nbsp;{item.rooms?item.rooms:0}-{item.hall?item.hall:0}-{item.toilet?item.toilet:0}-{item.balcony?item.balcony:0}</div>
                <div class="tab-houseno">{item.buildYear?item.buildYear+'年竣工':'暂无'}&nbsp;/&nbsp;{item.buildType?item.buildType:'暂无'}&nbsp;/&nbsp;{item.buildingStructure?item.buildingStructure:'暂无'}</div>
              </div>
            );
          }
        },
        {
          label: "户型",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-tip">学校划片：</div>
                <div class="tab-houseno">{item.promarySchool?item.promarySchool:'暂无'}&nbsp;{item.middleSchool?item.middleSchool:'暂无'}</div>
              </div>
            );
          }
        },
        {
          label: "面积",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-tip">历史跟单人：</div>
                <div class="tab-houseno">{item.lastFollwers.length>0?item.lastFollwers.join(" "):'暂无'}</div>
              </div>
            );
          }
        },
        {
          label: "总价",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-houseno-tip">{item.saleStatusChangeTime?item.saleStatusChangeTime:'暂无'}</div>
                <div class="tab-houseno">
                  {item.saleReamrk?item.saleReamrk:'暂无'}
                </div>
              </div>
            );
          }
        }
      ],
      pageJson: {
        total: 1,
        pageSize: 30,
        currentPage: 1,
        dataCount: 0
      },
      conditions: {
        comId: "", // 楼盘
        cbId: "", // 栋楼
        bhId: "", // 房间号
      }
    }
  },
  watch: {
    conditions: {
      deep: true,
      // immediate: true,
      handler(value, ordvalue) {
        this.pageJson.currentPage = 1;
        this.queryDetailList();
      }
    }
  },
  created() {
    this.conditions.comId = this.$route.params.id;
  },
  methods: {
    InitPageJson() {
      this.pageJson = {
        total: 1,
        currentPage: 1,
        pageSize: this.pageJson.pageSize,
        dataCount: 0
      };
    },
    /**
     * 资源库管理数据请求
     */
    queryDetailList() {
      var that = this;
      that.loading = true;
      let params = {
        limit: that.pageJson.pageSize,
        page: this.pageJson.currentPage
      };
      params.comId = that.conditions.comId;
      params.cbId = that.conditions.cbId;
      params.bhId = that.conditions.bhId;

      this.$api
        .post({
          url: "/houseResource/devClueIndex",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          that.loading = false;
          if (e.data.code == 200) {
            that.pageJson.dataCount = e.data.data.dataCount;
            that.renderList = e.data.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleSizeChange(pageSize) {
      this.pageJson.pageSize = pageSize;
      this.pageJson.currentPage = 1;
      this.queryDetailList();
    },
    /**
     * @example: 分页组件页面改变时触发
     * @param {number} pageIndex
     */
    currentchange(pageIndex) {
      this.pageJson.currentPage = pageIndex;
      this.queryDetailList();
    },
    /**
     * @example: 楼盘激活第一时获取数据
     */
    remoteBuildInput() {
      this.buildForList.length === 0 && this.buildRemoteMethod();
    },
    /**
     * @example: 远程获取楼盘信息
     */
    buildRemoteMethod(query) {
      var that = this;
      that.buildLoading = true;
      that.$api
        .get({
          url: "/community/notPhone",
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
            that.buildLoading = false;
            that.buildForList = e.data.data.list;
          }
        });
    },
    /**
     * @example: 楼盘选择更改触发事件
     * @param {Obejct} item 当前选中对象
     */
    remoteBuildChange(item) {
      const { name = undefined, value = undefined } = item;
      this.conditions.comId = value;
      //清理楼栋数据
      this.conditions.cbId = "";
      this.towerOptData = {};
      this.towerForList = [];
      //清理房间号数据
      this.conditions.bhId = "";
      this.roomOptData = {};
      this.roomForList = [];
      this.pageJson.currentPage = 1
      this.queryDetailList();
      if (value) this.queryRoomNo();
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
            comBuildingName: name == undefined ? "" : name.trim(),
            page: 1,
            limit: 9999
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
      // 如果删除或者手动删除传入空字符串将会把楼栋数据清理为空字符串
      this.conditions.cbId = value ? value : "";
      // 清理房间号数据
      this.conditions.bhId = "";
      this.roomOptData = {};
      this.roomForList = [];
      // 获取房间号数据
      this.queryRoomData();
    },
    /**
     * @example: 远程获取房间号信息
     * @param {String} e 输入搜索的文本
     */
    queryRoomData(e) {
      this.roomLoading = true;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.conditions.comId,
            cbId: this.conditions.cbId,
            roomNo: e == undefined ? "" : e.trim(),
            limit: 99
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.roomForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.roomLoading = false;
        });
    },
    /**
     * @example:房间号修改选中触发事件
     * @param {Ojbect} item 选中时选中的数据
     */
    queryRoomDataChange(item) {
      let { value } = item;
      this.conditions.bhId = value ? value : "";
    },
    /**
     * 添加号码
     */
    addPhone(id) {
      this.$prompt("请输业主手机号码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d{11}$/,
        inputErrorMessage: "手机号码格式不正确",
        showConfirmButton: this.showAddPhone
      })
        .then(({ value }) => {
          this.$api
            .post({
              url: "/houseResource/addPhone",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: {
                id: id,
                tel: value
              }
            })
            .then(e => {
              if (e.data.code == 200) {
                this.$message({
                  message: e.data.message,
                  type: 'success'
                });
                this.queryDetailList();
              } else {
                this.$message.error(e.data.message);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    /**
     * 转为在售
     */
    toSale(comId, cbId, bhId, communityName, buildingName, roomNo) {
      this.$router.push({
        path: "/buySellSystem/addHouse",
        query: {
          method: "tosale",
          comId: comId,
          cbId: cbId,
          bhId: bhId,
          communityName: communityName,
          buildingName: buildingName,
          roomNo: roomNo,
          flag: "potentia",
          customerName: null,
          tel: null
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/pages/customersSystem/addCustomers/less/form.less";
.page-detail-content{
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 0;
  .page-result-head {
    display: flex;
    // justify-content: space-between;
    padding: 20px 15px;
    border-bottom: 10px solid #EAEBED;
    /************ 选择楼盘 & 栋座 & 房号 ************/
    .cascader-content {
      display: inline-flex;
      // prettier-ignore
      @height35:35PX;
      .cascader-title {
        margin-right: 30px;
        color: #777;
      }
      .input-content {
        @width: auto;
        // prettier-ignore
        margin-right: 18PX;
        height: @height35 !important;
        &:last-child {
          margin-right: 0;
        }
        .step-content > .input-group > .input-content;
        &.input_180 {
          // prettier-ignore
          width: 180PX;
        }
        &.input_210 {
          // prettier-ignore
          width: 210PX;
        }
        &.input_130 {
          // prettier-ignore
          width: 130PX;
        }
        &.input_175 {
          // prettier-ignore
          width: 175PX;
        }
        /deep/.el-input__inner {
          text-align: center;
          background: #f0f7fc;
          border: none;
          font-size: @font14;
          height: @height35;
          line-height: @height35;
          padding: 0 10px;
          // box-shadow: ;
          &::placeholder {
            font-size: @font14;
            color: #a6aaaf;
          }
        }
        /deep/.el-icon-circle-close {
          line-height: @height35 !important;
        }
      }
      .cascader-content-build {
        // prettier-ignore
        margin-right: 18PX;
      }
    }
  }
  .page-detail-panel {
    flex: 1;
    overflow: auto;
    /deep/.el-table__body{
      tbody {
        td:first-child {
          .cell {
            padding-left: 20px;
          }
        }
      }
    }
    .tab-com-item {
      padding: 4px 0;
      margin-top: 10px;
      .tab-house-title {
        margin-bottom: 15px;
        font-size: @font16;
        font-weight: 600;
        color: black;
      }
        .tab-house-tip {
          margin-top: 30px;
          margin-bottom: 10px;
          font-size: @font14;
          color: #bfbfbf;
        }
        .tab-houseno-tip {
          margin-top: 30px;
          margin-bottom: 10px;
          font-size: @font14;
        }
        .tab-houseno {
          margin-bottom: 10px;
          font-size: @font14;
        }
    }
    .tab-page-floot{
      padding-top: 16px;
      padding-bottom: 14px;
      display: flex;
      justify-content: flex-end;
    }
  }
  .anchor-point {
    // prettier-ignore
    height: 28PX;
  }
}
/*** 下拉选框 ***/
.options-item {
  .options-item;
}
.options-custom-item {
  .options-item;
  .el-select-dropdown__item {
    display: flex;
    // prettier-ignore
    height: 40PX;

    /deep/ span {
      flex: 1;
      width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: @font14;
    }
  }
}
</style>
