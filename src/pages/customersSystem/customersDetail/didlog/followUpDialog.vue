<template>
  <fixedPopup
    v-bind="$attrs"
    v-on="$listeners"
    @confirmEmit="fromSubmit()"
    :loading="isLoading"
  >
    <template>
      <div class="addform-box">
        <!-- 跟进类型 -->
        <div class="input-group is-required">
          <div class="input-head">跟进类型</div>
          <el-select
            v-model="followType"
            popper-class="options-item"
            class="input-content"
            placeholder="请选择跟进类型"
            data-vv-as="跟进类型"
            data-vv-name="followType"
            v-validate="'required'"
          >
            <el-option
              v-for="item in followUpTypeList"
              :key="item.index"
              :label="item.key"
              :value="item.key"
            ></el-option>
          </el-select>
          <div
            :class="{
              'after-error-tips': errorBags.has('followType')
            }"
            :data-error="errorBags.first('followType')"
          ></div>
        </div>
        <!-- 跟进方式 -->
        <div class="input-group is-required">
          <div class="input-head">跟进方式</div>
          <label
            class="radio-content radio-box"
            v-for="item in wayList"
            :key="item.index"
          >
            <input
              type="radio"
              name="followWay"
              :value="item.key"
              v-model="followWay"
              data-vv-name="followWay"
              data-vv-as="跟进方式"
              v-validate="'required'"
            />
            <div class="radio-title">{{ item.key }}</div>
          </label>
          <div
            :class="{
              'after-error-tips': errorBags.has('followWay')
            }"
            :data-error="errorBags.first('followWay')"
          ></div>
        </div>
        <!-- 跟进内容 -->
        <div class="input-group is-required">
          <div class="input-head">跟进内容</div>
          <div class="btn-row">
            <div
              class="btn-item"
              v-for="(item, idx) in contentList"
              :key="idx"
              @click="followUpImport(item.key)"
            >
              {{ item.key }}
            </div>
          </div>
          <el-input
            v-model="memo"
            clearable
            type="textarea"
            rows="8"
            show-word-limit
            maxlength="30"
            placeholder="请输入跟进内容"
            data-vv-name="memo"
            data-vv-as="跟进内容"
            v-validate="'required'"
          />

          <div
            :class="{
              'after-error-tips': errorBags.has('memo')
            }"
            :data-error="errorBags.first('memo')"
          ></div>
        </div>
      </div>
    </template>
  </fixedPopup>
</template>
<script>
export default {
  inject: ["customerId"],
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  data() {
    return {
      isLoading: false,
      followUpTypeList: [
        { key: "首次跟进" },
        { key: "日常回访" },
        { key: "带看后回访" }
      ],
      wayList: [
        { key: "微信" },
        { key: "电话" },
        { key: "短信" },
        { key: "面访" },
        { key: "视频" }
      ],
      contentList: [
        { key: "短期内无法看房" },
        { key: "联系不上" },
        { key: "需求明确，无合适房源" },
        { key: "和其他同事看房中" }
      ],
      followType: "",
      followWay: "",
      memo: ""
    };
  },
  methods: {
    /**
     * @example: 填充跟进内容
     * @param{string} content 填充内容
     */
    followUpImport(content) {
      this.memo = content;
    },
    /**
     * @example: 提交按钮
     */
    fromSubmit() {
      let that = this;
      let postData = {
        EntructId: that.customerId,
        FollowWay: that.followWay,
        FollowType: that.followType,
        Memo: that.memo
      };
      if (!that.isLoading) {
        this.$validator.validateAll().then(result => {
          if (result) {
            that.isLoading = true;
            that.$api
              .post({
                url: "	/saleCustomerDetail/addSaleCusFlower",
                data: postData,
                qs: true,
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              })
              .then(e => {
                if (e.data.code == 200) {
                  this.$message({
                    type: "xinjia",
                    message: "跟进信息添加成功"
                  });
                  that.$emit("upData");
                  that.colse();
                }
              })
              .catch(e => {
                that.isLoading = false;
                if (e.response != undefined) {
                  that.$message({
                    type: "xinjia-info",
                    message: e.response.data.message
                  });
                }
              });
          }
        });
      }
    },
    colse() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../addCustomers/less/form");
.addform-box {
  padding: 24px 0;
  padding-bottom: 26px;
  .step-content();
  .btn-row {
    .btn-item {
      cursor: pointer;
      display: inline-block;
      margin-right: 16px;
      background: rgba(240, 242, 245, 1);
      border-radius: 4px;
      font-size: @font16;
      color: rgba(144, 147, 153, 1);
      line-height: 48px;
      margin-bottom: 16px;
      padding: 0 16px;
    }
  }
  .input-group .radio-content + .radio-content {
    margin-left: 0;
  }
  .radio-box {
    margin: 0 16px 16px 0;
  }
}
</style>
