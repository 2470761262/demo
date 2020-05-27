<style lang="less" scoped>
@import url(../less/popScroll);
.error-tips {
  color: red;
}
.belt-content {
  .belt-content();
}
</style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <template>
      <strong class="error-tips">{{ errorBags.all()[0] }}</strong>
      <div class="belt-content">
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <el-date-picker
              data-vv-name="beltTime"
              data-vv-as="请选择带看时间"
              v-validate="'required'"
              class="item-picker"
              v-model="beltTime"
              type="daterange"
              range-separator="至"
              start-placeholder="选择开始时间"
              end-placeholder="选择结束时间"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <ls-cascader
              ata-vv-name="cascaderResult"
              data-vv-as="请选择楼盘"
              v-validate="{
                required: true,
                cascader: [2, ['楼盘', '楼栋', '房间号'], cascaderResult.length]
              }"
              v-model="cascaderResult"
            ></ls-cascader>
          </div>
        </div>
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <ls-Add-accompany
              data-vv-name="accompanyResult"
              data-vv-as="请选择陪同人"
              v-validate="'required'"
              v-model="accompanyResult"
            ></ls-Add-accompany>
          </div>
        </div>
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <div class="check-content">
              <span>是否再谈</span>
              <div class="label-content">
                <el-radio v-model="isTalk" :label="0">否</el-radio>
                <el-radio v-model="isTalk" :label="1">是</el-radio>
              </div>
            </div>
          </div>
        </div>
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <div class="check-content">
              <el-input
                data-vv-name="textarea"
                data-vv-as="带看想法"
                v-validate="'required'"
                v-model="textarea"
                type="textarea"
                clearable
                resize="none"
                placeholder="对本次带看有什么想说的?"
                :autosize="{ minRows: 6, maxRows: 8 }"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
    </template>
  </fixed-popup>
</template>

<script>
//楼盘 小区 房间号 联动选择
import lsCascader from "./lsCascader";
//陪同人
import lsAddAccompany from "./lsAddAccompany";
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  components: {
    lsCascader,
    lsAddAccompany
  },
  data() {
    return {
      textarea: "",
      isTalk: 0, //是否再谈
      accompanyResult: [], //陪同人
      cascaderResult: [], //带看楼盘
      beltTime: [] //带看时间
    };
  },
  methods: {
    confirmEmit() {
      this.close();
      //   this.$validator.validateAll().then(e => {
      //     if (!e) return;
      //     console.log("验证通过");
      //   });
    }
  }
};
</script>
