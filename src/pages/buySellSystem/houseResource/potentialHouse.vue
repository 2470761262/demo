<style lang="less" scoped></style>
<template>
  <list-page
    @sort-change="sortMethod"
    :parentData="$data"
    @queryTabData="queryTabData"
    @handleClick="handleClick"
    pageName="historyDetails"
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
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="data.cbId"
            filterable
            clearable
            placeholder="楼栋"
            @change="queryRoomNo"
          >
            <el-option
              v-for="item in cbIdList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="data.roomNo"
            filterable
            @change="queryPotentialHouseParams"
            placeholder="房间号"
          >
            <el-option
              v-for="item in roomNoList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">业主</h3>
          <el-input
            placeholder="姓名"
            v-model="data.customName"
            class="set-input120"
            @change="queryPotentialHouseParams"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">电话</h3>
          <el-input
            placeholder="业主电话"
            v-model="data.tel"
            class="set-input200"
            @change="queryPotentialHouseParams"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">价格</h3>
          <el-input
            placeholder="最小值"
            v-model="data.minPrice"
            class="set-input90"
            @change="queryPotentialHouseParams"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            v-model="data.maxPrice"
            class="set-input90"
            @change="queryPotentialHouseParams"
            clearable
          />
          <span class="query-cell-suffix">万</span>
        </div>
      </div>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">面积</h3>
          <el-input
            placeholder="最小值"
            v-model="data.minInArea"
            class="set-input90"
            @change="queryPotentialHouseParams"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            v-model="data.maxInArea"
            class="set-input90"
            @change="queryPotentialHouseParams"
            clearable
          />
          <span class="query-cell-suffix">平方</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">录入时间</h3>
          <el-date-picker
            v-model="data.timeSelect"
            type="daterange"
            class="set-data-pricker"
            @change="queryPotentialHouseParams"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
          <span class="query-cell-suffix handlebut" @click="Remove">清除</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <el-button
            type="primary"
            size="mini"
            @click="queryPotentialHouseParams"
            >查询</el-button
          >
        </div>
        <div class="query-content-cell cell-interval25">
          <moreSelect
            @moreSelectChange="moreSelectChange"
            deptUrl="/houseResource/potentialHouse"
          ></moreSelect>
        </div>
      </div>
    </template>

    <template v-slot:tableColumn>
      <template v-for="item in tableColumnField">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.order"
          show-overflow-tooltip
          :formatter="item.formart"
          :sort-orders="['ascending', 'descending']"
          :key="item.prop"
        ></el-table-column>
      </template>
      <el-table-column label="操作" width="170">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            @click="toHouseDetail(scope.row)"
            v-if="scope.row.houseType !== 1"
            >查看</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="
              toSale(
                scope.row.comId,
                scope.row.cbId,
                scope.row.bhId,
                scope.row.communityName,
                scope.row.buildingName,
                scope.row.roomNo,
                scope.row.customers,
                scope.row.tel
              )
            "
            >转在售</el-button
          >
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
import common from "../houseResource/common/common";
export default {
  mixins: [getMenuRid],
  components: {
    listPage,
    // definitionmenu,
    moreSelect
  },
  data() {
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
        type: "",
        timeSelect: ""
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
          prop: "buildingName",
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
          formart: item => (item.inArea || 0) + "㎡"
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
      tableData: [],
      transitionList: [
        {
          key: "bhId",
          value: [{ paramsKey: "roomNo", index: -1 }]
        },
        {
          key: "area",
          value: [{ paramsKey: "business", index: -1 }]
        },
        {
          key: "buildType",
          value: [{ paramsKey: "purpose", index: -1 }]
        },
        {
          key: "addTime",
          value: [
            { paramsKey: "beginTime", index: 0 },
            { paramsKey: "endTime", index: 1 }
          ]
        },
        {
          key: "followTime",
          value: [
            { paramsKey: "beginFollowTime", index: 0 },
            { paramsKey: "endFollowTime", index: 1 }
          ]
        }
      ],
      sortColumn: "id", //排序字段
      sortType: "descending" //排序类型
    };
  },
  mounted() {
    this.data.type = "build";
    this.queryPotentialHouse(1);
  },
  methods: {
    sortMethod(e) {
      console.log(e, "eeee排序");
      this.sortColumn = e.prop;
      this.sortType = e.order;
      this.queryPotentialHouse(1);
    },
    moreSelectChange(e) {
      this.moreSelect = e;
      this.queryPotentialHouse(1);
    },
    toHouseDetail(item) {
      let that = this;
      console.log(item, "潜在出售房源详情");
      if (item.houseType == 1) {
        //楼盘情况
        console.log("进入楼盘详情");
        console.log("/building/getBuildingDetail/" + item.id);
        that.$router.push({
          name: "potentialHouseDetail",
          params: { houseId: item.id, houseType: item.houseType }
        });
      } else if (item.houseType == 2) {
        console.log("进入交易房源详情");
        if (!item.houseId) {
          that.$message.error("houseId都是空的，如何查看");
          return;
        }
        that.$router.push({
          name: "tradeHouseDetail",
          params: { houseId: item.houseId, houseType: item.houseType }
        });
      } else {
        that.$message.error(
          "无法识别潜在房源的类型，到底是楼盘还是交易过的房源呢？这是个值得思索的问题"
        );
      }
    },
    toSale(
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
    queryPotentialHouseParams() {
      this.queryPotentialHouse(1);
    },
    remoteInput() {
      if (this.data.comId.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod(query) {
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
    queryCBId() {
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
    queryRoomNo() {
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
    Remove() {
      //  let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      //   this.tabColumnChange(tab);
      this.queryPotentialHouse(1);
    },

    queryPotentialHouse(currentPage) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage - 1 };
      if (Object.keys(this.moreSelect).length != 0) {
        let selectObject = common.getSelectParams(
          this.transitionList,
          this.moreSelect
        );
        Object.assign(params, selectObject);
      } else {
        params.comId = that.data.comId;
        params.cbId = that.data.cbId;
        params.roomNo = that.data.roomNo;
        params.customName = that.data.customName;
        params.tel = that.data.tel;
        params.type = that.data.type;
        params.minPrice = that.data.minPrice;
        params.maxPrice = that.data.maxPrice;
        params.minInArea = that.data.minInArea;
        params.maxInArea = that.data.maxInArea;
        params.beginTime = that.data.timeSelect[0];
        params.endTime = that.data.timeSelect[1];
      }
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      console.log(params);
      this.$api
        .post({
          url: "/houseResource/potentialHouse",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          console.log(e.data);
          that.loading = false;
          if (e.data.code == 200) {
            that.pageJson.total = e.data.data.dataCount;
            that.tableData = e.data.data.data;
          }
        })
        .catch(e => {
          console.log("查询潜在出售列表失败");
          console.log(e);
        });
    },

    handleClick() {},
    queryTabData() {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryPotentialHouseParams(1);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryPotentialHouse(val);
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryPotentialHouse(1);
    }
  }
};
</script>
