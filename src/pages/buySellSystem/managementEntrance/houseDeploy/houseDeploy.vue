<style lang="less" scoped>
.content {
  background: rgba(240, 247, 247, 1);
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 0;
}
</style>
<template>
  <div class="content">
    <house-deploy-pair />
    <house-deploy-list />
  </div>
</template>

<script>
import houseDeployPair from "./houseDeployPair";
import houseDeployList from "./houseDeployList";
import bus from "@/evenBus/but.js";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    houseDeployPair,
    houseDeployList
  },
  data() {
    return {
      form: {
        random: "",
        comId: "",
        cbId: "",
        bhId: "",
        roomNo: "",
        houseNo: "",
        customName: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: "",
        tel: "",
        time: [],
        sortColumn: "addTime",
        sortType: "0"
      }
    };
  },
  created() {
    // 切换管理入口nav
    bus.$emit("switchEntranceNav", 1);
  }
};
</script>
