<style lang="less" scoped>
@import url(../less/popScroll);
.head-input {
  .head-input(false);
}
.fool-right-scroll {
  .fool-right-scroll();
}
</style>
<template>
  <down-content :down-ul-flag="focusFlag">
    <template v-slot:head>
      <div class="head-input">
        <input
          v-model="accompany"
          type="text"
          placeholder="请选择陪同人"
          @focus="openUlScroll"
          @input="accompanyInput"
        />
      </div>
    </template>
    <template v-slot:fool>
      <ul class="fool-right-scroll is-childred-one">
        <li
          v-for="(item, index) in accompanyList"
          :key="index"
          @click="check(item)"
        >
          <span>{{ item.value }}</span>
          <span>({{ item.type }})</span>
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
  data() {
    return {
      accompany: "",
      focusFlag: false,
      accompanyList: [{ key: 1, value: "李政橙", type: "房源跟单方" }] //测试数据
    };
  },
  methods: {
    //陪同人输入input事件
    accompanyInput: util.debounce(300, function(e) {
      // Todo
      // remot get data
      console.log(this);
    }),
    openUlScroll() {
      this.focusFlag = true;
    },
    check(item) {
      this.accompany = item.value;

      this.$emit("input", [item]);

      this.focusFlag = false;
    }
  }
};
</script>
