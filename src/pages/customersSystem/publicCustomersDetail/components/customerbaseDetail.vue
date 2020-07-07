<style lang="less" scoped>
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
      padding: 0 16px;
      height: 36px;
      line-height: 36px;
      border: 1px solid;
      border-radius: 4px;
      font-size: @font16;
    }
    .White {
      background: #ffffff;
      border: 1px solid @backgroud;
      color: @backgroud;
      margin-bottom: 16px;
    }
    .Green {
      background: @backgroud;
      border: 1px solid #ffffff;
      color: #ffffff;
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
      font-size: @font18;
    }
    .SubMsgTil {
      color: #606266;
    }
    .SubMsgText {
    }
  }
}
.text-Middle {
  margin: 32px 24px 0;
  font-size: @font18;
}
.foot-btn-content {
  display: flex;
  justify-content: flex-end;
  padding: 24px;
  .floot-btn {
    width: 136px;
    height: 48px;
    font-size: @font16;
  }
  .close-btn {
    background: #fff;
    color: rgba(144, 147, 153, 1);
    border: 1px solid rgba(206, 206, 206, 1);
  }
  .success-btn {
    background: @backgroud;
    color: rgba(255, 255, 255, 1);
    border: none;
  }
  .floot-btn + .floot-btn {
    margin-left: 16px;
  }
}
.ChooseTil {
  margin: 16px 24px;
  font-size: @font16;
  display: flex;
  > div {
    margin: 5px 10px 5px 0;
    width: 6px;
    height: 6px;
    background: #f62f2f;
    border-radius: 50%;
  }
}
.ChooseItemRow {
  display: flex;
  margin: 0 24px;

  .ChooseItemBox {
    display: flex;
    flex-wrap: wrap;
    .ChooseItem {
      /deep/.el-checkbox__input {
        width: 0 !important;
        height: 0 !important;
        overflow: hidden;
      }
      /deep/.el-checkbox__label {
        padding-left: 0 !important;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        font-size: @font16;
        line-height: 48px;
      }
      .is-checked {
        border: 1px solid var(--color--primary) !important;
        border-radius: 4px;
        /deep/.el-checkbox__label {
          color: var(--color--primary);
        }
      }
      .el-checkbox {
        //margin-right: 0 !important;
        transition: all 0.2s ease-in;
        height: 48px;
        margin: 8px 20px 8px 0;
        padding: 0 15px;
        border: 1px solid #fff;
        border-radius: 4px;
        line-height: 48px;
        background: #f0f2f5;
      }
    }
  }
  .RadioItemBox {
    display: flex;
    flex-wrap: wrap;
    .RadioItem {
      /deep/.el-radio__input {
        width: 0 !important;
        height: 0 !important;
        overflow: hidden;
      }
      /deep/.el-radio__label {
        padding-left: 0 !important;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        font-size: @font16;
        line-height: 48px;
      }
      .is-checked {
        border: 1px solid var(--color--primary) !important;
        border-radius: 4px;
        /deep/.el-radio__label {
          color: var(--color--primary);
        }
      }
      .el-radio {
        //margin-right: 0 !important;
        transition: all 0.2s ease-in;
        height: 48px;
        margin-right: 20px;
        padding: 0 15px;
        border: 1px solid #fff;
        border-radius: 4px;
        line-height: 48px;
        background: #f0f2f5;
      }
    }
  }
}
</style>
<template>
  <div class="part-Warp">
    <div class="MainMsgZone">
      <div class="MainMsgTil">
        周杰伦
        <span>男</span>
      </div>
      <div class="MainMsgOption">
        <div class="White" @click="openClaimFixed">认领客户</div>
        <div class="Green">一键拨号</div>
      </div>
    </div>
    <div class="SubMsgZone">
      <div class="SubMsgRow">
        <div class="SubMsgTil">委托来源：</div>
        <div class="SubMsgText">朋友</div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">客户需求：</div>
        <div class="SubMsgText">买二手住宅</div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">委托时间：</div>
        <div class="SubMsgText">2020-06-22</div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">购房意向：</div>
        <div class="SubMsgText">一般</div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">上次维护时间：</div>
        <div class="SubMsgText">2020-06-22</div>
      </div>
      <div class="SubMsgRow">
        <div class="SubMsgTil">进池时间：</div>
        <div class="SubMsgText">2020-06-22</div>
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
            <el-button class="floot-btn success-btn" type="info"
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
  data() {
    return {
      nameList: nameListModle,
      phoneList: phoneListModle,
      FlagList: {
        AddfollowFlag: false,
        ClaimFlag: false,
        ClaimCheckFlag: false,
        MergeFlag: true
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
  methods: {
    openClaimFixed() {
      this.FlagList.ClaimFlag = true;
    }
  }
};
</script>
