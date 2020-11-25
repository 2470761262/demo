<style lang="less" scoped>
.content {
  flex: 1;
  height: 0;
  background: #f0f7f7;
  display: flex;
  flex-direction: column;
  .head {
    background: #fff;
    // position: sticky;
    // top: 0;
    // z-index: 10;
    .head-type {
      height: 67px;
      display: flex;
      padding: 0 24px;
      border-bottom: 1px solid #f0f2f5;
      .head-type-item {
        position: relative;
        line-height: 67px;
        margin-right: 46px;
        color: #303133;
        font-size: @font18;
        cursor: pointer;
        &.active {
          color: @backgroud;
          font-weight: bold;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: @backgroud;
            border-radius: 2px 2px 0px 0px;
          }
        }
      }
    }
    .head-underling-nva {
      display: flex;
      height: 58px;
      align-items: center;
      padding-left: 24px;
      .head-nav-item {
        height: 26px;
        padding: 0 8px;
        border-radius: 4px;
        border: 1px solid transparent;
        box-sizing: border-box;
        font-size: @font14;
        text-align: center;
        line-height: 24px;
        color: #606266;
        margin-right: 16px;
        cursor: pointer;
        &.active {
          color: @backgroud;
          background: @opacityBackground;
          border: 1px solid @backgroud;
        }
      }
    }
  }
  .scroll {
    flex: 1;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
<template>
  <div class="content">
    <div class="head">
      <div class="head-type">
        <div
          class="head-type-item"
          v-for="(item, index) in navs"
          :key="index"
          :class="{ active: currentNavIndex == index }"
          @click="navigateToOhter(item.path)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="head-underling-nva">
        <div
          class="head-nav-item"
          v-for="(item, index) in subNavs"
          :key="index"
          :class="{ active: currentSubNavIndex == index }"
          @click="navigateToOhter(item.path, index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="scroll">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentNavIndex: 0,
      currentSubNavIndex: 0,
      navs: [
        {
          name: "考勤统计",
          path: "/clockList"
        },
        {
          name: "考勤规则",
          path: "/clockRule"
        }
      ],
      subNavs: [
        {
          name: "我的日志",
          path: "/clockList/myInfo"
        },
        {
          name: "考勤统计",
          path: "/clockList/statistic"
        },
        {
          name: "考勤审批",
          path: "/clockList/examine"
        }
      ]
    };
  },
  methods: {
    navigateToOhter(path, index) {
      if (index != undefined) this.currentSubNavIndex = index;
      this.$router.push({ path: path });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.currentSubNavIndex = vm.subNavs.findIndex(item => {
        return item.path == to.fullPath;
      });
    });
  }
};
</script>
