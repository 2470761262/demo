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
              <div class="query-content-cell">
                <h3 class="query-cell-title">电话</h3>
                <el-input
                  placeholder="客户电话"
                  v-model="queryData.tel"
                  class="set-input90"
                  clearable
                  oninput="value=value.replace(/[^\d]/g,'')"
                />
              </div>
              <div class="query-content-cell cell-interval75">
                <h3 class="query-cell-title">客户意向</h3>
                <el-select
                  multiple
                  placeholder="全部"
                  class="set-select120"
                  collapse-tags
                  v-model="queryData.selectedDesireIntensitys"
                >
                  <el-option
                    v-for="item in desireLists"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="query-content-cell cell-interval75">
                <h3 class="query-cell-title">带看进度</h3>
                <el-select
                  multiple
                  placeholder="全部"
                  class="set-select120"
                  collapse-tags
                  v-model="queryData.selectedPairParams"
                >
                  <el-option
                    v-for="item in pairNumberlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="page-list-query-row" v-if="changeQuery">
              <div class="query-content-cell">
                <h3 class="query-cell-title">价格</h3>
                <el-input
                  placeholder="最小值"
                  v-model="queryData.minPrice"
                  class="set-input90"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  clearable
                />
                <span class="cut-off-rule"></span>
                <el-input
                  placeholder="最大值"
                  v-model="queryData.maxPrice"
                  class="set-input90"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  clearable
                />
                <span class="query-cell-suffix">万元</span>
              </div>
              <div class="query-content-cell cell-interval75">
                <h3 class="query-cell-title">面积</h3>
                <el-input
                  placeholder="最小值"
                  v-model="queryData.minArea"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  class="set-input90"
                  clearable
                />
                <span class="cut-off-rule"></span>
                <el-input
                  placeholder="最大值"
                  v-model="queryData.maxArea"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  class="set-input90"
                  clearable
                />
                <span class="query-cell-suffix">平方</span>
              </div>
              <div class="query-content-cell cell-interval75">
                <h3 class="query-cell-title">户型</h3>
                <el-input
                  placeholder="最小值"
                  v-model="queryData.minRooms"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  class="set-input90"
                  clearable
                />
                <span class="cut-off-rule"></span>
                <el-input
                  placeholder="最大值"
                  v-model="queryData.maxRooms"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  class="set-input90"
                  clearable
                />
              </div>
            </div>
            <div class="page-list-query-row" v-if="changeQuery">
              <div class="query-content-cell">
                <h3 class="query-cell-title">带看时间</h3>
                <el-date-picker
                  v-model="pairTime"
                  type="daterange"
                  class="set-data-pricker set-pricker-width260"
                  range-separator="至"
                  start-placeholder="开始日期"
                  :default-time="['00:00:00', '23:59:59']"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
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
          <i class="iconzaishouwugendan iconfont"></i> <span>客源列表</span>
        </h3>
      </template>
      <template v-slot:left>
        <left-attention
          v-model="querySelectFlag"
          :fatherMethod="queryCustomerDataLeft"
          :parentPageType="'days7New'"
        ></left-attention>
      </template>
      <template v-slot:tableColumn>
        <el-table-column type="expand" width="1px">
          <template v-slot:default="props">
            <!-- 判断当前列  如果有则显示印象 且长度大于0 -->
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
    <!-- 写跟进弹框 -->
    <write-follow-up
      v-if="writeFlag"
      :visible.sync="writeFlag"
      title="写跟进"
      style-type="0"
      @followConfirmEmit="confirmEmit"
      width="4.63rem"
    ></write-follow-up>
  </div>
</template>

<script>
import listPage from "@/components/listPage";
import leftAttention from "../components/leftAttention";
import setImpression from "@/util/tabUtil";
export default {
  components: {
    listPage,
    leftAttention,
    writeFollowUp: () => import("../components/writeFollowUp")
  },
  data() {
    return {
      formData: {
        //客户id
        EntructId: "",
        //内容
        Memo: ""
      },
      activeProdata: null, //点击写跟进后，用来保存当前行的数据的临时变量
      queryUrl: { path: "../customersSystem/addCustomers", query: { a: 1 } },
      writeFlag: false, //写跟进弹框开关
      sssss: "", //请按照实际字段名进行修改，
      desireLists: [
        {
          value: "0",
          label: "无意向"
        },
        {
          value: "1",
          label: "较弱"
        },
        {
          value: "2",
          label: "一般"
        },
        {
          value: "3",
          label: "强烈"
        }
      ],
      pairNumberlist: [
        {
          value: "0",
          label: "未带看"
        },
        {
          value: "1",
          label: "首次带看"
        },
        {
          value: "2",
          label: "二次带看"
        },
        {
          value: "3",
          label: "三次带看"
        },
        {
          value: "4",
          label: "四次带看"
        },
        {
          value: "5",
          label: "五次以上"
        }
      ],
      ssslist: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      changeQuery: true, //顶部开关
      querySelectFlag: false, //侧边印象开关
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
            if (!row.rooms) {
              return "/";
            }
            let s = row.rooms.split("$").join("或");
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
          formart: e => {
            return (
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-phone"
                  disabled={this.dialButtonEnable}
                  onClick={this.dialPhone.bind(this, e)}
                >
                  一键拨号
                </el-button>
                <el-button
                  type="warning"
                  size="mini"
                  icon="el-icon-date"
                  disabled={this.modifyCustomerButtonEable}
                  onclick={this.modifyCustomer.bind(this, e)}
                >
                  修改
                </el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-edit"
                  disabled={this.addFollowLookButtonEable}
                  onclick={this.openPop.bind(this, "writeFlag", e)}
                >
                  写跟进
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
        minLastPairFollowTime: null, //最大带看时间条件
        maxLastPairFollowTime: null //最大带看时间条件
      },
      pairTime: null,
      queryParams: {},
      customerParams: {}, //左侧印象选中的条件
      myImpressions: {},
      dialButtonEnable: true, //一键拨号按钮权限
      addLookButtonEable: true, //添加带看权限
      addFollowLookButtonEable: true, //添加跟进
      modifyCustomerButtonEable: true, //修改权限控制
      deleteCustomerButtonEable: true //删除权限控制
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
            minLastPairFollowTime: this.queryData.minLastPairFollowTime,
            maxLastPairFollowTime: this.queryData.maxLastPairFollowTime
          };
          this.queryCustomerData(1);
        }
      },
      deep: true
    },
    pairTime: function(val) {
      if (val) {
        this.queryData.minLastPairFollowTime = val[0];
        this.queryData.maxLastPairFollowTime = val[1];
        console.log(
          this.queryData.minLastPairFollowTime,
          this.queryData.maxLastPairFollowTime,
          "设置了起止带看时间"
        );
      } else {
        this.queryData.minLastPairFollowTime = this.queryData.maxLastPairFollowTime = null;
        console.log("清空了起止带看时间");
      }
    }
  },
  mounted() {
    this.queryCustomerData(1);
  },
  methods: {
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
      console.log(p, "右侧印象触发查询");
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
        isPrivate: true,
        minAddTime: new Date().setDate(new Date().getDate() - 7)
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
            console.log(result, "查询我的客源列表（七日内新增）");
            var dataCustomers = result.data.data;
            _that.tableData = dataCustomers;
            _that.pageJson.total = result.data.dataCount;
            _that.myImpressions = result.data.myImpression;
            result.data.operationList.forEach((item, index) => {
              _that[item.rUrl] = false;
            });
            _that.$nextTick(() => {
              setImpression.removeIsEmptyTd();
            });
          } else {
            console.log("查询客源列表（七日内新增）" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("查询客源列表失败catch（七日内新增）");
          console.log(e);
        })
        .finally(() => {});
    },
    confirmEmit(e) {
      let _that = this;
      //获取文本值
      let textarea = e.textarea;
      //获取当前行的值
      let activeProdata = _that.activeProdata;
      //获取当前客户id
      let cid = activeProdata.id;
      // console.log(_that.activeProdata)
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
    /**
     * @example: 打开弹框
     * @param {string} popName
     */
    openPop(popName, e) {
      let _that = this;
      //把当前行的值保存到临时变量activeProdata
      _that.activeProdata = e;
      this[popName] = true;
    },
    modifyCustomer(row) {
      this.$router.push({
        name: "modifyCustomers",
        params: { customer: row, myImpression: this.myImpressions[row.id] }
      });
    },
    triggerChange() {
      this.changeQuery = !this.changeQuery;
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
