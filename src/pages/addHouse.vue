<style lang="less" scoped>
.page-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  .page-steps {
    /deep/.el-step__title {
      line-height: normal;
      margin-top: 10px;
    }
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 10px 0 15px;
  }
  .page-contenr {
    flex: 1;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    //padding: 0 20px;
    .page-contenr-com {
      overflow: auto;
      flex: 1;
      position: relative;
      &.page-contenr-com-over {
        overflow: hidden !important;
      }
      .page-contenr-com-posi {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
    .page-contenr-but {
      display: flex;
      justify-content: center;
      border-top: 1px solid #f2f2f2;
      padding: 10px 0px;
    }
  }
}
.page-next {
  background: rgba(90, 168, 148, 1);
}
.page-previous {
  background: #f59a23;
}
/deep/.el-button {
  border: none;
}
</style>
<template>
  <div class="page-body">
    <div class="page-steps">
      <el-steps :active="stepsActiveIndex+1"
                align-center
                finish-status="success">
        <el-step :title="item.title"
                 v-for="(item, index) in stepsList"
                 :key="index"></el-step>
      </el-steps>
    </div>
    <div class="page-contenr">
      <div :class="['page-contenr-com',{'page-contenr-com-over':butLoading}]"
           v-scrollTop="butLoading"
           v-loading="butLoading">
        <div class="page-contenr-com-posi">
          <component :is="componentName"
                     ref="com"></component>
        </div>
      </div>
      <div class="page-contenr-but">
        <el-button-group>
          <el-button type="primary"
                     @click="prevPage"
                     class="page-previous">{{
            prevText
          }}</el-button>
          <el-button type="primary"
                     @click="nextPage"
                     class="page-next"
                     :loading="butLoading">{{ nextText }}</el-button>
          <el-button type="info"
                     :loading="butLoading">保存草稿</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>
<script>
//默认组件
import basicInformation from "@/components/addHouse/basicInformation";
//异步组件工厂方法
import componentsFactory from "@/util/componentsFactory";
import { mapState } from "vuex";
export default {
  components: {
    basicInformation,
    supplement: () => componentsFactory("addHouse/supplement"), //补充信息
    exploration: () => componentsFactory("addHouse/exploration") //实勘图片/视频
  },
  directives: {
    scrollTop: {
      update (el, bind, vnode) {
        el.scrollTop = 0;
      }
    }
  },
  watch: {
    stepsActiveIndex (val) {
      if (val == 0) this.prevText = "重置";
      else this.prevText = "上一步";

      if (val != this.stepsList.length) this.nextText = "下一步";
      else this.nextText = "邀请验真";
    }
  },
  data () {
    return {
      componentName: "exploration",
      stepsList: [
        { title: "基础信息", componentName: "basicInformation" },
        { title: "补充信息(非必填)", componentName: "supplement" },
        { title: "实勘图片/视频", componentName: "exploration" },
        { title: "房源验真", componentName: "" }
      ],
      prevText: "重置",
      nextText: "下一步",
      stepsActiveIndex: 0,
      butLoading: false
    };
  },
  methods: {
    //上一步
    prevPage () {
      if (this.stepsActiveIndex > 0) {
        this.componentName = this.stepsList[--this.stepsActiveIndex].componentName;
      }
    },
    //下一步
    async  nextPage () {
      let comName = this.$refs.com.$options.name;
      let flag = false;
      this.butLoading = true;
      switch (comName) {
        case "basicInformation":
          flag = await this.$refs.com.validateAll();
          break;
        case "supplement":
          flag = await this.$refs.com.validateAll();
          break;
        case "supplement":
          flag = await this.$refs.com.validateAll();
          break;
      }
      this.butLoading = false;
      if (this.stepsActiveIndex < this.stepsList.length && flag) {
        this.componentName = this.stepsList[++this.stepsActiveIndex].componentName;
      }
    }
  }
};
</script>
