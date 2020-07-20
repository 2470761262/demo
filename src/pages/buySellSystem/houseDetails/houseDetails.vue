<style lang="less" scoped>
.content {
  background: #fff;
  flex: 1;
  .content-flex {
    display: flex;
    padding-left: 33px;
    .content-flex-left {
      flex: 0 0 774px * @base;
      .content-detail-flex {
        display: flex;
        // prettier-ignore
        margin-top: 22PX;
      }
    }
    .content-flex-right {
      flex: 1;
      position: sticky;
      top: 0;
      display: flex;
      z-index: 10;
      .right-message {
        flex: 1;
      }
    }
  }
}
</style>
<template>
  <div class="content">
    <nav-header />
    <section class="content-flex">
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
        <div class="right-message"></div>
        <div class="right-btn-group">
          <detailBtnGroup />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
//头部导航
import navHeader from "@/components/navHeader";
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
export default {
  components: {
    navHeader,
    detailHander,
    loopContent,
    houseMessage,
    stickyContent,
    maintainMessage,
    brokerPeview,
    prospectingMessage,
    roleApple,
    historyTrajectory,
    detailBtnGroup
  }
};
</script>
