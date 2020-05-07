<style lang="less" scoped>
.page-content {
  min-height: 100%;
  background: #fff;
  padding: 30px 0 60px 107px;
  box-sizing: border-box;
  .head-content {
    display: flex;
    justify-content: space-between;
    width: 1345px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 30px;
    .head-content-button {
      width: 433px;
    }
    /** 基础信息 */
    .basics {
      width: 714px;
    }
  }
}
</style>
<template>
  <section class="page-content">
    <div class="head-content">
      <detail-button class="head-content-button"></detail-button>
      <basics class="basics"></basics>
    </div>
  </section>
</template>

<script>
import detailButton from "./components/detailButton";
//基础信息
import basics from "./components/basicsMessage";
export default {
  components: {
    detailButton,
    basics
  }
};
</script>
