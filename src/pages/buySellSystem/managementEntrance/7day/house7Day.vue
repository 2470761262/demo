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
    <house7-day-pair />
    <house7-day-list />
  </div>
</template>

<script>
import breadcrumb from "../components/entranceBreadcrumb.vue";
import house7DayPair from "./house7DayPair";
import house7DayList from "./house7DayList";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    breadcrumb,
    house7DayPair,
    house7DayList
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
        typeList: ["7"]
      }
    };
  }
};
</script>
