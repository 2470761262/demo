<style lang="less" scoped>
.select-content {
  position: absolute;
  bottom: -13px;
  right: -4px;
  transform: translateY(100%);
  width: 156px;
  height: 237px;
  z-index: 20;
  background: #ffffff;
  box-shadow: 0px 8px 13px 0px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  border: 1px solid #f5f5f5;
  padding-top: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .select-pad {
    padding: 0 11px;
    .select-head {
      display: flex;
      height: 26px;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid #cecece;
      input {
        flex: 1;
        width: 0;
        outline: none;
        border: 0;
        text-indent: 8px;
        &::placeholder {
          font-size: @font12;
          color: #909399;
        }
      }
      button {
        border-radius: 0px 3px 3px 0px;
        width: 26px;
        border: 0;
        outline: none;
        background: @backgroud;
        color: #fff;
        line-height: 1;
        font-size: @font12;
      }
    }
  }
  .select-data {
    flex: 1;
    height: 0;
    .scrollbar {
      height: 100%;
      .select-data-item {
        margin-top: 18px;
        font-size: @font12;
        cursor: pointer;
        color: #606266;
        text-indent: 10px;
        font-weight: normal;

        &:hover {
          color: #247257;
        }
      }
    }
    /deep/.el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
<template>
  <div class="select-content">
    <div class="select-pad">
      <div class="select-head">
        <input type="text" v-model="headValue" :placeholder="placeStr" />
        <button>
          <span class="el-icon-search"></span>
        </button>
      </div>
    </div>
    <div class="select-data">
      <el-scrollbar class="scrollbar">
        <div class="select-data-item" @click="hideSelect">湖滨一里店</div>
        <div class="select-data-item">湖滨一里店</div>
        <div class="select-data-item">湖滨一里店</div>
        <div class="select-data-item">湖滨一里店</div>
        <div class="select-data-item">湖滨一里店</div>
        <div class="select-data-item">湖滨一里店</div>
        <div class="select-data-item">湖滨一里店</div>
        <div class="select-data-item">湖滨一里店</div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeStr: String,
    keyValue: String
  },
  data() {
    return {
      headValue: ""
    };
  },
  methods: {
    hideSelect() {
      this.$emit("close", this.keyValue, false);
    }
  }
};
</script>
