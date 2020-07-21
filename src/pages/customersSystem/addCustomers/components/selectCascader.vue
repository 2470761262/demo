<style lang="less" scoped>
@import "../less/public.less";
.select-cascader-content {
  position: relative;
  z-index: 30;
  width: 506px;
  .select-input {
    height: 48px;
    .input;
  }
  .cascder-content {
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    transform: translateY(100%);
    box-shadow: 0px 10px 16px 0px rgba(0, 0, 0, 0.24);
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    overflow: hidden;
    .cascder-ul-content {
      display: flex;
      .cascder-content-area {
        flex: 1;
        max-height: 250px;
        overflow: auto;
        box-sizing: border-box;
        .cascder-item {
          height: 61px;
          line-height: 61px;
          padding-left: 24px;
          // prettier-ignore
          font-size: 16PX;
          color: rgba(48, 49, 51, 1);
          cursor: pointer;
          &.active {
            background: @opacityBackground;
            color: @backgroud;
          }
        }
      }
    }
    .split-line {
      display: block;
      height: 1px;
      background: rgba(240, 242, 245, 1);
    }
    .cascder-ul-foot {
      display: flex;
      justify-content: flex-end;
      padding: 16px 0;
      .btn-save {
        margin-right: 24px;
        width: 130px;
        height: 48px;
        background: @backgroud;
        border-radius: 4px;
        // prettier-ignore
        font-size: 16PX;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
.error-tips {
  .error-tips();
}
</style>
<template>
  <div class="select-cascader-content" :class="{ 'error-tips': errorFlag }">
    <el-input
      readonly
      @click.native.stop="activeDown('focus')"
      v-model="inputValue"
      class="select-input input-content"
      type="text"
      placeholder="请选择客户来源"
    />
    <transition name="el-fade-in-linear">
      <div v-show="activeFlag" class="cascder-content" @click.stop="">
        <div class="cascder-ul-content">
          <ul class="cascder-content-area">
            <li
              class="cascder-item"
              :class="{ active: item.active }"
              v-for="(item, index) in rednerCascader"
              :key="item.value"
              @click="fristActive(index)"
            >
              {{ item[keyValue] }}
            </li>
          </ul>
          <ul class="cascder-content-area">
            <li
              class="cascder-item"
              :class="{ active: item.active }"
              v-for="(item, index) in renderChilder"
              :key="item.value"
              @click="childerActive(index)"
            >
              {{ item[keyValue] }}
            </li>
          </ul>
        </div>
        <i class="split-line"></i>
        <div class="cascder-ul-foot">
          <el-button class="btn-save" @click="save">保存</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * @example: 递归循环找出对应的结果 然后进行复制，用于回显
 * @param {Array} advanceValue 回显关键字,由value字段组成
 * @param {Array} rednerCascader 渲染数组
 * @param {Number} loopIndex 参照下标,无需传入
 * @param {Array} resultArr 最终结果数组,无需传入
 * @return: [object Object]
 */

const loopResultList = function(
  advanceValue,
  rednerCascader,
  loopIndex = 0,
  resultArr = []
) {
  /**
   * @example: 递归函数
   * @param {Array} rednerCascaderLoop 当前找到的数据,传递传递rednerCascaderLoop的children
   */

  function loop(rednerCascaderLoop) {
    for (let i = 0; i < rednerCascaderLoop.length; i++) {
      if (rednerCascaderLoop[i].value == advanceValue[loopIndex]) {
        rednerCascaderLoop[i].active = true;
        resultArr.push(rednerCascaderLoop[i]);
        ++loopIndex;
        if (rednerCascaderLoop[i].children) {
          return loop(rednerCascaderLoop[i].children);
        }
        return;
      }
    }
  }
  loop(rednerCascader);
  return resultArr;
};
export default {
  props: {
    errorFlag: {
      type: Boolean,
      default: false
    },
    keyValue: {
      type: String,
      default: "title"
    },
    value: {
      type: Array
    },
    cascaderList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    /**
     * @example: 获取当前被激活的一级Index
     * @rerturn Number
     */
    fristIndex() {
      const index = this.rednerCascader.findIndex((item, index) => {
        return item.active == true;
      });
      if (index == -1) return 0;
      return index;
    },
    /**
     * @example: 计算当前被激活的子菜单
     * @return Array
     */
    renderChilder() {
      return this.rednerCascader[this.fristIndex].children.map(
        (item, index) => {
          let flag = true;
          //如果result存在
          if (this.result[1]) {
            //则判断存入的[1]value是否与当前循环的相同不相同则清空
            if (this.result[1].value != item.value) {
              this.$set(
                this.rednerCascader[this.fristIndex].children[index],
                "active",
                false
              );
            }
          } else {
            //result[1] 不存在则代表没有选择，也全部清空
            this.$set(
              this.rednerCascader[this.fristIndex].children[index],
              "active",
              false
            );
          }

          return item;
        }
      );
    }
  },
  watch: {
    cascaderList: {
      immediate: true,
      handler(val, oldVal) {
        this.rednerCascader = JSON.parse(JSON.stringify(val)).map(item => {
          item.active = false;
          return item;
        });
      }
    },
    value: {
      immediate: true,
      handler(value) {
        if (value) {
          this.result = loopResultList(value, this.rednerCascader);
          if (this.result.length != 0)
            this.inputValue = this.result[this.result.length - 1].title;
        }
      }
    }
  },
  data() {
    return {
      rednerCascader: [],
      inputValue: "",
      activeFlag: false,
      result: []
    };
  },
  created() {
    window.addEventListener("click", this.hideDown);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.hideDown);
  },
  methods: {
    /**
     * @example: 隐藏联级下拉菜单
     */

    hideDown() {
      this.activeFlag = false;
    },
    /**
     * @example: input点击显示联级下拉菜单
     */

    activeDown() {
      this.activeFlag = !this.activeFlag;
    },
    /**
     * @example: 设置第一级点击的Index
     * @param {number} valueIndex 第一级当前点击的index
     */

    fristActive(valueIndex, arr) {
      let list = !arr ? this.rednerCascader : arr;

      list.forEach((item, index) => {
        if (index !== valueIndex) {
          item.active = false;
        }
        if (index === valueIndex) {
          item.active = true;
        }
      });
    },
    childerActive(valueIndex) {
      if (this.result[0] == undefined) {
        this.fristActive(this.fristIndex);
      }
      this.fristActive(valueIndex, this.renderChilder);
      this.result[0] = this.rednerCascader[this.fristIndex];
      this.result[1] = this.renderChilder[valueIndex];
      this.$forceUpdate();
    },
    /**
     * @example: 提交
     */
    save() {
      if (this.result.length != 0) {
        const result = this.result.map(item => {
          return item.value;
        });
        this.$emit("submitResult", result);
        this.$emit("input", result);
        this.inputValue = this.result[this.result.length - 1].title;
        this.hideDown();
      } else {
        //数据为空处理
      }
    }
  }
};
</script>
