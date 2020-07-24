<style lang="less" scoped>
@import url("../../publicCustomersDetail/less/form");
.part-Warp {
  padding: 24px;
}
.MainTitleRow {
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f2f5;
  .MainTitle {
    font-size: @font24;
    line-height: 36px;
    font-weight: bold;
  }
  .AddFollow {
    width: 96px;
    height: 36px;
    border: 0;
    border-radius: 4px;
    background: @backgroud;
    color: #ffffff;
    font-size: @font16;
    cursor: pointer;
  }
}
.FollowCardZone {
  max-height: 770px;
  overflow-y: auto;
  padding: 24px 0;
  .FollowCell {
    .cellTilRow {
      display: flex;
      .cellTil {
        // prettier-ignore
        font-size: 16PX;
        font-weight: bold;
        line-height: 24px;
      }
      .fristCellDot,
      .cellDot {
        margin: 0 16px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        > div {
          margin: 5px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
        }
      }
      .fristCellDot {
        background: @opacityBackground;
        > div {
          background: @backgroud;
        }
      }
      .cellDot {
        background: #e9e9eb;
        > div {
          background: #909399;
        }
      }
      .cellTime {
        // prettier-ignore
        font-size: 16PX;
        line-height: 24px;
      }
    }
    .cellMsgBox {
      margin-top: 24px;
      margin-bottom: 24px;
      margin-left: 91px;
      border-left: 2px solid #909399;
      padding: 20px 30px;
      .cellMsg {
        padding: 4px 16px;
        background: #f8f8f8;
        .cellMsgRow {
          padding: 12px 0;
          display: flex;
          .cellMsgTil {
            white-space: nowrap;
            font-size: @font14;
            min-width: 75px;
            margin-right: 15px;
            color: #606266;
          }
          .cellMsgText {
            margin-right: 120px;
            font-size: @font14;
          }
        }
      }
    }
    .lastCellMsgBox {
      border-left: 2px solid #ffffff !important;
    }
  }
  .Followtip {
    padding: 50px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    > div {
      width: 100%;
      text-align: center;
      font-size: @font16;
    }
  }
}
</style>
<template>
  <div class="part-Warp">
    <div class="MainTitleRow">
      <div class="MainTitle">跟进记录</div>
      <button
        class="AddFollow"
        @click="OpenAddFollow"
        v-if="ruleList.addFollowLookButtonEable"
      >
        写跟进
      </button>
    </div>
    <div
      class="FollowCardZone"
      v-if="ruleList.customerDetailForFollowAndTakeLook"
    >
      <div
        class="FollowCell"
        v-for="(item, index) in FollowData.data"
        :key="index"
      >
        <div class="cellTilRow">
          <div class="cellTil">跟进信息</div>
          <div :class="index == 0 ? 'fristCellDot' : 'cellDot'">
            <div></div>
          </div>
          <div class="cellTime">{{ item.AddTime || "暂无" }}</div>
        </div>
        <div
          class="cellMsgBox"
          :class="index == FollowData.data.length - 1 ? 'lastCellMsgBox ' : ''"
        >
          <div class="cellMsg">
            <div class="cellMsgRow">
              <div class="cellMsgTil">跟进人：</div>
              <div class="cellMsgText">{{ item.perName || "暂无" }}</div>
            </div>
            <div class="cellMsgRow">
              <div class="cellMsgTil">跟进类型：</div>
              <div class="cellMsgText">{{ item.FollowType || "暂无" }}</div>
            </div>
            <div class="cellMsgRow">
              <div class="cellMsgTil">跟进方式：</div>
              <div class="cellMsgText">{{ item.FollowWay || "暂无" }}</div>
            </div>
            <div class="cellMsgRow">
              <div class="cellMsgTil">跟进内容：</div>
              <div class="cellMsgText" v-if="item.FollowType == '电话跟进'">
                <VueAudio
                  :theUrl="item.Memo.slice(6)"
                  :theControlList="theControlList"
                ></VueAudio>
              </div>
              <div class="cellMsgText" v-else>
                {{ item.Memo || "暂无" }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Followtip" v-if="FollowData.data.length <= 0">
        <img src="../../../../assets/images/zanwu.png" />
        <div>暂无跟进信息</div>
      </div>
    </div>

    <fixedPopup
      :visible.sync="addFollowFlag"
      v-if="addFollowFlag"
      title="写跟进"
      width="554px"
      typeClass="none"
      styleType="0"
    >
      <template v-slot:floot>
        <div style="margin-top：20px">
          <div class="ChooseTil">
            <div></div>
            跟进类型
          </div>
          <div class="ChooseItemRow">
            <el-select
              v-model="follow.FollowType"
              placeholder="请选择"
              class="SelectItem"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="ChooseTil">
            <div></div>
            跟进方式
          </div>
          <div class="ChooseItemRow">
            <el-radio-group v-model="follow.FollowWay" class="RadioItemBox">
              <div
                class="RadioItem"
                v-for="(item, index) in wayList"
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
            跟进内容
          </div>
          <div class="ChooseItemRow">
            <el-radio-group
              v-model="follow.defaultext"
              class="RadioItemBox"
              @change="getText"
            >
              <div
                class="RadioItem"
                v-for="(item, index) in defaultList"
                :key="index"
              >
                <el-radio :label="item.name" name="Price">
                  {{ item.name }}
                </el-radio>
              </div>
            </el-radio-group>
          </div>
          <div class="ChooseItemRow">
            <el-input
              type="textarea"
              placeholder="请填写跟进内容"
              v-model="follow.Memo"
              class="textareaItem"
              maxlength="30"
              show-word-limit
            >
            </el-input>
          </div>
          <div class="foot-btn-content">
            <el-button class="floot-btn close-btn" type="info">取消</el-button>
            <el-button
              class="floot-btn success-btn"
              type="info"
              @click="followUp"
              :loading="addLoading"
              >提交</el-button
            >
          </div>
        </div>
      </template>
    </fixedPopup>
  </div>
</template>

<script>
const typeListModle = [
  {
    name: "日常回访",
    value: "日常回访"
  },
  {
    name: "带看后回访",
    value: "带看后回访"
  }
];
const wayListModle = [
  {
    name: "微信",
    value: "微信"
  },
  {
    name: "电话",
    value: "电话"
  },
  {
    name: "短信",
    value: "短信"
  },
  {
    name: "面访",
    value: "面访"
  },
  {
    name: "视频",
    value: "视频"
  }
];
const defaultListModle = [
  {
    name: "短期内无法看房"
  },
  {
    name: "联系不上"
  },
  {
    name: "需求明确，无适合房源"
  },
  {
    name: "和其他同事看房中"
  }
];
import VueAudio from "@/pages/customersSystem/publicCustomersDetail/components/vueAudio";
export default {
  components: {
    VueAudio
  },
  inject: ["customerId", "FollowData", "ruleList"],
  data() {
    return {
      addFollowFlag: false,
      typeList: typeListModle,
      wayList: wayListModle,
      defaultList: defaultListModle,
      follow: {
        FollowType: "",
        FollowWay: "",
        defaultext: "",
        Memo: ""
      },
      theControlList: "onlyOnePlaying",
      addLoading: false
    };
  },
  mounted() {},
  methods: {
    //更新跟进
    apply() {
      var that = this;
      this.$api
        .post({
          url: "saleCustomerDetail/getPubCusDetail",
          qs: true,
          data: {
            customerId: that.customerId.id
          }
        })
        .then(e => {
          console.log(e.data);
          let json = e.data;
          if (json.code == 200) {
            console.log(json.data.followList);
            this.$set(that.FollowData, "data", json.data.followList);
          } else if (json.code == 400) {
            alert(json.message);
            console.log("失败     " + json);
          }
        });
    },
    //添加跟进
    followUp() {
      let that = this;
      if (that.follow.FollowType == "") {
        this.$message({
          message: "跟进类型不可为空"
        });
      } else if (that.follow.FollowWay == "") {
        this.$message({
          message: "跟进方式不可为空"
        });
      } else if (that.follow.Memo == "") {
        this.$message({
          message: "跟进内容不可为空"
        });
      } else {
        that.addFollow();
      }
    },
    addFollow() {
      var that = this;
      that.addLoading = true;

      this.$api
        .post({
          url: "/saleCustomerDetail/addSaleCusFlower",
          qs: true,
          data: {
            EntructId: that.customerId.id,
            Memo: that.follow.Memo,
            FollowWay: that.follow.FollowWay,
            FollowType: that.follow.FollowType
          }
        })
        .then(e => {
          console.log(e.data);
          let json = e.data;
          if (json.code == 200) {
            this.addFollowFlag = false;
            this.$message({
              type: "success",
              message: "添加跟进成功！"
            });

            (this.follow = {
              FollowType: "",
              FollowWay: "",
              defaultext: "",
              Memo: ""
            }),
              this.apply();
          } else if (json.code == 400) {
            alert(json.message);
            console.log("失败     " + json);
          }
          that.addLoading = false;
        });
    },
    OpenAddFollow() {
      this.addFollowFlag = true;
    },
    getText() {
      this.follow.Memo = this.follow.defaultext;
    }
  }
};
</script>
