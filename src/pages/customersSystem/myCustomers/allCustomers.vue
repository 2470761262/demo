<style lang="less" scoped>
</style>
<template>
  <list-Page @handleCurrentChange="handleCurrentChange"
             :parentData="$data"
             @sort-change="sortMethod"
             @handleSizeChange="handleSizeChange"></list-Page>
</template>

<script>
import listPage from "@/components/listPage";
export default {
  components: {
    listPage
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
