<style lang="less" scoped>
.page-content {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 0;
  .scroll-tab {
    flex: 1;
    height: 0;
    overflow: auto;
  }
}
</style>
<template>
  <div class="page-content">
    <house-result-list></house-result-list>
    <div class="scroll-tab">
      <house-list-house-pair></house-list-house-pair>
    </div>
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
  mounted() {
    document
      .querySelector(".scroll-tab")
      .addEventListener("scroll", this.ListeningScroll);
  },
  activated() {
    document.querySelector(".scroll-tab").scrollTop = this.scrollTop;
  },
  data() {
    return {
      scrollTop: 0,
      form: {
        plate: "", //范围
        type: "", //类型
        agentPerName: "", //跟单人姓名
        title: "全部在售",
        communityName: "", //楼盘名
        cbNo: "", //楼栋号
        roomNumber: "", //房间号
        bussinessDistrict: "",
        roomTypeList: [],
        decorationList: [],
        houseUseList: [],
        primarySchoolList: [],
        middleSchoolList: [],
        comId: "",
        cbId: "",
        roomNo: "",
        minFloor: "",
        maxFloor: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: "",
        faceList: [],
        sortColumn: "price",
        sortType: 1,
        keyWord: "", //keyword
        isOnly: "", //是否独家
        isKey: "", //是否钥匙
        //  isBet: "", //是否对赌
        isReal: "", //是否实勘
        isElevator: "" //是否电梯
      }
    };
  },
  methods: {
    ListeningScroll(e) {
      this.scrollTop = e ? e.target.scrollTop : 0;
    }
  }
};
</script>
