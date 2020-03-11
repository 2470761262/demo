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
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="queryBaseCustomersByParams">查询</el-button>
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
                       @click="distributeEvent(item.methosName,scope.row.bCustomerID)"
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
        { prop: "customerName", label: "姓名" },
        { prop: "sex", label: "性别" },
        { prop: "interest", label: "收入" },
        { prop: "openId", label: "客户微信号" },
        { prop: "commonTel", label: "常用电话" },
        { prop: "addName", label: "添加人" },
        { prop: "addTime", label: "添加时间" },
      ],
      tableData: [],
    }
  },
  mounted () {
    this.queryBaseCustomersDatas(1);
  },
  methods: {
    queryBaseCustomersByParams () {
      this.queryBaseCustomersDatas(1);
    },
    queryBaseCustomersDatas (currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.keyWord != null) {
        params.keyWord = this.queryData.keyWord;
      }
    
      this.$api.post({
        url: '/customers/customersList',
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
          debugger;
            for (var i = 0; i < result.data.list.length; i++) {
              switch (result.data.list[i].sex) {
                case 0:
                  result.data.list[i].sex = "男";
                  break;
                case 1:
                  result.data.list[i].sex = "女";
                  break;
              }
            }
        } else {
          console.log("查询客户列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询客户列表失败");
        console.log(e);
      })
    },
    editBaseCustomersDetail (customersId) {
      debugger;
      this.$router.push({ name: "editBaseCustomersDetail", params: { customersId: customersId } });
    },
    distributeEvent (e, customersId) {
      console.log(e, customersId);
      this[e](customersId);
    },
    getOpeBtns (type) {
      let array = [
        { name: '详情', isType: '1', methosName: 'editBaseCustomersDetail' },
      ]
      return array;
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryBaseCustomersDatas(1);
    },
    handleCurrentChange (val) {
      this.queryBaseCustomersDatas(val);
    }
  }
};
</script>