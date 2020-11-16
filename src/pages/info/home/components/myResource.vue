<style lang="less" scoped>
.resource {
  background: #ffffff;

  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);

  border-radius: 8px;

  padding: 24px;

  margin-top: 24px;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1;

    margin-bottom: 24px;
    .head-title {
      color: #303133;
      font-weight: bold;
      font-size: @font18;
    }
    .head-more {
      color: @backgroud;
      cursor: pointer;
      font-size: @font14;
      &::after {
        content: "\e62d";
        font-family: iconfont;
        font-size: @font14;
      }
    }
  }
  .layout-content {
    display: flex;
    flex-wrap: wrap;

    margin: 0 -8px;
    .layout-item {
      flex: 0 0 calc((100% - 48px) / 3);

      margin: 0 8px;

      height: 98px;
      background: #f7f7f9;

      border-radius: 4px;
      box-sizing: border-box;
      line-height: 1;
      &:nth-child(-n + 3) {
        margin-bottom: 16px;
      }
      .item-title {
        padding-top: 22px;

        text-indent: 22px;
        font-size: @font14;
        color: #606266;

        margin-bottom: 16px;
      }
      .item-data {
        font-size: 32px;
        font-family: lsx;
        font-weight: bold;
        color: #303133;
        text-align: center;
      }
    }
  }
}
</style>

<template>
  <div class="resource">
    <div class="head">
      <span class="head-title">我的资源</span>
      <span class="head-more">查看更多</span>
    </div>
    <div class="layout-content">
      <div class="layout-item">
        <div class="item-title">跟单房源量（套）</div>
        <div class="item-data">482</div>
      </div>
      <div class="layout-item">
        <div class="item-title">独家委托量（套）</div>
        <div class="item-data">29</div>
      </div>
      <div class="layout-item">
        <div class="item-title">房源实勘量（套）</div>
        <div class="item-data">274</div>
      </div>
      <div class="layout-item">
        <div class="item-title">钥匙委托量（套）</div>
        <div class="item-data">784</div>
      </div>
      <div class="layout-item">
        <div class="item-title">房源录入量（套）</div>
        <div class="item-data">341</div>
      </div>
      <div class="layout-item">
        <div class="item-title">客户量（套）</div>
        <div class="item-data">3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
