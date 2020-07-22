<style lang="less" scoped>
@import url("../../../assets/publicLess/pageListQuery.less");
/deep/.cellRed {
  background: #e13d3d;
  color: #fff;
}
/deep/.defaultCell {
  background: #fff;
}
/dee/.cellOrange {
  background: #cdca1a;
  color: #fff;
}
.page-row-flex {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.elTree {
  height: 550px;
  overflow-y: auto;
}
</style>
<template>
  <div class="page-row-flex ">
    <list-page
      @sort-change="sortMethod"
      :parentData="$data"
      :cellClass="defaultCell"
      :row-class-name="setRowClass"
      @queryTabData="queryTabData"
      @handleClick="handleClick"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:left>
        <div class="elTree" v-if="treeData.length > 0">
          <el-input
            data-anchor="外网房源树 => click"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            class="treeSearch"
          ></el-input>
          <el-tree
            ref="treeForm"
            :data="treeData"
            node-key="nodeId"
            show-checkbox
            :props="defaultProps"
            @check-change="handleCheckChange"
            :highlight-current="true"
            :filter-node-method="filterNode"
            check-strictly
            :action="''"
            empty-text="暂无数据，请检查权限"
            auto-expand-parent
            v-loading="treeLoading"
          ></el-tree>
        </div>
      </template>
      <template v-slot:top>
        <!-- 楼盘 -->
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">楼盘</h3>
            <el-select
              data-anchor="外网房源楼盘 => select"
              class="anchor-point"
              v-model="data.comId"
              @focus="remoteInput"
              @change="queryCBId"
              filterable
              remote
              clearable
              placeholder="楼盘名称"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                data-anchor="外网房源楼盘 => select => option"
                class="anchor-point"
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              data-anchor="外网房源楼栋 => select"
              class="anchor-point"
              v-model="data.cbId"
              filterable
              clearable
              placeholder="楼栋"
              @change="buildChange"
            >
              <el-option
                data-anchor="外网房源楼栋 => select => option"
                class="anchor-point"
                v-for="item in cbIdList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              data-anchor="外网房源房间号 => select"
              class="anchor-point"
              v-model="data.roomNo"
              filterable
              @change="querylistByParams"
              placeholder="房间号"
              :loading="HouseNoLoading"
              v-loadmore="loadMore"
            >
              <el-option
                data-anchor="外网房源房间号 => select => option"
                class="anchor-point"
                v-for="item in roomNoList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">编号</h3>
            <el-input
              data-anchor="外网房源房源编号 => input"
              placeholder="房源编号"
              v-model="data.houseNo"
              class="set-input200"
              @change="querylistByParams"
              clearable
            />
          </div>
          <div class="query-content-cell cell-interval75">
            <h3 class="query-cell-title">业主</h3>
            <el-input
              data-anchor="外网房源业主姓名 => input"
              placeholder="姓名"
              class="set-input120 anchor-point"
              @change="querylistByParams"
              v-model="data.customName"
              clearable
            />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">电话</h3>
            <el-input
              data-anchor="外网房源业主电话 => input"
              placeholder="业主电话"
              v-model="data.tel"
              class="set-input200 anchor-point"
              @change="querylistByParams"
              clearable
            />
          </div>
          <div class="query-content-cell cell-interval45">
            <definitionmenu
              :renderList="tableColumnField"
              :tableColumn="tableColumn"
              @change="tabColumnChange"
            ></definitionmenu>
          </div>
        </div>
        <div class="page-list-query-row">
          <div class="query-content-cell ">
            <h3 class="query-cell-title">价格</h3>
            <el-input
              data-anchor="外网房源价格最小值 => input"
              placeholder="最小值"
              v-model="data.minPrice"
              class="set-input90 anchor-point"
              @change="querylistByParams"
              clearable
            />
            <span class="cut-off-rule"></span>
            <el-input
              data-anchor="外网房源价格最大值 => input"
              placeholder="最大值"
              v-model="data.maxPrice"
              class="set-input90 anchor-point"
              @change="querylistByParams"
              clearable
            />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">面积</h3>
            <el-input
              data-anchor="外网房源面积最小值 => input"
              placeholder="最小值"
              v-model="data.minInArea"
              class="set-input90 anchor-point"
              @change="querylistByParams"
              clearable
            />
            <span class="cut-off-rule"></span>
            <el-input
              data-anchor="外网房源面积最大值 => input"
              placeholder="最大值"
              v-model="data.maxInArea"
              class="set-input90 anchor-point"
              @change="querylistByParams"
              clearable
            />
            <span class="query-cell-suffix">平方</span>
          </div>
          <div class="query-content-cell cell-interval75">
            <h3 class="query-cell-title">录入时间</h3>
            <el-date-picker
              data-anchor="外网房源录入时间 => input"
              v-model="data.timeSelect"
              type="daterange"
              class="set-data-pricker anchor-point"
              @change="querylistByParams"
              range-separator="至"
              start-placeholder="开始日期"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
            ></el-date-picker>
            <span
              data-anchor="外网房源清除 => click"
              class="query-cell-suffix handlebut anchor-point"
              @click="remove"
              >清除</span
            >
          </div>
          <div class="query-content-cell cell-interval45"></div>
          <div class="query-content-cell cell-interval45">
            <el-button
              type="primary"
              size="mini"
              data-anchor="外网房源查询 => click"
              @click="queryMyAgentParams"
              class="anchor-point"
              >查询</el-button
            >
          </div>
          <div class="query-content-cell cell-interval25"></div>
        </div>
      </template>
      <template v-slot:tableColumn>
        <template v-for="item in tableColumn">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"
            :key="item.prop"
            :formatter="item.formart"
            show-overflow-tooltip
            :sort-orders="['ascending', 'descending']"
            :sortable="item.order"
          ></el-table-column>
        </template>
        <el-table-column label="操作" fixed="right" min-width="170">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              data-anchor="外网房源查看 => click"
              @click="toLook(scope.row.id)"
              class="anchor-point"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import definitionmenu from "@/components/definitionMenu";
import util from "@/util/util";
export default {
  mixins: [getMenuRid],
  components: {
    listPage,
    definitionmenu
  },
  data() {
    return {
      HouseNoLoading: false,
      houseNoPage: {
        // 房间分页数据
        currentPage: 1,
        totalPage: 1,
        limit: 30
      },
      loading: true,
      agentLoading: true,
      data: {
        comId: "",
        cbId: "",
        roomNo: "",
        timeSelect: "",
        customName: "",
        tel: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: "",
        isKey: "",
        isOnly: "",
        agentName: "",
        houseNo: ""
      },
      AgentPerId: "",
      dialogVisible: false,
      options: [],
      agentName: "",
      agentper: "",
      newAgentName: "",
      cbIdList: [],
      roomNoList: [],
      AgentPerList: [],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableColumnField: [
        {
          prop: "houseNo",
          label: "房源编号",
          width: "170",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "communityName",
          label: "小区名称",
          order: false,
          width: "150",
          disabled: true,
          default: true
        },
        {
          prop: "buildingName",
          label: "楼栋号",
          width: "90",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "roomNo",
          label: "房间号",
          width: "110",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "inArea",
          label: "面积(m²)",
          width: "110",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => item.inArea + "m²"
        },
        {
          prop: "price",
          label: "售价(万元)",
          width: "120",
          order: "custom",
          disabled: false,
          default: true,
          formart: function(item) {
            return item.price + "万元";
          }
        },
        {
          prop: "unitPrice",
          label: "单价(元/㎡)",
          width: "130",
          order: "custom",
          disabled: false,
          default: true,
          format: item => (item.price * 10000) / item.inArea + "元/㎡"
        },
        {
          prop: "seenNum",
          label: "被看次数",
          width: "120",
          order: "custom",
          disabled: false,
          default: true
        },
        {
          prop: "outfollow",
          label: "未跟进天数",
          width: "120",
          order: "custom",
          disabled: false,
          default: true
        },
        {
          prop: "noSeenDay",
          label: "未被看天数",
          width: "120",
          order: "custom",
          disabled: false,
          default: true
        },
        {
          prop: "addTime",
          label: "添加时间",
          width: "120",
          order: "custom",
          disabled: false,
          default: true
        },
        {
          prop: "brokerName",
          label: "跟单人",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "houseType",
          label: "户型",
          width: "150",
          order: false,
          disabled: false,
          default: true,
          formart: item =>
            (item.rooms || 0) +
            "室" +
            (item.hall || 0) +
            "厅" +
            (item.toilet || 0) +
            "卫"
        },
        {
          prop: "face",
          label: "朝向",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "floor",
          label: "楼层",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "decoration",
          label: "装修",
          width: "120",
          order: false,
          disabled: false,
          default: true
        }
      ],
      agentPer: "",
      tableColumn: [],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: []
      },
      moreSelect: {},
      queryData: {
        CommunityName: "",
        timeSelect: "",
        roomNo: "",
        cbId: "",
        isOnly: "",
        isKey: ""
      },
      sortColumn: "id", //排序字段
      sortType: "descending", //排序类型
      transitionOrderList: [
        {
          key: "outFollow",
          value: "lastFollowTime"
        },
        {
          key: "noSeenDay",
          value: "lastPairTime"
        }
      ], //转换排序字段数组
      treeData: [], //结构树
      filterText: "",
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      treeLoading: false,
      treeCondition: {
        0: [], //公司数组
        1: [], //部门数组
        2: [] //人员数组
      },
      chooseTree: [] //选中的树节点
    };
  },
  mounted() {
    this.queryMyAgent(1);
    this.getTree();
  },
  watch: {
    filterText(val) {
      this.$refs.treeForm.filter(val);
    }
  },
  methods: {
    defaultCell({ column }) {
      if (column.label == "操作") {
        return "defaultCell cellItemSet";
      } else {
        return "cellItemSet";
      }
    },
    setRowClass({ row }) {
      if (row.lastFollowTime) {
        let lastFollowTime = new Date(row.lastFollowTime).getTime();
        let nowTime = new Date().getTime();
        if (nowTime - lastFollowTime > 1000 * 60 * 60 * 24 * 4) {
          return "cellOrange";
        }
      }
    },
    houseType(rooms, hall, toilet) {
      if (rooms != null && rooms != "" && rooms != undefined) {
        // eslint-disable-next-line no-undef
        romms = rooms + "室";
      } else {
        rooms = "0" + "室";
      }
      if (hall != null && hall != "" && hall != undefined) {
        hall = hall + "厅";
      } else {
        hall = "0" + "厅";
      }
      if (toilet != null && toilet != "" && toilet != undefined) {
        toilet = toilet + "厅";
      } else {
        toilet = "0" + "卫";
      }
      return rooms + hall + toilet;
    },
    moreSelectChange(e) {
      if (e != "") this.moreSelect = e;
      this.queryMyAgent(1);
    },
    sortMethod(e) {
      console.log(e, "eeee排序");
      this.sortColumn = e.prop;
      this.sortType = e.order;
      this.transitionOrderList.forEach(Element => {
        if (Element.key == e.prop) {
          this.sortColumn = Element.value;
          if (e.order == "descending") {
            this.sortType = "ascending";
          } else {
            this.sortType = "descending";
          }
        }
      });
      this.queryMyAgent(1);
    },

    querylistByParams() {
      console.log(this.queryData.timeSelect);
      this.queryMyAgent(1);
    },
    keySelect() {
      if (this.data.isKey != "") {
        this.data.isKey = "";
      } else {
        this.data.isKey = "1";
      }
      this.queryMyAgent(1);
    },
    onlySelect() {
      if (this.data.isOnly != "") {
        this.data.isOnly = "";
      } else {
        this.data.isOnly = "1";
      }
      this.queryMyAgent(1);
    },
    getName(name) {
      this.newAgentName = name;
      console.log("==========" + this.newAgentName);
    },
    querylist(currentPage, column, type) {
      let params = { limit: this.pageJson.pageSize, page: currentPage - 1 };
      let that = this;
      that.loading = true;
      if (Object.keys(this.moreSelect).length != 0) {
        for (let key in this.moreSelect) {
          if (key == "addTime" && this.moreSelect[key] !== "") {
            params.beginTime = this.moreSelect[key][0];
            params.endTime = this.moreSelect[key][1];
          } else if (key == "followTime" && this.moreSelect[key] !== "") {
            params.beginFollowTime = this.moreSelect[key][0];
            params.endFollowTime = this.moreSelect[key][1];
          } else {
            params[key] = this.moreSelect[key];
          }
        }
      } else {
        if (that.data.comId != null && that.data.comId != "") {
          params.comId = that.data.comId;
        }
        if (that.data.cbId != null && that.data.cbId != "") {
          params.cbId = this.data.cbId;
        }
        if (that.data.roomNo != null && this.data.RoomNo != "") {
          params.roomNo = this.data.roomNo;
        }
        if (that.data.customName != null && that.data.customName != "") {
          params.customName = that.data.customName;
        }
        if (that.data.tel != null && that.data.tel != "") {
          params.tel = this.data.tel;
        }
        if (that.data.minPrice != null && that.data.minPrice != "") {
          params.minPrice = that.data.minPrice;
        }
        if (that.data.maxPrice != null && that.data.maxPrice != "") {
          params.maxPrice = that.data.maxPrice;
        }
        if (that.data.minInArea != null && that.data.minInArea != "") {
          params.minInArea = that.data.minInArea;
        }
        if (that.data.maxInArea != null && that.data.maxInArea != "") {
          params.maxInArea = that.data.maxInArea;
        }
        if (
          that.data.timeSelect != null &&
          that.data.timeSelect[0] != null &&
          that.data.timeSelect[0] != ""
        ) {
          params.beginTime = that.data.timeSelect[0];
        }
        if (
          that.data.timeSelect != null &&
          that.data.timeSelect[1] != null &&
          that.data.timeSelect[1] != ""
        ) {
          params.endTime = that.data.timeSelect[1];
        }
        if (that.data.agentName != null && that.data.agentName != "") {
          params.agentName = that.data.agentName;
        }
      }
      params.isOnly = that.data.isOnly;
      params.isKey = that.data.isKey;

      if (column == "" || type == null || type == undefined) {
        params.sortColumn = "id";
      } else {
        params.sortColumn = column;
      }
      if (type == "" || type == null || type == undefined) {
        params.sortType = "descending";
      } else {
        params.sortType = type;
      }
      this.$api
        .post({
          url: "/myHouse/getMyAgent",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          that.loading = false;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            that.pageJson.total = result.data.dataCount;
            that.tableData = result.data.data;
          } else {
            console.log("查询我的跟单列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询我的跟单失败");
          console.log(e);
        });
    },
    queryOnly() {
      if (this.data.isOnly != "") {
        this.data.isOnly = "";
      } else {
        this.data.isOnly = "1";
      }
      this.queryMyAgent(1);
    },
    queryAddPerId(row) {
      let data = row;
      var that = this;
      this.AgentPerId = data;
      that.newAgentName = data.perName;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: that.comId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.cbIdList = e.data.data.list;
          }
        });
    },
    remove() {
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.tabColumnChange(tab);
      this.queryMyAgent(1);
    },
    queryCompanyPerList() {
      var that = this;
      that.agentLoading = true;
      this.$api
        .get({
          url: "/employee/deployment/per",
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.AgentPerList = result.data;
          } else {
            console.log("查询同公司下的所有经纪人失败");
            this.$message({
              message: result.message,
              type: "warning"
            });
          }
        })
        .catch(e => {
          console.log("查询同公司下的所有经纪人失败");
        })
        .finally(e => {
          that.agentLoading = false;
        });
    },

    toHouseData(id, CommunityName, agentName, agentper) {
      var that = this;
      that.agentLoading = true;
      that.queryCompanyPerList();
      that.agentName = agentName;
      that.agentper = agentper;
      that.dialogVisible = true;
      console.log("得到房源id为:" + id + "------楼盘名称" + CommunityName);
      that.toHouseId = id;
      that.toComName = CommunityName;
    },
    tabColumnChange(e) {
      this.tableColumn = e;
    },
    // queryTabData() {
    //   console.log(this, "111");
    // },
    formatHouseType(row, column) {
      return row.Rooms + "室" + row.hall + "厅" + row.toilet + "卫";
    },

    toLook(id) {
      var that = this;
      util.openPage.call(this, {
        name: "houseDetails",
        params: { houseId: id }
      });
    },
    queryMyAgentParams() {
      this.queryMyAgent(1);
    },
    remoteInput() {
      if (this.data.comId.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod(query) {
      var that = this;
      if (query !== "") {
        this.loading = true;

        this.$api
          .get({
            url: "/community/myAgent",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            data: {
              communityName: query,
              page: 1,
              limit: 50
            }
          })
          .then(e => {
            console.log(e.data);
            if (e.data.code == 200) {
              that.loading = false;
              that.options = e.data.data.list;
            }
          });
      } else {
        this.options = [];
      }
    },
    queryCBId() {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: that.data.comId,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.roomNo = "";
            that.data.cbId = "";
            that.cbIdList = e.data.data.list;
          }
        });
      this.querylistByParams();
    },
    buildChange() {
      Object.assign(this.$data.houseNoPage, this.$options.data().houseNoPage);
      this.roomNoList = [];
      this.queryRoomNo();
    },
    loadMore() {
      if (this.houseNoPage.currentPage < this.houseNoPage.totalPage) {
        ++this.houseNoPage.currentPage;
        this.queryRoomNo();
      }
    },
    queryRoomNo() {
      var that = this;
      this.HouseNoLoading = true;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: that.data.comId,
            cbId: that.data.cbId,
            page: this.houseNoPage.currentPage,
            limit: 300
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.roomNo = "";
            this.roomNoList = [...this.roomNoList, ...e.data.data.list];
            this.houseNoPage.totalPage = e.data.data.totalPage;
          }
        })
        .finally(() => {
          this.HouseNoLoading = false;
        });
      this.querylistByParams();
    },
    queryMyAgent(currentPage) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage };
      if (Object.keys(this.moreSelect).length != 0) {
        for (let key in this.moreSelect) {
          if (key == "addTime" && this.moreSelect[key] !== "") {
            params.beginTime = this.moreSelect[key][0];
            params.endTime = this.moreSelect[key][1];
          } else if (key == "followTime" && this.moreSelect[key] !== "") {
            params.beginFollowTime = this.moreSelect[key][0];
            params.endFollowTime = this.moreSelect[key][1];
          } else if (key == "bhId") {
            params.roomNo = this.moreSelect.bhId;
          } else {
            params[key] = this.moreSelect[key];
          }
        }
      } else {
        params.comId = that.data.comId;
        params.cbId = that.data.cbId;
        params.bhId = that.data.roomNo;
        params.beginTime = that.data.timeSelect[0];
        params.endTime = that.data.timeSelect[1];
        params.customName = that.data.customName;
        params.tel = that.data.tel;
        params.minInArea = that.data.minInArea;
        params.maxInArea = that.data.maxInArea;
        params.minPrice = that.data.minPrice;
        params.maxPrice = that.data.maxPrice;
        params.isKey = that.data.isKey;
        params.isOnly = that.data.isOnly;
        params.agentName = that.data.agentName;
        params.houseNo = that.data.houseNo;
      }
      params.treeCompany = this.treeCondition[0].join(",");
      params.treeDepartment = this.treeCondition[1].join(",");
      params.treeAccount = this.treeCondition[2].join(",");
      params.sortColumn = that.sortColumn;
      params.sortType = that.sortType == "descending" ? 0 : 1;
      this.$api
        .post({
          url: "/myHouse/releaseOutsideHouseList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          console.log(e.data);
          that.loading = false;
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.totalCount;
            that.tableData = data.data.list;
          } else {
            // console.log("查询我的跟单列表结果：" + result.message);
          }
        })
        .catch(e => {
          that.loading = false;
          console.log("查询我的跟单列表失败");
          console.log(e);
        });
    },

    handleClick() {},
    queryTabData() {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryMyAgentParams(1);
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryMyAgent(1);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryMyAgent(val);
    },
    handleCheckChange(data, checked, indeterminate) {
      let key = data.type;
      this.chooseTree = []; //清空数组
      this.chooseTree.push(data.businessId);
      if (key == 1) {
        this.getUnderDepartment(data.childrenNodes);
      }
      if (checked) {
        let set = new Set([...this.treeCondition[key], ...this.chooseTree]);
        this.treeCondition[key] = [...set];
      } else {
        this.treeCondition[key] = this.treeCondition[key].filter(item => {
          return !this.chooseTree.includes(item);
        });
      }
      this.querylistByParams(1);
    },
    getUnderDepartment(list) {
      list.forEach(item => {
        if (item.type == 1) {
          this.chooseTree.push(item.businessId);
          if (item.childrenNodes != null && item.childrenNodes.length > 0) {
            this.getUnderDepartment(item.childrenNodes);
          }
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      if (data.labelName != null) {
        return data.labelName.indexOf(value) !== -1;
      }
    },
    getTree() {
      this.treeLoading = true;
      this.$api
        .post({
          url: "/myHouse/releaseOutsideHouseList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            tree: "1"
          }
        })
        .then(e => {
          this.treeLoading = false;
          if (e.data.code == 200 && e.data.data.length > 0) {
            this.treeData = e.data.data;
          }
        })
        .catch(e => {
          this.treeLoading = false;
        });
    }
  }
};
</script>
