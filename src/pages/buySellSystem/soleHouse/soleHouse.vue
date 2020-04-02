
<style lang="less" scoped>
.page-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <div class="page-content">
    <list-page @sort-change="sortMethod"
               :parentData="$data"
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
                       :remote-method="remoteMethod">
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
                       @change="querySoleHouseParams"
                       placeholder="房间号">
              <el-option v-for="item in roomNoList"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval75">
            <h3 class="query-cell-title">录入时间</h3>
            <el-date-picker v-model="data.timeSelect"
                            type="daterange"
                            class="set-data-pricker"
                            @change="querySoleHouseParams"
                            range-separator="至"
                            start-placeholder="开始日期"
                            :default-time="['00:00:00', '23:59:59']"
                            end-placeholder="结束日期"></el-date-picker>
          </div>
          <div class="query-content-cell cell-interval45">
            <definitionmenu class="menuMarin"
                            :renderList="tableColumnField"
                            :tableColumn="tableColumn"
                            @change="tabColumnChange"></definitionmenu>
          </div>
        </div>
      </template>
      <template v-slot:tableColumn>
        <template v-for="(item) in tableColumn">
          <el-table-column :prop="item.prop"
                           :label="item.label"
                           :width="item.width"
                           :key="item.prop"
                           :formatter="item.formart"
                           :sort-orders="['ascending', 'descending']"
                           :sortable="item.order">
          </el-table-column>
        </template>
        <!-- <el-table-column label="操作"
                         fixed="right"
                         width="180">
          <template v-slot>
            <el-button type="primary"
                       size="mini">查看</el-button>
          </template>
        </el-table-column> -->

      </template>
    </list-page>
  </div>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import houseContrast from "@/minxi/houseContrast";
import definitionmenu from "@/components/definitionMenu";
import "@/assets/publicLess/pageListQuery.less";
export default {
  mixins: [getMenuRid, houseContrast],
  components: {
    listPage,
    definitionmenu
  },
  data() {
    return {
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
          formart: item => this.notNull(item.inArea, "m²")
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
          default: true,
          formart: item => this.notNull(item.outfollow, "")
        },
        {
          prop: "noSeenDay",
          label: "未被看天数",
          width: "120",
          order: false,
          disabled: false,
          default: true,
          formart: item => this.notNull(item.noSeenDay, "")
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
          formart: item => this.houseType(item.rooms, item.hall, item.toilet)
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
        },
        {
          prop: "addName",
          label: "录入人",
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
  created() {
    this.querySoleHouse(1, "id", "ascending");
  },
  methods: {
    notNull(item, memo) {
      if (item != null && item != "" && item != undefined) {
        return item.substring(0, item.indexOf(".") + 3) + memo;
      } else {
        return "——" + memo;
      }
    },
    houseType(rooms, hall, toilet) {
      let ro,
        ha,
        to = "";
      if (rooms != null && rooms != "" && rooms != undefined) {
        ro = rooms + "室";
      } else {
        ro = "0" + "室";
      }
      if (hall != null && hall != "" && hall != undefined) {
        ha = hall + "厅";
      } else {
        ha = "0" + "厅";
      }
      if (toilet != null && toilet != "" && toilet != undefined) {
        to = toilet + "卫";
      } else {
        to = "0" + "卫";
      }
      return ro + ha + to;
    },
    remoteInput() {
      if (this.data.comId.length == 0) {
        this.remoteMethod();
      }
    },
    tabColumnChange(e) {
      this.tableColumn = e;
    },
    remoteMethod(query) {
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
      this.querySoleHouseParams();
    },
    querySoleHouse(currentPage, column, type) {
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
          url: "/soleHouse/querySoleHouse",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.dataCount;
            that.tableData = data.data.data;
          } else {
            console.log("查询独家房源列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询独家房源列表失败");
          console.log(e);
        });
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
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.roomNo = "";
            that.roomNoList = e.data.data.list;
          }
        });
      this.querySoleHouseParams();
    },
    querySoleHouseParams() {
      this.querySoleHouse(1, "id", "ascending");
    },
    sortMethod(e) {
      this.querySoleHouse(1, e.prop, e.order);
    },
    handleSizeChange(val) {
      this.pageJson.pageSize = val;
      this.querySoleHouse(1, "id", "ascending");
    },
    handleCurrentChange(val) {
      this.querySoleHouse(val, "id", "ascending");
    }
  }
};
</script>  