
<style lang="less" scoped>
.message-tips {
  color: red;
  font-size: 14px;
}
</style>
<template>
  <list-page :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @sort-change="sortMethod"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">楼盘</h3>
          <el-select v-model="data.comId"
                     @focus="remoteInput"
                     @change="queryDatalist"
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
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">价格</h3>
          <el-input placeholder="最小值"
                    v-model="data.minPrice"
                    class="set-input90"
                    @change="queryDatalist"
                    clearable />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大值"
                    v-model="data.maxPrice"
                    class="set-input90"
                    @change="queryDatalist"
                    clearable />
          <span class="query-cell-suffix">万</span>
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">面积</h3>
          <el-input placeholder="最小值"
                    v-model="data.minInArea"
                    class="set-input90"
                    @change="queryDatalist"
                    clearable />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大值"
                    v-model="data.maxInArea"
                    class="set-input90"
                    @change="queryDatalist"
                    clearable />
          <span class="query-cell-suffix">平方</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">成交时间</h3>
          <el-date-picker v-model="data.timeSelect"
                          type="daterange"
                          class="set-data-pricker"
                          @change="queryDatalist"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"></el-date-picker>
          <span class="query-cell-suffix handlebut"
                @click="Remove">清除</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <el-button type="primary"
                     size="mini"
                     @click="queryDatalist">查询</el-button>
        </div>
      </div>
      <div class="page-list-query-row">
        <div class="message-tips">①非作业方在签订合同15天后才可查询;②成交房源将锁定90天,90天后将在'资源库-潜在房源'中显示;③90天内有出售请重新录入</div>
      </div>
    </template>
    <template #tableColumn="cell">
      <template v-for="(item) in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop"
                         show-overflow-tooltip
                         :formatter="item.formart"
                         :sort-orders="['ascending', 'descending']"
                         :sortable="item.order"></el-table-column>
      </template>
      <el-table-column label="操作"
                       fixed="right"
                       width="90">
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
import getMenuRid from "@/minxi/getMenuRid";
import '@/assets/publicLess/pageListQuery.less';
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  data () {
    return {
      loading: true,

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
        { prop: "houseNo", label: "房源编号", width: '170', order: false, disabled: true, default: true },
        { prop: "communityName", label: "楼盘名称", width: '170', order: false, disabled: true, default: true },
        { prop: "price", label: "成交价(万元)", order: 'custom', disabled: false, default: true, formart: item => item.price + '万元' },
        { prop: "inArea", label: "面积(m²)", order: 'custom', disabled: false, default: true, formart: item => item.inArea + 'm²' },
        { prop: "unitPrice", label: "单价(元/m²)", order: 'custom', disabled: false, default: true, format: item => item.unitpaice + '元/㎡' },
        { prop: '', label: '户型', width: '150', order: false, disabled: false, default: true, formart: item => (item.rooms || 0) + '室' + (item.hall || 0) + '厅' + (item.toilet || 0) + '卫' },
        { prop: "seenNum", label: "被看次数", order: 'custom', disabled: false, default: true, formart: item => item.seenNum || 0 },
        { prop: "tradeTime", label: "成交时间", order: 'custom', disabled: false, default: true },
        { prop: "agenName", label: "跟单人", order: false, disabled: false, default: true },
        { prop: 'id', label: "成交人", order: false, disabled: false, default: true, formart: item => item.agenName }
      ],
      tableData: []
    };
  },
  mounted () {
    this.queryOurComDeal(1, "id", "ascending");
  },
  methods: {
    sortMethod (e) {
      console.log(e, "eeee排序");
      this.queryOurComDeal(1, e.prop, e.order);
    },
    queryTabData () {
      console.log(this, "111");
    },
    toLook (id) {
      console.log(id);
      var that = this;
      that.$router.push({ name: "houseDetails", params: { houseId: id } });
    },
    queryDatalist () {
      this.queryOurComDeal(1, "id", "ascending");
    },
    remoteMethod (query) {
      var that = this;
      if (query !== "") {
        that.loading = true;

        this.$api
          .get({
            url: "/community/ourComDeal",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              communityName: query
            }
          })
          .then(e => {
            console.log(e.data);
            that.loading = true;
            if (e.data.code == 200) {
              that.loading = false;
              that.options = e.data.data.list;
            }
          });
      } else {
        that.options = [];
      }
    },
    Remove () {
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.tabColumnChange(tab);
      this.queryOurComDeal(1, 'id', 'ascending');

    },
    queryOurComDeal (currentPage, column, type) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage - 1 };
      if (that.data.comId != null && that.data.comId.length > 0) {
        params.comId = that.data.comId;
      }
      if (that.data.timeSelect != null && that.data.timeSelect.length > 0) {
        params.beginTime = that.data.timeSelect[0];
        params.endTime = that.data.timeSelect[1];
      }
      if (that.data.minArea != null && that.data.minArea.length > 0) {
        params.minInArea = that.data.minArea;
      }
      if (that.data.maxArea != null && that.data.maxArea.length > 0) {
        params.maxInArea = that.data.maxArea;
      }
      if (that.data.minPrice != null && that.data.minPrice.length > 0) {
        params.minPrice = that.data.minPrice;
      }
      if (that.data.maxPrice != null && that.data.maxPrice.length > 0) {
        params.maxPrice = that.data.maxPrice;
      }
      if (column == "" || type == null || type == undefined) {
        params.sortColumn = "id";
      } else {
        params.sortColumn = column;
      }
      if (type == "" || type == null || type == undefined) {
        params.sortType = "ascending";
      } else {
        params.sortType = type;
      }
      console.log(params);
      this.$api
        .post({
          url: "/tradeHouse/getTradeHouse",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let data = e.data;
          that.loading = false;
          if (data.code == 200) {
            that.pageJson.total = data.data.dataCount;
            that.tableData = data.data.data;
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
    remoteInput () {
      if (this.data.comId == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod (query) {
      var that = this;
      if (query !== "") {
        this.loading = true;

        this.$api
          .get({
            url: "/community/ourComDeal",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              page: 1,
              limit: 50,
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
    handleClick () { },
    queryTabData () {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryDatalist(1);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.queryOurComDeal(val, "id", "ascending");
    },
    handleSizeChange (val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryOurComDeal(1, "id", "ascending");
    }
  }
};
</script>  