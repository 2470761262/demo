<template>
  <div class="head-fun-right">
    <button
      class="btn-primary anchor-point"
      data-anchor="资源库管理一键导入"
      @click="templateImport"
    >
      <i class="iconTemplateImport iconfont"></i>
      一键导入
    </button>
    <button
      class="btn-primary anchor-point"
      data-anchor="资源库管理模板下载"
      @click="templateDownload"
    >
      <i class="iconTemplateDownload iconfont"></i>
      模板下载
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    /**
     * 一键导入
     */
    templateImport() {

    },
    /**
     * 模板下载
     */
    templateDownload() {

    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/pages/customersSystem/addCustomers/less/form.less";
.head-fun-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .btn-primary {
    .btn-primary;
    display: flex;
    align-items: center;
    margin-left: 30px;
    font-size: @font16;
    border-radius: 30px;
    padding-top: 7px;
    padding-bottom: 7px;
    height: auto;
    i {
      font-size: @font16;
      margin-right: 5px;
    }
    &.house-back {
      background: @backgroud;
      color: #fff;
      box-shadow: 0 4px 10px @opacityBackground;
    }
  }
}
</style>
