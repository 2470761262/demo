<style lang="less" scoped>
.page-cell-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 800px;
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
      color: #fff;
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
    color: #fff;
  }
}
.per-exit {
  color: #fff;
}
.happy-day-contet {
  width: 490px;
  height: 100%;
  margin: 0 40px;
  position: relative;
  overflow: hidden;
  transform-origin: center center;
  img {
    width: 490px;
    position: absolute;
    bottom: 0;
    height: 100%;
  }
  .happy-day-per {
    position: absolute;
    bottom: 13px;
    width: 100%;
    text-align: center;
    > span {
      margin-left: -20px;
      display: inline-flex;
      width: 230px;
      justify-content: space-between;
      span {
        font-family: "MingLiU";
        color: #fff;
        font-size: 15px;
      }
    }
  }
}
</style>
<template>
  <div class="page-cell-header">
    <el-button size="mini"
               @click="trgerColor">
      默哀主题
    </el-button>
    <div class="happy-day-contet">
      <img src="https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/3/26/9d2a1dc5647d4e51a5ab5857a110be87.png"
           alt="">
      <div class="happy-day-per">
        <span> <span>钟丽娟</span> <span> 钟丽娟</span> <span>钟丽娟</span> </span>
      </div>
    </div>
    <div class="page-theme">
      <ThemePicker />
    </div>
    <div class="per-img">
      <img :src="userInfoData.headImgUrl"
           alt="头像" />
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
    <div class="per-exit el-icon-switch-button"
         @click="exitLogin"></div>
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
  mounted() {
    document.querySelector("body").addEventListener("mousemove", this.move);
  },
  destroyed() {
    document.querySelector("body").removeEventListener("mousemove", this.move);
  },
  methods: {
    trgerColor() {
      let html = document.querySelector("html");

      if (!html.className.includes("gray")) {
        html.classList.add("gray");
      } else {
        html.classList.remove("gray");
      }
    },
    move(e) {
      try {
        let rotateX = -(window.innerWidth / 2 - e.pageX) / 100;
        let rotateY = -(80 / 2 - e.pageY) / 80;
        document.querySelector(
          ".happy-day-contet"
        ).style.cssText = `transform:rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      } catch (error) {
        document
          .querySelector("body")
          .removeEventListener("mousemove", this.move);
      }
    },
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