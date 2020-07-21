<style lang="less" scoped>
.logout {
  font-size: @font18;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logout-title {
    text-align: center;
    padding-top: 50px;
    margin-bottom: 50px;
  }
}
</style>
<template>
  <div class="logout">
    <div class="logout-title">登陆过期</div>
    <el-button type="primary" @click="goLogin">返回登陆</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    goLogin() {
      this.$router.replace({
        path: "/"
      });
    }
  }
};
</script>
