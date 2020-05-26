<style lang="less" scoped>
@import url(../less/popScroll);
.head-input {
  .head-input();
}
.foot-left-tips {
  width: 220px;
  text-align: center;
  font-size: 16px;
  color: #666;
  padding-top: 10px;
}
.fool-right-scroll {
  .fool-right-scroll();
}
</style>
<template>
  <down-content :down-ul-flag="cascaderRenderList.length > 0">
    <template v-slot:head>
      <div class="head-input">
        <input
          type="text"
          v-model="cascaderCommunity.input"
          @input="communityInput"
          @focus="openScroll('cascaderCommunity')"
          placeholder="请选择带看楼盘"
        />
        <input
          type="text"
          @input="buildInput"
          @focus="openScroll('cascaderBuild')"
          placeholder="楼栋"
          v-model="cascaderBuild.input"
          v-if="cascaderCommunity.next"
        />
        <input
          type="text"
          @input="houseInput"
          placeholder="房间号"
          @focus="openScroll('cascaderHouse')"
          v-model="cascaderHouse.input"
          v-if="cascaderBuild.next"
        />
      </div>
    </template>
    <template v-slot:fool>
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
    </template>
  </down-content>
</template>

<script>
import util from "@/util/util";
import downContent from "../customersDetail/components/downContent";
export default {
  props: ["value"],
  components: {
    downContent
  },
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
    //楼盘Input输入input事件
    communityInput: util.debounce(300, function(e) {
      // Todo
      // remot get data
    }),

    //楼栋输入input事件
    buildInput: util.debounce(300, function(e) {
      // Todo
      // remot get data
      console.log(this);
    }),

    //房间号input输入input事件
    houseInput: util.debounce(300, function(e) {
      // Todo
      // remot get data
      console.log(this);
    }),

    check(item) {
      const level = this.getLevel;

      //设置选中的数据添加到一个集合
      this.$set(this.checkList, level, item);

      this.$emit("input", this.checkList);

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
          //测试数据
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
          //测试数据
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
          //测试数据
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
