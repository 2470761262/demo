<style lang="less" scoped>
.page-cell-addHouse {
  padding: 0 50px;
  .cell-item-cell {
    display: flex;
    align-items: center;
    margin-top: 25px;
    &.no-top {
      margin-top: 0;
    }
   
    .item-before {
      line-height: 40px;
      &.before-text {
        position: relative;
        &::before {
          content: attr(data-before);
          position: absolute;
          font-size: 12px;
          width: 100%;
          line-height: 1;
          bottom: -4px;
          text-align: center;
        }
      }
      &.text-just {
        text-align: justify;
        &::after {
          content: "";
          display: inline-block;
          width: 100%;
          height: 0;
        }
      }
      width: 75px;
      position: relative;
      margin-right: 25px;
      height: 40px;
      font-size: 15px;
      box-sizing: border-box;
      color: #666;
    }
    /deep/.el-select {
      height: 25px;
      width: 140px;
      .el-input {
        height: 100%;
        .el-input__icon {
          line-height: 25px;
        }
        .el-input__inner {
          height: 100%;
          line-height: 25px;
          font-size: 12px;
        }
      }
    }
    .el-textarea {
      width: 410px;
      height: 70px;
      /deep/textarea {
        height: 100%;
      }
    }
    &.el-input-w {
      &.el-input-w-280 {
        /deep/.el-input {
          width: 280px;
        }
      }
      /deep/.el-input {
        .other-input;
        margin-right: 20px;
      }
    }
    .Division {
      margin: 0 20px;
      &:first-child {
        margin-left: 0;
      }
    }
    .other-input {
      height: 25px;
      width: 120px;
      /deep/.el-input__inner {
        height: 100%;
        line-height: 25px;
        font-size: 12px;
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #dcdfe6;
        padding: 0 15px !important;
      }
      /deep/.el-icon-date {
        display: none;
      }
      /deep/.el-input__icon {
        line-height: 25px;
      }
    }
  }
}
 .after-tips {
      &:after {
        content: attr(data-tips);
        display: block;
        color: red;
      }
    }
.flex-cell {
  display: flex;
}
.division-line {
  height: 1px;
  background: #dcdfe6;
  margin-top: 40px;
}
.flex-start {
  align-self: flex-start;
}
</style>
<template>
  <div class="page-cell-addHouse"
       element-loading-text="我在去获取数据的路上了~"
       v-loading="loading">
    <!-- 房屋来源 -->
    <div :class="{'after-tips':errorBags.has('houseSource')}"
           :data-tips="errorBags.first('houseSource')">
    <div class="cell-item-cell">
      <div class="item-before text-just">房源来源</div>
      <el-select v-model="formData.houseSource"
                 placeholder="请选择房源来源"
                  v-validate="required?'required': ''"
                 data-vv-as="房源来源"
      data-vv-name="houseSource">
        <el-option v-for="item in houseSourceList"
                   :key="item.value"
                   :label="item.key"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
    </div>
    <!-- 房屋现状 -->
    <div :class="{'after-tips':errorBags.has('houseNow')}"
           :data-tips="errorBags.first('houseNow')">
    <div class="cell-item-cell">
      <div class="item-before text-just">房屋现状</div>
      <el-radio-group v-model="formData.houseNow"
                      size="mini"
                      v-validate="required?'required': ''"
                  data-vv-as="房屋现状"
      data-vv-name="houseNow">
        <el-radio :label="item.value"
                  v-for="item in houseNowList"
                  :key="item.key">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    </div>
    <!-- 装修类型  -->
    <div :class="{'after-tips':errorBags.has('decoration')}"
           :data-tips="errorBags.first('decoration')">
    <div class="cell-item-cell">
      <div class="item-before text-just">装修类型</div>
      <el-radio-group v-model="formData.decoration"
                      size="mini"
                            v-validate="required?'required': ''"
                 data-vv-as="装修类型"
      data-vv-name="decoration">
        <el-radio :label="item.value"
                  v-for="item in decorationList"
                  :key="item.key">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    </div>
    <!-- 户口情况 -->
    <div :class="{'after-tips':errorBags.has('sign')}"
           :data-tips="errorBags.first('sign')">
    <div class="cell-item-cell">
      <div class="item-before text-just">户口情况</div>
      <el-radio-group v-model="formData.sign"
                      size="mini"
                      v-validate="required?'required': ''"
                 data-vv-as="户口情况"
      data-vv-name="sign">
        <el-radio v-for="item in signList"
                  :key="item.key"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    </div>
    <!-- 物业费 -->
    <div :class="{'after-tips':errorBags.has('propertyFee')}"
           :data-tips="errorBags.first('propertyFee')">
        <div class="cell-item-cell el-input-w">
        <div class="item-before text-just">物业费</div>
        <el-input type="text" v-model="formData.propertyFee"
          v-validate="required?'decimal:2|noZero1|max:14|required': 'decimal:2|noZero1|max:14'"
          data-vv-as="物业费"
          data-vv-name="propertyFee"
          placeholder="请输入物业费"
        ></el-input>
        <div class="item-after">元/平方</div>
      </div>
    </div>

    <!-- 附属配套 -->
    <div :class="{'after-tips':errorBags.has('houseBelong')}"
           :data-tips="errorBags.first('houseBelong')">
    <div class="cell-item-cell el-input-w">
      <div class="item-before text-just">附属配套</div>
      <el-radio-group v-model="formData.houseBelong"
                      size="mini"
                         v-validate="required?'required': ''"
          data-vv-as="附属配套"
          data-vv-name="houseBelong">
        <el-radio v-for="item in houseBelongList"
                  :key="item.key"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
      <!-- <el-input v-if="houseBelongSelect=='其他'"
                type="text"
                v-model="formData.houseBelong"></el-input> -->
    </div>
    </div>
    <!-- 学籍占用 -->
  <div class="{'after-tips':errorBags.has('primaryRadio')}"
           :data-tips="errorBags.first('primaryRadio')">
    <div class="cell-item-cell">
      <div class="item-before  text-just before-text"
           data-before="(小学)">学籍占用</div>
      <el-radio-group size="mini"
                      @change="primaryRadioChange"
                      v-model="primaryRadio"
                      v-validate="required?'required': ''"
          data-vv-as="学籍占用(小学)"
          data-vv-name="primaryRadio">
        <el-radio v-for="item in primarySchoolUseList"
                  :key="item.value"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    </div>
    <!-- 小学占用选择 -->
    <div class="cell-item-cell no-top"
         v-if="primaryRadio == 1">
      <div class="item-before"></div>
      <div :class="{'after-tips':errorBags.has('primarySchoolUse')}"
           :data-tips="errorBags.first('primarySchoolUse')">
        <el-radio-group v-validate="{'required':primaryRadio == 1}"
                        data-vv-name="primarySchoolUse"
                        data-vv-as="小学学籍占用"
                        v-model="formData.primarySchoolUse"
                        size="mini">
          <el-radio :label="item.value"
                    v-for="item in primarySchoolUseRenderList"
                    :key="item.value"
                    border>{{ item.key }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 中学籍占用 -->
      <div class="{'after-tips':errorBags.has('middleRadio')}"
           :data-tips="errorBags.first('middleRadio')">
    <div class="cell-item-cell ">
      <div class="item-before  text-just before-text"
           data-before="(中学)"
          v-validate="required?'required': ''"
          data-vv-as="学籍占用(中学)"
          data-vv-name="middleRadio">学籍占用</div>
      <el-radio-group size="mini"
                      @change="middleRadioChange"
                      v-model="middleRadio">
        <el-radio v-for="item in middleSchoolUseList"
                  :key="item.value"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
      </div>
    <!-- 中学占用选择 -->
    <div class="cell-item-cell no-top"
         v-if="middleRadio == 1">
      <div class="item-before"></div>
      <div :class="{'after-tips':errorBags.has('middleSchoolUse')}"
           :data-tips="errorBags.first('middleSchoolUse')">
        <el-radio-group v-validate="{'required':middleRadio == 1}"
                        data-vv-name="middleSchoolUse"
                        data-vv-as="中学学籍占用"
                        v-model="formData.middleSchoolUse"
                        size="mini">
          <el-radio :label="item.value"
                    v-for="item in middleSchoolUseRenderList"
                    :key="item.value"
                    border>{{ item.key }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 抵押情况 -->
    <div :class="{'after-tips':errorBags.has('mortgageChange')}"
           :data-tips="errorBags.first('mortgageChange')">
    <div class="cell-item-cell">
      <div class="item-before text-just">抵押情况</div>
      <el-radio-group v-model="formData.mortgage"
                      @change="mortgageChange"
                      size="mini"
                       v-validate="required?'required': ''"
          data-vv-as="抵押情况"
          data-vv-name="mortgageChange">
        <el-radio v-for="item in mortgageList"
                  class="item-flex-avg"
                  :key="item.key"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    </div>
    <div class="cell-item-cell  no-top">
      <div class="item-before"></div>
      <div :class="{'after-tips':errorBags.has('balance') ||  errorBags.has('monthlyMortgage')}"
           :data-tips="errorBags.first('balance') || errorBags.first('monthlyMortgage')">
        <div class="cell-item-cell  no-top">
          <el-select v-if="formData.mortgage==1"
                     v-model="formData.mortgageBank"
                     placeholder="请选择抵押银行">
            <el-option v-for="item in mortgageBankList"
                       :key="item.value"
                       :label="item.key"
                       :value="item.value">
            </el-option>
          </el-select>
          <div class="Division">余贷/月供</div>
          <el-input class="other-input"
                    v-model="formData.balance"
                    v-validate="required?'decimal:2|max:14|required':'decimal:2|max:14'"
                    data-vv-as="余贷"
                    data-vv-name="balance"
                    placeholder="请输入余贷金额"></el-input>
          <div class="Division">万元</div>
          <el-input class="other-input"
                    v-model="formData.monthlyMortgage"
                    :v-validate="required?'decimal:2|max:14|required':'decimal:2|max:14'"
                    data-vv-as="月供"
                    data-vv-name="monthlyMortgage"
                    placeholder="请输入月供"></el-input>
          <div class="Division">元/月</div>
        </div>
      </div>
    </div>
    <!-- 上次交易 -->
    
    <div class="cell-item-cell ">
      <div class="item-before  text-just">上次交易</div>
      <div :class="{'after-tips':errorBags.has('lastSale')}"
           :data-tips="errorBags.first('lastSale')">
      <el-date-picker v-model="formData.lastSale"
                      type="date"
                      class="other-input"
                      placeholder="契税发票时间"
                      v-validate="required?'required': ''"
          data-vv-as="契税发票时间"
          data-vv-name="lastSale">
      </el-date-picker>
        </div>
      <div class="Division">是否唯一住房</div>
      <div :class="{'after-tips':errorBags.has('isOwnerOnly')}"
           :data-tips="errorBags.first('isOwnerOnly')">
      <el-radio-group size="mini"
                      v-model="formData.isOwnerOnly"
                        v-validate="required?'required': ''"
          data-vv-as="唯一住房"
          data-vv-name="isOwnerOnly">
        <el-radio v-for="item in isowneronlyList"
                  :key="item.value"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
      </div>
      <div class="Division">满5唯一</div>
    </div>
  
    <!-- 付款方式 -->
    <div class="cell-item-cell ">
      <div class="item-before  text-just">付款方式</div>
      <div :class="{'after-tips':  errorBags.has('paymentMethod')|| errorBags.has('lastPayment')}"
           :data-tips="errorBags.first('paymentMethod')|| errorBags.first('lastPayment') ">
        <div class="cell-item-cell  no-top">
          <el-select v-model="formData.paymentMethod"
                     placeholder="付款方式"
                        v-validate="required?'required': ''"
          data-vv-as="付款方式"
          data-vv-name="paymentMethod">
            <el-option v-for="item in paymentMethodList"
                       :key="item.value"
                       :label="item.key"
                       :value="item.value">
            </el-option>
          </el-select>
          <div class="Division">上次交易金额</div>
          <el-input class="other-input"
                    v-model="formData.lastPayment"
                    v-validate="required?'decimal:2|max:14|required':'decimal:2|max:14'"
                    data-vv-as="上次交易金额"
                    data-vv-name="lastPayment"
                    placeholder="报税价"></el-input>
          <div class="Division">万</div>
        </div>
      </div>
    </div>
    <div class="division-line"></div>
    <!-- 房源标题 -->
    <div :class="{'after-tips':errorBags.has('title')}"
           :data-tips="errorBags.first('title')">
    <div class="cell-item-cell el-input-w el-input-w-280">
      <div class="item-before text-just">房源标题</div>
      <el-input type="text"
                v-model="formData.title"
                placeholder="请输入房源标题"
                maxLength="15"
                v-validate="required?'required':''"
                    data-vv-as="房源标题"
                    data-vv-name="title"></el-input>
      <div class="item-after">{{formData.title.length}}/15</div>
    </div>
    </div>
    <!-- 小区介绍 -->
    <div  :class="{'after-tips':errorBags.has('communityDesc')}"
           :data-tips="errorBags.first('communityDesc')">
    <div class="cell-item-cell">
      <div class="item-before text-just flex-start">小区介绍</div>
      <el-input class="el-textarea"
                type="textarea"
                placeholder="请输入小区介绍"
                v-model="formData.communityDesc"
                maxlength="50"
                resize="none"
                show-word-limit
                 v-validate="required?'required':''"
                    data-vv-as="小区介绍"
                    data-vv-name="communityDesc">
      </el-input>
    </div>
    </div>
    <!-- 户型介绍 -->
    <div :class="{'after-tips':errorBags.has('roomDesc')}"
           :data-tips="errorBags.first('roomDesc')">
    <div class="cell-item-cell">
      <div class="item-before text-just flex-start">户型介绍</div>
      <el-input class="el-textarea"
                type="textarea"
                placeholder="请输入户型介绍"
                v-model="formData.roomDesc"
                maxlength="50"
                resize="none"
                show-word-limit
                  v-validate="required?'required':''"
                    data-vv-as="户型介绍"
                    data-vv-name="roomDesc">
      </el-input>
    </div>
    </div>
    <!-- 税费解析 -->
    <div :class="{'after-tips':errorBags.has('taxDesc')}"
           :data-tips="errorBags.first('taxDesc')">
    <div class="cell-item-cell">
      <div class="item-before text-just flex-start">税费解析</div>
      <el-input class="el-textarea"
                type="textarea"
                placeholder="请输入税费解析"
                v-model="formData.taxDesc"
                maxlength="50"
                resize="none"
                show-word-limit
                   v-validate="required?'required':''"
                    data-vv-as="税费解析"
                    data-vv-name="taxDesc">
      </el-input>
    </div>
    </div>
    <!-- 核心卖点 -->
    <div :class="{'after-tips':errorBags.has('saleDesc')}"
           :data-tips="errorBags.first('saleDesc')">
    <div class="cell-item-cell">
      <div class="item-before text-just flex-start">核心卖点</div>
      <el-input class="el-textarea"
                type="textarea"
                placeholder="请输入核心卖点"
                v-model="formData.saleDesc"
                maxlength="50"
                resize="none"
                show-word-limit
                  v-validate="required?'required':''"
                    data-vv-as="核心卖点"
                    data-vv-name="saleDesc">
      </el-input>
    </div>
    </div>
      <!-- 跟进类型 -->
    <div :class="{'after-tips':errorBags.has('followWay')}"
           :data-tips="errorBags.first('followWay')" v-if="showFollow">
    <div class="cell-item-cell">
      <div class="item-before text-just">跟进类型</div>
      <el-radio-group v-model="formData.followWay"
                      size="mini"
                      v-validate="required?'required': ''"
                 data-vv-as="跟进类型 "
      data-vv-name="followWay">
        <el-radio v-for="item in followWayList"
                  :key="item.key"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    </div>
      <!-- 跟进内容 -->
    <div :class="{'after-tips':errorBags.has('followMemo')}"
           :data-tips="errorBags.first('followMemo')" v-if="showFollow" key="followMemo">
    <div class="cell-item-cell">
      <div class="item-before text-just flex-start">跟进内容</div>
      <el-input class="el-textarea"
                type="textarea"
                placeholder="请输入跟进内容"
                v-model="formData.followMemo"
                maxlength="50"
                resize="none"
                show-word-limit
                  v-validate="required?'required':''"
                    data-vv-as="跟进内容"
                    data-vv-name="followMemo">
      </el-input>
    </div>
    </div>
  </div>
</template>
<script>
import * as formReander from '@/util/constMap';
import util from '@/util/util';
const USE = [
  {
    key: "未占用",
    value: 0
  },
  {
    key: "占用",
    value: 1
  },
]
export default {
  name: "supplement",
  props: {
    getData: {
      type: Boolean,
      default: false
    },
    required:{
      type: Boolean,
      default: false
    },
    middleRadioTo:{
      type: Number,
      default: 0
    },
    primaryRadioTo:{
      type: Number,
      default: 0
    },
    showFollow:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    formData () {
      this.$set(this.$data, "step", JSON.parse(JSON.stringify(this.$store.state.addHouse.formData.step2)))
      return this.step
    }
  },
  mounted () {
    //true 则去获取数据
    if (this.getData) {
      this.getLoadData();
    }
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler (newValue, oldValue) {
        //deff 获取到修改的属性
        let deffData = util.diffGet(this.$store.state.addHouse.formData.step2, this.formData);
        //判断当前是否有修改，如果有修改则length大于0
        let flag = Object.keys(deffData).length > 0 ? true : false;
        //判断store存储的是否与这次相同，相同则不commit
        if (this.$store.state.addHouse.isformDataNoCommit != flag) {
          this.$store.commit("updateIsformDataNoCommit", flag);
        }
        //把修改的过的值给与deffData用于传送后台，如果在一次进入也可以顺便把这个值清空
        this.deffData = deffData;
      }
    }
  },
  data () {
    return {
      loading: false,
      step: {},
      options: [],
      deffData: {},
      primaryRadio: this.primaryRadioTo,
      middleRadio:this.middleRadioTo,
      houseBelongSelect: "",
      primarySchoolUseRenderList: formReander.PRIMARYSCHOOLUSE,//小学占用
      middleSchoolUseRenderList: formReander.MIDDLESCHOOLUSE,//中学占用
      houseSourceList: formReander.HOUSESOURCE,//房屋来源
      houseNowList: formReander.HOUSENOW,//房屋现状
      primarySchoolUseList: USE,//小学学籍占用
      middleSchoolUseList: USE,//中学学籍占用
      mortgageList: formReander.MORTGAGE,//抵押情况
      paymentMethodList: formReander.PAYMENTMETHOD,//付款方式
      houseBelongList: formReander.HOUSEBELONG,//配套设施
      signList: formReander.SIGN,//户口情况
      decorationList: formReander.DECORATION,//装修类型
      isowneronlyList: formReander.ISOWNERONLY ,//是否唯一住房
      mortgageBankList:formReander.MORTGAGEBANK,//抵押银行
      followWayList:formReander.FOLLOWWAY//跟进类型
    }
  },
  methods: {
    getLoadData () {
      this.loading = true;
      return this.$api.get({
        url: `/draft-house/${this.$store.state.addHouse.formData.id}`,
      }).then((e) => {
        if (e.data.code == 200) {
          this.$store.dispatch("InitFormData", { commitName: "updateStep2", json: e.data.data })
        }
      }).catch((e) => {
        return false;
      }).finally(() => {
        this.loading = false;
      })
    },
    //抵押情况切换
    mortgageChange (e) {
      if (e != 1) {
        this.formData.mortgageBank = '';
      }
    },
    //中学占用切换
    middleRadioChange (e) {
      if (e != 1) {
        this.formData.middleSchoolUseList = '';
        this.$store.state.addHouse.formData.step2.middleSchoolUse="";
      }
    },
    //小学占用切换
    primaryRadioChange (e) {
      if (e != 1) {
        this.formData.primarySchoolUse = '';
        this.$store.state.addHouse.formData.step2.primarySchoolUse="";
      }
    },
    validateAll () {
      let that = this;
      return this.$validator.validateAll().then((e) => {
        if (e) {
          return true;
        }
        return false;
      }).then((e) => {
        if (e) {
          return that.setDataToUpdate();
        } else {
          return false;
        }
      })
    },
    validateAllNotUpdata(){
       let that = this;
      return this.$validator.validateAll().then((e) => {
        if (e) {
          return true;
        }
        return false;
      });
    },
    //修改数据到接口
    setDataToUpdate () {
      let that = this;
      let sendData = {
        id: that.$store.state.addHouse.formData.id,
        ...that.deffData
      }
      if (Object.keys(this.deffData).length == 0) {//没有做出修改
        return true;
      }
      return this.$api.put({
        url: '/draft-house',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: sendData
      }).then((e) => {
        console.log(e);
        if (e.data.code == 200) {
          //存入Vuex;
          that.$store.commit("updateStep2", that.deffData);
          return true;
        } else {
          return false;
        }

      }).catch(() => {
        return false;
      })
    }
  }
}
</script>