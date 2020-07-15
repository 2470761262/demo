<style lang="less" scoped>
.page-content {
  padding: 40px 0 35px 33px;
  background: #fff;
  min-height: 100%;
  box-sizing: border-box;
}
.page-house-cell {
  display: flex;
  margin-top: 18px;
  &.marginTop {
    margin-top: 0;
  }
  .cell-left {
    width: 860px;
    &.cell-left-nest {
      width: 1020px;
    }
  }
  .cell-msg {
    width: 760px;
    &.cell-msg-nest {
      width: 920px;
    }
  }
  .cell-right {
    flex: 1;
    align-self: center;
    &.no-center {
      align-self: flex-start;
    }
  }
}
</style>
<template>
  <div
    class="page-content"
    v-loading="load.loading"
    element-loading-custom-class="loadingTop"
    :element-loading-text="load.loadingMessage"
  >
    <house-details-head></house-details-head>
    <section class="page-house-cell">
      <!-- 轮播图 -->
      <loopImg class="cell-left" :class="{ 'cell-left-nest': nest }"></loopImg>
      <!-- 房屋详情 -->
      <detail class="cell-right" :phoneDisabled="true"></detail>
      <!-- 右侧功能按钮 -->
      <sidebarList
        lastItemSet
        lastTitle="编辑"
        :lastParams="{ id: forID.id, method: 'edit' }"
      ></sidebarList>
    </section>
    <!--按钮组 -->
    <buttonGroup></buttonGroup>
    <section class="page-house-cell marginTop">
      <!-- 房屋其他信息 -->
      <houseMessage
        class="cell-msg"
        :class="{ 'cell-msg-nest': nest }"
        :hisEdit="false"
      ></houseMessage>
      <div class="cell-right no-center">
        <!-- 操作 -->
        <!-- <houseOperation></houseOperation> -->
        <!-- 房源任务方 -->
        <!-- <houseTask></houseTask> -->
      </div>
    </section>
  </div>
</template>
<script>
import util from "@/util/util";
import getMenuRid from "@/minxi/getMenuRid";
import houseDetailsHead from "./components/houseDetailsHead";
import loopImg from "./components/loopImg";
import detail from "./components/detail";
import sidebarList from "@/components/sidebarList";
import houseMessage from "./components/houseMessage";
import buttonGroup from "./components/buttonGroup";
// import houseOperation from "./components/houseOperation";
// import houseTask from "./components/houseTask";
import { REMARK } from "@/util/constMap";
export default {
  provide() {
    return {
      houseId: this.forID,
      houseDetails: this.houseDetails,
      load: this.load,
      buttonDisabled: true,
      buttonLocking: false
    };
  },
  computed: {
    nest() {
      return !util.localStorageGet("nest");
    }
  },
  mixins: [getMenuRid],
  components: {
    houseDetailsHead, //房源详情头部
    loopImg, // 轮播
    detail, // 右边的详情
    sidebarList,
    houseMessage,
    buttonGroup // 按钮群
    // houseOperation,
    // houseTask //房源任务方
  },
  data() {
    return {
      forID: {
        id: null
      },
      houseDetails: {},
      load: {
        loading: true,
        loadingMessage: "努力加载中~"
      }
    };
  },
  created() {
    if (this.$route.params.houseId) {
      this.forID.id = this.$route.params.houseId;
      util.sessionLocalStorageSet(
        "validateHouseDetails.vue:houseId",
        this.forID.id
      );
    } else {
      this.forID.id = util.sessionLocalStorageGet(
        "validateHouseDetails.vue:houseId"
      );
    }
    this.getHouseDetails();
  },
  methods: {
    getHouseDetails() {
      let that = this;
      this.load.loading = true;
      this.$api
        .post({
          url: "/validate/agent_house/getHouseDetail/" + that.forID.id,
          data: { remark: 1 },
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            result.data.communityPresentation = result.data.communityDesc;
            result.data.houseTypePresentation = result.data.roomDesc;
            result.data.taxParsing = result.data.taxDesc;
            result.data.coreSellingPoint = result.data.saleDesc;
            if (result.data.checkSign == 1) {
              result.data.validateText = "待验真";
            } else if (result.data.checkSign == 2) {
              result.data.validateText = "验真成功";
            } else {
              result.data.validateText = "验真失败";
            }
            this.$set(this.houseDetails, "data", result.data);
          } else {
            that.$message.error(result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        })
        .finally(() => {
          this.load.loading = false;
        });
    }
  },
  destroyed() {
    // this.$store.commit("resetFormData");
  }
};
</script>
