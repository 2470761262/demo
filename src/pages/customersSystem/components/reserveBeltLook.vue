<style lang="less" scoped></style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <div class="belt-content">
      <div class="belt-content-item">
        <!-- <span class="item-require">*</span> -->
        <div class="item-right">
          <down-content :down-ul-flag="false">
            <template v-slot:head>
              <el-date-picker
                v-model="reserveTime"
                type="datetime"
                placeholder="选择带看时间"
              >
              </el-date-picker>
            </template>
          </down-content>
        </div>
      </div>
    </div>
  </fixed-popup>
</template>

<script>
import downContent from "../customersDetail/components/downContent";
export default {
  components: {
    downContent
  },
  data() {
    return {
      reserveTime: "" //预约时间
    };
  },
  methods: {
    confirmEmit() {}
  }
};
</script>
