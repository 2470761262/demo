<style lang="less" scoped>
.page-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  .page-body-conter {
    flex: 1;
    display: flex;
    .page-body-conter-right {
      flex: 1;
      overflow: hidden;
    }
  }
  .page-body-floot {
    display: flex;
    justify-content: center;
  }
}
.query-center-item {
  margin-right: 20px;
  margin-bottom: 10px;
  @media (max-width: 1152px) {
    width: 100%;
    margin-right: 0px;
    /deep/.el-select {
      width: 100%;
    }
    /deep/.el-input__inner {
      width: 100%;
    }
  }
  &:last-of-type {
    margin-right: 0;
  }
}
.query-center {
  display: flex;
  @media (max-width: 1300px) {
    flex-wrap: wrap;
  }
}

.page-cell-append {
  display: flex;
  // align-items: center;
  &::before {
    content: attr(data-before);
    flex-shrink: 0;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #f5f7fa;
    color: #909399;
    padding: 0 20px;
    font-size: 14px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
    display: flex;
    align-items: center;
  }
  /deep/.el-input__inner {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
/deep/.el-tabs__nav-wrap {
  &::after {
    display: none;
  }
}
</style>
<template>
  <div class="page-body">
    <div class="page-body-conter">
      <div class="page-body-conter-left-slot">
        <slot name="left"></slot>
      </div>
      <div class="page-body-conter-right">
        <div class="query-center">
          <slot name="top"></slot>
        </div>
        <el-table :data="tableData"
                  border
                  v-loading="loading">
          <slot name="tableColumn"
                :tableData="tableDataColumn"></slot>
        </el-table>
      </div>
    </div>
    <div class="page-body-floot">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageJson.currentPage"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pageJson.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  watch: {
    $attrs: {
      deep: true,
      immediate: true,
      handler: function (val, oldVal) {
        Object.assign(this.$data, val.parentData);
      }
    }
  },
  data () {
    return {
      loading: true,
      configSet: {
        selectToTime: true,
        selectTo: true
      },
      pageJson: {},
      tableDataColumn: [],
      tableData: [],
      elTabs: {},
      options: [],
      queryData: {
        houseName: "",
        taskName: "",
        selectValue: "",
        timeSelect: ""
      }
    };
  },
  methods: {
    //查询按钮
    queryTabData () {
      this.$emit("queryTabData");
    },
    //tab切换
    handleClick (e) {
      this.$emit("handleClick", e);
    },
    //每页数据设置事件
    handleSizeChange (e) {
      this.$emit("handleSizeChange", e);
    },
    //前往多少页事件
    handleCurrentChange (e) {
      console.log("1");
      this.$emit("handleCurrentChange", e);
    }
  }
};
</script>
