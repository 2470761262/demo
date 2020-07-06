<style lang="less" scoped>
.content {
  //background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  flex: 1;
  .floot-content {
    display: flex;
    justify-content: center;
    padding: 24px 0;
    /deep/.el-button {
      width: 136px;
      height: 48px;
      // prettier-ignore
      font-size: 16PX;
      & + .el-button {
        margin-left: 16px;
      }
    }
  }
}
</style>
<template>
  <section class="content">
    <component :is="componentName" ref="childreCom"></component>
    <div class="floot-content">
      <el-button>返回</el-button>
      <el-button type="primary" @click="nextStep">下一步</el-button>
      <el-button type="primary">完成</el-button>
    </div>
  </section>
</template>

<script>
//异步组件工厂方法
import componentsFactory from "@/util/componentsFactory";
//记录步骤组件名字
const ComList = ["stepOne", "stepTwo"];
export default {
  components: {
    stepOne: () => componentsFactory(import("./components/stepOne")),
    stepTwo: () => componentsFactory(import("./components/stepTwo"))
  },
  data() {
    return {
      componentName: "stepTwo",
      comNextIndex: 0
    };
  },
  methods: {
    async nextStep() {
      let newxFlag = true;
      switch (this.componentName) {
        case "stepOne":
          //   newxFlag = await this.$refs.childreCom.validate();
          break;
      }

      if (newxFlag) {
        this.componentName = ComList[++this.comNextIndex];
      }
    }
  }
};
</script>
