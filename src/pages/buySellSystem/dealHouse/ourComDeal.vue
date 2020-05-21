<style lang="less" scoped>
.message-tips {
  color: red;
  font-size: 14px;
}
.elTree {
  height: 550px;
  overflow-y: auto;
}
</style>
<template>
  <list-page
    :parentData="$data"
    @queryTabData="queryTabData"
    @sort-change="sortMethod"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  >
    <template v-slot:left>
      <div class="elTree" v-if="treeData.length > 0">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          class="treeSearch"
        ></el-input>
        <el-tree
          ref="treeForm"
          :data="treeData"
          node-key="nodeId"
          show-checkbox
          :props="defaultProps"
          @check-change="handleCheckChange"
          :highlight-current="true"
          :filter-node-method="filterNode"
          check-strictly
          :action="''"
          empty-text="暂无数据，请检查权限"
          auto-expand-parent
          v-loading="treeLoading"
        ></el-tree>
      </div>
    </template>
    <template v-slot:top>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">楼盘</h3>
          <el-select
            class="anchor-point"
            v-model="data.comId"
            @focus="remoteInput"
            @change="queryDatalist"
            filterable
            remote
            clearable
            placeholder="楼盘名称"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              class="anchor-point"
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">编号</h3>
          <el-input
            placeholder="房源编号"
            v-model="data.houseNo"
            class="set-input200"
            @change="queryDatalist"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">价格</h3>
          <el-input
            placeholder="最小值"
            v-model="data.minPrice"
            class="set-input90 anchor-point"
            @change="queryDatalist"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            v-model="data.maxPrice"
            class="set-input90 anchor-point"
            @change="queryDatalist"
            clearable
          />
          <span class="query-cell-suffix">万</span>
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">面积</h3>
          <el-input
            placeholder="最小值"
            v-model="data.minInArea"
            class="set-input90 anchor-point"
            @change="queryDatalist"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            v-model="data.maxInArea"
            class="set-input90 anchor-point"
            @change="queryDatalist"
            clearable
          />
          <span class="query-cell-suffix">平方</span>
        </div>
      </div>
      <div class="page-list-query-row">
        <div class="query-content-cell ">
          <h3 class="query-cell-title">成交时间</h3>
          <el-date-picker
            v-model="data.timeSelect"
            type="daterange"
            class="set-data-pricker anchor-point"
            @change="queryDatalist"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
          <span class="query-cell-suffix handlebut anchor-point" @click="Remove"
            >清除</span
          >
        </div>
        <div class="query-content-cell cell-interval75">
          <el-button
            class="anchor-point"
            type="primary"
            size="mini"
            @click="queryDatalist"
            >查询</el-button
          >
        </div>
      </div>
      <div class="page-list-query-row">
        <div class="message-tips">
          ①非作业方在签订合同15天后才可查询;②成交房源将锁定90天,90天后将在'资源库-潜在房源'中显示;③90天内有出售请重新录入
        </div>
      </div>
    </template>
    <template #tableColumn="cell">
      <template v-for="item in cell.tableData">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="item.prop"
          show-overflow-tooltip
          :formatter="item.formart"
          :sort-orders="['ascending', 'descending']"
          :sortable="item.order"
        ></el-table-column>
      </template>
      <!-- <el-table-column label="操作"
                       fixed="right"
                       width="90">
        <template v-slot="scope">
          <el-button type="primary"
                     size="mini"
                     @click="toHouseDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column> -->
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPageNotLink";
import getMenuRid from "@/minxi/getMenuRid";
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  data() {
    return {
      loading: true,

      data: {
        comId: "",
        timeSelect: "",
        minArea: "",
        maxArea: "",
        minPrice: "",
        maxPrice: "",
        cbId: "",
        bhId: "",
        customName: "",
        tel: "",
        houseNo: ""
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        {
          prop: "houseNo",
          label: "房源编号",
          width: "170",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "communityName",
          label: "楼盘名称",
          width: "170",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "price",
          label: "成交价(万元)",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => item.price + "万元"
        },
        {
          prop: "inArea",
          label: "面积(m²)",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => item.inArea + "m²"
        },
        {
          prop: "unitPrice",
          label: "单价(元/m²)",
          order: "custom",
          disabled: false,
          default: true,
          format: item => item.unitpaice + "元/㎡"
        },
        {
          prop: "",
          label: "户型",
          width: "150",
          order: false,
          disabled: false,
          default: true,
          formart: item =>
            (item.rooms || 0) +
            "室" +
            (item.hall || 0) +
            "厅" +
            (item.toilet || 0) +
            "卫"
        },
        {
          prop: "seenNum",
          label: "被看次数",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => item.seenNum || 0
        },
        {
          prop: "tradeTime",
          label: "成交时间",
          order: "custom",
          disabled: false,
          default: true
        },
        {
          prop: "agentName",
          label: "跟单人",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "id",
          label: "成交人",
          order: false,
          disabled: false,
          default: true,
          formart: item => item.agentName
        }
      ],
      tableData: [],
      sortColumn: "id", //排序字段
      sortType: "descending", //排序类型
      treeData: [], //结构树
      filterText: "",
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      treeLoading: false,
      treeCondition: {
        0: [], //公司数组
        1: [], //部门数组
        2: [] //人员数组
      },
      chooseTree: [] //选中的树节点
    };
  },
  mounted() {
    this.queryOurComDeal(1);
    this.getTree();
  },
  methods: {
    toHouseDetail(row) {
      // let that = this;
      // console.log("进入交易房源详情");
      // if (!row.id) {
      //   that.$message.error("houseId都是空的，如何查看");
      //   return;
      // }
      // that.$router.push({
      //   name: "historyDetails",
      //   params: { houseId: row.id, tradeType: 0 }
      // });
    },
    sortMethod(e) {
      console.log(e, "eeee排序");
      this.sortColumn = e.prop;
      this.sortType = e.order;
      this.queryOurComDeal(1);
    },
    // queryTabData() {
    //   console.log(this, "111");
    // },
    queryDatalist() {
      this.queryOurComDeal(1);
    },
    // remoteMethod(query) {
    //   var that = this;
    //   if (query !== "") {
    //     that.loading = true;

    //     this.$api
    //       .get({
    //         url: "/community/ourComDeal",
    //         headers: { "Content-Type": "application/json;charset=UTF-8" },
    //         token: false,
    //         qs: true,
    //         data: {
    //           communityName: query
    //         }
    //       })
    //       .then(e => {
    //         console.log(e.data);
    //         that.loading = true;
    //         if (e.data.code == 200) {
    //           that.loading = false;
    //           that.options = e.data.data.list;
    //         }
    //       });
    //   } else {
    //     that.options = [];
    //   }
    // },
    Remove() {
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.queryOurComDeal(1);
    },
    queryOurComDeal(currentPage) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage - 1 };
      if (that.data.comId != null && that.data.comId.length > 0) {
        params.comId = that.data.comId;
      }
      if (that.data.timeSelect != null && that.data.timeSelect.length > 0) {
        params.beginTime = that.data.timeSelect[0];
        params.endTime = that.data.timeSelect[1];
      }
      if (that.data.minInArea != null && that.data.minInArea.length > 0) {
        params.minInArea = that.data.minInArea;
      }
      if (that.data.maxInArea != null && that.data.maxInArea.length > 0) {
        params.maxInArea = that.data.maxInArea;
      }
      if (that.data.minPrice != null && that.data.minPrice.length > 0) {
        params.minPrice = that.data.minPrice;
      }
      if (that.data.maxPrice != null && that.data.maxPrice.length > 0) {
        params.maxPrice = that.data.maxPrice;
      }
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      params.houseNo = this.data.houseNo;
      params.treeCompany = this.treeCondition[0].join(",");
      params.treeDepartment = this.treeCondition[1].join(",");
      params.treeAccount = this.treeCondition[2].join(",");
      console.log(params);
      this.$api
        .post({
          url: "/tradeHouse/getTradeHouse",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let data = e.data;
          that.loading = false;
          if (data.code == 200) {
            that.pageJson.total = data.data.dataCount;
            that.tableData = data.data.data;
          } else {
            // console.log("查询我司成交列表结果：" + result.message);
            //alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询我司成交列表失败");
          console.log(e);
        });
    },
    isForBut(type) {
      let array = [{ name: "查看", isType: "3", methosName: "" }];
      return array.filter(item => {
        return item.isType.includes(type);
      });
    },
    remoteInput() {
      if (this.data.comId == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod(query) {
      var that = this;
      if (query !== "") {
        this.loading = true;

        this.$api
          .get({
            url: "/community/ourComDeal",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              page: 1,
              limit: 50,
              communityName: query
            }
          })
          .then(e => {
            console.log(e.data);
            if (e.data.code == 200) {
              that.loading = false;
              that.options = e.data.data.list;
            }
          });
      } else {
        this.options = [];
      }
    },
    handleClick() {},
    queryTabData() {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryDatalist(1);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryOurComDeal(val);
    },
    handleSizeChange(val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryOurComDeal(1);
    },
    handleCheckChange(data, checked, indeterminate) {
      let key = data.type;
      this.chooseTree = []; //清空数组
      this.chooseTree.push(data.businessId);
      if (key == 1) {
        this.getUnderDepartment(data.childrenNodes);
      }
      if (checked) {
        let set = new Set([...this.treeCondition[key], ...this.chooseTree]);
        this.treeCondition[key] = [...set];
      } else {
        this.treeCondition[key] = this.treeCondition[key].filter(item => {
          return !this.chooseTree.includes(item);
        });
      }
      this.queryOurComDeal(1);
    },
    getUnderDepartment(list) {
      list.forEach(item => {
        if (item.type == 1) {
          this.chooseTree.push(item.businessId);
          if (item.childrenNodes != null && item.childrenNodes.length > 0) {
            this.getUnderDepartment(item.childrenNodes);
          }
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      if (data.labelName != null) {
        return data.labelName.indexOf(value) !== -1;
      }
    },
    getTree() {
      this.treeLoading = true;
      this.$api
        .post({
          url: "/tradeHouse/getTradeHouse",
          data: {
            tree: "1"
          },
          qs: true
        })
        .then(e => {
          this.treeLoading = false;
          if (e.data.code == 200 && e.data.data.length > 0) {
            this.treeData = e.data.data;
          }
        })
        .catch(e => {
          this.treeLoading = false;
        });
    }
  }
};
</script>
