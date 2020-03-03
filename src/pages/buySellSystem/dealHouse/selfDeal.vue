
<template>
  <list-page :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <!-- 楼盘 -->
      <div class="page-form-inline budingMarinSet">
        <el-select v-model="data.comId"
                   @change="queryCBId()"
                   filterable
                   remote
                   placeholder="请输入楼盘进行搜索"
                   :remote-method="remoteMethod"
                   :loading="loading"
                   clearable>
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value"></el-option>
        </el-select>

        <el-select v-model="data.cbId"
                   filterable
                   placeholder="请选择楼栋"
                   @change="queryRoomNo()"
                   clearable>
          <el-option v-for="item in cbIdList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value"></el-option>
        </el-select>

        <el-select v-model="data.bhId"
                   filterable
                   placeholder="请选择房间号"
                   clearable>
          <el-option v-for="item in roomNoList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value"></el-option>
        </el-select>
        <el-input placeholder="业主姓名"
                  v-model="data.customName"
                  style="margin-left:30px;width:240px"
                  clearable />
        <el-input placeholder="业主电话"
                  v-model="data.tel"
                  style="margin-left:30px;width:240px"
                  clearable />
        <el-input placeholder="最低售价"
                  v-model="data.minPrice"
                  style="margin-left:30px;width:120px"
                  clearable />------
        <el-input placeholder="最高售价"
                  v-model="data.maxPrice"
                  style="width:120px"
                  clearable />万
        <el-input placeholder="最小面积"
                  v-model="data.minArea"
                  style="margin-left:30px;width:120px"
                  clearable />------
        <el-input placeholder="最大面积"
                  v-model="data.maxArea"
                  style="width:120px"
                  clearable />平方
        <el-date-picker v-model="data.timeSelect"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="录入开始日期"
                        end-placeholder="录入结束日期"></el-date-picker>
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="queryDatalist">查询</el-button>
      </div>
    </template>

    <template #tableColumn="cell">
      <template v-for="(item) in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop"
                         :formatter="formatData"></el-table-column>
      </template>
      <el-table-column label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
          <el-button type="info"
                     size="mini"
                     @click="toLook(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  data () {
    return {
      loading: false,

      data: {
        comId: "",
        timeSelect: "",
        minArea: "",
        maxArea: "",
        minPrice: "",
        maxPrice: "",
        cbId: "",
        bhId: "",
        customName: "",
        tel: ""
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: "houseNo", label: "房源编号" },
        { prop: "communityName", label: "楼盘名称" },
        { prop: "price", label: "成交价(万元)" },
        { prop: "area", label: "面积(m²)" },
        { prop: "unitPrice", label: "单价(元/m²)" },
        { prop: "houseType", label: "户型" },
        { prop: "seenNum", label: "被看次数" },
        { prop: "tradeTime", label: "成交时间" },
        { prop: "selfSaleType", label: "成交方式" },
        { prop: "followPerName", label: "跟单人" }
      ],
      tableData: []
    };
  },
  mounted () {
    this.queryOurComDeal(1);
  },
  methods: {
    queryTabData () {
      console.log(this, "111");
    },
    toLook (id) {
      console.log(id);
      var that = this;
      that.$router.push({
        path: "/buySellSystem/houseDetails",
        query: { houseId: id }
      });
    },
    queryDatalist () {
      this.queryOurComDeal(1);
    },
    remoteMethod (query) {
      var that = this;
      if (query !== "") {
        this.loading = true;

        this.$api
          .get({
            url: "/mateHouse/queryCommunity",
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
            comId: that.data.comId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.cbIdList = e.data.data.list;
          }
        });
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
            cbId: that.data.cbId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.roomNoList = e.data.data.list;
          }
        });
    },
    queryOurComDeal (currentPage) {
      var that = this;
      let params = { limit: that.pageJson.pageSize, page: currentPage };
      if (that.data.comId != null && that.data.comId.length > 0) {
        params.comid = that.data.comId;
      }
      if (that.data.cbId != null && that.data.cbId.length > 0) {
        params.cbId = that.data.cbId;
      }
      if (that.data.bhId != null && that.data.bhId.length > 0) {
        params.bhid = that.data.bhId;
      }
      if (that.data.customName != null && that.data.customName.length > 0) {
        params.customName = that.data.customName;
      }
      if (that.data.tel != null && that.data.tel.length > 0) {
        params.customTel = that.data.tel;
      }
      if (that.data.timeSelect != null && that.data.timeSelect.length > 0) {
        params.minDate = that.data.timeSelect[0];
        params.maxDate = that.data.timeSelect[1];
      }
      if (that.data.minArea != null && that.data.minArea.length > 0) {
        params.minArea = that.data.minArea;
      }
      if (that.data.maxArea != null && that.data.maxArea.length > 0) {
        params.maxArea = that.data.maxArea;
      }
      if (that.data.minPrice != null && that.data.minPrice.length > 0) {
        params.minPrice = that.data.minPrice;
      }
      if (that.data.maxPrice != null && that.data.maxPrice.length > 0) {
        params.maxPrice = that.data.maxPrice;
      }
      console.log(params);
      this.$api
        .post({
          url: "/dealHouse/selfDeal",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.totalCount;
            that.pageJson.currentPage = data.data.currPage;
            that.tableData = data.data.list;
          } else {
            console.log("查询我司成交列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询我司成交列表失败");
          console.log(e);
        });
    },
    isForBut (type) {
      let array = [{ name: "查看", isType: "3", methosName: "" }];
      return array.filter(item => {
        return item.isType.includes(type);
      });
    },
    handleClick () { },
    queryTabData () {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryDatalist(1);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.queryOurComDeal(val);
    },
    handleSizeChange (val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryOurComDeal(1);
    },
    formatData (row, column) {
      if (column.property == "unitPrice") {
        if (
          row.price == null ||
          row.area == null ||
          row.price == 0 ||
          row.area == 0
        ) {
          return "";
        } else {
          return parseFloat((row.price / row.area) * 10000).toFixed(2);
        }
      }
      if (column.property == "houseType") {
        return row.rooms + "室" + row.hall + "厅" + row.toilet + "卫";
      }
      if (column.property == "tradeTime") {
        if (row.tradeTime.length > 19) {
          return row.tradeTime.substring(0, 19);
        } else {
          return row.tradeTime;
        }
      }
      if (column.property == "selfSaleType") {
        if (row.selfSaleType.length < 1) {
          return "";
        } else {
          return ["疑似跳单", "", "亲朋好友"][row.selfSaleType];
        }
      }
      return row[column.property];
    }
  }
};
</script>  