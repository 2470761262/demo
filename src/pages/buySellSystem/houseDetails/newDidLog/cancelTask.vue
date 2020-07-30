<script>
import followUp from "./followUp.vue";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      houseData: state => state.houseDateil.houseData
    }),
    isSubmit() {
      return this.reloData.cancelMethod;
    }
  },
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
  methods: {
    ...mapActions(["commitHouseData"]),
    result() {
      let that = this;
      let params = {
        Eid: this.houseId,
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
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          that.$message(result.message);
          if (result.code == 200) {
            switch (that.pop.model) {
              case 0:
                this.commitHouseData({
                  agentHouseMethod: null
                });
                break;
              case 1:
                this.houseData.agentHouseMethod.keyOwnerName;
                break;
              case 2:
                this.houseData.agentHouseMethod.realOwnerName;
                break;
            }
          }
        })
        .catch(e => {});
    }
  }
};
</script>
