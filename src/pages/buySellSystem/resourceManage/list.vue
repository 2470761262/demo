<template>
  <div class="page-list-content">
    <div class="page-result-head">
      <div class="head-content-input">
        <input
          type="text"
          placeholder="请输入楼盘名称"
          data-anchor="资源库管理楼盘名称输入框"
          class="content-input anchor-point"
          v-model="houseName"
          @keydown.enter="handleHouseName"
        />
        <button
          class="inquire-content anchor-point"
          @click="handleHouseName"
          :data-anchor="'资源库管理楼盘名称搜索{' + houseName + '}'"
        >
          <i class="el-icon-search"></i>
        </button>
      </div>
      <div class="head-fun-right">
        <button
          class="btn-primary anchor-point"
          data-anchor="首页管理入口"
          @click="navToPath('/buySellSystem/concernCommunity')"
        >
          <i class=" iconjichuguanli1 iconfont"></i>
          管理入口
        </button>
        <button
          class="btn-primary anchor-point"
          data-anchor="首页我的房源"
          @click="navToPath('/buySellSystem/myAgent')"
        >
          <i class="icondaohang_wodefangyuan1 iconfont"></i>
          我的房源
        </button>
        <button
          class="btn-primary house-back anchor-point"
          data-anchor="首页录入房源"
          @click="navToPath('/buySellSystem/addHouse')"
        >
          <i class=" iconluru iconfont"></i>
          录入房源
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      houseName: ""
    }
  },
  methods: {
    /**
     * @example: 处理楼盘名称点击查询
     */
    handleHouseName() {
      // this.form.keyWord = this.houseName;
    },
  }
}
</script>
<style lang="less">
@import "~@/pages/customersSystem/addCustomers/less/form.less";
.page-list-content{
  .page-result-head {
    display: flex;
    // justify-content: space-between;
    //padding: 24px 0;
    margin-top: 15px;
    padding: 0 15px;
    .head-content-input {
      // prettier-ignore
      width: 455PX;
      // prettier-ignore
      height: 40PX;
      display: flex;
      .content-input {
        // prettier-ignore
        width: 390PX;
        border: 1px solid rgba(206, 206, 206, 1);
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        text-indent: 16px;
        // line-height: 48px;
        height: 100%;
        box-sizing: border-box;
        outline: none;
        font-size: @font16;
        &::placeholder {
          font-size: @font16;
          color: #a6aaaf;
        }
      }
      .inquire-content {
        flex: 1;
        background: @backgroud;
        outline: none;
        border: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        font-size: @font24;
        color: #fff;
        cursor: pointer;
      }
    }
    .head-fun-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      margin-top: 15px;
      .btn-primary {
        display: flex;
        align-items: center;
        margin-left: 30px;
        font-size: @font16;
        border-radius: 30px;
        padding-top: 7px;
        padding-bottom: 7px;
        height: auto;
        i {
          font-size: @font16;
          margin-right: 5px;
        }
        &.house-back {
          background: @backgroud;
          color: #fff;
          box-shadow: 0 4px 10px @opacityBackground;
        }
      }
    }
  }
}

.btn-primary {
  .btn-primary;
}

</style>
