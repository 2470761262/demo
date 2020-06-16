<style lang="less" scoped></style>
<template>
  <div>
    <div>
      <el-image
        style="width: 100px; height: 100px"
        :src="flag == 'add' ? url : url2"
        :fit="fit"
      ></el-image>
    </div>
    <div>
      <el-button type="warning" @click="toCustomerDetail">查看客户</el-button>
      <el-button type="success" round v-if="flag == 'add'" @click="addCustomer"
        >再次录入</el-button
      >
      <el-button
        type="success"
        round
        v-if="flag == 'modify'"
        @click="modifyCusomter"
        >再次修改</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url:
        "https://lsxjytestimgs.oss-cn-shenzhen.aliyuncs.com/notice/d0e9daaf2ee84c34b3b7a03c24d3986b.png",
      url2:
        "https://lsxjytestimgs.oss-cn-shenzhen.aliyuncs.com/notice/9d51336504ea4d9abe7405cca01ec8b4.png",
      flag: "",
      customer: null
    };
  },
  mounted() {
    this.customer = this.$route.params.customer;
    this.flag = this.$route.params.flag;
  },
  methods: {
    toCustomerDetail() {
      if (!this.customer) {
        this.$message({
          type: "info",
          message: "客户错误，无法查看"
        });
        return;
      }
      this.$router.push({
        name: "customerDetail",
        params: { customerId: this.customer.id }
      });
    },
    modifyCusomter() {
      if (this.flag != "modify") {
        this.$message({
          type: "info",
          message: "标识错误，无法修改"
        });
        return;
      }
      let _that = this;
      _that.$router.push({
        name: "modifyCustomers",
        params: {
          customer: this.customer
        }
      });
    },
    addCustomer() {
      if (this.flag != "add") {
        this.$message({
          type: "info",
          message: "标识错误，无法添加"
        });
        return;
      }
      let _that = this;
      _that.$router.push({
        name: "addCustomers"
      });
    }
  }
};
</script>
