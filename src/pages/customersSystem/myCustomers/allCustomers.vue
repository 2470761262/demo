<style lang="less" scoped>
.page-tab-title {
  color: #666666;
  font-size: 15px;
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 23px;
    margin-right: 10px;
  }
}
</style>
<template>
  <list-Page @handleCurrentChange="handleCurrentChange"
             :parentData="$data"
             @sort-change="sortMethod"
             @handleSizeChange="handleSizeChange">
    <template v-slot:top>
      <allCustomersQuery></allCustomersQuery>
    </template>
    <template v-slot:title>
      <h3 class="page-tab-title"><i class="iconzaishouwugendan iconfont"></i> <span>客源列表</span></h3>
    </template>
    <template v-slot:tableColumn>

    </template>
  </list-Page>
</template>

<script>
import listPage from "@/components/listPage";
import allCustomersQuery from "./components/allCustomersQuery";
export default {
  components: {
    listPage,
    allCustomersQuery
  },
  data() {
    return {
      loading: false,
      pageJson: {
        currentPage: 1, //当前页码
        total: 50, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [], //定义表格字段
      tableData: [] //存放表格数据
    };
  },
  methods: {
    /**
     * 排序触发
     */
    sortMethod() {},
    /**
     * @param {number} e
     * 设置一页显示多少个
     */
    handleSizeChange(e) {},
    /**
     * 前往多少页
     * @param {number} e
     */
    handleCurrentChange(e) {}
  }
};
</script>
