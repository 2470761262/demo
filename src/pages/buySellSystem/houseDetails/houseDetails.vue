<style lang="less" scoped>
.content {
  background: #fff;
  flex: 1;
  .nav-hander-content {
    position: sticky;
    top: 0;
    z-index: 30;
  }
  .content-flex {
    display: flex;
    padding-left: 33px;
    .content-flex-left {
      flex: 0 0 774px * @base;
      //flex: 1;
      .content-detail-flex {
        display: flex;
        // prettier-ignore
        margin-top: 22PX;
      }
    }
    .content-flex-right {
      flex: 1;
      // prettier-ignore
      // flex: 0 0 474px *  @base;
      position: sticky;
      // prettier-ignore
      top: 0PX;
      display: flex;
      z-index: 50;
      align-self: flex-start;
      .right-message {
        flex: 1;
        // prettier-ignore
        margin-left: 13PX;
      }
    }
  }
}
</style>
<template>
  <div class="content" v-loading="loading" element-loading-text="数据加载中...">
    <!-- <div class="nav-hander-content">
      <nav-header />
    </div> -->
    <section class="content-flex" v-if="!loading">
      <div class="content-flex-left">
        <detail-hander />
        <div class="content-detail-flex">
          <loop-content />
          <house-message />
        </div>
        <sticky-content />
        <maintainMessage />
        <broker-peview />
        <prospecting-message />
        <roleApple />
        <historyTrajectory />
      </div>
      <div class="content-flex-right">
        <div class="right-message">
          <betHouse />
          <logTabContent />
        </div>
        <div class="right-btn-group">
          <detailBtnGroup />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
//头部导航
//import navHeader from "@/components/navHeader";
//房源详情头部
import detailHander from "./newComponents/detailHander";
//轮播图
import loopContent from "./newComponents/loopContent";
//房源信息
import houseMessage from "./newComponents/hosueMessage";
//粘连Tab栏
import stickyContent from "./newComponents/stickyContent";
//维护信息
import maintainMessage from "./newComponents/maintainMessage";
//经纪人点评
import brokerPeview from "./newComponents/brokerPeview";
//实勘信息
import prospectingMessage from "./newComponents/prospectingMessage";
//角色人申请
import roleApple from "./newComponents/roleApply";
//历史轨迹
import historyTrajectory from "./newComponents/historyTrajectory";
//按钮组
import detailBtnGroup from "./newComponents/detailBtnGroup";
//对赌
import betHouse from "./newComponents/betHouse";
//日志tab
import logTabContent from "./newComponents/logTabContent";
import util from "@/util/util";
import { mapActions, mapMutations, mapState } from "vuex";
import { REMARK } from "@/util/constMap";
export default {
  components: {
    //  navHeader,
    detailHander,
    loopContent,
    houseMessage,
    stickyContent,
    maintainMessage,
    brokerPeview,
    prospectingMessage,
    roleApple,
    historyTrajectory,
    detailBtnGroup,
    betHouse,
    logTabContent
  },
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id
    })
  },
  created() {
    this.setHouseID(this.$route.params.houseId);
    Promise.all([this.getHouseDetail(), this.getAgentRules()])
      .then(e => {
        this.addBrowseHouseLog(e[0]);
      })
      .catch(() => {
        this.$message.error("打开失败");
      })
      .finally(() => {
        this.loading = false;
      });
  },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    ...mapMutations(["setHouseID", "setParam"]),
    ...mapActions(["commitHouseData", "commitRoleData"]),
    /**
     * 获取房源详情
     */
    getHouseDetail() {
      return this.$api
        .post({
          url: "/agent_house/getHouseDetail",
          data: {
            houseId: this.houseId
          },
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            if (
              result.data.remark != null &&
              result.data.remark.indexOf("$") != -1
            ) {
              let Arry1 = result.data.remark.split("$");
              for (let i = 0; i < Arry1.length; i++) {
                let Arry2 = Arry1[i].split("@");
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

            this.commitHouseData(result.data);

            let type = 1;
            if (result.data.plate == 1) {
              type = 2;
            }
            if (result.data.plate == 4) {
              type = 3;
            }

            document.title = result.data.CommunityName || "未知楼盘";
            let rooms,
              hall,
              toilet = 0;

            if (result.data.houseType) {
              rooms = result.data.houseType.split("室")[0];
              hall = result.data.houseType.split("室")[1].split("厅")[0];
              toilet = result.data.houseType.split("厅")[1].split("卫")[0];
            }

            return {
              Type: type,
              HouseId: this.houseId,
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
              Title: result.data.Title,
              Buildtype: result.data.buildtype,
              Rooms: rooms,
              Hall: hall,
              Toilet: toilet
            };
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            this.$message(e.response.data.message);
          }
        });
    },
    addBrowseHouseLog(param) {
      this.$api
        .post({
          url: "/house/browse/add",
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
    /**
     * @example: 获取按钮权限
     */
    getAgentRules() {
      return this.$api
        .get({
          url: "/agent_house/detailsFunction"
        })
        .then(e => {
          if (e.data.code == 200) {
            let { data } = e.data;
            this.setParam({
              paramName: "betData",
              value: data.functionRuleList
            });
            data.functionRuleList.forEach((item, index) => {
              this.commitRoleData({
                roleName: item.rUrl,
                roleValue: true
              });
            });
          }
        })
        .catch(e => {});
    }
  }
};
</script>
