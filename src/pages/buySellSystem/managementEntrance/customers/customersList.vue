<style lang="less" scoped>
.content {
  width: 100%;
}
.half-content {
  background: rgba(255, 255, 255, 1);
  // prettier-ignore
  padding: 16PX 24PX;
  // prettier-ignore
  margin-bottom: 16PX;
  flex: 1;
  // prettier-ignore
  border-bottom-left-radius: 8PX;
  // prettier-ignore
  border-bottom-right-radius: 8PX;
  &:nth-child(2) {
    // prettier-ignore
    border-radius: 8PX;
  }
}
</style>
<template>
  <div class="content">
    <breadcrumb></breadcrumb>
    <nav-menu :navMenuIndex="3"></nav-menu>
    <div class="half-content">
      <privateCutmomersPair></privateCutmomersPair>
    </div>
    <div class="half-content">
      <privateCutmomersResultList></privateCutmomersResultList>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../components/entranceBreadcrumb.vue";
import navMenu from "../components/entranceNavMenu.vue";
import privateCutmomersPair from "./components/cutmomersPair";
import privateCutmomersResultList from "./components/cutmomersResultList";
import { TOKEN } from "@/util/constMap";
import util from "@/util/util";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    breadcrumb,
    navMenu,
    privateCutmomersPair,
    privateCutmomersResultList
  },
  data() {
    return {
      form: {
        submitSearch: false,
        searchType: "1", //搜索类别 1--客户信息 2--客户印象
        requirementType: "", //需求类型参数 (示例：买二手房1，买新房2，租赁4
        attentionStatus: null, //是否关注 1关注 其余暂不关注，需要处理数据
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
        maxLastPairFollowTime: "", //带看结束时间
        isTypeChange: 1
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
