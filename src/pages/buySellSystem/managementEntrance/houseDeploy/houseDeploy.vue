<style lang="less" scoped>
.content {
  // prettier-ignore
  padding: 0 16PX;
  background: rgba(240, 247, 247, 1);
}
</style>
<template>
  <div class="content">
    <house-deploy-pair />
  </div>
</template>

<script>
import houseDeployPair from "./houseDeployPair";
export default {
  components: {
    houseDeployPair
  }
};
</script>
