<style lang="less" scoped>
.wait-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #fff;
  img {
    width: 450px;
    height: 270px;
  }
  .wait-text {
    font-size: 26px;
    padding-left: 80px;
    line-height: 50px;
    color: #999999;
    // align-self: flex-start;
  }
}
</style>
<template>
  <div class="wait-loading">
    <div>
      <img src="https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/4/2/be72efe8cdba4c749f871ef62e6ee90e.png"
           alt="">

      <p class="wait-text">正在加速开发中<br>敬请期待...</p>
    </div>
  </div>
</template>
<script>
export default {};
</script>