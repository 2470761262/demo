<style lang="less" scoped>
.page-cell {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <div class="page-cell">
    <div class="page-cell-tab">
      <router-tabs :routerTab="routerTab"></router-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import routerTabs from '@/components/routerTabs';
export default {
  components: {
    routerTabs
  },
  data () {
    return {
      routerTab: [
        {
          name: "我的房源", index: 0, children: [
            { name: "我的核心盘" },
            { name: "我的跟单" },
            { name: "我的相关" },
            { name: "我的数据" },
            { name: "我的关注" },
            { name: "成交对赌" },
            { name: "验真列表" },
            { name: "审核列表" },
            { name: "外网房源" },
          ]
        },
        {
          name: "资源库", index: 0, children: [
            { name: "店公共盘" },
            { name: "在销无限单" },
            { name: "暂不售" },
            { name: "无号码" },
            { name: "潜在出售" }
          ]
        },
        {
          name: "全部在售", index: 0, children: [
            { name: "全部在售" }
          ]
        },
        {
          name: "成交房源", index: 0, children: [
            { name: "我司成交" },
            { name: "他司成交" },
            { name: "业主自售" }
          ]
        }
      ]
    }
  }
}
</script>
