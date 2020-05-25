<style lang="less" scoped>
.belt-content {
  padding: 15px 0;
  .belt-content-item {
    display: flex;
    align-items: center;
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
    .item-require {
      color: red;
      margin-right: 10px;
      font-size: 20px;
    }
    .item-right {
      flex: 1;
      .item-picker {
        width: 100%;
      }
    }
  }
}
</style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners">
    <template>
      <div class="belt-content">
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <el-date-picker
              class="item-picker"
              v-model="contentJson.time"
              type="daterange"
              range-separator="至"
              start-placeholder="选择开始时间"
              end-placeholder="选择结束时间"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="belt-content-item">
          <span class="item-require">*</span>
          <div class="item-right">
            <cascader></cascader>
          </div>
        </div>
      </div>
    </template>
  </fixed-popup>
</template>

<script>
//楼盘 小区 房间号 联动选择
import cascader from "./cascader";
export default {
  components: {
    cascader
  },
  data() {
    return {
      contentJson: {
        time: [],
        building: []
      }
    };
  },
  methods: {}
};
</script>
