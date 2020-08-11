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
    <my-examine-pair />
    <div class="scroll-tab" ref="scrollTab">
      <my-examine-list />
    </div>
  </div>
</template>

<script>
import myExamineList from "./components/myExamineList";
import myExaminePair from "./components/myExaminePair";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    myExamineList,
    myExaminePair
  },
  data() {
    return {
      //scrollTop: 0,
      form: {
        bhId: "",
        cbId: "",
        checkProject: "",
        checkTypeStr: "",
        comId: "",
        houseNo: "",
        limit: 10,
        page: 1,
        sortColumn: "tag",
        status: "",
        time: []
      }
    };
  }
};
</script>
