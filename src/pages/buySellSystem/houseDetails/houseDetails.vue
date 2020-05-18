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
      <detail class="cell-right"></detail>
      <!-- 右侧功能按钮 -->
      <sidebarList
        lastItemSet
        lastTitle="编辑"
        :judgeShowEdit="true"
        :lastParams="lastParams"
        :showEdit="showEdit"
      ></sidebarList>
      <browsebar :browse="browse" v-if="browse.id"></browsebar>

      <!--      <div class="browse-nav-content" v-if="browse.id">-->
      <!--        <el-button @click="browsePage('last')" v-if="browse.last"-->
      <!--          >上一套-->
      <!--        </el-button>-->
      <!--        <el-button @click="browsePage('next')" v-if="browse.next"-->
      <!--          >下一套</el-button-->
      <!--        >-->
      <!--      </div>-->
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
      dept: this.dept,
      houseDetails: this.houseDetails,
      load: this.load,
      buttonDisabled: false,
      paramsObj: this.lastParams
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
  // watch: {
  //   browse: {
  //     deep: true,
  //     handler: function(val) {
  //       if (val !== null){
  //         this.init();
  //       }
  //     }
  //   }
  // },
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
      houseDetails: {},
      load: {
        loading: true,
        loadingMessage: "努力加载中~"
      },
      lastParams: {
        id: 0,
        method: "edit",
        paramsObj: {
          getEditUrl: "/agent_house/getEditDetails/",
          buttonText: "保存",
          editUrl: "/agent_house/editAgentHouse",
          getAudioUrl: "/agentHouse/audio/getAudioList/",
          getPicturesUrl: "/agentHouse/pictures/getPicturesList/",
          getVideoUrl: "/agentHouse/video/getVideoList/"
        }
      },
      detailType: undefined, //标识房源详情类型，决定调用哪个详情接口地址
      browse: {
        id: null,
        topTime: null,
        next: 1,
        last: 1
      }, //浏览记录id
      showEdit: false,
      dept: {
        id: 0
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log(window.location, "window.location");
      if (this.$route.params.houseId) {
        this.forID.id = this.$route.params.houseId;
        this.detailType = this.$route.params.detailType;
        this.dept.id = this.$route.params.dept;
        if (this.$route.params.browse) {
          this.browse.id = this.$route.params.browse.id;
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
        console.log("************", this.dept.id);
        util.sessionLocalStorageSet("houseDetails:browse", this.browse);
        util.sessionLocalStorageSet("houseDetails.vue:deptId", this.dept.id);
        util.sessionLocalStorageSet("houseDetails.vue:houseId", this.forID.id);
        util.sessionLocalStorageSet(
          "houseDetails.vue:detailType",
          this.detailType
        );
      } else {
        let houseId = util.getQueryVariable("commissionHouseId");
        if (houseId) {
          this.forID.id = houseId;
        } else {
          this.forID.id = util.sessionLocalStorageGet(
            "houseDetails.vue:houseId"
          );
          this.browse = util.sessionLocalStorageGet("houseDetails:browse");
          this.detailType = util.sessionLocalStorageGet(
            "houseDetails.vue:detailType"
          );
          this.dept.id = util.sessionLocalStorageGet("houseDetails.vue:deptId");
        }
      }
      this.lastParams.id = this.forID.id;
      this.getHouseDetails();
    },
    /**
     * 获取房源详情
     */
    getHouseDetails() {
      let that = this;
      this.load.loading = true;
      let url = "/agent_house/getHouseDetail";
      let query = {
        houseId: that.forID.id
      };
      if (that.detailType && that.detailType != "undefined") {
        console.log("注意，了，这是调用另一个房源详情接口");
        query.type = that.detailType;
        url = "applet/agent_house/getUniversalHouseDetail";
      } else {
        console.log("调用原有正常房源详情接口");
      }
      this.$api
        .post({
          url: url,
          data: query,
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
                    break;
                  case "户型介绍":
                    result.data.houseTypePresentation = Arry2[1];
                    break;
                  case "税费解析":
                    result.data.taxParsing = Arry2[1];
                    break;
                  case "核心卖点":
                    result.data.coreSellingPoint = Arry2[1];
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
            let perId = 0;
            if (util.localStorageGet("logindata")) {
              perId = util.localStorageGet("logindata").accountId;
            }

            if (
              result.data.plate != 1 &&
              result.data.plate != 4 &&
              perId == result.data.AgentPer
            ) {
              //当前跟单人显示编辑按钮
              console.log(
                perId,
                result.data.plate,
                result.data.AgentPer,
                "result.data.plateresult.data.plateresult.data.plate"
              );
              that.showEdit = true;
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
            let type = 1;
            if (result.data.plate == 1) {
              type = 2;
            }
            if (result.data.plate == 4) {
              type = 3;
            }
            let logParam = {
              Type: type,
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
    },
    browsePage(direct) {
      let that = this;
      let url = "/house/browse/near";
      let param = {
        id: this.browse.id,
        topTime: this.browse.topTime,
        direct: direct
      };
      this.$api
        .post({
          url: url,
          data: param,
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log("浏览记录添加成功");
            let item = result.data;
            if (!item) {
              that.browse[direct] = 0;
              that.$message.error("当前已到最后一套！");
            }
            debugger;
            let browseLog = { id: item.id, topTime: item.topTime };
            browseLog[direct] = item.total;
            if (item.Type == 1) {
              //楼盘情况
              console.log(
                "进入我的跟单房源详情 /buySellSystem/houseDetails/" +
                  item.HouseId
              );
              that.$router.push({
                name: "houseDetails",
                params: { houseId: item.HouseId, browse: browseLog }
              });
            } else if (item.Type == 2) {
              //楼盘情况
              console.log(
                "进入店公共盘房源详情 /buySellSystem/houseDetails/" +
                  item.HouseId
              );
              that.$router.push({
                name: "houseDetails",
                params: { houseId: item.HouseId, browse: browseLog }
              });
            } else if (item.Type == 3) {
              //楼盘情况
              console.log(
                "进入在售无跟单房源详情 /buySellSystem/houseDetails/" +
                  item.HouseId
              );
              that.$router.push({
                name: "houseDetails",
                params: { houseId: item.HouseId, browse: browseLog }
              });
            } else if (item.Type == 4) {
              console.log("进入暂不售房源详情");
              that.$router.push({
                name: "historyDetails",
                params: {
                  houseId: item.HouseId,
                  housePageType: "notSale",
                  browse: browseLog
                }
              });
            } else if (item.Type == 5) {
              console.log("进入楼盘详情");
              that.$router.push({
                name: "buildingHouseDetail",
                params: { houseId: item.HouseId, browse: browseLog }
              });
            } else if (item.Type == 6) {
              //楼盘情况
              console.log("进入楼盘详情");
              that.$router.push({
                name: "potentialHouseDetail",
                params: {
                  houseId: item.HouseId,
                  houseType: 1,
                  browse: browseLog
                }
              });
            } else if (item.Type == 7) {
              console.log("进入交易房源详情");
              that.$router.push({
                name: "tradeHouseDetail",
                params: {
                  houseId: item.HouseId,
                  houseType: 2,
                  browse: browseLog
                }
              });
            }
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
    this.$store.commit("resetKey", "step2");
  }
};
</script>
