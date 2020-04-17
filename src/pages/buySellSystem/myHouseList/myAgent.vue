
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
</style>
<template>
  <div class="page-row-flex ">
    <list-page @sort-change="sortMethod"
               :parentData="$data"
               :cellClass="defaultCell"
               :row-class-name="setRowClass"
               @queryTabData="queryTabData"
               @handleClick="handleClick"
               @handleSizeChange="handleSizeChange"
               @handleCurrentChange="handleCurrentChange">
      <template v-slot:top>
        <!-- 楼盘 -->
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">楼盘</h3>
            <el-select v-model="data.comId"
                       @focus="remoteInput"
                       @change="queryCBId"
                       filterable
                       remote
                       clearable
                       placeholder="楼盘名称"
                       :remote-method="remoteMethod"
                       :loading="loading">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value"></el-option>
            </el-select>
            <el-select v-model="data.cbId"
                       filterable
                       clearable
                       placeholder="楼栋"
                       @change="queryRoomNo">
              <el-option v-for="item in cbIdList"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value"></el-option>
            </el-select>
            <el-select v-model="data.roomNo"
                       filterable
                       @change="querylistByParams"
                       placeholder="房间号">
              <el-option v-for="item in roomNoList"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval75">
            <h3 class="query-cell-title">业主</h3>
            <el-input placeholder="姓名"
                      class="set-input120"
                      @change="querylistByParams"
                      v-model="data.customName"
                      clearable />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">电话</h3>
            <el-input placeholder="业主电话"
                      v-model="data.tel"
                      class="set-input200"
                      @change="querylistByParams"
                      clearable />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">价格</h3>
            <el-input placeholder="最小值"
                      v-model="data.minPrice"
                      class="set-input90"
                      @change="querylistByParams"
                      clearable />
            <span class="cut-off-rule"></span>
            <el-input placeholder="最大值"
                      v-model="data.maxPrice"
                      class="set-input90"
                      @change="querylistByParams"
                      clearable />
          </div>
          <div class="query-content-cell cell-interval45">
            <definitionmenu :renderList="renderList"
                            :tableColumn="tableColumn"
                            @change="tabColumnChange"
                            :loading="menuLoading"
                            :resetList="tableColumnField"></definitionmenu>
          </div>
        </div>
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">面积</h3>
            <el-input placeholder="最小值"
                      v-model="data.minInArea"
                      class="set-input90"
                      @change="querylistByParams"
                      clearable />
            <span class="cut-off-rule"></span>
            <el-input placeholder="最大值"
                      v-model="data.maxInArea"
                      class="set-input90"
                      @change="querylistByParams"
                      clearable />
            <span class="query-cell-suffix">平方</span>
          </div>
          <div class="query-content-cell cell-interval75">
            <h3 class="query-cell-title">录入时间</h3>
            <el-date-picker v-model="data.timeSelect"
                            type="daterange"
                            class="set-data-pricker"
                            @change="querylistByParams"
                            range-separator="至"
                            start-placeholder="开始日期"
                            :default-time="['00:00:00', '23:59:59']"
                            end-placeholder="结束日期"></el-date-picker>
            <span class="query-cell-suffix handlebut"
                  @click="remove">清除</span>
          </div>
          <div class="query-content-cell cell-interval45">
            <label class="query-checkbox">
              <input type="checkbox"
                     @click="keySelect" />
              <span>钥匙</span>
            </label>
            <label class="query-checkbox">
              <input type="checkbox"
                     @click="onlySelect" />
              <span>独家</span>
            </label>
          </div>
          <div class="query-content-cell cell-interval45">
            <el-button type="primary"
                       size="mini"
                       @click="queryMyAgentParams">查询</el-button>
          </div>
          <div class="query-content-cell cell-interval25">
            <moreSelect @moreSelectChange="moreSelectChange"
                        deptUrl="/myHouse/getMyAgent"></moreSelect>
          </div>
        </div>
      </template>
      <template v-slot:tableColumn>
        <template v-for="(item) in tableColumn">
          <el-table-column :prop="item.prop"
                           :label="item.label"
                           :min-width="item.width"
                           :key="item.prop"
                           :formatter="item.formart"
                           show-overflow-tooltip
                           :sort-orders="['ascending', 'descending']"
                           :sortable="item.order"></el-table-column>
        </template>
        <el-table-column label="操作"
                         fixed="right"
                         min-width="170">
          <template v-slot="scope">
            <el-button type="primary"
                       size="mini"
                       @click="toLook(scope.row.id)">查看</el-button>
            <el-button type="primary"
                       size="mini"
                       @click="toHouseData(scope.row.id,scope.row.communityName,scope.row.agentName,scope.row.agentPer)">调配</el-button>
          </template>
        </el-table-column>
      </template>
    </list-page>
    <el-dialog title="跟单人将调配至本公司人员"
               :visible.sync="dialogVisible"
               width="20%">
      <el-select v-model="newAgentName"
                 @change="queryAddPerId"
                 key-value="accountID"
                 filterable
                 remote
                 clearable
                 placeholder="请输入跟单人姓名进行搜索"
                 :loading="agentLoading">
        <el-option v-for="item in AgentPerList"
                   :key="item.accountID"
                   :label="item.perName"
                   :value="item">
          <span style="float: left">{{item.perName}}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{item.deptName}}</span>
        </el-option>
      </el-select>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="updateAgentPer">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import moreSelect from "@/components/moreSelect";
import definitionmenu from "@/components/definitionMenu";
import tableMenu from '@/util/getTableMenu';
export default {
  mixins: [getMenuRid],
  components: {
    listPage,
    definitionmenu,
    moreSelect
  },
  data () {
    return {
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
        agentName: ""
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
          disabled: true,
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
          formart: item => item.price + "万元"
        },
        {
          prop: "unitPrice",
          label: "单价(元/㎡)",
          width: "130",
          order: "custom",
          disabled: false,
          default: true,
          format: item => item.unitPrice + "元/㎡"
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
          prop: "outFollow",
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
          prop: "agentName",
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
        },
        {
          prop: "addName",
          label: "添加人",
          width: "120",
          order: false,
          disabled: false,
          default: true
        }
      ],
      tableColumn: [],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: []
      },
      options: [],
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
      menuLoading: true,//自定义菜单
      renderList: []
    };
  },
  mounted () {

    tableMenu.getTableMenu(this.tableColumnField, 2).then((e) => {
      console.log(e);
      this.renderList = e;
      this.menuLoading = false;
      this.queryMyAgent(1);
    })

  },
  methods: {
    defaultCell ({ column }) {
      if (column.label == "操作") {
        return "defaultCell cellItemSet";
      } else {
        return "cellItemSet";
      }
    },
    setRowClass ({ row }) {
      if (row.lastFollowTime) {
        let lastFollowTime = new Date(row.lastFollowTime).getTime();
        let nowTime = new Date().getTime();
        if (nowTime - lastFollowTime > 1000 * 60 * 60 * 24 * 4) {
          return "cellOrange";
        }
      }
    },
    houseType (rooms, hall, toilet) {
      if (rooms != null && rooms != "" && rooms != undefined) {
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
    moreSelectChange (e) {
      if (e != "") this.moreSelect = e;
      this.queryMyAgent(1);
    },
    sortMethod (e) {
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
    toHouseData (id, CommunityName) {
      var that = this;
      that.dialogVisible = true;
      console.log("得到房源id为:" + id + "------楼盘名称" + CommunityName);
      that.toHouseId = id;
      that.toComName = CommunityName;
    },
    querylistByParams () {
      console.log(this.queryData.timeSelect);
      this.queryMyAgent(1);
    },
    keySelect () {
      if (this.data.isKey != "") {
        this.data.isKey = "";
      } else {
        this.data.isKey = "1";
      }
      this.queryMyAgent(1);
    },
    onlySelect () {
      if (this.data.isOnly != "") {
        this.data.isOnly = "";
      } else {
        this.data.isOnly = "1";
      }
      this.queryMyAgent(1);
    },
    getName (name) {
      this.newAgentName = name;
      console.log("==========" + this.newAgentName);
    },
    querylist (currentPage, column, type) {
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
    queryOnly () {
      if (this.data.isOnly != "") {
        this.data.isOnly = "";
      } else {
        this.data.isOnly = "1";
      }
      this.queryMyAgent(1);
    },
    queryAddPerId (row) {
      let data = row;
      var that = this;
      this.AgentPerId = data;
      that.newAgentName = data.perName;
      return this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
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
    remove () {
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.tabColumnChange(tab);
      this.queryMyAgent(1);
    },
    queryCompanyPerList () {
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
    updateAgentPer () {
      var that = this;

      console.log(
        "得到跟单人id为:" +
        that.newAgentName +
        "======" +
        JSON.stringify(that.AgentPerId.accountID)
      );
      console.log(
        "得到房源id为:" + that.toHouseId + "------楼盘名称" + that.toComName
      );
      let params = {
        houseId: parseInt(that.toHouseId) + "",
        newAgentPer: parseInt(JSON.stringify(that.AgentPerId.accountID)),
        oldAgentPer: parseInt(that.agentper != null ? that.agentper : ""),
        newAgentName: that.AgentPerId.perName
      };

      this.$api
        .post({
          url: "/agent_house/updateAgentPer",

          data: params,
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
          } else {
            console.log("修改失败");
          }
        })
        .catch(e => {
          console.log("修改失败");
        });
      that.dialogVisible = false;
      this.queryMyAgentParams();
    },
    toHouseData (id, CommunityName, agentName, agentper) {
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
    tabColumnChange (e, length = 0) {
      this.tableColumn = e;
      if (length > 0) {
        let prop = e.map(item => { return { prop: item.prop } })
        tableMenu.insert(prop, 2);
      }
    },
    queryTabData () {
      console.log(this, "111");
    },
    formatHouseType (row, column) {
      return row.Rooms + "室" + row.hall + "厅" + row.toilet + "卫";
    },

    toLook (id) {
      var that = this;
      that.$router.push({ name: "houseDetails", params: { houseId: id } });
    },
    queryMyAgentParams () {
      this.queryMyAgent(1);
    },
    remoteInput () {
      if (this.data.comId.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod (query) {
      var that = this;
      if (query !== "") {
        this.loading = true;

        this.$api
          .get({
            url: "/community/myAgent",
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
    queryCBId () {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
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
    queryRoomNo () {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.data.comId,
            cbId: that.data.cbId,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.roomNo = "";
            that.roomNoList = e.data.data.list;
          }
        });
      this.querylistByParams();
    },
    queryMyAgent (currentPage) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage - 1 };
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
        params.roomNo = that.data.roomNo;
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
      }
      params.sortColumn = that.sortColumn;
      params.sortType = that.sortType;
      this.$api
        .post({
          url: "/myHouse/getMyAgent",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          console.log(e.data);
          that.loading = false;
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.dataCount;
            that.tableData = data.data.data;
          } else {
            console.log("查询我的跟单列表结果：" + result.message);
            alert(result.message);

          }
        })
        .catch(e => {
          console.log("查询我的跟单列表失败");
          console.log(e);
        });
    },

    handleClick () { },
    queryTabData () {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryMyAgentParams(1);
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryMyAgent(1);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.queryMyAgent(val);
    }
  }
};
</script>
