<style lang="less" scoped>
.page-content {
  flex: 1;
  background: #fff;
}
</style>
<template>
  <div class="page-content">
    <house-result-list></house-result-list>
    <house-list-house-pair></house-list-house-pair>
  </div>
</template>
<script>
import houseResultList from "./components/houseResultList";
import houseListHousePair from "./components/houseLIstlHousePair";
export default {
  components: {
    houseResultList,
    houseListHousePair
  }
};
</script>
