<style lang="less" scoped>
.query-warp {
  padding-left: 20px;
  position: relative;
}
.page-form-inline {
  display: flex;
  //margin-top: 20px;
  margin-bottom: 50px;
  /deep/.el-form-item__content {
    margin-left: 105px !important;
  }
  &.form-item-flex1 {
    .el-form-item {
      flex: 1;
    }
  }
  .page-label-center {
    /deep/.el-form-item__label {
      width: 90px !important;
    }
    /deep/.el-form-item__content {
      margin-left: 90px !important;
    }
    /deep/ label {
      text-align: center;
    }
  }
  /deep/.el-input-group__append {
    color: #606266;
    background: none;
    border: none;
  }
  //   &::after {
  //     content: attr(data-tips);
  //     line-height: 40px;
  //     font-size: 14px;
  //     margin-left: 20px;
  //     color: #606266;
  //     overflow: hidden;
  //     white-space: nowrap;
  //     text-overflow: ellipsis;
  //   }
}
.page-form-tips {
  height: 50px;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 20px;
  //line-height: 50px;
  display: table-cell;
  vertical-align: middle;
}
.dividingLine {
  height: 1px;
  background: #c0c4cc;
  width: 10px;
  align-self: center;
  margin: 0 10px 20px;
}
/deep/.is-bordered {
  margin-left: 0 !important;
}
.marLeft20 {
  margin-left: 15px;
  flex-shrink: 0;
  width: 140px;
  /deep/.el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
  }
}
.select-input {
  display: flex;
  margin-bottom: 20px;
  .select-input-set {
    display: flex;
    align-items: center;
    flex: 1;
    border: 2px solid var(--color--primary);
    height: 45px;
    box-sizing: border-box;
    box-shadow: inset 0 0 7px var(--color--primary);
    .el-icon-search {
      font-size: 26px;
      margin: 0 10px;
      color: #c3c3c3;
    }
    .select-input-sub {
      outline: none;
      border: none;
      font-size: 18px;
      flex: 1;
      background: inherit;
      &::-webkit-input-placeholder {
        color: #c3c3c3;
      }
    }
  }
  .select-but-sub {
    background: var(--color--primary);
    width: 175px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 18px;
    justify-content: center;
    cursor: pointer;
  }
  .select-but-reset {
    margin-left: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    width: 115px;
    border: 2px solid var(--color--primary);
    cursor: pointer;
    .reset-icon {
      color: inherit;
      font-size: 20px;
      margin: 0 10px;
    }
    .select-but-reset-title {
      font-size: 18px;
      color: inherit;
      white-space: nowrap;
    }
  }
}
.merge-tooltip {
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, -15px);
}
/deep/.vue-slider-dot-tooltip-inner {
  border-color: var(--color--primary);
  background-color: var(--color--primary);
}
/deep/.vue-slider-dot {
  width: 25px !important;
  height: 25px !important;
}
/deep/.vue-slider-process {
  background-color: var(--color--primary);
}
/deep/.vue-slider-ltr {
  height: 8px !important;
  .vue-slider-mark {
    width: 8px !important;
    .vue-slider-mark-step {
      background: #fff;
    }
  }
  .vue-slider-rail {
    .vue-slider-marks {
      background-color: var(--color--primary);
      opacity: 0.4;
    }
  }
}
.tooltipsItem {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 50%;
  color: var(--color--primary);
  text-align: center;
  line-height: 21px;
  border: 2px solid var(--color--primary);
  box-sizing: border-box;
  font-weight: 600;
}
.vue-slider-index1 {
  /deep/.vue-slider-rail {
    z-index: 10;
  }
}
.vue-slider-index2 {
  /deep/.vue-slider-rail {
    z-index: 12;
  }
}
.checkbox-flex {
  display: flex;
  flex-wrap: wrap;
  margin: 0px -15px 0;
  .checkbox-flex-pad {
    width: 16.666%;
    //margin-bottom: 15px;
    padding: 0 15px;
    box-sizing: border-box;
    line-height: normal;
    margin-bottom: 10px;
    /deep/.el-checkbox__input {
      width: 0 !important;
      height: 0 !important;
      overflow: hidden;
    }
    /deep/.el-checkbox__label {
      padding-left: 0 !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      text-align: center;
      vertical-align: middle;
      font-size: 15px;
    }
    .is-checked {
      background: var(--color--primary);
      /deep/.el-checkbox__label {
        color: #fff;
      }
    }
    .el-checkbox {
      margin-right: 0 !important;
      transition: all 0.2s ease-in;
      width: 100%;
    }
  }
}
.budingMarinSet {
  margin-bottom: 0;
  margin-top: 30px;
  /deep/.el-form-item__label {
    margin-right: 0 !important;
    //width: 105px !important;
  }
  /deep/.el-input__inner {
    border-radius: 0;
  }
  /deep/.el-form-item {
    margin-bottom: 50px;
  }
}
.marginBotEmp {
  margin-bottom: 0;
}
.ohter-item {
  /deep/.el-form-item__content {
    margin-left: 0 !important;
  }
  /deep/.select-input {
    .marginBotEmp !important;
  }
}
/deep/.el-form-item {
  .el-form-item__label {
    font-size: 15px;
    text-align: justify;
    line-height: 40px;
    height: 40px;
    overflow: hidden;
    margin-right: 16px;
    padding-right: 0;
    &:after {
      display: inline-block;
      width: 100%;
      height: 0;
      content: "";
    }
  }
}
.frist-width-select {
  width: 180px;
}
/deep/.el-form-item__label {
  width: 75px;
}
.custom-set {
  flex-direction: column;
  .custom-content {
    display: flex;
    align-self: center;
    margin-top: 20px;
    margin-left: 105px;
    .split-line {
      width: 40px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        height: 2px;
        width: 20px;
        transform: translate(-50%, -50%);
        background: #ddd;
      }
    }
    /deep/.el-input {
      width: 140px;
      height: 30px;
      line-height: 30px;
      i {
        line-height: inherit;
      }
      .el-input__inner {
        line-height: inherit;
        height: inherit;
        text-align: center;
      }
    }
  }
}
</style>
<template>
  <div class="query-warp">
    <el-form
      ref="form"
      @submit.native.prevent
      :model="form"
      label-position="left"
    >
      <el-form-item prop="type" class="ohter-item">
        <div class="select-input">
          <div class="select-input-set">
            <i class="el-icon-search"></i>
            <input
              data-anchor="首页搜索房源"
              type="text"
              class="select-input-sub anchor-point"
              placeholder="请输入楼盘名称或房源编号"
              v-model="searchData"
            />
          </div>
          <div
            class="select-but-sub anchor-point"
            @click="search"
            data-anchor="首页开始搜索按钮"
          >
            开始搜索
          </div>
          <div
            class="select-but-reset anchor-point"
            data-anchor="首页重置按钮"
            @click="resetForm('form')"
          >
            <i class="el-icon-refresh reset-icon"></i>
            <span class="select-but-reset-title">重置</span>
          </div>
        </div>
      </el-form-item>
      <!-- 楼盘 -->
      <div class="page-form-inline budingMarinSet">
        <el-form-item label="楼盘名称" prop="comId">
          <el-select
            data-anchor="首页选择楼盘"
            class="frist-width-select anchor-point"
            v-model="form.comId"
            @focus="remoteInput"
            @change="queryCBId"
            filterable
            remote
            clearable
            placeholder="请输入楼盘进行搜索"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="栋座" prop="cbId" class="page-label-center">
          <el-select
            data-anchor="首页选择栋座"
            v-model="form.cbId"
            filterable
            clearable
            class="anchor-point"
            placeholder="请选择楼栋"
            @change="queryRoomNo"
            @focus="queryCBId"
          >
            <el-option
              v-for="item in cbIdList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="房间号"
          prop="roomNo"
          clearable
          class="page-label-center"
        >
          <el-select
            data-anchor="首页选择房间号"
            v-model="form.roomNo"
            @change="queryRoomNumber"
            filterable
            class="anchor-point"
            placeholder="请选择房间号"
          >
            <el-option
              v-for="item in roomNoList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- 售价 -->
      <div class="page-form-inline form-item-flex1 custom-set">
        <el-form-item label="售价">
          <vue-slider
            v-model="Slider.priceSlider"
            :data="[
              '20',
              '60',
              '80',
              '100',
              '120',
              '140',
              '200',
              '300',
              '9999'
            ]"
            :marks="priceSliderMarks"
            tooltip="none"
            :lazy="true"
            @change="priceSliderChange"
            :contained="true"
          >
            <template v-slot:process="{ start, end, style, index }">
              <div class="vue-slider-process" :style="style">
                <div
                  v-show="end != 0"
                  :class="[
                    'merge-tooltip',
                    'vue-slider-dot-tooltip-inner',
                    'vue-slider-dot-tooltip-inner-top'
                  ]"
                >
                  {{ Slider.priceSlider[index] }}￥ -
                  {{
                    Slider.priceSlider[index + 1] == "9999"
                      ? "无限"
                      : Slider.priceSlider[index + 1]
                  }}￥
                </div>
              </div>
            </template>
            <template v-slot:dot>
              <div class="tooltipsItem anchor-point" data-anchor="首页售价">
                ￥
              </div>
            </template>
          </vue-slider>
        </el-form-item>
        <div class="custom-content">
          <el-input
            v-number
            placeholder="最小售价(万)"
            clearable
            class="anchor-point"
            data-anchor="首页最小售价输入框"
            @change="maxChange('custom', '最大售价', 'Price')"
            v-model="custom.minPrice"
          ></el-input>
          <div class="split-line"></div>

          <el-input
            v-number
            class="anchor-point"
            placeholder="最大售价(万)"
            data-anchor="首页最大售价输入框"
            @change="maxChange('custom', '最大售价', 'Price')"
            clearable
            v-model="custom.maxPrice"
          ></el-input>
        </div>
      </div>
      <!-- 首付 -->
      <div class="page-form-inline form-item-flex1 custom-set" v-if="false">
        <el-form-item label="首付">
          <vue-slider
            v-model="Slider.downPaymentSlider"
            :data="['6', '18', '24', '30', '36', '42', '60', '90', '9999']"
            :marks="downPaymentSliderMarks"
            tooltip="none"
            :lazy="true"
            @change="downPaymentSliderChange"
            :contained="true"
          >
            <template v-slot:process="{ start, end, style, index }">
              <div class="vue-slider-process" :style="style">
                <div
                  v-show="end != 0"
                  :class="[
                    'merge-tooltip',
                    'vue-slider-dot-tooltip-inner',
                    'vue-slider-dot-tooltip-inner-top'
                  ]"
                >
                  {{ Slider.downPaymentSlider[index] }}￥ -
                  {{
                    Slider.downPaymentSlider[index + 1] == "9999"
                      ? "无限"
                      : Slider.downPaymentSlider[index + 1]
                  }}￥
                </div>
              </div>
            </template>
            <template v-slot:dot>
              <div class="tooltipsItem anchor-point" data-anchor="首页首付">
                ￥
              </div>
            </template>
          </vue-slider>
        </el-form-item>
        <div class="custom-content">
          <el-input
            data-anchor="首页最小售价输入框"
            v-number
            class="anchor-point"
            placeholder="最小首付(万)"
            clearable
            @change="maxChange('custom', '最大售价', 'DownPayment')"
            v-model="custom.minDownPayment"
          ></el-input>
          <div class="split-line"></div>

          <el-input
            data-anchor="首页最大首付输入框"
            v-number
            class="anchor-point"
            placeholder="最大首付(万)"
            @change="maxChange('custom', '最大售价', 'DownPayment')"
            clearable
            v-model="custom.maxDownPayment"
          ></el-input>
        </div>
      </div>
      <div class="page-form-inline form-item-flex1 custom-set">
        <el-form-item label="面积">
          <vue-slider
            class="vue-slider-index1"
            v-model="Slider.areaSlider"
            :data="[
              '20',
              '60',
              '80',
              '100',
              '120',
              '140',
              '200',
              '300',
              '9999'
            ]"
            :marks="areaSliderMarks"
            tooltip="none"
            :lazy="true"
            @change="areaSliderChange"
            :contained="true"
          >
            <template v-slot:process="{ start, end, style, index }">
              <div class="vue-slider-process" :style="style">
                <div
                  v-show="end != 0"
                  :class="[
                    'merge-tooltip',
                    'vue-slider-dot-tooltip-inner',
                    'vue-slider-dot-tooltip-inner-top'
                  ]"
                >
                  {{ Slider.areaSlider[index] }}㎡ -
                  {{
                    Slider.areaSlider[index + 1] == "9999"
                      ? "无限"
                      : Slider.areaSlider[index + 1]
                  }}㎡
                </div>
              </div>
            </template>
            <template v-slot:dot>
              <div class="tooltipsItem anchor-point" data-anchor="首页面积拖拉">
                ㎡
              </div>
            </template>
          </vue-slider>
        </el-form-item>
        <div class="custom-content">
          <el-input
            data-anchor="首页最小面积输入框"
            class="anchor-point"
            v-number
            placeholder="最小面积(㎡)"
            clearable
            @change="maxChange('custom', '最大面积', 'InArea')"
            v-model="custom.minInArea"
          ></el-input>
          <div class="split-line"></div>
          <el-input
            data-anchor="首页最大面积输入框"
            class="anchor-point"
            v-number
            placeholder="最大面积(㎡)"
            @change="maxChange('custom', '最大面积', 'InArea')"
            clearable
            v-model="custom.maxInArea"
          ></el-input>
        </div>
      </div>
      <!-- 楼层 -->
      <div class="page-form-inline form-item-flex1 custom-set">
        <el-form-item label="楼层">
          <vue-slider
            class="vue-slider-index2"
            v-model="Slider.flootSlider"
            :data="['-2', '5', '10', '15', '20', '25', '30', '40', '9999']"
            :marks="flootSliderMarks"
            tooltip="none"
            :lazy="true"
            :contained="true"
            @change="flootSliderChange"
          >
            <template v-slot:process="{ start, end, style, index }">
              <div class="vue-slider-process" :style="style">
                <div
                  v-show="end != 0"
                  :class="[
                    'merge-tooltip',
                    'vue-slider-dot-tooltip-inner',
                    'vue-slider-dot-tooltip-inner-top'
                  ]"
                >
                  {{ Slider.flootSlider[index] }}层 -
                  {{
                    Slider.flootSlider[index + 1] == "9999"
                      ? "无限"
                      : Slider.flootSlider[index + 1]
                  }}层
                </div>
              </div>
            </template>
            <template v-slot:dot>
              <div
                class="tooltipsItem iconxuanzelouceng iconfont anchor-point"
                data-anchor="首页楼层筛选"
              ></div>
            </template>
          </vue-slider>
        </el-form-item>
        <div class="custom-content">
          <el-input
            data-anchor="首页最小楼层输入框"
            class="anchor-point"
            v-number
            placeholder="最小楼层(层)"
            clearable
            @change="maxChange('custom', '最大楼层', 'Floor')"
            v-model="custom.minFloor"
          ></el-input>
          <div class="split-line"></div>
          <el-input
            data-anchor="首页最大楼层输入框"
            class="anchor-point"
            v-number
            placeholder="最大楼层(层)"
            @change="maxChange('custom', '最大楼层', 'Floor')"
            clearable
            v-model="custom.maxFloor"
          ></el-input>
        </div>
      </div>
      <el-form-item label="商圈" prop="business">
        <el-checkbox-group
          class="checkbox-flex"
          v-model="form.business"
          size="small"
        >
          <div
            :data-anchor="'首页商圈:' + item.name"
            v-for="(item, index) in businessList"
            :key="index"
            class="checkbox-flex-pad anchor-point"
          >
            <el-tooltip
              :data-anchor="'首页商圈:' + item.name"
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox
                :label="item.value"
                name="business"
                border
                :data-anchor="'首页商圈:' + item.name"
                >{{ item.name }}</el-checkbox
              >
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="房型" prop="houseType">
        <el-checkbox-group
          v-model="form.houseType"
          class="checkbox-flex"
          size="small"
        >
          <div
            :data-anchor="'首页房型:' + item.name"
            v-for="(item, index) in houseTypeList"
            :key="index"
            class="checkbox-flex-pad anchor-point"
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox :label="item.value" name="houseType" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="装修" prop="renovation">
        <el-checkbox-group
          v-model="form.renovation"
          class="checkbox-flex"
          size="small"
        >
          <div
            :data-anchor="'首页装修:' + item.name"
            v-for="(item, index) in renovationList"
            :key="index"
            class="checkbox-flex-pad anchor-point"
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox :label="item.value" name="renovation" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="房源用途" prop="purpose">
        <el-checkbox-group
          v-model="form.purpose"
          class="checkbox-flex"
          size="small"
        >
          <div
            :data-anchor="'首页房源用途:' + item.name"
            class="checkbox-flex-pad anchor-point"
            v-for="(item, index) in purposeList"
            :key="index"
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox :label="item.value" name="purpose" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="朝向" prop="face">
        <el-checkbox-group
          v-model="form.face"
          class="checkbox-flex"
          size="small"
        >
          <div
            :data-anchor="'首页朝向:' + item.name"
            v-for="(item, index) in faceList"
            :key="index"
            class="checkbox-flex-pad anchor-point"
          >
            <el-tooltip
              :content="item.name"
              :disabled="item.name.length < 4"
              placement="top"
            >
              <el-checkbox :label="item.value" name="face" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="小学划片" prop="primarySchool">
        <el-checkbox-group
          v-model="form.primarySchool"
          class="checkbox-flex"
          size="small"
        >
          <div
            :data-anchor="'首页小学划片:' + item.name"
            v-for="(item, index) in MathPrimarySchoolListfirst"
            :key="index"
            class="checkbox-flex-pad anchor-point"
          >
            <el-tooltip :content="item.name" placement="top">
              <el-checkbox :label="item.value" name="primarySchool" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
          <div
            class="checkbox-flex-pad anchor-point"
            data-anchor="首页小学划片 更多按钮"
          >
            <el-button
              data-anchor="首页小学划片 更多按钮"
              type="text"
              @click="triggerSchoolSizeFlag('PrimarySizeFlag')"
              >{{ PrimarySizeFlag ? "收起" : "更多" }}</el-button
            >
          </div>
        </el-checkbox-group>
        <div class="marLeft20"></div>
      </el-form-item>
      <el-form-item label="中学划片" prop="middleSchool">
        <el-checkbox-group
          v-model="form.middleSchool"
          class="checkbox-flex"
          size="small"
        >
          <div
            :data-anchor="'首页中学划片:' + item.name"
            v-for="(item, index) in MathMiddleSchoolListfirst"
            :key="index"
            class="checkbox-flex-pad anchor-point"
          >
            <el-tooltip :content="item.name" placement="top">
              <el-checkbox :label="item.value" name="middleSchool" border>{{
                item.name
              }}</el-checkbox>
            </el-tooltip>
          </div>
          <div
            class="checkbox-flex-pad anchor-point"
            data-anchor="首页中学划片 更多按钮"
          >
            <el-button
              class="anchor-point"
              data-anchor="首页中学划片 更多按钮"
              type="text"
              @click="triggerSchoolSizeFlag('middleSizeFlag')"
              >{{ middleSizeFlag ? "收起" : "更多" }}</el-button
            >
          </div>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const areaSliderMarks = {
  "20": "20㎡",
  "60": "60㎡",
  "80": "80㎡",
  "100": "100㎡",
  "120": "120㎡",
  "140": "140㎡",
  "200": "200㎡",
  "300": "300㎡",
  "9999": "∞"
};
const priceSliderMarks = {
  "20": "20万",
  "60": "60万",
  "80": "80万",
  "100": "100万",
  "120": "120万",
  "140": "140万",
  "200": "200万",
  "300": "300万",
  "9999": "∞"
};
const downPaymentSliderMarks = {
  "6": "6万",
  "18": "18万",
  "24": "24万",
  "30": "30万",
  "36": "36万",
  "42": "42万",
  "60": "60万",
  "90": "90万",
  "9999": "∞"
};
const flootSliderMarks = {
  "-2": "-2层",
  "5": "5层",
  "10": "10层",
  "15": "15层",
  "20": "20层",
  "25": "25层",
  "30": "30层",
  "40": "40层",
  "9999": "∞"
};
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  name: "houseResultList",
  inject: ["form", "Slider"],
  components: {
    VueSlider
  },
  computed: {
    MathPrimarySchoolListfirst() {
      let sliceSize = [0, 11];
      if (this.PrimarySizeFlag) {
        sliceSize = [0, this.primarySchoolList.length - 1];
      }
      return this.primarySchoolList.slice(...sliceSize);
    },
    MathMiddleSchoolListfirst() {
      let sliceSize = [0, 11];
      if (this.middleSizeFlag) {
        sliceSize = [0, this.middleSchoolList.length - 1];
      }
      return this.middleSchoolList.slice(...sliceSize);
    }
  },
  data() {
    return {
      custom: {
        // 自定义
        minPrice: "",
        maxPrice: "",
        minInArea: "",
        maxInArea: "",
        minFloor: "",
        maxFloor: "",
        maxDownPayment: "",
        minDownPayment: ""
      },
      PrimarySizeFlag: false,
      middleSizeFlag: false,
      searchData: "",
      areaSliderMarks: areaSliderMarks,
      priceSliderMarks: priceSliderMarks,
      flootSliderMarks: flootSliderMarks,
      downPaymentSliderMarks: downPaymentSliderMarks,
      primarySchoolInput: "",
      middleSchoolInput: "",
      businessList: [],
      houseTypeList: [],
      renovationList: [],
      purposeList: [],
      orientationList: [],
      primarySchoolList: [],
      middleSchoolList: [],
      faceList: [],
      options: [],
      cbIdList: [],
      roomNoList: [],
      loading: false,
      downPaymentPercent: 0.3 //首付的百分比
    };
  },
  mounted() {
    //商圈
    this.queryConstant("Region").then(e => {
      this.businessList = e;
    });
    //朝向
    this.queryConstant("face").then(e => {
      this.faceList = e;
    });
    //小学
    this.queryConstant("PrimarySchool").then(e => {
      this.primarySchoolList = e;
    });

    //中学
    this.queryConstant("MiddleSchool").then(e => {
      this.middleSchoolList = e;
    });

    //房型
    this.queryConstant("Rooms").then(e => {
      this.houseTypeList = e;
    });

    //装修
    this.queryConstant("Renovation").then(e => {
      this.renovationList = e;
    });

    //用途
    this.queryConstant("Purpose").then(e => {
      this.purposeList = e;
    });
  },

  methods: {
    //自定义面积 价格 售价 change监听
    maxChange(topFiled, msg, field) {
      let min = this[topFiled]["min" + field];
      let max = this[topFiled]["max" + field];

      //输入时把滑块数据清空
      switch (field) {
        case "Price":
          this.Slider.priceSlider = [20, 20];
          break;
        case "DownPayment":
          this.Slider.downPaymentSlider = [6, 6];
          //首付等于总价的3分之1
          min = min != "" ? min / this.downPaymentPercent : "";
          max = max != "" ? max / this.downPaymentPercent : "";
          break;
        case "InArea":
          this.Slider.areaSlider = [20, 20];
          break;
        case "Floor":
          this.Slider.flootSlider = [-2, -2];
          break;
      }

      if (max == "") {
        this.form["min" + field] = min;
        this.form["max" + field] = "9999";
        return;
      } else if (min == "") {
        this.form["min" + field] = 0;
        this.form["max" + field] = max;
        return;
      }
      if (min != "" && max != "" && parseInt(min) > parseInt(max)) {
        this.$message.warning("不能大于" + msg);
        return;
      }
      this.form["min" + field] = min;
      this.form["max" + field] = max;
    },
    triggerSchoolSizeFlag(value) {
      this[value] = !this[value];
    },
    //滑块参数更新
    flootSliderChange(e) {
      if (e[0] == -2 && e[1] == -2) {
        this.form.minFloor = "";
        this.form.maxFloor = "";
      } else {
        this.form.minFloor = e[0];
        this.form.maxFloor = e[1];
      }
      //清空自定义数据
      this.custom.minFloor = "";
      this.custom.maxFloor = "";
    },
    //滑块参数更新
    areaSliderChange(e) {
      if (e[0] == 20 && e[1] == 20) {
        this.form.minInArea = "";
        this.form.maxInArea = "";
      } else {
        this.form.minInArea = e[0];
        this.form.maxInArea = e[1];
      }
      //清空自定义数据
      this.custom.minInArea = "";
      this.custom.maxInArea = "";
    },
    //售价滑块参数更新
    priceSliderChange(e) {
      if (e[0] == 20 && e[1] == 20) {
        this.form.minPrice = "";
        this.form.maxPrice = "";
      } else {
        this.form.minPrice = e[0];
        this.form.maxPrice = e[1];
      }
      //清空自定义数据
      this.custom.minPrice = "";
      this.custom.maxPrice = "";
    },
    //首付滑块参数更新
    downPaymentSliderChange(e) {
      if (e[0] == 6 && e[1] == 6) {
        this.form.minDownPayment = "";
        this.form.maxDownPayment = "";
      } else {
        this.form.minDownPayment = e[0] / this.downPaymentPercent;
        this.form.maxDownPayment = e[1] / this.downPaymentPercent;
      }
      //清空自定义数据
      this.custom.minDownPayment = "";
      this.custom.maxDownPayment = "";
    },
    //重置表单
    resetForm(formName) {
      this.searchData = "";
      this.$parent.setSelectNav(null, true);
      Object.assign(this.$parent.$data.form, this.$parent.$options.data().form);
      Object.assign(this.$data.custom, this.$options.data().custom);
      this.Slider.priceSlider = [20, 20];
      this.Slider.areaSlider = [20, 20];
      this.Slider.flootSlider = [-2, -2];
      this.searchData = "";
    },
    addInputToList(toList, inputName) {
      let findFlag = this.form[toList].some(item => {
        return item == this[inputName];
      });
      if (!findFlag) {
        this[toList + "List"].push(this[inputName]);
        this.form[toList].push(this[inputName]);
      } else {
        this.$message({
          message: "您已经添加过了哦~",
          type: "warning"
        });
        this[inputName] = "";
      }
    },

    queryConstant(constant) {
      return this.$api
        .get({
          url: "/mateHouse/queryConstant",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            constant: constant
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            return e.data.data;
          }
        });
    },
    remoteInput() {
      var that = this;
      if (that.form.comId.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod(query) {
      var that = this;
      if (query !== "") {
        this.loading = true;

        this.$api
          .get({
            url: "/community/houseList",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              communityName: query
            }
          })
          .then(e => {
            console.log(e.data);
            if (e.data.code == 200) {
              that.loading = false;
              that.options = e.data.data.list;
            }
          });
      } else {
        this.options = [];
      }
    },
    queryCBId(name) {
      var that = this;
      if (name == "") {
        that.form.communityName = "";
        that.form.cbNo = "";
        that.form.roomNumber = "";
      }

      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.form.comId,
            limit: 1000
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.form.roomNo = "";
            that.form.cbId = "";
            that.cbIdList = e.data.data.list;
            console.log(name);
            if (name != "") {
              let resultArr = that.options.find(item => {
                return item.value === name;
              });
              that.form.communityName = resultArr.name;
              that.form.cbNo = "";
              that.form.roomNumber = "";
              console.log(that.form.communityName);
            }
          }
        });
    },
    queryRoomNo(name) {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHousesBySale",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.form.comId,
            cbId: that.form.cbId,
            limit: 1000
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.form.roomNo = "";
            let resultArr = that.cbIdList.find(item => {
              return item.value === name;
            });
            that.form.cbNo = resultArr.name;
            that.form.roomNumber = "";
            that.roomNoList = e.data.data.list;
          }
        });
    },
    queryRoomNumber(name) {
      let that = this;
      let resultArr = that.roomNoList.find(item => {
        return item.value === name;
      });
      that.form.roomNumber = resultArr.name;
    },
    search() {
      var that = this;
      that.form.searchInfo = that.searchData;
    },
    mateHouse() {
      var that = this;
      console.log(that.form);
      console.log(that.form.comId);
      that.$router.push({
        path: "/components/mateHouseList",
        query: { params: JSON.stringify(that.form) }
      });
    }
  }
};
</script>
