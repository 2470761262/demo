<style lang="less" scoped>
.tab-page {
  /deep/.header-tab-cell {
    // prettier-ignore
    height: 50PX;
    font-size: @font16;
    background: rgba(240, 242, 245, 1);
    color: rgba(48, 49, 51, 1);
    font-weight: normal;
    .cell {
      justify-content: center;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
  }

  /deep/.tab-cell-item {
    // prettier-ignore
    height: 67PX;
    font-size: @font16;
    text-align: center;
    .cell {
      white-space: nowrap;
      color: #606266;
    }
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
.checkTel-type {
  .checkTel-type- {
    &success {
      color: #40a375;
    }
    &error {
      color: red;
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
  top: 0px;
  z-index: 10;
}
/deep/.el-table {
  overflow: visible;
  .cell {
    // prettier-ignore
    line-height: 23PX;
  }
}
.operation-btn {
  background: @backgroud;
  color: #fff;
  // prettier-ignore
  margin-right: 24PX;
  // prettier-ignore
  width: 66PX;
  // prettier-ignore
  padding: 5PX 0;
  border-radius: 4px;
  outline: none;
  border: none;
  font-size: var(--font--14);
  cursor: pointer;
  &[disabled] {
    background: #aaaaaa;
    cursor: no-drop;
  }
  &:last-child {
    margin-right: 0;
  }
}
.div-line {
  display: flex;
  .span-width {
    flex: 1;
  }
}
.cus-box {
  display: flex;
}
.span_success,
.span_danger,
.span_warning,
.span_info {
  display: inline-block;
  // prettier-ignore
  padding: 6PX 13PX;
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
</style>
<template>
  <div class="tab-page" v-loading="loading">
    <div class="tab-page-flex">
      <el-table
        :data="renderList"
        header-cell-class-name="header-tab-cell"
        cell-class-name="tab-cell-item"
        @sort-change="sortMethod"
        @row-dblclick="navDetailt"
      >
        <el-table-column
          :fixed="item.fixed"
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
      </el-table>
    </div>
    <div class="tab-page-floot">
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
import util from "@/util/util";
import { division } from "../../../../../util/accurateComputeUtil";
export default {
  inject: ["form"],
  components: {},
  data() {
    return {
      rowData: {}, //行数据
      showValidityBtn: false, //验真按钮
      loading: true,
      renderList: [],
      tableColumnField: [
        {
          prop: "communityName",
          label: "楼盘名称",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-title">{item.houseNo}</div>
                <div class="tab-houseno">
                  {item.communityName}-{item.buildingName}-{item.roomNo}
                </div>
              </div>
            );
          }
        },
        {
          prop: "",
          label: "售价"
        },
        {
          prop: "",
          label: "面积"
        },
        {
          prop: "",
          label: "户型"
        },
        {
          prop: "addPerName",
          label: "申请人"
        },
        {
          prop: "addTime",
          label: "申请时间"
        },
        {
          prop: "",
          label: "申请结果",
          formart: row => {
            let result;
            if (row.addTime) {
              result = <span class="span_warning">拍摄中</span>;
            } else if (row.applyResult == 1) {
              result = <span class="span_success">拍摄完成</span>;
            } else if (row.applyResult == 2) {
              result = <span class="span_danger">已取消</span>;
            } else if (row.applyResult == 3) {
              result = <span class="span_info">已失败</span>;
            }
            return result;
          }
        },
        {
          label: "操作",
          formart: row => this.operation(row),
          width: "272"
          //  fixed: "right"
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
          //  this.$parent.ListeningScroll();
        });
      }
    }
  },
  methods: {
    /**
     * @example: 操作按钮
     * @param {type}
     */
    operation(row) {
      let array = [
        {
          name: "取消申请",
          isType: "",
          methodName: "cancelApply",
          disabled: false
        },
        {
          name: "查看视频",
          isType: "",
          methodName: "showVideo",
          disabled: false
        }
      ];
      return array
        .map(item => {
          return item;
        })
        .map(btnDataItem => {
          return (
            <button
              class="operation-btn"
              onClick={this[btnDataItem.methodName].bind(this, row)}
              disabled={btnDataItem.disabled}
            >
              {btnDataItem.name}
            </button>
          );
        });
    },
    /**
     *  取消申请
     */
    cancelApply(row) {
      console.log(row, "取消申请----------");
      this.$confirm("是否取消申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "取消成功!"
          });
          // this.$message.error('取消失败!');
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    /**
     *  查看视频
     */
    showVideo(row) {
      console.log(row, "查看视频----------");
      // window.open("https://www.baidu.com", "_blank");
    },
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
        res = str1.floor > str2.floor ? 1 : -1;
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
     * @example: 双击前往详情
     */
    navDetailt(item) {
      if (item.checkStatus && parseInt(item.checkStatus) == 2) {
        util.openPage.call(this, {
          name: "houseDetails",
          params: { houseId: item.houseId }
        });
      }
    },
    /**
     * @example: 远程排序
     */
    sortMethod(item) {
      let order = JSON.parse(JSON.stringify(item));
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
          // this.$parent.ListeningScroll();
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
      this.loading = true;
      if (initPage) this.InitPageJson();

      let params = Object.assign({}, value, {
        page: this.pageJson.currentPage,
        limit: this.pageJson.pageSize
      });
      if (params.time && params.time.length == 2) {
        params.beginTime = params.time[0];
        params.endTime = params.time[1];
      }
      delete params.random;
      delete params.time;
      return this.$api
        .post({
          url: "/myHouse/myVerifyList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.renderList = data.data.houseList.list;
            this.pageJson.total = data.data.houseList.totalPage;
            this.pageJson.dataCount = data.data.houseList.totalCount;

            let btnList = data.data.btnList;
            if (btnList && btnList.length > 0) {
              btnList.forEach(btn => {
                if (btn.rName == "邀请验真") {
                  this.showValidityBtn = true;
                }
              });
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
