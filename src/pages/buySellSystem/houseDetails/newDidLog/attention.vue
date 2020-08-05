<style lang="less" scoped>
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
.attention-content {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .attention-left {
    align-self: center;
    .attention-title {
      font-size: 15px;
      color: black;
    }
    .raido-group-label {
      span {
        font-size: 14px;
      }
      i::before {
        margin-right: 6px;
      }
    }
  }
  .attention-right {
    font-size: 80px;
    color: #e1e3e2;
    margin-right: 40px;
  }
}
.attention-tips {
  margin-top: 15px;
  font-size: 14px;
}
</style>
<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners">
    <template>
      <div class="attention-content">
        <div class="attention-left">
          <div class="attention-title">请选择是否通知</div>
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
        <i class="el-icon-bell attention-right"></i>
      </div>
      <div class="attention-tips">
        如若选择通知,当关注的房源变动时,将会通过微信通知您的房源变化
      </div>
      <div class="pop-but">
        <el-button class="anchor-point" size="small" @click="hidePop"
          >取消</el-button
        >
        <el-button
          size="small"
          class="button-back anchor-point"
          :loading="pop.loading"
          @click="updateSendNotice"
          >确定</el-button
        >
      </div>
    </template>
  </fixedPopup>
</template>

<script>
import { mapState } from "vuex";
import "../less/didLogCss.less";
export default {
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id
    })
  },
  data() {
    return {
      pop: {
        model: 1,
        loading: false,
        checkList: [
          { title: "通知", value: 1 },
          { title: "不通知", value: 0 }
        ]
      }
    };
  },
  methods: {
    //修改下发通知标记
    updateSendNotice() {
      let that = this;
      let ajaxurl = "";
      let params = {
        houseId: this.houseId,
        isSendNotice: that.pop.model
      };
      this.$emit("update:visible", false);
      this.$api
        .post({
          url: "/agentHouse/collect/updateSendNotice",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {});
    },
    hidePop() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
