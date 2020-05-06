<style lang="less" scoped>
.page-content-heard {
  display: flex;
  .heard-message {
    width: 480px;
    .heard-message-title {
      font-size: 23px;
      color: black;
      font-weight: 600;
    }
    .heard-message-position {
      font-size: 15px;
      margin: 8px 0;
      .icon {
        font-size: 16px;
      }
    }
    .heard-scroll-tag {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 10px;
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-button,
      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-track-piece {
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        background: #c9c9c9;
        border-radius: 50px;
      }
      .tag-content {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        background: #11a760;
        position: relative;
        margin-right: 20px;
        &:hover {
          margin-right: 35px;
          .icon {
            display: block;
          }
        }
        span {
          color: #fff;
          line-height: 1;
          font-size: 15px;
          white-space: nowrap;
        }
        .icon {
          padding-left: 4px;
          display: none;
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translate(100%, -50%);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
  }
  .heard-item {
    display: flex;
    width: 210px;
    height: 70px;
    align-self: center;
    border-right: 1px solid #d5d5d5;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:nth-child(2) {
      border-left: 1px solid #d5d5d5;
      // margin-left: 25px;
    }
    &:last-child {
      border-right: none;
      flex: 1;
      cursor: pointer;
    }
    > .icon {
      font-size: 50px;
      color: #d2d2d2;
      margin-right: 25px;
      &.colorOrange {
        color: #f4ea29;
      }
      &.colorRed {
        color: #da1d07;
      }
    }
    > span {
      color: #b8b8b8;
      font-size: 23px;
      font-weight: 600;
    }
    .qr-content {
      display: flex;
      .qr-img {
        width: 65px;
        height: 65px;
        margin-right: 30px;
      }
      .qr-code-msg {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 15px;
        .qr-title {
          font-size: inherit;
          color: #8f8f8f;
        }
        .qr-NO {
          color: #686868;
        }
        .qr-tips {
          color: #e3726c;
        }
      }
    }
  }
}
.qrcode {
  margin-right: 10px;
  flex-shrink: 0;
}
</style>
<template>
  <section>
    <section class="page-content-heard">
      <!-- 房源信息 -->
      <section class="heard-message">
        <h3 class="heard-message-title overText">{{resultData.Title | emptyRead}}</h3>
        <div class="heard-message-position overText"><i class="el-icon-map-location icon"></i> {{resultData.areaName | emptyRead }}-{{resultData.CommunityName |emptyRead}}</div>
        <div class="heard-scroll-tag">
          <div class="tag-content"
               v-for="(item,index) in  impressionList "
               :key="index">
            <span>{{item.impression}}</span>
            <i class="el-icon-close icon"
               :class="{'isDisabled':buttonDisabled}"
               @click="deleteImpression(item.id,index)"></i>
          </div>
        </div>
      </section>
      <!-- 房源印象 -->
      <section class="heard-item"
               :class="{'isDisabled':buttonDisabled}"
               @click="nodePop">
        <i class="iconyinxiang iconfont icon"></i>
        <span>房源印象</span>
      </section>
      <!-- 写跟进 -->
      <section class="heard-item"
               :class="{'isDisabled':buttonDisabled}"
               @click="openPopUp('followUpFlag')">
        <i class="el-icon-edit icon"></i>
        <span>写跟进</span>
      </section>
      <!-- 已关注 -->
      <section class="heard-item"
               :class="{'isDisabled':buttonDisabled}"
               @click="changCollectHouse">
        <i class="iconfont icon colorOrange"
           :class="isCollect ? 'iconguanzhu' : 'iconguanzhu1'"></i>
        <span>{{isCollect? '已关注':'关注'}}</span>
      </section>
      <!-- 举报 -->
      <section class="heard-item"
               :class="{'isDisabled':buttonDisabled}"
               @click="openReport">
        <i class=" iconfont colorRed icon iconjubao"></i>
        <span>举报</span>
      </section>
      <!-- 二维码 -->
      <article class="heard-item">
        <div class="qr-content">
          <div id="qrcode"
               v-if="!buttonDisabled && shareQRCode"
               :class="{'qrcode':qrData}">{{qrData?'':'二维码加载失败'}}</div>
          <div class="qr-code-msg">
            <h3 class="qr-title">房源编号:</h3>
            <div class="qr-NO">{{resultData.HouseNo}}</div>
            <div class="qr-tips">{{resultData.shareQRCode ?'微信扫一扫,立即分享房源':'请先完善信息后，才可以扫码分享房源'}} </div>
          </div>
        </div>
      </article>
    </section>
    <!-- 写跟进 -->
    <followUp :visible.sync="followUpFlag"
              :insertFollow="insertFollow"
              v-if="followUpFlag"></followUp>
    <!-- 举报 -->
    <report :visible.sync="reportFlag"
            v-if="reportFlag"
            :insertFollow="insertReport"
            typeClass="error"
            title="!举报"></report>
    <attention :visible.sync="attentionFlag"
               v-if="attentionFlag"
               width="450px"
               titleDirection="center"
               title="关注房源变动通知"></attention>
  </section>
</template>
<script>
//写跟进弹出层
import followUp from "../didLog/followUp";
//举报弹出层
import report from "../didLog/report";
//关注弹出层
import attention from "../didLog/attention";
//二维码
import QRCode from "qrcodejs2";
//房源审核
import houseCheck from "../common/houseCheck";
import but from "@/evenBus/but.js";
export default {
  inject: ["houseDetails", "houseId", "buttonDisabled"],
  watch: {
    houseDetails: {
      deep: true,
      handler: function (newValue) {
        let _that = this;
        if (Object.keys(newValue).length > 0 && !this.isDisabled && this.shareQRCode) {
          this.qrData = new QRCode("qrcode", {
            width: 88,
            height: 88,
            text: newValue.data.shareQRCode,
            colorDark: "#000",
            colorLight: "#fff"
          });
        }
      }
    },
    shareQRCode: {
      deep: true,
      handler: function (value) {
        let _that = this;
        if (Object.keys(this.resultData).length > 0 && !this.isDisabled && value) {
          this.$nextTick(() => {
            this.qrData = new QRCode("qrcode", {
              width: 88,
              height: 88,
              text: _that.resultData.shareQRCode,
              colorDark: "#000",
              colorLight: "#fff"
            });
          })
        }
      }
    }
  },
  components: {
    followUp,
    report,
    attention
  },
  created () {
    this.getImpressionList();
    this.getisCollect();

  },
  mounted () {
    let that = this;
    but.$on("insertFollow", () => {
      that.insertFollow = true;
    });
    but.$on("insertReport", () => {
      that.insertReport = true;
    });
    but.$on("shareQRCode", (value) => {
      this.shareQRCode = value;
    });
  },
  computed: {
    isDisabled () {
      return this.buttonDisabled;
    },
    resultData () {
      if (Object.keys(this.houseDetails).length > 0) {
        return this.houseDetails.data;
      } else {
        return {};
      }
    }
  },
  data () {
    return {
      qrData: null,
      followUpFlag: false, //跟进开关
      reportFlag: false, //举报开关
      impressionList: [], //印象数组
      isCollect: false,
      attentionFlag: false, //关注开关
      insertFollow: false, //权限控制添加跟进按钮
      insertReport: false,//权限控制添加举报按钮
      shareQRCode: false,
    };
  },
  methods: {
    //
    deleteMyAttention () {
      let that = this;
      this.$api
        .post({
          url: "/myHouse/deleteMyAttention",
          data: {
            houseId: that.houseId.id
          },
          qs: true,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(e => { });
    },
    //关注或者取消关注
    changCollectHouse () {
      if (this.isDisabled) {
        return;
      }
      let that = this;
      let ajaxurl = "";
      let params = {
        houseId: that.houseId.id
      };
      if (that.isCollect) {
        ajaxurl = "/agent_house/concernHouseOFF/" + that.houseId.id;
      } else {
        ajaxurl = "/agentHouse/collect/collectHouse";
      }
      this.$api
        .post({
          url: ajaxurl,
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.isCollect = !that.isCollect;
            if (ajaxurl != "/agentHouse/collect/collectHouse") {
              that.deleteMyAttention();
            }
            // if (ajaxurl == "/agentHouse/collect/collectHouse") {
            //   this.attentionFlag = true;
            // }
          } else {
            that.$message(result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    //获取是否关注标记
    getisCollect () {
      let that = this;
      this.$api
        .get({
          url: "/agentHouse/collect/isCollectHouse",
          data: {
            houseId: that.houseId.id
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.isCollect = result.data;
          }
        })
        .catch(e => { });
    },
    //删除印象
    deleteImpression (impressionId, index) {
      if (this.isDisabled) {
        return;
      }
      let that = this;
      let params = {
        impressionId: impressionId
      };
      this.$api
        .post({
          url: "/agentHouse/impression/deleteImpression",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          that.$message(e.data.message);
          if (e.data.code == 200) {
            that.deleteMyAttention();
            that.impressionList.splice(index, 1);
          }
        });
    },
    //添加印象
    insertImpression (impression) {
      if (this.isDisabled) {
        return;
      }
      let that = this;
      let params = {
        houseId: this.houseId.id,
        impression: impression
      };
      this.$api
        .post({
          url: "/agentHouse/impression/insertImpression",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          that.$message(e.data.message);
          if (e.data.code == 200) {
            that.getImpressionList();
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    //获取印象数组
    getImpressionList () {
      let that = this;
      let params = {
        houseId: this.houseId.id
      };
      this.$api
        .get({
          url: "/agentHouse/impression/getImpressionList",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.impressionList = result.data;
          }
        });
    },
    //打开举报弹窗
    async openReport () {
      if (this.isDisabled) {
        return;
      }
      let isChecking = await houseCheck.isChecking(
        11,
        0,
        this.houseId.id,
        "该房源已被举报，当前正在审核中"
      );
      if (!isChecking) {
        this.reportFlag = true;
      }
    },
    openPopUp (PopName) {
      if (this.isDisabled) {
        return;
      }
      this[PopName] = true;
    },
    nodePop () {
      if (this.isDisabled) {
        return;
      }
      let that = this;
      this.$prompt(null, "房源印象显示在房源左上角,仅自己可见", {
        confirmButtonText: "添加",
        cancelButtonText: "取消",
        inputPlaceholder: "推荐5个字以内",
        lockScroll: false,
        inputValidator: e => {
          if (!e || e.length > 5) return "不能是空, 或者不能大于5个字";
          if (!e || /(.+)\1{2,}/.test(e)) {
            return "不能连续输入重复的字符";
          }
        },
        beforeClose (action, instance, done) {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            that.insertImpression(instance.inputValue);
            setTimeout(() => {
              done();
              instance.confirmButtonLoading = false;
            }, 500);
          } else {
            done();
          }
        }
      })
        .then(value => {
          console.log(action, instance, done);
        })
        .catch(() => { });
    }
  },
  destroyed () {
    but.$off("shareQRCode");
  }
};
</script>
