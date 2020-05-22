<style lang="less" scoped>
.page-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <div class="page-content">
    <list-page
      @sort-change="sortMethod"
      :parentData="$data"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
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
              @change="buildChange"
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
              @change="queryShopownerHouseParams"
              placeholder="房间号"
              :loading="HouseNoLoading"
              v-loadmore="loadMore"
            >
              <el-option
                v-for="item in roomNoList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <div class="query-content-cell cell-interval75">
              <h3 class="query-cell-title">录入时间</h3>
              <el-date-picker
                v-model="data.timeSelect"
                type="daterange"
                class="set-data-pricker"
                @change="queryShopownerHouseParams"
                range-separator="至"
                start-placeholder="开始日期"
                :default-time="['00:00:00', '23:59:59']"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
            <div class="query-content-cell cell-interval45">
              <definitionmenu
                :renderList="tableColumnField"
                :tableColumn="tableColumn"
                @change="tabColumnChange"
              ></definitionmenu>
            </div>
            <div class="query-content-cell cell-interval45">
              <el-button
                type="primary"
                size="mini"
                @click="queryShopownerHouseParams"
                >查询</el-button
              >
            </div>
          </div>
        </div>
      </template>
      <template v-slot:tableColumn>
        <template v-for="item in tableColumn">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :key="item.prop"
            :formatter="item.formart"
            :sort-orders="['ascending', 'descending']"
            :sortable="item.order"
          >
          </el-table-column>
        </template>
        <el-table-column label="操作" fixed="right" width="180">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              @click="distributeEvent(item.methosName, scope.row.id)"
              v-for="(item, index) in isForBut(scope.row.id)"
              :key="index"
              >{{ item.name }}</el-button
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
import houseContrast from "@/minxi/houseContrast";
import definitionmenu from "@/components/definitionMenu";
export default {
  mixins: [getMenuRid, houseContrast],
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
      loading: false,
      data: {
        comId: "",
        cbId: "",
        roomNo: "",
        timeSelect: ""
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
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
          prop: "seenNum",
          label: "被看次数",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "outfollow",
          label: "未跟进天数",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "noSeenDay",
          label: "未被看天数",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "addTime",
          label: "添加时间",
          width: "120",
          order: false,
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
            item.rooms + "室" + item.hall + "厅" + item.toilet + "卫"
        },
        {
          prop: "unitpaice",
          label: "单价(元/㎡)",
          width: "120",
          order: "custom",
          disabled: false,
          default: false,
          format: item => item.unitpaice + "元/㎡"
        },
        {
          prop: "face",
          label: "朝向",
          width: "120",
          order: false,
          disabled: false,
          default: false
        },
        {
          prop: "floor",
          label: "楼层",
          width: "120",
          order: false,
          disabled: false,
          default: false
        },
        {
          prop: "decoration",
          label: "装修",
          width: "120",
          order: false,
          disabled: false,
          default: false
        }
      ],
      tableColumn: [],
      tableData: []
    };
  },
  mounted() {
    this.queryShopownerHouse(1, "id", "ascending");
  },
  methods: {
    sortMethod(e) {
      console.log(e, "eeee排序");
      this.queryShopownerHouse(1, e.prop, e.order);
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
      that.$router.push({ name: "houseDetails", params: { houseId: id } });
    },
    queryShopownerHouseParams() {
      this.queryShopownerHouse(1, "id", "ascending");
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
            url: "/mateHouse/queryCommunity",
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
      this.queryShopownerHouseParams();
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
            limit: this.houseNoPage.limit
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
      this.queryShopownerHouseParams();
    },
    queryShopownerHouse(currentPage, column, type) {
      var that = this;
      let params = { limit: that.pageJson.pageSize, page: currentPage - 1 };
      params.comId = that.data.comId;
      params.cbId = that.data.cbId;
      params.roomNo = that.data.roomNo;
      params.beginTime = that.data.timeSelect[0];
      params.endTime = that.data.timeSelect[1];
      params.sortColumn = column;
      params.sortType = type;
      this.$api
        .post({
          url: "/houseRecommend/shopOwnerRecommendHouse",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.dataCount;

            that.tableData = data.data.data;
          }
          //   else {
          //     console.log("查询店长推荐列表结果：" + result.message);
          //     alert(result.message);
          //   }
        })
        .catch(e => {
          console.log("查询店长推荐列表失败");
          console.log(e);
        });
    },

    handleClick() {},
    queryTabData() {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryShopownerHouseParams(1);
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryShopownerHouse(1, "id", "ascending");
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryShopownerHouse(val, "id", "ascending");
    }
  }
};
</script>
