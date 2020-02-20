<style lang="less">
.elTree {
  width: 200px;
  margin-right: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 0 15px 15px;
  border-radius: 10px;
  /deep/.el-input {
    margin: 10px 0 10px;
  }
}
</style>
<template>
  <list-page
    :parentData="$data"
    @queryTabData="queryTabData"
    @handleClick="handleClick"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  >
    <template v-slot:tree>
      <div class="elTree">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
        <el-tree
          ref="tree2"
          :data="treeData"
          :default-expanded-keys="[1]"
          node-key="id"
          show-checkbox
          :props="defaultProps"
          @check-change="checkChange"
          @check="checkcheck"
          :highlight-current="true"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
    </template>
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
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  components: {
    listPage
  },
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: "总公司",
          children: [
            {
              id: 2,
              label: "xx区域1",
              children: [
                {
                  id: 3,
                  label: "xx门店",
                  children: [
                    {
                      id: 4,
                      label: "xx经纪人"
                    },
                    {
                      id: 44,
                      label: "xx经纪人"
                    }
                  ]
                }
              ]
            },
            {
              id: 5,
              label: "xx区域2",
              children: [
                {
                  id: 6,
                  label: "xx门店",
                  children: [
                    {
                      id: 7,
                      label: "xx经纪人"
                    }
                  ]
                }
              ]
            },
            {
              id: 8,
              label: "xx区域2",
              children: [
                {
                  id: 9,
                  label: "xx门店",
                  children: [
                    {
                      id: 10,
                      label: "xx经纪人"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      queryData: {
        houseName: "",
        taskName: "",
        selectValue: "",
        timeSelect: ""
      },
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
          { label: "待验真", name: "tab1" },
          { label: "验真通过", name: "tab2" },
          { label: "验真未通过", name: "tab3" },
          { label: "已过期", name: "tab4" },
          { label: "全部", name: "tab5" }
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
    checkcheck(e, data) {
      console.log(e, data);
      //  console.log(this.$refs.tree2.getNode(44), "getNode");
    },
    getCurrentKey() {
      console.log(this.$refs.tree2.getCurrentKey(), "getCurrentKey");
      //  this.$refs.tree2.setCurrentKey(44);
    },
    checkChange(e, data, childData) {
      //console.log(e, data, childData, "checkChange");
      //console.log(this.$refs.tree2.getCheckedKeys(), "id");
      // console.log(this.$refs.tree2.getCheckedNodes());
      //console.log(this.$refs.tree2.getNode(false, true));
    },
    //树输入筛选
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //树点击
    handleNodeClick(e) {
      //   console.log(e);
    },
    //筛选查询
    queryTabData() {},
    handleClick() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSizeChange(val) {
      console.log(`每1页 ${val} 条`);
    }
  }
};
</script>
