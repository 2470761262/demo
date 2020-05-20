<template>
  <list-page
    :parentData="$data"
    @sort-change="sortMethod"
    @queryTabData="queryTabData"
    @handleClick="handleClick"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
    :dblclick="true"
    @cellDblClick="toHouseDetail"
  >
    <template v-slot:top>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">楼盘</h3>
          <el-select
            class="anchor-point"
            v-model="data.comId"
            @change="queryCBId"
            filterable
            remote
            clearable
            placeholder="楼盘名称"
            @focus="remoteCommunityNameInput"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              class="anchor-point"
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            class="anchor-point"
            v-model="data.cbId"
            filterable
            placeholder="楼栋"
            clearable
            @change="queryRoomNo"
          >
            <el-option
              class="anchor-point"
              v-for="item in cbIdList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            class="anchor-point"
            v-model="data.roomNo"
            filterable
            @change="queryHouseBetParams"
            clearable
            placeholder="房间号"
          >
            <el-option
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
            placeholder="房源编号"
            v-model="data.houseNo"
            class="set-input200 anchor-point"
            @change="queryHouseBetParams"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">业主</h3>
          <el-input
            placeholder="姓名"
            class="set-input120 anchor-point"
            @change="queryHouseBetParams"
            v-model="data.customerName"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">电话</h3>
          <el-input
            placeholder="业主电话"
            v-model="data.tel"
            class="set-input200 anchor-point"
            @change="queryHouseBetParams"
            clearable
          />
        </div>
      </div>
      <div class="page-list-query-row">
        <div class="query-content-cell ">
          <h3 class="query-cell-title">价格</h3>
          <el-input
            placeholder="最小值"
            v-model="data.minPrice"
            class="set-input90 anchor-point"
            @change="queryHouseBetParams"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            v-model="data.maxPrice"
            class="set-input90 anchor-point"
            @change="queryHouseBetParams"
            clearable
          />
          <span class="query-cell-suffix">万</span>
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">面积</h3>
          <el-input
            placeholder="最小值"
            v-model="data.minInArea"
            class="set-input90 anchor-point"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            v-model="data.maxInArea"
            class="set-input90 anchor-point"
            clearable
          />
          <span class="query-cell-suffix">㎡</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">对赌结果</h3>
          <el-select
            v-model="data.status"
            @change="queryHouseBetParams()"
            clearable
            class="set-select100 anchor-point"
            placeholder="全部"
          >
            <el-option
              class="anchor-point"
              v-for="item in betStatusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="query-content-cell cell-interval75">
          <el-button
            type="primary"
            size="mini"
            @click="queryHouseBetParams"
            class="anchor-point"
            >查询</el-button
          >
        </div>
        <div class="query-content-cell cell-interval25">
          <moreSelect
            class="anchor-point"
            @moreSelectChange="moreSelectChange"
            deptUrl="/myHouse/myBetList"
          ></moreSelect>
        </div>
      </div>
    </template>

    <template #tableColumn="cell">
      <template v-for="item in cell.tableData">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip
          :key="item.prop"
        ></el-table-column>
      </template>
      <!--      房源编号、楼盘名称、售价（可排序）、面积（可排序）、单价（可排序）、户型（X室X厅X卫）、对赌鑫币值、预期奖励鑫币值、对赌时间（对赌成功当日）、对赌结果、剩余天数、对赌人、操作（查看）-->
      <el-table-column
        class-name="anchor-point"
        prop="price"
        label="售价(万元)"
        :sort-orders="['ascending', 'descending']"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        class-name="anchor-point"
        prop="inArea"
        label="面积(m²)"
        :sort-orders="['ascending', 'descending']"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        class-name="anchor-point"
        prop="unitPrice"
        label="单价(元/㎡)"
        :sort-orders="['ascending', 'descending']"
        sortable="false"
      >
      </el-table-column>
      <el-table-column prop="" label="户型" :formatter="formatHouseType">
      </el-table-column>
      <el-table-column
        class-name="anchor-point"
        prop="amount"
        label="对赌鑫币"
        :sort-orders="['ascending', 'descending']"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        class-name="anchor-point"
        prop="createTime"
        label="对赌时间"
        :sort-orders="['ascending', 'descending']"
        sortable="custom"
      >
        <!--                       :render-header="customFieldColumn"-->
      </el-table-column>
      <el-table-column
        prop="status"
        label="对赌结果"
        :formatter="formatHouseBetStatus"
      >
      </el-table-column>
      <el-table-column prop="brokerName" label="对赌人"></el-table-column>
      <el-table-column prop="endTime" label="到期时间"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template v-slot="scope">
          <el-button
            class-name="anchor-point"
            type="primary"
            size="mini"
            @click="toHouseDetail(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
import moreSelect from "@/components/moreSelect";
export default {
  components: {
    listPage,
    moreSelect
  },
  data() {
    return {
      loading: true,
      showHrTree: false,
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      moreSelect: [],
      treeData: [],
      curNodeId: [],
      data: {
        comId: "",
        cbId: "",
        roomNo: "",
        tel: "",
        customerName: "",
        status: "",
        minPrice: "",
        maxprice: "",
        minInArea: "",
        maxInArea: "",
        stauts: "",
        order: "",
        empId: "",
        deptId: "",
        coId: "",
        empName: "",
        orderAsc: "",
        timeSelect: "",
        houseNo: ""
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      betStatusList: [
        { value: 0, name: "努力中" },
        { value: 1, name: "成功" },
        { value: 2, name: "失败" },
        { value: 3, name: "过期" },
        { value: 4, name: "注销" }
      ],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: "houseNo", label: "房源编号" },
        { prop: "communityName", label: "楼盘名称" }
      ],
      tableData: [],
      sortColumn: "createTime", //排序字段
      sortType: 1 //排序类型
    };
  },
  mounted() {
    this.queryHouseBet(1);
    //读取树数据
    this.$api
      .post({
        url: "/sys/tree/bet"
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.treeData = result.data;
        } else {
          console.log("载入结果" + +result.message);
          alert(result.message);
        }
      })
      .then(() => {
        if (this.$route.query.cur != null) {
          this.curNodeId = [this.$route.query.cur];
          this.$nextTick(() => {
            this.handleCheckChange(
              this.$refs.treeForm.getNode(...this.curNodeId).data,
              true
            );
          });
        }
      })
      .catch(e => {
        console.log("读取失败");
        console.log(e);
      });
  },
  methods: {
    toHouseDetail(row) {
      var that = this;
      console.log(row, "进入对赌房源（bsagenthousetbl）详情");
      that.$router.push({
        name: "houseDetails",
        params: { houseId: row.houseId }
      });
    },
    moreSelectChange(e) {
      this.moreSelect = e;
      this.queryHouseBet(1);
    },
    sortMethod(e) {
      console.log(e, "eeee排序");
      this.sortColumn = e.prop;
      if (e.order == "descending") {
        this.sortType = 1;
      } else {
        this.sortType = 0;
      }
      this.queryHouseBet(1);
    },
    Remove() {
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.tabColumnChange(tab);
      this.queryHouseBet(1);
    },
    handleCheckChange(data, checked, node) {
      this.showHrTree = false;
      if (checked == true) {
        this.data.empName = data.labelName;
        this.checkedType = data.type;
        this.$refs.treeForm.setCheckedNodes([data]);
        // this.jumpNodeId = data.nodeId;
        console.log(
          "当前类型：" + this.checkedType + ",ID：" + data.businessId
        );
        //  0公司，1部门，2员工，3职位
        if (this.checkedType === 0) {
          this.data.coId = data.businessId;
        } else if (this.checkedType === 1) {
          this.data.deptId = data.businessId;
        } else if (this.checkedType === 2) {
          this.data.empId = data.businessId;
        }
      }
      this.queryHouseBetParams();
    },
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    formatHouseType(row, column) {
      //if (row.rooms) {
      return (
        (row.rooms || 0) +
        "室" +
        (row.hall || 0) +
        "厅" +
        (row.toilet || 0) +
        "卫"
      );
      //}
    },
    unitPrice(row, column) {
      if (row.inArea > 0) {
        return Math.round((row.price * 1000) / row.inArea);
      }
    },
    formatHouseBetStatus(row, column) {
      switch (row.status) {
        case 0:
          return "努力中";
        case 1:
          return "成功";
        case 2:
          return "失败";
        case 3:
          return "过期";
        case 4:
          return "注销";
        default:
          return "";
      }
    },
    // customFieldColumn (h, params) {
    //   var that = this
    //   return h('span', {}, [
    //     h('span', {}, params.column.label),
    //     h('span', {          style: { 'color': params.column.property == that.data.order && that.data.orderAsc == 'DESC' ? 'red' : '', float: 'right' },
    //       on: { click: () => { that.orderBy(params.column.property, "DESC") } }        }, '↓'),
    //     h('span', {          style: { 'color': params.column.property == that.data.order && that.data.orderAsc == 'ASC' ? 'red' : '', float: 'right' },
    //       on: { click: () => { that.orderBy(params.column.property, "ASC") } }        }, '↑')
    //   ])
    // },
    orderBy(o, Asc) {
      this.data.order = o;
      this.data.orderAsc = Asc;
      this.queryHouseBetParams();
    },
    queryHouseBetParams() {
      this.queryHouseBet(1);
    },
    //楼盘获取焦点 第一次点击就进行查询

    remoteCommunityNameInput() {
      if (this.options.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod(query) {
      var that = this;
      if (query !== "") {
        that.loading = true;

        that.$api
          .get({
            url: "/community/houseBet",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              communityName: query
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
        that.options = [];
      }
    },
    queryCBId() {
      var that = this;
      that.data.cbId = "";
      that.data.roomNo = "";
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.data.comId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.cbIdList = e.data.data.list;
          }
        });
      this.queryHouseBetParams();
    },
    queryRoomNo() {
      var that = this;
      that.data.roomNo = "";
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.data.comId,
            cbId: that.data.cbId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.roomNoList = e.data.data.list;
          }
        });
      this.queryHouseBetParams();
    },
    queryHouseBet(currentPage) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage };
      params.sortColumn = that.sortColumn;
      params.sortType = that.sortType;
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
        params.comId = that.data.comId;
        params.cbId = that.data.cbId;
        params.bhId = that.data.roomNo;
        params.status = that.data.status;
        params.customerName = that.data.customerName;
        params.empId = that.data.empId;
        params.coId = that.data.coId;
        params.deptId = that.data.deptId;
        params.tel = that.data.tel;
        params.minPrice = that.data.minPrice;
        params.maxPrice = that.data.maxPrice;
        params.minInArea = that.data.minInArea;
        params.maxInArea = that.data.maxInArea;
        params.status = that.data.status;
        params.houseNo = that.data.houseNo;
        if (that.data.timeSelect.length > 0)
          params.beginTime = that.data.timeSelect[0];
        if (that.data.timeSelect.length > 1)
          params.endTime = that.data.timeSelect[1];
      }
      console.log(params);
      this.$api
        .post({
          url: "/myHouse/myBetList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        })
        .then(e => {
          console.log(e.data);
          that.loading = false;
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.totalCount;
            that.pageJson.currentPage = data.data.currPage;
            that.tableData = data.data.list;
          } else {
            // console.log("查询对赌房源列表结果：" + result.message);
            //  alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询对赌房源列表失败");
          console.log(e);
        });
    },
    isForBut(type) {
      let array = [{ name: "查看", isType: "3", methosName: "" }];
      return array.filter(item => {
        return item.isType.includes(type);
      });
    },
    handleClick() {},
    queryTabData() {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryHouseBetParams();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryHouseBet(val);
    },
    handleSizeChange(val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryHouseBet(1);
    }
  }
};
</script>
