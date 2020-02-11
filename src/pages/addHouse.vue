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
    padding: 0 20px;
    .page-contenr-com {
      overflow: auto;
      flex: 1;
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
      <el-steps :active="stepsActiveIndex"
                align-center
                finish-status="success">
        <el-step :title="item.title"
                 v-for="(item, index) in stepsList"
                 :key="index"></el-step>
      </el-steps>
    </div>
    <div class="page-contenr">
      <div class="page-contenr-com">
        {{ stepsActiveIndex }}
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
          <el-button v-if="stepsActiveIndex == 2 || stepsActiveIndex == 3"
                     type="info"
                     :loading="butLoading">跳过</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  watch: {
    stepsActiveIndex (val) {
      if (val == 1) this.prevText = "重置";
      else this.prevText = "上一步";

      if (val != this.stepsList.length) this.nextText = "下一步";
      else this.nextText = "邀请验真";
    }
  },
  data () {
    return {
      stepsList: [
        { title: "房源坐落", componentName: "" },
        { title: "基础信息", componentName: "" },
        { title: "补充信息(非必填)", componentName: "" },
        { title: "实勘图片/视频", componentName: "" },
        { title: "房源验真", componentName: "" }
      ],
      prevText: "重置",
      nextText: "下一步",
      stepsActiveIndex: 1,
      butLoading: false
    };
  },
  methods: {
    //上一步
    prevPage () {
      if (this.stepsActiveIndex > 1)--this.stepsActiveIndex;
    },
    //下一步
    nextPage () {
      if (this.stepsActiveIndex < this.stepsList.length)
        ++this.stepsActiveIndex;
    }
  }
};
</script>
