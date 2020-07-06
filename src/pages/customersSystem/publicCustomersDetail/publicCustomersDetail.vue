<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
}
.left-content,
.right-content {
  background: rgba(255, 255, 255, 1);
  padding: 30px;
  margin: 15px;
  border-radius: 8px;
}
.left-content {
  width: 70%;
}
.right-content {
  width: 30%;
}
</style>
<template>
  <div class="content">
    <div class="left-content">
      <customerFollowDetail></customerFollowDetail>
    </div>
    <div class="right-content">
      <privateCutmomersPair></privateCutmomersPair>
    </div>
  </div>
</template>

<script>
import privateCutmomersPair from "@/pages/customersSystem/publicCustomersDetail/components/customerbaseDetail";
import customerFollowDetail from "@/pages/customersSystem/publicCustomersDetail/components/customerFollowDetail.vue";

export default {
  components: {
    privateCutmomersPair,
    customerFollowDetail
  }
};
</script>
