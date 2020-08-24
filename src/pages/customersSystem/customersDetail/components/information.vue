<template>
  <div class="infor-box">
    <div class="infor-row">
      <span class="infor-name">{{ customer.data.Customers }}</span>
      <span class="infor-sex">{{ customer.data.sex === 0 ? "男" : "女" }}</span>
    </div>
    <div class="infor-row flex">
      <div class="infor-phone">{{ phoneData.phone || "暂无号码" }}</div>
      <div class="infor-bottom">
        <el-popover
          placement="bottom"
          trigger="click"
          class="infor-check"
          v-if="
            permissionList.customerDetailForTelephone.isDisable &&
              attentionStatus.flag == 1
          "
        >
          <div>
            <p v-for="(item, idx) in phoneList" :key="idx">
              {{ item.phone || "" }}
            </p>
          </div>
          <el-button slot="reference" @click="getPhone">查看号码</el-button>
        </el-popover>
        <el-popover
          placement="bottom"
          trigger="click"
          class="infor-dial"
          v-model="isPhone"
          v-if="
            permissionList.dialButtonEnable.isDisable &&
              attentionStatus.flag == 1
          "
        >
          <!-- <div class="phone-list">
            <div
              v-for="(item, idx) in phoneList"
              :key="idx"
              @click="callUp(item.id)"
            >
              {{ item.phone || "" }}
            </div>
          </div> -->
          <el-button slot="reference" @click="callUp" :loading="callLoading">
            <span>一键拨号</span>
          </el-button>
        </el-popover>
      </div>
    </div>
    <div class="infor-row">
      <div
        class="infor-tag"
        v-for="(item, index) in impressionData"
        :key="index"
      >
        <span>{{ item.impression }}</span>
        <i
          data-anchor="客源详情印象删除 => click"
          class="el-icon-close"
          v-if="
            permissionList.customerDetailForDeleteImpression.isDisable &&
              attentionStatus.flag == 1
          "
          @click="deleteImpression(item.id, index)"
        ></i>
      </div>
    </div>
    <el-divider></el-divider>
    <section class="message-row flex">
      <div class="message-title">客户需求：</div>
      <div class="message-txt">
        <!-- <span v-for="item in demand.data" :key="item.index">{{ item }}</span> -->
        <span>{{ demand.data | formatDemand }}</span>
      </div>
    </section>
    <section class="message-row flex">
      <div class="message-title">委托来源：</div>
      <div class="message-txt">
        {{ customer.data.sourceType | formatSourceType }} /
        {{ customer.data.Source | formatSource }}
      </div>
    </section>
    <section class="message-row flex">
      <div class="message-title">购房意向：</div>
      <div class="message-txt">
        {{ resultData.desireIntensity | intentionName }}
      </div>
    </section>
    <section class="message-row flex">
      <div class="message-title">客户籍贯：</div>
      <div class="message-txt">{{ customer.data.nativePlace || noData }}</div>
    </section>
    <section class="message-row flex">
      <div class="message-title">拥有人数：</div>
      <div class="message-txt">{{ customer.haveAgents == -1 ? '加载中..' : customer.haveAgents+'人' }}</div>
    </section>
    <section class="message-row flex">
      <div class="message-title">公司看房套数：</div>
      <div class="message-txt">{{ customer.lookHouses == -1 ? '加载中..' : customer.lookHouses+'套' }}</div>
    </section>
    <section class="message-row flex">
      <div class="message-title">我的带看套数：</div>
      <div class="message-txt">{{ customer.myLookHouses == -1 ? '加载中..' : customer.myLookHouses+'套'}}</div>
    </section>
    <section class="message-row flex">
      <div class="message-title">上次带看时间：</div>
      <div class="message-txt">
        {{ resultData.lastPairFollowTime | formatTime }}
      </div>
    </section>
    <section class="message-row flex">
      <div class="message-title">委托时间：</div>
      <div class="message-txt">{{ customer.data.AddTime | formatTime }}</div>
    </section>
  </div>
</template>

<script>
export default {
  inject: [
    "demand",
    "customer",
    "customerDeal",
    "impressionList",
    "telList",
    "permissionList",
    "attentionStatus"
  ],
  data() {
    return {
      noData: "暂无",
      phoneList: [],
      isPhone: false,
      isCall: true,
      callLoading: false
    };
  },
  created() {},
  computed: {
    resultData() {
      if (Object.keys(this.customerDeal).length > 0) {
        return this.customerDeal.data;
      } else {
        return {};
      }
    },
    impressionData() {
      if (Object.keys(this.impressionList).length > 0) {
        return this.impressionList.data;
      } else {
        return {};
      }
    },
    phoneData() {
      if (Object.keys(this.telList).length != 0) {
        if (this.telList.data[0]) {
          return this.telList.data[0];
        } else {
          return "";
        }
      } else {
        return "";
      }
    }
  },
  filters: {
    intentionName(value) {
      switch (value) {
        case 0:
          return "无意向";
        case 1:
          return "较弱";
        case 2:
          return "一般";
        case 3:
          return "强烈";
        default:
          return "暂无";
      }
    },
    formatTime(value) {
      if (value) {
        let time = value.split(" ");
        return time[0];
      } else {
        return "暂无";
      }
    },
    formatSource(value) {
      switch (value) {
        case 11:
          return "老客户";
        case 12:
          return "转介绍";
        case 13:
          return "亲戚朋友";
        case 14:
          return "同学";
        case 21:
          return "业主资料";
        case 22:
          return "重复购买";
        case 31:
          return "58同城";
        case 32:
          return "安居客";
        case 33:
          return "朋友圈";
        case 34:
          return "其他网络";
        case 41:
          return "公众号";
        case 42:
          return "小程序";
        case 43:
          return "APP";
        default:
          return "暂无";
      }
    },
    formatSourceType(value) {
      switch (value) {
        case 1:
          return "人际开发";
        case 2:
          return "二次开发";
        case 3:
          return "网络端口";
        case 4:
          return "鑫家网";
        default:
          return "暂无";
      }
    },
    formatDemand(value) {
      if(value){
          if (value.length > 1) {
            return value.join("、");
          } else {
            return value[0];
          }
      }else{
          return "暂无";
      }
    }
  },
  methods: {
    /**
     * @example: 获取号码
     */
    getPhone() {
      let that = this;
      this.$api
        .post({
          url: "/saleCustomer/getTelPhoneForPrivate",
          data: { customerId: this.customer.data.id },
          qs: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.phoneList = e.data.data;
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message({
              type: "xinjia-info",
              message: e.response.data.message
            });
          }
        });
    },
    /**
     * @example: 一键拨号
     */
    callUp() {
      let that = this;
      that.isPhone = false;
      if (this.isCall) {
        let postData = {
          customerId: this.customer.data.id,
          remark: "给客户" + this.customer.data.Customers + "拨打电话",
          customerName: this.customer.data.Customers,
          customerNo: this.customer.data.CustomerNo,
          customerPlate: this.customer.data.plate
        };
        that.callLoading = true;
        that.isCall = false;
        that.$api
          .post({
            url: "/saleCustomer/dialPhoneToCustomer",
            data: postData,
            qs: true
          })
          .then(e => {
            if (e.data.code == 200) {
              that.callLoading = false;
              setTimeout(() => {
                that.isCall = true;
              }, 10000);
              this.$message({
                type: "xinjia",
                message: "号码已发送至微信"
              });
            }
          })
          .catch(e => {
            that.callLoading = false;
            if (e.response != undefined) {
              that.$message({
                type: "xinjia-info",
                message: e.response.data.message
              });
            }
          });
      } else {
        that.$message({
          type: "xinjia-info",
          message: "十秒内不能重复点击"
        });
      }
    },
    /**
     * @example: 删除客源印象
     * @param: {nmber} id 客源印象的ID
     * @param：{nmber} idx 删除的客源印象下标
     */
    deleteImpression(id, idx) {
      let that = this;
      this.$confirm("是否删除该客源印象, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.$api
            .post({
              url: "/saleCustomerImpression/deleteImpression",
              data: { impressionId: id },
              qs: true,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(e => {
              if (e.data.code == 200) {
                that.impressionList.data.splice(idx, 1);
                this.$message({
                  type: "xinjia",
                  message: "删除成功!"
                });
              }
            })
            .catch(e => {
              if (e.response != undefined) {
                that.$message({
                  type: "xinjia-info",
                  message: e.response.data.message
                });
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
//prettier-ignore
@line-height: 36PX;
.infor-box {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  .infor-row {
    margin-bottom: 24px;
    .infor-name {
      font-size: @font24;
      font-weight: bold;
      display: inline-block;
      margin-right: 16px;
    }
    .infor-sex {
      font-size: @font18;
      color: #606266;
    }
    .infor-phone {
      font-size: @font18;
      line-height: @line-height;
      font-weight: bold;
    }
    .infor-bottom {
      margin-left: auto;
    }
    .infor-check {
      margin-left: auto;
    }
    .infor-dial {
      /deep/ .el-button:focus,
      .el-button:hover {
        color: #fff;
        border: none;
        background-color: @backgroud;
      }
      /deep/ .el-button {
        // width: 110px;
        font-size: @font16;
        color: #fff;
        text-align: center;
        //prettier-ignore
        line-height: @line-height;
        background: @backgroud;
        border-radius: 4px;
        margin-left: 8px;
        padding: 0 16px;
      }
    }
    .infor-tag {
      display: inline-block;
      background: @opacityBackground;
      padding: 10px 16px;
      margin: 0 8px 8px 0;
      border-radius: 4px;
      position: relative;
      span {
        font-size: @font16;
        line-height: 1;
        color: @backgroud;
      }
      i {
        padding-left: 0.04rem;
        display: none;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(100%, -50%);
        font-size: @font16;
        font-weight: 600;
        cursor: pointer;
      }
      &:hover {
        margin-right: 30px;
        i {
          display: block;
        }
      }
    }
    /deep/ .el-button:focus,
    .el-button:hover {
      color: @backgroud;
      border: none;
      background-color: #fff;
    }
    /deep/ .el-button {
      border: none;
      color: @backgroud;
      font-size: @font14;
      line-height: @line-height;
      margin-left: auto;
      padding: 0;
    }
  }
  .message-row {
    margin-bottom: 32px;
    .message-title {
      flex: 0 0 50%;
      font-size: @font16;
      //prettier-ignore
      line-height: 16PX;
      color: #606266;
    }
    .message-txt {
      flex: 0 0 50%;
      font-size: @font16;
      //prettier-ignore
      line-height: 16PX;
      color: #303133;
      text-align: right;
      span {
        //prettier-ignore
        line-height: 24PX;
      }
    }
  }
  .flex {
    display: flex;
  }
}
.phone-list {
  div {
    padding: 8px 0;
    border-bottom: 1px solid #f0f2f5;
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
<style lang="less">
.el-message--xinjia {
  background-color: @opacityBackground;
  border-color: @opacityBackground;
  .el-message__icon {
    &::before {
      color: @backgroud;
      font-size: @font16;
      content: "\e79c";
    }
  }
  .el-message__content {
    color: @backgroud;
    font-size: @font16;
  }
}
.el-message--xinjia-info {
  background-color: #edf2fc;
  border-color: #ebeef5;
  .el-message__icon {
    &::before {
      color: #909399;
      font-size: @font16;
      content: "\e7a1";
    }
  }
  .el-message__content {
    color: #909399;
    font-size: @font16;
  }
}
.el-message--xinjia-error {
  background-color: #fef0f0;
  border-color: #fde2e2;
  .el-message__icon {
    &::before {
      color: #f56c6c;
      font-size: @font16;
      content: "\e79d";
    }
  }
  .el-message__content {
    color: #f56c6c;
    font-size: @font16;
  }
}
</style>
