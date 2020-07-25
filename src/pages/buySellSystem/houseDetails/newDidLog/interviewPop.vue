<style lang="less" scoped>
/deep/.didLog-content-body {
  // prettier-ignore
  width: auto !important;
  .didLog-content-sroll {
    // prettier-ignore
    min-width: 660PX !important;
  }
}
.content {
  // prettier-ignore
  padding-left: 20PX;
  .view-item {
    display: flex;
    // prettier-ignore
    margin-bottom: 30PX;
    .view-item-left {
      font-size: @font16;
      flex-shrink: 0;

      // margin-right: 20PX;
      // prettier-ignore
      width: 80PX;
      position: relative;
      text-align: justify;
      // prettier-ignore
      height: 32PX;
      // prettier-ignore
      margin-right: 20PX;
      // prettier-ignore
      line-height: 32PX;
      &::after {
        display: inline-block;
        width: 100%;
        content: "";
      }
      &.is-require {
        &::before {
          content: "*";
          color: red;
          position: absolute;
          line-height: 1;
          // prettier-ignore
          left: -15PX;
          // prettier-ignore
          top: 5PX;
        }
      }
      &.is-center {
        align-self: center;
      }
    }
    .view-item-right {
      flex: 1;
      &.is-center {
        align-self: center;
      }
    }
  }
}
.house-data {
  display: flex;
  .house-image {
    // prettier-ignore
    width: 120PX;
    // prettier-ignore
    height:70PX;
    // prettier-ignore
    margin-right: 20PX;
    object-fit: cover;
  }
  .house-data-message {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .house-message-title {
      font-size: @font16;
    }
    .house-message-cell {
      display: flex;
      font-size: @font14;
      .split-line {
        width: 1px;
        background: #999;
        // prettier-ignore
        margin: 0 10PX;
      }
    }
  }
}
.radio-item {
  font-size: 0;
  display: inline-block;
  .marg5;
  input {
    display: none;
  }
  span {
    display: inline-block;
    // prettier-ignore
    padding: 5PX 20PX;
    font-size: @font14;
    border: 1px solid #999;
    border-radius: 4px;
    // prettier-ignore
    margin-right: 10PX;
  }
  input:checked + span {
    color: #fff;
    background: @backgroud;
    border-color: transparent;
  }
}
.re-radio {
  /deep/.el-radio {
    // prettier-ignore
    margin-right: 20PX;
    .el-radio__inner {
      // prettier-ignore
      width: 14PX;
      // prettier-ignore
      height: 14PX;
    }
    .el-radio__label {
      // prettier-ignore
      font-size: @font14;
      // prettier-ignore
      padding-left: 10PX;
    }
  }
}
.marg5 {
  margin-bottom: 5px;
}
.inline-input {
  // prettier-ignore
  height: 30PX;
  font-size: @font14;
  text-align: center;
  outline: none;
  border: 1px solid #999;
  &:focus {
    border-color: @backgroud;
  }
}
.per-flex {
  display: flex;
  align-items: center;
  font-size: @font14;
  .per-msg {
    // prettier-ignore
    margin-right: 20PX;
  }
  .input-content {
    // prettier-ignore
    margin-left: 50PX;
    .inline-input {
      // prettier-ignore
      margin-left: 10PX;
    }
  }
}
/deep/.el-date-editor {
  // prettier-ignore
  width: 350PX;
  // prettier-ignore
  height: 40PX;
  // prettier-ignore
  line-height: 40PX;
  .el-input__icon {
    font-size: @font14;
    // prettier-ignore
    line-height: 32PX;
  }
  .el-range-separator {
    // prettier-ignore
    line-height: 32PX;
  }
  input {
    font-size: @font14;
  }
}
/deep/.el-checkbox {
  // prettier-ignore
  margin-right: 20PX;
  .el-checkbox__inner {
    // prettier-ignore
    width: 14PX;
    // prettier-ignore
    height: 14PX;
    &::after {
      // prettier-ignore
      height: 7PX;
      // prettier-ignore
      left: 4PX;
    }
  }
  .el-checkbox__label {
    font-size: @font14;
  }
}
.re-textarea {
  /deep/textarea {
    font-size: @font14;
  }
}
.file-btn {
  // prettier-ignore
  width: 70PX;
  // prettier-ignore
  height: 70PX;
  border: 1px solid #999;
  box-sizing: border-box;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  i {
    font-size: @font20;
  }
  input {
    display: none;
  }
}
.subMit-btn {
  display: block;
  width: fit-content;
  background: @backgroud;
  color: #fff;
  font-size: @font16;
  // prettier-ignore
  padding: 10PX 40PX;
  cursor: pointer;
  border: none;
  outline: none;
  // prettier-ignore
  margin: 0 auto 20PX;
  // prettier-ignore
  border-radius: 4PX;
}
.flex-warp {
  display: flex;
  flex-wrap: wrap;
}
</style>
<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners">
    <template>
      <div class="content">
        <!-- 房源信息 -->
        <div class="view-item">
          <div class="view-item-left">
            委托房源:
          </div>
          <div class="view-item-right">
            <div class="house-data">
              <img class="house-image" :src="houseImage" alt="" />
              <div class="house-data-message">
                <div class="house-message-title">
                  {{ houseData.Title | emptyRead }}
                </div>
                <div class="house-message-cell">
                  <div class="house-cell-left">
                    {{
                      houseData.tradePrice || houseData.Price | emptyRead("元")
                    }}
                  </div>
                  <span class="split-line"></span>
                  <div class="house-cell-right">
                    {{ houseData.averagePrice | emptyRead("元/平") }}
                  </div>
                </div>
                <div class="house-message-cell">
                  <div class="house-cell-left">
                    {{ houseData.InArea | emptyRead("㎡") }}
                  </div>
                  <div class="split-line"></div>
                  <div class="house-cell-right">{{ houseType }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 面访对象 -->
        <div class="view-item">
          <div class="view-item-left is-require is-center marg5">
            面访对象:
          </div>
          <div class="view-item-right">
            <label class="radio-item">
              <input
                type="radio"
                value="业主本人"
                v-model="form.interviewObject"
              />
              <span>业主本人</span>
            </label>
            <label class="radio-item">
              <input
                type="radio"
                value="业主家人"
                v-model="form.interviewObject"
              />
              <span>业主家人</span>
            </label>
            <label class="radio-item">
              <input
                type="radio"
                value="业主委托人"
                v-model="form.interviewObject"
              />
              <span>业主委托人</span>
            </label>
            <label class="radio-item">
              <input type="radio" value="租户" v-model="form.interviewObject" />
              <span>租户</span>
            </label>
            <label class="radio-item">
              <input type="radio" value="其他" v-model="form.interviewObject" />
              <span>其他</span>
            </label>
          </div>
        </div>
        <!-- 面访日期 -->
        <div class="view-item">
          <div class="view-item-left is-require is-center">
            面访日期:
          </div>
          <div class="view-item-right">
            <el-date-picker
              v-model="form.interviewTime"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </div>
        <!-- 面访地点 -->
        <div class="view-item">
          <div class="view-item-left is-require is-center">
            面访地点:
          </div>
          <div class="view-item-right is-center per-flex">
            <el-radio-group
              v-model="form.interviewPlace"
              class="re-radio"
              @change="placeChange"
            >
              <el-radio label="业主出售房屋内"></el-radio>
              <el-radio label="社区周边">社区周边</el-radio>
              <el-radio label="业主其他住所">业主其他住所</el-radio>
              <el-radio label="业主工作单位"></el-radio>
              <el-radio label="门店"></el-radio>
            </el-radio-group>
            <el-radio
              :label="true"
              v-model="interviewPlaceOther"
              @change="interviewPlaceOtherChange"
              >其他</el-radio
            >
            <input
              v-if="interviewPlaceOther"
              v-model="form.interviewPlace"
              type="text"
              placeholder="请补充"
              class="inline-input"
            />
          </div>
        </div>
        <!-- 面访人 -->
        <div class="view-item">
          <div class="view-item-left  is-center">
            面访人:
          </div>
          <div class="view-item-right is-center per-flex">
            <div class="per-msg">
              钟丽娟(万达一店)
            </div>
            <div class="per-msg">
              15280398053
            </div>
            <div class="input-content">
              陪同人 :<input
                type="text"
                placeholder="请输入陪同人"
                class="inline-input"
              />
            </div>
          </div>
        </div>
        <!-- 面访目的 -->
        <div class="view-item">
          <div class="view-item-left  is-center is-require">
            面访目的:
          </div>
          <div class="view-item-right is-center per-flex">
            <div class="flex-warp">
              <el-checkbox-group v-model="form.interviewGoal">
                <el-checkbox label="新增房源首次面访"></el-checkbox>
                <el-checkbox label="价格沟通"></el-checkbox>
                <el-checkbox label="带看回访"></el-checkbox>
                <el-checkbox label="客户约谈"></el-checkbox>
                <el-checkbox label="情感维护"></el-checkbox>
              </el-checkbox-group>
              <el-checkbox
                v-model="interviewGoalOther"
                @change="interviewGoalOtherChange"
                >其他</el-checkbox
              >
            </div>
            <input
              v-if="interviewGoalOther"
              type="text"
              placeholder="请补充"
              class="inline-input"
              v-model="interviewGoalOtherValue"
            />
          </div>
        </div>
        <!-- 面访结果 -->
        <div class="view-item">
          <div class="view-item-left  is-center is-require">
            面访结果:
          </div>
          <div class="view-item-right is-center per-flex">
            <div class="flex-warp">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="业主调教"></el-checkbox>
                <el-checkbox label="收取房源证件"></el-checkbox>
                <el-checkbox label="签署委托协议"></el-checkbox>
                <el-checkbox label="签署独家"></el-checkbox>
                <el-checkbox label="获得客户转介"></el-checkbox>
                <el-checkbox label="收取钥匙"></el-checkbox>
              </el-checkbox-group>
              <el-checkbox
                label="其他"
                v-model="interviewResultOhter"
                @change="interviewResultOhterChange"
              ></el-checkbox>
            </div>
            <input
              v-if="interviewResultOhter"
              type="text"
              placeholder="请补充"
              class="inline-input"
              v-model="interviewResultOhterValue"
            />
          </div>
        </div>
        <!-- 面访总结 -->
        <div class="view-item">
          <div class="view-item-left  is-require">
            面访总结:
          </div>
          <div class="view-item-right">
            <el-input
              class="re-textarea"
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea"
              resize="none"
              :autosize="{ minRows: 4, maxRows: 6 }"
            />
          </div>
        </div>
        <!-- 上传附件 -->
        <div class="view-item">
          <div class="view-item-left">
            上传附件:
          </div>
          <div class="view-item-right">
            <label class="file-btn">
              <i class="el-icon-folder-add"></i>
              <input type="file" />
            </label>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:floot>
      <button class="subMit-btn">提交</button>
    </template>
  </fixedPopup>
</template>

<script>
import { mapState } from "vuex";
import { SMALLThumb } from "@/util/constMap";

export default {
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id,
      houseData: state => state.houseDateil.houseData
    }),
    houseType() {
      let { Rooms, hall, toilet, balcony } = this.houseData;
      return `${Rooms || 0}-${hall || 0}-${toilet || 0}-${balcony || 0}`;
    },
    houseImage() {
      if (this.houseData.saleUploadPicDtoList.length == 0) {
        return this.$options.filters.defaultImg();
      }
      return this.houseData.saleUploadPicDtoList[0].picUrl + SMALLThumb;
    }
  },
  data() {
    return {
      form: {
        interviewObject: "", //面访对象
        interviewTime: [], //面访日期
        interviewPlace: "", //面访地点
        interviewGoal: [], //面访目的
        interviewResult: [] //面访结果
      },
      interviewPlaceOther: false, //面访地点其他
      interviewGoalOther: false, //面访目的其他
      interviewGoalOtherValue: "", //面访目的其他Input
      interviewResultOhter: false, //面访结果其他
      interviewResultOhterValue: "", //面访结果其他Input
      textarea: "",
      radio: "",
      checkList: [],
      value2: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              picker.$emit("pick", [
                date.getTime() - 3600 * 1000 * 24,
                date.getTime() - 3600 * 1000 * 24
              ]);
            }
          }
        ]
      }
    };
  },
  methods: {
    /**
     * @example: 面访地点RadioChange
     */
    placeChange() {
      this.interviewPlaceOther = false;
    },
    /**
     * @example:
     */
    interviewPlaceOtherChange() {
      this.form.interviewPlace = "";
    },
    /**
     * @example: 面访目的其他change
     */
    interviewGoalOtherChange(item) {
      if (!item) {
        this.interviewGoalOtherValue = "";
      }
    },
    /**
     * @example: 面访结果其他change
     */
    interviewResultOhterChange(item) {
      if (!item) {
        this.interviewResultOhterValue = "";
      }
    }
  }
};
</script>
