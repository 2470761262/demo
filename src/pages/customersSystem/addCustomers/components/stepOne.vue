<style lang="less" scoped>
@import "../less/public.less";
.step-content {
  padding: 0 24px;
  .title {
    // prettier-ignore
    font-size: 24PX;
    color: rgba(48, 49, 51, 1);
    line-height: 32px;
    margin: 24px 0;
  }
  .split-line {
    height: 1px;
    display: block;
    background: rgba(240, 242, 245, 1);
  }
  .input-group {
    margin-top: 24px;
    &:first-of-type {
      margin-top: 16px;
    }
    &.is-required {
      .input-head {
        &::before {
          content: "";
          margin-right: 8px;
          border-radius: 50%;
          width: 6px;
          height: 6px;
          background: rgba(246, 47, 47, 1);
        }
      }
    }
    .input-head {
      // prettier-ignore
      font-size: 16PX;
      // prettier-ignore
      line-height: 21px;
      color: rgba(48, 49, 51, 1);
      font-weight: bold;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
    }
    .input-content {
      width: 506px;
      height: 48px;
      .input;
    }
    .radio-content {
      cursor: pointer;
      display: inline-block;
      & + .radio-content {
        margin-left: 16px;
      }
      input[type="radio"] {
        display: none;
      }
      input[type="radio"]:checked + .radio-title {
        background: var(--color--primary);
        color: rgba(255, 255, 255, 1);
      }
      .radio-title {
        width: 103px;
        height: 48px;
        background: rgba(240, 242, 245, 1);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        // prettier-ignore
        font-size: 16PX;
        color: rgba(144, 147, 153, 1);
        // prettier-ignore
        line-height: 21PX;
      }
    }
  }
}
</style>
<template>
  <section class="step-content">
    <h3 class="title">您的客户信息</h3>
    <i class="split-line"></i>
    <div class="input-group is-required">
      <div class="input-head">客户姓名</div>
      <el-input
        v-model="mock"
        class="input-content"
        clearable
        placeholder="请输入客户的姓名"
      />
    </div>
    <div class="input-group is-required">
      <div class="input-head">客户性别</div>
      <label class="radio-content" v-for="item in sex" :key="item.value">
        <input type="radio" name="sex" :value="item.value" v-model="mock" />
        <div class="radio-title">{{ item.key }}</div>
      </label>
    </div>
    <div class="input-group is-required">
      <div class="input-head">客户来源</div>
      <select-cascader />
    </div>
  </section>
</template>

<script>
import { SEX } from "@/util/constMap";
import selectCascader from "./selectCascader";
export default {
  components: {
    selectCascader
  },
  data() {
    return {
      mock: "",
      sex: SEX
    };
  }
};
</script>
