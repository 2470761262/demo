<style lang="less" scoped>
.detail-content {
  padding: 0 0px 0 70px;
  .detail-price-content {
    padding-bottom: 10px;
    border-bottom: 1px solid #cccccc;
    font-size: 0;
    line-height: 1;
    .detail-price {
      display: inline-block;
      color: #dc4638;
      span:first-child {
        font-size: 60px;
      }
      span:last-child {
        font-size: 22px;
        vertical-align: text-bottom;
        font-weight: 600;
      }
    }
    .detail-price-avg {
      display: inline-block;
      vertical-align: text-bottom;
      font-size: 18px;
      font-weight: 600;
      color: #878787;
      margin-left: 35px;
    }
  }
  .content-flex {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
    &.content-pad {
      padding: 15px 0;
    }
    .cell-item {
      text-align: center;
      .cell-item-head {
        font-size: 28px;
        color: #515151;
        font-weight: 600;
      }
      .cell-tiem-floot {
        margin-top: 5px;
        font-size: 18px;
        color: #999999;
      }
    }
  }
  .cell-tabs-content {
    // display: flex;
    border-bottom: 1px solid #cccccc;
    padding: 15px 0;
    .flex-row {
      display: flex;
      .cell-tabs {
        margin-left: 80px;
        margin-top: 0;
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .cell-tabs {
      display: flex;
      margin-top: 20px;
      .cell-tabs-title {
        color: #a7a7a7;
        font-size: 18px;
        width: 120px;
      }
      .cell-tabs-detail {
        font-size: 18px;
        color: #606060;
      }
      .cell-tabs-nav {
        color: #0e834e;
        font-size: 18px;
        margin-left: 15px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .cell-pro {
    display: flex;
    padding-top: 15px;
    .cell-pro-item {
      flex: 1;
      display: flex;
      align-items: center;
      border-right: 1px solid #cccccc;
      box-sizing: border-box;
      justify-content: space-around;
      &:last-child {
        border-right: none;
      }
      .cell-pro-left-img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        overflow: hidden;
      }
      .cell-pro-detail {
        //padding: 0 17px;
        text-align: center;
        .cell-pro-detail-name {
          font-size: 24px;
          color: #515151;
          font-weight: 600;
        }
        .cell-pro-detail-other {
          color: #bbbbbb;
          font-size: 16px;
          margin-top: 5px;
        }
      }
      .cell-pro-but {
        padding: 10px;
        color: #fff;
        border-radius: 4px;
        background: #0d824b;
        font-size: 16px;
        cursor: pointer;
        border: none;
        outline: none;
        position: relative;
        overflow: hidden;
        &::after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, black 10%, transparent 10%);
          transform: scale(10, 10);
          opacity: 0;
          transition: transform 0.3s, opacity 0.5s;
        }
        &:active:after {
          transform: scale(0, 0);
          opacity: 0.3;
          transition: 0s;
        }
      }
    }
  }
}
</style>
<template>
  <div class="detail-content">
    <div class="detail-price-content">
      <div class="detail-price">
        <span>128</span>
        <span>万元</span>
      </div>
      <div class="detail-price-avg">14300元/㎡</div>
    </div>
    <div class="content-flex content-pad">
      <div class="cell-item">
        <div class="cell-item-head">3室2厅2卫</div>
        <div class="cell-tiem-floot">16层/共21层</div>
      </div>
      <div class="cell-item">
        <div class="cell-item-head">南北</div>
        <div class="cell-tiem-floot">平层/精装</div>
      </div>
      <div class="cell-item">
        <div class="cell-item-head">89平米</div>
        <div class="cell-tiem-floot">2011年建</div>
      </div>
    </div>
    <div class="cell-tabs-content">
      <div class="flex-row">
        <div class="cell-tabs">
          <div class="cell-tabs-title">看房方式</div>
          <div class="cell-tabs-detail">有钥匙</div>
        </div>
        <div class="cell-tabs">
          <div class="cell-tabs-title">存放门店</div>
          <div class="cell-tabs-detail">博士圆点</div>
        </div>
      </div>
      <div class="cell-tabs">
        <div class="cell-tabs-title">小区名称</div>
        <div class="cell-tabs-detail">夏鑫博士哥</div>
        <div class="cell-tabs-nav">楼栋号</div>
      </div>
      <div class="cell-tabs">
        <div class="cell-tabs-title">被砍次数</div>
        <div class="cell-tabs-detail">5次</div>
      </div>
      <div class="cell-tabs">
        <div class="cell-tabs-title">未跟进次数</div>
        <div class="cell-tabs-detail">3天</div>
      </div>
    </div>
    <div class="cell-pro">
      <div class="cell-pro-item">
        <el-image class="cell-pro-left-img"
                  src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201908/20190811/20190811111530328_34985.jpg?x-oss-process=style/thumb"
                  fit="cover">
          <div slot="placeholder"
               class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
        <div class="cell-pro-detail">
          <div class="cell-pro-detail-name">无受困</div>
          <div class="cell-pro-detail-other">直径二点</div>
        </div>
        <button class="cell-pro-but">一键拨号</button>
      </div>
      <div class="cell-pro-item">
        <div class="cell-pro-detail">
          <div class="cell-pro-detail-name">章节</div>
          <div class="cell-pro-detail-other">业主称呼</div>
        </div>
        <button class="cell-pro-but">查看号码</button>
        <button class="cell-pro-but">一键拨号</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
