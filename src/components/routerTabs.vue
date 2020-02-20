
<style lang="less" scoped>
.el-tabs--border-card {
  box-shadow: none;
  border: none;
}
/deep/.el-tabs__content {
  padding: 0px;
}
.el-parent-tabs {
  /deep/.el-tabs__header {
    background: none;
  }
  /deep/.el-tabs__item {
    margin-right: 10px;
    background: #52a47c;
    span {
      color: #fff !important;
    }
  }
  /deep/.is-active {
    background: var(--color--primary) !important;
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
             v-model="renderActive">
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
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String
    },
    routerTab: {
      type: Array
    },
    activeParent: {
      type: String,
      default: '0'
    },
  },
  data () {
    return {
      renderTab: this.routerTab,
      renderActive: this.activeParent,
      renderChild: this.value
    }
  },
  methods: {
    childChange (e) {
      console.log(this.renderChild);
      this.$emit('input', this.renderChild);
      this.$emit('change', this.renderChild);
    }
  },
}
</script>
