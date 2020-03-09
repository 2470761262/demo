<style lang="less" scoped>
.query-cell {
  display: flex;
  margin-bottom: 10px;
}
.elTree {
  width: 200px;
  margin-right: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;

  /deep/ .el-input {
    margin: 10px 0 10px;
  }
  float: left;
}
</style>
<template>
  <div>
    <list-page :parentData="$data"
               @handleSizeChange="handleSizeChange"
               @handleCurrentChange="handleCurrentChange">
      <template v-slot:top>
        <div class="query-cell">
          <el-input placeholder="登录名/姓名/公司/部门/岗位"
                    v-model="queryData.keyWord"
                    clearable>
            <template slot="prepend">关键字</template>
          </el-input>
          <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryEmployee()">查询</el-button>
<!--          <el-button type="primary"-->
<!--                     style="margin-left:10px"-->
<!--                     size="mini"-->
<!--                     @click="cancel()">返回</el-button>-->
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
        <el-table-column prop="operation"
                         label="操作"
                         fixed="right"
                         key="operation">
          <template v-slot="scope">
            <div v-if="scope.row.operation!=''">
              <el-button type="info"
                         size="mini"
                         @click="setAuthority(scope.row)">权限设置</el-button>
            </div>
          </template>
        </el-table-column>

      </template>
    </list-page>
  </div>
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
        keyWord: "",
        postId: null,
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: "accountID", label: "用户ID" },
        { prop: "perName", label: "用户名" },
        { prop: "deptName", label: "所在部门" },
        { prop: "postName", label: "角色权限" },
        { prop: "companyName", label: "公司" },
      ],
      tableData: [],
    }
  },
  mounted () {
    let id = JSON.parse(this.$route.query.id);
    this.queryData.postId = id;
    this.queryEmployeeData(1);
  },
  methods: {
    queryEmployee () {
      this.queryEmployeeData(1)
    },
    queryEmployeeData (currentPage) {
      let that = this;
      that.queryData.limit = that.pageJson.pageSize;
      that.queryData.page = currentPage;
      that.$api.post({
        url: '/employee/list/by/position',
        data: that.queryData,
        qs: true,
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
          console.log("查询用户管理列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询用户管理列表失败");
        console.log(e);
      })
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryEmployeeData(1);
    },
    handleCurrentChange (val) {
      this.queryEmployeeData(val);
    },
    setAuthority (row) {
      let that = this;
      //跳转页面
      let params = { "accountId": row.accountID, "postId": that.queryData.postId };
      console.log(params, "xxx");
      that.$router.push({ path: '/sys/authority/setAuthority', query: params });
    },
    cancel () {
      let that = this;
      //跳转页面
      that.$router.push({ path: '/sys/positionManager' });
    }
  }
};
</script>
