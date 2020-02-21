<style lang="less" scoped>
.page-cell-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  .per-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .per-name-nav {
    margin-left: 20px;
    .el-dropdown-link {
      font-size: 18px;
    }
  }
  .per-exit {
    font-size: 20px;
    margin-left: 20px;
    cursor: pointer;
  }
}
.page-theme {
  display: flex;
  align-items: center;
  &::before {
    content: "选择主题:";
    font-size: 14px;
  }
}
</style>
<template>
  <div class="page-cell-header">
    <div class="page-theme">
      <ThemePicker />
    </div>
    <div class="per-img">
      <img :src="userInfoData.headImgUrl" alt="头像" />
    </div>
    <div class="per-name-nav">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{userInfoData.userName}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">基本资料</el-dropdown-item>
          <el-dropdown-item command="b">修改密码</el-dropdown-item>
          <el-dropdown-item command="c">修改手机号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="per-exit el-icon-switch-button" @click="exitLogin"></div>
  </div>
</template>
<script>
import ThemePicker from "./ThemePicker";
import util from "@/util/util";
import { LOGINDATA, TOKEN } from "@/util/constMap";
export default {
  // {"outCode":1,"message":"登录成功","companyId":28,"headImgUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIlkar2ctf962HGNUrrfnicVdCBkLel4aGicIhtdxHTUiaFLq9bCIdy6r4ldHe2XzibsXeBuXhdyicdbaQ/132","empId":null,"accountId":44430,"isLocked":null,"del":null,"deptLocked":null,"type":0,"userName":"13559489067","companyName":null,"deptName":"鑫家房（网络部）","deptId":5387,"token":{"token":"eyJhbGciOiJIUzI1NiJ9.eyJMT0dJTl9VU0VSX0tFWSI6IjY2ODA5NWUzLTNlOTAtNDFkZS1iMDU2LTM2OWQ5YWQyYTdkZiJ9._wYpCbUE3Z0MSa2Ojvcaknurbea7b8UQHsiHr2t5LFs","loginTime":1582252624837,"expireTime":1582259824837}}
  props: ["userInfoData"], //接收父组件传值
  components: {
    ThemePicker
  },
  created() {},
  methods: {
    handleCommand(command) {
      this.$message("item " + command);
    },
    exitLogin() {
      let that = this;
      let logindata = util.localStorageGet(LOGINDATA);
      if (!logindata) {
        this.$message({
          type: "info",
          message: "未登录，退出失败，"
        });
        return;
      }
      this.$confirm("确定推出登录吗？", "友情提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          that.$api
            .post({
              url: "/loginManager/pcLoginOut",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: logindata
            })
            .then(e => {
              let result = e.data;
              console.log(result.message);
              if (result.code == 200) {
                util.localStorageRemove(TOKEN);
                util.localStorageRemove(LOGINDATA);
                that.$router.push({ path: "/" });
              } else {
                this.$message({
                  type: "info",
                  message: result.message
                });
              }
            })
            .catch(e => {
              console.log("【【【【uups,退出登录失败】】】】");
              console.log(e);
              this.$message({
                type: "info",
                message: "退出失败"
              });
            });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  }
};
</script>