<style lang="less" scoped>
.mini {
  span {
    font-size: 14px;
  }
  i::before {
    width: 4px;
    height: 4px;
    padding: 2px;
  }
}
.input-content {
  margin-top: 20px;
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
      <div class="raido-group">
        <label class="raido-group-label"
               v-for="(item,index) in pop.checkList"
               :key="index">
          <input type="radio"
                 :value="item.value"
                 @click="radioChange(item.value)"
                 v-model="pop.model">
          <i></i>
          <span>{{item.title}}</span>
        </label>
      </div>
      <template v-if="pop.model==0">
        <div class="input-content">
          <el-input v-model="type0.val0"
                    placeholder="请输入成交公司">
            <template slot="prepend">成交公司</template>
          </el-input>
        </div>
        <div class="input-content">
          <el-input v-model="type0.val1"
                    placeholder="请输入成交价钱">
            <template slot="prepend">成交</template>
            <template slot="append">万元</template>
          </el-input>
        </div>
      </template>
      <template v-if="pop.model == 1 || pop.model == 3">
        <div class="raido-group mini">
          <label class="raido-group-label"
                 v-for="(item,index) in typeShow.list"
                 :key="index">
            <input type="radio"
                   :value="item.value"
                   v-model="typeShow.model">
            <i></i>
            <span>{{item.title}}</span>
          </label>
        </div>
      </template>
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
  methods: {
    radioChange (e) {
      this.typeShow.model = '';
      Object.assign(this.$data.type0, this.$options.data().type0)
      if (e == 1 || e == 3) {
        this.typeShow.list = this['type' + e];
      }
    },
    hidePop () {
      this.$emit('update:visible', false)
    },
    result () {

    }
  },
  data () {
    return {
      pop: {
        model: 0,
        loading: false,
        checkList: [
          { title: '他司售', value: 0 },
          { title: '业主自售', value: 1 },
          { title: '暂不售', value: 2 },
          { title: '无效', value: 3 }
        ]
      },
      typeShow: {
        model: '',
        list: []
      },
      type0: {
        val0: '',
        val1: ''
      },
      type1: [
        { title: '疑似跳单', value: 0 },
        { title: '亲朋好友', value: 1 }
      ],
      type3: [
        { title: '号码错误', value: 0 },
        { title: '空号', value: 1 },
        { title: '房源不存在', value: 2 }
      ]
    }
  },
}
</script>
