<style lang="less" scoped>
.content {
  // prettier-ignore
  padding: 0 16PX;
  position: relative;
  .content-top {
    display: flex;
    position: relative;
    z-index: 1;
    align-items: center;
    .content-head-left {
      flex: 1;
      .tips {
        // prettier-ignore
        font-size: 36PX;
        color: #fff;
        position: relative;
        z-index: 1;
        display: block;
        // prettier-ignore
        padding: 34PX 0 24PX 16PX;
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
            color: #ef5656;
            // prettier-ignore
            font-size: 46PX;
          }
        }
        .num-tips {
          color: #ef5656;
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
    display: flex;
    position: relative;
    z-index: 1;
    // prettier-ignore
    padding-bottom: 47PX;
    // prettier-ignore
    margin-top: 12PX;
    .content-left {
      .tips-wait {
        display: block;
        // prettier-ignore
        font-size: 36PX;
        line-height: 1;
        // prettier-ignore
        padding-top: 24PX;
        // prettier-ignore
        padding-bottom: 21PX;
      }
      flex: 1;
      // prettier-ignore
      margin-right: 16PX;
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
  .border-content-title {
    font-size: @font24;
    color: #303133;
    line-height: 1;
    font-weight: bold;
    // prettier-ignore
    padding-bottom: 24PX;
  }
}
.border-foot {
  display: flex;
  // prettier-ignore
  margin-top: 32PX;
  .border-foot-left {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .border-foot-left,
  .border-foot-right {
    // prettier-ignore
    width: 172PX;
    // prettier-ignore
    height: 172PX;
  }
  .border-foot-minddel {
    flex: 1;
    // prettier-ignore
    margin: 0 16PX;
    display: flex;
    // prettier-ignore
    padding-left: 24PX;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
  }
  .border-foot-minddel,
  .border-foot-right {
    border-radius: 4px;
    background: #f8f8f8;
  }
  .border-foot-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .num-tips {
      color: @backgroud;
      // prettier-ignore
      font-size: 16PX;
    }
    .num {
      font-size: 0;
      i,
      span {
        color: @backgroud;
        font-family: Arial-BoldMT, Arial;
        font-weight: bold;
        display: inline-block;
        // prettier-ignore
        font-size: 46PX;
      }
    }
    &.subtract {
      .num-tips {
        color: #ef5656;
      }
      .num {
        i,
        span {
          color: #ef5656;
        }
      }
    }
  }
}
.minddel-order {
  font-size: @font14;
  color: #606266;
  display: flex;
  align-items: center;
  // prettier-ignore
  margin-top: 24PX;
  &:first-child {
    margin-top: 0;
  }
  &::before {
    content: attr(data-order);
    // prettier-ignore
    width: 22PX;
    // prettier-ignore
    height: 22PX;
    border-radius: 50%;
    background: @backgroud;
    color: #fff;
    // prettier-ignore
    margin-right: 8PX;
    font-size: @font14;
    text-align: center;
    // prettier-ignore
    line-height: 22PX;
    flex-shrink: 0;
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
</style>
<template>
  <div class="content">
    <div class="tips-back"></div>
    <div class="content-top">
      <div class="content-head-left">
        <strong class="tips">
          信息员验真
          <span class="tips-text">待验真</span>
        </strong>
        <small class="small-tips"
          >若信息员开始进行验真操作（拨打业主电话）即扣除鑫币酬劳</small
        >
      </div>
      <div class="content-head-right">
        <div class="head-right-item">
          <div class="num">
            <i>-</i>
            <span>50</span>
          </div>
          <div class="num-tips">通过奖励鑫币</div>
        </div>
        <div class="head-right-item">
          <img src="https://img.0be.cn/minipro/bz9_3.svg" alt="" />
        </div>
      </div>
    </div>
    <section class="content-body">
      <div class="content-left">
        <!-- 温馨提示 -->
        <div class="border-content">
          <h3 class="border-content-title">温馨提示</h3>
          <div class="border-foot-minddel">
            <div class="minddel-order" data-order="1">
              信息员开始验真验真，无论验真是否通过，支付的鑫币不予退还。
            </div>
            <div class="minddel-order" data-order="2">
              信息员仅在工作时间内进行验真，所以导致验真的进度较慢，可能会导致验真过期，请您谨慎使用。
            </div>
          </div>
        </div>
        <strong class="tips-wait">等不及了？不如换下面两种方式验真</strong>
        <!-- 微信验真 -->
        <div class="border-content">
          <div class="head-content">
            <div class="iconfont iconbianzu"></div>
            <div class="head-minddle">
              <div class="head-minddle-title">微信验真</div>
              <div class="head-minddle-tips">
                使用经纪人小程序，房源验真功能，转发给业主进行验真
              </div>
            </div>
            <button class="btn" @click="openPage('wxValidate')">
              选我验真
            </button>
          </div>
          <div class="border-foot">
            <div class="border-foot-left">
              <img src="https://img.0be.cn/minipro/bz9.svg" alt="" />
            </div>
            <div class="border-foot-minddel">
              <div class="minddel-order" data-order="1">
                微信扫码,打开小程序-验真详情页
              </div>
              <div class="minddel-order" data-order="2">
                小程序详情页中，使用“邀请验真功能”转发业主
              </div>
              <div class="minddel-order" data-order="3">
                联系业主，提醒业主对房源进行验真，以便上架展示
              </div>
            </div>
            <div class="border-foot-right">
              <div class="num">
                <i>+</i>
                <span>50</span>
              </div>
              <div class="num-tips">通过奖励鑫币</div>
            </div>
          </div>
        </div>
        <!-- 短信验真 -->
        <div class="border-content">
          <div class="head-content">
            <div class="iconfont iconbianzu11"></div>
            <div class="head-minddle">
              <div class="head-minddle-title">短信验真</div>
              <div class="head-minddle-tips">
                电话联系业主获取短信验证码，输入验证码进行验真
              </div>
            </div>
            <button class="btn" @click="openPage('pMsgValidate')">
              选我验真
            </button>
          </div>
          <div class="foot-content">
            <div class="foot-content-item">
              <h3>经纪人输入验证码-验真</h3>
              <div class="foot-item-warp">
                <div class="minddel-order" data-order="1">
                  电话联系，业主；沟通验真事宜
                </div>
                <div class="minddel-order" data-order="2">
                  从业主处获取房源验真通过的验证码，输入验真
                </div>
              </div>
            </div>
            <div class="foot-content-item">
              <h3>业主回复验证码-验真</h3>
              <div class="foot-item-warp">
                <div class="minddel-order" data-order="1">
                  电话联系，业主；沟通验真事宜
                </div>
                <div class="minddel-order" data-order="2">
                  等待业主回复验证码，确认验真
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right" v-loading="detailLoading">
        <div class="pro-content">
          <div class="pro-img">
            <img
              src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2034740944,4251903193&fm=26&gp=0.jpg"
              alt=""
            />
          </div>
          <div class="pro-minddle">
            <div class="minddel-top">
              <div class="per-name">{{ detail.Customers }}</div>
              <div class="per-type">{{ detail.customerType }}</div>
            </div>
            <div class="minddel-foot">
              {{ detail.Tel }}
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
        <div class="down-content" v-if="isCheckSign == 1">
          <h3>验真倒计时</h3>
          <div class="down-box">
            <div class="down-box-item">{{ hoursTrans }}</div>
            <div class="down-box-split">:</div>
            <div class="down-box-item">{{ minutesTrans }}</div>
            <div class="down-box-split">:</div>
            <div class="down-box-item">{{ secondsTrans }}</div>
          </div>
        </div>
        <div class="validate-type success" v-if="isCheckSign == 2">
          <div class="validate-type-title">
            验真成功
          </div>
          <div class="validate-type-tips">业主选择房源状态为 - 确认出售</div>
        </div>
        <div class="validate-type error" v-if="isCheckSign == 3">
          <div class="validate-type-title">
            验真失败
          </div>
          <div class="validate-type-tips">
            业主选择房源状态为 - {{ detail.failedResonStr }}
          </div>
        </div>
        <div class="house-content">
          <h3 class="house-title">{{ detail.CommunityName | emptyRead }}</h3>
          <h4 class="buing-title">
            {{ detail.BuildingName | emptyRead("栋") }}-{{ detail.RoomNo }}
          </h4>
          <div class="split-line"></div>
          <ul class="deteil-content">
            <li>
              <span>售价</span>
              <span>{{ detail.Price | emptyRead("万") }}</span>
            </li>
            <li>
              <span>单价</span>
              <span>{{ detail.averagePrice | emptyRead("元/㎡") }}</span>
            </li>
            <li>
              <span>面积</span>
              <span>{{ detail.InArea | emptyRead("㎡") }}</span>
            </li>
            <li>
              <span>户型</span>
              <span>{{ detail.houseType | emptyRead }}</span>
            </li>
            <li>
              <span>装修</span>
              <span>{{ detail.Decoration | emptyRead }}</span>
            </li>
            <li>
              <span>朝向</span>
              <span>{{ detail.Face | emptyRead }}</span>
            </li>
            <li>
              <span>电梯</span>
              <span>{{
                detail.Elevator | mapFilter("ISELEVATOR") | emptyRead
              }}</span>
            </li>
            <li>
              <span>类型</span>
              <span>{{ detail.buildtype | emptyRead }}</span>
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
function phoneTransform(phone) {
  if (!phone) return phone;
  if (!phone.includes("*") && phone.length == 11) {
    return `${phone.substr(0, 3)}****${phone.substr(7)}`;
  }
  return phone;
}
export default {
  filters: {
    mapFilter(value, ListName, resultValue = null) {
      return util.countMapFilter(value, ListName, resultValue);
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getEmployee();
    this.getDetail();
  },
  data() {
    return {
      id: null,
      detail: {},
      detailLoading: true,
      hoursTrans: "00",
      minutesTrans: "00",
      secondsTrans: "00",
      isCheckSign: -1,
      isCallLoading: false,
      timeID: null
    };
  },
  methods: {
    openPage(pageName) {
      this.$router.push({
        name: pageName,
        query: {
          id: this.id
        }
      });
    },
    getEmployee() {
      return this.$api
        .post({
          url: `/verifyHouse/mode/employee`,
          qs: true,
          data: {
            id: this.id
          }
        })
        .then(({ data }) => {
          console.log(data, "data");
        })
        .finally(() => {});
    },
    getDetail() {
      return this.$api
        .post({
          url: `/validate/agent_house/getHouseDetail/${this.id}`
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.detail = data.data;
            if (this.detail.Tel) {
              this.detail.Tel = phoneTransform(this.detail.Tel);
            }

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
      if (this.detail.checkSign != 1) {
        clearTimeout(this.timeID);
        if (this.detail.checkSign == 2) {
          this.isCheckSign = 2;
        }
        if (this.detail.checkSign == 3 || this.detail.checkSign == 4) {
          this.isCheckSign = 3;
        }
        return;
      }

      let time = endTime - nowTime;
      if (time <= 0) {
        this.isCheckSign = 3;
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
      this.dailPhone(1, p);
    },
    /**
     * @example: 一键拨号
     */
    oneTouchDialPhone() {
      let phone = this.detail.agentPerTel;
      if (!phone) {
        this.$message({
          message: "该经纪人号码为空"
        });
        return;
      }
      let p = {
        contactPhone: phone
      };
      this.dailPhone(1, p);
    },
    dailPhone(contactPerType, phoneObj) {
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
            houseId: this.id,
            houseType: 0,
            housePrice: this.detail.Price,
            houseArea: this.detail.InArea,
            contactPerType: contactPerType, //电话联系人类型，0为经纪人，1为业主
            remark: this.detail.Title
          };
          let dailParams = {};
          Object.assign(dailParams, oldParams, phoneObj);
          if (contactPerType == 0) {
            //联系人类型如果是经纪人，才需要联系人id
            dailParams.contactPerId = this.detail.AgentPer; //联系人id
            dailParams.unitName = this.detail.agentPerDepartmentName;
            dailParams.contactPerName = this.detail.agentPerName;
          } else {
            dailParams.unitName = this.detail.CommunityName; //联系人是业主，名称取小区名
            dailParams.contactPerName = this.detail.Customers;
          }
          this.$api
            .post({
              url: "/noticeManage/common/OneTouchDialPhone",
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
