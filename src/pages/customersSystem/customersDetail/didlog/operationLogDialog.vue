<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners">
    <div class="operation-content">
      <el-table
        :data="tableData"
        style="width: 100%"
        header-align="center"
        :row-style="rowStyle"
        :header-cell-style="headerStyle"
      >
        <el-table-column
          prop="addTime"
          :formatter="dateFormatter"
          show-overflow-tooltip
          label="操作时间"
        >
        </el-table-column>
        <el-table-column
          prop="addPerName"
          show-overflow-tooltip
          label="操作人"
        ></el-table-column>
        <el-table-column
          prop="typeAlias"
          show-overflow-tooltip
          label="操作类型"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          show-overflow-tooltip
          label="操作明细"
        >
        </el-table-column>
      </el-table>
      <div class="paging">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </fixedPopup>
</template>

<script>
export default {
  inject: ["customerId"],
  data() {
    return {
      total: 0,
      limit: 10,
      page: 1,
      rowStyle: {
        height: "64px",
        fontSize: "16px",
        color: "rgba(96, 98, 102, 1)"
      },
      headerStyle: {
        height: "64px",
        fontSize: "16px",
        color: "rgba(48, 49, 51, 1)",
        background: "#F0F2F5",
        fontWeight: "normal"
      },
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    /**
     * @example: 获取操作记录
     */
    getData() {
      let that = this;
      let postData = {
        customerId: this.customerId,
        limit: that.limit,
        page: that.page,
        types: []
      };
      that.$api
        .post({
          url: "/saleCustomerOperation/listOperationCustomer",
          data: postData,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            let data = e.data.data;
            that.tableData = data.datas;
            that.total = data.totalCount;
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message({
              type: "xinjia-info",
              message: e.response.data.message
            });
          }
        });
    },
    /**
     * @example: 改变条数
     */
    handleSizeChange(value) {
      this.limit = value;
      this.page = 1;
      this.getData();
    },
    /**
     * @example: 改变页数
     */
    handleCurrentChange(value) {
      this.page = value;
      this.getData();
    },
    /**
     * @example: 日期格式化
     */
    dateFormatter(row) {
      if (row.addTime) {
        let time = row.addTime.split(" ");
        return time[0];
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.operation-content {
  margin-top: 40px;
  .paging {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
