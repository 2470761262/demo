<template>
  <div>
    <div class="hous-conten mar-top">
      <!-- 期望总价 -->
      <div class="input-group">
        <div class="input-head">期望总价</div>
        <div class="input-group-split">
          <el-input
            placeholder="最小值"
            class="input-content is-suffix"
            v-model="data.minPrice"
            maxlength="7"
            data-vv-name="minPrice"
            data-vv-as="最小值"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-validate="'zero1'"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">万元</i>
            </template>
          </el-input>
          <div
            :class="{
              'after-error-tips': errorBags.has('minPrice')
            }"
            :data-error="errorBags.first('minPrice')"
          ></div>
          <i class="input-split"></i>
          <el-input
            placeholder="最大值"
            class="input-content is-suffix"
            v-model="data.maxPrice"
            maxlength="7"
            oninput="value=value.replace(/[^\d]/g,'')"
            data-vv-name="maxPrice"
            data-vv-as="最大值"
            v-validate="{
              zero1: true,
              isLess: [data.minPrice]
            }"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">万元</i>
            </template>
          </el-input>
          <div
            :class="{
              'after-error-tips': errorBags.has('maxPrice')
            }"
            :data-error="errorBags.first('maxPrice')"
          ></div>
        </div>
      </div>
      <!-- 首付预算 -->
      <div class="input-group">
        <div class="input-head">首付预算</div>
        <div class="input-group-split">
          <el-input
            placeholder="最小值"
            class="input-content is-suffix"
            v-model="data.minFirstPrice"
            maxlength="7"
            oninput="value=value.replace(/[^\d]/g,'')"
            data-vv-name="minFirstPrice"
            data-vv-as="最小值"
            v-validate="'zero1'"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">万元</i>
            </template>
          </el-input>
          <div
            :class="{
              'after-error-tips': errorBags.has('minFirstPrice')
            }"
            :data-error="errorBags.first('minFirstPrice')"
          ></div>
          <i class="input-split"></i>
          <el-input
            placeholder="最大值"
            class="input-content is-suffix"
            v-model="data.maxFirstPrice"
            maxlength="7"
            oninput="value=value.replace(/[^\d]/g,'')"
            data-vv-name="maxFirstPrice"
            data-vv-as="最大值"
            v-validate="{
              zero1: true,
              isLess: [data.minFirstPrice]
            }"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">万元</i>
            </template>
          </el-input>
          <div
            :class="{
              'after-error-tips': errorBags.has('maxFirstPrice')
            }"
            :data-error="errorBags.first('maxFirstPrice')"
          ></div>
        </div>
      </div>
      <!-- 期望单价 -->
      <div class="input-group" v-show="isShop || isOffice">
        <div class="input-head">期望单价</div>
        <div class="input-group-split">
          <el-input
            placeholder="最小值"
            class="input-content is-suffix"
            v-model="data.minUnitPrice"
            maxlength="7"
            oninput="value=value.replace(/[^\d]/g,'')"
            data-vv-name="minUnitPrice"
            data-vv-as="最小值"
            v-validate="'zero1'"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">元</i>
            </template>
          </el-input>
          <div
            :class="{
              'after-error-tips': errorBags.has('minUnitPrice')
            }"
            :data-error="errorBags.first('minUnitPrice')"
          ></div>
          <i class="input-split"></i>
          <el-input
            placeholder="最大值"
            class="input-content is-suffix"
            v-model="data.maxUnitPrice"
            maxlength="7"
            oninput="value=value.replace(/[^\d]/g,'')"
            data-vv-name="maxUnitPrice"
            data-vv-as="最大值"
            v-validate="{
              zero1: true,
              isLess: [data.minUnitPrice]
            }"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">元</i>
            </template>
          </el-input>
          <div
            :class="{
              'after-error-tips': errorBags.has('maxUnitPrice')
            }"
            :data-error="errorBags.first('maxUnitPrice')"
          ></div>
        </div>
      </div>
      <!-- 期望面积 -->
      <div class="input-group">
        <div class="input-head">期望面积</div>
        <div class="input-group-split">
          <el-input
            placeholder="最小值"
            class="input-content is-suffix"
            v-model="data.minArea"
            oninput="value = value.match(/^\d*(\.?\d{0,2})/g)[0]"
            data-vv-name="minArea"
            data-vv-as="最小值"
            v-validate="'noZero1'"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">㎡</i>
            </template>
          </el-input>
          <div
            :class="{
              'after-error-tips': errorBags.has('minArea')
            }"
            :data-error="errorBags.first('minArea')"
          ></div>
          <i class="input-split"></i>
          <el-input
            placeholder="最大值"
            class="input-content is-suffix"
            v-model="data.maxArea"
            oninput="value = value.match(/^\d*(\.?\d{0,2})/g)[0]"
            data-vv-name="maxArea"
            data-vv-as="最大值"
            v-validate="{
              noZero1: true,
              isLess: [data.minArea]
            }"
          >
            <template v-slot:suffix>
              <i class="suffix-tips">㎡</i>
            </template>
          </el-input>
          <div
            :class="{
              'after-error-tips': errorBags.has('maxArea')
            }"
            :data-error="errorBags.first('maxArea')"
          ></div>
        </div>
      </div>
      <!-- 购买房型 -->
      <div class="input-group" v-show="isResidence">
        <div class="input-head">购买房型</div>
        <el-checkbox-group v-model="data.roomsList">
          <el-checkbox-button
            v-for="item in houseTypeList"
            :label="item.value"
            :key="item.value"
            >{{ item.key }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <!-- 购买用途 -->
      <div class="input-group" v-show="isResidence">
        <div class="input-head">购买用途</div>
        <el-select
          v-model="data.buyDestination"
          popper-class="options-item"
          class="input-content"
          placeholder="请选择客户购买用途"
        >
          <el-option
            v-for="item in purchasepurpose"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 期望楼层 -->
      <div class="input-group" v-show="isResidence">
        <div class="input-head">期望楼层</div>
        <el-checkbox-group v-model="data.floors">
          <el-checkbox-button
            v-for="item in floorList"
            :label="item.value"
            :key="item.value"
            >{{ item.key }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <!-- 期望装修 -->
      <div class="input-group" v-show="isShop || isOffice">
        <div class="input-head">期望装修</div>
        <el-checkbox-group v-model="data.decorationList">
          <el-checkbox-button
            v-for="item in decorationList"
            :label="item.value"
            :key="item.value"
            >{{ item.value }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <!-- 商铺类型 -->
      <div class="input-group" v-show="isShop">
        <div class="input-head">商铺类型</div>
        <el-checkbox-group v-model="data.shopTypes">
          <el-checkbox-button
            v-for="item in shopTypeList"
            :label="item.key"
            :key="item.value"
            >{{ item.value }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <!-- 商铺用途 -->
      <div class="input-group" v-show="isShop">
        <div class="input-head">商铺用途</div>
        <el-checkbox-group v-model="data.shopUses">
          <el-checkbox-button
            v-for="item in shopUseList"
            :label="item.key"
            :key="item.value"
            >{{ item.value }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <!-- 附属设施 -->
      <div class="input-group" v-show="isShop">
        <div class="input-head">附属设施</div>
        <el-checkbox-group v-model="data.facilitys">
          <el-checkbox-button
            v-for="item in facilitiesList"
            :label="item.key"
            :key="item.value"
            >{{ item.value }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <!-- 其他需求 -->
      <div class="input-group" v-show="isShop">
        <div class="input-head">其他需求</div>
        <el-checkbox-group v-model="data.otherNeeds">
          <el-checkbox-button
            v-for="item in otherNeedList"
            :label="item.key"
            :key="item.value"
            >{{ item.value }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <!-- 楼栋需求 -->
      <div class="input-group" v-show="isOffice">
        <div class="input-head">楼栋需求</div>
        <el-checkbox-group v-model="data.buildingNeeds">
          <el-checkbox-button
            v-for="item in buildingNeedList"
            :label="item.key"
            :key="item.value"
            >{{ item.value }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <!-- 房间需求 -->
      <div class="input-group" v-show="isOffice">
        <div class="input-head">房间需求</div>
        <el-checkbox-group v-model="data.roomNeeds">
          <el-checkbox-button
            v-for="item in roomNeedList"
            :label="item.key"
            :key="item.value"
            >{{ item.value }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <!-- 付款方式 -->
      <div class="input-group">
        <div class="input-head">付款方式</div>
        <el-select
          v-model="data.payWay"
          popper-class="options-item"
          class="input-content"
          placeholder="请选择付款方式"
        >
          <el-option
            v-for="item in payWayList"
            :key="item.value"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </div>
    </div>
    <i class="split-step-content"></i>
    <section class="school-content" v-show="isResidence">
      <!-- 期望小学 -->
      <div class="input-group">
        <div class="input-head">期望小学</div>
        <el-select
          v-model="data.primarySchoolList"
          multiple
          :multiple-limit="3"
          filterable
          popper-class="options-item"
          class="input-content"
          placeholder="请选择客期望小学（多选）"
        >
          <el-option
            v-for="item in primarySchoolList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 期望中学 -->
      <div class="input-group">
        <div class="input-head">期望中学</div>
        <el-select
          v-model="data.middleSchoolList"
          multiple
          :multiple-limit="3"
          filterable
          popper-class="options-item"
          class="input-content"
          placeholder="请选择客期望中学（多选）"
        >
          <el-option
            v-for="item in middleSchoolList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 期望楼盘 -->
      <div class="input-group">
        <div class="input-head">期望楼盘</div>
        <el-select
          v-model="data.community"
          multiple
          filterable
          :multiple-limit="3"
          popper-class="options-item"
          class="input-content"
          placeholder="请选择客期望楼盘（多选）"
        >
          <el-option
            v-for="item in communityList"
            :key="item.value"
            :label="item.name"
            :value="item.name + ',' + item.value"
          ></el-option>
        </el-select>
      </div>
    </section>
  </div>
</template>

<script>
// 期望装修
const decorationList = [
  { value: "毛坯房" },
  { value: "简单装修" },
  { value: "精装修" }
];
// 商铺类型
const shopTypeList = [
  { value: "临街店面", key: 1 },
  { value: "写字楼配套", key: 2 },
  { value: "档口摊位", key: 4 },
  { value: "其他", key: 8 }
];
// 商铺用途
const shopUseList = [
  { value: "餐饮", key: 1 },
  { value: "休闲娱乐", key: 2 },
  { value: "生活服务", key: 4 },
  { value: "零售", key: 8 },
  { value: "批发", key: 16 },
  { value: "酒店宾馆", key: 32 },
  { value: "汽车服务", key: 64 },
  { value: "美容美发", key: 128 },
  { value: "其他", key: 256 }
];
// 附属设施
const facilitiesList = [
  { value: "可明火", key: 1 },
  { value: "可外摆", key: 2 },
  { value: "停车位", key: 4 },
  { value: "天然气", key: 8 },
  { value: "网络", key: 16 },
  { value: "中央空调", key: 32 },
  { value: "其他", key: 64 }
];
// 其他需求
const otherNeedList = [
  { value: "面积大", key: 1 },
  { value: "层高大", key: 2 },
  { value: "临街", key: 4 },
  { value: "空铺", key: 8 },
  { value: "其他", key: 16 }
];
// 楼栋需求
const buildingNeedList = [
  { value: "知名物业", key: 1 },
  { value: "带客梯", key: 2 },
  { value: "带货梯", key: 4 },
  { value: "其他", key: 8 }
];
// 房间需求
const roomNeedList = [
  { value: "可注册公司", key: 1 },
  { value: "有老板间", key: 2 },
  { value: "有会议室", key: 4 },
  { value: "带办公家具", key: 8 },
  { value: "带停车位", key: 16 },
  { value: "其他", key: 32 }
];
// 付款方式
const payWayList = [
  { value: "一次性", key: 1 },
  { value: "商业贷款", key: 2 },
  { value: "公积金贷款", key: 4 },
  { value: "组合贷款", key: 8 }
];
// 购买房型
const houseTypeList = [
  {
    key: "1房",
    value: "1房"
  },
  {
    key: "2房",
    value: "2房"
  },
  {
    key: "3房",
    value: "3房"
  },
  {
    key: "4房",
    value: "4房"
  },
  {
    key: "4房以上",
    value: "4房以上"
  }
];
// 期望楼层
const floorList = [
  {
    key: "低楼层",
    value: 1
  },
  {
    key: "中楼层",
    value: 2
  },
  {
    key: "高楼层",
    value: 4
  },
  {
    key: "不要一楼",
    value: 8
  },
  {
    key: "不要顶楼",
    value: 16
  }
];
import { PURCHASEPURPOSE, DECORATION } from "@/util/constMap";
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  data() {
    return {
      data: {
        requireType: this.requirement, //需求类型(位运算（多选）：1买二手住宅，2买二手商铺，4买二手写字楼， 8买新房住宅，16买新房商铺，32买新房写字楼，64租赁住宅，128租赁商铺，256租赁写字楼)
        buildingNeeds: [], //	楼栋需求-买或租写字楼（位运算（多选）：1知名物业，2带客梯、4带货梯、8其他）
        buyDestination: null, //购买用途,单选(刚需，投资，办公，改善，教育，其他)
        community1: "", //期望楼盘
        community1Id: null, //期望楼盘 CommunityTbl的ID
        decoration: "", //期望装修（毛坯，简单装修，精装修）
        decorationList: [], //期望装修列表
        facilitys: [], //附属设施（位运算（多选）：1可明火、2可外摆、4停车位、8天然气、16网络、32中央空调、64其他）
        floors: [], //期望楼层（位运算（多选）:1低楼层,2中楼层，4高楼层，8不要一楼,16不要顶楼）
        manageCompanyType: null, //物业类型-买新房（1普通住宅、2别墅、4商铺、8写字楼、16其他）
        maxArea: null, //期望最大面积
        minArea: null, //期望最小面积
        maxFirstPrice: null, //期望首付最高价格
        minFirstPrice: null, //期望首付最低价格
        maxPrice: null, //期望最高价格
        minPrice: null, //期望最低价格
        maxUnitPrice: null, //期望最高单价
        minUnitPrice: null, //期望最低单价
        primarySchool: "", //期望小学，中文，最多三个（多个以$隔开）
        middleSchool: "", //期望中学，中文，最多三个（多个以$隔开）
        primarySchoolList: "", //期望小学列表
        middleSchoolList: "", //期望中学列表
        moveIntoTime: "", //入住日期-租赁住宅（年月日）
        otherNeeds: [], //其他需求-买或租商铺（位运算（多选）：1面积大、2层高大、4临街、5空铺、6其他）
        payMethod: null, //付款方式（1月付、2季付、3半年付、4年付、0不限）
        payWay: null, //付款方式，单选（1一次性,2商业贷款,4公积金贷款,8组合贷款）
        rentWay: null, //租赁方式（1合租、2整租、0不限）
        roomNeeds: [], //房间需求-买或租写字楼（位运算（多选）：1可注册公司、2有老板间、4有会议室、8带办公家具、16带停车位、32其他）
        rooms: [], //购买房型（多个以$隔开，如1房$2房$3房$4房及以上）
        roomsList: [], //购买房型列表
        shopTypes: [], //商铺类型-买或租商铺（位运算（多选）：1临街店面、2写字楼配套、4写字楼配套、8档口摊位、16其他）
        shopUses: [], //商铺用途-买或租商铺（位运算（多选）：1餐饮、2休闲娱乐、4生活服务、8零售、16批发、32酒店宾馆、64汽车服务、128美容美发、256其他）
        tradeHouseType: null, //交房类型-买新房（0不限，1期房，2现房）
        community: "", //期望楼盘列表
        businessCircle: "", //期望商圈（多个以$隔开）
        businessCircleList: "" //期望商圈列表
      },
      checkboxGroup2: [],
      purchasepurpose: PURCHASEPURPOSE,
      decorationList: decorationList,
      shopTypeList: shopTypeList,
      shopUseList: shopUseList,
      facilitiesList: facilitiesList,
      otherNeedList: otherNeedList,
      buildingNeedList: buildingNeedList,
      roomNeedList: roomNeedList,
      payWayList: payWayList,
      houseTypeList: houseTypeList,
      floorList: floorList,
      // 期望楼盘
      communityList: this.$store.state.addCustomers.communityList,
      // 期望小学
      primarySchoolList: this.$store.state.addCustomers.primarySchoolList,
      //期望中学
      middleSchoolList: this.$store.state.addCustomers.middleSchoolList
    };
  },
  props: ["requirement"],
  computed: {
    isResidence() {
      return this.requirement == 1;
    },
    isShop() {
      return this.requirement == 2;
    },
    isOffice() {
      return this.requirement == 4;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../less/form.less";
.step-content();
.hous-conten {
  background: #fff;
  padding: 0 24px 24px 24px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.mar-top {
  margin-top: -16px;
}
.school-content {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
}
.after-error-tips {
  position: relative;
  &::after {
    content: attr(data-error);
    width: 200px;
    color: #f33a3a;
    //prettier-ignore
    font-size: 12PX;
    left: -230px;
    bottom: -0.3rem;
    position: absolute;
    transform: translateY(100%);
  }
}
</style>
