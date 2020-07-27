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
      cursor: pointer;
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
      white-space: pre-wrap;

      /*       white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; */
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
        {{ cusbaseData.Customers || "暂无" }}
        <span>
          {{ cusbaseData.sex == 0 ? "男" : "女" }}
        </span>
      </div>
      <div class="MainMsgOption">
        <div
          class="White"
          @click="checkClaim()"
          v-if="ruleList.customerDetailForTakeCus"
        >
          认领客户
        </div>
        <el-popover
          placement="bottom"
          trigger="click"
          class="Green"
          v-if="ruleList.dialButtonEnable"
        >
          <div class="phone-list">
            <div
              v-for="(item, idx) in callList"
              :key="idx"
              @click="callUp(item)"
            >
              {{ item.phone }}
            </div>
            <div v-if="callList.length <= 0">
              暂无号码
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
          {{ cusbaseData.Source | Source }}
        </div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">客户需求：</div>
        <div class="SubMsgText">
          {{ cusbaseData.customerRequire | customerRequire }}
        </div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">委托时间：</div>
        <div class="SubMsgText">
          {{ cusbaseData.AddTime || "暂无" }}
        </div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">购房意向：</div>
        <div class="SubMsgText">
          {{ cusbaseData.desireIntensity | desireIntensity }}
        </div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">上次维护时间：</div>
        <div class="SubMsgText">
          {{ cusbaseData.maintainTime || "暂无" }}
        </div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">进池时间：</div>
        <div class="SubMsgText">
          {{ cusbaseData.plateChangeTime || "暂无" }}
        </div>
      </div>
    </div>

    <fixedPopup
      :visible.sync="ClaimFlag"
      v-if="ClaimFlag"
      title="每天只能认领3个客户，确定认领吗？"
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
            <el-button
              class="floot-btn close-btn"
              type="info"
              @click="openOrcloseFix('ClaimFlag', false)"
              >取消</el-button
            >
            <el-button
              class="floot-btn success-btn"
              type="info"
              @click="claimOrMerge()"
              >提交</el-button
            >
          </div>
        </div>
      </template>
    </fixedPopup>
    <fixedPopup
      :visible.sync="ClaimCheckFlag"
      v-if="ClaimCheckFlag"
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
            <el-button
              class="floot-btn close-btn"
              type="info"
              @click="openOrcloseFix('ClaimCheckFlag', false)"
              >取消</el-button
            >
            <el-button
              class="floot-btn success-btn"
              type="info"
              @click="openToMerge"
              >确认</el-button
            >
          </div>
        </div>
      </template>
    </fixedPopup>
    <fixedPopup
      :visible.sync="MergeFlag"
      v-if="MergeFlag"
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
            <el-radio-group v-model="mergeCus.Per" class="RadioItemBox">
              <div
                class="RadioItem"
                v-for="(item, index) in nameList"
                :key="index"
              >
                <el-radio :label="item.id" name="Per">
                  {{ item.customers }}
                </el-radio>
              </div>
            </el-radio-group>
          </div>
          <div class="ChooseTil">
            <div></div>
            手机号(多选)
          </div>
          <div class="ChooseItemRow">
            <div class="ChooseItemBox">
              <div
                class="showItem"
                v-for="(item, index) in phoneList"
                :key="index"
              >
                <div>{{ item }}</div>
              </div>
            </div>
          </div>
          <div class="foot-btn-content">
            <el-button
              class="floot-btn close-btn"
              type="info"
              @click="openOrcloseFix('MergeFlag', false)"
              >取消</el-button
            >
            <el-button
              class="floot-btn success-btn"
              type="info"
              @click="toMerge()"
              >提交</el-button
            >
          </div>
        </div>
      </template>
    </fixedPopup>
  </div>
</template>

<script>
export default {
  inject: ["customerId", "cusbaseData", "ruleList"],
  data() {
    return {
      Source: "", //委托来源
      desireIntensity: "", //购房意向
      callList: [],
      nameList: [],
      phoneList: [],
      AddfollowFlag: false,
      ClaimFlag: false,
      ClaimCheckFlag: false,
      MergeFlag: false,
      mergeCus: {
        Per: "",
        Name: "",
        id: "",
        list: []
      }
    };
  },
  filters: {
    Source(value) {
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
    desireIntensity(value) {
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
    customerRequire(list) {
      if (list) {
        let type = "";
        let l = list.length;
        console.log(l);
        if (l <= 0) {
          return "暂无";
        }
        for (let i = 0; i < l; i++) {
          type += list[i] + ",";
        }
        if (type) {
          type = type.substr(0, type.length - 1);
        }
        return type;
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    getPhone() {
      let that = this;
      this.$api
        .post({
          url: "/saleCustomerDetail/getTelephoneForPublish",
          data: { customerId: that.customerId.id },
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
    callUp(i) {
      let that = this;
      console.log(i);
      let postData = {
        customerId: this.customerId.id,
        remark: "给客户" + this.cusbaseData.Customers + "拨打电话",
        customerName: this.cusbaseData.Customers,
        //  contactPhone: i.phone,
        customerNo: this.cusbaseData.CustomerNo,
        customerPlate: this.cusbaseData.plate,
        telId: i.id
      };
      that.$api
        .post({
          url: "/saleCustomerDetail/DialPhoneToCustomer",
          data: postData,
          qs: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
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
    openOrcloseFix(key, val) {
      this[key] = val;
    },
    checkClaim() {
      var that = this;
      this.$api
        .post({
          url: "/saleCustomerDetail/canTakeCus",
          qs: true,
          data: {
            customerId: that.customerId.id
          }
        })
        .then(e => {
          console.log(e.data);
          let json = e.data;
          if (json.code == 200) {
            this.ClaimFlag = true;
            //处理数据
            this.nameList = json.data.cus;
            this.mergeCus.Per = this.nameList[0].id;
            this.phoneList = json.data.phones;
          } else if (json.code == 400) {
            this.ClaimFlag = false;

            alert(json.message);
            console.log("失败     " + json);
          }
        });
    },
    claimOrMerge() {
      this.ClaimFlag = false;
      if (this.nameList.length == 1) {
        //无需合并，直接认领
        console.log(this.mergeCus);
        this.toClaim(true);
      } else {
        //需要合并 进行提示
        this.ClaimCheckFlag = true;
      }
    },
    openToMerge() {
      this.ClaimCheckFlag = false;
      this.MergeFlag = true;
    },
    toMerge() {
      //判断是否有选择
      if (this.mergeCus.Per != "") {
        //进行合并
        this.MergeFlag = false;
        let list = [];
        for (let i = 0; i < this.nameList.length; i++) {
          list.push(this.nameList[i].id);
        }
        //  list.splice(list.indexOf(this.mergeCus.Per), 1);
        this.mergeCus.list = list;
        console.log(this.mergeCus);
        this.toClaim(true);
      }
    },
    toClaim(flag) {
      //进行认领
      var that = this;
      if (flag) {
        this.$api
          .post({
            url: "/saleCustomerDetail/takeCus",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            data: {
              customerId: that.mergeCus.Per,
              list: that.mergeCus.list
            }
          })
          .then(e => {
            console.log(e.data);
            let json = e.data;
            if (json.code == 200) {
              this.$message({
                type: "success",
                message: "认领成功！"
              });
              //跳转至私客页面
              this.$router.push({
                path: "/customers/customersDetail",
                query: { customerId: this.customerId.id }
              });
            } else if (json.code == 400) {
              alert(json.message);
              console.log("失败     " + json);
            }
          });
      }
    }
  }
};
</script>
