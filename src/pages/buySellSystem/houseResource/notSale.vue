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
  >
    <template v-slot:top>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">楼盘</h3>
          <el-select
            class="anchor-point"
            v-model="data.comId"
            data-anchor="暂不售楼盘筛选"
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
              data-anchor="暂不售楼盘筛选"
              class="anchor-point"
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            data-anchor="暂不售楼栋筛选"
            class="anchor-point"
            v-model="data.cbId"
            filterable
            clearable
            placeholder="楼栋"
            @change="buildChange"
          >
            <el-option
              data-anchor="暂不售楼栋筛选"
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
            data-anchor="暂不售房间号筛选"
            @change="queryNotSaleParams"
            placeholder="房间号"
            :loading="HouseNoLoading"
            v-loadmore="loadMore"
          >
            <el-option
              data-anchor="暂不售房间号筛选"
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
            data-anchor="暂不售房源编号搜索"
            v-model="data.houseNo"
            class="set-input200"
            @change="queryNotSaleParams"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">业主</h3>
          <el-input
            data-anchor="暂不售业主姓名搜索"
            placeholder="姓名"
            v-model="data.customName"
            class="set-input120 anchor-point"
            @change="queryNotSaleParams"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">电话</h3>
          <el-input
            placeholder="业主电话"
            data-anchor="暂不售业主电话搜索"
            v-model="data.tel"
            class="set-input200 anchor-point"
            @change="queryNotSaleParams"
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
            data-anchor="暂不售价格最小值筛选"
            class="set-input90 anchor-point"
            @change="queryNotSaleParams"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            v-model="data.maxPrice"
            data-anchor="暂不售价格最大值筛选"
            class="set-input90 anchor-point"
            @change="queryNotSaleParams"
            clearable
          />
          <span class="query-cell-suffix">万</span>
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">面积</h3>
          <el-input
            data-anchor="暂不售面积最小值筛选"
            placeholder="最小值"
            v-model="data.minInArea"
            class="set-input90 anchor-point"
            @change="queryNotSaleParams"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            data-anchor="暂不售面积最大值筛选"
            v-model="data.maxInArea"
            class="set-input90 anchor-point"
            @change="queryNotSaleParams"
            clearable
          />
          <span class="query-cell-suffix">平方</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">录入时间</h3>
          <el-date-picker
            v-model="data.timeSelect"
            type="daterange"
            data-anchor="暂不售录入时间筛选"
            class="set-data-pricker anchor-point"
            @change="queryNotSaleParams"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
          <span
            class="query-cell-suffix handlebut anchor-point"
            data-anchor="暂不售清除按钮"
            @click="Remove"
            >清除</span
          >
        </div>
        <div class="query-content-cell cell-interval75">
          <el-button
            class="anchor-point"
            type="primary"
            data-anchor="暂不售查询按钮"
            size="mini"
            @click="queryNotSaleParams"
            >查询</el-button
          >
        </div>
        <div class="query-content-cell cell-interval25">
          <moreSelect
            @moreSelectChange="moreSelectChange"
            deptUrl="/houseResource/getNotSale"
          ></moreSelect>
        </div>
        <div class="query-content-cell cell-interval25">
          <definitionmenu
            :renderList="renderList"
            :tableColumn="tableColumn"
            @change="tabColumnChange"
            :loading="menuLoading"
            :resetList="tableColumnField"
          ></definitionmenu>
        </div>
      </div>
    </template>
    <template #tableColumn>
      <template v-for="item in tableColumn">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          :key="item.prop"
          show-overflow-tooltip
          :formatter="item.formart"
          :sort-orders="['ascending', 'descending']"
          :sortable="item.order"
        ></el-table-column>
      </template>
      <el-table-column label="操作" fixed="right" min-width="170">
        <template v-slot="scope">
          <el-button
            class="anchor-point"
            type="primary"
            data-anchor="暂不售查看按钮"
            size="mini"
            @click="toLook(scope.row.id)"
            >查看</el-button
          >
          <el-button
            data-anchor="暂不售转在售按钮"
            class="anchor-point"
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
import houseContrast from "@/minxi/houseContrast";
import definitionmenu from "@/components/definitionMenu";
import moreSelect from "@/components/moreSelect";
import common from "../houseResource/common/common";
import tableMenu from "@/util/getTableMenu";
export default {
  mixins: [getMenuRid, houseContrast],
  components: {
    listPage,
    definitionmenu,
    moreSelect
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
      data: {
        comId: "",
        cbId: "",
        roomNo: "",
        timeSelect: "",
        customName: "",
        tel: "",
        minInArea: "",
        maxInArea: "",
        houseNo: ""
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
          formart: item => item.price + "万元"
        },
        {
          prop: "seenNum",
          label: "被看次数",
          width: "120",
          order: true,
          disabled: false,
          default: true
        },
        {
          prop: "outfollow",
          label: "未跟进天数",
          width: "120",
          order: true,
          disabled: false,
          default: true
        },
        {
          prop: "noSeenDay",
          label: "未被看天数",
          width: "120",
          order: true,
          disabled: false,
          default: true
        },
        {
          prop: "addTime",
          label: "添加时间",
          width: "120",
          order: true,
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
          prop: "unitPrice",
          label: "单价(元/㎡)",
          width: "140",
          order: "custom",
          disabled: false,
          default: true,
          format: item => item.unitPrice + "元/㎡"
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
          label: "录入人",
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
    tableMenu.getTableMenu(this.tableColumnField, 12).then(e => {
      this.menuLoading = false;
      this.renderList = e;
      this.queryNotSale(1);
    });
  },
  methods: {
    sortMethod(e) {
      console.log(e, "eeee排序");
      this.sortColumn = e.prop;
      this.sortType = e.order;
      this.queryNotSale(1);
    },
    tabColumnChange(e, length = 0) {
      this.tableColumn = e;
      if (length > 0) {
        let prop = e.map(item => {
          return { prop: item.prop };
        });
        tableMenu.insert(prop, 12);
      }
    },
    moreSelectChange(e) {
      this.moreSelect = e;
      this.queryNotSale(1);
    },
    // queryTabData() {
    //   console.log(this, "111");
    // },
    formatHouseType(row, column) {
      return row.Rooms + "室" + row.hall + "厅" + row.toilet + "卫";
    },

    toLook(id) {
      var that = this;
      that.$router.push({
        name: "historyDetails",
        params: { houseId: id, housePageType: "notSale" }
      });
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
      console.log(bhId);
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
    queryNotSaleParams() {
      this.queryNotSale(1);
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
            url: "/community/notSale",
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
      this.queryNotSaleParams();
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
      this.queryNotSaleParams();
    },
    Remove() {
      let tab = this.tableColumn;
      let renderList = this.renderList;
      Object.assign(this.$data, this.$options.data.call(this));
      this.renderList = renderList;
      this.menuLoading = false;
      this.tabColumnChange(tab);
      this.queryNotSale(1);
    },
    queryNotSale(currentPage) {
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
        params.houseNo = that.data.houseNo;
      }
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      this.$api
        .post({
          url: "/houseResource/getNotSale",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          console.log(e.data);
          that.loading = false;
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.dataCount;
            that.tableData = data.data.data;
          }
          //   else {
          //     console.log("查询暂不售列表结果：" + result.message);
          //     alert(result.message);
          //   }
        })
        .catch(e => {
          console.log("查询暂不售列表失败");
          console.log(e);
        });
    },

    handleClick() {},
    queryTabData() {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryNotSaleParams(1);
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryNotSale(1);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryNotSale(val);
    }
  }
};
</script>
