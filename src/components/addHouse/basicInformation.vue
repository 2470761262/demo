<style lang="less" scoped>
.page-cell {
  padding-left: 60px;
  padding-top: 60px;
  padding-bottom: 20px;
  .page-cell-title {
    font-size: 24px;
    color: #333;
    font-weight: 600;
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
  .page-cell-item {
    display: flex;
    /deep/.el-input-group {
      width: auto;
    }
    /deep/.el-input-group__prepend,
    /deep/.el-input-group__append {
      border: none;
      background: none;
    }
    /deep/.el-input-group__prepend {
      padding: 0;
    }
    /deep/.el-input__inner {
      border-radius: 4px;
      width: 210px;
    }
    .item-after {
      color: #1c7334;
      font-size: 14px;
      cursor: pointer;
      &.item-before-col {
        text-align: center;
        color: #606266;
      }
    }
    .item-before {
      font-size: 16px;
      color: #606266;
      width: 80px;
      align-self: center;
      white-space: nowrap;
      flex-shrink: 0;
      &:before {
        content: attr(data-before);
        color: red;
      }
    }
    .item-input-groud {
      display: flex;
      /deep/.el-input__inner {
        width: 80px;
      }
    }
  }
}
.form-error-tips {
  margin-top: 20px;
  &.after-tips {
    &::after {
      content: attr(data-tips);
      color: red;
      font-size: 14px;
      text-indent: 80px;
      display: inline-block;
    }
  }
}
/deep/.el-radio {
  margin-left: 0 !important;
}
</style>
<template>
  <div class="page-cell">
    <div class="page-cell-title">房屋坐落</div>
    <!-- 楼盘名称 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('floor')}"
         :data-tips="errorBags.first('floor')">
      <div class="page-cell-item">
        <el-input placeholder="请输入楼盘名称"
                  v-model="formData.floor"
                  data-vv-name="floor"
                  data-vv-as="楼盘"
                  v-validate="'required'">
          <div slot="prepend"
               class="item-before"
               data-before="*">楼盘</div>
          <div slot="append"
               class="item-after">
            补充楼盘<i class="el-icon-question"></i>
          </div>
        </el-input>
      </div>
    </div>
    <!-- 栋座 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('tung')}"
         :data-tips="errorBags.first('tung')">
      <div class="page-cell-item">
        <div class="item-before"
             data-before="*">栋座</div>
        <el-select filterable
                   data-vv-name="tung"
                   data-vv-as="栋座"
                   v-validate="'required'"
                   v-model="formData.tung"
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
         :class="{'after-tips':errorBags.has('room')}"
         :data-tips="errorBags.first('room')">
      <div class="page-cell-item">
        <div class="item-before"
             data-before="*">房间号</div>
        <el-select filterable
                   data-vv-name="room"
                   data-vv-as="房间号"
                   v-validate="'required'"
                   v-model="formData.room"
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
         :class="{'after-tips':errorBags.has('perName')}"
         :data-tips="errorBags.first('perName')">
      <div class="page-cell-item">
        <el-input placeholder="请输入业主姓名"
                  data-vv-name="perName"
                  data-vv-as="业主姓名"
                  v-validate="'required'"
                  v-model="formData.perName">
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
          <el-radio :label="item"
                    border
                    v-for="(item, index) in sexList"
                    :key="index">{{ item }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 电话号码 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('perTell')}"
         :data-tips="errorBags.first('perTell')">
      <div class="page-cell-item">
        <el-input placeholder="请输入业主电话号码"
                  v-model="formData.perTell"
                  data-vv-name="perTell"
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
          <el-input v-model="formData.houseRoom"
                    v-validate="'numeric|max:2'"
                    data-vv-name="houseRoom"
                    data-vv-as="室">
            <div slot="append"
                 class="item-after item-before-col">室</div>
          </el-input>
          <el-input v-model="formData.houseHall"
                    v-validate="'numeric|max:2'"
                    data-vv-name="houseHall"
                    data-vv-as="厅">
            <div slot="append"
                 class="item-after item-before-col">厅</div>
          </el-input>
          <el-input v-model="formData.houseToilet"
                    v-validate="'numeric|max:2'"
                    data-vv-name="houseToilet"
                    data-vv-as="卫">
            <div slot="append"
                 class="item-after item-before-col">卫</div>
          </el-input>
          <el-input v-model="formData.houseBalcony"
                    v-validate="'numeric|max:2'"
                    data-vv-name="houseBalcony"
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
        <el-radio-group v-model="formData.orientation"
                        size="mini">
          <el-radio :label="item"
                    border
                    v-for="(item, index) in orientationList"
                    :key="index">{{ item }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 装修 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div slot="prepend"
             class="item-before">装修类型</div>
        <el-radio-group v-model="formData.renovation"
                        size="mini">
          <el-radio :label="item"
                    border
                    v-for="(item, index) in renovationList"
                    :key="index">{{ item }}</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
<script>
let sex = ["先生", "女生"];
let orientation = ["东", "南", "西", "北"];
let renovation = ["毛胚", "简装", "精装修", "豪华装修"];
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
  methods: {
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
      options: [
        { value: 1, label: 1 },
        { value: 2, label: 2 }
      ],
      orientationList: orientation,
      renovationList: renovation
    };
  }
};
</script>
