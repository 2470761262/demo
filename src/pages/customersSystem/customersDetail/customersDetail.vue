<style lang="less" scoped>
.page-content {
  min-height: 100%;
  background: #fff;
  padding: 30px 0 60px 107px;
  box-sizing: border-box;
  @width: 1345px;
  //客户详情头部
  .head-content {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 30px;
    width: @width;
    .head-content-button {
      width: 433px;
    }
    //基础信息
    .basics {
      width: 714px;
    }
  }
  //带看进度
  .head-progress {
    width: @width;
    padding-left: 40px;
    box-sizing: border-box;
    .head-progress-title {
      font-size: 18px;
      padding-top: 20px;
      margin-bottom: 25px;
    }
  }
  //记录
  .head-record-content {
    width: @width;
    display: flex;
    margin-top: 25px;
  }
}
</style>
<template>
  <section class="page-content">
    <div class="head-content">
      <detail-button class="head-content-button"></detail-button>
      <basics class="basics"></basics>
    </div>
    <div class="head-progress">
      <h3 class="head-progress-title">带看进度</h3>
      <see-take-progress></see-take-progress>
    </div>
    <div class="head-record-content">
      <take-look-record></take-look-record>
    </div>
  </section>
</template>

<script>
import detailButton from "./components/detailButton";
//基础信息
import basics from "./components/basicsMessage";
//带看进度
import seeTakeProgress from "./components/seeTakeProgress";
//带看记录
import takeLookRecord from "./components/takeLookRecord";
export default {
  components: {
    detailButton,
    basics,
    seeTakeProgress,
    takeLookRecord
  }
};
</script>
