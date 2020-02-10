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
    overflow: auto;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
}
</style>
<template>
  <div class="page-body">
    <div class="page-steps">
      <el-steps :active="stepsActiveIndex" align-center finish-status="success">
        <el-step title="房源坐落"></el-step>
        <el-step title="基础信息"></el-step>
        <el-step title="补充信息(非必填)"></el-step>
        <el-step title="实勘图片/视频"></el-step>
        <el-step title="房源验真"></el-step>
      </el-steps>
    </div>
    <div class="page-contenr"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stepsActiveIndex: 0
    };
  }
};
</script>
