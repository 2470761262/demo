<style lang="less" scoped>
@import url("../less/custTab.less");
</style>
<template>
  <!-- 
      :expand-row-keys='[1,3]'
      row-key="id"
  -->
  <list-Page
    :parentData="$data"
    @sort-change="sortMethod"
    :border="true"
    default-expand-all
    :cellClass="cellClass"
    headerClass="headerCellSet1"
    @handleCurrentChange="handleCurrentChange"
    @handleSizeChange="handleSizeChange"
    :dblclick="true"
    @cellDblClick="toCustomerDetail"
  >
    <template v-slot:top>
      <allCustomersQuery
        :fatherMethod="queryCustomerData"
        :fatherQueryGroup="queryParamsGroup"
      ></allCustomersQuery>
    </template>
    <template v-slot:title>
      <h3 class="page-tab-title">
        <i class="iconzaishouwugendan iconfont"></i> <span>客源列表</span>
      </h3>
    </template>
    <template v-slot:left>
      <left-attention v-model="querySelectFlag"></left-attention>
    </template>
    <template v-slot:tableColumn>
      <el-table-column type="expand" width="1px">
        <template v-slot:default="props">
          <!-- 判断当前列是否有 'pp' 这个属性 如果有则显示印象 且长度大于0 -->
          <template v-if="props.row.pp && props.row.pp.length > 0">
            <div class="flex-expand">
              <div class="flex-impression-content">
                <div v-for="(item, index) in props.row.pp" :key="index">
                  {{ item }}
                </div>
              </div>
              <label class="trigger-impression-btn">
                <input type="checkbox" />
                <i class="iconfont"></i>
              </label>
            </div>
          </template>
        </template>
      </el-table-column>
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
</template>

<script>
import listPage from "@/components/listPage";
import allCustomersQuery from "../components/allCustomersQuery";
import leftAttention from "../components/leftAttention";
import { setImpression } from "@/util/tabUtil";
export default {
  components: {
    listPage,
    allCustomersQuery,
    leftAttention
  },
  data() {
    return {
      queryParamsGroup: [
        {
          未带看: 0,
          首次带看: 0,
          二次带看: 0,
          三次带看: 0,
          四次带看: 0,
          五次带看以上: 0
        },
        { 强烈: 0, 一般: 0, 较弱: 0 },
        { 在谈: 0, 签约: 0 }
      ],
      querySelectFlag: true,
      loading: false,
      pageJson: {
        currentPage: 1, //当前页码
        total: 50, //总记录数
        pageSize: 10 //每页条数
      },
      tableColumn: [
        { prop: "customers", label: "姓名", width: "120px", order: false },
        {
          prop: "desireIntensity",
          label: "意向",
          width: "120px",
          order: true,
          formart: row => {
            return (
              <el-rate
                value={row.desireIntensity + 1}
                max={3}
                disabled
              ></el-rate>
            );
          }
        },
        {
          prop: "priceRange",
          label: "总价",
          width: "120px",
          order: true,
          formart: (row, column) => {
            return row.minPrice + "-" + row.maxPrice;
          }
        },
        {
          prop: "minArea",
          label: "面积",
          width: "120px",
          order: true,
          formart: (row, column) => {
            return row.minArea + "-" + row.maxArea;
          }
        },
        {
          prop: "rooms",
          label: "户型",
          width: "120px",
          order: true,
          formart: (row, column) => {
            let s = row.rooms.replace("$", "或");
            var d = s.length - 1;
            //判断如果以或结尾，去除掉
            if (d >= 0 && s.lastIndexOf("或") == d) {
              s = s.substr(0, s.length - 1);
            }
            return s;
          }
        },
        {
          prop: "pairNumber",
          label: "带看进度",
          width: "120px",
          order: true,
          formart: (row, column) => {
            if (!row.pairNumber || row.pairNumber == 0) {
              return "未带看";
            } else {
              return row.pairNumber + "次";
            }
          }
        },
        {
          prop: "lastPairFollowTime",
          label: "上次带看",
          width: "120px",
          order: true
        },
        { prop: "addTime", label: "录入时间", width: "120px", order: true },
        {
          prop: "cz",
          label: "操作",
          width: "300px",
          order: false,
          fixed: true,
          formart: () => {
            return (
              <div>
                <el-button type="primary" size="mini" icon="el-icon-phone">
                  一键拨号
                </el-button>
                <el-button type="warning" size="mini" icon="el-icon-date">
                  预约带看
                </el-button>
                <el-button type="danger" size="mini" icon="el-icon-edit">
                  写跟进
                </el-button>
              </div>
            );
          }
        }
      ], //定义表格字段
      tableData: [
        // {
        //   id: 1,
        //   customers: "空",
        //   ee: "90-120万",
        //   rr: "80-90㎡",
        //   rooms: "3房",
        //   pairNumber: "为带看",
        //   lastPairFollowTime: "站务",
        //   addTime: "2020-02-01",
        //   pp: ["活跃呵护", "心机汪", "一是同行"]
        // }
      ] //存放表格数据
    };
  },
  mounted() {
    let _that = this;
    _that.$nextTick(setImpression);
    _that.pageJson.currentPage = 1;
    _that.queryCustomerData({});
    _that.staticsMyCustomerData();
  },
  methods: {
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
    staticsMyCustomerData() {
      let _that = this;
      _that.$api
        .post({
          url: "/saleCustomer/staticsMyCustomers",
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result, "统计我的客源");
            _that.queryParamsGroup = result.data;
          } else {
            console.log("统计我的客源" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("统计我的客源失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    queryCustomerData(params) {
      let _that = this;
      let queryParams = Object.assign(
        { page: _that.pageJson.currentPage, limit: _that.pageJson.pageSize },
        params
      );
      _that.$api
        .post({
          url: "/saleCustomer/listMyCustomers",
          data: queryParams,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result, "查询我的客源列表");
            var dataCustomers = result.data.data;
            //_that.tableData = [..._that.tabl eData, ...dataCustomers];
            _that.tableData = dataCustomers;
            _that.pageJson.total = result.data.dataCount;
            //result.data.pageSum
          } else {
            console.log("查询客源列表" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("查询客源列表失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    /**
     * 设置如果有当前行有印象数据则行先生对应的calss
     */
    cellClass({ row }) {
      if (row.hasOwnProperty("pp")) {
        return "cellset";
      }
      return "cellItemSet";
    },
    /**
     * 排序触发
     */
    sortMethod(e) {},
    /**
     * @param {number} e
     * 设置一页显示多少个
     */
    handleSizeChange(e) {},
    /**
     * 前往多少页
     * @param {number} e
     */
    handleCurrentChange(e) {}
  }
};
</script>
