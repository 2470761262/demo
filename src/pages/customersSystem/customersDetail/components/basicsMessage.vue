<style lang="less" scoped>
.basics-content {
  .content-title {
    font-size: 22px;
    margin-bottom: 35px;
  }
  .basics-layout-content {
    font-size: 18px;
    display: flex;
    flex-wrap: wrap;
    .basics-layout-item {
      flex: 0 0 50%;
      display: flex;
      margin-top: 33px;
      &:nth-child(-n + 2) {
        margin-top: 0;
      }
      &:nth-child(2n) {
        .basics-layout-item-title {
          text-indent: 50px;
        }
        .basics-layout-item-message {
          text-indent: 30px;
        }
      }
      .basics-layout-item-title {
        width: 160px;
        color: #b4b4b4;
      }
      .basics-layout-item-message {
        flex: 1;
        width: 0;
      }
    }
  }
}
</style>
<template>
  <section class="basics-content">
    <h3 class="content-title">基础信息</h3>
    <div class="basics-layout-content">
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">客户籍贯</div>
        <div class="basics-layout-item-message">新罗区</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">客户来源</div>
        <div class="basics-layout-item-message">鑫家网</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">期望面积</div>
        <div class="basics-layout-item-message">80-80平</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">首付金额</div>
        <div class="basics-layout-item-message">50-60万</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">期望总价</div>
        <div class="basics-layout-item-message">100-120万</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">付款方式</div>
        <div class="basics-layout-item-message">商业贷款</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">购买户型</div>
        <div class="basics-layout-item-message">3房</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">装修需求</div>
        <div class="basics-layout-item-message">毛坯</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">期望小学</div>
        <div class="basics-layout-item-message">未填写</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">期望中学</div>
        <div class="basics-layout-item-message">未填写</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">上次带看</div>
        <div class="basics-layout-item-message">2020-03-01</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">录入时间</div>
        <div class="basics-layout-item-message">2020-01-01</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">录入人</div>
        <div class="basics-layout-item-message">钟丽娟</div>
      </div>
      <div class="basics-layout-item">
        <div class="basics-layout-item-title">PASS方</div>
        <div class="basics-layout-item-message">暂无</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

