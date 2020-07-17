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
      </div>
      <div class="”content-flex-right“"></div>
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
export default {
  created() {
    console.log(this.$route);
  },
  components: {
    navHeader,
    detailHander,
    loopContent,
    houseMessage,
    stickyContent,
    maintainMessage,
    brokerPeview
  }
};
</script>
