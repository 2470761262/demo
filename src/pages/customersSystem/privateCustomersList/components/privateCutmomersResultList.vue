<style lang="less" scope>
.ResultWarp {
  position: relative;
  .ResultTil {
    font-size: @font24;
    margin-bottom: 25px;
  }
  .ResultListHeaderCell {
    background: #f0f2f5;
    padding-left: 45px;
    font-size: @font16;
    .ResultListTableCell {
      padding-left: 45px;
      font-size: @font16;
    }
  }
}
</style>
<template>
  <div class="ResultWarp">
    <div class="ResultTil">客源列表</div>

    <el-table :data="tableData" header-cell-class-name="ResultListHeaderCell">
      <div v-for="(item, index) in tableDataColumn" :key="index">
        <el-table-column
          cell-class-name="ResultListTableCell"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          :key="item.prop"
          :formatter="item.formart"
        ></el-table-column>
      </div>
    </el-table>
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
          prop: "seenNum",
          label: "上次维护时间",
          width: "180"
        },
        {
          prop: "name",
          label: "姓名",
          width: "180"
        },
        {
          prop: "communityName",
          label: "渠道",
          width: "130"
        },
        {
          prop: "price",
          label: "性别",
          width: "120px"
        },
        {
          prop: "inArea",
          label: "客户来源",
          width: "110px"
        },
        {
          prop: "unitPrice",
          label: "购房需求",
          width: "130px"
        }
      ],
      renderList: [],
      menuLoading: true, //自定义菜单
      tableColumn: [],
      tableData: [],
      attentionStatus: 0, //是否关注，1关注，0暂不关注
      limit: 15, //分页参数，每页条数
      page: 1, //分页参数，第几页
      pageTotal: 0, //总页数
      sortDirection: "", //排序方式，DESC降序（默认），ASC升序
      sortColumn: "", //排序字段，默认id
      customerIds: [] //客户id，数字数组
    };
  },
  created() {},
  mounted() {
    console.log(111111111);

    this.apply();

    tableMenu.getTableMenu(this.tableDataColumn, 1).then(e => {
      this.menuLoading = false;
      this.renderList = e;
    });
  },
  methods: {
    apply() {
      var that = this;
      this.$api
        .post({
          url: "/saleCustomer/listMyCustomers",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            limit: this.limit,
            page: this.page
          }
        })
        .then(e => {
          console.log(e);
          if (e.data.code == 200) {
            this.tableData = e.data;
          } else if (e.data.code == 400) {
            alert(e.data.message);
            console.log("失败     " + e.data);
          }
        });
    },
    tabColumnChange(e, length = 0) {
      let that = this;
      that.tableColumn = e;
      if (length > 0) {
        let prop = e.map(item => {
          return { prop: item.prop };
        });
        tableMenu.insert(prop, 1);
      }
    }
  }
};
</script>
