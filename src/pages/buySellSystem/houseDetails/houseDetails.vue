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
      <detail class="cell-right"></detail>
      <!-- 右侧功能按钮 -->
      <sidebarList
        lastItemSet
        lastTitle="编辑"
        :judgeShowEdit="true"
        :lastParams="lastParams"
        :showEdit="showEdit"
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
      dept: this.dept,
      houseDetails: this.houseDetails,
      load: this.load,
      buttonDisabled: false,
      paramsObj: this.lastParams
    };
  },
  computed: {
    nest() {
      return util.localStorageGet("nest");
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
      showEdit: false,
      dept: {
        id: 0
      }
    };
  },
  created() {
    if (this.$route.params.houseId) {
      this.forID.id = this.$route.params.houseId;
      this.detailType = this.$route.params.detailType;
      this.dept.id = this.$route.params.dept;
      console.log("************", this.dept.id);
      util.localStorageSet("houseDetails.vue:deptId", this.dept.id);
      util.localStorageSet("houseDetails.vue:houseId", this.forID.id);
      util.localStorageSet("houseDetails.vue:detailType", this.detailType);
    } else {
      this.forID.id = util.localStorageGet("houseDetails.vue:houseId");
      this.detailType = util.localStorageGet("houseDetails.vue:detailType");
      this.dept.id = util.localStorageGet("houseDetails.vue:deptId");
    }
    this.lastParams.id = this.forID.id;
    this.getHouseDetails();
  },
  methods: {
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
    this.$store.commit("resetKey", "step2");
  }
};
</script>
