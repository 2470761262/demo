<style lang="less" scoped>
@import "../less/public.less";
.select-cascader-content {
  position: relative;
  width: 506px;
  .select-input {
    height: 48px;
    .input;
  }
  .cascder-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translateY(100%);
    box-shadow: 0px 10px 16px 0px rgba(0, 0, 0, 0.24);
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    display: flex;
    overflow: hidden;
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
        text-shadow: 0px 10px 16px rgba(0, 0, 0, 0.24);
        color: rgba(48, 49, 51, 1);
        cursor: pointer;
        &.active {
          background: @opacityBackground;
          //  color: var(--color--primary);
        }
      }
    }
  }
}
</style>
<template>
  <div class="select-cascader-content">
    <!--     -->
    <el-input
      @focus="activeDown('focus')"
      @click.native.stop="activeDown"
      v-model="inputValue"
      class="select-input"
      type="text"
      placeholder="请选择客户来源"
    />
    <div v-show="activeFlag" class="cascder-content" @click.stop="">
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
      <div class="cascder-content-area"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keyValue: {
      type: String,
      default: "title"
    },
    cascaderList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    cascaderList: {
      deep: true,
      immediate: true,
      handler: function(val, oldVal) {
        this.rednerCascader = val.map(item => {
          if (!item.default) {
            item.active = false;
          } else {
            item.active = true;
          }
          return item;
        });
      }
    }
  },
  data() {
    return {
      rednerCascader: [],
      inputValue: "",
      activeFlag: false
    };
  },
  created() {
    window.addEventListener("click", this.hideDown);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.hideDown);
  },
  methods: {
    hideDown() {
      this.activeFlag = false;
    },
    activeDown(field) {
      if (field && this.activeFlag) this.activeFlag = false;
      this.activeFlag = true;
    },
    fristActive(valueIndex) {
      this.rednerCascader.forEach((item, index) => {
        if (index !== valueIndex) {
          item.active = false;
        }
        if (index === valueIndex) {
          item.active = true;
        }
      });
      console.log(this.rednerCascader);
      this.$forceUpdate();
    }
  }
};
</script>
