
<style lang="less" scoped>
</style>
<template>
  <div class="page-content"
       v-loading="load.loading"
       element-loading-custom-class="loadingTop"
       :element-loading-text="load.loadingMessage">
    <section class="page-house-cell marginTop">
      <div>
        <!-- 房屋其他信息 -->
        <h3 class="other-title">房屋概况</h3>
        <section class="message-row-group">
          <div class="message-row">
            <h5 class="message-row-title">房屋用途</h5>
            <div class="message-row-right">{{resultData.buildtype}}</div>
          </div>
          <div class="message-row">
            <h5 class="message-row-title">电梯配套</h5>
            <div class="message-row-right">{{resultData.elevator}}</div>
          </div>
        </section>
        <section class="message-row-group">
          <div class="message-row">
            <h5 class="message-row-title">房屋证件</h5>
            <div class="message-row-right">{{resultData.certificateType }}</div>
          </div>
          <div class="message-row">
            <h5 class="message-row-title">产权性质</h5>
            <div class="message-row-right">{{resultData.HouseProperty}}</div>
          </div>
        </section>
        <section class="message-row-group">
          <div class="message-row">
            <h5 class="message-row-title">户口占用</h5>
            <div class="message-row-right">{{resultData.sign }}</div>
          </div>
          <div class="message-row">
            <h5 class="message-row-title">附属配套</h5>
            <div class="message-row-right">{{resultData.HouseBelong  }}</div>
          </div>
        </section>
        <section class="message-row-group">
          <div class="message-row">
            <h5 class="message-row-title">小学划片</h5>
            <div class="message-row-right">{{resultData.primarySchool }}</div>
          </div>
          <div class="message-row">
            <h5 class="message-row-title">学籍占用</h5>
            <div class="message-row-right">{{resultData.primarySchoolGrade }}</div>
          </div>
        </section>
        <section class="message-row-group">
          <div class="message-row">
            <h5 class="message-row-title">中学划片</h5>
            <div class="message-row-right">{{resultData.middleSchool }}</div>
          </div>
          <div class="message-row">
            <h5 class="message-row-title">学籍情况</h5>
            <div class="message-row-right">{{resultData.middleSchoolGrade   }}</div>
          </div>
        </section>
        <section class="message-row-group">
          <div class="message-row">
            <h5 class="message-row-title">物业公司</h5>
            <div class="message-row-right">{{resultData.propertyCompany}}</div>
          </div>
          <div class="message-row">
            <h5 class="message-row-title">评估价</h5>
            <div class="message-row-right">{{resultData.valuation }}</div>
          </div>
        </section>
        <section class="message-row-group">
          <div class="message-row">
            <h5 class="message-row-title">物业费</h5>
            <div class="message-row-right">{{resultData.PropertyFee }}</div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>
<script>
import util from "@/util/util";

export default {
  computed: {
    nest() {
      return util.localStorageGet("nest");
    }
  },
  data() {
    return {
      houseId: null,
      resultData: {},
      load: {
        loading: true,
        loadingMessage: "努力加载中~"
      }
    };
  },
  created() {
    if (this.$route.params.houseId) {
      this.houseId = this.$route.params.houseId;
      util.localStorageSet("buildingHouseDetail.vue:houseId", this.houseId);
    } else {
      this.houseId = util.localStorageGet("buildingHouseDetail.vue:houseId");
    }
    this.getHouseDetails();
  },
  methods: {
    getHouseDetails() {
      let that = this;
      this.load.loading = true;
      this.$api
        .post({
          url: "/building/getBuildingDetail/" + that.houseId,
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.resultData = result.data;
          } else {
            that.$message.error(result.message);
          }
        })
        .catch(e => {})
        .finally(() => {
          this.load.loading = false;
        });
    }
  },
  destroyed() {
    // this.$store.commit("resetFormData");
  }
};
</script>

