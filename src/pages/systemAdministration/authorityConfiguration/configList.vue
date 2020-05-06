<style lang="less" scoped>
.query-cell {
  display: flex;
  margin-bottom: 10px;
}

.el-table .warning-row {
  color: oldlace;
}

.el-table .success-row {
  color: #f0f9eb;
}
/deep/.el-table__body {
  .el-table_1_column_1 {
    cursor: pointer;
  }
}
</style>

<template>
  <list-page
    style="width: 100%"
    row-key="keyId"
    stripe
    ref="listTable"
    headerClass
    cellClass
    @expand-change="expandChange"
    :row-style="tableRowClassName"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    :parentData="$data"
    @cell-click="rowClick"
    :expand-row-keys="expandKey"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  >
    <template v-slot:top>
      <div class="query-cell">
        <el-input
          placeholder="关键字搜索"
          @keydown.native.enter="queryCompanyByParams"
          v-model="queryData.keyword"
          clearable
        >
          <template slot="prepend">关键字</template>
        </el-input>
        <el-button
          type="primary"
          style="margin-left:10px"
          size="mini"
          @click="queryCompanyByParams"
          >查询</el-button
        >
      </div>
    </template>
    <template v-slot:tableColumn="cell">
      <template v-for="item in cell.tableData">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="item.prop"
          :formatter="item.formater"
        ></el-table-column>
      </template>
      <el-table-column label="操作">
        <template v-slot="scope">
          <div v-if="scope.row.operation != ''">
            <el-button
              plain
              size="mini"
              @click="distributeEvent(item.methodName, scope.row)"
              v-for="(item, index) in getOpeBtns(scope.row)"
              :type="item.style"
              :key="index"
              >{{ item.name }}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>

<script>
let rowType = {
  TREE_TYPE_COMPANY: "公司",
  TREE_TYPE_POSITION: "岗位",
  TREE_TYPE_ROLE: "角色",
  TREE_TYPE_PERSON: "人员"
};

let array = [
  {
    name: "岗位设置",
    isType: "1",
    style: "primary",
    methodName: "showPositionList"
  }
];

import listPage from "@/components/listPage";
import getToken from "@/minxi/getUrlToken";
export default {
  mixins: [getToken],
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  components: {
    listPage
  },
  data() {
    return {
      expandKey: [],
      company: {},
      department: {},
      loading: true, //控制表格加载动画提示
      queryData: {
        keyword: "",
        isLocked: null,
        type: null
      },
      filterText: "",
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
        { prop: "title", label: "名称" },
        { prop: "description", label: "描述" },
        {
          prop: "type",
          label: "类型",
          formater: function(row) {
            return rowType[row.type];
          }
        },
        { prop: "createTime", label: "添加时间" }
      ],
      tableData: []
    };
  },
  mounted() {
    this.$store.commit("resetNavList");
    //读取公司数据
    this.queryCompanyDatas(1);
  },
  methods: {
    expandChange(row, expanded) {
      if (expanded) {
        let rowData = JSON.parse(JSON.stringify(row));
        delete rowData.children;
        this.$store.commit("setNavList", rowData);
      }
    },
    rowClick(row, column) {
      let _that_tab = this.$refs.listTable.$refs.table;
      if (column.label == "名称") {
        _that_tab.toggleRowExpansion(row);
      }
    },
    tableRowClassName({ row }) {
      if (row.type == "TREE_TYPE_POSITION") {
        return { color: "green" };
      } else if (row.type == "TREE_TYPE_ROLE") {
        return { color: "orange" };
      }
      return "";
    },
    queryCompanyByParams() {
      let that = this;
      that.loading = true;
      //读取树数据
      that.$api
        .post({
          url: "/company/authority/list/query",
          data: { keyword: that.queryData.keyword },
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            that.expandKey = result.data;
            that.loading = false;
          } else {
            console.log("载入结果" + +result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("读取失败");
          console.log(e);
        });
    },
    queryCompanyDatas(currentPage) {
      //debugger;
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (that.queryData.keyword != null) {
        params.operationName = that.queryData.keyword;
      }
      that.$api
        .post({
          url: "/company/authority/list",
          data: params,
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
            console.log("查询公司管理列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询公司管理列表失败");
          console.log(e);
        })
        .finally(() => {
          that.loading = false;
        });
    },
    editCompanyDetail(e) {
      this.$router.push({
        path: "/sys/authorityConfiguration/setAuthority",
        query: { companyId: e.id }
      });
    },
    distributeEvent(e, companyId) {
      this[e](companyId);
    },
    getOpeBtns(row) {
      if (row.type == "TREE_TYPE_POSITION") {
        return [
          {
            name: "角色设置",
            isType: "1",
            style: "danger",
            methodName: "showRoleDetail"
          }
        ];
      } else if (row.type == "TREE_TYPE_ROLE") {
        return [
          {
            name: "个人权限设置",
            isType: "1",
            style: "primary",
            methodName: "setEmployeeAuthority"
          },
          {
            name: "权限设置",
            isType: "1",
            style: "warning",
            methodName: "setPosition"
          }
        ];
      } else if (row.type == "TREE_TYPE_PERSON") {
        return [
          {
            name: "权限设置",
            isType: "1",
            style: "warning",
            methodName: "setPersonPosition"
          }
        ];
      } else {
        // console.log(row.parentId, "xxxxxx............");
        if (row.parentId == 0 && array.length == 1) {
          array.push({
            name: "设置权限",
            isType: "1",
            style: "primary",
            methodName: "editCompanyDetail"
          });
          // console.log(array, "............");
        }
        return array;
      }
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryCompanyDatas(1);
    },
    handleCurrentChange(val) {
      this.queryCompanyDatas(val);
    },
    showRoleDetail(row) {
      this.$router.push({
        path: "/sys/positionManager",
        query: { id: row.id }
      });
    },
    //个人权限设置
    setEmployeeAuthority(e) {
      //debugger;
      let that = this;
      //跳转页面
      that.$router.push({
        path: "/sys/authority/employeeList",
        query: { id: e.id }
      });
    },
    //设置权限
    setPosition(e) {
      var that = this;
      this.$store.commit("setNavList", e);
      //跳转页面
      that.$router.push({ path: "/sys/setPosition", query: { id: e.id } });
    },
    showPositionList(e) {
      var that = this;
      //跳转页面
      that.$router.push({
        path: "/sys/roleManagementList",
        query: { id: e.id }
      });
    },
    //跳转个人权限设置
    setPersonPosition(e) {
      //this.$store.commit('setNavList',e);
      let that = this;
      that.$router.push({
        path: "/sys/authority/setAuthority",
        query: { accountId: e.id }
      });
    }
  }
};
</script>
