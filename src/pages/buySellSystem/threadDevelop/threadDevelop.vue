<template>
  <div class="page-content">
    <thread-develop-conditions ref="resultList"></thread-develop-conditions>
    <div class="scroll-tab" ref="scrollTab">
      <thread-develop-table></thread-develop-table>
    </div>
  </div>
</template>
<script>
import threadDevelopConditions from "./components/threadDevelopConditions";
import threadDevelopTable from "./components/threadDevelopTable";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    threadDevelopConditions,
    threadDevelopTable
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
        listSwitchRadio: "开发线索",
        type: "", //类型
        time: "", //时间
        bussinessDistrictList: [], //商圈
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
        sortColumn: "addTime",
        sortType: 1,
        keyWord: "", //keyword
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
