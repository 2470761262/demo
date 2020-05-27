<style lang="less" scoped>
.content-type {
}
</style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <template>
      <div class="content-type">
        <div class="radio-content">
          <label class="radio-content-item">
            <input
              v-model.number="Check"
              type="radio"
              name="removePop"
              value="0"
            />
            <div>客户无意向</div>
          </label>
          <label class="radio-content-item">
            <input
              v-model.number="Check"
              type="radio"
              name="removePop"
              value="1"
            />
            <div>空号</div>
          </label>
        </div>
      </div>
    </template>
  </fixed-popup>
</template>

<script>
export default {
  data() {
    return {
      Check: 0
    };
  },
  methods: {
    confirmEmit() {}
  }
};
</script>
