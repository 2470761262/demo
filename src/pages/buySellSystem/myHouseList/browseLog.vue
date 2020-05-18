<style lang="less" scoped></style>
<template>
  <list-page
    @sort-change="sortMethod"
    :parentData="$data"
    @queryTabData="queryTabData"
    @handleClick="handleClick"
    pageName="browseLog"
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
            @change="querySoleAllParams"
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
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">房源编号</h3>
          <el-input
            placeholder="房源编号"
            v-model="data.houseNo"
            class="set-input220"
            @change="querySoleAllParams"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">价格</h3>
          <el-input
            placeholder="最小值"
            v-model="data.minPrice"
            class="set-input90"
            @change="querySoleAllParams"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            v-model="data.maxPrice"
            class="set-input90"
            @change="querySoleAllParams"
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
            @change="querySoleAllParams"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            v-model="data.maxInArea"
            class="set-input90"
            @change="querySoleAllParams"
            clearable
          />
          <span class="query-cell-suffix">平方</span>
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">浏览时间</h3>
          <el-date-picker
            v-model="data.timeSelect"
            type="daterange"
            class="set-data-pricker"
            @change="querySoleAllParams"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
          <span class="query-cell-suffix handlebut" @click="Remove">清除</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <el-button type="primary" size="mini" @click="querySoleAllParams"
            >查询</el-button
          >
        </div>
      </div>
    </template>
    <template #tableColumn>
      <template v-for="item in tableColumnField">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          :sortable="item.order"
          show-overflow-tooltip
          :formatter="item.formart"
          :sort-orders="['ascending', 'descending']"
          :key="item.prop"
        ></el-table-column>
      </template>
      <el-table-column label="操作" fixed="right" min-width="150">
        <template v-slot="scope">
          <el-button
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
import getMenuRid from "@/minxi/getMenuRid";
import houseContrast from "@/minxi/houseContrast";
import common from "../houseResource/common/common";
import tableMenu from "@/util/getTableMenu";
export default {
  mixins: [getMenuRid, houseContrast],
  components: {
    listPage
  },
  data() {
    return {
      loading: true,

      data: {
        comId: "",
        cbId: "",
        roomNo: "",
        timeSelect: "",
        houseNo: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: ""
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      moreSelect: [],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableColumnField: [
        {
          prop: "HouseNo",
          label: "房源编号",
          width: "170",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "CommunityName",
          label: "小区名称",
          order: false,
          width: "150",
          disabled: true,
          default: true
        },
        {
          prop: "BuildingName",
          label: "楼栋号",
          width: "",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "RoomNo",
          label: "房间号",
          width: "",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "InArea",
          label: "面积(m²)",
          width: "110",
          order: "InArea",
          disabled: false,
          default: true,
          formart: item => item.InArea + "m²"
        },
        {
          prop: "Price",
          label: "售价(万元)",
          width: "120",
          order: "Price",
          disabled: false,
          default: true,
          formart: item => (item.Price || 0) + "万元"
        },
        {
          prop: "HouseType",
          label: "户型",
          width: "150",
          order: false,
          disabled: false,
          default: true,
          formart: item =>
            (item.Rooms || 0) +
            "室" +
            (item.Hall || 0) +
            "厅" +
            (item.Toilet || 0) +
            "卫"
        },
        {
          prop: "UnitPrice",
          label: "单价(元/㎡)",
          width: "120",
          order: "custom",
          disabled: false,
          formart: item => item.UnitPrice + "元/㎡"
        },
        {
          prop: "Type",
          label: "来源",
          width: "120",
          order: false,
          disabled: false,
          formart: item => this.formatType(item.Type)
        },
        {
          prop: "AddTime",
          label: "浏览时间",
          width: "120",
          order: false,
          disabled: false,
          default: true
        }
      ],
      tableColumn: [],
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
      sortType: "descending", //排序类型
      menuLoading: true, //自定义菜单
      renderList: []
    };
  },
  mounted() {
    tableMenu.getTableMenu(this.tableColumnField, 15).then(e => {
      this.menuLoading = false;
      this.renderList = e;
      this.queryVerifyHouseDatas(1);
    });
  },
  methods: {
    moreSelectChange(e) {
      this.moreSelect = e;
      this.queryVerifyHouseDatas(1);
    },
    sortMethod(e) {
      console.log(e, "eeee排序");
      this.sortColumn = e.prop;
      this.sortType = e.order;
      this.queryVerifyHouseDatas(1);
    },
    tabColumnChange(e, length = 0) {
      this.tableColumn = e;
      if (length > 0) {
        let prop = e.map(item => {
          return { prop: item.prop };
        });
        tableMenu.insert(prop, 15);
      }
    },
    // queryTabData() {
    //   console.log(this, "111");
    // },
    formatType(type) {
      switch (type) {
        case 1:
          return "我的跟单";
        case 2:
          return "店公共盘";
        case 3:
          return "在售无跟单";
        case 4:
          return "暂不售";
        case 5:
          return "无号码";
        case 6:
          return "潜在出售";
        case 7:
          return "潜在出售";
        default:
          return "";
      }
    },
    toHouseDetail(item) {
      let that = this;
      console.log(item, "浏览记录详情");
      if (item.Type == 1) {
        //楼盘情况
        console.log(
          "进入我的跟单房源详情 /buySellSystem/houseDetails/" + item.HouseId
        );
        that.$router.push({
          name: "houseDetails",
          params: { houseId: item.HouseId, browse: { id: item.id } }
        });
      } else if (item.Type == 2) {
        //楼盘情况
        console.log(
          "进入店公共盘房源详情 /buySellSystem/houseDetails/" + item.HouseId
        );
        that.$router.push({
          name: "houseDetails",
          params: { houseId: item.HouseId, browse: { id: item.id } }
        });
      } else if (item.Type == 3) {
        //楼盘情况
        console.log(
          "进入在售无跟单房源详情 /buySellSystem/houseDetails/" + item.HouseId
        );
        that.$router.push({
          name: "houseDetails",
          params: { houseId: item.HouseId, browse: { id: item.id } }
        });
      } else if (item.Type == 4) {
        console.log("进入暂不售房源详情");
        that.$router.push({
          name: "historyDetails",
          params: {
            houseId: item.HouseId,
            housePageType: "notSale",
            browse: { id: item.id }
          }
        });
      } else if (item.Type == 5) {
        console.log("进入楼盘详情");
        that.$router.push({
          name: "buildingHouseDetail",
          params: { houseId: item.HouseId, browse: { id: item.id } }
        });
      } else if (item.Type == 6) {
        //楼盘情况
        console.log("进入楼盘详情");
        that.$router.push({
          name: "potentialHouseDetail",
          params: {
            houseId: item.HouseId,
            houseType: 1,
            browse: { id: item.id }
          }
        });
      } else if (item.Type == 7) {
        console.log("进入交易房源详情");
        that.$router.push({
          name: "tradeHouseDetail",
          params: {
            houseId: item.HouseId,
            houseType: 2,
            browse: { id: item.id }
          }
        });
      } else {
        that.$message.error(
          "无法识别潜在浏览的类型，到底是楼盘还是交易过的房源呢？这是个值得思索的问题"
        );
      }
    },
    querySoleAllParams() {
      this.queryVerifyHouseDatas(1);
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
    Remove() {
      let that = this;
      let tab = this.tableColumn;
      let renderList = this.renderList;
      Object.assign(this.$data, this.$options.data.call(this));
      this.renderList = renderList;
      this.menuLoading = false;
      this.tabColumnChange(tab);
      this.queryVerifyHouseDatas(1);
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
      this.querySoleAllParams();
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
      this.querySoleAllParams();
    },
    queryVerifyHouseDatas(currentPage) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage };
      if (Object.keys(this.moreSelect).length != 0) {
        let selectObject = common.getSelectParams(
          this.transitionList,
          this.moreSelect
        );
        Object.assign(params, selectObject);
      } else {
        console.log(this.data.timeSelect, "data.timeSelect");
        params.comId = that.data.comId;
        params.cbId = that.data.cbId;
        params.roomNo = that.data.roomNo;
        params.beginTime = that.data.timeSelect[0];
        params.endTime = that.data.timeSelect[1];
        params.houseNo = that.data.houseNo;
        params.minInArea = that.data.minInArea;
        params.maxInArea = that.data.maxInArea;
        params.minPrice = that.data.minPrice;
        params.maxPrice = that.data.maxPrice;
      }
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      this.$api
        .post({
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          url: "/house/browse/list",
          data: params
          // qs: true
        })
        .then(e => {
          console.log(e.data);
          that.loading = false;
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.totalCount;
            that.tableData = data.data.list;
          } else {
            // console.log("查询全部在售房源列表结果：" + result.message);
            // alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询全部在售列表失败");
          console.log(e);
        });
    },

    handleClick() {},
    queryTabData() {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.querySoleAllParams(1);
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryVerifyHouseDatas(1);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryVerifyHouseDatas(val);
    }
  }
};
</script>
