<style lang="less" scoped>
.page-cell {
  //height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
<template>
  <div class="page-cell">
    <div class="page-cell-tab">
      <!-- @change="change" 
      :activeParent="activeParent"
      v-model="activeChild"-->
      <router-tabs :routerTab="routerTab"></router-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import routerTabs from "@/components/routerTabs";
import rouetTabsArray from "@/pages/buySellSystem/otherIframe/routerTabJs/index";
export default {
  name: "otherIframe",
  components: {
    routerTabs
  },
  data() {
    return {
      activeParent: "1", //默认显示那个一个块tabs父级菜单
      activeChild: "/buySellSystem/concernCommunity", //默认显示的路径 tabs路径
      routerTab: rouetTabsArray
    };
  },
  methods: {
    change(e) {
      //console.log(e, this.activeChild);
    }
  }
};
</script>
