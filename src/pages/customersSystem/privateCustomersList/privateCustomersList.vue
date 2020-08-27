<style lang="less" scoped>
.content {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.half-content {
  background: rgba(255, 255, 255, 1);
  padding: 30px;
  margin: 15px 0;
  flex: 1;
  border-radius: 8px;
}
</style>
<template>
  <div class="content">
    <!-- <customers-nav breadcrumbName="私客列表"></customers-nav> -->
    <div class="half-content">
      <privateCutmomersPair></privateCutmomersPair>
    </div>
    <div class="half-content">
      <privateCutmomersResultList></privateCutmomersResultList>
    </div>
  </div>
</template>

<script>
import privateCutmomersPair from "@/pages/customersSystem/privateCustomersList/components/privateCutmomersPair";
import privateCutmomersResultList from "@/pages/customersSystem/privateCustomersList/components/privateCutmomersResultList";
import { TOKEN } from "@/util/constMap";
import util from "@/util/util";
import customersNav from "@/components/breadcrumb";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    privateCutmomersPair,
    privateCutmomersResultList,
    customersNav
  },
  data() {
    return {
      form: {
        submitSearch: false,
        searchType: "1", //搜索类别 1--客户信息 2--客户印象
        requirementType: 1, //需求类型参数 (示例：买二手房1，买新房2，租赁4
        attentionStatus: 1, //是否关注 1关注 其余暂不关注，需要处理数据
        isBuy: 0, //是否成交，0否，1是 需要处理数据
        keyWord: "", //关键词

        desireIntensitys: [], //意愿 多选，0强烈，1较弱，2一般 4不限，需要处理数据
        pairNumbers: [], //带看次数，多选，数字数组
        minPrice: "", //最低价
        maxPrice: "", //最高价
        minArea: "", //最小面积
        maxArea: "", //最大面积
        houseNumbers: [], //房型 需要处理数据
        minAddTime: "", //委托开始时间
        maxAddTime: "", //委托结束时间
        minMainTainTime: "", //维护开始时间
        maxMainTainTime: "", //维护结束时间
        minLastPairFollowTime: "", //带看开始时间
        maxLastPairFollowTime: "" //带看结束时间
      }
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
