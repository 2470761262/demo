<style lang="less" scoped>
.col-title {
  font-size: @font16;
  display: flex;
  align-items: center;
  color: #303133;
  font-weight: bold;
  margin-top: 24px;
  &.is-require {
    &::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #f62f2f;
      margin-right: 4px;
    }
    &::after {
      content: attr(data-tips);
      font-size: @font14;
      margin-left: 20px;
      color: red;
    }
  }
}
.col-content {
  .col-check {
    display: flex;
    margin-top: 16px;
    .col-check-item {
      height: 48px;
      width: 103px;
      background: #f0f2f5;
      border-radius: 4px;
      font-size: @font16;
      text-align: center;
      line-height: 48px;
      margin-right: 16px;
      cursor: pointer;
      color: #909399;
      input {
        display: none;
      }
      &.active {
        background: @backgroud;
        color: #fff;
      }
    }
  }
  .col-textarea {
    margin-top: 16px;
    width: 579px;
    height: 162px;
    /deep/.el-textarea {
      height: 100%;
      .el-textarea__inner {
        height: 100%;
        padding: 16px;
        font-size: @font16;
        font-family: "Microsoft Yahei", Helvetica, Arial, sans-serif;
      }
      .el-input__count {
        bottom: 16px;
        right: 16px;
        font-size: @font16;
      }
    }
  }
}
</style>
<template>
  <fixed-popup
    v-bind="$attrs"
    v-on="$listeners"
    style-type="0"
    @confirmEmit="submit"
    :but-json="{
      confirmBtnText: '提交点评'
    }"
  >
    <div
      class="col-title is-require"
      :data-tips="errorBags.first('activeScore')"
    >
      自评分
    </div>
    <div class="col-content">
      <div class="col-check">
        <label
          class="col-check-item"
          v-for="item in score"
          :key="item"
          :class="{ active: form.activeScore == item }"
        >
          <input
            type="radio"
            v-model="form.activeScore"
            :value="item"
            name="activeScore"
            v-validate="'required'"
            data-vv-name="activeScore"
            data-vv-as="自评分"
          />
          <span>{{ item }}分</span>
        </label>
      </div>
    </div>
    <div class="col-title is-require" :data-tips="errorBags.first('summary')">
      点评
    </div>
    <div class="col-content">
      <div class="col-textarea">
        <el-input
          type="textarea"
          data-vv-validate-on="change"
          placeholder="请输入不少于20字的点评"
          v-model="form.comment"
          v-validate="'required'"
          data-vv-name="summary"
          data-vv-as="点评"
          show-word-limit
          resize="none"
        >
        </el-input>
      </div>
    </div>
  </fixed-popup>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new"
  },
  methods: {
    /**
     * @example: 提交
     */

    submit() {
      this.$validator.validate().then(e => {
        if (e) {
          this.submitForm();
        }
      });
    },
    /**
     * @example: 关闭
     */
    hidePop() {
      this.$emit("update:visible", false);
    },
    /**
     * @example: 提交点评
     */
    submitForm() {
      this.$api
        .post({
          url: "/attendance/attendanceWorkSummary/checkSummary",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            id: this.$route.query.id,
            checkContent: this.form.comment, //点评类容
            checkScore: this.form.activeScore //点评评分
          }
        })
        .finally(() => {
          this.hidePop();
          this.$emit("hideChange");
        });
    }
  },
  data() {
    return {
      score: [1, 2, 3, 4, 5],
      form: {
        activeScore: "",
        comment: ""
      }
    };
  }
};
</script>
