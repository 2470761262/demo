<script>
import followUp from './followUp.vue';
export default {
  inject: ["houseId"],
  extends: followUp,
  data () {
    return {
      text: '请输入取消作业人的原因',
      pop: {
        model: 0,
        checkList: [
          { title: '委托人', value: 0 },
          { title: '钥匙人', value: 1 },
          { title: '实勘人', value: 2 }
        ]
      }
    }
  },
  methods: {
    result () {
      let that = this;
      if (this.cancelMemo == undefined) {
        this.$message("取消原因未填");
        return;
      }
      let params = {
        Eid: this.houseId,
        cancelType: this.cancelMethodType,
        cancelMemo: this.cancelMemo
      };
      that.isShowCancelMethod = false;
      this.$api
        .post({
          url: "/agentHouse/property/cancelMethod",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          that.$message(result.message);
          if (result.code == 200) {
            that.getHouseDetails();
            that.cancelMemo = "";
          }
        })
        .catch(e => {
        });
    }
  },
}
</script>
