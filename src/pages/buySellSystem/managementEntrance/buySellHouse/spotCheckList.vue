<style lang="less" scoped>
.spot-check {
  display: flex;
  flex-direction: column;
  flex: 1;
  .change-content {
    text-align: center;
    margin-bottom: 4px;
    margin-top: 10px;
    color: @backgroud;
    font-size: @font16;

    span {
      cursor: pointer;

      .iconfont {
        margin-left: 8px;
        font-size: @font14;
        transition: transform 0.3s;
        transform: rotateZ(180deg);
        display: inline-block;

        &.rotate {
          transform: rotateZ(0deg) !important;
        }
      }
    }
  }
  .tab-filter-radio {
    display: flex;
    justify-content: flex-end;
    padding-right: 46px;
    padding-bottom: 10px;
    position: sticky;
    top: 0px;
    z-index: 10;
    margin-top: -30px;
    .filter-radio-item {
      display: flex;
      cursor: pointer;
      // prettier-ignore
      margin-left: 30PX;
      align-items: center;
      input {
        display: none;
      }
      input[type="checkbox"]:checked + span {
        &::before {
          content: "\2713";
          color: black;
          font-size: @font16;
        }
      }
      &:first-child {
        margin-left: 0;
      }
      span {
        font-size: @font16;
        color: black;
        display: flex;
        align-items: center;
        font-weight: 600;
        &::before {
          content: "";
          // prettier-ignore
          width: 16PX;
          // prettier-ignore
          height: 16PX;
          // prettier-ignore
          line-height: 16PX;
          margin-right: 8px;
          text-align: center;
          border: 1px solid black;
        }
      }
    }
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: row;
    // prettier-ignore
    min-height: 700PX;
    // prettier-ignore
    margin-top: 16PX;
    // prettier-ignore
    padding: 16PX;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    .right {
      height: 100%;
    }
    /deep/.content {
      flex: 1;
      display: flex;
      flex-direction: column;
      .batch-button {
        // prettier-ignore
        width: 90PX;
        // prettier-ignore
        height: 36PX;
        border: none;
        border-radius: 4px;
        outline: none;
        line-height: 1;
        text-align: center;
        font-size: @font14;
        cursor: pointer;
        background: @backgroud;
        color: #fff;
        margin-bottom: 10px;
      }
      .table {
        flex: 1;
        // prettier-ignore
        min-height: 150PX;
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
          //background: #f0f5f4;
          background: #e3e3e3;
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
        .el-checkbox__inner {
          width: 18px;
          height: 18px;
        }
        .el-table__body-wrapper {
          tr {
            td:nth-child(1) {
              .cell {
                // prettier-ignore
                padding-left: 16PX;
              }
            }
            td:last-child {
              .cell {
                // prettier-ignore
                padding-right: 16PX;
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
            // prettier-ignore
            height: 48PX;
            padding: 0;
            background: #f0f5f4;
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
          height: 64px;
        }
        .el-button--mini,
        .el-button--small {
          // prettier-ignore
          padding: 0 10PX;
          font-size: @font16;
        }
        .tab-com-item {
          margin-top: 10px;
          .tab-title {
            font-size: @font16;
            color: #606266;
          }
          .tab-content {
            margin-top: 10px;
            font-size: @font14;
            color: #909399;
          }
        }
      }
      .el-pagination {
        // perttier-ignore
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
          // perttier-ignore
          width: 80px;
        }
        .el-pagination__sizes .el-input .el-input__inner {
          // perttier-ignore
          height: 22px;
          // perttier-ignore
          line-height: 20px;
          font-size: @font14;
        }
        .el-pager .more::before {
          line-height: 1;
        }
        .el-pagination__editor {
          height: auto;
          .el-input__inner {
            // perttier-ignore
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
</style>
<style lang="less">
.children-page {
  height: 100%;
}
</style>
<template>
  <!--买卖房源-抽检列表-->
  <div class="spot-check">
    <breadcrumb></breadcrumb>
    <div class="page-half-top" v-show="panelChange">
      <nav-menu :navMenuIndex="1"></nav-menu>
      <tabs :navActiveIndex="5"></tabs>
      <spot-check-head
        @moreConditionChange="moreConditionChange"
      ></spot-check-head>
    </div>
    <div class="change-content">
      <span
        @click="panelChangeBtn"
        class="anchor-point"
        data-anchor="首页展开选项/收起"
        >展开选项/收起<i
          class="iconfont iconxingzhuangjiehe1"
          :class="{ rotate: panelChange }"
        ></i
      ></span>
    </div>
    <div class="main">
      <div class="right"></div>
      <div class="content">
        <button class="batch-button" @click="batchSpotCheck">批量抽检</button>
        <div class="tab-filter-radio">
          <label
            class="filter-radio-item anchor-point"
            data-anchor="管理者通道-买卖房源-抽检列表 30天无带看"
          >
            <input
              type="checkbox"
              true-value="1"
              false-value=""
              @change="conditionChange"
              v-model="condition.seenNumRecent0"
            />
            <span>30天无带看</span>
          </label>
          <label
            class="filter-radio-item anchor-point"
            data-anchor="管理者通道-买卖房源-抽检列表 30天无回访"
          >
            <input
              type="checkbox"
              true-value="1"
              false-value=""
              @change="conditionChange"
              v-model="condition.callNum0"
            />
            <span>30天无回访</span>
          </label>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            height="100%"
            v-loading="loading"
            @sort-change="sortMethod"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              v-for="(item, index) in workColumn"
              :key="index"
              :prop="item.prop"
              :fixed="item.fixed"
              :label="item.label"
              :width="item.width"
              :min-width="item.minWidth"
              :align="item.align"
              :sortable="item.sortable"
              :sort-orders="['ascending', 'descending']"
              :formatter="item.formart"
            ></el-table-column>
            <el-table-column label="操作" fixed="right">
              <template v-slot="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="operation(scope.row.id)"
                  >抽检</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="condition.page"
          :page-sizes="[20, 50, 100]"
          :page-size="condition.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageJson.total"
        ></el-pagination>
      </div>
    </div>
    <!--抽检弹窗-->
    <spot-check-pop
      :showFlag.sync="visible"
      :houseIdList="houseIdList"
      @spotCheckSubmit="spotCheckSubmit"
    ></spot-check-pop>
  </div>
</template>

<script>
import breadcrumb from "../components/entranceBreadcrumb.vue";
import navMenu from "../components/entranceNavMenu.vue";
import tabs from "./components/tabs.vue";
import spotCheckHead from "./components/validate/spotCheckHead.vue";
import spotCheckPop from "./didlog/spotCheckPop.vue";
export default {
  components: {
    breadcrumb,
    navMenu,
    tabs,
    spotCheckHead,
    spotCheckPop
  },
  data() {
    return {
      panelChange: true, //折叠面板
      tableData: [],
      loading: false,
      pageJson: {
        total: 0,
        pageSum: 0
      }, //分页条数
      condition: {
        page: 1,
        limit: 100,
        seenNumRecent0: "",
        callNum0: "",
        sortColumn: "id",
        sortType: "DESC"
      }, //基础查询条件
      moreCondition: {}, //更多筛选条件，
      workColumn: [
        {
          prop: "houseNo",
          fixed: "left",
          label: "房屋信息",
          minWidth: "180",
          align: "left",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-title">{item.communityName}</div>
                <div class="tab-content">{item.houseNo}</div>
              </div>
            );
          }
        },
        {
          prop: "price",
          label: "售价",
          minWidth: "60",
          align: "right",
          formart: item => {
            return `${item.price}万`;
          }
        },
        {
          prop: "inArea",
          label: "面积",
          minWidth: "60",
          align: "right",
          formart: item => {
            return `${item.inArea}m²`;
          }
        },
        {
          prop: "rooms",
          label: "户型",
          minWidth: "60",
          align: "right",
          formart: item => {
            return `${item.rooms || 0}-${item.hall || 0}-${item.toilet ||
              0}-${item.balcony || 0}`;
          }
        },
        {
          prop: "agentName",
          label: "跟单人",
          minWidth: "70",
          align: "right",
          sortable: true,
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-title">{item.agentName}</div>
                <div class="tab-content">{item.deptName}</div>
              </div>
            );
          }
        },
        {
          prop: "addTime",
          label: "挂牌时间",
          minWidth: "100",
          align: "right",
          sortable: true,
          formart: item => {
            return `${item.listingTime}`;
          }
        },
        {
          prop: "seenNumRecent",
          label: "30天带看",
          minWidth: "80",
          align: "right",
          sortable: true
        },
        {
          prop: "callNum",
          label: "30天电话回访",
          minWidth: "110",
          align: "right",
          sortable: true
        },
        {
          prop: "spotCheckNum",
          label: "抽检次数",
          minWidth: "100",
          align: "right",
          sortable: true
        }
      ],
      visible: false,
      houseIdList: [], //抽检房源id集合,
      batchList: [] //批量添加的数组
    };
  },
  beforeDestroy() {
    if (document.querySelector(".entrance-container")) {
      document
        .querySelector(".entrance-container")
        .removeEventListener("scroll", this.elMainScroll);
    }
  },
  created() {
    this.getSpotChekList();
    this.$nextTick(() => {
      document
        .querySelector(".entrance-container")
        .addEventListener("scroll", this.elMainScroll);
    });
  },
  methods: {
    elMainScroll() {
      const { clientHeight, scrollHeight, scrollTop } = document.querySelector(
        ".entrance-container"
      );
      if (clientHeight + scrollTop >= scrollHeight) {
        this.panelChange = false;
      }
    },
    /**
     * @example: 折叠面板
     */
    panelChangeBtn() {
      this.panelChange = !this.panelChange;
    },
    /**
     * @example:抽检确认时间
     */
    spotCheckSubmit() {
      this.clearList();
      this.getSpotChekList();
    },
    /**
     *@example:批量抽检点击事件
     */
    batchSpotCheck() {
      this.houseIdList = this.batchList;
      this.visible = true;
    },
    /**
     * @example:多选框选择改变事件
     */
    handleSelectionChange(item) {
      item.forEach(element => {
        if (!this.batchList.includes(element.id)) {
          this.batchList.push(element.id);
        }
      });
      console.log(this.batchList, "125544");
    },
    /**
     *@example:抽检点击事件
     */
    operation(houseId) {
      this.houseIdList = [houseId];
      this.visible = true;
    },
    /**
     * @example:排序方法
     */
    sortMethod(item) {
      this.condition.sortColumn =
        item.prop == "agentName" ? "agentName.keyword" : item.prop;
      this.condition.sortType = item.order == "ascending" ? 0 : 1;
      this.clearList();
      this.getSpotChekList();
    },
    /**
     * @example:查询条件改变
     */
    moreConditionChange(value) {
      this.moreCondition = value;
      this.clearList();
      this.getSpotChekList();
    },
    /**
     *@example:条数的改变
     */
    handleSizeChange(value) {
      this.condition.limit = value;
      this.clearList();
      this.getSpotChekList();
    },
    /**
     * @example:改变页数
     */
    handleCurrentChange(value) {
      this.condition.page = value;
      this.tableData = [];
      this.getSpotChekList();
    },
    /**
     * @example:初始化列表数据
     */
    clearList() {
      this.tableData = [];
      this.condition.page = 1;
      this.pageJson.total = 0;
      this.pageJson.pageSum = 0;
      this.batchList = [];
    },
    /**
     * @example:获取抽检列表
     */
    getSpotChekList() {
      let params = Object.assign(
        JSON.parse(JSON.stringify(this.condition)),
        JSON.parse(JSON.stringify(this.moreCondition))
      );
      this.loading = true;
      this.$api
        .post({
          url: "/spotCheck/spotCheckList",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
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
    }
  }
};
</script>
