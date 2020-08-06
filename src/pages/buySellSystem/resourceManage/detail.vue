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
                @click="addNumber(scope.row)"
                icon="el-icon-circle-plus"
                >添加号码</el-button
              >
              <el-button
                class="anchor-point"
                type="primary"
                data-anchor="资源库管理转为在售 => click"
                @click="houseOperate(scope.row)"
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
      roomOptData: {}, //房间号选中数据
      roomForList: [], //房间号select数据
      roomLoading: false, //房间号select loading
      towerOptData: {}, //栋座选中数据
      towerForList: [], //栋座select数据
      towerLoading: false, //栋座select loading
      renderList: [],
      tableColumnField: [
        {
          prop: "communityName",
          label: "楼盘名称",
          order: false,
          width: "300",
          formart: item => {
            return (
              // <div class="tab-com-item">
              //   <div class="tab-house-title">{item.communityName}</div>
              //   <div class="tab-houseno">{item.houseNo}</div>
              // </div>
              <div class="tab-com-item">
                <div class="tab-house-title">{item.communityName}</div>
                <div class="tab-houseno">100平&nbsp;/&nbsp;朝南&nbsp;/&nbsp;3-2-1-1</div>
                <div class="tab-houseno">2009年竣工&nbsp;/&nbsp;商品房&nbsp;/&nbsp;框架</div>
              </div>
            );
          }
        },
        {
          prop: "houseType",
          label: "户型",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-tip">学校划片：</div>
                <div class="tab-houseno">实验小学&nbsp;实验中学</div>
              </div>
            );
          }
        },
        {
          prop: "inArea",
          label: "面积",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-tip">历史跟单人：</div>
                <div class="tab-houseno">张晓明&nbsp;周杰伦&nbsp;王一博</div>
              </div>
            );
          }
        },
        {
          prop: "price",
          label: "总价",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-houseno">2020-07-15</div>
                <div class="tab-houseno">
                  由<u>周杰伦</u>在售转<u>暂不售</u>
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
        roomNo: "", // 房间号
      },
      sortColumn: "id", //排序字段
      sortType: "descending", //排序类型
      proprietorNumber: "",
    }
  },
  watch: {
    conditions: {
      deep: true,
      // immediate: true,
      handler(value, ordvalue) {
        this.queryNotPhone(JSON.parse(JSON.stringify(value)));
      }
    }
  },
  created() {
    console.log(this,this.$route.params, "params==========");
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
    queryNotPhone(currentPage) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage - 1 };

      params.comId = that.conditions.comId;
      params.cbId = that.conditions.cbId;
      params.roomNo = that.conditions.roomNo;

      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      console.log(params);
      this.$api
        .post({
          url: "/houseResource/getNotPhone",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          that.loading = false;
          if (e.data.code == 200) {
            that.pageJson.total = e.data.data.dataCount;
            that.renderList = e.data.data.data;
            console.log(e.data, "detail=========================")
          }
        })
        .catch(e => {
          console.log("查询无号码列表失败");
          console.log(e);
        });
    },
    handleSizeChange(pageSize) {
      this.pageJson.pageSize = pageSize;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), true);
    },
    /**
     * @example: 分页组件页面改变时触发
     * @param {number} pageIndex
     */
    currentchange(pageIndex) {
      this.pageJson.currentPage = pageIndex;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), false);
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
      this.buildLoading = true;
      this.$api
        .get({
          url: "/community/houseList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            communityName: query
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
      console.log(this.buildOptData,item, "=============11")
      const { name = undefined, value = undefined } = item;

      //如果删除或者手动删除传入空字符串将会把楼栋数据清理为空字符串
      this.form.comId = value ? value : "";

      //清理楼栋数据
      this.towerForList = [];
      this.form.cbId = "";
      this.towerOptData = {};

      //清理房间号数据
      this.form.bhId = "";
      this.roomOptData = {};
      this.roomForList = [];

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
          data: {
            comId: this.form.comId,
            comBuildingName: name == undefined ? "" : name.trim(),
            limit: 20
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
      console.log(this.towerOptData,item, "=============11")
      const { name = undefined, value = undefined } = item;

      //如果删除或者手动删除传入空字符串将会把楼栋数据清理为空字符串
      this.form.cbId = value ? value : "";

      //清理房间号数据
      this.form.bhId = "";
      this.roomOptData = {};
      this.roomForList = [];

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
          url: "/mateHouse/queryBuildIngHousesBySale",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: this.form.comId,
            cbId: this.form.cbId,
            limit: 20,
            roomNo: e == undefined ? "" : e.trim()
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
      const { name = undefined, value = undefined } = item;

      this.form.bhId = value ? value : "";
    },
    /**
     * 添加号码
     */
    addNumber(row) {
      console.log(row, "========");
      this.openFollowUpDialog();
    },
    /**
     * 转为在售
     */
    houseOperate(row) {
      console.log(row, "转为在售");
      this.toSale(
        row.eid,
        row.comId,
        row.cbId,
        row.bhId,
        row.communityName,
        row.buildingName,
        row.customers,
        row.roomNo,
        row.tel
      );
    },
    /**
     * 打开添加号码弹窗
     */
    openFollowUpDialog() {
      const h = this.$createElement;
      this.$msgbox({
        title: '添加号码',
        message: h('div', {
          attrs: {
            class: 'el-textarea',
          },
        }, [
          h('input', {
            attrs: {
              class: 'el-textarea__inner',
              placeholder: "输入业主号码",
              autocomplete: 'off',
              rows: 4,
              id:'commentContent'
            },
            value: this.proprietorNumber,
            on: { input: this.onProprietorNumberChange }
          })
        ]),
        showCancelButton: true,
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            if (this.proprietorNumber.length < 6) {
              instance.confirmButtonLoading = false;
              this.$message.warning("输入的业主号码格式不对");
              instance.confirmButtonText = '提交';
              return;
            }
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 1000);
          } else {
            document.getElementById("commentContent").value = "";
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      }).catch((e) => {});
    },
    /**
     * 监听跟进输入内容
     */
    onProprietorNumberChange() {
      let content = document.getElementById("commentContent").value;
      if (content.length > 30)
        document.getElementById("commentContent").value = content.substring(0, 30);
      this.proprietorNumber = document.getElementById("commentContent").value;
    },
    toSale(
      id,
      comId,
      cbId,
      bhId,
      communityName,
      buildingName,
      customers,
      roomNo,
      tel
    ) {
      var that = this;
      console.log(bhId);
      this.$api
        .post({
          url: "/agent_house/getTels/" + id,
          qs: true
        })
        .then(e => {
          let result = e.data;
          let tel1 = "",
            tel2 = "",
            tel3 = "";
          if (result.code == 200) {
            tel = result.data.Tel;
            tel1 = result.data.Tel1;
            tel2 = result.data.Tel2;
            tel3 = result.data.Tel3;
          }
          that.$router.push({
            path: "/buySellSystem/addHouse",
            disabledStatus: false,
            query: {
              comId: comId,
              cbId: cbId,
              bhId: bhId,
              communityName: communityName,
              buildingName: buildingName,
              roomNo: roomNo,
              flag: "potentia",
              customerName: customers,
              method: "tosale",
              tel: tel,
              tel1: tel1,
              tel2: tel2,
              tel3: tel3
            }
          });
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
      margin-top: 10px;
      .tab-house-title {
        font-size: @font16;
        font-weight: 600;
        color: black;
      }
      .tab-house-tip {
        font-size: @font14;
        color: #b1b1b1;
      }
      .tab-houseno {
        margin-top: 10px;
        font-size: @font12;
      }
    }
    .tab-page-floot{
      padding-top: 16px;
      padding-bottom: 14px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
