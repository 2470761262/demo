<style lang="less" scoped>
.query-cell {
  padding: 15px 0;
  display: flex;
  align-items: center;
  .query-right {
    flex: 1;
    text-align: right;
    padding-right: 20px;
    /deep/.el-input {
      width: auto;
    }
  }
}
.page-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <div class="page-content">
    <list-page
      :parentData="$data"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:top>
        <div class="query-cell">
          <div class="query-right">
            <el-input
              placeholder="登录名/姓名/公司/部门/岗位"
              size="small"
              v-model="queryData.keyWord"
              clearable
            >
            </el-input>
            <el-button type="primary" size="mini" @click="queryEmployee()"
              >查询</el-button
            >
          </div>
          <!--          <el-button type="primary"-->
          <!--                     style="margin-left:10px"-->
          <!--                     size="mini"-->
          <!--                     @click="cancel()">返回</el-button>-->
        </div>
      </template>

      <template v-slot:tableColumn="cell">
        <template v-for="item in cell.tableData">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :key="item.prop"
          ></el-table-column>
        </template>
        <el-table-column label="操作" fixed="right">
          <template v-slot="scope">
            <div v-if="scope.row.operation != ''">
              <el-button
                type="primary"
                size="mini"
                @click="setAuthority(scope.row)"
                >权限设置</el-button
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>

<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import getToken from "@/minxi/getUrlToken";
export default {
  mixins: [getToken],
  components: {
    listPage
  },
  data() {
    return {
      sidebarFlag: false,
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: "",
        postId: null
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
        { prop: "id", label: "用户ID" },
        { prop: "perName", label: "用户名" },
        { prop: "deptName", label: "所在部门" },
        { prop: "postName", label: "角色权限" },
        { prop: "companyName", label: "公司" }
      ],
      tableData: []
    };
  },
  mounted() {
    let id = JSON.parse(this.$route.query.id);
    this.queryData.postId = id;
    this.queryEmployeeData(1);
  },
  methods: {
    queryEmployee() {
      this.queryEmployeeData(1);
    },
    queryEmployeeData(currentPage) {
      let that = this;
      that.queryData.limit = that.pageJson.pageSize;
      that.queryData.page = currentPage;
      that.$api
        .post({
          url: "/employee/list/by/position",
          data: that.queryData,
          qs: true
        })
        .then(e => {
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
        })
        .catch(e => {
          console.log("查询用户管理列表失败");
          console.log(e);
        });
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryEmployeeData(1);
    },
    handleCurrentChange(val) {
      this.queryEmployeeData(val);
    },
    setAuthority(row) {
      let that = this;
      //跳转页面
      let params = { accountId: row.id, postId: that.queryData.postId };
      console.log(params, "xxx");
      that.$router.push({ path: "/sys/authority/setAuthority", query: params });
    },
    cancel() {
      let that = this;
      //跳转页面
      that.$router.push({ path: "/sys/positionManager" });
    }
  }
};
</script>
