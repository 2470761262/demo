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
    <component :is="componentName" ref="childreCom"></component>
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
import { multiplication } from "@/util/accurateComputeUtil";
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
  },
  destroyed() {
    this.$store.commit("resetFormData");
  },
  methods: {
    /**
     * @example: step1组件和step2组件切换
     */
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
          this.$nextTick(() => {
            this.$refs.childreCom.getData();
          });
        }
      }
    },
    /**
     * @example: 提交事件
     */
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
          postData = util.deepCopy(
            this.$store.state.addCustomers.formData.step1
          );
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
              item.maxFirstPrice = multiplication(item.maxFirstPrice, 10000);
              item.minFirstPrice = multiplication(item.minFirstPrice, 10000);
              item.maxPrice = multiplication(item.maxPrice, 10000);
              item.minPrice = multiplication(item.minPrice, 10000);
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
        postData.nativePlace =
          postData.provinceName + postData.cityName + postData.countyName;
        postData.origin = "PC";
        that.fullscreenLoading = true;
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
              this.$router.replace({
                path: "/customers/customersDetail",
                query: { customerId: btoa(e.data.data) }
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
    /**
     * @example: 返回事件
     */
    close() {
      this.$router.go(-1);
    },
    /**
     * @example: 获取楼盘列表
     */
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
    /**
     * @example: 获取小学列表
     */
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
    /**
     * @example: 获取中学列表
     */
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
    /**
     * @example: 获取商圈列表
     */
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
