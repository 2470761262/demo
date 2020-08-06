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
    <my-bet-pair />
    <div class="scroll-tab" ref="scrollTab">
      <my-bet-list />
    </div>
  </div>
</template>

<script>
import myBetList from "./components/myBetList";
import myBetPair from "./components/myBetPair";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    myBetList,
    myBetPair
  },
  data() {
    return {
      //scrollTop: 0,
      form: {
        bhId: "",
        cbId: "",
        coId: "",
        comId: "",
        customerName: "",
        deptId: "",
        empId: "",
        houseNo: "",
        limit: 10,
        page: 1,
        sortColumn: "createTime",
        sortType: 1,
        status: "",
        tel: ""
      }
    };
  }
};
</script>
