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
  .tab-filter-radio {
    display: flex;
    justify-content: flex-end;
    padding-right: 46px;
    padding-bottom: 10px;
    position: sticky;
    top: 0px;
    z-index: 10;
    background: #fff;
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
  /deep/.tab-cell-item {
    height: 64px;
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
        height: 64px;
        font-size: @font16;
        background: rgba(240, 242, 245, 1);
        color: rgba(48, 49, 51, 1);
        line-height: 64px;
        text-align: center;
        position: sticky;
        top: 31px;
        z-index: 10;
      }
      .tab-image-content {
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
  top: 31px;
  z-index: 10;
}
/deep/.el-table {
  overflow: visible;
}
</style>
<template>
  <div class="tab-page">
    <div class="tab-filter-radio">
      <label class="filter-radio-item">
        <input
          type="checkbox"
          true-value="1"
          false-value=""
          v-model="form.isKey"
        />
        <span>钥匙</span>
      </label>
      <label class="filter-radio-item">
        <input
          type="checkbox"
          true-value="1"
          false-value=""
          v-model="form.isOnly"
        />
        <span>独家</span>
      </label>
      <label class="filter-radio-item">
        <input
          type="checkbox"
          true-value="1"
          false-value=""
          v-model="form.isReal"
        />
        <span>实勘</span>
      </label>
      <label class="filter-radio-item">
        <input
          type="checkbox"
          true-value="1"
          false-value=""
          v-model="form.isElevator"
        />
        <span>电梯</span>
      </label>
    </div>
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
          >
          </el-image>
        </div>
      </div>
      <el-table
        :data="renderList"
        :default-sort="{ prop: 'price', order: 'descending' }"
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
//import gggg from "@/components/gggg.vue";
export default {
  inject: ["form"],
  components: {
    // gggg
  },
  data() {
    return {
      renderList: [],
      tableColumnField: [
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
          prop: "saleReson",
          label: "出售原因",
          order: false,
          formart: item => item.saleReson || "暂无"
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
  mounted() {
    window.addEventListener("resize", this.addListener);
    this.$once("addListener", this.addListener);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.addListener);
  },
  methods: {
    /**
     * @example: 处理ErrorImage
     * @param {type}
     */

    houseImageErorHandle(item) {
      item.picUrl =
        "https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/3/26/9b122fa0df5946058c5a254fae9b3bfc.png";
      console.log("houseImageErorHandle -> item", item);
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
      this.$router.push({
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
            this.pageJson.total = data.data.pageSum;
            this.pageJson.dataCount = data.data.dataCount;
          }
          this.$nextTick(() => {
            this.$emit("addListener");
            this.addListener();
          });
        })
        .finally(() => {});
    }
  }
};
</script>
