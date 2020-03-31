<style lang="less" scoped>
.poper-ui {
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 8px;
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
    &.is-disabled {
      background: #f2f2f2;
      label {
        cursor: no-drop;
      }
    }
    .poper-li-label {
      > input {
        display: none;
      }
      > input:checked + .poper-li-label-body {
        .label-title,
        .label-pitchOn-type {
          color: var(--color--primary);
          font-weight: 600;
          display: block;
        }
      }
      .poper-li-label-body {
        display: flex;
        padding: 5px 10px;
        font-size: 15px;
        align-items: center;
        justify-content: space-between;
        .label-pitchOn-type {
          display: none;
        }
        &:hover {
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
.ul-data-loading {
  font-size: 13px;
  padding: 0 10px;
}
.result-input-content {
  position: relative;
  height: 35px;
  border: 1px solid #c0c4cc; // var(--color--primary);
  border-radius: 6px;
  overflow: hidden;
  padding: 0 20px;
  &:hover .result-clearable {
    display: block;
  }
  > input {
    width: 100%;
    border: none;
    outline: none;
    height: 100%;
    font-size: 14px;
    &::-webkit-input-placeholder {
      font-size: inherit;
      color: #c0c4cc;
    }
  }
  .result-clearable {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    cursor: pointer;
    display: none;
  }
}
</style>
<template>
  <el-popover popper-class="poperSet"
              trigger="click"
              v-model="visible"
              :width="popoverWidth">
    <el-input size="mini"
              v-model="filterInput"
              clearable
              @input="debounce('filterInputChange')"
              placeholder="输入您需要筛选的关键字"></el-input>
    <ul class="poper-ui"
        infinite-scroll-immediate="false"
        v-infinite-scroll="load">
      <li v-for="(item,index) in data"
          :key="index"
          class="poper-li"
          :class="{'is-disabled':resultDisabled(item,index)}">
        <label class="poper-li-label">
          <input :type="type"
                 :name="inputName"
                 :disabled="resultDisabled(item,index)"
                 :value="item[valueKey]"
                 v-model="resultPitchOn">
          <div class="poper-li-label-body">
            <div class="label-title">{{item[keyValue]}}</div>
            <div class="label-pitchOn-type el-icon-check"></div>
          </div>
        </label>
      </li>
      <li v-if="loading"
          class="ul-data-loading">
        <i class="el-icon-loading"></i> 加载中
      </li>
      <li class="text-centent"
          v-if="data.length == 0 && !loading || isPageEnd">
        没有更多数据了 <i class="el-icon-warning-outline"></i>
      </li>
    </ul>
    <div class="result-input-content"
         slot="reference"
         ref="onlayInput"
         @click="visible = !visible">
      <input :placeholder="$attrs.placeholder || '选中您的数据'"
             readonly
             :value="resultValue"
             clearable
             @focus.stop="triggerSelect">
      <span class="el-icon-circle-close result-clearable"
            v-if="clearable"
            @click.stop="resultPitchOn = []"></span>
    </div>
  </el-popover>
</template>

<script>
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/src/utils/resize-event";
export default {
  inheritAttrs: false,
  props: {
    /**
     * 是否可以删除
     */
    clearable: {
      type: Boolean,
      default: false
    },
    /**
     *  指定value的name
     */
    valueKey: {
      type: String,
      default: "value"
    },
    disabled: {
      type: Function
    },
    /**
     *  指定key的name
     */
    keyValue: {
      type: String,
      default: "key"
    },
    /**
     *  checkbox 或者 radio
     */
    type: {
      type: String,
      default: "checkbox"
    },
    /**
     *  渲染的数据
     */
    data: {
      type: Array,
      default: () => []
    },
    /**
     *  v-model 需要传递一个数组
     */
    value: {
      type: Array,
      default: () => []
    },
    /**
     *  加载中开关
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     *  是否分页结束
     */
    isPageEnd: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    resultValue() {
      return this.type == "checkbox"
        ? this.filterPitchOn().join(",")
        : (this.filterPitchOn()[0] || {})[this.keyValue];
    },
    resultPitchOn: {
      get() {
        return this.value;
      },
      set(value) {
        this.type == "checkbox"
          ? this.$emit("input", [...value])
          : this.$emit("input", [value]);
        if (value.length != 0) {
          this.$emit(
            "valueChange",
            this.type == "checkbox" ? [...value] : [value]
          );
        }
        if (this.type !== "checkbox") {
          this.visible = false;
        }
      }
    }
  },
  data() {
    return {
      inputName: Date.now().toString(36),
      visible: false,
      popoverWidth: 0,
      filterInput: "",
      time: null //用于input防抖
    };
  },
  mounted() {
    this.$nextTick(() => {
      addResizeListener(this.$refs.onlayInput, this.resetPopWdith);
    });
  },
  beforeDestroy() {
    removeResizeListener(this.$refs.onlayInput, this.resetPopWdith);
  },
  methods: {
    resultDisabled(item, index) {
      if (!this.disabled) {
        return false;
      } else {
        return this.disabled(item, index);
      }
    },
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
      this.$emit("change", this.filterInput, "change");
    },
    /**
     * 触发滚动到底分页
     */
    load() {
      this.$emit("load", this.filterInput, "load");
    },
    filterPitchOn() {
      switch (this.type) {
        case "checkbox":
          let result = [];
          for (let i = 0; i < this.resultPitchOn.length; i++) {
            for (let y = 0; y < this.data.length; y++) {
              if (this.resultPitchOn[i] == this.data[y][this.valueKey]) {
                result.push(this.data[y][this.keyValue]);
              }
            }
          }
          return result;
        case "radio":
          return this.data.filter(element => {
            return element[this.valueKey] == this.value[0];
          });
      }
    },
    resetPopWdith() {
      this.$nextTick(() => {
        this.popoverWidth = this.$refs.onlayInput.clientWidth;
      });
    },
    triggerSelect() {
      this.visible = !this.visible;
    }
  }
};
</script>
