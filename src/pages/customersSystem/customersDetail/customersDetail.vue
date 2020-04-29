<style lang="less" scoped>
.page-content {
  min-height: 100%;
  background: #fff;
  padding: 30px 0 60px 107px;
  box-sizing: border-box;
  .head-content {
    display: flex;
    width: 1345px;
    .head-content-button {
      width: 433px;
    }
  }
}
</style>
<template>
  <section class="page-content">
    <div class="head-content">
      <detail-button class="head-content-button"></detail-button>
    </div>
  </section>
</template>

<script>
import detailButton from './components/detailButton';
export default {
  components: {
    detailButton,
  },
}
</script>

