<style lang="less" scoped>
@import url("../less/custTab.less");
</style>
<template>
  <!-- 
      :expand-row-keys='[1,3]'
      row-key="id"
  -->
  <div class="list-content">
    <list-Page
      :parentData="$data"
      @sort-change="sortMethod"
      :border="true"
      default-expand-all
      headerClass="headerCellSet1"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      :dblclick="true"
      @cellDblClick="toCustomerDetail"
    >
      <template v-slot:top>
        <section class="query-content">
          <div class="empty-query">
            <div class="page-list-query-row" v-if="changeQuery">
              <div class="query-content-cell">
                <h3 class="query-cell-title">客户姓名</h3>
                <el-input
                  placeholder="客户姓名"
                  v-model="queryData.customerName"
                  class="set-input90"
                  clearable
                />
              </div>
              <div class="query-content-cell cell-interval75">
                <h3 class="query-cell-title">审核状态</h3>
                <el-select
                  clearable
                  placeholder="全部"
                  class="set-select120"
                  v-model="queryData.tag"
                >
                  <el-option
                    v-for="item in checkStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="query-content-cell cell-interval75">
                <h3 class="query-cell-title">申请类型</h3>
                <el-select
                  clearable
                  placeholder="全部"
                  class="set-select120"
                  collapse-tags
                  v-model="queryData.type"
                >
                  <el-option
                    v-for="item in checkTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <span
            class="el-icon-d-arrow-left icon"
            :class="{ 'is-active': !changeQuery }"
            @click="triggerChange"
          ></span>
        </section>
      </template>
      <template v-slot:title>
        <h3 class="page-tab-title">
          <i class="iconzaishouwugendan iconfont"></i> <span>客源审核列表</span>
        </h3>
      </template>
      <template v-slot:tableColumn>
        <template v-for="item in tableColumn">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"
            :key="item.prop"
            :formatter="item.formart"
            show-overflow-tooltip
            :fixed="item.fixed ? 'right' : false"
            :sort-orders="['ascending', 'descending']"
            :sortable="item.order"
          ></el-table-column>
        </template>
      </template>
    </list-Page>
  </div>
</template>

<script>
import listPage from "@/components/listPage";
export default {
  components: {
    listPage
  },
  data() {
    return {
      queryUrl: { path: "../customersSystem/addCustomers", query: { a: 1 } },
      checkStatusList: [
        {
          value: "0",
          label: "未审核"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "未通过"
        }
      ],
      checkTypeList: [
        {
          value: "5",
          label: "类型转换"
        },
        {
          value: "6",
          label: "删除申请"
        }
      ],
      changeQuery: true, //顶部开关
      loading: false,
      pageJson: {
        total: 50, //总记录数
        pageSize: 10 //每页条数
      },
      tableColumn: [
        {
          prop: "customerName",
          label: "客户名称",
          width: "120px",
          order: true
        },
        {
          prop: "type",
          label: "申请类型",
          width: "120px",
          order: false,
          formart: (row, column) => {
            if (row.type == 5) {
              return "状态转换";
            } else if (row.type == 6) {
              return "删除申请";
            }
            return "未知";
          }
        },
        {
          prop: "tag",
          label: "审核状态",
          width: "120px",
          order: true,
          formart: (row, column) => {
            if (row.tag == 0) {
              return "未审核";
            } else if (row.tag == 1) {
              return "审核通过";
            } else if (row.tag == 2) {
              return "未通过";
            }
            return "未知";
          }
        },
        {
          prop: "addPerName",
          label: "提审人",
          width: "120px",
          order: true
        },

        { prop: "addTime", label: "提审时间", width: "120px", order: true },
        {
          prop: "ownerMemo",
          label: "提审原因",
          width: "180px",
          order: true,
          formart: (row, column) => {
            if (row.ownerMemo && row.ownerMemo.length > 15) {
              return row.ownerMemo.substring(0, 14) + "...";
            }
            return row.ownerMemo;
          }
        },
        {
          prop: "checkMemo",
          label: "审核意见",
          width: "120px",
          order: true,
          formart: (row, column) => {
            if (row.checkMemo && row.checkMemo.length > 15) {
              return row.checkMemo.substring(0, 14) + "...";
            }
            return row.checkMemo;
          }
        },
        {
          prop: "cz",
          label: "操作",
          width: "300px",
          order: false,
          fixed: true,
          formart: e => {
            if (e.tag == 0) {
              //未审核
              return (
                <div>
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-date"
                    onClick={this.checkOK.bind(this, e)}
                  >
                    通过
                  </el-button>
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-date"
                    onClick={this.checkNotOK.bind(this, e)}
                  >
                    不通过
                  </el-button>
                </div>
              );
            } else {
              return (
                <div>
                  <el-button type="warning" size="mini" icon="el-icon-date">
                    查看
                  </el-button>
                </div>
              );
            }
          }
        }
      ], //定义表格数据
      tableData: [], //存放表格数据
      queryData: {
        customerName: "",
        type: null, //申请类型
        tag: null //审核状态
      },
      queryParams: {} //上方的条件组合
    };
  },
  watch: {
    queryData: {
      handler(val, oldVal) {
        {
          this.queryParams = {
            customerName: this.queryData.customerName,
            type: this.queryData.type,
            tag: this.queryData.tag
          };
          this.queryCustomerCheckData(1);
        }
      },
      deep: true
    }
  },
  mounted() {
    this.queryCustomerCheckData(1);
  },
  methods: {
    checkOK(row) {
      let that = this;
      if (row.type == 5) {
        console.log("状态转换审核通过");
      } else if (row.type == 6) {
        console.log("删除审核通过");
      }
      this.$confirm("确定这样操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.checkOperation(row, 1, "审核通过", function() {
            row.tag = 1; //更新审核状态
          });
        })
        .catch(() => {});
    },
    checkOperation(row, tag, memo, callBack) {
      //type,5类型转换审核，6删除审核
      //tag 1通过，2不通过
      let that = this;
      let type = row.type;
      let customerId = row.customerId;
      let checkParams = {
        type: type,
        eid: customerId, //客源id
        tag: tag,
        checkMemo: memo,
        resourceType: row.resourceType
      };
      let tip = type == 6 ? "删除审核" : "类型状态审核";
      console.log(checkParams, "即将" + tip);
      that.$api
        .post({
          url: "/saleCustomerCheck/checkCustomerOperation",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: checkParams
        })
        .then(e => {
          let result = e.data;
          console.log(result);
          if (result.code == 200) {
            callBack();
            this.$message({
              type: "info",
              message: "操作成功"
            });
          } else {
            this.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("【【【【uups," + tip + "失败】】】】");
          console.log(e);
        });
    },
    checkNotOK(row) {
      if (row.type == 5) {
        console.log("状态转换审核不通过");
      } else if (row.type == 6) {
        console.log("删除审核不通过");
      }
      let that = this;
      this.$prompt("请输入原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          if (!value) {
            this.$message({
              type: "success",
              message: "请输入原因"
            });
            return;
          }
          that.checkOperation(row, 2, value, function() {
            row.tag = 2; //更新审核状态
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
        });
    },
    toCustomerDetail(item) {
      let id = item.id;
      if (!item.id) {
        that.$message.error("customerId都是空的，如何查看");
        return;
      }
      console.log(id);
      var that = this;
      this.$router.push({
        name: "customerDetail",
        params: { customerId: id }
      });
    },
    queryCustomerCheckData(page) {
      let _that = this;
      _that.queryParams = Object.assign(_that.queryParams, {
        page: page,
        limit: _that.pageJson.pageSize
      });
      _that.loading = true;
      _that.$api
        .post({
          url: "/saleCustomer/listCustomerCheck",
          data: _that.queryParams,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          _that.loading = false;
          if (result.code == 200) {
            console.log(result, "查询客源审核列表（）");
            var dataCustomers = result.data.list;
            _that.tableData = dataCustomers;
            _that.pageJson.total = result.data.totalCount;
            //result.data.pageSum
          } else {
            console.log("查询客源审核列表" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          _that.loading = false;

          console.log("查询客源审核失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    triggerChange() {
      this.changeQuery = !this.changeQuery;
    },
    /**
     * 排序触发
     */
    sortMethod(e) {},
    /**
     * @param {number} e
     * 设置一页显示多少个
     */
    handleSizeChange(e) {
      this.pageJson.pageSize = e;
      this.queryCustomerCheckData(1);
    },
    /**
     * 前往多少页
     * @param {number} e
     */
    handleCurrentChange(e) {
      this.queryCustomerCheckData(e);
    }
  }
};
</script>
