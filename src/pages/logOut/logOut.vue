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
    <div class="logout-title">
      登陆已过期，请使用<span
        style="font-size:20px;font-weight:border;color:green;"
        >鑫伽系统</span
      >登录器重新登录
    </div>
    <div
      style="background-image:https://rescdn.qqmail.com/zh_CN/htmledition/images/webp/tg-smile1e9c5d.jpg;"
    ></div>
    <img
      src="https://rescdn.qqmail.com/zh_CN/htmledition/images/webp/tg-smile1e9c5d.jpg"
    />
    <!-- <el-button type="primary" @click="goLogin">返回登陆</el-button> -->
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
