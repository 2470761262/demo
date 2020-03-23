
<style lang="less" scoped>
.page-content {
  padding: 35px 0 35px 35px;
  background: #fff;
  min-height: 100%;
  box-sizing: border-box;
  user-select: none;
}
.page-house-cell {
  display: flex;
  margin-top: 20px;
  &.marginTop {
    margin-top: 0;
  }
  .cell-left {
    width: 860px;
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
  <div class="page-content"
       v-loading="load.loading"
       element-loading-custom-class="loadingTop"
       :element-loading-text="load.loadingMessage">
    <house-details-head></house-details-head>
    <section class="page-house-cell">
      <!-- 轮播图 -->
      <loopImg class="cell-left"></loopImg>
      <!-- 房屋详情 -->
      <detail class="cell-right"></detail>
      <!-- 右侧功能按钮 -->
      <sidebarList lastItemSet
                   lastTitle="编辑"
                   :lastQuery='{id:forID.id,method:"reset"}'></sidebarList>
    </section>
    <!--按钮组 -->
    <buttonGroup></buttonGroup>
    <section class="page-house-cell marginTop">
      <!-- 房屋其他信息 -->
      <houseMessage class="cell-left"></houseMessage>
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
import getMenuRid from '@/minxi/getMenuRid';
import houseDetailsHead from './components/houseDetailsHead';
import loopImg from './components/loopImg';
import detail from './components/detail';
import sidebarList from '@/components/sidebarList';
import buttonGroup from './components/buttonGroup';
import houseMessage from './components/houseMessage';
import houseOperation from './components/houseOperation';
import houseTask from './components/houseTask';
export default {
  provide () {
    return {
      houseId: this.forID,
      houseDetails: this.houseDetails,
      load: this.load
    }
  },
  mixins: [getMenuRid],
  components: {
    houseDetailsHead,//房源详情头部
    loopImg, // 轮播
    detail, // 右边的详情
    sidebarList,
    buttonGroup,// 按钮群
    houseMessage,
    houseOperation,
    houseTask //房源任务方
  },
  data () {
    return {

      forID: {
        id: null
      },
      houseDetails: {},
      load: {
        loading: true,
        loadingMessage: "努力加载中~",
      }
    };
  },
  created () {
    if (this.$route.params.houseId) {
      this.forID.id = this.$route.params.houseId;
      util.localStorageSet("houseDetails.vue:houseId", this.forID.id);
    }
    else {
      this.forID.id = util.localStorageGet("houseDetails.vue:houseId");
    }
    this.getHouseDetails();
  },
  methods: {
    getHouseDetails () {
      let that = this;
      this.load.loading = true;
      this.$api
        .post({
          url: "/agent_house//getHouseDetail",
          data: {
            houseId: that.forID.id
          },
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            if (result.data.remark != null && result.data.remark.indexOf("$") != -1) {
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
              }
            }
            this.$set(this.houseDetails, 'data', result.data);
          } else {
            that.$message.error(result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        }).finally(() => {
          this.load.loading = false;
        });
    }
  },
  destroyed () {
    // this.$store.commit("resetFormData");
  },
};
</script>

