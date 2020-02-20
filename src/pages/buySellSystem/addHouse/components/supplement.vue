<style lang="less" scoped>
@import url("../../../../assets/publicLess/addHouse.less");
.item-before {
  width: 110px !important;
}
.form-error-tips {
  &.noMarinTop {
    margin-top: 0;
  }
  .page-cell-item {
    flex-wrap: wrap;
    &.el-input-auto {
      .el-input {
        width: auto;
      }
    }
    .cell-item-cell {
      display: flex;
      margin-top: 20px;
      margin-right: 60px;
      width: 320px;
      align-items: center;
      &:last-child {
        margin-right: 0px;
      }
    }
    &.nowarp {
      flex-wrap: nowrap !important;
    }
    @media screen and(max-width: 933px) {
      .warp-marin {
        margin-top: 10px;
      }
    }
    .Division {
      align-self: center;
      margin: 0 10px;
    }
  }
}
.item-flex {
  flex: 1;
  .el-radio-group {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
    .item-flex-avg {
      flex: 0 0 50%;
      padding: 0 5px;
      box-sizing: border-box;
      .el-radio {
        width: 100%;
      }
    }
  }
}
</style>
<template>
  <div class="page-cell">
    <div class="page-cell-title">补充信息</div>
    <!-- 房屋用途 && 房屋结构 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">房屋用途</div>
          <el-select v-model="formData.houseUse"
                     placeholder="请选择房屋用途">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">房屋结构</div>
          <el-select v-model="formData.houseStruct"
                     placeholder="请选择房屋结构">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 产权性质 && 房屋现状 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">产权性质</div>
          <el-select v-model="formData.property"
                     placeholder="请选择产权性质">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">房屋现状</div>
          <el-select v-model="formData.houseNow"
                     placeholder="请选择房屋现状">
            <el-option v-for="item in houseNowList"
                       :key="item.value"
                       :label="item.key"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 房屋来源 && 户型结构 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">房屋来源</div>
          <el-select v-model="formData.houseSource"
                     placeholder="请选择房屋来源">
            <el-option v-for="item in houseSourceList"
                       :key="item.value"
                       :label="item.key"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">户型结构</div>
          <el-select v-model="formData.roomType"
                     placeholder="请选择户型结构">
            <el-option v-for="item in roomTypeList"
                       :key="item.value"
                       :label="item.key"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 户口情况 && 电梯 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">户口情况</div>
          <div class="item-flex">
            <el-radio-group v-model="formData.sign"
                            size="mini">
              <div v-for="item in signList"
                   class="item-flex-avg"
                   :key="item.key">
                <el-radio :label="item.value"
                          border>{{ item.key }}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">电梯</div>
          <div class="item-flex">
            <el-radio-group v-model="formData.isElevator"
                            size="mini">
              <div v-for="item in isElevatorList"
                   class="item-flex-avg"
                   :key="item.key">
                <el-radio :label="item.value"
                          border>{{ item.key }}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <!-- 交房时间 && 附属配套-->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">交房时间</div>
          <div class="item-flex">
            <el-radio-group v-model="formData.houseDelivery"
                            size="mini">
              <div v-for="item in houseDeliveryList"
                   class="item-flex-avg"
                   :key="item.value">
                <el-radio :label="item.value"
                          border>{{ item.key }}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">附属配套</div>
          <el-select v-model="formData.houseBelong"
                     placeholder="请选择附属配套">
            <el-option v-for="item in houseBelongList"
                       :key="item.value"
                       :label="item.key"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 土地性质  -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">土地性质</div>
          <div class="item-flex">
            <el-radio-group v-model="formData.landCharacteristic"
                            size="mini">
              <div v-for="item in landCharacteristicList"
                   class="item-flex-avg"
                   :key="item.value">
                <el-radio :label="item.value"
                          border>{{ item.key }}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="page-cell-title">学籍信息</div>
    <!-- 小学划片 & 学籍占用 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">小学划片</div>
          <el-select v-model="formData.primarySchool"
                     filterable
                     placeholder="请选择小学">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="page-cell-item">
          <div class="cell-item-cell">
            <div class="item-before">学籍占用</div>
            <div class="item-flex">
              <el-radio-group v-model="formData.primarySchoolUse"
                              size="mini">
                <div v-for="item in primarySchoolUseList"
                     class="item-flex-avg"
                     :key="item.value">
                  <el-radio :label="item.value"
                            border>{{ item.key }}</el-radio>
                </div>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 中学划片 & 学籍占用 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">中学划片</div>
          <el-select v-model="formData.middleSchool"
                     filterable
                     placeholder="请选择中学">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="page-cell-item">
          <div class="cell-item-cell">
            <div class="item-before">学籍占用</div>
            <div class="item-flex">
              <el-radio-group v-model="formData.middleSchoolUse"
                              size="mini">
                <div v-for="item in middleSchoolUseList"
                     class="item-flex-avg"
                     :key="item.value">
                  <el-radio :label="item.value"
                            border>{{ item.key }}</el-radio>
                </div>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-cell-title">抵押/贷款信息</div>
    <!-- 抵押 && 抵押银行-->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">抵押</div>
          <div class="item-flex">
            <el-radio-group v-model="formData.mortgage"
                            size="mini">
              <div v-for="item in mortgageList"
                   class="item-flex-avg"
                   :key="item.value">
                <el-radio :label="item.value"
                          border>{{ item.key }}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">抵押银行</div>
          <el-select v-model="formData.mortgageBank"
                     placeholder="请选择抵押银行">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 余贷/月供 -->
    <div class="form-error-tips "
         :class="{'after-tips':errorBags.has('balance') ||  errorBags.has('monthlyMortgage')}"
         :data-tips="errorBags.first('balance') || errorBags.first('monthlyMortgage')">
      <div class="page-cell-item el-input-auto">
        <div class="page-cell-item nowarp">
          <div class="item-before">余贷/月供</div>
          <div class="page-cell-item">
            <div class="page-cell-item nowarp">
              <el-input v-model="formData.balance"
                        v-validate="'decimal:2|max:14'"
                        data-vv-as="余贷"
                        data-vv-name="balance"
                        placeholder="请输入余贷金额"></el-input>
              <div class="Division">万元</div>
            </div>
            <div class="page-cell-item nowarp warp-marin">
              <el-input v-model="formData.monthlyMortgage"
                        v-validate="'decimal:2|max:14'"
                        data-vv-as="月供"
                        data-vv-name="monthlyMortgage"
                        placeholder="请输入月供"></el-input>
              <div class="Division">万元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-cell-title">历史交易</div>
    <!-- 上次交易时间/上次交易金额 -->
    <div class="form-error-tips noMarinTop"
         :class="{'after-tips':errorBags.has('lastPayment') }"
         :data-tips="errorBags.first('lastPayment') ">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">上次交易</div>
          <el-date-picker v-model="formData.lastSale"
                          type="date"
                          placeholder="契税发票时间">
          </el-date-picker>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">上次交易金额</div>
          <el-input v-model="formData.lastPayment"
                    v-validate="'decimal:2|max:14'"
                    data-vv-as="上次交易金额"
                    data-vv-name="lastPayment"
                    placeholder="报税价"></el-input>
        </div>
      </div>
    </div>
    <!-- 付款方式/竣工时间 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">付款方式</div>
          <el-select v-model="formData.paymentMethod"
                     placeholder="付款方式">
            <el-option v-for="item in paymentMethodList"
                       :key="item.value"
                       :label="item.key"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">竣工时间</div>
          <el-date-picker v-model="formData.buildingTime"
                          type="date"
                          placeholder="付款方式">
          </el-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as formReander from '@/util/constMap';
export default {
  name: "supplement",
  computed: {
    formData () {
      this.$set(this.$data, "step", JSON.parse(JSON.stringify(this.$store.state.addHouse.formData.step2)))
      return this.step
    }
  },
  data () {
    return {
      step: {},
      options: [],
      houseSourceList: formReander.HOUSESOURCE,//房屋来源
      houseNowList: formReander.HOUSENOW,//房屋现状
      isElevatorList: formReander.ISELEVATOR,//电梯
      landCharacteristicList: formReander.LANDCHARACTERISTIC,//土地性质
      primarySchoolUseList: formReander.PRIMARYSCHOOLUSE,//小学学籍占用
      middleSchoolUseList: formReander.MIDDLESCHOOLUSE,//中学学籍占用
      mortgageList: formReander.MORTGAGE,//抵押情况
      paymentMethodList: formReander.PAYMENTMETHOD,//付款方式
      houseBelongList: formReander.HOUSEBELONG,//配套设施
      roomTypeList: formReander.ROOMTYPE,//户型结构
      signList: formReander.SIGN,//户口情况
      houseDeliveryList: formReander.HOUSEDELIVERY,//交房时间
    }
  },
  methods: {
    validateAll () {
      let that = this;
      // return new Promise((r,s)=>{
      return this.$validator.validateAll().then((e) => {
        if (e) {
          //存入Vuex;
          that.$store.commit("updateStep2", that.formData);
          return true;
        }
        return false;
      })
    }
  },
}
</script>