<style lang="less" scoped>
.query-cell {
  display: flex;
}
</style>
<template>
  <list-page :parentData="$data"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <div class="query-cell">
        <el-input placeholder="游客昵称"
                  v-model="queryData.keyWord"
                  clearable>
          <template slot="prepend">昵称</template>
        </el-input>
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="queryVisitorByParams">查询</el-button>
      </div>
    </template>
    <template v-slot:tableColumn="cell">
      <template v-for="item in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </template>
      <el-table-column prop="headImgUrl"
                       label="用户头像"
                       width="90">
        <!-- 图片的显示 -->
        <template slot-scope="scope">
          <img v-if="scope.row.headImgUrl"
               :src="scope.row.headImgUrl"
               width="50"
               height="50" />
          <img v-else
               :src="'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4034879928,1229713244&fm=26&gp=0.jpg'"
               width="50"
               height="50" />
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
      loading: false, //控制表格加载动画提示
      queryData: {
        newsTitle: ""
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10//每页条数
      },
      tableDataColumn: [
        { prop: "accountId", label: "编号" },
        { prop: "perName", label: "昵称" },
        { prop: "telephone", label: "电话" },
        // { prop: "openId", label: "OpenId" },
        { prop: "registerTime", label: "注册时间" },
        { prop: "loginDateTime", label: "登录时间" }
      ],
      tableData: [],
    }
  },
  mounted () {
    this.queryVisitorDatas(1);
  },
  methods: {
    queryVisitorByParams () {
      this.queryVisitorDatas(1);
    },
    queryVisitorDatas (currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.newsTitle != null) {
        params.keyWord = this.queryData.keyWord;
      }
      this.$api.post({
        url: '/visitorManager/listVisitors',
        data: params,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.pageJson.total = result.data.totalCount;
          this.pageJson.currentPage = result.data.currPage;
          this.tableData = result.data.list;
        } else {
          console.log("查询游客列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询游客管理列表失败");
        console.log(e);
      })
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryVisitorDatas(1);
    },
    handleCurrentChange (val) {
      this.queryVisitorDatas(val);
    }
  }
};
</script>
