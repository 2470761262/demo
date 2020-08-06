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
          { title: "业主号码", value: 1 },
          { title: "非业主号码", value: 2 },
          { title: "空号", value: 3 }
        ]
      }
    }
  },
  methods: {
    result() {
      console.log(this.pop.textarea,this.houseId,this.pop.model,"提交跟进======");
      let params = {
        memo: this.pop.textarea,
        houseId: this.houseId,
        followWay: this.pop.model,
        followType: "常态跟进"
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
          url: "/agentHouse/follow/insertFollow",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          this.$message(e.data.message);
          if (e.data.code == 200) {
            this.pop.textarea = "";
            // this.setParam({
            //   paramName: "followUpdate",
            //   value: Math.floor(Math.random() * 1000)
            // });
          }
        });
    }
  }
}
</script>
