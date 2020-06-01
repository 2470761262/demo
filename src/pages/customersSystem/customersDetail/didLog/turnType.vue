<style lang="less" scoped>
@import url(../../less/popScroll);
.error-tips {
  color: red;
}
.belt-content {
  .belt-content();
}
.isVisible {
  display: none;
}
</style>
<template>
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <template>
      <strong class="error-tips">{{ errorBags.all()[0] }}</strong>
      <div class="belt-content">
        <div class="belt-content-item">
          <div class="item-right">
            <el-radio-group v-model="status" @change="statusChange">
              <el-radio-button label="已购"></el-radio-button>
              <el-radio-button label="暂不购"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div :class="{ isVisible: isVisible }">
          <div class="item-right">
            <div class="check-content">
              <div class="label-content">
                <el-radio v-model="isTalk" :label="0">我司成交</el-radio>
                <el-radio v-model="isTalk" :label="1">他司成交</el-radio>
                <el-radio v-model="isTalk" :label="1">客户自购</el-radio>
              </div>
            </div>
          </div>
        </div>
        <div :class="{ isVisible: isVisible }">
          <div class="item-right">
            <div class="check-content">
              <span>成交楼盘</span>
              <el-input style="width:60%;margin-left:20px"></el-input>
            </div>
            <div class="check-content">
              <span>成交金额</span>
              <el-input
                clearable
                style="width:60%;margin-left:20px"
                placeholder="成交金额"
              ></el-input>
            </div>
            <div class="check-content">
              <span>成交时间</span>
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
    </template>
  </fixed-popup>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  components: {},
  props: {
    customerId: {
      type: Number, // 定义接收到的数据的类型
      default: 0,
      required: false //规定这个数据是否必传,默认false
    }
  },
  data() {
    return {
      textarea: "",
      isTalk: 0, //是否再谈
      accompanyResult: [], //陪同人
      cascaderResult: [], //带看楼盘
      beltTime: [], //带看时间
      status: null,
      isVisible: false
    };
  },
  methods: {
    statusChange(e) {
      console.log("切换了", e);
      if (e == "已购") {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    },
    addPairRecord(params, callback) {
      let _that = this;
      _that.$api
        .post({
          url: "/saleCustomer/addPairRecord",
          data: params,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          _that.$message({
            type: "info",
            message: result.message
          });
          if (result.code == 200) {
            console.log(result, "添加带看");
            callback();
          } else {
            console.log("录入客源" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("录入客源失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    confirmEmit() {
      let _that = this;
      // this.$validator.validateAll().then(e => {
      //   if (!e) return;
      // });
      if (this.customerId && this.customerId != 0) {
        //在该组件内响应添加带看
        console.log(this.customerId, "添加带看在组件内响应");
      } else {
        console.log(
          "添加带看在父组件内响应，请在父组件内注册事件confirmAddLook"
        );
        _that.$emit("confirmAddLook", this.$data);
      }
    }
  }
};
</script>
