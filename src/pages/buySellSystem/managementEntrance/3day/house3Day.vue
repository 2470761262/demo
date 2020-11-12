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
    <breadcrumb></breadcrumb>
    <house3-day-pair />
    <house3-day-list />
  </div>
</template>

<script>
import breadcrumb from "../components/entranceBreadcrumb.vue";
import house3DayPair from "./house3DayPair";
import house3DayList from "./house3DayList";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    breadcrumb,
    house3DayPair,
    house3DayList
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
        sortType: "0",
        typeList: ["3"]
      }
    };
  }
};
</script>
