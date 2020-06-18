<style lang="less" scoped>
.content {
  flex: 1;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  .tips-image {
    width: 350px;
    height: 270px;
    margin-left: -20px;
  }
  .btn-shadow {
    height: 37px;
    width: 174px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border: none;
    outline: none;
    color: #fff;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    background: #f7d10a;
    margin-right: 65px;
    cursor: pointer;
    &.green {
      background: #0d834a;
    }
    &:active {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12), 0 0 10px rgba(0, 0, 0, 0.06);
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
<template>
  <div class="content">
    <div>
      <el-image class="tips-image" :src="flag == 'add' ? url : url2"></el-image>
    </div>
    <div>
      <button class="btn-shadow" @click="toCustomerDetail">
        查看客户
      </button>
      <button
        class="btn-shadow green"
        v-if="flag == 'add'"
        @click="addCustomer"
      >
        再次录入
      </button>
      <button
        class="btn-shadow green"
        v-if="flag == 'modify'"
        @click="modifyCusomter"
      >
        再次修改
      </button>
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
