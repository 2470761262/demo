<style lang="less" scoped>
.content {
  position: relative;
  .content-top {
    // prettier-ignore
    padding: 0 16PX;
    display: flex;
    position: relative;
    z-index: 1;
    align-items: center;
    .content-head-left {
      flex: 1;
      // prettier-ignore
      padding-left: 30PX;
      .tips {
        // prettier-ignore
        font-size: 36PX;
        color: #fff;
        position: relative;
        z-index: 1;
        display: block;
        // prettier-ignore
        padding: 16PX 0 24PX 16PX;
        font-weight: bold;
        // prettier-ignore
        line-height: 36PX;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        display: flex;
        align-items: center;
        .tips-text {
          // prettier-ignore
          padding: 0 19PX;
          // prettier-ignore
          height: 26PX;
          font-size: @font14;
          background: #fef5e8;
          color: #f6a420;
          // prettier-ignore
          line-height: 26PX;
          border-radius: 2px;
          // prettier-ignore
          margin-left: 8PX;
          // prettier-ignore
          margin-top: 4PX;
        }
      }
      .small-tips {
        position: relative;
        z-index: 1;
        color: #fff;
        // prettier-ignore
        padding-left: 16PX;
        // prettier-ignore
        font-size: 18PX;
        opacity: 0.76;
        line-height: 1;
      }
    }
    .content-head-right {
      // prettier-ignore
      margin-top: 16PX;
      display: flex;
      img {
        // prettier-ignore
        width: 172PX;
        height: 100%;
      }
      .head-right-item {
        &:last-child {
          margin-right: 0;
        }
        // prettier-ignore
        margin-right: 16PX;
        // prettier-ignore
        width: 172PX;
        background: #ffffff;
        border-radius: 4px;
        // prettier-ignore
        height: 111PX;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .num {
          font-size: 0;
          i,
          span {
            font-weight: bold;
            font-family: Arial-BoldMT, Arial;
            display: inline-block;
            color: @backgroud;
            // prettier-ignore
            font-size: 46PX;
          }
        }
        .num-tips {
          color: @backgroud;
          font-size: @font16;
        }
      }
    }
  }
  .tips-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
    // prettier-ignore
    height: 223PX;
    background: linear-gradient(360deg, #2f837b 0%, #0a6458 100%);
  }
  .content-body {
    // prettier-ignore
    padding: 0 16PX;
    display: flex;
    position: relative;
    z-index: 1;
    // prettier-ignore
    padding-bottom: 47PX;
    // prettier-ignore
    margin-top: 12PX;
    .content-left {
      flex: 1;
      // prettier-ignore
      margin-right: 16PX;
      display: flex;
      flex-direction: column;
      .head-content {
        display: flex;
        align-items: center;
        color: #303133;
        line-height: 1;
        .iconfont {
          // prettier-ignore
          font-size: 48PX;
        }
        .head-minddle {
          // prettier-ignore
          margin-left: 16PX;
          flex: 1;
          .head-minddle-title {
            // prettier-ignore
            font-size: 24PX;
            font-weight: bold;
          }
          .head-minddle-tips {
            // prettier-ignore
            font-size: 16PX;
            color: #606266;
            // prettier-ignore
            margin-top: 8PX;
          }
        }
      }
    }
    .content-right {
      // prettier-ignore
      width: 375PX;
    }
  }
}
.btn {
  background: @backgroud;
  color: #fff;
  border: none;
  outline: none;
  // prettier-ignore
  min-width: 90PX;
  // prettier-ignore
  height: 36PX;
  border-radius: 4px;
  font-size: @font14;
  cursor: pointer;
}
.border-content {
  background: #fff;
  // prettier-ignore
  padding: 24PX;
  // prettier-ignore
  border-radius: 8PX;
  position: relative;
  // prettier-ignore
  margin-top: 16PX;
  &:first-child {
    margin-top: 0;
  }
  .border-title {
    display: flex;
    align-items: center;
    color: #606266;
    &::before {
      content: attr(data-order);
      // prettier-ignore
      width: 22PX;
      // prettier-ignore
      height: 22PX;
      background: @backgroud;
      text-align: center;
      // prettier-ignore
      line-height: 22PX;
      color: #fff;
      border-radius: 50%;
      // prettier-ignore
      margin-right: 8PX;
    }
  }
  .qr-img-content {
    display: flex;
    justify-content: center;
    align-items: center;
    // prettier-ignore
    padding-top: 61PX;
    // prettier-ignore
    padding-bottom: 67PX;
    .wx-qr {
      // prettier-ignore
      width: 172PX;
      // prettier-ignore
      height: 172PX;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .middle-tips {
      &.is-bottom {
        // prettier-ignore
        margin: 0 14PX 0 12PX ;
        .arrows-right {
          // prettier-ignore
          width: 117PX;
        }
      }
      // prettier-ignore
      margin: 0 34PX 0 33PX;
      text-align: center;
      span {
        font-size: @font16;
        color: #303133;
      }
      div {
        // prettier-ignore
        width: 185PX;
        // prettier-ignore
        height: 2PX;
        background: #979797;
        // prettier-ignore
        margin-top: 12PX;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          // prettier-ignore
          right: -14PX;
          top: 50%;
          // prettier-ignore
          margin-top: -7PX;
          display: block;
          width: 0;
          height: 0;
          border: 7px solid transparent;
          // prettier-ignore
          border-left-width: 14PX;
          border-left-color: #979797;
        }
      }
    }
    .screenshots {
      // prettier-ignore
      width: 170PX;
      // prettier-ignore
      height: 302PX;
    }
  }
}

.foot-content {
  display: flex;
  // prettier-ignore
  margin: 36PX -15PX 0;
  .foot-content-item {
    flex: 1;
    // prettier-ignore
    margin: 0 15PX;
    h3 {
      font-weight: bold;
      color: #303133;
      // prettier-ignore
      font-size: 18PX;
    }
    .foot-item-warp {
      // prettier-ignore
      margin-top: 13PX;
      background: #f8f8f8;
      // prettier-ignore
      height: 128PX;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      // prettier-ignore
      padding-left: 24PX;
    }
  }
}
.pro-content {
  display: flex;
  background: #fff;
  // prettier-ignore
  padding: 24PX 16PX;
  // prettier-ignore
  border-radius: 8PX;
  align-items: center;
  .pro-img {
    // prettier-ignore
    width: 64PX;
    // prettier-ignore
    height: 64PX;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .pro-minddle {
    flex: 1;
    // prettier-ignore
    margin: 0 12PX;
    .minddel-top {
      font-size: 0;
      line-height: 1;
      .per-name,
      .per-type {
        display: inline-block;
      }
      .per-name {
        color: #303133;
        font-size: @font24;
        font-weight: bold;
      }
      .per-type {
        font-size: @font14;
        color: #606266;
        // prettier-ignore
        margin-left: 8PX;
      }
    }
    .minddel-foot {
      // prettier-ignore
      margin-top: 8PX;
      font-size: @font24;
    }
  }
}
.down-content {
  // prettier-ignore
  height: 136PX;
  background: #fff5ea;
  border-radius: 4px;
  // prettier-ignore
  margin-top: 16PX;
  // prettier-ignore
  padding: 0 40PX;
  h3 {
    font-size: @font16;
    color: #ff9b33;
    line-height: 1;
    // prettier-ignore
    padding-top: 16PX;
  }
  .down-box {
    // prettier-ignore
    margin-top: 16PX;
    display: flex;
    justify-content: space-between;
    .down-box-split {
      // prettier-ignore
      font-size: 36PX;
      color: #ff9b33;
      font-weight: 600;
    }
    .down-box-item {
      background: #ff9b33;
      // prettier-ignore
      width: 56PX;
      // prettier-ignore
      height: 66PX;
      border-radius: 3px;
      // prettier-ignore
      font-size: 36PX;
      font-family: ArialMT;
      color: #ffffff;
      // prettier-ignore
      line-height: 66PX;
      text-align: center;
    }
  }
}
.validate-type {
  // prettier-ignore
  height: 97PX;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // prettier-ignore
  margin-top: 16PX;
  &.success {
    background: #e6f6f3; //@opacityBackground;
    .validate-type-title {
      color: #0da88b; //@backgroud;
    }
    .validate-type-tips {
      color: #0da88b; // @backgroud;
    }
  }
  &.error {
    background: #fdeeee; //@opacityBackground;
    .validate-type-title {
      color: #ef5656; //@backgroud;
    }
    .validate-type-tips {
      color: #ef5656; // @backgroud;
    }
  }
  .validate-type-title {
    font-size: @font24;
    font-weight: bold;
    line-height: 1;
  }
  .validate-type-tips {
    font-size: @font14;
    // prettier-ignore
    line-height: 19PX;
    // prettier-ignore
    margin-top: 9PX;
  }
}
.house-content {
  // prettier-ignore
  margin-top: 16PX;
  background: #fff;
  // prettier-ignore
  padding: 24PX 24PX 25PX 16PX;
  border-radius: 4px;
  .house-title {
    font-size: @font24;
    color: #303133;
    font-weight: bold;
    line-height: 1;
    // prettier-ignore
    margin-bottom: 8PX;
  }
  .buing-title {
    font-size: @font24;
    color: #303133;
    line-height: 1;
    font-weight: normal;
  }
  .split-line {
    height: 1px;
    background: #f0f2f5;
    // prettier-ignore
    margin: 24PX 0;
  }
  .deteil-content {
    li {
      display: flex;
      justify-content: space-between;
      // prettier-ignore
      margin-bottom: 16PX;
      font-size: @font14;
      color: black;
      :nth-child(1) {
        color: #909399;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
.nav-validate {
  position: relative;
  z-index: 10;
  display: flex;
  // prettier-ignore
  height: 50PX;
  // prettier-ignore
  line-height: 50PX;
  // prettier-ignore
  padding-left: 40PX;
  border-bottom: 1px solid #fff;
  justify-content: space-between;
  .nav-content {
    display: flex;
    .nav-validate-item {
      position: relative;
      font-size: @font18;
      color: #fff;
      // prettier-ignore
      margin-right: 70PX;
      position: relative;
      cursor: pointer;
      &.active {
        &::before {
          content: "";
          // prettier-ignore
          height: 4PX;
          // prettier-ignore
          width: 56PX;
          position: absolute;
          // prettier-ignore
          bottom: 5PX;
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          border-radius: 3px;
        }
      }
      &:first-child {
        // prettier-ignore
        margin-right: 125PX;
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 50%;
          right: 0px;
          transform: translate(100%, -50%);
          background-image: url(https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/9/14/091e912255c64924ac40f32f59510990.png);
          background-size: 100% 100%;
          // prettier-ignore
          width: 50PX;
          // prettier-ignore
          height: 24PX;
          animation: loopImg 1s infinite alternate;
        }
        @keyframes loopImg {
          0% {
            right: 0;
          }
          100% {
            // prettier-ignore
            right: -6PX;
          }
        }
      }
    }
  }
  .nav-tips {
    // prettier-ignore
    margin-right: 16PX;
    align-self: center;
    // prettier-ignore
    line-height: 38PX;
    // prettier-ignore
    padding: 0 31PX;
    // prettier-ignore
    height: 38PX;
    background: #00473e;
    color: #1dcebd;
    font-size: @font18;
  }
}
.top-image {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
<template>
  <div class="content">
    <div class="tips-back"></div>
    <div class="nav-validate">
      <div class="nav-content">
        <div
          class="nav-validate-item"
          v-for="(item, index) in navValidate"
          :key="item.title"
          :class="{ active: index == 0 }"
          @click="goValidatePage(item.url)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="nav-tips">
        温馨提示：选中一个验真方案，也可以切换选择其他两种验真方式
      </div>
    </div>
    <div class="content-top">
      <img
        class="top-image"
        src="https://img.0be.cn/minipro/recomand.svg"
        alt=""
      />
      <div class="content-head-left">
        <strong class="tips">
          微信验真
          <span class="tips-text">待验真</span>
        </strong>
        <small class="small-tips"
          >请尽快，按照下房方的操作提示，将房源转发给业主进行验真</small
        >
      </div>
      <div class="content-head-right">
        <div class="head-right-item">
          <div class="num">
            <span v-if="configXin[0]">+{{ configXin[0].score }}</span>
          </div>
          <div class="num-tips">通过奖励鑫币</div>
        </div>
        <div class="head-right-item">
          <img src="https://img.0be.cn/minipro/bz9_4.svg" alt="" />
        </div>
      </div>
    </div>
    <section class="content-body">
      <div class="content-left">
        <!-- 请输入6位验证码，进行验真 -->
        <div class="border-content">
          <div class="border-title" data-order="1">
            打开微信，扫描下方二维码，打开验真房源详情页
          </div>
          <div class="qr-img-content">
            <div
              class="wx-qr"
              v-loading="wxImg.loading"
              element-loading-text="二维码加载中..."
            >
              <img :src="wxImg.url" alt="微信小程序二维码" />
            </div>
            <div class="middle-tips">
              <span>查看验真房源详情页</span>
              <div class="arrows-right"></div>
            </div>
            <img
              class="screenshots"
              src="https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/9/11/889f1b9c9c904933af4bbeed1a4ae519.png"
              alt=""
            />
          </div>
        </div>
        <!-- 请输入6位验证码，进行验真 -->
        <div class="border-content">
          <div class="border-title" data-order="2">
            在验真房源详情页中，点击“邀请验真”，转发给业主进行验真
          </div>
          <div class="qr-img-content">
            <img
              class="screenshots"
              src="https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/9/11/889f1b9c9c904933af4bbeed1a4ae519.png"
              alt=""
            />
            <div class="middle-tips is-bottom">
              <span>点击“邀请验真”</span>
              <div class="arrows-right"></div>
            </div>
            <img
              class="screenshots"
              src="https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/9/11/4132dd7a539b47fa96beec7072a42116.png"
              alt=""
            />
            <div class="middle-tips is-bottom">
              <span>选择业主转发</span>
              <div class="arrows-right"></div>
            </div>
            <img
              class="screenshots"
              src="https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/9/11/f5470178230a484bb53a9d8c4a92451a.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="content-right" v-loading="detailLoading">
        <div class="pro-content">
          <div class="pro-minddle">
            <div class="minddel-top">
              <div class="per-name">{{ detail.customerName }}</div>
              <div class="per-type">{{ detail.customerType }}</div>
            </div>
            <div class="minddel-foot">
              {{ detail.tel }}
            </div>
          </div>
          <button
            class="btn"
            @click="oneTouchDialPhone"
            v-loading="isCallLoading"
          >
            一键拨号
          </button>
        </div>
        <div class="down-content" v-if="checkStatus == 1">
          <h3>验真倒计时</h3>
          <div class="down-box">
            <div class="down-box-item">{{ hoursTrans }}</div>
            <div class="down-box-split">:</div>
            <div class="down-box-item">{{ minutesTrans }}</div>
            <div class="down-box-split">:</div>
            <div class="down-box-item">{{ secondsTrans }}</div>
          </div>
        </div>
        <div class="validate-type success" v-if="checkStatus == 2">
          <div class="validate-type-title">
            验真成功
          </div>
          <div class="validate-type-tips">业主选择房源状态为 - 确认出售</div>
        </div>
        <div class="validate-type error" v-if="checkStatus == 3">
          <div class="validate-type-title">
            验真失败
          </div>
          <div class="validate-type-tips">
            业主选择房源状态为 -
            {{
              detail.failedReson == 1
                ? "暂不考虑"
                : detail.failedReson == 2
                ? "已经出售"
                : ""
            }}
          </div>
        </div>
        <div class="house-content">
          <h3 class="house-title">{{ detail.communityName | emptyRead }}</h3>
          <h4 class="buing-title">
            {{ detail.buildingNo | emptyRead("栋") }}-{{ detail.roomNo }}
          </h4>
          <div class="split-line"></div>
          <ul class="deteil-content">
            <li>
              <span>售价</span>
              <span>{{ detail.price | emptyRead("万") }}</span>
            </li>
            <li>
              <span>单价</span>
              <span>{{ detail.unitPrice | emptyRead("元/㎡") }}</span>
            </li>
            <li>
              <span>面积</span>
              <span>{{ detail.area | emptyRead("㎡") }}</span>
            </li>
            <li>
              <span>户型</span>
              <span>{{ detail.roomType | emptyRead }}</span>
            </li>
            <li>
              <span>装修</span>
              <span>{{ detail.decoration | emptyRead }}</span>
            </li>
            <li>
              <span>朝向</span>
              <span>{{ detail.orientation | emptyRead }}</span>
            </li>
            <li>
              <span>电梯</span>
              <span>{{
                detail.elevator | mapFilter("ISELEVATOR") | emptyRead
              }}</span>
            </li>
            <li>
              <span>类型</span>
              <span>{{ detail.buildType | emptyRead }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/**
 * @example: 转化电话号码
 */
import util from "@/util/util";

const NAVVALIDATE = [
  { title: "微信验真", url: "wxValidate" },
  { title: "短信验真", url: "pMsgValidate" },
  { title: "信息员验真", url: "messageValidate" }
];
export default {
  filters: {
    mapFilter(value, ListName, resultValue = null) {
      return util.countMapFilter(value, ListName, resultValue);
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getWXImg();
    this.getXinConfig();
    this.getDetail();
  },
  data() {
    return {
      navValidate: NAVVALIDATE,
      id: null,
      wxImg: {
        url: "",
        loading: true
      },
      detail: {},
      detailLoading: true,
      hoursTrans: "00",
      minutesTrans: "00",
      secondsTrans: "00",
      checkStatus: -1,
      isCallLoading: false,
      timeID: null,
      configXin: []
    };
  },
  methods: {
    goValidatePage(pathName) {
      this.$router.replace({
        name: pathName,
        query: {
          id: this.id
        }
      });
    },
    getXinConfig() {
      this.$api
        .get({
          url: `/validate/agent_house/xin/config`
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.configXin = data.data;
          }
        });
    },
    getWXImg() {
      return this.$api
        .post({
          url: `/verifyHouse/mode/wechat?id=${this.id}`
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.wxImg.url = data.data;
          }
        })
        .finally(() => {
          this.wxImg.loading = false;
        });
    },
    getDetail() {
      return this.$api
        .get({
          url: `/validate/agent_house/getHouseModeDetail/${this.id}`
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.detail = data.data;
            this.getTime();
            console.log(this.detail, "this.detail");
            //expireTime
          }
        })
        .finally(() => {
          this.detailLoading = false;
        });
    },
    getTime() {
      let endTime = new Date(this.detail.expireTime);
      let nowTime = new Date();
      if (this.detail.checkStatus != 1) {
        clearTimeout(this.timeID);
        if (this.detail.checkStatus == 2) {
          this.checkStatus = 2;
        }
        if (this.detail.checkStatus == 3 || this.detail.checkStatus == 4) {
          this.checkStatus = 3;
        }
        return;
      } else {
        this.checkStatus = 1;
      }

      let time = endTime - nowTime;
      if (time <= 0) {
        this.checkStatus = 3;
        //结束了
      } else {
        let days = Math.floor(time / 1000 / 60 / 60 / 24);
        let hours = Math.floor(time / 1000 / 60 / 60 - days * 24);
        let minutes = Math.floor(
          time / 1000 / 60 - (days * 24 * 60 + hours * 60)
        );
        let second = Math.floor(
          time / 1000 - (days * 24 * 60 * 60 + hours * 60 * 60) - minutes * 60
        );
        if (String(days).length == 1) {
          days = "0" + days;
        }
        if (String(hours).length == 1) {
          hours = "0" + hours;
        }
        if (String(minutes).length == 1) {
          minutes = "0" + minutes;
        }
        if (String(second).length == 1) {
          second = "0" + second;
        }
        //Array.prototype.splice.call();
        //this.daysTransAfter = Array.from(String(days))[0];
        //this.daysTransBefore = Array.from(String(days))[1];
        this.hoursTrans = `${Array.from(String(hours))[0]}${
          Array.from(String(hours))[1]
        }`;
        this.minutesTrans = `${Array.from(String(minutes))[0]}${
          Array.from(String(minutes))[1]
        }`;
        this.secondsTrans = `${Array.from(String(second))[0]}${
          Array.from(String(second))[1]
        }`;
        this.timeID = setTimeout(this.getTime, 1000);
      }
    },
    contactOwer(cmd) {
      let p = {};
      p["contactPhone" + cmd] = this.detail["Tel" + cmd];
      p["isLookPhone"] = true;
      this.dailPhone();
    },
    /**
     * @example: 一键拨号
     */
    oneTouchDialPhone() {
      this.dailPhone();
    },
    dailPhone() {
      let that = this;
      this.isCallLoading = true;
      //console.log(that.houseDetails);
      this.$confirm("确定一键拨号吗？", "友情提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showConfirmButton: true
      })
        .then(() => {
          let oldParams = {
            draftId: this.id,
            houseType: 0,
            housePrice: this.detail.price,
            houseArea: this.detail.area,
            contactPerType: 1 //电话联系人类型，0为经纪人，1为业主
          };
          let dailParams = {};
          Object.assign(dailParams, oldParams);
          dailParams.unitName = this.detail.communityName; //联系人是业主，名称取小区名
          dailParams.contactPerName = this.detail.customerName;
          this.$api
            .post({
              url: "/noticeManage/common/DraftOneTouchDialPhone",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: dailParams
            })
            .then(e => {
              let result = e.data;
              if (result.code == 200) {
                this.$message({
                  type: "info",
                  message: "请注意查收微信消息"
                });
                this.$emit("update:visible", false);
              } else {
                this.$message({
                  type: "info",
                  message: result.message
                });
              }
            })
            .catch(e => {
              console.log("【【【【uups,一键拨号失败】】】】");
              console.log(e);
              this.$message({
                type: "info",
                message: "一键拨号失败"
              });
            })
            .finally(() => {
              this.isCallLoading = false;
            });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: "取消拨号"
          });
        })
        .finally(() => {
          this.isCallLoading = false;
        });
    }
  },
  destroyed() {
    clearTimeout(this.timeID);
  }
};
</script>
