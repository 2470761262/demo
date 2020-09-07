<style lang="less" scope>
.ResultWarp {
  position: relative;
  .ResultTil {
    font-size: @font24;
    margin-bottom: 25px;
  }
  .ResultListHeaderBack {
    background: #f0f2f5;
  }
  .ResultListCell {
    // padding-left: 45px;
    font-size: @font16;
    height: 64px;
    /deep/.cell {
      line-height: 1;
    }
  }
}
.paginationRow {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  .Pagemsg {
    padding: 10px 0;
    font-size: @font16;
    > span {
      padding-right: 10px;
    }
  }
  /deep/.el-pagination {
    /deep/.el-pager {
      > li {
        padding: 0 8px;
      }
      /deep/.active {
        border-radius: 4px;
        color: #ffffff;
        background: @backgroud;
        font-size: 16px;
      }
    }
  }
}
.ResultBody {
  display: flex;
  .ResultLeft {
    // prettier-ignore
    flex: 0 0 224PX;
    flex-shrink: 0;
    background: #f0f7f7;
    .list-left {
      // prettier-ignore
      padding: 10PX 0;
      // prettier-ignore
      margin-bottom: 7PX;
      display: flex;
      flex-direction: column;
      .treeSearch {
        // prettier-ignore
        height: 36PX;
        // prettier-ignore
        padding:0 10PX;
        box-sizing: border-box;
        /deep/.el-input__inner {
          height: 100%;
          // prettier-ignore
          line-height: 36PX;
          // prettier-ignore
          padding-left: 30PX;
          border: none;
          background: #fff;
        }
        /deep/.el-input__prefix {
          // prettier-ignore
          width: 30PX;
          // prettier-ignore
          left: 10PX;
          /deep/.el-input__icon {
            font-size: @font14;
          }
        }
      }
      .scroll-tree {
        flex: 1;
        overflow: auto;
      }
      /deep/.el-tree {
        background: inherit;
        .el-tree-node__content {
          // prettier-ignore
          height: 40PX;
          .el-icon-caret-right {
            font-size: @font14;
            color: #8ebebe;
          }
          .is-leaf {
            color: transparent !important;
          }
          .el-tree-node__label {
            font-size: @font14;
          }
          .el-checkbox {
            .el-checkbox__inner {
              // prettier-ignore
              width: 16PX;
              // prettier-ignore
              height: 16PX;
              font-size: @font14;
              &::after {
                // prettier-ignore
                height: 10PX;
                // prettier-ignore
                left:5PX;
                // prettier-ignore
                width: 3PX;
              }
            }
          }
        }
      }
      /deep/.is-focusable {
        .el-tree-node__children {
          background: #d5f0f0;
        }
      }
    }
  }
  .ResultRight {
    // prettier-ignore
    margin-left: 10PX;
    flex: 1;
    width: 0;
  }
}
.row-line {
  display: flex;
  align-items: center;
  // prettier-ignore
  margin-bottom: 17PX;
  h3 {
    // prettier-ignore
    margin-right: 10PX;
    font-size: @font14;
    color: #303133;
    font-weight: normal;
  }
}
</style>
<template>
  <div class="ResultWarp">
    <div class="ResultTil">客源列表</div>
    <div class="ResultBody">
      <div class="ResultLeft">
        <div class="list-left">
          <el-input
            data-anchor="我的对赌树 => input"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            class="treeSearch"
            prefix-icon="el-icon-search"
          ></el-input>
          <div class="scroll-tree">
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
        </div>
      </div>
      <div class="ResultRight">
        <div class="row-line" v-show="form.isTypeChange == 2">
          <h3>带看时间</h3>
          <el-date-picker
            v-model="timeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="apply"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>
        <el-table
          :data="tableData"
          header-cell-class-name="ResultListCell ResultListHeaderBack"
          cell-class-name="ResultListCell"
          @row-dblclick="navigateTo"
          @sort-change="sortChange"
          v-loading="loading"
        >
          <div v-for="(item, index) in tableDataColumn" :key="index">
            <div v-if="item.prop == 'maintainTime'">
              <el-table-column
                sortable="custom"
                :prop="item.prop"
                :label="item.label"
                :min-width="item.width"
                :key="item.prop"
                show-overflow-tooltip
                :formatter="item.formart"
                :fixed="item.fixed"
              ></el-table-column>
            </div>
            <div v-else>
              <el-table-column
                :prop="item.prop"
                :label="item.label"
                :min-width="item.width"
                :key="item.prop"
                show-overflow-tooltip
                :formatter="item.formart"
                :fixed="item.fixed"
              ></el-table-column>
            </div>
          </div>
        </el-table>
        <div class="paginationRow">
          <div class="Pagemsg">
            <span>总共{{ dataCount }}条</span>
            <span
              >显示{{ dataCount == 0 ? 0 : limit * page - limit + 1 }}-{{
                dataCount > limit * page ? limit * page : dataCount
              }}条</span
            >
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[15, 25, 35]"
            :page-size="limit"
            layout=" prev, pager, next, sizes,jumper"
            :total="dataCount"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tableMenu from "@/util/getTableMenu";
import util from "@/util/util";
export default {
  inject: ["form"],
  components: {},
  data() {
    return {
      timeValue: "",
      filterText: "",
      treeData: [], //结构树
      treeLoading: false,
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      tableDataColumn: [],
      treeCondition: {
        0: [], //公司数组
        1: [], //部门数组
        2: [] //人员数组
      },
      chooseTree: [], //选中的树节点
      renderList: [],
      menuLoading: true, //自定义菜单
      tableColumn: [],
      tableData: [],
      sortColumn: "id",
      sortDirection: "DESC",
      loading: false,
      tooltip: true,
      isPrivate: "", //是否私客，true私客，false公客
      limit: 15, //分页参数，每页条数
      page: 1, //分页参数，第几页
      pageSum: 0, //总页数
      dataCount: 0, //总条数
      customerIds: [], //客户id，数字数组
      requireTypeDefinition: {
        1: "买二手住宅",
        2: "买二手商铺",
        4: "买二手写字楼",
        8: "买新房住宅",
        16: "买新房商铺",
        32: "买新房写字楼",
        64: "租赁住宅",
        128: "租赁商铺",
        256: "租赁写字楼"
      }
    };
  },
  watch: {
    "form.isTypeChange"(val) {
      this.$refs.treeForm.setCheckedKeys([]);
      this.timeValue = "";
      this.initTab(val);
    },
    form: {
      deep: true,
      // immediate: true,
      handler: function(value, ordvalue) {
        this.page = 1;
        this.pageSum = 0;
        this.dataCount = 0;
        this.apply();
      }
    }
  },
  created() {
    this.getTree();
  },
  mounted() {
    //console.log(111111111);
    this.initTab(1);
    this.apply();

    tableMenu.getTableMenu(this.tableDataColumn, 1).then(e => {
      this.menuLoading = false;
      this.renderList = e;
    });
  },
  methods: {
    initTab(val) {
      if (val == 1) {
        this.tableDataColumn = [
          {
            prop: "customers",
            label: "姓名",
            fixed: "left",
            formart: item => item.customers || "暂无"
          },
          {
            prop: "online",
            label: "渠道",
            formart: item => (item.onLine == 0 ? "线下" : "线上") || "暂无"
          },
          {
            prop: "sex",
            label: "性别",
            formart: item => (item.sex == 0 ? "男" : "女") || "暂无"
          },
          {
            prop: "source",
            label: "客户来源",
            formart: item => this.housesource(item.source)
          },
          {
            prop: "agentName",
            label: "录入人"
          },
          {
            prop: "requireType",
            label: "购房需求",
            formart: item => this.houserequire(item.requireType) || "暂无"
          },
          {
            prop: "maintainTime",
            label: "上次维护时间",
            formart: item => item.maintainTime || "暂无"
          }
        ];
      } else if (val == 2) {
        this.tableDataColumn = [
          {
            prop: "customers",
            label: "姓名",
            fixed: "left",
            formart: item => item.customers || "暂无"
          },
          {
            prop: "online",
            label: "渠道",
            formart: item => (item.onLine == 0 ? "线下" : "线上") || "暂无"
          },
          {
            prop: "sex",
            label: "性别",
            formart: item => (item.sex == 0 ? "男" : "女") || "暂无"
          },
          {
            prop: "source",
            label: "客户来源",
            formart: item => this.housesource(item.source)
          },
          {
            prop: "addPerName",
            label: "录入人"
          },
          {
            prop: "requireType",
            label: "购房需求",
            formart: item => this.houserequire(item.requireType) || "暂无"
          },
          {
            prop: "communityName",
            label: "带看楼盘"
          },
          {
            prop: "memo",
            label: "带看总结",
            width: "150"
          }
        ];
      }
    },
    getTree() {
      this.treeLoading = true;
      //读取树数据

      this.$api
        .post({
          url:
            this.form.isTypeChange == 1
              ? "/saleCustomer/listPrivateCustomers"
              : "/saleCustomer/listFollowCustomer",
          data: {
            tree: "1"
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          this.treeLoading = false;
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.treeData = result.data;
          } else {
            console.log("载入结果" + +result.message);
            alert(result.message);
          }
        })
        // .then(() => {
        //   if (this.$route.query.cur != null) {
        //     this.curNodeId = [this.$route.query.cur];
        //     this.$nextTick(() => {
        //       this.handleCheckChange(
        //         this.$refs.treeForm.getNode(...this.curNodeId).data,
        //         true
        //       );
        //     });
        //   }
        // })
        .catch(e => {
          this.treeLoading = false;
          console.log("读取失败");
          console.log(e);
        });
    },
    handleCheckChange(data, checked, node) {
      console.log("sxsxsxs");
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
      this.apply();
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
    sortChange(column) {
      console.log(column, "排序咯");
      if (column) {
        if (column.prop == "maintainTime") {
          this.page = 1;
          this.pageSum = 0;
          this.dataCount = 0;
          this.sortColumn = column.prop;
          this.sortDirection = column.order == "ascending" ? "ASC" : "DESC";
          this.apply();
        }
      }
    },
    apply() {
      var that = this;
      this.loading = true;
      let url = "/saleCustomer/listPrivateCustomers";

      if (this.form.isTypeChange == 1) {
        url = "/saleCustomer/listPrivateCustomers";
      } else if (this.form.isTypeChange == 2) {
        url = "/saleCustomer/listFollowCustomer";
      }

      this.$api
        .post({
          url: url,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          data: {
            sortColumn: this.sortColumn,
            sortDirection: this.sortDirection,
            limit: that.limit,
            page: that.page,
            isPrivate: true, //是否私客，true私客，false公客
            keyWord: that.form.searchType === "1" ? that.form.keyWord : "", //关键词-客户信息
            myImpression: that.form.searchType === "2" ? that.form.keyWord : "", //关键词-客户印象
            requirementType:
              that.form.requirementType == ""
                ? null
                : that.form.requirementType, //需求类型参数
            desireIntensitys: that.form.desireIntensitys, //意愿
            pairNumbers: that.form.pairNumbers, //带看次数，多选，数字数组
            attentionStatus: that.form.attentionStatus, //是否关注
            isBuy: that.form.isBuy == 1 ? 1 : "", //是否成交
            minPrice: that.form.minPrice, //最低价
            maxPrice: that.form.maxPrice, //最高价
            minArea: that.form.minArea, //最小面积
            maxArea: that.form.maxArea, //最大面积
            houseNumbers: that.form.houseNumbers, //房型 需要处理数据
            minAddTime: that.form.minAddTime, //委托开始时间
            maxAddTime: that.form.maxAddTime, //委托结束时间
            minMainTainTime: that.form.minMainTainTime, //维护开始时间
            maxMainTainTime: that.form.maxMainTainTime, //维护结束时间
            minLastPairFollowTime: that.form.minLastPairFollowTime, //带看开始时间
            maxLastPairFollowTime: that.form.maxLastPairFollowTime, //带看结束时间
            treeCompany: this.treeCondition[0].join(","),
            treeDepartment: this.treeCondition[1].join(","),
            treeAccount: this.treeCondition[2].join(","),
            beginTime: this.timeValue != "" ? this.timeValue[0] : "",
            endTime: this.timeValue != "" ? this.timeValue[1] : ""
          }
        })
        .then(e => {
          console.log(e.data);
          let json = e.data;
          if (json.code == 200) {
            this.tableData = json.data.data;
            this.pageSum = json.data.pageSum;
            this.dataCount = json.data.dataCount;
          } else if (json.code == 400) {
            alert(json.message);
            console.log("失败     " + json);
          }
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.apply();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.apply();
    },
    houserequire(i) {
      let type = "";
      if (!i) {
        return "暂无";
      }
      for (var key in this.requireTypeDefinition) {
        //遍历键值对
        if ((key & i) == key) {
          type += this.requireTypeDefinition[key] + ",";
        }
      }
      if (type) {
        type = type.substr(0, type.length - 1);
      }
      return type;
    },
    housesource(i) {
      let type;
      console.log(i);
      switch (i) {
        case 11:
          type = "老客户";
          break;
        case 12:
          type = "转介绍";
          break;
        case 13:
          type = "亲戚朋友";
          break;
        case 14:
          type = "同学";
          break;
        case 21:
          type = "业主资料";
          break;
        case 22:
          type = "重复购买";
          break;
        case 31:
          type = "58同城";
          break;
        case 32:
          type = "安居客";
          break;
        case 33:
          type = "朋友圈";
          break;
        case 34:
          type = "其他网络";
          break;
        case 41:
          type = "公众号";
          break;
        case 42:
          type = "小程序";
          break;
        case 43:
          type = "APP";
          break;
        default:
          break;
      }
      return type;
    },
    navigateTo(row) {
      let dom = document.getElementsByClassName("el-tooltip__popper");
      if (dom.length > 0) {
        dom.forEach(item => {
          item.style.display = "none";
        });
      }
      let id = row.id;

      if (row.cusId != null) {
        id = row.cusId;
      }
      console.log("--------", id);
      let routeUrl = this.$router.resolve({
        path: "/customers/customersDetail",
        query: { customerId: btoa(id) }
      });

      window.open(routeUrl.href, "_blank");
      // console.log("=======>", atob(id));
      // this.$router.push({
      //   path: "/customers/customersDetail",
      //   query: { customerId: row.id }
      // });
    }
  }
};
</script>
