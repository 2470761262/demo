<style lang="less" scoped>
.content {
  background: rgba(240, 247, 247, 1);
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 0;
  .tip-style {
    padding: 50px 0;
    margin-top: 220px;
    text-align: center;
    div {
      text-align: center;
      font-size: @font16;
    }
  }
}
</style>
<template>
  <div class="content">
    <breadcrumb></breadcrumb>
    <nav-menu :navMenuIndex="4"></nav-menu>
    <div class="tip-style">
      <img src="../../../../assets/images/zanwu.png" alt="暂无数据" />
      <div>暂无信息</div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../components/entranceBreadcrumb.vue";
import navMenu from "../components/entranceNavMenu.vue";
export default {
  provide() {
    return {};
  },
  components: {
    breadcrumb,
    navMenu
  },
  data() {
    return {};
  }
};
</script>
