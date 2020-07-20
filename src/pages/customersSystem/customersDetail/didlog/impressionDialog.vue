<template>
  <fixedPopup
    v-bind="$attrs"
    v-on="$listeners"
    @confirmEmit="fromSubmit()"
    :loading="isLoading"
  >
    <div class="impression-content">
      <div
        class="input-group is-required"
        :class="{ 'error-tips': errorBags.has('impression') }"
      >
        <div class="input-head">客户客源印象</div>

        <el-input
          v-model="impression"
          class="input-content"
          clearable
          maxlength="5"
          placeholder="请输入客源印象"
          data-vv-name="impression"
          data-vv-as="客源印象"
          v-validate="'required|overstep:5'"
        />
      </div>
    </div>
  </fixedPopup>
</template>

<script>
export default {
  inject: ["customerId", "getImpressions"],
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  data() {
    return {
      impression: "",
      isLoading: false
    };
  },
  methods: {
    fromSubmit() {
      let that = this;
      let postData = {
        customerId: this.customerId,
        impression: this.impression
      };
      this.$validator.validateAll().then(result => {
        if (result) {
          that.isLoading = true;
          that.$api
            .post({
              url: "/saleCustomerDetail/addImpression",
              data: postData,
              // qs: true,
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(e => {
              if (e.data.code == 200) {
                that.getImpressions();
                that.close();
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
.impression-content {
  margin-top: 40px;
  .step-content();
}
</style>
