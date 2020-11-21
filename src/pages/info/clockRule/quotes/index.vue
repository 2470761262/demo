<template>
  <!-- 名言警句 -->
  <div class="content">
    <div class="head">
      <div class="head-type">
        <div
          class="head-type-item"
          v-for="(item, index) in navs"
          :key="index"
          :class="{ active: currentNavIndex == index }"
          @click="navigateToOhter(item.path)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="head-underling-nva">
        <div class="head-nav-box">
          <div
            class="head-nav-item"
            v-for="(item, index) in subNavs"
            :key="index"
            :class="{ active: currentSubNavIndex == index }"
            @click="navigateToOhter(item.path, index)"
          >
            {{ item.name }}
          </div>
        </div>
        <button class="btn-add" @click="navigateToAdd()">新增名言警句</button>
      </div>
    </div>
    <div class="scroll">
      <div class="container">
        <div class="main">
          <div class="clock-rule-conditions">
            <div class="conditions-box">
              <el-row :gutter="32">
                <el-form label-position="right" label-width="64px">
                  <el-col :span="6">
                    <el-form-item label="名人姓名">
                      <el-input
                        class="width100"
                        clearable
                        v-model="formData.authorFamous"
                        maxlength="5"
                        placeholder="名人姓名"
                        oninput="value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')"
                        @blur="query(1)"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" class="fr">
                    <div class="conditions-btn">
                      <div class="btn" @click="reset">
                        重置
                      </div>
                      <div class="btn active" @click="query(1)">
                        搜索
                      </div>
                    </div>
                  </el-col>
                </el-form>
              </el-row>
            </div>
          </div>
          <div class="wrapper">
            <div class="right"></div>
            <div class="center">
              <div class="table">
                <el-table
                  :data="tableData"
                  height="100%"
                  v-loading="loading"
                  ref="tableList"
                  element-loading-text="正在加载"
                >
                  <el-table-column
                    type="index"
                    width="60"
                    label="序号"
                    prop="id"
                  ></el-table-column>
                  <el-table-column
                    min-width="280"
                    prop="contentFamous"
                    label="激励语内容"
                    align="right"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    min-width="200"
                    prop="authorFamous"
                    label="名人"
                    align="right"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    align="right"
                    width="300"
                  >
                    <template v-slot="scope">
                      <el-button
                        @click="navigateToEdit(scope.row.id)"
                        type="text"
                        size="small"
                        >编辑</el-button
                      >
                      <el-button
                        @click="deleteClick(scope.row.id)"
                        type="text"
                        size="small"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageJson.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageJson.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageJson.total"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增名言警句弹窗 -->
    <add-quotes-dialog
      :dialogVisible.sync="addQuotesDialogVisible"
      @add="add"
    ></add-quotes-dialog>
    <!-- 编辑名言警句弹窗 -->
    <edit-quotes-dialog
      :dialogVisible.sync="editQuotesDialogVisible"
      :famousId="famousId"
      v-if="editQuotesDialogVisible"
      @edit="edit"
    ></edit-quotes-dialog>
  </div>
</template>
<script>
import clockRuleHead from "@/pages/info/mixins/clockRuleHead.js";
import addQuotesDialog from "./components/addQuotesDialog.vue";
import editQuotesDialog from "./components/editQuotesDialog.vue";
export default {
  mixins: [clockRuleHead],
  components: { addQuotesDialog, editQuotesDialog },
  data() {
    return {
      currentSubNavIndex: 1,
      subSecondNavs: [
        {
          name: "我的日志",
          path: "/clockList/myInfo",
          rUrl: "workSummary"
        },
        {
          name: "考勤统计",
          path: "/clockList/statistic",
          rUrl: "statistics"
        },
        {
          name: "考勤审批",
          path: "/clockList/examine",
          rUrl: "audit"
        }
      ],
      addQuotesDialogVisible: false,
      editQuotesDialogVisible: false,
      loading: false,
      tableData: [],
      pageJson: {
        page: 1,
        limit: 10,
        total: 0,
        pageSum: 0
      },
      formData: {
        authorFamous: ""
      }, //头部查询条件
      famousId: 0
    };
  },
  watch: {},
  mounted() {
    this.getData();
  },
  methods: {
    /**
     * @example:添加弹窗
     */
    navigateToAdd() {
      this.addQuotesDialogVisible = true;
    },
    /**
     * @example:编辑弹窗
     * @param {id} 名言id
     */
    navigateToEdit(id) {
      this.famousId = id;
      this.editQuotesDialogVisible = true;
    },
    /**
     * @example：重置
     */
    reset() {
      Object.keys(this.formData).forEach(e => {
        this.formData[e] = "";
      });
      this.query();
    },
    /**
     * @example:查询
     */
    query(page = 1) {
      this.pageJson.page = page;
      this.tableData = [];
      this.getData();
    },
    /**
     * @example: 改变每页请求数据数量
     * @param {val} 请求数
     * @param {type} 分页类型
     */
    handleSizeChange(val) {
      this.pageJson.limit = val;
      this.query();
    },
    /**
     * @example: 改变分页当前页码
     * @param {val} 页码
     * @param {type} 分页类型
     */
    handleCurrentChange(val) {
      this.query(val);
    },
    /**
     * @example:获取列表数据
     */
    getData() {
      let params = {
        limit: this.pageJson.limit,
        page: this.pageJson.page
      };
      Object.assign(params, JSON.parse(JSON.stringify(this.formData))); //合并查询条件
      this.loading = true;
      this.$api
        .post({
          url: "attendance/famouseWork/listFamousRemark",
          data: params,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.tableData = result.data.list;
            this.pageJson.total = result.data.totalCount;
            this.pageJson.pageSum = result.data.totalPage;
          }
        })
        .finally(e => {
          this.loading = false;
        });
    },
    /**
     * @example:添加成功回显事件
     */
    add() {
      this.query();
    },
    /**
     * @example:编辑成功回显事件
     */
    edit() {
      this.query();
    },
    /**
     * @example:删除事件
     * @param {id}  名言id
     */
    deleteClick(id) {
      this.$confirm("您确定要删除选中的数据吗?删除后，数据将不可恢复", {
        confirmButtonText: "扔要删除",
        cancelButtonText: "我再想想",
        title: "温馨提示",
        center: true
      }).then(() => {
        this.$api
          .post({
            url: `/attendance/famouseWork/deleteById?id=${id}`
          })
          .then(e => {
            this.$message({
              message: e.data.message
            });
            if (e.data.code == 200) {
              this.query();
            }
          });
      });
    }
  }
};
</script>
<style lang="less">
.children-page {
  height: 100%;
}
</style>
<style lang="less" scoped>
/*** element下拉选择面板 ***/
.el-select-dropdown__item {
  height: 40px;
  line-height: 40px;
  font-size: @font14;
}
/*** element开关 ***/
/deep/.el-switch {
  .el-switch__core {
    height: 18px;
  }
  .el-switch__core:after {
    width: 14px;
    height: 14px;
  }
  &.is-checked .el-switch__core::after {
    margin-left: -15px;
  }
}
/deep/.clock-rule-conditions {
  padding: 24px 24px 0;
  .conditions-box {
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f2f5;
  }
  .fr {
    float: right;
  }
  .el-form-item__content {
    line-height: inherit;
  }
  .el-form-item__label {
    padding-right: 8px;
    line-height: 36px;
    font-size: @font14;
    color: #303133;
  }
  .el-input__inner {
    height: 36px;
    font-size: @font14;
  }
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-range-input {
    text-align: left;
    text-indent: 5px;
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
  .conditions-btn {
    display: flex;
    justify-content: flex-end;
    .btn {
      width: 90px;
      height: 36px;
      border: none;
      border-radius: 4px;
      background: #fff;
      outline: none;
      line-height: 36px;
      text-align: center;
      font-size: @font14;
      color: @backgroud;
      cursor: pointer;
      &.active {
        background: @backgroud;
        color: #fff;
      }
    }
  }
}
.content {
  flex: 1;
  height: 0;
  background: #f0f7f7;
  display: flex;
  flex-direction: column;
  .head {
    background: #fff;
    // position: sticky;
    // top: 0;
    // z-index: 10;
    .head-type {
      height: 67px;
      display: flex;
      padding: 0 24px;
      border-bottom: 1px solid #f0f2f5;
      .head-type-item {
        position: relative;
        line-height: 67px;
        margin-right: 46px;
        color: #303133;
        font-size: @font18;
        cursor: pointer;
        &.active {
          color: @backgroud;
          font-weight: bold;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: @backgroud;
            border-radius: 2px 2px 0px 0px;
          }
        }
      }
    }
    .head-underling-nva {
      display: flex;
      height: 58px;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      .head-nav-box {
        display: flex;
        .head-nav-item {
          height: 26px;
          padding: 0 8px;
          border-radius: 4px;
          border: 1px solid transparent;
          box-sizing: border-box;
          font-size: @font14;
          text-align: center;
          line-height: 24px;
          color: #606266;
          margin-right: 16px;
          cursor: pointer;
          &.active {
            color: @backgroud;
            background: @opacityBackground;
            border: 1px solid @backgroud;
          }
        }
      }
      .btn-add {
        height: 40px;
        padding: 0 16px;
        line-height: 40px;
        background: @backgroud;
        border: none;
        border-radius: 4px;
        color: #fff;
        outline: none;
        cursor: pointer;
      }
    }
  }
  .scroll {
    flex: 1;
    display: flex;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .container {
      flex: 1;
      display: flex;
      padding: 24px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        background: #fff;
        box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
        border-radius: 8px;
        .wrapper {
          flex: 1;
          display: flex;
          flex-direction: row;
          padding: 0 24px;
          margin: 24px 0 27px;
          background: #fff;
          border-radius: 8px;
          box-sizing: border-box;
          overflow: auto;
          &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            background-color: rgba(0, 0, 0, 0);
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 6px;
            background-color: #bbb;
          }
          &::-webkit-scrollbar-track {
            // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #fff;
          }
          .right {
            height: 100%;
          }
          /deep/.center {
            flex: 1;
            display: flex;
            flex-direction: column;
            width: 100%;
            *::-webkit-scrollbar {
              width: 6px;
              height: 6px;
              background-color: rgba(0, 0, 0, 0);
            }
            *::-webkit-scrollbar-thumb {
              border-radius: 6px;
              background-color: #bbb;
            }
            *::-webkit-scrollbar-track {
              // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              background: #fff;
            }
            .table {
              flex: 1;
              display: flex;
              overflow: auto;
              .caret-wrapper {
                width: 15px;
                height: 14px;
                .sort-caret.ascending {
                  top: -5px;
                }
                .sort-caret.descending {
                  bottom: -3px;
                }
              }
              .has-gutter:not(.is-group) {
                background: #f0f5f4;
                tr:nth-child(1) {
                  th:nth-child(1) {
                    .cell {
                      padding-left: 16px;
                    }
                  }
                  th:nth-last-child(2) {
                    .cell {
                      padding-right: 16px;
                    }
                  }
                }
              }
              .el-table__body-wrapper {
                tr {
                  td:nth-child(1) {
                    .cell {
                      padding-left: 16px;
                    }
                  }
                  td:last-child {
                    .cell {
                      padding-right: 16px;
                    }
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
                  height: 48px;
                  padding: 0;
                  background: #f6f6f6;
                  font-weight: normal;
                  font-size: @font16;
                  color: #303133;
                  .cell {
                    line-height: 1;
                  }
                }
              }
              .el-table__fixed-right {
                tr {
                  th:last-child {
                    padding-right: 16px;
                  }
                }
              }
              .el-table__body td {
                height: 64px;
              }
              .el-button--mini,
              .el-button--small {
                padding: 0 10px;
                font-size: @font16;
              }

              .tab-house-box {
                .tab-house-title {
                  margin-bottom: 8px;
                  font-size: @font16;
                  color: #606266;
                }
                .tab-house-no {
                  font-size: @font14;
                  color: #909399;
                }
              }
              .span_success,
              .span_danger,
              .span_warning,
              .span_info {
                display: inline-block;
                padding: 6px 13px;
                border-radius: 2px;
                line-height: 1;
                text-align: center;
                font-size: @font14;
              }
              .span_success {
                background: #0da88b19;
                color: #0da88b;
              }
              .span_danger {
                background: #ef565619;
                font-size: @font14;
                color: #ef5656;
              }
              .span_warning {
                background: #f6a42019;
                font-size: @font14;
                color: #f6a420;
              }
              .span_info {
                background: #e4e4e4;
                font-size: @font14;
                color: #909399;
              }
            }
            .el-pagination {
              padding: 24px 5px 8px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              .el-pager li,
              .btn-next .el-icon,
              .btn-prev .el-icon,
              button,
              span:not([class*="suffix"]) {
                height: auto;
                line-height: 1;
                font-size: @font16;
                font-weight: normal;
              }
              .el-select .el-input {
                width: 80px;
              }
              .el-pagination__sizes .el-input .el-input__inner {
                height: 22px;
                line-height: 20px;
                font-size: @font14;
              }
              .el-pager .more::before {
                line-height: 1;
              }
              .el-pagination__editor {
                height: auto;
                .el-input__inner {
                  height: 22px;
                }
              }
              .el-input--mini .el-input__icon {
                line-height: 1;
              }
            }
            .el-table--border,
            .el-table--group {
              border: none;
            }
            .el-table--border::after,
            .el-table--group::after,
            .el-table::before {
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
                  border-bottom: 1px solid #c3dfd9;
                  border-right: 1px solid #c3dfd9;
                }
                th:nth-child(5) {
                  border-bottom: 1px solid #c3dfd9;
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
    }
  }
}
</style>
