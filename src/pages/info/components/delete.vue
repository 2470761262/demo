<style lang="less" scoped>
.pop-content {
  height: 92px;
  line-height: 92px;
  font-size: @font18;
  color: #606266;
}
</style>
<template>
  <fixed-popup
    v-bind="$attrs"
    v-on="$listeners"
    style-type="0"
    @confirmEmit="submit"
  >
    <div class="pop-content">是否将该职员移出免考勤名单。</div>
  </fixed-popup>
</template>

<script>
export default {
  methods: {
    submit() {}
  }
};
</script>
