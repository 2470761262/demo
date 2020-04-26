
<template>
  <list-page @sort-change="sortMethod"
             :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
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
                     @change="querySaleNotTrackParams"
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
                    @change="querySaleNotTrackParams"
                    clearable />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">电话</h3>
          <el-input placeholder="业主电话"
                    v-model="data.tel"
                    class="set-input200"
                    @change="querySaleNotTrackParams"
                    clearable />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">价格</h3>
          <el-input placeholder="最小值"
                    v-model="data.minPrice"
                    class="set-input90"
                    @change="querySaleNotTrackParams"
                    clearable />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大值"
                    v-model="data.maxPrice"
                    class="set-input90"
                    @change="querySaleNotTrackParams"
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
                    @change="querySaleNotTrackParams"
                    clearable />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大值"
                    v-model="data.maxInArea"
                    class="set-input90"
                    @change="querySaleNotTrackParams"
                    clearable />
          <span class="query-cell-suffix">平方</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">录入时间</h3>
          <el-date-picker v-model="data.timeSelect"
                          type="daterange"
                          class="set-data-pricker"
                          @change="querySaleNotTrackParams"
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
                     @click="querySaleNotTrackParams">查询</el-button>
        </div>
        <div class="query-content-cell cell-interval25">
          <moreSelect @moreSelectChange="moreSelectChange"
                      deptUrl="/houseResource/getSaleNotTrack"></moreSelect>
        </div>
        <div class="query-content-cell cell-interval25">
          <definitionmenu :renderList="renderList"
                          :tableColumn="tableColumn"
                          @change="tabColumnChange"
                          :loading="menuLoading"
                          :resetList="tableColumnField"></definitionmenu>
        </div>
      </div>
    </template>
    <template #tableColumn>
      <template v-for="(item) in tableColumn">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :min-width="item.width"
                         :key="item.prop"
                         show-overflow-tooltip
                         :formatter="item.formart"
                         :sort-orders="['ascending', 'descending']"
                         :sortable="item.order"></el-table-column>
      </template>
      <el-table-column label="操作"
                       fixed="right"
                       min-width="220">
        <template v-slot="scope">
          <el-button type="primary"
                     size="mini"
                     @click="distributeEvent(item.methosName,scope.row.id)"
                     v-for="(item,index) in isForBut(scope.row.id)"
                     :key="index">{{item.name}}</el-button>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import houseContrast from "@/minxi/houseContrast";
import moreSelect from "@/components/moreSelect";
import definitionmenu from "@/components/definitionMenu";
import common from "../houseResource/common/common";
import tableMenu from '@/util/getTableMenu';
export default {
  mixins: [getMenuRid, houseContrast],
  components: {
    listPage,
    definitionmenu,
    moreSelect
  },
  data () {
    return {
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
        minPrice: "",
        maxPrice: ""
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      moreSelect: [],
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
      sortType: "descending",//排序类型
      menuLoading: true,//自定义菜单
      renderList: []
    };
  },
  mounted () {
    tableMenu.getTableMenu(this.tableColumnField, 11).then((e) => {
      this.menuLoading = false;
      this.renderList = e;
      this.queryVerifyHouseDatas(1);
    });

  },
  methods: {
    moreSelectChange (e) {
      this.moreSelect = e;
      this.queryVerifyHouseDatas(1);
    },
    sortMethod (e) {
      console.log(e, "eeee排序");
      this.sortColumn = e.prop;
      this.sortType = e.order;
      this.queryVerifyHouseDatas(1);
    },
    tabColumnChange (e, length = 0) {
      this.tableColumn = e;
      if (length > 0) {
        let prop = e.map(item => { return { prop: item.prop } })
        tableMenu.insert(prop, 11);
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
    querySaleNotTrackParams () {
      this.queryVerifyHouseDatas(1);
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
            url: "/community/saleNotTracking",
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
      this.querySaleNotTrackParams();
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
      this.querySaleNotTrackParams();
    },
    Remove () {
      let tab = this.tableColumn;
      let renderList = this.renderList;
      Object.assign(this.$data, this.$options.data.call(this));
      this.renderList = renderList;
      this.menuLoading = false;
      this.tabColumnChange(tab);
      this.queryVerifyHouseDatas(1);
    },
    queryVerifyHouseDatas (currentPage) {
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
      }
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;

      this.$api
        .post({
          url: "/houseResource/getSaleNotTrack",
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
          } else {
            console.log("查询在售无跟单列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询在售无跟单列表失败");
          console.log(e);
        });
    },

    handleClick () { },
    queryTabData () {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.querySaleNotTrackParams(1);
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryVerifyHouseDatas(1);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.queryVerifyHouseDatas(val);
    }
  }
};
</script>
