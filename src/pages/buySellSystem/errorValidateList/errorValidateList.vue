<template>
  <list-page
    :parentData="$data"
    @queryTabData="queryTabData"
    @handleClick="handleClick"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  >
    <template v-slot:tableColumn="cell">
      <template v-for="item in cell.tableData">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="item.prop"
        >
        </el-table-column>
      </template>
      <el-table-column
        prop="operation"
        label="操作"
        fixed="right"
        key="operation"
      >
        <template v-slot="scope">
          <div v-if="scope.row.operation != ''">
            <el-button
              type="primary"
              size="mini"
              v-for="(item, index) in isForBut(scope.row.operation)"
              :key="index"
              >{{ item.name }}</el-button
            >
          </div>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  data() {
    return {
      pageJson: {
        currentPage: 1,
        total: 50
      },
      options: [
        {
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "待验真"
        },
        {
          value: "选项3",
          label: "客户验真"
        },
        {
          value: "选项4",
          label: "店长验真"
        },
        {
          value: "选项5",
          label: "验真失败"
        },
        {
          value: "选项6",
          label: "已过期"
        }
      ],
      elTabs: {
        activeName: "tab1",
        list: [
          { label: "全部", name: "tab1" },
          { label: "业主异常", name: "tab2" },
          { label: "客户异常", name: "tab3" }
        ]
      },
      tableDataColumn: [
        { prop: "house", label: "房源坐落" },
        { prop: "priceArea", label: "售价/面积" },
        { prop: "type", label: "户型" },
        { prop: "economicPro", label: "经济人" },
        { prop: "validateType", label: "验真状态" },
        { prop: "cutPro", label: "客户姓名" },
        { prop: "addTime", label: "发布时间" },
        { prop: "cellType", label: "类型" }
      ],
      tableData: [
        {
          house: "龙腾花园-16栋-604室",
          priceArea: "234万/100平",
          type: "3室2厅1卫",
          levae: "精装修",
          economicPro: "周杰伦",
          validateType: "通过",
          cutPro: "周杰伦1",
          addTime: "2019-01-01 18:00:00",
          cellType: "号码异常",
          operation: "3"
        },
        {
          house: "龙腾花园-16栋-604室",
          priceArea: "234万/100平",
          type: "3室2厅1卫",
          levae: "精装修",
          economicPro: "周杰伦2",
          validateType: "通过",
          cutPro: "周杰伦2",
          addTime: "2019-01-01 18:00:00",
          cellType: "号码异常",
          operation: "3"
        }
      ]
    };
  },
  methods: {
    queryTabData() {},
    isForBut(type) {
      let array = [{ name: "查看", isType: "3", methosName: "" }];
      return array.filter(item => {
        return item.isType.includes(type);
      });
    },
    handleClick() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
