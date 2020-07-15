<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  position: relative;
}
.left-content,
.right-content {
  background: rgba(255, 255, 255, 1);
  padding: 30px;
  margin: 15px;
  border-radius: 8px;
}
.left-content {
  width: 70%;
}
.right-content {
  width: 375px;
  position: fixed;
  right: 0;
}
</style>
<template>
  <div class="content">
    <div class="left-content">
      <customerFollowDetail></customerFollowDetail>
    </div>
    <div class="right-content">
      <privateCutmomersPair></privateCutmomersPair>
    </div>
  </div>
</template>

<script>
import privateCutmomersPair from "@/pages/customersSystem/publicCustomersDetail/components/customerbaseDetail";
import customerFollowDetail from "@/pages/customersSystem/publicCustomersDetail/components/customerFollowDetail.vue";

export default {
  provide() {
    return {
      customerId: this.customerId,
      FollowData: this.FollowData,
      cusbaseData: this.cusbaseData,
      ruleList: this.ruleList
    };
  },
  components: {
    privateCutmomersPair,
    customerFollowDetail
  },
  data() {
    return {
      customerId: 238935,
      FollowData: {},
      cusbaseData: {},
      ruleList: {
        customerDetailForFollowAndTakeLook: false, //看跟进
        addFollowLookButtonEable: false, //写跟进
        dialButtonEnable: false, //一键拨号
        customerDetailForTakeCus: false //认领客户
      }
    };
  },
  created() {
    this.customerId = this.$router.app._route.query.customerId
      ? this.$router.app._route.query.customerId
      : 238935;
    console.log(this.customerId);
    this.applyFollow();
  },
  methods: {
    applyFollow() {
      var that = this;
      this.$api
        .post({
          url: "saleCustomerDetail/getPubCusDetail",
          qs: true,
          data: {
            customerId: that.customerId
          }
        })
        .then(e => {
          console.log(e.data);
          let json = e.data;
          if (json.code == 200) {
            console.log(json.data.followList);
            this.$set(that.FollowData, "data", json.data.followList);
            this.$set(
              that.cusbaseData,
              "Customers",
              json.data.bsAgentCustomersTbl.Customers
            );
            this.$set(
              that.cusbaseData,
              "customerNo",
              json.data.bsAgentCustomersTbl.customerNo
            );
            this.$set(
              that.cusbaseData,
              "sex",
              json.data.bsAgentCustomersTbl.sex
            );
            this.$set(
              that.cusbaseData,
              "Source",
              json.data.bsAgentCustomersTbl.Source
            );
            this.$set(
              that.cusbaseData,
              "customerRequire",
              json.data.customerRequire[0]
            );
            this.$set(
              that.cusbaseData,
              "AddTime",
              json.data.bsAgentCustomersTbl.AddTime
            );
            this.$set(
              that.cusbaseData,
              "desireIntensity",
              json.data.saleCusPropertyTbl.desireIntensity
            );
            this.$set(
              that.cusbaseData,
              "maintainTime",
              json.data.bsAgentCustomersTbl.maintainTime
            );
            this.$set(
              that.cusbaseData,
              "ModTime",
              json.data.bsAgentCustomersTbl.ModTime
            );
            console.log(that.cusbaseData);
            json.data.ruleList.forEach(element => {
              if (element.rUrl == "addFollowLookButtonEable") {
                this.$set(that.ruleList, "addFollowLookButtonEable", true);
              }
              if (element.rUrl == "dialButtonEnable") {
                this.$set(that.ruleList, "dialButtonEnable", true);
              }
              if (element.rUrl == "customerDetailForFollowAndTakeLook") {
                this.$set(
                  that.ruleList,
                  "customerDetailForFollowAndTakeLook",
                  true
                );
              }
              if (element.rUrl == "customerDetailForTakeCus") {
                this.$set(that.ruleList, "customerDetailForTakeCus", true);
              }
            });
          } else if (json.code == 400) {
            alert(json.message);
            console.log("失败     " + json);
          }
        });
    }
  }
};
</script>
