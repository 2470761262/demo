<template>
  <div>
    <!-- 买卖房源-审核列表 -->
    <div class="main">
      <div class="right">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps">
        </el-tree>
      </div>
      <div class="content">
        <el-table
          :data="workData"
          height="368"
          @sort-change="changeWorkSort"
        >
          <el-table-column
            v-for="(item, index) in workColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            :sortable="item.sortable"
            :sort-orders="['ascending', 'descending']"
            >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
              <el-button type="text" size="small">查看附件</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange($event, 'workPaginate')"
        @current-change="handleCurrentChange($event, 'workPaginate')"
        :current-page="workPaginate.page"
        :page-sizes="[5, 10, 15]"
        :page-size="workPaginate.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="workPaginate.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      workData: [],
      workColumn: [
        {
          prop: "",
          label: "楼盘名称",
          minWidth: "120",
          align: "left"
        }, {
          prop: "",
          label: "审核项目",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "",
          label: "审核类型",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "",
          label: "附件",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "",
          label: "提交人",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "",
          label: "提交时间",
          minWidth: "150",
          align: "right",
          sortable: true
        }
      ],
      workPaginate: {
        page: 1,
        limit: 5,
        total: 0,
        pageSum: 0
      },
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    /**
     * @example: 作业数据排序变化触发事件
     */
    changeWorkSort({column, prop, order}) {
      this.workSortColumn = prop;
      this.workSortType = order=="ascending" ? 0 : 1;
      Object.assign(this.workPaginate, this.$options.data().workPaginate);
      this.getWorkData();
    },
    /**
     * @example: 改变每页请求数据数量
     * @param {val} 请求数
     * @param {type} 分页类型
     */
    handleSizeChange(val, type) {
      this[type].limit = val;
      switch(type) {
        case "workPaginate":
          this.getWorkData();
          break;
        case "developPaginate":
          this.getDevelopData();
          break;
        case "currencyPaginate":
          this.getCurrencyData();
          break;
      }
    },
    /**
     * @example: 改变分页当前页码
     * @param {val} 页码
     * @param {type} 分页类型
     */
    handleCurrentChange(val, type) {
      this[type].page = val;
      switch(type) {
        case "workPaginate":
          this.getWorkData();
          break;
        case "developPaginate":
          this.getDevelopData();
          break;
        case "currencyPaginate":
          this.getCurrencyData();
          break;
      }
    },
    handleClick(row) {
      console.log(row);
    }
  }
}
</script>
<style lang="less" scoped>
  .main {
    display: flex;
    // prettier-ignore
    margin-top: 16PX;
    // prettier-ignore
    padding: 16PX;
    background: #fff;
    border-radius: 8px;
    .right {
      // prettier-ignore
      width: 224PX;
      // prettier-ignore
      height: 750PX;
      // prettier-ignore
      margin-right: 16PX;
      border: 1px solid #ddd;
    }
    /deep/.content {
      flex: 1;
      overflow: hidden;
      .caret-wrapper {
        // prettier-ignore
        width: 15PX;
        // prettier-ignore
        height: 14PX;
        .sort-caret.ascending {
          // prettier-ignore
          top: -5PX;
        }
        .sort-caret.descending {
          // prettier-ignore
          bottom: -3PX;
        }
      }
      .has-gutter:not(.is-group) {
        background: #F0F5F4;
        tr:nth-child(1) {
          th:nth-child(1) {
            .cell {
              // prettier-ignore
              padding-left: 16PX;
            }
          }
          th:nth-last-child(2) {
            .cell {
              // prettier-ignore
              padding-right: 16PX;
            }
          }
        }
      }
      .el-table__body-wrapper {
        tr {
          td:nth-child(1) {
            .cell {
              // prettier-ignore
              padding-left: 16PX;
            }
          }
          .cell:last-child {
            // prettier-ignore
            padding-right: 16PX;
          }
        }
      }
      .el-table {
        td {
          .cell {
            line-height: 1;
            font-size: @font16;
            color: #606266;
          }
        }
        th {
          // prettier-ignore
          height: 48PX;
          padding: 0;
          background: #F0F5F4;
          font-weight: normal;
          font-size: @font16;
          color: #303133;
          .cell {
            line-height: 1;
          }
        }
      }
      .el-table__body td {
        // perttier-ignore
        height: 64PX;
      }
      .el-pagination {
        // perttier-ignore
        padding: 24PX 5PX 8PX;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .el-pager li,
        .btn-next .el-icon,
        .btn-prev .el-icon,
        button,
        span:not([class*=suffix]) {
          height: auto;
          line-height: 1;
          font-size: @font16;
          font-weight: normal;
        }
        .el-select .el-input {
          // perttier-ignore
          width: 80PX;
        }
        .el-pagination__sizes .el-input .el-input__inner {
          // perttier-ignore
          height: 22PX;
          // perttier-ignore
          line-height: 20PX;
          font-size: @font14;
        }
        .el-pager .more::before {
          line-height: 1;
        }
        .el-pagination__editor {
          height: auto;
          .el-input__inner {
            // perttier-ignore
            height: 22PX;
          }
        }
        .el-input--mini .el-input__icon {
          line-height: 1;
        }
      }
      .el-table--border, .el-table--group {
        border: none;
      }
      .el-table--border::after, .el-table--group::after, .el-table::before {
        background-color: transparent;
      }
      .el-table--border td {
        border-right: none;
      }
      .is-group {
        tr:first-child {
          th:nth-child(2),
          th:nth-child(3),
          th:nth-child(4) {
            border-bottom: 1px solid #C3DFD9;
            border-right: 1px solid #c3dfd9;
          }
          th:nth-child(5) {
            border-bottom: 1px solid #C3DFD9;
          }
        }
        tr:nth-child(2) {
          th:nth-child(3),
          th:nth-child(6),
          th:nth-child(9) {
            border-right: 1px solid #c3dfd9;
          }
        }
      }
    }
  }
</style>
