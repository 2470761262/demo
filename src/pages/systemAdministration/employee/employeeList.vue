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
                     @click="queryEmployeeByParams">查询</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="toAddEmployeePage">添加员工</el-button>
          <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryEmployeeByIsLocked(0)">查询锁定员工</el-button>
          <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryEmployeeByIsLocked(1)">查询正常员工</el-button>
          <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryEmployeeByIsLocked(2)">查询异常员工</el-button>
          <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryEmployeeByDel(0)">查询在职员工</el-button>
          <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryEmployeeByDel(1)">查询离职员工</el-button>
          <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryEmployeeByDel(2)">查询待离职员工</el-button>
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
        isLocked:null, //0 查询锁定,1 查询未锁定,2 查询异常用户
        del:0 ,//0 查询在职员工,1 查询离职员工,2 查询待离职员工
        type:0 //0 内部  1 游客
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
        { prop: "deptName", label: "所在部门" },
        { prop: "postName", label: "角色权限" },
        { prop: "companyName", label: "公司" },
        { prop: "roleName", label: "岗位名" },
        { prop: "del", label: "是否有效: 0在职,1离职", },
      ],
      tableData: [],
    }
  },
  mounted () {
     this.queryData.isLocked = null;
     this.queryData.del = null;
     this.queryEmployeeDatas(1);
  },
  methods: {
    queryEmployeeByIsLocked(isLocked){
      this.queryData.isLocked = isLocked;
      this.queryData.del = 0;
      this.queryEmployeeDatas(1)
    },
    queryEmployeeByDel(del){
     this.queryData.isLocked = null;
     this.queryData.del = del;
     this.queryEmployeeDatas(1)
    },
    queryEmployeeByParams () {
      this.queryEmployeeDatas(1);
    },
    queryEmployeeDatas (currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.keyWord != null) {
        params.keyWord = this.queryData.keyWord;
      }
      if (this.queryData.isLocked != null) {
        params.isLocked = this.queryData.isLocked;
      }
      if (this.queryData.del != null) {
        params.del = this.queryData.del;
      }
        params.type = this.queryData.type;
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
          for (var i = 0; i < result.data.list.length; i++) {
            switch (result.data.list[i].del) {
              case 0:
                result.data.list[i].del = "在职";
                break;
              case 1:
                result.data.list[i].del = "离职";
                break;
              case 2:
                result.data.list[i].del = "未带看锁定";
                break;
              case 3:
                result.data.list[i].del = "未审核";
                break;
            }
          }
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
    toAddEmployeePage () {
      this.$router.push({ path: "/sys/addemployee" });
    },
    editEmployee (id) {
      this.$router.push({ path: "/sys/editemployee", query: { id: id } });
    },
    delEmployee (id, del) {
      this.$api.post({
        url: '/employee/del/' + id + '?del=' + del,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          this.$alert('', '成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/sys/employeeList" });
        }
      }).catch((e) => {
        console.log("失败");
        console.log(e);
      })
    },
    distributeEvent (e, id) {
      this[e](id);
    },
    resumeDelEmployee(id){
      this.delEmployee(id,0);
    },
    leaveDelEmployee(id){
      this.delEmployee(id,1);
    },
    getOpeBtns (type) {
      let array = [
         { name: '编辑', isType: '1', methosName: 'editEmployee' },
         { name: '离职', isType: '1', methosName: 'leaveDelEmployee' },
         { name: '复职', isType: '1', methosName: 'resumeDelEmployee' },
      ]
      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      return array;
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryEmployeeDatas(1);
    },
    handleCurrentChange (val) {
      this.queryEmployeeDatas(val);
    },

  }
};
</script>
