<style lang="less" scoped>
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
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">门店名称:</h3>
            <el-input
              placeholder="门店名称"
              class="set-input120"
              v-model="queryData.remark"
              clearable
            ></el-input>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">账号:</h3>
            <el-input
              placeholder="账号"
              class="set-input120"
              v-model="queryData.account"
              clearable
            ></el-input>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">电脑IP地址:</h3>
            <el-input
              placeholder="电脑IP地址"
              class="set-input120"
              v-model="queryData.ip"
              clearable
            ></el-input>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">类型:</h3>
            <el-select
              v-model="selectTag"
              placeholder="全部"
              @change="SelectTag"
            >
              <el-option
                v-for="item in SelectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval45">
            <el-tag type="danger">在线人数：{{ onlineCount }}</el-tag>
          </div>
        </div>
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">登录时间:</h3>
            <el-date-picker
              v-model="choiceDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              class="set-data-pricker"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
          <div class="query-content-cell cell-interval45">
            <el-button type="primary" size="mini" @click="queryByParams"
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
            show-overflow-tooltip
            :formatter="onLineStr"
          ></el-table-column>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="Offline(scope.$index, scope.row)"
              v-if="scope.row.LineTag == 1"
              >下线</el-button
            >
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
      loading: false,
      queryData: {
        remark: "",
        queryDate: "",
        account: "",
        ip: ""
      },
      pageJson: {
        currentPage: 1,
        pageSize: 10
      },
      tableDataColumn: [
        { prop: "ID", label: "PCMID" },
        { prop: "LoginIP", label: "电脑IP地址" },
        { prop: "SessionID", label: "SessionID" },
        { prop: "LastLoginTime", label: "登录时间", width: "210" },
        { prop: "LineTime", label: "页面端在线时间", width: "210" },
        { prop: "PCLineTime", label: "PC端在线时间", width: "210" },
        { prop: "LineTag", label: "登录状态" },
        { prop: "Remark", label: "门店名称" },
        { prop: "LastAccount", label: "当前登录账号" },
        { prop: "Version", label: "登录器版本" }
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
      },
      choiceDate: "",
      selectTag: "",
      SelectOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "离线"
        },
        {
          value: "1",
          label: "在线"
        },
        {
          value: "2",
          label: "被强制下线"
        }
      ],
      onlineCount: ""
    };
  },
  mounted() {
    this.queryPcOnlineDatas(1);
    this.queryPcOnlineCount();
  },
  methods: {
    queryPcOnlineDatas(currentPage) {
      this.loading = true;
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      if (this.queryData.remark != null) {
        params.remark = this.queryData.remark;
      }
      if (this.choiceDate != null) {
        params.queryDate = this.choiceDate;
      }
      if (this.queryData.account != null) {
        params.account = this.queryData.account;
      }
      if (this.queryData.ip != null) {
        params.ip = this.queryData.ip;
      }
      if (this.selectTag != null && this.selectTag != "") {
        params.selectTag = this.selectTag;
      }
      this.$api
        .post({
          url: "/PcOnline/list",
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
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sizeChange(val) {
      console.log("每页 ${val} 条数据");
      this.pageJson.pageSize = val;
      this.queryPcOnlineDatas(1);
    },
    currentChange(val) {
      this.queryPcOnlineDatas(val);
    },
    queryByParams() {
      this.queryPcOnlineDatas(1);
    },
    onLineStr(row, column) {
      if (column.property == "LineTag") {
        return ["离线", "在线", "被强制下线"][row.LineTag];
      }
      if (column.property == "Version") {
        if (row["LastAccount"] != null && row["LastAccount"] != "") {
          return row["Version"];
        } else {
          return "";
        }
      }
      return row[column.property];
    },
    SelectTag() {
      //console.log(this.selectTag);
      this.queryPcOnlineDatas(1);
    },
    Offline(index, row) {
      this.$confirm(
        "注意！ 如果执行该操作，用户将强制下线。",
        "你确定要该用户下线？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let id = row.ID;
          let account = row.LastAccount;
          if (id == null || account == null) {
            this.$alert("参数错误");
            return;
          }
          let params = { id: id, account: account };
          this.$api
            .post({
              url: "/PcOnline/offline",
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

              this.queryPcOnlineDatas(1);
            })
            .catch(e => {
              console.log("下线操作失败");
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
    queryPcOnlineCount() {
      this.$api
        .post({
          url: "/PcOnline/count"
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            this.onlineCount = result.data;
          } else {
            console.log("查询PC在线统计结果：" + result.data);
            //alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询PC在线管理列表失败");
          console.log(e);
        });
    }
  }
};
</script>
