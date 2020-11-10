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
    <breadcrumb></breadcrumb>
    <sale-status-record-pair />
    <sale-status-record-list />
  </div>
</template>

<script>
import breadcrumb from "../components/entranceBreadcrumb.vue";
import saleStatusRecordPair from "./saleStatusRecordPair";
import saleStatusRecordList from "./saleStatusRecordList";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    breadcrumb,
    saleStatusRecordPair,
    saleStatusRecordList
  },
  data() {
    return {
      form: {
        comId: "",
        cbId: "",
        bhId: "",
        status: "",
        time: [],
        sortColumn: "id",
        sortType: "1"
      }
    };
  }
};
</script>
