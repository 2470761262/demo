<script>
import followUp from "@/pages/buySellSystem/houseDetails/newDidLog/followUp.vue";
export default {
  extends: followUp,
  computed: {
    houseId() {
      return this.rowId
    },
    isSubmit() {
      return true;
    }
  },
  props: ["rowId"],
  data() {
    return {
      cancelFlag: true,
      pop: {
        model: 1,
        textarea: "",
        loading: false,
        checkList: [
          { title: "业主号码", value: 0 },
          { title: "非业主号码", value: 1 },
          { title: "空号", value: 2 }
        ]
      }
    }
  },
  methods: {
    result() {
      let params = {
        roomId: this.houseId,
        content: this.pop.textarea,
        telStatus: this.pop.model,
        followType: 1
      };
      if (this.pop.textarea.length < 10) {
        this.$message("跟进内容不能少于10个字,添加跟进失败!!!");
        return;
      } else if (this.pop.textarea.length > 30){
        this.$message("跟进内容不能多于30个字,添加跟进失败!!!");
        return;
      }
      if (this.isCancel) {
        this.$emit("update:visible", false);
      } else {
        Object.assign(this.$data.pop, this.$options.data().pop);
      }
      this.$api
        .post({
          url: "/roomFollow",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({type: "success", message: e.data.message});
            this.pop.textarea = "";
          } else {
            this.$message.error(e.data.message);
          }
        });
    }
  }
}
</script>
