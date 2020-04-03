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
    <list-page
      highlight-current-row
      :parentData="$data"
      @current-change="handleChange"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:top>
        <div class="query-cell">
          <el-input placeholder="登录名/姓名/公司/部门/岗位" v-model="queryData.keyWord" clearable>
            <template slot="prepend">关键字</template>
          </el-input>
          <el-button
            type="primary"
            style="margin-left:10px"
            size="mini"
            @click="queryEmployeeByParams"
          >查询</el-button>
          <el-button type="primary" size="mini" @click="toAddEmployeePage">添加用户</el-button>
          <el-button
            type="primary"
            style="margin-left:10px"
            size="mini"
            @click="queryEmployeeByIsLocked(0)"
          >查询锁定用户</el-button>
          <el-button
            type="primary"
            style="margin-left:10px"
            size="mini"
            @click="queryEmployeeByIsLocked(1)"
          >查询正常用户</el-button>
          <el-button
            type="primary"
            style="margin-left:10px"
            size="mini"
            @click="queryEmployeeByIsLocked(2)"
          >查询异常用户</el-button>
          <el-button
            type="primary"
            style="margin-left:10px"
            size="mini"
            @click="queryEmployeeByDel(0)"
          >查询在职用户</el-button>
          <el-button
            type="primary"
            style="margin-left:10px"
            size="mini"
            @click="queryEmployeeByDel(1)"
          >查询离职用户</el-button>
          <el-button
            type="primary"
            style="margin-left:10px"
            size="mini"
            @click="queryEmployeeByDel(2)"
          >查询待离职用户</el-button>
          <!-- <el-button  icon="el-icon-refresh" title="切换用户" circle @click="switchUser()"></el-button> -->
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
        <el-table-column prop="operation" label="操作" fixed="right" key="operation">
          <template v-slot="scope">
            <div v-if="scope.row.operation!=''">
              <el-button
                type="primary"
                size="mini"
                @click="distributeEvent(item.methosName,scope.row.id)"
                v-for="(item,index) in getOpeBtns(scope.row.operation)"
                :key="index"
              >{{item.name}}</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </list-page>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <div class="left-input-container">
        <span>离职时间</span>
        <el-input type="date" placeholder="birthday" v-model="employeeEntity.leaveTime"></el-input>
        <span>离职原因</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="employeeEntity.leaveMemo"
          maxlength="100"
          show-word-limit
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </el-dialog>
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
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: "",
        isLocked: null, //0 查询锁定,1 查询未锁定,2 查询异常用户
        del: 0, //0 查询在职用户,1 查询离职用户,2 查询待离职用户
        type: 0 //0 内部  1 游客
      },
      employeeEntity: { accountId: null, leaveTime: null, leaveMemo: null },
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
        { prop: "perName", label: "姓名", width: "120px" },
        { prop: "loginUser", label: "登录名", width: "150px" },
        { prop: "deptName", label: "部门", width: "180px" },
        { prop: "postName", label: "角色", width: "150px" },
        { prop: "companyName", label: "公司", width: "180px" },
        { prop: "roleName", label: "岗位", width: "150px" },
        { prop: "del", label: "状态", width: "80px" }
      ],
      tableData: [],

      dialogVisible: false
    };
  },
  mounted() {
    this.queryData.isLocked = null;
    this.queryData.del = null;
    this.queryEmployeeDatas(1);
  },
  methods: {
    queryEmployeeByIsLocked(isLocked) {
      this.queryData.isLocked = isLocked;
      this.queryData.del = 0;
      this.queryEmployeeDatas(1);
    },
    queryEmployeeByDel(del) {
      this.queryData.isLocked = null;
      this.queryData.del = del;
      this.queryEmployeeDatas(1);
    },
    queryEmployeeByParams() {
      this.queryEmployeeDatas(1);
    },
    queryEmployeeDatas(currentPage) {
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
      this.$api
        .post({
          url: "/employee/employeeList",
          data: params,
          token: false,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
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
            console.log("查询用户管理列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询用户管理列表失败");
          console.log(e);
        });
    },
    toAddEmployeePage() {
      this.$router.push({ path: "/sys/addemployee" });
    },
    editEmployee(id) {
      this.$router.push({ path: "/sys/editemployee", query: { id: id } });
    },
    handleClose() {
      this.dialogVisible = false;
      this.employeeEntity = {};
    },
    save() {
      this.dialogVisible = false;
      let params = this.employeeEntity;
      this.$api
        .post({
          url: "/employee/del",
          data: params,
          token: true,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            this.$alert("", "成功", {
              dangerouslyUseHTMLString: false
            });
            this.$router.push({ path: "/sys/employeeList" });
            console.log(result.data);
            this.$message({ message: result.message });
            this.employeeEntity = {};
          }
        })
        .catch(e => {
          console.log("失败");
          console.log(e);
        });
    },
    handleChange(row) {
      console.log(row);
      this.$router.push({ name: "employeedetails", params: { id: row.id } });

      this.employeeEntity = row;
      console.log(this.employeeEntity, row.id);
    },
    distributeEvent(e, id) {
      this[e](id);
      console.log(id);
    },
    lockEmployee(id) {
      this.operation(id, "locked", 0);
    },
    unLockEmployee(id) {
      this.operation(id, "locked", 1);
    },
    delEmployee(id) {
      this.dialogVisible = true;
      if (
        this.employeeEntity.leaveTime != null &&
        this.employeeEntity.leaveMemo != ""
      ) {
        this.operation(id, "del", 1);
      } else {
        this.$alert("", "请填写离职时间及原因!!!", {
          dangerouslyUseHTMLString: false
        });
      }
    },

    resumeEmployee(id) {
      this.operation(id, "del", 0);
    },
    getOpeBtns(type) {
      let array = [
        { name: "编辑", isType: "1", methosName: "editEmployee" },
        { name: "离职", isType: "1", methosName: "delEmployee" },
        { name: "复职", isType: "1", methosName: "resumeEmployee" },
        { name: "锁定", isType: "1", methosName: "lockEmployee" },
        { name: "解锁", isType: "1", methosName: "unLockEmployee" }
      ];
      return array;
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryEmployeeDatas(1);
    },
    handleCurrentChange(val) {
      this.queryEmployeeDatas(val);
    },
    operation(id, UpType, upValue) {
      let params = { accountId: id, UpType: UpType, upValue: upValue };
      if (
        this.employeeEntity.leaveMemo != null &&
        this.employeeEntity.leaveMemo != ""
      ) {
        params.leaveMemo = this.employeeEntity.leaveMemo;
        params.leaveTime = this.employeeEntity.leaveTime;
      }
      this.$api
        .post({
          url: "/employee/operation",
          data: params,
          token: true,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            this.$alert("", "成功", {
              dangerouslyUseHTMLString: false
            });
            this.$router.push({ path: "/sys/employeeList" });
            console.log(result.data);
            this.$message({ message: result.message });
          } else {
            this.$alert("", "人员未审核," + result.message + "!!!", {
              dangerouslyUseHTMLString: false
            });
          }
        })
        .catch(e => {
          console.log("失败");
          console.log(e);
        });
    },
    switchUser() {
      if (this.employeeEntity.id != null && this.employeeEntity.id != "") {
        params.newPerId = this.employeeEntity.id;
        this.$api
          .post({
            url: "/employee/insertRATbl",
            data: params,
            token: false,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
          })
          .then(e => {
            let result = e.data;
            if (result.code == 200) {
              console.log(result.message);
              this.$alert("", "成功", {
                dangerouslyUseHTMLString: false
              });

              this.$router.push({ path: "/sys/employeeList" });
            } else {
              this.$alert("", result.message + "!!!", {
                dangerouslyUseHTMLString: false
              });
            }
          })
          .catch(e => {
            console.log("失败");
            console.log(e);
          });
      }
    }
  }
};
</script>
