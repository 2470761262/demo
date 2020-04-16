<style lang="less" scoped>
@import url("../../../assets/publicLess/pageListQuery.less");
.page-row-flex {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
<template>
  <div class="page-row-flex">
    <list-page :parentData="$data"
               @queryTabData="queryTabData"
               @handleClick="handleClick"
               @handleSizeChange="handleSizeChange"
               @handleCurrentChange="handleCurrentChange">
      <template v-slot:top>
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">楼盘名称</h3>
            <el-input placeholder="楼盘名称"
                      v-model="queryData.houseName"
                      class="set-input120"
                      clearable>
            </el-input>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">手机号</h3>
            <el-input placeholder="手机号"
                      v-model="queryData.brokerPhone"
                      class="set-input200"
                      clearable>
            </el-input>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">提交人</h3>
            <el-input placeholder="提交人"
                      v-model="queryData.brokerName"
                      class="set-input120"
                      clearable>
            </el-input>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">审核状态</h3>
            <el-select v-model="queryData.isCheck"
                       placeholder="审核"
                       class="set-select150"
                       clearable>
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <span class="query-cell-suffix handlebut"
                  @click="remove">清除</span>
          </div>
          <div class="query-content-cell cell-interval75">
            <el-button type="primary"
                       size="mini"
                       @click="queryAddFloorListParams">查询</el-button>
          </div>
        </div>
      </template>
      <template v-slot:tableColumn="cell">
        <template v-for="(item) in cell.tableData">
          <el-table-column :prop="item.prop"
                           :label="item.label"
                           :width="item.width"
                           :key="item.prop">
          </el-table-column>
        </template>
        <el-table-column label="操作"
                         fixed="right">
          <template v-slot="scope">
            <el-button type="primary"
                       size="mini"
                       @click="toCheck(scope.row.id)">审核</el-button>
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  data() {
    return {
      loading: true,
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "待审核"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "审核不通过"
        }
      ],
      queryData: {
        houseName: "",
        brokerName: "",
        brokerPhone: "",
        timeSelect: "",
        isCheck: ""
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      elTabs: {
        activeName: "tab1",
        list: [
          { label: "全部", name: "tab1" },
          { label: "待审核", name: "tab2" },
          { label: "审核通过", name: "tab3" },
          { label: "审核失败", name: "tab4" }
        ]
      },
      tableDataColumn: [
        { prop: "communityName", label: "小区名称" },
        { prop: "comBuildingName", label: "楼栋号" },
        { prop: "buildIngHouses", label: "房间号" },
        { prop: "brokerName", label: "经纪人" },
        { prop: "brokerPhone", label: "电话" },
        { prop: "addTime", label: "提交时间" },
        { prop: "checkStatus", label: "状态" }
      ],
      tableData: []
    };
  },
  mounted() {
    this.queryAddFloorList(1);
  },
  methods: {
    remove() {
      Object.assign(this.$data, this.$options.data());
      this.queryAddFloorList(1);
    },
    queryTabData() {
      console.log(this, "111");
    },
    queryAddFloorListParams() {
      this.queryAddFloorList(1);
    },
    queryAddFloorList(currentPage) {
      var that = this;
      let params = { limit: that.pageJson.pageSize, page: currentPage };
      params.communityName = that.queryData.houseName;
      params.brokerName = that.queryData.brokerName;
      params.brokerPhone = that.queryData.brokerPhone;
      params.beginTime = that.queryData.timeSelect[0];
      params.endTime = that.queryData.timeSelect[1];
      params.isCheck = that.queryData.isCheck;

      console.log(params);
      this.$api
        .get({
          url: "/CommunityReplenish/getCommunityReplenishList",
          data: params,
          token: false
        })
        .then(e => {
          console.log(e.data);
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.totalCount;
            that.pageJson.currentPage = data.data.currPage;
            that.tableData = data.data.list;
          } else {
            console.log("查询新增房源列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询新增房源列表失败");
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    toCheck(id) {
      var that = this;
      that.$router.push({
        path: "/buySellSystem/checkFloorList",
        query: { id: id }
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

      this.queryAddFloorListParams();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryAddFloorList(val);
    },
    handleSizeChange(val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryAddFloorList(1);
    }
  }
};
</script>  