<style lang="less" scoped>
@import url("../../../static/publicLess/addHouse.less");
</style>
<template>
  <div class="page-cell">
    <div class="page-cell-title">房屋坐落</div>
    <!-- 楼盘名称 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('communityName')}"
         :data-tips="errorBags.first('communityName')">
      <div class="page-cell-item">
        <div class="item-before"
             data-before="*">楼盘</div>
        <el-select filterable
                   data-vv-name="communityName"
                   data-vv-as="楼盘"
                   v-validate="'required'"
                   v-model="formData.communityName"
                   placeholder="请选择楼盘">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <div class="item-after">
          补充楼盘<i class="el-icon-question"></i>
        </div>
      </div>
    </div>

    <!-- 栋座 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('buildingNo')}"
         :data-tips="errorBags.first('buildingNo')">
      <div class="page-cell-item">
        <div class="item-before"
             data-before="*">栋座</div>
        <el-select filterable
                   data-vv-name="buildingNo"
                   data-vv-as="栋座"
                   v-validate="'required'"
                   v-model="formData.buildingNo"
                   placeholder="请选择栋座">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- 房间号 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('roomNo')}"
         :data-tips="errorBags.first('roomNo')">
      <div class="page-cell-item">
        <div class="item-before"
             data-before="*">房间号</div>
        <el-select filterable
                   data-vv-name="roomNo"
                   data-vv-as="房间号"
                   v-validate="'required'"
                   v-model="formData.roomNo"
                   placeholder="请选择房间号">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="page-cell-title">业主信息</div>
    <!-- 业主姓名 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('customerName')}"
         :data-tips="errorBags.first('customerName')">
      <div class="page-cell-item">
        <el-input placeholder="请输入业主姓名"
                  data-vv-name="customerName"
                  data-vv-as="业主姓名"
                  v-validate="'required'"
                  v-model="formData.customerName">
          <div slot="prepend"
               class="item-before"
               data-before="*">业主姓名</div>
        </el-input>
      </div>
    </div>
    <!-- 称谓 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('sex')}"
         :data-tips="errorBags.first('sex')">
      <div class="page-cell-item">
        <div slot="prepend"
             class="item-before"
             data-before="*">称谓</div>
        <el-radio-group v-model="formData.sex"
                        data-vv-name="sex"
                        data-vv-as="称谓"
                        v-validate="'required'"
                        size="mini">
          <el-radio :label="item.label"
                    border
                    v-for="(item, index) in sexList"
                    :key="index">{{ item.title }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 电话号码 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('tel')}"
         :data-tips="errorBags.first('tel')">
      <div class="page-cell-item">
        <el-input placeholder="请输入业主电话号码"
                  v-model="formData.tel"
                  data-vv-name="tel"
                  data-vv-as="电话号码"
                  v-validate="'required|phone'">
          <div slot="prepend"
               class="item-before"
               data-before="*">手机号</div>
          <div slot="append"
               @click="addTelToList"
               class="item-after item-before-col">
            <i class="el-icon-circle-plus-outline"></i>
            <div>新增</div>
          </div>
        </el-input>
      </div>
    </div>
    <!-- 电话号码 for -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('tel'+item)}"
         :data-tips="errorBags.first('tel'+item)"
         v-for="(item,index) in addTel"
         :key="index">
      <div class="page-cell-item">
        <el-input placeholder="请输入业主电话号码"
                  v-model="formData['tel'+item]"
                  :data-vv-name="'tel'+item"
                  :data-vv-as="'电话号码'+item"
                  v-validate="'phone'">
          <div slot="prepend"
               class="item-before">手机号{{item}}</div>
          <div slot="append"
               @click="removeTelToList(index,item)"
               class="item-after item-before-col">
            <i class="el-icon-circle-plus-outline"></i>
            <div>删除</div>
          </div>
        </el-input>
      </div>
    </div>
    <div class="page-cell-title">基础信息</div>
    <!-- 售价 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('price')}"
         :data-tips="errorBags.first('price')">
      <div class="page-cell-item">
        <el-input placeholder="请输入售价"
                  v-validate="'required|decimal:2'"
                  data-vv-name="price"
                  data-vv-as="售价"
                  v-model="formData.price">
          <div slot="prepend"
               class="item-before"
               data-before="*">售价</div>
          <div slot="append"
               class="item-after item-before-col">万元</div>
        </el-input>
      </div>
    </div>
    <!-- 底价 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('bottomPrice')}"
         :data-tips="errorBags.first('bottomPrice')">
      <div class="page-cell-item">
        <el-input placeholder="请输入底价"
                  data-vv-name="bottomPrice"
                  data-vv-as="底价"
                  v-validate="'required|decimal:2'"
                  v-model="formData.bottomPrice">
          <div slot="prepend"
               class="item-before"
               data-before="*">底价</div>
          <div slot="append"
               class="item-after item-before-col">万元</div>
        </el-input>
      </div>
    </div>
    <!-- 面积 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('area')}"
         :data-tips="errorBags.first('area')">
      <div class="page-cell-item">
        <el-input placeholder="请输入面积"
                  data-vv-name="area"
                  data-vv-as="面积"
                  v-validate="'decimal:2'"
                  v-model="formData.area">
          <div slot="prepend"
               class="item-before">面积</div>
          <div slot="append"
               class="item-after item-before-col">平米</div>
        </el-input>
      </div>
    </div>
    <!-- 房型 -->
    <div class="form-error-tips"
         :class="{'after-tips':getErrorFlag}"
         :data-tips="getErrorText">
      <div class="page-cell-item">
        <div class="item-before">房型</div>
        <div class="item-input-groud">
          <el-input v-model="formData.room"
                    v-validate="'numeric|max:2'"
                    data-vv-name="room"
                    data-vv-as="室">
            <div slot="append"
                 class="item-after item-before-col">室</div>
          </el-input>
          <el-input v-model="formData.hall"
                    v-validate="'numeric|max:2'"
                    data-vv-name="hall"
                    data-vv-as="厅">
            <div slot="append"
                 class="item-after item-before-col">厅</div>
          </el-input>
          <el-input v-model="formData.toilet"
                    v-validate="'numeric|max:2'"
                    data-vv-name="toilet"
                    data-vv-as="卫">
            <div slot="append"
                 class="item-after item-before-col">卫</div>
          </el-input>
          <el-input v-model="formData.balcony"
                    v-validate="'numeric|max:2'"
                    data-vv-name="balcony"
                    data-vv-as="阳台">
            <div slot="append"
                 class="item-after item-before-col">阳台</div>
          </el-input>
        </div>
      </div>
    </div>
    <!-- 朝向 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div slot="prepend"
             class="item-before">朝向</div>
        <el-radio-group v-model="formData.face"
                        size="mini">
          <el-radio :label="item.label"
                    border
                    v-for="(item, index) in orientationList"
                    :key="index">{{ item.title }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 装修 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div slot="prepend"
             class="item-before">装修类型</div>
        <el-radio-group v-model="formData.decoration"
                        size="mini">
          <el-radio :label="item.label"
                    border
                    v-for="(item, index) in renovationList"
                    :key="index">{{ item.title }}</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
<script>
let sex = [
  { title: "女生", label: 0 },
  { title: "先生", label: 1 }
];
let orientation = [
  { title: "东", label: 1 },
  { title: "南", label: 2 },
  { title: "西", label: 3 },
  { title: "北", label: 4 },
  { title: "东南", label: 5 },
  { title: "东北", label: 6 },
  { title: "西南", label: 7 },
  { title: "西北", label: 8 },
];

let renovation = [
  { title: "毛胚", label: 1 },
  { title: "简单装", label: 2 },
  { title: "精装修", label: 3 },
  { title: "豪华装修", label: 4 }
]
//import { mapState } from "vuex";
import { Validator } from 'vee-validate';
export default {
  name: "basicInformation",
  computed: {
    getErrorFlag () {
      let ErroeField = ['houseRoom', 'houseHall', 'houseToilet', 'houseBalcony'];
      return ErroeField.some(item => this.errorBags.has(item));
    },
    getErrorText () {
      let ErroeField = ['houseRoom', 'houseHall', 'houseToilet', 'houseBalcony'];
      for (let index = 0; index < ErroeField.length; index++) {
        if (this.errorBags.first(ErroeField[index]) != null) {
          return this.errorBags.first(ErroeField[index]);
        }
      }
    },
    formData () {
      this.$set(this.$data, "step", JSON.parse(JSON.stringify(this.$store.state.addHouse.formData.step1)))
      return this.step
    }
  },
  mounted () {
    this.setDefaultFrom();
  },
  methods: {
    updateField () {
      //更新字段API 可能终止验证
      const field = this.$validator.fields.find({ name: 'price' });
      console.log(field.update({ rules: { decimal: [3] } }));
    },
    setDefaultFrom () {
      this.formData.sex = 0;
    },
    removeTelToList (index, item) {
      this.addTel.splice(index, 1);
      this.formData['tel' + item] = '';
    },
    addTelToList () {
      let defaultList = [1, 2, 3];
      if (this.addTel.length < 3) {
        for (let index = 0; index < defaultList.length; index++) {
          if (!this.addTel.includes(defaultList[index])) {
            this.addTel.push(defaultList[index]);
            break;
          }
        }
      }
      this.addTel.sort();
    },
    validateAll () {
      let that = this;
      // return new Promise((r,s)=>{
      return this.$validator.validateAll().then((e) => {
        if (e) {
          //存入Vuex;
          that.$store.commit("updateStep1", that.formData);
          return true;
        }
        return false;

      }).then((e) => {
        if (e) {
          return this.upLoadData();
        } else {
          return false;
        }
      })
    },
    upLoadData (e) {
      return new Promise((r) => {
        setTimeout(() => {
          r(true);
        }, 20000);
      })
    },
  },
  data () {
    return {
      step: {},
      addTel: [],
      sexList: sex,
      options: [],
      orientationList: orientation,
      renovationList: renovation
    };
  }
};
</script>
