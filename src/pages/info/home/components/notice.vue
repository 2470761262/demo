<style lang="less" scoped>
.notice-content {
  margin-top: 24px;
  padding: 24px;
  background: #ffffff;
  line-height: 1;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
  .notice-head {
    display: flex;
    align-items: center;
    .head-item {
      .head-item-f(#303133, @font14);
      &.active {
        font-size: @font18;
      }
    }
    .head-more {
      color: @backgroud;
      flex: 1;
      text-align: right;
      span {
        cursor: pointer;
        &::after {
          content: "\e62d";
          font-family: iconfont;
          font-size: @font14;
        }
      }
    }
  }
  .notice-list {
    margin-top: 28px;
    .notice-list-item {
      display: flex;

      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0px;
      }
      font-size: @font14;
      color: #606266;
      cursor: pointer;
      &:hover {
        .notice-item-text {
          text-decoration: underline;
        }
      }
      .notice-item-text {
        width: 164px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .notice-item-time {
        flex: 1;
        text-align: right;
        color: #909399;
      }
    }
  }
}
.head-item-f(@color:@backgroud,@font:@font16) {
  cursor: pointer;
  color: @color;
  font-size: @font;

  margin-right: 24px;
  &.active {
    position: relative;
    font-weight: bold;
    color: @backgroud;
    font-size: @font16;

    padding-bottom: 9px;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;

      height: 4px;
      background: @backgroud;

      border-radius: 2px 2px 0px 0px;
    }
  }
}
</style>

<template>
  <div class="notice-content">
    <div class="notice-head">
      <div class="head-item active">
        系统公告
      </div>
      <div class="head-item ">
        规则文档
      </div>
      <div class="head-more">
        <span>更多</span>
      </div>
    </div>
    <div class="notice-list">
      <div class="notice-list-item">
        <div class="notice-item-text">
          系统公告系统公告系统公告系统公告系统公告系统公告系统公
        </div>
        <div class="notice-item-time">04-12</div>
      </div>
      <div class="notice-list-item">
        <div class="notice-item-text">系统公告系统公告系统公</div>
        <div class="notice-item-time">04-12</div>
      </div>
      <div class="notice-list-item">
        <div class="notice-item-text">系统公告系统公告系统公</div>
        <div class="notice-item-time">04-12</div>
      </div>
      <div class="notice-list-item">
        <div class="notice-item-text">系统公告系统公告系统公</div>
        <div class="notice-item-time">04-12</div>
      </div>
      <div class="notice-list-item">
        <div class="notice-item-text">系统公告系统公告系统公</div>
        <div class="notice-item-time">04-12</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
