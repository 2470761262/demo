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
  <fixedPopup v-bind="$attrs" v-on="$listeners">
    <div v-loading="loading" :element-loading-text="loadingMessage">
      <i class="el-icon-sunny icon"></i>
      <div class="radio-content">
        <span class="radio-content-title">不动产权证</span>
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
      </div>
      <div class="text-flex" v-if="pop.model == 1">
        <span>证号:</span>
        <el-input class="anchor-point" v-model="pop.inputValue"></el-input>
      </div>
      <div class="pop-but">
        <el-button class="anchor-point" size="small" @click="hidePop"
          >取消</el-button
        >
        <el-button
          size="small"
          class="button-back anchor-point"
          :loading="pop.loading"
          @click="result"
          >确定</el-button
        >
      </div>
    </div>
  </fixedPopup>
</template>

<script>
import "../less/didLogCss.less";
//发布外网
import release from "../common/releaseHouse.js";
import { mapState, mapActions } from "vuex";
export default {
  // inject: ["houseDetails", "houseId", "load"],

  watch: {
    "pop.model"(newValue, oldValue) {
      if (newValue != 0) {
        this.pop.inputValue = "";
      }
    }
  },
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id,
      houseData: state => state.houseDateil.houseData,
      reloData: state => state.houseDateil.reloData
    })
  },
  data() {
    return {
      loading: false,
      loadingMessage: "正在发布",
      pop: {
        inputValue: "",
        model: 1,
        loading: false,
        checkList: [
          { title: "有", value: 1 },
          { title: "无", value: 0 }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["commitHouseData"]),
    async result() {
      let that = this;
      if (that.pop.model == 0) {
        this.$message("房屋未出证,无法发布到外网");
        this.$emit("update:visible", false);
      } else {
        let params = {
          houseId: this.houseId,
          houseType: 0,
          certificateType: 1,
          certificateNo: this.pop.inputValue
        };
        let result = false;
        if (this.pop.inputValue.length == 0) {
          this.$message("产权证号未填");
          return;
        }
        this.loading = true;
        result = await release.releaseOutsideHouse(params);
        this.loading = false;

        console.log(result, "result");
        console.log("212121", result.data.code);
        if (result.data.code == 200) {
          this.commitHouseData({
            isReleaseOutside: 1
          });
          this.$message("操作成功");
        }
        this.$emit("update:visible", false);
      }
    },
    hidePop() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
