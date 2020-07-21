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
      <publicCutmomersPair></publicCutmomersPair>
    </div>
    <div class="half-content">
      <publicCutmomersResultList></publicCutmomersResultList>
    </div>
  </div>
</template>

<script>
import publicCutmomersPair from "@/pages/customersSystem/publicCustomersList/components/publicCutmomersPair";
import publicCutmomersResultList from "@/pages/customersSystem/publicCustomersList/components/publicCutmomersResultList";
import { TOKEN } from "@/util/constMap";
import util from "@/util/util";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    publicCutmomersPair,
    publicCutmomersResultList
  },
  data() {
    return {
      form: {
        submitSearch: false,
        KeyWord: "", //关键词
        requirementType: "", //需求类型参数 (示例：买二手房[1,2,4]，买新房[8,16,32]，租赁[64，128，256]
        plate: "", //0我的私客，1门店公客，2区域公客，4公司公客
        plateChangeReasons: [] //进公池原因,1无效转入、2离职转入、3滚动转入、4核销房源转入、5超期未维护转
      }
    };
  },
  created() {},
  methods: {}
};
</script>
