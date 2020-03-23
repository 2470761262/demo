<style lang="less" scoped>
.sldebar-content {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 30px;
  .sldebar-content-list {
    //align-self: flex-start;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    .sldebar-content-item {
      cursor: pointer;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      &:last-child {
        margin-bottom: 0;
      }
      .icon {
        font-size: 40px;
      }
    }
  }
}
</style>
<template>
  <div class="sldebar-content">
    <div class="sldebar-content-list">
      <div class="sldebar-content-item"
           @click="goHome">
        <i class="el-icon-s-home icon"></i>
        <span class="item-title">首页</span>
      </div>
      <div class="sldebar-content-item"
           @click="goBack">
        <i class="el-icon-d-arrow-left icon"></i>
        <span class="item-title">返回</span>
      </div>
      <div class="sldebar-content-item"
           @click="lastClick">
        <i class="el-icon-plus icon"></i>
        <span class="item-title">{{lastItemSet ? lastTitle : '新增'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lastItemSet: {
      type: Boolean,
      default: false
    },
    lastTitle: {
      type: String,
    },
    lastUrl: {
      type: String,
      default: '/buySellSystem/addHouse'
    },
    lastQuery: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    goHome () {
      this.$router.push({ path: '/buySellSystem/houseList' });
    },
    goBack () {
      this.$router.go(-1);
    },
    lastClick () {
      let routerData = {
        path: this.lastUrl
      }
      if (this.lastQuery) {
        routerData.query = this.lastQuery;
      }
      this.$router.push(routerData)
    }
  },
}
</script>

