<template>
  <div class="page-list-content">
    <div class="page-result-head">
      <div class="head-content-input">
        <input
          type="text"
          placeholder="请输入楼盘名称"
          data-anchor="资源库管理楼盘名称输入框"
          class="content-input anchor-point"
          v-model="houseName"
          @keydown.enter="handleHouseName"
        />
        <button
          class="inquire-content anchor-point"
          @click="handleHouseName"
          :data-anchor="'资源库管理楼盘名称搜索{' + houseName + '}'"
        >
          <i class="el-icon-search"></i>
        </button>
      </div>
      <resource-buttons></resource-buttons>
    </div>
    <div class="page-list-panel">
      <div class="table" v-loading="loading">
        <div
          class="column"
          v-for="item in renderList"
          :key="item.id"
          @click="navigateToDetail(item.communityId)"
        >
          <div :title="item.communityName">{{item.communityName}}</div>
          <div>总户数：{{item.countRoom}}</div>
          <div>无号码：{{item.noTelNum}}</div>
          <div>渗透率：{{item.permeability}}</div>
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageJson.currentPage"
        :page-sizes="[30, 50, 70]"
        :page-size="pageJson.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageJson.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import resourceButtons from "./components/resourceButtons.vue";
export default {
  components: {
    resourceButtons
  },
  data() {
    return {
      houseName: "",
      renderList: [],
      pageJson: {
        total: 1,
        pageSize: 15,
        currentPage: 1,
        dataCount: 0
      },
      loading: true
    };
  },
  created() {
    this.pageJson.currentPage = 1;
    this.requestList();
  },
  methods: {
    /**
     * @example: 处理楼盘名称点击查询
     */
    handleHouseName() {
      this.pageJson.currentPage = 1;
      this.requestList();
    },
    InitPageJson() {
      this.pageJson = {
        total: 1,
        currentPage: 1,
        pageSize: this.pageJson.pageSize,
        dataCount: 0
      };
    },
    /**
     * 资源库管理数据请求
     */
    requestList() {
      var that = this;
      that.loading = true;
      let params = {
          communityName: this.houseName,
          page: that.pageJson.currentPage,
          limit: that.pageJson.pageSize
      }
      this.$api
        .post({
          url: "/houseResource/communityPermeability",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          that.loading = false;
          if (e.data.code == 200) {
            that.pageJson.total = e.data.data.dataCount;
            that.renderList = e.data.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    /**
     * 修改每条页数
     */
    handleSizeChange(size) {
      this.pageJson.pageSize = size;
      this.pageJson.currentPage = 1;
      this.requestList();
    },
    /**
     * 修改当前页
     */
    handleCurrentChange(page) {
      this.pageJson.currentPage = page;
      this.requestList();
    },
    /**
     * 跳转到详情页
     */
    navigateToDetail(id) {
      this.$router.push({
        name: "resourceManageDetail",
        params: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.page-list-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 0;
  .page-result-head {
    display: flex;
    // justify-content: space-between;
    padding: 20px 15px;
    border-bottom: 10px solid #eaebed;
    .head-content-input {
      // prettier-ignore
      width: 455PX;
      // prettier-ignore
      height: 40PX;
      display: flex;
      .content-input {
        // prettier-ignore
        width: 390PX;
        border: 1px solid rgba(206, 206, 206, 1);
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        text-indent: 16px;
        // line-height: 48px;
        height: 100%;
        box-sizing: border-box;
        outline: none;
        font-size: @font16;
        &::placeholder {
          font-size: @font16;
          color: #a6aaaf;
        }
      }
      .inquire-content {
        flex: 1;
        background: @backgroud;
        outline: none;
        border: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        font-size: @font24;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .page-list-panel {
    flex: 1;
    padding: 30px 40px;
    overflow: auto;
    .table {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .column {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 224px;
        padding: 15px 10px;
        margin: 0 40px 50px;
        border: 1px solid #eee;
        border-radius: 2px;
        line-height: 32px;
        box-shadow: 0 0 20px #f7f7f7;
        cursor: pointer;
        transition-duration: 0.2s;
        &:hover {
          transform: translateY(-10px);
        }
        div:first-child {
          height: 26px;
          line-height: 26px;
          font-weight: 900;
          font-size: @font16;
          overflow: hidden;
        }
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
}
</style>
