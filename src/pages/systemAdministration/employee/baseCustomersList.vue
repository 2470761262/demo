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
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:top>
        <div class="query-cell">
          <div class="query-right">
            <el-input
              placeholder
              size="small"
              v-model="queryData.keyWord"
              clearable
            >
            </el-input>
            <el-button
              type="primary"
              size="mini"
              @click="queryBaseCustomersByParams"
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
        <el-table-column
          prop="operation"
          label="操作"
          fixed="right"
          key="operation"
        >
          <template v-slot="scope">
            <div v-if="scope.row.operation != ''">
              <el-button
                type="primary"
                size="mini"
                @click="distributeEvent(item.methosName, scope.row.id)"
                v-for="(item, index) in getOpeBtns(scope.row.operation)"
                :key="index"
                >{{ item.name }}</el-button
              >
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
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: ""
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
        { prop: "customerName", label: "姓名" },
        { prop: "sex", label: "性别" },
        { prop: "interest", label: "收入" },
        { prop: "openId", label: "客户微信号" },
        { prop: "commonTel", label: "常用电话" },
        { prop: "addName", label: "添加人" },
        { prop: "addTime", label: "添加时间" }
      ],
      tableData: []
    };
  },
  mounted() {
    this.queryBaseCustomersDatas(1);
  },
  methods: {
    queryBaseCustomersByParams() {
      this.queryBaseCustomersDatas(1);
    },
    queryBaseCustomersDatas(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      if (this.queryData.keyWord != null) {
        params.keyWord = this.queryData.keyWord;
      }

      this.$api
        .post({
          url: "/customers/customersList",
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
            this.pageJson.total = result.data.totalElements;
            this.tableData = result.data.content;

            for (var i = 0; i < result.data.content.length; i++) {
              switch (result.data.content[i].sex) {
                case 0:
                  result.data.content[i].sex = "男";
                  break;
                case 1:
                  result.data.content[i].sex = "女";
                  break;
              }
            }
          } else {
            console.log("查询客户列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询客户列表失败");
          console.log(e);
        });
    },
    editBaseCustomersDetail(customersId) {
      this.$router.push({
        name: "editBaseCustomersDetail",
        params: { customersId: customersId }
      });
    },
    distributeEvent(e, customersId) {
      console.log(e, customersId);
      this[e](customersId);
    },
    getOpeBtns() {
      let array = [
        { name: "详情", isType: "1", methosName: "editBaseCustomersDetail" }
      ];
      return array;
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryBaseCustomersDatas(1);
    },
    handleCurrentChange(val) {
      this.queryBaseCustomersDatas(val);
    }
  }
};
</script>
