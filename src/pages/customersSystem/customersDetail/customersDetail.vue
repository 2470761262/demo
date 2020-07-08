<template>
  <div class="content">
    <div class="content-left">
      <follow-up></follow-up>
      <demandInformation></demandInformation>
    </div>
    <div class="content-right">
      <information></information>
      <moreOperations></moreOperations>
    </div>
  </div>
</template>

<script>
//跟进组件
import followUp from "@/pages/customersSystem/customersDetail/components/followUp";
//需求信息组件
import demandInformation from "@/pages/customersSystem/customersDetail/components/demandInformation";
//客户信息组件
import information from "@/pages/customersSystem/customersDetail/components/information";
//更多操作组件
import moreOperations from "@/pages/customersSystem/customersDetail/components/moreOperations";
export default {
  provide() {
    return {
      customerId: this.customerId,
      demand: this.demand,
      demandList: this.demandList,
      customer: this.customer,
      customerDeal: this.customerDeal,
      impressionList: this.impressionList,
      getImpressions: this.getImpressions,
      telList: this.telList
    };
  },
  components: {
    followUp,
    information,
    moreOperations,
    demandInformation
  },
  data() {
    return {
      demand: {}, //客户需求列表
      demandList: {}, //客户需求内容
      customer: {
        data: {},
        haveAgents: 0, //拥有人数
        lookHouses: 0, //公司看房套数
        myLookHouses: 0 //我的带看套数
      }, //客户信息
      customerDeal: {}, //客户买卖信息
      customerId: 205448,
      impressionList: {}, //客户印象
      telList: {}
    };
  },
  created() {
    this.getInformation();
    this.getImpressions();
  },
  methods: {
    /**
     * @example: 获取用户信息
     */
    getInformation() {
      let that = this;
      let postData = {
        customerId: this.customerId
      };
      that.$api
        .post({
          url: "/saleCustomerDetail/getACusEx",
          data: postData,
          qs: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            let data = e.data.data;
            this.$set(that.demand, "data", data.customerRequire);
            this.$set(that.demandList, "data", data.requireList);
            this.$set(that.customerDeal, "data", data.saleCusPropertyTbl);
            this.$set(that.telList, "data", data.telList);
            that.customer.data = data.bsAgentCustomersTbl;
            that.customer.haveAgents = data.haveAgents;
            that.customer.lookHouses = data.lookHouses;
            that.customer.myLookHouses = data.myLookHouses;
            // that.tel = data.telList[0].phone;
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    /**
     * @example: 获取客户印象
     */
    getImpressions() {
      let that = this;
      let postData = {
        customerId: this.customerId
      };
      that.$api
        .post({
          url: "/saleCustomerDetail/getSaleCusImpressions",
          data: postData,
          qs: true,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(e => {
          if (e.data.code == 200) {
            let data = e.data.data;
            this.$set(that.impressionList, "data", data);
          }
        })
        .catch();
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex: 1;
  margin-bottom: 36px;
  font-family: "Microsoft YaHei";
  .content-left {
    width: 760px * @base;
    box-sizing: border-box;
    margin-right: 16px;
  }
  .content-right {
    // width: 376px;
    flex: 1;
  }
}
.mar-b-16 {
  margin-bottom: 16px;
}
</style>
