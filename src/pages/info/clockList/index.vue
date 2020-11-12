<style lang="less" scoped>
.content {
  flex: 1;
  height: 0;
  background: #f0f7f7;
  display: flex;
  flex-direction: column;
  .head {
    background: #fff;
    // position: sticky;
    // top: 0;
    // z-index: 10;
    .head-type {
      height: 67px;
      display: flex;
      padding: 0 24px;
      border-bottom: 1px solid #f0f2f5;
      .head-type-item {
        position: relative;
        line-height: 67px;
        margin-right: 46px;
        color: #303133;
        font-size: @font18;
        cursor: pointer;
        &.active {
          color: @backgroud;
          font-weight: bold;
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
    }
    .head-underling-nva {
      display: flex;
      height: 58px;
      align-items: center;
      padding-left: 24px;
      .head-nav-item {
        width: 72px;
        height: 26px;
        border-radius: 4px;
        border: 1px solid transparent;
        box-sizing: border-box;
        font-size: @font14;
        text-align: center;
        line-height: 24px;
        color: #606266;
        margin-right: 16px;
        &.active {
          color: @backgroud;
          background: @opacityBackground;
          border: 1px solid @backgroud;
        }
      }
    }
  }
  .scroll {
    flex: 1;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
<template>
  <div class="content">
    <div class="head">
      <div class="head-type">
        <div class="head-type-item active">考勤统计</div>
        <div class="head-type-item">考勤规则</div>
      </div>
      <div class="head-underling-nva">
        <div class="head-nav-item active">我的日志</div>
        <div class="head-nav-item">考勤统计</div>
        <div class="head-nav-item">考勤审批</div>
      </div>
    </div>
    <div class="scroll">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>
