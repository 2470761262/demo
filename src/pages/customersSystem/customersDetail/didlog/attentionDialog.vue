<template>
  <fixedPopup
    v-bind="$attrs"
    v-on="$listeners"
    @confirmEmit="fromSubmit()"
    :loading="isLoading"
  >
    <div class="attention-content">
      <div
        class="input-group is-required"
        :class="{ 'error-tips': errorBags.has('periodTime') }"
      >
        <div class="input-head">不关注时间</div>
        <el-input
          v-model="periodTime"
          class="input-content"
          clearable
          placeholder="请输入暂不关注天数"
          data-vv-name="periodTime"
          data-vv-as="暂不关注时间"
          v-validate="'required|noZero|isGreater:30'"
        />
        <div
          :class="{
            'after-error-tips': errorBags.has('periodTime')
          }"
          :data-error="errorBags.first('periodTime')"
        ></div>
      </div>

      <div class="input-group">
        <div class="input-head">不关注理由</div>
        <el-input
          v-model="remark"
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
  inject: ["customerId"],
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  data() {
    return {
      isLoading: false,
      periodTime: "",
      remark: ""
    };
  },
  methods: {
    fromSubmit() {
      let that = this;
      let postData = {
        customerId: this.customerId,
        periodTime: this.periodTime,
        remark: this.remark
      };
      this.$validator.validateAll().then(result => {
        if (result) {
          that.isLoading = true;
          that.$api
            .post({
              url: "/saleCustomerDetail/not/attention",
              data: postData,
              qs: true,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(e => {
              if (e.data.code == 200) {
                this.$message({
                  type: "xinjia",
                  message: "暂不关注客户成功"
                });
                that.close();
                that.getInformation();
              }
            })
            .catch(e => {
              that.isLoading = false;
              if (e.response != undefined) {
                that.$message({
                  type: "xinjia-info",
                  message: e.response.data.message
                });
              }
            });
        }
      });
    },
    close() {
      this.$emit("update:visible", false);
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
