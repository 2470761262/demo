<style lang="less" scoped>
</style>
<template>
  <fixedPopup v-bind="$attrs"
              v-on="$listeners">
    <template>
      <div class="raido-group">
        <label class="raido-group-label"
               v-for="(item,index) in pop.checkList"
               :key="index">
          <input type="radio"
                 :value="item.value"
                 v-model="pop.model">
          <i></i>
          <span>{{item.title}}</span>
        </label>
      </div>
      <div class="el-textarea-content">
        <el-input type="textarea"
                  :placeholder="text"
                  v-model="pop.textarea"
                  maxlength="200"
                  resize="none"
                  show-word-limit>
        </el-input>
      </div>
      <div class="pop-but">
        <el-button size="small"
                   :class="[cancelButClass]"
                   @click="cancel"
                   v-if="cancelFlag">取消</el-button>
        <el-button size="small"
                   :class="['button-back',sumitButClass]"
                   @click="result"
                   :loading="pop.loading">提交</el-button>
      </div>
    </template>
  </fixedPopup>
</template>

<script>
import '../less/didLogCss.less';
export default {
  data () {
    return {
      sumitButClass: '',
      cancelButClass: '',
      cancelFlag: false,
      text: '请真实了解后如实填写,应付/弄虚作假将敬畏扣分5/条',
      pop: {
        model: 0,
        textarea: '',
        loading: false,
        checkList: [
          { title: '出售条件变化', value: 0 },
          { title: '业主心理状态', value: 1 },
          { title: '其他', value: 2 }
        ]
      }
    }
  },
  methods: {
    result () {
      console.log(this.pop);
    },
    cancel () {
      this.$emit('update:visible', false)
    }
  },
}
</script>
