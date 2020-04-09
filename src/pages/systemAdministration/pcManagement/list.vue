<style lang="less" scoped>
.page-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <div class="page-content">
    <list-page :parentData="$data"
               @handleSizeChange="sizeChange"
               @handleCurrentChange="currentChange">
      <template v-slot:top>
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">MAC地址：</h3>
            <el-input placeholder="电脑的MAC地址"
                      class="set-input120"
                      v-model="queryData.mac"
                      clearable />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">硬盘编号:</h3>
            <el-input placeholder="硬盘编号"
                      class="set-input120"
                      v-model="queryData.disk"
                      clearable />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">CPU编号:</h3>
            <el-input placeholder="CPU编号"
                      class="set-input120"
                      v-model="queryData.cpu"
                      clearable />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">门店名称:</h3>
            <el-input placeholder="门店名称"
                      class="set-input120"
                      v-model="queryData.remark"
                      clearable />
          </div>
          <div class="query-content-cell cell-interval45">
            <el-checkbox v-model="queryData.delChecked">查询已删除</el-checkbox>
          </div>
        </div>
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">添加时间:</h3>
            <el-date-picker v-model="queryData.addDate"
                            type="daterange"
                            align="right"
                            unlink-panels
                            class="set-data-pricker"
                            range-separator="至"
                            start-placeholder="添加的开始时间"
                            end-placeholder="添加的结束时间"
                            :picker-options="pickerOptions2"></el-date-picker>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">最后登录:</h3>
            <el-date-picker v-model="queryData.loginDate"
                            type="daterange"
                            align="right"
                            class="set-data-pricker"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="最后登录的开始时间"
                            end-placeholder="最后登录的结束时间"
                            :picker-options="pickerOptions2"></el-date-picker>
          </div>
          <div class="query-content-cell cell-interval75">
            <el-button type="primary"
                       size="mini"
                       @click="queryByParams">查询</el-button>
          </div>
        </div>
      </template>
      <template v-slot:tableColumn="cell">
        <template v-for="item in cell.tableData">
          <el-table-column :prop="item.prop"
                           :label="item.label"
                           :width="item.width"
                           :key="item.prop"></el-table-column>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="primary"
                       @click="Del(scope.$index, scope.row)"
                       v-if="scope.row.Del==0">删除</el-button>
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
import "@/assets/publicLess/pageListQuery.less";
export default {
  mixins: [getMenuRid, getToken],
  components: {
    listPage
  },
  data() {
    return {
      sidebarFlag: false,
      loading: false,
      queryData: {
        mac: "",
        disk: "",
        cpu: "",
        remark: "",
        delChecked: false,
        addDate: "",
        loginDate: ""
      },
      pageJson: {
        currentPage: 1,
        pageSize: 10
      },
      tableDataColumn: [
        { prop: "ID", label: "PCMID" },
        { prop: "PCMAC", label: "电脑MAC地址" },
        { prop: "DiskID", label: "硬盘编号" },
        { prop: "CpuID", label: "CPU编号" },
        { prop: "AddTime", label: "添加时间" },
        { prop: "LastLoginTime", label: "最后登录时间" },
        { prop: "Remark", label: "门店名称" },
        { prop: "Version", label: "最后登录器版本" }
      ],
      tableData: [],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.queryPcManagementDatas(1);
  },
  methods: {
    queryPcManagementDatas(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.mac != null) {
        params.mac = this.queryData.mac;
      }
      if (this.queryData.disk != null) {
        params.disk = this.queryData.disk;
      }
      if (this.queryData.cpu != null) {
        params.cpu = this.queryData.cpu;
      }
      if (this.queryData.remark != null) {
        params.remark = this.queryData.remark;
      }
      if (this.queryData.delChecked) {
        params.delChecked = 1;
      }
      if (this.queryData.addDate != null) {
        params.addDate = this.queryData.addDate;
      }
      if (this.queryData.loginDate != null) {
        params.loginDate = this.queryData.loginDate;
      }

      this.$api
        .post({
          url: "/pcManagement/list",
          data: params,
          //token: false,
          qs: true //,
          //headers: { "Content-Type": "x-www-form-urlencoded" }
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
            console.log("查询PC在线管理列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询PC在线管理列表失败");
          console.log(e);
        });
    },
    sizeChange(val) {
      console.log("每页 ${val} 条数据");
      this.pageJson.pageSize = val;
      this.queryPcManagementDatas(1);
    },
    currentChange(val) {
      this.queryPcManagementDatas(val);
    },
    queryByParams() {
      this.queryPcManagementDatas(1);
    },
    onLineStr(row, column) {
      if (column.property == "LineTag") {
        return ["离线", "在线", "被强制下线"][row.LineTag];
      }
      return row[column.property];
    },
    SelectTag() {
      //console.log(this.selectTag);
      this.queryPcManagementDatas(1);
    },
    Del(index, row) {
      this.$confirm("确定要删除该数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.ID;
          let account = row.LastAccount;
          if (id == null || account == null) {
            this.$alert("参数错误");
            return;
          }
          let params = { id: id };
          this.$api
            .post({
              url: "/pcManagement/del",
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
              this.queryPcManagementDatas(1);
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
    }
  }
};
</script>