<style lang="less" scoped>
.tab-page {
  padding: 0 24px;
  /deep/.header-tab-cell {
    height: 64px;
    font-size: @font16;
    background: rgba(240, 242, 245, 1);
    color: rgba(48, 49, 51, 1);
    font-weight: normal;
    .cell {
      display: flex;
      align-items: center;
    }
  }
  /deep/.tab-cell-item {
    height: 64px;
    font-size: @font16;
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
    padding: 0 0 10px 10px;
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
  .tab-houseno {
    margin-top: 10px;
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
</style>
<template>
  <div class="tab-page">
    <div class="tab-page-flex">
      <div class="tab-image">
        <div class="tab-image-head">房源图</div>
        <div
          class="tab-image-content"
          v-for="item in renderList"
          :key="item.id"
        >
          <el-image
            lazy
            fit="cover"
            class="tab-image-item"
            :src="item.picUrl + '?x-oss-process=style/thumb'"
          >
          </el-image>
        </div>
      </div>
      <el-table
        :data="renderList"
        :default-sort="{ prop: 'price', order: 'descending' }"
        header-cell-class-name="header-tab-cell"
        cell-class-name="tab-cell-item"
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
          width: "260",
          formart: item => {
            return (
              <div class="tab-com-item">
                <div>{item.communityName}</div>
                <div class="tab-houseno">{item.houseNo}</div>
              </div>
            );
          }
        },
        {
          prop: "houseType",
          label: "户型",
          order: false,
          formart: item =>
            (item.rooms || 0) +
            "-" +
            (item.hall || 0) +
            "-" +
            (item.toilet || 0)
        },
        {
          prop: "inArea",
          label: "面积",
          order: "custom",
          formart: item => item.inArea + "m²"
        },
        {
          prop: "price",
          label: "总价",
          order: "custom",
          formart: item => item.price + "万元"
        },
        {
          prop: "unitPrice",
          label: "单价",
          order: "custom",
          format: item => item.unitPrice + "元/㎡"
        },
        {
          prop: "floor",
          label: "楼层",
          order: false
        },
        {
          prop: "addTime",
          label: "挂牌",
          order: true,
          width: "200"
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
        this.getHouseData(JSON.parse(JSON.stringify(value)));
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
      switch (item.order) {
        case "ascending":
          this.form.sortColumn = item.prop;
          this.form.sortType = 0;
          break;
        case "descending":
          this.form.sortColumn = item.prop;
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
          dom.querySelector(".change-content").scrollIntoView({
            // block: "start",
            //behavior: "smooth"
          });
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
        pageSize: this.pageJson.pageSize
      };
    },
    getHouseData(value, initPage = true) {
      // this.loading = true;
      Object.keys(value).forEach(item => {
        if (value[item] instanceof Array) {
          value[item] = value[item].join(",");
        }
      });

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
          if (initPage) this.InitPageJson();
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
