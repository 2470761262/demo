<style lang="less" scoped>
.partner {
  margin-top: 24px;

  height: 80px;
  background: #008778;

  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);

  border-radius: 8px;

  padding: 6px;
  line-height: 1;
  box-sizing: border-box;
  .partner-inner {
    border-radius: 4px;
    border: 1px solid #c5a570;
    display: flex;
    height: 100%;
    align-items: center;
    box-sizing: border-box;

    padding: 0 12px 0 16px;
    .inner-middle {
      flex: 1;

      margin-left: 8px;
      h4 {
        font-size: @font18;
        color: #fff;
        font-weight: bold;
      }
      h5 {
        font-size: @font14;
        color: #fff;

        margin-top: 8px;
        font-weight: normal;
      }
    }
    button {
      width: 65px;

      height: 24px;
      background: linear-gradient(90deg, #e4d1a9 0%, #c5a570 100%);

      box-shadow: 0px 2px 4px 0px rgba(0, 101, 90, 0.46);

      border-radius: 4px;
      border: 0;
      outline: 0;
      color: #fff;
      font-size: @font12;
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div class="partner">
    <div class="partner-inner">
      <img src="https://img.0be.cn/pc/attence_xzjh.svg" alt="" />
      <div class="inner-middle">
        <h4>我要成为合伙人</h4>
        <h5>让杰出的你更成功</h5>
      </div>
      <button @click="loadingFun">立即申请</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loadingFun() {
      this.$message({
        message: "功能升级中，敬请期待...",
        type: "success"
      });
    }
  }
};
</script>
