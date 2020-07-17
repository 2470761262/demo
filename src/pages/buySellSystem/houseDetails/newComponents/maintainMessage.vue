<style lang="less" scoped>
@import "../newLess/cardContent";
.maintain-content {
  .card-content;
  .card-message-title {
    .card-message-title;
  }
  .card-message-cell {
    .card-message-cell;
  }
}
</style>
<template>
  <section class="maintain-content">
    <div class="card-head">
      <h3 class="card-head-title">维护信息</h3>
      <span class="card-head-tips">上次更新: 2020-06-28 21:22:23</span>
    </div>
    <div class="card-message-content">
      <h3 class="card-message-title">价格信息</h3>
      <!-- 上次交易时间 & 付款要求 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">上次交易时间</div>
          <div class="card-item-data">2018-12-15</div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">付款要求</div>
          <div class="card-item-data">一次性付款</div>
        </div>
      </div>
      <!-- 上次交易金额 & 是否唯一住房 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">上次交易金额</div>
          <div class="card-item-data">89万</div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">是否唯一住房</div>
          <div class="card-item-data">不唯一</div>
        </div>
      </div>
      <!-- 抵押情况 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">抵押情况</div>
          <div class="card-item-data">有抵押,工商银行,89万,4000万</div>
        </div>
      </div>

      <h3 class="card-message-title section-spilit">价格信息</h3>
      <!-- 房屋用途 & 房屋现状 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">房屋用途</div>
          <div class="card-item-data">普通住宅</div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">房屋现状</div>
          <div class="card-item-data">出租中</div>
        </div>
      </div>
      <!-- 装修情况 & 附属配套 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">装修情况</div>
          <div class="card-item-data">精装修</div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">附属配套</div>
          <div class="card-item-data">车位</div>
        </div>
      </div>
      <!-- 小学划片 & 小学占用 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">小学划片</div>
          <div class="card-item-data">龙岩实验学校</div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">小学占用</div>
          <div class="card-item-data">二年级</div>
        </div>
      </div>
      <!-- 中学划片 & 中学占用 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">中学划片</div>
          <div class="card-item-data">龙岩初级学校</div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">中学占用</div>
          <div class="card-item-data">为占用</div>
        </div>
      </div>
      <!-- 户口情况 & 房屋占用 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">户口占用</div>
          <div class="card-item-data">为占用</div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">房屋占用</div>
          <div class="card-item-data">不动产权证</div>
        </div>
      </div>
      <!-- 挂牌时间 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">挂牌时间</div>
          <div class="card-item-data">2020-06-28</div>
        </div>
      </div>
      <h3 class="card-message-title section-spilit">特色信息</h3>
      <!-- 特色信息 & 物业公司 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">电梯配套</div>
          <div class="card-item-data">有配套</div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">物业公司</div>
          <div class="card-item-data">厦门大物业有限公司</div>
        </div>
      </div>
      <!-- 产权性质 & 土地性质 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">产权性质</div>
          <div class="card-item-data">商品房</div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">土地性质</div>
          <div class="card-item-data">暂无数据</div>
        </div>
      </div>
      <!-- 户型结构 & 房屋结构 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">户型结构</div>
          <div class="card-item-data">错层</div>
        </div>
        <div class="card-message-item">
          <div class="card-item-title">房屋结构</div>
          <div class="card-item-data">框架</div>
        </div>
      </div>
      <!-- 竣工时间 -->
      <div class="card-message-cell">
        <div class="card-message-item">
          <div class="card-item-title">竣工时间</div>
          <div class="card-item-data">2006年</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>
