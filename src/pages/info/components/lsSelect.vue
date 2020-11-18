<style lang="less" scoped>
.select-content {
  position: absolute;
  bottom: -13px;
  right: -4px;
  transform: translateY(100%);
  width: 156px;
  z-index: 20;
  background: #ffffff;
  box-shadow: 0px 8px 13px 0px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  border: 1px solid #f5f5f5;
  padding: 16px 0;
  box-sizing: border-box;
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
        cursor: pointer;
      }
    }
  }
  .select-data {
    height: 175px;
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
  .tips-text {
    font-size: @font12;
    color: #909399;
    font-weight: normal;
    text-indent: 11px;
    padding-top: 16px;
  }
}
</style>
<template>
  <div class="select-content">
    <div class="select-pad">
      <div class="select-head">
        <input
          type="text"
          v-model="headValue"
          @keydown.enter="emitData"
          :placeholder="placeStr"
        />
        <button @click="emitData">
          <span class="el-icon-search"></span>
        </button>
      </div>
    </div>
    <div class="select-data" v-if="list.length > 0">
      <el-scrollbar class="scrollbar">
        <div
          class="select-data-item"
          @click="hideSelect(item)"
          v-for="item in list"
          :key="item[keyId]"
        >
          {{ item[titleKey] }}
        </div>
      </el-scrollbar>
    </div>
    <div v-if="loading" class="tips-text">
      加载中
    </div>
    <div v-if="!loading && list.length == 0 && !once" class="tips-text">
      暂无数据
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeStr: String,
    keyId: String,
    titleKey: String
  },
  data() {
    return {
      once: true,
      headValue: "",
      list: [],
      loading: false
    };
  },
  methods: {
    emitData() {
      this.loading = true;
      this.once = false;
      this.$emit("getRemote", this.getList, this.headValue);
    },
    getList(result) {
      if (result) this.list = result.list;

      this.loading = false;
    },
    hideSelect(item) {
      this.$emit("close", item);
    }
  }
};
</script>
