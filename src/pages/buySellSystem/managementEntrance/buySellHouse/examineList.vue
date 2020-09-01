<template>
  <!-- 买卖房源-审核列表 -->
  <div class="examine-container">
    <tabs :navActiveIndex="4"></tabs>
    <div class="conditions">
      <div class="conditions-box">
        <el-row :gutter="32">
          <el-form label-position="right" label-width="80px">
            <el-col :span="8">
              <el-row :gutter="10">
                <el-form-item label="楼盘">
                  <el-col :span="8">
                    <el-select v-model="val1" placeholder="楼盘">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="val2" placeholder="楼栋">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="val3" placeholder="房间号">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提交时间">
                <el-date-picker
                  prefix-icon="prefix-icon"
                  v-model="val4"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="起始时间"
                  end-placeholder="结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="房源编号">
                <el-input v-model="val5" placeholder="请输入房源编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核项目">
                <el-select class="width100" v-model="val6" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核类型">
                <el-select class="width100" v-model="val7" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核状态">
                <el-select class="width100" v-model="val8" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div class="conditions-btn">
        <button class="btn">重置</button>
        <button class="btn active">搜索</button>
      </div>
    </div>
    <div class="main">
      <div class="right">
        <div class="search">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="val8">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
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
        <div class="table">
          <el-table
            :data="workData"
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
        </div>
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
import tabs from './components/tabs.vue';
export default {
  components: {
    tabs
  },
  data() {
    return {
      val1: "",
      val2: "",
      val3: "",
      val4: "",
      val5: "",
      val6: "",
      val7: "",
      val8: "",
      val9: "",
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
.examine-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  .conditions {
    // prettier-ignore
    padding: 0 24PX 20PX 24PX;
    background: #fff;
    // prettier-ignore
    border-bottom-left-radius: 8PX;
    // prettier-ignore
    border-bottom-right-radius: 8PX;
    /deep/.conditions-box {
      .el-form-item__label {
        // prettier-ignore
        line-height: 36PX;
        font-weight: bold;
        font-size: @font14;
        color: #303133;
      }
      .el-input__inner {
        // prettier-ignore
        height: 36PX;
        font-size: @font14;
      }
      .el-form-item {
        // prettier-ignore
        margin-bottom: 16PX;
      }
      .el-range-input {
        text-align: left;
        // prettier-ignore
        text-indent: 10PX;
        font-size: @font14;
      }
      .prefix-icon {
        width: 0;
      }
      .el-date-editor {
        width: 100%;
        .el-range-separator {
          display: flex;
          justify-content: center;
          align-items: center;
          width: auto;
          padding: 0;
          line-height: 1;
          text-indent: 0;
          font-size: @font14;
        }
      }
      .width100 {
        width: 100%;
      }
    }
    .conditions-btn {
      display: flex;
      justify-content: flex-end;
      .btn {
        // prettier-ignore
        width: 90PX;
        // prettier-ignore
        height: 36PX;
        border: none;
        border-radius: 4px;
        background: #fff;
        outline: none;
        line-height: 1;
        text-align: center;
        font-size: @font12;
        color: @backgroud;
        cursor: pointer;
        &.active {
          // prettier-ignore
          margin-left: 9PX;
          background: @backgroud;
          color: #fff;
        }
      }
    }
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: row;
    // prettier-ignore
    min-height: 300PX;
    // prettier-ignore
    margin-top: 16PX;
    // prettier-ignore
    padding: 16PX;
    background: #fff;
    border-radius: 8px;
    /deep/.right {
      // prettier-ignore
      width: 224PX;
      height: 100%;
      // prettier-ignore
      margin-right: 16PX;
      background: #F0F7F7;
      .search {
        // prettier-ignore
        padding: 10PX;
        .el-input__prefix {
          left: 0;
          .el-input__icon {
            // prettier-ignore
            width: 30PX;
            // prettier-ignore
            line-height: 36PX;
            font-size: @font14;
          }
        }
        .el-input--prefix .el-input__inner {
          // prettier-ignore
          height: 36PX;
          padding-left: 30PX;
          // prettier-ignore
          line-height: 36PX;
          border: none;
          font-size: @font14;
        }
      }
      .el-tree {
        background: transparent;
      }
    }
    /deep/.content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .table {
        flex: 1;
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
}
</style>
