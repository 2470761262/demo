<template>
  <div class="query-cell">
    <el-input placeholder="登录器注册密码"
              size="small"
              v-model="pwd"
              clearable
              readonly>
      <template slot="prepend">登录器注册密码</template>
    </el-input>
  </div>
</template>
<script>
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  data () {
    return {
      pwd: ""
    };
  },
  created () {
    this.$api
      .post({
        url: "/logon/pwd",
        qs: true
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          this.pwd = result.message;
        } else {
          alert(result.message);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>