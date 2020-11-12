<script>
export default {
  props: {
    value: [String, Number]
  },
  provide() {
    return {
      instance: this
    };
  },
  created() {
    this.$on("change", value => {
      this.$emit("input", value);
    });
  },
  render(h) {
    return h("div", {}, this.$slots.default);
  }
};
</script>
