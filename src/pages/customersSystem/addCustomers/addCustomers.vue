<style lang="less" scoped>
.content {
  //background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  flex: 1;
  .floot-content {
    display: flex;
    justify-content: center;
    padding: 24px 0;
    /deep/.el-button {
      width: 136px;
      height: 48px;
      // prettier-ignore
      font-size: 16PX;
      & + .el-button {
        margin-left: 16px;
      }
    }
  }
}
</style>
<template>
  <section class="content">
    <keep-alive>
      <component :is="componentName" ref="childreCom"></component>
    </keep-alive>
    <div class="floot-content">
      <el-button>返回</el-button>
      <el-button type="primary" @click="nextStep">{{ stepName }}</el-button>
      <el-button
        type="primary"
        @click="submit"
        v-loading.fullscreen.lock="fullscreenLoading"
        >完成</el-button
      >
    </div>
  </section>
</template>

<script>
//异步组件工厂方法
import componentsFactory from "@/util/componentsFactory";
import { multiplication, division } from "../../../util/accurateComputeUtil";
//记录步骤组件名字
const ComList = ["stepOne", "stepTwo"];
export default {
  components: {
    stepOne: () => componentsFactory(import("./components/stepOne")),
    stepTwo: () => componentsFactory(import("./components/stepTwo"))
  },
  data() {
    return {
      componentName: "stepOne",
      comNextIndex: 0,
      stepName: "下一步",
      fullscreenLoading: false,
      customerId: this.$route.query.customerId,
      step: this.$route.query.step
    };
  },
  created() {
    this.getCommunityList();
    this.getPrimarySchoolList();
    this.getMiddleSchoolList();
    this.getBusinessList();
    if (this.customerId) {
      // this.getData();
    }
    if (this.step == 2) {
      // this.componentName = "stepTwo";
      // this.comNextIndex = 1;
    }
  },
  methods: {
    async nextStep() {
      let newxFlag = true;
      switch (this.componentName) {
        case "stepOne":
          newxFlag = await this.$refs.childreCom.validate();
          break;
      }
      if (newxFlag) {
        if (this.comNextIndex == 0) {
          this.$store.commit("updateStep1", this.$refs.childreCom.formData);
          this.componentName = ComList[++this.comNextIndex];
          this.stepName = "上一步";
        } else {
          this.$refs.childreCom.updataStep2();
          this.componentName = ComList[--this.comNextIndex];
          this.stepName = "下一步";
        }
      }
    },
    // 提交按钮
    submit() {
      let newxFlag = true;
      // newxFlag = await this.$refs.childreCom.validate();
      let that = this;
      let step2 = this.$store.state.addCustomers.formData.step2;
      let postData = {};
      let demandValue = this.$store.state.addCustomers.demandValue;
      if (newxFlag) {
        if (step2.length == 0) {
          postData = this.$refs.childreCom.formData;
          if (demandValue.list0.length != 0) {
            for (let i = 0; i < demandValue.list0.length; i++) {
              let requireType = { requireType: demandValue.list0[i] };
              postData.requirements.push(requireType);
            }
          }
          if (demandValue.list1.length != 0) {
            for (let i = 0; i < demandValue.list1.length; i++) {
              let requireType = { requireType: demandValue.list1[i] };
              postData.requirements.push(requireType);
            }
          }
          if (demandValue.list2.length != 0) {
            for (let i = 0; i < demandValue.list2.length; i++) {
              let requireType = { requireType: demandValue.list2[i] };
              postData.requirements.push(requireType);
            }
          }
        } else {
          postData = this.$store.state.addCustomers.formData.step1;
          postData.requirements = this.$store.state.addCustomers.formData.step2;
          postData.requirements.forEach((item, idx) => {
            if (item.businessCircleList.length != 0) {
              item.businessCircle = item.businessCircleList.join("$");
            } else {
              item.businessCircle = "";
            }

            if (item.middleSchoolList.length != 0) {
              item.middleSchool = item.middleSchoolList.join("$");
            } else {
              item.middleSchool = "";
            }

            if (item.primarySchoolList.length != 0) {
              item.primarySchool = item.primarySchoolList.join("$");
            } else {
              item.primarySchool = "";
            }

            if (item.roomsList.length != 0) {
              item.rooms = item.roomsList.join("$");
            } else {
              item.rooms = "";
            }

            if (item.decorationList.length != 0) {
              item.decoration = item.decorationList.join("$");
            } else {
              item.decoration = "";
            }
            if (item.community.length != 0) {
              item.community.forEach((com, idx) => {
                let items = com.split(",");
                item["community" + (idx + 1)] = items[0];
                item["community" + (idx + 1) + "Id"] = items[1];
              });
            }
            if (
              item.requireType != 64 &&
              item.requireType != 128 &&
              item.requireType != 256
            ) {
              item.maxFirstPrice = item.maxFirstPrice * 10000;
              item.minFirstPrice = item.minFirstPrice * 10000;
              item.maxPrice = item.maxPrice * 10000;
              item.minPrice = item.minPrice * 10000;
              item.maxUnitPrice = item.maxUnitPrice * 10000;
              item.minUnitPrice = item.minUnitPrice * 10000;
            }
          });
        }
        postData.sourceType = postData.sourceList[0];
        postData.Source = postData.sourceList[1];
        postData.origin = "PC";
        that.fullscreenLoading = true;
        console.log(postData);
        that.$api
          .post({
            url: "/saleCustomerOperation/addCustomer",
            data: postData,
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(e => {
            if (e.data.code == 200) {
              that.fullscreenLoading = false;
              this.$router.push({
                path: "/customers/privateCustomersList"
              });
            }
          })
          .catch(e => {
            postData.requirements.forEach((item, idx) => {
              if (
                item.requireType != 64 &&
                item.requireType != 128 &&
                item.requireType != 256
              ) {
                item.maxFirstPrice = item.maxFirstPrice / 10000;
                item.minFirstPrice = item.maxFirstPrice / 10000;
                item.maxPrice = item.maxFirstPrice / 10000;
                item.minPrice = item.maxFirstPrice / 10000;
                item.maxUnitPrice = item.maxFirstPrice / 10000;
                item.minUnitPrice = item.maxFirstPrice / 10000;
              }
            });
            that.fullscreenLoading = false;
            if (e.response != undefined) {
              that.$message(e.response.data.message);
            }
          });
      }
    },
    // 获取用户信息
    getData() {
      let that = this;
      let fromData = {
        Customers: "", //客户姓名
        sex: 1, //性别
        tels: [], //客户号码
        desireIntensity: "", //购买意向
        nativePlace: "", //籍贯
        Source: 0, //客源来源
        sourceType: 0,
        myImpression: [], //印象的结果数组
        requirements: [], //客户需求（传后端用）
        sourceList: [] //客源来源列表
      };
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
            fromData.Customers = data.bsAgentCustomersTbl.Customers;
            fromData.sex = data.bsAgentCustomersTbl.sex;
            fromData.nativePlace = data.bsAgentCustomersTbl.nativePlace;
            fromData.Source = data.bsAgentCustomersTbl.Source;
            fromData.sourceType = data.bsAgentCustomersTbl.sourceType;
            fromData.sourceList.push(data.bsAgentCustomersTbl.sourceType);
            fromData.sourceList.push(data.bsAgentCustomersTbl.Source);
            // this.$set(that.demand, "data", data.customerRequire);
            // this.$set(that.demandList, "data", data.requireList);
            // this.$set(that.customerDeal, "data", data.saleCusPropertyTbl);
            // this.$set(that.telList, "data", data.telList);
            // that.customer.data = data.bsAgentCustomersTbl;
            that.demandList.data.forEach(item => {
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
    // 获取楼盘列表
    getCommunityList() {
      let that = this;
      let postData = {
        page: 1,
        limit: 10000
      };
      that.$api
        .post({
          url: "/community/communityList",
          data: postData,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$store.dispatch("InitFormData", {
              commitName: "updateCommunityList",
              json: e.data.data.list
            });
            // this.communityList = e.data.data.list;
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    // 获取小学列表
    getPrimarySchoolList() {
      let that = this;
      let postData = {
        page: 1,
        limit: 10000
      };
      that.$api
        .post({
          url: "/community/primarySchoolList",
          data: postData,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$store.dispatch("InitFormData", {
              commitName: "updatePrimarySchoolList",
              json: e.data.data.list
            });
            // this.primarySchoolList = e.data.data.list;
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    // 获取中学列表
    getMiddleSchoolList() {
      let that = this;
      let postData = {
        page: 1,
        limit: 10000
      };
      that.$api
        .post({
          url: "/community/middleSchoolList",
          data: postData,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$store.dispatch("InitFormData", {
              commitName: "updateMiddleSchoolList",
              json: e.data.data.list
            });
            // this.middleSchoolList = e.data.data.list;
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    // 获取商圈列表
    getBusinessList() {
      let that = this;
      let postData = {
        page: 1,
        limit: 10000
      };
      that.$api
        .post({
          url: "/community/businessList",
          data: postData,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$store.dispatch("InitFormData", {
              commitName: "updateBusinessList",
              json: e.data.data
            });
            // this.businessList = e.data.data.list;
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    }
  }
};
</script>
