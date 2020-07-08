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
        KeyWord: "", //关键词
        customerNeeds: "", //意愿
        PublicType: "", //进度
        Reason: "" //最低价
      }
    };
  },
  created() {},
  methods: {}
};
</script>
