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
    height: 50PX;
    font-size: @font16;
    text-align: center;
    .cell {
      white-space: nowrap;
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
  margin-right: 10PX;
  font-size: @font14;
  // prettier-ignore
  width: 66PX;
  // prettier-ignore
  padding: 5PX 0;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  &[disabled] {
    background: @opacityBackground;
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
.el-icon-picture {
  // prettier-ignore
  font-size: 27PX;
  cursor: pointer;
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
        :default-sort="{ prop: 'status', order: 'ascending' }"
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

export default {
  inject: ["form"],
  data() {
    return {
      loading: true,
      renderList: [],
      tableColumnField: [
        {
          prop: "communityName",
          label: "楼盘名称"
        },
        {
          label: "户型",
          formart: item =>
            (item.rooms || 0) +
            "-" +
            (item.hall || 0) +
            "-" +
            (item.toilet || 0) +
            "-" +
            (item.balcony || 0)
        },
        {
          prop: "inArea",
          label: "面积",
          order: "custom",
          formart: item => item.inArea + "平"
        },
        {
          prop: "price",
          label: "总价",
          order: "custom",
          formart: item => item.price + "万"
        },
        {
          prop: "unitPrice",
          label: "单价",
          order: "custom",
          formart: item => item.unitPrice + "元/平"
        },
        {
          prop: "amount",
          label: "对赌鑫币",
          order: "custom"
        },
        {
          prop: "brokerName",
          label: "对赌人"
        },
        {
          prop: "createTime",
          label: "对赌时间"
        },
        {
          prop: "status",
          label: "对赌状态",
          order: "custom",
          formart: item => {
            switch (item.status) {
              case 0:
                return <span style="color:red">努力中</span>;
              case 1:
                return "成功";
              case 2:
                return "失败";
              case 3:
                return "过期";
              case 4:
                return "注销";
              default:
                return "";
            }
          }
        },
        {
          label: "对赌结果",
          formart: item => {
            switch (item.status) {
              case 0:
                return <span style="color:red">加油</span>;
              case 1:
                return item.reward + "鑫币";
              case 2:
                return "转状态";
              case 3:
                return "对赌过期";
              case 4:
                return "注销";
              case 5:
                return "房源掉公盘";
              case 6:
                return "未达对赌条件";
              default:
                return "-";
            }
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
          //  this.$parent.ListeningScroll();
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
        res = str1.floor > str2.floor ? 1 : -1;
      } else if (this.form.sortColumn == "addTime") {
        res = str1.addTime > str2.addTime ? 1 : -1;
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
      util.openPage.call(this, {
        name: "houseDetails",
        params: { houseId: item.houseId, dept: item.perDept }
      });
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

      return this.$api
        .post({
          url: "/myHouse/myBetList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.renderList = data.data.list;
            this.pageJson.total = data.data.totalPage;
            this.pageJson.dataCount = data.data.totalCount;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
