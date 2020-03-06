
<style lang="less" scoped>
.el-tabs--border-card {
  box-shadow: none;
  border: none;
}
/deep/.el-tabs__content {
  padding: 0px !important;
}
.el-parent-tabs {
  /deep/.el-tabs__header {
    background: none;
  }
  /deep/.el-tabs__item {
    margin-right: 10px;
    background: var(--color--primary) !important; // #52a47c;
    //filter: brightness(150%);
    filter: opacity(0.7);
    span {
      color: #fff !important;
    }
  }
  /deep/.is-active {
    background: var(--color--primary) !important;
    //filter: brightness(100%) !important;
    filter: opacity(1);
  }
}
.el-children-tabs {
  background: var(--color--primary);
  /deep/.el-tabs__item {
    color: #fff;
  }
  /deep/.el-tabs__nav-wrap::after {
    background: var(--color--primary);
  }
  /deep/.el-tabs__active-bar {
    background-color: #fff !important;
  }
  /deep/.el-tabs__header {
    padding-left: 15px;
  }
  /deep/.el-tabs__item {
    font-size: 12px;
  }
}
</style>
<template>
  <div class="page-cell">
    <el-tabs type="border-card"
             class="el-parent-tabs"
             v-model="renderActive"
             @tab-click="parentChange">
      <el-tab-pane v-for="(item,index) in renderTab"
                   :key="index"
                   :name="item.active">
        <span slot="label"><i class="el-icon-date"></i> {{item.name}}</span>
      </el-tab-pane>
    </el-tabs>
    <template v-for="(item,index) in renderTab">
      <el-tabs @tab-click="childChange"
               v-if="item.children && item.active==renderActive"
               v-model="renderChild"
               class="el-children-tabs"
               :key="index">
        <el-tab-pane v-for="(items,index) in item.children"
                     :key="index"
                     :name="items.active"
                     :label="items.name">
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    //   value: {
    //    type: String
    //   },
    routerTab: {
      type: Array
    },
    // activeParent: {
    //    type: String,
    //    default: '0'
    // },
  },
  watch: {
    $route (newValue, oldValue) {
      this.initUrlTab();
    }
  },
  created () {
    this.initUrlTab();

  },
  data () {
    return {
      renderTab: this.routerTab,
      renderActive: '1',
      renderChild: ''
    }
  },
  methods: {
    initUrlTab () {
      let routerTab = this.routerTab;
      for (let i = 0; i < routerTab.length; i++) {
        for (let y = 0; y < routerTab[i].children.length; y++) {
          if (routerTab[i].children[y].active === this.$route.path) {
            this.renderActive = routerTab[i].active;
            this.renderChild = routerTab[i].children[y].active;
            return;
          }
        }
      }

    },
    childChange () {
      this.$router.push({ path: this.renderChild })
      // this.$emit('input', this.renderChild);
      this.$emit('change', this.renderChild);
    },
    //父级切换
    parentChange (e) {
      let resultIndex = this.routerTab.findIndex((item, index) => {
        return item.active == e.name
      })
      if (this.routerTab[resultIndex].children) {
        this.renderChild = this.routerTab[resultIndex].children[0].active;
        this.childChange();
      }
    }
  },
}
</script>
