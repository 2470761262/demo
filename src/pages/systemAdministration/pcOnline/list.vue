<template>
  <list-page
    :parentData="$data"
    @handleSizeChange="sizeChange"
    @handleCurrentChange="currentChange"
  >
    <template v-slot:top>
      <div class="query-cell">
        <el-input placeholder="门店名称" size="small" v-model="queryData.remark" clearable>
          <template slot="prepend">门店名称</template>
        </el-input>
        <el-input placeholder="账号" size="small" v-model="queryData.account" clearable>
          <template slot="prepend">账号</template>
        </el-input>
        <el-input placeholder="电脑IP地址" size="small" v-model="queryData.ip" clearable>
          <template slot="prepend">电脑IP地址</template>
        </el-input>
        <el-date-picker
          v-model="choiceDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2"
        >
          <template slot="prepend">登录时间</template>
        </el-date-picker>
        <el-button type="primary" style="margin-left:10px" size="mini" @click="queryByParams">查询</el-button>
      </div>
    </template>
    <template v-slot:tableColumn="cell">
      <template v-for="item in cell.tableData">
        <el-table-column :prop="item.prop" :label="item.label" :width="item.width" :key="item.prop"></el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" fixed="right" key="operation">
        <template v-slot="scope">
          <div v-if="scope.row.operation!=''">
            <el-button
              type="info"
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
</template>
<script>
import listPage from "@/components/listPage";
export default {
  components: {
    listPage
  },
  data() {
    return {
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
        { prop: "LastLoginTime", label: "登录时间" },
        { prop: "LineTime", label: "页面端在线时间" },
        { prop: "PCLineTime", label: "PC端在线时间" },
        { prop: "LineTag", label: "登录状态" },
        { prop: "Remark", label: "门店名称" },
        { prop: "LastAccount", label: "当前登录账号" }
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
      choiceDate: ""
    };
  },
  mounted() {
    this.queryPcOnlineDatas(1);
  },
  methods: {
    queryPcOnlineDatas(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
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
    getOpeBtns(type) {
      let array = [{ name: "下线", isType: "1,3", methosName: "Offline" }];
      return array;
    },
    Offline(id) {}
  }
};
</script>