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
           v-if="pop.model == 1">
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
//发布外网
import release from "../common/releaseHouse.js"
export default {
  inject: ["houseDetails", "houseId", "load"],
  watch: {
    'pop.model' (newValue, oldValue) {
      if (newValue != 0) {
        this.pop.inputValue = '';
      }
    }
  },
  computed: {
    resultData () {
      if (Object.keys(this.houseDetails).length > 0) {
        return this.houseDetails.data
      } else {
        return {};
      }
    }
  },
  data () {
    return {
      pop: {
        inputValue: '',
        model: 1,
        loading: false,
        checkList: [
          { title: '有', value: 1 },
          { title: '无', value: 0 }
        ]
      }
    }
  },
  methods: {
    async  result () {
      let that = this;
      if (that.pop.model == 0) {
        this.$message("房屋未出证,无法发布到外网");
        this.$emit('update:visible', false)
      }
      else {
        let params = {
          houseId: this.houseId.id,
          houseType: 0,
          certificateType: 1,
          certificateNo: this.pop.inputValue
        };
        let result = false;
        if (this.pop.inputValue.length == 0) {
          this.$message("产权证号未填");
          return;
        }
        this.$emit('update:visible', false)
        this.load.loadingMessage = "正在发布";
        this.load.loading = true;
        result = await release.releaseOutsideHouse(params);
        this.load.loading = false;
        if (result) {
          this.resultData.isReleaseOutside = 1;
          this.$message("操作成功");
        }
        else {
          this.$message("操作失败");
        }
      }

    },
    hidePop () {
      this.$emit('update:visible', false)
    }
  },
}
</script>
