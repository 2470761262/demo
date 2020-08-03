<style lang="less" scoped>
@import url(../less/didLogCss);
</style>
<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners">
    <template>
      <div class="raido-group">
        <label
          class="raido-group-label anchor-point"
          v-for="(item, index) in pop.checkList"
          :key="index"
        >
          <input type="radio" :value="item.value" v-model="pop.model" />
          <i></i>
          <span>{{ item.title }}</span>
        </label>
      </div>
      <div class="el-textarea-content">
        <el-input
          class="anchor-point"
          type="textarea"
          :placeholder="text"
          v-model="pop.textarea"
          resize="none"
          show-word-limit
        >
        </el-input>
      </div>
      <div class="pop-but">
        <el-button
          class="anchor-point"
          size="small"
          :class="[cancelButClass]"
          @click="cancel"
          v-if="cancelFlag"
          >取消</el-button
        >
        <el-button
          class="anchor-point"
          size="small"
          v-if="isSubmit"
          :class="['button-back', sumitButClass]"
          @click="result"
          :loading="pop.loading"
          >提交</el-button
        >
      </div>
    </template>
  </fixedPopup>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id,
      reloData: state => state.houseDateil.reloData
    }),
    isSubmit() {
      return this.reloData.insertFollow;
    }
  },
  props: {
    isCancel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      sumitButClass: "",
      cancelButClass: "",
      cancelFlag: false,
      text: "请真实了解后如实填写,应付/弄虚作假将敬畏扣分5/条",
      pop: {
        model: 27,
        textarea: "",
        loading: false,
        checkList: [
          { title: "出售条件变化", value: 27 },
          { title: "业主心理状态", value: 28 },
          { title: "其他", value: 11 }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["setParam"]),
    //添加跟进
    result() {
      let params = {
        memo: this.pop.textarea,
        houseId: this.houseId,
        followWay: this.pop.model,
        followType: "常态跟进"
      };
      if (this.pop.textarea.length < 10) {
        this.$message("跟进内容不能少于10个字,添加跟进失败!!!");
        return;
      }
      if (this.isCancel) {
        this.$emit("update:visible", false);
      } else {
        Object.assign(this.$data.pop, this.$options.data().pop);
      }
      this.$api
        .post({
          url: "/agentHouse/follow/insertFollow",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          this.$message(e.data.message);
          if (e.data.code == 200) {
            this.pop.textarea = "";
            this.setParam({
              paramName: "followUpdate",
              value: Math.floor(Math.random() * 1000)
            });
          }
        });
    },
    cancel() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
