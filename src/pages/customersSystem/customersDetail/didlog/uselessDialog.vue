<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners" @confirmEmit="fromSubmit()">
    <div class="useless-content">
      <div
        class="input-group is-required"
        :class="{ 'error-tips': errorBags.has('useless') }"
      >
        <div class="input-head">无效原因</div>
        <el-select
          v-model="useless"
          popper-class="options-item"
          class="input-content"
          placeholder="请选择无效原因"
          data-vv-as="无效原因"
          data-vv-name="useless"
          v-validate="'required'"
        >
          <el-option
            v-for="item in uselessList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <div class="input-group is-required">
        <div class="input-head">无效客源理由</div>
        <el-input
          v-model="uselessReason"
          clearable
          type="textarea"
          rows="8"
          placeholder="请填写客户理由"
          data-vv-name="uselessReason"
          data-vv-as="客户理由"
          v-validate="{ required: useless == 4 }"
        />

        <div
          :class="{
            'after-error-tips': errorBags.has('uselessReason')
          }"
          :data-error="errorBags.first('uselessReason')"
        ></div>
      </div>
    </div>
    <div class="tip">
      当前客户的租赁住宅都会被无效，客户列表将不再展示此客户
    </div>
  </fixedPopup>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  data() {
    return {
      useless: "",
      uselessReason: "",
      uselessList: [
        { key: "外公司成交", value: 1 },
        { key: "暂不考虑", value: 2 },
        { key: "疑似同业", value: 3 },
        { key: "其他原因", value: 4 }
      ]
    };
  },
  methods: {
    fromSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit("update:visible", false);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../addCustomers/less/form");
.useless-content {
  margin-top: 40px;
  padding-bottom: 24px;
  .step-content();
}
.tip {
  font-size: @font16;
  color: #f33a3a;
  margin-top: 10px;
  text-align: center;
}
</style>
