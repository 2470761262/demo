<style lang="less" scoped>
.wrapper {
  text-align: center;
  font-weight: 900;
  color: red;
  border-radius: 5em;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>
<template>
  <div class="wrapper">
    该功能未开发，如果已经实现，请正确配置该功能菜单的路径地址并确保登录用户有使用该功能权限
  </div>
</template>

<script>
import getMenuRid from "@/minxi/getMenuRid";
export default {
  mixins: [getMenuRid],
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
