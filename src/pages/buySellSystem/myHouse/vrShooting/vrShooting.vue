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
  <!-- VR拍摄 -->
  <div class="content">
    <vr-shooting-pair />
    <div class="scroll-tab" ref="scrollTab">
      <vr-shooting-list />
    </div>
  </div>
</template>

<script>
import vrShootingList from "./components/vrShootingList";
import vrShootingPair from "./components/vrShootingPair";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    vrShootingList,
    vrShootingPair
  },
  data() {
    return {
      //scrollTop: 0,
      form: {
        comId: "",
        bhId: "",
        cbId: "",
        storeId: "", // 所属门店
        applyPer: "", // 申请人
        taskState: "", // 状态
        status: "", // 申请结果
        limit: 30,
        page: 1,
        sortColumn: "addTime",
        sortType: 1,
        time: []
        //beginTime: "",
        // endTime: ""
      }
    };
  }
};
</script>
