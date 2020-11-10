<style lang="less" scoped>
.content {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 0;
}
// <!-- nav类型切换 -->
.tab-content {
  //  display: flex;
  &::after {
    content: "";
    display: block;
    height: 1px;
    // prettier-ignore
    margin-top: 9PX;
    background: rgba(240, 242, 245, 1);
  }
  .tab-content-nav {
    display: flex;
    // prettier-ignore
    margin-top: 15PX;
    // prettier-ignore
    padding: 0 15PX;
    .tab-content-item {
      font-size: @font16;
      // prettier-ignore
      margin-right: 32PX;
      position: relative;
      color: rgba(96, 98, 102, 1);
      cursor: pointer;
      &.small {
        font-size: @font14;
      }
      &.active {
        color: @backgroud;
        //   font-weight: bold;
        display: flex;
        align-items: center;
        &::after {
          content: "";
          position: absolute;
          // prettier-ignore
          bottom: -10PX;

          height: 2px;
          background: @backgroud;
          width: 100%;
          left: 0;
        }
        &::before {
          content: "";
          margin-right: 8px;
          background: @backgroud;
          // prettier-ignore
          width: 6PX;
          // prettier-ignore
          height: 6PX;
          border-radius: 50%;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
<template>
  <div class="content">
    <nav-handle />
    <div class="tab-content">
      <div class="tab-content-nav">
        <div
          class="tab-content-item anchor-point"
          :class="{ active: typeActiveIndex == index }"
          v-for="(item, index) in typeList"
          :data-anchor="'我的房源找房:' + item.label"
          :key="index"
          @click="changeNavTypeIndex(index)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <!-- 我的角色,我的验真,我的审核,我的对赌 -->
    <router-view />
  </div>
</template>
<script>
import navHandle from "@/components/navHeader";
//切换tab类型
const TYPELIST = [
  {
    label: "我的角色",
    value: 0,
    name: "myRole"
  },
  {
    label: "我的验真",
    value: 1,
    name: "myValidate"
  },
  // {
  //   label: "我的审核",
  //   value: 2,
  //   name: "myExamine"
  // },
  {
    label: "我的对赌",
    value: 3,
    name: "myBet"
  },
  {
    label: "VR拍摄",
    value: 4,
    name: "vrShooting"
  },
  {
    label: "状态转换记录",
    value: 5,
    name: "saleStatusRecord"
  }
];
export default {
  components: {
    navHandle
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function(val, oldVal) {
        this.initNavNavType();
      }
    }
  },
  data() {
    return {
      typeList: TYPELIST,
      typeActiveIndex: 0 //nav类型激活Index
    };
  },
  methods: {
    initNavNavType() {
      this.typeActiveIndex = this.typeList.findIndex(
        item => item.name == this.$route.name
      );
    },
    changeNavTypeIndex(index) {
      this.typeActiveIndex = index;
      this.$router.push({ name: this.typeList[this.typeActiveIndex].name });
    }
  }
};
</script>
