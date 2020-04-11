<style lang="less" scoped>
.page-body {
  display: flex;
  background: #fff;
  flex: 1;
  .page-body-warp {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .page-body-conter {
    flex: 1;
    padding-left: 20px;

    .page-body-conter-title {
      padding: 15px 0;
    }
    .page-body-conter-flex {
      display: flex;
      height: 100%;
      .page-body-conter-left-slot {
        position: relative;
        display: flex;
      }
      .page-body-conter-right {
        flex: 1;
        overflow: hidden;
        width: 0;
      }
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
  //display: flex;
  //padding-top: 30px;
  padding-left: 20px;
  @media (max-width: 1300px) {
    flex-wrap: wrap;
  }
}

.page-cell-append {
  display: flex;
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
.tabIsMar {
  padding-left: 20px;
}
.queryIsPad {
  padding-top: 10px;
}
.division-line {
  height: 6px;
  background: #f4f4f4;
}
/deep/.headerCellSet {
  background: #fafafa;
  text-align: center;
  color: #262626;
  font-weight: normal;
  height: 50px;
  padding: 0;
}
/deep/.cellItemSet {
  color: #262626;
  padding: 0;
  vertical-align: middle;
  height: 50px;
  font-size: 15px;
  text-align: center;
}
/deep/.el-table__body-wrapper {
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-button,
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-track-piece {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color--primary);
    border-radius: 50px;
  }
}
/deep/.el-table__fixed-right {
  height: 100% !important;
}
/deep/.hover-row {
  color: #262626;
}
</style>
<template>
  <div class="page-body">
    <div class="page-body-warp">
      <div class="query-center">
        <slot name="top"></slot>
      </div>
      <div class="division-line"
           v-if="$scopedSlots.top"></div>
      <div class="page-body-conter">
        <div class="page-body-conter-title"
             v-if="$scopedSlots.title">
          <slot name="title"></slot>
        </div>
        <div class="page-body-conter-flex">
          <div class="page-body-conter-left-slot">
            <slot name="left"></slot>
          </div>
          <div class="page-body-conter-right"
               :class='{"tabIsMar": $scopedSlots.left,"queryIsPad":$scopedSlots.top && !$scopedSlots.title}'>
            <el-table :data="tableData"
                      @cell-dblclick="toHouseDetail"
                      border
                      :header-cell-class-name="( $attrs.headerClass || $attrs.headerClass == '') ? $attrs.headerClass: 'headerCellSet' "
                      :cell-class-name="( $attrs.cellClass || $attrs.cellClass == '')  ? $attrs.cellClass: 'cellItemSet'"
                      ref="table"
                      v-bind="$attrs"
                      v-on="$listeners"
                      v-loading="loading">
              <slot name="tableColumn"
                    :tableData="tableDataColumn"></slot>
            </el-table>
          </div>
          <sidebarList v-if="sidebarFlag"></sidebarList>
        </div>
      </div>
      <div class="page-body-floot">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageJson.currentPage"
                       :page-sizes="pageJson.sizes || [5,10,15,20]"
                       :page-size="pageJson.size || 10"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pageJson.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import sidebarList from "./sidebarList";
export default {
  inheritAttrs: false,
  components: {
    sidebarList
  },
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
      sidebarFlag: true,
      loading: true,
      pageJson: {
        sizes: [5, 10, 15, 20],
        size: 10
      },
      tableDataColumn: [],
      tableData: []
    };
  },
  mounted () { },
  methods: {
    toHouseDetail (row) {
      console.log(1111111111111111111);
      var that = this;
      if (!this.$attrs.dblclick) {
        if (row.houseId != undefined && row.houseId > row.id)
          that.$router.push({
            name: `${
              that.$attrs.pageName ? that.$attrs.pageName : "houseDetails"
              }`,
            params: { houseId: row.houseId }
          });
        else {
          that.$router.push({
            name: `${
              that.$attrs.pageName ? that.$attrs.pageName : "houseDetails"
              }`,
            params: { houseId: row.id }
          });
        }
      } else {//使用各自页面的双击事件
        this.$emit("cellDblClick", row);
      }
    },
    //每页数据设置事件
    handleSizeChange (e) {
      this.$emit("handleSizeChange", e);
    },
    //前往多少页事件
    handleCurrentChange (e) {
      this.$emit("handleCurrentChange", e);
    }
  }
};
</script>
