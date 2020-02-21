<style lang="less" scoped>
.page-cell-title {
  text-align: center;
  line-height: 40px;
  &.max-title {
    font-size: 36px;
    color: #67c23a;
  }
  &.title-top {
    margin-top: 50px;
  }
}
.mindder-step {
  width: 70%;
  margin: 50px auto 0;
}
.cell-flex {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  align-items: center;
  .text-center {
    text-align: center;
    margin-left: 50px;
    .text-center-tips {
      font-size: 20px;
      margin-top: 20px;
    }
  }
}
</style>
<template>
  <div class="page-cell-addHouse">
    <div class="page-cell-title max-title title-top"><i class="el-icon-circle-check"></i>房源保存成功</div>
    <div class="page-cell-title title-top">房源录入成功后，需邀请业主对房源进行验真后方可发布房源成功。</div>
    <div class="mindder-step">
      <el-steps :active="stepsActiveIndex+1"
                align-center
                finish-status="success">
        <el-step :title="item.title"
                 v-for="(item, index) in stepsList"
                 :key="index"></el-step>
      </el-steps>
    </div>
    <div class="cell-flex">
      <div>二维码</div>
      <div class="text-center">
        <div class="text-center-tips">微信扫一扫</div>
        <div class="text-center-tips">邀请业主进行验真</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "addHouseSuccess",
  data () {
    return {
      stepsActiveIndex: 1,
      stepsList: [
        { title: "录入房源", componentName: "basicInformation" },
        { title: "房源验真", componentName: "supplement" },
        { title: "发布成功", componentName: "exploration" }
      ],
    }
  },
  methods: {

  },
}
</script>
