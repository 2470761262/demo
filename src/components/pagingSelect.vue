<style lang="less" scoped>
.poper-ui {
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-button,
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-track-piece {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #c9c9c9;
    border-radius: 50px;
  }
  .poper-li {
    .poper-li-label {
      > input {
        display: none;
      }
      > input:checked + .poper-li-label-body {
        .label-title,
        .label-pitchOn-type {
          color: var(--color--primary);
          font-weight: 600;
        }
      }
      .poper-li-label-body {
        display: flex;
        padding: 5px 10px;
        font-size: 15px;
        cursor: pointer;
        &.hover {
          background: #f2f2f2;
        }
      }
    }
  }
}
.text-centent {
  padding: 0 10px;
  font-size: 15px;
  text-align: center;
}
</style>
<template>
  <el-popover popper-class="poperSet"
              trigger="click"
              v-model="visible"
              :width="popoverWidth">
    <el-input size="mini"
              v-model.lazy="filterInput"
              @input="debounce('filterInputChange')"
              placeholder="输入您需要筛选的关键字"></el-input>
    <div class="text-centent"
         v-if="loading">加载中...</div>
    <div class="text-centent"
         v-if="data.length == 0 && !loading">暂无数据</div>
    <ul class="poper-ui"
        infinite-scroll-immediate="false"
        v-infinite-scroll="load"
        @mouseleave.stop="hoverIndexID = -1">
      <li v-for="(item,index) in data"
          :key="index"
          @mouseenter.stop="hoverItem(item)"
          class="poper-li">
        <label class="poper-li-label">
          <input :type="type"
                 :value="item[isValue]"
                 v-model="pitchOn">
          <div class="poper-li-label-body"
               @click.stop="emitPitchOn(item)"
               :class="{'hover':item[isValue] == hoverIndexID}">
            <div class="label-title">{{item[isKey]}}</div>
            <div class="label-pitchOn-type"></div>
          </div>
        </label>
      </li>
    </ul>
    <el-input :value="resultValue"
              placeholder="选择"
              readonly
              ref="onlayInput"
              slot="reference"
              @focus.native.stop="triggerSelect"></el-input>
  </el-popover>
</template>

<script>
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/src/utils/resize-event";
export default {
  props: {
    isValue: {
      type: String,
      default: "value"
    },
    isKey: {
      type: String,
      default: "key"
    },
    type: {
      type: String,
      default: "checkbox"
    },
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    resultValue() {
      return this.filterPitchOn().join(",");
    }
  },
  data() {
    return {
      hoverIndexID: -1, //当前hover的id用于添加hoverClass
      pitchOn: this.value.slice(0), //选中
      visible: false,
      popoverWidth: 0,
      filterInput: "",
      time: null //用于input防抖
    };
  },
  mounted() {
    this.$nextTick(() => {
      addResizeListener(this.$refs.onlayInput.$el, this.resetPopWdith);
    });
  },
  beforeDestroy() {
    removeResizeListener(this.$refs.onlayInput.$el, this.resetPopWdith);
  },
  methods: {
    //防抖
    debounce(funName) {
      if (this.time) {
        clearTimeout(this.time);
      }
      this.time = setTimeout(() => {
        this.time = null;
        this[funName]();
      }, 400);
    },
    filterInputChange() {
      console.log("wioww");
      this.$emit("change", this.filterInput);
    },
    load() {
      this.$emit("load");
    },
    //提交选中
    emitPitchOn() {
      this.$emit("input", this.pitchOn);
    },
    filterPitchOn() {
      let result = [];
      for (let i = 0; i < this.pitchOn.length; i++) {
        for (let y = 0; y < this.data.length; y++) {
          if (this.pitchOn[i] == this.data[y][this.isValue]) {
            result.push(this.data[y][this.isKey]);
          }
        }
      }
      return result;
    },
    hoverItem(item) {
      this.hoverIndexID = item[this.isValue];
    },
    resetPopWdith() {
      this.$nextTick(() => {
        this.popoverWidth = this.$refs.onlayInput.$el.clientWidth;
      });
    },
    triggerSelect() {
      this.visible = !this.visible;
    }
  }
};
</script>
