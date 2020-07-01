<style lang="less" scoped>
@import "../less/form.less";
.step-content {
  .step-content();
  padding: 0 24px 24px;
  background: rgba(255, 255, 255, 1);
}
</style>
<template>
  <section>
    <section class="step-content">
      <h3 class="title">您的客户信息</h3>
      <i class="split-line"></i>
      <!-- 客户姓名 -->
      <div
        class="input-group is-required"
        :class="{ 'error-tips': errorBags.has('customeName') }"
      >
        <div class="input-head">客户姓名</div>

        <el-input
          v-model="mock"
          class="input-content"
          clearable
          placeholder="请输入客户的姓名"
          data-vv-name="customeName"
          data-vv-as="客户姓名"
          v-validate="'required'"
        />
      </div>
      <!-- 客户性别 -->
      <div class="input-group is-required">
        <div class="input-head">客户性别</div>
        <label class="radio-content" v-for="item in sex" :key="item.value">
          <input
            type="radio"
            name="sex"
            :value="item.value"
            v-model="mock"
            data-vv-name="customeSex"
            data-vv-as="客户性别"
            v-validate="'required'"
          />
          <div class="radio-title">{{ item.key }}</div>
        </label>
        <div
          :class="{
            'after-error-tips': errorBags.has('customeSex')
          }"
          :data-error="errorBags.first('customeSex')"
        ></div>
      </div>
      <!-- 客户来源 -->
      <div class="input-group is-required">
        <div class="input-head">客户来源</div>
        <select-cascader
          :error-flag="errorBags.has('cascader')"
          @submitResult="submitResult"
          data-vv-name="cascader"
          data-vv-as="客户来源"
          v-validate="'required|length:2'"
          v-model="cascaderList"
        />
      </div>
      <!-- 客户电话 -->
      <div
        class="input-group is-required "
        :class="{ 'error-tips': errorBags.has('phone') }"
      >
        <div class="input-head">
          <span>客户电话</span>
          <span
            class="inline-btn"
            @click="addTelToList"
            v-show="addTel.length < 2"
            >添加</span
          >
        </div>
        <div class="input-assist-tips" v-if="addTel.length != 0">客户电话1</div>
        <el-input
          v-model="mock"
          class="input-content"
          clearable
          placeholder="请输入客户的电话号码"
          maxlength="11"
          show-word-limit
          data-vv-name="phone"
          data-vv-as="客户号码"
          v-validate="'required|phone'"
        />
        <div
          :class="{
            'after-error-tips': mock.length != 0 && errorBags.has('phone')
          }"
          :data-error="errorBags.first('phone')"
        ></div>
      </div>
      <!-- 动态添加号码 -->
      <div
        class="input-group "
        v-for="(item, index) in addTel"
        :key="index"
        :class="{ 'error-tips': errorBags.has('phone' + (index + 2)) }"
      >
        <div class="input-assist-tips" v-if="addTel.length != 0">
          客户电话{{ index + 2 }}
        </div>
        <div class="input-pack">
          <el-input
            v-model="mock"
            class="input-content"
            clearable
            placeholder="请输入客户的电话号码"
            maxlength="11"
            show-word-limit
            :data-vv-name="'phone' + (index + 2)"
            data-vv-as="客户号码"
            v-validate="'phone'"
          />
          <i
            class="el-icon-remove inline-remove-btn"
            @click="removeTelToList(index)"
          ></i>
        </div>
        <div
          :class="{
            'after-error-tips':
              mock.length != 0 && errorBags.has('phone' + (index + 2))
          }"
          :data-error="errorBags.first('phone' + (index + 2))"
        ></div>
      </div>
      <!-- 购房意向 -->
      <div class="input-group">
        <div class="input-head">购房意向</div>
        <!-- class="input-content" -->
        <el-select
          v-model="mock"
          popper-class="options-item"
          class="input-content"
          placeholder="请选择购房意向"
        >
          <el-option
            v-for="item in buyintention"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 客户籍贯 -->
      <div class="input-group">
        <div class="input-head">客户籍贯</div>
        <el-input
          v-model="mock"
          class="input-content"
          clearable
          placeholder="请输入客户的籍贯"
        />
      </div>
      <!-- 客户印象 -->
      <div class="input-group">
        <div class="input-head">客户印象</div>
        <div class="tag-content">
          <el-tag
            v-for="(tag, index) in tags"
            :key="index"
            closable
            type="info"
            @close="handleClose(index)"
          >
            {{ tag }}
          </el-tag>
        </div>
        <el-button
          type="primary"
          class="primary-btn"
          @click="openPop('followUpFlag')"
          >添加</el-button
        >
        <div class="alert-content warning" v-if="tags.length != 0">
          提示:最多可添加五条客源印象
        </div>
      </div>
      <!-- 客户客源印象 -->
      <fixed-popup
        styleType="0"
        :visible.sync="followUpFlag"
        width="auto"
        @confirmEmit="addImpressionConfirm"
      >
        <div class="input-group is-required pop-content">
          <div class="input-head">客户客源印象</div>
          <el-input
            v-model="mock1"
            class="input-content"
            clearable
            placeholder="请输入客户印象"
          />
        </div>
      </fixed-popup>
    </section>
    <i class="split-step-content"></i>
    <section class="step-content">
      <h3 class="title">客户需求</h3>
      <i class="split-line"></i>
      <!-- 需求类型 -->
      <div class="input-group is-required">
        <div class="input-head">需求类型</div>
        <el-button type="primary" class="primary-btn">添加</el-button>
        <!-- <div class="alert-content warning" v-if="tags.length != 0">
          提示:最多可添加五条客源印象
        </div> -->
      </div>
    </section>
  </section>
</template>

<script>
const cascaderList = [
  {
    title: "人际开发",
    value: 0,
    children: [
      { title: "公众号0", value: 0 },
      { title: "APP0", value: 1 },
      { title: "小程序0", value: 2 }
    ]
  },
  {
    title: "二次开发",
    value: 1,
    children: [
      { title: "公众号1", value: 3 },
      { title: "APP1", value: 4 },
      { title: "小程序1", value: 5 }
    ]
  },
  {
    title: "网络端口",
    value: 2,
    children: [
      { title: "公众号2", value: 6 },
      { title: "APP2", value: 7 },
      { title: "小程序2", value: 8 }
    ]
  },
  {
    title: "鑫家网",
    value: 3,
    children: [
      { title: "公众号3", value: 9 },
      { title: "APP3", value: 10 },
      { title: "小程序3", value: 11 },
      { title: "小程序3", value: 12 },
      { title: "小程序3", value: 13 },
      { title: "小程序3", value: 14 }
    ]
  }
];

import { SEX, BUYINTENTION } from "@/util/constMap";
import selectCascader from "./selectCascader";
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  components: {
    selectCascader
  },
  data() {
    return {
      followUpFlag: false,
      mock: "",
      mock1: "",
      sex: SEX,
      addTel: [],
      cascaderList: cascaderList,
      buyintention: BUYINTENTION,
      tags: []
    };
  },
  methods: {
    submitResult(value) {
      console.log(value);
    },
    //添加电话号码12
    addTelToList() {
      let defaultList = [1, 2];
      if (this.addTel.length < 2) {
        for (let index = 0; index < defaultList.length; index++) {
          if (!this.addTel.includes(defaultList[index])) {
            this.addTel.push(defaultList[index]);
            break;
          }
        }
      }
      this.addTel.sort();
    },
    removeTelToList(index) {
      this.addTel.splice(index, 1);
    },
    /**
     * @example: openPop
     * @param{string} popName 弹框属性名字
     */
    openPop(popName) {
      this[popName] = true;
    },
    /**
     * @example: 弹框组件确定点击事件
     */
    addImpressionConfirm() {
      this.tags.push(this.mock1);
      this.mock1 = "";
      this.followUpFlag = false;
    },
    /**
     * @example: 印象数组删除
     */
    handleClose(index) {
      this.tags.splice(index, 1);
    }
  }
};
</script>
