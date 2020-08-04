<template>
  <div class="page-content">
    <div class="head-nav-type">
      <div class="nav-type-item anchor-point active">
        资源库管理
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
.page-content{
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  .head-nav-type {
    background: #f6f7fb;
    display: flex;
    border-bottom: 1px solid #f0f2f5;
    .nav-type-item {
      font-size: @font16;
      font-weight: 600;
      color: #606266;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      // prettier-ignore
      padding: 12PX 55PX;
      &.active {
        color: @backgroud;
        border-left: 1px solid #f0f2f5;
        border-right: 1px solid #f0f2f5;
        background: #fff;
      }
      &:first-child {
        border-left: none;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}

</style>
