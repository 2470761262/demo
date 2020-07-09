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
          font-size: 16px;
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
    .switchItem,
    .switchItemOn {
      margin-left: 20px;
      padding: 0 15px;
      border: 1px solid;
      border-radius: 4px;
      height: 32px;
      line-height: 34px;
      font-size: @font14;
    }
    .switchItem {
      color: #606266;
      border-color: #fff;
    }
    .switchItemOn {
      color: @backgroud;
      border-color: @backgroud;
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
        pointer-events: none;
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
      <div class="SwitchItemOn">
        <i></i>
        <span>私客库</span>
      </div>
      <div
        class="SwitchItem"
        @click="navigateTo('/customers/publicCustomersList')"
      >
        <i></i>
        <span>公客池</span>
      </div>
    </div>
    <el-form>
      <el-form-item class="ItemRow SearchItemRow">
        <div class="SearchItem">
          <el-select
            placeholder="客户信息"
            class="selectItem"
            v-model="form.searchType"
          >
            <el-option label="客户信息" value="1"></el-option>
            <el-option label="客源印象" value="2"></el-option>
          </el-select>
          <div class="InputItem">
            <input
              placeholder="请输入楼盘名称或房源编号"
              v-model="form.keyWord"
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

      <div class="ItemRow tapSwitchRow">
        <div
          v-for="(item, index) in customersTypeList"
          :key="index"
          :class="
            item.type == customersType ? 'tapSwitchItemOn' : 'tapSwitchItem'
          "
          @click="setCustomersType(item)"
        >
          {{ item.title }}({{ item.count }})
        </div>
      </div>

      <el-form-item label="意愿等级" class="ItemRow ChooseItemRow">
        <el-checkbox-group
          v-model="Intend"
          class="ChooseItemBox"
          @change="getUnlimit('Intend', 'desireIntensitys', 4)"
        >
          <div
            class="ChooseItem"
            v-for="(item, index) in IntendList"
            :key="index"
          >
            <el-checkbox :label="item.value" name="Intend">
              {{ item.name }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
        <div
          :class="form.attentionStatus == true ? 'switchItemOn' : 'switchItem'"
          @click="getAttention"
        >
          暂不关注
        </div>
      </el-form-item>
      <el-form-item
        label="看房进度"
        class="ItemRow ChooseItemRow"
        prop="Progress"
      >
        <el-checkbox-group
          v-model="Progress"
          class="ChooseItemBox"
          @change="getUnlimit('Progress', 'pairNumbers', -1)"
        >
          <div
            class="ChooseItem"
            v-for="(item, index) in ProgressList"
            :key="index"
          >
            <el-checkbox :label="item.value" name="Progress">
              {{ item.name }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="意向价格" class="ItemRow ChooseItemRow" prop="Price">
        <el-radio-group
          v-model="Price"
          class="RadioItemBox"
          @change="getLimit('Price', 'minPrice', 'maxPrice')"
        >
          <div
            class="RadioItem"
            v-for="(item, index) in PriceList"
            :key="index"
          >
            <el-radio :label="item.value" name="Price">{{
              item.name
            }}</el-radio>
          </div>
        </el-radio-group>
        <div class="InputItem">
          <div class="InputItemCell">
            <el-input
              v-number
              placeholder="最小值"
              clearable
              v-model="MinPrice"
            ></el-input>
            <span>万</span>
          </div>
          <div class="split-line"></div>
          <div class="InputItemCell">
            <el-input
              v-number
              placeholder="最大值"
              clearable
              v-model="MaxPrice"
            ></el-input>
            <span>万</span>
          </div>
          <el-button
            @click="submitInput('MinPrice', 'MaxPrice', 'minPrice', 'maxPrice')"
            >确定</el-button
          >
        </div>
      </el-form-item>
      <div v-show="ShowMorePair == true">
        <el-form-item
          label="意向面积"
          class="ItemRow ChooseItemRow"
          prop="Area"
        >
          <el-radio-group
            v-model="Area"
            class="RadioItemBox"
            @change="getLimit('Area', 'minArea', 'maxArea')"
          >
            <div
              class="RadioItem"
              v-for="(item, index) in AreaList"
              :key="index"
            >
              <el-radio :label="item.value" name="Area">
                {{ item.name }}
              </el-radio>
            </div>
          </el-radio-group>
          <div class="InputItem">
            <div class="InputItemCell">
              <el-input
                v-number
                placeholder="最小值"
                clearable
                v-model="MinArea"
              ></el-input>
              <span>㎡</span>
            </div>
            <div class="split-line"></div>
            <div class="InputItemCell">
              <el-input
                v-number
                placeholder="最大值"
                clearable
                v-model="MaxArea"
              ></el-input>
              <span>㎡</span>
            </div>
            <el-button
              @click="submitInput('MinArea', 'MaxArea', 'minArea', 'maxArea')"
              >确定</el-button
            >
          </div>
        </el-form-item>
        <el-form-item
          label="意向房型"
          class="ItemRow ChooseItemRow"
          prop="HouseType"
        >
          <el-radio-group v-model="form.houseNumbers" class="RadioItemBox">
            <div
              class="RadioItem"
              v-for="(item, index) in HouseTypeList"
              :key="index"
            >
              <el-radio :label="item.value" name="houseNumbers">{{
                item.name
              }}</el-radio>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="委托时间"
          class="ItemRow ChooseItemRow"
          prop="Radio"
        >
          <div class="timePickerItem">
            <el-date-picker
              v-model="DelegateTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <div class="elIcon">
              <i class="el-icon-date"></i>
              <i class="el-icon-date"></i>
            </div>
          </div>
          <el-button
            @click="getTime('DelegateTime', 'minAddTime', 'maxAddTime')"
            >确定</el-button
          >
        </el-form-item>
        <el-form-item
          label="维护时间"
          class="ItemRow ChooseItemRow"
          prop="Radio"
        >
          <div class="timePickerItem">
            <el-date-picker
              v-model="MaintenanceTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <div class="elIcon">
              <i class="el-icon-date"></i>
              <i class="el-icon-date"></i>
            </div>
          </div>
          <el-button
            @click="
              getTime('MaintenanceTime', 'minMainTainTime', 'maxMainTainTime')
            "
            >确定</el-button
          >
        </el-form-item>
        <el-form-item
          label="上次带看"
          class="ItemRow ChooseItemRow"
          prop="Radio"
        >
          <div class="timePickerItem">
            <el-date-picker
              v-model="TakelookTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <div class="elIcon">
              <i class="el-icon-date"></i>
              <i class="el-icon-date"></i>
            </div>
          </div>
          <el-button
            @click="
              getTime(
                'TakelookTime',
                'minLastPairFollowTime',
                'maxLastPairFollowTime'
              )
            "
            >确定</el-button
          >
        </el-form-item>
      </div>
    </el-form>
    <div class="FoldRow">
      <div class="FoldItem" @click="ShowMore">
        <span>{{ FoldText }}</span>
        <i
          class="el-icon-d-arrow-left"
          :class="ShowMorePair == true ? 'ShowMore' : ''"
        ></i>
      </div>
    </div>
  </div>
</template>
<script>
const cusTypeList = [
  {
    title: "全部",
    type: 1,
    count: "0"
  },
  {
    title: "买二手",
    type: 2,
    count: "0"
  },
  {
    title: "买新房",
    type: 3,
    count: "0"
  },
  {
    title: "租赁",
    type: 4,
    count: "0"
  },
  {
    title: "已成交",
    type: 5,
    count: "0"
  }
];

const IntendListModle = [
  //意愿
  {
    name: "不限",
    value: 4
  },
  {
    name: "强烈",
    value: 0
  },
  {
    name: "一般",
    value: 2
  },
  {
    name: "较弱",
    value: 1
  }
];
const ProgressListModle = [
  {
    name: "不限",
    value: -1
  },
  {
    name: "未带看",
    value: 0
  },
  {
    name: "首看",
    value: 1
  },
  {
    name: "复看",
    value: 2
  },
  {
    name: "三看及以上",
    value: 3
  },
  {
    name: "签约",
    value: 6
  }
];
const PriceListModle = [
  {
    name: "不限",
    value: [0]
  },
  {
    name: "50万以下",
    value: [0, 50]
  },
  {
    name: "50-100万",
    value: [50, 100]
  },
  {
    name: "100-150万",
    value: [100, 150]
  },
  {
    name: "150-200万",
    value: [150, 200]
  },
  {
    name: "200万以上",
    value: [200]
  }
];
const AreaListModle = [
  {
    name: "不限",
    value: [0]
  },
  {
    name: "50㎡以下",
    value: [0, 50]
  },
  {
    name: "50-90㎡",
    value: [50, 90]
  },
  {
    name: "90-120㎡",
    value: [90, 120]
  },
  {
    name: "120-150㎡",
    value: [120, 150]
  },
  {
    name: "150-180㎡",
    value: [150, 180]
  },
  {
    name: "180㎡以上",
    value: [180]
  }
];
const HouseTypeListModle = [
  {
    name: "不限",
    value: ""
  },
  {
    name: "一房",
    value: 1
  },
  {
    name: "两房",
    value: 2
  },
  {
    name: "三房",
    value: 3
  },
  {
    name: "四房",
    value: 4
  },
  {
    name: "四房以上",
    value: 5
  }
];
export default {
  inject: ["form"],
  data() {
    return {
      customersTypeList: cusTypeList,
      customersType: 1,
      IntendList: IntendListModle,
      Intend: ["4"],
      ProgressList: ProgressListModle,
      Progress: ["-1"],
      PriceList: PriceListModle,
      Price: "", //价格，需要处理数据
      MinPrice: "",
      MaxPrice: "",
      AreaList: AreaListModle,
      Area: "", //面积，需要处理数据
      MinArea: "",
      MaxArea: "",
      HouseTypeList: HouseTypeListModle,
      DelegateTime: "",
      MaintenanceTime: "",
      TakelookTime: "",
      ShowMorePair: true,
      FoldText: "展开选项/收起"
    };
  },
  created() {
    console.log(this.form);
  },
  methods: {
    setCustomersType(item, resetAll) {
      switch (item.type) {
        case 1:
          this.form.requireTypes = [];
          break;
        case 2:
          this.form.requireTypes = [1, 2, 4];
          break;
        case 3:
          this.form.requireTypes = [8, 16, 32];
          break;
        case 4:
          this.form.requireTypes = [64, 128, 256];
          break;
        case 5:
          this.form.attentionStatus = 1;
          break;
        default:
          break;
      }
      this.customersType = item.type;
    },
    getAttention() {
      console.log(this.form.attentionStatus);
      this.form.attentionStatus = !this.form.attentionStatus;
    },
    getUnlimit(key1, key2, value) {
      let l = this[key1].length;
      let i = this[key1].indexOf(value);

      if (this[key1][l - 1] == value) {
        this[key1] = [value];
        this.form[key2] = [];
      } else if (l > 1 && i != -1) {
        this[key1].splice(i, 1);
        this.form[key2] = this[key1];
      } else {
        this.form[key2] = this[key1];
      }
      console.log(this.form[key2], this[key1]);
    },

    getLimit(key, key1, key2) {
      this.form[key1] = this[key][0];
      this.form[key2] = this[key][1] ? this[key][1] : "";
      console.log(this.form[key1], this.form[key2]);
    },

    submitInput(key1, key2, keya, keyb) {
      let a = this[key1];
      if (a > this[key2]) {
        this[key1] = this[key2];
        this[key2] = a;
      }
      this.form[keya] = this[key1];
      this.form[keyb] = this[key2];
    },
    getTime(key, key1, key2) {
      if (this[key].length > 0) {
        console.log(this[key]);
        this[key1] = this[key][0] + " 00:00:00";
        this[key2] = this[key][1] + " 00:00:00";
      } else {
        alert("请先选择起止时间");
      }
    },
    ShowMore() {
      this.ShowMorePair = !this.ShowMorePair;
    },
    navigateTo(path) {
      this.$router.push({ path: path });
    }
  }
};
</script>
