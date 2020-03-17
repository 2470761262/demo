<style lang="less" scoped>
.other-title {
  font-size: 30px;
  font-weight: 600;
  margin-top: 80px;
  &:first-child {
    margin-top: 0;
  }
}
.message-row {
  display: flex;
  margin-top: 25px;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 35px;
  &.last-row {
    border: none;
    padding-bottom: 0;
  }
  &:first-of-type {
    padding-bottom: 5px;
  }
  .message-row-title {
    width: 117px;
    font-size: 18px;
    color: #b5b5b5;
  }
  .message-row-right {
    flex: 1;
    white-space: break-all;
    word-wrap: break-word;
    width: 0;
    color: black;
    font-size: 18px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.message-row-group {
  display: flex;
  margin-top: 40px;
  .message-row {
    flex: 0 0 50%;
    border: none;
    padding: 0;
    margin-top: 0;
    .message-row-title {
      width: 150px;
    }
    .message-row-right {
      display: block;
      width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
<template>
  <div>
    <h3 class="other-title">房源描述</h3>
    <section class="message-row">
      <h5 class="message-row-title">小区介绍</h5>
      <div class="message-row-right"> 小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍小区介绍
      </div>
    </section>
    <section class="message-row">
      <h5 class="message-row-title">户型介绍</h5>
      <div class="message-row-right"> 南北通透,主卧,客厅,阳台朝南,电梯入户</div>
    </section>
    <section class="message-row last-row">
      <h5 class="message-row-title">税费情况</h5>
      <div class="message-row-right">满二,税费2万,车位1.3万</div>
    </section>

    <h3 class="other-title">房屋概况</h3>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">房屋用途</h5>
        <div class="message-row-right">普通住宅</div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">电梯配套</h5>
        <div class="message-row-right">有</div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">房屋证件</h5>
        <div class="message-row-right">不动产权证</div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">产权性质</h5>
        <div class="message-row-right">商品房</div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">户口占用</h5>
        <div class="message-row-right">占用</div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">附属配套</h5>
        <div class="message-row-right">-1层车位</div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">小学划片</h5>
        <div class="message-row-right">联动小学</div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">学籍占用</h5>
        <div class="message-row-right">一年级</div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">中学划片</h5>
        <div class="message-row-right">联动中学</div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">学籍情况</h5>
        <div class="message-row-right">未占用</div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">物业公司</h5>
        <div class="message-row-right">建发物业</div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">评估价</h5>
        <div class="message-row-right">9000元/平</div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">物业费</h5>
        <div class="message-row-right">1.6元/平方</div>
      </div>
    </section>

    <h3 class="other-title">交易信息</h3>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">挂牌时间</h5>
        <div class="message-row-right">2019-9-11</div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">上次交易时间</h5>
        <div class="message-row-right">暂无</div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">上次交易</h5>
        <div class="message-row-right">暂无</div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">土地性质</h5>
        <div class="message-row-right">出让</div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">抵押信息</h5>
        <div class="message-row-right">有抵押</div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">剩余贷款</h5>
        <div class="message-row-right">45万</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>
