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
.filedError {
  color: red;
  font-size: 14px;
  margin-top: 8px;
}
.input-content {
  margin-top: 20px;
}
.pop-but {
  /deep/span {
    font-size: 12px !important;
  }
}
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
          <input
            type="radio"
            :value="item.value"
            @click="radioChange(item.value)"
            v-model="pop.model"
          />
          <i></i>
          <span>{{ item.title }}</span>
        </label>
      </div>
      <template v-if="pop.model == 4">
        <div class="input-content">
          <el-input
            class="anchor-point"
            v-model="type0.val0"
            placeholder="请输入成交公司"
            v-validate="{ required: pop.model == 4 }"
            data-vv-name="dealCompany"
            data-vv-as="成交公司必填"
          >
            <template slot="prepend">成交公司</template>
          </el-input>
        </div>
        <div class="input-content">
          <el-input
            class="anchor-point"
            v-model="type0.val1"
            placeholder="请输入成交价钱"
            v-number.floot
          >
            <template slot="prepend">成交</template>
            <template slot="append">万元</template>
          </el-input>
        </div>
      </template>
      <template v-if="pop.model == 6 || pop.model == 3">
        <div class="raido-group mini">
          <label
            class="raido-group-label anchor-point"
            v-for="(item, index) in typeShow.list"
            :key="index"
          >
            <input
              type="radio"
              :value="item.value"
              v-model="typeShow.model"
              v-validate="{ required: pop.model == 6 || pop.model == 3 }"
              data-vv-name="subType"
              data-vv-as="子类型必填"
            />
            <i></i>
            <span>{{ item.title }}</span>
          </label>
        </div>
      </template>
      <div class="filedError">{{ errorBags.all()[0] }}</div>
      <div class="pop-but">
        <el-button class="anchor-point" size="small" @click="hidePop"
          >取消</el-button
        >
        <el-button
          size="small"
          :disabled="!showSubmitBtn"
          class="anchor-point"
          :loading="pop.loading"
          @click="result"
          >确定</el-button
        >
      </div>
    </template>
  </fixedPopup>
</template>

<script>
import "../less/didLogCss.less";
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  inject: ["houseId"],
  props: {
    showSubmitBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    radioChange(e) {
      console.log(e);
      this.typeShow.model = "";
      Object.assign(this.$data.type0, this.$options.data().type0);
      if (e == 6 || e == 3) {
        this.typeShow.list = this["type" + e];
      }
    },
    hidePop() {
      this.$emit("update:visible", false);
    },
    result() {
      console.log(this.$validator, "this.$validator");
      this.$validator.validateAll().then(e => {
        if (e) {
          let that = this;
          let result = that.pop.checkList.filter(
            item => item.value == this.pop.model
          );
          let params = {
            Eid: that.houseId.id,
            Type: 8,
            NewSaleTag: that.pop.model,
            followMemo: result[0].title
          };
          if (that.pop.model == 4) {
            params.dealCompany = this.type0.val0;
            params.dealPrice = this.type0.val1;
          }
          if (that.pop.model == 3 || that.pop.model == 6) {
            params.subStatus = this.typeShow.model;
          }
          this.hidePop();
          this.$api
            .post({
              url: "/agentHouse/propertyCheck/insertChange",
              data: params,
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            })
            .then(e => {
              that.$message(e.data.message);
            })
            .catch(e => {});
        }
      });
    }
  },
  data() {
    return {
      pop: {
        model: 4,
        loading: false,
        checkList: [
          { title: "他司售", value: 4 },
          { title: "业主自售", value: 6 },
          { title: "暂不售", value: 5 },
          { title: "无效", value: 3 }
        ]
      },
      typeShow: {
        model: "",
        list: []
      },
      type0: {
        val0: "",
        val1: ""
      },
      type6: [
        { title: "疑似跳单", value: 0 },
        { title: "亲朋好友", value: 1 }
      ],
      type3: [
        { title: "号码错误", value: 2 },
        { title: "空号", value: 3 },
        { title: "房源不存在", value: 4 }
      ],
      params: {
        followMemo: "他司售",
        dealCompany: ""
      }
    };
  },
  created() {
    console.log("showSubmitBtn", this.showSubmitBtn);
  }
};
</script>
