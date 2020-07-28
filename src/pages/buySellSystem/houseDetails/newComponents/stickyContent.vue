<style lang="less" scoped>
.sticky-content {
  display: flex;
  // prettier-ignore
  margin-top: 28PX;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  position: sticky;
  // prettier-ignore
  top: 0PX;
  z-index: 10;
  background: #fff;
  .sticky-item {
    font-size: @font16;
    flex: 1;
    // prettier-ignore
    padding: 7PX 0;
    text-align: center;
    box-sizing: border-box;
    font-weight: 500;
    cursor: pointer;
    //   transition: background 0.2s ease-in;
    &.active {
      background: @backgroud;
      color: #fff;
      .sticky-item-pad {
        border: none;
      }
    }
    &:last-child {
      .sticky-item-pad {
        border: none;
      }
    }
    .sticky-item-pad {
      padding: 8px 0;
      border-right: 1px solid #d5d5d5;
    }
  }
}
</style>
<template>
  <div class="sticky-content">
    <div
      class="sticky-item"
      :class="{ active: activeClass === item.domName }"
      v-for="item in stickyList"
      :key="item.title"
      @click="setScrollMove(item)"
    >
      <div class="sticky-item-pad">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
const STICKYLIST = [
  { title: "维护信息", domName: ".maintain-content" },
  { title: "经纪人点评", domName: ".broker-content" },
  { title: "实勘信息", domName: ".peview-content" },
  { title: "角色人申请", domName: ".role-content" },
  { title: "历史轨迹", domName: ".trajectory-content" }
];
//import util from "@/util/util";
export default {
  mounted() {
    document
      .querySelector(".el-main")
      .addEventListener("scroll", this.computeDomTop);
  },
  beforeDestroy() {
    document
      .querySelector(".el-main")
      .removeEventListener("scroll", this.computeDomTop);
  },
  data() {
    return {
      stickyList: STICKYLIST,
      activeClass: ".maintain-content"
    };
  },
  methods: {
    /**
     * @example: 滚动到指定元素
     * @param {Object} item
     */
    setScrollMove(item) {
      document.querySelector(item.domName).scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    },
    /**
     * @example: elMain 滚动计算当前可视区域元素高亮
     */
    computeDomTop() {
      let stickyList = this.stickyList;
      let doc = document;
      let main = doc.querySelector(".el-main");
      if (main.clientHeight + main.scrollTop >= main.scrollHeight) {
        this.activeClass = this.stickyList[this.stickyList.length - 1].domName;
        return;
      }
      for (let i = 0; i < stickyList.length; i++) {
        let { domName, title } = stickyList[i];
        let itemDom = doc.querySelector(domName);
        let { top } = itemDom.getBoundingClientRect();
        if (top > 0 && top < main.clientHeight / 2) {
          if (itemDom.classList.contains(this.activeClass.replace(".", ""))) {
            break;
          } else {
            this.activeClass = domName;
          }
        }
      }
    }
  }
};
</script>
