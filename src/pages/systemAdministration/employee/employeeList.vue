<style lang="less" scoped>
.query-cell {
  display: flex;
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
                     @click="queryDeptByParams">查询</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="toAddDeptPage">添加员工</el-button>
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
                         @click="distributeEvent(item.methosName,scope.row.id)"
                         v-for="(item,index) in getOpeBtns(scope.row.operation)"
                         :key="index">{{item.name}}</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>

<script>
import listPage from "@/components/listPage";
export default { 
  
  components: {
    listPage
  },
  
  data () {
    return {
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: ""
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 5 //每页条数
      },
      tableDataColumn: [
        { prop: "id", label: "员工id" },
        { prop: "perName", label: "员工名" },
        { prop: "loginUser", label: "登录名" },
        { prop: "deptName", label: "所在部门名称首拼" },
        { prop: "loginUser", label: "登录名" },
        { prop: "postName", label: "角色权限名" },
        { prop: "companyName", label: "公司名称" },
        { prop: "roleName", label: "岗位名" },
        { prop: "del", label: "是否有效: 0在职,1离职" },
      ],
      tableData: [],
    }
  },
  mounted () {
     this.queryDeptDatas(1);
  },
  methods: {
    queryDeptByParams () {
      this.queryDeptDatas(1);
    },
    queryDeptDatas (currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage ,del:0 };
      let that = this;
      if (this.queryData.keyWord != null) {
        params.keyWord = this.queryData.keyWord;
      }
      this.$api.post({
        url: '/employee/list',
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
          console.log("查询员工管理列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询员工管理列表失败");
        console.log(e);
      })
    },
    toAddemployeePage () {
      this.$router.push({ path: "/sys/addemployee" });
    },
    editemployee (id) {
      this.$router.push({ path: "/sys/editemployee", query: { id: id } });
    },
    delemployee (id){
     this.$api.post({
        url: '/employee/del/'+id,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          this.$alert('', '删除成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/sys/employeeList"});
        }
      }).catch((e) => {
        console.log("删除失败");
        console.log(e);
      })
    },
    distributeEvent (e, id) {
      this[e](id);
    },
    // querySubsidiary(DeptId){
    //   this.queryDeptDatas(1,DeptId);
    // },
    getOpeBtns (type) {
      let array = [
         { name: '编辑', isType: '1', methosName: 'editDeptDetail' },
         { name: '删除', isType: '1', methosName: 'delDeptDetail' },
      ]
      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      return array;
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryDeptDatas(1);
    },
    handleCurrentChange (val) {
      this.queryDeptDatas(val);
    },
    
  }
};
</script>