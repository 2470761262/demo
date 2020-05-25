<style lang="less" scoped>
.cascader-content {
  //  position: relative;
  .cascader-content-head {
    display: flex;
    height: 45px;
    background: #f2f2f2;
    border-radius: 30px;
    overflow: hidden;
    padding: 0 10px;
    box-sizing: border-box;
    align-items: center;
    position: relative;
    z-index: 5;
    border: 1px solid #eae8e4;
    .head-icon {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      background: #fff;
    }
    .head-input {
      flex: 1;
      margin-left: 20px;
      display: flex;
      input {
        flex: 1;
        width: 0;
        outline: none;
        border: none;
        background: inherit;
        height: 30px;
        font-size: 16px;
        margin-right: 10px;
        border-bottom: 1px solid black;
        &:nth-child(1) {
          flex: 2 0 auto;
        }
        &:last-child {
          margin-right: 0;
        }
        &:first-of-type {
          border-bottom: 0;
        }
        &:focus {
          // border-color: none;
          // border-color: var(--color--primary);
        }
      }
    }
  }
  .cascader-content-foot {
    width: 100%;
    margin-top: -15px;
    padding-top: 15px;
    border: 2px solid #ddd;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    box-sizing: border-box;
    display: flex;
    background: #f1f1f1;
    overflow: hidden;
    .foot-left-tips {
      width: 220px;
      text-align: center;
      font-size: 16px;
      color: #666;
      padding-top: 10px;
    }
    .fool-right-scroll {
      flex: 1;
      //   height: 0;
      max-height: 200px;
      overflow: auto;
      padding-top: 10px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      &::-webkit-scrollbar-button,
      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-track-piece {
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        background: #999;
        border-radius: 50px;
      }
      &.is-childred-one {
        margin-left: 65px;
      }
      &.scroll-pad-bor {
        padding-left: 20px;
        border-left: 2px solid #ddd;
      }
      li {
        font-size: 16px;
        color: #666;
        margin-bottom: 20px;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
<template>
  <div class="cascader-content">
    <div class="cascader-content-head">
      <div class="head-icon"></div>
      <div class="head-input">
        <input
          type="text"
          v-model="cascaderCommunity.input"
          @focus="openScroll('cascaderCommunity')"
          placeholder="选择带看楼盘"
        />
        <input
          type="text"
          @focus="openScroll('cascaderBuild')"
          placeholder="楼栋"
          v-model="cascaderBuild.input"
          v-if="cascaderCommunity.next"
        />
        <input
          type="text"
          placeholder="房间号"
          @focus="openScroll('cascaderHouse')"
          v-model="cascaderHouse.input"
          v-if="cascaderBuild.next"
        />
      </div>
    </div>
    <div class="cascader-content-foot" v-if="cascaderRenderList.length > 0">
      <div class="foot-left-tips" v-show="getLevel !== 0">
        {{ tipsList[getLevel] }}
      </div>
      <ul
        class="fool-right-scroll"
        :class="{
          'is-childred-one': getLevel === 0,
          'scroll-pad-bor': getLevel !== 0
        }"
      >
        <li
          v-for="(item, index) in cascaderRenderList"
          :key="index"
          @click="check(item)"
        >
          {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  computed: {
    /**
     * @example: 获取当前的激活等级
     * @return: [number]
     */
    getLevel() {
      let level = 0;
      if (this.activeName === "cascaderBuild") level = 1;
      else if (this.activeName === "cascaderHouse") level = 2;
      return level;
    }
  },
  methods: {
    check(item) {
      const level = this.getLevel;

      //设置选中的数据添加到一个集合
      this.$set(this.checkList, level, item);

      //把当前设置的之后的值都删除掉，保证一致
      this.checkList.splice(level + 1, this.checkList.length - 1);

      this[this.activeName].input = item.value;

      this[this.activeName].next = true;

      //设置其他next为false
      this[this.activeName].children.forEach((childName, index) => {
        this[childName].input = "";
        this[childName].next = false;
      });

      this.cascaderRenderList = [];
    },
    /**
     * @example: 激活时把对应的list给renderList
     * @param {cascaderName} string
     */

    openScroll(cascaderName) {
      this.cascaderRenderList = this[cascaderName].list;
      this.activeName = cascaderName;
    }
  },
  data() {
    return {
      tipsList: ["", "请选择楼栋号:", "请选择房间号:"],

      activeName: "", // 当前激活的cascader

      checkList: [], //选择的集合

      cascaderCommunity: {
        input: "",

        next: false,

        list: [
          { key: 1, value: "国贸天琴弯 - 天悦(龙岩)" },
          { key: 2, value: "国贸天琴弯 - 天悦(龙岩1)" },
          { key: 3, value: "国贸天琴弯 - 天悦(龙岩2)" },
          { key: 3, value: "国贸天琴弯 - 天悦(龙岩3)" },
          { key: 3, value: "国贸天琴弯 - 天悦(龙岩4)" },
          { key: 3, value: "国贸天琴弯 - 天悦(龙岩5)" },
          { key: 4, value: "国贸大厦" }
        ],

        children: ["cascaderBuild", "cascaderHouse"]
      },

      cascaderBuild: {
        input: "",

        next: false,

        list: [
          { key: 1, value: "01号楼" },
          { key: 2, value: "02号楼" },
          { key: 3, value: "03号楼" },
          { key: 4, value: "04号楼" },
          { key: 5, value: "05号楼" },
          { key: 3, value: "06号楼" },
          { key: 4, value: "07号楼" },
          { key: 5, value: "08号楼" }
        ],

        children: ["cascaderHouse"]
      },

      cascaderHouse: {
        input: "",

        next: false,

        list: [
          { key: 1, value: "1301" },
          { key: 2, value: "1302" },
          { key: 3, value: "1303" },
          { key: 4, value: "1304" },
          { key: 5, value: "1305" },
          { key: 3, value: "1306" },
          { key: 4, value: "1307" },
          { key: 5, value: "1308" }
        ],

        children: []
      },

      cascaderRenderList: []
    };
  }
};
</script>
