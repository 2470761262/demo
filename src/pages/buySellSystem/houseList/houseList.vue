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
    min-height: 400px;
  }
}
</style>
<template>
  <div class="page-content">
    <house-result-list ref="resultList"></house-result-list>
    <div class="scroll-tab" ref="scrollTab">
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
  activated() {
    this.$nextTick(() => {
      this.$refs.scrollTab.addEventListener("scroll", this.ListeningScroll);
      document
        .querySelector(".el-main")
        .addEventListener("scroll", this.elMainScroll);
    });
    this.$refs.scrollTab.scrollTop = this.scrollTop;
  },
  deactivated() {
    if (document.querySelector(".el-main")) {
      this.$refs.scrollTab.removeEventListener("scroll", this.ListeningScroll);
      document
        .querySelector(".el-main")
        .removeEventListener("scroll", this.elMainScroll);
    }
  },
  beforeDestroy() {
    this.$refs.scrollTab.removeEventListener("scroll", this.ListeningScroll);
    document
      .querySelector(".el-main")
      .removeEventListener("scroll", this.elMainScroll);
  },
  data() {
    return {
      scrollTop: 0,
      form: {
        plate: "", //范围
        type: "", //类型
        agentPerName: "", //跟单人姓名
        bussinessDistrict: "",
        roomTypeList: [],
        decorationList: [],
        houseUseList: [],
        primarySchoolList: [],
        middleSchoolList: [],
        comId: "",
        cbId: "",
        bhId: "",
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
        isElevator: "", //是否电梯
        isTopFloor: "", //是否是顶层
        isBet: "" //对赌
      }
    };
  },
  methods: {
    elMainScroll() {
      const { clientHeight, scrollHeight, scrollTop } = document.querySelector(
        ".el-main"
      );
      if (clientHeight + scrollTop >= scrollHeight) {
        this.$refs.resultList.panelChange = false;
      }
    },
    ListeningScroll(e) {
      this.scrollTop = e ? e.target.scrollTop : 0;
    }
  }
};
</script>
