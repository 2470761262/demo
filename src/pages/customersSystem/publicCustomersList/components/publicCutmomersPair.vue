<style lang="less" scoped>
.pariWarp {
  position: relative;
  .SwtichBox {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    display: flex;
    width: 240px;
    height: 50px;
    border: 1px solid @backgroud;
    border-radius: 8px;
    .SwitchItemOn,
    .SwitchItem {
      margin: 5px;
      width: 110px;
      height: 40px;
      text-align: center;
      border-radius: 4px;
      > i,
      > span {
        line-height: 40px;
        font-size: @font16;
      }
    }

    .SwitchItemOn {
      background: @backgroud;
      > i,
      > span {
        color: #ffffff;
      }
    }
    .SwitchItem {
      background: #ffffff;
      > i,
      > span {
        color: @backgroud;
      }
    }
  }
  .ItemRow {
    margin: 24px 0;
  }
  .SearchItemRow {
    .SearchItem {
      display: flex;
      justify-content: space-between;
      min-width: 495px;
      height: 50px;
      border-radius: 4px;
      border: 1px solid #cecece;
      overflow: hidden;
      .selectItem {
        margin: 10px 0;
        border-right: 1px solid #cecece;
      }
      /deep/.el-input {
        width: 110px;
        height: 30px;
        line-height: 30px;
        i {
          line-height: inherit;
        }
        .el-input__inner {
          line-height: inherit;
          height: inherit;
          text-align: center;
          border: 0;
          font-size: @font16;
          color: #606266;
        }
        .el-input-suniff {
          color: #606266;
        }
      }
      .InputItem {
        width: 280px;
        height: 50px;
        overflow: hidden;
        padding-left: 20px;
        > input {
          width: 100%;
          line-height: 50px;
          border: 0;
          font-size: @font16;
        }
      }
      .SubmitItem {
        width: 80px;
        height: 50px;
        background: @backgroud;
        text-align: center;
        > i {
          line-height: 50px;
          color: #ffffff;
          font-size: @font24;
        }
      }
    }
    .NavigateItem {
      margin-left: 20px;
      padding: 0 14px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border: 1px solid @backgroud;
      border-radius: 8px;
      color: @backgroud;
      font-size: @font16;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  /deep/.el-form-item__content {
    display: flex;
  }
  .tapSwitchRow {
    display: flex;
    border-bottom: 1px solid #f0f2f5;
    .tapSwitchItem,
    .tapSwitchItemOn {
      margin-right: 35px;
      height: 50px;
      line-height: 50px;
      font-size: @font18;
    }
    .tapSwitchItem {
      border-bottom: 2px solid #ffffff;
    }
    .tapSwitchItemOn {
      border-bottom: 2px solid @backgroud;
      color: @backgroud;
      font-weight: bold;
    }
  }
  .ChooseItemRow {
    display: flex;
    height: 30px;
    .ChooseItemBox {
      display: flex;
      flex-wrap: wrap;
      margin: 0px -15px 0;
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
          font-size: @font14;
          line-height: 32px;
        }
        .is-checked {
          border: 1px solid @backgroud !important;
          border-radius: 4px;
          /deep/.el-checkbox__label {
            color: @backgroud;
          }
        }
        .el-checkbox {
          //margin-right: 0 !important;
          transition: all 0.2s ease-in;
          margin-right: 20px;
          padding: 0 15px;
          border: 1px solid #fff;
          border-radius: 4px;
          height: 32px;
          line-height: 32px;
        }
      }
    }
    .RadioItemBox {
      display: flex;
      flex-wrap: wrap;
      margin: 0px -15px 0;
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
          font-size: @font14;
          line-height: 32px;
        }
        .is-checked {
          border: 1px solid @backgroud !important;
          border-radius: 4px;
          /deep/.el-radio__label {
            color: @backgroud;
          }
        }
        .el-radio {
          //margin-right: 0 !important;
          transition: all 0.2s ease-in;
          height: 32px;
          line-height: 32px;
          margin-right: 20px;
          padding: 0 15px;
          border: 1px solid #fff;
          border-radius: 4px;
        }
      }
    }
    .InputItem {
      display: flex;
      align-self: center;
      margin-top: 10px;
      .split-line {
        width: 20px;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          height: 2px;
          width: 20px;
          transform: translate(-50%, -50%);
          background: #686a6e;
        }
      }
      .InputItemCell {
        display: flex;
        border: 1px solid #cecece;
        border-radius: 4px;
        padding: 0 10px;
        margin: 0 10px;
        height: 36px;
        line-height: 36px;

        > span {
          color: #686a6e;
          font-size: @font14;
          white-space: nowrap;
        }
        /deep/.el-input {
          width: 100px;
          height: 36px;
          line-height: 36px;
          i {
            line-height: inherit;
          }
          .el-input__inner {
            border-color: #fff;
            line-height: inherit;
            height: inherit;
            text-align: center;
            font-size: @font14;
          }
        }
      }
      /deep/.el-button {
        margin-left: 20px;
        padding: 0;
        width: 70px;
        height: 40px;
        line-height: 40px;
        font-size: @font14;
        background: @backgroud;
        color: #ffffff;
        text-align: center;
      }
    }
    .timePickerItem {
      position: relative;
      /deep/.el-input__inner {
        border-color: #ffffff;
        /deep/.el-input__icon {
          display: none;
        }
        /deep/.el-range-input {
          width: 155px;
          height: 36px;
          line-height: 36px;
          border: 1px solid #cecece;
          border-radius: 4px;
        }
      }
      .elIcon {
        position: absolute;
        top: 0;
        left: -20px;
        color: #cecece;
        > i {
          margin-left: 160px;
        }
      }
    }

    /deep/.el-button {
      margin-left: 20px;
      padding: 0;
      width: 70px;
      height: 40px;
      line-height: 40px;
      font-size: @font14;
      background: @backgroud;
      color: #ffffff;
      text-align: center;
    }
  }
  /deep/.el-form-item__label {
    width: 125px !important;
    line-height: 40px;
    font-size: @font14;
    font-weight: bold;
    text-align: left;
    line-height: 32px;
  }
  .FoldRow {
    .FoldItem {
      margin: 0 auto;
      width: 150px;
      text-align: center;
      font-size: @font16;
      color: #247257;
      > i {
        margin-left: 10px;
        transform: rotate(-90deg);
      }
      .ShowMore {
        transform: rotate(90deg) !important;
      }
    }
  }
}
</style>
<template>
  <div class="pariWarp">
    <div class="SwtichBox">
      <div
        class="SwitchItem"
        @click="navigateTo('/customers/privateCustomersList')"
      >
        <i></i>
        <span>私客库</span>
      </div>
      <div class="SwitchItemOn">
        <i></i>
        <span>公客池</span>
      </div>
    </div>
    <el-form>
      <el-form-item class="ItemRow SearchItemRow">
        <div class="SearchItem">
          <div class="InputItem">
            <input
              placeholder="请输入楼盘名称或房源编号"
              v-model="form.KeyWord"
            />
          </div>
          <div class="SubmitItem">
            <i class="el-icon-search"></i>
          </div>
        </div>
        <div
          class="NavigateItem"
          @click="navigateTo('/customers/addCustomers')"
        >
          <span>录入客源</span>
        </div>
      </el-form-item>
      <el-form-item
        label="客户需求"
        class="ItemRow ChooseItemRow"
        prop="HouseType"
      >
        <el-radio-group v-model="form.customerNeeds" class="RadioItemBox">
          <div
            class="RadioItem"
            v-for="(item, index) in customerNeedsList"
            :key="index"
          >
            <el-radio :label="item.value" name="customerNeeds">{{
              item.name
            }}</el-radio>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="公客类型"
        class="ItemRow ChooseItemRow"
        prop="HouseType"
      >
        <el-radio-group v-model="form.PublicType" class="RadioItemBox">
          <div
            class="RadioItem"
            v-for="(item, index) in PublicTypeList"
            :key="index"
          >
            <el-radio :label="item.value" name="PublicType">{{
              item.name
            }}</el-radio>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="进池原因"
        class="ItemRow ChooseItemRow"
        prop="Reason"
      >
        <el-radio-group v-model="form.Reason" class="RadioItemBox">
          <div
            class="RadioItem"
            v-for="(item, index) in ReasonList"
            :key="index"
          >
            <el-radio :label="item.value" name="Reason">{{
              item.name
            }}</el-radio>
          </div>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const customerNeedsModle = [
  {
    name: "不限",
    value: 1
  },
  {
    name: "买二手",
    value: 2
  },
  {
    name: "租赁",
    value: 3
  },
  {
    name: "买新房",
    value: 4
  }
];
const PublicTypeModle = [
  {
    name: "不限",
    value: 1
  },
  {
    name: "门店公客",
    value: 2
  },
  {
    name: "区域公客",
    value: 3
  },
  {
    name: "公司公客",
    value: 4
  }
];
const ReasonModle = [
  {
    name: "不限",
    value: 1
  },
  {
    name: "无效转入",
    value: 2
  },
  {
    name: "离职转入",
    value: 3
  },
  {
    name: "滚动转入",
    value: 4
  },
  {
    name: "核销房源转入",
    value: 4
  }
];
export default {
  inject: ["form"],
  data() {
    return {
      customerNeedsList: customerNeedsModle,
      PublicTypeList: PublicTypeModle,
      ReasonList: ReasonModle
    };
  },
  created() {
    console.log(this.form);
  },
  methods: {
    navigateTo(path) {
      this.$router.push({ path: path });
    }
  }
};
</script>
