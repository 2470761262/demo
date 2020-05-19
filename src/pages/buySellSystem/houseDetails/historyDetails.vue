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
  .browse-nav-content {
    top: 458px;
    position: absolute;
    right: 10%;
    transform: translateX(calc(100% + 1px));
    display: flex;
    z-index: 9999;
    flex-direction: column;
    > button:last-child {
      margin-left: 0;
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
      <div class="browse-nav-content" v-scrollCenter="'page-contenr-com'">
        <el-button @click="navPage('/buySellSystem/houseList')">首页</el-button>
        <el-button @click="navPage()">返回</el-button>
      </div>
      <browsebar :browse="browse" v-if="browse.addTime"></browsebar>
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
import browsebar from "@/components/browsebar";
import buttonGroup from "./components/buttonGroup";
import houseMessage from "./components/houseMessage";
import houseOperation from "./components/houseOperation";
import houseTask from "./components/houseTask";
import { REMARK } from "@/util/constMap";
import { formatDate } from "element-ui/src/utils/date-util";
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
    key() {
      //解决同一组件路由跳转，数据不刷新问题
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    },
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
    browsebar,
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
      browse: {
        addTime: null,
        topTime: null,
        next: 1,
        last: 1
      }, //浏览记录id
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
      if (this.$route.params.browse) {
        this.browse.addTime = this.$route.params.browse.addTime;
        this.browse.topTime = this.$route.params.browse.topTime
          ? this.$route.params.browse.topTime
          : formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
        this.browse.next = this.$route.params.browse.next
          ? this.$route.params.browse.next
          : 1;
        this.browse.last = this.$route.params.browse.last
          ? this.$route.params.browse.last
          : 1;
      }
      util.sessionLocalStorageSet("houseDetails:browse", this.browse);
      util.sessionLocalStorageSet("historyDetails.vue:houseId", this.forID.id);
      util.sessionLocalStorageSet(
        "historyDetails.vue:tradeType",
        this.tradeType
      );
    } else {
      this.browse = util.sessionLocalStorageGet("houseDetails:browse");
      this.browse = util.sessionLocalStorageGet("houseDetails:browse");
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
            let rooms,
              hall,
              toilet = 0;
            if (result.data.houseType) {
              rooms = result.data.houseType.split("室")[0];
              hall = result.data.houseType.split("室")[1].split("厅")[0];
              toilet = result.data.houseType.split("厅")[1].split("卫")[0];
            }
            let logParam = {
              Type: 4,
              HouseId: that.forID.id,
              HouseNo: result.data.HouseNo,
              Comid: result.data.Comid,
              CBid: result.data.CBid,
              BHID: result.data.BHID,
              CommunityName: result.data.CommunityName,
              BuildingName: result.data.BuildingName,
              RoomNo: result.data.RoomNo,
              Floor: result.data.Floor,
              InArea: result.data.InArea,
              Price: result.data.Price,
              Decoration: result.data.Decoration,
              Face: result.data.Face,
              Buildtype: result.data.buildtype,
              Rooms: rooms,
              Hall: hall,
              Toilet: toilet
            };
            that.addBrowseHouseLog(logParam);
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
    },
    addBrowseHouseLog(param) {
      let that = this;
      let url = "/house/browse/add";
      this.$api
        .post({
          url: url,
          data: param,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log("浏览记录添加成功");
          } else {
            console.log("浏览记录添加失败" + result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            console.log(e.response);
          }
        });
    }
  },
  destroyed() {
    // this.$store.commit("resetFormData");
  }
};
</script>
