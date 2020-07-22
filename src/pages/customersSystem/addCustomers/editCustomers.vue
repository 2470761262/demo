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
      <el-button @click="close">返回</el-button>
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
import util from "@/util/util";
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
      step: this.$route.query.step,
      demandValue: {
        //客户需求value
        list0: [],
        list1: [],
        list2: []
      }
    };
  },
  created() {
    this.getCommunityList();
    this.getPrimarySchoolList();
    this.getMiddleSchoolList();
    this.getBusinessList();
    if (this.customerId) {
      this.getData();
    }
  },
  destroyed() {
    this.$store.commit("resetFormData");
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
    async submit() {
      let newxFlag = true;
      if (this.componentName == "stepOne") {
        newxFlag = await this.$refs.childreCom.validate();
      } else {
        this.$refs.childreCom.updataStep2();
      }
      let that = this;
      let step2 = this.$store.state.addCustomers.formData.step2;
      let postData = {};
      let demandValue = this.$store.state.addCustomers.demandValue;
      if (newxFlag) {
        if (step2.length == 0) {
          postData = util.deepCopy(this.$refs.childreCom.formData);
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
          if (this.componentName == "stepOne") {
            postData = util.deepCopy(this.$refs.childreCom.formData);
          } else {
            postData = util.deepCopy(
              this.$store.state.addCustomers.formData.step1
            );
          }
          postData.requirements = util.deepCopy(
            this.$store.state.addCustomers.formData.step2
          );
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
        let tels = [];
        for (let i = 0; i < postData.tels.length; i++) {
          tels.push(postData.tels[i].phone);
        }
        postData.tels = tels;
        postData.sourceType = postData.sourceList[0];
        postData.Source = postData.sourceList[1];
        postData.origin = "PC";
        postData.nativePlace =
          postData.provinceName + postData.cityName + postData.countyName;
        postData.id = this.customerId;
        that.fullscreenLoading = true;
        that.$api
          .post({
            url: "/saleCustomerOperation/modifyCustomer",
            data: postData,
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(e => {
            if (e.data.code == 200) {
              that.fullscreenLoading = false;
              this.$router.push({
                path: "/customers/customersDetail",
                query: { customerId: this.customerId }
              });
            }
          })
          .catch(e => {
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
        provinceId: null,
        cityId: null,
        countyId: null,
        myImpression: [], //印象的结果数组
        requirements: [], //客户需求（传后端用）
        sourceList: [] //客源来源列表
      };
      let postData = {
        customerId: this.customerId
      };
      that.$api
        .post({
          url: "/saleCustomerDetail/getACusExBeforeUpdate",
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
            fromData.desireIntensity = data.saleCusPropertyTbl.desireIntensity;
            fromData.provinceId = data.saleCusPropertyTbl.provinceId;
            fromData.cityId = data.saleCusPropertyTbl.cityId;
            fromData.countyId = data.saleCusPropertyTbl.countyId;
            fromData.sex = data.bsAgentCustomersTbl.sex;
            fromData.nativePlace = data.bsAgentCustomersTbl.nativePlace;
            fromData.Source = data.bsAgentCustomersTbl.Source;
            fromData.sourceType = data.bsAgentCustomersTbl.sourceType;
            fromData.sourceList.push(data.bsAgentCustomersTbl.sourceType);
            fromData.sourceList.push(data.bsAgentCustomersTbl.Source);
            for (let i = 0; i < data.impressionList.length; i++) {
              fromData.myImpression.push(data.impressionList[i].impression);
            }
            for (let i = 0; i < data.telList.length; i++) {
              let phone = { phone: data.telList[i].phone, isDisabled: true };
              fromData.tels.push(phone);
            }
            let rendList = [];
            for (let i = 0; i < data.customerRequire.length; i++) {
              let item = { title: data.customerRequire[i] };
              rendList.push(item);
            }
            fromData.requirements = data.requireList;
            this.$store.commit("updateStep2", fromData.requirements);
            fromData.requirements.forEach(item => {
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
              if (item.businessCircle) {
                item.businessCircleList = item.businessCircle.split("$");
              } else {
                item.businessCircleList = [];
              }

              if (item.middleSchool) {
                item.middleSchoolList = item.middleSchool.split("$");
              } else {
                item.middleSchoolList = [];
              }

              if (item.primarySchool) {
                item.primarySchoolList = item.primarySchool.split("$");
              } else {
                item.primarySchoolList = [];
              }

              if (item.rooms) {
                item.roomsList = item.rooms.split("$");
              } else {
                item.roomsList = [];
              }

              if (item.decoration) {
                item.decorationList = item.decoration.split("$");
              } else {
                item.decorationList = [];
              }
              if (
                item.requireType != 64 &&
                item.requireType != 128 &&
                item.requireType != 256
              ) {
                item.maxFirstPrice = item.maxFirstPrice / 10000;
                item.minFirstPrice = item.minFirstPrice / 10000;
                item.maxPrice = item.maxPrice / 10000;
                item.minPrice = item.minPrice / 10000;
                item.maxUnitPrice = item.maxUnitPrice / 10000;
                item.minUnitPrice = item.minUnitPrice / 10000;
              }
              if (!item.maxFirstPrice) {
                item.maxFirstPrice = null;
              }
              if (!item.minFirstPrice) {
                item.minFirstPrice = null;
              }
              if (!item.maxPrice) {
                item.maxPrice = null;
              }
              if (!item.minPrice) {
                item.minPrice = null;
              }
              if (!item.maxUnitPrice) {
                item.maxUnitPrice = null;
              }
              if (!item.minUnitPrice) {
                item.minUnitPrice = null;
              }
              item.community = [];
              if (item.community1) {
                let community = item.community1 + "," + item.community1Id;
                item.community.push(community);
              }
              if (item.community2) {
                let community = item.community2 + "," + item.community2Id;
                item.community.push(community);
              }
              if (item.community3) {
                let community = item.community3 + "," + item.community3Id;
                item.community.push(community);
              }
            });
            this.$refs.childreCom.getCity(fromData.provinceId, 1);
            this.$refs.childreCom.getCounty(fromData.cityId, 1);
            if (this.step == 2) {
              this.componentName = "stepTwo";
              this.comNextIndex = 1;
              this.stepName = "上一步";
              this.demandValue = this.$store.state.addCustomers.demandValue;
            }
            this.$store.commit("updateStep1", fromData);
            this.$refs.childreCom.formData = fromData;
            this.$refs.childreCom.demandValue = this.demandValue;
            this.$refs.childreCom.demandData.rendList = rendList;
            this.$store.commit("updateDemandValue", this.demandValue);
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
    },
    // 返回
    close() {
      this.$router.go(-1);
    }
  }
};
</script>
