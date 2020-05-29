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
      :cellClass="cellClass"
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
              <div class="query-content-cell cell-interval75">
                <h3 class="query-cell-title">审核类型</h3>
                <el-select
                  multiple
                  placeholder="全部"
                  class="set-select120"
                  collapse-tags
                  v-model="queryData.selectedPairParams"
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
import { setImpression } from "@/util/tabUtil";
export default {
  components: {
    listPage
  },
  data() {
    return {
      queryUrl: { path: "../customersSystem/addCustomers", query: { a: 1 } },
      formData: {
        //客户id
        EntructId: "",
        //内容
        Memo: ""
      },
      activeProdata: null, //点击写跟进后，用来保存当前行的数据的临时变量
      writeFlag: false, //写跟进弹框开关
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
      querySelectFlag: false, //侧边印象开关
      loading: false,
      pageJson: {
        total: 50, //总记录数
        pageSize: 10 //每页条数
      },
      tableColumn: [
        {
          prop: "rooms",
          label: "客户名称",
          width: "120px",
          order: true,
          formart: (row, column) => {
            return "连表查询";
          }
        },
        {
          prop: "type",
          label: "审核类型",
          width: "120px",
          order: false,
          formart: (row, column) => {
            if (row.type == 5) {
              return "类型转换";
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
          prop: "checkMemo",
          label: "审核意见",
          width: "120px",
          order: true,
          formart: (row, column) => {
            return "审核意见";
          }
        },
        {
          prop: "checkPer",
          label: "审核人",
          width: "120px",
          order: true,
          formart: (row, column) => {
            return "超人";
          }
        },
        {
          prop: "checkTime",
          label: "最近审核时间",
          width: "120px",
          order: true
        },
        { prop: "addTime", label: "提审时间", width: "120px", order: true },
        {
          prop: "cz",
          label: "操作",
          width: "300px",
          order: false,
          fixed: true,
          formart: e => {
            return (
              <div>
                <el-button type="warning" size="mini" icon="el-icon-date">
                  审核
                </el-button>
              </div>
            );
          }
        }
      ], //定义表格数据
      tableData: [
        // {
        //   id: 1,
        //   qq: "张先生(男)",
        //   ee: "90-120万",
        //   rr: "80-90㎡",
        //   tt: "3房",
        //   yy: "为带看",
        //   uu: "站务",
        //   ii: "2020-02-01",
        //   pp: ["活跃呵护", "心机汪", "一是同行"]
        // }
      ], //存放表格数据
      queryData: {
        tel: "",
        selectedPairParams: [], //带看多选条件
        selectedDesireIntensitys: [], //意向多选条件
        selectedHouseNumbers: [], //房型多选条件
        minPrice: null, //最小价格条件
        maxPrice: null, //最大价格条件
        minArea: null, //最小面积条件
        maxArea: null, //最大面积条件
        minRooms: null,
        maxRooms: null,
        minAddTime: null, //最大带看时间条件
        maxAddTime: null //最大带看时间条件
      },
      addTime: null,
      queryParams: {}, //上方的条件组合
      customerParams: {} //左侧印象选中的条件
    };
  },
  watch: {
    queryData: {
      handler(val, oldVal) {
        {
          let houseNumbers = [];
          let just1 = false;
          let just2 = false;
          let just3 = false;
          for (let v = 0; v < 6; v++) {
            just1 =
              this.queryData.minRooms &&
              this.queryData.maxRooms &&
              v <= Number(this.queryData.maxRooms) &&
              v >= Number(this.queryData.minRooms);
            just2 =
              this.queryData.minRooms &&
              !this.queryData.maxRooms &&
              v >= Number(this.queryData.minRooms);
            just3 =
              !this.queryData.minRooms &&
              this.queryData.maxRooms &&
              v <= Number(this.queryData.maxRooms);
            if (just1 || just2 || just3) {
              houseNumbers.push(v);
            }
          }
          this.queryParams = {
            tel: this.queryData.tel,
            houseNumbers: houseNumbers,
            pairNumbers: this.queryData.selectedPairParams,
            desireIntensitys: this.queryData.selectedDesireIntensitys,
            minPrice: this.queryData.minPrice,
            maxPrice: this.queryData.maxPrice,
            minArea: this.queryData.minArea,
            maxArea: this.queryData.maxArea,
            minAddTime: this.queryData.minAddTime,
            maxAddTime: this.queryData.maxAddTime
          };
          this.queryCustomerData(1);
        }
      },
      deep: true
    },
    addTime: function(val) {
      if (val) {
        this.queryData.minAddTime = val[0];
        this.queryData.maxAddTime = val[1];
        console.log(
          this.queryData.minAddTime,
          this.queryData.maxAddTime,
          "设置了起止录入时间"
        );
      } else {
        this.queryData.minAddTime = this.queryData.maxAddTime = null;
        console.log("清空了录入时间");
      }
    }
  },
  mounted() {
    this.$nextTick(setImpression);
    this.queryCustomerData(1);
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
    queryCustomerDataLeft(p) {
      let _that = this;
      console.log(p, "区域公客右侧印象触发查询");
      if (p) {
        this.customerParams = p;
      } else {
        this.customerParams = {};
      }
      this.queryCustomerData(1);
    },
    queryCustomerData(page) {
      let _that = this;
      _that.queryParams = Object.assign(_that.queryParams, {
        page: page,
        limit: _that.pageJson.pageSize,
        del: 0,
        plates: [2, 3]
      });
      _that.$api
        .post({
          url: "/saleCustomer/listMyCustomers",
          data: Object.assign(_that.queryParams, _that.customerParams),
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result, "查询区域公客公客列表（）");
            var dataCustomers = result.data.data;
            _that.tableData = dataCustomers;
            _that.pageJson.total = result.data.dataCount;
            //result.data.pageSum
          } else {
            console.log("查询区域公客列表" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("查询区域公客失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    /**
     * @example: 打开弹框
     * @param {string} popName
     */
    openPop(popName, e) {
      let _that = this;
      // //把当前行的值保存到临时变量activeProdata
      _that.activeProdata = e;
      this[popName] = true;
    },
    confirmEmit(e) {
      let _that = this;
      //获取文本值
      let textarea = e.textarea;
      //获取当前行的值
      let activeProdata = _that.activeProdata;
      //获取当前客户id
      let cid = activeProdata.id;
      _that.formData.EntructId = cid;
      _that.formData.Memo = textarea;
      _that.$api
        .post({
          url: "/saleCustomer/addSaleCusFlower",
          data: _that.formData,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          _that.$message({
            type: "info",
            message: result.message
          });
          if (result.code == 200) {
            console.log(result, "写跟进");
            _that.$message({
              type: "success",
              message: result.message
            });
          } else {
            console.log("写跟进" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("写跟进失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    triggerChange() {
      this.changeQuery = !this.changeQuery;
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
    handleSizeChange(e) {
      this.pageJson.pageSize = e;
      this.queryCustomerData(1);
    },
    /**
     * 前往多少页
     * @param {number} e
     */
    handleCurrentChange(e) {
      this.queryCustomerData(e);
    }
  }
};
</script>
