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
    <list-page :parentData="$data"
               @handleSizeChange="handleSizeChange"
               @handleCurrentChange="handleCurrentChange">
      <template v-slot:top>
        <div class="query-cell">
          <el-button type="primary"
                     size="mini"
                     @click="queryPersonLogByParams(0)">未审核</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="queryPersonLogByParams(1)">已通过</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="queryPersonLogByParams(-1)">未通过</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="queryPersonLogByParams(2)">所有</el-button>
          <div class=" query-right">
            <el-date-picker value-format="yyyy-MM-dd"
                            size="small"
                            v-model="queryData.time"
                            type="date"
                            placeholder="选择查询日期"></el-date-picker>
            <el-input placeholder="姓名"
                      size="small"
                      v-model="queryData.keyWord"
                      clearable>
            </el-input>
            <el-button type="primary"
                       size="mini"
                       @click="queryPersonLogByParams(3)">查询</el-button>
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
        <el-table-column label="操作"
                         fixed="right">
          <template v-slot="scope">
            <div v-if="scope.row.operation!=''">
              <el-button type="primary"
                         size="mini"
                         @click="distributeEvent(item.methosName,scope.row.logId)"
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
        tag: null,
        time: null
      },
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
        { prop: "perName", label: "姓名" },
        { prop: "deptName", label: "部门" },
        { prop: "companyName", label: "公司" },
        { prop: "logDate", label: "变动时间" },
        { prop: "logType", label: "变动类型" },
        { prop: "addName", label: "操作人" },
        { prop: "fnFrom", label: "异动情况" },
        { prop: "tag", label: "当前状态" }
      ],
      tableData: []
    };
  },
  mounted() {
    this.queryPersonLogDatas(1);
  },
  methods: {
    queryPersonLogByParams(tag) {
      if (tag != 2 && tag != 3) {
        this.queryData.tag = tag;
      } else if (tag == 2) {
        this.queryData.tag = null;
      }
      this.queryPersonLogDatas(1);
    },
    queryPersonLogDatas(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.keyWord != null) {
        params.keyWord = this.queryData.keyWord;
      }
      if (this.queryData.tag != null) {
        params.tag = this.queryData.tag;
      }
      if (this.queryData.time != null) {
        params.time = this.queryData.time;
      }

      this.$api
        .post({
          url: "/personLog/logList",
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
            this.pageJson.total = result.data.totalCount;
            this.pageJson.currentPage = result.data.currPage;

            for (var i = 0; i < result.data.list.length; i++) {
              switch (result.data.list[i].fnFrom) {
                case 0:
                  result.data.list[i].fnFrom = "任命";
                  break;
                case 1:
                  result.data.list[i].fnFrom = "调动";
                  break;
              }
              switch (result.data.list[i].logType) {
                case 1:
                  result.data.list[i].logType = "新增";
                  break;
                case 2:
                  result.data.list[i].logType = "修改";
                  break;
                case 3:
                  result.data.list[i].logType = "人员状态";
                  break;
                case 4:
                  result.data.list[i].logType = "修改部门岗位星级";
                  break;
              }
              switch (result.data.list[i].tag) {
                case 0:
                  result.data.list[i].tag = "默认";
                  break;
                case 1:
                  result.data.list[i].tag = "审核通过";
                  break;
                case -1:
                  result.data.list[i].tag = "不通过";
                  break;
              }
            }
            this.tableData = result.data.list;
          } else {
            console.log("查询人员异动列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询人员异动列表失败");
          console.log(e);
        });
    },
    editPersonLogDetail(PersonLogId) {
      //debugger;
      this.$router.push({
        path: "editPersonLogDetail",
        query: { PersonLogId: PersonLogId }
      });
    },
    distributeEvent(e, PersonLogId) {
      console.log(e, PersonLogId);
      this[e](PersonLogId);
    },
    getOpeBtns(type) {
      let array = [
        { name: "详情", isType: "1", methosName: "editPersonLogDetail" }
      ];
      return array;
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryPersonLogDatas(1);
    },
    handleCurrentChange(val) {
      this.queryPersonLogDatas(val);
    }
  }
};
</script>
