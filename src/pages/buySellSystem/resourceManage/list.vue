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
      <div class="table">
        <div class="column" v-for="item in renderList" :key="item.id" @click="navigateToDetail(item.id)">
          <div>{{item.communityName}}</div>
          <div>总户数：{{item.houseTotal}}</div>
          <div>无号码：{{item.houseNoNumber}}</div>
          <div>渗透率：{{item | rateCompute}}</div>
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageJson.currentPage"
        :page-sizes="[30, 50, 70]"
        :page-size="pageJson.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageJson.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import resourceButtons from './components/resourceButtons.vue'
export default {
  components: {
    resourceButtons
  },
  data() {
    return {
      houseName: "",
      renderList: [
        {
          id: 1,
          communityName: "上品至尊",
          houseTotal: 100,
          houseNoNumber: 10
        },{
          id: 2,
          communityName: "上品至尊",
          houseTotal: 100,
          houseNoNumber: 10
        },{
          id: 3,
          communityName: "上品至尊",
          houseTotal: 100,
          houseNoNumber: 10
        },{
          id: 4,
          communityName: "上品至尊",
          houseTotal: 100,
          houseNoNumber: 10
        },{
          id: 5,
          communityName: "上品至尊",
          houseTotal: 100,
          houseNoNumber: 10
        },{
          id: 6,
          communityName: "上品至尊",
          houseTotal: 100,
          houseNoNumber: 10
        },{
          id: 7,
          communityName: "上品至尊",
          houseTotal: 100,
          houseNoNumber: 10
        },{
          id: 8,
          communityName: "上品至尊",
          houseTotal: 100,
          houseNoNumber: 10
        },{
          id: 9,
          communityName: "上品至尊",
          houseTotal: 100,
          houseNoNumber: 10
        },{
          id: 10,
          communityName: "上品至尊",
          houseTotal: 100,
          houseNoNumber: 10
        },{
          id: 11,
          communityName: "上品至尊",
          houseTotal: 100,
          houseNoNumber: 10
        }
      ],
      pageJson: {
        total: 1,
        pageSize: 30,
        currentPage: 1,
        dataCount: 0
      },
      form: {
        keyWord: ""
      }
    }
  },
  methods: {
    /**
     * @example: 处理楼盘名称点击查询
     */
    handleHouseName() {
      this.form.keyWord = this.houseName;
      // this.getHouseData();
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
      if (initPage) this.InitPageJson();
      let restuleParms = Object.assign({}, value, {
        page: this.pageJson.currentPage,
        limit: this.pageJson.pageSize
      });
      return this.$api
        .post({
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
    /**
     * 修改每条页数
     */
    handleSizeChange(size) {
      console.log(size, "=======");
    },
    /**
     * 修改当前页
     */
    handleCurrentChange(page) {
      console.log(page, "=======");
    },
    /**
     * 跳转到详情页
     */
    navigateToDetail(id) {
      console.log(id, "=========");
      this.$router.push("/buySellSystem/resourceManageDetail");
    }
  },
  filters: {
    rateCompute(item) {
      let rate = ((item.houseTotal - item.houseNoNumber)/item.houseTotal).toFixed(2)*100;
      return rate + "%";
    }
  }
}
</script>
<style lang="less" scoped>
.page-list-content{
  .page-result-head {
    display: flex;
    // justify-content: space-between;
    padding: 20px 15px;
    border-bottom: 10px solid #EAEBED;
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
    .table {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .column {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 250px;
        padding: 15px 0;
        margin: 0 40px 50px;
        border: 1px solid #eee;
        border-radius: 2px;
        line-height: 32px;
        box-shadow: 0 0 20px #f7f7f7;
        cursor: pointer;
        transition-duration: .2s;
        &:hover {
          transform: translateY(-10px);
        }
        div:first-child {
          font-weight: 900;
          font-size: @font16;
        }
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
}
</style>
