<style lang="less" scoped>
.content {
  background: rgba(240, 247, 247, 1);
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 0;
  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    display: none;
  }
}
</style>
<template>
  <div class="content">
    <call-record-pair />
    <call-record-list />
  </div>
</template>

<script>
import callRecordPair from "./callRecordPair";
import callRecordList from "./callRecordList";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    callRecordPair,
    callRecordList
  },
  data() {
    return {
      form: {
        followType: "",
        subFollowType: "",
        perName: "",
        caller: "",
        called: "",
        time: [],
        sortColumn: "id",
        sortType: "1",
        random: ""
      }
    };
  }
};
</script>
