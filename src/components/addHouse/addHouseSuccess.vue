<style lang="less" scoped>
</style>
<template>
  <div class="page-cell">
    <div class="">房源保存成功</div>
    <div>房源录入成功后，需邀请业主对房源进行验真后方可发布房源成功。</div>
    <el-steps :active="stepsActiveIndex+1"
              align-center
              finish-status="success">
      <el-step :title="item.title"
               v-for="(item, index) in stepsList"
               :key="index"></el-step>
    </el-steps>
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
