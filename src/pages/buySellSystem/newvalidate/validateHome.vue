<style lang="less" scoped>
.content {
  // prettier-ignore
  padding: 0 16PX;
  position: relative;
  .tips-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
    // prettier-ignore
    height: 223PX;
    background: linear-gradient(360deg, #2f837b 0%, #0a6458 100%);
  }
  .tips {
    // prettier-ignore
    font-size: 36PX;
    color: #fff;
    position: relative;
    z-index: 1;
    display: block;
    // prettier-ignore
    padding: 34PX 0 24PX 16PX;
    font-weight: bold;

    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  }
  .small-tips {
    position: relative;
    z-index: 1;
    color: #fff;
    // prettier-ignore
    padding-left: 16PX;
    // prettier-ignore
    font-size: 18PX;
    opacity: 0.76;
  }
  .content-body {
    display: flex;
    position: relative;
    z-index: 1;
    // prettier-ignore
    margin-top: 27PX;
    .content-left {
      flex: 1;
      // prettier-ignore
      margin-right: 16PX;
      background: #fff;
      // prettier-ignore
      padding: 24PX;
      // prettier-ignore
      border-radius: 8PX;
    }
    .content-right {
      // prettier-ignore
      width: 375PX;
    }
  }
}
</style>
<template>
  <div class="content">
    <div class="tips-back"></div>
    <strong class="tips">请在下方,选择一种方案对房源进行验真</strong>
    <small class="small-tips"
      >新增房源、申请跟单人都需要对房源进行验真，业主核验通过才能上架、申请跟单成功</small
    >
    <section class="content-body">
      <div class="content-left"></div>
      <div class="content-right"></div>
    </section>
  </div>
</template>

<script>
export default {};
</script>
