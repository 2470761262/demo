<style lang="less" scoped>
.content-box {
  padding: 20px;
  box-sizing: border-box;
}
.content {
  width: 100%;
  display: flex;
  flex: 1;
  position: relative;
}
.left-content,
.right-content {
  padding: 30px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 1);
}
.left-content {
  width: 860px * @base;

  margin-right: 16px;
}
.right-content {
  flex: 1;
}
</style>
<template>
  <div class="content-box">
    <customers-nav breadcrumbName="公客详情"></customers-nav>
    <div class="content">
      <div class="left-content">
        <customerFollowDetail></customerFollowDetail>
      </div>
      <div class="right-content">
        <privateCutmomersPair></privateCutmomersPair>
      </div>
    </div>
  </div>
</template>

<script>
import privateCutmomersPair from "@/pages/customersSystem/publicCustomersDetail/components/customerbaseDetail";
import customerFollowDetail from "@/pages/customersSystem/publicCustomersDetail/components/customerFollowDetail.vue";
import customersNav from "@/components/breadcrumb";
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
    customerFollowDetail,
    customersNav
  },
  data() {
    return {
      customerId: {},
      FollowData: {},
      cusbaseData: {},
      ruleList: {
        addFollowLookButtonEable: false, //写跟进
        dialButtonEnable: false, //一键拨号
        customerDetailForTakeCus: false //认领客户
      }
    };
  },
  created() {
    document.title = "鑫伽系统-公客详情";
    this.$set(this.customerId, "id", this.$router.app._route.query.customerId);
    console.log(this.customerId.id);
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
            customerId: that.customerId.id
          }
        })
        .then(e => {
          console.log(e.data);
          let json = e.data;
          if (json.code == 200) {
            //判断如果是私客则跳转到私客详情页
            if (json.data.bsAgentCustomersTbl.plate == 0) {
              this.$router.replace({
                path: "/customers/customersDetail",
                query: { customerId: btoa(json.data.bsAgentCustomersTbl.id) }
              });
            }
            this.$set(that.FollowData, "data", json.data.followList);
            console.log(that.FollowData, "that.FollowData");
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
              json.data.customerRequire
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
              "plateChangeTime",
              json.data.bsAgentCustomersTbl.plateChangeTime
            );
            this.$set(
              that.cusbaseData,
              "plate",
              json.data.bsAgentCustomersTbl.plate
            );
            console.log(that.cusbaseData);
            json.data.ruleList.forEach(element => {
              if (element.rUrl == "addFollowLookButtonEable") {
                this.$set(that.ruleList, "addFollowLookButtonEable", true);
              }
              if (element.rUrl == "dialButtonEnable") {
                this.$set(that.ruleList, "dialButtonEnable", true);
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
