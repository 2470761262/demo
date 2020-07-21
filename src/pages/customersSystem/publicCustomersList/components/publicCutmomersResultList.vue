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
    padding-left: 45px;
    font-size: @font16;
    height: 64px;
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
</style>
<template>
  <div class="ResultWarp">
    <div class="ResultTil">客源列表</div>

    <el-table
      :data="tableData"
      header-cell-class-name="ResultListCell ResultListHeaderBack"
      cell-class-name="ResultListCell"
      @row-click="navigateTo"
      @sort-change="sortChange"
      v-loading="loading"
    >
      <div v-for="(item, index) in tableDataColumn" :key="index">
        <div
          v-if="item.prop == 'plateChangeTime' || item.prop == 'maintainTime'"
        >
          <el-table-column
            :prop="item.prop"
            sortable="custom"
            :label="item.label"
            :min-width="item.width"
            show-overflow-tooltip
            :key="item.prop"
            :formatter="item.formart"
          ></el-table-column>
        </div>
        <div v-else>
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"
            show-overflow-tooltip
            :key="item.prop"
            :formatter="item.formart"
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
</template>

<script>
import tableMenu from "@/util/getTableMenu";
export default {
  inject: ["form"],
  components: {},
  data() {
    return {
      tableDataColumn: [
        {
          prop: "maintainTime",
          label: "上次维护时间",
          width: "180",
          formart: item => item.maintainTime || "暂无"
        },
        {
          prop: "customers",
          label: "姓名",
          width: "180",
          formart: item => item.customers || "暂无"
        },

        {
          prop: "sex",
          label: "性别",
          width: "120px",
          formart: item => (item.sex == 0 ? "男" : "女") || "暂无"
        },
        {
          prop: "plateChangeTime",
          label: "进池时间",
          width: "180px",
          formart: item => item.plateChangeTime || "暂无"
        },
        {
          prop: "plateChangeReason",
          label: "进池原因",
          width: "130",
          formart: item => this.Reason(item.plateChangeReason) || "暂无"
        },
        {
          prop: "requireType",
          label: "购房需求",
          width: "130px",
          formart: item => this.houserequire(item.requireType) || "暂无"
        }
      ],
      renderList: [],
      menuLoading: true, //自定义菜单
      tableColumn: [],
      tableData: [],
      loading: false,
      limit: 15, //分页参数，每页条数
      page: 1, //分页参数，第几页
      pageSum: 0, //总页数
      dataCount: 0, //总条数
      sortDirection: "DESC", //排序方式，DESC降序（默认），ASC升序
      sortColumn: "plateChangeTime", //排序字段，默认id
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
    form: {
      deep: true,
      // immediate: true,
      handler: function(value, ordvalue) {
        console.log(value);
        this.page = 1;
        this.pageSum = 0;
        this.dataCount = 0;
        this.apply();
      }
    }
  },
  created() {},
  mounted() {
    this.apply();
    tableMenu.getTableMenu(this.tableDataColumn, 1).then(e => {
      this.menuLoading = false;
      this.renderList = e;
    });
  },
  methods: {
    sortChange(column) {
      console.log(column, "排序咯");
      if (column) {
        if (column.prop == "plateChangeTime" || column.prop == "maintainTime") {
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
      this.$api
        .post({
          url: "/saleCustomer/listPublicCustomers",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          data: {
            limit: that.limit,
            page: that.page,
            sortColumn: this.sortColumn,
            sortDirection: this.sortDirection,
            isPrivate: false, //是否私客，true私客，false公客
            keyWord: that.form.KeyWord, //关键词-客户信息
            requirementType:
              that.form.requirementType == ""
                ? null
                : that.form.requirementType,
            plate: that.form.plate,
            plateChangeReasons: that.form.plateChangeReasons
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
    Reason(i) {
      let type;
      switch (i) {
        case 1:
          type = "无效转入";
          break;
        case 2:
          type = "离职转入";
          break;
        case 3:
          type = "滚动转入";
          break;
        case 4:
          type = "核销房源转入";
          break;
        case 5:
          type = "超期未维护转入";
          break;
        default:
          break;
      }
      return type;
    },
    navigateTo(row) {
      this.$router.push({
        path: "/customers/publicCustomersDetail",
        query: { customerId: row.id }
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.apply();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.apply();
    }
  }
};
</script>
