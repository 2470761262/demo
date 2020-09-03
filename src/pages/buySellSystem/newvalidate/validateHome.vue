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
    line-height: 1;
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
    line-height: 1;
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
      .head-content {
        display: flex;
        align-items: center;
        color: #303133;
        line-height: 1;
        .iconbianzu4 {
          // prettier-ignore
          font-size: 48PX;
        }
        .head-minddle {
          // prettier-ignore
          margin-left: 16PX;
          flex: 1;
          .head-minddle-title {
            // prettier-ignore
            font-size: 24PX;
            font-weight: bold;
          }
          .head-minddle-tips {
            // prettier-ignore
            font-size: 16PX;
            color: #606266;
            // prettier-ignore
            margin-top: 8PX;
          }
        }
      }
    }
    .content-right {
      // prettier-ignore
      width: 375PX;
    }
  }
}
.btn {
  background: @backgroud;
  color: #fff;
  border: none;
  outline: none;
  // prettier-ignore
  min-width: 90PX;
  // prettier-ignore
  height: 36PX;
  border-radius: 4px;
  font-size: @font14;
  cursor: pointer;
}
.border-content {
  background: #fff;
  // prettier-ignore
  padding: 24PX;
  // prettier-ignore
  border-radius: 8PX;
}
.border-foot {
  display: flex;
  // prettier-ignore
  margin-top: 32PX;
  .border-foot-left,
  .border-foot-right {
    // prettier-ignore
    width: 172PX;
    // prettier-ignore
    height: 172PX;
  }
  .border-foot-minddel {
    flex: 1;
    // prettier-ignore
    margin: 0 16PX;
    display: flex;
    // prettier-ignore
    padding-left: 24PX;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    .minddel-order {
      font-size: @font14;
      color: #606266;
      display: flex;
      align-items: center;
      // prettier-ignore
      margin-top: 24PX;
      &:first-child {
        margin-top: 0;
      }
      &::before {
        content: attr(data-order);
        // prettier-ignore
        width: 22PX;
        // prettier-ignore
        height: 22PX;
        border-radius: 50%;
        background: @backgroud;
        color: #fff;
        // prettier-ignore
        margin-right: 8PX;
        font-size: @font14;
        text-align: center;
        // prettier-ignore
        line-height: 22PX;
        flex-shrink: 0;
      }
    }
  }
  .border-foot-minddel,
  .border-foot-right {
    border-radius: 4px;
    background: #f8f8f8;
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
      <div class="content-left">
        <div class="border-content">
          <div class="head-content">
            <div class="iconfont iconbianzu4"></div>
            <div class="head-minddle">
              <div class="head-minddle-title">微信验真</div>
              <div class="head-minddle-tips">
                使用经纪人小程序，房源验真功能，转发给业主进行验真
              </div>
            </div>
            <button class="btn">选我验真</button>
          </div>
          <div class="border-foot">
            <div class="border-foot-left"></div>
            <div class="border-foot-minddel">
              <div class="minddel-order" data-order="1">
                微信扫码,打开小程序-验真详情页
              </div>
              <div class="minddel-order" data-order="2">
                小程序详情页中，使用“邀请验真功能”转发业主
              </div>
              <div class="minddel-order" data-order="3">
                联系业主，提醒业主对房源进行验真，以便上架展示
              </div>
            </div>
            <div class="border-foot-right"></div>
          </div>
        </div>
      </div>
      <div class="content-right"></div>
    </section>
  </div>
</template>

<script>
export default {};
</script>
