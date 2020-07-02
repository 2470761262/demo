<style lang="less" scope>
.ResultWarp {
  position: relative;
  .ResultTil {
    // prettier-ignore
    font-size:30PX ;
    margin-bottom: 25px;
  }
  .ResultListHeaderCell {
    background: #f0f2f5;
    padding-left: 45px;
    // prettier-ignore
    font-size:18PX ;
    .ResultListTableCell {
      padding-left: 45px;
      // prettier-ignore
      font-size:18PX ;
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
      tableData: []
    };
  },
  created() {},
  mounted() {
    tableMenu.getTableMenu(this.tableDataColumn, 1).then(e => {
      this.menuLoading = false;
      this.renderList = e;
    });
  },
  methods: {
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
