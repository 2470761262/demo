<style lang="less" scoped>
.tab-page {
  /deep/.header-tab-cell {
    // prettier-ignore
    height: 64PX;
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
    height: 64PX;
    font-size: @font16;
    text-align: center;
    .cell {
      white-space: nowrap;
    }
  }
  /deep/.tab-cell-left {
    text-align: left;
    white-space: nowrap;
    padding-left: 32px;
    cell {
      white-space: nowrap;
    }
  }
  .tab-page-flex {
    display: flex;
    .tab-image {
      display: flex;
      flex-direction: column;
      width: 150px;
      .tab-image-head {
        // prettier-ignore
        height: 64PX;
        font-size: @font16;
        background: rgba(240, 242, 245, 1);
        color: rgba(48, 49, 51, 1);
        // prettier-ignore
        line-height: 64PX;
        text-align: center;
        position: sticky;
        top: 0;
        z-index: 10;
      }
      .tab-image-content {
        padding-left: 5px;
        height: 128px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgba(240, 242, 245, 1);
        box-sizing: border-box;
        .tab-image-item {
          margin-top: 10px;
          width: 130px;
          height: 90px;
          border-radius: 4px;
        }
      }
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
}
/deep/.el-table__body-wrapper {
  tbody {
    tr {
      td {
        border-bottom: none;
      }
    }
    tr:not(.el-table__row) {
      td {
        border-bottom: 1px solid rgba(240, 242, 245, 1);
        height: 39px;
        box-sizing: border-box;
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
  .tab-houseno {
    margin-top: 10px;
    font-size: @font12;
  }
}

.tag-item {
  display: inline-block;
  background: @backgroud;
  color: #fff;
  margin-right: 15px;
  font-size: @font14;
  border-radius: 4px;
  padding: 5px 10px;
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
  .cell {
    // prettier-ignore
    line-height: 23PX;
  }
}
</style>
<template>
  <div class="tab-page">
    <div class="tab-page-flex">
      <div class="tab-image">
        <div class="tab-image-head">房源图</div>
        <div
          class="tab-image-content"
          v-for="(item, index) in renderList"
          :key="index"
        >
          <el-image
            :lazy="true"
            class="tab-image-item"
            :src="item.picUrl + '?x-oss-process=style/thumb'"
            @error="houseImageErorHandle(item)"
            scroll-container=".scroll-tab"
          ></el-image>
        </div>
      </div>
      <el-table
        :data="renderList"
        header-cell-class-name="header-tab-cell"
        :cell-class-name="tabDirection"
        default-expand-all
        @sort-change="sortMethod"
        @row-dblclick="navDetailt"
      >
        <el-table-column type="expand" width="1px">
          <template v-slot:default="{ row }">
            <span class="tag-item" v-for="item in row.tags" :key="item">{{
              item
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tableColumnField"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :sort-method="sortDevName"
          :sortable="item.order"
          :formatter="item.formart"
          :sort-orders="['ascending', 'descending']"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
    <div class="tab-page-floot">
      <!-- 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      -->
      <el-pagination
        ref="pagination"
        @current-change="currentchange"
        @size-change="handleSizeChange"
        :page-sizes="[30, 50, 70]"
        :page-size="pageJson.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageJson.dataCount"
        :current-page.sync="pageJson.currentPage"
      ></el-pagination>
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
import bus from "@/evenBus/but.js";
export default {
  inject: ["form", "clearPage"],
  data() {
    return {
      typeActiveIndex: 0, //nav类型激活Index
      renderList: [],
      tableColumnField: null,
      allTableColumn: [
        {
          prop: "communityName",
          label: "楼盘名称",
          order: false,
          width: "230",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-title">{item.communityName}</div>
                <div class="tab-houseno">{item.houseNo}</div>
              </div>
            );
          }
        },
        {
          prop: "houseType",
          label: "户型",
          order: "custom",
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
          prop: "seenNumRecent",
          label: "30天带看",
          order: "custom",
          formart: item => item.seenNumRecent || "0"
        },
        {
          prop: "customerType",
          label: "业主类型",
          order: false
        },
        // {
        //   prop: "saleReson",
        //   label: "出售原因",
        //   order: false,
        //   formart: item => item.saleReson || "暂无"
        // },
        {
          prop: "floor",
          label: "楼层",
          order: true,
          formart: item => {
            return `${item.floor}/${item.floorNum}`;
          }
        },
        {
          prop: "addTime",
          label: "挂牌",
          order: true
        },
        {
          prop: "brokerName",
          label: "跟单人",
          order: false
        }
      ],
      dealHouseTableColumn: [
        {
          prop: "communityName",
          label: "楼盘名称",
          order: false,
          width: "230",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div class="tab-house-title">{item.communityName}</div>
                <div class="tab-houseno">{item.houseNo}</div>
              </div>
            );
          }
        },
        {
          prop: "houseType",
          label: "户型",
          order: "custom",
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
          prop: "floor",
          label: "楼层",
          order: true,
          formart: item => {
            return `${item.floor}/${item.floorNum}`;
          }
        },
        {
          prop: "inArea",
          label: "面积",
          order: "custom",
          formart: item => item.inArea + "平"
        },
        {
          prop: "tradePrice",
          label: "成交价",
          order: "custom",
          formart: item => item.tradePrice + "万"
        },
        {
          prop: "unitPrice",
          label: "单价",
          order: "custom",
          formart: item => item.unitPrice + "元/平"
        },
        {
          prop: "tradeTime",
          label: "成交时间",
          order: "custom",
          minWidth: "100"
        },
        {
          prop: "agentName",
          label: "跟单人",
          order: false
        },
        {
          prop: "tradePerName",
          label: "成交人",
          order: false
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
    clearPage: {
      deep: true,
      handler: function(value, ordvalue) {
        this.renderList = [];
        this.pageJson.total = 0;
        this.pageJson.dataCount = 0;
        //console.log("xxxxxxxxxxxxxxx");
        //debugger;
        // this.getHouseData(JSON.parse(JSON.stringify(this.form)), true).then(
        //   () => {
        //     dom.querySelector(".scroll-tab").scrollTop = 0;
        //     this.$parent.ListeningScroll();
        //     console.log("xxxxxxxxxxxxxxx", this.pageJson);
        //     //  this.$forceUpdate();
        //   }
        // );
      }
    },
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
  created() {
    this.tableColumnField = this.allTableColumn;
  },
  mounted() {
    window.addEventListener("resize", this.addListener);
    this.$once("addListener", this.addListener);
    bus.$on("modifyTableColumn", type => {
      this.typeActiveIndex = type;
      switch (type) {
        case 3:
          this.tableColumnField = this.dealHouseTableColumn;
          break;
        default:
          this.tableColumnField = this.allTableColumn;
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.addListener);
    bus.$off("modifyTableColumn");
  },
  methods: {
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    sortDevName(str1, str2) {
      let res = 0;
      if (this.form.sortColumn == "floor") {
        res = str1.floor > str2.floor ? 1 : -1;
        return res;
      } else if (this.form.sortColumn == "addTime") {
        return -1;
      }
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
     * @example: 处理ErrorImage
     * @param {type}
     */

    houseImageErorHandle(item) {
      item.picUrl =
        "https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/3/26/9b122fa0df5946058c5a254fae9b3bfc.png";
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
      if (this.typeActiveIndex == 3) return;
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

          console.log(this.pageJson.currentPage, this.pageJson);
        }
      );
    },
    addListener() {
      let rdList = dom.querySelectorAll(".el-table__body-wrapper tbody > tr");
      let trImage = dom.querySelectorAll(".tab-image > .tab-image-content");
      let index = 0;
      for (let i = 0, end = rdList.length; i < end; i += 2) {
        let prevTr = getComputedStyle(rdList[i == 0 ? 0 : i]).height;
        let nextTr = getComputedStyle(rdList[i == 0 ? 1 : i + 1]).height;

        if (index < end / 2) {
          trImage[index].style.height =
            parseFloat(prevTr) + parseFloat(nextTr) + "px";
          index++;
        }
      }
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
      //  debugger;
      // this.loading = true;
      // Object.keys(value).forEach(item => {
      //   if (value[item] instanceof Array) {
      //     value[item] = value[item].join(",");
      //   }
      // });
      this.renderList = [];
      this.pageJson.total = 0;
      this.pageJson.dataCount = 0;
      if (initPage) this.InitPageJson();
      let currentPage = this.pageJson.currentPage;
      let restuleParms = Object.assign({}, value, {
        page: this.pageJson.currentPage,
        limit: this.pageJson.pageSize
      });
      let param;
      switch (this.typeActiveIndex) {
        case 3:
          param = {
            url: "/mateHouse/getMateHouse/tradeHouseIndex",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            data: restuleParms
          };
          break;
        default:
          param = {
            url: "/mateHouse/getMateHouse/soleAllHouseIndex",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            data: restuleParms
          };
      }
      return this.$api
        .post(param)
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.renderList = data.data.data;
            this.pageJson.total = data.data.pageSum;
            this.pageJson.dataCount = data.data.dataCount;
            this.pageJson.currentPage = currentPage;
          }
          this.$nextTick(() => {
            this.$emit("addListener");
            this.addListener();
          });
        })
        .catch(() => {})
        .finally(() => {});
    }
  }
};
</script>
