<style lang="less" scoped>
.icon {
  font-size: 60px;
  display: block;
  text-align: center;
}
.radio-content-title {
  font-size: 15px;
  vertical-align: middle;
  margin-right: 40px;
}
.raido-group {
  display: inline-block;
  .raido-group-label {
    span {
      font-size: 15px;
    }
  }
}
.text-flex {
  display: flex;
  align-items: center;
  margin-top: 20px;
  > span {
    flex-shrink: 0;
    font-size: 15px;
    margin-right: 20px;
  }
}
.pop-but {
  /deep/span {
    font-size: 12px !important;
  }
  .button-back {
    background: #108f51;
    /deep/span {
      color: #fff;
    }
  }
}
</style>
<template>
  <fixedPopup v-bind="$attrs"
              v-on="$listeners">
    <template>
      <i class="el-icon-sunny icon"></i>
      <div class="radio-content">
        <span class="radio-content-title">不动产权证</span>
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
      </div>
      <div class="text-flex"
           v-if="pop.model == 0">
        <span>证号:</span>
        <el-input v-model="pop.inputValue"></el-input>
      </div>
      <div class="pop-but">
        <el-button size="small"
                   @click="hidePop">取消</el-button>
        <el-button size="small"
                   class="button-back"
                   :loading="pop.loading"
                   @click="result">确定</el-button>
      </div>
    </template>
  </fixedPopup>
</template>

<script>
import '../less/didLogCss.less';
export default {
  watch: {
    'pop.model' (newValue, oldValue) {
      if (newValue != 0) {
        this.pop.inputValue = '';
      }
    }
  },
  data () {
    return {
      pop: {
        inputValue: '',
        model: 0,
        loading: false,
        checkList: [
          { title: '有', value: 0 },
          { title: '无', value: 1 }
        ]
      }
    }
  },
  methods: {
    result () {
      let that = this;

    },
    hidePop () {
      this.$emit('update:visible', false)
    }
  },
}
</script>
