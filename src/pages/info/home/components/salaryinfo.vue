<style lang="less" scoped>
.icon-row {
  display: flex;
  margin: 24px -8px 0;
  .row-item {
    background: #ffffff;
    box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
    border-radius: 8px;
    flex: 0 0 calc((100% - 64px) / 4);
    margin: 0 8px;
    height: 110px;
    background: #fff;
    display: flex;
    align-items: center;
    .row-item-icon {
      width: 82px;
      text-align: center;
    }
    .row-item-data {
      line-height: 1;
      .row-data-title {
        color: #909399;
        font-size: @font14;

        margin-bottom: 16px;
      }
      .row-data-value {
        display: flex;
        align-items: baseline;
        .value-after {
          font-size: @font16;
          font-weight: bold;

          margin-right: 4px;
        }
        .value-data {
          font-family: lsx;
          font-size: @font24;
          color: #303133;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
<template>
  <div class="icon-row">
    <!-- 本业工资 -->
    <div class="row-item">
      <div class="row-item-icon">
        <img src="https://img.0be.cn/pc/attence_17.svg" alt="" />
      </div>
      <div class="row-item-data">
        <div class="row-data-title">本月工资</div>
        <div class="row-data-value">
          <span class="value-after">￥</span>
          <span class="value-data">7,900</span>
        </div>
      </div>
    </div>
    <!-- 业绩核算 -->
    <div class="row-item">
      <div class="row-item-icon">
        <img src="https://img.0be.cn/pc/attence_18.svg" alt="" />
      </div>
      <div class="row-item-data">
        <div class="row-data-title">业绩核算</div>
        <div class="row-data-value">
          <span class="value-after">￥</span>
          <span class="value-data">21,900</span>
        </div>
      </div>
    </div>
    <!-- 品牌分 -->
    <div class="row-item">
      <div class="row-item-icon">
        <img src="https://img.0be.cn/pc/attence_16.svg" alt="" />
      </div>
      <div class="row-item-data">
        <div class="row-data-title">品牌分</div>
        <div class="row-data-value">
          <!-- <span class="value-after">￥</span> -->
          <span class="value-data">50000</span>
        </div>
      </div>
    </div>
    <!-- 品牌分 -->
    <div class="row-item">
      <div class="row-item-icon">
        <img src="https://img.0be.cn/pc/attence_19.svg" alt="" />
      </div>
      <div class="row-item-data">
        <div class="row-data-title">级别</div>
        <div class="row-data-value">
          <!-- <span class="value-after">￥</span> -->
          <span class="value-data">F3</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
