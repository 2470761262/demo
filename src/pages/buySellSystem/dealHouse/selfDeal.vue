<style lang="less" scoped>
.tab-title {
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
    @handleClick="handleClick"
    @sort-change="sortMethod"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
    :dblclick="true"
    @cellDblClick="toHouseDetail"
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
            data-anchor="业主自售楼盘筛选 => select"
            class="anchor-point"
            @click.native="log_socket.sendUserActionData"
            v-model="data.comId"
            @focus="remoteInput"
            @change="queryCBId"
            filterable
            remote
            clearable
            placeholder="楼盘名称"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              class="anchor-point"
              @click.native="log_socket.sendUserActionData"
              v-for="item in options"
              :data-anchor="'业主自售楼盘筛选 => select => option:' + item.name"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            data-anchor="业主自售楼栋筛选 => select"
            class="anchor-point"
            @click.native="log_socket.sendUserActionData"
            v-model="data.cbId"
            filterable
            clearable
            placeholder="楼栋"
            @change="buildChange"
          >
            <el-option
              class="anchor-point"
              @click.native="log_socket.sendUserActionData"
              v-for="item in cbIdList"
              :data-anchor="'业主自售楼栋筛选 => select => option:' + item.name"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="data.bhId"
            filterable
            @click.native="log_socket.sendUserActionData"
            data-anchor="业主自售房间号筛选 => select"
            placeholder="房间号"
            class="anchor-point"
            :loading="HouseNoLoading"
            v-loadmore="loadMore"
          >
            <el-option
              class="anchor-point"
              @click.native="log_socket.sendUserActionData"
              v-for="item in roomNoList"
              :data-anchor="
                '业主自售房间号筛选 => select => option:' + item.name
              "
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
            data-anchor="业主自售房源编号搜索"
            v-model="data.houseNo"
            class="set-input200 anchor-point"
            @change="queryDatalist"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">业主</h3>
          <el-input
            data-anchor="业主自售姓名搜索"
            placeholder="姓名"
            v-model="data.customName"
            class="set-input120 anchor-point"
            @change="queryDatalist"
            clearable
          />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">电话</h3>
          <el-input
            placeholder="业主电话"
            v-model="data.tel"
            data-anchor="业主自售电话搜索"
            class="set-input200 anchor-point"
            @change="queryDatalist"
            clearable
          />
        </div>
      </div>
      <div class="page-list-query-row">
        <div class="query-content-cell ">
          <h3 class="query-cell-title">价格</h3>
          <el-input
            placeholder="最小值"
            v-model="data.minPrice"
            data-anchor="业主自售价格最小值筛选"
            class="set-input90 anchor-point"
            @change="queryDatalist"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            v-model="data.maxPrice"
            data-anchor="业主自售价格最大值筛选"
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
            data-anchor="业主自售面积最小值筛选"
            clearable
          />
          <span class="cut-off-rule"></span>
          <el-input
            placeholder="最大值"
            v-model="data.maxInArea"
            class="set-input90 anchor-point"
            @change="queryDatalist"
            data-anchor="业主自售面积最大值筛选"
            clearable
          />
          <span class="query-cell-suffix">平方</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">录入时间</h3>
          <el-date-picker
            v-model="data.timeSelect"
            type="daterange"
            data-anchor="业主自售录入时间筛选"
            class="set-data-pricker anchor-point"
            @change="queryDatalist"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
          <span class="query-cell-suffix handlebut" @click="Remove">清除</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <el-button
            class="anchor-point"
            type="primary"
            data-anchor="业主自售查询按钮"
            size="mini"
            @click="queryDatalist"
            >查询</el-button
          >
        </div>
        <div class="query-content-cell cell-interval25">
          <moreSelect
            @moreSelectChange="moreSelectChange"
            deptUrl="tradeHouse/getOwnerTrade"
          ></moreSelect>
        </div>
      </div>
    </template>
    <template v-slot:title>
      <span class="tab-title"
        >本列表仅供查询使用,本列表房源在'资源库-暂不售'
        内同步显示,转在售请到'暂不售'页面</span
      >
    </template>
    <template v-slot:tableColumn="cell">
      <template v-for="item in cell.tableData">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="item.prop"
          :formatter="item.formart"
          :sort-orders="['ascending', 'descending']"
          :sortable="item.order"
        ></el-table-column>
      </template>
      <el-table-column label="操作" fixed="right" width="90">
        <template v-slot="scope">
          <el-button
            class="anchor-point"
            data-anchor="业主自售查看按钮"
            type="primary"
            size="mini"
            @click="toHouseDetail(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import moreSelect from "@/components/moreSelect";
import common from "../houseResource/common/common";
import util from "@/util/util";
export default {
  mixins: [getMenuRid],
  components: {
    listPage,
    moreSelect
  },
  data() {
    return {
      HouseNoLoading: false,
      houseNoPage: {
        // 房间分页数据
        currentPage: 1,
        totalPage: 1,
        limit: 30
      },
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
          prop: "selfSaleType",
          label: "成交方式",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => (item.selfSaleType == 1 ? "亲朋好友" : "疑似跳单")
        },
        {
          prop: "agentName",
          label: "跟单人",
          order: false,
          disabled: false,
          default: true
        }
      ],
      tableData: [],
      moreSelect: [],
      transitionList: [
        {
          key: "addTime",
          value: [
            { paramsKey: "beginTime", index: 0 },
            { paramsKey: "endTime", index: 1 }
          ]
        },
        {
          key: "followTime",
          value: [
            { paramsKey: "beginFollowTime", index: 0 },
            { paramsKey: "endFollowTime", index: 1 }
          ]
        },
        {
          key: "area",
          value: [{ paramsKey: "busy", index: -1 }]
        }
      ],
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
  watch: {
    filterText(val) {
      this.$refs.treeForm.filter(val);
    }
  },
  methods: {
    moreSelectChange(e) {
      this.moreSelect = e;
      this.queryOurComDeal(1);
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
    toHouseDetail(item) {
      let id = item.id;
      console.log(id);
      if (!item.id) {
        that.$message.error("houseId都是空的，如何查看");
        return;
      }
      var that = this;
      util.openPage.call(this, {
        name: "historyDetails",
        params: { houseId: id, tradeType: 1 }
      });
    },
    queryDatalist() {
      this.queryOurComDeal(1);
    },
    // remoteInput() {
    //   if (this.comId.length == 0) {
    //     this.remoteMethod();
    //   }
    // },
    // remoteMethod(query) {
    //   var that = this;
    //   if (query !== "") {
    //     that.loading = true;
    //     that.$api
    //       .get({
    //         url: "/community/selfDeal",
    //         headers: { "Content-Type": "application/json;charset=UTF-8" },
    //         token: false,
    //         qs: true,
    //         data: {
    //           communityName: query
    //         }
    //       })
    //       .then(e => {
    //         console.log(e.data);
    //         if (e.data.code == 200) {
    //           that.loading = false;

    //           that.options = e.data.data.list;
    //         }
    //       });
    //   } else {
    //     that.options = [];
    //   }
    // },
    queryCBId() {
      var that = this;
      if (that.data.comId == "") {
        that.data.roomNo = "";
        that.data.cbId = "";
      }
      that.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: that.data.comId,
            page: 1,
            limit: 9999
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.cbId = "";
            that.data.bhId = "";
            that.cbIdList = e.data.data.list;
          }
        });
    },
    buildChange() {
      Object.assign(this.$data.houseNoPage, this.$options.data().houseNoPage);
      this.roomNoList = [];
      this.queryRoomNo();
    },
    loadMore() {
      if (this.houseNoPage.currentPage < this.houseNoPage.totalPage) {
        ++this.houseNoPage.currentPage;
        this.queryRoomNo();
      }
    },
    queryRoomNo() {
      var that = this;
      this.HouseNoLoading = true;
      that.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: that.data.comId,
            cbId: that.data.cbId,
            page: this.houseNoPage.currentPage,
            limit: 300
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.bhId = "";
            this.roomNoList = [...this.roomNoList, ...e.data.data.list];
            this.houseNoPage.totalPage = e.data.data.totalPage;
          }
        })
        .finally(() => {
          this.HouseNoLoading = false;
        });
    },
    Remove() {
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.queryOurComDeal(1);
    },
    queryOurComDeal(currentPage) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage - 1 };

      if (Object.keys(this.moreSelect).length != 0) {
        let selectObject = common.getSelectParams(
          this.transitionList,
          this.moreSelect
        );
        Object.assign(params, selectObject);
      } else {
        if (that.data.comId != null && that.data.comId.length > 0) {
          params.comId = that.data.comId;
        }
        if (that.data.cbId != null && that.data.cbId.length > 0) {
          params.cbId = that.data.cbId;
        }
        if (that.data.bhId != null && that.data.bhId.length > 0) {
          params.bhId = that.data.bhId;
        }
        if (that.data.customName != null && that.data.customName.length > 0) {
          params.customName = that.data.customName;
        }
        if (that.data.tel != null && that.data.tel.length > 0) {
          params.tel = that.data.tel;
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
        params.houseNo = this.data.houseNo;
      }
      params.treeCompany = this.treeCondition[0].join(",");
      params.treeDepartment = this.treeCondition[1].join(",");
      params.treeAccount = this.treeCondition[2].join(",");
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      console.log(params);
      this.$api
        .post({
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          url: "/tradeHouse/getOwnerTrade",
          data: params
          // qs: true
        })
        .then(e => {
          console.log(e.data);
          that.loading = false;
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.dataCount;

            that.tableData = data.data.data;
          } else {
            // console.log("查询业主自售列表结果：" + result.message);
            // alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询业主自售列表失败");
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
            url: "/community/selfDeal",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
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
      this.queryOurComDeal(1);
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
    formatData(row, column) {
      if (column.property == "unitPrice") {
        if (
          row.price == null ||
          row.area == null ||
          row.price == 0 ||
          row.area == 0
        ) {
          return "";
        } else {
          return parseFloat((row.price / row.area) * 10000).toFixed(2);
        }
      }
      if (column.property == "houseType") {
        return row.rooms + "室" + row.hall + "厅" + row.toilet + "卫";
      }
      if (column.property == "tradeTime") {
        if (row.tradeTime.length > 19) {
          return row.tradeTime.substring(0, 19);
        } else {
          return row.tradeTime;
        }
      }
      if (column.property == "selfSaleType") {
        if (row.selfSaleType.length < 1) {
          return "";
        } else {
          return ["疑似跳单", "亲朋好友", ""][row.selfSaleType];
        }
      }
      return row[column.property];
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
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          url: "/tradeHouse/getOwnerTrade",
          data: {
            tree: "1"
          }
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
