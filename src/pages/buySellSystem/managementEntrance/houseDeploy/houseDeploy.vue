<style lang="less" scoped>
.content {
  background: rgba(240, 247, 247, 1);
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 0;
  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    display: none;
  }
}
</style>
<template>
  <div class="content">
    <breadcrumb></breadcrumb>
    <house-deploy-pair />
    <house-deploy-list />
  </div>
</template>

<script>
import breadcrumb from "../components/entranceBreadcrumb.vue";
import houseDeployPair from "./houseDeployPair";
import houseDeployList from "./houseDeployList";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    breadcrumb,
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
  }
};
</script>
