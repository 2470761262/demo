
<style lang="less" scoped>
.attention-content {
  margin-right: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 280px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 15px 15px 0;
  box-sizing: border-box;
  .attention-select {
    width: 100%;
    /deep/.el-select {
      width: 100%;
    }
  }
  .but-group {
    text-align: right;
    padding-right: 20px;
    /deep/.el-button {
      span {
        color: var(--color--primary);
      }
    }
  }
  .attention-scroll-content {
    flex: 1 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    height: 0;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--color--primary);
      border-radius: 50px;
    }
    .scroll-content-tag {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
.hide-query {
  position: absolute;
  height: 100%;
  color: var(--color--primary);
  right: -10px;
  top: 0;
  font-size: 20px;
  cursor: pointer;
  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
}
.attention {
  height: 100%;
}
</style>
<template>
  <div class="attention">
    <transition name="el-fade-in-linear">
      <div class="attention-content"
           v-if="queryFlag">
        <div class="attention-select">
          <el-select v-model="imdataimdata"
                     filterable
                     placeholder="请输入您添加过的客源印象">
          </el-select>
        </div>
        <div class="but-group">
          <el-button type="text">一键还原</el-button>
          <el-button type="text">一键清除</el-button>
        </div>
        <div class="attention-scroll-content">
          <el-tag v-for="item in 6"
                  :key="item.index"
                  size="small"
                  class="scroll-content-tag"
                  closable>活跃客户(3)</el-tag>
        </div>
      </div>
    </transition>
    <div class="hide-query"
         @click="triggerLeft"
         :class="queryFlag ? 'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "queryFlag",
    event: "input"
  },
  props: {
    queryFlag: {
      type: Boolean
    }
  },
  data() {
    return {
      imdataimdata: ""
    };
  },
  methods: {
    /**
     * 切换左侧
     */
    triggerLeft() {
      this.$emit("input", !this.queryFlag);
    }
  }
};
</script>
