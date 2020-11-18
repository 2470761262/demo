<script>
import addQoutesDialog from "./addQuotesDialog";
export default {
  extends: addQoutesDialog,
  props: {
    famousId: {
      type: Number,
      defalut: 0
    }
  },
  mounted() {
    this.getDatails();
  },
  methods: {
    /**
     * @example:获取详情数据
     */
    getDatails() {
      this.$api
        .post({
          url: `/attendance/famouseWork/getById?id=${this.famousId}`
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            Object.keys(this.formData).forEach(item => {
              this.formData[item] = result.data[item];
            });
          }
        });
    },
    confirm() {
      this.$validator.validateAll().then(e => {
        if (e) {
          this.submitLoading = true;
          let params = this.formData;
          params.id = this.famousId;
          this.$api
            .post({
              url: "/attendance/famouseWork//modifyById",
              data: params,
              headers: { "Content-Type": "application/json" }
            })
            .then(e => {
              let result = e.data;
              this.$message({
                message: result.message
              }); //弹窗提示
              if (result.code == 200) {
                this.cancel();
                this.$emit("edit");
              }
            })
            .finally(e => {
              this.submitLoading = false;
            });
        }
      });
    }
  }
};
</script>

<style></style>
