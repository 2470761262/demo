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
.elTree {
  box-sizing: border-box;
  width: 230px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .elTree-scroll {
    padding: 10px;
    height: 0;
    flex: 1 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--color--primary);
      border-radius: 50px;
    }
    .scroll-content-tag {
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }
  /deep/ .el-input {
    margin: 10px 0 10px;
  }
}
.no-center {
  text-align: left;
}
</style>

<template>
  <div class="page-content">
    <list-page
      highlight-current-row
      :parentData="$data"
      :dblclick="true"
      @current-change="handleChange"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:left>
        <div class="elTree">
          <div class="elTree-scroll">
            <el-tree
              ref="tree2"
              :data="treeData"
              :default-expanded-keys="[1]"
              node-key="nodeId"
              show-checkbox
              :props="defaultProps"
              @check-change="checkChange"
              :highlight-current="true"
              auto-expand-parent
              check-strictly
              v-loading="treeLoading"
            ></el-tree>
          </div>
        </div>
      </template>
      <template v-slot:top>
        <div class="query-cell">
          <el-button type="primary" size="mini" @click="toAddEmployeePage"
            >添加用户</el-button
          >
          <div class="query-right">
            <el-select
              v-model="queryData.isLocked"
              @change="queryEmployeeDatas(1)"
              clearable
              size="small"
              placeholder="情况过滤"
            >
              <el-option key="1" label="正常" value="1" />
              <el-option key="0" label="锁定" value="0" />
              <el-option key="2" label="异常" value="2" />
            </el-select>
            <el-select
              v-model="queryData.del"
              @change="queryEmployeeDatas(1)"
              clearable
              size="small"
              placeholder="状态过滤"
            >
              <el-option key="0" label="在职" value="0" />
              <el-option key="1" label="离职" value="1" />
              <el-option key="2" label="离职待审核" value="2" />
            </el-select>
            <el-input
              placeholder="登录名/姓名/公司/部门/岗位"
              v-model="queryData.keyWord"
              size="small"
              class="keyWordInput"
            >
              <!-- <el-select v-model="queryData.keyWordType" slot="prepend" class="preKeyWordSelect" placeholder="请选择">
              <el-option label="登录名" value="0"></el-option>
              <el-option label="姓名" value="1"></el-option>
              <el-option label="公司" value="2"></el-option>
              <el-option label="部门" value="3"></el-option>
              <el-option label="岗位" value="4"></el-option>
              </el-select>-->
            </el-input>
            <el-button type="primary" size="mini" @click="queryEmployeeByParams"
              >查询</el-button
            >
          </div>
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
            <div class="no-center">
              <el-button
                type="primary"
                size="mini"
                @click="distributeEvent(item.methodName, scope.row.id)"
                v-for="(item, index) in getOpeBtns(
                  scope.row.del,
                  scope.row.isLocked
                )"
                :key="index"
                >{{ item.name }}</el-button
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </list-page>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <div class="left-input-container">
        <span>离职时间</span>
        <el-input
          type="date"
          placeholder="birthday"
          v-model="leaveTime"
        ></el-input>
        <span>离职原因</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="leaveMemo"
          maxlength="100"
          show-word-limit
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="delAccount()">确 定</el-button>
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
      sidebarFlag: false,
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: "",
        keyWordType: "登录名",
        isLocked: null, //0 查询锁定,1 查询未锁定,2 查询异常用户
        del: 0 //0 查询在职用户,1 查询离职用户,2 查询待离职用户
      },
      leaveTime: "",
      leaveMemo: "",
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
        { prop: "del", label: "状态", width: "80px" },
        { prop: "isLocked", label: "情况", width: "80px" }
      ],
      tableData: [],
      treeData: [],
      dialogVisible: false,
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      checkedId: null,
      checkedType: null,
      id: 0,
      treeLoading: true
    };
  },
  mounted() {
    //读取公司，部门数据
    this.$api
      .post({
        url: "/sys/tree/unit/user",
        token: false
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.treeData = result.data;
        } else {
          console.log("载入结果" + +result.message);
          alert(result.message);
        }
      })
      .catch(e => {
        console.log("读取失败");
        console.log(e);
      })
      .finally(e => {
        this.treeLoading = false;
      });
    this.queryData.isLocked = null;
    this.queryData.del = null;
    this.queryEmployeeDatas(1);
  },
  methods: {
    queryEmployeeByParams() {
      this.queryEmployeeDatas(1);
    },
    queryEmployeeDatas(currentPage) {
      this.loading = true;
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
      if (this.checkedId != null) {
        params.checkedId = this.checkedId;
      }
      if (this.checkedType != null) {
        params.checkedType = this.checkedType;
      }
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
                  result.data.list[i].del = "离职待审核";
                  break;
                case 3:
                  result.data.list[i].del = "待审核";
                  break;
              }
              if (result.data.list[i].isLocked == 1) {
                result.data.list[i].isLocked = "正常";
              } else if (result.data.list[i].isLocked == 2) {
                result.data.list[i].isLocked = "异常";
              } else {
                result.data.list[i].isLocked = "锁定";
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
        })
        .finally(e => {
          this.loading = false;
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
    },
    delAccount() {
      let that = this;
      if (this.leaveTime != null && this.leaveMemo != "") {
        this.dialogVisible = false;
        this.operation(that.id, "del", 1, function(result) {
          let index = that.tableData.findIndex(item => {
            return item.id == that.id;
          });
          if (index > -1) {
            console.log("离职了用户");
            that.tableData[index].del = "离职待审核";
          }
        });
      } else {
        this.$alert("", "请填写离职时间及原因!!!", {
          dangerouslyUseHTMLString: false
        });
      }
    },
    handleChange(row) {
      // console.log(row);
      // this.$router.push({ path: "/sys/editemployee", query: { id: row.id } });
      //this.employeeEntity = row;
    },
    distributeEvent(e, id) {
      this[e](id);
      console.log(id);
    },
    lockEmployee(id) {
      let that = this;
      this.$confirm("确定锁定该用户吗？", "友情提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          that.operation(id, "locked", 0, function(result) {
            let index = that.tableData.findIndex(item => {
              return item.id == id;
            });
            if (index > -1) {
              console.log("锁定了用户");
              that.tableData[index].isLocked = "锁定";
            }
          });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: "取消锁定"
          });
        });
    },
    unLockEmployee(id) {
      let that = this;
      this.$confirm("确定解锁该用户吗？", "友情提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          that.operation(id, "locked", 1, function(result) {
            let index = that.tableData.findIndex(item => {
              return item.id == id;
            });
            if (index > -1) {
              console.log("解锁了用户");
              that.tableData[index].isLocked = "正常";
            }
          });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: "取消解锁"
          });
        });
    },
    delEmployee(id) {
      this.dialogVisible = true;
      this.id = id;
    },

    resumeEmployee(id) {
      let that = this;
      this.$confirm("确定复职该用户吗？", "友情提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          that.operation(id, "restoration", 0, function(result) {
            let index = that.tableData.findIndex(item => {
              return item.id == id;
            });
            if (index > -1) {
              console.log("复职了用户");
              that.tableData[index].del = "待审核";
            }
          });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: "取消复职"
          });
        });
    },
    getOpeBtns(del, locked) {
      console.log(del, "【【【【【1】】】】】");
      console.log(locked, "【【【【【2】】】】】");
      let array = [
        {
          name: "编辑",
          delFilter: ["在职"],
          lockFilter: ["正常"],
          methodName: "editEmployee"
        },
        {
          name: "离职",
          delFilter: ["在职", "离职待审核"],
          lockFilter: ["正常"],
          methodName: "delEmployee"
        },
        {
          name: "复职",
          delFilter: ["离职", "离职待审核"],
          lockFilter: ["正常", "锁定"],
          methodName: "resumeEmployee"
        },
        {
          name: "锁定",
          delFilter: ["在职"],
          lockFilter: ["正常"],
          methodName: "lockEmployee"
        },
        {
          name: "解锁",
          delFilter: ["在职", "离职", "离职待审核"],
          lockFilter: ["锁定"],
          methodName: "unLockEmployee"
        }
      ];
      var newArr = array.filter(
        item => item.delFilter.includes(del) && item.lockFilter.includes(locked)
      );
      return newArr;
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryEmployeeDatas(1);
    },
    handleCurrentChange(val) {
      this.queryEmployeeDatas(val);
    },
    operation(id, upType, upValue, callBack) {
      let params = { perId: id, upType: upType, upValue: upValue };
      params.leaveMemo = this.leaveMemo;
      params.leaveTime = this.leaveTime;
      const loading = this.$loading({
        lock: true,
        text: "请等待..",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$api
        .post({
          url: "/employee/operation",
          data: params,
          token: true,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          loading.close();
          if (result.code == 200) {
            this.$message({ message: result.message });
            callBack(result);
          } else {
            this.$alert("", "人员未审核," + result.message + "!!!", {
              dangerouslyUseHTMLString: false
            });
          }
        })
        .catch(e => {
          loading.close();
          console.log("失败");
          console.log(e);
        });
    },
    switchUser() {
      let params = {};
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
    },
    checkChange(data, checked, node) {
      this.loading = true;
      if (checked == true) {
        this.checkedId = data.businessId;
        this.checkedType = data.type;
        this.$refs.tree2.setCheckedNodes([data]);
        console.log(this.checkedId, this.checkedType);
        this.queryEmployeeDatas(1);
      } else {
        this.checkedId = null;
        this.checkedType = null;
      }
    }
  }
};
</script>
