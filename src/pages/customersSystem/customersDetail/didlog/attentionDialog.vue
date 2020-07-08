<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners" @confirmEmit="fromSubmit()">
    <div class="attention-content">
      <div
        class="input-group is-required"
        :class="{ 'error-tips': errorBags.has('attention') }"
      >
        <div class="input-head">不关注时间</div>
        <el-input
          v-model="attention"
          class="input-content"
          clearable
          placeholder="请输入暂不关注时间"
          data-vv-name="attention"
          data-vv-as="暂不关注时间"
          v-validate="'required|noZero|isGreater:30'"
        />
        <div
          :class="{
            'after-error-tips': errorBags.has('attention')
          }"
          :data-error="errorBags.first('attention')"
        ></div>
      </div>

      <div class="input-group">
        <div class="input-head">不关注理由</div>
        <el-input
          v-model="attentionReason"
          clearable
          type="textarea"
          rows="5"
          placeholder="请填写不关注理由"
        />
      </div>
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
      attention: "",
      attentionReason: "",
      attentionList: [
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
.attention-content {
  margin-top: 40px;
  padding-bottom: 24px;
  .step-content();
}
</style>
