<style lang="less" scoped>
.page-content {
  padding: 40px 0 35px 33px;
  background: #fff;
  min-height: 100%;
  box-sizing: border-box;
  user-select: none;
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
      <detail class="cell-right" :housePageType="housePageType"></detail>
      <!-- 右侧功能按钮 -->
      <sidebarList
        lastItemSet
        lastTitle="编辑"
        :lastParams="{ id: forID.id, method: 'reset' }"
        :hisEdit="false"
      ></sidebarList>
    </section>
    <!--按钮组 -->
    <buttonGroup></buttonGroup>
    <section class="page-house-cell marginTop">
      <!-- 房屋其他信息 -->
      <houseMessage
        class="cell-msg"
        :class="{ 'cell-msg-nest': nest }"
      ></houseMessage>
      <div class="cell-right no-center">
        <!-- 操作 -->
        <houseOperation></houseOperation>
        <!-- 房源任务方 -->
        <houseTask></houseTask>
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
import buttonGroup from "./components/buttonGroup";
import houseMessage from "./components/houseMessage";
import houseOperation from "./components/houseOperation";
import houseTask from "./components/houseTask";
import { REMARK } from "@/util/constMap";
export default {
  provide() {
    return {
      houseId: this.forID,
      houseDetails: this.houseDetails,
      load: this.load,
      buttonDisabled: true
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
    buttonGroup, // 按钮群
    houseMessage,
    houseOperation,
    houseTask //房源任务方
  },
  data() {
    return {
      forID: {
        id: null
      },
      housePageType: null, //当前页面类型
      tradeType: 1,
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
      this.tradeType = this.$route.params.tradeType || 1;
      util.sessionLocalStorageSet("historyDetails.vue:houseId", this.forID.id);
      util.sessionLocalStorageSet(
        "historyDetails.vue:tradeType",
        this.tradeType
      );
    } else {
      this.forID.id = util.sessionLocalStorageGet("historyDetails.vue:houseId");
      this.tradeType = util.sessionLocalStorageGet(
        "historyDetails.vue:tradeType"
      );
    }
    //获取页面类型 暂不售需要特殊判断需要知道当前页面类型
    if (this.$route.params.housePageType) {
      this.housePageType = this.$route.params.housePageType;
      util.sessionLocalStorageSet(
        "historyDetails.vue:housePageType",
        this.housePageType
      );
    } else {
      this.housePageType = util.sessionLocalStorageGet(
        "historyDetails.vue:housePageType"
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
          url: "/history/agent_house/getHouseDetail/" + that.forID.id,
          data: { tradeType: this.tradeType },
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            if (
              result.data.remark != null &&
              result.data.remark.indexOf("$") != -1
            ) {
              var Arry1 = result.data.remark.split("$");
              for (var i = 0; i < Arry1.length; i++) {
                var Arry2 = Arry1[i].split("@");
                switch (Arry2[0]) {
                  case "小区介绍":
                    result.data.communityPresentation = Arry2[1];
                    that.$store.state.addHouse.formData.step2.communityDesc =
                      Arry2[1];
                    break;
                  case "户型介绍":
                    result.data.houseTypePresentation = Arry2[1];
                    that.$store.state.addHouse.formData.step2.roomDesc =
                      Arry2[1];
                    break;
                  case "税费解析":
                    result.data.taxParsing = Arry2[1];
                    that.$store.state.addHouse.formData.step2.taxDesc =
                      Arry2[1];
                    break;
                  case "核心卖点":
                    result.data.coreSellingPoint = Arry2[1];
                    that.$store.state.addHouse.formData.step2.saleDesc =
                      Arry2[1];
                    break;
                }
                if (result.data.applyAgentVo != null) {
                  REMARK.forEach(element => {
                    if (element.key == Arry2[0]) {
                      let obj = element.value;
                      result.data.applyAgentVo[obj] = Arry2[1];
                    }
                  });
                }
              }
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
