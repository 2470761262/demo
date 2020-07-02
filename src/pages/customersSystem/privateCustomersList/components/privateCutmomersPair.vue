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
    border: 1px solid green;
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
        // prettier-ignore
        font-size: 18PX;
      }
    }

    .SwitchItemOn {
      background: green;
      > i,
      > span {
        color: #ffffff;
      }
    }
    .SwitchItem {
      background: #ffffff;
      > i,
      > span {
        color: green;
      }
    }
  }
  .ItemRow {
    margin: 30px 0;
  }
  .SearchItemRow {
    .SearchItem {
      display: flex;
      justify-content: space-between;
      width: 495px;
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
          // prettier-ignore
          font-size: 16PX;
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
          // prettier-ignore
          font-size: 16PX;
        }
      }
      .SubmitItem {
        width: 80px;
        height: 50px;
        background: green;
        text-align: center;
        > i {
          line-height: 50px;
          color: #ffffff;
          // prettier-ignore
          font-size:24PX;
        }
      }
    }
    .NavigateItem {
      margin-left: 20px;
      width: 95px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border: 1px solid green;
      border-radius: 8px;
      color: green;
      // prettier-ignore
      font-size: 18PX;
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
      // prettier-ignore
      font-size:22PX ;
    }
    .tapSwitchItem {
      border-bottom: 2px solid #ffffff;
    }
    .tapSwitchItemOn {
      border-bottom: 2px solid green;
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
          // prettier-ignore
          font-size: 18PX;
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
          margin-right: 20px;
          padding: 0 15px;
          border: 1px solid #fff;
          border-radius: 4px;
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
          // prettier-ignore
          font-size: 18PX;
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
          height: 35px;
          margin-right: 20px;
          padding: 0 15px;
          border: 1px solid #fff;
          border-radius: 4px;
          line-height: 35px;
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
        > span {
          color: #686a6e;
          // prettier-ignore
          font-size: 18PX;
          white-space: nowrap;
        }
        /deep/.el-input {
          width: 100px;
          height: 40px;
          line-height: 40px;
          i {
            line-height: inherit;
          }
          .el-input__inner {
            border-color: #fff;
            line-height: inherit;
            height: inherit;
            text-align: center;
            // prettier-ignore
            font-size: 18PX;
          }
        }
      }
      /deep/.el-button {
        margin-left: 20px;
        padding: 0;
        width: 70px;
        height: 40px;
        line-height: 40px;
        // prettier-ignore
        font-size: 16PX;
        background: var(--color--primary);
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
          height: 40px;
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
      // prettier-ignore
      font-size: 16PX;
      background: var(--color--primary);
      color: #ffffff;
      text-align: center;
    }
  }
  /deep/.el-form-item__label {
    width: 125px !important;
    line-height: 40px;
    // prettier-ignore
    font-size: 18PX;
    font-weight: bold;
    text-align: left;
  }
  .FoldRow {
    .FoldItem {
      margin: 0 auto;
      width: 150px;
      text-align: center;
      // prettier-ignore
      font-size: 18PX;
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

      <div class="ItemRow tapSwitchRow">
        <div
          v-for="(item, index) in customersTypeList"
          :key="index"
          :class="
            item.type == form.customersType
              ? 'tapSwitchItemOn'
              : 'tapSwitchItem'
          "
          @click="setCustomersType(item)"
        >
          {{ item.title }}({{ item.count }})
        </div>
      </div>

      <el-form-item
        label="意愿等级"
        class="ItemRow ChooseItemRow"
        prop="Intend"
      >
        <el-checkbox-group v-model="form.Intend" class="ChooseItemBox">
          <div
            class="ChooseItem"
            v-for="(item, index) in IntendList"
            :key="index"
          >
            <el-checkbox :label="item.value" name="Intend">{{
              item.name
            }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        label="看房进度"
        class="ItemRow ChooseItemRow"
        prop="Progress"
      >
        <el-checkbox-group v-model="form.Progress" class="ChooseItemBox">
          <div
            class="ChooseItem"
            v-for="(item, index) in ProgressList"
            :key="index"
          >
            <el-checkbox :label="item.value" name="Progress">{{
              item.name
            }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="意向价格" class="ItemRow ChooseItemRow" prop="Price">
        <el-radio-group v-model="form.Price" class="RadioItemBox">
          <div
            class="RadioItem"
            v-for="(item, index) in PriceList"
            :key="index"
          >
            <el-radio :label="item.value" name="Price">
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
              v-model="form.MinPrice"
            ></el-input>
            <span>单位</span>
          </div>
          <div class="split-line"></div>
          <div class="InputItemCell">
            <el-input
              v-number
              placeholder="最大值"
              clearable
              v-model="form.MaxPrice"
            ></el-input>
            <span>单位</span>
          </div>
          <el-button>确定</el-button>
        </div>
      </el-form-item>
      <div v-show="ShowMorePair == true">
        <el-form-item
          label="意向面积"
          class="ItemRow ChooseItemRow"
          prop="Area"
        >
          <el-radio-group v-model="form.Area" class="RadioItemBox">
            <div
              class="RadioItem"
              v-for="(item, index) in AreaList"
              :key="index"
            >
              <el-radio :label="item.value" name="Area">{{
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
                v-model="form.MinArea"
              ></el-input>
              <span>单位</span>
            </div>
            <div class="split-line"></div>
            <div class="InputItemCell">
              <el-input
                v-number
                placeholder="最大值"
                clearable
                v-model="form.MaxArea"
              ></el-input>
              <span>单位</span>
            </div>
            <el-button>确定</el-button>
          </div>
        </el-form-item>
        <el-form-item
          label="意向房型"
          class="ItemRow ChooseItemRow"
          prop="HouseType"
        >
          <el-radio-group v-model="form.HouseType" class="RadioItemBox">
            <div
              class="RadioItem"
              v-for="(item, index) in HouseTypeList"
              :key="index"
            >
              <el-radio :label="item.value" name="HouseType">
                {{ item.name }}
              </el-radio>
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
          <el-button>确定</el-button>
        </el-form-item>
        <el-form-item
          label="维护时间"
          class="ItemRow ChooseItemRow"
          prop="Radio"
        >
          <div class="timePickerItem">
            <el-date-picker
              v-model="MaintenanceTime"
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
          <el-button>确定</el-button>
        </el-form-item>
        <el-form-item
          label="上次带看"
          class="ItemRow ChooseItemRow"
          prop="Radio"
        >
          <div class="timePickerItem">
            <el-date-picker
              v-model="TakelookTime"
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
          <el-button>确定</el-button>
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
  {
    name: "不限",
    value: 1
  },
  {
    name: "强烈",
    value: 2
  },
  {
    name: "一般",
    value: 3
  },
  {
    name: "较弱",
    value: 4
  },
  {
    name: "暂不关注",
    value: 5
  }
];
const ProgressListModle = [
  {
    name: "不限",
    value: 1
  },
  {
    name: "未带看",
    value: 2
  },
  {
    name: "首看",
    value: 3
  },
  {
    name: "复看",
    value: 4
  },
  {
    name: "三看及以上",
    value: 5
  },
  {
    name: "签约",
    value: 6
  }
];
const PriceListModle = [
  {
    name: "不限",
    value: 1
  },
  {
    name: "50万以下",
    value: 2
  },
  {
    name: "50-100万",
    value: 3
  },
  {
    name: "100-150万",
    value: 4
  },
  {
    name: "150-200万",
    value: 5
  },
  {
    name: "200万以上",
    value: 6
  }
];
const AreaListModle = [
  {
    name: "不限",
    value: 1
  },
  {
    name: "50㎡以下",
    value: 2
  },
  {
    name: "50-90㎡",
    value: 3
  },
  {
    name: "90-120㎡",
    value: 4
  },
  {
    name: "120-150㎡",
    value: 5
  },
  {
    name: "150-180㎡",
    value: 6
  },
  {
    name: "180㎡以上",
    value: 7
  }
];
const HouseTypeListModle = [
  {
    name: "不限",
    value: 1
  },
  {
    name: "一房",
    value: 2
  },
  {
    name: "两房",
    value: 3
  },
  {
    name: "三房",
    value: 4
  },
  {
    name: "四房",
    value: 5
  },
  {
    name: "四房以上",
    value: 6
  }
];
export default {
  inject: ["form"],
  data() {
    return {
      customersTypeList: cusTypeList,
      IntendList: IntendListModle,
      ProgressList: ProgressListModle,
      PriceList: PriceListModle,
      AreaList: AreaListModle,
      HouseTypeList: HouseTypeListModle,
      DelegateTime: "",
      MaintenanceTime: "",
      TakelookTime: "",
      ShowMorePair: false,
      FoldText: "展开选项/收起"
    };
  },
  created() {
    console.log(this.form);
  },
  methods: {
    setCustomersType(item, resetAll) {
      this.form.customersType = item.type;
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
