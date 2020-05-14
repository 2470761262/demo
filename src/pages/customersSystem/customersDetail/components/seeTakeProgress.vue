<style lang="less" scoped>
//primary
.progress-content {
  display: flex;
  justify-content: space-between;
  @defaultColor: #e6e6e6;
  @commonColor: #fb5554;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: calc(50% - 2px);
    left: 30px;
    right: 30px;
    transform: translateY(-50%);
    height: 4px;
    background: @commonColor;
  }
  .progress-item-content {
    text-align: center;
    position: relative;
    z-index: 10;
    @pad: 5px;
    &-common,
    &-success {
      .item-content-type {
        padding: @pad;
        box-sizing: border-box;
        background: rgba(251, 85, 84, 0.6);
        &::after {
          background: @commonColor;
          top: @pad;
          left: @pad;
          right: @pad;
          bottom: @pad;
        }
      }
      .item-content-tips {
        color: @commonColor;
      }
    }
    &-default {
      .item-content-title {
        visibility: hidden;
        &::before {
          content: "-";
        }
      }
      .item-content-type {
        &::after {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: @defaultColor;
        }
      }
      .item-content-tips {
        color: #989899;
      }
    }
    &-success {
      .item-content-type {
        padding: 0;
        font-family: "element-icons";
        &::after {
          content: "\e6da" !important;
          color: #fff;
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
    }
    .item-content-title {
      font-size: 16px;
      color: #666;
    }
    .item-content-type {
      width: 33px;
      height: 33px;
      border-radius: 50%;
      position: relative;
      margin: 10px auto 7px;
      &::after {
        content: "";
        position: absolute;
        border-radius: 50%;
      }
    }
    .item-content-tips {
      font-size: 20px;
    }
  }
}
</style>
<template>
  <div class="progress-content">
    <div class="progress-item-content progress-item-content-common">
      <div class="item-content-title">2019-11-19</div>
      <div class="item-content-type"></div>
      <div class="item-content-tips">录入</div>
    </div>
    <div class="progress-item-content progress-item-content-common">
      <div class="item-content-title">2020-01-10</div>
      <div class="item-content-type"></div>
      <div class="item-content-tips">首次带看</div>
    </div>
    <div class="progress-item-content progress-item-content-common">
      <div class="item-content-title">2020-01-15</div>
      <div class="item-content-type"></div>
      <div class="item-content-tips">二次带看</div>
    </div>
    <div class="progress-item-content progress-item-content-default">
      <div class="item-content-title"></div>
      <div class="item-content-type"></div>
      <div class="item-content-tips">三次带看</div>
    </div>
    <div class="progress-item-content progress-item-content-default">
      <div class="item-content-title"></div>
      <div class="item-content-type"></div>
      <div class="item-content-tips">四次带看</div>
    </div>
    <div class="progress-item-content progress-item-content-default">
      <div class="item-content-title"></div>
      <div class="item-content-type"></div>
      <div class="item-content-tips">五次带看</div>
    </div>
    <div class="progress-item-content progress-item-content-default">
      <div class="item-content-title"></div>
      <div class="item-content-type"></div>
      <div class="item-content-tips">五次以上</div>
    </div>
    <div class="progress-item-content progress-item-content-success">
      <div class="item-content-title">2020-01-17</div>
      <div class="item-content-type"></div>
      <div class="item-content-tips">签约</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
