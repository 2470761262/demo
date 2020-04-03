<style lang="less" scoped>
.formItem {
  margin: 10px;
  display: inline-block;
}
</style>
<template>
  <div>
    <list-page
      v-show="!showForm"
      :parentData="$data"
      @queryTabData="queryTabData"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:top>
        <div class="page-form-inline budingMarinSet" style="margin: 10px;">
          <el-input style="width: 400px;" placeholder="功能点或内容搜索" v-model="queryData.keyword">
            <template slot="prepend">关键字搜索</template>
          </el-input>

          <el-date-picker
            v-model="queryData.time"
            type="daterange"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
            <template slot="prepend">日期选择</template>
          </el-date-picker>

          <el-button type="primary" style="margin-left:10px;" @click="queryAddFloorListParams">查询</el-button>
        </div>
      </template>

      <template #tableColumn="cell">
        <template v-for="(item) in cell.tableData">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :formatter="item.formatClientType"
            :key="item.prop"
          ></el-table-column>
        </template>
        <el-table-column label="反馈图片" width="200px">
          <template v-slot="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 40px; height: 40px"
                v-for="(iitem,index) in scope.row.pics"
                :src="iitem"
                :preview-src-list="scope.row.pics"
                :key="index"
              ></el-image>
            </div>
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>
<script>
import listPage from "@/components/listPage";
import getToken from "@/minxi/getUrlToken";
export default {
  mixins: [getToken],
  components: {
    listPage
  },
  data() {
    return {
      loading: false,
      showForm: false,
      queryData: {
        keyword: ""
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        {
          prop: "accountName",
          label: "反馈人名称",
          width: "100px",
          formatter: row => row.accountName
        },
        {
          prop: "functionPoint",
          label: "功能点",
          width: "200px",
          formatter: row => row.functionPoint
        },
        { prop: "suggest", label: "反馈内容", formatter: row => row.suggest },
        {
          prop: "addTime",
          label: "反馈时间",
          width: "200px",
          formatter: row => row.addTime
        }
      ],
      tableData: [],
      positionObj: {},
      saveType: null
    };
  },
  mounted() {
    this.queryAddFloorList(1);
  },
  methods: {
    queryTabData() {
      console.log(this, "111");
    },
    //查询按钮
    queryAddFloorListParams() {
      //debugger;
      this.queryAddFloorList(1);
    },
    //查询数据
    queryAddFloorList(currentPage) {
      var that = this;
      let params = { limit: that.pageJson.pageSize, page: currentPage };
      params.keyword = that.queryData.keyword;
      if (that.queryData.time) {
        params.beginTime = that.queryData.time[0];
        params.endTime = that.queryData.time[1];
      }
      console.log(params);
      this.$api
        .post({
          url: "/sys/onlineFeedback",
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
            console.log("查询反馈列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询反馈列表失败");
          console.log(e);
        });
    },
    //取消
    cancel() {
      this.positionObj = {};
      this.showForm = false;
    },
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
