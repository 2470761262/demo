<style lang="less" scoped>
//@import url(../../../../assets/publicLess/addHouse.less);
.other-title {
  font-size: 30px;
  font-weight: 400;
  margin-top: 80px;
  &:first-child {
    margin-top: 0;
  }
}
.but-append {
  cursor: pointer;
  margin-left: 10px;
  color: var(--color--primary);
  align-self: center;

  &::before {
    content: attr(data-tips);
    font-size: 18px;
    text-decoration: underline;
  }
}
.message-row {
  display: flex;
  margin-top: 25px;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 35px;
  &.last-row {
    border: none;
    padding-bottom: 0;
  }
  //   &:first-of-type {
  //     padding-bottom: 5px;
  //   }
  .message-row-title {
    margin-right: 50px;
    font-size: 18px;
    color: #b5b5b5;
    align-self: center;
  }
  .message-row-right {
    flex: 1;
    white-space: break-all;
    word-wrap: break-word;
    width: 0;
    color: black;
    font-size: 18px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.border {
  border-left: 0;
  border-right: 0;
  border-top: 0;
  outline: none;
}
.message-row-group {
  display: flex;
  margin-top: 40px;
  .message-row {
    flex: 0 0 50%;
    border: none;
    padding: 0;
    margin-top: 0;
    .message-row-title {
      width: 150px;
      align-self: center;
    }
    .message-row-right {
      display: block;
      width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
<template>
  <div v-loading="loading">
    <h3 class="other-title">房源描述</h3>
    <section class="message-row">
      <h5 class="message-row-title">小区介绍</h5>
      <div class="message-row-right" v-if="updateHouse.communityDesc">
        {{ resultData.communityPresentation | emptyRead }}
      </div>
      <input
        class="message-row-right border"
        v-model="step2.communityDesc"
        v-else
      />
      <div
        class="but-append"
        v-if="hisEdit && (showEdit || editAgentHouse)"
        :data-tips="updateHouse.communityDesc ? '修改' : '完成'"
        @click="updateHouseA(1)"
      >
        <i class="el-icon-question"></i>
      </div>
    </section>
    <section class="message-row">
      <h5 class="message-row-title">户型介绍</h5>
      <div class="message-row-right" v-if="updateHouse.roomDesc">
        {{ resultData.houseTypePresentation | emptyRead }}
      </div>
      <input class="message-row-right border" v-model="step2.roomDesc" v-else />
      <div
        class="but-append"
        v-if="hisEdit && (showEdit || editAgentHouse)"
        :data-tips="updateHouse.roomDesc ? '修改' : '完成'"
        @click="updateHouseA(2)"
      >
        <i class="el-icon-question"></i>
      </div>
    </section>
    <section class="message-row ">
      <h5 class="message-row-title">税费情况</h5>
      <div class="message-row-right" v-if="updateHouse.taxDesc">
        {{ resultData.taxParsing | emptyRead }}
      </div>
      <input class="message-row-right border" v-model="step2.taxDesc" v-else />
      <div
        class="but-append"
        v-if="hisEdit && (showEdit || editAgentHouse)"
        :data-tips="updateHouse.taxDesc ? '修改' : '完成'"
        @click="updateHouseA(3)"
      >
        <i class="el-icon-question"></i>
      </div>
    </section>
    <section class="message-row last-row">
      <h5 class="message-row-title">核心卖点</h5>
      <div class="message-row-right" v-if="updateHouse.saleDesc">
        {{ resultData.coreSellingPoint | emptyRead }}
      </div>
      <input class="message-row-right border" v-model="step2.saleDesc" v-else />
      <div
        class="but-append"
        v-if="hisEdit && (showEdit || editAgentHouse)"
        :data-tips="updateHouse.saleDesc ? '修改' : '完成'"
        @click="updateHouseA(4)"
      >
        <i class="el-icon-question"></i>
      </div>
    </section>
    <h3 class="other-title" id="toThis">房屋概况</h3>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">房屋用途</h5>
        <div class="message-row-right">
          {{ resultData.buildtype | emptyRead }}
        </div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">电梯配套</h5>
        <div class="message-row-right">
          {{ resultData.Elevator | elevatorFilter }}
        </div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">房屋证件</h5>
        <div class="message-row-right" v-if="updateHouse.certificateType">
          {{
            resultData.certificateType
              | mapFilter("CERTIFICATETYPE")
              | emptyRead
          }}
        </div>
        <el-select
          v-else
          style="width:120px"
          v-model="step2.certificateType"
          v-validate="'required'"
          data-vv-name="certificateType"
          data-vv-as=" "
          placeholder="请选择房屋证件"
        >
          <el-option
            v-for="item in certificateType"
            :key="item.label"
            :label="item.title"
            :value="item.label"
          ></el-option>
        </el-select>
        <div
          class="but-append"
          v-if="hisEdit && (showEdit || editAgentHouse)"
          :data-tips="updateHouse.certificateType ? '修改' : '完成'"
          @click="updateHouseA(6)"
        >
          <i class="el-icon-question"></i>
        </div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">产权性质</h5>
        <div class="message-row-right">
          {{ resultData.HouseProperty | emptyRead }}
        </div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">户口占用</h5>
        <div class="message-row-right" v-if="updateHouse.sign">
          {{ resultData.sign | mapFilter("SIGN") | emptyRead }}
        </div>
        <el-radio-group
          v-else
          v-model="step2.sign"
          size="mini"
          v-validate="required ? 'required' : ''"
          data-vv-as="户口情况"
          data-vv-name="sign"
        >
          <el-radio
            v-for="item in signList"
            :key="item.key"
            :label="item.value"
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
        <div
          class="but-append"
          style="width:60px"
          v-if="hisEdit && (showEdit || editAgentHouse)"
          :data-tips="updateHouse.sign ? '修改' : '完成'"
          @click="updateHouseA(7)"
        >
          <i class="el-icon-question"></i>
        </div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">附属配套</h5>
        <div class="message-row-right" v-if="updateHouse.houseBelong">
          {{
            resultData.HouseBelong | mapFilter("HOUSEBELONGLIST") | emptyRead
          }}
        </div>
        <el-radio-group
          v-else
          v-model="step2.houseBelong"
          size="mini"
          v-validate="required ? 'required' : ''"
          data-vv-as="附属配套"
          data-vv-name="houseBelong"
        >
          <el-radio
            v-for="item in houseBelongList"
            :key="item.key"
            :label="item.value"
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
        <div
          class="but-append"
          v-if="hisEdit && (showEdit || editAgentHouse)"
          style="width:80px"
          :data-tips="updateHouse.houseBelong ? '修改' : '完成'"
          @click="updateHouseA(8)"
        >
          <i class="el-icon-question"></i>
        </div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">小学划片</h5>
        <div class="message-row-right">
          {{ resultData.primarySchool | emptyRead }}
        </div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">学籍占用</h5>
        <div class="message-row-right" v-if="updateHouse.primarySchoolUse">
          {{
            resultData.primarySchoolGrade
              | mapFilter("PRIMARYSCHOOLUSE", "未占用")
          }}
        </div>
        <el-radio-group
          v-else
          data-vv-name="primarySchoolUse"
          data-vv-as="小学学籍占用"
          v-model="step2.primarySchoolUse"
          size="mini"
        >
          <el-radio
            style="margin-left:10px;margin-right:10px"
            :label="item.value"
            v-for="item in primarySchoolUseRenderList"
            :key="item.value"
            border
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
        <div
          class="but-append"
          style="width:90px"
          v-if="hisEdit && (showEdit || editAgentHouse)"
          :data-tips="updateHouse.primarySchoolUse ? '修改' : '完成'"
          @click="updateHouseA(9)"
        >
          <i class="el-icon-question"></i>
        </div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">中学划片</h5>
        <div class="message-row-right">
          {{ resultData.middleSchool | emptyRead }}
        </div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">学籍情况</h5>
        <div class="message-row-right" v-if="updateHouse.middleSchoolUse">
          {{
            resultData.middleSchoolGrade
              | mapFilter("MIDDLESCHOOLUSE", "未占用")
          }}
        </div>
        <el-radio-group
          v-else
          style="width:100px"
          data-vv-name="middleSchoolUse"
          data-vv-as="中学学籍占用"
          v-model="step2.middleSchoolUse"
          size="mini"
        >
          <el-radio
            style="margin-left:20px"
            :label="item.value"
            v-for="item in middleSchoolUseRenderList"
            :key="item.value"
            border
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
        <div
          class="but-append"
          style="width:80px"
          v-if="hisEdit && (showEdit || editAgentHouse)"
          :data-tips="updateHouse.middleSchoolUse ? '修改' : '完成'"
          @click="updateHouseA(10)"
        >
          <i class="el-icon-question"></i>
        </div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">物业公司</h5>
        <div class="message-row-right">
          {{ resultData.propertyCompany | emptyRead }}
        </div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">评估价</h5>
        <div class="message-row-right">
          {{ resultData.valuation | emptyRead("元/平") }}
        </div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">物业费</h5>
        <div class="message-row-right" v-if="updateHouse.propertyFee">
          {{ resultData.PropertyFee | emptyRead("元/平") }}
        </div>
        <el-input
          v-else
          type="text"
          v-model="step2.propertyFee"
          v-validate="
            required
              ? 'decimal:2|noZero1|max:14|required'
              : 'decimal:2|noZero1|max:14'
          "
          data-vv-as="物业费"
          data-vv-name="propertyFee"
          placeholder="请输入物业费"
          style="height:0.3rem;width:130px"
        ></el-input>

        <div
          class="but-append"
          v-if="hisEdit && (showEdit || editAgentHouse)"
          style="width:50px"
          :data-tips="updateHouse.propertyFee ? '修改' : '完成'"
          @click="updateHouseA(5)"
        >
          <i class="el-icon-question"></i>
        </div>
      </div>
    </section>
    <h3 class="other-title">交易信息</h3>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">挂牌时间</h5>
        <div class="message-row-right">
          {{ resultData.AddTime | emptyRead }}
        </div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">上次交易金额</h5>
        <div class="message-row-right" v-if="updateHouse.lastPayment">
          {{ resultData.LastTransactionAmount | emptyRead }}
        </div>
        <el-input
          v-else
          style="width:120px"
          class="other-input"
          v-model="step2.lastPayment"
          v-validate="
            required ? 'decimal:2|max:14|required' : 'decimal:2|max:14'
          "
          data-vv-as="上次交易金额"
          data-vv-name="lastPayment"
          placeholder="报税价(万元)"
        ></el-input>
        <div
          class="but-append"
          v-if="hisEdit && (showEdit || editAgentHouse)"
          :data-tips="updateHouse.lastPayment ? '修改' : '完成'"
          @click="updateHouseA(12)"
        >
          <i class="el-icon-question"></i>
        </div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">上次交易</h5>
        <div class="message-row-right" v-if="updateHouse.lastSale">
          {{ resultData.IsTwoYears | emptyRead }}
        </div>
        <div v-else>
          <el-date-picker
            style="width:120px"
            v-model="step2.lastSale"
            type="date"
            class="other-input"
            placeholder="契税发票时间"
            v-validate="required ? 'required' : ''"
            data-vv-as="契税发票时间"
            data-vv-name="lastSale"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <div
          class="but-append"
          v-if="hisEdit && (showEdit || editAgentHouse)"
          :data-tips="updateHouse.lastSale ? '修改' : '完成'"
          @click="updateHouseA(11)"
        >
          <i class="el-icon-question"></i>
        </div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">土地性质</h5>
        <div class="message-row-right">
          {{ resultData.LandCharacteristic | mapFilter("LANDCHARACTERISTIC") }}
        </div>
      </div>
    </section>
    <section class="message-row-group">
      <div class="message-row">
        <h5 class="message-row-title">抵押信息</h5>
        <div class="message-row-right">
          {{ resultData.mortgage | mapFilter("MORTGAGE") | emptyRead }}
        </div>
      </div>
      <div class="message-row">
        <h5 class="message-row-title">剩余贷款</h5>
        <div class="message-row-right">
          {{ resultData.balance | emptyRead("万元") }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
let certificateType = [
  { title: "不动产权证", label: 1 },
  { title: "购房合同", label: 2 },
  { title: "拆迁安置协议书", label: 3 }
];
import util from "@/util/util";
import * as formReander from "@/util/constMap";
import but from "@/evenBus/but.js";
export default {
  props: {
    showEdit: {
      type: Boolean,
      default: false
    },
    hisEdit: {
      type: Boolean,
      default: true
    },
    judgeShowEdit: {
      //判断是否为编辑
      type: Boolean,
      default: false
    }
  },
  inject: ["houseDetails"],
  data() {
    return {
      loading: false,
      updateHouse: {
        communityDesc: true,
        roomDesc: true,
        taxDesc: true,
        saleDesc: true,
        propertyFee: true,
        certificateType: true,
        sign: true,
        houseBelong: true,
        primarySchoolUse: true,
        middleSchoolUse: true,
        lastSale: true,
        lastPayment: true
      },
      certificateType: certificateType,
      primarySchoolUseRenderList: formReander.PRIMARYSCHOOLUSE, //小学占用
      middleSchoolUseRenderList: formReander.MIDDLESCHOOLUSE, //中学占用
      houseBelongList: formReander.HOUSEBELONG, //配套设施
      signList: formReander.SIGN, //户口情况
      step2: {
        certificateType: "",
        propertyFee: "", //物业费
        isOwnerOnly: 1, //唯一住房 1唯一 0 不唯一
        decoration: "", //装修
        houseNow: "", //房屋现状
        houseSource: "", //房屋来源
        sign: "", //户口情况
        houseDelivery: "", //交房时间
        houseBelong: "", //附属配套
        primarySchoolUse: "", //小学学籍占用
        middleSchoolUse: "", //中学学籍占用
        mortgage: 0, //抵押情况
        mortgageBank: "", //抵押银行
        balance: "", //余贷
        monthlyMortgage: "", //月供
        lastSale: "", //上次交易日期
        lastPayment: "", //上次交易金额
        paymentMethod: "", //付款方式
        buildingTime: "", //竣工时间
        title: "", //房源标题
        communityDesc: "", //小区介绍
        roomDesc: "", //户型介绍
        taxDesc: "", //税费解析
        saleDesc: "", //核心卖点
        followWay: "", //跟进的类型
        followMemo: "" //跟进的内容
      },
      push: {},
      editAgentHouse: false
    };
  },
  mounted() {
    let that = this;
    console.log(
      "11111111111111",
      that.hisEdit && (that.showEdit || that.editAgentHouse)
    );
    if (!this.judgeShowEdit) {
      this.editAgentHouse = true;
    }
    but.$on("editAgentHouse", () => {
      that.editAgentHouse = true;
    });
  },
  destroyed() {
    but.$off("editAgentHouse");
  },
  computed: {
    resultData() {
      if (Object.keys(this.houseDetails).length > 0) {
        return this.houseDetails.data;
      } else {
        return {};
      }
    }
    // showEdit() {
    //   let perId = 0;

    //   perId = util.localStorageGet("logindata").accountId;

    //   if (
    //     Object.keys(this.houseDetails).length > 0 &&
    //     this.houseDetails.data.plate != 1 &&
    //     this.houseDetails.data.plate != 4 &&
    //     perId == this.houseDetails.data.AgentPer
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  },
  filters: {
    elevatorFilter(value) {
      return util.analysisElevator(value);
    },
    mapFilter(value, ListName, resultValue = null) {
      return util.countMapFilter(value, ListName, resultValue);
    }
  },
  methods: {
    updateHouseA(type) {
      let that = this;
      let flag = true;
      switch (type) {
        case 1:
          flag = !that.updateHouse.communityDesc;
          if (flag == false) {
            this.step2.communityDesc = this.resultData.communityPresentation;
          } else if (
            this.step2.communityDesc != this.resultData.communityPresentation
          ) {
            this.editHouseDetail("communityDesc", this.step2.communityDesc);
          }
          this.updateHouse.communityDesc = flag;
          break;
        case 2:
          flag = !this.updateHouse.roomDesc;
          if (flag == false) {
            this.step2.roomDesc = this.resultData.houseTypePresentation;
          } else if (
            this.step2.roomDesc != this.resultData.houseTypePresentation
          ) {
            this.editHouseDetail("roomDesc", this.step2.roomDesc);
          }
          this.updateHouse.roomDesc = flag;
          break;
        case 3:
          flag = !this.updateHouse.taxDesc;
          if (flag == false) {
            this.step2.taxDesc = this.resultData.taxParsing;
          } else if (this.step2.taxDesc != this.resultData.taxParsing) {
            this.editHouseDetail("taxDesc", this.step2.taxDesc);
          }
          this.updateHouse.taxDesc = flag;
          break;
        case 4:
          flag = !this.updateHouse.saleDesc;
          if (flag == false) {
            this.step2.saleDesc = this.resultData.coreSellingPoint;
          } else if (this.step2.saleDesc != this.resultData.coreSellingPoint) {
            this.editHouseDetail("saleDesc", this.step2.saleDesc);
          }
          this.updateHouse.saleDesc = flag;
          break;
        case 5:
          flag = !this.updateHouse.propertyFee;
          if (flag == false) {
            this.step2.propertyFee = this.resultData.PropertyFee;
          } else if (this.step2.propertyFee != this.resultData.PropertyFee) {
            this.editHouseDetail("propertyFee", this.step2.propertyFee);
          }
          this.updateHouse.propertyFee = flag;
          break;
        case 6:
          flag = !this.updateHouse.certificateType;
          if (flag == false) {
            this.step2.certificateType = this.resultData.certificateType;
          } else if (
            this.step2.certificateType != this.resultData.certificateType
          ) {
            this.editHouseDetail("certificateType", this.step2.certificateType);
          }
          this.updateHouse.certificateType = flag;
          break;
        case 7:
          flag = !this.updateHouse.sign;
          if (flag == false) {
            this.step2.sign = this.resultData.sign;
          } else if (this.step2.sign != this.resultData.sign) {
            this.editHouseDetail("sign", this.step2.sign);
          }
          this.updateHouse.sign = flag;
          break;
        case 8:
          flag = !this.updateHouse.houseBelong;
          if (flag == false) {
            this.step2.houseBelong = this.resultData.HouseBelong;
          } else if (this.step2.houseBelong != this.resultData.HouseBelong) {
            this.editHouseDetail("houseBelong", this.step2.houseBelong);
          }
          this.updateHouse.houseBelong = flag;
          break;
        case 9:
          flag = !this.updateHouse.primarySchoolUse;
          if (flag == false) {
            this.step2.primarySchoolUse = this.resultData.primarySchoolGrade;
          } else if (
            this.step2.primarySchoolUse != this.resultData.primarySchoolGrade
          ) {
            this.editHouseDetail(
              "primarySchoolUse",
              this.step2.primarySchoolUse
            );
          }
          this.updateHouse.primarySchoolUse = flag;
          break;
        case 10:
          flag = !this.updateHouse.middleSchoolUse;
          if (flag == false) {
            this.step2.middleSchoolUse = this.resultData.middleSchoolGrade;
          } else if (
            this.step2.middleSchoolUse != this.resultData.middleSchoolGrade
          ) {
            this.editHouseDetail("middleSchoolUse", this.step2.middleSchoolUse);
          }
          this.updateHouse.middleSchoolUse = flag;
          break;
        case 11:
          flag = !this.updateHouse.lastSale;
          if (flag == false) {
            this.step2.lastSale = this.resultData.IsTwoYears;
          } else if (this.step2.lastSale != this.resultData.IsTwoYears) {
            this.editHouseDetail("lastSale", this.step2.lastSale);
          }
          this.updateHouse.lastSale = flag;
          break;
        case 12:
          flag = !this.updateHouse.lastPayment;
          if (flag == false) {
            this.step2.lastPayment = this.resultData.LastTransactionAmount;
          } else if (this.resultData.IsTwoYears == null) {
            this.$message({
              message: "请先填写上次交易时间",
              type: "info"
            });
            return false;
          } else if (
            this.step2.lastPayment != this.resultData.LastTransactionAmount
          ) {
            this.editHouseDetail("lastPayment", this.step2.lastPayment);
          }
          this.updateHouse.lastPayment = flag;
          break;
      }
    },
    editHouseDetail(type, value) {
      this.loading = true;
      let sendData = {
        id: this.resultData.id
      };
      sendData.saleHouseUpdateRecordList = [];

      let perId = 0;
      perId = util.localStorageGet("logindata").accountId;
      switch (type) {
        case "communityDesc": //小区介绍
          sendData.communityDesc = value;
          sendData.roomDesc = this.resultData.houseTypePresentation;
          sendData.taxDesc = this.resultData.taxParsing;
          sendData.saleDesc = this.resultData.coreSellingPoint;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.communityPresentation
          });

          break;
        case "roomDesc": //户型介绍
          sendData.communityDesc = this.resultData.communityPresentation;
          sendData.roomDesc = value;
          sendData.taxDesc = this.resultData.taxParsing;
          sendData.saleDesc = this.resultData.coreSellingPoint;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.houseTypePresentation
          });
          break;
        case "taxDesc": //税费情况
          sendData.communityDesc = this.resultData.communityPresentation;
          sendData.roomDesc = this.resultData.houseTypePresentation;
          sendData.taxDesc = value;
          sendData.saleDesc = this.resultData.coreSellingPoint;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.taxParsing
          });
          break;
        case "saleDesc": //核心卖点
          sendData.communityDesc = this.resultData.communityPresentation;
          sendData.roomDesc = this.resultData.houseTypePresentation;
          sendData.taxDesc = this.resultData.taxParsing;
          sendData.saleDesc = value;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.coreSellingPoint
          });

          break;
        case "propertyFee": //物业费
          sendData.propertyFee = value;
          sendData.communityDesc = this.resultData.communityPresentation;
          sendData.roomDesc = this.resultData.houseTypePresentation;
          sendData.taxDesc = this.resultData.taxParsing;
          sendData.saleDesc = this.resultData.coreSellingPoint;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.PropertyFee
          });
          break;
        case "certificateType": //房屋证件
          sendData.certificateType = value;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.certificateType
          });

          break;
        case "sign": //户口情况
          sendData.sign = value;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.sign
          });

          break;
        case "houseBelong": //附属配套
          sendData.houseBelong = value;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.HouseBelong
          });
          break;
        case "primarySchoolUse": //小学学籍占用
          sendData.primarySchoolUse = value;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.primarySchoolGrade
          });

          break;
        case "middleSchoolUse": //中学学籍占用
          sendData.middleSchoolUse = value;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.middleSchoolGrade
          });

          break;
        case "lastSale": //上次交易日期
          sendData.lastSale = value;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.IsTwoYears
          });
          break;
        case "lastPayment": //上次交易金额
          sendData.lastPayment = value;
          sendData.saleHouseUpdateRecordList.push({
            modifier: util.localStorageGet("logindata").accountId,
            HouseId: this.resultData.id,
            updateFiled: type,
            newValue: value,
            oldValue: this.resultData.LastTransactionAmount
          });
          break;
      }
      this.$api
        .put({
          url: "/agent_house/editAgentHouse",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: sendData
        })
        .then(e => {
          this.loading = false;
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.$router.go(0);
        })
        .catch(e => {})
        .finally(() => {});
    }
  }
};
</script>
