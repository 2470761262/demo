<style lang="less" scoped>
@import url("../../publicCustomersDetail/less/form");
.part-Warp {
  padding: 24px;
}
.MainMsgZone {
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f2f5;
  .MainMsgTil {
    font-size: @font24;

    font-weight: bold;
    > span {
      margin-left: 16px;
      font-size: @font18;

      color: #606266;
      font-weight: 100;
    }
  }
  .MainMsgOption {
    .White,
    .Green {
      width: 96px;
      height: 36px;
      line-height: 36px;
      border-radius: 4px;
      font-size: 16px;
      overflow: hidden;
      text-align: center;
    }
    .White {
      background: #ffffff;
      border: 1px solid @backgroud;
      color: @backgroud;
      margin-bottom: 16px;
    }
    .Green {
      /deep/ .el-button {
        width: 100px;
        text-align: center;
        background: @backgroud;
        border: 1px solid #ffffff;
        color: #ffffff;
      }
    }
  }
}
.SubMsgZone {
  padding: 24px 0;
  .SubMsgRow {
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    .SubMsgTil,
    .SubMsgText {
      white-space: nowrap;
      font-size: @font18;
    }
    .SubMsgTil {
      color: #606266;
      margin-right: 15px;
    }
    .SubMsgText {
    }
  }
}
.text-Middle {
  margin: 32px 24px 0;
  font-size: @font18;
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
<template>
  <div class="part-Warp">
    <div class="MainMsgZone">
      <div class="MainMsgTil">
        {{ cusbaseData.bsAgentCustomersTbl.Customers || "暂无" }}
        <span>
          {{ cusbaseData.bsAgentCustomersTbl.sex == 0 ? "男" : "女" }}
        </span>
      </div>
      <div class="MainMsgOption">
        <div class="White" @click="openFixed('ClaimFlag', function() {})">
          认领客户
        </div>
        <el-popover placement="bottom" trigger="click" class="Green">
          <div class="phone-list">
            <div
              v-for="(item, idx) in callList"
              :key="idx"
              @click="callUp(item.phone)"
            >
              {{ item.phone }}
            </div>
          </div>
          <el-button slot="reference" @click="getPhone"
            ><span>一键拨号</span></el-button
          >
        </el-popover>
        <!-- <div class="Green">一键拨号</div> -->
      </div>
    </div>
    <div class="SubMsgZone">
      <div class="SubMsgRow">
        <div class="SubMsgTil">委托来源：</div>
        <div class="SubMsgText">
          {{ cusbaseData.bsAgentCustomersTbl.Source || "暂无" }}
        </div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">客户需求：</div>
        <div class="SubMsgText">
          {{ cusbaseData.customerRequire[0] || "暂无" }}
        </div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">委托时间：</div>
        <div class="SubMsgText">
          {{ cusbaseData.bsAgentCustomersTbl.AddTime || "暂无" }}
        </div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">购房意向：</div>
        <div class="SubMsgText">
          {{ desireIntensity || "暂无" }}
        </div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">上次维护时间：</div>
        <div class="SubMsgText">
          {{ cusbaseData.bsAgentCustomersTbl.maintainTime || "暂无" }}
        </div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">进池时间：</div>
        <div class="SubMsgText">
          {{ cusbaseData.bsAgentCustomersTbl.ModTime || "暂无" }}
        </div>
      </div>
    </div>

    <fixedPopup
      :visible.sync="FlagList.ClaimFlag"
      v-if="FlagList.ClaimFlag"
      title="确认认领吗？"
      width="960px"
      typeClass="none"
      styleType="0"
    >
      <template v-slot:floot>
        <div>
          <div class="text-Middle">
            认领后，可以在客源列表页面中找到这个客户
          </div>
          <div class="foot-btn-content">
            <el-button class="floot-btn close-btn" type="info">取消</el-button>
            <el-button
              class="floot-btn success-btn"
              type="info"
              @click="openFixed('ClaimCheckFlag', function() {})"
              >提交</el-button
            >
          </div>
        </div>
      </template>
    </fixedPopup>
    <fixedPopup
      :visible.sync="FlagList.ClaimCheckFlag"
      v-if="FlagList.ClaimCheckFlag"
      title="提示"
      width="960px"
      typeClass="none"
      styleType="0"
    >
      <template v-slot:floot>
        <div>
          <div class="text-Middle">
            当前认领的客户已有在您的私客列表中，是否继续认领
          </div>
          <div class="foot-btn-content">
            <el-button class="floot-btn close-btn" type="info">取消</el-button>
            <el-button class="floot-btn success-btn" type="info"
              >提交</el-button
            >
          </div>
        </div>
      </template>
    </fixedPopup>
    <fixedPopup
      :visible.sync="FlagList.MergeFlag"
      v-if="FlagList.MergeFlag"
      title="合并确认"
      width="554px"
      typeClass="none"
      styleType="0"
    >
      <template v-slot:floot>
        <div style="margin-top：20px">
          <div class="ChooseTil">
            <div></div>
            姓名
          </div>
          <div class="ChooseItemRow">
            <el-radio-group v-model="mergeCus.mergeName" class="RadioItemBox">
              <div
                class="RadioItem"
                v-for="(item, index) in nameList"
                :key="index"
              >
                <el-radio :label="item.value" name="Price">
                  {{ item.name }}
                </el-radio>
              </div>
            </el-radio-group>
          </div>
          <div class="ChooseTil">
            <div></div>
            手机号(多选)
          </div>
          <div class="ChooseItemRow">
            <el-checkbox-group
              v-model="mergeCus.mergePhone"
              class="ChooseItemBox"
              disable="true"
            >
              <div
                class="ChooseItem"
                v-for="(item, index) in phoneList"
                :key="index"
              >
                <el-checkbox :label="item.value">{{ item.name }}</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
          <div class="foot-btn-content">
            <el-button class="floot-btn close-btn" type="info">取消</el-button>
            <el-button class="floot-btn success-btn" type="info"
              >提交</el-button
            >
          </div>
        </div>
      </template>
    </fixedPopup>
  </div>
</template>

<script>
const nameListModle = [
  {
    name: "林俊杰",
    value: 1
  },
  {
    name: "周杰伦",
    value: 2
  },
  {
    name: "张学友",
    value: 3
  }
];
const phoneListModle = [
  {
    name: "188****8888",
    value: 1
  },
  {
    name: "187****6666",
    value: 2
  },
  {
    name: "185*****9999",
    value: 3
  },
  {
    name: "188****8888",
    value: 4
  },
  {
    name: "187****6666",
    value: 5
  },
  {
    name: "185*****9999",
    value: 6
  }
];
export default {
  inject: ["customerId"],
  data() {
    return {
      cusbaseData: [], //客户信息
      Source: "", //委托来源
      desireIntensity: "", //购房意向
      callList: [],
      nameList: nameListModle,
      phoneList: phoneListModle,
      FlagList: {
        AddfollowFlag: false,
        ClaimFlag: false,
        ClaimCheckFlag: false,
        MergeFlag: false
      },
      mergeCus: {
        mergeName: "",
        mergePhone: []
      }
    };
  },
  created() {
    console.log(this.FlagList);
  },
  mounted() {
    this.apply();
  },
  methods: {
    apply() {
      var that = this;
      this.$api
        .post({
          url: "/saleCustomerDetail/getACusEx",
          qs: true,
          data: {
            customerId: that.customerId
          }
        })
        .then(e => {
          console.log(e.data);
          let json = e.data;
          if (json.code == 200) {
            this.cusbaseData = json.data;
            switch (this.cusbaseData.bsAgentCustomersTbl.Source) {
              case 11:
                this.Source = "老客户";
                break;
              case 12:
                this.Source = "转介绍";
                break;
              case 13:
                this.Source = "亲戚朋友";
                break;
              case 14:
                this.Source = "同学";
                break;
              case 21:
                this.Source = "业主资料";
                break;
              case 22:
                this.Source = "重复购买";
                break;
              case 31:
                this.Source = "58同城";
                break;
              case 32:
                this.Source = "安居客";
                break;
              case 33:
                this.Source = "朋友圈";
                break;
              case 34:
                this.Source = "其他网络";
                break;
              case 41:
                this.Source = "公众号";
                break;
              case 42:
                this.Source = "小程序";
                break;
              case 43:
                this.Source = "APP";
                break;
              default:
                break;
            }
            switch (this.cusbaseData.saleCusPropertyTbl.desireIntensity) {
              case 0:
                this.desireIntensity = "无意向";
                break;
              case 1:
                this.desireIntensity = "较弱";
                break;
              case 2:
                this.desireIntensity = "一般";
                break;
              case 3:
                this.desireIntensity = "强烈";
                break;
              default:
                break;
            }
          } else if (json.code == 400) {
            alert(json.message);
            console.log("失败     " + json);
          }
        });
    },
    getPhone() {
      let that = this;
      this.$api
        .post({
          url: "/saleCustomerDetail/getTelPhone",
          data: { customerId: that.customerId },
          qs: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.callList = e.data.data;
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    callUp(phone) {
      let that = this;
      let postData = {
        customerId: this.customerId,
        remark:
          "给客户" +
          this.cusbaseData.bsAgentCustomersTbl.Customers +
          "拨打电话",
        customerName: this.cusbaseData.bsAgentCustomersTbl.Customers,
        contactPhone: phone,
        customerNo: this.cusbaseData.bsAgentCustomersTbl.CustomerNo,
        customerPlate: 0
      };
      that.$api
        .post({
          url: "/saleCustomerDetail/DialPhoneToCustomer",
          data: postData,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({
              type: "success",
              message: "号码已发送至微信"
            });
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    openFixed(flag, callback) {
      this.FlagList[flag] = true;
      callback();
    },
    checkClaim() {
      //确认是否能认领，若能
      this.FlagList.ClaimFlag = false;
      //查看是否要合并
      this.checkMerge();
    },
    checkMerge() {
      //确认是否合并，若要
      this.FlagList.ClaimCheckFlag = false;
    },
    toMerge() {
      //进行合并
      this.FlagList.MergeFlag = false;
    }
  }
};
</script>
