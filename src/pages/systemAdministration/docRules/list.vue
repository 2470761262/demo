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
      @handleSizeChange="sizeChange"
      @handleCurrentChange="currentChange"
    >
      <template v-slot:top>
        <div class="query-cell">
          <el-button type="primary" size="mini" @click="addDocument">添加</el-button>
          <el-button type="primary" size="mini" @click="handleClick">文档管理</el-button>
          <div class="query-right">
            <el-input placeholder="关键字" size="small" v-model="queryData.keyword" clearable></el-input>
            <el-button type="primary" size="mini" @click="queryByParams">查询</el-button>
          </div>
        </div>
      </template>
      <template v-slot:tableColumn="cell">
        <template v-for="item in cell.tableData">
          <el-table-column
            v-if="!item.show"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :formatter="downStr"
          ></el-table-column>
        </template>
        <el-table-column label="操作">
          <template v-slot="scope">
            <div>
              <el-button
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
      loading: false,
      queryData: {
        keyword: ""
      },
      pageJson: {
        currentPage: 1,
        pageSize: 10
      },
      tableDataColumn: [
        { prop: "id", label: "id", show: true },
        { prop: "title", label: "标题", show: false },
        { prop: "addPer", label: "添加人", show: false },
        { prop: "unitName", label: "单位", show: false },
        { prop: "addTime", label: "添加时间", show: false }
      ],
      tableData: [],
      activeName: "second"
    };
  },
  mounted() {
    this.queryDatas(1);
  },
  methods: {
    queryDatas(currentPage) {
      this.loading = true;
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.keyword != null) {
        params.keyword = this.queryData.keyword;
      }

      this.$api
        .post({
          url: "/docRules/list",
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
            console.log("查询列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询列表失败");
          console.log(e);
        })
        .finally(e => {
          this.loading = false;
        });
    },
    sizeChange(val) {
      console.log("每页 ${val} 条数据");
      this.pageJson.pageSize = val;
      this.queryDatas(1);
    },
    currentChange(val) {
      this.queryDatas(val);
    },
    queryByParams() {
      this.queryDatas(1);
    },
    downStr(row, column) {
      if (column.property == "unitName") {
        return row[column.property].trim().replace(/>$/, "");
      }
      return row[column.property];
    },
    addDocument() {
      this.$router.push({ path: "/sys/docRules/edit", query: { id: 0 } });
    },
    distributeEvent(e, RoleId) {
      this[e](RoleId);
    },
    getOpeBtns(type) {
      let array = [
        { name: "编辑", isType: "1", methosName: "editDetail" },
        { name: "删除", isType: "1", methosName: "delDetail" }
      ];
      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      return array;
    },
    editDetail(id) {
      this.$router.push({ path: "/sys/docRules/edit", query: { id: id } });
    },
    delDetail(id) {
      this.$confirm("你确定要删除？", "注意！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (id == null || id <= 0) {
            this.$alert("参数错误");
            return;
          }
          let params = { id: id };
          this.$api
            .post({
              url: "/docRules/del",
              data: params,
              qs: true
            })
            .then(e => {
              console.log(e.data);
              let result = e.data;
              if (result.code == 200) {
                this.$message({
                  type: "success",
                  message: result.message
                });
              } else {
                this.$message({
                  type: "info",
                  message: result.message
                });
              }

              this.queryDatas(1);
            })
            .catch(e => {
              console.log("操作失败");
              console.log(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleClick(tab, event) {
      this.$router.push({ path: "/sys/document/list" });
    }
  }
};
</script>