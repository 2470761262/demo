<style lang="less" scoped>
.query-cell {
  padding: 15px 0;
  display: flex;
  align-items: center;
  .el-select {
    margin-left: 10px;
  }
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
</style>
<template>
  <div class="page-content">
    <list-page
      :parentData="$data"
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
              check-strictly
              :props="defaultProps"
              @check-change="checkChange"
              @check="treeCheck"
              :highlight-current="true"
              :filter-node-method="filterNode"
            ></el-tree>
          </div>
        </div>
      </template>
      <template v-slot:top>
        <div class="query-cell">
          <el-button type="primary" size="mini" @click="toAddDeptPage(0)">添加同级部门</el-button>
          <el-button type="primary" size="mini" @click="toAddDeptPage(1)">添加子级部门</el-button>
          <!-- <el-button type="primary"
                     size="mini"
                     @click="queryDeptByIsLocked(0)">查询锁定部门</el-button>
          <el-button type="primary"
                     size="mini"
          @click="queryDeptByIsLocked(1)">查询未锁定部门</el-button>-->
          <el-select v-model="selectTag" placeholder="全部" size="mini" @change="SelectTag">
            <el-option
              v-for="item in SelectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="query-right">
            <el-input placeholder="部门名称" size="small" v-model="queryData.DeptName" clearable></el-input>
            <el-button type="primary" size="mini" @click="queryDeptByParams">查询</el-button>
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
        <el-table-column label="操作" fixed="right" width="300">
          <template v-slot="scope">
            <div v-if="scope.row.operation!=''">
              <el-button
                type="primary"
                size="mini"
                @click="distributeEvent(item.methosName,scope.row)"
                v-for="(item,index) in getOpeBtns(scope.row.operation)"
                :key="index"
              >{{item.name}}</el-button>
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
  mixins: [getMenuRid, getToken],

  components: {
    listPage
  },
  data() {
    return {
      sidebarFlag: false,
      loading: false, //控制表格加载动画提示
      department: {},
      queryData: {
        DeptName: "",
        del: 0,
        isLocked: null,
        flag: false,
        type: null
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: "deptName", label: "部门名", width: "160px" },
        { prop: "perName", label: "负责人", width: "160px" },
        { prop: "joinType", label: "加入类型", width: "120px" },
        { prop: "deptType", label: "部门类型", width: "120px" },
        { prop: "isLocked", label: "部门状态", width: "150px" },
        { prop: "address", label: "部门地址" }
      ],
      tableData: [],
      treeData: [],
      filterText: "",
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      selectTag: "",
      SelectOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "锁定"
        },
        {
          value: "1",
          label: "正常"
        }
      ]
    };
  },
  mounted() {
    //读取公司，部门数据
    this.$api
      .post({
        url: "/department/departmentTree",
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
      });
    this.queryDeptDatas(1);
  },
  methods: {
    queryDeptByParams() {
      this.queryData.isLocked = null;
      this.queryDeptDatas(1);
    },
    queryDeptDatas(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.DeptName != null) {
        params.deptName = this.queryData.DeptName;
      }
      if (this.queryData.isLocked != null) {
        params.isLocked = this.queryData.isLocked;
      }
      params.del = this.queryData.del;
      this.$api
        .post({
          url: "/department/departmentList",
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
              switch (result.data.list[i].isLocked) {
                case 1:
                  result.data.list[i].isLocked = "正常";
                  break;
                case 0:
                  result.data.list[i].isLocked = "锁定";
                  break;
              }
              switch (result.data.list[i].deptType) {
                case 1:
                  result.data.list[i].deptType = "综合";
                  break;
                case 2:
                  result.data.list[i].deptType = "业务";
                  break;
                case 3:
                  result.data.list[i].deptType = "行政";
                  break;
                case 4:
                  result.data.list[i].deptType = "联营";
                  break;
              }
              switch (result.data.list[i].joinType) {
                case 0:
                  result.data.list[i].joinType = "";
                  break;
                case 1:
                  result.data.list[i].joinType = "直营";
                  break;
                case 2:
                  result.data.list[i].joinType = "加盟";
                  break;
                case 3:
                  result.data.list[i].joinType = "联营";
                  break;
              }
            }
            this.pageJson.total = result.data.totalCount;
            this.pageJson.currentPage = result.data.currPage;
            this.tableData = result.data.list;
          } else {
            console.log("查询部门管理列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询部门管理列表失败");
          console.log(e);
        });
    },
    queryDeptByIsLocked(isLocked) {
      this.queryData.isLocked = isLocked;
      this.queryDeptDatas(1);
    },
    toAddDeptPage(saveType) {
      if (this.queryData.flag) {
        if (saveType == 0) {
          if (this.queryData.type == 1) {
            console.log("部门同级");
            console.log(this.department.deptParentID);
            console.log(this.department.coId);
            this.$router.push({
              path: "addDeptManage",
              query: {
                deptParentID: this.department.deptParentID,
                ParentId: this.department.coId
              }
            });
            this.department = null;
          } else if (this.queryData.type == 0) {
            this.$alert("", "请选择一个部门节点", {
              dangerouslyUseHTMLString: false
            });
          }
        } else if (saveType == 1) {
          if (this.queryData.type == 1) {
            this.$router.push({
              path: "addDeptManage",
              query: {
                deptParentID: this.department.id,
                ParentId: this.department.coId
              }
            });
            this.department = null;
          } else if (this.queryData.type == 0) {
            this.$router.push({
              path: "addDeptManage",
              query: { ParentId: this.company.id }
            });
            this.company = null;
          }
        }
      } else {
        this.$alert("", "请选择一个节点", {
          dangerouslyUseHTMLString: false
        });
      }
    },
    editDeptDetail(row) {
      this.$router.push({ path: "/sys/editDeptDetail", query: { id: row.id } });
    },
    distributeEvent(e, row) {
      console.log(row);
      this[e](row);
    },
    delDeptDetail(row) {
      this.handle(row.id, 1, "del", row.deptName);
    },
    lockDeptDetail(row) {
      this.handle(row.id, 0, "isLocked", row.deptName);
    },
    unlockDeptDetail(row) {
      this.handle(row.id, 1, "isLocked", row.deptName);
    },
    handle(id, upValue, upType, deptName) {
      let params = {
        id: id,
        upValue: upValue,
        upType: upType,
        deptName: deptName
      };
      this.$api
        .post({
          url: "/department/handle",
          data: params,
          token: true,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.$alert("", result.message, {
              dangerouslyUseHTMLString: false
            });
            this.$router.push({ path: "/sys/deptManageList" });
          } else {
            this.$alert("", "该公司有下级公司或部门,操作失败!!!", {
              dangerouslyUseHTMLString: false
            });
          }
        })
        .catch(e => {
          console.log("删除失败");
          console.log(e);
        });
    },
    getOpeBtns(type) {
      let array = [
        { name: "编辑", isType: "1", methosName: "editDeptDetail" },
        { name: "删除", isType: "1", methosName: "delDeptDetail" },
        { name: "锁定", isType: "1", methosName: "lockDeptDetail" },
        { name: "解锁", isType: "1", methosName: "unlockDeptDetail" }
      ];
      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      return array;
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryDeptDatas(1);
    },
    handleCurrentChange(val) {
      this.queryDeptDatas(val);
    },
    checkChange(e, data, childData) {
      console.log(e, data, childData, "checkChange");
    },
    treeCheck(e, data) {
      this.queryData.flag = true;
      this.queryData.type = e.type;
      if (e.type == 0) {
        this.$api
          .get({
            url: "/company/" + e.businessId,
            token: false
          })
          .then(e => {
            console.log(e.data);
            let result = e.data;
            if (result.code == 200) {
              console.log(result.message);
              console.log(result.data);
              this.company = result.data;
            } else {
              console.log("查询公司详情结果：" + result.message);
              alert(result.message);
            }
          })
          .catch(e => {
            console.log("查询公司详情失败");
            console.log(e);
          });
      } else if (e.type == 1) {
        this.$api
          .get({
            url: "/department/" + e.businessId,
            token: false
          })
          .then(e => {
            console.log(e.data);
            let result = e.data;
            if (result.code == 200) {
              console.log(result.message);
              console.log(result.data);
              this.department = result.data;
            } else {
              console.log("查询部门详情结果：" + result.message);
              alert(result.message);
            }
          })
          .catch(e => {
            console.log("查询部门详情失败");
            console.log(e);
          });
      }

      console.log(e, data, "check..");
    },
    //树输入筛选
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    SelectTag() {
      this.queryDeptDatas(1);
    }
  }
};
</script>
