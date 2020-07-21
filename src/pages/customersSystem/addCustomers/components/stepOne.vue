<style lang="less" scoped>
@import "../less/form.less";

.step-content {
  .step-content();
  padding: 0 24px 24px;
  background: rgba(255, 255, 255, 1);
  .impression-box {
    padding-bottom: 36px;
  }
  .mar-top {
    margin-top: 28px !important;
  }
  .anchor-point {
    width: 162px;
    margin-right: 10px;
  }
}
/deep/ .suffix-tips {
  cursor: pointer;
  color: @backgroud;
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
        :class="{ 'error-tips': errorBags.has('Customers') }"
      >
        <div class="input-head">客户姓名</div>

        <el-input
          v-model="formData.Customers"
          class="input-content"
          clearable
          maxlength="5"
          placeholder="请输入客户的姓名"
          data-vv-name="Customers"
          data-vv-as="客户姓名"
          v-validate="'required|isChinese|chineseLen'"
        />
        <div
          :class="{
            'after-error-tips': errorBags.has('Customers')
          }"
          :data-error="errorBags.first('Customers')"
        ></div>
      </div>
      <!-- 客户性别 -->
      <div class="input-group is-required">
        <div class="input-head">客户性别</div>
        <label class="radio-content" v-for="item in sexList" :key="item.value">
          <input
            type="radio"
            :value="item.value"
            v-model="formData.sex"
            data-vv-name="sex"
            data-vv-as="客户性别"
            v-validate="'required'"
          />
          <div class="radio-title">{{ item.key }}</div>
        </label>
        <div
          :class="{
            'after-error-tips': errorBags.has('sex')
          }"
          :data-error="errorBags.first('sex')"
        ></div>
      </div>
      <!-- 客户来源 -->
      <div class="input-group is-required">
        <div class="input-head">客户来源</div>
        <select-cascader
          :error-flag="errorBags.has('cascader')"
          data-vv-name="cascader"
          data-vv-as="客户来源"
          v-validate="'required|length:2'"
          :cascaderList="cascaderList"
          v-model="formData.sourceList"
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
            v-show="formData.tels.length <= 2"
            >添加</span
          >
        </div>
        <div v-for="(item, index) in formData.tels" :key="index">
          <div class="input-assist-tips" v-if="formData.tels.length != 1">
            {{ "客户电话" + (index + 1) }}
          </div>
          <div class="input-pack">
            <el-input
              v-model="item.phone"
              :disabled="item.isDisabled"
              class="input-content"
              clearable
              placeholder="请输入客户的电话号码"
              maxlength="11"
              @blur="checkRepeatPhone(item.phone)"
              :data-vv-name="'phone' + (index + 1)"
              data-vv-as="客户号码"
              v-validate="{
                required: true,
                phone: true,
                isSame: [
                  [...formData.tels.map((tels, index) => tels.phone)],
                  '手机号'
                ]
              }"
            >
              <!-- <el-button slot="append">.com</el-button> -->
              <template v-slot:suffix v-if="index != 0">
                <i class="suffix-tips" @click="topPhone(index)">置顶</i>
              </template>
            </el-input>

            <i
              v-if="formData.tels.length != 1 && !item.isDisabled"
              class="el-icon-remove inline-remove-btn"
              @click="removeTelToList(index)"
            ></i>
          </div>

          <div
            :class="{
              'after-error-tips':
                formData.tels.length != 0 &&
                errorBags.has('phone' + (index + 1))
            }"
            :data-error="errorBags.first('phone' + (index + 1))"
          ></div>
        </div>
        <div class="mar-top alert-content warning ">
          提示:客户手机号码一经提交不可修改，请认真填写
        </div>
      </div>
      <!-- 购房意向 -->
      <div class="input-group">
        <div class="input-head">购房意向</div>
        <!-- class="input-content" -->
        <el-select
          v-model="formData.desireIntensity"
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
      <div class="input-group">
        <div class="input-head">客户籍贯</div>
        <el-select
          class="anchor-point"
          v-model="formData.provinceId"
          @change="provinceChange"
          placeholder="请选择省份"
          filterable
        >
          <el-option
            class="anchor-point"
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select
          class="anchor-point"
          v-model="formData.cityId"
          filterable
          placeholder="请选择市区"
          @change="cityChange"
        >
          <el-option
            class="anchor-point"
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select
          class="anchor-point"
          v-model="formData.countyId"
          filterable
          @change="countyChange"
          placeholder="请选择区"
        >
          <el-option
            class="anchor-point"
            v-for="item in countyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <!-- 客户印象 -->
      <div class="input-group">
        <div class="input-head">客户印象</div>
        <div class="tag-content">
          <el-tag
            v-for="(tag, index) in formData.myImpression"
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
        <div
          class="alert-content warning"
          v-if="formData.myImpression.length != 0"
        >
          提示:最多可添加五条客源印象
        </div>
      </div>
      <!-- 客户客源印象 -->
      <fixed-popup
        styleType="0"
        v-if="followUpFlag"
        :visible.sync="followUpFlag"
        width="auto"
        @confirmEmit="addImpressionConfirm"
      >
        <div
          class="input-group is-required impression-box"
          :class="{ 'error-tips': errorBags.has('impression') }"
        >
          <div class="input-head">客户客源印象</div>

          <el-input
            v-model="mock1"
            class="input-content"
            clearable
            maxlength="5"
            placeholder="请输入客源印象"
            data-vv-name="impression"
            data-vv-as="客源印象"
            v-validate="'required|overstep:5'"
          />
          <div
            :class="{
              'after-error-tips': errorBags.has('impression')
            }"
            :data-error="errorBags.first('impression')"
          ></div>
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
        <div class="tag-content">
          <el-tag
            v-for="(tag, index) in demandData.rendList"
            :key="index"
            closable
            type="info"
            @close="moreHandleClose(tag)"
          >
            {{ tag.title }}
          </el-tag>
        </div>
        <el-button
          type="primary"
          class="primary-btn"
          @click="openPop('moreSelectFlag')"
          >添加</el-button
        >
        <div
          :class="{
            'after-error-tips': errorBags.has('moreSelect')
          }"
          :data-error="errorBags.first('moreSelect')"
        ></div>
      </div>
      <!-- 多选弹出层 -->
      <demand-more-select
        ref="moreSelect"
        styleType="0"
        :visible.sync="moreSelectFlag"
        width="506px"
        title="选择需求信息(多选)"
        @demandConfirm="demandConfirm"
        v-model="demandValue"
        data-vv-name="moreSelect"
        data-vv-as="需求类型"
        v-validate="'required|arrFlatLength:0'"
      >
      </demand-more-select>
    </section>
  </section>
</template>

<script>
const cascaderList = [
  {
    title: "人际开发",
    value: 1,
    children: [
      { title: "老客户", value: 11 },
      { title: "转介绍", value: 12 },
      { title: "亲朋好友", value: 13 },
      { title: "同学", value: 14 }
    ]
  },
  {
    title: "二次开发",
    value: 2,
    children: [
      { title: "业主资料", value: 21 },
      { title: "重复购买", value: 22 }
    ]
  },
  {
    title: "网络端口",
    value: 3,
    children: [
      { title: "58同城", value: 31 },
      { title: "安居客", value: 32 },
      { title: "朋友圈", value: 33 },
      { title: "其他网络", value: 34 }
    ]
  },
  {
    title: "鑫家网",
    value: 4,
    children: [
      { title: "公众号", value: 41 },
      { title: "小程序", value: 42 },
      { title: "APP", value: 43 }
    ]
  }
];
const SEX = [
  {
    key: "男",
    value: 0
  },
  {
    key: "女",
    value: 1
  }
];
const BUYINTENTION = [
  {
    key: "一般",
    value: 2
  },
  {
    key: "较弱",
    value: 1
  },
  {
    key: "强烈",
    value: 3
  }
];
import selectCascader from "./selectCascader";
import demandMoreSelect from "./demandMoreSelect";
import { mapState } from "vuex";
export default {
  name: "stepOne",
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  components: {
    selectCascader,
    demandMoreSelect //需求多选组件
  },
  data() {
    return {
      formData: {
        Customers: "", //客户姓名
        sex: 0, //性别
        tels: [{ phone: "", isDisabled: false }], //客户号码
        desireIntensity: "", //购买意向
        nativePlace: "", //籍贯
        Source: 0, //客源来源
        sourceType: 0,
        myImpression: [], //印象的结果数组
        requirements: [], //客户需求（传后端用）
        sourceList: [], //客源来源列表
        provinceId: "", //省
        cityId: "", //市
        countyId: "", //区
        provinceName: "", //省
        cityName: "", //市
        countyName: "" //区
      },
      mock1: "", //客源印象
      moreSelectFlag: false, //需求信息多选开关
      followUpFlag: false, //印象弹框开关
      sexList: SEX, //性别列表
      addTel: [],
      cascaderList: cascaderList,
      buyintention: BUYINTENTION,
      demandValue: {},
      demandData: {
        rendList: [], //接收渲染数组
        secondList: [], //二手需求数组
        newHouseList: [], //新房需求数组
        leaseList: [] //租赁需求数组
      },
      provinceList: [],
      cityList: [],
      countyList: []
    };
  },
  created() {
    this.validateInit();
    this.getProvince();
    this.getCity(110000);
  },
  methods: {
    checkRepeatPhone(phone) {
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return;
      }
      console.log("准备校验号码重复" + phone);
      let that = this;
      that.$api
        .post({
          url: "/saleCustomerOperation/checkRepeatPhone",
          data: [phone],
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            if (e.data.data) {
              that.$message({
                message: phone + "号码重复"
              });
            }
          }
        })
        .catch(e => {
          that.$message({
            message: e.response.data.message
          });
        });
    },
    /**
     * @example: 客户需求在当前删除
     */
    moreHandleClose(tag) {
      this.$refs.moreSelect.removeActive(tag, true);
      this.$refs.moreSelect.confirmEmit();
    },
    /**
     * @example: 获取需求信息弹出框保存按钮提交的数据
     * @param {rendList} Array 用于渲染的ui数组
     * @param {list0} Array 提交后台已经拆分的数据
     * @param {list1} Array 提交后台已经拆分的数据
     * @param {list2} Array 提交后台已经拆分的数据
     */
    demandConfirm({ rendList, dataJson: { list0, list1, list2 } }) {
      this.demandData.rendList = rendList;
      this.$store.commit("updateDemandValue", this.demandValue);
      // this.$store.commit("updateDemandData", this.demandData);
      //   this.demandData.secondList = list0;
      //   this.demandData.newHouseList = list1;
      //   this.demandData.leaseList = list2;
      this.moreSelectFlag = false;
    },
    //添加电话号码12
    addTelToList() {
      let defaultList = [1, 2];
      if (this.formData.tels.length <= 2) {
        let phone = { phone: "", isDisabled: false };
        this.formData.tels.push(phone);
      }
      this.addTel.sort();
    },
    /**
     * @example: 删除动态添加的电话号码
     * @param {Number} index 删除的下标
     */
    removeTelToList(index) {
      this.formData.tels.splice(index, 1);
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
      if (this.formData.myImpression.length < 5) {
        this.$validator.validate("impression").then(result => {
          if (result) {
            if (this.formData.myImpression.indexOf(this.mock1) == -1) {
              this.formData.myImpression.push(this.mock1);
              this.mock1 = "";
              this.followUpFlag = false;
            } else {
              this.$message({
                type: "xinjia-error",
                message: "客源印象不能重复"
              });
            }
          }
        });
      } else {
        this.followUpFlag = false;
        this.$message({
          type: "xinjia-error",
          message: "客源印象不能超过5个"
        });
      }
    },
    /**
     * @example: 印象数组删除
     */
    handleClose(index) {
      this.formData.myImpression.splice(index, 1);
    },
    validateInit() {
      const dictionary = {
        zh_CN: {
          messages: {
            required: field => field + "不能为空",
            arrFlatLength: field => field + "不能为空"
          },
          attributes: {
            Customers: "客户姓名",
            sex: "客户性别",
            phone1: "客户电话",
            phone2: "客户电话",
            phone3: "客户电话",
            impression: "客源印象",
            moreSelect: "需求类型"
          }
        }
      };
      this.$validator.updateDictionary(dictionary);
    },
    /**
     * @example: 验证当前页面表单
     */
    validate() {
      return this.$validator.validateAll().then(e => e);
    },
    /**
     * @example: 电话号码置顶
     */
    topPhone(index) {
      let phone1 = this.formData.tels[0];
      let phone2 = this.formData.tels[index];
      this.formData.tels.splice(0, 1, phone2);
      this.formData.tels.splice(index, 1, phone1);
    },
    /**
     * @example: 查询省
     */
    getProvince() {
      let that = this;
      let postData = {
        levelType: 1,
        limit: 1000,
        page: 1
      };
      that.$api
        .post({
          url: "/common/regiontbl/regionList",
          data: postData,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.provinceList = e.data.data.list;
          }
        })
        .catch(e => {
          that.$message({
            message: e.response.data.message
          });
        });
    },
    /**
     * @example: 查询市区
     */
    getCity(id) {
      let that = this;
      let postData = {
        levelType: 2,
        limit: 1000,
        page: 1,
        parentId: id
      };
      that.$api
        .post({
          url: "/common/regiontbl/regionList",
          data: postData,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.cityList = e.data.data.list;
            that.getCounty(e.data.data.list[0].id);
          }
        })
        .catch(e => {
          that.$message({
            message: e.response.data.message
          });
        });
    },
    /**
     * @example: 查询区
     */
    getCounty(id) {
      let that = this;
      let postData = {
        levelType: 3,
        limit: 1000,
        page: 1,
        parentId: id
      };
      that.$api
        .post({
          url: "/common/regiontbl/regionList",
          data: postData,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.countyList = e.data.data.list;
          }
        })
        .catch(e => {
          that.$message({
            message: e.response.data.message
          });
        });
    },
    provinceChange(val) {
      this.getCity(val);
      this.getCounty(this.cityList[0].id);
      let obj = {};
      obj = this.provinceList.find(item => {
        return item.id === val;
      });
      this.formData.provinceName = obj.name;
    },
    cityChange(val) {
      this.getCounty(val);
      let obj = {};
      obj = this.cityList.find(item => {
        return item.id === val;
      });
      this.formData.cityName = obj.name;
    },
    countyChange(val) {
      let obj = {};
      obj = this.countyList.find(item => {
        return item.id === val;
      });
      this.formData.countyName = obj.name;
    }
  }
};
</script>
