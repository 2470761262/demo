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
        random: "",
        bhId: "",
        cbId: "",
        checkStatus: "", // 验真状态
        source: "", // 验真类型
        mode: "", // 验真方式
        storeId: "", // 所属门店
        comId: "",
        customerName: "",
        limit: 10,
        page: 1,
        sortColumn: "addTime",
        sortType: 1,
        tel: "",
        time: []
        //beginTime: "",
        // endTime: ""
      }
    };
  }
};
</script>
