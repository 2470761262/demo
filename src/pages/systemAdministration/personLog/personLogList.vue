<style lang="less" scoped>
.query-cell {
  display: flex;
  /deep/.el-input-group{
    width: auto;
  }
}
</style>
<template>
  <list-page :parentData="$data"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <div class="query-cell">
        <el-input placeholder=""
                  v-model="queryData.keyWord"
                  clearable>
        <template slot="prepend">姓名</template>
        </el-input>
        <el-date-picker
        value-format="yyyy-MM-dd"
        size="large"
        v-model="queryData.time"
        type="date"
        placeholder="选择查询日期">
        </el-date-picker>
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="queryPersonLogByParams(3)">查询</el-button>
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="queryPersonLogByParams(0)">未审核</el-button>
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="queryPersonLogByParams(1)">已通过</el-button>
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="queryPersonLogByParams(-1)">未通过</el-button>
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="queryPersonLogByParams(2)">所有</el-button>
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
                       @click="distributeEvent(item.methosName,scope.row.logId)"
                       v-for="(item,index) in getOpeBtns(scope.row.operation)"
                       :key="index">{{item.name}}</el-button>
          </div>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>

<script>
import listPage from "@/components/listPage";
export default {
  mixins: [],
  components: {
    listPage
  },
  data () {
    return {
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: "",
        tag:null,
        time:null,
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10//每页条数
      },
      tableDataColumn: [
        { prop: "perName", label: "姓名" },
        { prop: "deptName", label: "部门" },
        { prop: "companyName", label: "公司" },
        { prop: "logDate", label: "变动时间" },
        { prop: "logType", label: "变动类型" },
        { prop: "addName", label: "操作人" },
        { prop: "fnFrom", label: "异动情况" },
      ],
      tableData: [],
    }
  },
  mounted () {
    this.queryPersonLogDatas(1);
  },
  methods: {
    queryPersonLogByParams (tag) {
      if(tag != 2 && tag != 3){
        this.queryData.tag = tag;
      }else if(tag == 2){
        this.queryData.tag = null;
      } 
      this.queryPersonLogDatas(1);
    },
    queryPersonLogDatas (currentPage) {
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
    
      this.$api.post({
        url: '/personLog/logList',
        data: params,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.pageJson.total = result.data.totalCount;
          this.pageJson.currentPage = result.data.currPage;
          this.tableData = result.data.list;
        } else {
          console.log("查询人员异动列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询人员异动列表失败");
        console.log(e);
      })
    },
    editPersonLogDetail (PersonLogId) {
      debugger;
      this.$router.push({ name: "editPersonLogDetail", params: { PersonLogId: PersonLogId } });
    },
    distributeEvent (e, PersonLogId) {
      console.log(e, PersonLogId);
      this[e](PersonLogId);
    },
    getOpeBtns (type) {
      let array = [
        { name: '详情', isType: '1', methosName: 'editPersonLogDetail' },
      ]
      return array;
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryPersonLogDatas(1);
    },
    handleCurrentChange (val) {
      this.queryPersonLogDatas(val);
    }
  }
};
</script>