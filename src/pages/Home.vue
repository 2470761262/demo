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
        img {
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
            background-image: url(../../static/images/channel_current.png);
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
            <div :class="{'after-tips':errors.has('account')}"
                 :data-tips="errors.first('account')">
              <el-input v-model="loginData.account"
                        placeholder="请输入账号"
                        name="account"
                        v-validate="'required'"></el-input>
            </div>
            <div class="account-cell-title">密码:</div>
            <div :class="{'after-tips':errors.has('password')}"
                 :data-tips="errors.first('password')">
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
          <img :src="loginType == 0 ? '../static/images/loginZxj.png' :'../static/images/Web_login_03.png'"
               alt="切换">
        </div>
      </div>
    </div>
    <div class="page-cell-floot"></div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2';
export default {
  name: 'home',
  watch: {
    loginType: {
      immediate: true,
      handler: function (val, oldVal) {
        if (this.loginType == 1) {
          this.validateInit();
        } else if (this.loginType == 0) {
          // 和div的id相同 必须是id 
          if (this.qrData != null)
            this.qrcode();
        }
      }
    }
  },
  mounted () {
    this.qrcode();
  },
  //离开页面时清空定时器
  beforeRouteLeave (to, from, next) {
    if (this.setIntervalId != null)
      clearInterval(this.setIntervalId);
    next();
  },
  data () {
    return {
      loginType: 0, // 0 二维码 ，1 账号
      loginLoadding: false,
      timeOutText: 150,
      setIntervalId: null,//定时器ID 
      qrData: null,
      qrImgUrl: 'https://bkimg.cdn.bcebos.com/pic/2934349b033b5bb571dc8c5133d3d539b600bc12?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
      loginData: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
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
    },
    //登录验证
    loginValidate () {
      this.loginLoadding = true;
      this.$validator.validateAll().then(e => {
        if (e) {
          this.$router.push({ path: '/menuFrame' });
        }
        this.loginLoadding = false;
      });
    },
    //重置二维码
    remakeQr () {
      if (this.qrData == null) {
        this.qrcode();
      } else {
        this.qrData.makeCode('http://www.ba3536idu.com');
        this.setTimeOutText(() => {
          this.timeOutText = 150;
        });
      }
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
      // 和div的id相同 必须是id  class类名会报错
      // 第二参数是他的配置项
      this.$nextTick(() => {
        this.qrData = new QRCode('qrcode', {
          width: 200,
          height: 200,
          text: 'http://www.baidu.com',
          colorDark: '#000',
          colorLight: '#fff'
        })
        this.setTimeOutText(() => {
          this.timeOutText = 150;
        });
      })
    }
  },
}
</script>

