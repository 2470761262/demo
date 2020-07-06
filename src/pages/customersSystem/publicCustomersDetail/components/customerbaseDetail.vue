<style lang="less" scoped>
.part-Warp {
  padding: 24px;
}
.MainMsgZone {
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f2f5;
  .MainMsgTil {
    // prettier-ignore
    font-size: 24PX;
    font-weight: bold;
    > span {
      margin-left: 16px;
      // prettier-ignore
      font-size: 18PX;
      color: #606266;
      font-weight: 100;
    }
  }
  .MainMsgOption {
    .White,
    .Green {
      padding: 0 16px;
      height: 36px;
      line-height: 36px;
      border: 1px solid;
      border-radius: 4px;
      // prettier-ignore
      font-size: 16PX;
    }
    .White {
      background: #ffffff;
      border: 1px solid @backgroud;
      color: @backgroud;
      margin-bottom: 16px;
    }
    .Green {
      background: @backgroud;
      border: 1px solid #ffffff;
      color: #ffffff;
    }
  }
}
.SubMsgZone {
  padding: 24px 0;
  .SubMsgRow {
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    .SubMsgTil,
    .SubMsgText {
      // prettier-ignore
      font-size: 18PX;
    }
    .SubMsgTil {
      color: #606266;
    }
    .SubMsgText {
    }
  }
}
</style>
<template>
  <div class="part-Warp">
    <div class="MainMsgZone">
      <div class="MainMsgTil">
        周杰伦
        <span>男</span>
      </div>
      <div class="MainMsgOption">
        <div class="White">认领客户</div>
        <div class="Green">一键拨号</div>
      </div>
    </div>
    <div class="SubMsgZone">
      <div class="SubMsgRow">
        <div class="SubMsgTil">委托来源：</div>
        <div class="SubMsgText">朋友</div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">客户需求：</div>
        <div class="SubMsgText">买二手住宅</div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">委托时间：</div>
        <div class="SubMsgText">2020-06-22</div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">购房意向：</div>
        <div class="SubMsgText">一般</div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">上次维护时间：</div>
        <div class="SubMsgText">2020-06-22</div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">进池时间：</div>
        <div class="SubMsgText">2020-06-22</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
