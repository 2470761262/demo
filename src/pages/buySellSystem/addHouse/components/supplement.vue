<style lang="less" scoped>
@import url(../../../../assets/publicLess/upLoadFile.less);
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
.upLoadFile {
  margin-top: 60px;
  /deep/.el-slider__bar {
    background: #fea32e;
  }
  /deep/.el-slider__button {
    border-color: #fea32e;
  }
  .upLoadFile-title {
    margin-right: 20px;
  }
  .upLoadFile-file-list {
    border: 1px solid #f4f4f4;
    flex-direction: column;

    .audio-title {
      display: flex;
      justify-content: space-between;
      padding: 6px 10px 0;
      .removebut {
        color: black;
        font-size: 18px;
        cursor: pointer;
        display: none;
      }
      &:hover .removebut {
        display: block;
      }
    }
    .audio-contenr {
      display: flex;
      flex: 1;
      align-items: center;
      .audio-contenr-but {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #fea32e;
        color: #fff;
        text-align: center;
        line-height: 30px;
        font-size: 30px;
        text-shadow: 0px 0px 2px #fea32e, 0px 0px 8px #fea32e,
          0px 0px 16px #fea32e, 0px 0px 22px #fea32e, 0px 0px 30px #fea32e;
        margin: 0 20px;
      }
      .el-slider {
        flex: 1;
      }
      .autio-time {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>
<template>
  <div
    class="page-cell-addHouse"
    element-loading-text="我在去获取数据的路上了~"
    v-scrollError="errorBags.items"
    v-loading="loading"
  >
    <!-- 房屋来源 -->
    <div
      :class="{ 'after-tips': errorBags.has('houseSource') }"
      :data-tips="errorBags.first('houseSource')"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just">房源来源</div>
        <el-select
          class="anchor-point"
          v-model="formData.houseSource"
          placeholder="请选择房源来源"
          v-validate="required ? 'required' : ''"
          data-vv-as="房源来源"
          data-vv-name="houseSource"
          data-anchor="添加房源房源来源 => select"
        >
          <el-option
            data-anchor="添加房源房源来源 => select => option"
            class="anchor-point"
            v-for="item in houseSourceList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 房屋现状 -->
    <div
      :class="{ 'after-tips': errorBags.has('houseNow') }"
      :data-tips="errorBags.first('houseNow')"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just">房屋现状</div>
        <el-radio-group
          v-model="formData.houseNow"
          size="mini"
          v-validate="required ? 'required' : ''"
          data-vv-as="房屋现状"
          data-vv-name="houseNow"
        >
          <el-radio
            data-anchor="添加房源房屋现状 => radio"
            class="anchor-point"
            :label="item.value"
            v-for="item in houseNowList"
            :key="item.key"
            :value="item.value"
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <!-- 装修类型  -->
    <div
      :class="{ 'after-tips': errorBags.has('decoration') }"
      :data-tips="errorBags.first('decoration')"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just">装修类型</div>
        <el-radio-group
          v-model="formData.decoration"
          size="mini"
          v-validate="required ? 'required' : ''"
          data-vv-as="装修类型"
          data-vv-name="decoration"
        >
          <el-radio
            data-anchor="添加房源装修类型 => radio"
            class="anchor-point"
            :label="item.value"
            v-for="item in decorationList"
            :key="item.key"
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <!-- 户口情况 -->
    <div
      :class="{ 'after-tips': errorBags.has('sign') }"
      :data-tips="errorBags.first('sign')"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just">户口情况</div>
        <el-radio-group
          v-model="formData.sign"
          size="mini"
          v-validate="required ? 'required' : ''"
          data-vv-as="户口情况"
          data-vv-name="sign"
        >
          <el-radio
            data-anchor="添加房源户口情况 => radio"
            class="anchor-point"
            v-for="item in signList"
            :key="item.key"
            :label="item.value"
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <!-- 物业费 -->
    <div
      :class="{ 'after-tips': errorBags.has('propertyFee') }"
      :data-tips="errorBags.first('propertyFee')"
    >
      <div class="cell-item-cell el-input-w">
        <div class="item-before text-just">物业费</div>
        <el-input
          data-anchor="添加房源物业费 => input"
          type="text"
          v-model="formData.propertyFee"
          v-validate="
            required
              ? 'decimal:2|zero|max:14|required'
              : 'decimal:2|zero|max:14'
          "
          data-vv-as="物业费"
          class="anchor-point"
          data-vv-name="propertyFee"
          placeholder="请输入物业费"
          style="height:0.3rem;"
        ></el-input>
        <div class="item-after">元/平方</div>
      </div>
    </div>

    <!-- 附属配套 -->
    <div
      :class="{ 'after-tips': errorBags.has('houseBelong') }"
      :data-tips="errorBags.first('houseBelong')"
    >
      <div class="cell-item-cell el-input-w">
        <div class="item-before text-just">附属配套</div>
        <el-radio-group
          v-model="formData.houseBelong"
          size="mini"
          v-validate="required ? 'required' : ''"
          data-vv-as="附属配套"
          data-vv-name="houseBelong"
        >
          <el-radio
            data-anchor="添加房源附属配套 => radio"
            class="anchor-point"
            v-for="item in houseBelongList"
            :key="item.key"
            :label="item.value"
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
        <!-- <el-input v-if="houseBelongSelect=='其他'"
                type="text"
        v-model="formData.houseBelong"></el-input>-->
      </div>
    </div>
    <!-- 学籍占用 -->
    <div
      class="{'after-tips':errorBags.has('primaryRadio')}"
      :data-tips="errorBags.first('primaryRadio')"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just before-text" data-before="(小学)">
          学籍占用
        </div>
        <el-radio-group
          size="mini"
          @change="primaryRadioChange"
          v-model="primaryRadio"
        >
          <el-radio
            data-anchor="添加房源学籍占用 => radio"
            class="anchor-point"
            v-for="item in primarySchoolUseList"
            :key="item.value"
            :label="item.value"
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <!-- 小学占用选择 -->
    <div class="cell-item-cell no-top" v-if="primaryRadio == 1">
      <div class="item-before"></div>
      <div
        :class="{ 'after-tips': errorBags.has('primarySchoolGrade') }"
        :data-tips="errorBags.first('primarySchoolGrade')"
      >
        <el-radio-group
          v-validate="{ required: primaryRadio == 1 }"
          data-vv-name="primarySchoolGrade"
          data-vv-as="小学学籍占用"
          v-model="formData.primarySchoolGrade"
          size="mini"
        >
          <el-radio
            data-anchor="添加房源小学学籍占用 => radio"
            class="anchor-point"
            :label="item.value"
            v-for="item in primarySchoolUseRenderList"
            :key="item.value"
            border
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <!-- 中学籍占用 -->
    <div
      class="{'after-tips':errorBags.has('middleRadio')}"
      :data-tips="errorBags.first('middleRadio')"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just before-text" data-before="(中学)">
          学籍占用
        </div>
        <el-radio-group
          size="mini"
          @change="middleRadioChange"
          v-model="middleRadio"
        >
          <el-radio
            :data-anchor="'添加房源中学学籍占用 => radio' + item.key"
            class="anchor-point"
            v-for="item in middleSchoolUseList"
            :key="item.value"
            :label="item.value"
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <!-- 中学占用选择 -->
    <div class="cell-item-cell no-top" v-if="middleRadio == 1">
      <div class="item-before"></div>
      <div
        :class="{ 'after-tips': errorBags.has('middleSchoolGrade') }"
        :data-tips="errorBags.first('middleSchoolGrade')"
      >
        <el-radio-group
          v-validate="{ required: middleRadio == 1 }"
          data-vv-name="middleSchoolGrade"
          data-vv-as="中学学籍占用"
          v-model="formData.middleSchoolGrade"
          size="mini"
        >
          <el-radio
            :data-anchor="'添加房源中学学籍占用 => radio' + item.key"
            class="anchor-point"
            :label="item.value"
            v-for="item in middleSchoolUseRenderList"
            :key="item.value"
            border
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <!-- 抵押情况 -->
    <div
      :class="{ 'after-tips': errorBags.has('mortgageChange') }"
      :data-tips="errorBags.first('mortgageChange')"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just">抵押情况</div>
        <el-radio-group
          v-model="formData.mortgage"
          @change="mortgageChange"
          size="mini"
          v-validate="required ? 'required' : ''"
          data-vv-as="抵押情况"
          data-vv-name="mortgageChange"
        >
          <el-radio
            data-anchor="添加房源抵押情况 => radio"
            v-for="item in mortgageList"
            class="item-flex-avg anchor-point"
            :key="item.key"
            :label="item.value"
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <div class="cell-item-cell no-top">
      <div class="item-before"></div>
      <div
        :class="{
          'after-tips':
            errorBags.has('mortgageBank') ||
            errorBags.has('balance') ||
            errorBags.has('monthlyMortgage')
        }"
        :data-tips="
          errorBags.first('mortgageBank') ||
            errorBags.first('balance') ||
            errorBags.first('monthlyMortgage')
        "
      >
        <div class="cell-item-cell no-top">
          <el-select
            data-anchor="添加房源抵押银行 => select"
            class="anchor-point"
            v-show="formData.mortgage == 1"
            v-model="formData.mortgageBank"
            placeholder="请选择抵押银行"
            v-validate="formData.mortgage == 1 ? 'required' : ''"
            data-vv-as="抵押银行"
            data-vv-name="mortgageBank"
          >
            <el-option
              data-anchor="添加房源抵押银行 => select => option"
              class="anchor-point"
              v-for="item in mortgageBankList"
              :key="item.value"
              :label="item.key"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="Division" v-if="formData.mortgage == 1">余贷/月供</div>
          <el-input
            class="other-input anchor-point"
            v-model="formData.balance"
            data-anchor="添加房源余贷 => input"
            v-validate="
              formData.mortgage == 1 && required
                ? 'decimal:2|max:14|required'
                : 'decimal:2|max:14'
            "
            data-vv-as="余贷"
            data-vv-name="balance"
            placeholder="请输入余贷金额"
            v-show="formData.mortgage == 1"
          ></el-input>
          <div class="Division" v-if="formData.mortgage == 1">万元</div>
          <el-input
            data-anchor="添加房源月供 => input"
            class="other-input anchor-point"
            v-model="formData.monthlyMortgage"
            v-validate="
              formData.mortgage == 1 && required
                ? 'decimal:2|max:14|required'
                : 'decimal:2|max:14'
            "
            data-vv-as="月供"
            data-vv-name="monthlyMortgage"
            placeholder="请输入月供"
            v-show="formData.mortgage == 1"
          ></el-input>
          <div class="Division" v-if="formData.mortgage == 1">元/月</div>
        </div>
      </div>
    </div>
    <!-- 上次交易 -->

    <div class="cell-item-cell">
      <div class="item-before text-just">上次交易</div>
      <div
        :class="{ 'after-tips': errorBags.has('lastSale') }"
        :data-tips="errorBags.first('lastSale')"
      >
        <el-date-picker
          data-anchor="添加房源上次交易 => input"
          v-model="formData.lastSale"
          type="date"
          class="other-input anchor-point"
          placeholder="契税发票时间"
          v-validate="required ? 'required' : ''"
          data-vv-as="契税发票时间"
          data-vv-name="lastSale"
          value-format="yyyy-MM-dd"
          @change="changeOnly"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <div class="Division">是否唯一住房</div>
      <div
        :class="{ 'after-tips': errorBags.has('isOwnerOnly') }"
        :data-tips="errorBags.first('isOwnerOnly')"
      >
        <el-radio-group
          size="mini"
          v-model="formData.isOwnerOnly"
          v-validate="required ? 'required' : ''"
          data-vv-as="唯一住房"
          data-vv-name="isOwnerOnly"
          @change="changeOnly"
        >
          <el-radio
            data-anchor="添加房源唯一住房 => radio"
            class="anchor-point"
            v-for="item in isowneronlyList"
            :key="item.value"
            :label="item.value"
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
      </div>
      <div
        class="Division"
        v-show="
          formData.isOwnerOnly === 1 &&
            formData.lastSale != null &&
            formData.lastSale != ''
        "
      >
        {{ this.onlyStr }}
      </div>
    </div>

    <!-- 付款方式 -->
    <div class="cell-item-cell">
      <div class="item-before text-just">付款方式</div>
      <div
        :class="{
          'after-tips':
            errorBags.has('paymentMethod') || errorBags.has('lastPayment')
        }"
        :data-tips="
          errorBags.first('paymentMethod') || errorBags.first('lastPayment')
        "
      >
        <div class="cell-item-cell no-top">
          <el-select
            data-anchor="添加房源付款方式 => select"
            class="anchor-point"
            v-model="formData.paymentMethod"
            placeholder="付款方式"
            v-validate="required ? 'required' : ''"
            data-vv-as="付款方式"
            data-vv-name="paymentMethod"
          >
            <el-option
              data-anchor="添加房源付款方式 => select => option"
              class="anchor-point"
              v-for="item in paymentMethodList"
              :key="item.value"
              :label="item.key"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="Division">上次交易金额</div>
          <el-input
            data-anchor="添加房源上次交易金额 => input"
            class="other-input anchor-point"
            v-model="formData.lastPayment"
            v-validate="
              required ? 'decimal:2|max:14|required' : 'decimal:2|max:14'
            "
            data-vv-as="上次交易金额"
            data-vv-name="lastPayment"
            placeholder="报税价"
          ></el-input>
          <div class="Division">万</div>
        </div>
      </div>
    </div>
    <div class="division-line"></div>
    <!-- 房源标题 -->
    <div
      :class="{ 'after-tips': errorBags.has('title') }"
      :data-tips="errorBags.first('title')"
    >
      <div class="cell-item-cell el-input-w el-input-w-280">
        <div class="item-before text-just">房源标题</div>
        <el-input
          data-anchor="添加房源房源标题 => input"
          class="anchor-point"
          type="text"
          v-model="formData.title"
          placeholder="请输入房源标题"
          maxlength="15"
          v-validate="required ? 'required' : ''"
          data-vv-as="房源标题"
          data-vv-name="title"
        ></el-input>
        <div class="item-after">{{ formData.title.length }}/15</div>
      </div>
    </div>
    <!-- 小区介绍 -->
    <div
      :class="{ 'after-tips': errorBags.has('communityDesc') }"
      :data-tips="errorBags.first('communityDesc')"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just flex-start">小区介绍</div>
        <el-input
          data-anchor="添加房源小区介绍 => textarea"
          class="el-textarea anchor-point"
          type="textarea"
          placeholder="请输入小区介绍"
          v-model="formData.communityDesc"
          maxlength="50"
          resize="none"
          show-word-limit
          v-validate="required ? 'required' : ''"
          data-vv-as="小区介绍"
          data-vv-name="communityDesc"
        ></el-input>
      </div>
    </div>
    <!-- 户型介绍 -->
    <div
      :class="{ 'after-tips': errorBags.has('roomDesc') }"
      :data-tips="errorBags.first('roomDesc')"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just flex-start">户型介绍</div>
        <el-input
          data-anchor="添加房源户型介绍 => textarea"
          class="el-textarea anchor-point"
          type="textarea"
          placeholder="请输入户型介绍"
          v-model="formData.roomDesc"
          maxlength="50"
          resize="none"
          show-word-limit
          v-validate="required ? 'required' : ''"
          data-vv-as="户型介绍"
          data-vv-name="roomDesc"
        ></el-input>
      </div>
    </div>
    <!-- 税费解析 -->
    <div
      :class="{ 'after-tips': errorBags.has('taxDesc') }"
      :data-tips="errorBags.first('taxDesc')"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just flex-start">税费解析</div>
        <el-input
          data-anchor="添加房源税费解析 => textarea"
          class="el-textarea anchor-point"
          type="textarea"
          placeholder="请输入税费解析"
          v-model="formData.taxDesc"
          maxlength="50"
          resize="none"
          show-word-limit
          v-validate="required ? 'required' : ''"
          data-vv-as="税费解析"
          data-vv-name="taxDesc"
        ></el-input>
      </div>
    </div>
    <!-- 核心卖点 -->
    <div
      :class="{ 'after-tips': errorBags.has('saleDesc') }"
      :data-tips="errorBags.first('saleDesc')"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just flex-start">核心卖点</div>
        <el-input
          data-anchor="添加房源核心卖点 => textarea"
          class="el-textarea anchor-point"
          type="textarea"
          placeholder="请输入核心卖点"
          v-model="formData.saleDesc"
          maxlength="50"
          resize="none"
          show-word-limit
          v-validate="required ? 'required' : ''"
          data-vv-as="核心卖点"
          data-vv-name="saleDesc"
        ></el-input>
      </div>
    </div>
    <!-- 跟进类型 -->
    <div
      :class="{ 'after-tips': errorBags.has('followWay') }"
      :data-tips="errorBags.first('followWay')"
      v-if="showFollow"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just">跟进类型</div>
        <el-radio-group
          v-model="formData.followWay"
          size="mini"
          v-validate="required ? 'required' : ''"
          data-vv-as="跟进类型 "
          data-vv-name="followWay"
        >
          <el-radio
            data-anchor="添加房源跟进类型 => radio"
            class="anchor-point"
            v-for="item in followWayList"
            :key="item.key"
            :label="item.value"
            >{{ item.key }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <!-- 跟进内容 -->
    <div
      :class="{ 'after-tips': errorBags.has('followMemo') }"
      :data-tips="errorBags.first('followMemo')"
      v-if="showFollow"
    >
      <div class="cell-item-cell">
        <div class="item-before text-just flex-start">跟进内容</div>
        <el-input
          data-anchor="添加房源跟进内容 => textarea"
          class="el-textarea anchor-point"
          type="textarea"
          placeholder="请输入跟进内容"
          v-model="formData.followMemo"
          maxlength="50"
          resize="none"
          show-word-limit
          v-validate="required ? 'required' : ''"
          data-vv-as="跟进内容"
          data-vv-name="followMemo"
        ></el-input>
      </div>
    </div>
    <!-- 讲房语音 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">讲房语音</div>
      <div class="upLoadFile-flex">
        <div class="upLoadFile-right">
          <div
            class="upLoadFile-input"
            v-loading="audioFileLoading"
            element-loading-text="文件上传中~"
          >
            <label for="houseVideoList" class="el-icon-upload">
              <input
                data-anchor="添加房源音频文件上传 => input"
                class="anchor-point"
                id="houseVideoList"
                type="file"
                :disabled="isFromHouseTask ? false : !wxUploadFile"
                @change="getAudioFile($event)"
              />
            </label>
          </div>
          <div class="upLoadFile-file-list">
            <div class="audio-title">
              <span>{{ audioFile.id ? "音频.mp3" : "暂无" }}</span>
              <span
                data-anchor="添加房源音频文件删除 => click"
                v-if="audioFile.url"
                class="removebut el-icon-delete anchor-point"
                @click="removeAudio(audioFile.id, audioFile.url)"
              ></span>
            </div>
            <div class="audio-contenr">
              <audio
                :src="audioFile.url"
                ref="audio"
                v-if="audioFile.url"
                v-audioLoad
              ></audio>
              <div
                class="anchor-point"
                :class="['audio-contenr-but', audioPlay.icon]"
                data-anchor="添加房源音频文件播放 => click"
                @click="openVideo"
              ></div>
              <el-slider
                data-anchor="添加房源音频文件播放时间滑动 => click"
                class="anchor-point"
                v-model="audioPlay.nowTime"
                :format-tooltip="formatTooltip"
                @input="audioSliderChange"
                ref="audioSlider"
                :max="audioPlay.endTime"
                :disabled="audioFile.url ? false : true"
              ></el-slider>
              <div class="autio-time">
                {{ audioPlay.nowTime | timefomat }} /
                {{ audioPlay.endTime | timefomat }}
              </div>
            </div>
          </div>
          <div class="upLoadFile-file-phone" style="justify-content:normal">
            <div>
              <el-image
                class="anchor-point"
                :src="audioQrCodeImage"
                :preview-src-list="[audioQrCodeImage]"
                fit="cover"
              >
                <div slot="placeholder" class="image-slot">
                  加载中
                  <span>...</span>
                </div>
              </el-image>
            </div>
            <div
              v-if="isFromHouseTask ? true : wxUploadFile"
              style="text-overflow:ellipsis; white-space: nowrap;"
            >
              微信扫码上传
            </div>
            <div
              v-if="isFromHouseTask ? false : !wxUploadFile"
              style="text-overflow:ellipsis; white-space: nowrap;"
            >
              暂无上传权限.
            </div>
          </div>
        </div>
        <div v-if="isFromHouseTask ? true : wxUploadFile">
          仅可以上传一个音频.
        </div>
        <div v-if="isFromHouseTask ? false : !wxUploadFile">暂无上传权限.</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as formReander from "@/util/constMap";
import util from "@/util/util";
import but from "@/evenBus/but.js";
import releaseHouse from "@/pages/buySellSystem/houseDetails/common/releaseHouse.js";
//import func from '../../../../../vue-temp/vue-editor-bridge';
const USE = [
  {
    key: "未占用",
    value: 0
  },
  {
    key: "占用",
    value: 1
  }
];
let updateFileMap = new Map([
  ["houseSource", "房屋来源", "Source"],
  ["houseNow", "房屋现状", "HousingSituation"],
  ["decoration", "装修类型", "Decoration"],
  ["sign", "户口情况", "Sign"],
  ["propertyFee", "物业费", "PropertyFee"],
  ["houseBelong", "附属配套", "HouseBelong"],
  ["primarySchoolUse", "是否学籍占用（小学）", "primary_school_use"],
  ["middleSchoolUse", "是否学籍占用（中学）", "middle_school_use"],
  ["primarySchoolGrade", "占用的学籍（小学）", "primary_school_grade"],
  ["middleSchoolGrade", "占用的学籍（中学）", "middle_school_grade"],
  ["mortgage", "抵押情况", "Mortgage"],
  ["mortgageBank", "抵押银行", "MortgageLoanBank"],
  ["balance", "剩余贷款", "Balance"],
  ["monthlyMortgage", "月供", "MonthlyMortgage"],
  ["lastSale", "上次交易时间", "IsTwoYears"],
  ["isOwnerOnly", "是否唯一住房", "OnlyHouse"],
  ["paymentMethod", "付款方式", "PaymentMethod"],
  ["lastPayment", "上次交易金额", "LastTransactionAmount"],
  ["title", "房源标题", "Title"],
  ["communityDesc", "小区介绍", "remark"],
  ["roomDesc", "户型介绍", "remark"],
  ["taxDesc", "税费解析", "remark"],
  ["saleDesc", "核心卖点", "remark"]
]);
const remarkFiledList = ["communityDesc", "roomDesc", "taxDesc", "saleDesc"];
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  name: "supplement",
  props: {
    // aaa: {
    //   type: Boolean,
    //   default: false
    // },
    getData: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    middleRadioTo: {
      type: Number,
      default: null
    },
    primaryRadioTo: {
      type: Number,
      default: null
    },
    showFollow: {
      type: Boolean,
      default: false
    },
    audioList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    paramsObj: {
      type: Object,
      default: () => {}
    },
    nextSaveButton: {
      type: Boolean,
      default: false
    },
    wxUploadFile: {
      type: Boolean,
      default: false
    },
    isFromHouseTask: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formData() {
      this.$set(
        this.$data,
        "step",
        JSON.parse(JSON.stringify(this.$store.state.addHouse.formData.step2))
      );
      if (this.$store.state.addHouse.formData.step2.houseNow) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.step.houseNow = parseInt(
          this.$store.state.addHouse.formData.step2.houseNow
        );
      }
      return this.step;
    }
  },
  filters: {
    timefomat(value) {
      return util.timeToStr(value);
    }
  },
  directives: {
    audioLoad: {
      bind(el, binding, vnode) {
        el.addEventListener("loadedmetadata", () => {
          vnode.context.audioPlay.endTime = parseInt(el.duration);
        });
        el.addEventListener("timeupdate", () => {
          vnode.context.audioPlay.nowTime = parseInt(el.currentTime);
        });
        el.addEventListener("ended", () => {
          vnode.context.audioPlay.nowTime = 0;
          vnode.context.audioPlay.icon = "el-icon-video-play";
        });
      }
    }
  },
  mounted() {
    let that = this;
    that.isLeavePage = false;
    //true 则去获取数据
    if (this.getData) {
      this.loading = true;
      Promise.all([this.getAudio(), this.getLoadData()])
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    }
    // 重新验真情况设置数据
    if (this.$store.state.addHouse.isAfresh) {
      this.setAfreshData();
    }
    if (this.audioList != null && this.audioList.length > 0) {
      this.audioFile = this.audioList[0];
    }
    this.getQrCode(
      { remark: "录入房源-上传音频", resourceType: "audio" },
      function(data) {
        if (!that.isLeavePage) {
          //还没等请求完毕就下一步录入了，那么不需要回调这个了
          that.audioQrCodeImage = data.url;
          that.contactSocket(data.qrCode);
        }
      }
    );
    // console.log("but", but);
    // but.$on("nextSaveButton", () => {
    //   this.nextSaveData = true;
    // });
    // but.$on("wxUploadFile", () => {
    //   console.log("111111111");
    //   this.uploadFile = true;
    // });
    // console.log("nextSaveButton", this.nextSaveData);
    // console.log("wxUploadFile", this.uploadFile);
  },
  beforeRouteLeave(to, from, next) {
    //console.log("离开了供给页面，不需要执行任何请求回调");
    this.isLeavePage = true;
    next();
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        //deff 获取到修改的属性
        let deffData = util.diffGet(
          this.$store.state.addHouse.formData.step2,
          this.formData
        );
        // console.log(
        //   this.$store.state.addHouse.formData.step2,
        //   this.formData,
        //   " this.$store.state.addHouse.formData.step2"
        // );
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
  data() {
    return {
      isLeavePage: false,
      audioPlay: {
        playOrEnd: true,
        nowTime: 0,
        endTime: 0,
        icon: "el-icon-video-play"
      },
      audioFileLoading: false, //音频上传louding
      audioFile: {}, //音频
      loading: false,
      step: {},
      options: [],
      deffData: {},
      primaryRadio: this.primaryRadioTo,
      middleRadio: this.middleRadioTo,
      houseBelongSelect: "",
      primarySchoolUseRenderList: formReander.PRIMARYSCHOOLUSE, //小学占用
      middleSchoolUseRenderList: formReander.MIDDLESCHOOLUSE, //中学占用
      houseSourceList: formReander.HOUSESOURCE, //房屋来源
      houseNowList: formReander.HOUSENOW, //房屋现状
      primarySchoolUseList: USE, //小学学籍占用
      middleSchoolUseList: USE, //中学学籍占用
      mortgageList: formReander.MORTGAGE, //抵押情况
      paymentMethodList: formReander.PAYMENTMETHOD, //付款方式
      houseBelongList: formReander.HOUSEBELONG, //配套设施
      signList: formReander.SIGN, //户口情况
      decorationList: formReander.DECORATION, //装修类型
      isowneronlyList: formReander.ISOWNERONLY, //是否唯一住房
      mortgageBankList: formReander.MORTGAGEBANK, //抵押银行
      followWayList: formReander.FOLLOWWAY, //跟进类型
      audioQrCodeImage: "",
      onlyStr: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      //nextSaveData: false,
      //uploadFile: false,
      isNextDisable: false
    };
  },
  methods: {
    //删除audio
    removeAudio(id, url) {
      this.$api
        .delete({
          url: `/verifyHouse/audio/${id}`,
          data: {
            url: url
          },
          qs: true
        })
        .then(e => {
          if (e.data.code == 200) {
            this.audioFile = {};
            Object.assign(this.$data.audioPlay, this.$options.data().audioPlay);
            this.$store.commit("updateFile", {
              audioFile: this.audioFile
            });
          }
        });
    },
    contactSocket(user) {
      // console.log("用户【" + user + "】开始接入");
      this.socketApi.initWebSocket(
        this.$api.baseUrl().replace("http", ""),
        user
      );
      this.socketApi.initReceiveMessageCallBack(this.receiveMessage);
      // console.log("用户【" + user + "】接入完毕");
    },
    receiveMessage(r) {
      let that = this;
      // console.log(r, "录入房源页面之音频上传接收到了消息");
      if (r.content.resourceType == "audio") {
        // console.log(r.content, "音频消息内容，准备插入草稿箱");
        that.uploadFileInfo(r.content.picUrl, function(data) {
          that.audioFile = data;
        });
      }
    },
    //获取扫码上传语音二维码
    getQrCode(data, callback) {
      let that = this;
      that.isNextDisable = true;
      if (that.isFromHouseTask ? false : !that.wxUploadFile) {
        return;
      }
      that.$api
        .post({
          url: "/scanUpload/getUploadQrCode",
          data: data,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          // console.log("请求二维码成功");
          if (result.code == 200) {
            //that.qrCodeImg="data:image/png;base64,"+item.img;
            callback(result.data);
          } else {
            // console.log("h获取二维码结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log(e, "查询二维码失败");
        })
        .finally(e => {
          that.isNextDisable = false;
        });
    },
    uploadFileInfo(url, callback) {
      let that = this;
      this.audioFileLoading = true;
      let formData = {};
      if (this.paramsObj.getEditUrl) {
        formData.Eid = that.$store.state.addHouse.formData.id;
      } else {
        formData.DraftId = that.$store.state.addHouse.formData.id;
      }

      formData.IpStr = url;
      this.$api
        .post({
          url: `/verifyHouse/audioDraft`,
          headers: { "Content-Type": "application/json" },
          data: formData
        })
        .then(json => {
          if (json.data.code == 200) {
            let d = json.data.data;
            d.url = url;
            callback(d);
          }
        })
        .catch(e => {
          that.$message({
            message: "不晓得为什么,反正失败了",
            type: "warning"
          });
        })
        .finally(() => {
          this.audioFileLoading = false;
        });
    },
    //根据ID获取已经上传的音频
    getAudio() {
      let url = `/verifyHouse/audios/${this.$store.state.addHouse.formData.id}`;
      if (this.paramsObj.getAudioUrl) {
        url =
          this.paramsObj.getAudioUrl + this.$store.state.addHouse.formData.id;
      }
      return this.$api
        .post({
          url: url
        })
        .then(e => {
          if (e.data.code == 200 && e.data.data.length != 0) {
            this.audioFile = e.data.data[0];
          }
        });
    },
    //获取音频上传
    getAudioFile(e) {
      let that = this;
      if (that.isFromHouseTask ? false : !this.wxUploadFile) {
        this.$message.error("暂无上传权限");
        return;
      }
      let file = event.target.files;
      let isVideoType = ["audio/mp3", "audio/mpeg"];
      //console.log("音频格式：" + file[0].type);
      if (!isVideoType.includes(file[0].type)) {
        this.$message.error("上传的音频只能是MP3格式!");
        return;
      }
      if (Object.keys(this.audioFile).length != 0) {
        this.$message.error("只能上传一个音频");
        return;
      }
      this.uploadSectionFile(file[0]);
    },
    //格式化slider时间
    formatTooltip(val) {
      return util.timeToStr(val);
    },
    //播放 or 暂停音频
    openVideo() {
      let audio = this.$refs.audio;
      try {
        if (audio.paused) {
          audio.play();
          this.audioPlay.icon = "el-icon-video-pause";
        } else {
          audio.pause();
          this.audioPlay.icon = "el-icon-video-play";
        }
      } catch (error) {
        this.$message.error("是不是没有音频阿!");
      }
    },
    //监听进度条拉动设置播放位置
    audioSliderChange(e) {
      if (this.$refs.audioSlider.dragging) {
        this.$refs.audio.currentTime = e;
      }
    },
    uploadSectionFile(uploader) {
      let that = this;
      this.audioFileLoading = true;
      let formData = new FormData();
      if (this.paramsObj.getEditUrl) {
        formData.append("eid", that.$store.state.addHouse.formData.id);
      } else {
        formData.append("draftId", that.$store.state.addHouse.formData.id);
      }
      formData.append("file", uploader);
      this.$api
        .post({
          url: `/verifyHouse/audio`,
          headers: { "Content-Type": "multipart/form-data" },
          data: formData
        })
        .then(json => {
          if (json.data.code == 200) {
            this.audioFile = json.data.data;
            this.$store.commit("updateFile", {
              audioFile: this.audioFile
            });
          }
        })
        .catch(e => {
          that.$message({
            message: "不晓得为什么,反正失败了",
            type: "warning"
          });
        })
        .finally(() => {
          this.audioFileLoading = false;
        });
    },
    setAfreshData() {
      let afreshData = this.$store.state.addHouse.formData.step2;
      if (afreshData.middleSchoolUse === 0) {
        this.middleRadio = 0;
      } else if (afreshData.middleSchoolUse >= 1) {
        this.middleRadio = 1;
      } else {
        this.middleRadio = 0;
      }
      if (afreshData.primarySchoolUse === 0) {
        this.primaryRadio = 0;
      } else if (afreshData.primarySchoolUse >= 1) {
        this.primaryRadio = 1;
      } else {
        this.primaryRadio = 0;
      }
      this.audioFile = this.$store.state.addHouse.formData.file.audioFile;
    },
    getLoadData() {
      this.loading = true;
      let url = `/verifyHouse/${this.$store.state.addHouse.formData.id}`;
      if (this.paramsObj.getEditUrl) {
        url =
          this.paramsObj.getEditUrl + this.$store.state.addHouse.formData.id;
      }
      return this.$api
        .get({
          url: url
        })
        .then(e => {
          if (e.data.code == 200) {
            //需要显示长的属性不能是null 如果是null则删除不覆盖store的默认值
            let isNullforStr = [
              "title",
              "communityDesc",
              "roomDesc",
              "taxDesc",
              "saleDesc"
            ];
            isNullforStr.forEach(item => {
              if (e.data.data[item] == null) {
                delete e.data.data[item];
              }
            });
            if (e.data.data.mortgageBank) {
              e.data.data.mortgageBank = parseInt(e.data.data.mortgageBank);
            }
            if (e.data.data.houseNow) {
              e.data.data.houseNow = parseInt(e.data.data.houseNow);
            }

            if (e.data.data.middleSchoolUse === 0) {
              this.middleRadio = 0;
            } else if (e.data.data.middleSchoolUse >= 1) {
              this.middleRadio = 1;
            } else {
              this.middleRadio = 0;
            }

            if (e.data.data.primarySchoolUse === 0) {
              this.primaryRadio = 0;
            } else if (e.data.data.primarySchoolUse >= 1) {
              this.primaryRadio = 1;
            } else {
              this.primaryRadio = 0;
            }
            this.$store.dispatch("InitFormData", {
              commitName: "updateStep2",
              json: e.data.data
            });
          }
        })
        .catch(e => {
          return false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //抵押情况切换
    mortgageChange(e) {
      if (e != 1) {
        this.formData.mortgageBank = null;
      }
    },
    //中学占用切换
    middleRadioChange(e) {
      this.formData.middleSchoolUse = e;
      //if (e == 0) {

      // this.$store.dispatch("InitFormData", {
      //   commitName: "updateStep2",
      //   json: {
      //     middleSchoolUse: -1
      //   }
      // });
      //}
    },
    //小学占用切换
    primaryRadioChange(e) {
      this.formData.primarySchoolUse = e;
      //if (e == 0) {
      // this.$store.dispatch("InitFormData", {
      //   commitName: "updateStep2",
      //   json: {
      //     primarySchoolUse: -2
      //   }
      // });
      // }
    },
    validateAll() {
      let that = this;
      if (
        this.isNextDisable &&
        !(that.isFromHouseTask ? false : !that.wxUploadFile)
      ) {
        this.$message.error("二维码加载中...请稍后");
        return;
      }
      return this.$validator
        .validateAll()
        .then(e => {
          if (e) {
            return true;
          }
          return false;
        })
        .then(e => {
          if (e) {
            return that.setDataToUpdate();
          } else {
            return false;
          }
        });
    },
    validateAllNotUpdata() {
      let that = this;
      return this.$validator.validateAll().then(e => {
        if (e) {
          return true;
        }
        return false;
      });
    },
    getRemark(value) {
      return (
        "$小区介绍@" +
        value.communityDesc +
        "$户型介绍@" +
        value.roomDesc +
        "$税费解析@" +
        value.taxDesc +
        "$核心卖点@" +
        value.saleDesc
      );
    },
    //修改数据到接口
    setDataToUpdate() {
      let that = this;
      let sendData = {
        id: that.$store.state.addHouse.formData.id,
        ...that.deffData
      };
      let url = "/verifyHouse";
      if (Object.keys(this.deffData).length == 0 || !this.nextSaveButton) {
        //没有做出修改  或者 没有下一步保存的按钮权限
        // console.log("跳过保存，当前权限：", this.nextSaveButton);
        return true;
      }
      if (this.paramsObj.editUrl) {
        url = this.paramsObj.editUrl;
        sendData.communityDesc = that.formData.communityDesc;
        sendData.roomDesc = that.formData.roomDesc;
        sendData.saleDesc = that.formData.saleDesc;
        sendData.taxDesc = that.formData.taxDesc;
        sendData.saleHouseUpdateRecordList = [];
        let updateFiledList = []; //用于记录是否添加过改字段
        Object.keys(this.deffData).forEach(item => {
          if (
            item != "id" &&
            !updateFiledList.includes(updateFileMap.get(item))
          ) {
            sendData.saleHouseUpdateRecordList.push({
              houseId: that.$store.state.addHouse.formData.id,
              updateFiled: updateFileMap.get(item),
              oldValue: remarkFiledList.includes(item)
                ? this.getRemark(this.$store.state.addHouse.formData.step2)
                : this.$store.state.addHouse.formData.step2[item],
              newValue: remarkFiledList.includes(item)
                ? this.getRemark(that.formData)
                : this.deffData[item]
            });
            updateFiledList.push(updateFileMap.get(item));
          }
        });
      }
      if (this.paramsObj.editUrl) { // 编辑
        return this.$api
          .put({
            url: url,
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            data: sendData
          })
          .then(e => {
            if (e.data.code == 200) {
              if (this.paramsObj.editUrl) {
                //更新成功,同步更新外网
                sendData.houseNo = this.$store.state.addHouse.formData.houseNo;
                releaseHouse.updateOutsideHouse(sendData);
              }
              //存入Vuex;
              that.$store.commit("updateStep2", that.deffData);
              return true;
            } else {
              return false;
            }
          })
          .catch(() => {
            return false;
          });
      } else { // 录入
        // 数据只保存到本地
        that.$store.commit("updateStep2", that.deffData);
        return true;
      }
    },
    changeOnly() {
      if (
        this.formData.isOwnerOnly === 1 &&
        this.formData.lastSale != null &&
        this.formData.lastSale != ""
      ) {
        let iDays = parseInt(
          Math.abs(new Date() - new Date(this.formData.lastSale)) /
            1000 /
            60 /
            60 /
            24 /
            365
        );
        if (iDays >= 5) {
          this.onlyStr = "满5唯一";
        } else if (iDays >= 2) {
          this.onlyStr = "满2唯一";
        } else {
          this.onlyStr = "";
        }
      }
    }
  }
};
</script>
