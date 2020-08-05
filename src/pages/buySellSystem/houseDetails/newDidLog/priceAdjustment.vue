<style lang="less" scoped>
.re-pop {
  /deep/.didLog-content-sroll {
    padding-top: 0 !important;
    // prettier-ignore
    margin-top: 15PX;
    // prettier-ignore
    max-height: 500PX !important;
    max-width: none !important;
  }
}

.table-content {
  display: table;
  width: 100%;
  table-layout: fixed;
  .table-headle {
    display: table-header-group;
    font-size: @font16;
    > .table-cell {
      // prettier-ignore
      height: 60PX;
      // prettier-ignore
      text-indent: 20PX;
      color: black;
      position: sticky;
      top: 0;
      z-index: 10;
      background: #f1f2f6;
    }
  }
  .table-body {
    display: table-row-group;
  }
  .table-row {
    display: table-row;
    .table-cell {
      // prettier-ignore
      height: 50PX;
      border-bottom: 1px solid #f1f2f6;
    }
  }
  .table-cell {
    display: table-cell;
    vertical-align: middle;
    font-size: @font16;
    // prettier-ignore
    text-indent: 20PX;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.tab-btn {
  // prettier-ignore
  padding: 10PX 35PX;
  font-size: @font16;
  background: @backgroud;
  color: #fff;
  border-radius: 4px;
  outline: none;
  border: none;
  // prettier-ignore
  margin:0 20PX 10PX auto;
  display: block;
  cursor: pointer;
}
.fool-tips {
  // prettier-ignore
  padding: 20PX 0;
  font-size: @font16;
  // prettier-ignore
  padding-left: 20PX;
}
</style>

<template>
  <fixedPopup
    v-bind="$attrs"
    v-on="$listeners"
    class="re-pop"
    :scroll-disabled="false"
    @scrollLoad="scrollLoad"
  >
    <template>
      <div class="table-content">
        <div class="table-headle">
          <div class="table-cell" v-for="item in columnField" :key="item">
            {{ item }}
          </div>
        </div>
        <div class="table-body">
          <div class="table-row" v-for="(item, index) in dataList" :key="index">
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.createTime"
              placement="top-start"
            >
              <div class="table-cell">{{ item.createTime }}</div>
            </el-tooltip>

            <div class="table-cell">
              {{ item.bottomPrice | emptyRead("万") }}
            </div>
            <div class="table-cell">{{ item.price | emptyRead("万") }}</div>
            <div class="table-cell">{{ item.createName }}</div>
          </div>
        </div>
        <div v-if="loading" class="fool-tips">
          <i class="el-icon-loading"></i> 数据加载中..
        </div>
        <div v-if="isButton" class="fool-tips">
          已经到底了...
        </div>
        <div v-if="isNoData" class="fool-tips">
          暂无数据~
        </div>
      </div>
    </template>
    <template v-slot:floot>
      <button class="tab-btn" @click="close">确定</button>
    </template>
  </fixedPopup>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id
    }),
    //是否提示暂无数据
    isNoData() {
      return this.dataList.length == 0 && !this.loading;
    },
    //是否提示已经到底了
    isButton() {
      return (
        this.page == this.totolPage &&
        !this.loading &&
        this.dataList.length != 0 &&
        this.dataList.length > 10
      );
    }
  },
  data() {
    return {
      loading: true,
      dataList: [],
      page: 1,
      totolPage: 1,
      columnField: ["时间", "底价", "售价", "调价人"]
    };
  },

  created() {
    this.getPirceHistory();
  },
  methods: {
    /**
     * @example: 关闭弹框
     */
    close() {
      this.$emit("update:visible", false);
    },
    scrollLoad() {
      if (this.page < this.totolPage) {
        ++this.page;
        this.getPirceHistory();
      }
    },
    /**
     * @example: 获取数据
     */
    getPirceHistory() {
      this.loading = true;
      this.$api
        .post({
          url: "/saleBottomPriceRecord/records",
          data: {
            page: this.page,
            limit: 10,
            houseId: this.houseId
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.dataList = [...this.dataList, ...e.data.data.list];
            this.totolPage = e.data.data.totalPage;
          }
        })
        .catch(e => {})
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
