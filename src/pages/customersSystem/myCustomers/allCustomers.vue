<style lang="less" scoped>
@import url("../less/custTab.less");
</style>
<template>
  <div class="list-content">
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
          <i class="iconzaishouwugendan iconfont"></i>
          <span>客源列表</span>
        </h3>
      </template>
      <template v-slot:left>
        <left-attention
          v-model="querySelectFlag"
          :fatherMethod="queryCustomerData"
        ></left-attention>
      </template>
      <template v-slot:tableColumn>
        <el-table-column type="expand" width="1px">
          <template v-slot:default="props">
            <!-- 判断当前列是否有  如果有则显示印象 且长度大于0 -->
            <template
              v-if="
                myImpressions.hasOwnProperty(props.row.id) &&
                  myImpressions[props.row.id].length > 0
              "
            >
              <div class="flex-expand">
                <div class="flex-impression-content">
                  <div
                    v-for="(item, index) in myImpressions[props.row.id]"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </div>
                <label class="trigger-impression-btn">
                  <input type="checkbox" class="impression-btn" />
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
    <write-follow-up
      v-if="writeFlag"
      :visible.sync="writeFlag"
      title="写跟进"
      style-type="0"
      @followConfirmEmit="confirmEmit"
      width="4.63rem"
    ></write-follow-up>
    <!-- 添加带看 -->
    <add-belt-look
      :visible.sync="beltlookFlag"
      v-if="beltlookFlag"
      title="添加带看"
      style-type="0"
      width="4.63rem"
      :customerId="currentClickCustomerId"
    >
    </add-belt-look>
    <!-- 删除-->
    <remove
      :visible.sync="removePop"
      v-if="removePop"
      style-type="0"
      title="删除"
      width="3.28rem"
      @transmitConfirm="removeTransmit"
    />
  </div>
</template>

<script>
import listPage from "@/components/listPage";
import allCustomersQuery from "../components/allCustomersQuery";
import leftAttention from "../components/leftAttention";
import setImpression from "@/util/tabUtil";
import util from "@/util/util";
export default {
  components: {
    listPage,
    allCustomersQuery,
    leftAttention,
    writeFollowUp: () => import("../components/writeFollowUp"),
    //添加带看
    addBeltLook: () => import("@/pages/customersSystem/components/addBeltLook"),
    remove: () =>
      import("@/pages/customersSystem/customersDetail/didLog/remove")
  },
  data() {
    return {
      removePop: false, //删除按钮弹框开关
      queryUrl: { path: "../customersSystem/addCustomers", query: { a: 1 } },
      formData: {
        //客户id
        EntructId: "",
        //内容
        Memo: ""
      },
      currentClickCustomerId: 0,
      beltlookFlag: false,

      queryParamsGroup: [
        {
          未带看: 0,
          首次带看: 0,
          二次带看: 0,
          三次带看: 0,
          四次带看: 0,
          五次带看以上: 0
        },
        { 强烈: 0, 一般: 0, 较弱: 0, 无意向: 0 },
        { 在谈: 0, 签约: 0 }
      ],
      querySelectFlag: true,
      loading: false,
      activeProdata: null, //点击写跟进后，用来保存当前行的数据的临时变量
      writeFlag: false, //写跟进弹框开关
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
              <el-rate value={row.desireIntensity} max={3} disabled></el-rate>
            );
          }
        },
        {
          prop: "priceRange",
          label: "总价",
          width: "120px",
          order: true,
          formart: (row, column) => {
            return (row.minPrice || "/") + "-" + (row.maxPrice || "/");
          }
        },
        {
          prop: "minArea",
          label: "面积",
          width: "120px",
          order: true,
          formart: (row, column) => {
            return (row.minArea || "/") + "-" + (row.maxArea || "/");
          }
        },
        {
          prop: "rooms",
          label: "户型",
          width: "120px",
          order: true,
          formart: (row, column) => {
            let s = "/";
            if (row.rooms) {
              s = row.rooms
                .split("$")
                .filter(item => item != undefined && item != null && item != "")
                .join("或");
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
          width: "450px",
          order: false,
          fixed: true,
          formart: (row, column) => {
            return (
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  disabled={this.dialButtonEnable}
                  icon="el-icon-phone"
                  onClick={this.dialPhone.bind(this, row)}
                >
                  一键拨号
                </el-button>
                <el-button
                  type="warning"
                  size="mini"
                  icon="el-icon-date"
                  disabled={this.addLookButtonEable}
                  onClick={this.openBetAdd.bind(this, row.id)}
                >
                  添加带看
                </el-button>
                <el-button
                  type="danger"
                  size="mini"
                  disabled={this.addFollowLookButtonEable}
                  icon="el-icon-edit"
                  onclick={this.openPop.bind(this, "writeFlag", row)}
                >
                  写跟进
                </el-button>
                <el-button
                  type="warning"
                  size="mini"
                  icon="el-icon-date"
                  disabled={this.modifyCustomerButtonEable}
                  onclick={this.modifyCustomer.bind(this, row)}
                >
                  修改
                </el-button>
                <el-button
                  type="warning"
                  size="mini"
                  disabled={this.deleteCustomerButtonEable}
                  icon="el-icon-date"
                  onclick={this.openDeleteCustomer.bind(this, row)}
                >
                  删除
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
      ], //存放表格数据
      myImpressions: {}, //对客户的印象，
      dialButtonEnable: true, //一键拨号按钮权限
      addLookButtonEable: true, //添加带看权限
      addFollowLookButtonEable: true, //添加跟进
      modifyCustomerButtonEable: true, //修改权限控制
      deleteCustomerButtonEable: true //删除权限控制
    };
  },
  mounted() {
    let _that = this;
    _that.pageJson.currentPage = 1;
    _that.queryCustomerData({ page: 1 });
    _that.staticsMyCustomerData();
  },
  methods: {
    openDeleteCustomer(e) {
      if (e.tag == 2 || e.tag == 3 || e.del == -1) {
        this.$message({
          type: "info",
          message: "该客户正在删除审核中，或审核失败"
        });
      } else {
        this.removePop = true;
        this.currentClickCustomerId = e.id;
      }
    },
    removeTransmit(e) {
      let that = this;
      let memo = e == 0 ? "客户无意向" : "空号";
      if (!that.currentClickCustomerId || that.currentClickCustomerId == 0) {
        this.$message({
          type: "info",
          message: "未获取客户id，无法删除"
        });
        return;
      }
      that.$api
        .post({
          url: "/saleCustomerOperation/deleteCustomer",
          qs: true,
          data: { customerId: that.currentClickCustomerId, memo: memo }
        })
        .then(e => {
          let result = e.data;
          console.log(result);
          if (result.code == 200) {
            this.$message({
              type: "info",
              message: "提交删除申请成功，请等待审核！"
            });
            that.removePop = false;
          } else {
            this.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("【【【【uups,客源删除申请失败】】】】");
          console.log(e);
        });
    },
    dialPhone(row) {
      let that = this;
      console.log(row, "点击了一键拨号");
      if (!row.tel) {
        this.$message({
          type: "info",
          message: "无客源号码"
        });
        return;
      }
      this.$confirm("确定拨号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let dailParams = {
            customerId: row.id,
            remark: "客源一键拨号",
            customerName: row.customers,
            contactPhone: row.tel,
            customerNo: row.customerNo,
            customerPlate: row.plate
          };
          console.log(dailParams, "即将一键拨号");
          that.$api
            .post({
              url: "/saleCustomer/DialPhoneToCustomer",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: dailParams
            })
            .then(e => {
              let result = e.data;
              console.log(result);
              if (result.code == 200) {
                this.$message({
                  type: "info",
                  message: "请注意查收微信消息"
                });
                //but.$emit("followReolad", true);
              } else {
                this.$message({
                  type: "info",
                  message: result.message
                });
              }
            })
            .catch(e => {
              console.log("【【【【uups,客源一键拨号失败】】】】");
              console.log(e);
              this.$message({
                type: "info",
                message: "客源一键拨号失败"
              });
            });
        })
        .catch(() => {});
    },
    modifyCustomer(row) {
      this.$router.push({
        name: "modifyCustomers",
        params: { customer: row, myImpression: this.myImpressions[row.id] }
      });
    },
    openBetAdd(customerId) {
      this.currentClickCustomerId = customerId;
      this.beltlookFlag = true;
    },
    confirmAddLook(e) {
      console.log(e, "eeeeeeeeeeeeee");
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
    queryCustomerData(params) {
      let _that = this;
      let queryParams = Object.assign(
        { limit: _that.pageJson.pageSize, del: 0, isPrivate: true },
        params
      );
      console.log(this);
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
            _that.myImpressions = result.data.myImpression;
            _that.pageJson.total = result.data.dataCount;
            result.data.operationList.forEach((item, index) => {
              _that[item.rUrl] = false;
            });
            //result.data.pageSum
            _that.$nextTick(() => {
              setImpression.removeIsEmptyTd();
            });
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
      if (
        this.myImpressions.hasOwnProperty(row.id) &&
        this.myImpressions[row.id].length > 0
      ) {
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
      console.log(e, "xxxxxxxxxxxxxxxxxxxxx");
      this.queryCustomerData({ page: 1 });
    },
    /**
     * 前往多少页
     * @param {number} e
     */
    handleCurrentChange(e) {
      this.pageJson.currentPage = e;
      let p2 = util.localStorageGet(
        "customers:allCustomers:impressionSelected"
      );
      let p1 = util.localStorageGet("customers:allCustomers:allParams");
      let p = {};
      if (p2) {
        p = Object.assign(p, p2);
      }
      if (p1) {
        p = Object.assign(p, p1);
      }
      this.queryCustomerData({ page: this.pageJson.currentPage });
    }
  }
};
</script>
