<style lang="less" scoped>
.page-content {
  min-height: 100%;
  background: #fff;
  padding: 30px 0 60px 107px;
  box-sizing: border-box;
  @width: 1345px;
  //客户详情头部
  .head-content {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 30px;
    width: @width;
    .head-content-button {
      width: 433px;
    }
    //基础信息
    .basics {
      width: 714px;
    }
  }
  //带看进度
  .head-progress {
    width: @width;
    padding-left: 40px;
    box-sizing: border-box;
    .head-progress-title {
      font-size: 18px;
      padding-top: 20px;
      margin-bottom: 25px;
    }
  }
  //记录
  .head-record-content {
    width: @width;
    display: flex;
    margin-top: 25px;
    justify-content: space-between;
  }
}
</style>
<template>
  <section class="page-content">
    <div class="head-content">
      <detail-button
        class="head-content-button"
        :customer="customer"
        :showOperationButton="showOperationButton"
        @deleteCustomerApply="deleteCustomerApply"
      ></detail-button>
      <basics class="basics"></basics>
    </div>
    <div class="head-progress">
      <h3 class="head-progress-title">带看进度</h3>
      <see-take-progress></see-take-progress>
    </div>
    <div class="head-record-content">
      <take-look-record></take-look-record>
      <follow></follow>
    </div>
  </section>
</template>

<script>
import detailButton from "./components/detailButton";
//基础信息
import basics from "./components/basicsMessage";
//带看进度
import seeTakeProgress from "./components/seeTakeProgress";
//带看记录
import takeLookRecord from "./components/takeLookRecord";
//跟进记录 & 推荐记录
import follow from "./components/follow";
import { mapState, mapMutations } from "vuex";
import util from "@/util/util";
export default {
  name: "customersDetail",
  data() {
    return {
      queryParams: [],
      customer: null,
      showOperationButton: true
    };
  },
  components: {
    detailButton,
    basics,
    seeTakeProgress,
    takeLookRecord,
    follow
  },
  computed: {
    ...mapState({
      detail: value => {
        return value.customers.detail;
      }
    })
  },
  mounted() {
    this.ajax();
  },
  methods: {
    deleteCustomerApply() {
      this.$router.push({
        name: "customersIframe",
        params: { xx: 1 }
      });
    },
    ...mapMutations(["updateDetail", "resetDetail"]),
    ajax() {
      let _that = this;
      //获取页面传过来的客户id
      let id = _that.$route.params.customerId;
      //因为rout.push传值一刷新就会消失，所以需要保存到session里
      if (id != null) {
        util.sessionLocalStorageSet("cosDetail:id", id);
      } else {
        id = util.sessionLocalStorageGet("cosDetail:id");
      }
      //执行ajax请求，获取基础信息
      _that.$api
        .post({
          url: "/saleCustomerDetail/getACusDetail",
          data: { id: id },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          console.log("获取客户详情结果.....", result);
          if (result.code == 200) {
            //result.data.pageSum

            //获取用户权限，通过vuex存到全局变量，再在各个子页面调用以便判断是否禁止按钮
            let authList = result.data.operationList;
            this.$store.commit("updateAuth", {
              authDetail: authList
            });

            this.customer = result.data.data;
            if (this.customer && this.customer.tag == 3) {
              //审核中，不显示操作按钮
              this.showOperationButton = false;
            }
            this.$store.commit("updateDetail", {
              cusDetail: result.data
            });

            //加载剩余数据
            this.processAajx();
            this.flolowAjax();
            this.exAjax();
          }
        })
        .catch(e => {
          console.log("获取客户详情失败");
          console.log(e);
        })
        .finally(() => {});
    },
    //带看记录
    processAajx() {
      let _that = this;
      //获取页面传过来的客户id
      let id = _that.$route.params.customerId;

      //因为rout.push传值一刷新就会消失，所以需要保存到session里
      if (id != null) {
        util.sessionLocalStorageSet("cosDetail:id", id);
      } else {
        id = util.sessionLocalStorageGet("cosDetail:id");
      }
      //执行ajax请求，获取基础信息
      _that.$api
        .post({
          url: "/saleCustomerDetail/getSalePairProcess",
          data: { id: id },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          console.log("带客看房进度", e);
          if (result.code == 200) {
            //result.data.pageSum
            this.$store.commit("updateProcess", {
              salePairProcess: result
            });
          }
        })
        .catch(e => {
          console.log("获取带客看房进度失败");
          console.log(e);
        })
        .finally(() => {});
    },
    //获取跟进信息
    flolowAjax() {
      let _that = this;
      //获取页面传过来的客户id
      let id = _that.$route.params.customerId;
      //因为rout.push传值一刷新就会消失，所以需要保存到session里
      if (id != null) {
        util.sessionLocalStorageSet("cosDetail:id", id);
      } else {
        id = util.sessionLocalStorageGet("cosDetail:id");
      }
      //执行ajax请求，获取基础信息
      _that.$api
        .post({
          url: "/saleCustomerDetail/getSaleCusFlower",
          data: { id: id },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          console.log("获取跟进记录", e);
          if (result.code == 200) {
            //result.data.pageSum
            this.$store.commit("updateFollow", {
              cusFollow: result
            });
          }
        })
        .catch(e => {
          console.log("获取跟进记录失败");
          console.log(e);
        })
        .finally(() => {});
    },
    exAjax() {
      let _that = this;
      //获取页面传过来的客户id
      let id = _that.$route.params.customerId;
      //因为rout.push传值一刷新就会消失，所以需要保存到session里
      if (id != null) {
        util.sessionLocalStorageSet("cosDetail:id", id);
      } else {
        id = util.sessionLocalStorageGet("cosDetail:id");
      }
      //执行ajax请求，获取基础信息
      _that.$api
        .post({
          url: "/saleCustomerDetail/getACusEx",
          data: { id: id },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          console.log("获取用户拓展信息记录", e);
          if (result.code == 200) {
            //result.data.pageSum
            this.$store.commit("updateExtend", {
              cusExtend: result
            });
          }
        })
        .catch(e => {
          console.log("获取跟进记录失败");
          console.log(e);
        })
        .finally(() => {});

      //获取印象
      _that.$api
        .post({
          url: "/saleCustomerDetail/getSaleCusImpressions",
          data: { id: id },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          console.log("获取用户印象记录", e);
          if (result.code == 200) {
            //result.data.pageSum
            this.$store.commit("updateImpress", {
              impression: result
            });
          }
        })
        .catch(e => {
          console.log("获取印象记录失败");
          console.log(e);
        })
        .finally(() => {});
    }
  },
  destroyed() {
    this.$store.commit("resetDetail");
  }
};
</script>
