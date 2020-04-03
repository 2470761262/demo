<template>
  <list-page @sort-change="sortMethod"
             :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             pageName="historyDetails"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
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
                     @change="queryPotentialHouseParams"
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
                    v-model="data.customName"
                    class="set-input120"
                    @change="queryPotentialHouseParams"
                    clearable />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">电话</h3>
          <el-input placeholder="业主电话"
                    v-model="data.tel"
                    class="set-input200"
                    @change="queryPotentialHouseParams"
                    clearable />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">价格</h3>
          <el-input placeholder="最小值"
                    v-model="data.minPrice"
                    class="set-input90"
                    @change="queryPotentialHouseParams"
                    clearable />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大值"
                    v-model="data.maxPrice"
                    class="set-input90"
                    @change="queryPotentialHouseParams"
                    clearable />
          <span class="query-cell-suffix">万</span>
        </div>
      </div>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">面积</h3>
          <el-input placeholder="最小值"
                    v-model="data.minInArea"
                    class="set-input90"
                    @change="queryPotentialHouseParams"
                    clearable />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大值"
                    v-model="data.maxInArea"
                    class="set-input90"
                    @change="queryPotentialHouseParams"
                    clearable />
          <span class="query-cell-suffix">平方</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">录入时间</h3>
          <el-date-picker v-model="data.timeSelect"
                          type="daterange"
                          class="set-data-pricker"
                          @change="queryPotentialHouseParams"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['00:00:00', '23:59:59']"></el-date-picker>
          <span class="query-cell-suffix handlebut"
                @click="Remove">清除</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <el-button type="primary"
                     size="mini"
                     @click="queryPotentialHouseParams">查询</el-button>
        </div>
        <div class="query-content-cell cell-interval25">
          <moreSelect @moreSelectChange="moreSelectChange"></moreSelect>
        </div>
      </div>
    </template>

    <template v-slot:tableColumn>
      <template v-for="(item) in tableColumnField">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :sortable="item.order"
                         show-overflow-tooltip
                         :sort-orders="['ascending', 'descending']"
                         :key="item.prop"></el-table-column>
      </template>
      <el-table-column label="操作"
                       width="170">
        <template v-slot="scope">
          <el-button type="primary"
                     size="mini"
                     @click="toLook(scope.row.id)"
                     v-if="scope.row.houseType!==1">查看</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="toSale(scope.row.comId,scope.row.cbId,scope.row.bhId,scope.row.communityName,scope.row.buildingName,scope.row.roomNo,scope.row.customers,scope.row.tel)">转在售</el-button>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
//import definitionmenu from "@/components/definitionMenu";
import moreSelect from "@/components/moreSelect";
import "@/assets/publicLess/pageListQuery.less";
export default {
  mixins: [getMenuRid],
  components: {
    listPage,
    // definitionmenu,
    moreSelect
  },
  data () {
    return {
      loading: true,
      option: [
        {
          value: "build",
          label: "楼盘数据"
        },
        {
          value: "trade",
          label: "成交数据"
        }
      ],
      data: {
        comId: "",
        cbId: "",
        roomNo: "",
        customName: "",
        tel: "",
        type: ""
      },
      moreSelect: "",
      options: [],
      cbIdList: [],
      // tableColumn: [],
      roomNoList: [],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableColumnField: [
        {
          prop: "communityName",
          label: "小区名称",
          order: false,
          width: "",
          disabled: true,
          default: true
        },
        {
          prop: "comBuildingName",
          label: "楼栋号",
          width: "",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "roomNo",
          label: "房间号",
          width: "",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "inArea",
          label: "面积(m²)",
          width: "",
          order: "custom",
          disabled: false,
          default: true,
          format: item => (item.inArea || 0) + "㎡"
        },
        {
          prop: "customers",
          label: "业主",
          width: "",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "tel",
          label: "业主电话",
          width: "",
          order: false,
          disabled: false,
          default: true
        }
      ],
      // tableColumn: [],
      tableData: []
    };
  },
  mounted () {
    this.data.type = "build";
    this.queryPotentialHouse(1, "id", "descending");
  },
  methods: {
    sortMethod (e) {
      console.log(e, "eeee排序");
      this.queryPotentialHouse(1, e.prop, e.order);
    },
    queryTabData () {
      console.log(this, "111");
    },
    sortMethod (e) {
      console.log(e.prop, e.order);
      this.queryPotentialHouse(1, e.prop, e.order);
    },
    moreSelectChange (e) {
      this.moreSelect = e;
      this.queryPotentialHouse(1, "id", "ascending");
    },
    toLook (id) {
      var that = this;
      that.$router.push({ name: "historyDetails", params: { houseId: id } });
    },
    toSale (
      comId,
      cbId,
      bhId,
      communityName,
      buildingName,
      roomNo,
      customers,
      tel
    ) {
      var that = this;
      that.$router.push({
        path: "/buySellSystem/addHouse",
        query: {
          comId: comId,
          cbId: cbId,
          bhId: bhId,
          communityName: communityName,
          buildingName: buildingName,
          roomNo: roomNo,
          flag: "potentia",
          customerName: customers,
          tel: tel
        }
      });
    },
    queryPotentialHouseParams () {
      this.queryPotentialHouse(1, "id", "descending");
    },
    remoteInput () {
      if (this.data.comId.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod (query) {
      var that = this;
      if (query !== "") {
        that.loading = true;

        that.$api
          .get({
            url: "/community/potential",
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
        that.options = [];
      }
    },
    queryCBId () {
      var that = this;
      if (that.data.comId == "") {
        that.data.roomNo = "";
        that.data.cbId = "";
      }
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.data.comId,
            page: 1,
            limit: 9999
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.roomNo = "";
            that.data.cbId = "";
            that.cbIdList = e.data.data.list;
          }
        });
      this.queryPotentialHouseParams();
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
            limit: 9999
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.roomNo = "";
            that.roomNoList = e.data.data.list;
          }
        });
      this.queryPotentialHouseParams();
    },
    Remove () {
      //  let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      //   this.tabColumnChange(tab);
      this.queryPotentialHouse(1, "id", "descending");
    },

    queryPotentialHouse (currentPage, column, type) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage - 1 };
      if (Object.keys(this.moreSelect).length != 0) {
        for (let key in this.moreSelect) {
          if (key == "addTime" && this.moreSelect[key] !== "") {
            params.biginTime = this.moreSelect[key][0];
            params.endTime = this.moreSelect[key][1];
          } else if (key == "followTime" && this.moreSelect[key] !== "") {
            params.biginFollowTime = this.moreSelect[key][0];
            params.endFollowTime = this.moreSelect[key][1];
          } else {
            params[key] = this.moreSelect[key];
          }
        }
      } else {
        params.comId = that.data.comId;
        params.cbId = that.data.cbId;
        params.roomNo = that.data.roomNo;
        params.customName = that.data.customName;
        params.tel = that.data.tel;
        params.type = that.data.type;
      }
      params.sortColumn = column;
      params.sortType = type;
      console.log(params);
      this.$api
        .post({
          url: "/houseResource/potentialHouse",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          that.loading = false;
          if (e.data.code == 200) {
            that.pageJson.total = e.data.data.dataCount;
            that.tableData = e.data.data.data;
          } else {
            console.log("查询潜在出售列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询潜在出售列表失败");
          console.log(e);
        });
    },

    handleClick () { },
    queryTabData () {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryPotentialHouseParams(1);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.queryPotentialHouse(val, "id", "descending");
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryPotentialHouse(1, "id", "descending");
    }
  }
};
</script>
