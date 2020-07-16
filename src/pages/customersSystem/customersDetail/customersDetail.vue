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
      telList: this.telList,
      permissionList: this.permissionList,
      getInformation: this.getInformation,
      demandValue: this.demandValue,
      phoneData: this.phoneData
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
      customerId: this.$route.query.customerId,
      impressionList: {}, //客户印象
      telList: {},
      phoneData: "",
      permissionList: {
        dialButtonEnable: { isDisable: false, name: "dialButtonEnable" }, //一键拨号
        addLookButtonEable: { isDisable: false, name: "addLookButtonEable" }, //添加带看
        addFollowLookButtonEable: {
          isDisable: false,
          name: "addFollowLookButtonEable"
        }, //添加跟进
        modifyCustomerButtonEable: {
          isDisable: false,
          name: "modifyCustomerButtonEable"
        }, //修改客户
        customerDetailForAddImpression: {
          isDisable: false,
          name: "customerDetailForAddImpression"
        }, //添加印象
        customerDetailForDeleteImpression: {
          isDisable: false,
          name: "customerDetailForDeleteImpression"
        }, //删除印象
        customerDetailForTelephone: {
          isDisable: false,
          name: "customerDetailForTelephone"
        }, //获取手机号
        customerDetailForTurnInvalid: {
          isDisable: false,
          name: "customerDetailForTurnInvalid"
        }, //转无效
        customerDetailUnAttention: {
          isDisable: false,
          name: "customerDetail-unAttention"
        }, //暂不关注
        customerDetailAttention: {
          isDisable: false,
          name: "customerDetail-Attention"
        } //取消关注
      }, //权限列表
      demandValue: {
        //客户需求value
        list0: [],
        list1: [],
        list2: []
      }
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
            if (data.telList.length > 0) {
              this.$set(that.$data, "phoneData", data.telList[0]);
            }
            that.customer.data = data.bsAgentCustomersTbl;
            that.customer.haveAgents = data.haveAgents;
            that.customer.lookHouses = data.lookHouses;
            that.customer.myLookHouses = data.myLookHouses;
            // that.tel = data.telList[0].phone;
            that.modificationPermission(data.ruleList);
            that.demandList.data.forEach(item => {
              item.middleSchool = item.middleSchool.split("$");
              item.primarySchool = item.primarySchool.split("$");
              switch (item.requireType) {
                case 1:
                case 2:
                case 4:
                  this.demandValue.list0.push(item.requireType);
                  break;
                case 8:
                case 16:
                case 32:
                  this.demandValue.list1.push(item.requireType);
                  break;
                case 64:
                case 128:
                case 256:
                  this.demandValue.list2.push(item.requireType);
                  break;
              }
            });
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
    },
    /**
     * @example: 修改权限
     */
    modificationPermission(ruleList) {
      for (let item in this.permissionList) {
        for (let i = 0; i < ruleList.length; i++) {
          if (ruleList[i].rurl == this.permissionList[item].name) {
            this.permissionList[item].isDisable = true;
            break;
          }
        }
      }
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
    width: 860px * @base;
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
