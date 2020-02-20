<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.page-cell {
  height: 100vh;
  .page-cell-head {
    height: 11.5%;
  }
  .page-cell-content {
    height: 77%;
    background-image: url(http://sys.lsxjy.com.cn/images/login/bg09.jpg);
    background-size: cover;
    position: relative;
    .page-cell-login {
      width: 339px;
      height: 333px;
      position: absolute;
      right: 10%;
      background: #fff;
      box-shadow: 0px 0px 6px 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      top: 50%;
      transform: translateY(-50%);
      //切换按钮
      .page-cell-changeBut {
        height: 60px;
        width: 60px;
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: rgb(68, 125, 6);
        .loginZxj,
        .Web_login_03 {
          width: 100%;
          height: 100%;
        }
      }
      //账号登录
      .page-cell-account {
        overflow: hidden;
        padding: 0 15px;
        .account-cell-title {
          margin: 15px 0;
          font-size: 18px;
          color: black;
          font-weight: 600;
        }
        .account-midder {
          margin: 30px auto 0;
          display: block;
          background: #007e43;
        }
        .after-tips {
          /deep/.el-input__inner {
            border-color: red;
          }
          &::after {
            content: attr(data-tips);
            color: red;
          }
        }
      }
      //二维码登录
      .page-cell-qr {
        .page-cell-qrtitle {
          padding-top: 15px;
          text-align: center;
          font-size: 18px;
          color: black;
          font-weight: 600;
        }
        .page--cell-qrImg {
          width: 200px;
          height: 200px;
          margin: 15px auto 0;
          position: relative;
          > img {
            width: 100%;
            height: 100%;
          }
          .page-cell-reload-img {
            width: 20px;
            height: 20px;
            background-image: url(../../assets/images/channel_current.png);
            background-color: #007e43;
            background-size: 100%;
            position: absolute;
            right: -40px;
            top: 20px;
            cursor: pointer;
          }
        }
        .page-cell-time {
          text-align: center;
          margin-top: 15px;
        }
      }
    }
  }
  .page-cell-floot {
    height: 11.5%;
  }
}
.loginZxj {
  background-image: url("../../assets/images/loginZxj.png");
}
.Web_login_03 {
  background-image: url("../../assets/images/Web_login_03.png");
}
</style>
<template>
  <div class="page-cell">
    <div class="page-cell-head">
    </div>
    <div class="page-cell-content">
      <div class="page-cell-login">
        <!-- 二维码 -->
        <template v-if="loginType == 0">
          <div class="page-cell-qr">
            <div class="page-cell-qrtitle">二维码登录</div>
            <div class="page--cell-qrImg">
              <div id="qrcode"></div>
              <div class="page-cell-reload-img"
                   @click="remakeQr"></div>
            </div>
            <div class="page-cell-time">剩余时间:{{timeOutText}}秒</div>
          </div>
        </template>
        <!-- 账号 -->
        <template v-if="loginType == 1">
          <div class="page-cell-account">
            <div class="account-cell-title">用户名:</div>
            <div :class="{'after-tips':errorBags.has('account')}"
                 :data-tips="errorBags.first('account')">
              <el-input v-model="loginData.account"
                        placeholder="请输入账号"
                        name="account"
                        v-validate="'required'"></el-input>
            </div>
            <div class="account-cell-title">密码:</div>
            <div :class="{'after-tips':errorBags.has('password')}"
                 :data-tips="errorBags.first('password')">
              <el-input v-model="loginData.password"
                        type="password"
                        placeholder="请输入密码"
                        name="password"
                        v-validate="'required'"></el-input>
            </div>
            <el-button type="primary"
                       class="account-midder"
                       :loading="loginLoadding"
                       @click="loginValidate">{{loginLoadding ? '加载中' : '点击登录'}}</el-button>
          </div>
        </template>
        <!-- 切换按钮 -->
        <div class="page-cell-changeBut"
             @click="changeLoginType">
          <div :class="loginType == 0 ? 'loginZxj':'Web_login_03'"></div>
        </div>
      </div>
    </div>
    <div class="page-cell-floot"></div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2';
import { LOGINDATA } from '@/util/constMap';
import util from '@/util/util';
//import func from '../../vue-temp/vue-editor-bridge';
export default {
  name: 'home',
  watch: {
    loginType: {
      // immediate: true,
      handler: function (val, oldVal) {
        if (this.loginType == 1) {
          this.validateInit();
        } else if (this.loginType == 0) {
          // 和div的id相同 必须是id 
          this.clearTime();
          if (this.qrData != null) {
            this.qrData = null;
            this.qrcode();
          }
        }
      }
    }
  },
  created () {

  },
  mounted () {
    this.qrcode();
    let that = this;
    //开启定时器，验证是否扫码登录成功
    this.intervalIdForLoginStatus = setInterval(() => {
      if (this.qrcodeFlag == null) {
        return;
      }
      this.$api.post({
        url: '/loginManager/getUserLoginStatus',
        data: {
          qrCode: that.qrcodeFlag
        },
        qs: true,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result);
          this.accountId = result.data.accountID;
          //停止轮询
          clearInterval(that.intervalIdForLoginStatus);
          this.loginValidate();
          //that.$router.push({ path: '/buySellSystem/houseList' });
        } else {
          console.log("检查扫码登录结果：" + result.message);
        }
      }).catch((e) => {
        console.log("检查扫码登录状态失败");
        console.log(e);
      })
    }, 2000);
  },
  //离开页面时清空定时器
  beforeRouteLeave (to, from, next) {
    this.clearTime();
    next();
  },
  data () {
    return {
      loginType: 0, // 0 二维码 ，1 账号
      loginLoadding: false,
      timeOutText: 120,
      setIntervalId: null,//定时器ID
      intervalIdForLoginStatus: null,
      qrData: null,//存放二维码实例
      qrcodeFlag: null,//二维码标示
      accountId: 0,
      loginData: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    clearTime () {
      if (this.setIntervalId != null) {
        clearInterval(this.setIntervalId);
      }
      if (this.intervalIdForLoginStatus != null) {
        clearInterval(this.intervalIdForLoginStatus);
      }
    },
    //初始化验证
    validateInit () {
      const dictionary = {
        zh_CN: {
          messages: {
            required: field => field + "不能为空"
          },
          attributes: {
            account: "账号",
            password: "密码"
          }
        }
      };
      this.$validator.updateDictionary(dictionary);
    },
    //切换当前登录类型
    changeLoginType () {
      this.loginType = this.loginType == 0 ? 1 : 0;
      console.log(this.loginType);
    },
    //登录验证
    loginValidate () {
      let that = this;
      let loginParams = { "clientId": 0, qrCode: "", "userName": "", "passWord": "", "accountId": 0 };
      if (this.loginType == 1) {//账号密码登录
        this.$validator.validateAll();
        this.loginLoadding = true;
        loginParams.userName = this.loginData.account;
        loginParams.passWord = this.loginData.password;
      } else {
        loginParams.clientId = 4;
        loginParams.accountId = this.accountId;
        loginParams.qrCode = this.qrcodeFlag;
      }
      this.loginReal(loginParams,
        function (e) {
          util.localStorageSet(LOGINDATA, e.data);
          //保存token
          util.localStorageSet("token", e.data.token.token);
          that.$router.push({ path: '/menuFrame/houseList' });
        },
        function (message) {
          that.loginLoadding = false;
          that.$notify({
            title: '警告',
            message: message,
            type: 'warning',
            offset: 60
          });
        });


    },
    loginReal (params, successFunc, failFunc) {
      this.$api.post({
        url: '/loginManager/pcLogin',
        data: params,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false
      }).then((e) => {
        let result = e.data;
        console.log(result.message);
        if (result.code == 200) {
          console.log("登录成功");
          successFunc(result);
        } else {
          failFunc(result.message);
        }
      }).catch((e) => {
        console.log("【【【【uups,登录失败】】】】");
        console.log(e);
        failFunc('发送异常,登录失败');
      })
    },
    //重置二维码
    remakeQr () {
      this.qrcode();
      this.setTimeOutText(() => {
        this.timeOutText = 120;
      });
    },
    //倒计时
    setTimeOutText (afterFun) {
      //前置回掉
      if (afterFun)
        afterFun();
      //阻止重复定时器
      if (this.setIntervalId != null)
        clearInterval(this.setIntervalId);
      this.setIntervalId = setInterval(() => {
        if (this.timeOutText >= 0) {
          this.timeOutText--;
        } else {
          this.timeOutText = 0;
          clearInterval(this.setIntervalId);
        }
      }, 1000)
    },
    //生成二维码
    qrcode () {
      let that = this;
      this.$nextTick(() => {
        this.$api.post({
          url: '/loginManager/getQrCodeUrl',
          data: {
            p: "testParams"
          },
          qs: true,
          token: false,

        }).then((e) => {
          console.log(e.data);
          let result = e.data;
          console.log(result.message);
          if (result.code == 200) {
            that.qrcodeFlag = result.data.split("=")[1];
            if (this.qrData == null) {
              //// 和div的id相同 必须是id  class类名会报错
              //// 第二参数是他的配置项
              that.qrData = new QRCode('qrcode', {
                width: 200,
                height: 200,
                text: result.data,
                colorDark: '#000',
                colorLight: '#fff'
                //容错级别，可设置为：(低到高)
                //correctLevel： QRCode.CorrectLevel.L
                // QRCode.CorrectLevel.M
                // QRCode.CorrectLevel.Q
                // QRCode.CorrectLevel.H 
                //qrcode.clear();清除
              })
            } else {
              this.qrData.makeCode(result.data);
            }
          }
        }).catch((e) => {
          console.log("获取二维码url失败");
          console.log(e);
        })
        this.setTimeOutText(() => {
          this.timeOutText = 120;
        });
      })
    }
  },
}
</script>

