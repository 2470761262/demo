<script>
import followUp from "./followUp.vue";
export default {
  inject: ["houseId", "houseDetails"],
  extends: followUp,
  data() {
    return {
      text: "请输入取消作业人的原因",
      pop: {
        model: 0,
        checkList: [
          { title: "委托人", value: 0 },
          { title: "钥匙人", value: 1 },
          { title: "实勘人", value: 2 }
        ]
      }
    };
  },
  computed: {
    resultData() {
      if (Object.keys(this.houseDetails).length > 0) {
        return this.houseDetails.data;
      } else {
        return {};
      }
    }
  },
  methods: {
    result() {
      let that = this;
      let params = {
        Eid: this.houseId.id,
        cancelType: this.pop.model,
        cancelMemo: this.pop.textarea
      };
      if (this.pop.textarea.length == 0) {
        this.$message("取消原因未填");
        return;
      }
      this.$emit("update:visible", false);
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
            switch (that.pop.model) {
              case 0:
                this.resultData.agentHouseMethod.onlyOwnerName = null;
                break;
              case 1:
                this.resultData.agentHouseMethod.keyOwnerName;
                break;
              case 2:
                this.resultData.agentHouseMethod.realOwnerName;
                break;
            }
          }
        })
        .catch(e => {});
    }
  }
};
</script>
