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
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    houseResultList,
    houseListHousePair
  },
  data() {
    return {
      form: {
        plate: "", //范围
        type: "", //类型
        agentPerName: "", //跟单人姓名
        title: "全部在售",
        communityName: "", //楼盘名
        cbNo: "", //楼栋号
        roomNumber: "", //房间号
        business: "",
        houseType: [],
        renovation: [],
        purpose: [],
        //   orientation: [],
        primarySchool: "",
        middleSchool: "",
        comId: "",
        cbId: "",
        roomNo: "",
        minFloor: "",
        maxFloor: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: "",
        //   maxDownPayment: "",
        //   minDownPayment: "",
        face: [],
        sortColumn: "lastFollowTime",
        sortType: "descending",
        searchInfo: "" //keyword
        // isOnly: "",
        // keyOwner: "",
        // elevator: ""
      }
    };
  }
};
</script>
