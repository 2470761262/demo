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
      <!-- @change="change" -->
      <router-tabs :routerTab="routerTab"
                   :activeParent="activeParent"
                   v-model="activeChild"></router-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import routerTabs from '@/components/routerTabs';
import rouetTabsArray from '@/pages/buySellSystem/otherIframe/routerTabJs/index';
export default {
  components: {
    routerTabs
  },
  data () {
    return {
      activeParent: '1',//默认显示那个一个块tabs父级菜单
      activeChild: '23', //默认显示的路径 23随便写的
      routerTab: rouetTabsArray
    }
  },
  methods: {
    change (e) {
      console.log(e, this.activeChild);
    }
  },
}
</script>
