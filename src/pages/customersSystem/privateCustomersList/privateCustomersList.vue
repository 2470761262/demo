<style lang="less" scoped>
.content {
  width: 100%;
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
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    privateCutmomersPair,
    privateCutmomersResultList
  },
  data() {
    return {
      form: {
        searchType: "", //搜索类别 1--客户信息 2--客户印象
        customersType: 1, //客户类别
        keyWord: "", //关键词
        desireIntensitys: [], //意愿
        Progress: [], //进度
        MinPrice: "", //最低价
        MaxPrice: "", //最高价
        MinArea: "", //最小面积
        MaxArea: "", //最大面积
        houseNumbers: "", //房型s
        StartDelegate: "", //委托开始时间
        EndDelegate: "", //委托结束时间
        StartMaintenance: "", //维护开始时间
        EndMaintenance: "", //维护结束时间
        StartTakelook: "", //带看开始时间
        EndTakelook: "" //带看结束时间
      }
    };
  },
  created() {},
  methods: {}
};
</script>
