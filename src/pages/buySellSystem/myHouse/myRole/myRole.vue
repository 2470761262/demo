<style lang="less" scoped>
.content {
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
  <div class="content">
    <my-role-pair />
    <div class="scroll-tab" ref="scrollTab">
      <my-role-list />
    </div>
  </div>
</template>

<script>
import myRoleList from "./components/myRoleList";
import myRolePair from "./components/myRolePair";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    myRoleList,
    myRolePair
  },
  //   activated() {
  //     this.$nextTick(() => {
  //       this.$refs.scrollTab.addEventListener("scroll", this.ListeningScroll);
  //     });
  //     this.$refs.scrollTab.scrollTop = this.scrollTop;
  //   },
  //   deactivated() {
  //     if (document.querySelector(".el-main")) {
  //       this.$refs.scrollTab.removeEventListener("scroll", this.ListeningScroll);
  //     }
  //   },
  //   beforeDestroy() {
  //     this.$refs.scrollTab.removeEventListener("scroll", this.ListeningScroll);
  //   },
  //   methods: {
  //     ListeningScroll(e) {
  //       this.scrollTop = e ? e.target.scrollTop : 0;
  //     }
  //   },
  data() {
    return {
      // scrollTop: 0,
      form: {
        random: "",
        comId: "",
        cbId: "",
        bhId: "",
        houseNo: "",
        customName: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: "",
        tel: "",
        time: [],
        sortColumn: "addTime",
        sortType: 1,
        workType: "1"
      }
    };
  }
};
</script>
