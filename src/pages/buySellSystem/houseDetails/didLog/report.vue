<style lang="less">
.sumitButClass {
  background: #ad1600;
  span {
    color: #fff;
  }
}
</style>
<script>
import followUp from "./followUp.vue";
export default {
  inject: ["houseId"],
  extends: followUp,
  props: {
    insertFollow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sumitButClass: "sumitButClass",
      cancelFlag: true,
      text: "",
      pop: {
        model: 1,
        textarea: "",
        loading: false,
        checkList: [
          { title: "虚假实勘", value: 1 },
          { title: "虚假委托", value: 2 },
          { title: "虚假钥匙", value: 3 },
          { title: "虚假跟进", value: 4 },
          { title: "房屋已售", value: 5 },
          { title: "虚假业主号码", value: 6 },
          { title: "其他", value: 7 }
        ]
      }
    };
  },
  methods: {
    //添加举报
    result() {
      let that = this;
      let params = {
        Eid: that.houseId.id,
        Type: 11,
        OldOwner: 0,
        OwnerMemo: that.pop.textarea,
        reportType: that.pop.model
      };
      this.$emit("update:visible", false);
      this.$api
        .post({
          url: "/agentHouse/propertyCheck/insertReport",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          that.$message(e.data.message);
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    }
  }
};
</script>
