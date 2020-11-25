<style lang="less" scoped>
.main-head {
  color: #303133;
  line-height: 1;
  .head-title {
    font-size: @font24;
    font-weight: bold;
  }
  .head-titps {
    font-size: @font18;
    margin-top: 16px;
  }
}
</style>
<template>
  <div class="main-head">
    <h3 class="head-title">
      {{ loginDataRemoteMixin.data.userName }},{{ time }}
    </h3>
    <div class="head-titps">Welcome to XinJia</div>
  </div>
</template>

<script>
export default {
  inject: ["loginDataRemoteMixin"],
  data() {
    return {
      time: ""
    };
  },
  created() {
    //12423424
    this.getTime();
  },
  methods: {
    getTime() {
      const nowTime = new Date();
      const hour = nowTime.getHours();
      if (hour > 4 && hour < 12) {
        this.time = "早上好";
      } else if (hour > 12 && hour < 14) {
        this.time = "中午好";
      } else if (hour >= 14 && hour < 18) {
        this.time = "下午好";
      } else {
        this.time = "晚上好";
      }
    }
  }
};
</script>
