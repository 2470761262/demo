<style lang="less" scoped>
.tab-page {
  /deep/.header-tab-cell {
    height: 64px;
    font-size: @font16;
    background: rgba(240, 242, 245, 1);
    color: rgba(48, 49, 51, 1);
    font-weight: normal;
    .cell {
      justify-content: center;
      display: flex;
      align-items: center;
    }
  }
  /deep/.tab-cell-item {
    height: 64px;
    font-size: @font16;
    text-align: left;
    .cell {
      white-space: nowrap;
    }
  }
  /deep/.tab-cell-left {
    text-align: left;
    white-space: nowrap;
    // padding-left: 32px;
    padding-left: 5px;
    padding-right: 60px;
    cell {
      white-space: nowrap;
    }
  }
  .tab-page-flex {
    display: flex;
  }
  .table-btn-panel{
    display: inline-flex;
    flex-direction: column;
    padding: 0 15px;
    .table-btn-row{
      margin-bottom: 10px;
    }
    .anchor-point{
      min-width: 98px;
      text-align: left;
    }
  }
}
/deep/.el-table__body-wrapper,
/deep/.el-table__fixed-body-wrapper {
  .el-table__expanded-cell {
    padding: 0 0 10px 42px;
  }
  .el-table__expand-column {
    //   display: none;
    overflow: hidden;
  }
  tbody {
    tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }
}
.tab-com-item {
  margin-top: 10px;
  .tab-house-title {
    font-size: @font16;
    font-weight: 600;
    color: black;
  }
  .tab-house-tip {
    font-size: @font14;
    color: #b1b1b1;
  }
  .tab-houseno {
    margin-top: 10px;
    font-size: @font12;
  }
}
/deep/.caret-wrapper {
  height: auto;
  .sort-caret {
    position: static;
    &:first-child {
      margin-bottom: 3px;
    }
  }
}
.tab-page-floot {
  padding-top: 16px;
  padding-bottom: 14px;
  display: flex;
  justify-content: flex-end;
}
/deep/.el-table__header-wrapper {
  position: sticky;
  top: 0;
  z-index: 10;
}
/deep/.el-table {
  overflow: visible;
}
</style>
<template>
  <div class="tab-page">
    <div class="tab-page-flex">
      <el-table
        :data="renderList"
        header-cell-class-name="header-tab-cell"
        :cell-class-name="tabDirection"
        default-expand-all
        @sort-change="sortMethod"
        @row-dblclick="navDetailt"
        :show-header="false"
      >
        <el-table-column
          v-for="(item, index) in tableColumnField"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sort-method="sortDevName"
          :sortable="item.order"
          :formatter="item.formart"
          :sort-orders="['ascending', 'descending']"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template v-slot="scope">
            <div class="table-btn-panel">
              <div class="table-btn-row">
                <el-button
                  class="anchor-point"
                  type="primary"
                  size="mini"
                  data-anchor="开发线索一键拨号 => click"
                  @click="dialNumber(scope.row)"
                  icon="el-icon-phone-outline"
                  >一键拨号</el-button
                >
                <el-button
                  class="anchor-point"
                  type="primary"
                  data-anchor="开发线索转为在售 => click"
                  @click="dialNumber(scope.row)"
                  size="mini"
                  icon="el-icon-refresh"
                  >转为在售</el-button
                >
              </div>
              <div>
                <el-button
                  class="anchor-point"
                  type="primary"
                  data-anchor="开发线索写跟进 => click"
                  @click="dialNumber(scope.row)"
                  size="mini"
                  icon="el-icon-edit"
                  >写跟进</el-button
                >
                <el-button
                  class="anchor-point"
                  type="primary"
                  data-anchor="开发线索查记录 => click"
                  @click="dialNumber(scope.row)"
                  size="mini"
                  icon="el-icon-time"
                  > 查记录</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tab-page-floot">
      <!-- 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
     -->
      <el-pagination
        @current-change="currentchange"
        @size-change="handleSizeChange"
        :page-sizes="[30, 50, 70]"
        :page-size="pageJson.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageJson.dataCount"
        :current-page="pageJson.currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
const dom = document;
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/src/utils/resize-event";
import util from "@/util/util";
export default {
  inject: ["form"],
  data() {
    return {
      renderList: [],
      tableColumnField: [
        {
          prop: "communityName",
          label: "楼盘名称",
          order: false,
          width: "300",
          formart: item => {
            return (
              // <div class="tab-com-item">
              //   <div class="tab-house-title">{item.communityName}</div>
              //   <div class="tab-houseno">{item.houseNo}</div>
              // </div>
              <div class="tab-com-item">
                <div class="tab-house-title">{item.communityName}</div>
                <div class="tab-houseno">100平&nbsp;/&nbsp;朝南&nbsp;/&nbsp;3-2-1-1</div>
                <div class="tab-houseno">2009年竣工&nbsp;/&nbsp;商品房&nbsp;/&nbsp;框架</div>
              </div>
            );
          }
        },
        {
          prop: "houseType",
          label: "户型",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-tip">学校划片：</div>
                <div class="tab-houseno">实验小学&nbsp;实验中学</div>
              </div>
            );
          }
        },
        {
          prop: "inArea",
          label: "面积",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-tip">历史跟单人：</div>
                <div class="tab-houseno">张晓明&nbsp;周杰伦&nbsp;王一博</div>
              </div>
            );
          }
        },
        {
          prop: "price",
          label: "总价",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-houseno">2020-07-15</div>
                <div class="tab-houseno">
                  由<u>周杰伦</u>在售转<u>暂不售</u>
                </div>
              </div>
            );
          }
        },
        {
          prop: "unitPrice",
          label: "单价",
          order: "custom",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-tip">上次回访：</div>
                <div class="tab-houseno">2020-03-07 09:21:22</div>
              </div>
            );
          }
        }
      ],
      pageJson: {
        total: 1,
        pageSize: 30,
        currentPage: 1,
        dataCount: 0
      }
    };
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function(value, ordvalue) {
        this.getHouseData(JSON.parse(JSON.stringify(value))).then(() => {
          dom.querySelector(".scroll-tab").scrollTop = 0;
          this.$parent.ListeningScroll();
        });
      }
    }
  },
  methods: {
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    sortDevName(str1, str2) {
      let res = 0;
      for (let i = 0; ; i++) {
        if (!str1[i] || !str2[i]) {
          res = str1.length - str2.length;
          break;
        }

        const char1 = str1[i];
        const char1Type = this.getChartType(char1);
        const char2 = str2[i];
        const char2Type = this.getChartType(char2);
        // 类型相同的逐个比较字符
        if (char1Type[0] === char2Type[0]) {
          if (char1 === char2) {
            continue;
          } else {
            if (char1Type[0] === "zh") {
              res = char1.localeCompare(char2);
            } else if (char1Type[0] === "en") {
              res = char1.charCodeAt(0) - char2.charCodeAt(0);
            } else {
              res = char1 - char2;
            }
            break;
          }
        } else {
          // 类型不同的，直接用返回的数字相减
          res = char1Type[1] - char2Type[1];
          break;
        }
      }

      if (this.form.sortColumn == "floor") {
        res = 1;
      } else if (this.form.sortColumn == "addTime") {
        res = -1;
      }

      return res;
    },
    getChartType(char) {
      // 数字可按照排序的要求进行自定义，我这边产品的要求是
      // 数字（0->9）->大写字母（A->Z）->小写字母（a->z）->中文拼音（a->z）
      if (/^[\u4e00-\u9fa5]$/.test(char)) {
        return ["zh", 300];
      }
      if (/^[a-zA-Z]$/.test(char)) {
        return ["en", 200];
      }
      if (/^[0-9]$/.test(char)) {
        return ["number", 100];
      }
      return ["others", 999];
    },
    /**
     * @example: 设置Tab方向
     */
    tabDirection({ column }) {
      return column.label == "楼盘名称" ? "tab-cell-left" : "tab-cell-item";
    },
    /**
     * @example: 双击前往详情
     */
    navDetailt(item) {
      util.openPage.call(this, {
        name: "houseDetails",
        params: { houseId: item.id, dept: item.perDept }
      });
    },
    /**
     * @example: 远程排序
     */
    sortMethod(item) {
      let order = JSON.parse(JSON.stringify(item));
      //户型修改为prop为rooms
      if (item.column.property == "houseType") {
        order.prop = "rooms";
      }
      this.InitPageJson();
      //this.pageJson.currentPage = 1;
      switch (order.order) {
        case "ascending":
          this.form.sortColumn = order.prop;
          this.form.sortType = 0;
          break;
        case "descending":
          this.form.sortColumn = order.prop;
          this.form.sortType = 1;
      }
    },
    handleSizeChange(pageSize) {
      this.pageJson.pageSize = pageSize;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), true);
    },
    /**
     * @example: 分页组件页面改变时触发
     * @param {number} pageIndex
     */

    currentchange(pageIndex) {
      this.pageJson.currentPage = pageIndex;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), false).then(
        () => {
          dom.querySelector(".scroll-tab").scrollTop = 0;
          this.$parent.ListeningScroll();
        }
      );
    },
    InitPageJson() {
      this.pageJson = {
        total: 1,
        currentPage: 1,
        pageSize: this.pageJson.pageSize,
        dataCount: 0
      };
    },
    getHouseData(value, initPage = true) {
      // this.loading = true;
      // Object.keys(value).forEach(item => {
      //   if (value[item] instanceof Array) {
      //     value[item] = value[item].join(",");
      //   }
      // });
      if (initPage) this.InitPageJson();
      let restuleParms = Object.assign({}, value, {
        page: this.pageJson.currentPage,
        limit: this.pageJson.pageSize
      });
      return this.$api
        .post({
          //  url: "/mateHouse/getMateHouse/soleAllHouse",
          url: "/mateHouse/getMateHouse/soleAllHouseIndex",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: restuleParms
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.renderList = data.data.data;
            console.log("------>", this.renderList);
            this.pageJson.total = data.data.pageSum;
            this.pageJson.dataCount = data.data.dataCount;
          }
        })
        .finally(() => {});
    },
    dialNumber(row) {
      console.log(row, "========");
    }
  }
};
</script>
